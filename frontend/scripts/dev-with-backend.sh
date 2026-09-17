#!/usr/bin/env bash

set -u

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
frontend_dir="$(cd "${script_dir}/.." && pwd)"
backend_dir="$(cd "${frontend_dir}/../backend" && pwd)"
backend_pid=""

cleanup() {
  if [[ -n "${backend_pid}" ]] && kill -0 "${backend_pid}" 2>/dev/null; then
    kill "${backend_pid}" 2>/dev/null
    wait "${backend_pid}" 2>/dev/null
  fi
}

trap cleanup EXIT INT TERM

if curl --silent --fail http://127.0.0.1:8000/up >/dev/null 2>&1; then
  echo "Laravel backend is already running on http://127.0.0.1:8000"
else
  (
    cd "${backend_dir}" || exit 1
    php artisan optimize:clear
    exec php artisan serve --host=127.0.0.1 --port=8000
  ) &
  backend_pid=$!

  for _ in {1..40}; do
    if curl --silent --fail http://127.0.0.1:8000/up >/dev/null 2>&1; then
      echo "Laravel backend started on http://127.0.0.1:8000"
      break
    fi

    if ! kill -0 "${backend_pid}" 2>/dev/null; then
      echo "Laravel backend failed to start."
      wait "${backend_pid}"
      exit 1
    fi

    sleep 0.25
  done

  if ! curl --silent --fail http://127.0.0.1:8000/up >/dev/null 2>&1; then
    echo "Laravel backend did not become ready on port 8000."
    exit 1
  fi
fi

cd "${frontend_dir}" || exit 1
npm run dev:frontend

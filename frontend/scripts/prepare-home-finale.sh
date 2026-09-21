#!/usr/bin/env bash
# Usage: bash scripts/prepare-home-finale.sh /path/to/6.mp4
# Source: 1280x720, 24fps, 8s. Retain seconds 1–8, repair the fixed star,
# and resample to 420 WebP frames at 60fps without writing an MP4 copy.
set -euo pipefail
frontend_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
source_video="${1:?Provide the path to 6.mp4}"
frames_dir="$frontend_dir/src/assets/frame_sequence/nv_hp_finale_60fps"
mkdir -p "$frames_dir"
if compgen -G "$frames_dir/frame_*.webp" > /dev/null; then
  echo 'Output frames already exist. Archive them before regenerating.' >&2
  exit 1
fi
ffmpeg -hide_banner -loglevel warning -stats -n -i "$source_video" \
  -vf 'trim=start=1:end=8,setpts=PTS-STARTPTS,delogo=x=1128:y=568:w=64:h=64,fps=60' \
  -an -c:v libwebp -quality 88 -compression_level 4 -threads 4 \
  -start_number 1 "$frames_dir/frame_%04d.webp"

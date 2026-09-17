#!/usr/bin/env bash
# For VN20260916_103709.mp4 (1920x1080, 50 fps). The lower-right star
# disappears at 17s. Repair only that area while it is present; do not crop.
# Usage: bash scripts/prepare-home-sequence.sh /path/to/source.mp4
set -euo pipefail
frontend_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
source_video="${1:?Provide the source MP4 path}"
frames_dir="$frontend_dir/src/assets/frame_sequence/home_60fps"
mkdir -p "$frames_dir"
if compgen -G "$frames_dir/frame_*.webp" > /dev/null; then
  echo 'Output frames already exist. Use an empty output folder to prevent stale frames.' >&2
  exit 1
fi

# fps resamples the original 50fps footage to 60fps; no optical-flow synthesis.
ffmpeg -hide_banner -loglevel warning -stats -n -i "$source_video" \
  -filter_complex "[0:v:0]setpts=PTS-STARTPTS,delogo=x=1696:y=856:w=88:h=88:enable='lt(t,17)',fps=60[frames]" \
  -map '[frames]' -c:v libwebp -quality 82 -compression_level 4 -threads 4 \
  -start_number 1 "$frames_dir/frame_%04d.webp"

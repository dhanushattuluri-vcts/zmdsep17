#!/usr/bin/env bash
# Usage: bash scripts/prepare-nv-home-sequence.sh /path/to/extracted/nv-hp
# Supplied 1.mp4 through 4.mp4: 1920x1080, 24fps, 8 seconds each.
set -euo pipefail
frontend_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
clips_dir="$(cd -- "${1:?Provide the extracted nv-hp directory}" && pwd)"
frames_dir="$frontend_dir/src/assets/frame_sequence/nv_hp_60fps"
export_dir="$frontend_dir/../artifacts/homepage"
mkdir -p "$frames_dir" "$export_dir"
if compgen -G "$frames_dir/frame_*.webp" > /dev/null; then
  echo 'Output frames already exist; use an empty output folder to prevent stale frames.' >&2
  exit 1
fi
for clip in 1 2 3 4; do
  test -f "$clips_dir/$clip.mp4"
done

# Remove the fixed star from each clip before concatenation. fps repeats source
# frames to reach 60fps; it does not generate optical-flow intermediate motion.
ffmpeg -hide_banner -loglevel warning -stats -n \
  -i "$clips_dir/1.mp4" -i "$clips_dir/2.mp4" \
  -i "$clips_dir/3.mp4" -i "$clips_dir/4.mp4" \
  -filter_complex "[0:v]setpts=PTS-STARTPTS,delogo=x=1696:y=856:w=88:h=88[a];[1:v]setpts=PTS-STARTPTS,delogo=x=1696:y=856:w=88:h=88[b];[2:v]setpts=PTS-STARTPTS,delogo=x=1696:y=856:w=88:h=88[c];[3:v]setpts=PTS-STARTPTS,delogo=x=1696:y=856:w=88:h=88[d];[a][b][c][d]concat=n=4:v=1:a=0,fps=60,split=2[frames][video]" \
  -map '[frames]' -c:v libwebp -quality 82 -compression_level 4 -threads 4 \
  -start_number 1 "$frames_dir/frame_%04d.webp" \
  -map '[video]' -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -threads 4 \
  -movflags +faststart "$export_dir/nv-hp-clean-60fps.mp4"

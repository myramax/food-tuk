#!/usr/bin/env python3
"""Extract .wpress archive. Format: per-file header = 255(name) + 14(size) + 12(mtime) + 4096(path), then payload bytes, terminated by a full zero header."""
import os, sys, struct

HDR_NAME, HDR_SIZE, HDR_MTIME, HDR_PATH = 255, 14, 12, 4096
HDR_TOTAL = HDR_NAME + HDR_SIZE + HDR_MTIME + HDR_PATH  # 4377

def unpack_field(buf):
    return buf.split(b"\x00", 1)[0].decode("utf-8", errors="replace")

src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
count = 0
total_bytes = 0
with open(src, "rb") as f:
    while True:
        header = f.read(HDR_TOTAL)
        if len(header) < HDR_TOTAL or header == b"\x00" * HDR_TOTAL:
            break
        name = unpack_field(header[:HDR_NAME])
        size = int(unpack_field(header[HDR_NAME:HDR_NAME + HDR_SIZE]) or "0")
        # mtime field skipped
        path = unpack_field(header[HDR_NAME + HDR_SIZE + HDR_MTIME:])
        if not name:
            print(f"[warn] skipping entry with empty name, path={path!r}, size={size}")
            f.seek(size, 1)
            continue
        rel_path = "" if path in (".", "") else path
        target_dir = os.path.join(dst, rel_path)
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, name)
        remaining = size
        with open(target_path, "wb") as out:
            while remaining:
                chunk = f.read(min(1 << 20, remaining))
                if not chunk:
                    break
                out.write(chunk)
                remaining -= len(chunk)
        count += 1
        total_bytes += size
print(f"Extracted {count} files, {total_bytes/1e6:.1f} MB")

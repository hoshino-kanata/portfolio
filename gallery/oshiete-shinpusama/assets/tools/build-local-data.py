#!/usr/bin/env python3
"""Refresh the text fallback embedded in assets/shinpusama.js for file: previews."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re


def build(root: Path) -> dict[str, object]:
    root = root.resolve()
    texts = {
        path.relative_to(root).as_posix(): path.read_bytes().decode("utf-8-sig")
        for path in sorted((root / "assets/works").rglob("*.txt"))
        if path.is_file()
    }
    if not texts:
        raise SystemExit("No UTF-8 manuscripts found in assets/works/")
    payload = (
        json.dumps(texts, ensure_ascii=False, separators=(",", ":"))
        .replace("<", "\\u003c")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    )
    main = root / "assets/shinpusama.js"
    source = main.read_text(encoding="utf-8")
    block = "/* BEGIN LOCAL TEXT DATA */\nwindow.OSHIETE_LOCAL_TEXTS=" + payload + ";\n/* END LOCAL TEXT DATA */"
    updated, count = re.subn(
        r"/\* BEGIN LOCAL TEXT DATA \*/[\s\S]*?/\* END LOCAL TEXT DATA \*/",
        lambda match: block,
        source,
    )
    if count != 1:
        raise SystemExit("Expected one local text data block; no files changed")
    main.write_text(updated, encoding="utf-8")
    return {"text_files": len(texts), "updated": str(main)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[2])
    args = parser.parse_args()
    print(json.dumps(build(args.root), ensure_ascii=False))

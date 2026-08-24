#!/usr/bin/env python3
"""extract_bodies.py — parse the drafts file into bodies.json.

Usage: extract_bodies.py <packet-dir>

Reads <packet-dir>/07-replies.md and writes <packet-dir>/bodies.json.

The drafts grammar is explicit because reply bodies are backtick-, pipe-, emoji- and
arrow-heavy, and "parse the drafts file into a list of items" is not a specification anything
can be held to. Body delimiters are line-anchored sentinels so nothing inside a body — fenced
code, tables, ``` runs — can terminate it early:

    ## item: R5-01
    kind: reply
    pr: 2659
    comment_id: 3817761576
    answers_id: 3817761576
    answers_kind: review
    updated_at: 2026-08-20T00:31:32Z
    --- body ---
    <the exact bytes that will post>
    --- end ---

`kind: inline` takes `path`, `line`, `side` and `anchor_line` instead of the reply fields.
`kind: issue` takes only `pr`.
"""
import json
import os
import re
import sys

INT_FIELDS = {"pr", "line", "comment_id", "answers_id"}


def parse(text):
    items, cur, body, in_body = [], None, [], False
    for raw in text.split("\n"):
        if raw.startswith("## item:"):
            if cur is not None:
                sys.exit(f"item {cur.get('item')!r}: new item started before '--- end ---'")
            cur = {"item": raw[len("## item:"):].strip()}
            body, in_body = [], False
            continue
        if cur is None:
            continue
        if raw.strip() == "--- body ---":
            in_body = True
            continue
        if raw.strip() == "--- end ---":
            if not in_body:
                sys.exit(f"item {cur['item']!r}: '--- end ---' without '--- body ---'")
            cur["body"] = "\n".join(body)
            items.append(cur)
            cur, in_body = None, False
            continue
        if in_body:
            body.append(raw)
        elif ":" in raw and raw.strip():
            k, v = raw.split(":", 1)
            k, v = k.strip(), v.strip()
            if k in INT_FIELDS and v:
                if not re.fullmatch(r"\d+", v):
                    sys.exit(f"item {cur['item']!r}: {k} must be an integer, got {v!r}")
                v = int(v)
            cur[k] = v
    if cur is not None:
        sys.exit(f"item {cur['item']!r}: no '--- end ---' — body would be truncated")
    return items


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    packet = os.path.abspath(sys.argv[1])
    drafts = os.path.join(packet, "07-replies.md")
    if not os.path.exists(drafts):
        sys.exit(f"no drafts file at {drafts}")
    items = parse(open(drafts, encoding="utf-8").read())
    if not items:
        sys.exit(f"{drafts} contained no items — check the '## item:' headers")
    ids = [i["item"] for i in items]
    if len(ids) != len(set(ids)):
        sys.exit(f"duplicate item ids in the drafts file: "
                 f"{sorted(i for i in set(ids) if ids.count(i) > 1)}")
    out = os.path.join(packet, "bodies.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print(f"wrote {out}: {len(items)} items -> {ids}")


if __name__ == "__main__":
    main()

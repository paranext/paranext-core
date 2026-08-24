#!/usr/bin/env python3
"""verify_anchors.py — every inline anchor still says what the draft quotes, and is an ADDED line.

Usage: verify_anchors.py <packet-dir> <repo-root> [--repo owner/name]

Run it TWICE: once at drafting time over the provisional mapping, once at posting time over the
real bodies.json against re-derived heads. The first keeps a bad anchor out of a draft; the
second keeps a moved head out of a post.

Both paths are arguments. Every git call is `git -C <repo-root>`: inheriting the working
directory makes the result depend on where the process happened to be launched, and the failure
then surfaces as "not present at head", which reads as "the code moved" rather than "we ran in
the wrong directory".
"""
import json
import os
import subprocess
import sys

from posting_lib import added_lines, parse_common_args


def main():
    args, _slug = parse_common_args(sys.argv[1:], 2)
    if args is None:
        sys.exit(__doc__)
    packet, root = os.path.abspath(args[0]), os.path.abspath(args[1])

    items = [i for i in json.load(open(os.path.join(packet, "bodies.json"), encoding="utf-8"))
             if i.get("kind") == "inline"]
    if not items:
        print("no inline items to verify")
        return
    def load_map(name):
        path = os.path.join(packet, name)
        if not os.path.exists(path):
            sys.exit(f"STOP: {path} is missing. Inline anchors need it; write it at posting time "
                     f"from `gh pr view <n> --json headRefOid` / `--json baseRefName`.")
        return {int(k): v for k, v in json.load(open(path, encoding="utf-8")).items()}

    heads, bases = load_map("heads.json"), load_map("bases.json")
    absent = sorted({i["pr"] for i in items} - (set(heads) & set(bases)))
    if absent:
        sys.exit(f"STOP: no head/base recorded for PR(s) {absent}. "
                 f"heads.json has {sorted(heads)}, bases.json has {sorted(bases)}. "
                 f"Re-derive them before verifying anchors.")

    def sh(*a, check=True):
        return subprocess.run(["git", "-C", root, *a],
                              capture_output=True, text=True, check=check).stdout

    fails = []
    for it in items:
        pr, path, line = it["pr"], it["path"], it["line"]
        head = heads[pr]
        try:
            text = sh("show", f"{head}:{path}")
        except subprocess.CalledProcessError:
            fails.append(f"{it['item']}: {path} not present at head {head[:11]}")
            continue
        # splitlines(), not split("\n"): a newline-terminated file yields N+1 elements under
        # split(), so line N+1 clears a `line > len(...)` guard and then indexes the empty
        # trailing element — which compares equal to a blank anchor and passes silently.
        flines = text.splitlines()
        if line < 1 or line > len(flines):
            fails.append(f"{it['item']}: line {line} outside 1..{len(flines)} in {path}")
            continue
        actual, expected = flines[line - 1], it["anchor_line"]
        if not expected.strip():
            fails.append(f"{it['item']}: anchor_line is empty — it must quote the line's content")
        elif actual.strip() != expected.strip():
            fails.append(f"{it['item']}: anchor mismatch at {path}:{line}\n"
                         f"    draft:   {expected!r}\n    at head: {actual!r}")
            continue
        # the line must be an ADDED line in this PR's own diff (three-dot: the branch's own work)
        try:
            mb = sh("merge-base", f"origin/{bases[pr]}", head).strip()
            diff = sh("diff", "--unified=0", mb, head, "--", path)
        except subprocess.CalledProcessError:
            fails.append(f"{it['item']}: cannot diff origin/{bases[pr]}...{head[:11]} — is the "
                         f"base branch fetched?")
            continue
        added = added_lines(diff)
        if line not in added:
            fails.append(f"{it['item']}: {path}:{line} is not an ADDED line in PR #{pr}'s own diff")

    if fails:
        print("ANCHOR VERIFY: FAIL")
        for f_ in fails:
            print("  - " + f_)
        sys.exit(1)
    print(f"ANCHOR VERIFY: PASS — {len(items)} anchors resolve and are added lines")


if __name__ == "__main__":
    main()

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


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2:
        sys.exit(__doc__)
    packet, root = os.path.abspath(args[0]), os.path.abspath(args[1])

    items = [i for i in json.load(open(os.path.join(packet, "bodies.json"), encoding="utf-8"))
             if i.get("kind") == "inline"]
    if not items:
        print("no inline items to verify")
        return
    heads = {int(k): v for k, v in
             json.load(open(os.path.join(packet, "heads.json"), encoding="utf-8")).items()}
    bases = {int(k): v for k, v in
             json.load(open(os.path.join(packet, "bases.json"), encoding="utf-8")).items()}

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
            diff = sh("diff", "-U0", f"origin/{bases[pr]}...{head}", "--", path)
        except subprocess.CalledProcessError:
            fails.append(f"{it['item']}: cannot diff origin/{bases[pr]}...{head[:11]} — is the "
                         f"base branch fetched?")
            continue
        added = set()
        cur = None
        for ln in diff.split("\n"):
            if ln.startswith("@@"):
                try:
                    cur = int(ln.split("+")[1].split(",")[0].split(" ")[0])
                except (IndexError, ValueError):
                    cur = None
            elif cur is not None and ln.startswith("+") and not ln.startswith("+++"):
                added.add(cur)
                cur += 1
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

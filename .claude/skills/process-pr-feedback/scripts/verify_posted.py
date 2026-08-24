#!/usr/bin/env python3
"""verify_posted.py — live state must match the log exactly: no strays, no misses.

Usage: verify_posted.py <packet-dir> <window-start-iso> [--repo owner/name]

Exit 0 = PASS, 1 = FAIL (strays or misses, or an assert from section 7 failed),
2 = PARTIAL (items that failed and were never re-posted successfully).
"""
import json
import os
import subprocess
import sys
from collections import defaultdict

from posting_lib import unresolved_failures, unsettled_pendings


def gh(endpoint, slug):
    """gh --paginate concatenates JSON arrays, so decode them one after another."""
    txt = subprocess.run(["gh", "api", endpoint, "--paginate"],
                         capture_output=True, text=True, check=True).stdout.strip()
    out, dec, idx = [], json.JSONDecoder(), 0
    while idx < len(txt):
        obj, end = dec.raw_decode(txt, idx)
        out.extend(obj)
        idx = end
        while idx < len(txt) and txt[idx] in " \n\r\t":
            idx += 1
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2:
        sys.exit(__doc__)
    packet, window_start = os.path.abspath(args[0]), args[1]
    slug = "paranext/paranext-core"
    for a in sys.argv[1:]:
        if a.startswith("--repo="):
            slug = a.split("=", 1)[1]

    log = os.path.join(packet, "08-posting-log.txt")
    bodies = {i["item"]: i for i in
              json.load(open(os.path.join(packet, "bodies.json"), encoding="utf-8"))}
    who = subprocess.run(["gh", "api", "user", "--jq", ".login"],
                         capture_output=True, text=True, check=True).stdout.strip()

    rows = [ln.rstrip("\n").split("\t") for ln in open(log, encoding="utf-8") if ln.strip()]
    logged = defaultdict(lambda: {"review": set(), "issue": set()})
    ok_rows = 0
    for row in rows:
        status, item, pr, kind, cid = row[:5]
        # Touch the PR for EVERY row, including failures and pendings, so it enters the query set
        # below: gh can fail after GitHub already created the comment, and that stray only
        # surfaces on a PR something actually reads back.
        entry = logged[int(pr)]
        if status != "OK":
            continue
        entry["issue" if kind == "issue" else "review"].add(int(cid))
        ok_rows += 1

    unknown = unsettled_pendings(rows)
    failed = unresolved_failures(rows)
    print(f"token user: {who} · OK rows: {ok_rows}")
    for r in unknown:
        print(f"  !! UNKNOWN OUTCOME: {r[1]} has a PENDING row with no OK or FAIL after it — "
              f"a comment may be live. Resolve it before re-posting that item.")
    for r in failed:
        print(f"  NOTE failed and never re-posted: {chr(9).join(r)}")

    fails = []
    for pr in sorted(logged):
        rc = {c["id"] for c in gh(f"repos/{slug}/pulls/{pr}/comments", slug)
              if c["user"]["login"] == who and c["created_at"] >= window_start}
        ic = {c["id"] for c in gh(f"repos/{slug}/issues/{pr}/comments", slug)
              if c["user"]["login"] == who and c["created_at"] >= window_start}
        print(f"== PR #{pr}: review={len(rc)} (log {len(logged[pr]['review'])}) "
              f"issue={len(ic)} (log {len(logged[pr]['issue'])})")
        if rc != logged[pr]["review"]:
            fails.append(f"#{pr} review: strays={sorted(rc - logged[pr]['review'])} "
                         f"missing={sorted(logged[pr]['review'] - rc)}")
        if ic != logged[pr]["issue"]:
            fails.append(f"#{pr} issue: strays={sorted(ic - logged[pr]['issue'])} "
                         f"missing={sorted(logged[pr]['issue'] - ic)}")

    # Section 7's two asserts. They live here as well as in post.py because this is the script
    # that runs after a crash — exactly the case in which post.py did not reach them.
    for row in rows:
        if row[0] != "OK":
            continue
        item, cid = row[1], int(row[4])
        it = bodies.get(item)
        if it is None or it["kind"] == "issue":
            continue
        c = json.loads(subprocess.run(["gh", "api", f"repos/{slug}/pulls/comments/{cid}"],
                                      capture_output=True, text=True, check=True).stdout)
        if it["kind"] == "inline" and c.get("subject_type") != "line":
            fails.append(f"{item}: posted as subject_type={c.get('subject_type')!r}, "
                         f"expected 'line' — degraded anchor, {c['html_url']}")
        if it["kind"] == "reply" and c.get("in_reply_to_id") != it["comment_id"]:
            fails.append(f"{item}: nested under {c.get('in_reply_to_id')}, "
                         f"expected {it['comment_id']} — wrong thread, {c['html_url']}")

    if fails or unknown:
        print("POST-VERIFY: FAIL")
        for f_ in fails:
            print("  - " + f_)
        for r in unknown:
            print(f"  - {r[1]}: unresolved PENDING")
        sys.exit(1)
    if failed:
        print(f"POST-VERIFY: PARTIAL — the {ok_rows} OK rows match live state and no strays were "
              f"found on any PR in the log, but {len(failed)} item(s) never posted. A clean stray "
              f"list is what makes them safe to re-post; re-post one at a time. NOT complete.")
        sys.exit(2)
    print(f"POST-VERIFY: PASS — all {ok_rows} logged posts match live state exactly")


if __name__ == "__main__":
    main()

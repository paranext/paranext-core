#!/usr/bin/env python3
"""post.py — post ONE item.

Usage: post.py <packet-dir> <item-id> [--repo owner/name]

No retries. Refuses to post an item already recorded as posted in the log, or one whose most
recent log row is an unresolved PENDING. Bodies are piped as JSON into `gh api --input -` —
never shell-interpolated.

Heads are read from <packet-dir>/heads.json, written at posting time:
    gh pr view <n> --json headRefOid --jq .headRefOid
"""
import json
import os
import subprocess
import sys
from datetime import datetime, timezone


def _now():
    """UTC in GitHub's own format.

    The log is the packet's only recorded time, so it is the obvious source for
    verify_posted.py's window start — which is compared against GitHub's UTC `created_at`. A
    naive local timestamp is silently ahead of it by the local offset, filtering out every
    comment the run just posted and reporting all of them as missing.
    """
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

from posting_lib import guard_decision, missing_fields, parse_common_args


def main():
    args, slug = parse_common_args(sys.argv[1:], 2)
    if args is None:
        sys.exit(__doc__)
    packet, item_id = os.path.abspath(args[0]), args[1]

    bodies, log = os.path.join(packet, "bodies.json"), os.path.join(packet, "08-posting-log.txt")
    items = {i["item"]: i for i in json.load(open(bodies, encoding="utf-8"))}
    if item_id not in items:
        sys.exit(f"unknown item {item_id} in {bodies}")
    it = items[item_id]
    gaps = missing_fields(it)
    if gaps:
        sys.exit(f"REFUSING: {item_id} is malformed: {'; '.join(gaps)}")

    # --- double-post guard: the log is the source of truth on what already went out ---
    prior = []
    if os.path.exists(log):
        prior = [ln.rstrip("\n").split("\t") for ln in open(log, encoding="utf-8") if ln.strip()]
    allowed, reason = guard_decision(prior, item_id)
    if not allowed:
        sys.exit(f"REFUSING: {item_id} {reason}")

    # --- build the payload for this item's kind ---
    if it["kind"] == "reply":
        endpoint = f"repos/{slug}/pulls/{it['pr']}/comments/{it['comment_id']}/replies"
        payload = {"body": it["body"]}
    elif it["kind"] == "inline":
        heads_path = os.path.join(packet, "heads.json")
        if not os.path.exists(heads_path):
            sys.exit(f"STOP: {heads_path} is missing. A new inline comment needs a commit_id "
                     f"re-derived at posting time: gh pr view {it['pr']} --json headRefOid")
        heads = {int(k): v for k, v in json.load(open(heads_path, encoding="utf-8")).items()}
        if it["pr"] not in heads:
            sys.exit(f"STOP: no head SHA recorded for PR {it['pr']} in {heads_path}. "
                     f"Known: {sorted(heads)}. Re-derive it before posting.")
        endpoint = f"repos/{slug}/pulls/{it['pr']}/comments"
        payload = {"body": it["body"], "commit_id": heads[it["pr"]],
                   "path": it["path"], "line": it["line"], "side": it["side"]}
    elif it["kind"] == "issue":
        endpoint = f"repos/{slug}/issues/{it['pr']}/comments"
        payload = {"body": it["body"]}
    else:
        # Never a catch-all. Treating anything unrecognised as an issue comment turns a typo in
        # `kind` into a new top-level comment on the PR instead of a threaded reply.
        sys.exit(f"REFUSING: {item_id} has kind={it['kind']!r}")

    print(f"POST {endpoint}\n  item={item_id} kind={it['kind']} bodylen={len(it['body'])}")

    # --- write-ahead: log the INTENT before the call, so a hard kill still leaves a trace ---
    with open(log, "a", encoding="utf-8") as f:
        f.write(f"PENDING\t{item_id}\t{it['pr']}\t{it['kind']}\t-\t-\t"
                f"{_now()}\n")

    proc = subprocess.run(["gh", "api", "--method", "POST", endpoint, "--input", "-"],
                          input=json.dumps(payload), capture_output=True, text=True)

    ts = _now()
    if proc.returncode != 0:
        with open(log, "a", encoding="utf-8") as f:
            f.write(f"FAIL\t{item_id}\t{it['pr']}\t{it['kind']}\t-\t-\t{ts}\trc={proc.returncode}\n")
        print("STDERR:", proc.stderr[:2000])
        sys.exit(f"FAILED posting {item_id} (rc={proc.returncode}) — STOPPING, no retry")

    resp = json.loads(proc.stdout)
    with open(log, "a", encoding="utf-8") as f:
        f.write(f"OK\t{item_id}\t{it['pr']}\t{it['kind']}\t{resp['id']}\t{resp['html_url']}\t{ts}\n")
    print(f"  -> id={resp['id']}\n  -> {resp['html_url']}")

    # A file-level comment is a DIFFERENT artifact from the line-anchored one approved at G2,
    # and nothing downstream can tell them apart: the id-set verification passes either way.
    if it["kind"] == "inline":
        print(f"  -> path={resp.get('path')} line={resp.get('line')} "
              f"side={resp.get('side')} subject_type={resp.get('subject_type')}")
        if resp.get("subject_type") != "line":
            sys.exit(f"DEGRADED ANCHOR: {item_id} posted as "
                     f"subject_type={resp.get('subject_type')!r}, expected 'line' — STOPPING. "
                     f"The comment IS live ({resp['html_url']}); decide whether to keep or delete "
                     f"it before posting anything else.")
    if it["kind"] == "reply" and resp.get("in_reply_to_id") != it["comment_id"]:
        sys.exit(f"WRONG THREAD: {item_id} nested under {resp.get('in_reply_to_id')}, "
                 f"expected {it['comment_id']} — STOPPING")


if __name__ == "__main__":
    main()

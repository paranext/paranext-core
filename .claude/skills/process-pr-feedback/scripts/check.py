#!/usr/bin/env python3
"""check.py — dry-run safety checks over the extracted bodies. Any FAIL => STOP.

Usage: check.py <packet-dir> [--repo owner/name]

The packet directory is a required argument, never a module constant: the working directory
resets between calls, so a relative path either fails outright or silently checks a different
batch it happened to find.
"""
import json
import os
import re
import subprocess
import sys

from posting_lib import bad_control_chars, scan_denylist

PLACEHOLDERS = [r"\bTODO\b", r"\bTBD\b", r"\bFIXME\b", r"\bXXX\b", r"\bPLACEHOLDER\b",
                r"\bLOREM\b", r"<[A-Z][A-Z_ -]{2,}>", r"\{\{"]
PREFIX = "\U0001f916 Claude: "


def internal_labels(packet):
    """Transcribe the Internal list from shared-vocabulary.md — P2's artifact, read-only here.

    Each Internal line is `<regex>  — prose`, and the regex is used VERBATIM. It is not escaped
    and not guessed at, because a heuristic that sometimes escapes and sometimes does not is how
    an entry silently matches nothing.

    Schema-shaped entries are rejected rather than transcribed. `2659-NN` looks like a rule and
    is a literal: it matches the four characters `2659-` followed by `NN`, so every real id
    (`2659-38`) passes the check untouched. That failure is invisible — the check reports PASS —
    so it is made loud here instead.
    """
    path = os.path.join(packet, "shared-vocabulary.md")
    if not os.path.exists(path):
        sys.exit(f"STOP: {path} is missing. P2 writes it; it is the configuration for the "
                 f"internal-label check and must not be re-derived here.")
    out, bad, in_internal = [], [], False
    for line in open(path, encoding="utf-8"):
        if re.match(r"^##\s+Internal", line, re.I):
            in_internal = True
            continue
        if line.startswith("##"):
            in_internal = False
            continue
        if not (in_internal and line.strip()) or line.startswith(("#", ">")):
            continue
        token = re.split(r"\s+—|\s+-\s", line, maxsplit=1)[0].strip()
        if not token:
            continue
        if re.search(r"(NN|XX|nn|<[^>]*>|\.\.)", token):
            bad.append(token)
            continue
        try:
            re.compile(token)
        except re.error as e:
            bad.append(f"{token} (not a valid regex: {e})")
            continue
        out.append(token)
    if bad:
        sys.exit("STOP: shared-vocabulary.md Internal entries are placeholders, not patterns:\n"
                 + "\n".join(f"  - {b}" for b in bad)
                 + "\n  Write a real regex per line, e.g. `2659-\\d\\d` not `2659-NN`. "
                   "A literal placeholder matches no real id and the check would report PASS.")
    if not out:
        sys.exit(f"STOP: no entries parsed from the Internal section of {path}")
    print(f"[labels] transcribed {len(out)} internal patterns: {out}")
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1:
        sys.exit(__doc__)
    packet = os.path.abspath(args[0])
    slug = "paranext/paranext-core"
    for a in sys.argv[1:]:
        if a.startswith("--repo="):
            slug = a.split("=", 1)[1]

    items = json.load(open(os.path.join(packet, "bodies.json"), encoding="utf-8"))
    drafts_text = open(os.path.join(packet, "07-replies.md"), encoding="utf-8").read()
    fails = []

    # 1. counts and id set, derived from the DRAFTS file — the artifact G2 approved — and bound
    #    back to it by content. An id set cannot catch a truncated body no matter where the
    #    expectation comes from, so each body must also appear verbatim in the drafts.
    expected = set(re.findall(r"^## item:\s*(\S+)", drafts_text, re.M))
    got = {i["item"] for i in items}
    if got != expected:
        fails.append(f"id set mismatch vs drafts: missing={expected - got} extra={got - expected}")
    if len(items) != len(got):
        fails.append(f"duplicate item ids in bodies.json: "
                     f"{sorted(i for i in got if sum(x['item'] == i for x in items) > 1)}")
    for it in items:
        if it["body"] not in drafts_text:
            fails.append(f"{it['item']}: body is not present verbatim in 07-replies.md — "
                         f"extraction altered or truncated the approved text")
    print(f"[count] total={len(items)} unique={len(got)} ids={sorted(got)}")

    labels = internal_labels(packet)
    for it in items:
        body = it["body"]
        # 2. prefix — exactly once, at the very start
        if not body.startswith(PREFIX):
            fails.append(f"{it['item']}: missing prefix; starts {body[:40]!r}")
        if body.count("\U0001f916 Claude:") != 1:
            fails.append(f"{it['item']}: prefix appears more than once")

        # 3. NUL and control characters. TAB is legal; CR means "normalise", not "unpostable".
        cc = bad_control_chars(body)
        if cc["has_nul"]:
            fails.append(f"{it['item']}: NUL bytes")
        if cc["illegal"]:
            fails.append(f"{it['item']}: control chars {cc['illegal']}")
        if cc["has_cr"]:
            fails.append(f"{it['item']}: CR present — normalise the drafts file to LF "
                         f"(the body itself is fine; do not edit its text)")

        # 4 + 5. placeholders and this round's internal labels, skipping quoted code and URLs
        for tok, at in scan_denylist(body, PLACEHOLDERS + labels):
            ctx = body[max(0, at - 50): at + 50].replace("\n", " | ")
            fails.append(f"{it['item']}: {tok!r} -> ...{ctx}...")

    # 6. targets resolve
    declared_prs = {i["pr"] for i in items}
    for it in items:
        if it.get("kind") == "inline":
            if it["line"] <= 0 or it["side"] not in ("RIGHT", "LEFT"):
                fails.append(f"{it['item']}: bad anchor {it['path']}:{it['line']} side={it['side']}")
            if it["pr"] not in declared_prs:
                fails.append(f"{it['item']}: pr {it['pr']} is not one this packet declares")
        if it.get("kind") != "reply":
            continue
        got_c = subprocess.run(["gh", "api", f"repos/{slug}/pulls/comments/{it['comment_id']}"],
                               capture_output=True, text=True)
        if got_c.returncode != 0:
            fails.append(f"{it['item']}: comment_id {it['comment_id']} does not resolve")
            continue
        c = json.loads(got_c.stdout)
        if int(c["pull_request_url"].rsplit("/", 1)[1]) != it["pr"]:
            fails.append(f"{it['item']}: comment_id belongs to "
                         f"{c['pull_request_url'].rsplit('/', 1)[1]}, not PR {it['pr']}")
        if c.get("in_reply_to_id"):
            fails.append(f"{it['item']}: comment_id {it['comment_id']} is itself a reply; "
                         f"reply to its thread root {c['in_reply_to_id']} instead")
        ans = c
        if it.get("answers_id") and it["answers_id"] != it["comment_id"]:
            # The answered comment may be an ISSUE comment — the bulk-answer shape, where a
            # reviewer answers several of our numbered questions in one comment. Those ids live
            # under issues/comments/, so a pulls/comments/ fetch 404s and FAILs the whole batch.
            ans = None
            for ns in ("pulls", "issues"):
                r = subprocess.run(["gh", "api", f"repos/{slug}/{ns}/comments/{it['answers_id']}"],
                                   capture_output=True, text=True)
                if r.returncode == 0:
                    ans = json.loads(r.stdout)
                    break
            if ans is None:
                fails.append(f"{it['item']}: answers_id {it['answers_id']} resolves in neither "
                             f"pulls/comments nor issues/comments")
        if ans and it.get("updated_at") and ans.get("updated_at", "") > it["updated_at"]:
            fails.append(f"{it['item']}: answered comment edited after collection "
                         f"({ans['updated_at']} > {it['updated_at']}) — re-read it before replying")
        print(f"    TARGET {it['item']}: replying to @{c['user']['login']} on "
              f"{c.get('path')}:{c.get('line')} — confirm this is the intended thread")

    print()
    if fails:
        print("DRY-RUN RESULT: FAIL")
        for f_ in fails:
            print("  - " + f_)
        sys.exit(1)
    print(f"DRY-RUN RESULT: PASS — all {len(items)} bodies clean")


if __name__ == "__main__":
    main()

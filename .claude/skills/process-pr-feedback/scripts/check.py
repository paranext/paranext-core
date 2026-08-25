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

from posting_lib import (bad_control_chars, declared_prs, missing_fields, opening_reflex,
                         parse_common_args, scan_body)

PLACEHOLDERS = [r"\bTODO\b", r"\bTBD\b", r"\bFIXME\b", r"\bXXX\b", r"\bPLACEHOLDER\b",
                r"\bLOREM\b", r"<[A-Z][A-Z_ -]{2,}>", r"\{\{"]
PREFIX = "\U0001f916 Claude: "

def internal_labels(packet):
    """Transcribe the Internal list from shared-vocabulary.md — P2's artifact, read-only here.

    An entry is a BACKTICKED pattern, used verbatim as a regex; anything else in the section is
    prose. The convention is specified in `references/posting-mechanics.md`
    § *What `shared-vocabulary.md`'s Internal list must look like*, which is the single place
    that rule lives — do not restate it here, it has drifted three times already.

    Schema-shaped entries are rejected rather than transcribed. `2659-NN` looks like a rule and
    is a literal: it matches the four characters `2659-` followed by `NN`, so every real id
    (`2659-38`) passes the check untouched. That failure is invisible — the check reports PASS —
    so it is made loud here instead.
    """
    path = os.path.join(packet, "shared-vocabulary.md")
    if not os.path.exists(path):
        sys.exit(f"STOP: {path} is missing. P2 writes it; it is the configuration for the "
                 f"internal-label check and must not be re-derived here.")
    out, bad, skipped, suspicious, in_internal = [], [], [], [], False
    for line in open(path, encoding="utf-8"):
        if re.match(r"^##\s+Internal", line, re.I):
            in_internal = True
            continue
        if line.startswith("##"):
            in_internal = False
            continue
        if not (in_internal and line.strip()) or line.startswith(("#", ">")):
            continue
        # A markdown list marker is stripped first; the file is written by hand.
        entry = re.sub(r"^(?:[-*+]|\d+[.)])\s+", "", line.strip())

        # An entry is a BACKTICKED token, optionally followed by `— prose`. Everything else in
        # the section is prose.
        #
        # A convention rather than an inference, on purpose. Telling an entry from a sentence by
        # shape fails in both directions: `Note — …` reads as an entry whose remedy would
        # deny-list an everyday word, while `e.g. — …` and `P2 — …` read as patterns and would
        # hard-FAIL any approved body containing them. A backtick is unambiguous, is what markdown
        # authors already write around a pattern, and is checkable.
        # The backticked token must be the WHOLE first field: end of line, or a `— prose`
        # separator after it. Otherwise prose that merely opens with an inline-code span —
        # "`check.py` reads this section and uses each token" — reads as an entry.
        m = re.match(r"`([^`]+)`\s*(?:$|—\s|-\s)", entry)
        if not m:
            skipped.append(line.strip()[:70])
            # A single bare token before a separator is the shape a mis-written entry takes.
            # Say so loudly: dropping a real entry silently is how the deny-list ends up testing
            # nothing while the run prints PASS.
            head = entry.split(" ")[0]
            # An id-shaped head is one carrying a digit, and deliberately permissive about the
            # rest: excluding regex characters would drop the warning for the shapes the docs
            # teach as examples — `2659-\d\d`, `\bD[1-7]\b`, `T2-0[1-9]` — while still firing
            # on a bare literal id, which looks like coverage and is not.
            #
            # The cost is a false positive on a prose opener whose first word carries a digit
            # ("P2 — writes this file.", a bare date). That is the right way round: the warning
            # only ever says "this was NOT transcribed", and a spurious one is cheap next to a
            # documented entry shape vanishing into the quiet skipped list.
            if re.match(r"^\S+\s+(—|-)\s+", entry) and re.search(r"\d", head):
                suspicious.append(entry[:70])
            continue
        token = m.group(1).strip()

        if not token:
            skipped.append(line.strip()[:70])
            continue
        # Anchored on standalone uppercase runs and bracketed slots, so a legitimate pattern like
        # `\bannotation-\d+\b` is not rejected for containing "nn".
        if re.search(r"(?<![A-Za-z])(NN+|XX+)(?![A-Za-z])|<[^>]*>|\.\.", token):
            bad.append(f"{token} (a schema placeholder, not a pattern)")
            continue
        try:
            re.compile(token)
        except re.error as e:
            bad.append(f"{token} (not a valid regex: {e})")
            continue
        out.append(token)

    for sk in skipped:
        print(f"[labels] not an entry, skipped: {sk!r}")
    for sp in suspicious:
        print(f"[labels] !! looks like an entry but is not a single backticked pattern, so "
              f"it was NOT transcribed: {sp!r}")
    if bad:
        sys.exit("STOP: shared-vocabulary.md Internal entries are not usable patterns:\n"
                 + "\n".join(f"  - {b}" for b in bad)
                 + "\n  Each must be a real regex, e.g. `2659-\\d\\d` not `2659-NN`. An entry "
                   "that matches nothing lets the check report PASS having tested nothing, which "
                   "is why this is a stop rather than a skip.")
    if not out:
        sys.exit(f"STOP: no entries parsed from the Internal section of {path}")
    print(f"[labels] transcribed {len(out)} internal patterns: {out}")
    return out


def main():
    args, slug = parse_common_args(sys.argv[1:], 1)
    if args is None:
        sys.exit(__doc__)
    packet = os.path.abspath(args[0])

    items = json.load(open(os.path.join(packet, "bodies.json"), encoding="utf-8"))
    fails_early, malformed = [], set()
    for it in items:
        for gap in missing_fields(it):
            malformed.add(it.get("item"))
            # Reported, not raised. An unrecognised kind is the dangerous one: a catch-all
            # `else` in the poster would treat it as an issue comment, turning a typo in `kind`
            # into a new top-level comment on the PR instead of a threaded reply.
            fails_early.append(f"{it.get('item', '<no item id>')}: {gap}")
    if malformed:
        print(f"[shape] {len(malformed)} malformed item(s) skipped by later checks: "
              f"{sorted(malformed)}")
    drafts_text = open(os.path.join(packet, "07-replies.md"), encoding="utf-8").read()
    fails = list(fails_early)

    # 1. counts and id set, derived from the DRAFTS file — the artifact G2 approved — and bound
    #    back to it by content. An id set cannot catch a truncated body no matter where the
    #    expectation comes from, so each body must also appear verbatim in the drafts.
    # Run the id-set and verbatim checks over the well-formed items only. `body` is required for
    # every kind, so an item reported for a missing body would otherwise trade its finding for a
    # KeyError six lines below the guard that exists to prevent exactly that.
    clean = [it for it in items if it.get("item") not in malformed]
    expected = set(re.findall(r"^## item:\s*(\S+)", drafts_text, re.M))
    got = {i["item"] for i in clean}
    if got != expected:
        fails.append(f"id set mismatch vs drafts: missing={expected - got} extra={got - expected}")
    if len(clean) != len(got):
        fails.append(f"duplicate item ids in bodies.json: "
                     f"{sorted(i for i in got if sum(x['item'] == i for x in clean) > 1)}")
    for it in clean:
        if it["body"] not in drafts_text:
            fails.append(f"{it['item']}: body is not present verbatim in 07-replies.md — "
                         f"extraction altered or truncated the approved text")
    print(f"[count] total={len(items)} well-formed={len(clean)} unique={len(got)} "
          f"ids={sorted(got)}")

    labels = internal_labels(packet)
    for it in items:
        if it.get("item") in malformed:
            continue
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

        # 7. opener phrases, tested against the body after the prefix
        reflex = opening_reflex(body, PREFIX)
        if reflex:
            fails.append(f"{it['item']}: opens with {reflex!r} — lead with the verdict, not with "
                         f"agreement (reply-conventions.md § Structure)")

        # 4. placeholders — quoted code is exempt, because a reply quoting a real source line is
        #    the most likely body to contain TODO and the poster may not edit it to get past a check.
        # 5. internal labels — quoted code is NOT exempt. posting-mechanics.md §4.5 grants these
        #    the URL exemption and nothing else, and backticking an id is the most natural way to
        #    write one in a reply, so a code-span exemption here would wave through the exact
        #    thing the check exists to stop.
        for tok, at in scan_body(body, PLACEHOLDERS, labels):
            ctx = body[max(0, at - 50): at + 50].replace("\n", " | ")
            fails.append(f"{it['item']}: {tok!r} -> ...{ctx}...")

    # 6. targets resolve. The PR set comes from the packet's own directory name, not from
    # bodies.json — an expectation read off the artifact under test can never fail.
    declared = declared_prs(packet)
    if not declared:
        sys.exit(f"STOP: cannot read the PR set from the packet directory name "
                 f"{os.path.basename(packet)!r}; expected <pr>[-<pr>...]-<YYYY-MM-DD>")
    print(f"[targets] packet declares PR(s) {sorted(declared)}")
    for it in items:
        if it.get("item") in malformed:
            continue
        if it["pr"] not in declared:
            fails.append(f"{it['item']}: pr {it['pr']} is not one this packet declares "
                         f"({sorted(declared)}) — on a stack this is how a reply reaches the "
                         f"wrong PR while every id-set check still passes")
        if it.get("kind") == "inline":
            if it["line"] <= 0 or it["side"] not in ("RIGHT", "LEFT"):
                fails.append(f"{it['item']}: bad anchor {it['path']}:{it['line']} side={it['side']}")
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

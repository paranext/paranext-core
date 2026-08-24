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

from posting_lib import (bad_control_chars, declared_prs, missing_fields,
                         parse_common_args, scan_denylist)

PLACEHOLDERS = [r"\bTODO\b", r"\bTBD\b", r"\bFIXME\b", r"\bXXX\b", r"\bPLACEHOLDER\b",
                r"\bLOREM\b", r"<[A-Z][A-Z_ -]{2,}>", r"\{\{"]
PREFIX = "\U0001f916 Claude: "

# 6. Opener phrases. These are reflexes, not communication: they open a public reply to a
# colleague with agreement or gratitude before the substance, which reads as deference rather
# than as an answer. `reply-conventions.md` asks for the verdict in the first sentence.
#
# The rule is enforced here, at the point a body is about to go public under the user's name,
# rather than left to whether a drafter agent happened to have a skill loaded. Note the seam: a
# blanket ban on gratitude is calibrated for in-session replies to your own partner, and these
# bodies are public text to a human colleague — "concede specifically rather than thank
# reflexively" is what survives the translation, so thanks for a specific thing a reviewer did
# is not what this catches.
OPENERS = [r"^\W*You(?:'re| are) absolutely right",
           r"^\W*(?:Great|Good|Excellent|Nice) (?:point|catch|question|call)",
           r"^\W*(?:Thanks|Thank you)\b(?![^.\n]*\bfor (?:the|your) (?:trace|repro|measurement|patch|numbers))",
           r"^\W*(?:Absolutely|Exactly)[.,!]",
           r"^\W*I appreciate (?:the|your) (?:feedback|comment|review)\b"]


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
    out, bad, skipped, in_internal = [], [], [], False
    for line in open(path, encoding="utf-8"):
        if re.match(r"^##\s+Internal", line, re.I):
            in_internal = True
            continue
        if line.startswith("##"):
            in_internal = False
            continue
        if not (in_internal and line.strip()) or line.startswith(("#", ">")):
            continue
        # An entry is `<pattern> — <prose>`, and a pattern contains no whitespace. Prose
        # paragraphs inside the section are normal and must not be scraped as patterns: a
        # sentence taken as a regex either throws or silently matches nothing, and either way it
        # dilutes a deny-list whose whole job is to be exact. Skipped lines are printed so a real
        # entry written in the wrong shape is visible rather than dropped.
        parts = re.split(r"\s+—\s+|\s+-\s+", line.strip(), maxsplit=1)
        token = parts[0].strip()
        if not token or len(parts) < 2 or re.search(r"\s", token):
            skipped.append(line.strip()[:70])
            continue
        # Anchored on standalone uppercase runs and bracketed slots. An unanchored `nn`
        # rejected legitimate patterns like `\bannotation-\d+\b`, hard-stopping a batch with a
        # message telling the operator their entry is a placeholder when it is not.
        if re.search(r"(?<![A-Za-z])(NN+|XX+)(?![A-Za-z])|<[^>]*>|\.\.", token):
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
    for sk in skipped:
        print(f"[labels] not an entry, skipped: {sk!r}")
    print(f"[labels] transcribed {len(out)} internal patterns: {out}")
    return out


def main():
    args, slug = parse_common_args(sys.argv[1:], 1)
    if args is None:
        sys.exit(__doc__)
    packet = os.path.abspath(args[0])

    items = json.load(open(os.path.join(packet, "bodies.json"), encoding="utf-8"))
    fails_early = []
    for it in items:
        for gap in missing_fields(it):
            # Reported, not raised. An unrecognised kind is the dangerous one: post.py used to
            # treat anything that was not reply/inline as an issue comment, so a typo turned a
            # threaded reply into a new top-level comment on the PR.
            fails_early.append(f"{it.get('item', '<no item id>')}: {gap}")
    drafts_text = open(os.path.join(packet, "07-replies.md"), encoding="utf-8").read()
    fails = list(fails_early)

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

        # 6. opener phrases, tested against the body after the prefix
        after = body[len(PREFIX):] if body.startswith(PREFIX) else body
        for pat in OPENERS:
            m = re.match(pat, after)
            if m:
                fails.append(f"{it['item']}: opens with {m.group(0)!r} — lead with the verdict, "
                             f"not with agreement (reply-conventions.md § Tone)")

        # 4. placeholders — quoted code is exempt, because a reply quoting a real source line is
        #    the most likely body to contain TODO and the poster may not edit it to get past a check.
        # 5. internal labels — quoted code is NOT exempt. posting-mechanics.md §4.5 grants these
        #    the URL exemption and nothing else, and backticking an id is the most natural way to
        #    write one in a reply, so a code-span exemption here would wave through the exact
        #    thing the check exists to stop.
        for pats, skip_code in ((PLACEHOLDERS, True), (labels, False)):
            for tok, at in scan_denylist(body, pats, skip_code=skip_code):
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

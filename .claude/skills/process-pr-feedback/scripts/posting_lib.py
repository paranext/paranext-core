"""Pure decision logic for the P7 posting layer.

Everything here is a total function over its arguments: no I/O, no network, no clock. That is
what makes `test_posting.py` able to pin the guards that stand between an approved batch and a
duplicate or misdirected public comment.

The CLI wrappers (`post.py`, `check.py`, `verify_posted.py`) do the I/O and call in here for
every decision.
"""

import re

KINDS = ("reply", "inline", "issue")

# Required fields per kind, checked before anything indexes them.
REQUIRED = {"reply": ("pr", "comment_id", "body"),
            "inline": ("pr", "path", "line", "side", "anchor_line", "body"),
            "issue": ("pr", "body")}

# A log row is: status, item, pr, kind, comment_id, url, timestamp [, extra]
STATUS, ITEM = 0, 1


def rows_for(rows, item_id):
    """Every log row belonging to one item, in file order."""
    return [r for r in rows if len(r) > ITEM and r[ITEM] == item_id]


def guard_decision(rows, item_id):
    """Decide whether `item_id` may be posted. Returns (allowed, reason).

    The guard reads the item's LAST row, not its whole history. Testing the whole history with
    `any(PENDING) and not any(FAIL)` lets `PENDING -> FAIL -> PENDING(killed)` clear the guard:
    the FAIL satisfies the `not any(FAIL)` clause even though the trailing PENDING is a genuinely
    unknown outcome, and the script posts a second time.
    """
    mine = rows_for(rows, item_id)
    if not mine:
        return True, "no prior rows"
    if any(r[STATUS] == "OK" for r in mine):
        return False, f"already posted -> {mine[-1]}"
    if mine[-1][STATUS] == "PENDING":
        return False, (
            "has an unresolved PENDING row as its most recent entry. A post may already be "
            "live. Check the PR before re-posting, then either complete that row as OK with "
            "the real id, or delete it if nothing landed."
        )
    return True, f"last row is {mine[-1][STATUS]}, outcome known"


def unsettled_pendings(rows):
    """PENDING rows with no later OK/FAIL for the same item — genuinely unknown outcomes.

    Settled-ness is positional, not per-item: a PENDING is spent only when an OK or FAIL appears
    AFTER it. Keying a set on the item id instead retires a trailing PENDING because an earlier
    attempt happened to settle, which hides the one row that means "a comment may be live".
    """
    out = []
    for i, row in enumerate(rows):
        if row[STATUS] != "PENDING":
            continue
        later = [r for r in rows[i + 1:] if r[ITEM] == row[ITEM] and r[STATUS] in ("OK", "FAIL")]
        if not later:
            out.append(row)
    return out


def unresolved_failures(rows):
    """Items whose only outcomes are failures — no OK row anywhere.

    An item that failed and was then re-posted successfully is not a failure. Collecting every
    non-OK row regardless makes the exit code terminal: one transient failure keeps the run at
    PARTIAL forever, so the phase-complete marker is never written and every later `--resume`
    re-enters the push-and-post phase.
    """
    succeeded = {r[ITEM] for r in rows if r[STATUS] == "OK"}
    return [r for r in rows if r[STATUS] == "FAIL" and r[ITEM] not in succeeded]


def code_spans(body):
    """(start, end) spans of fenced blocks and inline code spans."""
    spans = []
    for m in re.finditer(r"```.*?```", body, re.S):
        spans.append(m.span())
    for m in re.finditer(r"`[^`\n]+`", body):
        if not any(s <= m.start() and m.end() <= e for s, e in spans):
            spans.append(m.span())
    return spans


def url_spans(body):
    """(start, end) spans covering URL text only — never markdown link text.

    In `[label](https://x)` the span starts after `](`, so a label sitting in the link text is
    NOT inside a URL and stays deny-listed; that position is the most reviewer-visible place a
    leaked internal id could land. Bare URLs are taken to the next whitespace, so a
    parenthesised URL like `https://en.wikipedia.org/wiki/Foo_(bar)#XXX` is covered whole
    instead of being cut at its first `)`.
    """
    spans = []
    # A markdown link target may itself contain balanced parentheses —
    # `](https://en.wikipedia.org/wiki/Foo_(bar)#XXX)`. A non-greedy `\S*?` stops at the URL's
    # own first `)`, truncating the span; the bare-URL pass below then skips the same URL because
    # its start already sits inside that truncated span, so the tail is left unprotected.
    for m in re.finditer(r"\]\(([^()\s]*(?:\([^()\s]*\)[^()\s]*)*)\)", body):
        spans.append((m.start(1), m.end(1)))
    for m in re.finditer(r"https?://\S+", body):
        if not any(s <= m.start() < e for s, e in spans):
            spans.append(m.span())
    return spans


def scan_denylist(body, patterns, skip_code=True):
    """Deny-list matches that are neither inside a URL nor inside quoted code.

    Quoted code is excluded because a reply that quotes a real source line is the most likely
    body to contain `TODO` or `FIXME`, and the poster is forbidden from editing a body to get
    past a check — so a naive match deadlocks an already-approved batch with no permitted remedy.
    """
    urls = url_spans(body)
    code = code_spans(body) if skip_code else []
    hits = []
    for pat in patterns:
        for m in re.finditer(pat, body):
            if any(s <= m.start() and m.end() <= e for s, e in urls):
                continue
            if any(s <= m.start() and m.end() <= e for s, e in code):
                continue
            hits.append((m.group(0), m.start()))
    return hits


def bad_control_chars(body):
    """Control characters that are genuinely illegal in a reply body.

    TAB is legal — a reply quoting tab-indented code contains it. CR is reported separately so
    the operator is told to normalise line endings rather than being handed a generic failure on
    a drafts file that was merely saved as CRLF.
    """
    illegal = sorted({hex(ord(c)) for c in body if ord(c) < 32 and c not in "\n\t"} - {"0xd"})
    return {"illegal": illegal, "has_cr": "\r" in body, "has_nul": "\x00" in body}


def declared_prs(packet_dir):
    """The PRs this packet is for, from its own directory name.

    A packet is named `<pr>[-<pr>...]-<YYYY-MM-DD>[-<run>]`, so the name is the round's own
    declaration of which PRs it covers — independent of `bodies.json`, which is the artifact being
    checked. Deriving the expectation from `bodies.json` instead would make the check
    self-referential: every item's PR is in that set by construction, so it could never fail.

    The date is matched as a whole `YYYY-MM-DD` trailer rather than segment by segment: a PR
    number is itself four digits, so a per-segment "is this a year?" test matches `2659` and stops
    before reading anything.
    """
    import os
    import re
    name = os.path.basename(os.path.normpath(packet_dir))
    m = re.fullmatch(r"(?P<prs>\d+(?:-\d+)*)-\d{4}-\d{2}-\d{2}(?:-\d+)?", name)
    if not m:
        return set()
    return {int(x) for x in m.group("prs").split("-")}


def missing_fields(item):
    """Fields this item's kind requires and does not have.

    Checked up front rather than by indexing during the checks: a `KeyError` mid-loop aborts the
    dry run, discards every finding already collected, and never prints the `DRY-RUN RESULT` line
    that callers key on.
    """
    kind = item.get("kind")
    if kind not in KINDS:
        return [f"kind={kind!r} (expected one of {', '.join(KINDS)})"]
    return [f for f in REQUIRED[kind] if f not in item]


def added_lines(diff):
    """Line numbers added by `diff`, in the new file's numbering.

    Lives here rather than inline in `verify_anchors.py` so the test exercises the shipped
    parser. A test that re-implements the logic it is testing pins the test file against itself
    and cannot fail when the real parser regresses.
    """
    added, new_ln = set(), None
    for dl in diff.split("\n"):
        h = re.match(r"^@@ -\S+ \+(\d+)(?:,(\d+))? @@", dl)
        if h:
            new_ln = int(h.group(1))
        # `new_ln is None` covers the ---/+++ file headers, which always precede the first @@.
        # Do NOT also skip on startswith("+++"): an added line whose own text begins with "++"
        # renders as "+++…", and skipping it without advancing new_ln shifts every later line
        # number in the file by one. That is reachable from any doc containing a diff snippet.
        elif new_ln is None:
            continue
        elif dl.startswith("+"):
            added.add(new_ln)
            new_ln += 1
        elif dl.startswith(" "):
            new_ln += 1
    return added


def parse_common_args(argv, n_positional):
    """Split argv into positionals and a repo slug, accepting both --repo forms.

    Both `--repo owner/name` and `--repo=owner/name` work. Accepting only the `=` form while the
    usage text advertises the other prints usage for a correct-looking command, and the natural
    next move — dropping the flag — silently falls back to the default repository.
    """
    positional, slug, i = [], "paranext/paranext-core", 0
    while i < len(argv):
        a = argv[i]
        if a == "--repo":
            if i + 1 >= len(argv):
                raise SystemExit("--repo needs an argument (owner/name)")
            slug, i = argv[i + 1], i + 2
            continue
        if a.startswith("--repo="):
            slug, i = a.split("=", 1)[1], i + 1
            continue
        if a.startswith("--"):
            i += 1
            continue
        positional.append(a)
        i += 1
    if len(positional) != n_positional:
        return None, slug
    return positional, slug


# Opener phrases. These are reflexes, not communication: they open a public reply to a colleague
# with agreement or gratitude before the substance, which reads as deference rather than an
# answer. `reply-conventions.md` § Structure asks that the first sentence carry the verdict.
#
# The seam is worth stating: a blanket ban on gratitude is calibrated for in-session replies to
# your own partner, and these bodies are public text to a human colleague. "Concede specifically
# rather than thank reflexively" survives that translation; thanks for a specific thing a reviewer
# did does not.
OPENERS = [r"^\W*You(?:'re| are) absolutely right",
           r"^\W*(?:Great|Good|Excellent|Nice) (?:point|catch|question|call)",
           r"^\W*(?:Thanks|Thank you)\b(?![^.\n]*\bfor (?:the|your) "
           r"(?:trace|repro|measurement|patch|numbers))",
           r"^\W*(?:Absolutely|Exactly)[.,!]",
           r"^\W*I appreciate (?:the|your) (?:feedback|comment|review)\b"]


def opening_reflex(body, prefix):
    """The reflexive opener a body starts with, after the prefix — or None."""
    after = body[len(prefix):] if body.startswith(prefix) else body
    for pat in OPENERS:
        m = re.match(pat, after)
        if m:
            return m.group(0)
    return None


def scan_body(body, placeholders, labels):
    """Every deny-list hit in one body, with the two lists scanned under different rules.

    Placeholders get the quoted-code exemption: a reply quoting a real source line is the most
    likely body to contain `TODO`, and the poster may not edit an approved body to get past a
    check. Internal labels do NOT: `posting-mechanics.md` grants them the URL exemption and
    nothing else, and backticking an id is the conventional way to write one — the very
    formatting the check most needs to catch.

    The split lives here rather than in `check.py` so a test can pin it. A test that passes
    `skip_code=` itself only pins `scan_denylist`'s parameter, not the caller's use of it.
    """
    return (scan_denylist(body, placeholders, skip_code=True)
            + scan_denylist(body, labels, skip_code=False))

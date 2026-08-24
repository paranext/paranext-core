"""Pure decision logic for the P7 posting layer.

Everything here is a total function over its arguments: no I/O, no network, no clock. That is
what makes `test_posting.py` able to pin the guards that stand between an approved batch and a
duplicate or misdirected public comment.

The CLI wrappers (`post.py`, `check.py`, `verify_posted.py`) do the I/O and call in here for
every decision.
"""

import re

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
    for m in re.finditer(r"\]\((\S*?)\)", body):
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

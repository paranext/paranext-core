#!/usr/bin/env python3
"""Tests for the posting layer's decision logic. Run: python3 test_posting.py

Every test here pins a guard that stands between an approved batch and a duplicate or
misdirected public comment under a human's GitHub account. Each one failed against the logic
that shipped before these scripts became files.
"""

import sys

from posting_lib import (
    bad_control_chars,
    guard_decision,
    scan_denylist,
    unresolved_failures,
    unsettled_pendings,
    url_spans,
)

PLACEHOLDERS = [r"\bTODO\b", r"\bTBD\b", r"\bFIXME\b", r"\bXXX\b", r"\bPLACEHOLDER\b",
                r"\bLOREM\b", r"<[A-Z][A-Z_ -]{2,}>", r"\{\{"]


def row(status, item="R5-01", pr="2659", kind="reply", cid="-"):
    return [status, item, pr, kind, cid, "-", "2026-08-24T12:00:00"]


def test_double_post_guard_blocks_trailing_pending_after_a_failure():
    """A killed re-post leaves PENDING -> FAIL -> PENDING; the outcome is unknown, so refuse."""
    rows = [row("PENDING"), row("FAIL"), row("PENDING")]
    allowed, reason = guard_decision(rows, "R5-01")
    assert not allowed, f"guard let a possible double post through: {reason}"
    assert "unresolved PENDING" in reason


def test_double_post_guard_allows_retry_after_a_known_failure():
    """PENDING -> FAIL is a KNOWN outcome: gh reported it, so re-posting is correct."""
    allowed, _ = guard_decision([row("PENDING"), row("FAIL")], "R5-01")
    assert allowed


def test_double_post_guard_refuses_an_item_already_posted():
    allowed, reason = guard_decision([row("PENDING"), row("OK", cid="991")], "R5-01")
    assert not allowed and "already posted" in reason


def test_double_post_guard_ignores_other_items():
    allowed, _ = guard_decision([row("PENDING", item="R5-99")], "R5-01")
    assert allowed


def test_unsettled_pending_survives_an_earlier_settlement():
    """Settled-ness is positional: the FAIL settles the FIRST pending, not the trailing one."""
    rows = [row("PENDING"), row("FAIL"), row("PENDING")]
    left = unsettled_pendings(rows)
    assert len(left) == 1, f"the unknown-outcome row was dropped: {left}"


def test_unsettled_pending_empty_on_a_clean_batch():
    assert unsettled_pendings([row("PENDING"), row("OK", cid="991")]) == []


def test_a_failure_later_re_posted_is_not_an_unresolved_failure():
    """One transient failure must not make the verifier's exit code terminal."""
    rows = [row("PENDING"), row("FAIL"), row("PENDING"), row("OK", cid="991")]
    assert unresolved_failures(rows) == []


def test_a_failure_never_re_posted_is_reported():
    assert len(unresolved_failures([row("PENDING"), row("FAIL")])) == 1


def test_internal_label_in_link_text_is_not_waved_through_by_an_adjacent_link():
    """`[label](url)` puts the label in link TEXT — the most reviewer-visible position."""
    body = "see [the docs](https://ex.com/a)[R5-01](https://ex.com/b) for context"
    hits = scan_denylist(body, [r"\bR5-01\b"])
    assert hits, "an internal label in link text was allowed"


def test_internal_label_genuinely_inside_a_url_is_allowed():
    hits = scan_denylist("see https://ex.com/R5-01/detail for context", [r"\bR5-01\b"])
    assert hits == [], f"a label inside a real URL should be allowed, got {hits}"


def test_parenthesised_url_does_not_truncate_into_a_false_positive():
    """The token must not be cut at the URL's own `)`."""
    body = "background: https://en.wikipedia.org/wiki/Foo_(bar)#XXX explains it"
    assert scan_denylist(body, PLACEHOLDERS) == [], "a parenthesised URL produced a false XXX hit"


def test_placeholder_inside_quoted_code_does_not_deadlock_the_batch():
    """A reply quoting a real source line is the most likely body to contain TODO."""
    body = "🤖 Claude: the marker is:\n\n```csharp\n// exempt (TODO(PT-4210): assess).\n```\n"
    assert scan_denylist(body, PLACEHOLDERS) == [], "quoted repo code hard-FAILed an approved body"


def test_placeholder_in_prose_is_still_caught():
    assert scan_denylist("🤖 Claude: TODO write this reply", PLACEHOLDERS)


def test_inline_code_span_is_also_exempt():
    assert scan_denylist("🤖 Claude: the `TODO(PT-4210)` marker", PLACEHOLDERS) == []


def test_tab_is_a_legal_body_character():
    """A reply quoting tab-indented code must not hard-FAIL with no permitted remedy."""
    assert bad_control_chars("🤖 Claude: here:\n\tindented\n")["illegal"] == []


def test_cr_is_reported_as_normalisation_not_as_a_generic_failure():
    r = bad_control_chars("🤖 Claude: line\r\nnext")
    assert r["has_cr"] and r["illegal"] == []


def test_real_control_characters_are_still_rejected():
    assert bad_control_chars("🤖 Claude: bell\x07here")["illegal"] == ["0x7"]


def test_nul_is_detected():
    assert bad_control_chars("a\x00b")["has_nul"]


def test_url_spans_exclude_markdown_link_text():
    spans = url_spans("[R5-01](https://ex.com/b)")
    assert all(not (s <= 1 and 6 <= e) for s, e in spans)


def _vocab(tmp, internal):
    import os
    os.makedirs(tmp, exist_ok=True)
    with open(os.path.join(tmp, "shared-vocabulary.md"), "w", encoding="utf-8") as f:
        f.write("# v\n## Shared\n1..54 — his numbers\n## Internal\n" + internal + "\n")
    return tmp


def test_schema_shaped_internal_entry_is_rejected_not_silently_escaped():
    """`2659-NN` is a literal that matches no real id — the check would report PASS."""
    import tempfile
    from check import internal_labels
    d = _vocab(tempfile.mkdtemp(), "2659-NN — our packet ids")
    try:
        internal_labels(d)
    except SystemExit as e:
        assert "placeholders, not patterns" in str(e)
    else:
        raise AssertionError("a placeholder entry was accepted")


def test_real_regex_internal_entry_is_used_verbatim():
    import tempfile
    from check import internal_labels
    d = _vocab(tempfile.mkdtemp(), r"2659-\d\d — our packet ids")
    assert internal_labels(d) == [r"2659-\d\d"]


def test_internal_pattern_catches_a_real_id_in_link_text():
    hits = scan_denylist("see [2659-38](https://ex.com/a)[docs](https://ex.com/b)", [r"2659-\d\d"])
    assert hits, "a real packet id in link text was allowed"


def test_missing_vocabulary_file_is_a_hard_stop():
    import tempfile
    from check import internal_labels
    try:
        internal_labels(tempfile.mkdtemp())
    except SystemExit as e:
        assert "is missing" in str(e)
    else:
        raise AssertionError("a missing shared-vocabulary.md did not stop the run")


def _added_lines(diff):
    """The added-line parser from verify_anchors.py, exercised on a synthetic diff."""
    import re
    added, new_ln = set(), None
    for dl in diff.split("\n"):
        h = re.match(r"^@@ -\S+ \+(\d+)(?:,(\d+))? @@", dl)
        if h:
            new_ln = int(h.group(1))
        elif new_ln is None:
            continue
        elif dl.startswith("+"):
            added.add(new_ln)
            new_ln += 1
        elif dl.startswith(" "):
            new_ln += 1
    return added


def test_added_line_beginning_with_plus_plus_does_not_shift_later_line_numbers():
    """An added line whose text starts with `++` renders as `+++` in the diff."""
    diff = "--- a/f\n+++ b/f\n@@ -0,0 +1,3 @@\n+normal\n+++plus-prefixed\n+after\n"
    assert _added_lines(diff) == {1, 2, 3}, f"line numbers shifted: {_added_lines(diff)}"


def main():
    tests = [(n, f) for n, f in sorted(globals().items())
             if n.startswith("test_") and callable(f)]
    failed = []
    for name, fn in tests:
        try:
            fn()
            print(f"  PASS  {name}")
        except AssertionError as e:
            failed.append((name, e))
            print(f"  FAIL  {name}: {e}")
    print(f"\n{len(tests) - len(failed)}/{len(tests)} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

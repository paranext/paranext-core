#!/usr/bin/env python3
"""Tests for the posting layer's decision logic. Run: python3 test_posting.py

Every test here pins a guard that stands between an approved batch and a duplicate or
misdirected public comment under a human's GitHub account. Each one failed against the logic
that shipped before these scripts became files.
"""

import sys

from posting_lib import (
    added_lines,
    opening_reflex,
    scan_body,
    bad_control_chars,
    declared_prs,
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


def _labels(entry):
    import tempfile
    from check import internal_labels
    return internal_labels(_vocab(tempfile.mkdtemp(), entry + "\n" + "`2659-\\d\\d` — our ids"))


def _stops(entry):
    from check import internal_labels
    import tempfile
    try:
        internal_labels(_vocab(tempfile.mkdtemp(), entry))
    except SystemExit as e:
        return str(e)
    return None


def test_a_backticked_pattern_is_transcribed_verbatim():
    import tempfile
    from check import internal_labels
    assert internal_labels(_vocab(tempfile.mkdtemp(), "`2659-\\d\\d` — ids")) == [r"2659-\d\d"]


def test_a_backticked_pattern_needs_no_prose_half():
    import tempfile
    from check import internal_labels
    assert internal_labels(_vocab(tempfile.mkdtemp(), "`2659-\\d\\d`")) == [r"2659-\d\d"]


def test_a_backticked_entry_may_be_a_markdown_bullet():
    assert _labels("- `\\b55\\b` — an id") == [r"\b55\b", r"2659-\d\d"]


def test_schema_shaped_entry_is_rejected_not_silently_escaped():
    """`2659-NN` is a literal matching the characters NN, so it would test nothing."""
    msg = _stops("`2659-NN` — our packet ids")
    assert msg and "schema placeholder" in msg


def test_an_invalid_regex_entry_stops(): 
    msg = _stops("`[unclosed` — a broken pattern")
    assert msg and "not a valid regex" in msg


def test_placeholder_rejector_accepts_a_real_regex_containing_nn():
    assert _labels("`\\bannotation-\\d+\\b` — contains nn but is a real pattern") == [
        r"\bannotation-\d+\b", r"2659-\d\d"]


def test_prose_openers_are_never_transcribed_whatever_their_shape():
    """Three rounds of inferring intent from shape got this wrong in both directions.

    `Note`/`NOTE` were stopped on with a remedy that would deny-list an everyday word; `e.g.`
    and `P2` were transcribed as live regexes that would hard-FAIL any body containing them.
    None of them is backticked, so none is an entry.
    """
    for prose in ("Note — the reviewer never saw these ids.",
                  "NOTE — the reviewer never saw these ids.",
                  "e.g. — an example opener here.",
                  "P2 — writes this file.",
                  "The reviewer never saw these ids.",
                  "`check.py` reads this section and uses each token"):
        assert _labels(prose) == [r"2659-\d\d"], f"{prose!r} was treated as an entry"


def test_prose_openers_do_not_trip_the_loud_warning():
    """A warning that fires on prose the classifier deliberately skips stops being a signal."""
    import io
    import contextlib
    for prose in ("NOTE — the reviewer never saw these ids.", "e.g. — an example opener.",
                  "The reviewer never saw these ids."):
        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            _labels(prose)
        assert "!!" not in buf.getvalue(), f"{prose!r} tripped the loud warning"


def test_an_unbackticked_id_shaped_line_is_reported_not_silently_dropped(capsys=None):
    """Dropping a mis-written entry silently is how the deny-list ends up testing nothing."""
    import io
    import contextlib
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        _labels("R5-01 — an inventory id")
    assert "not a single backticked pattern" in buf.getvalue()


def test_missing_vocabulary_file_is_a_hard_stop():
    import tempfile
    from check import internal_labels
    try:
        internal_labels(tempfile.mkdtemp())
    except SystemExit as e:
        assert "is missing" in str(e)
    else:
        raise AssertionError("a missing shared-vocabulary.md did not stop the run")


def test_declared_prs_reads_the_round_from_the_packet_name():
    assert declared_prs("/x/.feedback-packets/2659-2026-08-24") == {2659}
    assert declared_prs("/x/.feedback-packets/2649-2651-2026-08-12") == {2649, 2651}
    assert declared_prs("/x/.feedback-packets/2659-2026-08-24-2") == {2659}


def test_declared_prs_does_not_swallow_the_date_or_run_suffix():
    """A date segment must not be read as a PR number."""
    got = declared_prs("/x/.feedback-packets/2659-2026-08-24-2")
    assert 2026 not in got and 8 not in got and 24 not in got, got


PREFIX = "\U0001f916 Claude: "


def _opens_badly(body):
    return opening_reflex(body, PREFIX) is not None


def test_reflexive_opener_is_caught_after_the_prefix():
    assert _opens_badly("\U0001f916 Claude: You're absolutely right, the guard is wrong.")
    assert _opens_badly("\U0001f916 Claude: Great catch — reproduced.")
    assert _opens_badly("\U0001f916 Claude: Thanks! Fixed.")


def test_a_verdict_first_reply_passes():
    assert not _opens_badly("\U0001f916 Claude: Confirmed, and reproduced at the PR head.")
    assert not _opens_badly("\U0001f916 Claude: Not reproduced — the stray check catches it.")


def test_thanks_for_a_specific_thing_is_not_a_reflex():
    """The ban is on reflexive gratitude, not on acknowledging real work."""
    assert not _opens_badly("\U0001f916 Claude: Thanks for the repro — it saved a measurement.")


def test_added_line_beginning_with_plus_plus_does_not_shift_later_line_numbers():
    """An added line whose text starts with `++` renders as `+++` in the diff."""
    diff = "--- a/f\n+++ b/f\n@@ -0,0 +1,3 @@\n+normal\n+++plus-prefixed\n+after\n"
    assert added_lines(diff) == {1, 2, 3}, f"line numbers shifted: {added_lines(diff)}"


def test_unrecognised_kind_is_reported_not_treated_as_an_issue_comment():
    """A typo in `kind` must not turn a threaded reply into a top-level PR comment."""
    from posting_lib import missing_fields
    gaps = missing_fields({"item": "X", "kind": "repy", "pr": 2659, "body": "b"})
    assert gaps and "repy" in gaps[0]


def test_missing_required_field_is_a_finding_not_a_traceback():
    from posting_lib import missing_fields
    assert missing_fields({"item": "X", "kind": "inline", "pr": 1, "body": "b"}) == [
        "path", "line", "side", "anchor_line"]
    assert missing_fields({"item": "X", "kind": "reply", "pr": 1, "comment_id": 2, "body": "b"}) == []


def test_internal_label_in_backticks_is_still_caught():
    """The SPLIT is what matters: labels never get the quoted-code exemption placeholders get.

    Exercises `scan_body`, the function check.py actually calls, so reverting the split turns
    this red. Passing `skip_code=` here instead would only pin `scan_denylist`'s parameter.
    """
    assert scan_body("see `2659-38` here", PLACEHOLDERS, [r"2659-\d\d"])
    assert scan_body("```\n2659-38\n```", PLACEHOLDERS, [r"2659-\d\d"])


def test_placeholder_in_quoted_code_is_still_exempt_through_the_same_call():
    """The other half of the split — same function, opposite rule."""
    assert scan_body("```csharp\n// TODO(PT-4210): assess\n```", PLACEHOLDERS, [r"2659-\d\d"]) == []


def test_markdown_link_with_parenthesised_url_does_not_false_positive():
    body = "see [wiki](https://en.wikipedia.org/wiki/Foo_(bar)#XXX) ok"
    assert scan_body(body, PLACEHOLDERS, []) == [], "a balanced-paren link target was truncated"





def test_preamble_before_the_first_item_is_not_stray_content():
    import extract_bodies
    text = ("# Drafts\n\nnotes here\n\n## item: X\nkind: issue\npr: 1\n"
            "--- body ---\nb\n--- end ---\n")
    assert [i["item"] for i in extract_bodies.parse(text)] == ["X"]


def test_repo_flag_accepts_both_forms():
    from posting_lib import parse_common_args
    assert parse_common_args(["/p", "--repo", "a/b"], 1) == (["/p"], "a/b")
    assert parse_common_args(["/p", "--repo=a/b"], 1) == (["/p"], "a/b")
    assert parse_common_args(["/p"], 1)[1] == "paranext/paranext-core"


def test_a_body_line_equal_to_a_sentinel_is_an_error_not_a_silent_truncation():
    import extract_bodies
    txt = ("## item: X\nkind: issue\npr: 2659\n--- body ---\nline one\n"
           "--- end ---\nline two MUST NOT BE DISCARDED\n--- end ---\n")
    try:
        extract_bodies.parse(txt)
    except SystemExit as e:
        assert "stray content" in str(e)
    else:
        raise AssertionError("the body truncated silently")


def test_short_log_rows_never_crash_a_row_walker():
    """A kill truncates a row mid-write, which is exactly when these functions are consulted."""
    shapes = [[["PENDING"], ["OK", "X", "1", "r", "9", "u", "t"]],
              [["OK", "X", "1"]],
              [[""], ["PENDING", "X", "1", "r", "-", "-", "t"]]]
    for rows in shapes:
        unsettled_pendings(rows)
        unresolved_failures(rows)
        guard_decision(rows, "X")


def test_a_truncated_pending_is_still_reported_not_swallowed():
    rows = [["PENDING"], ["OK", "X", "1", "r", "9", "u", "t"]]
    assert len(unsettled_pendings(rows)) == 1, "the unknown-outcome row was dropped"


def test_report_lines_renders_a_truncated_row_without_crashing():
    """Runs the CONSUMER, not just the row walkers that feed it.

    `verify_posted.py` prints exactly what `report_lines` returns, so this covers all of its
    report loops at once. A test that calls `describe_row` directly leaves those loops
    unexercised, which is how re-open-coding `r[1]` at a print site went unnoticed twice.
    """
    from posting_lib import report_lines
    rows = [["PENDING"], ["FAIL", "R5-07", "2659", "reply", "-", "-", "t"]]
    lines = report_lines(unsettled_pendings(rows), unresolved_failures(rows))
    assert any("<truncated row>" in ln for ln in lines), lines
    assert any("R5-07" in ln for ln in lines), lines
    assert any("UNKNOWN OUTCOME" in ln for ln in lines), lines


def test_report_lines_is_empty_for_a_clean_log():
    from posting_lib import report_lines
    rows = [["PENDING", "X", "1", "r", "-", "-", "t"], ["OK", "X", "1", "r", "9", "u", "t"]]
    assert report_lines(unsettled_pendings(rows), unresolved_failures(rows)) == []


def test_describe_row_names_a_truncated_row_without_indexing_past_it():
    from posting_lib import describe_row
    assert "<truncated row>" in describe_row(["PENDING"])
    assert describe_row(["OK", "R5-01", "1", "r", "9", "u", "t"]).startswith("R5-01")





def test_no_test_or_helper_is_defined_twice():
    """A duplicate def silently shadows the earlier one, and the shadowed tests still "pass".

    That is how a stale non-backticked `_labels` helper kept four vocabulary tests exercising the
    old convention after the new one shipped.
    """
    import re
    src = open(__file__, encoding="utf-8").read()
    names = re.findall(r"^def (\w+)\(", src, re.M)
    dupes = sorted({n for n in names if names.count(n) > 1})
    assert not dupes, f"duplicate top-level definitions shadow each other: {dupes}"


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
        except (Exception, SystemExit) as e:  # noqa: BLE001 - a crash is a failure
            # SystemExit alongside Exception: every STOP in these scripts is a `sys.exit`, and
            # SystemExit does not derive from Exception, so catching only Exception left the most
            # likely crash - an unexpected STOP - ending the run with no tally. Not BaseException,
            # which would swallow KeyboardInterrupt and make Ctrl-C take one press per test.
            failed.append((name, e))
            print(f"  ERROR {name}: {type(e).__name__}: {e}")
    print(f"\n{len(tests) - len(failed)}/{len(tests)} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

# Posting mechanics

Used by **P7 — Publish**, and only after a G2 approval that names the batch being posted.
Replies appear under the user's name; there is no such thing as a low-stakes accidental post.

> *Provenance: the session-memory reference `post-threaded-pr-review-replies`, plus the working
> scripts from the 2026-08-07 and 2026-08-10 posting runs (11 bodies across three PRs, extract →
> dry-run → sequential post → verify, zero strays and zero misses).*

---

## 1. Pick the right endpoint

| Where the feedback lives | How to reply | Endpoint |
|---|---|---|
| Inline review comment (has a comment id) | Threaded reply, nests under the reviewer | `POST repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies` |
| New question anchored at a code site | New inline review comment | `POST repos/{owner}/{repo}/pulls/{pr}/comments` with `commit_id`, `path`, `line`, `side` |
| Top-level review body | Issue comment — review bodies have **no** reply endpoint | `POST repos/{owner}/{repo}/issues/{pr}/comments` |
| Reviewable-native "no related file" discussion | Issue comment — these are not GitHub inline comments and have no reply endpoint | `POST repos/{owner}/{repo}/issues/{pr}/comments` |

Get inline comment ids from `gh api repos/{owner}/{repo}/pulls/{pr}/comments --paginate`. An id
copied from an older document may be stale — re-derive it before posting.

The `{id}` in the replies endpoint must be the thread's **top-level** comment id — GitHub
rejects replies to replies ("This must be the ID of a top-level review comment"). A reviewer
comment that is itself a reply (non-null `in_reply_to_id`) names its thread root in that very
field: reply to the root, never to the reply. This is the routine shape whenever a reviewer
answers inside a thread we opened, and the id resolves, matches the PR, and carries the right
author — every plausibility check passes, and the POST fails. The dry-run check in §4 tests it
mechanically.

## 2. Never shell-interpolate a body

Reply bodies are backtick-, pipe-, emoji- and arrow-heavy. `gh api --body "$VAR"` and any `sed`
whose delimiter appears in the content will corrupt them silently.

**The rule: drive from Python, `json.dumps` the body, pipe it to `gh api --input -`.** JSON on
stdin escapes everything, once, correctly.

Two related traps:

- Bash cannot hold a NUL in a variable, so `grep -c $'\x00'` collapses to an empty pattern and
  false-reports "NUL found" on every file. Check for NUL in Python (`body.count("\x00")`).
- For any `gh` mutation driven from the shell instead, use `--body-file`, never `--body "$VAR"`.

## 3. Extract bodies to JSON

`extract_bodies.py` parses the drafts file into a list of items and writes `bodies.json` into the
packet directory. The grammar it parses is specified under *The scripts* below — it is a grammar
rather than an instruction to "parse the drafts file" because a body containing fenced code, a
table or a stray `---` will otherwise truncate at the first delimiter that looks plausible.
Each item carries:

| Field | For | Meaning |
|---|---|---|
| `item` | all | the internal item id — used by the log and the checks, never posted |
| `kind` | all | `reply` (into an existing thread) · `inline` (new anchored comment) · `issue` |
| `pr` | all | the PR the item posts to |
| `body` | all | the exact text that will post |
| `comment_id` | `reply` | the **thread-root** inline comment id being replied to (§1 — the endpoint takes no other) |
| `answers_id` | `reply` | the comment the draft actually answers — the reviewer's own, from P0's per-item record. Often the root itself; a **nested reply** whenever the reviewer answered inside a thread we opened |
| `updated_at` | `reply` | the answered comment's `updated_at` as P0 recorded it, so the dry-run can detect an edit made after collection |
| `path`, `line`, `side` | `inline` | the anchor |
| `anchor_line` | `inline` | the anchor line's **content** as the draft quotes it, so the anchor verification in `pr-thread-conversion.md` can prove the line still says what the draft assumed |

Extract rather than retype. The extraction step is also what makes the dry-run checks possible —
they run over the exact bytes that will be posted, not over an approximation of them. `check.py`
then requires each extracted body to appear **verbatim** in the drafts file, which is what ties
`bodies.json` back to the text G2 actually approved.

## 4. Dry-run checks — any FAIL means stop, do not post

Run every check over the extracted bodies:

1. **Counts and id set.** Total, and per kind. Compare against the expected set explicitly, and
   assert that items deliberately *not* being posted are absent. Assert the **list length** too,
   not just the set: the poster keys items by id, so a duplicated id silently collapses and one
   approved body never ships while every set comparison still passes.
2. **Prefix.** Every body starts with `🤖 Claude: ` and contains it **exactly once**.
3. **NUL and control characters.** No NULs; no control characters other than newline.
4. **Placeholders.** No `TODO`, `TBD`, `FIXME`, `XXX`, `PLACEHOLDER`, `LOREM`, `<ALLCAPS>`
   template slots, or `{{` mustache slots.
5. **Internal labels.** No label the reviewer has never seen. This one is **configuration, not a
   constant**: an id the reviewer assigned themselves is shared vocabulary and belongs in the
   body, while an id that exists only in our packet does not (see `reply-conventions.md` rule 6).
   The configuration is the **Internal** list in the packet's `shared-vocabulary.md`, which **P2**
   writes — read it, do not re-derive the distinction here, and do not edit it. If that file is
   missing, **stop and say so**: a deny-list assembled at posting time tests only the labels
   whoever assembled it happened to think of, and the poster is the one role forbidden from
   touching bodies. Transcribe its Internal entries into `INTERNAL_LABELS` below as regexes; write
   them in `shared-vocabulary.md` in a form that transcribes cleanly (a literal token or an obvious
   pattern per line, prose after an em-dash), because nothing parses that file automatically.
   Allow a match only when **the
   match itself** sits inside a URL — not merely inside a token that contains one. Testing the
   whole token waves through `[<label>](https://…)`, where the label is the link *text*: the most
   reviewer-visible position in the body, and exactly what gets linked. Print what was allowed so
   it can be eyeballed.
6. **Targets resolve.** For a new inline comment: `side` as intended, `line > 0`, and the item's
   PR matching the mapping the packet declares. For a reply: the `comment_id` must still exist on
   that PR — fetch it and check its PR, its author, and its `path` against the thread the draft
   means to answer. Nothing downstream catches a wrong-but-valid id: the post succeeds, so the
   id-set verification in §7 reports PASS while the reply sits under an unrelated reviewer's
   comment, under the user's name. One more fact from that same fetch: its `in_reply_to_id`
   must be null — non-null means the target is itself a reply, which the replies endpoint
   rejects, and the thread root to use is the value in that field (§1). The edit check reads a
   **different** comment: fetch `answers_id` — the reviewer's own comment, which in a nested
   thread is not the POST target — and require its `updated_at` to be no later than the one P0
   recorded. Later means the reviewer edited the comment after collection, so the draft may
   answer text that no longer exists: stop and re-read it; a changed ask goes back through
   triage, not straight to the POST. Watching the root instead leaves the check blind in
   exactly the nested-thread shape §1 exists for — there the root is routinely **our own**
   comment, whose timestamp says nothing about the reviewer's words.

6. **Opener phrases.** No body opens with reflexive agreement or gratitude — "You're absolutely
   right", "Great point", "Thanks!". `reply-conventions.md` § Tone asks for the verdict in the
   first sentence, and this is where that is enforced: at the point a body goes public under the
   user's name, rather than depending on whether the drafter had a convention loaded.

   The rule needs its seam stated, because it is borrowed from advice written for a different
   audience. A blanket ban on gratitude is calibrated for in-session replies to your own partner;
   these bodies are public text to a human colleague. What survives the translation is *concede
   specifically rather than thank reflexively* — so "Thanks for the repro, it saved a measurement"
   is not what this catches, and "Thanks!" as an opener is.

Print a single `DRY-RUN RESULT: PASS/FAIL` line and exit non-zero on FAIL.

## 5. Re-derive every head SHA at posting time

New inline comments need `commit_id`. Stacks get force-pushed, sometimes minutes earlier.

```bash
gh pr view <n> --json headRefOid --jq .headRefOid
```

Do this **at posting time**, not from a value recorded during drafting, and verify each anchor
still resolves — see `pr-thread-conversion.md` for the anchor verification script.

## 6. Post sequentially, stop on first failure, never retry

One item per invocation. No loops that continue past an error, and no automatic retries — a
retry after an ambiguous failure is how a comment gets double-posted.

The log is what makes that rule enforceable, so it is **write-ahead**: a `PENDING` row goes in
*before* the call and is settled to `OK` or `FAIL` after it. Three states, three meanings:

| Row | Outcome | On a later invocation |
|---|---|---|
| `OK` | Posted, id recorded | Refuse — already sent |
| `FAIL` | `gh` reported failure | Proceed only deliberately, after `verify_posted.py` shows a clean stray list |
| `PENDING` with neither beside it | **Unknown** — killed between the call and the log write | Refuse, and make a human read the PR |

Without the write-ahead row that third state leaves *no row at all*, and since `verify_posted.py`
derives the PRs it queries from the log, a PR whose only item died in that window is never read
back — which is precisely where an unnoticed stray becomes a double post.

Walk order: group by PR, threads before that PR's index comment, so the reviewer sees a coherent
sequence in their notifications.

## 7. Verify what actually landed

Read the live API back and compare against the log:

- Fetch `pulls/{pr}/comments` and `issues/{pr}/comments`, filter to the token user
  (`gh api user --jq .login`) and to the posting window (`created_at >= <window start>`).
- The id sets must match the log **exactly** — report both strays (live but not logged) and
  misses (logged but not live).
- For new inline comments, assert `subject_type == "line"`. A comment that silently degraded to
  a file-level comment is a different artifact than the one that was approved.
- For replies, assert `in_reply_to_id == comment_id`. The id set alone cannot tell you a reply
  landed in the right thread — only that *a* comment was created.

Report the counts and the verdict. "Posted successfully" without a read-back is not a result.

---

## The scripts

The posting layer is **five executable files**, not a template to retype:

```
<skill-dir>/scripts/
  posting_lib.py       every guard decision, as pure functions
  extract_bodies.py    07-replies.md -> bodies.json          (step 3)
  check.py             the dry-run checks                     (step 4)
  post.py              post ONE item                          (step 6)
  verify_posted.py     read the live state back               (step 7)
  verify_anchors.py    anchors still resolve and are added lines
  test_posting.py      the guards' tests — run this first
```

They are files because the checks above are load-bearing and a transcript cannot be tested. Every
one of them takes the **packet directory as its first argument** — never a module constant. The
working directory resets between calls, so a relative packet path either fails outright or, worse,
silently reads a different run's `08-posting-log.txt`, which is what the double-post guard depends
on being correct.

```bash
SKILL=<skill-dir>/scripts
PACKET=/abs/path/to/repo/.feedback-packets/<pr>-<date>

python3 "$SKILL/test_posting.py"                       # guards pass before you trust them
python3 "$SKILL/extract_bodies.py" "$PACKET"
python3 "$SKILL/check.py"          "$PACKET"           # any FAIL => STOP
python3 "$SKILL/verify_anchors.py" "$PACKET" <repo-root>
python3 "$SKILL/post.py"           "$PACKET" <ITEM_ID> # one item, no retries
python3 "$SKILL/verify_posted.py"  "$PACKET" <window-start-iso>
```

`post.py` reads `commit_id` values from `<packet>/heads.json` (`{"2659": "<40-char-sha>"}`),
written at posting time per step 5; `verify_anchors.py` also reads `<packet>/bases.json`. A PR
missing from either file is a named error, not a `KeyError` traceback.

### The drafts grammar

Step 3 says "extract rather than retype", which needs a grammar the extractor can be held to —
reply bodies are backtick-, pipe-, emoji- and arrow-heavy, and any delimiter that can occur inside
a body will eventually truncate one. `07-replies.md` (the assembled `07-replies.d/`) is:

```
## item: <id>
kind: reply | inline | issue
pr: <n>
comment_id: <thread-root id>          # reply
answers_id: <the reviewer's own comment>   # reply, optional
updated_at: <iso as P0 recorded it>   # reply, optional
path: / line: / side: / anchor_line:  # inline
--- body ---
🤖 Claude: …
--- end ---
```

The body delimiters are line-anchored sentinels, so nothing inside a body terminates it early. A
`## item:` that arrives before `--- end ---`, or a file ending mid-body, is an error rather than a
silently truncated reply.

**`check.py` binds `bodies.json` back to the approved text**: every extracted body must appear
**verbatim** in `07-replies.md`, and the expected id set is read from that same file rather than
hand-typed. An id set alone cannot catch a truncated body, and an expectation typed from the
artifact under test cannot catch anything at all.

### What `shared-vocabulary.md`'s Internal list must look like

`check.py` transcribes each Internal line's leading token and uses it **verbatim as a regex**.
Write real patterns, one per line, prose after an em-dash:

```
2659-\d\d — our packet item ids
\bD[1-7]\b — our G1 decision numbers
```

An entry is `<pattern> — <prose>` and a pattern contains **no whitespace**; anything else in the
section is treated as prose, skipped, and printed so a real entry written in the wrong shape is
visible rather than dropped. Schema-shaped entries (`2659-NN`, `R5-XX`, anything with `<…>` or
`..`) are **rejected with a hard stop**. `2659-NN` is a literal: it matches the characters `NN`, so every real id passes the
check and the dry run reports PASS having tested nothing. That failure is invisible from the
output, which is why it is made loud at the point of transcription.

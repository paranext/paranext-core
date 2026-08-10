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

Parse the drafts file into a list of items and write it to `bodies.json` in the packet
directory. Each item carries:

| Field | For | Meaning |
|---|---|---|
| `item` | all | the internal item id — used by the log and the checks, never posted |
| `kind` | all | `reply` (into an existing thread) · `inline` (new anchored comment) · `issue` |
| `pr` | all | the PR the item posts to |
| `body` | all | the exact text that will post |
| `comment_id` | `reply` | the inline comment id being replied to |
| `path`, `line`, `side` | `inline` | the anchor |
| `anchor_line` | `inline` | the anchor line's **content** as the draft quotes it, so the anchor verification in `pr-thread-conversion.md` can prove the line still says what the draft assumed |

Extract rather than retype. The extraction step is also what makes the dry-run checks possible —
they run over the exact bytes that will be posted, not over an approximation of them.

## 4. Dry-run checks — any FAIL means stop, do not post

Run every check over the extracted bodies:

1. **Counts and id set.** Total, and per kind. Compare against the expected set explicitly, and
   assert that items deliberately *not* being posted are absent.
2. **Prefix.** Every body starts with `🤖 Claude: ` and contains it **exactly once**.
3. **NUL and control characters.** No NULs; no control characters other than newline.
4. **Placeholders.** No `TODO`, `TBD`, `FIXME`, `XXX`, `PLACEHOLDER`, `LOREM`, `<ALLCAPS>`
   template slots, or `{{` mustache slots.
5. **Internal labels.** No internal item ids or working labels leaking into public text — the
   reviewer never saw `FIX-B` or `R4-09`. Allow them only inside a URL token, and print what was
   allowed so it can be eyeballed.
6. **Anchor sanity** (new inline comments only). `side` as intended, `line > 0`, and the item's
   PR matching the mapping the packet declares.

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
retry after an ambiguous failure is how a comment gets double-posted. Append to a log after
every post, and refuse to post an item the log already records as `OK`.

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

Report the counts and the verdict. "Posted successfully" without a read-back is not a result.

---

## Script template

Three scripts, one packet directory. Written for
`.feedback-packets/<pr>-<date>/`; adjust `PACKET` and the repo slug.

```python
#!/usr/bin/env python3
"""post.py — post ONE item. Usage: post.py <ITEM_ID>

No retries. Refuses to post an item already recorded as posted in the log.
Bodies are piped as JSON into `gh api --input -` — never shell-interpolated.
"""
import json, os, subprocess, sys
from datetime import datetime

PACKET = ".feedback-packets/<pr>-<date>"
BODIES = os.path.join(PACKET, "bodies.json")
LOG = os.path.join(PACKET, "08-posting-log.txt")
SLUG = "paranext/paranext-core"

# Heads re-derived at posting time: gh pr view <n> --json headRefOid --jq .headRefOid
HEADS = {2649: "<full-40-char-sha>"}

item_id = sys.argv[1]
items = {i["item"]: i for i in json.load(open(BODIES, encoding="utf-8"))}
if item_id not in items:
    sys.exit(f"unknown item {item_id}")
it = items[item_id]

# --- double-post guard: the log is the source of truth on what already went out ---
if os.path.exists(LOG):
    for ln in open(LOG, encoding="utf-8"):
        if ln.startswith(f"OK\t{item_id}\t"):
            sys.exit(f"REFUSING: {item_id} already posted -> {ln.strip()}")

# --- build the payload for this item's kind ---
if it["kind"] == "reply":            # threaded reply inside an existing inline thread
    endpoint = f"repos/{SLUG}/pulls/{it['pr']}/comments/{it['comment_id']}/replies"
    payload = {"body": it["body"]}
elif it["kind"] == "inline":         # NEW inline review comment anchored at a code site
    endpoint = f"repos/{SLUG}/pulls/{it['pr']}/comments"
    payload = {"body": it["body"], "commit_id": HEADS[it["pr"]],
               "path": it["path"], "line": it["line"], "side": it["side"]}
else:                                # issue comment on the PR
    endpoint = f"repos/{SLUG}/issues/{it['pr']}/comments"
    payload = {"body": it["body"]}

print(f"POST {endpoint}\n  item={item_id} kind={it['kind']} bodylen={len(it['body'])}")

proc = subprocess.run(["gh", "api", "--method", "POST", endpoint, "--input", "-"],
                      input=json.dumps(payload), capture_output=True, text=True)

ts = datetime.now().isoformat(timespec="seconds")
if proc.returncode != 0:
    # Log the failure, show the error, and STOP. A retry here risks a double post.
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(f"FAIL\t{item_id}\t{it['pr']}\t{it['kind']}\t-\t-\t{ts}\trc={proc.returncode}\n")
    print("STDERR:", proc.stderr[:2000])
    sys.exit(f"FAILED posting {item_id} (rc={proc.returncode}) - STOPPING, no retry")

resp = json.loads(proc.stdout)
with open(LOG, "a", encoding="utf-8") as f:
    f.write(f"OK\t{item_id}\t{it['pr']}\t{it['kind']}\t{resp['id']}\t{resp['html_url']}\t{ts}\n")
print(f"  -> id={resp['id']}\n  -> {resp['html_url']}")
# For new inline comments, echo what GitHub actually anchored — a silent downgrade to a
# file-level comment shows up here as subject_type != "line".
if it["kind"] == "inline":
    print(f"  -> path={resp.get('path')} line={resp.get('line')} "
          f"side={resp.get('side')} subject_type={resp.get('subject_type')}")
```

```python
#!/usr/bin/env python3
"""check.py — dry-run safety checks over the extracted bodies. Any FAIL => STOP."""
import json, re, sys

items = json.load(open(".feedback-packets/<pr>-<date>/bodies.json", encoding="utf-8"))
fails = []

# 1. counts and id set — state the expectation explicitly so a silent extraction miss fails here
EXPECTED_IDS = {"R5-01", "R5-02"}          # <- fill in from the drafts file
got = {i["item"] for i in items}
if got != EXPECTED_IDS:
    fails.append(f"id set mismatch: missing={EXPECTED_IDS - got} extra={got - EXPECTED_IDS}")
print(f"[count] total={len(items)} ids={sorted(got)}")

# 2. prefix — exactly once, at the very start
PREFIX = "\U0001f916 Claude: "
for it in items:
    if not it["body"].startswith(PREFIX):
        fails.append(f"{it['item']}: missing prefix; starts {it['body'][:40]!r}")
    if it["body"].count("\U0001f916 Claude:") != 1:
        fails.append(f"{it['item']}: prefix appears more than once")

# 3. NUL / control chars — checked in Python because bash cannot hold a NUL in a variable
for it in items:
    if it["body"].count("\x00"):
        fails.append(f"{it['item']}: NUL bytes")
    ctrl = [hex(ord(c)) for c in it["body"] if ord(c) < 32 and c != "\n"]
    if ctrl:
        fails.append(f"{it['item']}: control chars {ctrl[:5]}")

# 4 + 5. placeholders and internal labels that the reviewer has never seen
PATTERNS = [r"\bTODO\b", r"\bTBD\b", r"\bFIXME\b", r"\bXXX\b", r"\bPLACEHOLDER\b",
            r"\bLOREM\b", r"<[A-Z][A-Z_ -]{2,}>", r"\{\{",
            r"\bFIX-[A-Z]\b", r"\bR\d+-\d+\b"]
for it in items:
    for pat in PATTERNS:
        for m in re.finditer(pat, it["body"]):
            # allow an internal-looking token only inside a URL
            s = it["body"].rfind(" ", 0, m.start()) + 1
            e = it["body"].find(" ", m.end())
            tok = it["body"][s: e if e != -1 else len(it["body"])]
            if "http" in tok:
                print(f"    NOTE {it['item']}: {m.group(0)!r} inside URL, allowed")
                continue
            ctx = it["body"][max(0, m.start() - 50): m.end() + 50].replace("\n", " | ")
            fails.append(f"{it['item']}: {m.group(0)!r} -> ...{ctx}...")

# 6. anchor sanity for new inline comments
for it in items:
    if it.get("kind") == "inline" and (it["line"] <= 0 or it["side"] not in ("RIGHT", "LEFT")):
        fails.append(f"{it['item']}: bad anchor {it['path']}:{it['line']} side={it['side']}")

print()
if fails:
    print("DRY-RUN RESULT: FAIL")
    for f_ in fails:
        print("  - " + f_)
    sys.exit(1)
print(f"DRY-RUN RESULT: PASS - all {len(items)} bodies clean")
```

```python
#!/usr/bin/env python3
"""verify_posted.py — live state must match the log exactly: no strays, no misses."""
import json, subprocess, sys
from collections import defaultdict

PACKET = ".feedback-packets/<pr>-<date>"
LOG = f"{PACKET}/08-posting-log.txt"
SLUG = "paranext/paranext-core"
PRS = [2649]
WINDOW_START = "2026-08-10T15:00:00Z"     # just before the first POST of this batch


def gh(endpoint):
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


who = subprocess.run(["gh", "api", "user", "--jq", ".login"],
                     capture_output=True, text=True, check=True).stdout.strip()

logged = defaultdict(lambda: {"review": set(), "issue": set()})
rows = 0
for ln in open(LOG, encoding="utf-8"):
    status, item, pr, kind, cid = ln.rstrip("\n").split("\t")[:5]
    if status != "OK":
        sys.exit(f"LOG HAS NON-OK ROW: {ln.strip()}")
    logged[int(pr)]["issue" if kind == "issue" else "review"].add(int(cid))
    rows += 1
print(f"token user: {who} · log rows: {rows}")

fails = []
for pr in PRS:
    rc = {c["id"] for c in gh(f"repos/{SLUG}/pulls/{pr}/comments")
          if c["user"]["login"] == who and c["created_at"] >= WINDOW_START}
    ic = {c["id"] for c in gh(f"repos/{SLUG}/issues/{pr}/comments")
          if c["user"]["login"] == who and c["created_at"] >= WINDOW_START}
    print(f"== PR #{pr}: review={len(rc)} (log {len(logged[pr]['review'])}) "
          f"issue={len(ic)} (log {len(logged[pr]['issue'])})")
    if rc != logged[pr]["review"]:
        fails.append(f"#{pr} review: strays={sorted(rc - logged[pr]['review'])} "
                     f"missing={sorted(logged[pr]['review'] - rc)}")
    if ic != logged[pr]["issue"]:
        fails.append(f"#{pr} issue: strays={sorted(ic - logged[pr]['issue'])} "
                     f"missing={sorted(logged[pr]['issue'] - ic)}")

if fails:
    print("POST-VERIFY: FAIL")
    for f_ in fails:
        print("  - " + f_)
    sys.exit(1)
print("POST-VERIFY: PASS - live state matches the log exactly")
```

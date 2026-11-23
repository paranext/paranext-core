# Triage PR Feedback

Triage PR feedback: **$ARGUMENTS**

## Overview

This command triages PR review feedback into a structured, actionable **triage brief**. It fetches the inline review comments, conversation-level comments, and review-thread metadata for a single PR, filters out already-resolved threads, inspects the code each remaining comment actually refers to, groups the comments into themes confirmed with the user, and writes a brief that a follow-up revision pass can consume.

## Argument Parsing

Parse `$ARGUMENTS` to extract:

```
[PR-number] [--repo <owner/name>]
```

- **PR number**: Optional (numeric token). If omitted, resolve from the current branch (see Step 1).
- **`--repo`**: Optional. Target `owner/name`. If omitted, use the repo of the current working directory (`gh repo view --json nameWithOwner -q .nameWithOwner`).

Set `REPO` to the resolved `owner/name`.

## Step 1: Resolve the PR

If a PR number was provided in arguments, use it directly. Otherwise resolve it from the current branch:

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr list --head "$BRANCH" --state all --json number,url --jq '.[0]' --repo "$REPO"
```

If still not found, ask the user:

```
What is the PR number to triage?
```

Set `PR` to the resolved number. If no PR exists, error: "No PR found. Provide a PR number or push a branch with an open PR."

## Step 2: Fetch PR Comments

Fetch inline review comments, conversation-level comments, and review-thread metadata. **Save the raw JSON to disk** as the source of truth. Work in a scratch directory, e.g. `WORK=$(mktemp -d)`.

```bash
# Inline review comments (have path + line)
gh api repos/{REPO}/pulls/{PR}/comments --paginate \
  > "$WORK/raw-comments.json"

# Conversation-level comments and reviews
gh pr view {PR} --json comments,reviews --repo {REPO} \
  > "$WORK/raw-conversations.json"

# Review-thread metadata (GraphQL — paginated; --slurp combines pages)
OWNER="${REPO%/*}"; NAME="${REPO#*/}"
gh api graphql --paginate --slurp -f query='
query($owner: String!, $name: String!, $pr: Int!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100, after: $endCursor) {
        nodes { id isResolved isOutdated comments(first: 50) { nodes { databaseId } } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}' -f owner="$OWNER" -f name="$NAME" -F pr={PR} \
  > "$WORK/raw-threads.json"
```

The saved JSON files are the **source of truth** for all subsequent steps. All processing (categorization, walkthrough, brief writing, resolution) must read from these files. If context limits force you to process comments in batches, always re-read from the JSON files — never rely on in-memory summaries of earlier batches.

For each comment, capture: `id`, `path` (if inline), `line` (if inline), `body`, `user.login`, `created_at`.

For each thread, capture: `id` (GraphQL node ID, used by `resolveReviewThread`), `isResolved`, and the list of `databaseId`s of comments inside it.

**Filter resolved threads out of the working set.** Comments in threads where `isResolved: true` are already handled — skip them in all subsequent steps. Only unresolved threads carry open feedback.

### Anti-Truncation Rules (CRITICAL)

| Anti-Pattern | Why It Fails | Do Instead |
|--------------|-------------|------------|
| Truncating body text (e.g., `body[:200]`, `body.slice(0, N)`) | Reviewer detail is lost; the downstream revision works with incomplete input | Always use the complete `body` field from the JSON file |
| Summarizing comment bodies during fetch or storage | Summaries lose specific technical details (method signatures, parameters, edge cases) | Store and display verbatim text |
| Using `--jq` to extract only selected fields during fetch | May silently drop fields needed later | Save full API response first, then filter in subsequent steps |
| Processing from memory after reading a large batch | Context pressure causes silent dropping of long comments | Re-read from the JSON file when processing each comment |

## Step 3: Inspect Referenced Code and Artifacts (CRITICAL)

Action items grounded only in comment text are speculation, not triage. Before grouping comments into themes, inspect the actual code or files each remaining comment refers to. The walkthrough (Step 5) is the user's review checkpoint — proposing meaningless or fabricated action items wastes it.

**Rule**: For every comment in the working set, read the cited code BEFORE drafting an action item for it. This applies to vague AND well-articulated comments — vague comments need archaeology to mean anything; well-articulated comments still need scope validation.

### What to inspect

| Comment context | What to read |
|----------------|--------------|
| Inline review comment with `path` + `line` | Current file at that path, with ±20 lines of context around `line`. Note `commit_id` from the JSON — if the file has materially changed since, flag it (the comment may be stale). |
| Comment body mentions a file path | The referenced file (or the relevant section) |
| Comment body mentions a symbol (class/function/method/component name) | Grep to locate it, then read the definition and key call sites |
| Conversation-level comment that references code/files | Same rules apply by topic or symbol |
| Conversation-level comment with no code reference (process question, acknowledgement, etc.) | No inspection needed — record `Inspected: n/a` |

Batch Read calls in parallel where comments are independent — a single tool turn with multiple Read invocations keeps the triage loop fast. Never skip reads to save time.

### Findings to capture per comment

For each comment, record (working memory or scratch notes — Step 6's brief will consolidate):

- **Cited location(s)**: file:line or symbol
- **What's actually there**: 1–3 sentences describing the current state factually — no hedges, no "likely". You read the file; state what it contains.
- **Comment-vs-reality check**:
  - Vague comments ("Why is this here?", "This doesn't work", "Is this wired up?") → identify what "this" is, in concrete terms
  - Explicit comments (with method signatures, parameter lists, line refs) → verify the cited details match the current state, and confirm scope
  - Claim-style comments ("X is missing", "Y is wrong", "Z should be removed") → confirm the claim is true on the current branch
- **Already-resolved flag**: If a later commit on the branch addressed the concern, mark it — likely no-action

### When inspection contradicts the comment

Do NOT silently fabricate a fix that aligns with the comment text when the code shows the premise is wrong or stale. Surface the contradiction during the walkthrough (Step 5) so the user decides. Possible outcomes:

- Already fixed → no-action
- Real issue is different from what the comment suggests → reclassify with the grounded action
- Comment is based on a stale view of the code → flag for the user; consider asking the reviewer for clarification before applying any fix

### Anti-speculation rules

| Anti-pattern | Why it fails | Do instead |
|-------------|--------------|------------|
| Drafting action items with hedge words ("likely test code", "probably a typo", "may be debug scaffolding", "appears to be unused") | Hedges signal the file wasn't read. Specific descriptions only come from inspection. | Read the file. State concretely what's there. |
| Skipping inspection because the comment "looks clear" | Even explicit comments can cite wrong lines, miss scope, or refer to since-changed code | Inspect anyway — it validates scope and grounds the description |
| Reading only the cited line without surrounding context | Loses meaning of "this", "here", "the function above", or scope of a block | Read with ±20 lines of context (or wider if the cited construct spans more) |
| Reading only one location for multi-reference comments | A comment may cite line N but actually mean function F or class C that spans more | Follow every reference in the body — file paths and symbols |
| Treating "Delete this" as self-executing | An imperative comment is still speculation if you don't know what "this" is — you might propose deleting the wrong thing, or something already gone | Read what "this" actually is before recommending deletion |

## Step 4: Propose Initial Grouping

**Pre-condition**: Step 3 has produced inspection findings for every comment in the working set. Grouping in this step MUST be grounded in those findings — not in the comment text alone. If you find yourself drafting an action item without a concrete inspection result behind it, stop and inspect first (or surface the gap during the walkthrough rather than fabricating).

Using the comment bodies AND the Step 3 findings, group the comments into **themes** and identify which comments need **no action**.

### Long Comment Analysis (CRITICAL)

Reviewer comments often start with a confirmation ("This is correct", "I agree", "Yes") but then provide corrections, additions, or important technical detail in subsequent paragraphs. **You MUST analyze the entire comment body, not just the opening sentence.**

For every comment, follow this procedure:

1. **Read the complete body** from the raw JSON file — not a truncated or summarized version
2. **Break multi-paragraph comments into sections** and treat each independently:
   - Opening confirmation → may be no-action
   - "I would add..." / "Also..." / "More specifically..." → an addition to make
   - "Actually..." / "Instead..." / "The correct..." → a correction to make
   - Technical details (method signatures, parameters, edge cases) → an action item
3. **If ANY section contains actionable content**, the comment is NOT no-action — make it part of a theme

**Examples of misclassification to avoid:**

| Comment starts with | But also contains | Actionable? |
|--------------------|--------------------|-------------|
| "I agree with the summary" | "I would add that this class also stores X, Y, Z..." | Yes — add X, Y, Z |
| "This is correct" | "but the method signature is actually `Foo(a, b, c)` not `Foo(a)`" | Yes — fix the signature |
| "Yes, the way you summarized X is correct" | "I will add that for Hebrew codes the final 'H' is ignored" | Yes — add the edge case |
| "The trigger is correct" | "there is also a default option which is to open a Text Window" | Yes — add the default option |

### No-Action Self-Check

After proposing all themes and no-action comments, perform a self-check before presenting to the user:

1. **Re-read every proposed no-action comment's full body** from the raw JSON file
2. For each, verify: "Does this comment contain ONLY acknowledgment/confirmation, with NO additional technical detail, corrections, or suggestions?"
3. **If the full body is longer than 200 characters**, scrutinize it more carefully — long "acknowledgment" comments almost always contain actionable content
4. Reclassify any that fail the check

### Theme Grouping

Cluster related comments into **themes** by shared topic:
- All comments mentioning the same subsystem, file, or concept → one theme
- All comments about a single isolated item → individual theme
- "No action" comments → grouped separately (not a theme)

Each theme gets a proposed:
- **Name** (short descriptive label)
- **Affected files** (which file(s) the action items touch)
- **Action Items** — a numbered list where each item has:
  - A **target** (which file, and where in it)
  - A **detailed description** that preserves the reviewer's specific technical details (method names, parameter lists, exact values, tiered suggestions, code snippets). Must include enough context for a follow-up revision pass to execute without re-reading the original comment.

## Step 5: Collaborative Walkthrough (CRITICAL)

**This is a human-in-the-loop step.** Walk through each proposed theme with the user, one at a time, because autonomous grouping can misinterpret reviewer intent.

For each theme, present using `AskUserQuestion` or direct output.

**Display the COMPLETE comment body for every comment in the theme.** Never truncate, summarize, or excerpt. If a comment is long (500+ characters), that makes it MORE important to show in full — long comments contain the most actionable detail. Read the body from the raw JSON file, not from memory.

```markdown
## Theme {N}: {Proposed Name}

### Original feedback (verbatim — complete text)
> @{reviewer} on {file}:{line}:
> "{full comment body — every word, no truncation}"
>
> @{reviewer} on {file}:{line}:
> "{full comment body — every word, no truncation}"

### Inspection findings (from Step 3)
- `{file}:{line}` — {concrete factual description of what's there now}
- `{symbol}` — {description}
- {comment-vs-reality note, e.g. "Comment claim verified" / "Cited line has since changed; current contents: ..." / "Concern already addressed in commit {sha}"}
- (or "n/a — conversation-level, no code reference" when applicable)

### My interpretation
- **Affected files**: {files}
- **Action Items**:
  1. ({target}): {detailed description preserving reviewer's technical specifics, grounded in the findings above}
  2. ({target}): {detailed description preserving reviewer's technical specifics, grounded in the findings above}

### Questions
- Are these action items correct?
- {any specific questions about scope or intent}
- {if findings contradict the comment: explicitly raise the contradiction here and ask how to proceed}
```

The user can:
- **Confirm**: "Yes, that's right"
- **Adjust scope**: "Also include the helper in foo.ts in this theme"
- **Split/merge themes**: "These two should be separate themes" or "Combine with Theme 3"
- **Add context**: "The reviewer told me in Slack that this also applies to X"

Record the user's response for each theme (confirmation, corrections, additions).

### No-Action Comments

After all themes, present the "no action" comments. **Display the full comment body for each** — never truncate. The user needs to see the complete text to verify nothing actionable was missed.

```markdown
## Comments Requiring No Action ({N} comments)

These comments were categorized as informational/resolved:
- @{reviewer} on {file}:{line}: "{full comment body}" — {reason for no action}

Any of these actually need action? (yes: specify / no)
```

### Final Summary

After walking through all themes, present the complete summary:

```markdown
## Triage Summary

**PR**: #{PR} ({REPO})
**Themes**: {count}

| # | Theme | Action Items | Affected Files |
|---|-------|-------------|----------------|
| 1 | {name} | {count} items | {files} |
| 2 | {name} | {count} items | {files} |
| ... |

**No action**: {count} comments

Confirm this triage? (yes / modify theme {N})
```

Wait for user confirmation before proceeding to Step 6.

## Step 6: Write Triage Brief

Write the triage brief to a file in the current working directory, e.g. `triage-brief-{PR}.md`.

Use this format:

```markdown
# Triage Brief: PR #{PR}

## Metadata
- Repository: {REPO}
- PR: #{PR}
- Triage date: {date}
- Themes: {count}
- Triage mode: collaborative (user confirmed each theme)

## Raw Feedback Source

Raw comment data is stored in the JSON files saved during Step 2:

- Inline: `raw-comments.json`
- Conversation: `raw-conversations.json`
- Threads: `raw-threads.json`

These JSON files are the **authoritative source** for comment bodies. A follow-up revision pass should read from them when it needs the full reviewer text. Do NOT duplicate full comment bodies in this brief except where the format calls for verbatim quotes — reference the JSON files instead.

### Comment Index

For each comment, record a brief index entry (NOT the full body):

### Comment 1
- **Author**: @{reviewer}
- **File**: {path}:{line} (or "conversation-level" if not inline)
- **Date**: {date}
- **GitHub ID**: {comment_id}
- **Thread ID**: {graphql_thread_id} (from the threads file; omit for conversation-level comments)
- **Summary**: {1-sentence summary of what the comment says — for index purposes only}
- **Inspected** (from Step 3):
  - `{file}:{line}` — {concrete factual description of what's there now}
  - `{symbol}` — {description}
  - {comment-vs-reality note, if applicable}
  - (or "n/a — conversation-level, no code reference" when no inspection was warranted)

### Comment 2
...

## Confirmed Themes

### Theme 1: {Name}
- **Confirmed by**: user on {date}
- **PR Comments**: #{id1}, #{id2}
- **Thread IDs**: {graphql_thread_id1}, {graphql_thread_id2} (for inline review comments — used when resolving threads after the fix is posted)
- **Original quotes** (COMPLETE verbatim text — read from raw JSON file, never truncated):
  > "{full comment body — every word}" — @{reviewer}
  > "{full comment body — every word}" — @{reviewer}
- **Inspection Findings** (from Step 3; per-comment findings consolidated for the theme):
  - `{file}:{line}` — {concrete factual description of what's there now}
  - `{symbol}` — {description}
  - {comment-vs-reality note, if applicable}
- **Affected files**: {file paths, with lines where relevant}
- **Action Items**:
  1. ({target}): {detailed description grounded in the Inspection Findings above and preserving reviewer's technical specifics — method names, parameter lists, exact values, tiered suggestions. Must be detailed enough for a follow-up revision pass to execute without re-reading the original comment.}
  2. ({target}): {detailed description}
- **User Notes**: "{any corrections or additions from the user}" (or "None")

### Theme 2: {Name}
...

## No-Action Comments
- Comment #{id} (thread `{graphql_thread_id}`): @{reviewer} — "{full comment body}" — Reason: {why no action}

> **Thread ID format**: Inline review comments → record `(thread \`{graphql_thread_id}\`)`. Conversation-level comments have no review thread → record `(conversation-level)` instead. Step 6.5 only resolves entries with a real thread ID.
```

## Step 6.5: Resolve No-Action Threads

After the brief is written, close out the **no-action items** by posting a reply and resolving the thread. This removes genuinely-done items from the unresolved pile so future triage runs have less noise.

**Scope rule**: Resolve ONLY no-action items here. Themed / actionable items remain unresolved until the fix is committed and the reviewer's thread is replied to as part of that revision.

**Golden rule**: Never resolve a thread without first posting a visible reply. The reply is the audit trail; resolution is the state.

For each no-action comment in the brief:

1. **Post a reply** explaining why no action is being taken. For inline review comments, reply on the comment's thread:
   ```bash
   REPLY_BODY="No action needed — {reason}."
   gh api repos/{REPO}/pulls/{PR}/comments/{comment-id}/replies \
     -f body="$REPLY_BODY"
   ```
   For conversation-level comments, post a conversation reply instead:
   ```bash
   gh pr comment {PR} --repo {REPO} --body "$REPLY_BODY"
   ```
2. **Resolve the thread** — only for inline comments (entries that recorded a real `{graphql_thread_id}`). Skip this for entries marked `(conversation-level)`; conversation-level comments have no review thread to resolve:
   ```bash
   gh api graphql -f query='
   mutation($threadId: ID!) {
     resolveReviewThread(input: { threadId: $threadId }) {
       thread { id isResolved }
     }
   }' -F threadId="{graphql_thread_id}"
   ```
3. **On failure** (rate limit, permissions, deleted thread): log a warning with the comment ID and error, and continue — do not block brief delivery.

Report a summary to the user:

```
Resolved {M} of {N} no-action threads on PR #{PR}.
Failures: {list of thread-id + error} (if any)
```

## Step 7: Notify User

After writing the triage brief:

```markdown
Triage brief written to: `triage-brief-{PR}.md`

**{count} themes** categorized across {count} PR comments.
**{M}** no-action threads resolved on PR #{PR}.

Each theme lists grounded action items ready to apply. The raw comment JSON
(`raw-comments.json`, `raw-conversations.json`, `raw-threads.json`) remains the
authoritative source for full reviewer text.
```

## Error Handling

- **No PR found**: Ask the user for a PR number or URL.
- **No comments on the PR**: Inform the user — nothing to triage. Ask if they want to provide feedback manually.
- **All comments are no-action**: Write a minimal triage brief with no themes; inform the user no revisions are needed.
- **All comments already resolved**: Inform the user and stop — every thread is resolved, so there is no open feedback to triage.

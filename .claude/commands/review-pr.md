# Review PR

Review the PR: **$ARGUMENTS**

## Overview

This command performs a multi-perspective AI review of a GitHub PR. It runs a fixed default panel of reviewer agents **in parallel**, fanned out over the PR's changed files. Findings are consolidated and posted as line-level review comments to the PR.

## Argument Parsing

Parse `$ARGUMENTS` to extract:

```
[PR-number] [--reviewers <list>] [--repo <owner/name>] [--dev] [--dry-run]
```

- **PR number**: Optional (numeric token). If omitted, detect from the current branch (see Step 1).
- **`--reviewers`**: Optional. Comma-separated explicit reviewer list (e.g. `--reviewers security,tests,architecture`). Overrides the default panel and auto-narrowing. Valid values: `security`, `scope`, `ux`, `contracts`, `tests`, `architecture`, `clarity`.
- **`--repo`**: Optional. Target `owner/name`. If omitted, use the repo of the current working directory (`gh repo view --json nameWithOwner -q .nameWithOwner`).
- **`--dev`**: Skip user confirmation prompts.
- **`--dry-run`**: Write a local report but do NOT post comments to GitHub.

Set `REPO` to the resolved `owner/name`.

## Step 1: Find PR Number

If a PR number was not provided in arguments, detect it from the current branch:

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr list --head "$BRANCH" --json number,url --jq '.[0]' --repo "$REPO"
```

If still not found, ask the user (skip in `--dev` mode — error instead):

```
What is the PR number to review?
```

If no PR exists, error: "No PR found. Create a PR first, then re-run this command."

## Step 2: Fetch Changed Files

```bash
# Changed file list with metadata
gh api repos/{REPO}/pulls/{PR}/files --paginate \
  --jq '.[] | {filename, status, additions, deletions}'
```

If no changed files, post "No changes to review" comment and exit.

### Categorize Files by Language

Sort changed files by language so the panel can be auto-narrowed and so each agent reads only its relevant subset:

| Category | Variable | Patterns |
|----------|----------|----------|
| C# source | `CS_FILES` | `**/*.cs` (exclude `*Tests*`) |
| C# tests | `CS_TEST_FILES` | `**/*Tests*/**/*.cs`, `**/*.Tests.cs` |
| TS/React source | `TS_FILES` | `**/*.ts`, `**/*.tsx` (exclude `*.test.ts`, `*.spec.ts`) |
| TS tests | `TS_TEST_FILES` | `**/*.test.ts`, `**/*.test.tsx`, `**/*.spec.ts` |
| Styles | `STYLE_FILES` | `**/*.scss`, `**/*.css` |
| Config | `CONFIG_FILES` | `*.json`, `*.json5`, `webpack.*` |
| Docs | `DOC_FILES` | `**/*.md` |

Store the categorized lists as JSON for passing to agents. Set `CHANGED_FILES` to the full changed-file list.

## Step 3: Check for Previous AI Review

```bash
gh api repos/{REPO}/pulls/{PR}/reviews --jq '[.[] | select(.body | contains("[Claude AI Review]"))] | length'
```

If a previous AI review exists:
- In `--dev` mode: log warning, continue
- Otherwise: warn the user and ask for confirmation to post another review

## Step 4: Select the Reviewer Panel

The panel references the general `pr-reviewer-*` agents in `.claude/agents/`. Available reviewers:

| Reviewer | Agent | Focus |
|----------|-------|-------|
| security | `pr-reviewer-security` | Blocked imports, input validation, secrets, PAPI usage |
| scope | `pr-reviewer-scope` | Changes stay within the PR's stated purpose; no scope creep |
| ux | `pr-reviewer-ux` | Performance, accessibility, re-renders, ARIA, keyboard nav, component usage |
| contracts | `pr-reviewer-contracts` | API contract correctness, type/signature alignment |
| tests | `pr-reviewer-tests` | Test quality, behavior-focus, testing-trophy balance, anti-patterns |
| architecture | `pr-reviewer-architecture` | Pattern conformance, codebase conventions, structural soundness |
| clarity | `pr-reviewer-clarity` | Dead code, naming, over-engineering, readability |

### Default panel

If `--reviewers` was NOT provided, start from the **fixed default panel**:

```
security, scope, ux, contracts, tests, architecture, clarity
```

Then **auto-narrow by changed-file language**:

- If there are **no C# files** (`CS_FILES` and `CS_TEST_FILES` both empty) → drop `contracts` and `architecture`.
- If there are **no TS/React files** (`TS_FILES`, `TS_TEST_FILES`, `STYLE_FILES` all empty) → drop `ux`.

This keeps the panel relevant: C# changes pull in `contracts` and `architecture`; TS/React changes pull in `ux`. `security`, `scope`, `tests`, and `clarity` always run, so the panel is never empty — a docs-only PR still runs those four.

### Explicit override

If `--reviewers` WAS provided, use exactly that list (validate each name against the table above; error on unknown names). Skip auto-narrowing — an explicit list is taken as-is.

Set `PANEL` to the resolved reviewer list. Log: "Reviewer panel: {PANEL} (default + auto-narrow | explicit override)."

## Step 5: Spawn Reviewer Agents — IN PARALLEL

**CRITICAL**: Launch ALL selected agents in a **single message with multiple Agent tool calls**. This runs them concurrently. Fan out over the changed files — each agent reads only the file categories relevant to its perspective.

### Context Block

Each agent receives the same context block as its prompt:

```
PR: #{PR}
Repository: {REPO}
Changed files (JSON): {CHANGED_FILES, with per-language categorization}

Instructions:
- ONLY review the files listed in "Changed files" above
- Review changed files from the working tree (read the actual files, not just the diff)
- Review the code IN CONTEXT — check cross-references, call sites, and consistency with the surrounding codebase
- Return findings as a JSON array using the Finding Schema below
- IMPORTANT: For every finding, you MUST provide a "line" number pointing to the most relevant line in the file where the reviewer's attention should be drawn. Read the file to find the right line. Findings without "line" will not be posted as inline comments on the PR — they will only appear in the summary, which reviewers are less likely to see.

Finding Schema:
Each finding must be a JSON object with these fields:
- "perspective": "{agent's perspective}" (required)
- "severity": "blocking" | "warning" | "suggestion" (required)
- "needs_decision": true | false (REQUIRED) — `true` when a reviewer must approve / reject / pick an option / make a judgment call; `false` when the finding is purely informational (e.g., a confirmation summary that work was applied, a recap of changes made in a prior round). Informational findings (`needs_decision: false`) are NOT posted as inline comments — they appear in the PR body summary only. Reviewer-blocking decisions MUST set this to `true`.
- "file": "path/to/file" (required)
- "line": 42 (strongly recommended — line number for inline comment. Omit ONLY if the finding is truly file-level with no specific line)
- "line_content": "exact text at that line" (required when "line" is present — the literal file content at the reported line, used to validate placement)
- "end_line": 45 (optional — end line for multi-line comment)
- "language": "csharp" | "typescript" | "markdown" | "json" | "other" (required)
- "message": "Human-readable description" (required)
- "question": "Decision-formulating question for the reviewer" (REQUIRED when `needs_decision: true`) — the explicit question/decision request the reviewer needs to answer. Should be short (1-2 sentences). Used as the LEADING content of the inline review comment.
- "context": "Supporting detail" (optional) — additional context, rationale, citations, or alternatives to inform the decision. Used as the supporting (collapsed) content of the inline review comment when `needs_decision: true`.
- "evidence": "Reference to a standard or convention supporting this" (optional)
- "existing_code_ref": "c-sharp/SomeOther/Utility.cs:88 — existing utility that should be reused" (optional)

**Deciding `needs_decision`**: if you can imagine the reviewer reading the finding and saying "OK, noted" without changing anything, the finding is informational — set `needs_decision: false`. If the reviewer must ALMOST ALWAYS take an action (approve / reject / pick A or B / fix something) before merge, set `needs_decision: true`. When in doubt, prefer `needs_decision: false` and surface in the PR body summary — that wastes less reviewer attention than spurious inline comments. Reviewer pushback observed in practice ("Don't post inline comments like this if it's just info") confirms over-eager `needs_decision: true` is the worse error mode.

Return ONLY the JSON array. No markdown wrapping, no explanation outside the array.
```

## Step 6: Consolidate Findings

After ALL agents return:

1. **Parse** JSON findings from each agent's response. If an agent returned malformed JSON, log a warning and skip that agent's findings.

2. **Deduplicate**: If two findings reference the same file+line (within 3 lines), merge their messages and keep both perspective tags:
   ```
   **[Security]** **[Architecture]** Combined message here
   ```

3. **Sort** by severity: blocking first, then warning, then suggestion.

4. **Build summary table**:

   ```markdown
   ## 🤖 [Claude AI Review] — PR #{PR}

   | Perspective  | Blocking | Warning | Suggestion |
   |--------------|----------|---------|------------|
   | Security     | 0        | 2       | 1          |
   | Architecture | 0        | 1       | 0          |
   | ...          | ...      | ...     | ...        |
   | **Total**    | **0**    | **3**   | **1**      |
   ```

## Step 6.5: Validate Line Numbers

For each finding that has a `line` field, validate that the comment will be placed on the correct line:

1. **If `line_content` is present**:
   - Read the actual file at the reported `line` number
   - If the file content at that line contains the `line_content` string → keep `line` as-is
   - If no match → search lines within ±10 of the reported `line` for a line containing `line_content`
   - If found nearby → correct `line` to the matching line number. Log: "Corrected {file}:{reported_line} → {actual_line} (content match found {N} lines away)"
   - If not found within ±10 → remove the `line` and `end_line` fields from the finding (it becomes a non-inline comment included in the summary body). Log: "Dropped inline placement for {file}:{reported_line} — line_content not found nearby"

2. **If `line_content` is absent** (backward compatibility):
   - Keep the finding as-is (no validation possible)
   - Log: "Finding for {file}:{line} has no line_content — skipping validation"

3. **Also validate that `line` exists in the PR diff**:
   - Using the changed files metadata from Step 2, verify the file is in the PR
   - For modified files, verify the line falls within a diff hunk (not in an unchanged region)
   - If the line is outside the diff → remove `line` and `end_line` (becomes non-inline). Log: "Line {line} in {file} is outside the PR diff — moved to summary"

After validation, log a summary: "Line validation: {N} kept, {M} corrected, {K} moved to summary"

## Step 6.6: Apply Decision-Needed Gating

For each finding with `needs_decision: false`, drop the `line` and `end_line` fields so the finding falls into the summary path (the existing "no `line` → summary" logic in Step 7 handles it). Informational findings — confirmations, recaps, "noted" items — must not appear as inline comments because they create reviewer fatigue without requesting an action.

Findings with `needs_decision: true` keep their `line`/`end_line` and are posted inline using the decision-leads template defined in Step 7.

If a finding is missing `needs_decision` (older agent output), default to `false` — the safer behavior is to NOT post inline.

Log a summary: "Decision-needed gating: {kept_inline} kept inline, {moved_to_summary} moved to summary (needs_decision: false)"

## Step 7: Post to GitHub

**Skip this step entirely if `--dry-run` is set.** Log: "Dry run — skipping GitHub post. See local report at {path}."

Determine review event:
- If any **blocking** findings → `REQUEST_CHANGES`
- Otherwise → `COMMENT` (never `APPROVE` — human approval is always required)

Format each **inline** finding (those still carrying a `line` after Steps 6.5 and 6.6 — i.e. `needs_decision: true`) using the **decision-leads template**:
```
🤖 **Claude AI** · **[{Perspective}]** · Decision needed ({severity})

{question}

<details><summary>Context</summary>

{message}

{context if present}

{evidence if present}
{existing_code_ref if present}

</details>
```

The template puts the actionable `question` first so the reviewer sees the call-to-action at a glance, and collapses the descriptive `message`, supporting `context`, and any references behind a `<details>` block.

For findings posted in the **summary body** (those without `line` — including findings dropped by Step 6.5 line validation and findings dropped by Step 6.6 needs_decision gating), use the original informational format:
```
🤖 **Claude AI** · **[{Perspective}]** ({severity})

{message}

{context if present}

{evidence if present}
{existing_code_ref if present}
```

Post using the GitHub Reviews API. Build a single JSON payload containing `body`, `event`, and `comments` keys, then pass it via `--input`:

```bash
# Build the review payload as a single JSON object
jq -n --arg body "$SUMMARY" --arg event "$EVENT" --slurpfile comments comments.json \
  '{body: $body, event: $event, comments: $comments[0]}' > review-payload.json

gh api repos/{REPO}/pulls/{PR}/reviews \
  --method POST \
  --input review-payload.json
```

Where `comments.json` contains the inline comments array (one entry per inline finding):
```json
[{
  "path": "path/to/file",
  "line": 42,
  "body": "🤖 **Claude AI** · **[Security]** · Decision needed (warning)\n\nShould this user input be validated before it reaches the data provider?\n\n<details><summary>Context</summary>\n\nThe value flows straight into the query without bounds checking — ...\n\n</details>"
}]
```

Findings without a `line` number (after Steps 6.5 and 6.6) are appended to the summary body using the informational format above instead of as inline comments.

If the API call fails, log the error and inform the user. The local report is still available.

## Step 8: Write Local Report

**Always written**, even in `--dry-run` mode.

Write the report to `pr-review-{PR}.md` in the current working directory:

```markdown
# PR Review Report: PR #{PR}

**Repository**: {REPO}
**Date**: {date}
**Posted by**: Claude AI (via `/review-pr`)
**Mode**: {normal | dry-run}
**Event**: {REQUEST_CHANGES | COMMENT}
**Reviewers**: {PANEL}

## Summary

{summary table from Step 6}

## All Findings

### Blocking

{for each blocking finding:}
#### [{Perspective}] {file}:{line}
**Severity**: blocking
**Language**: {language}
**Message**: {message}
**Evidence**: {evidence}
**Cross-ref**: {existing_code_ref}

---

### Warnings

{same format}

### Suggestions

{same format}

## Line Validation

{summary from Step 6.5: N kept, M corrected, K moved to summary}

{if any corrections:}
| File | Reported | Corrected | Offset |
|------|----------|-----------|--------|
| {file} | {reported_line} | {actual_line} | {±N} |
```

## Step 9: Final Output

Report to user:

```
PR Review complete for PR #{PR}.

- {N} blocking, {N} warnings, {N} suggestions across {agent count} perspectives ({PANEL})
- {Posted to GitHub as REQUEST_CHANGES/COMMENT | Dry run — not posted}
- Local report: pr-review-{PR}.md

Next steps:
1. Human devs review the PR (AI comments are inline)
2. Run `/triage-feedback {PR}` to consolidate reviewer feedback
```

## Edge Cases

- **No PR found**: Error with instructions to create PR first
- **Previous AI review exists**: Warn user, ask confirmation (skip in `--dev` mode)
- **Very large PR (100+ files)**: Each agent reads only its relevant file subset; log a warning
- **Empty diff**: Post "No changes to review" comment and exit
- **Docs-only PR**: Auto-narrowing drops `contracts`, `architecture`, and `ux`; `security`, `scope`, `tests`, and `clarity` always remain
- **`--dry-run`**: Full analysis runs, local report written, nothing posted to GitHub
- **Agent returns malformed JSON**: Log warning, skip that agent's findings, note in summary
- **Unknown `--reviewers` name**: Error listing the valid reviewer names

---
description: Optionally pass the branch purpose as an argument. AI-assisted code review with author interview. e.g. /review-paratext Fix the app freeze when opening the editor
---

# Review Paratext

AI-assisted code review with author interview. Run this before posting a PR. Optionally pass the branch purpose as an argument, e.g. `/review-paratext Fix the app freeze when opening the editor`.

## Overview

This command:

1. Analyzes all changes on your branch since it diverged from the base branch
2. Runs four parallel analysis passes (API/correctness, style/patterns, coverage/compliance, UX design guide)
3. Interviews you about the changes to verify understanding and surface issues
4. Writes `.review/summary.md` with findings and interview notes
5. Optionally creates or updates a PR with the summary as the description

---

## Initial Setup

### Step 0 — Determine the Claude model and session URL

Determine which Claude model is currently running this command and set a `MODEL_NAME` variable to be used in all commit messages. The variable should be in the format "Claude Sonnet 4.6" or "Claude Haiku 4.5", etc.

**Approach**:
- Check if there is an environment variable (e.g., `CLAUDE_MODEL`) set by Claude Code
- If available, parse it to extract the friendly name and store it as `MODEL_NAME`
- If not available, use introspection or context to determine the model name
- If still unable to determine, ask the author: "What Claude model are you using for this review?" and use their response

Store the result as `MODEL_NAME` for use in all subsequent commit messages.

Also determine the current Claude Code **session URL** (e.g. `https://claude.ai/code/session_<id>`) and store it as `SESSION_URL`. Look for it in the session/transcript context or an environment variable; if it cannot be determined, ask the author to paste their session URL, or fall back to the literal `<session URL>` for them to fill in. `SESSION_URL` is used for the `Session-URL:` commit trailer and the PR-body AI-assisted line, per the project's authorship convention (see CLAUDE.md).

### Step 0.5 — Introduce the review process

Output the following to the author before doing anything else:

> **Here's what this review will do:**
>
> 1. **Setup** — Check your branch and ask a couple of quick questions
> 2. **Analysis** — Run four parallel analysis passes (API/correctness, style/patterns, coverage/compliance, UX design guide) — this happens automatically
> 3. **Interview** — Walk through the findings with you
> 4. **Output** — Write `.review/summary.md` and optionally create or update a PR
>
> **During the interview, you can:**
> - Explain your changes — your explanations go into the summary for your reviewer
> - Tell me a finding is not an issue — it will be marked as dismissed with your explanation
> - Ask me to fix something — I will implement it and stage it, then keep going
> - Say you don't know or aren't sure about something — that gets recorded so your reviewer can help you learn about it in the meeting
>
> **What I will do** based on what you say:
> - Record your explanations and context in the summary
> - Make code changes you request
> - After the interview, if any fixes were made, run quality checks (`typecheck`, `lint`, `format`, `test`) and fix any issues introduced
>
> **At the end**, I will write `.review/summary.md` then offer to commit changes and check for an existing PR and update it, or create a new one.
>
> Let's get started.

---

## Phase 1: Setup

### Step 1.1 — Validate branch

```bash
BRANCH=$(git branch --show-current)
echo "Current branch: $BRANCH"
```

If `$BRANCH` is `main`, stop and tell the author:

> "You must run this command from a feature branch, not from `$BRANCH`."

### Step 1.2 — Check for uncommitted changes

```bash
git status --porcelain
```

If there are uncommitted changes, inform the author:

> "You have uncommitted changes. During the review, I will stage any fixes I make. All uncommitted changes — yours and mine — will be committed together in a single commit at the end.
>
> **If you have changes you want to keep as a separate commit from any review fixes**, commit them now before continuing.
>
> Would you like to commit all your current working changes now with a commit message you provide — or say 'continue' to fold them into the final review commit?"

- If the author provides a commit message: run `git add -A` and commit with their message (append `Co-Authored-By: $MODEL_NAME <noreply@anthropic.com>` and `Session-URL: $SESSION_URL` to the commit body). Then continue.
- If the author says to continue: proceed with the working changes included in the review.

### Step 1.3 — Auto-detect base branch and compute diff range

Run this entire block as a **single bash command** so that `BASE_BRANCH` flows directly into the diff range computation without any risk of the variable being lost between calls:

```bash
git fetch origin --quiet 2>/dev/null || true

MAIN_MERGE_BASE=$(git merge-base origin/main HEAD 2>/dev/null || echo "")

if [ -z "$MAIN_MERGE_BASE" ]; then
  echo "BASE_BRANCH=UNKNOWN"
  echo "ERROR: Could not detect base branch — will ask author"
else
  BASE_BRANCH="origin/main"
fi

echo "BASE_BRANCH=$BASE_BRANCH"

if [ "$BASE_BRANCH" != "UNKNOWN" ]; then
  MERGE_BASE=$(git merge-base "$BASE_BRANCH" HEAD)
  HEAD_SHA=$(git rev-parse HEAD)
  FILE_COUNT=$(git diff --name-only "$MERGE_BASE" | wc -l | tr -d ' ')
  INITIAL_COMMIT_COUNT=$(git log "$MERGE_BASE..$HEAD_SHA" --oneline | wc -l | tr -d ' ')
  echo "MERGE_BASE=$MERGE_BASE"
  echo "HEAD_SHA=$HEAD_SHA"
  echo "FILE_COUNT=$FILE_COUNT"
  echo "INITIAL_COMMIT_COUNT=$INITIAL_COMMIT_COUNT"
  echo "Changed files (including uncommitted):"
  git diff --name-only "$MERGE_BASE"
fi
```

**If BASE_BRANCH is UNKNOWN**: ask the author: "Could not auto-detect your base branch. Which branch should I diff against?" Accept their input, then re-run the diff range portion of the script above using that value.

Store `BASE_BRANCH`, `MERGE_BASE`, `HEAD_SHA`, `FILE_COUNT`, and `INITIAL_COMMIT_COUNT` from the script output for use in all later steps.

Report to the author: "Analyzing $FILE_COUNT files changed since branching from `$BASE_BRANCH`."

### Step 1.5 — Check .gitignore

```bash
grep -qE "^\.review(/?)$" .gitignore 2>/dev/null && echo "present" || echo "missing"
```

If `.review` is not in `.gitignore` (output is "missing"), ask and **wait for the author's response before continuing**:

> "As part of this review, I will write a review summary to `.review/summary.md`. The `.review/` folder is not in `.gitignore`, so it may show up as untracked in git status. Would you like me to add it to `.gitignore` now?"

If yes:

```bash
echo ".review" >> .gitignore
git add .gitignore
git commit -m "$(cat <<'EOF'
chore: add .review to .gitignore

Co-Authored-By: $MODEL_NAME <noreply@anthropic.com>
Session-URL: $SESSION_URL
EOF
)"
```

**Complete this step fully before proceeding to Step 1.6. Do not combine this question with the purpose statement question.**

### Step 1.6 — Retrieve purpose statement

Check if the user provided text after `/review-paratext` (i.e., a purpose argument).

- **If a purpose argument was provided**: use it directly as `PURPOSE`.
- **If no argument was provided**: ask the author:
  > "What is the overall purpose of these changes? Please describe it in your own words.
  >
  > (Tip: you can skip this question next time by passing the purpose as an argument — e.g. `/review-paratext Fix the app freeze when opening the editor`)"

  Wait for their response. Do not proceed until the author provides one.

Store as `PURPOSE`.

---

## Phase 2: Parallel Analysis

Dispatch four instances of the `review-analyzer` agent in parallel using the Agent tool. All four must be dispatched in a single response (four Agent tool calls in the same message). Pass `MERGE_BASE`, `BASE_BRANCH`, and the `focus` value for each:

| Instance | focus        | Covers                                                                                                             |
| -------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| Agent 1  | `api`        | Priority 1 (API changes), Priority 2 (Correctness)                                                                |
| Agent 2  | `style`      | Priority 3 (Code style), Priority 4 (Reuse), Priority 5 (Architecture), Priority 6 (Code quality)                 |
| Agent 3  | `compliance` | Priority 7 (Test coverage), Priority 8 (Localization), Priority 9 (Template propagation), Priority 10 (Storybook Stories), Priority 11 (Build config/process) |
| Agent 4  | `ux`         | UX Design Guide — reads guide files from Storybook source; skips automatically if no UI code was changed           |

When dispatching each agent, use `subagent_type: "review-analyzer"` in the Agent tool call to target the specialized analysis agent (not a generic agent).

Prompt for each agent instance (substitute `$FOCUS`, the actual values, and `$PURPOSE`):

> Analyze the branch changes with focus=`$FOCUS`.
>
> MERGE_BASE: `$MERGE_BASE`
> BASE_BRANCH: `$BASE_BRANCH`
> PURPOSE: `$PURPOSE`
> focus: `$FOCUS`
>
> Follow the instructions in your agent definition exactly. Return findings in the specified output format.

### Merging Results

After all four agents return:

1. Combine all findings into a single unified list
2. Order by priority (Critical first, then Important, then Minor)
3. Deduplicate: if two agents flagged the same file for the same concern type (e.g., both flag a missing `// CUSTOM` comment on the same component), keep the higher-severity version with the more detailed description. Do NOT deduplicate findings about the same file that are for different concerns — those are distinct issues and must both be kept.
4. Collect the Template Propagation sections from the compliance agent's output separately (as `TEMPLATE_PROPAGATION`). Collect Positive Observations from all four agents and union them (removing near-duplicates) into `POSITIVE_OBSERVATIONS`. Extract the `## API Changes Summary` section from the `api` agent's output as `API_CHANGES_SUMMARY` — this is the factual list of public API changes that goes directly into the summary. Store these alongside `MERGED_FINDINGS` for use in Phase 4.

**Partial failure**: If one agent fails to return, note which focus area failed in the summary output and proceed with the other agents' results.

**Agent status handling**: Each `review-analyzer` agent ends its response with a status token. Handle as follows:
- `DONE` — proceed normally with the findings
- `DONE_WITH_CONCERNS` — include the agent's caveat in the summary (e.g., note that some files couldn't be analyzed due to size)
- `BLOCKED` — treat the same as partial failure: note which focus area was blocked, proceed with the other three agents' results
- `NEEDS_CONTEXT` — this indicates a bug in the dispatch (missing MERGE_BASE, HEAD, focus, or BASE_BRANCH); stop and report the error to the author

Internally store the merged findings as `MERGED_FINDINGS` for use in the interview.

---

## Phase 3: Adaptive Interview

Conduct a conversation with the author to verify understanding and surface context for the summary.

**Interview budget**: Aim for 5-15 questions total. If the author cannot explain a Critical finding after 2 follow-up attempts, record it as "unresolved" in Interview Notes rather than continuing to drill.

**In-review changes**: During the interview, the author may instruct you to make changes to resolve findings. **If the author asks you to make a change, you MUST implement it.** If the change is ambiguous enough that you cannot safely implement it without more information, ask one clarifying question. Otherwise implement immediately — do not defer it, and do not suggest the author do it themselves. Implement the change, stage it with `git add` (do not commit yet), and continue the interview. All in-review changes are committed together in Step 5.1.

- For **small, focused changes** (editing a few lines, renaming a variable, adding a comment): implement it directly, stage it with `git add`, and continue the interview.
- For **large or context-heavy changes** (many files affected, or likely to require running checking tools like `npm run typecheck`): spin up a general-purpose subagent to implement the change and report back. Pass the subagent the relevant file paths, the finding description, and the desired change. Instruct the subagent to stage (git add) but not commit the changes. Wait for the subagent to complete before continuing the interview.

In both cases, record the change in `INTERVIEW_CHANGES` (a list of `{ finding, description_of_change }`). Do **not** remove the finding from `MERGED_FINDINGS` — it will appear as checked off in the final summary with a note about what was changed. Then continue the interview.

**Empty findings case**: If `MERGED_FINDINGS` has zero Critical and zero Important findings, skip Step 3.2 and Step 3.3. In Step 3.4, go directly to presenting Minor findings (if any) as a list, leading with: "The analysis found no critical or important issues — nice work."

### Step 3.1 — Opening summary

Present a concise summary of the analysis results:

> "Here's what I found:
>
> - **$FILE_COUNT files changed** since branching from `$BASE_BRANCH`
> - **Critical findings**: N
> - **Important findings**: N
> - **Minor findings**: N
> - **Areas affected**: [list top areas, e.g., lib/platform-bible-utils, extensions]
>
> Let's talk through the changes."

### Step 3.2 — Critical and Important findings

**Present one finding at a time.** Ask about one Critical or Important finding, wait for the author's response, then move to the next. Do not batch unrelated findings together.

**Exception**: If two or more adjacent findings are closely related (e.g., two issues in the same file, or two findings that stem from the same root cause), you may present them together in a single message. If you do, end the message with: "I'm asking about N findings at once — please respond to each."

For each Critical finding, then each Important finding:

- Ask the author about it directly and specifically
- Example: "I noticed you removed the `getFoo()` export from `platform-bible-utils`. Was this intentional? Consumers may depend on it — is there an alternative?"
- If the author has a good explanation, note it and move on
- If the response is vague or reveals misunderstanding, ask one follow-up
- If still unresolved after the follow-up, record as "unresolved" in the notes

### Step 3.3 — Design understanding

**IMPORTANT**: Step 3.3 must never be combined with the last Step 3.2 question in the same message. After receiving the author's response to the final Critical/Important finding, send a fresh message to begin Step 3.3.

Assess the author's demonstrated understanding from their responses in Step 3.2.

**If the changes are large (>10 files changed) or involve non-obvious design decisions**, or **if any responses in Step 3.2 were vague or revealed gaps in understanding**, ask the author to explain the most complex or non-obvious part in their own words:

> "Can you walk me through the most complex or non-obvious part of these changes? I want to make sure I understand the reasoning."

**Wait for the author's response before continuing to Step 3.4.**

Record their explanation.

**Lack of understanding signals — watch for these in the author's response:**

- "The AI did it / Claude handled that" or similar deferrals to an AI tool
- "I'm not sure" / "I don't know" / "I'm not entirely certain how it works"
- Vague answers that don't actually explain the reasoning or mechanism
- Inability to describe what a specific changed section does

**If the author defers to an AI or expresses genuine uncertainty about their own changes**, record this explicitly as a lack of understanding — do NOT interpret it as satisfaction or acceptance. Note the specific areas they could not explain.

**If the changes are small and the author demonstrated clear understanding**: skip this question entirely and proceed directly to Step 3.4.

### Step 3.4 — Minor findings

Always print all minor findings as a list first, then follow the flow below based on the count.

If there were no Critical or Important findings, lead with: "The analysis found no critical or important issues — nice work."

**If there are more than 3 minor findings**: After printing the list, go through them one at a time. For each finding, ask the author about it, wait for their response, then move to the next. Do not batch them. Example:

> "Here are the minor findings:
>
> [full list]
>
> Let's go through them one at a time. First: [finding 1 — specific question]"

**If there are 3 or fewer minor findings**: After printing the list, ask the author:

> "Here are the minor findings:
>
> [full list]
>
> You can respond to all of them now if you'd like, or tell me to go through them one at a time."

Wait for the author's response. If they say to go one at a time, do so. If they respond to all at once, record each response.

Record the author's responses as `MINOR_FINDINGS_RESPONSE` (e.g., "Author said none need discussion" or "Author requested fix for finding X").

**Complete this step and receive the author's response(s) before proceeding to Step 3.5.**

### Step 3.5 — Wrap-up

Ask (as a separate question, after receiving the response to Step 3.4):

> "Is there anything else you want to flag or discuss before I write up the summary? Any tradeoffs you made, things you're uncertain about, or context a reviewer should know?"

Record the author's response.

### Step 3.6 — Collect interview notes

Synthesize from the conversation:

- The author's stated purpose
- Key decisions the author made and their reasoning
- Any explanations provided for flagged items
- Any unresolved items (Critical/Important findings the author could not explain)
- The author's design explanation from Step 3.3 (if that question was asked), including any uncertainties they expressed
- **Areas the author did not understand or deferred to AI**: if the author said something like "the AI handled it", "I'm not sure how this works", or could not explain a section, list those areas explicitly as "Author does not understand: [area]". Do NOT reframe this as satisfaction or acceptance.
- Any additional context the author volunteered

Store as `INTERVIEW_NOTES` for the output phase.

---

## Phase 4: Output

### Step 4.1 — Quality check after in-review changes

**Always run this step.** Do not skip it.

**Sub-step A — Detect whether in-review changes were made:**

```bash
CURRENT_COMMIT_COUNT=$(git log $MERGE_BASE..HEAD --oneline | wc -l | tr -d ' ')
HAS_UNCOMMITTED=$(git status --porcelain | wc -l | tr -d ' ')
echo "Commits at start: $INITIAL_COMMIT_COUNT"
echo "Commits now: $CURRENT_COMMIT_COUNT"
echo "Uncommitted changes: $HAS_UNCOMMITTED"
```

- If `CURRENT_COMMIT_COUNT > INITIAL_COMMIT_COUNT` OR `HAS_UNCOMMITTED > 0` → in-review changes exist; continue to Sub-step B.
- If both are false → no in-review changes were made; set `QUALITY_CHECK_RESULTS` to empty and skip to Step 4.2.

**Sub-step B — Run quality checks in a subagent:**

Dispatch a general-purpose subagent to run quality checks and fix any issues introduced by the in-review changes. **Instruct the subagent to run all commands synchronously (not as background tasks)** so their output is captured cleanly:

> Run the following quality checks in this order. Fix any failures that are clearly caused by the in-review changes. Stage all fixes with `git add -A` — do NOT commit; all changes will be committed together in a later step. Report which checks passed, which required auto-fixes, and any unfixable failures.
>
> 0. **Library rebuilds (if applicable)** — check whether any in-review changes touched files under `lib/platform-bible-react/` or `lib/platform-bible-utils/`. If so, rebuild those libraries first before running the checks below:
>    - If `lib/platform-bible-react/` has changes: run `npm run build:platform-bible-react`
>    - If `lib/platform-bible-utils/` has changes: run `npm run build:platform-bible-utils`
>
> 1. `npm run typecheck`
> 2. `npm run lint` (run `npm run lint-fix` to auto-fix if it fails)
> 3. Format only the files changed in this review — do NOT run `npm run format` as it processes the entire workspace and reformats unrelated files (e.g. MDX documentation via `remark`). Instead run:
>    ```bash
>    git diff --name-only $MERGE_BASE | xargs npx prettier --write --ignore-unknown --ignore-path .prettierignorerun 2>/dev/null; echo "format done"
>    ```
> 4. `npm test` (run the full test suite; fix only test failures clearly related to the changes made during review)
>
> For each command: if it fails, try to fix the root cause in the code, then re-run. If you cannot determine whether a failure is related to the in-review changes, report it but do not fix it. Run all commands synchronously — not as background tasks.

After the subagent completes, ensure any remaining changes are staged:

```bash
git add -A
```

Store the subagent's results as `QUALITY_CHECK_RESULTS` (a summary of which checks passed, which needed fixes, and any unfixable failures) for inclusion in the summary. Display `QUALITY_CHECK_RESULTS` now, **before proceeding to Step 4.2**, so the quality output appears above the review summary message.

If there are unfixable failures, notify the author before proceeding:

> "I ran quality checks after the in-review changes and found [X] issue(s) I could not automatically fix: [list]. You may want to address these before posting the PR."

### Step 4.2 — Write .review/summary.md

Always write a completely fresh `.review/summary.md` — never read and merge with any existing file. Use the Write tool to create or overwrite `.review/summary.md` with this structure, filling in all values from the analysis and interview. Use `MERGED_FINDINGS` for the Findings sections, `TEMPLATE_PROPAGATION` for the Template Propagation section, `POSITIVE_OBSERVATIONS` for the Positive Observations section, `INTERVIEW_NOTES` for the Interview Notes section, and `QUALITY_CHECK_RESULTS` for the In-Review Quality Check section (omit that section if Step 4.1 was skipped):

```markdown
# Code Review Summary

**Branch**: <BRANCH>

**Base**: <BASE_BRANCH>

**Date**: <today's date>

**Review model**: $MODEL_NAME

**Files changed**: <FILE_COUNT — the exact count from Step 1.3>

## Overview

[1-2 paragraph summary of what the changes do, combining the author's stated purpose
with the analysis findings. Written in plain prose for a reviewer to read quickly.]

## API Changes

[Use the API_CHANGES_SUMMARY extracted from the `api` analysis agent's output.
This is a factual list of what changed in public API surfaces — do not paraphrase
or editorialize. Write "None" if no public API surfaces changed.]

## Findings

Finding states — follow this exactly:
- `- [ ] **Description**` — **Open**: unchecked, not struck through. Needs author attention.
- `- [ ] ~~Description~~  _(author's explanation)_` — **Dismissed**: unchecked + struck through. Author explained without a code change. The explanation goes *outside* the strikethrough.
- `- [x] **Description** _(fixed during review: what changed)_` — **Fixed**: checked, NOT struck through. Addressed with a code change.

**IMPORTANT**: Dismissed items use `[ ]` (unchecked) WITH strikethrough. Fixed items use `[x]` (checked) WITHOUT strikethrough. Never check the box on a dismissed item. Never strike through a fixed item.

Include **ALL** findings in each section — open, dismissed, and fixed.

### Critical — Must address before merge

- [ ] [open finding]
- [ ] ~~[dismissed finding]~~ _(author's explanation)_
- [x] [fixed finding] _(fixed during review: [description of change made])_

[Author response: e.g., "Author defended X as intentional because Y. Finding Z was fixed in-review."]

### Important — Should address before merge

- [ ] [open finding]
- [ ] ~~[dismissed finding]~~ _(author's explanation)_
- [x] [fixed finding] _(fixed during review: [description of change made])_

[Author response: e.g., "Author acknowledged Y and fixed it during the interview."]

### Minor — Consider

- [ ] [open finding]
- [ ] ~~[dismissed finding]~~ _(author's explanation)_
- [x] [fixed finding] _(fixed during review: [description of change made])_

[Author response: e.g., "Author said none of the remaining minor issues need discussion." or "Author addressed X; the rest are acknowledged."]

### Template Propagation

#### Shared Regions Modified

- [ ] `file:lines` — region shared with `repo`

#### Extension Config Changes

- [ ] `file` — propagate to `repo`
- [n/a] `file` — extension-specific, no propagation needed

## Positive Observations

- [things done well — good patterns, clean code, good tests, etc.]

## Interview Notes

[Key points from the author interview: stated purpose, explanations for
flagged items, decisions and reasoning. If Step 3.3 was asked, summarize the author's design explanation with enough
detail that a reviewer can tell what the author was uncertain about and raise
it in the meeting. Unresolved items (author could not explain
after follow-ups) are explicitly called out here.

**If the author expressed uncertainty or deferred to AI for any part of the changes**, list those areas explicitly:
- "Author does not understand: [area] — deferred to AI / said 'I'm not sure how this works'"

Do NOT soften this as "author is satisfied with the approach" or similar. Lack of understanding must be called out directly so the reviewer knows to cover it in the meeting.]

## In-Review Quality Check

[Only present if changes were made during the interview. Summary of quality
check results: which checks passed cleanly, which required auto-fixes (with
a brief description of what was fixed), and any unfixable failures the author
should address. Omit this section entirely if no changes were made during the
interview.]

## Suggested Review Focus

Prioritized areas for the author-reviewer meeting:

- [ ] [area or concern — e.g., "API change to `foo()` in platform-bible-utils: is the behavior change intentional?"]
- [ ] [area or concern]

[Include any points where the author expressed uncertainty in Step 3.3, with enough context for the reviewer to discuss them specifically. If the author could not explain certain changes (deferred to AI or said they were unsure), list those areas here as explicit agenda items — e.g., "Author does not understand the X implementation — walk through it in the review meeting."]
```

If a findings section is empty, write "None." instead of leaving it blank.

### Step 4.3 — Offer PR creation

Display:

> "Review summary written to `.review/summary.md`.
>
> Please review `.review/summary.md`, make changes to your branch where appropriate, and run `/review-paratext` again until you are ready to post the PR.
>
> If you do not want to make any changes and are ready for review, would you like me to commit (if there are uncommitted changes), push, and post the PR? I will check if one already exists for this branch and update it, or create a new one if not — using this summary as the description."

If the author confirms, proceed to Phase 5. Otherwise, display:

> **Next steps:**
>
> 1. Review the summary and fix any issues you agree with
> 2. If you fixed things, run `/review-paratext` again
> 3. When satisfied, run `/review-paratext` again and choose to create the PR at that point — or if you prefer to post manually, wrap the summary in `<!-- review-paratext:summary:start -->` / `<!-- review-paratext:summary:end -->` markers so future runs can update it automatically
> 4. Address Devin AI feedback on the PR
> 5. Schedule a review meeting with your reviewer — use the "Suggested Review Focus" section as the agenda

---

## Phase 5: PR Creation / Update

This phase runs only if the author confirmed they are ready to create or update a PR.

### Step 5.1 — Commit any working changes and push

**First, commit any uncommitted changes** (fixes made during the interview, quality check fixes, and any pre-existing working changes):

```bash
git status --porcelain
```

If there are uncommitted changes, generate a descriptive commit message based on `INTERVIEW_CHANGES`. The message should summarize what was actually fixed during the review — not a generic placeholder. Examples:

- Single fix: `"fix: use ellipsis character instead of three dots in menu labels"`
- Multiple fixes: `"fix: address review findings\n\n- Replace three-dot ellipses with proper … character\n- Add missing null check in FooComponent\n- Correct sentence case on dialog headings"`
- If the only changes are from the quality check auto-formatter: `"chore: apply auto-formatting"`

Then commit:

```bash
git add -A
git commit -m "$(cat <<'EOF'
<generated descriptive message>

Co-Authored-By: $MODEL_NAME <noreply@anthropic.com>
Session-URL: $SESSION_URL
EOF
)"
```

**Then push if there are commits that haven't been pushed yet:**

```bash
UNPUSHED=$(git log @{u}..HEAD --oneline 2>/dev/null | wc -l || echo "0")
if [ "$UNPUSHED" -gt "0" ]; then
  git push
fi
```

If the branch has no upstream yet (the push fails with no upstream), push with `-u`:

```bash
git push -u origin "$(git branch --show-current)"
```

### Step 5.2 — Detect existing PR

```bash
PR_INFO=$(gh pr list --head "$(git branch --show-current)" --json number,url --jq '.[0]' 2>/dev/null)
PR_NUMBER=$(echo "$PR_INFO" | jq -r '.number // empty')
PR_URL=$(echo "$PR_INFO" | jq -r '.url // empty')
```

- If `PR_NUMBER` is empty → no PR exists, go to "Create new PR"
- If `PR_NUMBER` is set → PR exists, go to "Update existing PR"

### Step 5.3a — Create new PR

1. Generate PR title:
   - Extract JIRA prefix from branch name: `pt-1234-anything` → `PT-1234:`
   - If no JIRA prefix found, use no prefix
   - Derive a sentence-case title from the main focus of the changes as understood from the analysis and interview — not just the branch slug
   - Example: branch `pt-1234-improve-my-feature`, main change is a performance fix → `PT-1234: Improve performance of foo rendering`

2. Build PR body by reading `.review/summary.md`, wrapping with markers, and appending the AI-assisted attribution line:

```
<!-- review-paratext:summary:start -->
[full contents of .review/summary.md]
<!-- review-paratext:summary:end -->

AI-assisted — [session]($SESSION_URL)
```

3. Create PR using a temporary file to avoid shell escaping issues:

```bash
BASE_REF=${BASE_BRANCH#origin/}
echo "$WRAPPED_SUMMARY" > /tmp/pr-body.md
gh pr create \
  --title "<generated title>" \
  --body-file /tmp/pr-body.md \
  --base "$BASE_REF"
rm /tmp/pr-body.md
```

4. Capture and print the PR URL.

### Step 5.3b — Update existing PR

1. Fetch current body:

```bash
CURRENT_BODY=$(gh pr view "$PR_NUMBER" --json body --jq '.body')
```

2. Build new wrapped summary (same as creation — read `.review/summary.md` and wrap with markers).

3. Replace or inject:
   - **If markers present** in `CURRENT_BODY`: replace everything from `<!-- review-paratext:summary:start -->` through `<!-- review-paratext:summary:end -->` (inclusive) with the new wrapped summary
   - **If markers not present**: prepend the wrapped summary to `CURRENT_BODY`, separated by a horizontal rule with blank lines before and after it (`\n\n---\n\n`)

4. Update PR using a temporary file to avoid shell escaping issues:

```bash
echo "$NEW_BODY" > /tmp/pr-body.md
gh pr edit "$PR_NUMBER" --body-file /tmp/pr-body.md
rm /tmp/pr-body.md
```

5. Print the PR URL.

### Step 5.4 — Next steps

Display:

> PR [created/updated]: <PR_URL>
>
> **Next steps:**
>
> 1. Review the summary and fix any issues you agree with
> 2. If you fixed things, run `/review-paratext` again
> 3. Address Devin AI feedback on the PR
> 4. Schedule a review meeting with your reviewer — use the "Suggested Review Focus" section as the agenda

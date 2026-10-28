---
name: pr-creator
description: "[paranext-core ONLY] Create PRs with AI transparency, code steward integration, and team workflow compliance. Handles branch naming, template change detection, and Reviewable integration. NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read, Grep
---

# PR Creator Skill

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

Create pull requests for Platform.Bible following team standards.

## Quick Reference

| Action | Command |
|--------|---------|
| Check branch | `git rev-parse --abbrev-ref HEAD` |
| Extract JIRA ID | `git rev-parse --abbrev-ref HEAD \| grep -oE '^[a-z]+-[0-9]+' \| tr 'a-z' 'A-Z'` |
| Check for template changes | `git log main..HEAD --oneline \| grep -i template` |
| Push branch | `git push -u origin $(git rev-parse --abbrev-ref HEAD)` |
| Create PR | `gh pr create --title "..." --body "..."` |
| View PR | `gh pr view --web` |

## Step 1: Verify the branch before the PR exists

Before anything else — before the pre-flight checks, before the push — run the verification pass
of the `process-pr-feedback` plugin on the branch, which is the checked-out one with a clean tree:

```
/process-pr-feedback:process-pr-feedback --verify-only <branch> [--base <base>] [--scenarios <path>]
```

It runs the build and lint battery, the whole test suites, the e2e specs for the area, and a live
run of each scenario in the dev app with evidence, and ends with a table of the checks. Pass
`--base` for a branch stacked on an unmerged one. The scenarios come from the requirement (the
branch's Jira ticket, or the design or plan `--scenarios` names), never from the code, so a
scenario the diff happens to satisfy cannot stand in for one the ticket asked for. The mode owns
the detail; read its section in that skill rather than this one.

Put the table it ends with into the PR body under a `## Verification` heading, as it was presented:
every row, including the ones that failed or did not run, with the reason. A red row — a command
that failed, a scenario that did not behave as expected, a roborev finding the mode left open — is
a reason to fix the branch and run the mode again before opening the PR; a test the table shows
red on the base too stays in the table marked pre-existing. A row saying the build changed
`papi.d.ts` is neither: commit that file on the branch (it is generated, never hand-edited) and run
the mode again. A not-run row stays with its reason and does not block the PR. Screenshots the
table cites are local files under `.review/`; embed them with the `pr-attach` skill where it is
available, else name the file.

Without the plugin installed, tell the user and offer `/plugin install process-pr-feedback@paratext-team`.
If they decline, run what you can by hand — the battery (`npm run build:types`,
`npm run build:main`, `npm run typecheck && npm run lint && npm run format:check`) and the suites
capped (`npx vitest run --maxWorkers=4`, then
`npm run test --workspaces --if-present -- --run --maxWorkers=2`, and `dotnet test c-sharp-tests/`
when the diff touches `c-sharp/` or `c-sharp-tests/`; never bare `npm test`, which forks a worker
per CPU and can take the machine down) — and write in the `## Verification` section that the
plugin was not used, so the e2e run, the live run and the scenarios were not done. These commands
are written out here only because the plugin, which owns them, is absent in that case.

## Pre-Flight Checks

Before creating a PR, verify:

```bash
# 1. Not on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "main" ]; then
  echo "ERROR: Cannot create PR from main branch"
  exit 1
fi

# 2. Branch follows naming convention (lowercase, JIRA prefix)
if ! echo "$BRANCH" | grep -qE '^[a-z]+-[0-9]+-'; then
  echo "WARNING: Branch name should follow pattern: pt-1234-description"
fi

# 3. Branch is pushed
git push -u origin "$BRANCH" 2>/dev/null || true

# 4. Tests pass — skip when Step 1 ran; by hand, keep vitest capped (bare `npm test`
#    forks a worker per CPU and can exhaust the machine's memory)
npx vitest run --maxWorkers=4
dotnet test c-sharp-tests/
```

## Automated Analysis

### Extract JIRA ID

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
JIRA_ID=$(echo "$BRANCH" | grep -oE '^[a-z]+-[0-9]+' | tr 'a-z' 'A-Z')

if [ -n "$JIRA_ID" ]; then
  echo "JIRA: $JIRA_ID"
  echo "Link: https://paratextstudio.atlassian.net/browse/$JIRA_ID"
else
  echo "No JIRA ID found in branch name"
fi
```

### Detect Template Changes

Template updates must NOT be squash-merged. Check before creating PR:

```bash
# Check git log for template merges
if git log main..HEAD --oneline | grep -qiE 'template|allow-unrelated-histories'; then
  echo "WARNING: Template changes detected!"
  echo "Use 'Create a merge commit' - NOT 'Squash and merge'"
fi

# Check for template-related files
if git diff main...HEAD --name-only | grep -qiE 'template'; then
  echo "WARNING: Template files changed!"
fi
```

### Identify Code Stewards

```bash
# Get changed files and match against CODEOWNERS
CHANGED=$(git diff main...HEAD --name-only)

echo "Changed files:"
echo "$CHANGED"

echo ""
echo "Check .github/CODEOWNERS for required reviewers"
```

Key code steward areas:
- `lib/platform-bible-react/*` - @jolierabideau @rolfheij-sil @tjcouch-sil @lyonsil @irahopkinson
- `lib/platform-bible-utils/*` - @rolfheij-sil @tjcouch-sil @lyonsil @jolierabideau @irahopkinson
- Most other paths - @tjcouch-sil @lyonsil @irahopkinson

## PR Templates

### Minimal Template (Simple Changes)

```bash
gh pr create \
  --title "PT-1234: Brief description" \
  --body "$(cat <<'EOF'
## Summary

[Brief description of what this PR does. Why review this.]

## Changes

- [Change 1]
- [Change 2]

## Verification

[The table `--verify-only` ended with, every row.]
EOF
)"
```

### Full Template (AI-Generated or Complex Changes)

```bash
gh pr create \
  --title "PT-1234: Brief description" \
  --body "$(cat <<'EOF'
## Summary

[Description of what this PR does and why. Why review this.]

## Changes

- [Change 1]
- [Change 2]

## AI Involvement

[Disclose AI assistance per the repository's authorship-attribution rule
(see "Git & PR Conventions" in the project CLAUDE.md). Briefly describe what
AI contributed and how it was reviewed.]

## Verification

[The table `--verify-only` ended with, every row.]

## Risk Level

[Low|Medium|High] - [Brief justification]
EOF
)"
```

### Template Update PR (Auto-Add Warning)

When template changes are detected, include this warning banner at the top:

```bash
gh pr create \
  --title "PT-1234: Update from template" \
  --body "$(cat <<'EOF'
> **Warning**
> **TEMPLATE UPDATE - DO NOT SQUASH MERGE**
>
> This PR contains template changes. Use "Create a merge commit" instead of "Squash and merge" to preserve git history.

## Summary

Merge latest changes from paranext-extension-template. [Why review this.]

## Changes

- [Template updates]

## Verification

[The table `--verify-only` ended with, every row.]
EOF
)"
```

### Template for `Why review this`

```
### Why review this

[Either: (a) which current epic (side fixes, tooling,
refactors, dependency bumps, cleanup) this PR part of, xor
(b) "Not part of current epic." then 1–2 sentences: what
prompted this change and why it is worth reviewer time now. What the
current epic is: .context/standards/Current-Epic.md]
```


## AI Transparency

When AI was involved in creating code, disclose it according to the
repository's authorship-attribution rule (see the "Git & PR Conventions"
section of the project `CLAUDE.md`). That rule is the source of truth for
how AI assistance is credited in commits and PR descriptions — follow its
format rather than inventing one here. The human developer remains the
author; AI is attributed as a generator/assistant, not an author.

If the repository's rule does not specify a format for a given situation,
add a brief, honest note in the PR body describing what AI contributed
(for example, which files or portions were AI-generated and how they were
reviewed). The "Full Template" above leaves room for such a note.

## Merge Strategy

### Default: Squash and Merge

Use "Squash and merge" in GitHub UI for most PRs.

### Exception: Template Updates

**NEVER squash-merge template updates!**

If your PR includes:
- Creating new extensions
- Merging from paranext-extension-template
- Merging from paranext-multi-extension-template

You MUST use "Create a merge commit" to preserve git history. Squash-merging will cause future template updates to fail.

## Post-Creation Steps

After creating the PR:

1. **Post in Discord `#reviews` channel**
   ```
   [New PR] PT-1234: Brief description
   https://github.com/paranext/paranext-core/pull/XXX
   ```

2. **Monitor Reviewable**
   - Badge auto-added to PR
   - Use Reviewable (not GitHub) for detailed reviews

3. **Watch for reactions**
   - `:code_review:` = partial review in progress
   - `:white_check_mark:` = complete review done

4. **After approval**
   - Merge using "Squash and merge" (or merge commit for templates)
   - Delete branch if prompted

## Troubleshooting

### "Branch name doesn't match convention"

```bash
# Rename branch
git branch -m old-name pt-1234-new-name
git push origin :old-name
git push -u origin pt-1234-new-name
```

### "gh: command not found"

```bash
# Install GitHub CLI (macOS)
brew install gh
gh auth login
```

### "Cannot create PR - not pushed"

```bash
git push -u origin $(git rev-parse --abbrev-ref HEAD)
```

### "Need to update PR after creation"

```bash
# Update title or body
gh pr edit --title "New title"
gh pr edit --body "New body"

# Add more commits
git add .
git commit -m "Address review feedback"
git push
```

## See Also

- [Current-Epic.md](../../../.context/standards/Current-Epic.md) - What the current epic is and where it is articulated
- [Git-Guide.md](../../../.context/standards/Git-Guide.md) - Branch naming, merge practices
- [Code-Review-Guide.md](../../../.context/standards/Code-Review-Guide.md) - Review workflow
- [test-runner skill](../test-runner/SKILL.md) - Run tests before PR
- `process-pr-feedback` plugin (the `paratext-team` marketplace, `/plugin marketplace add paranext/claude-plugins`) - its `--verify-only` mode is Step 1 above

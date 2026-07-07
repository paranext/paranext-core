---
name: pr-creator
description: "[paranext-core ONLY] Create PRs with AI transparency, code steward integration, and team workflow compliance. Handles branch naming, template change detection, and Reviewable integration. NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read, Grep
---

# PR Creator Skill

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

# 4. Tests pass (optional but recommended)
npm test
dotnet test c-sharp-tests/
```

## Automated Analysis

### Extract JIRA ID

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
JIRA_ID=$(echo "$BRANCH" | grep -oE '^[a-z]+-[0-9]+' | tr 'a-z' 'A-Z')

if [ -n "$JIRA_ID" ]; then
  echo "JIRA: $JIRA_ID"
  echo "Link: https://paratext.atlassian.net/browse/$JIRA_ID"
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

[Brief description of what this PR does]

## Changes

- [Change 1]
- [Change 2]

## Testing

- [ ] Tests pass
- [ ] Manual verification done
EOF
)"
```

### Full Template (AI-Generated or Complex Changes)

```bash
gh pr create \
  --title "PT-1234: Brief description" \
  --body "$(cat <<'EOF'
## Summary

[Description of what this PR does and why]

## Changes

- [Change 1]
- [Change 2]

## AI Involvement

[Disclose AI assistance per the repository's authorship-attribution rule
(see "Git & PR Conventions" in the project CLAUDE.md). Briefly describe what
AI contributed and how it was reviewed.]

## Testing

- [ ] Tests pass
- [ ] Manual verification done

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

Merge latest changes from paranext-extension-template.

## Changes

- [Template updates]

## Testing

- [ ] Build succeeds
- [ ] Existing functionality unaffected
EOF
)"
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

### When there's no session URL (e.g. Claude Code CLI)

A Claude Code CLI session is a local transcript, not a hosted page, so there is no
shareable URL to link. Do **not** silently drop the attribution or invent a URL —
instead record the command that reopens the exact session, so future-you (or a
reviewer) can pull up the full history later:

```text
AI-assisted (Claude Code). Resume this session: `claude --resume <session-id>`
(run from the `<worktree-or-project-dir>`).
```

Find `<session-id>` (a UUID) in the transcript path
`~/.claude/projects/<encoded-cwd>/<session-id>.jsonl`. Resume is scoped to the working
directory, so state which worktree/dir to run it from. Prefer a real shareable URL when
one exists (e.g. a claude.ai web/desktop session); use the `--resume` command only as the
fallback.

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

- [Git-Guide.md](../../../.context/standards/Git-Guide.md) - Branch naming, merge practices
- [Code-Review-Guide.md](../../../.context/standards/Code-Review-Guide.md) - Review workflow
- [test-runner skill](../test-runner/SKILL.md) - Run tests before PR

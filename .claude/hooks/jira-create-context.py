#!/usr/bin/env python3
"""PreToolUse: deliver the Jira issue-creation rule at the moment it applies.

`.claude/rules/jira-issue-creation.md` is path-scoped, but its trigger is a tool
call rather than a file location -- the rule matters when an issue is being
created, which can happen from any directory. Path scoping cannot express that,
so the rule was reaching almost nobody.

This reads that same file and injects it as context on the create/edit calls.
The rule file stays the single source of truth; this is only delivery, so the
two can never drift apart.

Never blocks -- it supplies information, it does not gate.
"""

import json
import os
import re
import sys

RULE = ".claude/rules/jira-issue-creation.md"


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0

    root = os.environ.get("CLAUDE_PROJECT_DIR", ".")
    try:
        with open(os.path.join(root, RULE), errors="ignore") as handle:
            body = handle.read()
    except OSError:
        return 0  # Rule deleted or renamed; say nothing rather than guess.

    # Drop the frontmatter; the paths list is not useful to read at call time.
    body = re.sub(r"\A---\n.*?\n---\n", "", body, flags=re.S).strip()
    if not body:
        return 0

    json.dump(
        {"hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "additionalContext": f"Repo rule for this call ({RULE}):\n\n{body}",
        }},
        sys.stdout,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

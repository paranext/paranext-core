#!/usr/bin/env python3
"""Self-check for bash-guardrails.py. Run directly: python3 test_bash_guardrails.py

Every ALLOW case is a command someone would plausibly run in this repo, so a
regression here shows up as a false refusal rather than a missed block.
"""

import json
import subprocess
import sys
from pathlib import Path

HOOK = Path(__file__).parent / "bash-guardrails.py"

BLOCK = [
    "./.erb/scripts/refresh.sh | tail -f",
    ".erb/scripts/refresh.sh 2>&1 | tee /tmp/out.log",
    "npm start | tee start.log",
    "npm run start:data | grep -i error",
    "git rebase --continue || git rebase --skip",
    "while true; do git cherry-pick --continue || git cherry-pick --skip; done",
    'gh pr comment 2611 --body "looks good"',
    "gh issue create --title x --body 'has | a pipe'",
    "sed -i 's|foo|bar|baz|' notes.md",
    "sed -i 's/a/b/c/d/' notes.md",
]

ALLOW = [
    "npm start > /tmp/start.log 2>&1",
    "npm start",
    "npm start || echo failed",               # `||` is not a pipe
    "./.erb/scripts/refresh.sh || echo 'start failed'",
    "npm start && npm run start:data",        # two starters, no pipe
    "npm start &",
    # A pipe belonging to a later, unrelated command must not implicate the
    # starter. This shape blocked a real command during review.
    "for c in 'npm start && npm run start:data'; do echo \"$c\" | wc -c; done",
    "echo 'run npm start | tail to see logs'",
    # A starter named inside a quoted argument is not a starter being run.
    # This exact shape blocked a grep during review.
    r"""grep -nE '^\+.*(refresh\.sh|npm start).*\|' /tmp/x.diff | cut -c1-190""",
    "grep -c 'npm start' notes.md | wc -l",
    "echo 'see .erb/scripts/refresh.sh | tail' > /tmp/note.txt",
    "npm run startup-waterfall | head -40",   # not a starter
    "npm test | tail -20",
    "npm run build && npm run lint",
    "gh pr comment 2611 --body-file /tmp/body.md",
    "gh pr view 2611 --json title",
    "sed -i 's/foo/bar/' /home/paratext/git/paranext-core/README.md",
    "sed -n '1,20p' file.txt",
    "git rebase --continue",
    "git rebase --abort",
    "ls -la | grep claude",
    "cat package.json | jq .scripts",
    "echo 'done'",
]


def run(command):
    payload = json.dumps({"tool_input": {"command": command}})
    proc = subprocess.run(
        [sys.executable, str(HOOK)], input=payload, capture_output=True, text=True
    )
    return proc.returncode, proc.stderr.strip()


def main():
    failures = []
    for cmd in BLOCK:
        code, err = run(cmd)
        if code != 2:
            failures.append(f"SHOULD BLOCK (got {code}): {cmd}")
        elif not err:
            failures.append(f"blocked with no explanation: {cmd}")
    for cmd in ALLOW:
        code, err = run(cmd)
        if code != 0:
            failures.append(f"SHOULD ALLOW (got {code}): {cmd}\n    said: {err}")

    total = len(BLOCK) + len(ALLOW)
    if failures:
        print(f"FAIL — {len(failures)}/{total} cases wrong:\n")
        print("\n".join("  " + f for f in failures))
        return 1
    print(f"ok — {len(BLOCK)} blocked, {len(ALLOW)} allowed, {total} cases pass")
    return 0


if __name__ == "__main__":
    sys.exit(main())

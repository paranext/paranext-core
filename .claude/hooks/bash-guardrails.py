#!/usr/bin/env python3
"""PreToolUse guardrails for Bash commands.

Blocks four command shapes that have each cost real debugging time in this repo.
Each check exists because the prose version of the rule failed at least once.

Reads the PreToolUse hook payload on stdin; exits 2 with an explanation on
stderr to block the call, or 0 to allow it. Exit 1 would NOT block, so every
refusal path here must use exit 2.
"""

import json
import re
import shlex
import sys

SEPARATORS = {";", "&&", "||", "&", "\n"}

# Anything that could begin a new command, used to anchor "command position"
# in the checks that still work on raw text.
CMD_START = r"(?:^|[;&|]\s*|&&\s*|\|\|\s*|\(\s*|\bthen\s+|\bdo\s+)"


def segments(cmd):
    """Split a command line into pipeline segments of shell tokens.

    Uses shlex rather than a regex because every false positive this check has
    produced came from reading shell text without understanding quoting: a `|`
    inside a quoted regex looked like a pipe, and `||` looked like one too.
    shlex keeps quoted content inside a single token and emits real operators
    separately.

    Returns None when the line cannot be tokenized (unbalanced quotes, shell
    syntax shlex does not model), which callers treat as "do not judge".
    """
    lexer = shlex.shlex(cmd, posix=True, punctuation_chars=True)
    lexer.whitespace_split = True
    try:
        tokens = list(lexer)
    except ValueError:
        return None
    out, current = [], []
    for token in tokens:
        if token in SEPARATORS:
            out.append(current)
            current = []
        else:
            current.append(token)
    out.append(current)
    return out


def starter_name(tokens):
    """The long-running starter a segment invokes, or None.

    Matches only at the head of the segment, so a starter named inside a quoted
    argument is not mistaken for one being run. `start:data` counts;
    `startup-waterfall` does not.
    """
    words = [t for t in tokens if "=" not in t.split("/")[0] or t.startswith("/")]
    if not words:
        return None
    head = words[0]
    if head.split("/")[-1] == "refresh.sh":
        return head
    if head != "npm" or len(words) < 2:
        return None
    if words[1] == "start":
        return "npm start"
    if words[1] == "run" and len(words) > 2:
        script = words[2]
        base = re.split(r"[:-]", script)[0]
        if base in ("start", "dev"):
            return f"npm run {script}"
    return None


def check_pipe_starters(cmd):
    """`refresh.sh | tail` hangs forever — the persistent child holds the pipe.

    Only a `|` operator in the starter's own segment counts, and only when the
    starter is the command being run rather than a word inside an argument.
    """
    parts = segments(cmd)
    if parts is None:
        return None
    for tokens in parts:
        name = starter_name(tokens)
        if name and "|" in tokens:
            return (
                f"Blocked: piping a long-running starter ({name}).\n"
                "The child process holds the pipe open and the command never returns "
                "(this cost 4 hours once).\n"
                "Redirect to a file instead:  npm start > /tmp/start.log 2>&1"
            )
    return None


def check_rebase_blanket_skip(cmd):
    """`--continue || --skip` silently drops commits that failed for other reasons."""
    if re.search(r"(rebase|cherry-pick|\bam\b).*--continue.*\|\|.*--skip", cmd, re.S):
        return (
            "Blocked: `--continue || --skip` in a rebase/cherry-pick loop.\n"
            "A pick that fails on an untracked-file collision or a hook error looks "
            "identical to an empty commit here, so this silently drops real work.\n"
            "Resolve each stop individually, or inspect the failure before skipping."
        )
    return None


def check_gh_inline_body(cmd):
    """Inline --body mangles backticks, emoji, pipes, and shell-expanded content."""
    if not re.search(CMD_START + r"gh\b", cmd):
        return None
    # --body-file is the correct form and starts with the same characters.
    stripped = re.sub(r"--body-file\b", "", cmd)
    if re.search(r"--body[= ]", stripped):
        return (
            "Blocked: `gh ... --body` with an inline value.\n"
            "Shell quoting mangles backticks, pipes, emoji, and table rows in PR/issue "
            "bodies.\n"
            "Write the body to a file and use `--body-file <path>` instead."
        )
    return None


def check_sed_delimiter(cmd):
    """A delimiter that also appears in the pattern silently rewrites the wrong text."""
    if not re.search(CMD_START + r"sed\b", cmd):
        return None
    # Only look inside the quoted sed script. Counting across the whole command
    # would trip on ordinary path arguments like `sed 's/a/b/' /path/to/file`.
    for quoted in re.findall(r"'([^']*)'|\"([^\"]*)\"", cmd):
        script = quoted[0] or quoted[1]
        m = re.match(r"\s*(?:\d+|\$)?\s*[sy](.)", script)
        if not m:
            continue
        delim = m.group(1)
        if delim.isalnum() or delim.isspace() or delim == "\\":
            continue
        # A well-formed s<D>pattern<D>replacement<D>flags leaves exactly two
        # unescaped delimiters after the opening one.
        unescaped = len(re.findall(r"(?<!\\)" + re.escape(delim), script[m.end():]))
        if unescaped > 2:
            return (
                f"Blocked: `sed` expression whose delimiter ({delim!r}) also appears in "
                "the pattern.\n"
                "sed will split on the wrong character and rewrite text you did not "
                "target.\n"
                "Use `Edit`/`Write`, or python3, for content containing pipes, slashes, "
                "or unicode."
            )
    return None


CHECKS = (
    check_pipe_starters,
    check_rebase_blanket_skip,
    check_gh_inline_body,
    check_sed_delimiter,
)


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0  # Never block on a payload we cannot read.
    command = payload.get("tool_input", {}).get("command", "")
    if not command:
        return 0
    for check in CHECKS:
        message = check(command)
        if message:
            print(message, file=sys.stderr)
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())

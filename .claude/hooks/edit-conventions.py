#!/usr/bin/env python3
"""PostToolUse checks for conventions mechanical enough to verify.

These replace two rule files that previously had to sit in always-loaded context
to have any effect. Both checks read the working-tree diff for the edited file
rather than the tool's own arguments, because the tool arguments cannot answer
the questions that matter:

  - A whole-file Write to a shadcn component that already contained a
    `// CUSTOM:` line from an earlier change would pass a naive "is the string
    present" check while adding an unannotated change.
  - The keyboard-catalog rule covers *removing* a handler as well as adding one,
    and a removal produces no new text to match against.

Working from the diff also means edits made through Bash (sed, a script, git
apply) are covered on the next tool-mediated edit, instead of being invisible.

Reads the PostToolUse payload on stdin. The edit has already been applied, so
exit 2 does not undo it; it reports the problem back for a follow-up fix.
"""

import json
import os
import re
import subprocess
import sys

SHADCN_DIR = "lib/platform-bible-react/src/components/shadcn-ui/"
CATALOG = "src/stories/keyboard-shortcuts.data.ts"

KEY_HANDLERS = re.compile(
    r"useHotkeys\s*\(|addEventListener\s*\(\s*['\"]key(?:down|up|press)|"
    r"removeEventListener\s*\(\s*['\"]key(?:down|up|press)|"
    r"before-input-event|globalShortcut\.(?:register|unregister)|accelerator\s*:",
    re.I,
)


HUNK = re.compile(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@")


def diff_hunks(path):
    """Per-hunk (start_line_in_new_file, added, removed) for `path` versus HEAD.

    Hunk granularity is the point: the shadcn convention requires an annotation
    immediately before *each* changed region, so a file-wide "is CUSTOM: present
    anywhere" test lets one annotated hunk absolve every other change in the
    same file.
    """
    try:
        out = subprocess.run(
            ["git", "diff", "-U0", "--no-color", "HEAD", "--", path],
            capture_output=True, text=True, timeout=10,
        ).stdout
        if not out.strip():
            tracked = subprocess.run(
                ["git", "ls-files", "--error-unmatch", path],
                capture_output=True, text=True, timeout=10,
            ).returncode == 0
            if not tracked and os.path.exists(path):
                with open(path, errors="ignore") as handle:
                    return [(1, handle.read().splitlines(), [])]
            return []
    except (subprocess.SubprocessError, OSError):
        return None  # Cannot tell — do not guess, do not block.

    hunks, start, added, removed = [], None, [], []
    for line in out.splitlines():
        match = HUNK.match(line)
        if match:
            if start is not None:
                hunks.append((start, added, removed))
            start, added, removed = int(match.group(1)), [], []
        elif start is None or line.startswith(("+++", "---")):
            continue
        elif line.startswith("+"):
            added.append(line[1:])
        elif line.startswith("-"):
            removed.append(line[1:])
    if start is not None:
        hunks.append((start, added, removed))
    return hunks


def preceding_lines(path, start, count=3):
    """The lines just above a hunk, where the annotation is supposed to live."""
    try:
        with open(path, errors="ignore") as handle:
            body = handle.read().splitlines()
    except OSError:
        return []
    return body[max(0, start - 1 - count):max(0, start - 1)]


def check_shadcn(path, hunks):
    if SHADCN_DIR not in path.replace("\\", "/"):
        return None
    for start, added, _ in hunks:
        substantive = [
            ln for ln in added if ln.strip() and not ln.strip().startswith("//")
        ]
        if not substantive:
            continue
        nearby = added + preceding_lines(path, start)
        if any("CUSTOM:" in ln for ln in nearby):
            continue
        return (
            f"Convention violation: {path} line {start} changes code with no "
            "`// CUSTOM:` annotation on or immediately above it.\n\n"
            "Every change under shadcn-ui/ must carry a `// CUSTOM:` comment placed "
            "immediately before the changed code, explaining:\n"
            "  - WHAT was changed (be specific — name the class, prop, or element)\n"
            "  - WHAT the change does\n"
            "  - WHY it was made\n\n"
            "This applies to every edit, including small mechanical "
            "find-and-replace changes. There are no exceptions.\n"
            "Full convention: "
            ".context/standards/Code-Style-Guide.md#shadcnui-guidelines"
        )
    return None


def check_keyboard(path, added, removed):
    norm = path.replace("\\", "/")
    # The catalog itself, prose describing shortcuts, and this tooling (whose
    # own pattern literals match) are not handler sites.
    if norm.endswith(CATALOG) or norm.startswith(".claude/") or norm.endswith(".md"):
        return None
    touched = [ln for ln in (added or []) + (removed or []) if KEY_HANDLERS.search(ln)]
    if not touched:
        return None
    verb = "adds or changes" if any(
        KEY_HANDLERS.search(ln) for ln in (added or [])
    ) else "removes"
    return (
        f"This edit {verb} a keyboard handler in {path}.\n\n"
        f"Platform.Bible documents every shortcut in ONE hand-maintained catalog: "
        f"{CATALOG}. Add, update, or REMOVE the matching KeyboardShortcutEntry as "
        "part of this same change — no matter which part of the app the handler "
        "lives in (main process, extension, or component library).\n\n"
        "Keep `purpose`, `category`, `context`, per-OS `keys`, and `locations` "
        "(repo-relative paths) accurate. Per-OS display conventions: macOS uses "
        "symbols with no separator; Windows/Linux use words joined with `+`. See the "
        "`Guidelines/Keyboard shortcuts` Storybook page."
    )


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0
    path = (payload.get("tool_input") or {}).get("file_path", "")
    if not path:
        return 0

    rel = os.path.relpath(path, os.environ.get("CLAUDE_PROJECT_DIR", ".")) \
        if os.path.isabs(path) else path
    hunks = diff_hunks(rel)
    if hunks is None:
        return 0

    blocking = check_shadcn(rel, hunks)
    if blocking:
        print(blocking, file=sys.stderr)
        return 2

    added = [ln for _, a, _ in hunks for ln in a]
    removed = [ln for _, _, r in hunks for ln in r]
    reminder = check_keyboard(rel, added, removed)
    if reminder:
        json.dump(
            {"hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": reminder,
            }},
            sys.stdout,
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""PostToolUse checks for conventions that are mechanical enough to verify.

Each check here replaces a rule that previously had to sit in always-loaded
context to have any effect:

  shadcn `// CUSTOM:` annotations  -> blocks (exit 2), the convention has no exceptions
  keyboard-shortcut catalog        -> reminds (additionalContext), since the hook
                                      cannot tell whether the catalog was already
                                      updated in the same change

Reads the PostToolUse payload on stdin. The edit has already been applied, so
exit 2 does not undo anything; it reports the problem back for a follow-up fix.
"""

import json
import re
import sys

SHADCN_DIR = "lib/platform-bible-react/src/components/shadcn-ui/"

KEY_HANDLERS = re.compile(
    r"useHotkeys\s*\(|addEventListener\s*\(\s*['\"]key(?:down|up|press)|"
    r"onKeyDown|onKeyUp|before-input-event|globalShortcut\.register|accelerator:",
    re.I,
)

CATALOG = "src/stories/keyboard-shortcuts.data.ts"


def added_text(tool_input):
    """The text this edit introduced, across Edit / Write / MultiEdit shapes."""
    if "content" in tool_input:
        return tool_input["content"]
    parts = [tool_input.get("new_string", "")]
    for edit in tool_input.get("edits", []) or []:
        parts.append(edit.get("new_string", ""))
    return "\n".join(p for p in parts if p)


def check_shadcn(path, new_text):
    if SHADCN_DIR not in path.replace("\\", "/"):
        return None
    if "CUSTOM:" in new_text:
        return None
    return (
        f"Convention violation: edited {path} without a `// CUSTOM:` annotation.\n"
        "Every change under shadcn-ui/ must be annotated immediately before the changed "
        "code, stating what changed, what it does, and why — no exceptions.\n"
        "See .context/standards/Code-Style-Guide.md#shadcnui-guidelines"
    )


def check_keyboard(path, new_text):
    if path.replace("\\", "/").endswith(CATALOG):
        return None
    if not KEY_HANDLERS.search(new_text):
        return None
    return (
        f"This edit to {path} adds or changes a keyboard handler. "
        f"Platform.Bible keeps one hand-maintained catalog of every shortcut at "
        f"{CATALOG} — add, update, or remove the matching KeyboardShortcutEntry "
        "(purpose, category, context, per-OS keys, locations) as part of this change."
    )


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0
    tool_input = payload.get("tool_input", {}) or {}
    path = tool_input.get("file_path", "")
    if not path:
        return 0
    new_text = added_text(tool_input)
    if not new_text:
        return 0

    blocking = check_shadcn(path, new_text)
    if blocking:
        print(blocking, file=sys.stderr)
        return 2

    reminder = check_keyboard(path, new_text)
    if reminder:
        json.dump(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PostToolUse",
                    "additionalContext": reminder,
                }
            },
            sys.stdout,
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())

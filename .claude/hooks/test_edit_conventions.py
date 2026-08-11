#!/usr/bin/env python3
"""Self-check for edit-conventions.py. Run directly: python3 test_edit_conventions.py

Builds a throwaway git repo per case, because both checks read the working-tree
diff rather than the tool's arguments.

The case that matters most is `second_hunk_unannotated`: a file-wide "is CUSTOM:
present anywhere" test passes it, which is how the first version of this hook
shipped a hole while appearing to work.
"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

HOOK = Path(__file__).resolve().parent / "edit-conventions.py"
SHADCN = "lib/platform-bible-react/src/components/shadcn-ui/button.tsx"


def repo(baseline_files):
    """A temp git repo with `baseline_files` committed."""
    root = Path(tempfile.mkdtemp())
    subprocess.run(["git", "init", "-q"], cwd=root, check=True)
    subprocess.run(["git", "config", "user.email", "t@t"], cwd=root, check=True)
    subprocess.run(["git", "config", "user.name", "t"], cwd=root, check=True)
    for name, body in baseline_files.items():
        path = root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(body)
    subprocess.run(["git", "add", "-A"], cwd=root, check=True)
    subprocess.run(["git", "commit", "-qm", "base"], cwd=root, check=True)
    return root


def run(root, rel):
    payload = json.dumps({"tool_input": {"file_path": rel}})
    proc = subprocess.run(
        [sys.executable, str(HOOK)], input=payload, capture_output=True,
        text=True, cwd=root, env={"PATH": "/usr/bin:/bin", "CLAUDE_PROJECT_DIR": str(root)},
    )
    return proc.returncode, (proc.stderr + proc.stdout).strip()


BASE = "const a = 1;\nconst b = 2;\nconst c = 3;\nconst d = 4;\nconst e = 5;\n"


def case_clean():
    root = repo({SHADCN: BASE})
    return "clean_file", run(root, SHADCN), 0, None


def case_annotated():
    root = repo({SHADCN: BASE})
    (root / SHADCN).write_text(
        BASE + "// CUSTOM: added probe — verifies the annotation path\nconst p = 6;\n"
    )
    return "annotated_change", run(root, SHADCN), 0, None


def case_unannotated():
    root = repo({SHADCN: BASE})
    (root / SHADCN).write_text(BASE + "const p = 6;\n")
    return "unannotated_change", run(root, SHADCN), 2, "CUSTOM:"


def case_second_hunk_unannotated():
    """One annotated hunk must not absolve a separate unannotated one."""
    root = repo({SHADCN: BASE})
    lines = BASE.splitlines()
    lines.insert(1, "const sneaky = 99;")            # unannotated, top of file
    lines += ["// CUSTOM: probe — annotated change", "const p = 6;"]
    (root / SHADCN).write_text("\n".join(lines) + "\n")
    return "second_hunk_unannotated", run(root, SHADCN), 2, "CUSTOM:"


def case_annotation_above():
    """The annotation may sit just above the hunk rather than inside it."""
    root = repo({SHADCN: BASE + "// CUSTOM: guards the block below\n"})
    (root / SHADCN).write_text(BASE + "// CUSTOM: guards the block below\nconst p = 6;\n")
    return "annotation_immediately_above", run(root, SHADCN), 0, None


def case_non_shadcn():
    root = repo({"src/renderer/x.tsx": BASE})
    (root / "src/renderer/x.tsx").write_text(BASE + "const p = 6;\n")
    return "non_shadcn_file", run(root, "src/renderer/x.tsx"), 0, None


def case_key_added():
    root = repo({"src/renderer/x.tsx": BASE})
    (root / "src/renderer/x.tsx").write_text(BASE + "useHotkeys('ctrl+s', save);\n")
    return "key_handler_added", run(root, "src/renderer/x.tsx"), 0, "adds or changes"


def case_key_removed():
    """Removal must be caught too — the catalog entry has to come out."""
    root = repo({"src/renderer/x.tsx": BASE + "useHotkeys('ctrl+s', save);\n"})
    (root / "src/renderer/x.tsx").write_text(BASE)
    return "key_handler_removed", run(root, "src/renderer/x.tsx"), 0, "removes"


def case_catalog_itself():
    cat = "src/stories/keyboard-shortcuts.data.ts"
    root = repo({cat: BASE})
    (root / cat).write_text(BASE + "useHotkeys('ctrl+s', save);\n")
    return "catalog_file_itself", run(root, cat), 0, ""


CASES = [
    case_clean, case_annotated, case_unannotated, case_second_hunk_unannotated,
    case_annotation_above, case_non_shadcn, case_key_added, case_key_removed,
    case_catalog_itself,
]


def main():
    failures = []
    for builder in CASES:
        name, (code, output), want_code, want_text = builder()
        if code != want_code:
            failures.append(f"{name}: exit {code}, expected {want_code}\n    {output[:160]}")
        elif want_text and want_text not in output:
            failures.append(f"{name}: output missing {want_text!r}\n    {output[:160]}")
        elif want_text == "" and output:
            failures.append(f"{name}: expected silence, got\n    {output[:160]}")
    if failures:
        print(f"FAIL — {len(failures)}/{len(CASES)}:\n")
        print("\n".join("  " + f for f in failures))
        return 1
    print(f"ok — {len(CASES)} cases pass")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""Typecheck, lint and run the Testing-Guide's shared-store example, exactly as printed.

Why this exists: that example has shipped broken repeatedly — wrong factory, a mock missing members
the service calls, a missing import, code that ran but did not compile, code that compiled but
failed lint — because each correction was verified more narrowly than the claim made about it.

Three rules earned the hard way:

1. VERBATIM. An early version supplied the example's missing import itself, so it reported success
   for code no reader would have. A check that repairs its input cannot find the defect it exists
   for.
2. ALL THREE GATES. `vitest` strips types through esbuild, so a green run says nothing about `tsc`;
   and `tsc` says nothing about `paranext/require-disable-comment`, which CI runs. Each gate that
   was missing is a round this example shipped broken.
3. POSITIVE CONTROL, NOT AN EXIT CODE. Every gate proves it examined THIS file before it may pass.
   An exit code cannot do that: tsc reports nothing about a file it never loaded, and eslint exits
   0 with only a warning when an explicitly-passed file matches an ignore pattern. The tsc case was
   a LIVE vacuous pass here — an earlier version reported "compiles and passes" with a dead tsc. The
   eslint case is LATENT: nothing in .eslintignore matches TEMP today, but any ignore rule that
   caught it, or a relocation of TEMP, would reproduce it silently.

Usage:  npm run verify:testing-guide
Exit 0 = the example compiles, lints and passes as printed.
"""
import json
import os
import re
import subprocess
import sys

REPO = subprocess.run(['git', 'rev-parse', '--show-toplevel'],
                      capture_output=True, text=True).stdout.strip()
os.chdir(REPO)

GUIDE = '.context/standards/Testing-Guide.md'
TEMP = 'src/shared/services/__testing-guide-example.test.ts'
BASE = os.path.basename(TEMP)

text = open(GUIDE, encoding='utf-8').read()
blocks = re.findall(r'```(?:typescript|ts)\n(.*?)```', text, re.S)
example = next((b for b in blocks if 'initializeSharedStore' in b and 'vi.mock' in b), None)
if not example:
    sys.exit(f"could not find the shared-store example in {GUIDE}")

open(TEMP, 'w', encoding='utf-8').write(example)  # verbatim; nothing added, nothing repaired
print(f"extracted verbatim -> {TEMP}\n")

failures = []


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


try:
    # --- Gate 1: typecheck -------------------------------------------------------------------
    # One invocation does both jobs: --listFiles prints the program's files, so a bare line naming
    # our file is the control, and a line naming it alongside "error TS" is the failure.
    print("[1/3] typecheck")
    tsc = run(['npx', 'tsc', '--noEmit', '-p', 'tsconfig.json', '--listFiles'])
    lines = (tsc.stdout + tsc.stderr).splitlines()
    mine = [l for l in lines if BASE in l]
    compiled = any(BASE in l and 'error TS' not in l for l in mine)
    errors = [l for l in mine if 'error TS' in l]
    if not compiled:
        failures.append('typecheck (file never reached tsc)')
        print("  CONTROL FAILED: the extracted file is not in tsc's program — nothing was checked")
    elif errors:
        failures.append('typecheck')
        for line in errors[:5]:
            print(f"  {line}")
    else:
        print("  compiled, no errors in the extracted example")

    # --- Gate 2: lint ------------------------------------------------------------------------
    # Exit code is not a control: eslint exits 0 for an explicitly-passed file that matches an
    # ignore pattern, emitting only a "File ignored" warning. Read the JSON result instead.
    print("\n[2/3] lint")
    es = run(['npx', 'eslint', '-f', 'json', TEMP])
    try:
        results = json.loads(es.stdout or '[]')
    except json.JSONDecodeError:
        results = []
    entry = next((r for r in results if BASE in r.get('filePath', '')), None)
    ignored = entry and any('File ignored' in m.get('message', '')
                            for m in entry.get('messages', []))
    if entry is None or ignored:
        failures.append('lint (file never linted)')
        why = 'matched an ignore pattern' if ignored else 'produced no result entry'
        print(f"  CONTROL FAILED: eslint {why} — nothing was linted")
    elif entry.get('errorCount', 0) > 0:
        failures.append('lint')
        for m in [m for m in entry['messages'] if m.get('severity') == 2][:5]:
            print(f"  {m.get('line')}:{m.get('column')}  {m.get('message')}  [{m.get('ruleId')}]")
    else:
        print("  linted, no errors in the extracted example")

    # --- Gate 3: run -------------------------------------------------------------------------
    print("\n[3/3] vitest")
    # --maxWorkers is not optional: an uncapped vitest run on this repo can exhaust WSL memory.
    vt = run(['npx', 'vitest', 'run', TEMP, '--reporter=basic', '--maxWorkers=2'])
    vout = vt.stdout + vt.stderr
    if 'Test Files' not in vout:
        failures.append('vitest (suite never ran)')
        print("  CONTROL FAILED: no test-file summary — the suite did not run")
    elif vt.returncode != 0:
        failures.append('vitest')
        for line in vout.strip().splitlines()[-8:]:
            print(f"  {line}")
    else:
        print("  passed")
finally:
    if os.path.exists(TEMP):
        os.remove(TEMP)

if failures:
    print(f"\nFAILED: {', '.join(failures)}. The example as printed is broken — fix the fence.")
    sys.exit(1)
print("\nOK: the example compiles, lints and passes exactly as printed.")
sys.exit(0)

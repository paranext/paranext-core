#!/usr/bin/env python3
"""Typecheck, lint and run the Testing-Guide's shared-store example, exactly as printed.

Why this exists: that example shipped broken five times — wrong factory, a mock missing members the
service calls, a missing import, code that ran but did not compile, and code that compiled but
failed lint — because each correction was verified more narrowly than the claim made about it.

Three rules earned the hard way:

1. VERBATIM. An early version supplied the example's missing import itself, so it reported success
   for code no reader would have. A check that repairs its input cannot find the defect it exists
   for.
2. ALL THREE GATES. `vitest` strips types through esbuild, so a green run says nothing about `tsc`;
   and `tsc` says nothing about `paranext/require-disable-comment`, which CI runs. Each gate that
   was missing is a round this example shipped broken.
3. POSITIVE CONTROL. An earlier version decided the typecheck gate purely on whether any output
   line named the temp file, so a tsc that never ran at all — bad `-p` path, unresolvable binary,
   OOM — produced no lines and was reported as "no errors". Every gate below proves it examined the
   file before it is allowed to pass.

Usage:  npm run verify:testing-guide
Exit 0 = the example compiles, lints and passes as printed.
"""
import os
import re
import subprocess
import sys

REPO = subprocess.run(['git', 'rev-parse', '--show-toplevel'],
                      capture_output=True, text=True).stdout.strip()
os.chdir(REPO)

GUIDE = '.context/standards/Testing-Guide.md'
TEMP = 'src/shared/services/__testing-guide-example.test.ts'

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
    print("[1/3] typecheck")
    # Positive control FIRST: prove the file is actually in the program tsc will compile.
    listed = run(['npx', 'tsc', '-p', 'tsconfig.json', '--listFilesOnly'])
    if os.path.basename(TEMP) not in listed.stdout:
        failures.append('typecheck (file never reached tsc)')
        print("  CONTROL FAILED: the extracted file is not in tsc's program — nothing was checked")
        print(f"  {(listed.stderr or listed.stdout).strip().splitlines()[:3]}")
    else:
        tsc = run(['npx', 'tsc', '--noEmit', '-p', 'tsconfig.json'])
        mine = [l for l in (tsc.stdout + tsc.stderr).splitlines() if os.path.basename(TEMP) in l]
        if mine:
            failures.append('typecheck')
            for line in mine[:5]:
                print(f"  {line}")
        else:
            print("  compiled, no errors in the extracted example")

    # --- Gate 2: lint ------------------------------------------------------------------------
    print("\n[2/3] lint")
    es = run(['npx', 'eslint', TEMP])
    out = es.stdout + es.stderr
    if es.returncode not in (0, 1):
        failures.append('lint (eslint failed to run)')
        print(f"  CONTROL FAILED: eslint exited {es.returncode} without linting")
    elif es.returncode == 1:
        failures.append('lint')
        for line in [l for l in out.splitlines() if 'error' in l][:5]:
            print(f"  {line.strip()}")
    else:
        print("  no lint errors in the extracted example")

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

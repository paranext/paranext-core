#!/usr/bin/env python3
"""Run AND typecheck the Testing-Guide's shared-store mocking example, exactly as printed.

Why this exists: that example shipped broken four times — wrong factory, then a mock missing
members the service calls, then a missing import, then code that ran but did not compile — because
each correction was verified more narrowly than the claim made about it.

Two rules make this worth having:

1. The fence is extracted VERBATIM. An early version supplied the example's missing import itself,
   so it reported success for code that differed from what a reader would copy. A check that
   repairs its input cannot find the defect it exists to catch.
2. It runs BOTH vitest and tsc. `vitest` strips types through esbuild, so a green run says nothing
   about whether a reader copying the fence survives `npm run typecheck` — and test files under
   `src/` are in that scope, because tsconfig `include` does not support `!` negation.

Usage:  python3 .claude/scripts/verify-testing-guide-example.py
Exit 0 = the example both compiles and passes as printed.
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
print(f"extracted verbatim -> {TEMP}")

failures = []
try:
    print("\n[1/2] typecheck")
    tsc = subprocess.run(['npx', 'tsc', '--noEmit', '-p', 'tsconfig.json'],
                         capture_output=True, text=True)
    errors = [l for l in (tsc.stdout + tsc.stderr).splitlines()
              if '__testing-guide-example' in l]
    if errors:
        failures.append('typecheck')
        for line in errors[:6]:
            print(f"  {line}")
    else:
        print("  no errors in the extracted example")

    print("\n[2/2] vitest")
    # --maxWorkers is not optional: an uncapped vitest run on this repo can exhaust WSL memory.
    vt = subprocess.run(['npx', 'vitest', 'run', TEMP, '--reporter=basic', '--maxWorkers=2'],
                        capture_output=True, text=True)
    print(f"  vitest exit: {vt.returncode}")
    if vt.returncode != 0:
        failures.append('vitest')
        for line in (vt.stdout + vt.stderr).strip().splitlines()[-10:]:
            print(f"  {line}")
finally:
    if os.path.exists(TEMP):
        os.remove(TEMP)

if failures:
    print(f"\nFAILED: {', '.join(failures)}. The example as printed is broken — fix the fence.")
    sys.exit(1)
print("\nOK: the example compiles and passes exactly as printed.")
sys.exit(0)

#!/usr/bin/env python3
"""Run the Testing-Guide's shared-store mocking example exactly as printed.

Why this exists: that example shipped broken three times — wrong factory, then a mock missing
members the service calls, then a missing import — because each correction was read rather than
executed. It is derived from a test that genuinely passes, so it can simply be run.

The one rule that makes this worth having: the fence is extracted VERBATIM. An earlier version
supplied the missing `initializeSharedStore` import itself, so it reported success for code that
differed from what a reader would copy. A check that repairs its input cannot detect the defect it
exists to catch.

Usage:  python3 .claude/scripts/verify-testing-guide-example.py
Exit 0 = the example runs as printed.
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

# Verbatim. Nothing added, nothing repaired.
open(TEMP, 'w', encoding='utf-8').write(example)
print(f"extracted verbatim -> {TEMP}")

try:
    # --maxWorkers is not optional here: an uncapped vitest run on this repo can exhaust WSL memory.
    result = subprocess.run(
        ['npx', 'vitest', 'run', TEMP, '--reporter=basic', '--maxWorkers=2'],
        capture_output=True, text=True)
    output = (result.stdout + result.stderr)
    for line in output.strip().splitlines()[-12:]:
        print(line)
    print(f"\nvitest exit: {result.returncode}")
    if result.returncode != 0:
        print("\nThe example as printed does not run. Fix the fence, not this script.")
finally:
    if os.path.exists(TEMP):
        os.remove(TEMP)
        print(f"removed {TEMP}")

sys.exit(result.returncode)

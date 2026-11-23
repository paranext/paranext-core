#!/usr/bin/env node
/**
 * Typecheck, lint and run the Testing-Guide's shared-store example, exactly as printed.
 *
 * Why this exists: that example has shipped broken repeatedly — wrong factory, a mock missing
 * members the service calls, a missing import, code that ran but did not compile, code that
 * compiled but failed lint — because each correction was verified more narrowly than the claim
 * made about it.
 *
 * Three rules earned the hard way:
 *
 * 1. VERBATIM. An early version supplied the example's missing import itself, so it reported
 *    success for code no reader would have. A check that repairs its input cannot find the defect
 *    it exists for.
 * 2. ALL THREE GATES. `vitest` strips types through esbuild, so a green run says nothing about
 *    `tsc`; and `tsc` says nothing about `paranext/require-disable-comment`, which CI runs. Each
 *    gate that was missing is a round this example shipped broken.
 * 3. POSITIVE CONTROL, NOT AN EXIT CODE. Every gate proves it examined THIS file before it may
 *    pass. An exit code cannot do that: tsc reports nothing about a file it never loaded, and
 *    eslint exits 0 with only a warning when an explicitly-passed file matches an ignore pattern.
 *    The tsc case was a LIVE vacuous pass here — an earlier version reported "compiles and passes"
 *    with a dead tsc. The eslint case is LATENT: nothing in .eslintignore matches TEMP today, but
 *    any ignore rule that caught it, or a relocation of TEMP, would reproduce it silently.
 *
 * This runs on Node rather than Python so that it works on every machine that can already build
 * the repo. It drives three Node CLIs, so Python was a second toolchain bought for nothing, and
 * `python3` in particular is absent on a stock Windows install — where this gate blocks a commit.
 *
 * Usage:  npm run verify:testing-guide
 * Exit 0 = the example compiles, lints and passes as printed.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const GUIDE = '.context/standards/Testing-Guide.md';
const TEMP = 'src/shared/services/__testing-guide-example.test.ts';
const BASE = basename(TEMP);

/**
 * `npx` is `npx.cmd` on Windows, which `CreateProcess` cannot resolve; since the fix for
 * CVE-2024-27980, Node also refuses to spawn a `.cmd` without a shell. A shell on win32 covers
 * both. Every argument below is a fixed flag or a repo-relative path, so nothing needs quoting —
 * which is why the working directory is the repo root and the paths are never absolute.
 */
const run = (cmd, args) =>
  spawnSync(cmd, args, {
    encoding: 'utf8',
    shell: process.platform === 'win32',
    maxBuffer: 64 * 1024 * 1024,
  });

/**
 * Returns the process exit code rather than calling `process.exit`, and NOTHING here may call
 * `process.exit` either. When stdout is a pipe — which is exactly how lint-staged runs this —
 * Node's writes to it are asynchronous, and `process.exit` tears the process down without
 * flushing them. That would drop the diagnostics on the failure path, the one path they exist
 * for. Setting `process.exitCode` and returning lets Node flush and then exit on its own.
 */
function main() {
  const repo = run('git', ['rev-parse', '--show-toplevel']).stdout.trim();
  process.chdir(repo);

  const text = readFileSync(GUIDE, 'utf8');
  const blocks = [...text.matchAll(/```(?:typescript|ts)\n([\s\S]*?)```/g)].map((m) => m[1]);
  const example = blocks.find((b) => b.includes('initializeSharedStore') && b.includes('vi.mock'));
  if (!example) {
    console.error(`could not find the shared-store example in ${GUIDE}`);
    return 1;
  }

  writeFileSync(TEMP, example, 'utf8'); // verbatim; nothing added, nothing repaired
  console.log(`extracted verbatim -> ${TEMP}\n`);

  const failures = [];
  try {
    // --- Gate 1: typecheck -------------------------------------------------------------------
    // One invocation does both jobs: --listFiles prints the program's files, so a bare line naming
    // our file is the control, and a line naming it alongside "error TS" is the failure.
    console.log('[1/3] typecheck');
    const tsc = run('npx', ['tsc', '--noEmit', '-p', 'tsconfig.json', '--listFiles']);
    const mine = `${tsc.stdout}${tsc.stderr}`.split('\n').filter((l) => l.includes(BASE));
    const compiled = mine.some((l) => !l.includes('error TS'));
    const errors = mine.filter((l) => l.includes('error TS'));
    if (!compiled) {
      failures.push('typecheck (file never reached tsc)');
      console.log(
        "  CONTROL FAILED: the extracted file is not in tsc's program — nothing was checked",
      );
    } else if (errors.length) {
      failures.push('typecheck');
      errors.slice(0, 5).forEach((line) => console.log(`  ${line}`));
    } else {
      console.log('  compiled, no errors in the extracted example');
    }

    // --- Gate 2: lint ------------------------------------------------------------------------
    // Exit code is not a control: eslint exits 0 for an explicitly-passed file that matches an
    // ignore pattern, emitting only a "File ignored" warning. Read the JSON result instead.
    console.log('\n[2/3] lint');
    const es = run('npx', ['eslint', '-f', 'json', TEMP]);
    let results = [];
    try {
      results = JSON.parse(es.stdout || '[]');
    } catch {
      results = [];
    }
    const entry = results.find((r) => (r.filePath || '').includes(BASE));
    const ignored = entry?.messages?.some((m) => (m.message || '').includes('File ignored'));
    if (!entry || ignored) {
      failures.push('lint (file never linted)');
      const why = ignored ? 'matched an ignore pattern' : 'produced no result entry';
      console.log(`  CONTROL FAILED: eslint ${why} — nothing was linted`);
    } else if ((entry.errorCount || 0) > 0) {
      failures.push('lint');
      entry.messages
        .filter((m) => m.severity === 2)
        .slice(0, 5)
        .forEach((m) => console.log(`  ${m.line}:${m.column}  ${m.message}  [${m.ruleId}]`));
    } else {
      console.log('  linted, no errors in the extracted example');
    }

    // --- Gate 3: run -------------------------------------------------------------------------
    console.log('\n[3/3] vitest');
    // --maxWorkers is not optional: an uncapped vitest run on this repo can exhaust WSL memory.
    const vt = run('npx', ['vitest', 'run', TEMP, '--reporter=basic', '--maxWorkers=2']);
    const vout = `${vt.stdout}${vt.stderr}`;
    if (!vout.includes('Test Files')) {
      failures.push('vitest (suite never ran)');
      console.log('  CONTROL FAILED: no test-file summary — the suite did not run');
    } else if (vt.status !== 0) {
      failures.push('vitest');
      vout
        .trim()
        .split('\n')
        .slice(-8)
        .forEach((line) => console.log(`  ${line}`));
    } else {
      console.log('  passed');
    }
  } finally {
    if (existsSync(TEMP)) rmSync(TEMP);
  }

  if (failures.length) {
    console.log(`\nFAILED: ${failures.join(', ')}. The example as printed is broken — fix the fence.`);
    return 1;
  }
  console.log('\nOK: the example compiles, lints and passes exactly as printed.');
  return 0;
}

process.exitCode = main();

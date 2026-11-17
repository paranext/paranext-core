// @vitest-environment node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const STACK_TRACES_UTIL = path.join(__dirname, 'extension-stack-traces.util.ts');
const SANDBOX_UTIL = path.join(__dirname, 'extension-sandbox.util.ts');

/**
 * Inline source map with one mapping: generated line 2, column 0 maps to line 42, column 0 of
 * `original-extension.ts`
 */
const EXTENSION_SOURCE_MAP = {
  version: 3,
  sources: ['original-extension.ts'],
  names: [],
  mappings: ';AAyCA',
};

const EXTENSION_FILE = [
  'module.exports.activate = function activate() {',
  "  throw new Error('thrown from the extension');",
  '};',
  // Split so tools reading this test file's own source map do not take this line as its map
  `//# ${'sourceMappingURL'}=data:application/json;base64,${Buffer.from(
    JSON.stringify(EXTENSION_SOURCE_MAP),
  ).toString('base64')}`,
].join('\n');

/** Line in `hostScript` that throws, counted from 1 */
const HOST_THROW_LINE = 9;

/**
 * Host code run under tsx, as the dev extension host is. The type annotations make tsx's output
 * differ from the source, so an unmapped host frame shows a different position.
 */
function hostScript(extensionFile: string, install: boolean): string {
  return [
    `import { loadExtensionModule } from ${JSON.stringify(SANDBOX_UTIL)};`,
    `import { installSourceMappedStackTraces } from ${JSON.stringify(STACK_TRACES_UTIL)};`,
    `if (${install}) installSourceMappedStackTraces();`,
    'type Shape = { size: number };',
    'const shape: Shape = { size: 1 };',
    'function frameLine(error: unknown): string {',
    "  return (error instanceof Error && error.stack?.split('\\n')[1]) || '';",
    '}',
    "function hostFunction(): never { throw new Error('thrown from the host ' + shape.size); }",
    'let host = "";',
    'try { hostFunction(); } catch (e) { host = frameLine(e); }',
    'const extension = loadExtensionModule(',
    `  ${JSON.stringify(extensionFile)},`,
    '  () => undefined,',
    ') as { activate: () => void };',
    'let extensionFrame = "";',
    'try { extension.activate(); } catch (e) { extensionFrame = frameLine(e); }',
    'console.log(JSON.stringify({ host, extension: extensionFrame }));',
  ].join('\n');
}

function runHost(install: boolean): { host: string; extension: string } {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'extension-stack-traces-test-'));
  try {
    const extensionFile = path.join(tempDir, 'main.js');
    fs.writeFileSync(extensionFile, EXTENSION_FILE);
    const scriptFile = path.join(tempDir, 'host.ts');
    fs.writeFileSync(scriptFile, hostScript(extensionFile, install));

    const child = spawnSync(process.execPath, ['--import', 'tsx', scriptFile], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      timeout: 60_000,
    });
    const lastLine = child.stdout.trim().split('\n').at(-1) ?? '';
    try {
      return JSON.parse(lastLine);
    } catch {
      throw new Error(
        `Host script did not print frames (exit ${child.status}).\nstdout:\n${child.stdout}\nstderr:\n${child.stderr}`,
      );
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

describe('installSourceMappedStackTraces', () => {
  it('maps extension frames to the source named in the inline source map', () => {
    const { extension } = runHost(true);

    expect(extension).toMatch(/original-extension\.ts:42:\d+\)$/);
  }, 60_000);

  it('keeps host frames mapped to their TypeScript source', () => {
    const { host } = runHost(true);

    expect(host).toMatch(new RegExp(`host\\.ts:${HOST_THROW_LINE}:\\d+\\)$`));
  }, 60_000);

  it('without it, extension frames point at the built file', () => {
    const { extension } = runHost(false);

    expect(extension).toMatch(/main\.js:2:\d+\)$/);
  }, 60_000);
});

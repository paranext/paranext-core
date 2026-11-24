// @vitest-environment node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const STACK_TRACES_UTIL = path.join(__dirname, 'extension-stack-traces.util.ts');
const SANDBOX_UTIL = path.join(__dirname, 'extension-sandbox.util.ts');

/**
 * Builds an extension file whose line 2 throws, with an inline source map that maps the start of
 * line 2 to `originalLine` of `originalSource`
 *
 * @param mappings The source map's `mappings` for that one mapping
 */
function extensionFile(originalSource: string, mappings: string): string {
  const sourceMap = { version: 3, sources: [originalSource], names: [], mappings };
  return [
    'module.exports.activate = function activate() {',
    "  throw new Error('thrown from the extension');",
    '};',
    // Split so tools reading this test file's own source map do not take this line as its map
    `//# ${'sourceMappingURL'}=data:application/json;base64,${Buffer.from(
      JSON.stringify(sourceMap),
    ).toString('base64')}`,
  ].join('\n');
}

/** Line 2 maps to line 42 of `original-extension.ts` */
const FIRST_BUILD = extensionFile('original-extension.ts', ';AAyCA');
/** Line 2 maps to line 77 of `rebuilt-extension.ts` */
const SECOND_BUILD = extensionFile('rebuilt-extension.ts', ';AA4EA');

/** Line in `hostScript` that throws, counted from 1 */
const HOST_THROW_LINE = 10;

type Frames = {
  host: string;
  extension: string;
  extensionConstructor: string;
  rebuiltExtension: string;
};

/**
 * Host code run under tsx, as the dev extension host is. The type annotations make tsx's output
 * differ from the source, so an unmapped host frame shows a different position. It loads the
 * extension file, rewrites it as a rebuild would, and loads it again.
 */
function hostScript(extensionPath: string, install: boolean): string {
  return [
    "import fs from 'node:fs';",
    `import { loadExtensionModule } from ${JSON.stringify(SANDBOX_UTIL)};`,
    `import { installSourceMappedStackTraces } from ${JSON.stringify(STACK_TRACES_UTIL)};`,
    `if (${install}) installSourceMappedStackTraces();`,
    'type Shape = { size: number };',
    'const shape: Shape = { size: 1 };',
    'function frameLine(run: () => void): string {',
    "  try { run(); } catch (e) { return (e instanceof Error && e.stack?.split('\\n')[1]) || ''; } return '';",
    '}',
    "function hostFunction(): never { throw new Error('thrown from the host ' + shape.size); }",
    'const host = frameLine(hostFunction);',
    'type Extension = { activate: () => void };',
    `const load = () => loadExtensionModule(${JSON.stringify(extensionPath)}, () => undefined) as Extension;`,
    'const extension = load();',
    'const extensionFrame = frameLine(() => extension.activate());',
    'const extensionConstructor = frameLine(() => { new (extension.activate as unknown as new () => object)(); });',
    `fs.writeFileSync(${JSON.stringify(extensionPath)}, ${JSON.stringify(SECOND_BUILD)});`,
    'const rebuilt = load();',
    'const rebuiltExtension = frameLine(() => rebuilt.activate());',
    'console.log(JSON.stringify({ host, extension: extensionFrame, extensionConstructor, rebuiltExtension }));',
  ].join('\n');
}

function runHost(install: boolean): Frames {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'extension-stack-traces-test-'));
  try {
    const extensionPath = path.join(tempDir, 'main.js');
    fs.writeFileSync(extensionPath, FIRST_BUILD);
    const scriptFile = path.join(tempDir, 'host.ts');
    fs.writeFileSync(scriptFile, hostScript(extensionPath, install));

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

/** A frame line without its location, so mapped and unmapped frames can be compared */
function withoutLocation(frame: string): string {
  return frame.replace(/ \(.*\)$/, '');
}

describe('installSourceMappedStackTraces', () => {
  // Each run starts a child process; every test reads the same two runs
  let mapped: Frames;
  let unmapped: Frames;

  beforeAll(() => {
    mapped = runHost(true);
    unmapped = runHost(false);
  }, 120_000);

  it('maps extension frames to the source named in the inline source map', () => {
    expect(mapped.extension).toMatch(/original-extension\.ts:42:\d+\)$/);
  });

  it('maps a rebuilt extension file through its new source map', () => {
    expect(mapped.rebuiltExtension).toMatch(/rebuilt-extension\.ts:77:\d+\)$/);
  });

  it('keeps host frames mapped to their TypeScript source', () => {
    expect(mapped.host).toMatch(new RegExp(`host\\.ts:${HOST_THROW_LINE}:\\d+\\)$`));
  });

  it('describes mapped frames the way Node does', () => {
    expect(withoutLocation(mapped.extension)).toBe('    at Object.activate');
    expect(withoutLocation(mapped.extension)).toBe(withoutLocation(unmapped.extension));
    expect(withoutLocation(mapped.extensionConstructor)).toBe(
      withoutLocation(unmapped.extensionConstructor),
    );
    expect(withoutLocation(mapped.extensionConstructor)).toBe('    at new activate');
  });

  it('without it, extension frames point at the built file', () => {
    expect(unmapped.extension).toMatch(/main\.js:2:\d+\)$/);
  });
});

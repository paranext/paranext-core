import { describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { testingExtensionService } from '@extension-host/services/extension.service';

// The extension service logs through the shared logger as it loads, which warns when it cannot tell
// which process it is running in — so this has to be set before the import above, not after it.
// `vi.hoisted` runs above the imports, which is also why `ProcessType` cannot be referenced here.
vi.hoisted(() => {
  globalThis.processType = 'extension-host' as ProcessType;
});

// Importing the extension service runs its module-level `createDir` calls for the installed- and
// disabled-extension directories. `parseManifest` is pure, so stub the file system rather than
// letting a manifest test touch disk.
vi.mock('@node/services/node-file-system.service', () => ({
  createDir: vi.fn(),
  readDir: vi.fn(),
  readFileText: vi.fn(),
  getStats: vi.fn(),
  copyFile: vi.fn(),
  deleteFile: vi.fn(),
  deleteDir: vi.fn(),
  writeFile: vi.fn(),
  moveFile: vi.fn(),
  readFileBinary: vi.fn(),
  EntryType: { File: 'file', Directory: 'directory' },
}));

const { parseManifest } = testingExtensionService;

function manifestJson(manifest: Record<string, unknown>): string {
  return JSON.stringify({ version: '1.0.0', main: 'index.js', ...manifest });
}

describe('parseManifest', () => {
  test('accepts a well-formed manifest', () => {
    expect(parseManifest(manifestJson({ name: 'myExtension' })).name).toBe('myExtension');
  });

  test('rejects a name containing ".."', () => {
    expect(() => parseManifest(manifestJson({ name: '../../evil' }))).toThrow(/must not include/);
  });

  // A manifest is authored by hand and parsed with no schema validation, so its declared types are
  // a claim rather than a guarantee. A non-string name passes the `..` and forbidden-name guards by
  // coercion, and the next thing to touch it is the priority `.sort()` in `getExtensions` — which
  // runs outside the per-extension `try`, so a `TypeError` there fails the entire extension load
  // instead of skipping the one bad folder. Rejecting it here keeps the blast radius at one
  // extension and points the error at the manifest.
  test.each([
    ['an array', ['../../evil']],
    ['a number', 42],
    ['a boolean', true],
    ['an object', { toString: () => 'evil' }],
  ])('rejects a name that is %s', (_name, name) => {
    expect(() => parseManifest(manifestJson({ name }))).toThrow(/must be a string/);
  });
});

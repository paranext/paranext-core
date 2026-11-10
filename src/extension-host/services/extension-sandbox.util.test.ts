import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { vi } from 'vitest';
import { loadExtensionModule } from './extension-sandbox.util';

let tempDir = '';

function writeFixture(name: string, contents: string): string {
  const filePath = path.join(tempDir, name);
  fs.writeFileSync(filePath, contents);
  return filePath;
}

const unusedRequire = () => {
  throw new Error('require should not be called');
};

describe('loadExtensionModule', () => {
  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'extension-sandbox-test-'));
  });

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('returns what the file assigns to module.exports', () => {
    const file = writeFixture('plain.js', 'module.exports = { activate: 1 };');
    expect(loadExtensionModule(file, unusedRequire)).toEqual({ activate: 1 });
  });

  it('supports module.exports, exports.default and top-level this', () => {
    const defaultFile = writeFixture('default.js', 'exports.default = { activate: 1 };');
    const thisFile = writeFixture('this.js', 'this.activate = 1;');
    const moduleFile = writeFixture('module.js', 'module.exports = { activate: 1 };');

    expect(loadExtensionModule(defaultFile, unusedRequire)).toEqual({ default: { activate: 1 } });
    expect(loadExtensionModule(thisFile, unusedRequire)).toEqual({ activate: 1 });
    expect(loadExtensionModule(moduleFile, unusedRequire)).toEqual({ activate: 1 });
  });

  it('routes require calls to extensionRequire', () => {
    const file = writeFixture('require.js', "module.exports = require('@papi/backend');");
    const extensionRequire = vi.fn(() => 'papi');

    expect(loadExtensionModule(file, extensionRequire)).toBe('papi');
    expect(extensionRequire).toHaveBeenCalledTimes(1);
    expect(extensionRequire).toHaveBeenCalledWith('@papi/backend');
  });

  it("gives extension code no path to Node's loader", () => {
    const file = writeFixture(
      'loader.js',
      'module.exports = [module.constructor === Object, typeof require.cache, typeof require.main, typeof require.resolve];',
    );
    expect(loadExtensionModule(file, unusedRequire)).toEqual([
      true,
      'undefined',
      'undefined',
      'undefined',
    ]);
  });

  it('refuses dynamic import', async () => {
    const file = writeFixture('dynamic.js', "module.exports = import('node:fs');");
    const result = loadExtensionModule(file, unusedRequire);
    await expect(result).rejects.toMatchObject({
      code: 'ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING',
    });
  });

  it('stack trace names the extension file', () => {
    const file = writeFixture('throws.js', "throw new Error('boom');");
    let stack = '';
    try {
      loadExtensionModule(file, unusedRequire);
    } catch (e) {
      stack = e instanceof Error ? (e.stack ?? '') : '';
    }
    expect(stack).toContain(file);
  });

  it('reloads changed file contents', () => {
    const file = writeFixture('reload.js', 'module.exports = 1;');
    expect(loadExtensionModule(file, unusedRequire)).toBe(1);
    fs.writeFileSync(file, 'module.exports = 2;');
    expect(loadExtensionModule(file, unusedRequire)).toBe(2);
  });

  it.each([
    ['a path without its file extension', 'no-extension'],
    ['a directory', '.'],
  ])('explains that "main" must name the entry file exactly when given %s', (_, entry) => {
    const entryPath = path.join(tempDir, entry);
    writeFixture('no-extension.js', 'module.exports = 1;');

    expect(() => loadExtensionModule(entryPath, unusedRequire)).toThrow(
      `Extension entry file '${entryPath}' (the manifest's "main") could not be read`,
    );
  });

  it('keeps the file system error as the cause', () => {
    const entryPath = path.join(tempDir, 'missing.js');

    let caught: unknown;
    try {
      loadExtensionModule(entryPath, unusedRequire);
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(Error);
    expect(caught instanceof Error && caught.cause).toMatchObject({ code: 'ENOENT' });
  });
});

import { mkdtempSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { isCommonJsSource, listDistModules } from './list-dist-modules.util';

it('splits built scripts by module format and ignores types and maps', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'dist-'));
  ['index.js', 'index.cjs', 'chunk.js', 'chunk.cjs', 'index.d.ts', 'index.js.map'].forEach((name) =>
    writeFileSync(path.join(dir, name), ''),
  );
  expect(listDistModules(dir)).toEqual({
    commonJs: [path.join(dir, 'chunk.cjs'), path.join(dir, 'index.cjs')],
    esModules: [path.join(dir, 'chunk.js'), path.join(dir, 'index.js')],
  });
});

describe('isCommonJsSource', () => {
  it('accepts CommonJS source', () => {
    expect(
      isCommonJsSource('"use strict";\nconst a = require("a");\nmodule.exports = a;', 'a.cjs'),
    ).toBe(true);
  });

  it('rejects ES module syntax', () => {
    expect(isCommonJsSource('import a from "a";\nexport default a;', 'a.cjs')).toBe(false);
    expect(isCommonJsSource('export const a = 1;', 'a.cjs')).toBe(false);
  });
});

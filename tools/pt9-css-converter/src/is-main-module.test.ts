import { describe, it, expect, afterEach } from 'vitest';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { isMainModule } from './is-main-module';

describe('isMainModule', () => {
  const originalArgv = process.argv;
  afterEach(() => {
    process.argv = originalArgv;
  });

  it('returns false when there is no entry script (process.argv[1] unset)', () => {
    process.argv = [originalArgv[0]];
    expect(isMainModule('file:///anything.ts')).toBe(false);
  });

  it('returns true when the module URL is the entry script', () => {
    const entry = '/repo/tools/pt9-css-converter/src/cli.ts';
    process.argv = [originalArgv[0], entry];
    expect(isMainModule(pathToFileURL(entry).href)).toBe(true);
  });

  it('returns false when the module was imported rather than run directly', () => {
    process.argv = [originalArgv[0], '/repo/tools/pt9-css-converter/src/cli.ts'];
    const importedModuleUrl = pathToFileURL('/repo/tools/pt9-css-converter/src/audit.ts').href;
    expect(isMainModule(importedModuleUrl)).toBe(false);
  });
});

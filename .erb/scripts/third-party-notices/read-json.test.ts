import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readJsonFile } from './read-json';

let tmp: string;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-read-json-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe('readJsonFile', () => {
  it('returns the parsed contents', () => {
    const file = path.join(tmp, 'thing.json');
    fs.writeFileSync(file, '{"a":[1,2]}');
    expect(readJsonFile(file, 'a thing')).toEqual({ a: [1, 2] });
  });

  // The whole point. `main.ts` prints `err.message` alone rather than a stack, so a message that
  // does not carry the path identifies nothing - and the corpus of files these callers read is
  // roughly 8,500 package.json files plus a handful of lockfiles and manifests.
  it('names the file and what it is when the file cannot be read', () => {
    const file = path.join(tmp, 'absent.json');
    expect(() => readJsonFile(file, 'the npm lockfile')).toThrow(/could not read the npm lockfile/);
    expect(() => readJsonFile(file, 'the npm lockfile')).toThrow(file);
  });

  // `main.ts`'s `committedNpmCount` tolerates a MISSING notices lock - the first-ever generation
  // has none to compare against - and tells it apart from an unreadable one by `code`. Replacing
  // the system error with a plain `Error` dropped that, which made the tolerance dead code: the
  // bootstrap (`rm THIRD-PARTY-NOTICES.lock.json && npm run build:third-party-notices`) could not
  // run at all.
  it('carries the system error code through, so ENOENT stays distinguishable', () => {
    const file = path.join(tmp, 'absent.json');
    const thrown = (() => {
      try {
        readJsonFile(file, 'the notices lock');
        return undefined;
      } catch (err) {
        return err;
      }
    })();
    expect(thrown).toBeInstanceOf(Error);
    expect(thrown && typeof thrown === 'object' && 'code' in thrown ? thrown.code : undefined).toBe(
      'ENOENT',
    );
  });

  it('names the file and what it is when the contents are not JSON', () => {
    // The shape an interrupted install leaves behind. Raw `JSON.parse` reports it as a bare
    // `SyntaxError: Unexpected end of JSON input`, naming neither the file nor what it is.
    const file = path.join(tmp, 'truncated.json');
    fs.writeFileSync(file, '{"name":"half-writ');
    expect(() => readJsonFile(file, "an installed package's manifest")).toThrow(
      /an installed package's manifest .* is not valid JSON/,
    );
    expect(() => readJsonFile(file, "an installed package's manifest")).toThrow(file);
  });

  // Read failure and parse failure have different remedies - a missing file versus a corrupt one -
  // so they must not collapse into one message.
  it('distinguishes an unreadable file from an unparseable one', () => {
    const missing = path.join(tmp, 'missing.json');
    const corrupt = path.join(tmp, 'corrupt.json');
    fs.writeFileSync(corrupt, 'not json at all');
    expect(() => readJsonFile(missing, 'x')).toThrow(/could not read/);
    expect(() => readJsonFile(corrupt, 'x')).not.toThrow(/could not read/);
    expect(() => readJsonFile(corrupt, 'x')).toThrow(/is not valid JSON/);
  });

  // Deliberately the OPPOSITE contract to `readTextFile` in package-files.ts, which returns
  // undefined for an optional license text. Every caller here reads something structural, where a
  // swallowed failure is a silently short shipping set.
  it('throws rather than returning undefined', () => {
    expect(() => readJsonFile(path.join(tmp, 'nope.json'), 'x')).toThrow();
  });
});

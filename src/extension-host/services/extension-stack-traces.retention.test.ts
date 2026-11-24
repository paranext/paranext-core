import { vi } from 'vitest';
import {
  forgetExtensionSourceMapLater,
  hasExtensionSourceMap,
  installSourceMappedStackTraces,
  rememberExtensionSourceMap,
} from './extension-stack-traces.util';

/** An extension file ending in an inline source map (its content does not matter here) */
const SOURCE_WITH_MAP = `module.exports = {};\n//# ${'sourceMappingURL'}=data:application/json;base64,${Buffer.from(
  JSON.stringify({ version: 3, sources: ['a.ts'], names: [], mappings: '' }),
).toString('base64')}`;

const FILE = '/extensions/example/main.js';
const RETENTION_MS = 60_000;

describe('forgetExtensionSourceMapLater', () => {
  const originalPrepareStackTrace = Error.prepareStackTrace;

  beforeAll(() => {
    // Remembering maps only happens once the stack-trace mapping is installed
    installSourceMappedStackTraces();
    Error.prepareStackTrace = originalPrepareStackTrace;
  });

  beforeEach(() => {
    vi.useFakeTimers();
    rememberExtensionSourceMap(FILE, SOURCE_WITH_MAP);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps a deactivated extension’s map for a while, for its late async errors', () => {
    forgetExtensionSourceMapLater(FILE, RETENTION_MS);
    vi.advanceTimersByTime(RETENTION_MS - 1);

    expect(hasExtensionSourceMap(FILE)).toBe(true);
  });

  it('drops the map once that time has passed', () => {
    forgetExtensionSourceMapLater(FILE, RETENTION_MS);
    vi.advanceTimersByTime(RETENTION_MS);

    expect(hasExtensionSourceMap(FILE)).toBe(false);
  });

  it('keeps the fresh map when the extension is loaded again before then', () => {
    forgetExtensionSourceMapLater(FILE, RETENTION_MS);
    rememberExtensionSourceMap(FILE, SOURCE_WITH_MAP);
    vi.advanceTimersByTime(RETENTION_MS * 2);

    expect(hasExtensionSourceMap(FILE)).toBe(true);
  });
});

import { describe, expect, test, vi, beforeEach } from 'vitest';
import { EventEmitter } from 'events';
import { Writable } from 'stream';
import {
  installStdioErrorListeners,
  isTransientPipeErrorCode,
  silenceConsoleTransportOnPipeError,
} from '@main/stdio-resilience.util';

// Mock the logger so we can assert on warnings without writing to disk and so
// we can simulate the transports.console.level toggle from D-014.
const { mockLoggerWarn, mockTransports } = vi.hoisted(() => {
  // electron-log's transport `level` is `LevelOption = string | false`. Declare via the
  // local type so vitest's hoist machinery keeps the union (rather than narrowing to
  // the literal 'debug', which would block reassignment to `false`).
  const transports: { console: { level: string | false } } = {
    console: { level: 'debug' },
  };
  return { mockLoggerWarn: vi.fn(), mockTransports: transports };
});

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    warn: mockLoggerWarn,
    debug: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
    transports: mockTransports,
  },
}));

describe('isTransientPipeErrorCode', () => {
  test.each([
    ['EPIPE', true],
    ['ECONNRESET', true],
    ['ERR_STREAM_DESTROYED', true],
    ['ENOENT', false],
    [undefined, false],
    ['', false],
  ])('classifies %s as transient=%s', (code, expected) => {
    expect(isTransientPipeErrorCode(code)).toBe(expected);
  });
});

describe('silenceConsoleTransportOnPipeError (D-014)', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockTransports.console.level = 'debug';
  });

  test('disables console transport when given an EPIPE error', () => {
    const err = Object.assign(new Error('write EPIPE'), { code: 'EPIPE' });
    silenceConsoleTransportOnPipeError(err);
    expect(mockTransports.console.level).toBe(false);
  });

  test('disables console transport when error message starts with EPIPE (Node convention)', () => {
    // electron-log sometimes surfaces stream-write errors without a `code` property;
    // fall back to message inspection (mirrors extension-host pattern).
    const err = new Error('EPIPE: broken pipe, write');
    silenceConsoleTransportOnPipeError(err);
    expect(mockTransports.console.level).toBe(false);
  });

  test('is idempotent: second call when already silenced does not throw', () => {
    const err = Object.assign(new Error('write EPIPE'), { code: 'EPIPE' });
    silenceConsoleTransportOnPipeError(err);
    silenceConsoleTransportOnPipeError(err);
    expect(mockTransports.console.level).toBe(false);
  });

  test('does NOT disable console transport for a non-pipe error', () => {
    const err = Object.assign(new Error('some other failure'), { code: 'ENOENT' });
    silenceConsoleTransportOnPipeError(err);
    expect(mockTransports.console.level).toBe('debug');
  });
});

describe('installStdioErrorListeners (D-014)', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockTransports.console.level = 'debug';
  });

  test('absorbs EPIPE error event on stdout without rethrow', () => {
    // EventEmitter is structurally compatible with the subset of stream.Writable
    // used by installStdioErrorListeners (on('error', ...)).
    const fakeStdout = new EventEmitter();
    const fakeStderr = new EventEmitter();

    installStdioErrorListeners(
      // A real Writable is heavy to construct in a unit test; EventEmitter provides the
      // exact `on('error', ...)` surface we need and matches the production shape there.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fakeStdout as unknown as Writable,
      // Same as above for stderr.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fakeStderr as unknown as Writable,
    );

    const epipeError = Object.assign(new Error('write EPIPE'), { code: 'EPIPE' });
    // If no listener absorbed this, EventEmitter would throw because 'error' is special.
    expect(() => fakeStdout.emit('error', epipeError)).not.toThrow();

    // After absorbing the EPIPE, the listener should silence the console transport
    // so the next logger call doesn't re-enter the broken pipe.
    expect(mockTransports.console.level).toBe(false);
  });

  test('absorbs EPIPE error event on stderr without rethrow', () => {
    const fakeStdout = new EventEmitter();
    const fakeStderr = new EventEmitter();

    installStdioErrorListeners(
      // EventEmitter stand-in for Writable; see explanation in the stdout test above.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fakeStdout as unknown as Writable,
      // Same as above for stderr.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fakeStderr as unknown as Writable,
    );

    const epipeError = Object.assign(new Error('write EPIPE'), { code: 'EPIPE' });
    expect(() => fakeStderr.emit('error', epipeError)).not.toThrow();

    expect(mockTransports.console.level).toBe(false);
  });

  test('does not silence transport for non-pipe stdout error, but still absorbs', () => {
    const fakeStdout = new EventEmitter();
    const fakeStderr = new EventEmitter();

    installStdioErrorListeners(
      // EventEmitter stand-in for Writable; see explanation in the first installStdioErrorListeners test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fakeStdout as unknown as Writable,
      // Same as above for stderr.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fakeStderr as unknown as Writable,
    );

    const otherError = Object.assign(new Error('boom'), { code: 'EACCES' });
    expect(() => fakeStdout.emit('error', otherError)).not.toThrow();

    // Non-pipe stdout error: we still want to absorb (don't crash) but the console
    // transport is left alone since it isn't the source of the failure.
    expect(mockTransports.console.level).toBe('debug');
  });
});

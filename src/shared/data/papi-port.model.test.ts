import { describe, expect, test } from 'vitest';
import {
  createPapiPortCloseFrame,
  createSyntheticCloseEvent,
  isPapiPortCloseFrame,
  isPapiPortMainWorldMessage,
  PAPI_PORT_CHANNEL,
  PAPI_PORT_CLOSE_FRAME_TYPE,
  PAPI_PORT_ERROR_CHANNEL,
} from '@shared/data/papi-port.model';

describe('papi-port close frame', () => {
  test('round-trips code and reason through the type guard', () => {
    const frame = createPapiPortCloseFrame(1001, 'page unloading');
    expect(frame).toEqual({
      type: PAPI_PORT_CLOSE_FRAME_TYPE,
      code: 1001,
      reason: 'page unloading',
    });
    expect(isPapiPortCloseFrame(frame)).toBe(true);
  });

  test('rejects strings, nulls, and objects with the wrong type or a non-numeric code', () => {
    expect(isPapiPortCloseFrame('{"jsonrpc":"2.0"}')).toBe(false);
    // The guard must reject null, which `typeof` reports as 'object'
    // eslint-disable-next-line no-null/no-null
    expect(isPapiPortCloseFrame(null)).toBe(false);
    expect(isPapiPortCloseFrame({ type: 'other', code: 1000, reason: '' })).toBe(false);
    expect(
      isPapiPortCloseFrame({ type: PAPI_PORT_CLOSE_FRAME_TYPE, code: '1000', reason: '' }),
    ).toBe(false);
  });
});

describe('papi-port main-world message guard', () => {
  test('accepts a port grant and a port error', () => {
    expect(isPapiPortMainWorldMessage({ type: PAPI_PORT_CHANNEL, windowId: 'w1' })).toBe(true);
    expect(isPapiPortMainWorldMessage({ type: PAPI_PORT_ERROR_CHANNEL, reason: 'nope' })).toBe(
      true,
    );
  });

  test('rejects anything else that lands on window.postMessage', () => {
    expect(isPapiPortMainWorldMessage(undefined)).toBe(false);
    expect(isPapiPortMainWorldMessage('electronAPI:papi.port')).toBe(false);
    expect(isPapiPortMainWorldMessage({ type: 'webpackHotUpdate' })).toBe(false);
    expect(isPapiPortMainWorldMessage({ type: PAPI_PORT_CHANNEL })).toBe(false);
  });
});

describe('synthetic close event', () => {
  test('carries the fields the close-severity helpers read, and the target the listener keys on', () => {
    const target = {};
    const ev = createSyntheticCloseEvent(target, 1006, 'port closed', false);
    expect(ev).toEqual({
      type: 'close',
      target,
      code: 1006,
      reason: 'port closed',
      wasClean: false,
    });
  });
});

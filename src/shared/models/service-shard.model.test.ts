import { describe, expect, test } from 'vitest';
import {
  getServiceShardAttributes,
  getServiceShardWindowId,
} from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

describe('service shard attributes', () => {
  test('carries the window id a shard registered with', () => {
    expect(getServiceShardAttributes('7970e4d1-0c5a-4a1e-9f2b-2f6a1b3c4d5e')).toEqual({
      windowId: '7970e4d1-0c5a-4a1e-9f2b-2f6a1b3c4d5e',
    });
  });

  test.each([
    ['a number', 2],
    ['zero', 0],
    ['undefined', undefined],
    ['null', undefined],
    ['an object', { windowId: 'nested' }],
  ])('refuses %s rather than registering a shard nothing can route to', (_label, badId) => {
    // The window id reaches this function from a caller the compiler covers, but the attributes it
    // builds travel over the network — and `getServiceShardWindowId` on the far side answers
    // `undefined` for anything that is not a string. So a non-string accepted here does not fail
    // loudly; it registers a shard that every router silently declines to route to, behind nothing
    // louder than a warning. Throwing is the whole point.
    // Deliberately passing the wrong type: this is the runtime boundary the compiler does not hold
    // @ts-expect-error ts(2345) - the rejection under test is of a value the types forbid
    expect(() => getServiceShardAttributes(badId)).toThrow(/Cannot register a service shard/);
  });

  test('refuses an empty string, which names no window', () => {
    expect(() => getServiceShardAttributes('')).toThrow(/Cannot register a service shard/);
  });
});

describe('reading a shard’s window id back', () => {
  /** A network object announcement carrying the given attributes, and nothing else of interest */
  function announcementWith(attributes: Record<string, unknown>): NetworkObjectDetails {
    return {
      id: 'shard-of-some-window',
      objectType: 'webViewServiceShard',
      functionNames: [],
      attributes,
    };
  }

  test('answers the id a shard registered with', () => {
    expect(
      getServiceShardWindowId(
        announcementWith({ windowId: '7970e4d1-0c5a-4a1e-9f2b-2f6a1b3c4d5e' }),
      ),
    ).toBe('7970e4d1-0c5a-4a1e-9f2b-2f6a1b3c4d5e');
  });

  test('answers undefined for a registration that names no window', () => {
    expect(getServiceShardWindowId(announcementWith({}))).toBeUndefined();
  });

  test('answers undefined for a window id that is not a string', () => {
    // The mirror of the throw above: if a non-string ever did get registered, this is where it
    // becomes an unroutable shard rather than an error anyone sees
    expect(getServiceShardWindowId(announcementWith({ windowId: 2 }))).toBeUndefined();
  });
});

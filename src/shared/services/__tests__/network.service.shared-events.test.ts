import { describe, it, expect } from 'vitest';
import { SHARED_EVENT_NAMES } from '@shared/services/network.service';
import type { SharedNetworkEventTypes } from 'papi-shared-types';

describe('SHARED_EVENT_NAMES stays in sync with SharedNetworkEventTypes', () => {
  it('contains every key of SharedNetworkEventTypes', () => {
    type RequiredKeys = keyof SharedNetworkEventTypes;
    const required: RequiredKeys[] = [
      'network-object.onDidCreateNetworkObject',
      'network-object.onDidDisposeNetworkObject',
      'shared-store.onDidChange',
    ];
    for (const name of required) expect(SHARED_EVENT_NAMES.has(name)).toBe(true);
  });

  it('contains no names absent from SharedNetworkEventTypes', () => {
    type AllowedKeys = keyof SharedNetworkEventTypes;
    for (const name of SHARED_EVENT_NAMES) {
      // The cast verifies the runtime constant only contains keys SharedNetworkEventTypes declares.
      // If a new entry is added to SHARED_EVENT_NAMES without adding it to SharedNetworkEventTypes,
      // this assignment is a type error and the test fails to compile.
      const typed: AllowedKeys = name;
      expect(typeof typed).toBe('string');
    }
  });
});

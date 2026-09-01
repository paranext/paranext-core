import { describe, it, expect } from 'vitest';
import { FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY } from './focused-resource-state-key.const';

describe('FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY', () => {
  it('pins the publishing side of the web view state key', () => {
    // `platform-scripture` mirrors this key (extensions cannot import each other's source) and pins
    // its own copy. That copy cannot catch a rename HERE, which is the failure that actually breaks
    // the feature: the panels would publish under a key nothing reads, resources would silently stop
    // appearing in Find's project picker, and every test would still be green. Pinning both sides is
    // what closes that window — see ADR-0029.
    expect(FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY).toBe('focusedResourceProjectId');
  });
});

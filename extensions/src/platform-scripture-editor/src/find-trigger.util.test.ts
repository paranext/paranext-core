import { describe, it, expect } from 'vitest';
import { getOpenFindTriggerArgs } from './find-trigger.util';

describe('getOpenFindTriggerArgs', () => {
  it('returns args when a resource is displayed', () => {
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', 'dog')).toEqual({
      webViewId: 'wv-1',
      selectedText: 'dog',
      sourceProjectId: 'res-proj',
    });
  });

  it('is a no-op (undefined) when no resource is displayed', () => {
    expect(getOpenFindTriggerArgs('wv-1', undefined, 'dog')).toBeUndefined();
  });

  it('is a no-op (undefined) when the web view id is missing', () => {
    expect(getOpenFindTriggerArgs(undefined, 'res-proj', '')).toBeUndefined();
  });
});

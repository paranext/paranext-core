import { describe, it, expect } from 'vitest';
import { getOpenFindTriggerArgs } from './find-trigger.util';

describe('getOpenFindTriggerArgs', () => {
  it('returns args when the tab has scripture to search', () => {
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', 'dog')).toEqual({
      webViewId: 'wv-1',
      selectedText: 'dog',
      sourceProjectId: 'res-proj',
    });
  });

  it('passes an empty selection through (Find opens without pre-filling)', () => {
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', '')).toEqual({
      webViewId: 'wv-1',
      selectedText: '',
      sourceProjectId: 'res-proj',
    });
  });

  it('is a no-op (undefined) when no scripture is resolved yet', () => {
    expect(getOpenFindTriggerArgs('wv-1', undefined, 'dog')).toBeUndefined();
  });
});

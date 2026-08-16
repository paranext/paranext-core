import { describe, it, expect } from 'vitest';
import { getEditorOpenFindArgs, getOpenFindTriggerArgs } from './find-trigger.util';

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

describe('getEditorOpenFindArgs', () => {
  it('forwards the editor web view id and its selection (Ctrl+F pre-fills the selection)', () => {
    expect(getEditorOpenFindArgs('wv-editor', 'dog')).toEqual({
      webViewId: 'wv-editor',
      selectedText: 'dog',
    });
  });

  it('normalizes a missing selection to an empty string (Find opens without pre-filling)', () => {
    expect(getEditorOpenFindArgs('wv-editor', undefined)).toEqual({
      webViewId: 'wv-editor',
      selectedText: '',
    });
  });
});

import { describe, it, expect } from 'vitest';
import {
  getEditorOpenFindArgs,
  getOpenFindTriggerArgs,
  resolveFindSelectionText,
} from './find-trigger.util';

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

describe('resolveFindSelectionText', () => {
  it('prefers the live selection', () => {
    expect(resolveFindSelectionText('grace', 'mercy')).toBe('grace');
  });

  it('falls back to the pre-press snapshot when the live selection is gone', () => {
    // Opening a dropdown can collapse the document selection before the menu item is chosen.
    expect(resolveFindSelectionText('', 'mercy')).toBe('mercy');
  });

  it('treats a whitespace-only live selection as no selection', () => {
    expect(resolveFindSelectionText('   \n', 'mercy')).toBe('mercy');
  });

  it('trims the chosen text so a double-click trailing space does not join the search term', () => {
    expect(resolveFindSelectionText('grace ', undefined)).toBe('grace');
    expect(resolveFindSelectionText(undefined, ' mercy\n')).toBe('mercy');
  });

  it('returns an empty string when nothing is or was selected', () => {
    expect(resolveFindSelectionText(undefined, undefined)).toBe('');
    expect(resolveFindSelectionText('', '   ')).toBe('');
  });
});

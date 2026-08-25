import { describe, it, expect } from 'vitest';
import { getOpenFindTriggerArgs, resolveFindSelectionText } from './find-trigger.util';

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

  it('rejects a selection that spans lines — Find’s search box is a single line', () => {
    // Ctrl+A, or a drag across verses. Flattening a passage into one run-on term would run a doomed
    // search and push it into the shared search history.
    expect(resolveFindSelectionText('grace\nand mercy', undefined)).toBe('');
    expect(resolveFindSelectionText('grace\r\nand mercy', undefined)).toBe('');
    expect(resolveFindSelectionText(undefined, 'grace\nand mercy')).toBe('');
  });

  it('falls back to the snapshot when the live selection spans lines', () => {
    expect(resolveFindSelectionText('grace\nand mercy', 'mercy')).toBe('mercy');
  });

  it('returns an empty string when nothing is or was selected', () => {
    expect(resolveFindSelectionText(undefined, undefined)).toBe('');
    expect(resolveFindSelectionText('', '   ')).toBe('');
  });
});

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

  it('normalizes the selection, so no caller can hand Find a raw one', () => {
    // A double-click on a word usually takes the trailing space with it, and searching "dog "
    // finds far less than "dog".
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', 'dog ')?.selectedText).toBe('dog');
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', undefined)?.selectedText).toBe('');
    // Find's search box is a single line, so a selection spanning lines is not a search term.
    expect(getOpenFindTriggerArgs('wv-1', 'res-proj', 'dog\ncat')?.selectedText).toBe('');
  });

  it('is a no-op (undefined) when no scripture is resolved yet', () => {
    expect(getOpenFindTriggerArgs('wv-1', undefined, 'dog')).toBeUndefined();
  });
});

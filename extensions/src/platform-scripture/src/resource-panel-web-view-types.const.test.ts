import { describe, it, expect } from 'vitest';
import {
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
  DECLARING_WEB_VIEW_TYPES,
  FIND_SEARCHABLE_WEB_VIEW_TYPES,
  REFERENCE_PANEL_WEB_VIEW_TYPES,
  REVEALABLE_REFERENCE_PANEL_WEB_VIEW_TYPES,
  MODEL_TEXT_PANEL_WEBVIEW_TYPE,
  TEXT_COLLECTION_WEB_VIEW_TYPES,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
} from './resource-panel-web-view-types.const';

describe('resource panel web view types', () => {
  it('pins this extension’s mirrored copies to the editor’s web view type literals', () => {
    // Extensions can't import each other's source, so these are mirrors of the consts in
    // platform-scripture-editor. Pinning the literals catches an accidental edit to these copies,
    // which would silently drop the tabs back out of Find's project picker.
    expect(MODEL_TEXT_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.modelText');
    expect(BIBLE_TEXTS_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.bibleTexts');
    expect(COMMENTARIES_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.commentaries');
    expect(SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE).toBe('platformScriptureEditor.scriptureTextGrid');
  });
});

describe('FIND_SEARCHABLE_WEB_VIEW_TYPES', () => {
  it('includes the editor, the three reference panels and the Text Collection', () => {
    expect([...FIND_SEARCHABLE_WEB_VIEW_TYPES].sort()).toEqual(
      [
        'platformScriptureEditor.react',
        'platformScriptureEditor.modelText',
        'platformScriptureEditor.bibleTexts',
        'platformScriptureEditor.commentaries',
        'platformScriptureEditor.scriptureTextGrid',
      ].sort(),
    );
  });
});

describe('DECLARING_WEB_VIEW_TYPES', () => {
  it('holds the reference panels and the Text Collection, never the editor', () => {
    expect([...DECLARING_WEB_VIEW_TYPES].sort()).toEqual(
      [...REFERENCE_PANEL_WEB_VIEW_TYPES, ...TEXT_COLLECTION_WEB_VIEW_TYPES].sort(),
    );
    expect(DECLARING_WEB_VIEW_TYPES.has('platformScriptureEditor.scriptureTextGrid')).toBe(true);
    expect(DECLARING_WEB_VIEW_TYPES.has('platformScriptureEditor.react')).toBe(false);
  });
});

describe('REFERENCE_PANEL_WEB_VIEW_TYPES', () => {
  it('holds exactly the three read-only reference panels', () => {
    expect([...REFERENCE_PANEL_WEB_VIEW_TYPES].sort()).toEqual(
      [
        'platformScriptureEditor.modelText',
        'platformScriptureEditor.bibleTexts',
        'platformScriptureEditor.commentaries',
      ].sort(),
    );
  });

  it('excludes the Scripture editor, which is driven by its web view controller instead', () => {
    expect(REFERENCE_PANEL_WEB_VIEW_TYPES.has('platformScriptureEditor.react')).toBe(false);
  });
});

describe('REVEALABLE_REFERENCE_PANEL_WEB_VIEW_TYPES', () => {
  it('holds the panels a "go to result" activation may bring to the front', () => {
    expect([...REVEALABLE_REFERENCE_PANEL_WEB_VIEW_TYPES].sort()).toEqual(
      [BIBLE_TEXTS_PANEL_WEBVIEW_TYPE, COMMENTARIES_PANEL_WEBVIEW_TYPE].sort(),
    );
  });

  it('excludes the Model text panel, which cannot catch up after a hidden reveal', () => {
    // Its scroll effect is keyed on the reference alone. A reference arriving while its tab is
    // hidden finds no layout in a display:none iframe, so the scroll no-ops and nothing re-runs on
    // activation — the revealed panel would show a stale position, with no controller to retry
    // through. It stays searchable; only the reveal is withheld.
    expect(REVEALABLE_REFERENCE_PANEL_WEB_VIEW_TYPES.has(MODEL_TEXT_PANEL_WEBVIEW_TYPE)).toBe(
      false,
    );
    expect(REFERENCE_PANEL_WEB_VIEW_TYPES.has(MODEL_TEXT_PANEL_WEBVIEW_TYPE)).toBe(true);
    expect(FIND_SEARCHABLE_WEB_VIEW_TYPES.has(MODEL_TEXT_PANEL_WEBVIEW_TYPE)).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import {
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
  FIND_SEARCHABLE_WEB_VIEW_TYPES,
  REFERENCE_PANEL_WEB_VIEW_TYPES,
  FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY,
  MODEL_TEXT_PANEL_WEBVIEW_TYPE,
} from './resource-panel-web-view-types.const';

describe('resource panel web view types', () => {
  it('pins this extension’s mirrored copies to the editor’s web view type literals', () => {
    // Extensions can't import each other's source, so these are mirrors of the consts in
    // platform-scripture-editor's main.ts. Pinning the literals catches an accidental edit to
    // these copies, which would silently drop the panels back out of Find's project picker.
    expect(MODEL_TEXT_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.modelText');
    expect(BIBLE_TEXTS_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.bibleTexts');
    expect(COMMENTARIES_PANEL_WEBVIEW_TYPE).toBe('platformScriptureEditor.commentaries');
  });

  it('pins the focused-resource state key the reference panels publish under', () => {
    // Mirror of FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY in platform-scripture-editor. If the two
    // drift, panels publish under a key nothing reads and resources vanish from the picker.
    expect(FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY).toBe('focusedResourceProjectId');
  });
});

describe('FIND_SEARCHABLE_WEB_VIEW_TYPES', () => {
  it('includes the editor and all three read-only reference panels', () => {
    expect([...FIND_SEARCHABLE_WEB_VIEW_TYPES].sort()).toEqual(
      [
        'platformScriptureEditor.react',
        'platformScriptureEditor.modelText',
        'platformScriptureEditor.bibleTexts',
        'platformScriptureEditor.commentaries',
      ].sort(),
    );
  });

  it('excludes the Text Collection, which shows several scriptures at once', () => {
    // The grid has no single searchable project to offer the picker, so it is intentionally out.
    expect(FIND_SEARCHABLE_WEB_VIEW_TYPES.has('platformScriptureEditor.scriptureTextGrid')).toBe(
      false,
    );
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

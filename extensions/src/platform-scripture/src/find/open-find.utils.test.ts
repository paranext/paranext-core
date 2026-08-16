import { describe, it, expect } from 'vitest';
import {
  resolveFindInvocation,
  shouldReloadExistingFind,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from './open-find.utils';

describe('resolveFindInvocation', () => {
  const editorDef = {
    id: 'wv-editor',
    projectId: 'proj-container',
    webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    scrollGroupScrRef: 0,
  };
  const panelDef = {
    id: 'wv-panel',
    projectId: 'proj-container',
    webViewType: 'platformScriptureEditor.bibleTexts',
    scrollGroupScrRef: undefined,
  };

  it('uses the definition projectId when no explicit source is given (editor path)', () => {
    expect(resolveFindInvocation(editorDef, 'wv-editor', undefined).projectId).toBe(
      'proj-container',
    );
  });

  it('prefers the explicit source projectId over the definition projectId (panel path)', () => {
    expect(resolveFindInvocation(panelDef, 'wv-panel', 'resource-proj').projectId).toBe(
      'resource-proj',
    );
  });

  it('forwards editorWebViewId only for the scripture editor web view type', () => {
    expect(resolveFindInvocation(editorDef, 'wv-editor', undefined).editorWebViewIdForFind).toBe(
      'wv-editor',
    );
  });

  it('does NOT forward editorWebViewId for a non-editor panel (prevents the controller hang)', () => {
    expect(
      resolveFindInvocation(panelDef, 'wv-panel', 'resource-proj').editorWebViewIdForFind,
    ).toBeUndefined();
  });

  it('passes through scroll group and triggering tab id', () => {
    const r = resolveFindInvocation(editorDef, 'wv-editor', undefined);
    expect(r.editorScrollGroupId).toBe(0);
    expect(r.tabIdFromWebViewId).toBe('wv-editor');
  });

  it('returns undefined projectId when neither source nor definition has one', () => {
    expect(resolveFindInvocation(undefined, undefined, undefined).projectId).toBeUndefined();
  });
});

describe('shouldReloadExistingFind', () => {
  // An existing Find panel that was opened from an editor: it holds that editor's id in state.
  const findFromEditor = (editorWebViewId: string | undefined, projectId = 'proj-A') => ({
    id: 'wv-find',
    webViewType: 'platformScripture.find',
    projectId,
    state: editorWebViewId ? { editorWebViewId } : {},
  });

  it('reloads when the project to search differs', () => {
    expect(shouldReloadExistingFind(findFromEditor('wv-editor'), 'proj-B', undefined, '')).toBe(
      true,
    );
  });

  it('reloads when the caller supplied a selection to pre-fill (same project + coupling)', () => {
    expect(shouldReloadExistingFind(findFromEditor(undefined), 'proj-A', undefined, 'sel')).toBe(
      true,
    );
  });

  it('reloads to CLEAR a stale editor id on a same-project panel trigger with no selection', () => {
    // The regression: a panel trigger resolves editorWebViewIdForFind to undefined. Without a reload
    // the panel keeps `state.editorWebViewId: 'wv-editor'` and hangs useWebViewController on a closed
    // editor. This case is exactly (same project, no selection) that the old 2-clause gate skipped.
    expect(shouldReloadExistingFind(findFromEditor('wv-editor'), 'proj-A', undefined, '')).toBe(
      true,
    );
  });

  it('reloads to re-point Find when Ctrl+F fires in a different editor for the same project', () => {
    expect(
      shouldReloadExistingFind(findFromEditor('wv-editor-A'), 'proj-A', 'wv-editor-B', ''),
    ).toBe(true);
  });

  it('does NOT reload when nothing changed (same project, no selection, coupling already cleared)', () => {
    expect(shouldReloadExistingFind(findFromEditor(undefined), 'proj-A', undefined, '')).toBe(
      false,
    );
  });

  it('does NOT reload when the same editor re-triggers Find for the same project (no selection)', () => {
    expect(shouldReloadExistingFind(findFromEditor('wv-editor'), 'proj-A', 'wv-editor', '')).toBe(
      false,
    );
  });

  it('reloads when the existing definition could not be read (refresh rather than trust stale)', () => {
    expect(shouldReloadExistingFind(undefined, 'proj-A', undefined, '')).toBe(true);
  });
});

describe('SCRIPTURE_EDITOR_WEBVIEW_TYPE', () => {
  it('pins this extension’s mirrored copy to the editor web view type literal', () => {
    // The gate above compares against this constant. It is a mirror of the editor's own
    // SCRIPTURE_EDITOR_WEBVIEW_TYPE (packages can't import each other's source); pinning the literal
    // catches an accidental edit to this copy that would silently break the editor gate.
    expect(SCRIPTURE_EDITOR_WEBVIEW_TYPE).toBe('platformScriptureEditor.react');
  });
});

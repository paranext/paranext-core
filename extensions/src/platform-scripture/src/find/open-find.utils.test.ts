import { describe, it, expect } from 'vitest';
import { resolveFindInvocation, shouldReloadExistingFind } from './open-find.utils';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '../scripture-editor-web-view-type.const';

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
  /**
   * An existing Find panel: `editorWebViewId` is the editor it is coupled to (absent for a panel
   * trigger), `findSearchTerm` is what its search box currently holds.
   */
  const openFind = (
    state: { editorWebViewId?: string; findSearchTerm?: string },
    projectId = 'proj-A',
  ) => ({
    id: 'wv-find',
    webViewType: 'platformScripture.find',
    projectId,
    state,
  });

  it('reloads when the project to search differs', () => {
    expect(
      shouldReloadExistingFind(openFind({ editorWebViewId: 'wv-editor' }), 'proj-B', undefined, ''),
    ).toBe(true);
  });

  it('reloads when the caller supplied a NEW selection to pre-fill (same project + coupling)', () => {
    expect(
      shouldReloadExistingFind(openFind({ findSearchTerm: 'cat' }), 'proj-A', undefined, 'dog'),
    ).toBe(true);
  });

  it('does NOT reload when the selection matches the term the panel already shows', () => {
    // Ctrl+F repeated on the same selection: a reload would remount Find and blank its in-progress
    // results for no change at all.
    expect(
      shouldReloadExistingFind(openFind({ findSearchTerm: 'dog' }), 'proj-A', undefined, 'dog'),
    ).toBe(false);
  });

  it('reloads to CLEAR a stale editor id on a same-project panel trigger with no selection', () => {
    // The regression: a panel trigger resolves editorWebViewIdForFind to undefined. Without a reload
    // the panel keeps `state.editorWebViewId: 'wv-editor'` and hangs useWebViewController on a closed
    // editor. This case is exactly (same project, no selection) that the old 2-clause gate skipped.
    expect(
      shouldReloadExistingFind(openFind({ editorWebViewId: 'wv-editor' }), 'proj-A', undefined, ''),
    ).toBe(true);
  });

  it('reloads to re-point Find when Ctrl+F fires in a different editor for the same project', () => {
    expect(
      shouldReloadExistingFind(
        openFind({ editorWebViewId: 'wv-editor-A' }),
        'proj-A',
        'wv-editor-B',
        '',
      ),
    ).toBe(true);
  });

  it('does NOT reload when nothing changed (same project, no selection, coupling already cleared)', () => {
    expect(shouldReloadExistingFind(openFind({}), 'proj-A', undefined, '')).toBe(false);
  });

  it('does NOT reload when the same editor re-triggers Find for the same project (no selection)', () => {
    expect(
      shouldReloadExistingFind(
        openFind({ editorWebViewId: 'wv-editor' }),
        'proj-A',
        'wv-editor',
        '',
      ),
    ).toBe(false);
  });

  it('reloads when the existing definition could not be read (refresh rather than trust stale)', () => {
    expect(shouldReloadExistingFind(undefined, 'proj-A', undefined, '')).toBe(true);
  });
});

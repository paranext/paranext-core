import { describe, it, expect } from 'vitest';
import { resolveFindInvocation, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './open-find.utils';

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

describe('SCRIPTURE_EDITOR_WEBVIEW_TYPE', () => {
  it('pins this extension’s mirrored copy to the editor web view type literal', () => {
    // The gate above compares against this constant. It is a mirror of the editor's own
    // SCRIPTURE_EDITOR_WEBVIEW_TYPE (packages can't import each other's source); pinning the literal
    // catches an accidental edit to this copy that would silently break the editor gate.
    expect(SCRIPTURE_EDITOR_WEBVIEW_TYPE).toBe('platformScriptureEditor.react');
  });
});

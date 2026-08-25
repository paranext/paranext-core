import { describe, it, expect } from 'vitest';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './scripture-editor-web-view-type.const';

describe('SCRIPTURE_EDITOR_WEBVIEW_TYPE', () => {
  it('pins this extension’s mirrored copy to the editor web view type literal', () => {
    // Every consumer in this extension (the Find editor-coupling gate, the checks side panel, the
    // checklist, and Manage Books) compares against this constant. It is a mirror of the editor's
    // own SCRIPTURE_EDITOR_WEBVIEW_TYPE (extensions can't import each other's source); pinning the
    // literal catches an accidental edit to this copy that would silently break all of them.
    expect(SCRIPTURE_EDITOR_WEBVIEW_TYPE).toBe('platformScriptureEditor.react');
  });
});

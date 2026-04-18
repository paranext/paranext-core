import {
  getZoomKeyForTab,
  getZoomKeyForDialog,
  getDefaultKeyForInstance,
  PER_INSTANCE_VIEW_TYPES,
  isPerInstanceKey,
} from './view-zoom-key.util';

describe('view-zoom-key.util', () => {
  it('uses tabType for non-webview tabs', () => {
    expect(getZoomKeyForTab({ id: 't1', tabType: 'settings-tab' })).toBe('settings-tab');
  });

  it('uses webViewType for non-editor webviews', () => {
    expect(
      getZoomKeyForTab({
        id: 'wv1',
        tabType: 'webView',
        data: { webViewType: 'platformScripture.checksSidePanel' },
      }),
    ).toBe('platformScripture.checksSidePanel');
  });

  it('uses per-instance key for editor-like webviews', () => {
    PER_INSTANCE_VIEW_TYPES.add('platformScriptureEditor.editor');
    expect(
      getZoomKeyForTab({
        id: 'wv1',
        tabType: 'webView',
        data: { webViewType: 'platformScriptureEditor.editor' },
      }),
    ).toBe('platformScriptureEditor.editor:wv1');
  });

  it('derives dialog key from component name', () => {
    function MyDialog() {
      return undefined;
    }
    expect(getZoomKeyForDialog(MyDialog)).toBe('dialog:MyDialog');
  });

  it('falls back to "dialog:anonymous" for nameless components', () => {
    expect(getZoomKeyForDialog(() => undefined)).toBe('dialog:anonymous');
  });

  it('computes the default-key for a per-instance webviewType', () => {
    expect(getDefaultKeyForInstance('platformScriptureEditor.editor')).toBe(
      'platformScriptureEditor.editor:__default',
    );
  });

  it('isPerInstanceKey detects the shape', () => {
    expect(isPerInstanceKey('platformScriptureEditor.editor:wv1')).toBe(true);
    expect(isPerInstanceKey('platformScriptureEditor.editor:__default')).toBe(true);
    expect(isPerInstanceKey('settings-tab')).toBe(false);
  });
});

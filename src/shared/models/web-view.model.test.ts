// Core cannot import extension source at runtime (separate build context), so the two constants in
// web-view.model.ts are hand-kept mirrors. A test can import it, though, and each extension keeps
// its value in an import-free module so that import pulls in nothing else.
import { findWebViewType } from '../../../extensions/src/platform-scripture/src/find-web-view-type.const';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE as EXTENSION_SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '../../../extensions/src/platform-scripture-editor/src/scripture-editor-web-view-type.const';
import { FIND_WEBVIEW_TYPE, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './web-view.model';

describe('SCRIPTURE_EDITOR_WEBVIEW_TYPE drift guard', () => {
  test('matches the platform-scripture-editor extension source of truth', () => {
    // A silent drift breaks BCV navigation-target resolution and the project picker with no type
    // error.
    expect(SCRIPTURE_EDITOR_WEBVIEW_TYPE).toBe(EXTENSION_SCRIPTURE_EDITOR_WEBVIEW_TYPE);
  });
});

describe('FIND_WEBVIEW_TYPE drift guard', () => {
  test('matches the platform-scripture extension source of truth', () => {
    // The Simple-mode layout seeds a Find tab by this `webViewType` (simple-layout.data.ts), so a
    // rename in the extension leaves that tab pointing at a type no provider serves — it just fails
    // to load at startup, with no type error.
    expect(FIND_WEBVIEW_TYPE).toBe(findWebViewType);
  });
});

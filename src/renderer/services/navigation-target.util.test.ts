import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { resolveTargetWebView } from '@renderer/services/navigation-target.util';

// vi.mock is hoisted above these imports at transform time, so the static imports can be written
// first (satisfying import/first). navigation-target.util reads the tracked definition and the open
// definition list from web-view.service-host; mock just those two synchronous getters and let the
// util (and the real findFirstEditorWebViewDefinition) run.
const { getSavedWebViewDefinitionSyncMock, getAllOpenWebViewDefinitionsSyncMock } = vi.hoisted(
  () => ({
    getSavedWebViewDefinitionSyncMock: vi.fn(),
    getAllOpenWebViewDefinitionsSyncMock: vi.fn(),
  }),
);

vi.mock('@renderer/services/web-view.service-host', () => ({
  getSavedWebViewDefinitionSync: getSavedWebViewDefinitionSyncMock,
  getAllOpenWebViewDefinitionsSync: getAllOpenWebViewDefinitionsSyncMock,
}));

/** A main-project Scripture editor: the fallback / Simple-mode pin target. */
const EDITOR = {
  id: 'editor-1',
  webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  projectId: 'project-1',
};
/** A secondary navigable view (e.g. the model-text panel) the user last focused. */
const TRACKED = { id: 'panel-1', projectId: 'project-1' };

describe('resolveTargetWebView', () => {
  beforeEach(() => {
    getSavedWebViewDefinitionSyncMock.mockReset();
    getAllOpenWebViewDefinitionsSyncMock.mockReset();
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([EDITOR]);
  });

  test('resolves the tracked web view when it is navigable (power / default)', () => {
    getSavedWebViewDefinitionSyncMock.mockReturnValue(TRACKED);

    expect(resolveTargetWebView('panel-1')).toEqual({ id: 'panel-1', definition: TRACKED });
  });

  test('falls back to the first open editor when nothing is tracked (power / default)', () => {
    expect(resolveTargetWebView(undefined)).toEqual({ id: 'editor-1', definition: EDITOR });
  });

  test('pins to the main editor and ignores the tracked view when pinToMainEditor is true (simple)', () => {
    getSavedWebViewDefinitionSyncMock.mockReturnValue(TRACKED);

    // "panel-1" is tracked AND navigable, but Simple mode resolves straight to the editor.
    expect(resolveTargetWebView('panel-1', true)).toEqual({ id: 'editor-1', definition: EDITOR });
    // The tracked definition is never even consulted when pinning.
    expect(getSavedWebViewDefinitionSyncMock).not.toHaveBeenCalled();
  });

  test('returns undefined when pinning but no editor is open', () => {
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([]);

    expect(resolveTargetWebView('panel-1', true)).toBeUndefined();
  });
});

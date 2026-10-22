import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ChecksSidePanelWebViewOptions,
  checksSidePanelWebViewType,
} from './checks-side-panel.web-view-provider';
import {
  openChecksSidePanelWebView,
  updateChecksSidePanelProject,
} from './open-checks-side-panel.utils';
import { SIMPLE_RESOURCES_PANEL_ID } from './simple-resources-panel-id.const';

const mocks = vi.hoisted(() => ({
  getSetting: vi.fn(),
  openWebView: vi.fn(),
  getOpenWebViewDefinition: vi.fn(),
  reloadWebView: vi.fn(),
}));

vi.mock('@papi/backend', () => ({
  default: {
    settings: { get: mocks.getSetting },
    webViews: {
      openWebView: mocks.openWebView,
      getOpenWebViewDefinition: mocks.getOpenWebViewDefinition,
      reloadWebView: mocks.reloadWebView,
    },
  },
  logger: { debug: vi.fn() },
}));

const EDITOR_TAB_ID = 'editor-tab-1';

const options = (
  overrides: Partial<ChecksSidePanelWebViewOptions> = {},
): ChecksSidePanelWebViewOptions => ({
  projectId: 'project-1',
  editorScrollGroupId: 0,
  editorWebViewId: EDITOR_TAB_ID,
  ...overrides,
});

/** Layouts of every `openWebView` call that could create a web view (i.e. not a reuse probe). */
const creatingLayouts = () =>
  mocks.openWebView.mock.calls
    .filter(([, , callOptions]) => callOptions?.createNewIfNotFound !== false)
    .map(([, layout]) => layout);

describe('openChecksSidePanelWebView', () => {
  beforeEach(() => {
    // Reset, not clear: a `mockResolvedValueOnce` left unconsumed by one test must not leak into the next.
    vi.resetAllMocks();
  });

  describe('Simple mode', () => {
    beforeEach(() => {
      mocks.getSetting.mockResolvedValue('simple');
    });

    it('probes for an existing Checks tab first, then adds a new one to Column 3 as a tab', async () => {
      mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('checks-1');

      const result = await openChecksSidePanelWebView(options(), EDITOR_TAB_ID);

      expect(result).toBe('checks-1');
      expect(mocks.openWebView).toHaveBeenCalledTimes(2);
      expect(mocks.openWebView).toHaveBeenNthCalledWith(
        1,
        checksSidePanelWebViewType,
        undefined,
        expect.objectContaining({ existingId: '?', createNewIfNotFound: false }),
      );
      expect(mocks.openWebView).toHaveBeenNthCalledWith(
        2,
        checksSidePanelWebViewType,
        { type: 'tab', parentTabGroupId: SIMPLE_RESOURCES_PANEL_ID },
        options(),
      );
    });

    it('never docks the panel beside the editor, which would split its column', async () => {
      mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('checks-1');

      await openChecksSidePanelWebView(options(), EDITOR_TAB_ID);

      expect(creatingLayouts()).not.toContainEqual(expect.objectContaining({ type: 'panel' }));
    });

    it('reuses and fronts the open Checks tab on a later call instead of adding another', async () => {
      mocks.openWebView.mockResolvedValue('checks-1');
      mocks.getOpenWebViewDefinition.mockResolvedValue({
        id: 'checks-1',
        webViewType: checksSidePanelWebViewType,
        projectId: 'project-1',
        state: { editorWebViewId: EDITOR_TAB_ID },
      });

      const result = await openChecksSidePanelWebView(options(), EDITOR_TAB_ID);

      expect(result).toBe('checks-1');
      expect(mocks.openWebView).toHaveBeenCalledTimes(1);
      // The probe is what brings the tab to the front; `bringToFront` must not be switched off.
      expect(mocks.openWebView.mock.calls[0][2]).not.toHaveProperty('bringToFront', false);
      expect(creatingLayouts()).toEqual([]);
      expect(mocks.reloadWebView).not.toHaveBeenCalled();
    });

    it('re-points the open Checks tab when the editor now shows a different project', async () => {
      mocks.openWebView.mockResolvedValue('checks-1');
      mocks.getOpenWebViewDefinition.mockResolvedValue({
        id: 'checks-1',
        webViewType: checksSidePanelWebViewType,
        projectId: 'project-old',
        state: { editorWebViewId: 'editor-tab-old' },
      });
      mocks.reloadWebView.mockResolvedValue('checks-1');
      const newOptions = options({ projectId: 'project-new' });

      const result = await openChecksSidePanelWebView(newOptions, EDITOR_TAB_ID);

      expect(result).toBe('checks-1');
      expect(mocks.reloadWebView).toHaveBeenCalledWith(
        checksSidePanelWebViewType,
        'checks-1',
        newOptions,
      );
      expect(creatingLayouts()).toEqual([]);
    });

    it('re-points the open Checks tab when only the editor web view id changed', async () => {
      mocks.openWebView.mockResolvedValue('checks-1');
      mocks.getOpenWebViewDefinition.mockResolvedValue({
        id: 'checks-1',
        webViewType: checksSidePanelWebViewType,
        projectId: 'project-1',
        state: { editorWebViewId: 'editor-tab-old' },
      });
      mocks.reloadWebView.mockResolvedValue('checks-1');

      await openChecksSidePanelWebView(options(), EDITOR_TAB_ID);

      expect(mocks.reloadWebView).toHaveBeenCalledWith(
        checksSidePanelWebViewType,
        'checks-1',
        options(),
      );
    });

    it('opens a fresh Column 3 tab when the tab closed between the probe and the reload', async () => {
      mocks.openWebView.mockResolvedValueOnce('checks-1').mockResolvedValueOnce('checks-2');
      mocks.getOpenWebViewDefinition.mockResolvedValue({
        id: 'checks-1',
        webViewType: checksSidePanelWebViewType,
        projectId: 'project-old',
      });
      mocks.reloadWebView.mockResolvedValue(undefined);

      const result = await openChecksSidePanelWebView(options(), EDITOR_TAB_ID);

      expect(result).toBe('checks-2');
      expect(creatingLayouts()).toEqual([
        { type: 'tab', parentTabGroupId: SIMPLE_RESOURCES_PANEL_ID },
      ]);
    });
  });

  describe('Power mode', () => {
    beforeEach(() => {
      mocks.getSetting.mockResolvedValue('power');
    });

    it('docks a new panel to the right of the editor tab without probing for an existing one', async () => {
      mocks.openWebView.mockResolvedValue('checks-1');

      const result = await openChecksSidePanelWebView(options(), EDITOR_TAB_ID);

      expect(result).toBe('checks-1');
      expect(mocks.openWebView).toHaveBeenCalledTimes(1);
      expect(mocks.openWebView).toHaveBeenCalledWith(
        checksSidePanelWebViewType,
        { type: 'panel', direction: 'right', targetTabId: EDITOR_TAB_ID },
        options(),
      );
      expect(mocks.getOpenWebViewDefinition).not.toHaveBeenCalled();
      expect(mocks.reloadWebView).not.toHaveBeenCalled();
    });
  });
});

describe('updateChecksSidePanelProject', () => {
  beforeEach(() => {
    // Reset, not clear: a `mockResolvedValueOnce` left unconsumed by one test must not leak into the next.
    vi.resetAllMocks();
  });

  it('creates nothing when no Checks side panel is open', async () => {
    mocks.openWebView.mockResolvedValue(undefined);

    const result = await updateChecksSidePanelProject('project-new', 'editor-new');

    expect(result).toBeUndefined();
    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(mocks.openWebView).toHaveBeenCalledWith(
      checksSidePanelWebViewType,
      undefined,
      expect.objectContaining({ existingId: '?', createNewIfNotFound: false }),
    );
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('reloads the open panel at the new project without bringing it to the front', async () => {
    mocks.openWebView.mockResolvedValue('checks-1');
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'checks-1',
      webViewType: checksSidePanelWebViewType,
      projectId: 'project-old',
      scrollGroupScrRef: 0,
      state: { editorWebViewId: 'editor-old' },
    });
    mocks.reloadWebView.mockResolvedValue('checks-1');

    const result = await updateChecksSidePanelProject('project-new', 'editor-new');

    expect(result).toBe('checks-1');
    // The probe must not front the tab either: a project switch is not a request for Checks.
    expect(mocks.openWebView.mock.calls[0][2]).toHaveProperty('bringToFront', false);
    expect(mocks.reloadWebView).toHaveBeenCalledWith(checksSidePanelWebViewType, 'checks-1', {
      projectId: 'project-new',
      // Preserved from the open panel so it stays in the editor's scroll group.
      editorScrollGroupId: 0,
      editorWebViewId: 'editor-new',
      bringToFront: false,
    });
  });

  it('leaves the open panel alone when it already shows the project and editor', async () => {
    mocks.openWebView.mockResolvedValue('checks-1');
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'checks-1',
      webViewType: checksSidePanelWebViewType,
      projectId: 'project-1',
      state: { editorWebViewId: 'editor-1' },
    });

    const result = await updateChecksSidePanelProject('project-1', 'editor-1');

    expect(result).toBe('checks-1');
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('reports no re-point when the panel closed before the reload reached it', async () => {
    mocks.openWebView.mockResolvedValue('checks-1');
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'checks-1',
      webViewType: checksSidePanelWebViewType,
      projectId: 'project-old',
    });
    mocks.reloadWebView.mockResolvedValue(undefined);

    const result = await updateChecksSidePanelProject('project-new', 'editor-new');

    expect(result).toBeUndefined();
    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
  });
});

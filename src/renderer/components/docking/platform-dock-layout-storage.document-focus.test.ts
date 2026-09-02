import { vi } from 'vitest';
import DockLayout, { TabData } from 'rc-dock';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { Layout, WebViewTabProps } from '@shared/models/docking-framework.model';

import { addWebViewToDock } from './platform-dock-layout-storage.util';

// Same file-level mock set as `platform-dock-layout-storage.util.test.ts` — this file imports the
// same module, which still needs its whole dependency graph stubbed to import cleanly.
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

/**
 * Docking a web view ends by focusing its iframe. A `focus()` inside a window that does not hold OS
 * focus asks the browser to activate that window, so a window opened deliberately in the background
 * would pull itself to the front the moment content arrived. These cover the two answers the dock
 * can give, since a flag that is never read looks identical to one that is always read.
 */
describe('taking document focus when a web view is docked', () => {
  const TAB_ID = 'test-web-view';
  let localMockDockLayout: DockLayout;
  let iframe: HTMLIFrameElement;
  let focusSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localMockDockLayout = mock(DockLayout);
    // An empty layout: nothing is docked, nothing floats and nothing is maximized, which is the
    // shape of a window created to receive a single web view. Asserted rather than built in full
    // because rc-dock's layout type carries far more than these paths read, and spelling all of it
    // out would say nothing about what is under test.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    when(localMockDockLayout.getLayout()).thenReturn({
      dockbox: { mode: 'horizontal', children: [] },
      floatbox: { mode: 'float', children: [] },
    } as ReturnType<DockLayout['getLayout']>);
    // Only `id` and a non-null `title` are read on this path — `title` is what marks this as a tab
    // rather than a panel, and no `parent` means there is no floating tab group to raise.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    when(localMockDockLayout.find(anything())).thenReturn({ id: TAB_ID, title: TAB_ID } as TabData);

    iframe = document.createElement('iframe');
    iframe.setAttribute('data-web-view-id', TAB_ID);
    document.body.appendChild(iframe);
    focusSpy = vi.fn();
    if (iframe.contentWindow) iframe.contentWindow.focus = focusSpy;
  });

  afterEach(() => {
    iframe.remove();
  });

  /** The web view being docked, reduced to the fields this path reads */
  function webViewToDock(): WebViewTabProps {
    // Intentionally a partial fixture: docking reads the id and type, not the content.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return { id: TAB_ID, webViewType: 'test.type', content: '' } as unknown as WebViewTabProps;
  }

  const layout: Layout = { type: 'tab' };

  it('focuses the docked web view by default, so an open the user asked for lands ready to type in', () => {
    addWebViewToDock(webViewToDock(), layout, true, instance(localMockDockLayout));

    expect(focusSpy).toHaveBeenCalled();
  });

  /**
   * A window created for a web view has an empty dock, so its first web view is ADDED rather than
   * updated — a different branch from the one the tests above take. `find` answers `undefined`
   * before the add and the tab afterwards, which is what the real dock does.
   */
  function whenTabIsAddedRatherThanUpdated() {
    when(localMockDockLayout.find(anything()))
      .thenReturn(undefined)
      // Only `id` and a non-null `title` are read of the found tab, so the rest of `TabData` —
      // including the React content it demands — would be noise here.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      .thenReturn({ id: TAB_ID, title: TAB_ID } as TabData);
  }

  it('focuses a newly added web view by default', () => {
    whenTabIsAddedRatherThanUpdated();

    addWebViewToDock(webViewToDock(), layout, true, instance(localMockDockLayout));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('leaves document focus alone for a newly added web view when asked to activate without it', () => {
    // The branch a background window actually takes: its dock is empty, so nothing is there to
    // update. Covering only the update branch would leave this one free to steal focus.
    whenTabIsAddedRatherThanUpdated();

    addWebViewToDock(webViewToDock(), layout, true, instance(localMockDockLayout), true);

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('still activates the tab, but leaves document focus alone, when asked to activate without it', () => {
    addWebViewToDock(webViewToDock(), layout, true, instance(localMockDockLayout), true);

    expect(focusSpy).not.toHaveBeenCalled();
    // The tab must still become the active one in its group — a background window the user switches
    // to should show the view that arrived, not whatever was in front before it.
    verify(localMockDockLayout.updateTab(TAB_ID, anything(), true)).once();
  });
});

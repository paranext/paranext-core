import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import DockLayout, { TabData } from 'rc-dock';
import { anything, instance, mock, when } from 'ts-mockito';

import { WebViewTabProps } from '@shared/models/docking-framework.model';
import { resetActivationLatchForTesting } from '@renderer/services/window-activation.util';
import { getDockLayoutSync } from '@renderer/services/web-view.service-shard';

// The same file-level stubs `platform-dock-layout-storage.document-focus.test.ts` needs to import
// the storage util cleanly, since this file exercises that same module through the component.
vi.mock('@shared/services/logger.service');
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: () => false,
}));

vi.mock('@renderer/components/docking/window-label.util', () => ({
  updateWindowTitle: vi.fn(),
}));

vi.mock('@renderer/services/dialog.service-shard', () => ({
  hasDialogRequest: () => false,
  resolveDialogRequest: vi.fn(),
}));

// Stands in for rc-dock's own `DockLayout` component so `dockLayoutRef.current` resolves to a
// controllable mock instance without mounting the real docking widget.
let mockDockLayoutInstance: DockLayout;
vi.mock('@renderer/components/docking/dock-layout-wrapper.component', () => ({
  DockLayoutWrapper: forwardRef((_props: unknown, ref: ForwardedRef<DockLayout>) => {
    useImperativeHandle(ref, () => mockDockLayoutInstance);
    return null;
  }),
}));

// Imported after the mocks above so `vi.mock` hoisting wires them up before this pulls in the real
// component and its real `platform-dock-layout-storage.util` dependency.
// eslint-disable-next-line import/first
import { PlatformDockLayout } from './platform-dock-layout.component';

/**
 * These exercise the facade `platform-dock-layout.component.tsx` registers with
 * `web-view.service-shard` — not `platform-dock-layout-storage.util`'s exports directly, as
 * `platform-dock-layout-storage.document-focus.test.ts` does. A caller reaching the dock through
 * this facade with nothing passed for `activateWithoutDocumentFocus` must get the same answer as a
 * caller reaching the storage util directly: whether this window is still awaiting its first
 * activation. A default value on the facade's own parameter can turn that omitted argument into an
 * explicit `false` before it ever reaches the storage util, which answers the fallback question
 * before it is asked.
 */
describe('the dock layout facade withholds document focus by default while a window awaits its first activation', () => {
  const TAB_ID = 'test-web-view';
  let iframe: HTMLIFrameElement;
  let focusSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const localMockDockLayout = mock(DockLayout);
    // An empty layout, as in the storage util's own document-focus tests: nothing floats and
    // nothing is maximized.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    when(localMockDockLayout.getLayout()).thenReturn({
      dockbox: { mode: 'horizontal', children: [] },
      floatbox: { mode: 'float', children: [] },
    } as ReturnType<DockLayout['getLayout']>);
    // Only `id` and a non-null `title` are read on this path — see the storage util's own tests.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    when(localMockDockLayout.find(anything())).thenReturn({ id: TAB_ID, title: TAB_ID } as TabData);
    mockDockLayoutInstance = instance(localMockDockLayout);

    resetActivationLatchForTesting();
    globalThis.wasWindowCreatedWithoutActivation = true;

    iframe = document.createElement('iframe');
    iframe.setAttribute('data-web-view-id', TAB_ID);
    document.body.appendChild(iframe);
    focusSpy = vi.fn();
    if (iframe.contentWindow) iframe.contentWindow.focus = focusSpy;

    render(<PlatformDockLayout />);
  });

  afterEach(() => {
    iframe.remove();
    globalThis.wasWindowCreatedWithoutActivation = false;
  });

  /** The web view being docked, reduced to the fields this path reads */
  function webViewToDock(): WebViewTabProps {
    // Intentionally a partial fixture: docking reads the id and type, not the content.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return { id: TAB_ID, webViewType: 'test.type', content: '' } as unknown as WebViewTabProps;
  }

  it('addWebViewToDock leaves document focus alone when the caller passes nothing for activateWithoutDocumentFocus', () => {
    getDockLayoutSync().addWebViewToDock(webViewToDock(), { type: 'tab' }, true);

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('focusTab leaves document focus alone when the caller passes nothing for activateWithoutDocumentFocus', () => {
    getDockLayoutSync().focusTab(TAB_ID);

    expect(focusSpy).not.toHaveBeenCalled();
  });
});

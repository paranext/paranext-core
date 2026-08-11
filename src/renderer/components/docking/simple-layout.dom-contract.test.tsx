// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, act } from '@testing-library/react';
import { createRef } from 'react';
import DockLayout, { TabBase, TabData } from 'rc-dock';
import {
  simpleLayout,
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
  SIMPLE_PANEL_ID_RESOURCES,
} from './simple-layout.data';

// jsdom does not implement window.matchMedia; theme.service-host.ts calls it at module init (via
// the import chain from platform-dock-layout-positioning.util). vi.hoisted runs before any
// imports, so the stub is in place before module initialization reaches theme.service-host.ts.
// Precedent: onboarding-tour.component.test.tsx uses the same stub.
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

vi.mock('../../../shared/services/logger.service');

afterEach(cleanup);

/**
 * Pins the cross-library DOM contract the onboarding tour (and dock-layout storage) depend on:
 * rc-dock renders each panel's `PanelData.id` as a `data-dockid` attribute on the panel element.
 * That propagation is an rc-dock internal detail — the tour finds its panel steps via
 * `[data-dockid="..."]` selectors, and Tour skips absent targets by design, so an rc-dock upgrade
 * that renamed or dropped the attribute would silently shrink the tour with zero failing tests
 * anywhere else. This test turns that assumption into an upgrade-detecting assertion.
 */
describe('simpleLayout rc-dock DOM contract', () => {
  it('renders each simple-mode panel id as a data-dockid DOM attribute', () => {
    function loadTab(tab: TabBase): TabData {
      return { id: tab.id, title: tab.id ?? 'tab', content: <div /> };
    }
    const dockLayoutRef = createRef<DockLayout>();
    render(
      <DockLayout
        ref={dockLayoutRef}
        defaultLayout={{ dockbox: { mode: 'horizontal', children: [] } }}
        loadTab={loadTab}
        style={{ width: 1200, height: 800 }}
      />,
    );
    const dockLayout = dockLayoutRef.current;
    if (!dockLayout) throw new Error('DockLayout did not mount');
    // Production loads the simple layout through this same rc-dock API (see
    // platform-dock-layout-storage.util.ts), so this exercises the real materialization path.
    act(() => {
      dockLayout.loadLayout(simpleLayout);
    });

    [SIMPLE_PANEL_ID_MODEL_TEXT, SIMPLE_PANEL_ID_PROJECT, SIMPLE_PANEL_ID_RESOURCES].forEach(
      (panelId) => {
        expect(document.querySelector(`[data-dockid="${panelId}"]`)).not.toBeNull();
      },
    );
  });
});

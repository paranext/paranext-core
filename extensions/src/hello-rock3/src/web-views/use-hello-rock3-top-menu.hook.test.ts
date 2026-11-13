// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEvaluatedMenu } from '@papi/frontend/react';
import { HELLO_ROCK_3_REACT_WEBVIEW_TYPE } from '../util';
import { useHelloRock3TopMenu } from './use-hello-rock3-top-menu.hook';

const { TOP_MENU_FIXTURE, SENTINEL } = vi.hoisted(() => ({
  TOP_MENU_FIXTURE: { columns: {}, groups: {}, items: [] },
  SENTINEL: { columns: {}, groups: {}, items: [], evaluated: true },
}));

vi.mock('@papi/frontend', () => ({
  default: { menuData: { dataProviderName: 'platform.menuDataServiceDataProvider' } },
  logger: { warn: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useData: vi.fn(() => ({
    WebViewMenu: () => [
      { includeDefaults: true, topMenu: TOP_MENU_FIXTURE, contextMenu: undefined },
      vi.fn(),
      false,
    ],
  })),
  useEvaluatedMenu: vi.fn(() => SENTINEL),
}));

describe('useHelloRock3TopMenu', () => {
  it('returns the evaluated menu for the web view and project it belongs to', () => {
    const { result } = renderHook(() => useHelloRock3TopMenu('hr3-wv', 'abc'));

    expect(result.current).toBe(SENTINEL);
    expect(useEvaluatedMenu).toHaveBeenCalledWith(TOP_MENU_FIXTURE, {
      webViewId: 'hr3-wv',
      webViewType: HELLO_ROCK_3_REACT_WEBVIEW_TYPE,
      projectId: 'ABC',
    });
  });
});

// scripture-text-grid.web-view.test.tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { WebViewProps } from '@papi/core';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';

import './scripture-text-grid.web-view';

const { mockUseSources, mockUpdateDef, gridSpy } = vi.hoisted(() => ({
  mockUseSources: vi.fn(),
  mockUpdateDef: vi.fn(),
  gridSpy: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({ logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() } }));
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [
    {
      '%webView_scriptureTextGrid_title_single%': 'Scripture text',
      '%webView_scriptureTextGrid_title_multiple%': 'Text Collection',
    },
    false,
  ],
  useProjectDataProvider: () => ({
    initializeShownByDefaultOverlay: vi.fn().mockResolvedValue(true),
  }),
}));
// The four-source assembly hook is a local extension hook (not a `@papi/frontend/react` export),
// so it is mocked at its real module path. The web view runs the REAL A3 selector over whatever
// sources this returns, so these tests cover the wiring + selector + BibleTextReference mapping.
vi.mock('./use-text-collection-sources.hook', () => ({
  useTextCollectionSources: (...a: unknown[]) => mockUseSources(...a),
}));
vi.mock('./scripture-text-grid/scripture-text-grid.component', () => ({
  ScriptureTextGrid: ({
    resources,
    onDisplayedCountChange,
  }: {
    resources: { label: string }[];
    onDisplayedCountChange?: (n: number) => void;
  }) => {
    gridSpy({ resources, onDisplayedCountChange });
    onDisplayedCountChange?.(resources.length);
    return <div data-testid="grid">{resources.map((r) => r.label).join(',')}</div>;
  },
}));

// A minimal WebViewProps stand-in: only the members the web view actually destructures are
// provided. Cast through unknown because the object literal does not structurally satisfy the
// full (much larger) WebViewProps type.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const props = {
  projectId: 'proj',
  updateWebViewDefinition: mockUpdateDef,
  // `useWebViewScrollGroupScrRef` is a WebViewProps member (only web-view roots get it), NOT a
  // `@papi/frontend/react` export. Return the 4-tuple shape [scrRef, setScrRef, id, setId].
  useWebViewScrollGroupScrRef: () => [
    { book: 'MAT', chapterNum: 5, verseNum: 3, versificationStr: 'English' },
    vi.fn(),
    undefined,
    vi.fn(),
  ],
} as unknown as WebViewProps;

type WebViewComponentGlobal = { webViewComponent: (p: WebViewProps) => ReactElement };

function renderWebView() {
  // globalThis.webViewComponent is assigned by importing the module above; cast through unknown
  // because `globalThis` has no built-in `webViewComponent` member.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const { webViewComponent: Component } = globalThis as unknown as WebViewComponentGlobal;
  return render(<Component {...props} />);
}

const EMPTY_LIST = { dataVersion: '1.1.0', items: [] };

/** Builds a TextCollectionSources whose admin `modelTexts` holds the given Bible-text items. */
function sourcesWithModelTexts(items: unknown[]): TextCollectionSources {
  // The item literals below are narrowed enough for the A3 selector's Bible-text type guards; the
  // cast avoids restating the full ResourceReference union in each fixture.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    adminModelTexts: { dataVersion: '1.1.0', items },
    adminReferenced: EMPTY_LIST,
    userReferenced: EMPTY_LIST,
    overlay: {},
  } as unknown as TextCollectionSources;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ScriptureTextGrid web view', () => {
  it('maps A3-selected Bible-text references (admin-flagged) to grid resources', () => {
    mockUseSources.mockReturnValue([
      sourcesWithModelTexts([
        { type: 'project', id: 'p1', name: 'WEB', isResourceShownByDefault: true },
        { type: 'project', id: 'p2', name: 'KJV', isResourceShownByDefault: false },
      ]),
      false,
    ]);
    const { getByTestId } = renderWebView();
    expect(getByTestId('grid').textContent).toBe('WEB');
  });

  it('sets the multiple-cell title once 2+ resources are shown', () => {
    mockUseSources.mockReturnValue([
      sourcesWithModelTexts([
        { type: 'project', id: 'p1', name: 'WEB', isResourceShownByDefault: true },
        { type: 'project', id: 'p2', name: 'KJV', isResourceShownByDefault: true },
      ]),
      false,
    ]);
    renderWebView();
    expect(mockUpdateDef).toHaveBeenCalledWith({ title: 'Text Collection' });
  });

  it('renders an empty grid (single-cell title) when no resources are shown', () => {
    mockUseSources.mockReturnValue([sourcesWithModelTexts([]), true]);
    const { getByTestId } = renderWebView();
    expect(getByTestId('grid').textContent).toBe('');
    expect(mockUpdateDef).toHaveBeenCalledWith({ title: 'Scripture text' });
  });
});

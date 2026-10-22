// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { ComponentProps } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { RESEARCH_TAB_LABEL_KEYS } from '../components/toolbar/toolbar.component';
import {
  EnhancedResourceWebView,
  ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS,
} from './enhanced-resource.web-view';

/*
 * Which parts of the Enhanced Resources view zoom with the pane's content zoom: the Bible text
 * (`main`), the entry text (`entries`) and the footnotes list (`footnotes`), and nothing else.
 * Rendered from the view's presentational shell; the PAPI wiring around it adds no markup.
 */

const MARKER = '[data-platform-content-zoom-root]';

// The real pane mounts a Scripture editor. Only where the shell places it matters here.
vi.mock('../components/scripture-pane/scripture-pane.component', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../components/scripture-pane/scripture-pane.component')
  >()),
  EnhancedScripturePane: () => <div data-testid="scripture-pane">Bible text</div>,
}));

vi.mock('../components/toolbar/toolbar.component', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../components/toolbar/toolbar.component')>()),
  EnhancedResourceTopToolbar: () => <div data-testid="top-toolbar" />,
  EnhancedResourceTabBar: () => <div data-testid="tab-bar" />,
}));

vi.mock('../components/warning-ribbons/warning-ribbons.component', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../components/warning-ribbons/warning-ribbons.component')
  >()),
  WarningRibbons: () => <div data-testid="warning-ribbons" />,
}));

vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}, false],
  useSetting: (_key: string, defaultValue: unknown) => [defaultValue, vi.fn(), vi.fn(), false],
}));

// jsdom implements neither; the resizable panels and the footnotes list observe their size.
beforeAll(() => {
  const stubObserver = () =>
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() }));
  vi.stubGlobal('ResizeObserver', stubObserver());
  vi.stubGlobal('IntersectionObserver', stubObserver());
});

const USJ_WITH_A_FOOTNOTE: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'chapter', marker: 'c', number: '1' },
    { type: 'verse', marker: 'v', number: '1' },
    'In the beginning God created the heavens and the earth.',
    {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [{ type: 'char', marker: 'ft', content: ['A footnote.'] }],
    },
  ],
};

const DICTIONARY_ITEM = {
  tokenId: 'tok-1',
  entryId: 'אֱלֹהִים',
  sourceText: 'אֱלֹהִים',
  translit: 'ʾĕlōhîm',
  relevantSenseIndices: [0],
  firstRelevantSensePreview: 'God; gods',
};

const STRINGS = {
  '%enhancedResources_footnotesPane_zoomAreaLabel%': 'Footnotes',
  [RESEARCH_TAB_LABEL_KEYS.dictionary]: 'Dictionary',
};

type ShellProps = ComponentProps<typeof EnhancedResourceWebView>;

function renderShell(overrides: Partial<ShellProps> = {}) {
  return render(
    <EnhancedResourceWebView
      localizedStringsWithLoadingState={[STRINGS, false]}
      usj={USJ_WITH_A_FOOTNOTE}
      annotations={[]}
      filteredTokenId={undefined}
      activeTab="dictionary"
      onTabChange={vi.fn()}
      scope="current-verse"
      onScopeChange={vi.fn()}
      ribbons={{
        missingBook: false,
        reviewStatus: { visible: false, dismissed: false },
        imageWarning: false,
        copyright: { visible: false, dismissed: false },
        updateRequiredData: false,
        updateAvailable: { visible: false, dismissed: false },
      }}
      dictionaryItems={[DICTIONARY_ITEM]}
      {...overrides}
    />,
  );
}

/** The area id of every marked element, `''` being the view's main area */
function markedAreas(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll(MARKER)).map(
    (marker) => marker.getAttribute('data-platform-content-zoom-root') ?? '',
  );
}

describe('Enhanced Resources content zoom areas', () => {
  it('zooms the Bible text as the main area', () => {
    renderShell();

    expect(screen.getByTestId('scripture-pane').closest(MARKER)).toHaveAttribute(
      'data-platform-content-zoom-root',
      '',
    );
  });

  it('zooms the entry text as the entries area, named after the tab on screen', () => {
    const { container } = renderShell();

    const entryMarkers = container.querySelectorAll('[data-platform-content-zoom-root="entries"]');
    expect(entryMarkers.length).toBeGreaterThan(0);
    expect(Array.from(entryMarkers).map((marker) => marker.textContent)).toContain('God; gods');
    entryMarkers.forEach((marker) =>
      expect(marker).toHaveAttribute('data-platform-content-zoom-label', 'Dictionary'),
    );
  });

  it('ties the whole entries panel, tab bar and gaps included, to the entries area', () => {
    // Only the entry text is marked, so without the scope a Ctrl/⌘+wheel over a card's padding, the
    // gap between entries or the tab bar would reach no marker and fall back to the area used last.
    const { container } = renderShell();

    const scopes = container.querySelectorAll('[data-platform-content-zoom-scope]');
    expect(scopes).toHaveLength(1);
    expect(scopes[0]).toHaveAttribute('data-platform-content-zoom-scope', 'entries');
    expect(scopes[0]).toContainElement(screen.getByTestId('tab-bar'));
    expect(scopes[0]).toContainElement(screen.getByText('God; gods'));
  });

  it('zooms the footnotes list as its own area, named for the zoom indicator', () => {
    const { container } = renderShell({ showFootnotes: true });

    const footnotes = container.querySelector('[data-platform-content-zoom-root="footnotes"]');
    expect(footnotes).toHaveAttribute('data-platform-content-zoom-label', 'Footnotes');
    expect(footnotes).toHaveTextContent('A footnote.');
  });

  it('requests the footnotes zoom area label with the rest of the view’s strings', () => {
    // A key missing from the requested list leaves the label empty, so the zoom indicator would
    // show a bare level that reads as the Bible text's own.
    expect(ENHANCED_RESOURCE_WEB_VIEW_STRING_KEYS).toContain(
      '%enhancedResources_footnotesPane_zoomAreaLabel%',
    );
  });

  it('uses exactly the main, entries and footnotes areas, none inside another', () => {
    // The platform ignores a marker inside another marker and logs it rather than erroring.
    const { container } = renderShell({ showFootnotes: true });

    expect(new Set(markedAreas(container))).toEqual(new Set(['', 'entries', 'footnotes']));
    expect(container.querySelectorAll(`${MARKER} ${MARKER}`)).toHaveLength(0);
  });

  it('keeps the ribbons, toolbar, tab bar and both resize handles at interface scale', () => {
    const { container } = renderShell({ showFootnotes: true });

    ['warning-ribbons', 'top-toolbar', 'tab-bar'].forEach((testId) =>
      expect(screen.getByTestId(testId).closest(MARKER)).toBeNull(),
    );
    const handles = container.querySelectorAll('[data-slot="resizable-handle"]');
    expect(handles).toHaveLength(2);
    handles.forEach((handle) => expect(handle.closest(MARKER)).toBeNull());
  });

  it('renders the semantic domain dialog outside the entries area', () => {
    // The dialog's entries render hook consumers, and React context reaches through a portal: inside
    // the entries provider they would zoom as entries while the dialog itself stays unscaled.
    renderShell({
      semanticDomainViewerOpen: true,
      semanticDomainViewerFilteredEntries: [
        { ...DICTIONARY_ITEM, tokenId: 'tok-in-dialog', firstRelevantSensePreview: 'deity' },
      ],
    });

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('deity').closest(MARKER)).toBeNull();
  });

  it('sizes nothing with a zoom of its own, so the content zoom areas alone scale the text', () => {
    // A private factor would multiply with the platform's level for whichever area it sits in.
    const { container } = renderShell({ showFootnotes: true });

    // Every element, not only those with a `style` attribute: jsdom keeps CSS `zoom` on the CSSOM
    // property but does not serialize it into the attribute.
    const sized = Array.from(container.querySelectorAll<HTMLElement>('*')).filter(
      (element) => element.style.zoom || element.style.fontSize,
    );
    expect(sized).toEqual([]);
  });
});

// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be before any import that touches the component
// ---------------------------------------------------------------------------

const { mockUseEffectiveResourceReferenceList } = vi.hoisted(() => ({
  mockUseEffectiveResourceReferenceList: vi.fn(),
}));

// @papi/frontend — papi default export used for themes subscription and commands
vi.mock('@papi/frontend', () => ({
  default: {
    themes: {
      subscribeCurrentTheme: vi.fn(() => Promise.resolve(vi.fn())),
    },
    commands: {
      sendCommand: vi.fn(() => Promise.resolve([])),
    },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// @papi/frontend/react — all PAPI hooks used by the component
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [
    {
      '%webView_resourcePanel_noProject%': 'No project.',
      '%webView_resourcePanel_installing%': 'Installing…',
      '%webView_resourcePanel_selecting%': 'Selecting…',
      '%webView_resourcePanel_installFailed%': "Couldn't install.",
      '%webView_resourcePanel_installFailedOffline%': "Couldn't install. Check your connection.",
      '%webView_resourcePanel_retry%': 'Try again',
      '%webView_resourcePanel_downloadResources%': 'Download resources',
      '%webView_resourcePanel_bibleTexts_emptyState_moreInfo%': 'More info',
      '%webView_resourcePanel_bibleTexts_emptyState_lessInfo%': 'Less info',
      '%webView_resourcePanel_bibleTexts_emptyState_moreInfo_body%': 'Bible texts detail here.',
      '%webView_resourcePanel_bibleTexts_emptyState_prompt%': 'No Bible texts configured.',
      '%webView_resourcePanel_bibleTexts_pick%': 'Pick Bible text…',
      '%webView_resourcePanel_bibleTexts_title%': 'Bible Texts',
      '%webView_resourcePanel_bibleTexts_title_withResource%': 'Bible Texts ({textName})',
      '%webView_resourcePanel_commentaries_emptyState_prompt%': 'No commentaries configured.',
      '%webView_resourcePanel_commentaries_pick%': 'Pick commentary…',
      '%webView_resourcePanel_commentaries_title%': 'Commentaries',
      '%webView_resourcePanel_commentaries_title_withResource%': 'Commentaries ({textName})',
    },
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useProjectDataProvider: vi.fn(() => undefined),
  useProjectData: vi.fn(() => ({
    ChapterUSJ: vi.fn(() => [undefined, false]),
  })),
  useProjectSetting: vi.fn(() => ['ltr', false]),
  useSetting: vi.fn(() => ['simple', false]),
  useDialogCallback: vi.fn(() => vi.fn()),
  usePromise: vi.fn(() => [undefined, false]),
}));

// platform-bible-react — keep UI components real; stub hooks that hit runtime
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
    useTabIconSelection: () => 'papi-extension://platformScriptureEditor/assets/book-open.svg',
    usePromise: vi.fn(() => [undefined, false]),
  };
});

// @eten-tech-foundation/platform-editor — stub the editor so jsdom never needs to render it
vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: vi.fn() }));
    return <div data-testid="editorial" />;
  }),
}));

// Local hooks — mock at module boundaries so tests control the data the component sees
vi.mock('./use-effective-resource-reference-list.hook', () => ({
  useEffectiveResourceReferenceList: (...args: unknown[]) =>
    mockUseEffectiveResourceReferenceList(...args),
  default: (...args: unknown[]) => mockUseEffectiveResourceReferenceList(...args),
}));

vi.mock('./use-commentary-marker-styles.hook', () => ({
  useCommentaryMarkerStyles: vi.fn(),
  default: vi.fn(),
}));

vi.mock('./use-dbl-resource-auto-install.hook', () => ({
  useDblResourceAutoInstall: vi.fn(() => ({
    isInstalling: false,
    installFailed: false,
    retryInstall: vi.fn(),
    markInstallFailed: vi.fn(),
  })),
  default: vi.fn(() => ({
    isInstalling: false,
    installFailed: false,
    retryInstall: vi.fn(),
    markInstallFailed: vi.fn(),
  })),
}));

vi.mock('./use-install-dbl-resource.hook', () => ({
  useInstallDblResource: vi.fn(() => vi.fn(async () => {})),
  default: vi.fn(() => vi.fn(async () => {})),
}));

vi.mock('./use-is-online.hook', () => ({
  useIsOnline: vi.fn(() => true),
  default: vi.fn(() => true),
}));

vi.mock('./select-dbl-resource', () => ({
  selectTextConnection: vi.fn(),
}));

vi.mock('./scripture-text-grid/dbl-resource-lookup.utils', () => ({
  findCachedDblResource: vi.fn(() => undefined),
}));

vi.mock('./install-state-views.component', () => ({
  InstallFailedView: ({ message, retryLabel, onRetry }: Record<string, unknown>) =>
    React.createElement(
      'div',
      null,
      React.createElement('p', null, message as string),
      React.createElement(
        'button',
        { type: 'button', onClick: onRetry as () => void },
        retryLabel as string,
      ),
    ),
  InstallingView: ({ label }: Record<string, unknown>) =>
    React.createElement('p', null, label as string),
}));

// ---------------------------------------------------------------------------
// Import the component AFTER all mocks are set up.
// The file assigns to globalThis.webViewComponent as its side effect.
// ---------------------------------------------------------------------------
// eslint-disable-next-line import/order
import './resource-text-panel.web-view';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal WebViewProps for zero-state renders (no resources, with projectId). */
function makeProps(overrides: Partial<WebViewProps> = {}): WebViewProps {
  return {
    projectId: 'test-project-id',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        if (key === 'resourceType') return [defaultValue, vi.fn()];
        return [defaultValue, vi.fn()];
      },
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
    ]),
    ...overrides,
  } as unknown as WebViewProps;
}

/** Reads the component set by the web view file's side effect. */
function getResourceTextPanel(): React.ComponentType<WebViewProps> {
  return (globalThis as Record<string, unknown>)
    .webViewComponent as React.ComponentType<WebViewProps>;
}

/** Renders the component with zero-state (empty filteredResources list). */
function renderZeroState(resourceType: 'ScriptureResource' | 'Commentary' = 'ScriptureResource') {
  // effectiveResources is defined (not undefined) so it won't spinner, but items is empty
  mockUseEffectiveResourceReferenceList.mockReturnValue([
    { dataVersion: '1.0.0', items: [] },
    false,
  ]);

  const props = makeProps({
    useWebViewState: vi.fn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        if (key === 'resourceType') return [resourceType, vi.fn()];
        return [defaultValue, vi.fn()];
      },
    ),
  });

  const ResourceTextPanel = getResourceTextPanel();
  return render(<ResourceTextPanel {...props} />);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ResourceTextPanel — More info disclosure toggle', () => {
  it('shows the "More info" button when resourceType is ScriptureResource and no resources configured', () => {
    renderZeroState('ScriptureResource');
    expect(screen.getByRole('button', { name: 'More info' })).toBeInTheDocument();
  });

  it('does NOT show the "More info" button when resourceType is Commentary and no resources configured', () => {
    renderZeroState('Commentary');
    expect(screen.queryByRole('button', { name: 'More info' })).not.toBeInTheDocument();
  });

  it('"More info" button starts with aria-expanded={false}', () => {
    renderZeroState('ScriptureResource');
    const btn = screen.getByRole('button', { name: 'More info' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking "More info" expands the body and sets aria-expanded={true}', () => {
    renderZeroState('ScriptureResource');
    const btn = screen.getByRole('button', { name: 'More info' });

    // Body hidden initially
    expect(screen.queryByText('Bible texts detail here.')).not.toBeInTheDocument();

    fireEvent.click(btn);

    // Body now visible; button label changed to "Less info"
    expect(screen.getByText('Bible texts detail here.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Less info' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('clicking "Less info" collapses the body and sets aria-expanded={false}', () => {
    renderZeroState('ScriptureResource');

    // Expand first
    fireEvent.click(screen.getByRole('button', { name: 'More info' }));
    expect(screen.getByText('Bible texts detail here.')).toBeInTheDocument();

    // Collapse
    fireEvent.click(screen.getByRole('button', { name: 'Less info' }));
    expect(screen.queryByText('Bible texts detail here.')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More info' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});

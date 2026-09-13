// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import { newPlatformError } from 'platform-bible-utils';

// ---------------------------------------------------------------------------
// jsdom harness — cmdk (inside ProjectSelector's popover) and Radix need these
// ---------------------------------------------------------------------------

class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
  // jsdom does no layout, so getBoundingClientRect reports a 0-width rect. ProjectSelector's
  // auto-narrow observer treats that as a narrow trigger; give the combobox a production-like
  // width so the default (wide) rendering is what these tests exercise.
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  // Prototype assignment needs an anonymous function expression to preserve `this`.
  // eslint-disable-next-line func-names
  Element.prototype.getBoundingClientRect = function () {
    const rect = originalGetBoundingClientRect.call(this);
    if (this instanceof HTMLElement && this.getAttribute('role') === 'combobox') {
      return { ...rect, width: 200, height: 32 };
    }
    return rect;
  };
});

// ---------------------------------------------------------------------------
// Hoisted mocks — must precede any import that touches the web view
// ---------------------------------------------------------------------------

const { mockRecentProjects } = vi.hoisted(() => ({
  mockRecentProjects: { value: undefined as unknown },
}));

vi.mock('@papi/frontend', () => {
  const pdp = {
    getSetting: vi.fn(async (key: string) => {
      if (key === 'platform.name') return 'P1';
      if (key === 'platform.fullName') return 'Project One';
      if (key === 'platform.language') return 'en';
      if (key === 'platformScripture.booksPresent') return '';
      return undefined;
    }),
  };
  return {
    default: {
      menuData: { dataProviderName: 'platform.menuData' },
      projectDataProviders: { get: vi.fn(async () => pdp) },
      projectLookup: { getMetadataForAllProjects: vi.fn(async () => []) },
      commands: { sendCommand: vi.fn(async () => undefined) },
      window: { setFocus: vi.fn(async () => undefined) },
    },
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())) },
  };
});

vi.mock('@papi/frontend/react', () => ({
  // Echo each requested key back as its own value, matching useLocalizedStrings' pre-resolution
  // behavior — every entry is always a string.
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
  useProjectDataProvider: vi.fn(() => undefined),
  useData: vi.fn(() => ({
    RecentProjects: () => [mockRecentProjects.value, vi.fn(), false],
    WebViewMenu: (_selector: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), false],
  })),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    // The real hook subscribes to a PAPI network event; the web view's only use of it is opening
    // the settings dialog, which these tests do not exercise.
    useEvent: vi.fn(),
    // Resolve every async source to its caller-supplied default so renders are synchronous.
    usePromise: (_fn: unknown, defaultValue: unknown) => [defaultValue, false],
  };
});

vi.mock('./hooks/use-checklist', () => ({
  useChecklistService: vi.fn(() => ({ service: undefined })),
}));

vi.mock('./hooks/use-open-project-tabs', () => ({
  useOpenProjectTabs: vi.fn(() => []),
}));

// ---------------------------------------------------------------------------
// Import the web view AFTER the mocks. It assigns to global.webViewComponent.
// ---------------------------------------------------------------------------
// Must follow the vi.mock() calls so the side effect runs against the mock boundaries above.
// Vitest's hoisting keeps the execution order correct regardless of static position.
// eslint-disable-next-line import/first
import './checklist.web-view';

function getChecklistWebView(): ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

function makeProps(): WebViewProps {
  // The literal supplies only the props the web view reads; the double cast avoids restating
  // every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectId: 'project-1',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState); a mock cannot express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_key: string, defaultValue: any): [any, (val: any) => void] => [defaultValue, vi.fn()],
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
      undefined,
    ]),
  } as unknown as WebViewProps;
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('ChecklistWebView recently-opened-projects wiring', () => {
  it('renders when the recently-opened-projects subscription resolves to an id list', async () => {
    mockRecentProjects.value = ['project-2', 'project-1'];

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await waitFor(() => {
      expect(screen.getByTestId('checklist-primary-project-trigger')).toBeInTheDocument();
    });
  });

  it('renders when the recently-opened-projects subscription yields a PlatformError', async () => {
    // The data provider is optional to the checklist: recency only orders the `lastUsed`
    // grouping. An unavailable or failing provider must degrade to "no recency", never take the
    // whole web view down.
    mockRecentProjects.value = newPlatformError('recently-opened-projects unavailable');

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await waitFor(() => {
      expect(screen.getByTestId('checklist-primary-project-trigger')).toBeInTheDocument();
    });
  });
});

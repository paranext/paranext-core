// @vitest-environment jsdom

import '@testing-library/jest-dom';
import type { WebViewProps } from '@papi/core';
import type { ComponentType } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — only the process boundaries the web view reaches through: PAPI, and the two local
// hooks that wrap PAPI subscriptions. The toolbar, both pickers, and the whole rendering path
// stay real, so these tests assert what the shipped component offers the user.
// ---------------------------------------------------------------------------

const PROJECTS: Record<string, { shortName: string; fullName: string }> = {
  WEB: { shortName: 'WEB', fullName: 'World English Bible' },
  KJV: { shortName: 'KJV', fullName: 'King James Version' },
};

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: {
      getMetadataForAllProjects: async () => Object.keys(PROJECTS).map((id) => ({ id })),
    },
    projectDataProviders: {
      get: async (_interfaceName: string, id: string) => ({
        getSetting: async (key: string) => {
          if (key === 'platform.name') return PROJECTS[id]?.shortName;
          if (key === 'platform.fullName') return PROJECTS[id]?.fullName;
          return undefined;
        },
      }),
    },
    menuData: { dataProviderName: 'platform.menuData' },
    commands: { sendCommand: vi.fn(async () => undefined) },
    window: { setFocus: vi.fn(async () => undefined) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  // `useEvent` subscribes to whatever this returns, so it has to be a real subscriber that hands
  // back an unsubscriber.
  network: { getNetworkEvent: () => () => () => {} },
}));

vi.mock('@papi/frontend/react', () => ({
  // Map every localized key to the key itself so assertions never depend on shipped wording.
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
  useProjectDataProvider: () => undefined,
  useData: () => ({
    // While the real subscription is pending it yields the caller's default, which is the state
    // these tests render in.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebViewMenu: (_selector: unknown, defaultValue: any) => [defaultValue, false],
  }),
}));

vi.mock('./hooks/use-checklist', () => ({
  useChecklistService: () => ({ service: undefined }),
}));

vi.mock('./hooks/use-open-project-tabs', () => ({
  useOpenProjectTabs: () => [],
}));

// jsdom implements none of ResizeObserver, scrollIntoView or scrollTo, and the picker's render path
// touches all three: cmdk wires a ResizeObserver, Radix's PopoverContent calls scrollTo when it
// focuses children, and the picker scrolls the selected row into view when it opens.
beforeAll(() => {
  // `vi.stubGlobal` accepts `unknown`, so these no-op stubs need no type assertion to stand in for
  // the real constructors — only `observe`/`disconnect` are ever reached from this render path.
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
});

// The web view file assigns to `global.webViewComponent` as its side effect, so it has to be
// imported after the mocks above. Vitest hoists `vi.mock` regardless of this import's position.
// eslint-disable-next-line import/first
import './checklist.web-view';

/** Reads the component the web view file's side effect installs. */
function getChecklistWebView() {
  // `globalThis` is a special interface; cast to a record to read a property added at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

/** Minimal `WebViewProps`: per-instance state slots that just echo their defaults. */
function makeProps(): WebViewProps {
  // The literal supplies only the props this component reads; the double cast avoids satisfying
  // every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectId: 'WEB',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but a mock cannot express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_key: string, defaultValue: any): [any, (value: any) => void] => [defaultValue, vi.fn()],
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
      0,
      vi.fn(),
    ]),
  } as unknown as WebViewProps;
}

/** Radix popovers and cmdk need pointer-event sequences jsdom does not synthesize on its own. */
const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Grouping axes this web view's project data cannot support, so neither picker may offer them. */
const UNSUPPORTED_GROUPINGS = ['Language', 'Last used', 'Versification', 'Type'];

/** Grouping options the open view-options menu offers, in order, by visible label. */
const groupingChoices = () =>
  screen.getAllByRole('menuitemradio').map((item) => item.textContent?.trim());

/** Opens the picker inside `testId` and then its view-options menu. */
async function openGroupingMenu(user: ReturnType<typeof setupUser>, testId: string) {
  const picker = await screen.findByTestId(testId);
  await user.click(within(picker).getByRole('combobox'));
  await user.click(await screen.findByLabelText('View options'));
}

// Neither picker's project data carries language, type or last-used fields, so those groupings
// would file every row under one "Unknown …" heading — a menu whose every option makes the list
// worse. Asserting only the two offered options would still pass with the restriction deleted, so
// the absence of the unsupported axes is the load-bearing half of these tests.
describe('ChecklistWebView project pickers', () => {
  it('offers only open-tabs grouping in the primary-project picker', async () => {
    const user = setupUser();
    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await openGroupingMenu(user, 'checklist-primary-project-trigger');

    await waitFor(() => expect(groupingChoices()).toEqual(['None', 'Open tabs']));
    UNSUPPORTED_GROUPINGS.forEach((label) => {
      expect(screen.queryByRole('menuitemradio', { name: label })).not.toBeInTheDocument();
    });
  });

  it('offers only open-tabs grouping in the comparative-texts picker', async () => {
    const user = setupUser();
    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await openGroupingMenu(user, 'checklist-comparative-texts-trigger');

    await waitFor(() => expect(groupingChoices()).toEqual(['None', 'Open tabs']));
    UNSUPPORTED_GROUPINGS.forEach((label) => {
      expect(screen.queryByRole('menuitemradio', { name: label })).not.toBeInTheDocument();
    });
  });
});

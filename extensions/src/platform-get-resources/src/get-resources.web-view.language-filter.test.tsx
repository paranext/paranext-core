// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import {
  renderGetResourcesWebView,
  serveCatalogHoldingFlagRefresh,
} from './get-resources.web-view.test-utils';

const { mockSendCommand } = vi.hoisted(() => ({ mockSendCommand: vi.fn() }));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: (...args: unknown[]) => mockSendCommand(...args) },
    notifications: { send: vi.fn() },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}, false],
  useDataProvider: () => ({ installDblResource: vi.fn(), uninstallDblResource: vi.fn() }),
}));

// Must follow the vi.mock calls; the file assigns globalThis.webViewComponent as a side effect.
// eslint-disable-next-line import/first
import './get-resources.web-view';

/**
 * A catalog with one language the user has installed a resource in and one they have not, plus a
 * commentary in the installed language that only the type filter can hide.
 */
const CATALOG = {
  status: 'available',
  resources: [
    {
      dblEntryUid: 'uid-english',
      displayName: 'WEB',
      fullName: 'World English Bible',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 1000,
      installed: true,
      updateAvailable: false,
      projectId: 'proj-english',
    },
    {
      dblEntryUid: 'uid-french',
      displayName: 'BFC',
      fullName: 'Bible en français courant',
      bestLanguageName: 'French',
      type: 'ScriptureResource',
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: '',
    },
    {
      dblEntryUid: 'uid-english-commentary',
      displayName: 'MHC',
      fullName: 'Matthew Henry Commentary',
      bestLanguageName: 'English',
      type: 'CommentaryResource',
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: '',
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  mockSendCommand.mockImplementation(serveCatalogHoldingFlagRefresh(async () => CATALOG));
});

describe('Get Resources filters', () => {
  it('opens with no language filter, listing languages with and without installed resources', async () => {
    renderGetResourcesWebView();

    expect(await screen.findByText('World English Bible')).toBeInTheDocument();
    expect(screen.getByText('Bible en français courant')).toBeInTheDocument();
    // No localized strings are served, so the filter's "Any" placeholder renders as its key.
    expect(screen.getByText('%resources_any_language%')).toBeInTheDocument();
  });

  it('opens scoped to Scripture resources', async () => {
    renderGetResourcesWebView();

    expect(await screen.findByText('World English Bible')).toBeInTheDocument();
    expect(screen.queryByText('Matthew Henry Commentary')).not.toBeInTheDocument();
  });

  it('narrows the list to a language saved in web view state', async () => {
    renderGetResourcesWebView({ languageFilter: ['French'] });

    expect(await screen.findByText('Bible en français courant')).toBeInTheDocument();
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
    expect(screen.queryByText('%resources_any_language%')).not.toBeInTheDocument();
  });
});

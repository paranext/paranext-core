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

/**
 * A catalog with one language the user has installed a resource in and one they have not, plus a
 * resource of each other type the type filter decides on: a commentary and a source language text
 * it opens on, and an XML resource it does not offer.
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
    {
      dblEntryUid: 'uid-greek-source',
      displayName: 'SBLGNT',
      fullName: 'SBL Greek New Testament',
      bestLanguageName: 'Greek',
      type: 'SourceLanguageResource',
      size: 1000,
      installed: false,
      updateAvailable: false,
      projectId: '',
    },
    {
      dblEntryUid: 'uid-english-xml',
      displayName: 'XMLR',
      fullName: 'English XML Resource',
      bestLanguageName: 'English',
      type: 'XmlResource',
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

  it('opens scoped to Scripture, commentary and source language resources', async () => {
    renderGetResourcesWebView();

    expect(await screen.findByText('World English Bible')).toBeInTheDocument();
    expect(screen.getByText('Matthew Henry Commentary')).toBeInTheDocument();
    expect(screen.getByText('SBL Greek New Testament')).toBeInTheDocument();
    expect(screen.queryByText('English XML Resource')).not.toBeInTheDocument();
    // The types are selected, rather than the type filter standing on its "Any" placeholder. The
    // language filter's placeholder shows that a placeholder would render here as its key.
    expect(screen.getByText('%resources_any_language%')).toBeInTheDocument();
    expect(screen.queryByText('%resources_any_type%')).not.toBeInTheDocument();
  });

  it('narrows the list to a language saved in web view state', async () => {
    renderGetResourcesWebView({ languageFilter: ['French'] });

    expect(await screen.findByText('Bible en français courant')).toBeInTheDocument();
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
    expect(screen.queryByText('%resources_any_language%')).not.toBeInTheDocument();
  });
});

// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';

const mocks = vi.hoisted(() => ({
  sendCommand: vi.fn(async (): Promise<unknown> => undefined),
  notify: vi.fn(async () => 'notification-1'),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mocks.sendCommand },
    notifications: { send: mocks.notify },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
}));

vi.mock('./use-local-projects.hook', () => ({
  useLocalProjects: vi.fn(() => ({ localProjectsInfo: [], isLoadingLocalProjects: false })),
}));

/* Stubbed so these tests drive New Tab's open handler directly rather than Home's list. */
vi.mock('./home.component', () => ({
  HOME_STRING_KEYS: [],
  Home: ({ onOpenProject }: { onOpenProject?: (id: string, isPublished: boolean) => unknown }) => (
    <button type="button" onClick={() => onOpenProject?.('project-1', false)}>
      open project-1
    </button>
  ),
}));

async function renderNewTab() {
  await import('./new-tab.web-view');
  // The web view registers itself on `globalThis` rather than exporting
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const NewTab = globalThis.webViewComponent as ComponentType<{ id: string }>;
  render(<NewTab id="new-tab-1" />);
}

/*
 * Home ignores a failed open beyond letting the item be opened again, so New Tab reports its own.
 * Before it did, a failed open left New Tab on its loading screen with nothing said or logged.
 */
describe('New Tab opening a project', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tells the user and leaves the loading screen when the open fails', async () => {
    mocks.sendCommand.mockRejectedValueOnce(new Error('editor not loaded'));
    await renderNewTab();

    fireEvent.click(screen.getByRole('button', { name: 'open project-1' }));

    await waitFor(() =>
      expect(mocks.notify).toHaveBeenCalledWith(
        expect.objectContaining({ message: '%resources_couldNotOpen%' }),
      ),
    );
    expect(screen.getByRole('button', { name: 'open project-1' })).toBeInTheDocument();
  });

  it('stays on the loading screen, saying nothing, while a successful open replaces it', async () => {
    mocks.sendCommand.mockResolvedValueOnce('editor-1');
    await renderNewTab();

    fireEvent.click(screen.getByRole('button', { name: 'open project-1' }));

    await waitFor(() => expect(screen.getByText('%resources_loading%')).toBeInTheDocument());
    expect(mocks.notify).not.toHaveBeenCalled();
  });
});

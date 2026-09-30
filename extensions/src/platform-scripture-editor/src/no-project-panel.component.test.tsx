// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NoProjectPanel } from './no-project-panel.component';
import { useProjectPresence } from './use-project-presence.hook';

vi.mock('./use-project-presence.hook', () => ({ useProjectPresence: vi.fn() }));

const STRINGS = {
  '%webView_platformScriptureEditor_emptyState_noProject%': 'No project selected',
  '%webView_platformScriptureEditor_emptyState_noProjects_title%':
    "You don't have any projects of your own yet",
  '%webView_platformScriptureEditor_emptyState_noProjects_description%':
    'To get a project, set up your Paratext registration in your user profile, or ask your project administrator to add you to a project.',
};

beforeEach(() => {
  vi.mocked(useProjectPresence).mockReset().mockReturnValue('none');
});

describe('NoProjectPanel', () => {
  it('asks for project presence in Simple mode and shows the guidance when there are none', () => {
    render(
      <NoProjectPanel
        localizedStrings={STRINGS}
        isPowerMode={false}
        isInterfaceModeLoading={false}
      />,
    );

    expect(useProjectPresence).toHaveBeenLastCalledWith({ enabled: true });
    expect(
      screen.getByRole('heading', { name: "You don't have any projects of your own yet" }),
    ).toBeInTheDocument();
  });

  it.each(['unknown', 'some'] as const)(
    'shows only "No project selected" in Simple mode when presence is %s',
    (presence) => {
      vi.mocked(useProjectPresence).mockReturnValue(presence);

      render(
        <NoProjectPanel
          localizedStrings={STRINGS}
          isPowerMode={false}
          isInterfaceModeLoading={false}
        />,
      );

      expect(screen.getByText('No project selected')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    },
  );

  it('does not ask in Power mode, which never shows the answer', () => {
    // What a disabled hook answers; the hook's own tests pin that.
    vi.mocked(useProjectPresence).mockReturnValue('unknown');
    render(
      <NoProjectPanel localizedStrings={STRINGS} isPowerMode isInterfaceModeLoading={false} />,
    );

    expect(useProjectPresence).toHaveBeenLastCalledWith({ enabled: false });
    expect(screen.getByText('No project selected')).toBeInTheDocument();
  });

  it('does not ask while the interface mode is still loading', () => {
    render(
      <NoProjectPanel localizedStrings={STRINGS} isPowerMode={false} isInterfaceModeLoading />,
    );

    expect(useProjectPresence).toHaveBeenLastCalledWith({ enabled: false });
  });
});

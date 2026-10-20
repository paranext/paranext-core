// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NoProjectPanel } from './no-project-panel.component';
import { useProjectPresence } from './use-project-presence.hook';
import { useRegistrationValidity } from './use-registration-validity.hook';

vi.mock('./use-project-presence.hook', () => ({ useProjectPresence: vi.fn() }));
vi.mock('./use-registration-validity.hook', () => ({ useRegistrationValidity: vi.fn() }));

const UNREGISTERED_DESCRIPTION =
  'To get a project, set up your Paratext registration in your user profile, or ask your project administrator to add you to a project.';
const STRINGS = {
  '%webView_platformScriptureEditor_emptyState_noProject%': 'No project selected',
  '%webView_platformScriptureEditor_emptyState_noProjects_title%':
    "You don't have any projects of your own yet",
  '%webView_platformScriptureEditor_emptyState_noProjects_description%': UNREGISTERED_DESCRIPTION,
  '%webView_platformScriptureEditor_emptyState_noProjects_description_registered%':
    'It is not yet possible to create a project in {%product_name%}. Either someone needs to share a project with you, or you need to create a project in Paratext 9.',
  '%product_name%': 'Paratext 10',
};

function renderSimpleMode() {
  render(
    <NoProjectPanel
      localizedStrings={STRINGS}
      isPowerMode={false}
      isInterfaceModeLoading={false}
    />,
  );
}

beforeEach(() => {
  vi.mocked(useProjectPresence).mockReset().mockReturnValue('none');
  vi.mocked(useRegistrationValidity).mockReset().mockReturnValue('invalid');
});

describe('NoProjectPanel', () => {
  it('asks for project presence in Simple mode and shows the guidance when there are none', () => {
    renderSimpleMode();

    expect(useProjectPresence).toHaveBeenLastCalledWith({ enabled: true });
    expect(
      screen.getByRole('heading', { name: "You don't have any projects of your own yet" }),
    ).toBeInTheDocument();
    expect(screen.getByText(UNREGISTERED_DESCRIPTION)).toBeInTheDocument();
  });

  it('tells a registered user with no projects that they cannot create one here yet', () => {
    vi.mocked(useRegistrationValidity).mockReturnValue('valid');

    renderSimpleMode();

    expect(
      screen.getByText(
        'It is not yet possible to create a project in Paratext 10. Either someone needs to share a project with you, or you need to create a project in Paratext 9.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(UNREGISTERED_DESCRIPTION)).not.toBeInTheDocument();
  });

  it('keeps the registration text when registration cannot be determined', () => {
    vi.mocked(useRegistrationValidity).mockReturnValue('unknown');

    renderSimpleMode();

    expect(screen.getByText(UNREGISTERED_DESCRIPTION)).toBeInTheDocument();
  });

  it('holds the guidance until the registration answer is in', () => {
    vi.mocked(useRegistrationValidity).mockReturnValue(undefined);

    renderSimpleMode();

    expect(screen.getByText('No project selected')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it.each(['unknown', 'some'] as const)(
    'asks about registration only once the user is known to have no projects, not when %s',
    (presence) => {
      vi.mocked(useProjectPresence).mockReturnValue(presence);

      renderSimpleMode();

      expect(useRegistrationValidity).toHaveBeenLastCalledWith({ enabled: false });
    },
  );

  it('asks about registration when the user has no projects', () => {
    renderSimpleMode();

    expect(useRegistrationValidity).toHaveBeenLastCalledWith({ enabled: true });
  });

  it.each(['unknown', 'some'] as const)(
    'shows only "No project selected" in Simple mode when presence is %s',
    (presence) => {
      vi.mocked(useProjectPresence).mockReturnValue(presence);

      renderSimpleMode();

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

// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NoProjectView } from './no-project-view.component';

const STRINGS = {
  '%webView_platformScriptureEditor_emptyState_noProject%': 'No project selected',
  '%webView_platformScriptureEditor_emptyState_noProjects_title%':
    "You don't have any projects of your own yet",
  '%webView_platformScriptureEditor_emptyState_noProjects_description%':
    'To get a project, set up your Paratext registration in your user profile, or ask your project administrator to add you to a project.',
};

describe('NoProjectView', () => {
  it('names the next steps in a heading and description when the user has no projects', () => {
    render(<NoProjectView localizedStrings={STRINGS} presence="none" />);

    expect(
      screen.getByRole('heading', { name: "You don't have any projects of your own yet" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'To get a project, set up your Paratext registration in your user profile, or ask your project administrator to add you to a project.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('No project selected')).not.toBeInTheDocument();
  });

  it.each(['unknown', 'some'] as const)(
    'shows only "No project selected", outside the live region, when presence is %s',
    (presence) => {
      render(<NoProjectView localizedStrings={STRINGS} presence={presence} />);

      expect(screen.getByText('No project selected')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      // Outside the live region: the editor passes through this state on every Simple launch before
      // a project opens, and announcing it would tell a user with projects that none is selected.
      expect(screen.getByRole('status')).toBeEmptyDOMElement();
    },
  );

  it('keeps one status region mounted as the content flips, so the change is announced', () => {
    const { rerender } = render(<NoProjectView localizedStrings={STRINGS} presence="unknown" />);
    const regionBefore = screen.getByRole('status');

    rerender(<NoProjectView localizedStrings={STRINGS} presence="none" />);

    const regions = screen.getAllByRole('status');
    // Exactly one live region: a nested one would be announced twice or not at all.
    expect(regions).toHaveLength(1);
    expect(regions[0]).toBe(regionBefore);
    expect(regions[0]).toHaveTextContent("You don't have any projects of your own yet");
  });

  it('falls back to the key when a string has not loaded', () => {
    render(<NoProjectView presence="none" />);

    expect(
      screen.getByText('%webView_platformScriptureEditor_emptyState_noProjects_title%'),
    ).toBeInTheDocument();
  });
});

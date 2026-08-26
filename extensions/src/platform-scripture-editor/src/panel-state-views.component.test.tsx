// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExpandableInfo } from './panel-state-views.component';

afterEach(cleanup);

function renderInfo() {
  return render(
    <ExpandableInfo
      moreLabel="More info"
      lessLabel="Less info"
      body="The explanatory body text."
    />,
  );
}

describe('ExpandableInfo', () => {
  it('starts collapsed, showing the toggle but not the body', () => {
    renderInfo();
    const toggle = screen.getByRole('button', { name: 'More info' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // `hidden` keeps the body out of the accessibility tree, so a screen reader announces the
    // collapsed state rather than reading text the user cannot see.
    expect(screen.queryByText('The explanatory body text.')).not.toBeVisible();
  });

  it('reveals the body and swaps to the collapse label when toggled', () => {
    renderInfo();
    fireEvent.click(screen.getByRole('button', { name: 'More info' }));

    const toggle = screen.getByRole('button', { name: 'Less info' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('The explanatory body text.')).toBeVisible();
  });

  it('collapses again on a second toggle', () => {
    renderInfo();
    fireEvent.click(screen.getByRole('button', { name: 'More info' }));
    fireEvent.click(screen.getByRole('button', { name: 'Less info' }));

    expect(screen.getByRole('button', { name: 'More info' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByText('The explanatory body text.')).not.toBeVisible();
  });

  it('points aria-controls at the body it reveals', () => {
    renderInfo();
    const toggle = screen.getByRole('button', { name: 'More info' });
    const controlledId = toggle.getAttribute('aria-controls');
    expect(controlledId).toBeTruthy();
    // Without this wiring the toggle announces an expanded state for a region assistive tech
    // cannot locate.
    expect(document.getElementById(controlledId ?? '')).toHaveTextContent(
      'The explanatory body text.',
    );
  });
});

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

  // The Model Text panel's body is several paragraphs, and a `<p>` cannot contain `<p>`s: React
  // flags the nesting as invalid DOM, and the markup is not valid HTML.
  it('keeps a multi-paragraph body inside the element the toggle controls', () => {
    render(
      <ExpandableInfo
        moreLabel="More info"
        lessLabel="Less info"
        body={
          <>
            <p>First paragraph.</p>
            <p>Second paragraph.</p>
          </>
        }
      />,
    );
    const toggle = screen.getByRole('button', { name: 'More info' });
    const body = document.getElementById(toggle.getAttribute('aria-controls') ?? '');

    expect(body?.tagName).not.toBe('P');
    expect(body).toContainElement(screen.getByText('Second paragraph.'));
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

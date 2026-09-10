// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  RESOURCE_TEXT_UNAVAILABLE_TEST_ID,
  ResourceTextUnavailable,
} from './resource-text-unavailable.component';

const MESSAGE = 'This text could not be loaded.';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ResourceTextUnavailable', () => {
  it('renders the message it is given in a live region', () => {
    render(<ResourceTextUnavailable message={MESSAGE} />);

    expect(screen.getByRole('status')).toHaveTextContent(MESSAGE);
  });

  it('gives the focus target an accessible name', () => {
    // A role-less `div` maps to `generic`, which does not support name-from-content — a focused
    // wrapper without a name is announced as "group", or as nothing at all.
    expect(
      render(<ResourceTextUnavailable message={MESSAGE} />).getByTestId(
        RESOURCE_TEXT_UNAVAILABLE_TEST_ID,
      ),
    ).toHaveAccessibleName(MESSAGE);
  });

  it('takes focus when the hidden editor had it', () => {
    // This takes the content area from the editor, so the element the reader was in loses layout and
    // focus falls to the body. jsdom reports `document.hasFocus()` as false, which is the "focus is
    // elsewhere" branch — so the focused case has to say so explicitly.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    render(<ResourceTextUnavailable message={MESSAGE} />);

    expect(screen.getByTestId(RESOURCE_TEXT_UNAVAILABLE_TEST_ID)).toHaveFocus();
  });

  it('re-announces when the reference changes while the failure stays on screen', () => {
    // A project that fails to open keeps failing, so this message survives navigation. Without a
    // re-announcement the reader gets no confirmation that their navigation applied at all.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { rerender } = render(
      <ResourceTextUnavailable message={MESSAGE} announcementKey="ABC:GEN:1" />,
    );
    const firstRegion = screen.getByTestId(RESOURCE_TEXT_UNAVAILABLE_TEST_ID);

    rerender(<ResourceTextUnavailable message={MESSAGE} announcementKey="ABC:GEN:2" />);
    const secondRegion = screen.getByTestId(RESOURCE_TEXT_UNAVAILABLE_TEST_ID);

    // Node identity is the assertion that matters: the message is byte-identical, so a region that
    // SURVIVES the change announces nothing, and asserting focus alone would pass either way.
    expect(secondRegion).not.toBe(firstRegion);
    expect(secondRegion).toHaveFocus();
  });
});

// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  RESOURCE_BLANK_CHAPTER_TEST_ID,
  ResourceBlankChapter,
} from './resource-blank-chapter.component';

const MESSAGE = 'This chapter is empty in this resource.';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ResourceBlankChapter', () => {
  it('renders the message it is given in a live region', () => {
    render(<ResourceBlankChapter message={MESSAGE} />);

    expect(screen.getByRole('status')).toHaveTextContent(MESSAGE);
  });

  it('gives the focus target an accessible name', () => {
    // A role-less `div` maps to `generic`, which does not support name-from-content — a focused
    // wrapper without a name is announced as "group", or as nothing at all.
    expect(
      render(<ResourceBlankChapter message={MESSAGE} />).getByTestId(
        RESOURCE_BLANK_CHAPTER_TEST_ID,
      ),
    ).toHaveAccessibleName(MESSAGE);
  });

  it('takes focus when the unmounted editor had it', () => {
    // This REPLACES the editor, so the element the reader was in is destroyed with it. jsdom reports
    // `document.hasFocus()` as false, which is the "focus is elsewhere" branch — so the focused case
    // has to say so explicitly rather than relying on the default.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    render(<ResourceBlankChapter message={MESSAGE} />);

    expect(screen.getByTestId(RESOURCE_BLANK_CHAPTER_TEST_ID)).toHaveFocus();
  });

  it('re-announces when the chapter changes while the message stays on screen', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { rerender } = render(
      <ResourceBlankChapter message={MESSAGE} announcementKey="ABC:GEN:1" />,
    );
    const firstRegion = screen.getByTestId(RESOURCE_BLANK_CHAPTER_TEST_ID);

    // Stepping to the next chapter, which is also blank.
    rerender(<ResourceBlankChapter message={MESSAGE} announcementKey="ABC:GEN:2" />);
    const secondRegion = screen.getByTestId(RESOURCE_BLANK_CHAPTER_TEST_ID);

    // Node identity is the assertion that matters: the message is byte-identical, so a region that
    // SURVIVES the change announces nothing, and asserting focus alone would pass either way.
    expect(secondRegion).not.toBe(firstRegion);
    expect(secondRegion).toHaveFocus();
  });
});

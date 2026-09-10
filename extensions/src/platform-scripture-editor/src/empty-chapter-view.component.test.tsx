// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EmptyChapterView } from './empty-chapter-view.component';

const STRINGS = {
  '%webView_platformScriptureEditor_emptyChapter_message%': 'This chapter is empty.',
  '%webView_platformScriptureEditor_emptyChapter_messageResource%':
    'This chapter is empty in this resource.',
  '%webView_platformScriptureEditor_emptyChapter_addChapterNumberButton%': 'Add chapter number',
  '%webView_platformScriptureEditor_emptyChapter_protectedTooltip%':
    'Structure is locked. Chapter and verse markers cannot be added.',
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('EmptyChapterView', () => {
  it('renders the message and an enabled button on an editable chapter', () => {
    render(
      <EmptyChapterView
        localizedStrings={STRINGS}
        isStructureProtected={false}
        showButton
        onAddChapterNumber={vi.fn()}
      />,
    );

    expect(screen.getByText('This chapter is empty.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add chapter number' })).toBeEnabled();
  });

  it('names the resource in the message when the text is a published resource', () => {
    render(
      <EmptyChapterView
        localizedStrings={STRINGS}
        isStructureProtected={false}
        isResource
        showButton={false}
        onAddChapterNumber={vi.fn()}
      />,
    );

    // "This chapter is empty" reads as an invitation to fill it, which is wrong for a text the
    // reader cannot edit.
    expect(screen.getByText('This chapter is empty in this resource.')).toBeInTheDocument();
    expect(screen.queryByText('This chapter is empty.')).not.toBeInTheDocument();
  });

  it('withholds the button entirely when showButton is false', () => {
    render(
      <EmptyChapterView
        localizedStrings={STRINGS}
        isStructureProtected={false}
        showButton={false}
        onAddChapterNumber={vi.fn()}
      />,
    );

    // Read-only projects, `chapterNum: 0` front matter, and the transient versification-loading
    // window all land here — the message has to stand alone rather than offering a dead action.
    expect(screen.queryByRole('button', { name: 'Add chapter number' })).not.toBeInTheDocument();
    expect(screen.getByText('This chapter is empty.')).toBeInTheDocument();
  });

  it('invokes onAddChapterNumber when the button is clicked', () => {
    const onAddChapterNumber = vi.fn();
    render(
      <EmptyChapterView
        localizedStrings={STRINGS}
        isStructureProtected={false}
        showButton
        onAddChapterNumber={onAddChapterNumber}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add chapter number' }));

    expect(onAddChapterNumber).toHaveBeenCalledTimes(1);
  });

  describe('structure protection', () => {
    it('disables the button and explains why on the wrapper', () => {
      render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected
          showButton
          onAddChapterNumber={vi.fn()}
        />,
      );

      // The action stays visible so the message is never left promising something unavailable.
      expect(screen.getByRole('button', { name: 'Add chapter number' })).toBeDisabled();
      expect(
        screen.getByLabelText('Structure is locked. Chapter and verse markers cannot be added.'),
      ).toBeInTheDocument();
    });

    it('does not invoke onAddChapterNumber when the focusable disabled wrapper is clicked', () => {
      const onAddChapterNumber = vi.fn();
      render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected
          showButton
          onAddChapterNumber={onAddChapterNumber}
        />,
      );

      // Clicking the DISABLED BUTTON is not the interesting case: jsdom drops those events whatever
      // the wiring, so such a test passes regardless. The reachable target is
      // `DisabledTooltipWrapper`, a focusable `role="group"` element precisely so the tooltip stays
      // available while disabled — a handler hoisted onto it would fire for real.
      fireEvent.click(
        screen.getByRole('group', {
          name: 'Structure is locked. Chapter and verse markers cannot be added.',
        }),
      );

      expect(onAddChapterNumber).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('announces the message region', () => {
      render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
        />,
      );

      // The editing surface this stands in for is hidden with `display: none`, which takes it out
      // of the accessibility tree — so without a live region the swap is entirely silent.
      expect(screen.getByRole('status')).toHaveTextContent('This chapter is empty.');
    });

    it('takes focus when the hidden editor had it', () => {
      // jsdom reports `document.hasFocus()` as false, which is the "focus is elsewhere" branch — so
      // the focused case has to say so explicitly rather than relying on the default.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
        />,
      );

      // Hiding the editor subtree drops it from the tab order with focus inside it, so focus would
      // otherwise sit on `body` with no way back into the content.
      expect(screen.getByRole('status')).toHaveFocus();
    });

    it('leaves focus alone when it is outside this document', () => {
      // Navigating to a blank chapter from the toolbar's book/chapter control must not yank focus
      // out of the control the user is still operating — that control lives outside this iframe, so
      // this document does not have focus.
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
        />,
      );

      expect(screen.getByRole('status')).not.toHaveFocus();
    });

    it('re-announces when announcementKey names a different blank chapter', () => {
      // No string names the chapter, so GEN 1 -> GEN 2 with both blank would otherwise leave a
      // mounted region with byte-identical text: `aria-live` sees no change and the second chapter
      // is silent. The key is what remounts the region and repairs focus for it.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      const { rerender } = render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
          announcementKey="projA:GEN 1"
        />,
      );
      const firstRegion = screen.getByRole('status');
      expect(firstRegion).toHaveFocus();

      rerender(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
          announcementKey="projA:GEN 2"
        />,
      );

      // A NEW region in the DOM is what gives the live region something to announce, and focus has
      // been repaired into it rather than left on the body.
      const secondRegion = screen.getByRole('status');
      expect(secondRegion).not.toBe(firstRegion);
      expect(secondRegion).toHaveFocus();
    });

    it('re-keys the region without taking focus off the control the user is still in', () => {
      // The real path to a second blank chapter is the toolbar's `BookChapterControl`, which the web
      // view renders in its OWN document and which KEEPS focus across the navigation. The focus
      // repair declines by design in that case, so the remounted region is the whole announcement.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      const chapterControl = document.createElement('button');
      document.body.appendChild(chapterControl);

      const { rerender } = render(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
          announcementKey="projA:GEN 1"
        />,
      );
      const firstRegion = screen.getByRole('status');
      chapterControl.focus();

      rerender(
        <EmptyChapterView
          localizedStrings={STRINGS}
          isStructureProtected={false}
          showButton
          onAddChapterNumber={vi.fn()}
          announcementKey="projA:GEN 2"
        />,
      );

      const secondRegion = screen.getByRole('status');
      expect(secondRegion).not.toBe(firstRegion);
      expect(chapterControl).toHaveFocus();

      chapterControl.remove();
    });
  });

  it('falls back to the raw key when a string is missing', () => {
    render(
      <EmptyChapterView isStructureProtected={false} showButton onAddChapterNumber={vi.fn()} />,
    );

    expect(
      screen.getByText('%webView_platformScriptureEditor_emptyChapter_message%'),
    ).toBeInTheDocument();
  });
});

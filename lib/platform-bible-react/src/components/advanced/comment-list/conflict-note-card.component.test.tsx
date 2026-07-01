import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LegacyComment } from 'platform-bible-utils';
import { vi, beforeAll } from 'vitest';
import { ConflictNoteCard } from './conflict-note-card.component';
import {
  verseTextConflictComment,
  verseTextConflictReplacementSample,
} from './comment-sample.data';

// jsdom doesn't implement ResizeObserver, hasPointerCapture, or scrollIntoView.
// Radix Select uses all three when opening its dropdown. No-op stubs are sufficient
// because the tests don't assert layout or scroll behaviour.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

const localizedStrings = {
  '%conflict_note_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflict_note_choose_label%': 'Choose:',
  '%conflict_note_choose_aria_label%': 'Choose resolution',
  '%conflict_note_accept%': 'Accept',
  '%conflict_note_reject%': 'Reject',
  '%conflict_note_rejected_label%': 'Rejected',
  '%conflict_note_accepted_label%': 'Accepted',
  '%conflict_note_result_label%': 'Result',
};

test('renders the three region labels and the diff highlight', () => {
  render(
    <ConflictNoteCard comment={verseTextConflictComment} localizedStrings={localizedStrings} />,
  );
  expect(screen.getByText('Rejected')).toBeInTheDocument();
  expect(screen.getByText('Accepted')).toBeInTheDocument();
  expect(screen.getByText('Result')).toBeInTheDocument();
  // The rejected/accepted regions render PT9 diff HTML with <u>/<s> markup
  expect(document.querySelector('u')).toBeInTheDocument();
  // Result value is a plain <p>, not an editable control
  expect(
    screen
      .getByText(verseTextConflictComment.resultText ?? '')
      .closest('input, textarea, [contenteditable="true"]'),
  ).toBeNull();
});

test('Result shows the accept outcome by default and the reject outcome when reject is selected', () => {
  const { rerender } = render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      selectedResolution="accept"
    />,
  );
  // Default (accept) -> resultText (winner, "big")
  expect(screen.getByText(verseTextConflictComment.resultText ?? '')).toBeInTheDocument();
  rerender(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      selectedResolution="reject"
    />,
  );
  // Reject -> rejectedResultText (loser, "small")
  expect(screen.getByText(verseTextConflictComment.rejectedResultText ?? '')).toBeInTheDocument();
});

test('non-verseText conflict falls back to rendering contents', () => {
  const fallback: LegacyComment = {
    ...verseTextConflictComment,
    conflictType: 'studyBibleChangeConflict',
    contents: '<p>FALLBACK BODY</p>',
  };
  render(<ConflictNoteCard comment={fallback} localizedStrings={localizedStrings} />);
  expect(screen.getByText('FALLBACK BODY')).toBeInTheDocument();
  expect(screen.queryByText('Rejected')).not.toBeInTheDocument();
});

test('canAcceptReject=false disables the selector', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      canAcceptReject={false}
    />,
  );
  expect(screen.getByRole('combobox')).toBeDisabled();
});

test('no-ancestor case (acceptedText absent): selector and Rejected render, Accepted absent, Result tracks resolution', () => {
  const noAncestorComment = { ...verseTextConflictComment, acceptedText: undefined };
  const { rerender } = render(
    <ConflictNoteCard
      comment={noAncestorComment}
      localizedStrings={localizedStrings}
      selectedResolution="accept"
    />,
  );
  // The selector (combobox) must render
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  // The Rejected region must render
  expect(screen.getByText('Rejected')).toBeInTheDocument();
  // The Accepted label must NOT be in the document (no acceptedText)
  expect(screen.queryByText('Accepted')).not.toBeInTheDocument();
  // Result preview defaults to resultText (accept outcome, the winner)
  expect(screen.getByText(verseTextConflictComment.resultText ?? '')).toBeInTheDocument();
  rerender(
    <ConflictNoteCard
      comment={noAncestorComment}
      localizedStrings={localizedStrings}
      selectedResolution="reject"
    />,
  );
  // Result preview switches to rejectedResultText (reject outcome, the loser)
  expect(screen.getByText(verseTextConflictComment.rejectedResultText ?? '')).toBeInTheDocument();
});

test('onResolutionChange fires with "reject" when the user changes the selector', async () => {
  const onResolutionChange = vi.fn();
  // Radix Select (shadcn) requires pointer-event sequences that fireEvent.click does not
  // synthesize. userEvent v14 with pointerEventsCheck:0 drives the combobox reliably in
  // jsdom where layout measurements are unavailable (same pattern as scope-selector tests).
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      onResolutionChange={onResolutionChange}
    />,
  );

  // Open the Radix Select dropdown
  await user.click(screen.getByRole('combobox'));
  // Pick "Reject" from the option list (Radix renders items as options in the listbox)
  await user.click(await screen.findByRole('option', { name: 'Reject' }));

  expect(onResolutionChange).toHaveBeenCalledTimes(1);
  expect(onResolutionChange).toHaveBeenCalledWith('reject');
});

test('trims trailing whitespace out of diff spans so the strikethrough does not dangle', () => {
  // The replacement sample removes "town": its diff HTML is `<s>town </s>` (trailing space inside).
  render(
    <ConflictNoteCard
      comment={verseTextConflictReplacementSample}
      localizedStrings={localizedStrings}
    />,
  );
  const struck = document.querySelector('s');
  expect(struck).toBeInTheDocument();
  // Whitespace was moved outside the closing tag, so the struck word is "town", not "town ".
  expect(struck?.textContent).toBe('town');
});

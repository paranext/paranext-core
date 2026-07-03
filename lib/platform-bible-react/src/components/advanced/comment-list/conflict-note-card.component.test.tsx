import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LegacyComment } from 'platform-bible-utils';
import { vi, beforeAll } from 'vitest';
import { ConflictNoteCard } from './conflict-note-card.component';
import {
  verseTextConflictComment,
  verseTextConflictReplacementBothSidesSample,
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
  '%conflictNote_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflictNote_chooseLabel%': 'Choose:',
  '%conflictNote_chooseAriaLabel%': 'Choose resolution',
  '%conflictNote_accept%': 'Accept',
  '%conflictNote_reject%': 'Reject',
  '%conflictNote_rejectedLabel%': 'Rejected',
  '%conflictNote_acceptedLabel%': 'Accepted',
  '%conflictNote_resultLabel%': 'Result',
  '%conflictNote_resultEmpty%': 'The verse will be empty.',
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
  // The Result value sits in an aria-live region so screen readers hear the Accept/Reject swap.
  expect(
    screen.getByText(verseTextConflictComment.resultText ?? '').closest('[aria-live="polite"]'),
  ).not.toBeNull();
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

test('verseText conflict with resultText absent still renders the resolution UI (not the contents fallback)', () => {
  // resultText absent is not producible from a real PT9 merge (an emptied verse keeps its \v marker,
  // so Comment.Verse is non-blank; a deleted verse produces no note at all — BookFileMerger). But the
  // card must not strand it: gate on conflictType alone, like PT9, and degrade the Result region.
  const emptyResultComment: LegacyComment = {
    ...verseTextConflictComment,
    resultText: undefined,
    contents: '<p>SHOULD NOT SHOW AS FALLBACK</p>',
  };
  render(<ConflictNoteCard comment={emptyResultComment} localizedStrings={localizedStrings} />);
  // Structured card renders: selector + regions present...
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getByText('Rejected')).toBeInTheDocument();
  // ...and the raw contents fallback is NOT used.
  expect(screen.queryByText('SHOULD NOT SHOW AS FALLBACK')).not.toBeInTheDocument();
  // Accept outcome has no result USFM -> neutral empty-state, not a blank paragraph.
  expect(screen.getByText('The verse will be empty.')).toBeInTheDocument();
});

test('Rejected region is omitted when rejectedText is absent (no orphan heading)', () => {
  const noRejectedComment: LegacyComment = {
    ...verseTextConflictComment,
    rejectedText: undefined,
  };
  render(<ConflictNoteCard comment={noRejectedComment} localizedStrings={localizedStrings} />);
  // Card still renders (Accepted present), but the Rejected heading must not appear over an empty body.
  expect(screen.getByText('Accepted')).toBeInTheDocument();
  expect(screen.queryByText('Rejected')).not.toBeInTheDocument();
});

test('Result shows the empty-state when reject is selected and rejectedResultText is absent', () => {
  // Reachable: the losing side emptied the verse, so its decoded reject outcome is empty.
  const rejectDeletesComment: LegacyComment = {
    ...verseTextConflictComment,
    rejectedResultText: undefined,
  };
  render(
    <ConflictNoteCard
      comment={rejectDeletesComment}
      localizedStrings={localizedStrings}
      selectedResolution="reject"
    />,
  );
  expect(screen.getByText('The verse will be empty.')).toBeInTheDocument();
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

test('controlled mode does not leak the internal resolution when the parent declines a change', async () => {
  // Parent controls the card at 'accept' and ignores the user's reject (never updates the prop).
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const { rerender } = render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      selectedResolution="accept"
      onResolutionChange={() => {}}
    />,
  );
  await user.click(screen.getByRole('combobox'));
  await user.click(await screen.findByRole('option', { name: 'Reject' }));
  // Parent later stops controlling. The card must fall back to its default ('accept'), not the
  // 'reject' the parent declined — so the Result still shows the accept outcome.
  rerender(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      onResolutionChange={() => {}}
    />,
  );
  expect(screen.getByText(verseTextConflictComment.resultText ?? '')).toBeInTheDocument();
  expect(
    screen.queryByText(verseTextConflictComment.rejectedResultText ?? ''),
  ).not.toBeInTheDocument();
});

test('trims trailing whitespace out of diff spans so the strikethrough does not dangle', () => {
  // The replacement sample removes "town": its diff HTML is `<s>town </s>` (trailing space inside).
  render(
    <ConflictNoteCard
      comment={verseTextConflictReplacementBothSidesSample}
      localizedStrings={localizedStrings}
    />,
  );
  const struck = document.querySelector('s');
  expect(struck).toBeInTheDocument();
  // Whitespace was moved outside the closing tag, so the struck word is "town", not "town ".
  expect(struck?.textContent).toBe('town');
});

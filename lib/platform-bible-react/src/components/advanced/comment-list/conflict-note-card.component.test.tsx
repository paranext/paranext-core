import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LegacyComment } from 'platform-bible-utils';
import { vi, beforeAll } from 'vitest';
import { ConflictNoteCard } from './conflict-note-card.component';
import {
  verseTextConflictComment,
  verseTextConflictMergeSample,
  verseTextConflictReplacementSample,
} from './comment-sample.data';

// jsdom doesn't implement ResizeObserver, hasPointerCapture, or scrollIntoView.
// Radix components (Tooltip/RadioGroup) may reference them. No-op stubs are sufficient because the
// tests don't assert layout or scroll behaviour.
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
  '%conflict_note_choose_prompt%': 'Select which change to keep:',
  '%conflict_note_option_keep_current%': 'Keep the current text',
  '%conflict_note_option_use_other%': 'Use the other change',
  '%conflict_note_option_combine%': 'Combine both changes',
  '%conflict_note_save_and_resolve%': 'Save and resolve',
  '%conflict_note_save_disabled_tooltip%':
    'Keeping the current text makes no change — resolve the thread with the ✓ to keep it.',
  '%conflict_note_save_warning%': "This can't be undone.",
};

/** The container div that boxes a single resolution option (carries the selected border). */
const optionRow = (value: string) =>
  document.querySelector(`[data-slot="conflict-resolution-option"][data-value="${value}"]`);

test('acceptRejectOrMerge shows three radios including "Combine both changes", accept checked', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictMergeSample}
      localizedStrings={localizedStrings}
      availableActions="acceptRejectOrMerge"
    />,
  );
  expect(screen.getAllByRole('radio')).toHaveLength(3);
  expect(screen.getByRole('radio', { name: 'Keep the current text' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Use the other change' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: 'Combine both changes' })).toBeInTheDocument();
});

test('acceptOrReject shows two radios and no "Combine both changes" option', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="acceptOrReject"
    />,
  );
  expect(screen.getAllByRole('radio')).toHaveLength(2);
  expect(screen.getByRole('radio', { name: 'Keep the current text' })).toBeChecked();
  expect(screen.queryByRole('radio', { name: 'Combine both changes' })).not.toBeInTheDocument();
});

test('selecting "Use the other change" (uncontrolled) boxes the reject option', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ConflictNoteCard comment={verseTextConflictComment} localizedStrings={localizedStrings} />,
  );
  // Selected border starts on accept, not reject.
  expect(optionRow('accept')).toHaveClass('tw:border-border');
  expect(optionRow('reject')).not.toHaveClass('tw:border-border');

  await user.click(screen.getByRole('radio', { name: 'Use the other change' }));

  // The card manages its own selection: the selected border follows the choice to reject.
  expect(optionRow('reject')).toHaveClass('tw:border-border');
  expect(optionRow('accept')).not.toHaveClass('tw:border-border');
});

test('the merge option renders the mergedText diff HTML', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictMergeSample}
      localizedStrings={localizedStrings}
      availableActions="acceptRejectOrMerge"
    />,
  );
  const mergeRow = optionRow('merge');
  // The mergedText combines both edits ("big" village AND "royal" king); "royal" appears only there.
  expect(mergeRow?.textContent).toContain('royal');
  // The diff markup (<u> insertions) is preserved through the sanitize pipeline.
  expect(mergeRow?.querySelector('u')).toBeInTheDocument();
});

test('clicking anywhere on the "Combine both changes" card selects merge and boxes that card', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ConflictNoteCard
      comment={verseTextConflictMergeSample}
      localizedStrings={localizedStrings}
      availableActions="acceptRejectOrMerge"
    />,
  );
  // Merge starts unselected (accept is the default).
  expect(optionRow('merge')).not.toHaveClass('tw:border-border');

  // Click the card itself (not the radio) — the whole card is the target.
  const mergeCard = optionRow('merge');
  if (!mergeCard) throw new Error('expected a "Combine both changes" option card');
  await user.click(mergeCard);

  // Uncontrolled, so the selection (and its box) follows the click to the merge card.
  expect(optionRow('merge')).toHaveClass('tw:border-border');
  expect(optionRow('accept')).not.toHaveClass('tw:border-border');
});

test('Save and resolve is disabled on accept and enabled after choosing reject', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ConflictNoteCard comment={verseTextConflictComment} localizedStrings={localizedStrings} />,
  );
  const saveButton = screen.getByRole('button', { name: 'Save and resolve' });
  // Accept is preselected -> nothing to save yet.
  expect(saveButton).toBeDisabled();
  await user.click(screen.getByRole('radio', { name: 'Use the other change' }));
  expect(saveButton).toBeEnabled();
});

test('Save and resolve reports the current selection to onResolve', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onResolve = vi.fn();
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      onResolve={onResolve}
    />,
  );
  await user.click(screen.getByRole('radio', { name: 'Use the other change' }));
  await user.click(screen.getByRole('button', { name: 'Save and resolve' }));
  expect(onResolve).toHaveBeenCalledTimes(1);
  expect(onResolve).toHaveBeenCalledWith('reject');
});

test('isResolving disables the radio group and the Save and resolve button', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      isResolving
    />,
  );
  expect(screen.getByRole('radio', { name: 'Keep the current text' })).toBeDisabled();
  expect(screen.getByRole('radio', { name: 'Use the other change' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Save and resolve' })).toBeDisabled();
});

test('stale (availableActions=accept) disables the reject radio with a notice, keeps accept enabled, and hides Combine', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="accept"
    />,
  );
  const acceptRadio = screen.getByRole('radio', { name: 'Keep the current text' });
  expect(acceptRadio).toBeChecked();
  // Accept is the only still-valid resolution when stale, so it stays enabled.
  expect(acceptRadio).toBeEnabled();
  expect(screen.getByRole('radio', { name: 'Use the other change' })).toBeDisabled();
  // No Combine option in the stale state.
  expect(screen.queryByRole('radio', { name: 'Combine both changes' })).not.toBeInTheDocument();
  // Save stays present (so the layout never shifts) but disabled — keeping the current text is a no-op.
  expect(screen.getByRole('button', { name: 'Save and resolve' })).toBeDisabled();
});

test('the radio group has an accessible name', () => {
  render(
    <ConflictNoteCard comment={verseTextConflictComment} localizedStrings={localizedStrings} />,
  );
  expect(screen.getByRole('radiogroup', { name: 'Choose resolution' })).toBeInTheDocument();
});

test('the Save tooltip warns when enabled and explains the no-op when disabled', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <ConflictNoteCard comment={verseTextConflictComment} localizedStrings={localizedStrings} />,
  );
  // Default accept -> Save disabled -> the tooltip explains that saving is a no-op.
  await user.hover(screen.getByText('Save and resolve'));
  expect(await screen.findByRole('tooltip')).toHaveTextContent(
    'Keeping the current text makes no change',
  );

  // Choose the other change -> Save enabled -> the tooltip carries the irreversibility warning.
  await user.click(screen.getByRole('radio', { name: 'Use the other change' }));
  await user.hover(screen.getByRole('button', { name: 'Save and resolve' }));
  expect(await screen.findByRole('tooltip')).toHaveTextContent("This can't be undone.");
});

test('the Save tooltip is suppressed when Save is disabled solely by isResolving', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const { rerender } = render(
    <ConflictNoteCard comment={verseTextConflictComment} localizedStrings={localizedStrings} />,
  );
  // Choose reject first (an enabled Save would otherwise warn "This can't be undone.")...
  await user.click(screen.getByRole('radio', { name: 'Use the other change' }));
  // ...then flip on isResolving, which disables the button - showing that warning here would
  // misleadingly suggest clicking a button the user currently can't press.
  rerender(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      isResolving
    />,
  );
  await user.hover(screen.getByText('Save and resolve'));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

test('stale reject option is programmatically described by the stale notice for screen readers', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      // Empty strings so the component falls back to its default English notice.
      localizedStrings={{}}
      availableActions="accept"
    />,
  );
  // aria-describedby resolves to the visually-hidden notice, so the reason the choice is read-only
  // reaches assistive tech, not just the pointer-only Tooltip.
  expect(screen.getByRole('radio', { name: 'Use the other change' })).toHaveAccessibleDescription(
    /the verse was edited after this conflict was recorded/i,
  );
});

test('non-verseText conflict falls back to rendering contents', () => {
  const fallback: LegacyComment = {
    ...verseTextConflictComment,
    conflictType: 'studyBibleChangeConflict',
    contents: '<p>FALLBACK BODY</p>',
  };
  render(<ConflictNoteCard comment={fallback} localizedStrings={localizedStrings} />);
  expect(screen.getByText('FALLBACK BODY')).toBeInTheDocument();
  expect(screen.queryByRole('radio')).not.toBeInTheDocument();
});

test('availableActions none hides the radios and the Save and resolve button', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="none"
    />,
  );
  expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Save and resolve' })).not.toBeInTheDocument();
});

test('resolved read-only accept shows the accepted result and no outcome line', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="none"
      resolvedResolution="accept"
    />,
  );
  expect(screen.getByText(verseTextConflictComment.resultText ?? '')).toBeInTheDocument();
  expect(
    screen.queryByText(verseTextConflictComment.rejectedResultText ?? ''),
  ).not.toBeInTheDocument();
  // Accept is the no-op outcome, so no outcome sentence is shown.
  expect(
    screen.queryByText('Used the other change instead of the current text.'),
  ).not.toBeInTheDocument();
  expect(screen.queryByText('Combined both changes.')).not.toBeInTheDocument();
});

test('resolved read-only reject shows the rejected result and no outcome line', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="none"
      resolvedResolution="reject"
    />,
  );
  expect(screen.getByText(verseTextConflictComment.rejectedResultText ?? '')).toBeInTheDocument();
  expect(screen.queryByText(verseTextConflictComment.resultText ?? '')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Used the other change instead of the current text.'),
  ).not.toBeInTheDocument();
});

test('renders the localized verseText description, not the English fallback', () => {
  // Sentinel deliberately distinct from the component's English fallback ("Conflicting changes were
  // made to the verse text."), so a dropped or renamed lookup renders the fallback and fails here.
  const sentinel = '⟦localized verseText description⟧';
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={{ ...localizedStrings, '%conflict_note_description_verseText%': sentinel }}
      availableActions="acceptOrReject"
    />,
  );
  expect(screen.getByText(sentinel)).toBeInTheDocument();
});

test('resolved read-only with an empty result shows the neutral no-result notice', () => {
  // A reject that decoded to an empty verse leaves rejectedResultText blank; the Result region must
  // show the neutral notice rather than an empty region. Sentinel distinct from any fallback so this
  // asserts both the empty-result branch and that the lookup is used.
  const emptyResult: LegacyComment = { ...verseTextConflictComment, rejectedResultText: '' };
  render(
    <ConflictNoteCard
      comment={emptyResult}
      localizedStrings={{ ...localizedStrings, '%conflict_note_no_result%': '⟦no result⟧' }}
      availableActions="none"
      resolvedResolution="reject"
    />,
  );
  expect(screen.getByText('⟦no result⟧')).toBeInTheDocument();
});

test('resolved read-only merged shows the merged text and no outcome line', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictMergeSample}
      localizedStrings={localizedStrings}
      availableActions="none"
      resolvedResolution="merged"
    />,
  );
  // The merged verse (with its diff markup) is shown rather than being hidden.
  expect(document.querySelector('u')).toBeInTheDocument();
  expect(document.body.textContent).toContain('royal');
  expect(screen.queryByText('Combined both changes.')).not.toBeInTheDocument();
});

test('shows Undo on a resolved card and calls onUnresolve when clicked', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onUnresolve = vi.fn();
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="none"
      resolvedResolution="reject"
      canUnresolve
      onUnresolve={onUnresolve}
    />,
  );
  await user.click(screen.getByRole('button', { name: /undo resolution/i }));
  expect(onUnresolve).toHaveBeenCalledTimes(1);
});

test('hides Undo when canUnresolve is false', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="none"
      resolvedResolution="reject"
      canUnresolve={false}
    />,
  );
  expect(screen.queryByRole('button', { name: /undo resolution/i })).toBeNull();
});

test('disables the Undo button while isUnresolving', () => {
  render(
    <ConflictNoteCard
      comment={verseTextConflictComment}
      localizedStrings={localizedStrings}
      availableActions="none"
      resolvedResolution="reject"
      canUnresolve
      onUnresolve={vi.fn()}
      isUnresolving
    />,
  );
  expect(screen.getByRole('button', { name: /undo resolution/i })).toBeDisabled();
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

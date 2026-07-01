import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegacyComment } from 'platform-bible-utils';
import { ConflictNoteCard } from './conflict-note-card.component';
import { verseTextConflictComment } from './comment-sample.data';

const localizedStrings = {
  '%conflict_note_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflict_note_choose_label%': 'Choose:',
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

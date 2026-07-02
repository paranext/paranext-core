import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegacyComment } from 'platform-bible-utils';
import { vi } from 'vitest';
import { CommentItem } from './comment-item.component';

// CommentItem imports the Lexical Editor at module scope (only rendered while editing). Stub it so
// these non-editing render tests don't pull in the full editor setup, matching the thread tests.
vi.mock('@/components/advanced/editor/editor', () => ({
  Editor: vi.fn(() => <div data-testid="mock-editor" />),
}));

const OUTCOME_REPLACED =
  'Replaced the changes that Paratext ACCEPTED with the changes that Paratext REJECTED';
const OUTCOME_MERGED =
  'Merged the changes that Paratext ACCEPTED with the changes that Paratext REJECTED';

const localizedStrings = {
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_status_resolved%': 'Marked as resolved',
  '%conflict_note_outcome_replaced%': OUTCOME_REPLACED,
  '%conflict_note_outcome_merged%': OUTCOME_MERGED,
};

const baseComment: LegacyComment = {
  id: 'c1',
  user: 'Alice Ann',
  date: '2024-01-01T00:00:00.000Z',
  contents: '<p>ORDINARY BODY</p>',
  deleted: false,
  hideInTextWindow: false,
  language: 'en',
  isRead: true,
  startPosition: 0,
  selectedText: '',
  thread: 't1',
  verseRef: 'GEN 1:1',
};

test("renders the 'replaced' outcome line INSTEAD of the body when conflictResolutionAction is 'replaced'", () => {
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'replaced',
        // Non-empty body to prove the outcome line replaces it (the real comment's body is empty).
        contents: '<p>SHOULD NOT SHOW</p>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText(OUTCOME_REPLACED)).toBeInTheDocument();
  expect(screen.queryByText('SHOULD NOT SHOW')).not.toBeInTheDocument();
});

test("renders the 'merged' outcome line when conflictResolutionAction is 'merged'", () => {
  render(
    <CommentItem
      comment={{ ...baseComment, status: 'Resolved', conflictResolutionAction: 'merged' }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText(OUTCOME_MERGED)).toBeInTheDocument();
});

test('renders the contents body (no outcome line) when conflictResolutionAction is absent', () => {
  render(<CommentItem comment={baseComment} localizedStrings={localizedStrings} />);
  expect(screen.getByText('ORDINARY BODY')).toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_REPLACED)).not.toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_MERGED)).not.toBeInTheDocument();
});

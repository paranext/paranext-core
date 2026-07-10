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

const OUTCOME_USED_OTHER = 'Used the other change instead of the current text.';
const OUTCOME_COMBINED = 'Combined both changes.';

const localizedStrings = {
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_status_resolved%': 'Marked as resolved',
  '%conflict_note_outcome_used_other%': OUTCOME_USED_OTHER,
  '%conflict_note_outcome_combined%': OUTCOME_COMBINED,
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

test("renders the 'used the other change' outcome line when conflictResolutionAction is 'replaced' and the body is empty", () => {
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'replaced',
        // A platform-created resolution comment carries an empty body — the outcome line stands in.
        contents: '<blockquote></blockquote>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText(OUTCOME_USED_OTHER)).toBeInTheDocument();
});

test('renders a resolution comment’s typed body (not the outcome line) when it carries text', () => {
  // A resolution synced from PT9 can carry both a resolver-typed note and the action. PT9 shows the
  // text, so it must not be discarded for the synthesized outcome banner.
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'replaced',
        contents: '<p>Resolver note that must remain visible</p>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText('Resolver note that must remain visible')).toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_USED_OTHER)).not.toBeInTheDocument();
});

test("renders the 'combined' outcome line when conflictResolutionAction is 'merged' and the body is empty", () => {
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'merged',
        contents: '<blockquote></blockquote>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText(OUTCOME_COMBINED)).toBeInTheDocument();
});

test('renders the contents body (no outcome line) when conflictResolutionAction is absent', () => {
  render(<CommentItem comment={baseComment} localizedStrings={localizedStrings} />);
  expect(screen.getByText('ORDINARY BODY')).toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_USED_OTHER)).not.toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_COMBINED)).not.toBeInTheDocument();
});

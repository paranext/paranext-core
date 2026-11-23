import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConflictThreadSummary } from './conflict-thread-summary.component';
import { verseTextConflictReplacementSample } from './comment-sample.data';

// verseTextConflictReplacementSample.rejectedText diffs "town" (deleted) -> "village" (inserted).

test('unresolved: shows the prompt plus the red/green diff, not the PT9 "in red" body', () => {
  render(
    <ConflictThreadSummary comment={verseTextConflictReplacementSample} localizedStrings={{}} />,
  );

  expect(screen.getByText('Conflicting edits. Choose which change to keep.')).toBeInTheDocument();

  // The note's diff is shown (deleted "town", inserted "village") ...
  const deleted = document.querySelector('s');
  const inserted = document.querySelector('u');
  expect(deleted).toHaveTextContent('town');
  expect(inserted).toHaveTextContent('village');

  // ... rendered through the shared coloring wrapper (red for deleted, green for inserted), so the
  // collapsed preview matches the expanded card instead of the colorless CommentItem rendering.
  const diffWrapper = deleted?.closest('div');
  expect(diffWrapper?.className).toContain('text-destructive');
  expect(diffWrapper?.className).toContain('text-success-foreground');

  // The PT9 note body's "in red" prose is never rendered.
  expect(screen.queryByText(/in red/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/current copy of the text/i)).not.toBeInTheDocument();
});

test('unresolved: uses the localized prompt when provided', () => {
  render(
    <ConflictThreadSummary
      comment={verseTextConflictReplacementSample}
      localizedStrings={{ '%conflict_note_summary_unresolved%': 'Elija qué cambio conservar.' }}
    />,
  );
  expect(screen.getByText('Elija qué cambio conservar.')).toBeInTheDocument();
});

test('resolved by accept: shows the kept-current outcome and no verse text', () => {
  render(
    <ConflictThreadSummary
      comment={verseTextConflictReplacementSample}
      localizedStrings={{}}
      resolvedResolution="accept"
    />,
  );
  expect(screen.getByText(/Kept the current text\.$/)).toBeInTheDocument();
  expect(document.querySelector('s')).toBeNull();
  expect(screen.queryByText(/village/)).not.toBeInTheDocument();
});

test('resolved by reject: shows the used-other outcome', () => {
  render(
    <ConflictThreadSummary
      comment={verseTextConflictReplacementSample}
      localizedStrings={{}}
      resolvedResolution="reject"
    />,
  );
  expect(screen.getByText(/Used the other change\.$/)).toBeInTheDocument();
  expect(document.querySelector('s')).toBeNull();
});

test('resolved by merged: shows the combined outcome', () => {
  render(
    <ConflictThreadSummary
      comment={verseTextConflictReplacementSample}
      localizedStrings={{}}
      resolvedResolution="merged"
    />,
  );
  expect(screen.getByText(/Combined both changes\.$/)).toBeInTheDocument();
  expect(document.querySelector('s')).toBeNull();
});

test('resolved: uses the localized outcome sentence when provided', () => {
  render(
    <ConflictThreadSummary
      comment={verseTextConflictReplacementSample}
      localizedStrings={{
        '%conflict_note_summary_resolved_combined%': 'Se combinaron ambos cambios.',
      }}
      resolvedResolution="merged"
    />,
  );
  expect(screen.getByText('Se combinaron ambos cambios.')).toBeInTheDocument();
});

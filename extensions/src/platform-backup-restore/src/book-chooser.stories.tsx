/**
 * Stories for the BookChooser sub-modal (UI-PKG-005 / SUBFLOW-001).
 *
 * Each story wraps the production `BookChooser` in a stateful decorator so reviewers can:
 *
 * - Open and close the modal.
 * - Click pills inside the embedded `BookGridSelector` (groupBy='canon').
 * - Confirm via OK → see the last submitted `BookSet` summary update in the panel beside the modal.
 * - Cancel → see that the prior selection is preserved.
 *
 * No PAPI wiring — BookChooser is purely UI-side; the caller (UI-PKG-004 BackupForm) owns the
 * surrounding plumbing in phase-3-ui.
 */
import { useState, type ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import { BookChooser, type BookChooserProps, type BookSet } from './book-chooser.component';

/** Representative `availableBooks` covering OT + NT + a couple of DC/extras for canon grouping. */
const SAMPLE_AVAILABLE: BookSet = {
  bookIds: [
    'GEN',
    'EXO',
    'LEV',
    'NUM',
    'DEU',
    'JOS',
    'JDG',
    'RUT',
    '1SA',
    '2SA',
    '1KI',
    '2KI',
    'MAT',
    'MRK',
    'LUK',
    'JHN',
    'ACT',
    'ROM',
    '1CO',
    '2CO',
    'TOB',
    'JDT',
  ],
  summary: '22 books',
};

const PRESELECTED: BookSet = {
  bookIds: ['GEN', 'EXO', 'MAT'],
  summary: 'GEN, EXO, MAT',
};

const EMPTY_SELECTION: BookSet = { bookIds: [], summary: '(none)' };
const EMPTY_AVAILABLE: BookSet = { bookIds: [], summary: '(no books)' };

/**
 * Stateful harness: provides the host page that opens the modal, observes its output, and renders a
 * side panel showing the last submission / cancellation. Every callback prop on the component is
 * routed through `useState` so the story is fully interactive (STORY-004).
 */
function Harness({
  availableBooks = SAMPLE_AVAILABLE,
  selectedBooks = EMPTY_SELECTION,
  caption = 'Books to Backup',
  helpText = 'Choose the books which will be backed up.',
  localizedStrings,
}: Partial<BookChooserProps>): ReactElement {
  const [open, setOpen] = useState(true);
  const [committed, setCommitted] = useState<BookSet>(selectedBooks);
  const [lastAction, setLastAction] = useState<'submit' | 'cancel' | undefined>(undefined);

  const handleSubmit: BookChooserProps['onSubmit'] = (output) => {
    setCommitted(output.selectedBooks);
    setLastAction('submit');
    setOpen(false);
  };
  const handleCancel: BookChooserProps['onCancel'] = () => {
    // Cancel preserves the prior commitment (EDGE-002).
    setLastAction('cancel');
    setOpen(false);
  };

  return (
    <div className="tw:flex tw:gap-4 tw:p-4">
      <BookChooser
        open={open}
        availableBooks={availableBooks}
        selectedBooks={committed}
        caption={caption}
        helpText={helpText}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        localizedStrings={localizedStrings}
      />
      <aside className="tw:flex tw:min-w-64 tw:flex-col tw:gap-2 tw:rounded tw:border tw:border-border tw:p-3 tw:text-sm">
        <h3 className="tw:font-semibold">Story state</h3>
        <p data-testid="harness-last-action">
          Last action: <code>{lastAction ?? '—'}</code>
        </p>
        <p data-testid="harness-committed-summary">
          Committed selection (count): <code>{committed.bookIds.length}</code>
        </p>
        <p data-testid="harness-committed-ids" className="tw:break-all">
          Committed bookIds:{' '}
          <code>{committed.bookIds.length === 0 ? '(empty)' : committed.bookIds.join(', ')}</code>
        </p>
        {!open && (
          <Button onClick={() => setOpen(true)} aria-label="Re-open BookChooser">
            Re-open
          </Button>
        )}
      </aside>
    </div>
  );
}

const meta: Meta<typeof Harness> = {
  title: 'Bundled Extensions/platform-backup-restore/BookChooser',
  component: Harness,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Harness>;

/**
 * Default — empty initial selection across a representative `availableBooks` set. Reviewer can
 * click any pill, confirm via OK to see the committed selection update, or Cancel to see the prior
 * selection preserved.
 */
export const Default: Story = {
  args: {
    availableBooks: SAMPLE_AVAILABLE,
    selectedBooks: EMPTY_SELECTION,
    caption: 'Books to Backup',
    helpText: 'Choose the books which will be backed up.',
  },
};

/**
 * Pre-selected — GEN, EXO, MAT chosen on open. Demonstrates that the working selection re-seeds
 * from the `selectedBooks` prop and that cancel preserves the prior selection.
 */
export const Selected: Story = {
  args: {
    availableBooks: SAMPLE_AVAILABLE,
    selectedBooks: PRESELECTED,
    caption: 'Books to Backup',
    helpText: 'Choose the books which will be backed up.',
  },
};

/**
 * Empty — `availableBooks` contains no books. The grid renders empty groups (no rows), but the
 * modal frame, caption, helpText, and Submit/Cancel chrome still render so the user can dismiss
 * cleanly (EDGE-001).
 */
export const Empty: Story = {
  args: {
    availableBooks: EMPTY_AVAILABLE,
    selectedBooks: EMPTY_SELECTION,
    caption: 'Books to Backup',
    helpText: 'Choose the books which will be backed up.',
  },
};

/**
 * WithAllSelected — every available book is pre-selected. Useful for exercising the "deselect into
 * empty state" flow and confirming that range-toggle / select-all behavior works against a
 * fully-selected starting state.
 */
export const WithAllSelected: Story = {
  args: {
    availableBooks: SAMPLE_AVAILABLE,
    selectedBooks: { bookIds: [...SAMPLE_AVAILABLE.bookIds], summary: 'all 22 books' },
    caption: 'Books to Backup',
    helpText: 'Choose the books which will be backed up.',
  },
};

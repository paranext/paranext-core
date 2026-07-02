import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageStrings, LegacyComment } from 'platform-bible-utils';
import { useState } from 'react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { ConflictNoteCard } from './conflict-note-card.component';
import { ConflictResolution, ConflictResolutionOptions } from './conflict-note-card.types';
import {
  verseTextConflictComment,
  verseTextConflictReplacementSample,
} from './comment-sample.data';

const localizedStrings: LanguageStrings = {
  '%conflict_note_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflict_note_choose_label%': 'Choose:',
  '%conflict_note_choose_aria_label%': 'Choose resolution',
  '%conflict_note_accept%': 'Accept',
  '%conflict_note_reject%': 'Reject',
  '%conflict_note_rejected_label%': 'Rejected',
  '%conflict_note_accepted_label%': 'Accepted',
  '%conflict_note_result_label%': 'Result',
  '%conflict_note_resolve%': 'Resolve',
  '%conflict_note_stale_notice%':
    'The verse has been edited since this conflict was recorded, so rejecting is no longer available. Accept keeps the current text.',
};

function ConflictNoteCardStory({
  availableActions = 'acceptOrReject',
  comment = verseTextConflictComment,
}: {
  availableActions?: ConflictResolutionOptions;
  comment?: LegacyComment;
}) {
  const [resolution, setResolution] = useState<ConflictResolution>('accept');
  return (
    <Card className="tw:max-w-md">
      <CardContent className="tw:pt-4">
        <ConflictNoteCard
          comment={comment}
          localizedStrings={localizedStrings}
          selectedResolution={resolution}
          onResolutionChange={setResolution}
          availableActions={availableActions}
          onResolve={(chosen) => console.log(`Resolve clicked: ${chosen}`)}
        />
      </CardContent>
    </Card>
  );
}

const meta: Meta<typeof ConflictNoteCard> = {
  title: 'Advanced/ConflictNoteCard',
  component: ConflictNoteCard,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ConflictNoteCardStory>;

/**
 * Default verseText conflict with a REPLACEMENT (both deletion and insertion). Struck-red "town"
 * and green "village"/"city" are both visible. Toggle Accept/Reject to watch the Result preview
 * change between "city" (accepted) and "village" (rejected).
 */
export const Default: Story = {
  render: () => <ConflictNoteCardStory comment={verseTextConflictReplacementSample} />,
};

/** Controls are hidden when the user may not resolve, or the conflict is already resolved. */
export const RestrictedPermissions: Story = {
  render: () => <ConflictNoteCardStory availableActions="none" />,
};

/**
 * The verse was edited after the merge (stale): Reject is disabled with an explanation tooltip and
 * the selection is forced to Accept (keep current text).
 */
export const StaleVerse: Story = {
  render: () => <ConflictNoteCardStory availableActions="accept" />,
};

/**
 * VerseText conflict where there is no common ancestor (no-ancestor case). The Accepted region is
 * intentionally omitted because there is no accepted-side diff to display; acceptedText is
 * undefined. The selector, Rejected region, and Result preview still render normally.
 */
export const NoAncestor: Story = {
  render: () => (
    <ConflictNoteCardStory comment={{ ...verseTextConflictComment, acceptedText: undefined }} />
  ),
};

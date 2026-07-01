import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageStrings, LegacyComment } from 'platform-bible-utils';
import { useState } from 'react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { ConflictNoteCard } from './conflict-note-card.component';
import { ConflictResolution } from './conflict-note-card.types';
import { verseTextConflictComment } from './comment-sample.data';

const localizedStrings: LanguageStrings = {
  '%conflict_note_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflict_note_choose_label%': 'Choose:',
  '%conflict_note_choose_aria_label%': 'Choose resolution',
  '%conflict_note_accept%': 'Accept',
  '%conflict_note_reject%': 'Reject',
  '%conflict_note_rejected_label%': 'Rejected',
  '%conflict_note_accepted_label%': 'Accepted',
  '%conflict_note_result_label%': 'Result',
};

function ConflictNoteCardStory({
  canAcceptReject = true,
  comment = verseTextConflictComment,
}: {
  canAcceptReject?: boolean;
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
          canAcceptReject={canAcceptReject}
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

/** Default verseText conflict. Toggle Accept/Reject to watch the Result preview change. */
export const Default: Story = { render: () => <ConflictNoteCardStory /> };

/** The selector is disabled when the user lacks accept/reject permission. */
export const RestrictedPermissions: Story = {
  render: () => <ConflictNoteCardStory canAcceptReject={false} />,
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

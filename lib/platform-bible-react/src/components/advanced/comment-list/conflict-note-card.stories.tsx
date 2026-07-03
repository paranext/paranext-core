import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageStrings, LegacyComment } from 'platform-bible-utils';
import { useState } from 'react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { ConflictNoteCard } from './conflict-note-card.component';
import { ConflictResolution } from './conflict-note-card.types';
import {
  verseTextConflictComment,
  verseTextConflictReplacementBothSidesSample,
} from './comment-sample.data';

const localizedStrings: LanguageStrings = {
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

/**
 * Default verseText conflict with a REPLACEMENT (both deletion and insertion). Struck-red "town"
 * and green "village"/"city" are both visible. Toggle Accept/Reject to watch the Result preview
 * change between "city" (accepted) and "village" (rejected).
 */
export const Default: Story = {
  render: () => <ConflictNoteCardStory comment={verseTextConflictReplacementBothSidesSample} />,
};

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

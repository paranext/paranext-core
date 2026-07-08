import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageStrings, LegacyComment } from 'platform-bible-utils';
import { useState } from 'react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { ConflictNoteCard } from './conflict-note-card.component';
import {
  ConflictResolution,
  ConflictResolutionOptions,
  ConflictResolutionOutcome,
} from './conflict-note-card.types';
import {
  verseTextConflictComment,
  verseTextConflictMergeSample,
  verseTextConflictReplacementSample,
} from './comment-sample.data';

const localizedStrings: LanguageStrings = {
  '%conflict_note_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflict_note_choose_prompt%': 'Select which change to keep:',
  '%conflict_note_option_keep_current%': 'Keep the current text',
  '%conflict_note_option_use_other%': 'Use the other change',
  '%conflict_note_option_combine%': 'Combine both changes',
  '%conflict_note_choose_aria_label%': 'Choose resolution',
  '%conflict_note_save_and_resolve%': 'Save and resolve',
  '%conflict_note_save_disabled_tooltip%':
    'Keeping the current text makes no change — resolve the thread with the ✓ to keep it.',
  '%conflict_note_save_warning%': "This can't be undone.",
  '%conflict_note_stale_notice%':
    'The verse has been edited since this conflict was recorded, so rejecting is no longer available. Accept keeps the current text.',
};

function ConflictNoteCardStory({
  availableActions = 'acceptOrReject',
  comment = verseTextConflictComment,
  resolvedResolution,
}: {
  availableActions?: ConflictResolutionOptions;
  comment?: LegacyComment;
  resolvedResolution?: ConflictResolutionOutcome;
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
          resolvedResolution={resolvedResolution}
          onResolve={(chosen) => console.log(`Save and Resolve clicked: ${chosen}`)}
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
 * Default verseText conflict with a REPLACEMENT (both deletion and insertion). Each option shows
 * its inline diff: struck-red "town" and green "village"/"city". Click "Use the other change" to
 * enable Save and resolve.
 */
export const Default: Story = {
  render: () => <ConflictNoteCardStory comment={verseTextConflictReplacementSample} />,
};

/**
 * The two edits are independent, so a third "Combine both changes" option is offered whose diff
 * shows both insertions merged together.
 */
export const AcceptRejectOrMerge: Story = {
  render: () => (
    <ConflictNoteCardStory
      comment={verseTextConflictMergeSample}
      availableActions="acceptRejectOrMerge"
    />
  ),
};

/**
 * The verse was edited after the merge (stale): "Keep the current text" stays enabled and selected,
 * while "Use the other change" is disabled and carries an explanation tooltip. Save and resolve
 * stays present but disabled (keeping the current text is a no-op).
 */
export const StaleVerse: Story = {
  render: () => <ConflictNoteCardStory availableActions="accept" />,
};

/**
 * VerseText conflict where there is no common ancestor (no-ancestor case): acceptedText is
 * undefined, so the "Keep the current text" option shows an empty diff while the other options
 * render normally.
 */
export const NoAncestor: Story = {
  render: () => (
    <ConflictNoteCardStory comment={{ ...verseTextConflictComment, acceptedText: undefined }} />
  ),
};

/**
 * Already resolved by rejecting: collapses to just the rejected result — no outcome line (the
 * CommentItem resolution-reply banner states the outcome instead).
 */
export const ResolvedUsedOtherChange: Story = {
  render: () => <ConflictNoteCardStory availableActions="none" resolvedResolution="reject" />,
};

/**
 * Already resolved by a PT9 three-way merge: shows just the merged text — no outcome line (the
 * CommentItem resolution-reply banner states the outcome instead).
 */
export const ResolvedCombined: Story = {
  render: () => (
    <ConflictNoteCardStory
      comment={verseTextConflictMergeSample}
      availableActions="none"
      resolvedResolution="merged"
    />
  ),
};

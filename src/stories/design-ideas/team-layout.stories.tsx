/*
 * Design-ideas story: the Team layout dialog's "Save and sync" design on its own. The primary
 * button saves the layout and sends it to the team with a Send/Receive for the project; its menu
 * also offers Save alone, which sends it at the next sync. Both wait for a change. A layout saved but not sent yet — saved locally, or its Send/Receive failed —
 * shows in three places until a Sync succeeds: a dot and tooltip on the editor toolbar's Edit team
 * layout button, a notice with Sync now when the dialog reopens, and the project's Sync reason in
 * Home.
 *
 * The same flow runs inside the full window in Design ideas/Unified designs.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CardTitle, Sonner } from 'platform-bible-react';
import { HomeIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MockScriptureEditorPanel } from '../platform/current-app-mock-panels';
import { HomeUnified } from './home-unified.component';
import { SimpleEditorToolbar } from './simple-editor-toolbar.component';
import { TeamLayoutController } from './team-layout-design.component';
import { teamLayoutNotSentTooltip } from './use-team-layout-send.hook';
import { useUnifiedCatalog } from './use-unified-catalog.hook';

const STRINGS = {
  home: 'Home',
} as const;

/** The project whose layout the story edits: NNB, which the user administers. */
const PROJECT_ID = 'p-nnb';

type TeamLayoutStoryProps = {
  /** The dialog is open when the story starts. */
  isOpenAtStart?: boolean;
  /** The story starts with a layout saved on this computer and not sent yet. */
  startsNotSent?: boolean;
  /** Every Send/Receive fails, as when offline: a saved layout stays not sent. */
  isSendFailing?: boolean;
};

function TeamLayoutStory({
  isOpenAtStart = true,
  startsNotSent = false,
  isSendFailing = false,
}: TeamLayoutStoryProps) {
  const catalog = useUnifiedCatalog();
  const [isOpen, setIsOpen] = useState(isOpenAtStart);
  const [modelTextId, setModelTextId] = useState<string | undefined>('r-esv');
  const project = catalog.items.find((item) => item.id === PROJECT_ID);

  // The pickers search the whole catalog, so load all of it first; loading replaces the items, so
  // the not-sent layout is recorded after it.
  const { hasMore, fetchMore, markTeamLayoutUnsent } = catalog;
  useEffect(() => {
    if (hasMore) fetchMore();
  }, [hasMore, fetchMore]);
  const hasMarkedNotSentRef = useRef(false);
  useEffect(() => {
    if (!startsNotSent || hasMore || hasMarkedNotSentRef.current) return;
    hasMarkedNotSentRef.current = true;
    markTeamLayoutUnsent(PROJECT_ID);
  }, [startsNotSent, hasMore, markTeamLayoutUnsent]);

  return (
    <div className="tw:grid tw:h-screen tw:grid-cols-1 tw:gap-3 tw:bg-muted/40 tw:p-3 tw:lg:grid-cols-2">
      <div className="tw:min-h-0 tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background">
        <MockScriptureEditorPanel
          projectName={project?.shortName}
          toolbar={
            <SimpleEditorToolbar
              onEditTeamLayout={() => setIsOpen(true)}
              teamLayoutNotSentTooltip={teamLayoutNotSentTooltip(project)}
            />
          }
        />
      </div>
      <div className="tw:min-h-0 tw:overflow-hidden tw:rounded-lg tw:border">
        <HomeUnified
          interfaceMode="simple"
          className="tw:h-full"
          items={catalog.items}
          inFlightIds={catalog.inFlightIds}
          onItemAction={(item, action) => {
            if (action.kind === 'editTeamLayout') {
              setIsOpen(true);
              return undefined;
            }
            return catalog.applyAction(item, action);
          }}
          hasMore={catalog.hasMore}
          onFetchMore={catalog.fetchMore}
          dblAvailableCount={catalog.dblAvailableCount}
          variant="unified"
          initialProjectResourceFilter="paratextProject"
          showDownloadButton={false}
          headerContent={
            <div className="tw:flex tw:items-center tw:gap-2">
              <HomeIcon size={28} />
              <CardTitle>{STRINGS.home}</CardTitle>
            </div>
          }
        />
      </div>
      <TeamLayoutController
        catalog={catalog}
        project={project}
        open={isOpen}
        onOpenChange={setIsOpen}
        modelTextId={modelTextId}
        isSendFailing={isSendFailing}
        onSaved={(_project, result) => setModelTextId(result.modelTextId)}
      />
      <Sonner position="bottom-center" />
    </div>
  );
}

const meta: Meta<typeof TeamLayoutStory> = {
  title: 'Design ideas/Team layout',
  component: TeamLayoutStory,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '⚠️ **Prototype only.** The Team layout dialog with "Save and sync": one click ' +
          'saves and sends the layout with a Send/Receive for the project; the button’s menu ' +
          'also offers "Save", which sends it at the next sync. Both are enabled once the layout ' +
          'has been changed. A layout that is saved but not sent ' +
          'shows a dot on the editor toolbar’s Edit team layout button, a notice with Sync now ' +
          'in the dialog, and "Team layout not sent" in the project’s Sync tooltip in Home, ' +
          'until a Sync succeeds. Home’s menu offers Edit team layout on projects you administer ' +
          '(read-only ones included).',
      },
    },
  },
  tags: ['!autodocs'],
};
export default meta;

type Story = StoryObj<typeof TeamLayoutStory>;

export const SaveAndSync: Story = {
  name: 'Save and sync',
};

export const NotSentYet: Story = {
  name: 'Not sent yet',
  args: { startsNotSent: true },
  parameters: {
    docs: {
      description: {
        story:
          'A layout saved on this computer earlier and not sent: the dialog opens with its ' +
          'notice and Sync now, the toolbar button carries the dot, and NNB’s Sync tooltip in ' +
          'Home names the layout.',
      },
    },
  },
};

export const SendFails: Story = {
  name: 'Send fails',
  args: { isSendFailing: true },
  parameters: {
    docs: {
      description: {
        story:
          'Every Send/Receive fails, as when offline. "Save and sync" saves, then reports ' +
          'that the layout was not sent, and the layout stays in the not-sent state.',
      },
    },
  },
};

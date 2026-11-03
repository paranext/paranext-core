/*
 * Design-ideas stories for `UnifiedProjectPicker`, the compact counterpart of the unified Home.
 * Both render the same `useUnifiedCatalog` state, so an action taken here (Get, Install) shows up
 * on Home and vice versa.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import type { UnifiedItem } from './home-unified.component';
import {
  UnifiedProjectPicker,
  type UnifiedProjectPickerProps,
} from './unified-project-picker.component';
import { FULL_CATALOG } from './unified-items.data';
import { useUnifiedCatalog } from './use-unified-catalog.hook';

const ALIGNMENT_WITH_HOME =
  'The picker shows the same `UnifiedItem[]` as the unified Home — it is the compact view of the ' +
  'same data, with the same type icons (a scroll for projects, an open book for resources). It ' +
  'is only for picking, so it shows no status: whether a project needs a sync or a resource has ' +
  'an update is shown in Home, not here. Items hidden from Home never appear here; they are ' +
  'listed only in Home’s Hidden group. Rows for something not on this computer are muted, with ' +
  'a "Get" or "Install · N MB" hint saying what picking them does; picking one runs Get / ' +
  'Install, exactly as the button on that row in Home does.';

const COLLAPSIBLE_SECTIONS =
  'Every section heading has a chevron and opens or closes its section; sections start ' +
  'expanded. A heading is a button: Tab to it from the search box, then Enter or Space toggles ' +
  'it, and arrow keys still move through the rows that are showing. Typing in the search box ' +
  'expands every section so no match is hidden, and closing the picker resets them all.';

const COUNTED_HEADINGS =
  'Every resource-picker heading ends with how many of its rows match the current search, so ' +
  'the numbers shrink as you type: "Projects (4)" becomes "Projects (1)".';

const MORE_RESOURCES =
  '**"More resources…" stays in the dropdown.** Picking it (click, or arrow to it and press ' +
  'Enter) lists the DBL resources not on this computer, alphabetically, under "Available for ' +
  'download (n)" — n is every resource you can download, not just those listed so far. They ' +
  'come 25 at a time: scroll to the end of the list (or arrow down to its last row) and a ' +
  '"Loading more…" row shows briefly while the next 25 arrive, standing in for a paged DBL ' +
  'request. Once the last batch is in, the footer reads "All available resources loaded". The ' +
  'rows are muted with an "Install · N MB" hint, and picking one installs it. Typing searches ' +
  'every downloadable resource (and the server projects) whatever has been loaded, in that same ' +
  'section; clearing the search goes back to the loaded batches. Closing the picker hides the ' +
  'section again.';

const meta: Meta<typeof UnifiedProjectPicker> = {
  title: 'Design ideas/Unified project picker',
  component: UnifiedProjectPicker,
  parameters: {
    docs: {
      description: { component: `${ALIGNMENT_WITH_HOME}\n\n${COLLAPSIBLE_SECTIONS}` },
    },
  },
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof UnifiedProjectPicker>;

/** No project on this computer: only server projects and DBL resources. */
const NOTHING_LOCAL_CATALOG: UnifiedItem[] = FULL_CATALOG.filter(
  (item) => item.status === 'sharedNotInstalled' || item.status === 'dblNotInstalled',
);

function Harness({
  kind,
  interfaceMode,
  currentProjectId,
  catalog,
  initialSelectedId,
  isTitlebar,
}: Pick<UnifiedProjectPickerProps, 'kind' | 'interfaceMode' | 'currentProjectId'> & {
  catalog?: UnifiedItem[];
  initialSelectedId?: string;
  isTitlebar?: boolean;
}) {
  const { items, inFlightIds, applyAction, fetchMore } = useUnifiedCatalog(catalog);
  // Page in the whole catalog once, so a search reaches every DBL resource.
  useEffect(() => {
    fetchMore();
  }, [fetchMore]);
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
  const [lastEvent, setLastEvent] = useState<string>('');

  const picker = (
    <UnifiedProjectPicker
      items={items}
      kind={kind}
      interfaceMode={interfaceMode}
      currentProjectId={currentProjectId}
      selectedId={selectedId}
      onSelect={(item) => {
        setSelectedId(item.id);
        setLastEvent(`Selected ${item.shortName}`);
      }}
      onItemAction={(item, action) => {
        setLastEvent(`${action.kind} ${item.shortName}`);
        return applyAction(item, action);
      }}
      onMoreItems={kind === 'projects' ? () => setLastEvent('Open Home') : undefined}
      inFlightIds={inFlightIds}
      buttonVariant={isTitlebar ? 'ghost' : undefined}
      buttonClassName={isTitlebar ? 'tw:w-64' : 'tw:w-72'}
    />
  );

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      {isTitlebar ? (
        <div className="tw:flex tw:h-10 tw:items-center tw:gap-2 tw:border-b tw:bg-muted tw:px-3">
          <span className="tw:text-sm tw:font-semibold">Paratext 10</span>
          <div className="tw:flex tw:flex-1 tw:justify-center">{picker}</div>
        </div>
      ) : (
        picker
      )}
      <p className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
        {lastEvent ? `Last event: ${lastEvent}` : 'Last event: none'}
      </p>
    </div>
  );
}

export const ProjectsTitleBar: Story = {
  name: 'Projects (title bar)',
  render: () => <Harness kind="projects" initialSelectedId="p-nnb" isTitlebar />,
  parameters: {
    docs: {
      description: {
        story:
          'Simple mode’s title bar project picker, matching main’s: "Recent" (the five most ' +
          'recently used projects, newest first), then "Your projects on this computer" ' +
          '(alphabetical), then "More projects…", which opens Home. There is no group-by menu. ' +
          'A search also reaches the projects on the Send/Receive server: matches are listed ' +
          'last, muted, under "On the server", each with a "Get" hint, and picking one runs ' +
          'Get. **Type "SW" or "QUE" to see server matches** ("SW" also matches a local ' +
          'project, so both kinds show). DE-NLV is hidden in Home, so it is not listed. ' +
          `${ALIGNMENT_WITH_HOME} ${COLLAPSIBLE_SECTIONS}`,
      },
    },
  },
};

export const ProjectsNothingOnThisComputer: Story = {
  name: 'Projects – nothing on this computer',
  render: () => <Harness kind="projects" catalog={NOTHING_LOCAL_CATALOG} isTitlebar />,
  parameters: {
    docs: {
      description: {
        story:
          'An empty install: no project on this computer. Rather than only an empty message, ' +
          'the picker lists the projects on the Send/Receive server under "On the server", ' +
          'muted, each with a Get hint, without the user having to search. Picking one runs ' +
          'Get; once it lands, it is a local project, and the remaining server projects are ' +
          `then reached by searching. ${ALIGNMENT_WITH_HOME}`,
      },
    },
  },
};

export const ResourcesSimple: Story = {
  name: 'Resources – Simple',
  render: () => <Harness kind="resources" interfaceMode="simple" currentProjectId="p-nnb" />,
  parameters: {
    docs: {
      description: {
        story:
          'The resource picker in Simple mode (Bible texts panel, text collection), opened from ' +
          'NNB. "Team resources: NNB (n)" comes first: the resources NNB’s team shares, with the ' +
          'same caption as the real Bible texts panel. Then "User resources (n)", every other ' +
          'installed resource, then "Projects (n)", the other projects on this computer. ' +
          `${COUNTED_HEADINGS} Type "Amh" to see "Available for download (n)", last: DBL ` +
          'resources with their download size, and server projects to Get. ' +
          `${MORE_RESOURCES} ${ALIGNMENT_WITH_HOME} ${COLLAPSIBLE_SECTIONS}`,
      },
    },
  },
};

export const ResourcesPower: Story = {
  name: 'Resources – Power',
  render: () => <Harness kind="resources" interfaceMode="power" currentProjectId="p-nnb" />,
  parameters: {
    docs: {
      description: {
        story:
          'The resource picker in Power mode, in the same order as Simple: resources first, ' +
          'then projects. "Used by projects (n)" lists resources some project’s team shares, ' +
          'whose tooltip names those projects; then "Your resources (n)"; then "Projects (n)". ' +
          `${COUNTED_HEADINGS} Searching adds the same "Available for download (n)" section as ` +
          `Simple, last. ${MORE_RESOURCES} ${ALIGNMENT_WITH_HOME} ${COLLAPSIBLE_SECTIONS}`,
      },
    },
  },
};

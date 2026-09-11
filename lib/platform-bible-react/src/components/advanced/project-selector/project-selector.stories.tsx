// Story sample data uses `as ScrollGroupId` to construct branded-number values from numeric
// literals — a common pattern for fixture data in stories. The lint rule's strict prohibition
// fits production code better than story fixtures.
/* eslint-disable no-type-assertion/no-type-assertion */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import type { ScrollGroupId } from 'platform-bible-utils';
import {
  ProjectSelector,
  defaultGroupings,
  makeBuiltInGroupings,
  type ProjectSelectorGrouping,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProjectPair,
  type ProjectSelectorProject,
} from '@/components/advanced/project-selector/project-selector.component';

const sampleProjects: ProjectSelectorProject[] = [
  {
    id: 'hpux',
    shortName: 'HPUX',
    fullName: 'Hawaii Pidgin UX Test Project',
  },
  {
    id: 'esvus16',
    shortName: 'ESVUS16',
    fullName: 'English Standard Version (US) 2016',
  },
  {
    id: 'esv16uk',
    shortName: 'ESV16UK',
    fullName: 'English Standard Version (UK) 2016',
  },
  {
    id: 'tp1',
    shortName: 'TP1',
    fullName: 'Test Project 1',
  },
  {
    id: 'heb-grk',
    shortName: 'HEB/GRK',
    fullName: 'Hebrew / Greek',
  },
  {
    id: 'schl1951',
    shortName: 'SCHL1951',
    fullName: 'Schlachter 1951',
  },
  {
    id: 'web',
    shortName: 'WEB',
    fullName: 'World English Bible',
  },
];

const sampleOpenTabs: ProjectSelectorOpenTab[] = [
  {
    projectId: 'esvus16',
    scrollGroupId: 0 as ScrollGroupId,
    scrollGroupScrRefLabel: 'GEN 1:1',
  },
  {
    projectId: 'esvus16',
    scrollGroupId: 1 as ScrollGroupId,
    scrollGroupScrRefLabel: 'MAT 3:16',
  },
  {
    projectId: 'hpux',
    scrollGroupId: 1 as ScrollGroupId,
    scrollGroupScrRefLabel: 'MAT 3:16',
  },
  {
    projectId: 'web',
    scrollGroupId: 2 as ScrollGroupId,
    scrollGroupScrRefLabel: 'JHN 1:1',
  },
];

const meta: Meta<typeof ProjectSelector> = {
  title: 'Advanced/Project Selector',
  component: ProjectSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="tw:w-[320px] tw:p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProjectSelector>;

// #region project (single)

export const SingleProject: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return (
      <ProjectSelector
        mode="project"
        projects={sampleProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        localizedStrings={{ buttonPlaceholder: 'Select a project', ariaLabel: 'Project' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. `availableGroupings` is omitted so no filter/grouping menu renders.',
      },
    },
  },
};

export const WideTriggerLabel: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return (
      <div className="tw:w-80">
        <ProjectSelector
          mode="project"
          projects={sampleProjects}
          openTabs={sampleOpenTabs}
          selection={{ projectId }}
          onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
          triggerLabelFormat="shortNameAndFullName"
          localizedStrings={{ buttonPlaceholder: 'Select a project', ariaLabel: 'Project' }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping `<div className="tw:w-80">` — the selector fills its container.',
      },
    },
  },
};

export const NarrowRailTrigger: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return (
      <div className="tw:w-14">
        <ProjectSelector
          mode="project"
          projects={sampleProjects}
          openTabs={sampleOpenTabs}
          selection={{ projectId }}
          onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
          localizedStrings={{ buttonPlaceholder: 'Select', ariaLabel: 'Project' }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Wrapper width is `tw:w-14` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts.",
      },
    },
  },
};

// #endregion

// #region project-multi

export const MultiProject: Story = {
  render: () => {
    const [pairs, setPairs] = useState<ProjectSelectorProjectPair[]>([
      { projectId: 'esvus16', scrollGroupId: 0 as ScrollGroupId },
      { projectId: 'esv16uk' },
    ]);
    const [openTabs, setOpenTabs] = useState(sampleOpenTabs);
    return (
      <ProjectSelector
        mode="project-multi"
        projects={sampleProjects}
        openTabs={openTabs}
        selection={{ pairs }}
        onChangeSelection={({ pairs: next }) => setPairs(next)}
        onOpenProjectInGroup={(projectId, scrollGroupId) => {
          setOpenTabs((tabs) =>
            tabs.some((t) => t.projectId === projectId && t.scrollGroupId === scrollGroupId)
              ? tabs
              : [...tabs, { projectId, scrollGroupId }],
          );
        }}
        localizedStrings={{ buttonPlaceholder: 'Select projects', ariaLabel: 'Projects' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select over `(projectId, scrollGroupId)` pairs with no explicit `availableGroupings`. The component auto-adds two groupings: `openTabs` (because `openTabs.length > 0`) and `selection` (because `mode === "project-multi"`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own `availableGroupings`.',
      },
    },
  },
};

// #endregion

// #region projectScrollGroup

export const ScrollGroupBinding: Story = {
  render: () => {
    const [selection, setSelection] = useState<{
      projectId?: string;
      scrollGroupId?: ScrollGroupId;
    }>({ projectId: 'esvus16', scrollGroupId: 1 as ScrollGroupId });
    const [openTabs, setOpenTabs] = useState<ProjectSelectorOpenTab[]>(sampleOpenTabs);

    return (
      <div className="tw:flex tw:flex-col tw:gap-2">
        <ProjectSelector
          mode="projectScrollGroup"
          projects={sampleProjects}
          openTabs={openTabs}
          selection={selection}
          onChangeSelection={setSelection}
          onOpenProjectInGroup={(projectId, scrollGroupId) => {
            setOpenTabs((tabs) =>
              tabs.some((t) => t.projectId === projectId && t.scrollGroupId === scrollGroupId)
                ? tabs
                : [...tabs, { projectId, scrollGroupId }],
            );
          }}
          localizedStrings={{
            buttonPlaceholder: 'Select a project + scroll group',
            ariaLabel: 'Project with scroll group',
          }}
        />
        <button
          type="button"
          className="tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs"
          onClick={() =>
            setOpenTabs((tabs) =>
              tabs.filter(
                (t) =>
                  !(
                    t.projectId === selection.projectId &&
                    t.scrollGroupId === selection.scrollGroupId
                  ),
              ),
            )
          }
        >
          Close tab for current selection (shows bound-but-closed synthetic row)
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection.',
      },
    },
  },
};

// #endregion

// #region flat list (no open tabs, no scroll groups)

const sampleProjectsAndResources: ProjectSelectorProject[] = [
  ...sampleProjects,
  { id: 'na28', shortName: 'NA28', fullName: 'Nestle-Aland 28th Edition (Greek NT)' },
  { id: 'bhs', shortName: 'BHS', fullName: 'Biblia Hebraica Stuttgartensia' },
  { id: 'lxx', shortName: 'LXX', fullName: 'Septuagint' },
];

export const SimpleFlatList: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return (
      <ProjectSelector
        mode="project"
        projects={sampleProjectsAndResources}
        openTabs={[]}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        localizedStrings={{
          buttonPlaceholder: 'Select a project or resource',
          ariaLabel: 'Project or resource',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-select with `mode="project"` and `openTabs={[]}`. No `availableGroupings` prop → no filter menu at all. No scroll-group chips render on any row. `partitionFlat` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.',
      },
    },
  },
};

// #endregion

// #region no projects

export const NoProjects: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return (
      <ProjectSelector
        mode="project"
        projects={[]}
        openTabs={[]}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        localizedStrings={{
          buttonPlaceholder: 'Select a project',
          commandEmptyMessage: 'No projects found',
          ariaLabel: 'Project',
        }}
      />
    );
  },
};

// #endregion

// #region disabled

export const Disabled: Story = {
  render: () => (
    <ProjectSelector
      mode="project"
      projects={sampleProjects}
      openTabs={sampleOpenTabs}
      selection={{ projectId: 'esvus16' }}
      onChangeSelection={() => {}}
      isDisabled
      localizedStrings={{ buttonPlaceholder: 'Select a project', ariaLabel: 'Project' }}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ProjectSelector
      mode="project"
      projects={[]}
      openTabs={[]}
      selection={{ projectId: undefined }}
      onChangeSelection={() => {}}
      isLoading
      localizedStrings={{ buttonPlaceholder: 'Select a project', ariaLabel: 'Project' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner). See I1.',
      },
    },
  },
};

// #endregion

// #region per-row disabled

export const PerRowDisabled: Story = {
  render: () => {
    const projectsWithDisabled: ProjectSelectorProject[] = sampleProjects.map((p) =>
      p.id === 'esv16uk' || p.id === 'tp1'
        ? { ...p, isDisabled: true, disabledReason: 'Read-only — cannot copy into this project' }
        : p,
    );
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return (
      <ProjectSelector
        mode="project"
        projects={projectsWithDisabled}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        localizedStrings={{ buttonPlaceholder: 'Pick a target project', ariaLabel: 'Project' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list.',
      },
    },
  },
};

// #endregion

// #region grouping options (built-ins + custom)

// Fixed base so `lastUsedAt` values are stable across renders (Storybook re-runs).
const NOW = 1_720_000_000_000;
const DAY = 24 * 60 * 60 * 1000;

// A richer fixture: every grouping key lives in `customData`. The built-in groupings read from
// the well-known keys `lastUsedAt` / `language` / `type` / `typeName`; the custom versification
// grouping below reads from `versificationId` / `versificationName`.
const typedProjects: ProjectSelectorProject[] = [
  {
    id: 'esvus16',
    shortName: 'ESVUS16',
    fullName: 'English Standard Version (US) 2016',
    customData: {
      language: 'English',
      type: 'Standard',
      typeName: 'Standard translation',
      lastUsedAt: NOW - 1 * DAY,
      versificationId: 'eng',
      versificationName: 'English versification',
    },
  },
  {
    id: 'tp1',
    shortName: 'TP1',
    fullName: 'Test Project 1',
    customData: {
      language: 'English',
      type: 'Standard',
      typeName: 'Standard translation',
      versificationId: 'eng',
      versificationName: 'English versification',
    },
  },
  {
    id: 'hpux-bt',
    shortName: 'HPUXBT',
    fullName: 'Hawaii Pidgin — Back Translation',
    customData: {
      language: 'English',
      type: 'BackTranslation',
      typeName: 'Back translation',
      lastUsedAt: NOW - 3 * DAY,
      versificationId: 'eng',
      versificationName: 'English versification',
    },
  },
  {
    id: 'sb-esv',
    shortName: 'ESVSB',
    fullName: 'ESV Study Bible',
    customData: {
      language: 'English',
      type: 'StudyBible',
      typeName: 'Study Bible',
      lastUsedAt: NOW - 10 * DAY,
      versificationId: 'eng',
      versificationName: 'English versification',
    },
  },
  {
    id: 'na28',
    shortName: 'NA28',
    fullName: 'Nestle-Aland 28th Edition',
    customData: {
      language: 'Greek',
      type: 'ScriptureResource',
      typeName: 'Scripture resource',
      lastUsedAt: NOW - 2 * DAY,
      versificationId: 'org',
      versificationName: 'Original versification',
    },
  },
  {
    id: 'bhs',
    shortName: 'BHS',
    fullName: 'Biblia Hebraica Stuttgartensia',
    customData: {
      language: 'Hebrew',
      type: 'ScriptureResource',
      typeName: 'Scripture resource',
      versificationId: 'org',
      versificationName: 'Original versification',
    },
  },
  {
    id: 'mhc',
    shortName: 'MHC',
    fullName: "Matthew Henry's Commentary",
    customData: {
      language: 'English',
      type: 'CommentaryResource',
      typeName: 'Commentary',
      lastUsedAt: NOW - 20 * DAY,
    },
  },
  {
    id: 'schl1951',
    shortName: 'SCHL1951',
    fullName: 'Schlachter 1951',
    customData: {
      language: 'German',
      type: 'Standard',
      typeName: 'Standard translation',
      versificationId: 'lxx',
      versificationName: 'Septuagint versification',
    },
  },
  {
    // Intentionally missing everything to exercise every "unknown" bucket.
    id: 'legacy',
    shortName: 'LEGACY',
    fullName: 'Legacy Uncategorized Project',
  },
];

export const AllBuiltInGroupings: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return (
      <ProjectSelector
        mode="project"
        projects={typedProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        availableGroupings={defaultGroupings}
        localizedStrings={{
          buttonPlaceholder: 'Select a project or resource',
          ariaLabel: 'Project or resource',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`availableGroupings={defaultGroupings}` passes all four built-ins (`openTabs`, `lastUsed`, `language`, `type`) with English labels. Open the funnel icon to switch. Each built-in reads its key from `project.customData` (see the `ProjectSelectorProject.customData` JSDoc for the well-known keys). Consumers wire localization by calling `makeBuiltInGroupings(strings)` instead.',
      },
    },
  },
};

export const CustomGroupingViaCustomData: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    const versificationGrouping: ProjectSelectorGrouping = useMemo(
      () => ({
        id: 'versification',
        label: 'Versification',
        getGroupKey: (p) =>
          typeof p.customData?.versificationId === 'string'
            ? p.customData.versificationId
            : undefined,
        getSectionHeading: (_key, projects) => {
          const first = projects.find((p) => typeof p.customData?.versificationName === 'string');
          const heading = first?.customData?.versificationName;
          return typeof heading === 'string' ? heading : _key;
        },
        unknownSectionHeading: 'Unknown versification',
        priorityKey: 'eng',
      }),
      [],
    );
    const groupings = useMemo<ProjectSelectorGrouping[]>(
      () => [...defaultGroupings, versificationGrouping],
      [versificationGrouping],
    );
    return (
      <ProjectSelector
        mode="project"
        projects={typedProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        availableGroupings={groupings}
        defaultGrouping="versification"
        localizedStrings={{
          buttonPlaceholder: 'Select a reference project',
          ariaLabel: 'Reference project',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A custom grouping — versification — appended to the built-ins. `getGroupKey` reads `p.customData?.versificationId`; `getSectionHeading` lifts the display name from `versificationName` on the first row in the bucket; `priorityKey: 'eng'` pins the caller's active versification to the top. `defaultGrouping=\"versification\"` opens with it active. Consumers can register any number of custom groupings this way.",
      },
    },
  },
};

export const LocalizedBuiltInGroupings: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    // In production, these strings would come from `useLocalizedStrings` against the platform's
    // `%projectSelector_*%` keys. Here we pass them as literals to show the wiring.
    const groupings = useMemo(
      () =>
        makeBuiltInGroupings({
          openTabsLabel: 'By open tabs',
          lastUsedLabel: 'By last used',
          languageLabel: 'By language',
          typeLabel: 'By kind',
          lastUsedRecentSectionHeading: 'Recently opened',
          lastUsedOtherSectionHeading: 'Everything else',
          languageUnknownSectionHeading: 'Language unknown',
          typeUnknownSectionHeading: 'Kind unknown',
        }),
      [],
    );
    return (
      <ProjectSelector
        mode="project"
        projects={typedProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        availableGroupings={groupings}
        localizedStrings={{ buttonPlaceholder: 'Select', ariaLabel: 'Project or resource' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`makeBuiltInGroupings(strings)` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same `%projectSelector_*%` keys through `useLocalizedStrings` and forwards them here.',
      },
    },
  },
};

export const SingleGroupingLock: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    const groupings = useMemo<ProjectSelectorGrouping[]>(() => [defaultGroupings[0]], []);
    return (
      <ProjectSelector
        mode="project"
        projects={typedProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        availableGroupings={groupings}
        localizedStrings={{ buttonPlaceholder: 'Select', ariaLabel: 'Project or resource' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`availableGroupings` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no `Show selected only` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally.',
      },
    },
  },
};

export const RestrictedGroupings: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    const languageGrouping = defaultGroupings.find((g) => g.id === 'language');
    const typeGrouping = defaultGroupings.find((g) => g.id === 'type');
    const groupings = useMemo<ProjectSelectorGrouping[]>(
      () => [languageGrouping!, typeGrouping!],
      [languageGrouping, typeGrouping],
    );
    return (
      <ProjectSelector
        mode="project"
        projects={typedProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        availableGroupings={groupings}
        defaultGrouping="type"
        localizedStrings={{ buttonPlaceholder: 'Select', ariaLabel: 'Project or resource' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`availableGroupings=[languageGrouping, typeGrouping]` narrows the filter menu to just those two. `defaultGrouping="type"` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).',
      },
    },
  },
};

// #endregion

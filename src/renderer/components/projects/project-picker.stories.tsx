import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, waitFor, within } from 'storybook/test';
import { Dialog } from 'platform-bible-react';
import ProjectPicker, {
  type ProjectItem,
  type ProjectPickerLocalizedStrings,
} from './project-picker.component';

const STRINGS: ProjectPickerLocalizedStrings = {
  '%projectPicker_title%': 'Project Picker',
  '%projectPicker_section_recent%': 'Recent',
  '%projectPicker_section_projects%': 'Your projects',
  '%projectPicker_search_placeholder%': 'Search projects…',
  '%projectPicker_no_results%': 'No results found',
  '%projectPicker_current_project_label%': 'Current project',
  '%projectPicker_readOnly_label%': 'Read-only',
};

const WEB: ProjectItem = {
  id: 'web',
  fullName: 'World English Bible',
  shortName: 'WEB',
  language: 'English',
};
const KJV: ProjectItem = {
  id: 'kjv',
  fullName: 'King James Version',
  shortName: 'KJV',
  language: 'English',
};
const RVR: ProjectItem = {
  id: 'rvr',
  fullName: 'Reina Valera Revisada 1960',
  shortName: 'RVR60',
  language: 'Spanish',
};
const NLT: ProjectItem = {
  id: 'nlt',
  fullName: 'New Living Translation',
  shortName: 'NLT',
  language: 'English',
};
const ESV: ProjectItem = {
  id: 'esv',
  fullName: 'English Standard Version',
  shortName: 'ESV',
  language: 'English',
};

const meta: Meta<typeof ProjectPicker> = {
  title: 'Advanced/ProjectPicker',
  component: ProjectPicker,
  tags: ['autodocs', 'test'],
  decorators: [
    (Story) => (
      <Dialog open modal={false}>
        <div className="tw:flex tw:h-[550px] tw:w-[700px] tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-xl">
          <Story />
        </div>
      </Dialog>
    ),
  ],
  args: {
    currentProject: WEB,
    recentProjects: [WEB, KJV],
    allProjects: [RVR, NLT, ESV],
    localizedStrings: STRINGS,
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onSelect: (projectId) => console.log('Selected:', projectId),
  },
};

export default meta;
type Story = StoryObj<typeof ProjectPicker>;

export const BothSections: Story = {};

export const RecentsOnly: Story = {
  args: {
    allProjects: [],
  },
};

export const AllProjectsOnly: Story = {
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: [WEB, KJV, RVR, NLT, ESV],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    recentProjects: [],
    allProjects: [],
  },
};

export const EmptySearchResult: Story = {
  args: {
    recentProjects: [],
    allProjects: [],
  },
};

const BSB_READ_ONLY: ProjectItem = {
  id: 'bsb',
  fullName: 'Berean Standard Bible',
  shortName: 'BSB',
  language: 'English',
  isEditable: false,
};
const LSG_READ_ONLY: ProjectItem = {
  id: 'lsg',
  fullName: 'Louis Segond 1910',
  shortName: 'LSG',
  language: 'French',
  isEditable: false,
};

/**
 * The read-only padlock has no visual surface of its own, and it shares a row with the
 * current-project check mark. Both glyph slots are rendered for every row whether or not they hold
 * a glyph, so that every short name starts at the same offset — a claim that is only checkable by
 * looking at rows which differ in what those slots contain.
 *
 * The current project here is itself read-only, so BSB carries both glyphs at once — the only
 * combination in which the two slots have to cooperate. LSG carries the padlock alone, WEB and KJV
 * neither. The check mark alone is what every other story in this file already shows.
 */
export const EditableAndReadOnlyRows: Story = {
  args: {
    currentProject: BSB_READ_ONLY,
    recentProjects: [BSB_READ_ONLY, WEB],
    allProjects: [KJV, LSG_READ_ONLY],
  },
};

const LONG_NAME_FULL_NAME =
  'An Unreasonably Long Translation Name That Has No Intention Of Fitting In This Column';

const LONG_NAME_PROJECT: ProjectItem = {
  id: 'long-proj',
  fullName: LONG_NAME_FULL_NAME,
  shortName: 'LONGSHORTNAME',
  language: 'A Language With An Unreasonably Long Display Name',
};

/**
 * The defect this pins: `overflow-y: auto` alone leaves the other axis computing from `visible` to
 * `auto`, so a row wider than the dialog earns a horizontal scrollbar nobody asked for — and the
 * columns that should have truncated disappear off the trailing edge instead.
 */
const expectNoHorizontalScroll = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const row = await canvas.findByText(LONG_NAME_FULL_NAME);

  const scroller = row.closest('.tw\\:overflow-y-auto');
  if (!scroller) throw new Error('project list scroll container not found');

  // `0 <= 0` would satisfy the comparison below without measuring anything — which is precisely
  // what happens under jsdom. Proving the container has a width first makes this self-validating.
  expect(scroller.clientWidth).toBeGreaterThan(0);
  expect(scroller.scrollWidth).toBeLessThanOrEqual(scroller.clientWidth);
};

/**
 * The row layout here is pinned elsewhere only by jsdom class-string assertions, and jsdom has no
 * layout: it reports `scrollWidth` and `clientWidth` as 0, so it cannot see a horizontal-overflow
 * defect at all. This is the browser-level half, matching `ResourcePickerDialog`'s own pair.
 *
 * Unlike that pair, this one does not run in CI: `npm test` runs the root Vitest project (jsdom,
 * `*.test.ts(x)` only) plus each workspace's own, and only `lib/platform-bible-react` declares a
 * Storybook browser project. So the assertion below runs when someone opens Storybook, not on every
 * push. It is still the only place this defect is observable at all — and if a Storybook browser
 * project is ever added for `src/**`, it starts running with no edit.
 */
export const LongNamesDoNotScrollHorizontally: Story = {
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: [LONG_NAME_PROJECT, WEB, KJV],
  },
  play: async ({ canvasElement }) => expectNoHorizontalScroll(canvasElement),
};

/**
 * The same guard at a deliberately narrow width. The defect needs both a long name AND a small
 * dialog, and either condition alone can pass: at the file-wide 700px the columns still have room
 * to absorb a name a narrower dialog would push past the edge. The inner wrapper constrains the
 * content inside the meta decorator's fixed-width shell, since a story-level decorator nests inside
 * that one rather than replacing it.
 */
/**
 * Invariant 4 of `.claude/rules/ux/picker-row-layout.md` has two halves, and jsdom can only see
 * one. A cell carries its full text as a native `title` exactly while that text is clipped: the
 * jsdom suite pins the "not clipped, so no label" half, because jsdom reports every cell as
 * unclipped. Deciding the other half needs real layout, which only this story has.
 *
 * Both rows in one story on purpose — a `title` that never appears and a `title` that always
 * appears each satisfy one of these assertions, and only the pair rules out both.
 */
export const RowHoverLabelsAppearOnlyWhenClipped: Story = {
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: [LONG_NAME_PROJECT, WEB],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The measurement runs in a layout effect and lands as state, so the attribute appears a
    // commit after the text does.
    await waitFor(async () =>
      expect(await canvas.findByText(LONG_NAME_FULL_NAME)).toHaveAttribute(
        'title',
        LONG_NAME_FULL_NAME,
      ),
    );

    // Comfortably inside the same column at this story's width, so it is the unclipped control.
    expect(await canvas.findByText(WEB.fullName)).not.toHaveAttribute('title');
  },
};

export const LongNamesDoNotScrollHorizontallyWhenNarrow: Story = {
  decorators: [
    (Story) => (
      <div className="tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col">
        <Story />
      </div>
    ),
  ],
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: [LONG_NAME_PROJECT, WEB, KJV],
  },
  play: async ({ canvasElement }) => expectNoHorizontalScroll(canvasElement),
};

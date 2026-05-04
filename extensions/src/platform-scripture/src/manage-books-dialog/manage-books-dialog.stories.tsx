/* eslint-disable -- Frozen from rebuild iteration 1: a minimal production stories surface that
 * exercises the new ViewListSelect layout. The story file's primary job is to render the
 * orchestrator with a stateful harness so reviewers can see all 5 sidebar sections and the 3
 * disabled future ones. We do NOT replicate the 6-variant exploration that the deleted
 * `lib/platform-bible-react/src/stories/advanced/manage-books-dialog.stories.tsx` contained — that
 * was design-exploration scaffolding. */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useMemo, useState } from 'react';
import type { ProjectSelectorProject } from 'platform-bible-react';
import {
  ManageBooksDialog,
  type ManageBooksDialogBookInfo,
  type ManageBooksDialogProject,
  type ManageBooksDialogProps,
  type MutationResult,
} from './manage-books-dialog.component';

// Sample data shared across stories.
const SAMPLE_PROJECTS: ManageBooksDialogProject[] = [
  { id: 'WEB', shortName: 'WEB', name: 'World English Bible' },
  { id: 'KJV', shortName: 'KJV', name: 'King James Version' },
  { id: 'NIV', shortName: 'NIV', name: 'New International Version' },
];

const SAMPLE_SIDEBAR_PROJECTS: ProjectSelectorProject[] = SAMPLE_PROJECTS.map((p) => ({
  id: p.id,
  shortName: p.shortName,
  fullName: p.name,
}));

const SAMPLE_BOOKS: Record<string, ManageBooksDialogBookInfo[]> = {
  WEB: [{ id: 'GEN' }, { id: 'EXO' }, { id: 'MAT' }, { id: 'MRK' }],
  KJV: [
    { id: 'GEN' },
    { id: 'EXO' },
    { id: 'LEV' },
    { id: 'MAT' },
    { id: 'MRK' },
    { id: 'LUK' },
    { id: 'JHN' },
  ],
  NIV: [{ id: 'GEN' }, { id: 'MAT' }],
};

/** A stateful harness so the dialog is fully interactive in Storybook. */
function StatefulHarness(props: Partial<ManageBooksDialogProps>) {
  const [projectId, setProjectId] = useState('WEB');
  const [open] = useState(true);

  const loadProjects = useCallback(() => SAMPLE_PROJECTS, []);
  const loadBooks = useCallback((pid: string) => SAMPLE_BOOKS[pid] ?? [], []);
  const loadVersification = useCallback(async () => '4', []);

  const noopMutation = useCallback(async (): Promise<MutationResult> => {
    return { success: true, warnings: [], errors: [] };
  }, []);

  const sidebarProjects = useMemo(() => SAMPLE_SIDEBAR_PROJECTS, []);

  return (
    <div className="tw-h-[600px] tw-w-full">
      <ManageBooksDialog
        open={open}
        projectId={projectId}
        onProjectIdChange={setProjectId}
        loadProjects={loadProjects}
        loadBooks={loadBooks}
        loadVersification={loadVersification}
        onOpenScriptureReferenceSettings={() => undefined}
        // onOpenProjectCanons / onOpenRegistry intentionally omitted — Decision 28
        // (2026-05-04) renders these as disabled stubs with "Not yet available" tooltips
        // when no handler is provided. Pass real handlers from a story to demonstrate
        // the enabled state.
        onCreateBooks={noopMutation}
        onDeleteBooks={noopMutation}
        onCopyBooks={noopMutation}
        onImportBooks={noopMutation}
        sidebarProjects={sidebarProjects}
        {...props}
      />
    </div>
  );
}

const meta: Meta<typeof StatefulHarness> = {
  title: 'Advanced/ManageBooksDialog',
  component: StatefulHarness,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof StatefulHarness>;

export const View: Story = { args: {} };

export const DisabledFutureSections: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The sidebar shows the 5 in-scope sections (Show / Create / Copy / Import / Delete) plus 3 disabled future sections (Progress tracking / Book Names / Introductions). Hover the disabled rows to see the "not yet available" tooltip.',
      },
    },
  },
};

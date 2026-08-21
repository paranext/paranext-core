import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { ProjectPlanEditor } from '@/components/advanced/project-plan-editor/project-plan-editor.component';
import { SelectBasePlan } from '@/components/advanced/project-plan-editor/select-base-plan.component';
import { CopyTaskEffortDialog } from '@/components/advanced/project-plan-editor/copy-task-effort-dialog.component';
import { UndoPlanUpdateBanner } from '@/components/advanced/project-plan-editor/undo-plan-update-banner.component';
import {
  mockBasePlanCatalog,
  mockEmptyPlan,
  mockPlan,
  mockViewOptions,
} from '@/components/advanced/project-plan-editor/mock-data';
import type {
  EditorSelection,
  ProjectPlanData,
  ProjectPlanEditorViewContext,
} from '@/components/advanced/project-plan-editor/types';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { Button } from '@/components/shadcn-ui/button';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const defaultContext: ProjectPlanEditorViewContext = {
  isAdministrator: true,
  projectName: 'Demo Translation Project',
  basePlanName: 'SIL Compact',
  hasNewPlanVersionAvailable: false,
};

interface ControlledEditorProps {
  initialPlan?: ProjectPlanData;
  initialSelection?: EditorSelection;
  isAdmin?: boolean;
  banners?: ComponentProps<typeof ProjectPlanEditor>['banners'];
  initialActiveTab?: 'stages-tasks' | 'checks' | 'localization';
}

function ControlledEditor({
  initialPlan = mockPlan,
  initialSelection,
  isAdmin = true,
  banners,
  initialActiveTab,
}: ControlledEditorProps) {
  const [plan, setPlan] = useState<ProjectPlanData>(initialPlan);
  return (
    <div className="tw:p-4">
      <ProjectPlanEditor
        // `key` lets stories re-mount with a different starting tab.
        key={initialActiveTab}
        plan={plan}
        basePlanCatalog={mockBasePlanCatalog}
        viewOptions={mockViewOptions}
        context={{ ...defaultContext, isAdministrator: isAdmin }}
        isAdmin={isAdmin}
        initialSelection={initialSelection}
        banners={banners}
        onPlanChange={setPlan}
        onSubmit={() => sonner.success('Plan submitted (storybook only — no persistence).')}
        onCancel={() => sonner('Cancel pressed.')}
        onSelectBasePlan={(selection) =>
          sonner(`Selected base plan: ${selection.basePlanId} v${selection.version}`)
        }
      />
      <Sonner position="top-center" />
    </div>
  );
}

const meta: Meta<typeof ProjectPlanEditor> = {
  title: 'Advanced/ProjectPlanEditor',
  component: ProjectPlanEditor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ProjectPlanEditor>;

export const Default: Story = {
  render: () => (
    <ControlledEditor initialSelection={{ kind: 'task', stageIndex: 0, taskIndex: 0 }} />
  ),
};

export const ReadOnlyNonAdmin: Story = {
  render: () => (
    <ControlledEditor
      isAdmin={false}
      initialSelection={{ kind: 'task', stageIndex: 0, taskIndex: 0 }}
    />
  ),
};

export const EmptyPlan: Story = {
  render: () => <ControlledEditor initialPlan={mockEmptyPlan} />,
};

export const ChecksTab: Story = {
  render: () => (
    <div className="tw:p-4">
      <p className="tw:mb-3 tw:text-sm tw:text-muted-foreground">
        The &ldquo;Markers&rdquo; row demonstrates a Notify-only select forced to
        &ldquo;Never&rdquo; because its Required-in-stage is the first stage; the disabled tooltip
        names the controlling field.
      </p>
      <ControlledEditor initialSelection={{ kind: 'task', stageIndex: 0, taskIndex: 0 }} />
    </div>
  ),
};

export const LocalizationTab: Story = {
  render: () => (
    <div className="tw:p-4">
      <p className="tw:mb-3 tw:text-sm tw:text-muted-foreground">
        The &ldquo;Initial Drafting&rdquo; task in Spanish shows &ldquo;Needs review&rdquo; because
        the source name was updated after the translation was created. Other untranslated cells show
        &ldquo;Missing&rdquo;.
      </p>
      <ControlledEditor initialActiveTab="localization" />
    </div>
  ),
};

export const MarkdownDescription: Story = {
  render: () => (
    <ControlledEditor initialSelection={{ kind: 'task', stageIndex: 0, taskIndex: 0 }} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Select the "Initial Drafting" task, switch the description toggle to Preview to see ' +
          'rendered markdown.',
      },
    },
  },
};

export const DragAndDropReorder: Story = {
  render: () => (
    <div className="tw:p-4">
      <p className="tw:mb-3 tw:text-sm tw:text-muted-foreground">
        Reorder tasks/stages by clicking and dragging the grip icon, by using the up/down arrows on
        each row, or by tabbing to the grip and pressing <kbd>Space</kbd> to grab, arrow keys to
        move, and <kbd>Space</kbd> again to drop.
      </p>
      <ControlledEditor />
    </div>
  ),
};

export const SelectBasePlanPicker: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [selection, setSelection] = useState<
      { basePlanId: string; version: string } | undefined
    >();
    return (
      <div className="tw:p-4">
        <div className="tw:mb-3 tw:flex tw:items-center tw:gap-3">
          <Button onClick={() => setOpen(true)}>Open picker</Button>
          {selection && (
            <span className="tw:text-sm tw:text-muted-foreground">
              Last picked: {selection.basePlanId} v{selection.version}
            </span>
          )}
        </div>
        <SelectBasePlan
          open={open}
          catalog={mockBasePlanCatalog}
          onOpenChange={setOpen}
          onConfirm={(picked) => {
            setSelection(picked);
            setOpen(false);
          }}
        />
      </div>
    );
  },
};

export const CopyEffortsDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="tw:p-4">
        <Button onClick={() => setOpen(true)}>Open copy efforts</Button>
        <CopyTaskEffortDialog
          open={open}
          sourcePlans={[{ id: 'current', displayName: 'This plan', plan: mockPlan }]}
          currentTaskId={mockPlan.stages[0].tasks[0].id}
          onOpenChange={setOpen}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const WorkflowJUndoBanner: Story = {
  render: () => {
    const [progressMade, setProgressMade] = useState(true);
    return (
      <ControlledEditor
        banners={{
          undoUpdate: (
            <UndoPlanUpdateBanner
              basePlanName="SIL Compact"
              progressMadeSinceUpgrade={progressMade}
              onClose={() => setProgressMade(false)}
              onViewPrevious={() => undefined}
              onUndo={() => undefined}
            />
          ),
        }}
      />
    );
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import {
  ProjectPlanDialogHierarchical,
  type ProjectPlan,
} from '@/components/advanced/project-plan-dialog';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import {
  CUSTOM_PROJECT_PLAN,
  EMPTY_PROJECT_PLAN,
  SAMPLE_ORG_PLANS,
  SAMPLE_PROJECT_PLAN,
} from './sample-data';

const meta: Meta<typeof ProjectPlanDialogHierarchical> = {
  title: 'Advanced/Project Plan Dialog - Single Editable Hierarchy',
  component: ProjectPlanDialogHierarchical,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Variation of the Project Plan dialog that drops the two-pane (list + detail) split. ' +
          'Each stage/task is an inline-expandable row in a single hierarchy. ' +
          'Task effort lives in a popover triggered from the row, not a separate sub-tab. ' +
          'Drag handles render but drag-and-drop is not wired yet — keyboard ▲/▼ buttons stand in. ' +
          'Implements recommendation #1 in project-plan-editor-ux-notes.md.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProjectPlanDialogHierarchical>;

function Harness({
  initialPlan,
  defaultTab,
}: {
  initialPlan: ProjectPlan;
  defaultTab?: 'stages-tasks' | 'checks';
}) {
  const [open, setOpen] = useState(true);
  const [plan, setPlan] = useState(initialPlan);

  return (
    <div className="tw:p-4">
      <Button onClick={() => setOpen(true)}>Open Project Plan dialog</Button>
      <pre className="tw:mt-3 tw:max-h-40 tw:overflow-auto tw:rounded tw:border tw:bg-muted tw:p-2 tw:text-xs">
        {JSON.stringify(
          {
            name: plan.name,
            basePlanRef: plan.basePlanRef,
            stages: plan.stages.length,
            checks: plan.checks.length,
          },
          undefined,
          2,
        )}
      </pre>
      <ProjectPlanDialogHierarchical
        open={open}
        onOpenChange={setOpen}
        projectName="Demo Project"
        plan={plan}
        orgProvidedPlans={SAMPLE_ORG_PLANS}
        onSubmit={(p) => {
          // Storybook harness logs the submitted plan so reviewers can inspect it in the addon panel.
          // eslint-disable-next-line no-console
          console.log('onSubmit', p);
          setPlan(p);
        }}
        onCancel={() => {
          // Storybook harness logs the cancel event for parity with onSubmit.
          // eslint-disable-next-line no-console
          console.log('onCancel');
        }}
        defaultTab={defaultTab}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Harness initialPlan={SAMPLE_PROJECT_PLAN} />,
};

export const EmptyPlan: Story = {
  render: () => <Harness initialPlan={EMPTY_PROJECT_PLAN} />,
};

export const CustomPlanNotFromTemplate: Story = {
  render: () => <Harness initialPlan={CUSTOM_PROJECT_PLAN} />,
};

export const ChecksTabActive: Story = {
  render: () => <Harness initialPlan={SAMPLE_PROJECT_PLAN} defaultTab="checks" />,
};

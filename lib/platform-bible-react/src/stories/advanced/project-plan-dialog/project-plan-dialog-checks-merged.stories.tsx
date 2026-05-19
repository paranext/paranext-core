import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import {
  ProjectPlanDialogChecksMerged,
  type ProjectPlan,
} from '@/components/advanced/project-plan-dialog';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import {
  CUSTOM_PROJECT_PLAN,
  EMPTY_PROJECT_PLAN,
  SAMPLE_ORG_PLANS,
  SAMPLE_PROJECT_PLAN,
} from './sample-data';

const meta: Meta<typeof ProjectPlanDialogChecksMerged> = {
  title: 'Advanced/Project Plan Dialog - Checks merged',
  component: ProjectPlanDialogChecksMerged,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Variation of the Project Plan dialog that eliminates the separate Checks tab. ' +
          'Each stage exposes its own check configuration inline ("Required to leave this stage" / ' +
          '"Notify only in this stage") under the same expand-row UI as the hierarchical variant. ' +
          'Implements recommendation #3 in project-plan-editor-ux-notes.md.',
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

type Story = StoryObj<typeof ProjectPlanDialogChecksMerged>;

function Harness({ initialPlan }: { initialPlan: ProjectPlan }) {
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
          null,
          2,
        )}
      </pre>
      <ProjectPlanDialogChecksMerged
        open={open}
        onOpenChange={setOpen}
        projectName="Demo Project"
        plan={plan}
        orgProvidedPlans={SAMPLE_ORG_PLANS}
        onSubmit={(p) => {
          // eslint-disable-next-line no-console
          console.log('onSubmit', p);
          setPlan(p);
        }}
        onCancel={() => {
          // eslint-disable-next-line no-console
          console.log('onCancel');
        }}
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

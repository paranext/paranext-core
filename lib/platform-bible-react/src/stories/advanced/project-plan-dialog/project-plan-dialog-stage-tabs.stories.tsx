import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import {
  ProjectPlanDialogStageTabs,
  type ProjectPlan,
} from '@/components/advanced/project-plan-dialog';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import {
  CUSTOM_PROJECT_PLAN,
  EMPTY_PROJECT_PLAN,
  SAMPLE_ORG_PLANS,
  SAMPLE_PROJECT_PLAN,
} from './sample-data';

const meta: Meta<typeof ProjectPlanDialogStageTabs> = {
  title: 'Advanced/Project Plan Dialog - Stage tabs',
  component: ProjectPlanDialogStageTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Variation of the "Checks merged" Project Plan dialog where each expanded stage exposes ' +
          'its Description, Checks, and Tasks as tabs inside the stage accordion. Collapsing a stage ' +
          'hides everything — description, checks, and the task list — unlike the merged variant, ' +
          'where the task list stays visible beneath the stage header.',
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

type Story = StoryObj<typeof ProjectPlanDialogStageTabs>;

function Harness({
  initialPlan,
  stagesVariant,
}: {
  initialPlan: ProjectPlan;
  stagesVariant?: 'tabs' | 'global';
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
          null,
          2,
        )}
      </pre>
      <ProjectPlanDialogStageTabs
        open={open}
        onOpenChange={setOpen}
        projectName="Demo Project"
        plan={plan}
        orgProvidedPlans={SAMPLE_ORG_PLANS}
        stagesVariant={stagesVariant}
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

/**
 * Global section toggle: the Description / Checks / Tasks switch lives above the stage list and
 * controls every stage at once. Stage and task names are edited inline in their row headers, so
 * there is no separate Name field in the Description section.
 */
export const GlobalSectionToggle: Story = {
  render: () => <Harness initialPlan={SAMPLE_PROJECT_PLAN} stagesVariant="global" />,
};

export const GlobalSectionToggleEmptyPlan: Story = {
  render: () => <Harness initialPlan={EMPTY_PROJECT_PLAN} stagesVariant="global" />,
};

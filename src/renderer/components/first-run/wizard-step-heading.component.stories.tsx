import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { WizardStepHeading } from './wizard-step-heading.component';
import { WizardStepForm } from './wizard-step-form.component';

const meta: Meta<typeof WizardStepHeading> = {
  title: 'First Run/WizardStepHeading',
  component: WizardStepHeading,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof WizardStepHeading>;

/** The step heading on its own — an `<h2>` that sits under the wizard shell's `<h1>`. */
export const Default: Story = {
  args: { children: 'Internet & connectivity' },
};

/**
 * Rendered by {@link WizardStepForm} for steps that use that layout, so both paths share one
 * definition of the treatment. Steps that own their layout (because they rely on the shell's footer
 * rather than a primary button) render `WizardStepHeading` directly instead.
 */
export const InsideWizardStepForm: Story = {
  render: () => (
    <WizardStepForm
      heading="Tell us who you are"
      primaryButton={
        <button type="button" className="tw:rounded tw:border tw:px-3 tw:py-1 tw:text-sm">
          Save and restart
        </button>
      }
    >
      <p className="tw:text-sm tw:text-muted-foreground">
        Step body content sits below the heading.
      </p>
    </WizardStepForm>
  ),
};

/**
 * The weights the wizard actually ships today. Four of the five steps use this component
 * (`font-semibold`) — identify, sync consent and internet settings via `WizardStepForm` or
 * directly, plus language. Only `SyncProgressStep` still hand-rolls `font-medium`, in two places,
 * one per render branch. Those two sit inside progress/complete states that deserve their own
 * visual pass rather than a drive-by weight change, so they are left to PT-4402; this story exists
 * so the remaining mismatch is visible rather than buried in a TSDoc note.
 */
export const WeightMismatchToday: Story = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <div>
        <p className="tw:text-xs tw:text-muted-foreground">
          WizardStepHeading — identify, sync consent, internet settings, language
        </p>
        <WizardStepHeading>Internet &amp; connectivity</WizardStepHeading>
      </div>
      <div>
        <p className="tw:text-xs tw:text-muted-foreground">
          Hand-rolled font-medium — sync progress only
        </p>
        <h2 className="tw:text-base tw:font-medium">Syncing your projects</h2>
      </div>
    </div>
  ),
};

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

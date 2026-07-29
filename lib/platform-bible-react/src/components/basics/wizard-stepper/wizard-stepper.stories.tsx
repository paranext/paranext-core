import type { Meta, StoryObj } from '@storybook/react-vite';
import { WizardStepper } from './wizard-stepper.component';

const meta: Meta<typeof WizardStepper> = {
  title: 'Basics/WizardStepper',
  component: WizardStepper,
  tags: ['autodocs', 'test'],
  args: { totalSteps: 4 },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Step1of4: Story = { args: { currentStep: 1 } };
export const Step2of4: Story = { args: { currentStep: 2 } };
export const Step3of4: Story = { args: { currentStep: 3 } };
export const Step4of4: Story = { args: { currentStep: 4 } };
/** Verify Arabic-Indic numerals: circles should show ١ ٢ ٣ ٤ */
export const ArabicNumerals: Story = { args: { currentStep: 2, locale: 'ar' } };
/** CurrentStep > totalSteps: clamped to last step — step 4 renders as active, steps 1-3 as complete. */
export const OverflowClamped: Story = { args: { currentStep: 99 } };
/** CurrentStep < 1: clamped to step 1 — step 1 renders as active, no steps shown as complete. */
export const UnderflowClamped: Story = { args: { currentStep: 0 } };

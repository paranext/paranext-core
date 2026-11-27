import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Wizard, WizardProps } from './wizard.component';

/**
 * Three steps with very different content heights. The wizard stays as tall as the tallest step
 * (the second), so the footer buttons do not move when stepping between them.
 */
function DemoWizard(props: Partial<WizardProps>) {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  return (
    <div className="tw:max-w-md tw:rounded-md tw:border tw:p-8">
      <Wizard
        title="Set up your project"
        onFinish={() => setIsFinished(true)}
        onCancel={() => setIsFinished(false)}
        steps={[
          {
            id: 'name',
            title: 'Name your project',
            canAdvance: name.trim() !== '',
            content: (
              <div className="tw:flex tw:flex-col tw:gap-2">
                <Label htmlFor="wizard-story-name">Project name</Label>
                <Input
                  id="wizard-story-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            ),
          },
          {
            id: 'about',
            title: 'What happens next',
            content: (
              <div className="tw:flex tw:flex-col tw:gap-2 tw:text-sm tw:text-muted-foreground">
                <p>
                  The project is created on this computer first. Nothing is shared until you send
                  and receive it.
                </p>
                <p>
                  You can change the project&apos;s name, language and versification later in the
                  project properties.
                </p>
                <p>
                  Books are added one at a time. Start with the book you plan to translate first and
                  add the others when you are ready.
                </p>
                <p>
                  Each team member gets their own copy of the project, and changes are merged every
                  time they send and receive.
                </p>
              </div>
            ),
          },
          {
            id: 'confirm',
            title: 'Confirm',
            canAdvance: agreed,
            content: (
              <div className="tw:flex tw:items-center tw:gap-2">
                <Checkbox
                  id="wizard-story-agree"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                />
                <Label htmlFor="wizard-story-agree">Create the project</Label>
              </div>
            ),
          },
        ]}
        {...props}
      />
      {isFinished && <p className="tw:mt-4 tw:text-sm">Finished.</p>}
    </div>
  );
}

const meta: Meta<typeof Wizard> = {
  title: 'Basics/Wizard',
  component: Wizard,
  tags: ['autodocs', 'test'],
  render: (args) => <DemoWizard {...args} />,
};
export default meta;

type Story = StoryObj<typeof meta>;

/** Step through the steps: the footer stays in place even though the steps differ in height. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wizard = canvasElement.querySelector<HTMLElement>('[data-wizard-panels]');
    const heightOnFirstStep = wizard?.getBoundingClientRect().height;

    await userEvent.type(canvas.getByLabelText('Project name'), 'My project');
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(canvas.getByRole('heading', { name: 'What happens next' })).toBeVisible();
    await expect(wizard?.getBoundingClientRect().height).toBe(heightOnFirstStep);

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(canvas.getByRole('button', { name: 'Finish' })).toBeDisabled();
    await expect(wizard?.getBoundingClientRect().height).toBe(heightOnFirstStep);
  },
};

/** Opens on the last step. */
export const LastStep: Story = { args: { initialStepIndex: 2 } };

/** While `isBusy`, every button is disabled and Finish shows a spinner. */
export const Busy: Story = { args: { initialStepIndex: 2, isBusy: true } };

/** Localized buttons and step indicator, with Arabic-Indic numerals. */
export const Localized: Story = {
  args: {
    locale: 'ar',
    localizedStrings: {
      '%wizard_button_back%': 'Atrás',
      '%wizard_button_next%': 'Siguiente',
      '%wizard_button_finish%': 'Finalizar',
      '%wizard_stepIndicator%': 'Paso {stepNumber} de {stepCount}',
      '%general_cancel%': 'Cancelar',
    },
  },
};

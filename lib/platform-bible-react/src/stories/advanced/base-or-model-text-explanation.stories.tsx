import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseOrModelTextExplanation } from '@/components/advanced/base-or-model-text-explanation/base-or-model-text-explanation.component';

const meta: Meta<typeof BaseOrModelTextExplanation> = {
  title: 'Advanced/BaseOrModelTextExplanation',
  component: BaseOrModelTextExplanation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="tw:max-w-xs tw:text-sm tw:text-muted-foreground">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof BaseOrModelTextExplanation>;

/**
 * With no strings passed, every paragraph shows its English fallback — what a consumer sees while
 * its strings are still loading. Consumers pass the strings resolved from
 * `BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS`, which the platform-scripture-editor extension
 * ships.
 */
export const Default: Story = {};

/**
 * Start-aligned and normally wrapped, as the Model Text panel shows it inside its centered empty
 * state.
 */
export const StartAligned: Story = {
  args: { className: 'tw:text-start tw:text-wrap' },
};

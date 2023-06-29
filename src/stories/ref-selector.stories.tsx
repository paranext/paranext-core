import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { RefSelector, ScrRefSelectorProps } from 'papi-components';
import 'papi-components/dist/style.css';
import { ReactElement } from 'react';

type Ref = { book: number; chapter: number; verse: number };

function RefSelectorDecorator(
  Story: (update?: { args: Partial<ScrRefSelectorProps> }) => ReactElement,
) {
  const [args, updateArgs] = useArgs();

  const handleSubmit = (ref: Ref) => {
    updateArgs({ scrRef: ref });
  };

  return (
    <Story
      args={{
        ...args,
        handleSubmit,
      }}
    />
  );
}

const meta: Meta<typeof RefSelector> = {
  title: 'Scripture/RefSelector',
  component: RefSelector,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [RefSelectorDecorator],
};
export default meta;

type Story = StoryObj<typeof RefSelector>;

export const Default: Story = {
  args: {
    scrRef: { book: 5, chapter: 4, verse: 3 },
  },
};

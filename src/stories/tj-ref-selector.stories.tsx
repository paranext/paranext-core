import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import TJRefSelector, {
  ScrRefSelectorProps,
} from '@renderer/components/papi-components/tj-ref-selector.component';
import { ReactElement } from 'react';

type Ref = { book: number; chapter: number; verse: number };

function TJRefSelectorDecorator(
  Story: (update?: { args: Partial<ScrRefSelectorProps> }) => ReactElement,
) {
  const [args, updateArgs] = useArgs();

  const submitHandler = (ref: Ref) => {
    updateArgs({ scrRef: ref });
  };

  return (
    <Story
      args={{
        ...args,
        handleSubmit: submitHandler,
      }}
    />
  );
}

const meta: Meta<typeof TJRefSelector> = {
  title: 'Scripture/TJRefSelector',
  component: TJRefSelector,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [TJRefSelectorDecorator],
};
export default meta;

type Story = StoryObj<typeof TJRefSelector>;

export const Default: Story = {
  args: {
    scrRef: { book: 1, chapter: 1, verse: 1 },
    handleSubmit: (ref) => {
      console.log(ref);
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { RefSelector, ScrRefSelectorProps, ScriptureReference } from 'papi-components';
import { ReactElement } from 'react';

function RefSelectorDecorator(
  Story: (update?: { args: Partial<ScrRefSelectorProps> }) => ReactElement,
) {
  const [args, updateArgs] = useArgs();

  const handleSubmit = (scrRef: ScriptureReference) => {
    updateArgs({ scrRef });
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
  title: 'Platform/RefSelector',
  component: RefSelector,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [RefSelectorDecorator],
};
export default meta;

type Story = StoryObj<typeof RefSelector>;

const defaultScrRef: ScriptureReference = { bookNum: 5, chapterNum: 4, verseNum: 3 };

export const Default: Story = {
  args: {
    scrRef: defaultScrRef,
  },
};

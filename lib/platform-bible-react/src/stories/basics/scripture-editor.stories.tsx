import type { Meta, StoryObj } from '@storybook/react';
import { ScriptureEditor } from '../../components/basics/scripture-editor/scripture-editor.component';

const meta: Meta<typeof ScriptureEditor> = {
  title: 'Basics/ScriptureEditor',
  component: ScriptureEditor,
  tags: ['autodocs'],
  argTypes: {
    // Add argTypes here as needed for props
  },
};
export default meta;

type Story = StoryObj<typeof ScriptureEditor>;

export const Default: Story = {
  args: {
    // Provide default props if needed
  },
};

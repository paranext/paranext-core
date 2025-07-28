import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScriptureEditor } from '../../components/basics/scripture-editor/scripture-editor.component';
import { USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';


const meta: Meta<typeof ScriptureEditor> = {
  title: 'Basics/ScriptureEditor',
  component: ScriptureEditor,
  tags: ['autodocs'],
  argTypes: {
    // Add argTypes here as needed for props
    editorRef: {
      control: 'object',
      description: 'Reference to the editor instance',
      defaultValue: null,
    },
    defaultUsj: {
      control: 'object',
      description: 'Default USJ object to initialize the editor with',
      defaultValue: {
        type: USJ_TYPE,
        version: USJ_VERSION,
        content: [''],
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ScriptureEditor>;

export const Default: Story = {
  args: {
    defaultUsj: {
      type: USJ_TYPE,
      version: USJ_VERSION,
      content: ['Won\'t you be my neighbor?'],
    },

    // Provide default props if needed
  },
};

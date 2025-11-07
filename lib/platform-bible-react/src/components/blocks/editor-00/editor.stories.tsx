import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SerializedEditorState } from 'lexical';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { Editor } from './editor';
import { htmlToEditorState, editorStateToHtml } from './editor-utils';

const meta: Meta<typeof Editor> = {
  title: 'Blocks/Editor',
  component: Editor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-2xl tw-bg-background tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Enter your comment here...',
  },
};

/**
 * This story demonstrates the Editor component being populated with HTML content that has been
 * converted to the editor's internal format. This shows the full round-trip conversion: HTML →
 * Editor State → (user edits) → Editor State → HTML
 */
export const WithHtmlContent: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editorState, setEditorState] = useState<SerializedEditorState>(
      htmlToEditorState(
        '<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p>',
      ),
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [htmlOutput, setHtmlOutput] = useState<string>('');

    const handleChange = (newState: SerializedEditorState) => {
      setEditorState(newState);
      setHtmlOutput(editorStateToHtml(newState));
    };

    return (
      <div className="tw-space-y-4">
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-semibold">Editor with Pre-populated HTML Content</h3>
          <p className="tw-text-sm tw-text-muted-foreground">
            The editor below is populated with HTML that has been converted to editor format. You
            can edit it, and see the HTML output below.
          </p>
        </div>
        <div className="tw-rounded-md tw-border tw-border-border">
          <Editor
            editorSerializedState={editorState}
            onSerializedChange={handleChange}
            placeholder="Type something..."
          />
        </div>
        <div className="tw-space-y-2">
          <h4 className="tw-text-sm tw-font-semibold">HTML Output:</h4>
          <pre className="tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs">
            {htmlOutput || '(Edit the content above to see HTML output)'}
          </pre>
        </div>
        <div className="tw-space-y-2">
          <h4 className="tw-text-sm tw-font-semibold">Original HTML Input:</h4>
          <pre className="tw-overflow-x-auto tw-rounded-md tw-border tw-border-border tw-bg-muted tw-p-3 tw-text-xs">
            {
              '<p>This is a note with <b>bold text</b> and <i>italic text</i>.</p><p>It also has <u>underlined</u> and <s>strikethrough</s> text.</p>'
            }
          </pre>
        </div>
      </div>
    );
  },
};

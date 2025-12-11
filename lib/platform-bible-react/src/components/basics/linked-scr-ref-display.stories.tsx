import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { LinkedScrRefDisplay } from './linked-scr-ref-display.component';

const meta: Meta<typeof LinkedScrRefDisplay> = {
  title: 'Basics/ScrRefButton',
  component: LinkedScrRefDisplay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A button component for displaying scripture references. It supports both single verse and verse range formats, and can optionally include additional text.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-lg tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startRef: { book: 'John', chapterNum: 3, verseNum: 16 },
    scriptureTextPart: 'love',
  },
};

export const Range: Story = {
  args: {
    startRef: { book: 'John', chapterNum: 3, verseNum: 16 },
    endRef: { book: 'John', chapterNum: 3, verseNum: 18 },
    scriptureTextPart:
      "For God so loved the world that he gave his one and only Son so that everyone who believes in him shall not perish but have eternal life. For God did not send his Son into the world to condemn the world, but to save the world through him. Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.",
  },
};

export const Long: Story = {
  args: {
    startRef: { book: 'Scotland', chapterNum: -1, verseNum: -1 },
    scriptureTextPart: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
  },
};

export const OnClick: Story = {
  args: {
    startRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    scriptureTextPart: 'If text is provided, this is part of the link',
    onClick: () => {
      // allowed in storybook
      // eslint-disable-next-line no-alert
      alert('Scripture reference button clicked!');
    },
  },
};

export const LayoutWithOtherComponents: Story = {
  args: {
    startRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    scriptureTextPart: 'If text is provided, this is part of the link',
    onClick: () => {
      // allowed in storybook
      // eslint-disable-next-line no-alert
      alert('Scripture reference button clicked!');
    },
    className: 'tw-border',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-flex tw-max-w-lg tw-p-4">
          <Story />
          <div className="">Hello</div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export const LayoutWithOtherComponents2: Story = {
  args: {
    startRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    scriptureTextPart:
      'If text is provided, verylonglonglonglonglonglonglonglonglonglong this is part of the link',
    onClick: () => {
      // allowed in storybook
      // eslint-disable-next-line no-alert
      alert('Scripture reference button clicked!');
    },
    className: 'tw-border tw-h-fit tw-whitespace-normal',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-flex tw-max-w-lg tw-p-4">
          <Story />
          <div className="">Hello</div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export const LayoutWithOtherComponents3: Story = {
  args: {
    startRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    scriptureTextPart:
      'If text is provided, verylonglonglonglonglonglonglonglonglonglong this is part of the link',
    onClick: () => {
      // allowed in storybook
      // eslint-disable-next-line no-alert
      alert('Scripture reference button clicked!');
    },
    className: 'tw-h-fit tw-whitespace-normal',
    includeInLink: 'allText',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-flex tw-max-w-lg tw-p-4">
          <Story />
          <div className="">Hello</div>
        </div>
      </ThemeProvider>
    ),
  ],
};

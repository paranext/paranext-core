import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { History } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';

function DirectionGuide() {
  return (
    <>
      <p>
        Direction is passed to the tabs using <code>dir&#61;&#39;ltr&#39;</code> or{' '}
        <code>dir&#61;&#39;rtl&#39;</code>
      </p>
      <p>
        You can easily try out your component / layout using the direction toggle in the upper right
        corner.
      </p>
      <div className="tw-flex tw-items-center tw-gap-2">
        Try it: change direction by clicking the blue arrow icon at the top toolbar
      </div>
      <br />
      <p>
        One of the things to keep in mind is to use logical margin/padding definitions instead of
        &#39;left&#39; or &#39;right&#39;. See{' '}
        <a
          href="https://tailwindcss.com/docs/margin#using-logical-properties"
          className="tw-text-blue-600 hover:tw-underline"
          target="_blank"
          rel="noreferrer"
        >
          https://tailwindcss.com/docs/margin#using-logical-properties
        </a>
      </p>
      <table>
        <tbody>
          <tr>
            <td className="tw-text-destructive">
              Bad example: <code>tw-ml-2</code>, <code>tw-mr-2</code>
            </td>
            <td className="tw-text-destructive">
              <div className="tw-flex">
                <Button className="tw-mr-2">1</Button>
                <Button className="tw-mr-2">2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Good example: <code>tw-ms-2</code>, <code>tw-me-2</code>
            </td>
            <td>
              <div className="tw-flex">
                <Button className="tw-me-2">1</Button>
                <Button className="tw-me-2">2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="tw-text-destructive">
              Bad example: <code>tw-space-x-2</code>
            </td>
            <td>
              <div className="tw-flex tw-space-x-2">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Good example: <code>tw-gap-2</code>
            </td>
            <td>
              <div className="tw-flex tw-gap-2">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="tw-py-2 tw-font-bold">Other properties</h2>
      <p className="tw-text-destructive">
        Bad: <code>tw-text-right</code>
      </p>
      <p>
        Good: <code>tw-text-end</code>
      </p>
      <h2 className="tw-py-2 tw-font-bold">Another bad example</h2>
      <p>In left-to-right the icon should appear at the left</p>
      <div className="tw-flex">
        <div className="tw-relative">
          <Input
            value=""
            placeholder="placeholder text should clip before the icon"
            className="tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-border-black tw-bg-white tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-text-slate-900 tw-shadow-none tw-outline-none"
            aria-label="Bad example input with placeholder clipping"
          />
          <History className="tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-gray-500" />
        </div>
      </div>
      <div className="tw-flex">
        <div className="tw-relative">
          <Input
            value="text should clip before the icon"
            className="tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-border-black tw-bg-white tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-text-slate-900 tw-shadow-none tw-outline-none"
            aria-label="Bad example input with text clipping"
          />
          <History className="tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-gray-500" />
        </div>
      </div>
    </>
  );
}

const meta: Meta<typeof DirectionGuide> = {
  title: 'Guides/Direction',
  component: DirectionGuide,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-4xl tw-p-6">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DirectionGuide>;

export const Default: Story = {
  render: () => {
    return <DirectionGuide />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive guide on handling text direction (LTR/RTL) in components, including best practices for logical properties, spacing, and layout.',
      },
    },
  },
};

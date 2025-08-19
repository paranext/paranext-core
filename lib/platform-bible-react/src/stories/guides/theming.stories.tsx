import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ThemeButton } from '@/storybook/theme-toggle.component';

function ThemingGuide() {
  return (
    <>
      <p>By default we are sticking to use the existing shadcn styles.</p>
      <p>
        The components we install from shadcn already come with these styles. That means have a look
        which properties the shadcn components expect (so that they will set their style themselves)
        and use them accordingly.
      </p>
      <div className="tw-flex tw-items-center tw-gap-2">
        Try it: change theme
        <ThemeButton />
      </div>
      <p>
        Shadcn already provides theming, defining the current theme values in{' '}
        <code>styling.css</code>. You can easily test if your component adheres to the concept (and
        so can be themed) by using the dark mode toggle (upper right corner).
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              Bad example<div className="tw-text-xs">manual styles, unable to be themed</div>
            </td>
            <td>
              <input
                value="this has manual colors"
                aria-label="Bad example input with manual colors"
                readOnly
                className="tw-full tw-file:border-0 tw-col-span-2 tw-flex tw-h-8 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="tw-py-2 tw-font-bold">Overwriting styles</h2>
      <p>
        Try to not overwrite styles (colors). In case you need to, use Tailwind classes to apply
        color variables, in the same way that shadcn does it. Shadcn defines the colors that you can
        find on the next page.
      </p>
      <br />
      <p>
        To overwrite styles use Tailwind css classes like{' '}
        <code>className=&quot;tw-bg-muted&quot;</code> on a header-like component and{' '}
        <code>className=&quot;tw-text-muted-foreground&quot;</code> for text on this component.
      </p>
      <p>
        You can also use shades of these colors with{' '}
        <code>className=&quot;tw-bg-muted/50&quot;</code>, but try to stay consistent with how
        shadcn applies these styles in a very deliberate, rare choice.
      </p>
      <br />
      <p>
        Descriptions on which colors should be used in which context are still to be added to this
        preview app. If you are unsure, check out how{' '}
        <a
          href="https://ui.shadcn.com/"
          className="tw-text-blue-600 hover:tw-underline"
          target="_blank"
          rel="noreferrer"
        >
          shadcn
        </a>{' '}
        uses a similar thing or talk to the{' '}
        <a
          href="https://discord.com/channels/1064938364597436416/1082713526780575845"
          className="tw-text-blue-600 hover:tw-underline"
          target="_blank"
          rel="noreferrer"
        >
          Paratext UX team
        </a>
        .
      </p>
    </>
  );
}

const meta: Meta<typeof ThemingGuide> = {
  title: 'Guides/Theming',
  component: ThemingGuide,
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

type Story = StoryObj<typeof ThemingGuide>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive guide on theming components using shadcn design system, including best practices for color usage, theme switching, and CSS variable management.',
      },
    },
  },
};

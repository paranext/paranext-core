import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider, useTheme } from '@/storybook/theme-provider.component';
import { Input } from '@/components/shadcn-ui/input';

function createColorCells(color: string, invert: boolean = false) {
  const colorString = getComputedStyle(document.documentElement).getPropertyValue(`--${color}`);
  return (
    <>
      {invert ? '' : <td>{color}</td>}
      {createPreviewCell(
        color,
        colorString.split(', ')[2] === '0%' ? 'white' : 'inherit',
        colorString,
      )}
      {invert ? <td>{color}</td> : ''}
    </>
  );
}

function createPreviewCell(color: string, foreground: string, text: string) {
  return (
    <td>
      <Input
        className={`tw-bg-${color} tw-border-2 tw-text-${foreground}`}
        value={text}
        aria-label={`${color} color preview showing value ${text}`}
        readOnly
      />
    </td>
  );
}

function ThemeColorDisplay() {
  return (
    <>
      <p>
        Color variables are defined in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
          <br />
          <br />
        </a>
      </p>
      {useTheme().theme.includes('paratext') ? (
        ''
      ) : (
        <p>
          The currently selected theme is matching the Shadcn Slate theme, whereas ui.shadcn.com
          uses the Zinc theme (with a deviating --ring 240 5% 64.9%). So be aware of the slight
          differences of grayish / blueish tones.
          <br />
          <br />
        </p>
      )}
      <p>Following colors are defined by the current theme:</p>
      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th>Name</th>
            <th>Background</th>
            <th>Foreground</th>
            <th>Variable</th>
          </tr>
        </thead>
        <tbody>
          {['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card'].map(
            (color) => {
              return (
                <tr key={color}>
                  {createPreviewCell(color, `${color}-foreground`, color)}
                  {createColorCells(color)}
                  {createColorCells(`${color}-foreground`, true)}
                </tr>
              );
            },
          )}
          <tr>
            {createPreviewCell('background', 'foreground', 'background')}
            {createColorCells('background')}
            {createColorCells('foreground', true)}
          </tr>
          {['border', 'input', 'ring'].map((color) => {
            return (
              <tr key={color}>
                <td className="tw-text-center">—</td>
                {createColorCells(color)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const meta: Meta<typeof ThemeColorDisplay> = {
  title: 'Guides/Theme Colors',
  component: ThemeColorDisplay,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-6xl tw-p-6">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemeColorDisplay>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A visual display of all available theme colors and their CSS variables, showing how they appear in the current theme context.',
      },
    },
  },
};

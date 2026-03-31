import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Input } from '@/components/shadcn-ui/input';

const TOKEN_NAMES = [
  'primary',
  'secondary',
  'destructive',
  'muted',
  'accent',
  'popover',
  'card',
] as const;

function hslVar(token: string) {
  return `hsl(var(--${token}))`;
}

function useRootCssVar(name: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    const read = () => {
      setValue(getComputedStyle(root).getPropertyValue(`--${name}`).trim());
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [name]);

  return value;
}

function TokenSwatch({ token, foregroundToken }: { token: string; foregroundToken: string }) {
  const rawBg = useRootCssVar(token);
  const rawFg = useRootCssVar(foregroundToken);

  return (
    <Input
      style={{
        backgroundColor: hslVar(token),
        color: hslVar(foregroundToken),
        borderColor: hslVar('border'),
      }}
      className="tw-border-2"
      value={`bg: ${rawBg} | fg: ${rawFg}`}
      aria-label={`${token} and ${foregroundToken} preview`}
      readOnly
    />
  );
}

type ThemeColorDisplayProps = {
  /**
   * From Storybook `globals.theme` — passed via meta `render` so Docs/canvas do not call preview
   * hooks inside the component
   */
  activeThemeId?: string;
};

function ThemeColorDisplay({ activeThemeId = 'platform-light' }: ThemeColorDisplayProps) {
  const isParatext = activeThemeId === 'paratext-light' || activeThemeId === 'paratext-dark';

  return (
    <>
      <p>
        Color variables come from the active Storybook toolbar theme (see <strong>Theme</strong> in
        the toolbar). They are defined in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        . The same values are mirrored for the running app in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json"
        >
          themes.data.json
        </a>
        .
      </p>
      {!isParatext ? (
        <p>
          The currently selected theme is the Platform (Shadcn Slate) pair, whereas ui.shadcn.com
          uses the Zinc theme (with a deviating <code>--ring</code>). Expect slight differences in
          gray/blue tones.
        </p>
      ) : undefined}
      <p>Colors for the active theme:</p>
      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th>Name</th>
            <th>Variables</th>
          </tr>
        </thead>
        <tbody>
          {TOKEN_NAMES.map((color) => (
            <tr key={color}>
              <td>
                <TokenSwatch token={color} foregroundToken={`${color}-foreground`} />
              </td>
              <td>{color}</td>
              <td>
                <code className="tw-text-xs">
                  --{color}, --{color}-foreground
                </code>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <TokenSwatch token="background" foregroundToken="foreground" />
            </td>
            <td>background</td>
            <td>
              <code className="tw-text-xs">--background, --foreground</code>
            </td>
          </tr>
          {(['border', 'input', 'ring'] as const).map((color) => (
            <tr key={color}>
              <td className="tw-text-center">—</td>
              <td>{color}</td>
              <td>
                <code className="tw-text-xs">--{color}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const meta: Meta<typeof ThemeColorDisplay> = {
  title: 'Guides/Theme Colors',
  component: ThemeColorDisplay,
  tags: ['autodocs'],
  render: (_, context) => {
    const themeGlobal = context.globals.theme;
    const activeThemeId =
      typeof themeGlobal === 'string' && themeGlobal.length > 0 ? themeGlobal : 'platform-light';
    return <ThemeColorDisplay activeThemeId={activeThemeId} />;
  },
  decorators: [
    (Story) => (
      <div className="tw-min-h-[200px] tw-max-w-6xl tw-bg-background tw-p-6 tw-text-foreground">
        <Story />
      </div>
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
          'Theme colors for the current Storybook toolbar theme. Switch themes from the toolbar to see variables update.',
      },
    },
  },
};

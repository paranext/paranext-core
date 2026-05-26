import type { Meta, StoryObj } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';
import { useEffect, useState } from 'react';
import { Input } from '@/components/shadcn-ui/input';

import {
  PLATFORM_BIBLE_THEME_CHANNEL,
  isStorybookThemeState,
  isParatextStorybookThemeState,
  readStoredStorybookThemeState,
  type StorybookThemeState,
} from '../../../.storybook/theme-decorator';

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

function useActiveStorybookThemeState(): StorybookThemeState {
  const [state, setState] = useState<StorybookThemeState>(() => readStoredStorybookThemeState());

  useEffect(() => {
    const ch = addons.getChannel();
    const onTheme = (payload: unknown) => {
      if (isStorybookThemeState(payload)) setState(payload);
    };
    ch.on(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
    return () => ch.off(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
  }, []);

  return state;
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
      className="tw:border-2"
      value={`bg: ${rawBg} | fg: ${rawFg}`}
      aria-label={`${token} and ${foregroundToken} preview`}
      readOnly
    />
  );
}

function ThemeColorDisplay() {
  const active = useActiveStorybookThemeState();
  const isParatext = isParatextStorybookThemeState(active);
  const isShadcn = active.family === 'shadcn-neutral';
  const isPlatform = active.family === 'platform';

  return (
    <>
      <p>
        Color variables reflect the toolbar state: <strong>Color scheme</strong> (light / dark /
        system) and <strong>Theme</strong> (Shadcn Neutral, Platform, Paratext), persisted as{' '}
        <code>{'{ family, colorScheme }'}</code>. Token values are defined in{' '}
        <a
          className="tw:text-blue-600 tw:hover:underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        . The running app mirrors Platform and Paratext palettes in{' '}
        <a
          className="tw:text-blue-600 tw:hover:underline"
          href="https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json"
        >
          themes.data.json
        </a>
        ; the Shadcn Neutral preview classes are Storybook-only.
      </p>
      <br />
      {isShadcn && (
        <>
          <p>
            <strong>Shadcn Neutral</strong> uses the stock Neutral preset (HSL converted from the
            OKLCH scaffold in the shadcn docs) under <code>.theme-shadcn-neutral</code> for
            side-by-side comparison with Platform (which tweaks some tokens on <code>:root</code> /{' '}
            <code>.dark</code>).
          </p>
          <br />
        </>
      )}
      {isPlatform && (
        <>
          <p>
            <strong>Platform</strong> uses Slate-family HSLs with product tweaks vs stock Shadcn
            Neutral in <code>.theme-shadcn-neutral</code>: different <strong>popover</strong> and{' '}
            <strong>secondary/muted/accent</strong> neutrals, a different <strong>sidebar-*</strong>{' '}
            block in light mode, and in dark mode different <strong>border/input</strong> and more
            muted <strong>sidebar</strong> labels. See Guidelines / Theming for a concise
            comparison.
          </p>
          <br />
        </>
      )}
      {isParatext && (
        <>
          <p>
            <strong>Paratext</strong> palettes are defined in <code>themes.data.json</code> and{' '}
            <code>index.css</code>.
          </p>
          <br />
        </>
      )}
      <p>Colors for the active theme:</p>
      <br />
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
                <code className="tw:text-xs">
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
              <code className="tw:text-xs">--background, --foreground</code>
            </td>
          </tr>
          {(['border', 'input', 'ring'] as const).map((color) => (
            <tr key={color}>
              <td className="tw:text-center">—</td>
              <td>{color}</td>
              <td>
                <code className="tw:text-xs">--{color}</code>
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
  decorators: [
    (Story) => (
      <div className="tw:min-h-[200px] tw:max-w-6xl tw:bg-background tw:p-6 tw:text-foreground">
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
          'Live CSS variables for the toolbar Color scheme + Theme selection (see Guides / Theming for architecture).',
      },
    },
  },
};

import { Button } from '@/components/shadcn-ui/button';

export function ThemingGuideBody() {
  return (
    <div className="tw-min-h-[200px] tw-max-w-4xl tw-bg-background tw-p-6 tw-text-foreground">
      <p>
        Use the <strong>Theme</strong> control in the Storybook toolbar to switch palettes. Choices
        map to classes on <code>document.documentElement</code> in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        :
      </p>
      <ul className="tw-list-inside tw-list-disc tw-space-y-1">
        <li>
          <strong>platform-light</strong> / <strong>platform-dark</strong> — Platform.Bible default
          (Shadcn Slate) light and dark.
        </li>
        <li>
          <strong>paratext-light</strong> / <strong>paratext-dark</strong> — Paratext palettes.
        </li>
        <li>
          <strong>system</strong> — follows <code>prefers-color-scheme</code> for the Platform pair
          only (not Paratext).
        </li>
      </ul>
      <p>
        The running application reads the same HSL tokens from{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json"
        >
          themes.data.json
        </a>
        ; keep that file and <code>index.css</code> in sync when changing theme colors.
      </p>
      <p>
        By default, components use shadcn-style tokens (<code>tw-bg-background</code>,{' '}
        <code>tw-text-foreground</code>, etc.). Prefer those over hard-coded colors so stories track
        the toolbar theme.
      </p>
      <h2 className="tw-py-2 tw-font-bold">Overwriting styles</h2>
      <p>
        Try not to overwrite styles (colors). When you need to, use Tailwind classes that reference
        CSS variables, as shadcn does.
      </p>
      <p>
        For example:{' '}
        <code className="tw-rounded tw-bg-muted tw-px-1">className=&quot;tw-bg-muted&quot;</code>{' '}
        and{' '}
        <code className="tw-rounded tw-bg-muted tw-px-1">
          className=&quot;tw-text-muted-foreground&quot;
        </code>
        .
      </p>
      <h2 className="tw-py-2 tw-font-bold">Per-story theme override</h2>
      <p>
        To lock a story to one theme (for example to show a dark-mode edge case), set{' '}
        <code className="tw-rounded tw-bg-muted tw-px-1">
          globals: {'{'} theme: &apos;paratext-dark&apos; {'}'}
        </code>{' '}
        on the story or meta. See Storybook’s{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/storybookjs/storybook/blob/next/code/addons/themes/README.md"
          target="_blank"
          rel="noreferrer"
        >
          @storybook/addon-themes
        </a>{' '}
        readme.
      </p>
      <h2 className="tw-py-2 tw-font-bold">Adding a new theme</h2>
      <ol className="tw-list-inside tw-list-decimal tw-space-y-1">
        <li>
          Add a CSS class in <code>index.css</code> with <code>--background</code>,{' '}
          <code>--foreground</code>, and the other variables (see existing blocks).
        </li>
        <li>
          Update <code>themes.data.json</code> in paranext-core if the app should expose the theme.
        </li>
        <li>
          Register the theme id in <code>.storybook/theme-constants.ts</code> (
          <code>STORYBOOK_THEME_IDS</code>) and map classes in{' '}
          <code>.storybook/theme-decorator.ts</code> so it appears in the toolbar.
        </li>
      </ol>
      <h2 className="tw-py-2 tw-font-bold">Core Storybook (PT-3492)</h2>
      <p>
        When Extension UI is added to the core repo Storybook, reuse the same{' '}
        <code>@storybook/addon-themes</code> setup and <code>theme-decorator</code> pattern so theme
        switching is consistent across both Storybooks.
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
      <p className="tw-pt-4">
        If you are unsure about color usage, see how{' '}
        <a
          href="https://ui.shadcn.com/"
          className="tw-text-blue-600 hover:tw-underline"
          target="_blank"
          rel="noreferrer"
        >
          shadcn
        </a>{' '}
        applies tokens or talk to the{' '}
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
    </div>
  );
}

const MATRIX_THEMES = [
  {
    id: 'platform-light',
    label: 'Platform light',
    className: 'pr-twp theme-platform-light',
  },
  { id: 'platform-dark', label: 'Platform dark', className: 'pr-twp dark' },
  { id: 'paratext-light', label: 'Paratext light', className: 'pr-twp paratext-light' },
  { id: 'paratext-dark', label: 'Paratext dark', className: 'pr-twp paratext-dark' },
] as const;

/**
 * Side-by-side preview: each column uses the same token classes with theme CSS variables scoped to
 * a wrapper (no dependency on the global toolbar theme).
 */
export function ThemeMatrixDemo() {
  return (
    <div className="tw-min-h-[200px] tw-max-w-6xl tw-space-y-4 tw-bg-background tw-p-6 tw-text-foreground">
      <p className="tw-text-sm tw-text-muted-foreground">
        Each panel uses the same components with theme variables applied on a local wrapper. Compare
        with the global toolbar theme on other stories.
      </p>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 xl:tw-grid-cols-4">
        {MATRIX_THEMES.map(({ id, label, className }) => (
          <div
            key={id}
            className={`tw-flex tw-flex-col tw-rounded-lg tw-border tw-border-border tw-p-4 ${className} tw-bg-background tw-text-foreground`}
          >
            <p className="tw-mb-2 tw-font-semibold">{label}</p>
            <Button type="button" variant="default" className="tw-mb-2">
              Primary
            </Button>
            <Button type="button" variant="secondary">
              Secondary
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Button } from '@/components/shadcn-ui/button';

export function ThemingGuideBody() {
  return (
    <div className="tw-min-h-[200px] tw-max-w-4xl tw-bg-white tw-p-6 tw-text-slate-900">
      {/*
        Fixed light surface on purpose: long-form prose and link colors stay readable in the Docs
        iframe regardless of the Storybook toolbar theme. Use other stories or Guides / Theme Colors
        to verify token behavior against the active theme.
      */}
      <p>
        A comprehensive guide on theming components using the shadcn design system, including best
        practices for color usage, theme switching, and CSS variable management.
      </p>
      <p>
        By default we stick to the existing shadcn styles. Components we install from shadcn already
        come with styles that expect design tokens—see which properties and class patterns they use
        so they can set their own appearance and stay themeable.
      </p>
      <p>
        Token values for Storybook and the app live in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        . For a live table of variables for the toolbar-selected theme, see{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>
        .
      </p>
      <p>
        Use the <strong>Color scheme</strong> (light, dark, or system) and <strong>Theme</strong>{' '}
        (Shadcn Neutral, Platform, or Paratext) controls in the Storybook toolbar to switch
        palettes. Selection is stored as <code>{'{ family, colorScheme }'}</code> (when{' '}
        <strong>system</strong> is chosen, light vs dark follows <code>prefers-color-scheme</code>
        ). Classes on <code>document.documentElement</code> come from{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        . The effective row is always one of the six legacy composite ids below (also used for{' '}
        <code>parameters.themes.themeOverride</code> strings):
      </p>
      <ul className="tw-list-inside tw-list-disc tw-space-y-1">
        <li>
          <strong>shadcn-light</strong> / <strong>shadcn-dark</strong> — Stock Shadcn Neutral (HSL,
          from the docs OKLCH scaffold) in <code>.theme-shadcn-neutral</code>; Storybook preview
          only (not in <code>themes.data.json</code>).
        </li>
        <li>
          <strong>platform-light</strong> / <strong>platform-dark</strong> — Platform.Bible default
          (Slate-based) light and dark; matches the running app.
        </li>
        <li>
          <strong>paratext-light</strong> / <strong>paratext-dark</strong> — Paratext palettes.
        </li>
      </ul>
      <h2 className="tw-py-2 tw-font-bold">Platform vs Shadcn Neutral vs Paratext</h2>
      <p className="tw-text-sm tw-text-slate-600">
        CSS variables live in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        : Platform light is <code>:root</code> / <code>.theme-platform-light</code>; Platform dark
        is <code>.dark</code>; stock Shadcn Neutral is <code>.theme-shadcn-neutral</code> (and{' '}
        <code>.dark.theme-shadcn-neutral</code>); Paratext is <code>.paratext-light</code> /{' '}
        <code>.paratext-dark</code>. The running app loads Platform and Paratext HSLs from{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json"
        >
          themes.data.json
        </a>{' '}
        (default Platform family key and <code>paratext</code>); Shadcn Neutral is Storybook-only.
      </p>
      <p>
        <strong>Platform</strong> default (<code>:root</code> / <code>.dark</code>) is{' '}
        <strong>Slate-based</strong> (blue-gray neutrals) but <strong>not identical</strong> to the
        stock Shadcn Neutral preset under <code>.theme-shadcn-neutral</code> in{' '}
        <code>index.css</code>. Use the toolbar’s <strong>Shadcn Neutral</strong> options when you
        need the closest match to{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://ui.shadcn.com/docs/theming#neutral"
          target="_blank"
          rel="noreferrer"
        >
          shadcn/ui docs
        </a>{' '}
        for development, UX review, or debugging. Pick <strong>Shadcn Neutral</strong> under Theme
        and set Color scheme to light or dark (or system).
      </p>
      <p className="tw-text-sm tw-text-slate-600">
        <strong>Light:</strong> Platform differs from stock Neutral on <strong>popover</strong>{' '}
        (tinted vs pure white), <strong>secondary / muted / accent</strong> neutrals (Platform{' '}
        <code>210 50% 95%</code> vs Neutral <code>0 0% 96.1%</code>), and the full{' '}
        <strong>sidebar-*</strong> token block (Platform stays Slate-aligned; Neutral follows the
        docs scaffold).
      </p>
      <p className="tw-text-sm tw-text-slate-600">
        <strong>Dark:</strong> Platform uses solid <strong>border</strong> / <strong>input</strong>{' '}
        grays; stock Neutral uses semi-transparent white on dark. Sidebar styling also differs
        (including Neutral’s violet <strong>sidebar-primary</strong> in the docs preset).
      </p>
      <p className="tw-text-sm tw-text-slate-600">
        <strong>Paratext</strong> is a separate palette (Caffeine-inspired in tweakcn), not vanilla
        Shadcn; it is not “mostly Slate.”
      </p>
      <h2 className="tw-py-2 tw-font-bold">Try it: change theme</h2>
      <p>
        Shadcn-style theming is driven by CSS variables in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
        </a>
        . In this Storybook, use the <strong>Color scheme</strong> and <strong>Theme</strong>{' '}
        toolbar controls (not a separate preview-app toggle) to switch palettes and confirm your
        story respects tokens—foreground, background, borders, and components that use the same
        variables should track the selection.
      </p>
      <h2 className="tw-py-2 tw-font-bold">In the running application</h2>
      <p>
        The Paranext renderer loads built-in theme definitions from{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json"
        >
          themes.data.json
        </a>{' '}
        (Platform and Paratext families) and applies the same HSL tokens as <code>index.css</code>{' '}
        for those (see{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/src/renderer/services/theme.service-host.ts"
        >
          theme.service-host.ts
        </a>
        ). Keep <code>index.css</code> and <code>themes.data.json</code> in sync when you change
        theme colors. End-user theme selection is handled by the platform theme service, not
        Storybook.
      </p>
      <h2 className="tw-py-2 tw-font-bold">Bad example</h2>
      <p className="tw-text-sm tw-text-slate-500">
        Manual colors on primitives do not follow the active theme.
      </p>
      <table className="tw-mb-6">
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
                className="tw-full tw-file:border-0 tw-col-span-2 tw-flex tw-h-8 tw-rounded-md tw-border tw-border-slate-300 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-text-slate-900 tw-ring-offset-white file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-slate-400 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-400 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="tw-py-2 tw-font-bold">Overwriting styles</h2>
      <p>
        Try not to overwrite styles (colors). When you need to, use Tailwind classes that apply the
        same color variables shadcn uses, in the same way shadcn does. You can see token names on{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>{' '}
        and in the{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://ui.shadcn.com/docs/theming"
          target="_blank"
          rel="noreferrer"
        >
          shadcn theming docs
        </a>
        .
      </p>
      <p>
        For example, use{' '}
        <code className="tw-rounded tw-bg-slate-100 tw-px-1 tw-text-slate-800">
          className=&quot;tw-bg-muted&quot;
        </code>{' '}
        on a header-like surface and{' '}
        <code className="tw-rounded tw-bg-slate-100 tw-px-1 tw-text-slate-800">
          className=&quot;tw-text-muted-foreground&quot;
        </code>{' '}
        for supporting text. You can use shades such as <code>tw-bg-muted/50</code> sparingly, in
        line with how shadcn applies them.
      </p>
      <h2 className="tw-py-2 tw-font-bold">Per-story theme override</h2>
      <p>
        To lock a story to one palette (for example to show a dark-mode edge case), set a{' '}
        <strong>legacy composite id</strong> such as{' '}
        <code className="tw-rounded tw-bg-slate-100 tw-px-1 tw-text-slate-800">
          parameters: {'{'} themes: {'{'} themeOverride: &apos;paratext-dark&apos; {'}'} {'}'}
        </code>{' '}
        on the story or meta. You can also pass{' '}
        <code className="tw-rounded tw-bg-slate-100 tw-px-1 tw-text-slate-800">
          themeOverride: {'{'} family: &apos;paratext&apos;, colorScheme: &apos;system&apos; {'}'}
        </code>{' '}
        for system light/dark. The preview decorator reads this in{' '}
        <code>.storybook/theme-decorator.ts</code> (toolbar changes use <code>localStorage</code>{' '}
        and a channel event instead of <code>globals.theme</code>).
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
          Register the composite id in <code>.storybook/theme-constants.ts</code> (
          <code>STORYBOOK_THEME_IDS</code> and <code>STORYBOOK_THEME_LABELS</code>), map classes in{' '}
          <code>.storybook/theme-apply.ts</code> (<code>CLASS_MAP</code>,{' '}
          <code>compositeThemeIdFromFamilyAndEffective</code>,{' '}
          <code>themeStateFromLegacyThemeId</code>, and <code>ALL_THEME_CLASSES</code>). Toolbar
          family and color-scheme options live in <code>STORYBOOK_THEME_FAMILIES</code> /{' '}
          <code>STORYBOOK_COLOR_SCHEMES</code> in the same file; <code>.storybook/manager.tsx</code>{' '}
          reads those lists for the two toolbar tools.
        </li>
      </ol>
      <p className="tw-pt-2">
        Descriptions of which colors to use in which context are still being expanded. If you are
        unsure, see how{' '}
        <a
          href="https://ui.shadcn.com/"
          className="tw-text-blue-600 hover:tw-underline"
          target="_blank"
          rel="noreferrer"
        >
          shadcn
        </a>{' '}
        handles a similar pattern or talk to the{' '}
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

/** Theme class only on the outer shell so `index.css` variables apply before `pr-twp` / utilities. */
const MATRIX_THEMES = [
  { id: 'shadcn-light', label: 'Shadcn Neutral (light)', themeShell: 'theme-shadcn-neutral' },
  { id: 'shadcn-dark', label: 'Shadcn Neutral (dark)', themeShell: 'dark theme-shadcn-neutral' },
  { id: 'platform-light', label: 'Platform light', themeShell: 'theme-platform-light' },
  { id: 'platform-dark', label: 'Platform dark', themeShell: 'dark' },
  { id: 'paratext-light', label: 'Paratext light', themeShell: 'paratext-light' },
  { id: 'paratext-dark', label: 'Paratext dark', themeShell: 'paratext-dark' },
] as const;

/**
 * Side-by-side preview: each column applies a local theme shell class from `MATRIX_THEMES` so
 * tokens are scoped to that wrapper (stories that follow the toolbar get classes on `html` via
 * localStorage and the preview channel instead). The matrix does not read toolbar storage; it is
 * for visual comparison only.
 */
export function ThemeMatrixDemo() {
  return (
    <div className="tw-not-prose tw-min-h-[200px] tw-max-w-6xl tw-space-y-4 tw-bg-slate-50 tw-p-6 tw-text-slate-900">
      <p className="tw-text-sm tw-text-slate-500">
        Each panel uses the same components with theme variables applied on a local wrapper. Compare
        with the global toolbar themes on other stories. For a larger token table, see{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>
        .
      </p>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 xl:tw-grid-cols-3 2xl:tw-grid-cols-6">
        {MATRIX_THEMES.map(({ id, label, themeShell }) => (
          <div key={id} className={themeShell}>
            <div className="pr-twp tw-flex tw-flex-col tw-rounded-lg tw-border tw-border-border tw-bg-background tw-p-4 tw-text-foreground">
              {/*
                Important: Docs iframe can inherit a global `color` onto `p` that does not re-resolve
                `--foreground` from this nested theme shell. Force token-based text color.
              */}
              <p className="tw-mb-2 tw-font-semibold !tw-text-foreground">{label}</p>
              <Button type="button" variant="default" className="tw-mb-2">
                Primary
              </Button>
              <Button type="button" variant="secondary">
                Secondary
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

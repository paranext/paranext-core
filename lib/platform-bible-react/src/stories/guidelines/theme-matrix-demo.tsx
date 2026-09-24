import { Button } from '@/components/shadcn-ui/button';

/** Theme class only on the outer shell so `index.css` variables apply before `pr-twp` / utilities. */
const MATRIX_THEMES = [
  { id: 'shadcn-light', label: 'Shadcn Neutral (light)', themeShell: 'theme-shadcn-neutral' },
  { id: 'shadcn-dark', label: 'Shadcn Neutral (dark)', themeShell: 'dark theme-shadcn-neutral' },
  { id: 'platform-light', label: 'Platform light', themeShell: 'light' },
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
    <div className="light tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-muted tw:p-6">
      <p className="tw:text-sm tw:text-muted-foreground">
        Each panel uses the same components with theme variables applied on a local wrapper. Compare
        with the global toolbar themes on other stories. For a larger token table, see{' '}
        <a
          className="tw:text-primary tw:hover:underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>
        .
      </p>
      <div className="tw:grid tw:grid-flow-row tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2 tw:xl:auto-cols-fr tw:xl:grid-flow-col tw:xl:grid-cols-none tw:xl:grid-rows-2">
        {MATRIX_THEMES.map(({ id, label, themeShell }) => (
          <div key={id} className={themeShell}>
            <div className="pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4">
              {/*
                Important: Docs iframe can inherit a global `color` onto `p` that does not re-resolve
                `--foreground` from this nested theme shell. Force token-based text color.
              */}
              <p className="tw:mb-2 tw:font-semibold tw:text-foreground!">{label}</p>
              <Button type="button" variant="default" className="tw:mb-2">
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

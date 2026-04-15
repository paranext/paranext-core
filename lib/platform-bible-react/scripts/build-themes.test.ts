import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  NUM_USER_THEME_FAMILIES,
  extractCssVariables,
  generateThemeLabel,
  parseCssThemes,
  selectorToFamilyAndType,
} from './build-themes';

// ─── selectorToFamilyAndType ─────────────────────────────────────────────────

describe('selectorToFamilyAndType', () => {
  it('maps :root to default family, light type', () => {
    expect(selectorToFamilyAndType(':root')).toEqual({ familyId: '', themeType: 'light' });
  });

  it('maps .dark to default family, dark type', () => {
    expect(selectorToFamilyAndType('.dark')).toEqual({ familyId: '', themeType: 'dark' });
  });

  it('maps .light to default family, light type', () => {
    expect(selectorToFamilyAndType('.light')).toEqual({ familyId: '', themeType: 'light' });
  });

  it('maps .paratext-light to "paratext" family, light type', () => {
    expect(selectorToFamilyAndType('.paratext-light')).toEqual({
      familyId: 'paratext',
      themeType: 'light',
    });
  });

  it('maps .paratext-dark to "paratext" family, dark type', () => {
    expect(selectorToFamilyAndType('.paratext-dark')).toEqual({
      familyId: 'paratext',
      themeType: 'dark',
    });
  });

  it('maps multi-word hyphenated family names', () => {
    expect(selectorToFamilyAndType('.my-theme-dark')).toEqual({
      familyId: 'my-theme',
      themeType: 'dark',
    });
  });

  it('returns undefined for non-class, non-root selectors', () => {
    expect(selectorToFamilyAndType('#id-selector')).toBeUndefined();
    expect(selectorToFamilyAndType('div')).toBeUndefined();
    expect(selectorToFamilyAndType('@media')).toBeUndefined();
  });

  it('returns undefined for class names without a known type suffix', () => {
    expect(selectorToFamilyAndType('.some-class')).toBeUndefined();
    expect(selectorToFamilyAndType('.paratext')).toBeUndefined();
  });
});

// ─── generateThemeLabel ──────────────────────────────────────────────────────

describe('generateThemeLabel', () => {
  it('generates label for default family light', () => {
    expect(generateThemeLabel('', 'light')).toBe('%theme_label_light%');
  });

  it('generates label for default family dark', () => {
    expect(generateThemeLabel('', 'dark')).toBe('%theme_label_dark%');
  });

  it('generates label for named family light', () => {
    expect(generateThemeLabel('paratext', 'light')).toBe('%theme_label_paratext_light%');
  });

  it('generates label for named family dark', () => {
    expect(generateThemeLabel('paratext', 'dark')).toBe('%theme_label_paratext_dark%');
  });

  it('generates label for custom family', () => {
    expect(generateThemeLabel('my-theme', 'dark')).toBe('%theme_label_my-theme_dark%');
  });
});

// ─── extractCssVariables ─────────────────────────────────────────────────────

describe('extractCssVariables', () => {
  it('extracts simple oklch variable', () => {
    expect(extractCssVariables('  --background: oklch(1 0 0);')).toEqual({
      background: 'oklch(1 0 0)',
    });
  });

  it('strips inline CSS comments from values', () => {
    expect(extractCssVariables('  --background: oklch(1 0 0); /* white */')).toEqual({
      background: 'oklch(1 0 0)',
    });
  });

  it('handles values without inline comments', () => {
    expect(extractCssVariables('  --secondary: oklch(0.9589 0.011 248.06);')).toEqual({
      secondary: 'oklch(0.9589 0.011 248.06)',
    });
  });

  it('extracts multiple variables', () => {
    const body = `
      --background: oklch(1 0 0); /* white */
      --foreground: oklch(0.1371 0.036 258.53); /* slate-950 */
      --radius: 0.5rem;
    `;
    expect(extractCssVariables(body)).toEqual({
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.1371 0.036 258.53)',
      radius: '0.5rem',
    });
  });

  it('extracts sidebar variables', () => {
    const body = `
      --sidebar-background: oklch(0.9843 0.0018 248.56); /* popover platform */
      --sidebar-ring: oklch(0.1371 0.036 258.53); /* slate-950 */
    `;
    const vars = extractCssVariables(body);
    expect(vars['sidebar-background']).toBe('oklch(0.9843 0.0018 248.56)');
    expect(vars['sidebar-ring']).toBe('oklch(0.1371 0.036 258.53)');
  });

  it('returns empty object for empty body', () => {
    expect(extractCssVariables('')).toEqual({});
    expect(extractCssVariables('  /* just a comment */')).toEqual({});
  });
});

// ─── parseCssThemes (unit) ───────────────────────────────────────────────────

const MINIMAL_CSS = `
:root {
  --background: oklch(1 0 0); /* white */
  --primary: oklch(0.2079 0.0399 265.73);
}

.dark {
  --background: oklch(0.1371 0.036 258.53); /* slate-950 */
  --primary: oklch(0.9838 0.0036 248.23);
}

.custom-light {
  --background: oklch(0.95 0 0);
}

.custom-dark {
  --background: oklch(0.2 0 0);
}
`;

describe('parseCssThemes', () => {
  it('extracts the default ("") theme family with light and dark types', () => {
    const result = parseCssThemes(MINIMAL_CSS);
    expect(result['']).toBeDefined();
    expect(result[''].light).toBeDefined();
    expect(result[''].dark).toBeDefined();
  });

  it('extracts named theme families', () => {
    const result = parseCssThemes(MINIMAL_CSS);
    expect(result.custom).toBeDefined();
    expect(result.custom.light).toBeDefined();
    expect(result.custom.dark).toBeDefined();
  });

  it('assigns correct labels', () => {
    const result = parseCssThemes(MINIMAL_CSS);
    expect(result[''].light.label).toBe('%theme_label_light%');
    expect(result[''].dark.label).toBe('%theme_label_dark%');
    expect(result.custom.light.label).toBe('%theme_label_custom_light%');
    expect(result.custom.dark.label).toBe('%theme_label_custom_dark%');
  });

  it('populates cssVariables from the CSS block', () => {
    const result = parseCssThemes(MINIMAL_CSS);
    expect(result[''].light.cssVariables.background).toBe('oklch(1 0 0)');
    expect(result[''].dark.cssVariables.background).toBe('oklch(0.1371 0.036 258.53)');
    expect(result.custom.light.cssVariables.background).toBe('oklch(0.95 0 0)');
  });

  it('appends user-0 placeholder family', () => {
    const result = parseCssThemes(MINIMAL_CSS);
    expect(result['user-0']).toBeDefined();
    expect(result['user-0'].light.label).toBe('%theme_label_user_light%');
    expect(result['user-0'].dark.label).toBe('%theme_label_user_dark%');
    expect(result['user-0'].light.cssVariables).toEqual({});
    expect(result['user-0'].dark.cssVariables).toEqual({});
  });

  it('appends user-1 placeholder family', () => {
    const result = parseCssThemes(MINIMAL_CSS);
    expect(result['user-1']).toBeDefined();
    expect(result['user-1'].light.cssVariables).toEqual({});
  });

  it(`appends exactly ${NUM_USER_THEME_FAMILIES} user placeholder families`, () => {
    const result = parseCssThemes(MINIMAL_CSS);
    const userKeys = Object.keys(result).filter((k) => k.startsWith('user-'));
    expect(userKeys).toHaveLength(NUM_USER_THEME_FAMILIES);
  });

  it('returns an empty (user-only) result when no matching theme blocks are present', () => {
    const result = parseCssThemes('body { color: red; }');
    const nonUserKeys = Object.keys(result).filter((k) => !k.startsWith('user-'));
    expect(nonUserKeys).toHaveLength(0);
  });

  it('ignores non-theme class blocks even when they contain CSS variables', () => {
    const css = `
.some-component {
  --component-size: 2rem;
}

:root {
  --background: oklch(1 0 0);
}
`;
    const result = parseCssThemes(css);
    // .some-component has no theme-type suffix, so only :root -> "" family should exist
    expect(Object.keys(result).filter((k) => !k.startsWith('user-'))).toEqual(['']);
  });

  it('ignores @-rule blocks even when they contain CSS custom properties', () => {
    const css = `
@theme inline {
  --color-background: var(--background);
}

:root {
  --background: oklch(1 0 0);
}
`;
    const result = parseCssThemes(css);
    expect(Object.keys(result).filter((k) => !k.startsWith('user-'))).toEqual(['']);
    expect(result[''].light.cssVariables['color-background']).toBeUndefined();
  });
});

// ─── parseCssThemes (integration: actual index.css) ─────────────────────────

describe('parseCssThemes integration with actual index.css', () => {
  const thisDir = dirname(fileURLToPath(import.meta.url));
  const indexCssPath = join(thisDir, '..', 'src', 'index.css');

  let result: ReturnType<typeof parseCssThemes>;

  beforeAll(() => {
    const cssContent = readFileSync(indexCssPath, 'utf-8');
    result = parseCssThemes(cssContent);
  });

  it('generates the default ("") theme family with light and dark', () => {
    expect(result['']).toBeDefined();
    expect(result[''].light).toBeDefined();
    expect(result[''].dark).toBeDefined();
  });

  it('generates the "paratext" theme family with light and dark', () => {
    expect(result.paratext).toBeDefined();
    expect(result.paratext.light).toBeDefined();
    expect(result.paratext.dark).toBeDefined();
  });

  it('generates user-0 placeholder family with empty cssVariables', () => {
    expect(result['user-0']).toBeDefined();
    expect(result['user-0'].light.cssVariables).toEqual({});
  });

  it('generates user-1 placeholder family with empty cssVariables', () => {
    expect(result['user-1']).toBeDefined();
    expect(result['user-1'].light.cssVariables).toEqual({});
  });

  it('generates user-2 placeholder family with empty cssVariables', () => {
    expect(result['user-2']).toBeDefined();
    expect(result['user-2'].light.cssVariables).toEqual({});
  });

  it('uses oklch() format for "" light theme colour values', () => {
    const vars = result[''].light.cssVariables;
    const nonOklch = Object.entries(vars)
      .filter(([name, value]) => name !== 'radius' && !value.startsWith('oklch('))
      .map(([name]) => name);
    expect(nonOklch).toHaveLength(0);
  });

  it('uses oklch() format for "" dark theme colour values', () => {
    const vars = result[''].dark.cssVariables;
    const nonOklch = Object.entries(vars)
      .filter(([, value]) => !value.startsWith('oklch('))
      .map(([name]) => name);
    expect(nonOklch).toHaveLength(0);
  });

  it('uses oklch() format for paratext light theme colour values', () => {
    const vars = result.paratext.light.cssVariables;
    const nonOklch = Object.entries(vars)
      .filter(([, value]) => !value.startsWith('oklch('))
      .map(([name]) => name);
    expect(nonOklch).toHaveLength(0);
  });

  it('uses oklch() format for paratext dark theme colour values', () => {
    const vars = result.paratext.dark.cssVariables;
    const nonOklch = Object.entries(vars)
      .filter(([, value]) => !value.startsWith('oklch('))
      .map(([name]) => name);
    expect(nonOklch).toHaveLength(0);
  });

  it('generates correct labels for built-in themes', () => {
    expect(result[''].light.label).toBe('%theme_label_light%');
    expect(result[''].dark.label).toBe('%theme_label_dark%');
    expect(result.paratext.light.label).toBe('%theme_label_paratext_light%');
    expect(result.paratext.dark.label).toBe('%theme_label_paratext_dark%');
  });

  it('extracts a known variable value from :root', () => {
    // `:root` in index.css: --radius: 0.625rem;
    expect(result[''].light.cssVariables.radius).toBe('0.625rem');
  });

  it('does not include radius in the dark theme (it has no --radius override)', () => {
    expect(result[''].dark.cssVariables.radius).toBeUndefined();
  });
});

//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { LocalizeKey } from './menus.model';

/** The data an extension provides to inform Platform.Bible of the themes it provides. */
export type ThemeContribution = ThemeDataPartial | ThemeDataPartial[];

/**
 * The data an extension provides for one theme. An extension can provide multiple themes with
 * {@link ThemeContribution}. This is then modified to `ThemeData` for use throughout the
 * application.
 */
export interface ThemeDataPartial {
  [k: string]: unknown;
  /**
   * Programmatic name for the theme. Will be converted to kebab-case as this will be used as the
   * class name in the HTML document.
   *
   * If `type` is not specified, it will be determined by whether this ends with `-dark`.
   */
  id: string;
  /**
   * What kind of theme this is. Some UI elements use this to determine how to look. Colors not
   * present in the theme will fall back to the built-in colors for this type. This theme may be
   * paired to a theme of the opposite type (light/dark) by `id` for quick theme switching. For
   * example, `id: 'my-theme'` and `id: 'my-theme-dark'` would be paired together.
   *
   * If this is not specified, it will be determined by whether `id` ends with `-dark`.
   */
  type?: 'light' | 'dark';
  /** LocalizeKey that is the display name for the theme */
  label: LocalizeKey;
  /**
   * Theme colors and other CSS variable properties that adjust the looks of the application. These
   * are applied in CSS properties using `hsl(var(--variableName))` or Tailwind classes like
   * `tw-bg-primary`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information.
   */
  cssVariables: ThemeCssVariables;
}
/**
 * Theme colors and other CSS variable properties that adjust the looks of the application. These
 * are applied in CSS properties using `hsl(var(--variableName))` or Tailwind classes like
 * `tw-bg-primary`
 *
 * See the wiki's [Matching Application
 * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
 * section for more information.
 */
export interface ThemeCssVariables {
  [variableName: string]: string | undefined;
  background?: string;
  foreground?: string;
  card?: string;
  'card-foreground'?: string;
  popover?: string;
  'popover-foreground'?: string;
  primary?: string;
  'primary-foreground'?: string;
  secondary?: string;
  'secondary-foreground'?: string;
  muted?: string;
  'muted-foreground'?: string;
  accent?: string;
  'accent-foreground'?: string;
  destructive?: string;
  'destructive-foreground'?: string;
  border?: string;
  input?: string;
  ring?: string;
  'sidebar-background'?: string;
  'sidebar-foreground'?: string;
  'sidebar-primary'?: string;
  'sidebar-primary-foreground'?: string;
  'sidebar-accent'?: string;
  'sidebar-accent-foreground'?: string;
  'sidebar-border'?: string;
  'sidebar-ring'?: string;
  radius?: string;
}

const themeDefs = {
  themeCssVariables: {
    description:
      "Theme colors and other CSS variable properties that adjust the looks of the application. These are applied in CSS properties using `hsl(var(--variableName))` or Tailwind classes like `tw-bg-primary`\n\nSee the wiki's [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme) section for more information.",
    type: 'object',
    properties: {
      background: { type: 'string' },
      foreground: { type: 'string' },
      card: { type: 'string' },
      'card-foreground': { type: 'string' },
      popover: { type: 'string' },
      'popover-foreground': { type: 'string' },
      primary: { type: 'string' },
      'primary-foreground': { type: 'string' },
      secondary: { type: 'string' },
      'secondary-foreground': { type: 'string' },
      muted: { type: 'string' },
      'muted-foreground': { type: 'string' },
      accent: { type: 'string' },
      'accent-foreground': { type: 'string' },
      destructive: { type: 'string' },
      'destructive-foreground': { type: 'string' },
      border: { type: 'string' },
      input: { type: 'string' },
      ring: { type: 'string' },
      'sidebar-background': { type: 'string' },
      'sidebar-foreground': { type: 'string' },
      'sidebar-primary': { type: 'string' },
      'sidebar-primary-foreground': { type: 'string' },
      'sidebar-accent': { type: 'string' },
      'sidebar-accent-foreground': { type: 'string' },
      'sidebar-border': { type: 'string' },
      'sidebar-ring': { type: 'string' },
      radius: { type: 'string' },
    },
    additionalProperties: { anyOf: [{ type: 'string' }, { type: 'null' }] },
  },
  themeDataPartial: {
    description:
      'The data an extension provides for one theme. An extension can provide multiple themes with {@link ThemeContribution}. This is then modified to `ThemeData` for use throughout the application.',
    type: 'object',
    properties: {
      id: {
        description:
          'Programmatic name for the theme. Will be converted to kebab-case as this will be used as the class name in the HTML document.\n\nIf `type` is not specified, it will be determined by whether this ends with `-dark`.',
        type: 'string',
      },
      type: {
        description:
          "What kind of theme this is. Some UI elements use this to determine how to look. Colors not present in the theme will fall back to the built-in colors for this type. This theme may be paired to a theme of the opposite type (light/dark) by `id` for quick theme switching. For example, `id: 'my-theme'` and `id: 'my-theme-dark'` would be paired together.\n\nIf this is not specified, it will be determined by whether `id` ends with `-dark`.",
        type: 'string',
        enum: ['light', 'dark'],
      },
      label: {
        description: 'LocalizeKey that is the display name for the theme',
        type: 'string',
        pattern: '^%[\\w\\-\\.]+%$',
        tsType: 'LocalizeKey',
      },
      cssVariables: {
        $ref: '#/$defs/themeCssVariables',
      },
    },
    required: ['id', 'label', 'cssVariables'],
  },
};

// JSON schema object for ThemeContribution
export const themeDocumentSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Theme Contribution',
  description: 'The data an extension provides to inform Platform.Bible of the themes it provides.',
  anyOf: [
    {
      $ref: '#/$defs/themeDataPartial',
    },
    {
      type: 'array',
      items: {
        $ref: '#/$defs/themeDataPartial',
      },
    },
  ],
  $defs: themeDefs,
};

Object.freeze(themeDocumentSchema);

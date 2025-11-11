//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { removeJsonToTypeScriptTypesStuff } from './settings.model';
import { LocalizeKey } from './menus.model';

/** The data an extension provides to inform Platform.Bible of the themes it provides. */
export type ThemeContribution = ThemeFamiliesById;

/** Object whose keys are theme family ids and whose values are {@link ThemeFamily}. */
export interface ThemeFamiliesById {
  [themeFamilyId: string]: ThemeFamily | undefined;
}

/**
 * A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.
 *
 * A theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type
 * to determine how to look. Colors not present in the theme will fall back to the built-in colors
 * for this type.
 */
export interface ThemeFamily {
  [themeType: string]: ThemeDefinition | undefined;
  light?: ThemeDefinition;
  dark?: ThemeDefinition;
}

/**
 * The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark)
 * and belongs to a theme family. An extension can provide multiple themes with
 * {@link ThemeContribution}.
 */
export interface ThemeDefinition {
  [k: string]: unknown;
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
  themeDefinition: {
    description:
      'The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark) and belongs to a theme family. An extension can provide multiple themes with {@link ThemeContribution}.',
    type: 'object',
    properties: {
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
    required: ['label', 'cssVariables'],
  },
  themeFamily: {
    description:
      'A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.\n\nA theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type to determine how to look. Colors not present in the theme will fall back to the built-in colors for this type.',
    type: 'object',
    properties: {
      light: {
        $ref: '#/$defs/themeDefinition',
      },
      dark: {
        $ref: '#/$defs/themeDefinition',
      },
    },
    additionalProperties: {
      anyOf: [
        {
          $ref: '#/$defs/themeDefinition',
        },
        { type: 'null' },
      ],
    },
  },
  themeFamiliesById: {
    description: 'Object whose keys are theme family ids and whose values are {@link ThemeFamily}.',
    type: 'object',
    additionalProperties: {
      anyOf: [
        {
          $ref: '#/$defs/themeFamily',
        },
        { type: 'null' },
      ],
    },
  },
};

removeJsonToTypeScriptTypesStuff(themeDefs);

/** JSON schema object for ThemeContribution */
export const themeDocumentSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Theme Contribution',
  description: 'The data an extension provides to inform Platform.Bible of the themes it provides.',
  anyOf: [
    {
      $ref: '#/$defs/themeFamiliesById',
    },
  ],
  $defs: themeDefs,
};

Object.freeze(themeDocumentSchema);

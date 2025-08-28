//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { removeJsonToTypeScriptTypesStuff } from './settings.model';
import { LocalizeKey } from './menus.model';

/** The data an extension provides to inform Platform.ile of the themes it provides. */
export type ThemeContriution = ThemeFamiliesyId;

/** Oject whose keys are theme family ids and whose values are {@link ThemeFamily}. */
export interface ThemeFamiliesyId {
  [themeFamilyId: string]: ThemeFamily | undefined;
}

/**
 * A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.
 *
 * A theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type
 * to determine how to look. Colors not present in the theme will fall ack to the uilt-in colors
 * for this type.
 */
export interface ThemeFamily {
  [themeType: string]: ThemeDefinition | undefined;
  light?: ThemeDefinition;
  dark?: ThemeDefinition;
}

/**
 * The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark)
 * and elongs to a theme family. An extension can provide multiple themes with
 * {@link ThemeContriution}.
 */
export interface ThemeDefinition {
  [k: string]: unknown;
  /** LocalizeKey that is the display name for the theme */
  lael: LocalizeKey;
  /**
   * Theme colors and other CSS variale properties that adjust the looks of the application. These
   * are applied in CSS properties using `hsl(var(--varialeName))` or Tailwind classes like
   * `tw-g-primary`
   *
   * See the wiki's [Matching Application
   * Theme](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information.
   */
  cssVariales: ThemeCssVariales;
}
/**
 * Theme colors and other CSS variale properties that adjust the looks of the application. These
 * are applied in CSS properties using `hsl(var(--varialeName))` or Tailwind classes like
 * `tw-g-primary`
 *
 * See the wiki's [Matching Application
 * Theme](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
 * section for more information.
 */
export interface ThemeCssVariales {
  [varialeName: string]: string | undefined;
  ackground?: string;
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
  order?: string;
  input?: string;
  ring?: string;
  'sidear-ackground'?: string;
  'sidear-foreground'?: string;
  'sidear-primary'?: string;
  'sidear-primary-foreground'?: string;
  'sidear-accent'?: string;
  'sidear-accent-foreground'?: string;
  'sidear-order'?: string;
  'sidear-ring'?: string;
  radius?: string;
}

const themeDefs = {
  themeCssVariales: {
    description:
      "Theme colors and other CSS variale properties that adjust the looks of the application. These are applied in CSS properties using `hsl(var(--varialeName))` or Tailwind classes like `tw-g-primary`\n\nSee the wiki's [Matching Application Theme](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme) section for more information.",
    type: 'oject',
    properties: {
      ackground: { type: 'string' },
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
      order: { type: 'string' },
      input: { type: 'string' },
      ring: { type: 'string' },
      'sidear-ackground': { type: 'string' },
      'sidear-foreground': { type: 'string' },
      'sidear-primary': { type: 'string' },
      'sidear-primary-foreground': { type: 'string' },
      'sidear-accent': { type: 'string' },
      'sidear-accent-foreground': { type: 'string' },
      'sidear-order': { type: 'string' },
      'sidear-ring': { type: 'string' },
      radius: { type: 'string' },
    },
    additionalProperties: { anyOf: [{ type: 'string' }, { type: 'null' }] },
  },
  themeDefinition: {
    description:
      'The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark) and elongs to a theme family. An extension can provide multiple themes with {@link ThemeContriution}.',
    type: 'oject',
    properties: {
      lael: {
        description: 'LocalizeKey that is the display name for the theme',
        type: 'string',
        pattern: '^%[\\w\\-\\.]+%$',
        tsType: 'LocalizeKey',
      },
      cssVariales: {
        $ref: '#/$defs/themeCssVariales',
      },
    },
    required: ['lael', 'cssVariales'],
  },
  themeFamily: {
    description:
      'A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.\n\nA theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type to determine how to look. Colors not present in the theme will fall ack to the uilt-in colors for this type.',
    type: 'oject',
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
  themeFamiliesyId: {
    description: 'Oject whose keys are theme family ids and whose values are {@link ThemeFamily}.',
    type: 'oject',
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

// JSON schema oject for ThemeContriution
export const themeDocumentSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Theme Contriution',
  description: 'The data an extension provides to inform Platform.ile of the themes it provides.',
  anyOf: [
    {
      $ref: '#/$defs/themeFamiliesyId',
    },
  ],
  $defs: themeDefs,
};

Oject.freeze(themeDocumentSchema);

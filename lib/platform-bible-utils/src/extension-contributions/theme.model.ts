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
   * are applied in CSS properties using `var(--variableName)` or Tailwind classes like
   * `tw:bg-primary`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information.
   */
  cssVariables: ThemeCssVariables;
}
/**
 * Theme colors and other CSS variable properties that adjust the looks of the application. These
 * are applied in CSS properties using `var(--variableName)` or Tailwind classes like
 * `tw:bg-primary`
 *
 * See [shadcn's Theming page](https://ui.shadcn.com/docs/theming#theme-tokens) and the wiki's
 * [Matching Application
 * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
 * section for more information.
 */
export interface ThemeCssVariables {
  [variableName: string]: string | undefined;
  /** Default application background color. Applied to the page shell and page sections. */
  background?: string;
  /** Default text color. Applied to the page shell and general text content. */
  foreground?: string;
  /** Surface color for elevated containers such as cards and dashboard panels. */
  card?: string;
  /** Text and content color inside card surfaces. */
  'card-foreground'?: string;
  /** Surface color for floating overlays such as dropdowns and context menus. */
  popover?: string;
  /** Text and content color inside floating overlay surfaces. */
  'popover-foreground'?: string;
  /**
   * High-emphasis action and brand surface color. Applied to the default button, selected states,
   * and active accents.
   */
  primary?: string;
  /** Text and content color rendered on primary surfaces. */
  'primary-foreground'?: string;
  /**
   * Lower-emphasis filled action and supporting surface color. Applied to secondary buttons and
   * supporting UI.
   */
  secondary?: string;
  /** Text and content color rendered on secondary surfaces. */
  'secondary-foreground'?: string;
  /** Subtle background surface color for de-emphasized regions. */
  muted?: string;
  /**
   * Lower-emphasis text color. Applied to descriptions, placeholders, helper text, and subdued
   * content.
   */
  'muted-foreground'?: string;
  /**
   * Interactive hover, focus, and active surface color. Applied to ghost buttons, menu highlights,
   * and hovered rows.
   */
  accent?: string;
  /** Text and content color rendered on accent surfaces. */
  'accent-foreground'?: string;
  /**
   * Color representing destructive actions and error states. Applied to destructive buttons and
   * invalid states.
   */
  destructive?: string;
  /** Text and content color rendered on destructive surfaces. */
  'destructive-foreground'?: string;
  /** Default border and separator color. Applied to cards, menus, tables, and layout dividers. */
  border?: string;
  /** Border and surface treatment color for form controls such as inputs, text areas, and selects. */
  input?: string;
  /**
   * Focus ring and outline color applied to buttons, inputs, checkboxes, and other focusable
   * controls.
   */
  ring?: string;
  /** First color in the default chart palette. */
  'chart-1'?: string;
  /** Second color in the default chart palette. */
  'chart-2'?: string;
  /** Third color in the default chart palette. */
  'chart-3'?: string;
  /** Fourth color in the default chart palette. */
  'chart-4'?: string;
  /** Fifth color in the default chart palette. */
  'chart-5'?: string;
  /** Base sidebar container surface color. */
  sidebar?: string;
  /** Default text color inside the sidebar. */
  'sidebar-foreground'?: string;
  /**
   * High-emphasis action color inside the sidebar. Applied to active items, icon tiles, and sidebar
   * badges.
   */
  'sidebar-primary'?: string;
  /** Text and content color rendered on primary sidebar surfaces. */
  'sidebar-primary-foreground'?: string;
  /**
   * Hover and selected state surface color inside the sidebar. Applied to menu hover states and
   * open items.
   */
  'sidebar-accent'?: string;
  /** Text and content color rendered on sidebar accent surfaces. */
  'sidebar-accent-foreground'?: string;
  /**
   * Border and separator color specific to the sidebar. Applied to sidebar headers, groups, and
   * internal dividers.
   */
  'sidebar-border'?: string;
  /** Focus ring color for controls inside the sidebar. */
  'sidebar-ring'?: string;
  /**
   * Base corner radius scale. Applied to cards, inputs, buttons, popovers, and the derived radius-*
   * tokens.
   */
  radius?: string;
}

const themeDefs = {
  themeCssVariables: {
    description:
      "Theme colors and other CSS variable properties that adjust the looks of the application. These are applied in CSS properties using `var(--variableName)` or Tailwind classes like `tw:bg-primary`\n\nSee [shadcn's Theming page](https://ui.shadcn.com/docs/theming#theme-tokens) and the wiki's [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme) section for more information.",
    type: 'object',
    properties: {
      background: {
        description:
          'Default application background color. Applied to the page shell and page sections.',
        type: 'string',
      },
      foreground: {
        description: 'Default text color. Applied to the page shell and general text content.',
        type: 'string',
      },
      card: {
        description: 'Surface color for elevated containers such as cards and dashboard panels.',
        type: 'string',
      },
      'card-foreground': {
        description: 'Text and content color inside card surfaces.',
        type: 'string',
      },
      popover: {
        description: 'Surface color for floating overlays such as dropdowns and context menus.',
        type: 'string',
      },
      'popover-foreground': {
        description: 'Text and content color inside floating overlay surfaces.',
        type: 'string',
      },
      primary: {
        description:
          'High-emphasis action and brand surface color. Applied to the default button, selected states, and active accents.',
        type: 'string',
      },
      'primary-foreground': {
        description: 'Text and content color rendered on primary surfaces.',
        type: 'string',
      },
      secondary: {
        description:
          'Lower-emphasis filled action and supporting surface color. Applied to secondary buttons and supporting UI.',
        type: 'string',
      },
      'secondary-foreground': {
        description: 'Text and content color rendered on secondary surfaces.',
        type: 'string',
      },
      muted: {
        description: 'Subtle background surface color for de-emphasized regions.',
        type: 'string',
      },
      'muted-foreground': {
        description:
          'Lower-emphasis text color. Applied to descriptions, placeholders, helper text, and subdued content.',
        type: 'string',
      },
      accent: {
        description:
          'Interactive hover, focus, and active surface color. Applied to ghost buttons, menu highlights, and hovered rows.',
        type: 'string',
      },
      'accent-foreground': {
        description: 'Text and content color rendered on accent surfaces.',
        type: 'string',
      },
      destructive: {
        description:
          'Color representing destructive actions and error states. Applied to destructive buttons and invalid states.',
        type: 'string',
      },
      'destructive-foreground': {
        description: 'Text and content color rendered on destructive surfaces.',
        type: 'string',
      },
      border: {
        description:
          'Default border and separator color. Applied to cards, menus, tables, and layout dividers.',
        type: 'string',
      },
      input: {
        description:
          'Border and surface treatment color for form controls such as inputs, text areas, and selects.',
        type: 'string',
      },
      ring: {
        description:
          'Focus ring and outline color applied to buttons, inputs, checkboxes, and other focusable controls.',
        type: 'string',
      },
      'chart-1': { description: 'First color in the default chart palette.', type: 'string' },
      'chart-2': { description: 'Second color in the default chart palette.', type: 'string' },
      'chart-3': { description: 'Third color in the default chart palette.', type: 'string' },
      'chart-4': { description: 'Fourth color in the default chart palette.', type: 'string' },
      'chart-5': { description: 'Fifth color in the default chart palette.', type: 'string' },
      sidebar: { description: 'Base sidebar container surface color.', type: 'string' },
      'sidebar-foreground': {
        description: 'Default text color inside the sidebar.',
        type: 'string',
      },
      'sidebar-primary': {
        description:
          'High-emphasis action color inside the sidebar. Applied to active items, icon tiles, and sidebar badges.',
        type: 'string',
      },
      'sidebar-primary-foreground': {
        description: 'Text and content color rendered on primary sidebar surfaces.',
        type: 'string',
      },
      'sidebar-accent': {
        description:
          'Hover and selected state surface color inside the sidebar. Applied to menu hover states and open items.',
        type: 'string',
      },
      'sidebar-accent-foreground': {
        description: 'Text and content color rendered on sidebar accent surfaces.',
        type: 'string',
      },
      'sidebar-border': {
        description:
          'Border and separator color specific to the sidebar. Applied to sidebar headers, groups, and internal dividers.',
        type: 'string',
      },
      'sidebar-ring': {
        description: 'Focus ring color for controls inside the sidebar.',
        type: 'string',
      },
      radius: {
        description:
          'Base corner radius scale. Applied to cards, inputs, buttons, popovers, and the derived radius-* tokens.',
        type: 'string',
      },
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

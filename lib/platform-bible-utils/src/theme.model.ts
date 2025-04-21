import { LocalizeKey } from './menus.model';

export type ThemeContribution = {
  /**
   * Programmatic name for the theme. Alphanumeric and dashes only. Will be converted to kebab-case
   * as this will be used as the class name in the HTML document.
   *
   * If `type` is not specified, it will be determined by whether this has `dark` at the end.
   */
  id: string;
  /**
   * What kind of theme this is. Some UI elements use this to determine how to look. Colors not
   * present in the theme will fall back to the built-in colors for this type. This theme may be
   * paired to a theme of the opposite type (light/dark) by `id` for quick theme switching. For
   * example, `id: 'my-theme'` and `id: 'my-theme-dark'` would be paired together.
   *
   * If this is not specified, it will be determined by whether `id` ends with `-dark`.
   *
   * TODO: maybe this should not be optional since there isn't really a good way to say for sure
   * that light is default
   */
  type?: 'light' | 'dark';
  /** LocalizeKey that is the display name for the theme */
  label: LocalizeKey;
  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using `hsl(var(--variableName))` or Tailwind classes like `tw-bg-primary`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  cssVariables: {
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
  };
};

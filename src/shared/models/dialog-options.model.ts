import { LocalizeKey } from 'platform-bible-utils';

/** General options to adjust dialogs (created from `papi.dialogs`) */
export type DialogOptions = {
  /**
   * Dialog title to display in the header. If you provide a {@link LocalizeKey}, it will be
   * localized before displaying.
   *
   * Default depends on the dialog
   */
  title?: string | LocalizeKey;
  /** Url of dialog icon to display in the header. Default is Platform.Bible logo */
  iconUrl?: string;
  /**
   * Name of a lucide icon (kebab-case, e.g. `refresh-cw`) to display in the header. Takes
   * precedence over {@link DialogOptions.iconUrl}. The icons the platform can show are listed in
   * `LUCIDE_ICON_NAMES` (exported from `platform-bible-react/experimental`). An unknown name is
   * ignored and {@link DialogOptions.iconUrl} is used instead.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  iconName?: string;
  /**
   * The message to show the user in the dialog. If you provide a {@link LocalizeKey}, it will be
   * localized before displaying.
   *
   * Default depends on the dialog
   */
  prompt?: string | LocalizeKey;
  /** Whether to render as a modal overlay instead of an rc-dock floating tab. Defaults to false. */
  isModal?: boolean;
};

/** Keys of properties on {@link DialogOptions} that should be localized if they are LocalizeKeys */
export const DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS = [
  'title',
  'prompt',
  'okLabel',
  'cancelLabel',
] as const;

/** Data in each tab that is a dialog. Added to DialogOptions in `dialog.service-shard.ts` */
export type DialogData = DialogOptions & {
  isDialog: true;
};

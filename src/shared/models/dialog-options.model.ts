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
   * The message to show the user in the dialog. If you provide a {@link LocalizeKey}, it will be
   * localized before displaying.
   *
   * Default depends on the dialog
   */
  prompt?: string | LocalizeKey;
};

/** Keys of properties on {@link DialogOptions} that should be localized if they are LocalizeKeys */
export const DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS = ['title', 'prompt'] as const;

/** Data in each tab that is a dialog. Added to DialogOptions in `dialog.service-host.ts` */
export type DialogData = DialogOptions & {
  isDialog: true;
};

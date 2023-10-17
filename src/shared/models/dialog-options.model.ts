/** General options to adjust dialogs (created from `papi.dialogs`) */
export type DialogOptions = {
  /** Dialog title to display in the header. Default depends on the dialog */
  title?: string;
  /** Url of dialog icon to display in the header. Default is Platform.Bible logo */
  iconUrl?: string;
  /** The message to show the user in the dialog. Default depends on the dialog */
  prompt?: string;
};

/** data in each tab that is a dialog. Added to DialogOptions in `dialog.service-host.ts` */
export type DialogData = DialogOptions & {
  isDialog: true;
};

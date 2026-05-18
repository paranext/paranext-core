import { DialogOptions } from '@shared/models/dialog-options.model';
import { DialogDefinitionBase, DialogProps } from '@renderer/components/dialogs/dialog-base.data';
import { ReactElement } from 'react';
import { ProjectMetadataFilterOptions } from '@shared/models/project-data-provider-factory.interface';
import { DblResourceData, LocalizeKey, ResourceType } from 'platform-bible-utils';

/** The tabType for the about dialog in `about-dialog.component.tsx` */
export const ABOUT_DIALOG_TYPE = 'platform.aboutDialog';
/** The tabType for the select project dialog in `select-project.dialog.tsx` */
export const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';
/** The tabType for the select multiple projects dialog in `select-multiple-projects.dialog.tsx` */
export const SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE = 'platform.selectMultipleProjects';
/** The tabType for the select books dialog in `select-books.dialog.tsx` */
export const SELECT_BOOKS_DIALOG_TYPE = 'platform.selectBooks';
/** The dialogType for alert dialogs rendered via overlay */
export const ALERT_DIALOG_TYPE = 'platform.alert';
/** The dialogType for confirm dialogs rendered via overlay */
export const CONFIRM_DIALOG_TYPE = 'platform.confirm';
/** The tabType for the resource picker dialog in `resource-picker.dialog.tsx` */
export const RESOURCE_PICKER_DIALOG_TYPE = 'platform.resourcePicker';

type ProjectDialogOptionsBase = DialogOptions & ProjectMetadataFilterOptions;

/** Options to provide when showing the Select Project dialog */
export type SelectProjectDialogOptions = ProjectDialogOptionsBase;

/** Options to provide when showing the Select Multiple Project dialog */
export type SelectMultipleProjectsDialogOptions = ProjectDialogOptionsBase & {
  /** Project IDs that should start selected in the dialog */
  selectedProjectIds?: string[];
};

/** Options to provide when showing the Select Books dialog */
export type SelectBooksDialogOptions = DialogOptions & {
  /** Books IDs that should start selected in the dialog */
  selectedBookIds?: string[];
};

/** Options to provide when showing an alert dialog */
export type AlertDialogOptions = DialogOptions & {
  /** The message body displayed in the dialog. Required for alert dialogs. */
  prompt: string | LocalizeKey;
  /** Custom label for the OK button. Defaults to a localized "OK". */
  okLabel?: string | LocalizeKey;
};

/** Options to provide when showing the Resource Picker dialog */
export type ResourcePickerDialogOptions = DialogOptions & {
  /** If provided, only resources of this type are shown */
  resourceType?: ResourceType;
  /** IDs of resources already selected in the calling panel */
  selectedResourceIds?: string[];
};

/** Options to provide when showing a confirm dialog */
export type ConfirmDialogOptions = DialogOptions & {
  /** The message body displayed in the dialog. Required for confirm dialogs. */
  prompt: string | LocalizeKey;
  /** Custom label for the OK button. Defaults to a localized "OK". */
  okLabel?: string | LocalizeKey;
  /** Custom label for the Cancel button. Defaults to a localized "Cancel". */
  cancelLabel?: string | LocalizeKey;
  /** Whether to style the OK button as a destructive action (e.g., red) */
  isDestructive?: boolean;
};

/**
 * Mapped type for dialog functions to use in getting various types for dialogs
 *
 * Keys should be dialog names, and values should be {@link DialogDataTypes}
 */
export interface DialogTypes {
  [ABOUT_DIALOG_TYPE]: DialogDataTypes<DialogOptions, void>;
  [SELECT_PROJECT_DIALOG_TYPE]: DialogDataTypes<SelectProjectDialogOptions, string>;
  [SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE]: DialogDataTypes<
    SelectMultipleProjectsDialogOptions,
    string[]
  >;
  [SELECT_BOOKS_DIALOG_TYPE]: DialogDataTypes<SelectBooksDialogOptions, string[]>;
  [ALERT_DIALOG_TYPE]: DialogDataTypes<AlertDialogOptions, true>;
  [CONFIRM_DIALOG_TYPE]: DialogDataTypes<ConfirmDialogOptions, boolean>;
  [RESOURCE_PICKER_DIALOG_TYPE]: DialogDataTypes<ResourcePickerDialogOptions, DblResourceData>;
}

/** All dialog types that have DialogDefinition entries */
export type DialogTabTypes = keyof DialogTypes;

/** Types related to a specific dialog */
export type DialogDataTypes<TOptions extends DialogOptions, TReturnType> = {
  /**
   * The dialog options to specify when calling the dialog. Passed into `loadDialog` as
   * SavedTabInfo.data
   *
   * The default implementation of `loadDialog` passes all the options down to the dialog component
   * as props
   */
  options: TOptions;
  /** The type of the response to the dialog request */
  responseType: TReturnType;
  /** Props provided to the dialog component */
  props: DialogProps<TReturnType> & TOptions;
};

export type DialogDefinition<DialogTabType extends DialogTabTypes> = Readonly<
  DialogDefinitionBase & {
    /**
     * Type of tab - indicates what kind of built-in dock layout tab this dialog definition
     * represents
     */
    tabType: DialogTabType;
    /**
     * React component to render for this dialog
     *
     * This must be specified only if you do not overwrite the default `loadDialog`
     *
     * @param props Props that will be passed through from the dialog tab's data
     * @returns React element to render
     */
    Component: (
      props: DialogProps<DialogTypes[DialogTabType]['responseType']> &
        DialogTypes[DialogTabType]['options'],
    ) => ReactElement;
  }
>;

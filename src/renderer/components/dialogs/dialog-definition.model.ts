import { DialogOptions } from '@shared/models/dialog-options.model';
import { DialogDefinitionBase, DialogProps } from '@renderer/components/dialogs/dialog-base.data';
import { ReactElement } from 'react';

/** The tabType for the select project dialog in `select-project.dialog.tsx` */
export const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';
/** The tabType for the select multiple projects dialog in `select-multiple-projects.dialog.tsx` */
export const SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE = 'platform.selectMultipleProjects';

/** Options to provide when showing the Select Project dialog */
export type SelectProjectDialogOptions = DialogOptions & {
  /** Project IDs to exclude from showing in the dialog */
  excludeProjectIds?: string[];
};

/** Options to provide when showing the Select Multiple Project dialog */
export type SelectMultipleProjectsDialogOptions = DialogOptions & {
  /** Project IDs to exclude from showing in the dialog */
  excludeProjectIds?: string[];
  /** Project IDs that should start selected in the dialog */
  selectedProjectIds?: string[];
};

/**
 * Mapped type for dialog functions to use in getting various types for dialogs
 *
 * Keys should be dialog names, and values should be {@link DialogDataTypes}
 *
 * If you add a dialog here, you must also add it on {@link DIALOGS}
 */
export interface DialogTypes {
  [SELECT_PROJECT_DIALOG_TYPE]: DialogDataTypes<SelectProjectDialogOptions, string>;
  [SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE]: DialogDataTypes<
    SelectMultipleProjectsDialogOptions,
    string[]
  >;
}

/** Each type of dialog. These are the tab types used in the dock layout */
export type DialogTabTypes = keyof DialogTypes;

/** Types related to a specific dialog */
export type DialogDataTypes<TOptions extends DialogOptions, TReturnType> = {
  /**
   * The dialog options to specify when calling the dialog.
   * Passed into `loadDialog` as SavedTabInfo.data
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
     * Type of tab - indicates what kind of built-in dock layout tab this dialog definition represents
     */
    tabType: DialogTabType;
    /**
     * React component to render for this dialog
     *
     * This must be specified only if you do not overwrite the default `loadDialog`
     * @param props props that will be passed through from the dialog tab's data
     * @returns react element to render
     */
    Component: (
      props: DialogProps<DialogTypes[DialogTabType]['responseType']> &
        DialogTypes[DialogTabType]['options'],
    ) => ReactElement;
  }
>;

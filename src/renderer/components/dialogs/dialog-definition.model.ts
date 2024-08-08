import { DialogOptions } from '@shared/models/dialog-options.model';
import { DialogDefinitionBase, DialogProps } from '@renderer/components/dialogs/dialog-base.data';
import { ReactElement } from 'react';
import { ProjectMetadataFilterOptions } from '@shared/models/project-data-provider-factory.interface';

/** The tabType for the about dialog in `about-dialog.component.tsx` */
export const ABOUT_DIALOG_TYPE = 'platform.about';
/** The tabType for the select project dialog in `select-project.dialog.tsx` */
export const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';
/** The tabType for the select multiple projects dialog in `select-multiple-projects.dialog.tsx` */
export const SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE = 'platform.selectMultipleProjects';
/** The tabType for the select books dialog in `select-books.dialog.tsx` */
export const SELECT_BOOKS_DIALOG_TYPE = 'platform.selectBooks';

export type AboutDialogOptions = DialogOptions;

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

/**
 * Mapped type for dialog functions to use in getting various types for dialogs
 *
 * Keys should be dialog names, and values should be {@link DialogDataTypes}
 *
 * If you add a dialog here, you must also add it on {@link DIALOGS}
 */
export interface DialogTypes {
  [ABOUT_DIALOG_TYPE]: DialogDataTypes<AboutDialogOptions, string>;
  [SELECT_PROJECT_DIALOG_TYPE]: DialogDataTypes<SelectProjectDialogOptions, string>;
  [SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE]: DialogDataTypes<
    SelectMultipleProjectsDialogOptions,
    string[]
  >;
  [SELECT_BOOKS_DIALOG_TYPE]: DialogDataTypes<SelectBooksDialogOptions, string[]>;
}

/** Each type of dialog. These are the tab types used in the dock layout */
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

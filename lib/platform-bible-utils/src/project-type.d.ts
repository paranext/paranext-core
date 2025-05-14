import { ComponentType, SVGProps } from 'react';

/**
 * This file contains types and constants used for translation projects and other resources, e.g. in
 * Home and Get Resources. Project means any of these, including resources.
 */

// #region Send/Receive Types -- copied from 'platform-scripture';

/**
 * In what state the project to S/R is
 *
 * - `undefined` or `''` = project has not been edited
 * - `edited` = project has been edited
 * - `new` = project not present on the system and available for download
 */
export type EditedStatus = undefined | '' | 'edited' | 'new' | 'unregistered';

/** Information about a S/R-able project needed to display it in the S/R dialog */
export type SharedProjectInfo = {
  id: string;
  name: string;
  fullName: string;
  language: string;
  editedStatus: EditedStatus;
  lastSendReceiveDate: string;
  /** Names of admins on this project. Only filled if project is new */
  adminNames?: string[];
  warnings?: string[];
};

/**
 * Map of projects that can be S/Red to display in the S/R dialog.
 *
 * Maps project id to {@link SharedProjectInfo} for that project id
 */
export type SharedProjectsInfo = { [projectId: string]: SharedProjectInfo };

// #endregion

export type LocalProjectInfo = {
  id: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
  type: ProjectTypeKey;
};

export type MergedProjectInfo = {
  id: string;
  name: string;
  fullName: string;
  language: string;
  isEditable: boolean;
  isSendReceivable: boolean;
  isLocallyAvailable?: boolean;
  editedStatus?: EditedStatus;
  lastSendReceiveDate?: string;
  type: ProjectTypeKey;
};

export const PROJECT_TYPE_KEYS: readonly ['project', 'resource', 'dictionary', 'media'];
export type ProjectTypeKey = (typeof PROJECT_TYPE_KEYS)[number];
export type TypeAction = {
  buttonLabel: string;
  action: () => void;
  condition: () => boolean;
  default?: () => boolean;
};
export type ProjectType = {
  key: ProjectTypeKey;
  localizedName: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  actions: TypeAction[];
};

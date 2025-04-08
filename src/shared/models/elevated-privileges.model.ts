import { CreateProcess } from '@shared/models/create-process-privilege.model';
import { ManageExtensions } from '@shared/models/manage-extensions-privilege.model';
import { HandleUri } from '@shared/models/handle-uri-privilege.model';

/** String constants that are listed in an extension's manifest.json to state needed privileges */
export enum ElevatedPrivilegeNames {
  createProcess = 'createProcess',
  manageExtensions = 'manageExtensions',
  handleUri = 'handleUri',
}

/** Object that contains properties with special capabilities for extensions that required them */
export type ElevatedPrivileges = {
  /** Functions that can be run to start new processes */
  createProcess: CreateProcess | undefined;
  /** Functions that can be run to manage what extensions are running */
  manageExtensions: ManageExtensions | undefined;
  /**
   * Functions and properties related to listening for when the system navigates to a URI built for
   * this extension
   */
  handleUri: HandleUri | undefined;
};

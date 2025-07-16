import type { CreateProcess } from '@shared/models/create-process-privilege.model';
import type { ManageExtensions } from '@shared/models/manage-extensions-privilege.model';
import type { HandleUri } from '@shared/models/handle-uri-privilege.model';

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

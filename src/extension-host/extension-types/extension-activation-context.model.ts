import { ExecutionToken } from '@node/models/execution-token.model';
import { UnsubscriberAsyncList } from 'platform-bible-utils';
import {
  ElevatedPrivileges,
  // Needed for documentation links to work
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ElevatedPrivilegeNames,
} from '@shared/models/elevated-privileges.model';

/** An object of this type is passed into `activate()` for each extension during initialization */
export type ExecutionActivationContext = {
  /** Canonical name of the extension */
  name: string;
  /** Used to save and load data by the storage service. */
  executionToken: ExecutionToken;
  /**
   * Objects that provide special capabilities required by an extension based on the
   * `elevatedPrivileges` values listed in its manifest. For example, if an extension needs to be
   * able to manage other extensions, then it should include `manageExtensions` in the
   * `elevatedPrivileges` array in `manifest.json`. Then when the extension is activated this
   * {@link ElevatedPrivileges} object will have the `manageExtensions` property set to an object
   * with functions used to manage extensions.
   *
   * See {@link ElevatedPrivilegeNames} for the full list of elevated privileges available.
   */
  elevatedPrivileges: ElevatedPrivileges;
  /** Tracks all registrations made by an extension so they can be cleaned up when it is unloaded */
  registrations: UnsubscriberAsyncList;
};

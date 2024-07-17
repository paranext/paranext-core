import { ExecutionToken } from '@node/models/execution-token.model';
import { UnsubscriberAsyncList } from 'platform-bible-utils';
import { ElevatedPrivileges } from '@shared/models/elevated-privileges.model';

/** An object of this type is passed into `activate()` for each extension during initialization */
export type ExecutionActivationContext = {
  /** Canonical name of the extension */
  name: string;
  /** Used to save and load data from the storage service. */
  executionToken: ExecutionToken;
  /** Special permissions required by an extension based on its manifest */
  elevatedPrivileges: ElevatedPrivileges;
  /** Tracks all registrations made by an extension so they can be cleaned up when it is unloaded */
  registrations: UnsubscriberAsyncList;
};

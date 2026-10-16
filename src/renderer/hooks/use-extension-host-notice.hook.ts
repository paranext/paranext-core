import {
  ExtensionHostNotice,
  getExtensionHostNotice,
  subscribeToExtensionHostNotice,
} from '@renderer/services/extension-host-stopped-store';
import { useSyncExternalStore } from 'react';

/**
 * The current extension-host notice, or `undefined` while there is nothing to tell the user.
 *
 * Thin read-only wrapper around the store. It must stay that way: this hook sits on the reaction
 * path to the extension host dying, so it may not acquire a dependency on anything the extension
 * host hosts — no settings read, no localization, no logger that round-trips there.
 */
export function useExtensionHostNotice(): ExtensionHostNotice | undefined {
  return useSyncExternalStore(subscribeToExtensionHostNotice, getExtensionHostNotice);
}

export default useExtensionHostNotice;

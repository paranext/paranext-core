// === NEW IN PT10 === (keyboard-switching CAP-008)
// Reason: PT10 consumer-wrapper pattern — thin module resolving the `platform.keyboard`
// data provider via `dataProviderService.get` and exposing the ergonomic `IKeyboardService`
// surface plus sync-proxied members (precedent: theme.service.ts). No PT9 equivalent.
// Maps to: CAP-008

import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IKeyboardService,
  keyboardServiceObjectToProxy,
  keyboardServiceProviderName,
} from '@shared/services/keyboard.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';

let dataProvider: IKeyboardService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(keyboardServiceProviderName);
          if (!provider) throw new Error('Keyboard service undefined');
          dataProvider = provider;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** JSDOC DESTINATION keyboardService */
export const keyboardService = createSyncProxyForAsyncObject<IKeyboardService>(async () => {
  await initialize();
  return dataProvider;
}, keyboardServiceObjectToProxy);

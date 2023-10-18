import * as networkService from '@shared/services/network.service';
import { CATEGORY_DIALOG, DialogService } from '@shared/services/dialog.service-model';
import { serializeRequestType } from '@shared/utils/papi-util';

let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await networkService.initialize();
    })();
  }
  return initializationPromise;
}

const dialogService: DialogService = {
  showDialog: async (...args) => {
    await initialize();
    return networkService.request(serializeRequestType(CATEGORY_DIALOG, 'showDialog'), ...args);
  },
  selectProject: async (...args) => {
    await initialize();
    return networkService.request(serializeRequestType(CATEGORY_DIALOG, 'selectProject'), ...args);
  },
};

export default dialogService;

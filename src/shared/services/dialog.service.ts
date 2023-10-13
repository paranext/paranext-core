import * as networkService from '@shared/services/network.service';
import { CATEGORY_DIALOG, DialogService } from '@shared/services/dialog.service.model';
import { serializeRequestType } from '@shared/utils/papi-util';

let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {})();
  }
  return initializationPromise;
}

const dialogService: DialogService = {
  getFromUser: async (...args) => {
    await initialize();
    return networkService.request(serializeRequestType(CATEGORY_DIALOG, 'getFromUser'), ...args);
  },
  getProject: async (...args) => {
    await initialize();
    return networkService.request(serializeRequestType(CATEGORY_DIALOG, 'getProject'), ...args);
  },
};

export default dialogService;

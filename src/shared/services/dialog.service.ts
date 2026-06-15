import * as networkService from '@shared/services/network.service';
import { CATEGORY_DIALOG, DialogService } from '@shared/services/dialog.service-model';
import { serializeRequestType } from '@shared/utils/util';
import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
import { createCachedInitializer } from 'platform-bible-utils';

const initialize = createCachedInitializer(async () => {
  await networkService.initialize();
});

export const dialogService: DialogService = {
  showDialog: async <DialogTabType extends DialogTabTypes>(
    dialogType: DialogTabType,
    options?: DialogTypes[DialogTabType]['options'],
  ): Promise<DialogTypes[DialogTabType]['responseType'] | undefined> => {
    await initialize();
    return networkService.request(
      serializeRequestType(CATEGORY_DIALOG, 'showDialog'),
      dialogType,
      options,
    );
  },
  selectProject: async (...args) => {
    await initialize();
    return networkService.request(serializeRequestType(CATEGORY_DIALOG, 'selectProject'), ...args);
  },
  showAboutDialog: async () => {
    await initialize();
    return networkService.request(serializeRequestType(CATEGORY_DIALOG, 'showAboutDialog'));
  },
};

export default dialogService;

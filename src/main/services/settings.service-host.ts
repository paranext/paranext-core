import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { DataProviderEngine } from '@shared/services/data-provider.service';
import { SettingDataTypes } from '@shared/services/settings.service-model';
import { SettingNames } from 'papi-shared-types';

class SettingDataProviderEngine
  extends DataProviderEngine<SettingDataTypes>
  implements IDataProviderEngine<SettingDataTypes>
{
  // Where do our settings live? Some JSON object/file/whatever?

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  async getSetting(key: string): Promise<SettingNames> {}

  async setSetting(key: string, value: SettingNames): Promise<SettingNames> {}
}

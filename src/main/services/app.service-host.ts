import { APP_NAME, APP_URI_SCHEME, APP_VERSION } from '@shared/data/platform.data';
import {
  AppInfo,
  appServiceNetworkObjectName,
  IAppService,
} from '@shared/services/app.service-model';
import { networkObjectService } from '@shared/services/network-object.service';

const APP_INFO = Object.freeze({
  name: APP_NAME,
  version: APP_VERSION,
  uriScheme: APP_URI_SCHEME,
});

async function getAppInfo(): Promise<AppInfo> {
  return APP_INFO;
}

const appService: IAppService = {
  getAppInfo,
};

/** Register the network object that backs this service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `app.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startAppService(): Promise<void> {
  await networkObjectService.set<IAppService>(appServiceNetworkObjectName, appService);
}

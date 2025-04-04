import {
  AppInfo,
  appServiceNetworkObjectName,
  IAppService,
} from '@shared/services/app.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import packageInfo from '../../../release/app/package.json';
import buildInfo from '../../../release/app/buildInfo.json';

export const APP_NAME: string = packageInfo.name;

const { id, label } = buildInfo;
export const APP_VERSION: string = `${packageInfo.version}${label ? `-${label}` : ''}${id ? `+${id}` : ''}`;

export const APP_URI_SCHEME = APP_NAME;

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

/**
 * Register the network object that backs this service
 *
 * To use this service, you should use `app.service.ts`
 */
export async function startAppService(): Promise<void> {
  await networkObjectService.set<IAppService>(appServiceNetworkObjectName, appService);
}

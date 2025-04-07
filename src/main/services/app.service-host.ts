import {
  AppInfo,
  appServiceNetworkObjectName,
  IAppService,
} from '@shared/services/app.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import packageInfo from '../../../release/app/package.json';
import buildInfo from '../../../release/app/buildInfo.json';

/** Same as {@link AppInfo.name} */
export const APP_NAME: string = packageInfo.name;

// Construct the app version according to the SemVer specification (pre-release ID already included)
const { build } = buildInfo;
/** Same as {@link AppInfo.version} */
export const APP_VERSION: string = `${packageInfo.version}${build ? `+${build}` : ''}`;

/** Same as {@link AppInfo.uriScheme} */
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

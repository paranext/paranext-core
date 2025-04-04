// Used in JSDoc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ElevatedPrivileges } from '@shared/models/elevated-privileges.model';

/**
 * Information about the app that is currently running.
 *
 * All of the information in this object is static and is determined at build time. It will not
 * change throughout the lifetime of the app or across runs of the same build.
 */
// WARNING: NEVER PUT ANY INFORMATION IN THIS OBJECT THAT IS NOT STATICALLY DETERMINABLE AT BUILD TIME
export type AppInfo = Readonly<{
  /**
   * Programmatic name of the application
   *
   * @example `platform-bible`.
   *
   * Note: this is an identifier for the application, not this application's executable file name
   */
  name: string;
  /**
   * Version of the app. This is in [semver](https://semver.org/) format.
   *
   * @example `0.3.0`
   *
   * @example `1.2.3-ordered.info.here+additional.unordered.info.here123`
   */
  version: string;
  /**
   * URI scheme that this application handles. Navigating to a URI with this scheme will open this
   * application. This application will handle the URI as it sees fit. For example, the URI may be
   * handled by an extension - see {@link ElevatedPrivileges.handleUri } for more information.
   *
   * This is the same as {@link AppInfo.name}.
   */
  uriScheme: string;
}>;

/** JSDOC DESTINATION appService */
export interface IAppService {
  /** Retrieve information about the application that is currently running like name and version. */
  getAppInfo(): Promise<AppInfo>;
}

export const appServiceNetworkObjectName = 'AppService';

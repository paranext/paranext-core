// Functions that are exposed through the network object

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
  /** JSDOC DESTINATION appUriScheme */
  uriScheme: string;
}>;

/** JSDOC DESTINATION appService */
export interface IAppService {
  /** Retrieve information about the application that is currently running like name and version. */
  getAppInfo(): Promise<AppInfo>;
}

export const appServiceNetworkObjectName = 'AppService';

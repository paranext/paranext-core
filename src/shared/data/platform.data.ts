// Used in JSDoc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ElevatedPrivileges } from '@shared/models/elevated-privileges.model';

// This must be a `require`! Do not change to `import`. Importing outside `src` messes up papi.d.ts
const packageInfo = require('../../../release/app/package.json');

/**
 * Namespace to use for features like commands, settings, etc. on the PAPI that are provided by
 * Platform.Bible core
 */
export const PLATFORM_NAMESPACE = 'platform';

/**
 * Name of this application like `platform.bible`.
 *
 * Note: this is an identifier for the application, not this application's executable file name
 */
export const APP_NAME = packageInfo.name;

/** Version of this application in [semver](https://semver.org/) format. */
export const APP_VERSION = packageInfo.version;

/**
 * URI scheme that this application handles. Navigating to a URI with this scheme will open this
 * application. This application will handle the URI as it sees fit. For example, the URI may be
 * handled by an extension - see {@link ElevatedPrivileges.registerUriHandler } for more
 * information.
 *
 * This is the same as {@link APP_NAME}.
 */
export const APP_URI_SCHEME = APP_NAME;

/** Query string passed to the renderer when starting if it should enable noisy dev mode */
export const DEV_MODE_RENDERER_INDICATOR = '?noisyDevMode';

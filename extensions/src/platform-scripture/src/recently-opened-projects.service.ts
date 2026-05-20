import papi, { DataProviderEngine, logger } from '@papi/backend';
import type { IDisposableDataProvider } from '@papi/core';
import { createSyncProxyForAsyncObject, getErrorMessage } from 'platform-bible-utils';
import type {
  IRecentlyOpenedProjectsService,
  RecentlyOpenedProjectsDataTypes,
} from 'platform-scripture';

/** Storage key under the platform-scripture extension's user data. */
export const RECENTLY_OPENED_PROJECTS_STORAGE_KEY = 'recentlyOpenedProjects';

/** Maximum number of project IDs kept in the recent projects list. */
export const MAX_RECENT_PROJECTS = 5;

/** Name used to register and look up this data provider on the PAPI. */
export const RECENTLY_OPENED_PROJECTS_DATA_PROVIDER_NAME =
  'platformScripture.recentlyOpenedProjects';

/**
 * Parse a raw JSON string from user storage into a validated list of project IDs. Returns `[]` on
 * any deviation from the expected shape: invalid JSON, non-array root, non-string elements, empty
 * strings. Caps the result at {@link MAX_RECENT_PROJECTS}.
 */
function parseAndValidate(raw: string): string[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const filtered = parsed.filter(
    (item): item is string => typeof item === 'string' && item.length > 0,
  );
  return filtered.slice(0, MAX_RECENT_PROJECTS);
}

function arraysShallowEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Engine for the recently-opened-projects data provider.
 *
 * Storage I/O is delegated to constructor-injected callbacks so tests can use in-memory fakes
 * without standing up papi.storage. Production wiring in main.ts supplies callbacks backed by
 * `papi.storage.readUserData` / `writeUserData` scoped to the extension's execution token.
 */
export class RecentlyOpenedProjectsDataProviderEngine extends DataProviderEngine<RecentlyOpenedProjectsDataTypes> {
  private cache: string[] | undefined;

  constructor(
    private readonly readRaw: () => Promise<string>,
    private readonly writeRaw: (data: string) => Promise<void>,
  ) {
    super();
  }

  async getRecentProjects(): Promise<string[]> {
    return this.loadCache();
  }

  // Set is not supported externally; recordProjectOpened is the only mutation path. The data type
  // declares the set value as `never`, so TypeScript prevents external callers; this throw is the
  // runtime safety net for callers that bypass types.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setRecentProjects(): never {
    throw new Error('setRecentProjects is not supported; use recordProjectOpened instead');
  }

  async recordProjectOpened(projectId: string): Promise<void> {
    if (!projectId || !projectId.trim()) return;
    const current = await this.loadCache();
    const next = [projectId, ...current.filter((id) => id !== projectId)].slice(
      0,
      MAX_RECENT_PROJECTS,
    );
    if (arraysShallowEqual(next, current)) return;
    await this.writeRaw(JSON.stringify(next));
    this.cache = next;
    this.notifyUpdate('RecentProjects');
  }

  private async loadCache(): Promise<string[]> {
    if (this.cache) return this.cache;
    let raw: string;
    try {
      raw = await this.readRaw();
    } catch (e) {
      logger.warn(
        `Recently opened projects: read from storage failed (${getErrorMessage(e)}); treating as empty`,
      );
      this.cache = [];
      return this.cache;
    }
    this.cache = parseAndValidate(raw);
    return this.cache;
  }
}

let initializationPromise: Promise<void> | undefined;
let dataProvider: IDisposableDataProvider<IRecentlyOpenedProjectsService>;

async function initialize(
  readRaw: () => Promise<string>,
  writeRaw: (data: string) => Promise<void>,
): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      dataProvider = await papi.dataProviders.registerEngine(
        RECENTLY_OPENED_PROJECTS_DATA_PROVIDER_NAME,
        new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw),
      );
    })();
  }
  return initializationPromise;
}

const serviceObjectToProxy = Object.freeze({});

const serviceObject = createSyncProxyForAsyncObject<IRecentlyOpenedProjectsService>(async () => {
  // The service-object proxy is created at module-load time, but initialize() requires the
  // execution-token-bound storage callbacks supplied by activate(). Callers that touch this proxy
  // must therefore wait until initialize() has been awaited in activate(). The proxy itself simply
  // re-fetches the registered data provider; it is not the place to construct one.
  if (!dataProvider) throw new Error('Recently opened projects service is not initialized');
  return dataProvider;
}, serviceObjectToProxy);

async function dispose(): Promise<boolean> {
  return dataProvider ? dataProvider.dispose() : true;
}

/** Service for tracking which projects the user has opened as a main project in Simple mode. */
export const recentlyOpenedProjectsService = {
  initialize,
  dispose,
  serviceObject,
};

export default recentlyOpenedProjectsService;

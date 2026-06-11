import {
  ContextKeyValue,
  isValidContextKey,
  isValidContextKeyValue,
  PlatformEventEmitter,
} from 'platform-bible-utils';
import {
  ContextKeySharedStoreKey,
  onDidChangeSharedStore,
  sharedStoreService,
} from '@shared/services/shared-store.service';
import {
  ContextKeyChangeEvent,
  IContextKeysService,
} from '@shared/services/context-keys.service-model';

/** Prefix under which all context keys live in the shared store */
const CONTEXT_KEYS_STORE_PREFIX = 'contextKeys.';

function getStoreKey(key: string): ContextKeySharedStoreKey {
  return `${CONTEXT_KEYS_STORE_PREFIX}${key}`;
}

function assertValidKey(key: string): void {
  if (!isValidContextKey(key))
    throw new Error(
      `Invalid context key '${key}'. Context keys must have at least two dot-separated segments of word characters or hyphens, e.g. 'myExtension.someProperty'`,
    );
}

function set(key: string, value: ContextKeyValue): void {
  assertValidKey(key);
  if (!isValidContextKeyValue(value))
    throw new Error(
      `Invalid context key value for '${key}'. Only string, number, and boolean values are allowed`,
    );
  sharedStoreService.set(getStoreKey(key), value);
}

function get(key: string): ContextKeyValue | undefined {
  assertValidKey(key);
  return sharedStoreService.get(getStoreKey(key));
}

function remove(key: string): void {
  assertValidKey(key);
  sharedStoreService.remove(getStoreKey(key));
}

const onDidChangeEmitter = new PlatformEventEmitter<ContextKeyChangeEvent>();

// Forward shared-store changes within the contextKeys namespace to our subscribers with the
// internal storage prefix stripped
onDidChangeSharedStore((event) => {
  if (!event.key.startsWith(CONTEXT_KEYS_STORE_PREFIX)) return;
  onDidChangeEmitter.emit({
    key: event.key.substring(CONTEXT_KEYS_STORE_PREFIX.length),
    // Values in the contextKeys namespace are constrained to ContextKeyValue on every writer
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    value: event.value as ContextKeyValue | undefined,
  });
});

/**
 * JSDOC SOURCE contextKeysService
 *
 * Service for reading and writing context keys: named properties that drive dynamic UI state such
 * as menu item visibility (`when`), enablement (`enabledWhen`), and checked state (`checkedWhen`)
 * declared in menus.json contributions.
 *
 * Context keys live in a single flat, in-memory, cross-process store (the platform shared store),
 * so reads are synchronous — no network calls. Values are ephemeral: they are never persisted and
 * producers must re-publish after a restart.
 *
 * Conventions:
 *
 * - Key format: at least two dot-separated segments of word characters or hyphens
 * - Prefix keys with your extension's name; `platform.` is reserved for the platform
 * - Scoping is by key construction, e.g. `myExt.project.<projectId>.isEditable` — menu expressions
 *   reference these with template variables like `{projectId}`
 * - Each key should have exactly one producer. A key first set in one process can only be updated
 *   from that same process
 */
export const contextKeysService = {
  set,
  get,
  remove,
  /**
   * Event that fires when any context key changes (whether changed locally or in another process).
   * Not included in the public PAPI surface ({@link papiContextKeysService}).
   */
  onDidChange: onDidChangeEmitter.event,
};

/** Subset of the context keys service exposed on PAPI (both `@papi/backend` and `@papi/frontend`) */
export const papiContextKeysService: IContextKeysService = { set, get, remove };

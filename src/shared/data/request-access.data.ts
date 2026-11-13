import type { RequestCallerProcess } from '@shared/models/network.model';

/**
 * Which process a PAPI connection belongs to, as main determined it when it accepted the
 * connection. `'main'` is main's own in-process calls; `'unidentified'` is a WebSocket client that
 * presented no launch secret.
 */
export type ConnectionIdentity = 'main' | RequestCallerProcess | 'unidentified';

/** Who may call and who may register a restricted request type */
export type RequestAccessRule = Readonly<{
  /** Processes allowed to call the request type. Main is always allowed as well. */
  callers: readonly RequestCallerProcess[];
  /** The only identity allowed to register a handler for the request type */
  registrant: Exclude<ConnectionIdentity, 'unidentified'>;
}>;

const ALL_REQUEST_CALLER_PROCESSES: readonly RequestCallerProcess[] = [
  'renderer',
  'extensionHost',
  'dotnetDataProvider',
];

function rule(
  callers: RequestCallerProcess[],
  registrant: RequestAccessRule['registrant'],
): RequestAccessRule {
  return Object.freeze({ callers: Object.freeze(callers), registrant });
}

// Request types are spelled out rather than imported from the modules that register them: this
// module is reachable from `papi.d.ts`, and importing those modules would publish them too.

/**
 * Rules for whole request type categories. Any request type in the category is covered, including
 * one added later.
 */
const CATEGORY_RULES: ReadonlyMap<string, RequestAccessRule> = new Map([
  ['requestRegistryTokens', rule(['extensionHost'], 'dotnetDataProvider')],
]);

/** Rules for single request types */
const REQUEST_TYPE_RULES: ReadonlyMap<string, RequestAccessRule> = new Map([
  [
    'object:paratextRegistration.internetSettingsDataProvider-data.setInternetSettings',
    rule(['renderer', 'extensionHost'], 'dotnetDataProvider'),
  ],
  [
    'command:paratextRegistration.setParatextDataInternetSettings',
    rule(['renderer', 'extensionHost'], 'dotnetDataProvider'),
  ],
  [
    'command:paratextRegistration.setParatextRegistrationData',
    rule(['renderer', 'extensionHost'], 'dotnetDataProvider'),
  ],
  ['command:paratextRegistration.resetForFirstRun', rule([], 'dotnetDataProvider')],
  ['command:platform.resetFirstRun', rule(['renderer'], 'main')],
  ['object:DataProtectionService.encryptString', rule(['extensionHost'], 'main')],
  ['object:DataProtectionService.decryptString', rule(['extensionHost'], 'main')],
  ['command:platform.getLogFileContent', rule(['renderer'], 'main')],
]);

/**
 * Gets the rule restricting a request type, if any.
 *
 * @param requestType Serialized request type, e.g. `command:platform.getLogFileContent`
 * @returns The frozen rule, or `undefined` when the request type is not restricted
 */
export function getRequestAccessRule(requestType: string): RequestAccessRule | undefined {
  const exactRule = REQUEST_TYPE_RULES.get(requestType);
  if (exactRule) return exactRule;
  // Request types are ASCII by construction, so native string search is safe here
  const separatorIndex = requestType.indexOf(':');
  if (separatorIndex < 0) return undefined;
  return CATEGORY_RULES.get(requestType.slice(0, separatorIndex));
}

/**
 * Whether a connection may register a handler for a request type. Anyone may register a request
 * type with no rule; a restricted one only by its registrant.
 */
export function isRegistrationAllowed(
  requestType: string,
  registrant: ConnectionIdentity,
): boolean {
  const accessRule = getRequestAccessRule(requestType);
  return !accessRule || accessRule.registrant === registrant;
}

/**
 * Whether a connection may call a request type. Main may always call. A request type with a rule
 * follows the rule, whatever the registrant declared; otherwise the registrant's `allowedCallers`
 * applies when it declared one.
 *
 * @param requestType Serialized request type
 * @param caller Identity of the calling connection
 * @param registrantAllowedCallers The `allowedCallers` the registering process declared, if any
 */
export function isCallAllowed(
  requestType: string,
  caller: ConnectionIdentity,
  registrantAllowedCallers?: readonly RequestCallerProcess[],
): boolean {
  if (caller === 'main') return true;
  if (caller === 'unidentified') {
    return !getRequestAccessRule(requestType) && !registrantAllowedCallers;
  }
  const allowedCallers = getRequestAccessRule(requestType)?.callers ?? registrantAllowedCallers;
  return !allowedCallers || allowedCallers.includes(caller);
}

/**
 * Validates an `allowedCallers` value that arrived from another process.
 *
 * @param value The value to validate
 * @returns `undefined` when `value` is `undefined`, otherwise a copy of the validated array
 * @throws When `value` is anything but an array of {@link RequestCallerProcess}
 */
export function parseAllowedCallers(value: unknown): RequestCallerProcess[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) throw new Error('allowedCallers must be an array');
  return value.map((entry: unknown) => {
    const caller = ALL_REQUEST_CALLER_PROCESSES.find((process) => process === entry);
    if (!caller) throw new Error('allowedCallers names an unknown process');
    return caller;
  });
}

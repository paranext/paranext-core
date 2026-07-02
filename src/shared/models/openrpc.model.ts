// The OpenRPC schema types are hand-translated from JSON Schema and inherently require `any` for
// fields that accept arbitrary JSON values (e.g., schema examples, default values, extensions).
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWebSocketUrl } from '@shared/data/rpc.model';
import type { JSONSchema7 } from 'json-schema';

// #region OpenRPC types translated from JSON Schema to TypeScript

/**
 * Describes APIs available to call using JSON-RPC 2.0
 *
 * See https://github.com/open-rpc/meta-schema/releases - Release 1.14.3 aligns with OpenRPC 1.3.0.
 * https://github.com/open-rpc/meta-schema/releases/download/1.14.3/open-rpc-meta-schema.json
 *
 * We declare OpenRPC `1.3.0` because notifications (a method with no `result`) were introduced in
 * 1.3.0 — `result` was required in 1.2.6, so a document with notifications is invalid under the
 * 1.2.6 meta-schema. The OpenRPC playground (https://playground.open-rpc.org/) is still capped at
 * 1.2.6 (https://github.com/open-rpc/playground/issues/606), but it renders a 1.3.0 document fine
 * in practice; it lists notifications under the same "Methods" heading (without a results field),
 * which we mitigate by prefixing notification summaries with {@link NOTIFICATION_OPENRPC_PREFIX}.
 *
 * Note that the types from https://www.npmjs.com/package/@open-rpc/meta-schema/v/1.14.3 are not
 * very good. For example, all the properties of `Components` are of type `any` instead of the
 * specific types they should be, and they redefine types for JSON Schema. So we're using our own
 * types here instead.
 */
export type OpenRpc = {
  openrpc: string;
  info: Info;
  servers?: Server[];
  methods: (Method | OpenRpcNotification)[];
  components?: Components;
  externalDocs?: ExternalDocumentation;
};

export type Components = {
  schemas?: { [key: string]: Schema };
  contentDescriptors?: { [key: string]: ContentDescriptor };
  examples?: { [key: string]: Example };
  links?: { [key: string]: Link };
  errors?: { [key: string]: Error };
  tags?: { [key: string]: Tag };
};

export type ComponentsReference = `#/components/${string}`;

export type Contact = {
  name?: string;
  email?: string;
  url?: string;
};

export type ContentDescriptor = {
  name: string;
  schema: Schema;
  required?: boolean;
  summary?: string;
  description?: string;
  deprecated?: boolean;
};

export type Error = {
  code: number;
  message: string;
  data?: any;
};

export type Example = {
  name: string;
  value: any;
  summary?: string;
  description?: string;
};

export type ExamplePairingObject = {
  name: string;
  params: (Example | Reference)[];
  result: Example | Reference;
  description?: string;
};

export type ExternalDocumentation = {
  url: string;
  description?: string;
};

export type Info = {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
};

export type License = {
  name: string;
  url?: string;
};

export type Link = {
  name?: string;
  summary?: string;
  description?: string;
  method?: string;
  params?: { [key: string]: any };
  server?: Server;
};

export type Method = {
  /** The canonical name for the method. The name MUST be unique within the methods array. */
  name: string;
  params: (ContentDescriptor | Reference)[];
  result: ContentDescriptor | Reference;
  /**
   * Set to `true` to mark this method as experimental — its shape may change without notice.
   * Informational only; does not affect runtime behavior. See the
   * {@link https://github.com/paranext/paranext-extension-template/wiki/Experimental-APIs | experimental APIs wiki page}.
   */
  'x-experimental'?: boolean;
  /** A short summary of what the method does. */
  summary?: string;
  /**
   * A verbose explanation of the method behavior. GitHub Flavored Markdown syntax MAY be used for
   * rich text representation.
   */
  description?: string;
  deprecated?: boolean;
  servers?: Server[];
  tags?: (Tag | Reference)[];
  /** Format the server expects the params. Defaults to 'either'. */
  paramStructure?: 'by-name' | 'by-position' | 'either';
  errors?: (Error | Reference)[];
  links?: (Link | Reference)[];
  examples?: (ExamplePairingObject | Reference)[];
  externalDocs?: ExternalDocumentation;
};

export type Reference = {
  $ref: ComponentsReference;
};

export type Server = {
  url: string;
  name?: string;
  description?: string;
  summary?: string;
  variables?: { [key: string]: ServerVariable };
};

export type ServerVariable = {
  default: string;
  description?: string;
  enum?: string[];
};

export type Schema = JSONSchema7;

export type Tag = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
};

// #endregion

export type MethodDocumentationWithoutName = Omit<Method, 'name'>;

/**
 * Documentation about a single {@link Method}.
 *
 * Set `method['x-experimental']: true` to mark this method as experimental. Informational only;
 * appears in the generated OpenRPC document.
 */
export type SingleMethodDocumentation = {
  method: MethodDocumentationWithoutName;
  components?: Components;
};

/**
 * An OpenRPC notification — same shape as a {@link Method}, but without `result`. Used for events /
 * one-way messages from server to client. Per the OpenRPC convention (no `result` ⇒ notification),
 * these are serialized into the same root `methods` array as Methods on the wire.
 *
 * Set `'x-experimental': true` on the notification object to mark it as experimental. Informational
 * only; appears in the generated OpenRPC document.
 */
export type OpenRpcNotification = Omit<Method, 'result'>;

/**
 * Documentation about a single {@link OpenRpcNotification}.
 *
 * Set `notification['x-experimental']: true` to mark this notification as experimental.
 * Informational only; appears in the generated OpenRPC document.
 */
export type SingleNotificationDocumentation = {
  notification: Omit<OpenRpcNotification, 'name'>;
  components?: Components;
};

/**
 * Documentation about a network object — what it is, and OpenRPC documentation for each of its
 * methods.
 */
export type NetworkObjectDocumentation = {
  summary?: string;
  description?: string;
  methods?: Method[];
  components?: Components;
  /**
   * Set to `true` to mark every {@link Method} registered for this network object as experimental.
   * The marker is fanned out onto each method's `'x-experimental'` field inside
   * `networkObjectService.set`.
   */
  'x-experimental'?: boolean;
};

/** Create an object of type {@link OpenRpc} to hold documentation for PAPI websocket methods */
export function createEmptyOpenRpc(papiVersion: string): OpenRpc {
  return {
    openrpc: '1.3.0',
    info: {
      version: papiVersion,
      title: 'Live PAPI documentation',
      description:
        'All methods currently registered with PAPI. They change dynamically as methods are registered and unregistered. This page does not automatically refresh to show any changes.\n\nSee additional helpful documentation for [extension developers](https://github.com/paranext/paranext-extension-template/wiki).',
      contact: {
        name: 'Platform.Bible Team',
        url: 'https://discord.gg/tzw22PUEAY',
      },
      license: {
        name: 'MIT',
        url: 'https://github.com/paranext/paranext-core/blob/main/LICENSE',
      },
    },
    servers: [
      {
        name: 'Platform.Bible and Paratext 10 Studio Wiki',
        url: 'https://github.com/paranext/paranext-core/wiki/Platform.Bible-and-Paratext-10-Studio',
      },
      {
        name: 'TypeScript docs for PAPI React components, general library components, and API calls',
        url: 'https://paranext.github.io/paranext-core/',
      },
      {
        name: 'PAPI websocket',
        url: getWebSocketUrl(),
      },
    ],
    methods: [],
    components: {},
  };
}

const emptyDocs: MethodDocumentationWithoutName = {
  summary: '',
  description: 'Method: No documentation provided',
  params: [],
  result: {
    name: 'return value',
    schema: {},
  },
};
Object.freeze(emptyDocs);
Object.freeze(emptyDocs.params);
Object.freeze(emptyDocs.result);
// @ts-expect-error 2339 - TS doesn't understand that 'schema' is part of 'result'
Object.freeze(emptyDocs.result.schema);

/**
 * Get an empty {@link OpenRpc} method document object. Useful for populating documentation for
 * methods that didn't have their own documentation provided.
 */
export function getEmptyMethodDocs(): MethodDocumentationWithoutName {
  return emptyDocs;
}

// A notification is a {@link Method} without a `result`, so its placeholder docs are the empty
// method docs minus `result`.
const emptyNotificationDocs: Omit<MethodDocumentationWithoutName, 'result'> = {
  summary: '',
  description: 'Notification: No documentation provided',
  params: [],
};
Object.freeze(emptyNotificationDocs);
Object.freeze(emptyNotificationDocs.params);

/**
 * Get an empty {@link OpenRpcNotification} documentation object. Useful for surfacing events that
 * didn't have their own documentation provided so that every registered event still appears in the
 * OpenRPC document (mirroring how undocumented methods are surfaced via
 * {@link getEmptyMethodDocs}).
 */
export function getEmptyNotificationDocs(): Omit<MethodDocumentationWithoutName, 'result'> {
  return emptyNotificationDocs;
}

/** Prefix prepended to the `summary` and `description` of experimental methods and notifications. */
export const EXPERIMENTAL_OPENRPC_PREFIX = '[EXPERIMENTAL] ';

/**
 * Prepends {@link EXPERIMENTAL_OPENRPC_PREFIX} to a summary/description string. Leaves the string
 * unchanged when it already starts with the prefix (idempotent). A falsy string still receives the
 * prefix, so an experimental entry is always visibly marked even when it had no text.
 */
function prependExperimental(text: string | undefined): string {
  if (text?.startsWith(EXPERIMENTAL_OPENRPC_PREFIX)) return text;
  return `${EXPERIMENTAL_OPENRPC_PREFIX}${text ?? ''}`;
}

/**
 * Returns a shallow copy of an OpenRPC {@link Method} or {@link OpenRpcNotification} with
 * {@link EXPERIMENTAL_OPENRPC_PREFIX} prepended to its `summary` and `description` when the entry is
 * marked `'x-experimental'`. Both fields are always set on an experimental entry — even a missing
 * or empty summary/description becomes the bare prefix so the marker is never lost. Idempotent: an
 * entry already starting with the prefix is left unchanged. Returns the entry untouched when it is
 * not experimental.
 */
export function withExperimentalPrefix<T extends Method | OpenRpcNotification>(entry: T): T {
  if (!entry['x-experimental']) return entry;
  const prefixed = { ...entry };
  prefixed.summary = prependExperimental(prefixed.summary);
  prefixed.description = prependExperimental(prefixed.description);
  return prefixed;
}

/**
 * Prefix prepended to a notification's `summary`. OpenRPC carries notifications in the same root
 * `methods` array as methods, so tooling that lists both together (e.g. the OpenRPC playground)
 * shows them under one "Methods" heading. This prefix makes notifications distinguishable at a
 * glance, the same way {@link EXPERIMENTAL_OPENRPC_PREFIX} marks experimental entries.
 */
export const NOTIFICATION_OPENRPC_PREFIX = '(Notification) ';

/**
 * Returns a shallow copy of an OpenRPC {@link OpenRpcNotification} with
 * {@link NOTIFICATION_OPENRPC_PREFIX} prepended to its `summary` so it is distinguishable from
 * methods in tooling that lists both together. Applied to every notification (unlike the
 * experimental prefix). Idempotent: an entry whose summary already starts with the prefix is left
 * unchanged.
 */
export function withNotificationPrefix(entry: OpenRpcNotification): OpenRpcNotification {
  if (entry.summary?.startsWith(NOTIFICATION_OPENRPC_PREFIX)) return entry;
  return { ...entry, summary: `${NOTIFICATION_OPENRPC_PREFIX}${entry.summary ?? ''}` };
}

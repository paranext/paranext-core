// The OpenRPC schema types are hand-translated from JSON Schema and inherently require `any` for
// fields that accept arbitrary JSON values (e.g., schema examples, default values, extensions).
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import type { JSONSchema7 } from 'json-schema';

// #region OpenRPC types translated from JSON Schema to TypeScript

/**
 * Describes APIs available to call using JSON-RPC 2.0
 *
 * See https://github.com/open-rpc/meta-schema/releases - Release 1.14.2 aligns with OpenRPC 1.2.6.
 * https://github.com/open-rpc/meta-schema/releases/download/1.14.2/open-rpc-meta-schema.json
 *
 * We don't want to go past 1.2.6 because https://playground.open-rpc.org/ doesn't support anything
 * past 1.2.6 for now. See https://github.com/open-rpc/playground/issues/606.
 *
 * Note that the types from https://www.npmjs.com/package/@open-rpc/meta-schema/v/1.14.2 are not
 * very good. For example, all the properties of `Components` are of type `any` instead of the
 * specific types they should be, and they redefine types for JSON Schema. So we're using our own
 * types here instead.
 */
export type OpenRpc = {
  openrpc: string;
  info: Info;
  servers?: Server[];
  methods: (Method | Notification)[];
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
export type Notification = Omit<Method, 'result'>;

/**
 * Documentation about a single {@link Notification}.
 *
 * Set `notification['x-experimental']: true` to mark this notification as experimental.
 * Informational only; appears in the generated OpenRPC document.
 */
export type SingleNotificationDocumentation = {
  notification: Omit<Notification, 'name'>;
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
    openrpc: '1.2.6',
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
        url: `ws://localhost:${WEBSOCKET_PORT}`,
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
 * Get an empty {@link Notification} documentation object. Useful for surfacing events that didn't
 * have their own documentation provided so that every registered event still appears in the OpenRPC
 * document (mirroring how undocumented methods are surfaced via {@link getEmptyMethodDocs}).
 */
export function getEmptyNotificationDocs(): Omit<MethodDocumentationWithoutName, 'result'> {
  return emptyNotificationDocs;
}

/** Prefix prepended to the `summary` and `description` of experimental methods and notifications. */
export const EXPERIMENTAL_OPENRPC_PREFIX = 'EXPERIMENTAL: ';

/**
 * Returns a shallow copy of an OpenRPC {@link Method} or {@link Notification} with
 * {@link EXPERIMENTAL_OPENRPC_PREFIX} prepended to its `summary` and `description` when the entry is
 * marked `'x-experimental'`. Returns the entry unchanged when it is not experimental. Call this on
 * a freshly-built entry so the prefix is applied at most once.
 */
export function withExperimentalPrefix<T extends Method | Notification>(entry: T): T {
  if (!entry['x-experimental']) return entry;
  const prefixed = { ...entry };
  if (prefixed.summary !== undefined)
    prefixed.summary = `${EXPERIMENTAL_OPENRPC_PREFIX}${prefixed.summary}`;
  if (prefixed.description !== undefined)
    prefixed.description = `${EXPERIMENTAL_OPENRPC_PREFIX}${prefixed.description}`;
  return prefixed;
}

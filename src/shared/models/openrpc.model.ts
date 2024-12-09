/* eslint-disable @typescript-eslint/no-explicit-any */
import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import type { JSONSchema7 } from 'json-schema';

// TODO
// https://playground.open-rpc.org/?transport=websocket&schemaUrl=ws%3A%2F%2Flocalhost%3A8876%0A&uiSchema[appBar][ui:splitView]=false&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false&uiSchema[appBar][ui:transports]=false&uiSchema[appBar][ui:darkMode]=true&uiSchema[appBar][ui:title]=PAPI

// #region OpenRPC types translated from JSON Schema to TypeScript

/**
 * Describes APIs available to call using JSON-RPC 2.0
 *
 * See https://github.com/open-rpc/meta-schema/releases - Release 1.14.2 aligns with OpenRPC 1.2.6.
 * https://github.com/open-rpc/meta-schema/releases/download/1.14.2/open-rpc-meta-schema.json
 *
 * We don't want to go past 1.2.6 because https://playground.open-rpc.org/ doesn't support anything
 * past 1.2.6 for now. See https://github.com/open-rpc/playground/issues/606.
 */
export type OpenRpc = {
  openrpc: string;
  info: Info;
  servers?: Server[];
  methods: Method[];
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

/** Documentation about a single method */
export type SingleMethodDocumentation = {
  method: Omit<Method, 'name'>;
  components?: Components;
};

/** Documentation about all methods on a network object */
export type NetworkObjectDocumentation = {
  summary?: string;
  description?: string;
  methods?: Method[];
  components?: Components;
};

export function createEmptyOpenRpc(papiVersion: string): OpenRpc {
  return {
    openrpc: '1.2.6',
    info: {
      version: papiVersion,
      title: 'Live PAPI documentation',
      description:
        'All methods currently registered with PAPI. They change dynamically as methods are registered and unregistered. This page does not automatically refresh to show any changes.',
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

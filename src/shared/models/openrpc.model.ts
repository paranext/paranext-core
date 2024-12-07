/* eslint-disable @typescript-eslint/no-explicit-any */
import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import type { JSONSchema7 } from 'json-schema';

// TODO
// https://playground.open-rpc.org/?transport=websocket&schemaUrl=ws%3A%2F%2Flocalhost%3A8876%0A&uiSchema[appBar][ui:splitView]=false&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false&uiSchema[appBar][ui:transports]=false&uiSchema[appBar][ui:darkMode]=true&uiSchema[appBar][ui:title]=PAPI

/**
 * Describes APIs available to call using JSON-RPC 2.0
 *
 * See https://github.com/open-rpc/meta-schema/releases - Release 1.14.2 aligns with OpenRPC 1.2.6.
 * https://github.com/open-rpc/meta-schema/releases/download/1.14.2/open-rpc-meta-schema.json
 *
 * We don't want to go past 1.2.6 because https://playground.open-rpc.org/ doesn't support anything
 * past 1.2.6 for now.
 */
export type OpenRpc = {
  openrpc: string;
  info: Info;
  servers?: Server[];
  methods: Method[];
  components?: Components;
  externalDocs?: ExternalDocumentation;
};

export type Info = {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
};

export type Contact = {
  name?: string;
  url?: string;
  email?: string;
};

export type License = {
  name: string;
  url?: string;
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

export type Method = {
  name: string;
  description?: string;
  params?: ContentDescriptor[];
  result: ContentDescriptor;
  deprecated?: boolean;
  servers?: Server[];
  errors?: Error[];
  links?: Link[];
  examples?: Example[];
  tags?: Tag[];
  externalDocs?: ExternalDocumentation;
};

export type ContentDescriptor = {
  name: string;
  required?: boolean;
  summary?: string;
  description?: string;
  deprecated?: boolean;
  schema: Schema;
};

export type Schema = JSONSchema7;

export type Error = {
  code: number;
  message: string;
  data?: any;
};

export type Link = {
  name: string;
  description?: string;
  method: string;
  params?: { [key: string]: any };
};

export type Example = {
  name: string;
  description?: string;
  params: { [key: string]: any };
  result: any;
};

export type Tag = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
};

export type ExternalDocumentation = {
  description?: string;
  url: string;
};

export type Components = {
  schemas?: { [key: string]: Schema };
  contentDescriptors?: { [key: string]: ContentDescriptor };
  examples?: { [key: string]: Example };
  links?: { [key: string]: Link };
  errors?: { [key: string]: Error };
  tags?: { [key: string]: Tag };
};

export function createEmptyOpenRpc(): OpenRpc {
  return {
    openrpc: '1.2.6',
    info: {
      version: '0.0.1',
      title: 'Live PAPI documentation',
      description:
        'All methods currently registered with PAPI. It changes dynamically as methods are registered and unregistered.',
      contact: {
        name: 'Platform.Bible Team',
        url: 'https://platform.bible/',
      },
      license: {
        name: 'MIT',
        url: 'https://github.com/paranext/paranext-core/blob/main/LICENSE',
      },
    },
    servers: [
      {
        name: 'PAPI websocket (API)',
        url: `ws://localhost:${WEBSOCKET_PORT}`,
      },
      {
        name: 'Platform.Bible and Paratext 10 Studio Wiki',
        url: 'https://github.com/paranext/paranext-core/wiki/Platform.Bible-and-Paratext-10-Studio',
      },
    ],
    methods: [],
  };
}

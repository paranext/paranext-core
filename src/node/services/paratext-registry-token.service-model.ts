import { PlatformErrorCode } from 'platform-bible-utils';
import { serializeRequestType } from '@shared/utils/util';
import type { RegistryAccessToken } from '@shared/models/paratext-registry-token-privilege.model';

/** Prefix on requests that mint Paratext Registry access tokens */
export const CATEGORY_PARATEXT_REGISTRY_TOKEN = 'paratextRegistryToken';

/**
 * Serialized request type the C# data provider handles to mint a Paratext Registry access token.
 * Outside the `command:` category so extension code can't call it directly; extensions reach it
 * only through the `paratextRegistryToken` elevated privilege.
 */
export const REGISTRY_TOKEN_REQUEST_TYPE = serializeRequestType(
  CATEGORY_PARATEXT_REGISTRY_TOKEN,
  'getAccessToken',
);

/**
 * What the C# handler returns. Expected failures come back as data rather than as a rejection
 * because a code thrown from C# does not reach TypeScript today (PT-4750).
 */
export type RegistryAccessTokenWireResult =
  | RegistryAccessToken
  | { errorCode: PlatformErrorCode; message: string };

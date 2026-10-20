import { PlatformErrorCode } from 'platform-bible-utils';
import { serializeRequestType } from '@shared/utils/util';
import type { RegistryAccessToken } from '@shared/models/request-registry-tokens-privilege.model';

/** Prefix on requests that mint Paratext Registry access tokens */
const CATEGORY_REQUEST_REGISTRY_TOKENS = 'requestRegistryTokens';

/**
 * Serialized request type the C# data provider handles to mint a Paratext Registry access token.
 * Outside the `command:` category so extension code can't send it through PAPI; extensions are
 * meant to reach it only through the `requestRegistryTokens` elevated privilege. Main refuses it to
 * browser pages and web views with an insecure temporary stopgap, but local processes and
 * extension-host code with its own socket can still reach it until PT-2893 lands; see "Paratext
 * Registry access tokens" in `.context/standards/Security-Guide.md`.
 */
export const REGISTRY_TOKEN_REQUEST_TYPE = serializeRequestType(
  CATEGORY_REQUEST_REGISTRY_TOKENS,
  'getAccessToken',
);

/**
 * What the C# handler returns. Expected failures come back as data rather than as a rejection
 * because a code thrown from C# does not reach TypeScript today (PT-4750).
 */
export type RegistryAccessTokenWireResult =
  | RegistryAccessToken
  | { errorCode: PlatformErrorCode; message: string };

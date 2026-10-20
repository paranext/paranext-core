import {
  INVALID_ARGUMENT,
  isString,
  newPlatformError,
  PERMISSION_DENIED,
} from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { ElevatedPrivilegeNames } from '@shared/models/elevated-privilege-names.model';
import type { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';
import type {
  RequestRegistryTokens,
  RegistryAccessToken,
  RegistryAccessTokenRequest,
} from '@shared/models/request-registry-tokens-privilege.model';
import {
  REGISTRY_TOKEN_REQUEST_TYPE,
  RegistryAccessTokenWireResult,
} from '@node/services/request-registry-tokens.service-model';

function isNonEmptyStringList(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((entry) => typeof entry === 'string' && entry.length > 0)
  );
}

/**
 * Builds the `requestRegistryTokens` elevated privilege for one extension, or returns `undefined`
 * when the manifest doesn't declare the privilege or lists no valid resources.
 *
 * @param manifest The extension's manifest. Its `paratextRegistryTokenResources` is checked at
 *   runtime because manifests are parsed without schema validation.
 * @returns A frozen getter limited to the manifest's resources, or `undefined`
 */
export function createRequestRegistryTokens(
  manifest: Pick<
    ExtensionManifest,
    'name' | 'elevatedPrivileges' | 'paratextRegistryTokenResources'
  >,
): RequestRegistryTokens | undefined {
  if (!manifest.elevatedPrivileges?.find((p) => p === ElevatedPrivilegeNames.RequestRegistryTokens))
    return undefined;

  const declared: unknown = manifest.paratextRegistryTokenResources;
  if (!isNonEmptyStringList(declared)) {
    logger.warn(
      `Extension '${manifest.name}' declares the ${ElevatedPrivilegeNames.RequestRegistryTokens} privilege but no valid paratextRegistryTokenResources (a non-empty list of non-empty strings), so it gets no Registry tokens`,
    );
    return undefined;
  }
  const allowedResources: readonly string[] = Object.freeze([...declared]);

  const requestRegistryTokens: RequestRegistryTokens = {
    async getAccessToken({
      resource,
      scope,
    }: RegistryAccessTokenRequest): Promise<RegistryAccessToken> {
      if (!allowedResources.includes(resource))
        throw newPlatformError(
          `Extension '${manifest.name}' did not list '${resource}' in paratextRegistryTokenResources`,
          PERMISSION_DENIED,
        );
      // Untyped JavaScript callers can pass anything. C# checks which scopes are allowed, but a
      // non-string entry fails to bind on the C# side and would reject without a code.
      const requestedScope: unknown = scope ?? [];
      if (!Array.isArray(requestedScope) || !requestedScope.every(isString))
        throw newPlatformError(
          `Extension '${manifest.name}' passed a scope that is not a list of strings`,
          INVALID_ARGUMENT,
        );

      const result = await networkService.request<
        [string, string, string[]],
        RegistryAccessTokenWireResult
      >(REGISTRY_TOKEN_REQUEST_TYPE, manifest.name, resource, requestedScope);
      if ('errorCode' in result) throw newPlatformError(result.message, result.errorCode);
      return { accessToken: result.accessToken, expiresAt: result.expiresAt };
    },
  };
  return Object.freeze(requestRegistryTokens);
}

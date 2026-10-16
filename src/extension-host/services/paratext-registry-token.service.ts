import { newPlatformError, PERMISSION_DENIED } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { ElevatedPrivilegeNames } from '@shared/models/elevated-privilege-names.model';
import type { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';
import type {
  ParatextRegistryToken,
  RegistryAccessToken,
  RegistryAccessTokenRequest,
} from '@shared/models/paratext-registry-token-privilege.model';
import {
  REGISTRY_TOKEN_REQUEST_TYPE,
  RegistryAccessTokenWireResult,
} from '@node/services/paratext-registry-token.service-model';

/**
 * Builds the `paratextRegistryToken` elevated privilege for one extension, or returns `undefined`
 * when the manifest doesn't declare the privilege or lists no valid resources.
 *
 * @param manifest The extension's manifest. Its `paratextRegistryTokenResources` is checked at
 *   runtime because manifests are parsed without schema validation.
 * @returns A frozen getter limited to the manifest's resources, or `undefined`
 */
export function createParatextRegistryToken(
  manifest: Pick<
    ExtensionManifest,
    'name' | 'elevatedPrivileges' | 'paratextRegistryTokenResources'
  >,
): ParatextRegistryToken | undefined {
  if (!manifest.elevatedPrivileges?.find((p) => p === ElevatedPrivilegeNames.ParatextRegistryToken))
    return undefined;

  const declared: unknown = manifest.paratextRegistryTokenResources;
  const isValidList =
    Array.isArray(declared) &&
    declared.length > 0 &&
    declared.every((resource) => typeof resource === 'string' && resource.length > 0);
  if (!isValidList) {
    logger.warn(
      `Extension '${manifest.name}' declares the ${ElevatedPrivilegeNames.ParatextRegistryToken} privilege but no valid paratextRegistryTokenResources (a non-empty list of non-empty strings), so it gets no Registry tokens`,
    );
    return undefined;
  }
  const allowedResources: readonly string[] = Object.freeze(
    declared.filter((resource): resource is string => typeof resource === 'string'),
  );

  const paratextRegistryToken: ParatextRegistryToken = {
    async getAccessToken({
      resource,
      scope,
    }: RegistryAccessTokenRequest): Promise<RegistryAccessToken> {
      if (!allowedResources.includes(resource))
        throw newPlatformError(
          `Extension '${manifest.name}' did not list '${resource}' in paratextRegistryTokenResources`,
          PERMISSION_DENIED,
        );

      const result = await networkService.request<
        [string, string, string[]],
        RegistryAccessTokenWireResult
      >(REGISTRY_TOKEN_REQUEST_TYPE, manifest.name, resource, scope ?? []);
      if ('errorCode' in result) throw newPlatformError(result.message, result.errorCode);
      return { accessToken: result.accessToken, expiresAt: result.expiresAt };
    },
  };
  return Object.freeze(paratextRegistryToken);
}

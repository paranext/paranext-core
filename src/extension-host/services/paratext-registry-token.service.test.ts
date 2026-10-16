import { beforeEach, describe, expect, it, vi } from 'vitest';
import { INVALID_ARGUMENT, PERMISSION_DENIED, UNAUTHENTICATED } from 'platform-bible-utils';
import { createParatextRegistryToken } from '@extension-host/services/paratext-registry-token.service';
import { REGISTRY_TOKEN_REQUEST_TYPE } from '@node/services/paratext-registry-token.service-model';
import { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';

const mocks = vi.hoisted(() => ({ request: vi.fn(), warn: vi.fn() }));

vi.mock('@shared/services/network.service', async () => ({
  ...(await vi.importActual('@shared/services/network.service')),
  request: mocks.request,
}));

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: vi.fn(), info: vi.fn(), warn: mocks.warn, error: vi.fn() },
  logger: { debug: vi.fn(), info: vi.fn(), warn: mocks.warn, error: vi.fn() },
}));

const RESOURCE = 'https://assistant.example.org';
const DEV_RESOURCE = 'https://assistant-dev.example.org';

type TokenManifest = Pick<
  ExtensionManifest,
  'name' | 'elevatedPrivileges' | 'paratextRegistryTokenResources'
>;

function manifestWith(resources?: string[]): TokenManifest {
  return {
    name: 'assistant',
    elevatedPrivileges: ['paratextRegistryToken'],
    paratextRegistryTokenResources: resources,
  };
}

describe('createParatextRegistryToken', () => {
  beforeEach(() => {
    mocks.request.mockReset();
    mocks.warn.mockReset();
  });

  it.each<[string, TokenManifest['elevatedPrivileges']]>([
    ['no privileges', []],
    ['only other privileges', ['handleUri', 'createProcess']],
  ])('grants nothing to an extension that declares %s', (_label, elevatedPrivileges) => {
    const token = createParatextRegistryToken({
      name: 'assistant',
      elevatedPrivileges,
      paratextRegistryTokenResources: [RESOURCE],
    });

    expect(token).toBeUndefined();
    expect(mocks.warn).not.toHaveBeenCalled();
  });

  it.each([
    ['missing', manifestWith(undefined)],
    ['empty', manifestWith([])],
  ])('grants nothing and warns when the resource list is %s', (_label, manifest) => {
    expect(createParatextRegistryToken(manifest)).toBeUndefined();
    expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("'assistant'"));
  });

  // Manifests are parsed without schema validation, so these shapes reach the extension host.
  it.each([
    ['a string', `"${RESOURCE}"`],
    ['a number entry', `["${RESOURCE}", 42]`],
    ['an empty-string entry', `["${RESOURCE}", ""]`],
  ])('grants nothing and warns for malformed resource lists: %s', (_label, resourcesJson) => {
    const manifest: TokenManifest = JSON.parse(
      `{"name":"assistant","elevatedPrivileges":["paratextRegistryToken"],"paratextRegistryTokenResources":${resourcesJson}}`,
    );

    expect(createParatextRegistryToken(manifest)).toBeUndefined();
    expect(mocks.warn).toHaveBeenCalled();
  });

  it('sends the request type the C# handler registers', () => {
    // RegistryAccessTokenService registers this literal; a rename on either side breaks the call
    expect(REGISTRY_TOKEN_REQUEST_TYPE).toBe('paratextRegistryToken:getAccessToken');
  });

  it('returns a frozen getter', () => {
    expect(Object.isFrozen(createParatextRegistryToken(manifestWith([RESOURCE])))).toBe(true);
  });

  it('forwards an allowed resource with the extension name and scopes', async () => {
    mocks.request.mockResolvedValue({ accessToken: 'token', expiresAt: 123 });
    const token = createParatextRegistryToken(manifestWith([RESOURCE, DEV_RESOURCE]));

    const result = await token?.getAccessToken({
      resource: DEV_RESOURCE,
      scope: ['projects.members:read'],
    });

    expect(result).toEqual({ accessToken: 'token', expiresAt: 123 });
    expect(mocks.request).toHaveBeenCalledWith(
      REGISTRY_TOKEN_REQUEST_TYPE,
      'assistant',
      DEV_RESOURCE,
      ['projects.members:read'],
    );
  });

  it('sends an empty scope list when scope is omitted', async () => {
    mocks.request.mockResolvedValue({ accessToken: 'token', expiresAt: 123 });
    const token = createParatextRegistryToken(manifestWith([RESOURCE]));

    await token?.getAccessToken({ resource: RESOURCE });

    expect(mocks.request).toHaveBeenCalledWith(
      REGISTRY_TOKEN_REQUEST_TYPE,
      'assistant',
      RESOURCE,
      [],
    );
  });

  it.each([
    ['an undeclared resource', 'https://other.example.org'],
    ['a trailing-slash variant', `${RESOURCE}/`],
    ['a different case', RESOURCE.toUpperCase()],
  ])('rejects %s with PERMISSION_DENIED without sending', async (_label, resource) => {
    const token = createParatextRegistryToken(manifestWith([RESOURCE]));

    await expect(token?.getAccessToken({ resource })).rejects.toMatchObject({
      code: PERMISSION_DENIED,
    });
    expect(mocks.request).not.toHaveBeenCalled();
  });

  it.each([
    ['a string', 'projects.members:read'],
    ['an object', { 0: 'projects.members:read' }],
  ])('rejects a scope that is %s with INVALID_ARGUMENT without sending', async (_label, scope) => {
    const token = createParatextRegistryToken(manifestWith([RESOURCE]));

    await expect(
      // @ts-expect-error ts(2322) - untyped JavaScript callers can pass a scope that is not a list
      token?.getAccessToken({ resource: RESOURCE, scope }),
    ).rejects.toMatchObject({ code: INVALID_ARGUMENT });
    expect(mocks.request).not.toHaveBeenCalled();
  });

  it('keeps its own copy of the resource list', async () => {
    const resources = [RESOURCE];
    const token = createParatextRegistryToken(manifestWith(resources));
    resources.push('https://other.example.org');

    await expect(
      token?.getAccessToken({ resource: 'https://other.example.org' }),
    ).rejects.toMatchObject({ code: PERMISSION_DENIED });
  });

  it('turns a failure result into a PlatformError with the same code and message', async () => {
    mocks.request.mockResolvedValue({ errorCode: UNAUTHENTICATED, message: 'Not registered.' });
    const token = createParatextRegistryToken(manifestWith([RESOURCE]));

    await expect(token?.getAccessToken({ resource: RESOURCE })).rejects.toMatchObject({
      code: UNAUTHENTICATED,
      message: 'Not registered.',
    });
  });

  it('passes a network-layer rejection through unchanged', async () => {
    const networkError = new Error('JSON-RPC Request timed out');
    mocks.request.mockRejectedValue(networkError);
    const token = createParatextRegistryToken(manifestWith([RESOURCE]));

    await expect(token?.getAccessToken({ resource: RESOURCE })).rejects.toBe(networkError);
  });
});

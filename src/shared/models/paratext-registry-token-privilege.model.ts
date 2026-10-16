/**
 * The read-only Paratext Registry scopes Platform.Bible requests on an extension's behalf. The
 * Registry would issue write scopes to a registration-code caller too; Platform.Bible never asks
 * for them.
 */
export type RegistryReadScope =
  | 'projects.members:read'
  | 'projects:read'
  | 'projects.progress:read'
  | 'orgs:read'
  | 'users.org:read';

/** What an extension asks for when it requests a Paratext Registry access token */
export type RegistryAccessTokenRequest = {
  /**
   * Identifier of the service the token is for (an RFC 8707 resource, for example
   * `https://assistant.example.org`). Must exactly match an entry in the extension manifest's
   * `paratextRegistryTokenResources`, and must be registered with the Paratext Registry that this
   * Platform.Bible is pointed at.
   */
  resource: string;
  /** Scopes the token should carry. Pass them explicitly: if omitted, the token carries none. */
  scope?: RegistryReadScope[];
};

/** A Paratext Registry access token for one service */
export type RegistryAccessToken = {
  /** Bearer token, valid only at the requested `resource`. Never log it. */
  accessToken: string;
  /**
   * When the token expires, in milliseconds since the Unix epoch. A token handed out by
   * {@link ParatextRegistryToken.getAccessToken} has at least two minutes left unless the Registry
   * issues shorter-lived tokens.
   */
  expiresAt: number;
};

/**
 * Gets Paratext Registry access tokens that identify the current user to a service the extension
 * names, using the user's existing Paratext registration. The registration code never leaves
 * Platform.Bible.
 *
 * To receive this, an extension lists `paratextRegistryToken` in its manifest's
 * `elevatedPrivileges` and lists the services it may request tokens for in
 * `paratextRegistryTokenResources`:
 *
 * ```json
 * {
 *   "elevatedPrivileges": ["paratextRegistryToken"],
 *   "paratextRegistryTokenResources": ["https://assistant.example.org"]
 * }
 * ```
 */
export type ParatextRegistryToken = {
  /**
   * Gets an access token for `request.resource`. Tokens are cached, so call this before each
   * request to the service instead of storing the token.
   *
   * Rejects with a `PlatformError`. Its `code` says why:
   *
   * - `PERMISSION_DENIED`: `resource` is not in the manifest's `paratextRegistryTokenResources`
   * - `INVALID_ARGUMENT`: a scope is not allowed, or the Registry rejected the request (for example,
   *   the resource is not registered with this Registry)
   * - `UNAUTHENTICATED`: the user has no valid registration, or the Registry did not accept it
   * - `FAILED_PRECONDITION`: the user turned internet access off
   * - `UNAVAILABLE`: the Registry could not be reached or did not return a usable token; retrying
   *   later may help
   *
   * Other failures, such as a request that times out, reject without a `code`. Treat them like
   * `UNAVAILABLE`.
   *
   * @param request The service to get a token for and the scopes the token should carry
   * @returns The token and when it expires
   */
  getAccessToken(request: RegistryAccessTokenRequest): Promise<RegistryAccessToken>;
};

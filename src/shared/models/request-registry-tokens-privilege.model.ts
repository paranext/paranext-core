/**
 * Every {@link RegistryReadScope}, as a list. Keep in sync with `AllowedScopes` in
 * `c-sharp/Users/RegistryAccessTokenService.cs`; a test on each side pins the same scopes.
 */
export const REGISTRY_READ_SCOPES = Object.freeze([
  'projects.members:read',
  'projects:read',
  'projects.progress:read',
  'orgs:read',
  'users.org:read',
] as const);

/**
 * The read-only Paratext Registry scopes Platform.Bible requests on an extension's behalf. The
 * Registry would issue write scopes to a registration-code caller too; Platform.Bible never asks
 * for them.
 */
export type RegistryReadScope = (typeof REGISTRY_READ_SCOPES)[number];

/** What an extension asks for when it requests a Paratext Registry access token */
export type RegistryAccessTokenRequest = {
  /**
   * Identifier of the service the token is for (an RFC 8707 resource, for example
   * `https://assistant.example.org`). Must exactly match an entry in the extension manifest's
   * `paratextRegistryTokenResources`, and must be registered with the Paratext Registry that this
   * Platform.Bible is pointed at.
   */
  resource: string;
  /**
   * Scopes the token should carry. Pass them explicitly: if omitted, the token carries none. As of
   * 2026-10 the Paratext Registry both documents and implements that for a caller using a
   * registration code; its default scopes apply only to trusted clients.
   */
  scope?: RegistryReadScope[];
};

/** A Paratext Registry access token for one service */
export type RegistryAccessToken = {
  /** Bearer token, valid only at the requested `resource`. Never log it. */
  accessToken: string;
  /**
   * When the token expires, in milliseconds since the Unix epoch. A token handed out by
   * {@link RequestRegistryTokens.getAccessToken} has at least two minutes left unless the Registry
   * issues shorter-lived tokens.
   */
  expiresAt: number;
};

/**
 * Gets Paratext Registry access tokens that identify the current user to a service the extension
 * names, using the user's existing Paratext registration. The registration code never leaves
 * Platform.Bible.
 *
 * To receive this, an extension lists `requestRegistryTokens` in its manifest's
 * `elevatedPrivileges` and lists the services it may request tokens for in
 * `paratextRegistryTokenResources`:
 *
 * ```json
 * {
 *   "elevatedPrivileges": ["requestRegistryTokens"],
 *   "paratextRegistryTokenResources": ["https://assistant.example.org"]
 * }
 * ```
 */
export type RequestRegistryTokens = {
  /**
   * Gets an access token for `request.resource`. Tokens are cached, so call this before each
   * request to the service instead of storing the token.
   *
   * Call this, and the service, from extension-host code. Never return the token from, or store it
   * in, a command, network object, data provider, web view state or web view message: commands are
   * callable by every extension and web views are same-origin, so any other extension could read it
   * there.
   *
   * Send the token only to `request.resource`: whoever receives it can call that service as the
   * user until it expires, so build request URLs from the resource instead of accepting them from
   * callers.
   *
   * Rejects with a `PlatformError`. Its `code` says why; its `message` is an English diagnostic for
   * logs, so show users your own localized text based on the `code`:
   *
   * - `PERMISSION_DENIED`: `resource` is not in the manifest's `paratextRegistryTokenResources`, or
   *   the Registry accepted the registration but refused to issue the token (HTTP 403), which
   *   registering again won't fix
   * - `INVALID_ARGUMENT`: a scope is not allowed, or the Registry rejected the request (for example,
   *   the resource is not registered with this Registry)
   * - `UNAUTHENTICATED`: the user has no valid registration, or the Registry did not accept it
   * - `FAILED_PRECONDITION`: the user's Internet & connectivity settings block it: "Disable access to
   *   some Bible translation services" or "Block internet when in sensitive locations" is selected
   * - `UNAVAILABLE`: there is no internet connection, reading the registration or the Internet &
   *   connectivity settings failed or took too long, or the Registry could not be reached or did
   *   not return a usable token; retrying later may help
   *
   * Other failures, such as a request that times out, reject without a `code`. Treat them like
   * `UNAVAILABLE`.
   *
   * @param request The service to get a token for and the scopes the token should carry
   * @returns The token and when it expires
   */
  getAccessToken(request: RegistryAccessTokenRequest): Promise<RegistryAccessToken>;
};

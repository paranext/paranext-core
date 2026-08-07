/**
 * Registers this renderer's window-scoped handlers for the dialog requests the main process's
 * routing proxy expects to find under a `dialog:${requestName}-${windowId}` name (see
 * `RENDERER_HOSTED_DIALOG_REQUEST_NAMES`), and tracks which of them this renderer actually
 * registered.
 *
 * The canonical list of renderer-hosted dialog request names is declared centrally and is checked
 * against `DialogService`'s keys, but that only proves the listed names are real methods — nothing
 * checks that a name on the list was ever registered. A `DialogService` method that gets a caller
 * and a list entry but no registration call would otherwise go unnoticed until something invokes
 * it, which surfaces as the routing proxy spending its request retries and answering
 * `MethodNotFound`, with only a debug line naming the request type. Routing every registration
 * through {@link registerScopedDialogRequest} makes that omission visible at startup instead — see
 * {@link assertAllRendererHostedDialogRequestsRegistered}.
 */

import { NetworkMethodHandlerOptions } from '@shared/models/network.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import {
  CATEGORY_DIALOG,
  RENDERER_HOSTED_DIALOG_REQUEST_NAMES,
} from '@shared/services/dialog.service-model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import { UnsubscriberAsync } from 'platform-bible-utils';

export type RendererHostedDialogRequestName = (typeof RENDERER_HOSTED_DIALOG_REQUEST_NAMES)[number];

/** Renderer-hosted dialog requests this renderer has registered a scoped handler for so far */
const registeredRequestNames = new Set<RendererHostedDialogRequestName>();

/**
 * Serialize a dialog request type under this window's scoped name (e.g. `dialog:showDialog-1`).
 * Dialogs open in a window, so each renderer serves its own; the main process registers proxies
 * under the generic names that forward to whichever window has focus.
 */
function scopedDialogRequestType(requestName: RendererHostedDialogRequestName) {
  return serializeRequestType(CATEGORY_DIALOG, `${requestName}-${globalThis.windowId}`);
}

/**
 * Register this window's scoped handler (e.g. `dialog:showDialog-1`) for a dialog request, and
 * record that this renderer registered it.
 *
 * @param requestName Generic (unscoped) dialog request name the main process proxies
 * @param handler Handler to serve the request with
 * @param docs OpenRPC documentation for the request, if it has any
 * @param options Handler options, such as disabling the timeout while a dialog waits for the user
 * @returns The registration's unsubscriber, as `registerRequestHandler` returns
 */
export async function registerScopedDialogRequest(
  requestName: RendererHostedDialogRequestName,
  // Handlers can be any function type; each dialog method's real signature is declared once, on
  // `DialogService`, and checked there and at every call site
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => any,
  docs?: SingleMethodDocumentation,
  options?: NetworkMethodHandlerOptions,
): Promise<UnsubscriberAsync> {
  const unsubscribe = await networkService.registerRequestHandler(
    scopedDialogRequestType(requestName),
    handler,
    docs,
    options,
  );
  // Recorded once the registration has landed, not when it was attempted. The check this feeds is
  // meant to prove there is a handler for the routing proxy to forward to, and a name recorded up
  // front would report a registration that rejected — a name collision after a reload, a network
  // failure during startup — as covered.
  registeredRequestNames.add(requestName);
  return unsubscribe;
}

/**
 * Confirm every renderer-hosted dialog request has a registered scoped handler in this renderer.
 * Call once at startup, after the dialog service has finished registering.
 *
 * A name in `RENDERER_HOSTED_DIALOG_REQUEST_NAMES` that no {@link registerScopedDialogRequest} call
 * registered means the main process's routing proxy has nothing to forward calls to for that
 * request.
 */
export function assertAllRendererHostedDialogRequestsRegistered(): void {
  const missingRequestNames = RENDERER_HOSTED_DIALOG_REQUEST_NAMES.filter(
    (requestName) => !registeredRequestNames.has(requestName),
  );
  if (missingRequestNames.length === 0) return;

  // Says what a reader of the log will see happen rather than only naming constants: calling one of
  // these dialog methods spends the request retries and comes back `MethodNotFound`, with nothing
  // above debug level pointing at the missing registration as the cause.
  const message = `Renderer-hosted dialog requests have no registered handler in this window, so calling them here fails with MethodNotFound after the request retries: ${missingRequestNames.join(', ')}`;
  // In dev/test, fail loudly and immediately so the gap cannot ship. In production, a thrown error
  // here would take down renderer startup over one unroutable dialog; log it instead so the rest of
  // the app still comes up.
  if (!globalThis.isPackaged) throw new Error(message);
  logger.error(message);
}

/**
 * Reset the renderer-hosted dialog registry state for testing. This function is only exported for
 * testing purposes and should not be used in production code.
 */
export function resetForTesting(): void {
  registeredRequestNames.clear();
}

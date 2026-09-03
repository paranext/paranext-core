/**
 * Checking that a routed command's OpenRPC parameters agree with how its router routes it.
 *
 * A router decides per command whether to run it in the window that owns a web view the caller
 * named or in the window the user is working in. That decision is written by hand, which is what
 * lets a router route two commands sharing one implementation differently — but it also means the
 * `webViewId` a command documents is no longer what puts it on the owner-routed path, and a command
 * that looks routable by ownership and is not fails silently, in the wrong window, with the right
 * documentation. This is the check that says so instead.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { logger } from '@shared/services/logger.service';

/** How a router picks the window a command runs in */
export type CommandRouting =
  /** In the window that owns the web view the call names */
  | 'owner'
  /** In the window the user is working in */
  | 'focus';

/** One command a router claims, and how that router routes it */
export type RoutedCommand = {
  /** Generic (unscoped) name consumers call */
  commandName: string;
  /** The OpenRPC documentation the router publishes for it */
  docs: SingleMethodDocumentation;
  /** How the router routes it */
  routing: CommandRouting;
};

/** Whether a command's parameters say a call to it names a web view, and where they say it */
function findWebViewIdParamIndex(docs: SingleMethodDocumentation): number {
  // A `Reference` param carries only a `$ref`, so it names nothing this can read
  return docs.method.params.findIndex((param) => 'name' in param && param.name === 'webViewId');
}

/**
 * Check that each command's routing agrees with what its parameters declare, and say so loudly when
 * one does not.
 *
 * Three ways to disagree, all of which send a call to the wrong window with nothing else reporting
 * it:
 *
 * - A command documenting a web view id first is a command a caller expects to act on that web view.
 *   Routing it by focus runs it against whatever the user happens to be looking at.
 * - A command routed by ownership reads a web view id out of its first argument, so a command routed
 *   that way without documenting one there cannot find an owner and quietly falls back.
 * - A web view id documented anywhere but first cannot be routed on at all, since ownership is
 *   resolved from `args[0]`.
 *
 * In development this throws, so the gap cannot ship. In a packaged app it logs: refusing to start
 * a router over one command's declaration would leave every generic name it claims unanswered for
 * the session, which is worse than routing the rest.
 *
 * @param routerName Router being checked, for the message this raises
 * @param commands Every command the router claims, with the routing it gives each one
 * @throws In development, if any command's routing disagrees with its parameters
 */
export function assertCommandRoutingMatchesDocs(
  routerName: string,
  commands: RoutedCommand[],
): void {
  const misdeclarations = commands
    .map(({ commandName, docs, routing }) => {
      const webViewIdParamIndex = findWebViewIdParamIndex(docs);
      if (webViewIdParamIndex > 0)
        return `${commandName} documents a webViewId parameter that is not its first, so a call naming a web view cannot be routed to the window that owns it`;
      if (webViewIdParamIndex === 0 && routing !== 'owner')
        return `${commandName} documents a webViewId as its first parameter but is routed to the focused window, so a call naming a web view in a background window will run in the wrong one`;
      if (webViewIdParamIndex < 0 && routing === 'owner')
        return `${commandName} is routed by which window owns a web view but documents no webViewId parameter, so it has nothing to find an owner by`;
      return undefined;
    })
    .filter((misdeclaration) => misdeclaration !== undefined);
  if (misdeclarations.length === 0) return;

  const message = `The ${routerName} routes commands in a way its OpenRPC parameters contradict: ${misdeclarations.join('; ')}`;
  if (!globalThis.isPackaged) throw new Error(message);
  logger.error(message);
}

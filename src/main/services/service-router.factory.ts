/**
 * The parts every service router shares: resolving the window a call should run in, building the
 * methods that plainly forward there, and publishing the result under the generic name consumers
 * call.
 *
 * A router holds no state and no logic of its own — most of its methods are "resolve the target
 * window, call the same method on that window's shard, answer with what it said." What is left over
 * is genuinely different behaviour (events, operations that must ask every window, operations
 * routed by who owns a named web view), and those stay hand-written as overrides.
 *
 * See `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { getTargetWindowId } from '@main/services/window-state.service';
import { NetworkableObject } from '@shared/models/network-object.model';
import { NetworkObjectDocumentation } from '@shared/models/openrpc.model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';

/**
 * Compile-time proof that a router publishes every member of the service it claims the name of.
 *
 * Resolves to `unknown` — which intersects harmlessly — when every member is either forwarded or
 * overridden. Otherwise it resolves to an object with a `missingFromRouter` property whose type
 * names the members that are not, so the overrides object fails to type-check with an error that
 * says which ones are missing. Without this, a member added to a service interface would silently
 * become a method the router does not answer for, and the network object would register it as a
 * name that resolves to nothing.
 */
type ServiceRouterCoverage<T, ForwardedMethodNames extends readonly (keyof T)[], Overrides> =
  Exclude<keyof T, ForwardedMethodNames[number] | keyof Overrides> extends never
    ? unknown
    : { missingFromRouter: Exclude<keyof T, ForwardedMethodNames[number] | keyof Overrides> };

/**
 * Resolve the shard of the window a routed call should currently run in.
 *
 * Nothing is cached: the answer changes as the user moves between windows and as windows finish
 * starting, and re-resolving per call is what keeps a router following that without a cache to
 * invalidate.
 *
 * @param serviceName Name the service is known by, for the errors this raises
 * @param getShard Resolves a window's shard — a router's shard index
 * @returns A resolver that answers with the target window's shard or explains why there isn't one
 */
export function createTargetShardResolver<T>(
  serviceName: string,
  getShard: (windowId: number) => Promise<T | undefined>,
): () => Promise<T> {
  return async () => {
    const targetWindowId = getTargetWindowId();
    if (targetWindowId === undefined)
      throw new Error(`No windows available to route ${serviceName} call`);
    const shard = await getShard(targetWindowId);
    if (!shard)
      throw new Error(
        `${serviceName} for window ${targetWindowId} is not available. The renderer may not have started yet.`,
      );
    return shard;
  };
}

/**
 * Publish a service router under the generic name consumers call.
 *
 * Every name in `forwardedMethodNames` becomes a method that resolves the target window's shard and
 * calls the same method on it. Everything else the service declares has to appear in `overrides` —
 * see {@link ServiceRouterCoverage}.
 *
 * Registering must happen during main process startup, before any window is created, so the generic
 * name is claimed before a renderer could try to take it.
 *
 * @param options.genericName Network object name consumers call the service by
 * @param options.forwardedMethodNames Methods that are a plain forward to the target window's shard
 * @param options.resolveTargetShard Resolves the shard those methods forward to — see
 *   {@link createTargetShardResolver}
 * @param options.overrides Everything else the service declares: its events, and the methods whose
 *   behaviour is not a plain forward (fan-outs across every window, calls routed by ownership)
 * @param options.docs OpenRPC documentation for the generic name, which is the documented one — the
 *   window-scoped names shards register under are an implementation detail
 */
export async function registerServiceRouter<
  T extends NetworkableObject,
  const ForwardedMethodNames extends readonly (keyof T & string)[],
  Overrides extends Partial<T>,
>(options: {
  genericName: string;
  forwardedMethodNames: ForwardedMethodNames;
  resolveTargetShard: () => Promise<T>;
  overrides: Overrides & ServiceRouterCoverage<T, ForwardedMethodNames, Overrides>;
  docs?: NetworkObjectDocumentation;
}): Promise<void> {
  const { genericName, forwardedMethodNames, resolveTargetShard, overrides, docs } = options;

  // Concrete methods rather than a `Proxy` get-trap: `networkObjectService.set` enumerates the
  // object's real function names to register an `object:{id}.{fn}` handler for each, and a get-trap
  // enumerates nothing at all.
  const forwardedMethods = Object.fromEntries(
    forwardedMethodNames.map((methodName) => [
      methodName,
      async (...args: unknown[]) => {
        const shard = await resolveTargetShard();
        // Indexing a generic service by one of its own method names, which TypeScript cannot narrow
        // to a callable on its own
        /* eslint-disable no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any */
        return (shard as any)[methodName](...args);
        /* eslint-enable no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any */
      },
    ]),
  );

  // The router is assembled at runtime from two halves, so its type has to be asserted; the
  // coverage guard on `overrides` is what makes the assertion safe, since it fails to compile
  // unless those halves together cover every member of the service.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const router = { ...forwardedMethods, ...overrides } as unknown as T;

  await networkObjectService.set<T>(genericName, router, undefined, undefined, docs);
  logger.info(`Service router registered for ${genericName}`);
}

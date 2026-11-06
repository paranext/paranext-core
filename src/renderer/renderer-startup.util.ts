import { logger } from '@shared/services/logger.service';

/** What {@link startRendererServices} runs, in the order it runs them */
export type RendererStartupSteps = {
  /** The network service, whose `initialize` connects the renderer to PAPI */
  networkService: { initialize: () => Promise<void> };
  /**
   * Subscribes the store that tells the user the connection to the app was lost. Returns an
   * unsubscriber that is never called: it runs for the renderer's lifetime.
   */
  initConnectionLostService: () => unknown;
  /**
   * Subscribes to main's extension host lifecycle events. Returns an unsubscriber that is never
   * called.
   */
  initExtensionHostStoppedService: () => unknown;
  /** Starts every other renderer service. Runs once the network service has initialized. */
  startServices: () => Promise<void>;
};

/**
 * Starts the renderer's services: subscribes to lost connections and extension host lifecycle
 * events, then initializes the network service, then starts everything else.
 *
 * The subscriptions run synchronously, before `networkService.initialize()` is called and before
 * anything awaits. `onDidLoseConnection` is a module-level emitter on the network service that
 * exists before `initialize()` runs, and `PlatformEvent` does not replay to a late subscriber, so a
 * subscription made any later leaves a window in which a lost connection is seen by nothing and is
 * missed for good — and the connection-lost store is the one thing that tells the user the app has
 * stopped working. The same holds for main's lifecycle events, which `getNetworkEvent` makes
 * subscribable before the network service has connected.
 *
 * Never rejects: a service that fails to start is logged.
 *
 * @param steps The services to start
 * @returns A promise that settles once every service has started or one has failed
 */
export function startRendererServices({
  networkService,
  initConnectionLostService,
  initExtensionHostStoppedService,
  startServices,
}: RendererStartupSteps): Promise<void> {
  initConnectionLostService();
  initExtensionHostStoppedService();

  return (async () => {
    try {
      // The network service has to start first, and the other services use it
      await networkService.initialize();
      await startServices();
    } catch (e) {
      logger.error(`Service(s) failed to initialize! Error: ${e}`);
    }
  })();
}

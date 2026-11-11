import type papi from '@papi/backend';
import { getErrorMessage } from 'platform-bible-utils';
import { createLazySharedPromise } from './lazy-shared-promise.util';

// String values must match PROJECT_SWITCH_WILL_START_EVENT / PROJECT_SWITCH_DID_FINISH_EVENT in
// src/renderer/services/workspace-updating-service.ts

/**
 * Network event name emitted just before a scripture editor web view is opened or replaced with a
 * new project. Subscribe via
 * `papi.network.getNetworkEvent('platformScriptureEditor.onWillSwitchProject')`.
 */
export const PROJECT_SWITCH_WILL_START_EVENT = 'platformScriptureEditor.onWillSwitchProject';

/**
 * Network event name emitted after the scripture editor web view open/replace call resolves.
 * Subscribe via `papi.network.getNetworkEvent('platformScriptureEditor.onDidSwitchProject')`.
 */
export const PROJECT_SWITCH_DID_FINISH_EVENT = 'platformScriptureEditor.onDidSwitchProject';

/** The part of `papi.network` the project-switch events use */
export type ProjectSwitchEventsNetwork = Pick<
  typeof papi.network,
  'createNetworkEventEmitterAsync'
>;

/** The part of the logger the project-switch events use */
export type ProjectSwitchEventsLogger = { warn: (message: string) => void };

/** The part of a registered event emitter the project-switch code uses */
type ProjectSwitchEmitter = {
  emit: (event: { switchId: string }) => void;
  dispose: () => Promise<boolean>;
};

/** The pair of emitters for one project switch */
export type ProjectSwitchEmitters = {
  willStart: ProjectSwitchEmitter;
  didFinish: ProjectSwitchEmitter;
};

/**
 * Registers the two project-switch network events lazily, once, and unregisters them on dispose.
 * Overlapping first requests share one registration per event, because the main process's registry
 * rejects a second registration of the same event.
 *
 * @param network The network service that registers the events
 * @param logger Receives a warning when an emitter cannot be disposed
 */
export function createProjectSwitchEvents(
  network: ProjectSwitchEventsNetwork,
  logger: ProjectSwitchEventsLogger,
) {
  /**
   * Disposes an emitter, logging a failure instead of rejecting, so disposing one emitter cannot be
   * stopped by the other's failure. Also receives each emitter whose registration finished after
   * `dispose` had already reset it: nothing else holds it, so without this its event would stay
   * registered and the next registration of the same event would be rejected.
   */
  async function disposeSwitchEmitter(emitter: { dispose: () => Promise<boolean> }) {
    try {
      await emitter.dispose();
    } catch (error) {
      logger.warn(`Could not dispose a project-switch event emitter: ${getErrorMessage(error)}`);
    }
  }

  // Both events use the async factory (the sync createNetworkEventEmitter is deprecated) so they can
  // carry `x-experimental` in the generated OpenRPC document — their contract isn't settled (see
  // their @experimental TSDoc in the d.ts). The payload type is inferred from the NetworkEvents
  // augmentation, so no explicit generic here.

  /**
   * Event emitter fired before a project switch. Payload carries the switch's unique `switchId`, so
   * the renderer's workspace-updating service can pair each finish with exactly the switch that
   * started it.
   */
  const willStartEmitter = createLazySharedPromise(
    () =>
      network.createNetworkEventEmitterAsync(PROJECT_SWITCH_WILL_START_EVENT, {
        notification: {
          'x-experimental': true,
          summary:
            'Emitted just before a scripture editor web view is opened or replaced with a new project.',
          params: [
            {
              name: 'switchId',
              required: true,
              summary: 'Token pairing this switch with its matching onDidSwitchProject event.',
              schema: { type: 'string' },
            },
          ],
        },
      }),
    disposeSwitchEmitter,
  );

  /**
   * Event emitter fired after a project switch completes, with the `switchId` of the will-start
   * event that began it. Kept separate from the will-start emitter so each is cached and retried on
   * its own: a failure creating one neither discards the other's registration nor registers it
   * again.
   */
  const didFinishEmitter = createLazySharedPromise(
    () =>
      network.createNetworkEventEmitterAsync(PROJECT_SWITCH_DID_FINISH_EVENT, {
        notification: {
          'x-experimental': true,
          summary: 'Emitted after the scripture editor web view open/replace call resolves.',
          params: [
            {
              name: 'switchId',
              required: true,
              summary: 'The switchId of the onWillSwitchProject event that started this switch.',
              schema: { type: 'string' },
            },
          ],
        },
      }),
    disposeSwitchEmitter,
  );

  return {
    /** Returns both emitters, registering whichever is not registered yet */
    async getEmitters(): Promise<ProjectSwitchEmitters> {
      const [willStart, didFinish] = await Promise.all([
        (willStartEmitter.reset(), willStartEmitter.get()),
        didFinishEmitter.get(),
      ]);
      return { willStart, didFinish };
    },

    /** Returns the did-finish emitter if it is registered right now, otherwise `undefined` */
    peekDidFinish() {
      return didFinishEmitter.peek();
    },

    /**
     * Forgets both emitters and resolves once every registered one is disposed. A registration
     * still in flight is disposed when it finishes. A later `getEmitters` registers the events
     * again.
     */
    async dispose(): Promise<void> {
      await Promise.all(
        [willStartEmitter.reset(), didFinishEmitter.reset()].map(
          (emitter) => emitter && disposeSwitchEmitter(emitter),
        ),
      );
    },
  };
}

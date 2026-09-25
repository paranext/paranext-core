import { DEFAULT_ZOOM_FACTOR } from '@shared/data/platform.data';
import { INTERFACE_SCALING_CHANNEL } from '@shared/data/interface-scaling.model';
import { logger } from '@shared/services/logger.service';
import {
  getErrorMessage,
  isPlatformError,
  PlatformError,
  startsWith,
  UnsubscriberAsync,
} from 'platform-bible-utils';

/** The parts of a window that applying interface scaling uses */
export type InterfaceScalingWindow = {
  webContents: {
    on(event: 'did-finish-load', listener: () => void): unknown;
    isDestroyed(): boolean;
    send(channel: string, ...args: unknown[]): void;
  };
  once(event: 'ready-to-show', listener: () => void): unknown;
  isVisible(): boolean;
};

/** How interface scaling reaches the `platform.zoomFactor` setting */
export type ZoomFactorSetting = {
  /** Read the setting. Rejects when the settings service cannot answer. */
  get: () => Promise<number>;
  /**
   * Hear later changes. Need not deliver the current value first: each window reads the setting
   * when a document loads, so a first delivery would only repeat it.
   */
  subscribe: (callback: (value: number | PlatformError) => void) => Promise<UnsubscriberAsync>;
};

/**
 * Keep every window at interface scaling (`platform.zoomFactor`), through each document it loads
 * and each change to the setting.
 *
 * The setting goes to the page over `INTERFACE_SCALING_CHANNEL`, and the preload sets it there,
 * which moves the document onto Chromium's temporary zoom: keyed by the frame, not by the URL the
 * renderer keeps rewriting. Nothing sets any zoom on a hidden window before it has painted
 * (`ready-to-show`): a zoom set before a hidden window's first frame, from main or the page, can
 * stop that frame, and a window nobody asked for is only shown at `ready-to-show`. A shown window
 * does not wait: one that opens covered by other windows does not paint, so has no `ready-to-show`,
 * until it is uncovered, and waiting would show its first frame at 100 % then. So a window takes
 * the setting at each `did-finish-load` once it has painted or is shown, and a hidden window's
 * first document at `ready-to-show`.
 *
 * @param setting How to read and follow the setting
 */
export function createInterfaceScaling(setting: ZoomFactorSetting) {
  let lastKnown: number | undefined;
  /** Windows that have painted or been shown, which a change reaches through their page */
  const zoomableWindows = new Set<InterfaceScalingWindow>();
  let unsubscribe: UnsubscriberAsync | undefined;
  /** The latest re-subscribe, which the next one waits for so that two never overlap */
  let resubscribeQueue = Promise.resolve();

  /**
   * Have the window's page set `factor` as its zoom. Only for a window that has painted or is
   * shown.
   */
  function apply(window: InterfaceScalingWindow, factor: number): void {
    if (window.webContents.isDestroyed()) return;
    try {
      window.webContents.send(INTERFACE_SCALING_CHANNEL, factor);
    } catch (e) {
      logger.error(`Failed to apply interface scaling ${factor}: ${getErrorMessage(e)}`);
    }
  }

  /** Read the setting, falling back to the last value seen (then the default) if it cannot be */
  async function read(): Promise<number> {
    try {
      lastKnown = await setting.get();
      return lastKnown;
    } catch (e) {
      logger.warn(`Failed to read interface scaling: ${getErrorMessage(e)}`);
      return lastKnown ?? DEFAULT_ZOOM_FACTOR;
    }
  }

  function onChange(value: number | PlatformError): void {
    if (isPlatformError(value)) {
      logger.warn(`Interface scaling change arrived as an error: ${getErrorMessage(value)}`);
      return;
    }
    lastKnown = value;
    zoomableWindows.forEach((window) => apply(window, value));
  }

  async function resubscribe(): Promise<void> {
    const previous = unsubscribe;
    unsubscribe = undefined;
    if (previous)
      await previous().catch((e) =>
        logger.debug(`Failed to release the interface scaling subscription: ${getErrorMessage(e)}`),
      );
    try {
      unsubscribe = await setting.subscribe(onChange);
    } catch (e) {
      logger.warn(`Failed to follow interface scaling changes: ${getErrorMessage(e)}`);
    }
  }

  /** Take a fresh subscription to the setting, releasing any previous one */
  function followSetting(): Promise<void> {
    resubscribeQueue = resubscribeQueue.then(resubscribe);
    return resubscribeQueue;
  }

  return {
    read,
    /**
     * Apply interface scaling to each document this window loads and to each later change.
     *
     * @returns A function that stops applying it to this window
     */
    addWindow(window: InterfaceScalingWindow): () => void {
      let isRemoved = false;
      /** Whether the window has painted or been shown, so its page may take a zoom */
      let isZoomable = false;
      const makeZoomable = () => {
        isZoomable = true;
        zoomableWindows.add(window);
      };
      window.webContents.on('did-finish-load', async () => {
        const factor = await read();
        if (isRemoved) return;
        // Asked at each load, not once: a hidden window whose page failed to load is shown anyway
        if (!isZoomable && window.isVisible()) makeZoomable();
        if (isZoomable) apply(window, factor);
      });
      window.once('ready-to-show', () => {
        if (isRemoved || isZoomable) return;
        makeZoomable();
        // Not yet read for this window's first document: the load's own read hands it over
        if (lastKnown !== undefined) apply(window, lastKnown);
      });
      return () => {
        isRemoved = true;
        zoomableWindows.delete(window);
      };
    },
    followSetting,
    /**
     * Follow the setting now, and again whenever the settings provider is announced: it lives in
     * another process, which can start after this one. A replaced provider is not recovered from
     * yet (PT-4807).
     *
     * @param onDidCreateNetworkObject Subscribes to announcements of new network objects
     * @param settingsProviderName The settings provider's name, which prefixes its network object
     *   id
     */
    startFollowingSetting(
      onDidCreateNetworkObject: (callback: (details: { id: string }) => void) => unknown,
      settingsProviderName: string,
    ): Promise<void> {
      // Matched on the prefix because a provider's network object id is its name plus a suffix
      onDidCreateNetworkObject((details) => {
        if (startsWith(details.id, settingsProviderName)) followSetting();
      });
      return followSetting();
    },
  };
}

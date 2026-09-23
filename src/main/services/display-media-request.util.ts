/**
 * Deciding which frame, if any, a display-media request (`navigator.mediaDevices.getDisplayMedia`)
 * may capture.
 *
 * The handler answers without showing an OS screen picker, so a granted request is a silent capture
 * of the whole window. Only the window's own top frame may ask: that is where the Usersnap feedback
 * widget requests its native screenshot. Web views are `about:srcdoc` iframes running extension
 * code, and no iframe may obtain a capture of the window around it.
 */

import { logger } from '@shared/services/logger.service';

/** The parts of Electron's `WebFrameMain` the display-media policy reads */
export type DisplayMediaRequestFrame = {
  url: string;
  parent: DisplayMediaRequestFrame | null;
  top: DisplayMediaRequestFrame | null;
};

/**
 * Chooses the frame to serve as the video source of a display-media request.
 *
 * @param frame The frame that made the request, or `null` if it has navigated or been destroyed
 * @returns The requesting frame when it is its window's top frame; `undefined` when the request
 *   must be denied
 */
export function selectDisplayMediaSource<TFrame extends DisplayMediaRequestFrame>(
  frame: TFrame | null | undefined,
): TFrame | undefined {
  if (!frame) {
    logger.debug('Denied display-media request: the requesting frame is gone');
    return undefined;
  }

  if (frame.parent || frame.top !== frame) {
    logger.debug(
      `Denied display-media request from '${frame.url}': only a window's top frame may capture it`,
    );
    return undefined;
  }

  return frame;
}

/**
 * The part of Electron's `Session` that registers a display-media request handler. `TFrame` is
 * inferred from the request's frame only: Electron's `respond` also accepts a non-frame video
 * source, which is not a {@link DisplayMediaRequestFrame}.
 */
export type DisplayMediaRequestSession<TFrame extends DisplayMediaRequestFrame> = {
  setDisplayMediaRequestHandler(
    handler: (
      request: { frame: TFrame | null },
      respond: (streams: { video?: NoInfer<TFrame> }) => void,
    ) => void,
  ): void;
};

/**
 * Registers the display-media request handler that serves Usersnap's native screenshot, but only
 * when Usersnap is configured. Without a space key nothing can ask for a capture legitimately, so
 * the session keeps Electron's default, which denies every display-media request.
 *
 * @param session The session whose display-media requests to answer
 * @param spaceApiKey The Usersnap space key; empty when this build has no Usersnap integration
 * @returns `true` if a handler was registered, `false` if not
 */
export function registerDisplayMediaRequestHandler<TFrame extends DisplayMediaRequestFrame>(
  session: DisplayMediaRequestSession<TFrame>,
  spaceApiKey: string,
): boolean {
  if (!spaceApiKey) {
    logger.info('No display-media request handler registered: Usersnap is not configured');
    return false;
  }

  session.setDisplayMediaRequestHandler((request, respond) => {
    const source = selectDisplayMediaSource(request.frame);
    respond(source ? { video: source } : {});
  });
  return true;
}

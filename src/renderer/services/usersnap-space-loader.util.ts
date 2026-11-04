import type { SpaceApi } from '@usersnap/browser';

/** Where Usersnap serves the script that loads a space; the same URL `@usersnap/browser` uses */
const USERSNAP_WIDGET_ORIGIN = 'https://widget.usersnap.com';

let loadCount = 0;

/**
 * Loads a Usersnap space by adding Usersnap's loader script to the document, which calls back with
 * the space once it has loaded.
 *
 * Does what `loadSpace` from `@usersnap/browser` does, except that a failed load is not remembered.
 * That package keeps the first load's promise for each key for the life of the window, so after one
 * failure, such as starting the app offline, every later call rejects at once without trying again.
 * Here every call is a fresh attempt.
 *
 * @param spaceApiKey The Usersnap space key
 * @returns The loaded space, not yet initialized
 * @throws If the loader script cannot be loaded. The browser gives no reason; the main process logs
 *   the network error (see `registerUsersnapNetworkErrorLogging`).
 */
export function loadUsersnapSpace(spaceApiKey: string): Promise<SpaceApi> {
  // Created here, not inside the Promise executor below: the renderer document's guard on
  // `document.createElement` lets the renderer's own code create a `<script>` only when the calling
  // frame is a named function, and an anonymous executor's frame has no name. The first load at
  // startup runs before the guard is installed, so only a later load would trip over it.
  const script = document.createElement('script');
  loadCount += 1;
  const callbackName = `usersnapCallback_${loadCount}_${Date.now()}`;

  return new Promise<SpaceApi>((resolve, reject) => {
    Reflect.set(window, callbackName, (spaceApi: SpaceApi) => {
      Reflect.deleteProperty(window, callbackName);
      resolve(spaceApi);
    });
    script.defer = true;
    script.onerror = () => {
      Reflect.deleteProperty(window, callbackName);
      script.remove();
      reject(new Error(`Could not load the Usersnap widget script from ${USERSNAP_WIDGET_ORIGIN}`));
    };
    script.src = `${USERSNAP_WIDGET_ORIGIN}/global/load/${spaceApiKey}?onload=${callbackName}`;
    document.head.appendChild(script);
  });
}

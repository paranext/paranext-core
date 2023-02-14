import { LocalStorage } from 'node-localstorage';
import path from 'path';
import os from 'os';

/**
 * Polyfills LocalStorage into node so you can use localstorage just like in browser
 * @param isPackaged whether or not the app is packaged for production
 */
const polyfillLocalStorage = (isPackaged: boolean) => {
  if (typeof localStorage === 'undefined' || localStorage === null) {
    global.localStorage = new LocalStorage(
      isPackaged
        ? path.join(
            // TODO: find a better place to put localStorage in production so it's not in %temp%/paranext-core like https://stackoverflow.com/a/26227660
            os.tmpdir(),
            `paranext-core/local-storage/${globalThis.processType}/`,
          )
        : path.join(
            __dirname,
            `../../../local-storage/${globalThis.processType}/`,
          ),
    );
  }
};

export default polyfillLocalStorage;

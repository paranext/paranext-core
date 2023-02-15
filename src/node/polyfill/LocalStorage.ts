import { getUserDir } from '@node/util/util';
import { LocalStorage } from 'node-localstorage';
import path from 'path';

/**
 * Polyfills LocalStorage into node so you can use localstorage just like in browser
 * @param isPackaged whether or not the app is packaged for production
 */
const polyfillLocalStorage = (isPackaged: boolean) => {
  if (typeof localStorage === 'undefined' || localStorage === null) {
    global.localStorage = new LocalStorage(
      isPackaged
        ? path.join(getUserDir(), `local-storage/${globalThis.processType}/`)
        : path.join(
            __dirname,
            `../../../local-storage/${globalThis.processType}/`,
          ),
    );
  }
};

export default polyfillLocalStorage;

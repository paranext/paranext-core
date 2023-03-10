import { getAppDir } from '@node/util/util';
import { LocalStorage } from 'node-localstorage';
import path from 'path';

/**
 * Polyfills LocalStorage into node so you can use localstorage just like in browser
 * @param isPackaged whether or not the app is packaged for production
 */
const polyfillLocalStorage = () => {
  if (typeof localStorage === 'undefined' || localStorage === null) {
    global.localStorage = new LocalStorage(
      path.join(getAppDir(), `local-storage/${globalThis.processType}/`),
    );
  }
};

export default polyfillLocalStorage;

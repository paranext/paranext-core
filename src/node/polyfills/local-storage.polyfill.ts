import { getAppDir } from '@node/utils/util';
import { LocalStorage } from 'node-localstorage';
import path from 'path';

/** Polyfills LocalStorage into node so you can use localstorage just like in a browser */
const polyfillLocalStorage = () => {
  // Polyfill logic needs null
  // eslint-disable-next-line no-null/no-null
  if (typeof localStorage === 'undefined' || localStorage === null) {
    global.localStorage = new LocalStorage(
      path.join(getAppDir(), `local-storage/${globalThis.processType}/`),
    );
  }
};

export default polyfillLocalStorage;

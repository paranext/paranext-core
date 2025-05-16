// sqlite3 is a native module, so it is installed in `release/app`. We cannot get types from
// those modules without doing unspeakable things, so we'll just include the things we need here.

// Copied from sqlite 5.1.7 /lib/sqlite3.d.ts
declare module 'sqlite3' {
  export const OPEN_READONLY: number;
  export const OPEN_READWRITE: number;
  export const OPEN_CREATE: number;
  export const OPEN_FULLMUTEX: number;
  export const OPEN_SHAREDCACHE: number;
  export const OPEN_PRIVATECACHE: number;
  export const OPEN_URI: number;
}

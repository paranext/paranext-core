/**
 * Deletes the globals that create code from strings (`eval` and `Function`) so extensions cannot
 * call them by name. See
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_eval_expressions
 *
 * Node.js does not accept strings in `setTimeout`, `setInterval` or `setImmediate`, so those need
 * no change: https://nodejs.org/api/timers.html#scheduling-timers
 */
export function removeCodeFromStringsGlobals() {
  // Node.js loads its built-in `fetch` implementation (undici) on first use, and some of its modules
  // read the global `Function` as they load (Node.js 24's `lib/web/webidl` does). Without this,
  // `fetch`, `Headers`, `Request`, `Response`, `FormData`, `WebSocket`, `MessageEvent` and
  // `CloseEvent` all throw `ReferenceError: Function is not defined` on first use. Constructing a
  // `Headers` loads undici while `Function` still exists, without touching the network.
  new Headers().has('accept');

  // @ts-expect-error we want to remove eval because it can create code from strings
  // eslint-disable-next-line no-eval
  delete globalThis.eval;
  // @ts-expect-error we want to remove Function because it can create code from strings
  delete globalThis.Function;
}

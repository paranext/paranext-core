/**
 * Stack-trace checks used by the renderer's `document.createElement` guard to decide whether a
 * restricted tag (script, iframe, form, anchor, ...) may be created on the renderer document.
 *
 * Each regex requires the first frame to be `document.createElement` inside the renderer bundle
 * (our monkey-patch) and then inspects ONLY the frame directly after it, which is the caller.
 *
 * Note that sourceURLs can't have spaces in them, so we explicitly test for a space before the
 * source so bad actors can't put these special words into their sourceURL
 */

/** First frame of the stack: our `document.createElement` patch inside the dev renderer bundle */
const DEV_CREATE_ELEMENT_FRAME = String.raw`^.+\s+.+ \S*document\.createElement \(https?:\/\/\S*\/renderer\.dev\.js\S*\)\s+`;
/** First frame of the stack: our `document.createElement` patch inside the packaged renderer bundle */
const PACKAGED_CREATE_ELEMENT_FRAME = String.raw`^.+\s+.+ \S*document\.createElement \(file:\/\/\S*app.asar\/dist\/renderer\/renderer\.js\S*\)\s+`;

/**
 * Regexes for stack traces of the renderer's own code creating script and iframe tags (it loads its
 * files in chunks). Only renderer code is allowed to create script and iframe tags.
 */
/* In development, safe errors look like this:
Error
	at document.createElement (http://localhost/renderer.dev.js...)
	at __webpack_require__.l (http://localhost/renderer.dev.js...)
  ...
*/
/* In development, bad errors look more like this:
Error
	at document.createElement (http://localhost/renderer.dev.js...)
	at evil.web-view.htmlfile://app.asar
*/
/* In production, safe errors look like this:
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
	at i.l (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
  ...
*/
/* In production, bad errors look more like this:
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/stuffnthings)
	at evil.web-view.htmlfile://app.asar
*/
const RENDERER_SCRIPT_REGEX_DEV = new RegExp(
  `${DEV_CREATE_ELEMENT_FRAME}${String.raw`.+ \(https?:\/\/\S*\/renderer\.dev\.js\S*\)`}`,
);
const RENDERER_SCRIPT_REGEX_PACKAGED = new RegExp(
  `${PACKAGED_CREATE_ELEMENT_FRAME}${String.raw`.+ \(file:\/\/\S*app.asar\/dist\/renderer\/renderer\.js\S*\)`}`,
);

/**
 * Regexes for stack traces of the Usersnap feedback widget creating form and anchor tags. Only
 * Usersnap is allowed to create form and anchor tags.
 *
 * The widget's caller frame comes in two forms, and both are accepted:
 *
 * - Named: `at <name> (https://resources.usersnap.com/widget-assets/js/chunks/<digits>/<word>.js...)`
 * - Anonymous: `at
 *   https://resources.usersnap.com/widget-assets/js/chunks/<digits>/<word>.js:<line>:<column>`
 *
 * The anonymous form must end its line right after `:<line>:<column>`. A function whose name looks
 * like the Usersnap URL still prints its real location as ` (<location>)` after that name, so it
 * does not end the line there.
 */
/* In development, safe errors look like this (named caller frame):
Error
	at document.createElement (http://localhost/renderer.dev.js...)
	at Kl (https://resources.usersnap.com/widget-assets/js/chunks/6057/cf91460f62d8c495661e.js...)
  ...
*/
/* or like this (anonymous caller frame):
Error
	at document.createElement (http://localhost:1212/renderer.dev.js:136213:36)
	at https://resources.usersnap.com/widget-assets/js/chunks/9208/a6b0c749ffd655a6.js:3:122681
	at sx (https://resources.usersnap.com/widget-assets/js/chunks/9208/a6b0c749ffd655a6.js:3:126885)
  ...
*/
/* In production, safe errors look like this (named caller frame):
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
	at Kl (https://resources.usersnap.com/widget-assets/js/chunks/6057/cf91460f62d8c495661e.js...)
  ...
*/
/* or like this (anonymous caller frame):
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
	at https://resources.usersnap.com/widget-assets/js/chunks/9208/a6b0c749ffd655a6.js:3:122681
  ...
*/
const USERSNAP_CHUNK_URL = String.raw`https?:\/\/resources\.usersnap\.com\/widget-assets\/js\/chunks\/\d+\/\w+\.js`;
const USERSNAP_CALLER_FRAME = String.raw`at (?:.+ \(${USERSNAP_CHUNK_URL}\S*\)|${USERSNAP_CHUNK_URL}:\d+:\d+(?:\n|$))`;
const RENDERER_USERSNAP_REGEX_DEV = new RegExp(
  `${DEV_CREATE_ELEMENT_FRAME}${USERSNAP_CALLER_FRAME}`,
);
const RENDERER_USERSNAP_REGEX_PACKAGED = new RegExp(
  `${PACKAGED_CREATE_ELEMENT_FRAME}${USERSNAP_CALLER_FRAME}`,
);

/**
 * Determines whether a restricted tag may be created on the renderer document, judging by the stack
 * trace of the `document.createElement` call
 *
 * @param stackTrace `Error().stack` captured inside the `document.createElement` patch
 * @param isPackaged Whether the app is packaged, which decides the renderer bundle's URL
 * @returns `true` if the caller is the renderer's own code or the Usersnap feedback widget
 */
export function isCreateElementAllowedByStack(stackTrace: string, isPackaged: boolean): boolean {
  if (isPackaged)
    return (
      RENDERER_SCRIPT_REGEX_PACKAGED.test(stackTrace) ||
      RENDERER_USERSNAP_REGEX_PACKAGED.test(stackTrace)
    );
  return RENDERER_SCRIPT_REGEX_DEV.test(stackTrace) || RENDERER_USERSNAP_REGEX_DEV.test(stackTrace);
}

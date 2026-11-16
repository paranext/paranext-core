/**
 * Stack-trace checks used by the renderer's `document.createElement` guard to decide whether a
 * restricted tag (script, iframe, form, anchor, ...) may be created on the renderer document.
 *
 * Each regex requires the first frame to be `document.createElement` inside the renderer bundle
 * (our monkey-patch) and then inspects ONLY the frame directly after it, which is the caller.
 *
 * The check reads stack-trace text, not the call site itself. Code that controls how its own frame
 * prints can still imitate an allowed caller: a function whose name contains a newline, or a script
 * with a forged `//# sourceURL`, can make its frame read like the Usersnap widget's.
 */

// TODO(PT-4767): replace the stack-text check with a call-site check

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
 * like the Usersnap URL still prints its real location as ` (<location>)` after that name, so a
 * single-line name cannot end the line there. A name containing a newline can (see PT-4767).
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

const USERSNAP_CHUNK_FILE_NAME_REGEX =
  /^https:\/\/resources\.usersnap\.com\/widget-assets\/js\/chunks\/\d+\/\w+\.js$/;

// Captured at module load so code that later replaces `RegExp.prototype.exec` or `Reflect.apply`
// cannot change the answer.
const regExpExec = RegExp.prototype.exec;
const reflectApply = Reflect.apply;

/**
 * Determines whether a restricted tag may be created on the renderer document, judging by the
 * script file name V8 reports for the `document.createElement` caller
 *
 * @param callerFileName Script file name of the calling frame, or `undefined` if it is unknown
 * @param rendererBundleFileName Script file name of the running renderer bundle
 * @returns `true` if the caller is the renderer bundle itself or a Usersnap widget chunk
 */
export function isCreateElementCallerAllowed(
  callerFileName: string | undefined,
  rendererBundleFileName: string,
): boolean {
  if (typeof callerFileName !== 'string') return false;
  if (callerFileName === rendererBundleFileName) return true;
  return Boolean(reflectApply(regExpExec, USERSNAP_CHUNK_FILE_NAME_REGEX, [callerFileName]));
}

/** The parts of a V8 `CallSite` the guard reads */
type CallSite = {
  getFileName(): string | undefined;
  toString(): string;
};

/** A function V8 can drop from a captured trail, along with every frame above it */
type CaptureBoundary = (...args: never[]) => unknown;

/** Frames captured for the log text of a rejected call (V8's default `stackTraceLimit`) */
const REJECTED_LOG_DEPTH = 10;

/** Options for {@link installCreateElementGuard} */
export type CreateElementGuardOptions = {
  /** The window whose `Document.prototype` is guarded; `window` in production */
  realm: typeof globalThis;
  /**
   * Tag names only the renderer bundle or the Usersnap widget may create. Matched without regard to
   * case on the local name, in every namespace.
   */
  restrictedTagNames: readonly string[];
  /**
   * Called before a restricted tag is created for a trusted caller
   *
   * @param tagName Lower-cased local name of the tag
   * @param stackText The caller's frame, for logging
   */
  onAllowed: (tagName: string, stackText: string) => void;
  /**
   * Called instead of creating a restricted tag for any other caller. Must throw.
   *
   * @param tagName Lower-cased local name of the tag
   * @param stackText The calling trail, for logging
   */
  onRejected: (tagName: string, stackText: string) => never;
};

/**
 * Replaces `createElement` and `createElementNS` on `realm.Document.prototype` with versions that
 * let only the renderer bundle and the Usersnap widget create restricted tags. The caller is
 * identified by the script file name V8 reports for its frame, never by stack text.
 *
 * Everything the guard calls later is captured from `realm` here, so code that later replaces a
 * builtin (including a same-origin frame reaching this window as `parent`) cannot change the
 * answer. The guard also takes ownership of `realm.Error.prepareStackTrace`: values assigned to it
 * are stored and served as usual, except while the guard is capturing a call site.
 *
 * @param options The realm to guard, the restricted tags, and the allow and reject callbacks
 * @returns The renderer bundle file name the guard measured for itself
 * @throws If `realm.Error.prepareStackTrace` is already non-configurable or the guard cannot read
 *   its own file name, rather than leave the realm unguarded
 */
export function installCreateElementGuard(options: CreateElementGuardOptions): {
  rendererBundleFileName: string;
} {
  const { realm, restrictedTagNames, onAllowed, onRejected } = options;

  // Step 1: capture every intrinsic the guard uses after install
  const RealmError = realm.Error;
  const { captureStackTrace } = RealmError;
  const RealmObject = realm.Object;
  const {
    create: objectCreate,
    defineProperty,
    getOwnPropertyDescriptor,
    getPrototypeOf,
  } = RealmObject;
  const RealmString = realm.String;
  const { apply, get: reflectGet } = realm.Reflect;
  const { toLowerCase, indexOf, slice } = RealmString.prototype;
  const documentPrototype = realm.Document.prototype;
  const originalCreateElement = documentPrototype.createElement;
  const originalCreateElementNS = documentPrototype.createElementNS;

  let isGuardCapturing = false;
  let formattedSites: CallSite[] | undefined;
  const guardFormatter = (_error: unknown, sites: CallSite[]) => {
    formattedSites = sites;
    return '';
  };

  /**
   * Captures up to `depth` call sites below `boundary` through `guardFormatter`, or `undefined` if
   * that fails. V8 picks the realm whose `Error.prepareStackTrace` formats the trail from the
   * holder's realm, so the holder comes from the captured realm `Object`. V8 honors
   * `stackTraceLimit` only as a data property, so it is written and restored, never redefined. No
   * code outside the guard runs between clearing `formattedSites` and reading it back.
   */
  const captureSites = (depth: number, boundary: CaptureBoundary): CallSite[] | undefined => {
    try {
      const holder = new RealmObject();
      let sites: CallSite[] | undefined;
      const previousLimit = RealmError.stackTraceLimit;
      RealmError.stackTraceLimit = depth;
      try {
        formattedSites = undefined;
        isGuardCapturing = true;
        try {
          captureStackTrace(holder, boundary);
          // V8 formats the trail lazily, on the first read of `stack`
          reflectGet(holder, 'stack');
          sites = formattedSites;
        } finally {
          isGuardCapturing = false;
          formattedSites = undefined;
        }
      } finally {
        RealmError.stackTraceLimit = previousLimit;
      }
      return sites;
    } catch {
      return undefined;
    }
  };

  // Step 2: measure this file's name from a real call site, and take the `CallSite` methods from
  // that call site's prototype
  const originalHookDescriptor = getOwnPropertyDescriptor(RealmError, 'prepareStackTrace');
  if (originalHookDescriptor?.configurable === false)
    throw new Error(
      'Cannot guard createElement: Error.prepareStackTrace is already non-configurable',
    );
  let hookValue: unknown = RealmError.prepareStackTrace;
  defineProperty(RealmError, 'prepareStackTrace', {
    value: guardFormatter,
    writable: true,
    configurable: true,
  });
  let installerSite: CallSite | undefined;
  try {
    // Dropping `captureSites` leaves this installer's own frame first
    installerSite = captureSites(1, captureSites)?.[0];
  } finally {
    if (originalHookDescriptor)
      defineProperty(RealmError, 'prepareStackTrace', originalHookDescriptor);
    else delete RealmError.prepareStackTrace;
  }
  if (!installerSite)
    throw new Error('Cannot guard createElement: could not capture its own call site');
  const callSitePrototype = getPrototypeOf(installerSite);
  const { getFileName, toString: callSiteToString } = callSitePrototype;
  const rendererBundleFileName: unknown = apply(getFileName, installerSite, []);
  if (typeof rendererBundleFileName !== 'string')
    throw new Error('Cannot guard createElement: could not read its own script file name');

  // Step 3: own the hook so the guard's captures always use the guard's formatter
  defineProperty(RealmError, 'prepareStackTrace', {
    get: () => (isGuardCapturing ? guardFormatter : hookValue),
    set: (value: unknown) => {
      hookValue = value;
    },
    enumerable: originalHookDescriptor?.enumerable ?? false,
    configurable: false,
  });

  // Step 4: a null-prototype record, so no inherited property can answer a lookup
  // A `null` prototype is the point here; `Object.create` has no `undefined` equivalent
  // eslint-disable-next-line no-null/no-null
  const restrictedTags: Record<string, boolean> = objectCreate(null);
  restrictedTagNames.forEach((tagName) => {
    restrictedTags[apply(toLowerCase, tagName, [])] = true;
  });

  const formatSites = (sites: CallSite[] | undefined): string => {
    let text = 'Error';
    if (!sites) return text;
    try {
      for (let index = 0; index < sites.length; index += 1)
        text += `\n    at ${RealmString(apply(callSiteToString, sites[index], []))}`;
    } catch {
      // Logging is best effort; the decision never depends on this text
    }
    return text;
  };

  /** Calls `onAllowed` for a trusted caller of `boundary`, or `onRejected` (which throws) */
  const judgeCaller = (tagName: string, boundary: CaptureBoundary) => {
    const callerSites = captureSites(1, boundary);
    let callerFileName: unknown;
    try {
      if (callerSites && callerSites.length > 0)
        callerFileName = apply(getFileName, callerSites[0], []);
    } catch {
      callerFileName = undefined;
    }
    if (
      isCreateElementCallerAllowed(
        typeof callerFileName === 'string' ? callerFileName : undefined,
        rendererBundleFileName,
      )
    ) {
      onAllowed(tagName, formatSites(callerSites));
      return;
    }
    onRejected(tagName, formatSites(captureSites(REJECTED_LOG_DEPTH, boundary)));
  };

  /**
   * Copies `args` into a null-prototype array-like with `args[index]` replaced, so no inherited
   * index setter runs while building the argument list
   */
  const replaceArgument = (args: unknown[], index: number, value: string): ArrayLike<unknown> => {
    // A `null` prototype is the point here; `Object.create` has no `undefined` equivalent
    // eslint-disable-next-line no-null/no-null
    const list: { [index: number]: unknown; length: number } = objectCreate(null);
    for (let i = 0; i < args.length; i += 1) list[i] = i === index ? value : args[i];
    list.length = args.length;
    return list;
  };

  function createElement(this: Document, ...args: unknown[]): unknown {
    if (args.length === 0) return apply(originalCreateElement, this, args);
    const tagName: string = RealmString(args[0]);
    const lowerTagName: string = apply(toLowerCase, tagName, []);
    if (restrictedTags[lowerTagName] === true) judgeCaller(lowerTagName, createElement);
    return apply(originalCreateElement, this, replaceArgument(args, 0, tagName));
  }

  function createElementNS(this: Document, ...args: unknown[]): unknown {
    if (args.length < 2) return apply(originalCreateElementNS, this, args);
    const qualifiedName: string = RealmString(args[1]);
    const colonIndex: number = apply(indexOf, qualifiedName, [':']);
    const localName: string =
      colonIndex === -1 ? qualifiedName : apply(slice, qualifiedName, [colonIndex + 1]);
    const lowerLocalName: string = apply(toLowerCase, localName, []);
    if (restrictedTags[lowerLocalName] === true) judgeCaller(lowerLocalName, createElementNS);
    return apply(originalCreateElementNS, this, replaceArgument(args, 1, qualifiedName));
  }

  // Step 5: lock the guarded methods onto the prototype
  defineProperty(documentPrototype, 'createElement', {
    value: createElement,
    writable: false,
    configurable: false,
    enumerable: true,
  });
  defineProperty(documentPrototype, 'createElementNS', {
    value: createElementNS,
    writable: false,
    configurable: false,
    enumerable: true,
  });

  return { rendererBundleFileName };
}

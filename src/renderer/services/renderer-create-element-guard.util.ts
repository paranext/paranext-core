/**
 * Call-site guard for the renderer's `createElement` and `createElementNS`: decides whether a
 * restricted tag (script, iframe, form, anchor, ...) may be created on the renderer document by the
 * script file name V8 reports for the caller.
 */

const USERSNAP_CHUNK_FILE_NAME_REGEX =
  /^https:\/\/resources\.usersnap\.com\/widget-assets\/js\/chunks\/\d+\/\w+\.js$/;

// `isCreateElementCallerAllowed` runs while a restricted tag is being judged, and in production
// this module shares its realm with the guarded window, so anything it looked up at call time could
// have been replaced by a same-origin frame. These two are captured when the module loads, which is
// before any web view exists; everything else it does is operators on the arguments.
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

  // `!!` rather than `Boolean(...)`: an operator cannot be replaced, and the global `Boolean` can
  return !!reflectApply(regExpExec, USERSNAP_CHUNK_FILE_NAME_REGEX, [callerFileName]);
}

/** The parts of a V8 `CallSite` the guard reads */
type CallSite = {
  getFileName(): string | undefined;
  toString(): string;
};

/** A function V8 can drop from a captured trail, along with every frame above it */
type CaptureBoundary = (...args: never[]) => unknown;

/** Frames captured when judging a call, for its log text (V8's default `stackTraceLimit`) */
const LOG_DEPTH = 10;

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
   * @param stackText The calling trail, for logging
   */
  onAllowed: (tagName: string, stackText: string) => void;
  /**
   * Called instead of creating a restricted tag for any other caller. Must throw; if it returns
   * anyway, the guard throws its own error and still does not create the tag.
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
 * Code that later replaces a builtin (including a same-origin frame reaching this window as
 * `parent`) cannot change the answer, because nothing on the call path is looked up at call time.
 * The installer captures every builtin it uses from `realm` at install (see the Step 1 captures)
 * and takes `getFileName` and `toString` from the prototype of a real V8 call site.
 * {@link isCreateElementCallerAllowed} uses `RegExp.prototype.exec` and `Reflect.apply` captured
 * when this module loads. Everything else on that path is an operator or an own property of a value
 * the guard created or V8 handed it. The one property it reads off a shared object is
 * `realm.Error.stackTraceLimit`; an accessor planted there runs before the capture starts and V8
 * ignores it, so the capture finds no caller and the call is rejected. The guard also takes
 * ownership of `realm.Error.prepareStackTrace`: values assigned to it are stored and served as
 * usual, except while the guard is capturing a call site. It also locks the `realm.Error` binding,
 * since an embedder's stack-trace callback (Node's, for one) finds the hook through that binding
 * rather than through the intrinsic.
 *
 * @param options The realm to guard, the restricted tags, and the allow and reject callbacks
 * @returns The renderer bundle file name the guard measured for itself
 * @throws If `realm.Error` or `realm.Error.prepareStackTrace` is already non-configurable or the
 *   guard cannot read its own file name, rather than leave the realm unguarded
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
  const { apply, deleteProperty, get: reflectGet } = realm.Reflect;
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
   * `stackTraceLimit` only as a data property, so it is written and restored, never redefined.
   *
   * Between clearing `formattedSites` and reading it back, only V8 and the embedder's stack-trace
   * callback run, and both reach a formatter only through `realm.Error.prepareStackTrace`. While
   * the guard is capturing, that is `guardFormatter`, because the guard owns the hook and has
   * locked the `realm.Error` binding. So no code outside the guard can deliver call sites of its
   * own choosing.
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

  // Checked before anything is changed, so a failed install leaves the realm as it found it
  if (getOwnPropertyDescriptor(realm, 'Error')?.configurable === false)
    throw new Error('Cannot guard createElement: the Error binding is already non-configurable');

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
    else deleteProperty(RealmError, 'prepareStackTrace');
  }
  if (!installerSite)
    throw new Error('Cannot guard createElement: could not capture its own call site');
  const callSitePrototype = getPrototypeOf(installerSite);
  const { getFileName, toString: callSiteToString } = callSitePrototype;
  const rendererBundleFileName: unknown = apply(getFileName, installerSite, []);
  if (typeof rendererBundleFileName !== 'string')
    throw new Error('Cannot guard createElement: could not read its own script file name');

  // Step 3: own the hook so the guard's captures always use the guard's formatter, and lock the
  // `Error` binding so no stack-trace callback can be pointed at a different hook
  defineProperty(realm, 'Error', { value: RealmError, writable: false, configurable: false });
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

  /** Calls `onAllowed` for a trusted caller of `boundary`; otherwise calls `onRejected` and throws */
  const judgeCaller = (tagName: string, boundary: CaptureBoundary) => {
    // One capture deep enough to log: the decision reads only the first frame, and the rest show
    // which code drove a trusted caller
    const callerSites = captureSites(LOG_DEPTH, boundary);
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
    onRejected(tagName, formatSites(callerSites));
    // `onRejected` is typed to throw, but nothing enforces that at runtime
    throw new RealmError(`Rejected creating new ${tagName} tag on renderer document`);
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

    // A string primitive cannot change between the check and the native call, so only another
    // value (whose conversion could answer differently the second time) needs a converted copy
    const isStringName = typeof args[0] === 'string';
    const tagName: string = isStringName ? args[0] : RealmString(args[0]);
    const lowerTagName: string = apply(toLowerCase, tagName, []);
    if (restrictedTags[lowerTagName] === true) judgeCaller(lowerTagName, createElement);
    return apply(
      originalCreateElement,
      this,
      isStringName ? args : replaceArgument(args, 0, tagName),
    );
  }

  function createElementNS(this: Document, ...args: unknown[]): unknown {
    if (args.length < 2) return apply(originalCreateElementNS, this, args);

    // See `createElement` for why a string primitive is passed through as is
    const isStringName = typeof args[1] === 'string';
    const qualifiedName: string = isStringName ? args[1] : RealmString(args[1]);
    const colonIndex: number = apply(indexOf, qualifiedName, [':']);
    const localName: string =
      colonIndex === -1 ? qualifiedName : apply(slice, qualifiedName, [colonIndex + 1]);
    const lowerLocalName: string = apply(toLowerCase, localName, []);
    if (restrictedTags[lowerLocalName] === true) judgeCaller(lowerLocalName, createElementNS);
    return apply(
      originalCreateElementNS,
      this,
      isStringName ? args : replaceArgument(args, 1, qualifiedName),
    );
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

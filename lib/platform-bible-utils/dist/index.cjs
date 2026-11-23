"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const scriptureUtil = require("./scripture-util.cjs");
const asyncMutex = require("async-mutex");
const DOMPurify = require("dompurify");
const grapheme = require("unicode-segmenter/grapheme");
const fastEquals = require("fast-equals");
const scriptureUtilities = require("@eten-tech-foundation/scripture-utilities");
const jsonpathPlus = require("jsonpath-plus");
const _AsyncVariable = class _AsyncVariable {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(variableName, rejectIfNotSettledWithinMS = 1e4) {
    __publicField(this, "variableName");
    __publicField(this, "promiseToValue");
    __publicField(this, "timeoutId");
    __publicField(this, "timeoutOccurred");
    __publicField(this, "resolver");
    __publicField(this, "rejecter");
    this.variableName = variableName;
    this.timeoutOccurred = false;
    this.promiseToValue = new Promise((resolve, reject) => {
      this.resolver = resolve;
      this.rejecter = reject;
    });
    if (rejectIfNotSettledWithinMS > 0) {
      this.timeoutId = setTimeout(() => {
        if (this.rejecter) {
          this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`);
          this.timeoutOccurred = true;
          this.complete();
        }
      }, rejectIfNotSettledWithinMS);
    }
    Object.seal(this);
  }
  /**
   * Get this variable's promise to a value. This always returns the same promise even after the
   * value has been resolved or rejected.
   *
   * @returns The promise for the value to be set
   */
  get promise() {
    return this.promiseToValue;
  }
  /**
   * A simple way to see if this variable's promise was resolved or rejected already
   *
   * @returns Whether the variable was already resolved or rejected
   */
  get hasSettled() {
    return Object.isFrozen(this);
  }
  /**
   * Can use to determine if a rejection occurred due to a timeout
   *
   * @returns Whether the variable timed out while waiting for a value to resolve
   */
  get hasTimedOut() {
    return this.timeoutOccurred;
  }
  /**
   * Allows enabling more verbose logging when async variables resolve and reject
   *
   * @param enabled Whether to enable verbose logging
   */
  static setVerboseLogging(enabled) {
    this.verboseLoggingEnabled = enabled;
  }
  /**
   * Resolve this variable's promise to the given value
   *
   * @param value This variable's promise will resolve to this value
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected. Defaults to `false`
   */
  resolveToValue(value, throwIfAlreadySettled = false) {
    if (this.resolver) {
      if (_AsyncVariable.verboseLoggingEnabled)
        console.debug(`${this.variableName} is being resolved now`);
      this.resolver(value);
      this.complete();
    } else {
      if (throwIfAlreadySettled) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent resolution of ${this.variableName}`);
    }
  }
  /**
   * Reject this variable's promise for the value with the given reason
   *
   * @param reason This variable's promise will be rejected with this reason
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected. Defaults to `false`
   */
  rejectWithReason(reason, throwIfAlreadySettled = false) {
    if (this.rejecter) {
      if (_AsyncVariable.verboseLoggingEnabled)
        console.debug(`${this.variableName} is being rejected now with reason: ${reason}`);
      this.rejecter(reason);
      this.complete();
    } else {
      if (throwIfAlreadySettled) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0;
    this.rejecter = void 0;
    if (this.timeoutId !== void 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = void 0;
    }
    Object.freeze(this);
  }
};
__publicField(_AsyncVariable, "verboseLoggingEnabled", false);
let AsyncVariable = _AsyncVariable;
class Collator {
  constructor(locales, options) {
    __publicField(this, "collator");
    this.collator = new Intl.Collator(locales, options);
  }
  /**
   * Compares two strings according to the sort order of this Collator object
   *
   * @param string1 String to compare
   * @param string2 String to compare
   * @returns A number indicating how string1 and string2 compare to each other according to the
   *   sort order of this Collator object. Negative value if string1 comes before string2. Positive
   *   value if string1 comes after string2. 0 if they are considered equal.
   */
  compare(string1, string2) {
    return this.collator.compare(string1, string2);
  }
  /**
   * Returns a new object with properties reflecting the locale and collation options computed
   * during initialization of this collator object.
   *
   * @returns ResolvedCollatorOptions object
   */
  resolvedOptions() {
    return this.collator.resolvedOptions();
  }
}
class DateTimeFormat {
  constructor(locales, options) {
    __publicField(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(locales, options);
  }
  /**
   * Formats a date according to the locale and formatting option for this DateTimeFormat object
   *
   * @param date The date to format
   * @returns String representing the given date formatted according to the locale and formatting
   *   options of this DateTimeFormat object
   */
  format(date) {
    return this.dateTimeFormatter.format(date);
  }
  /**
   * Formats a date range in the most concise way based on the locales and options provided when
   * instantiating this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns String representing the given date range formatted according to the locale and
   *   formatting options of this DateTimeFormat object
   */
  formatRange(startDate, endDate) {
    return this.dateTimeFormatter.formatRange(startDate, endDate);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(startDate, endDate) {
    return this.dateTimeFormatter.formatRangeToParts(startDate, endDate);
  }
  /**
   * Allows locale-aware formatting of strings produced by this DateTimeFormat object
   *
   * @param date The date to format
   * @returns Array of DateTimeFormatPart objects
   */
  formatToParts(date) {
    return this.dateTimeFormatter.formatToParts(date);
  }
  /**
   * Returns a new object with properties reflecting the locale and date and time formatting options
   * computed during initialization of this DateTimeFormat object
   *
   * @returns ResolvedDateTimeFormatOptions object
   */
  resolvedOptions() {
    return this.dateTimeFormatter.resolvedOptions();
  }
}
function isPromise(value) {
  return typeof value === "object" && !!value && "then" in value && typeof value.then === "function" && "catch" in value && typeof value.catch === "function";
}
class PlatformEventEmitter {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     */
    __publicField(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    __publicField(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    __publicField(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    __publicField(this, "isDisposed", false);
    /** Disposes of this event, preparing it to release from memory */
    __publicField(this, "dispose", () => {
      return this.disposeFn();
    });
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    __publicField(this, "emit", (event) => {
      this.emitFn(event);
    });
    /**
     * Runs the subscriptions for the event, keeping each subscriber's failure to itself: a subscriber
     * that throws hands its error to `handleSubscriberError` and the remaining subscribers still
     * run.
     *
     * Use this where the emit is the only time subscribers are told about something that has already
     * happened and will not be reported again — one broken subscriber must not cost the rest the
     * news. Prefer {@link emit} everywhere else: a caller that can still act on a throw should see
     * it.
     *
     * This does not await `async` subscribers. It routes their rejections — a subscriber whose
     * promise rejects reaches `handleSubscriberError` the same way a synchronous throw does — but it
     * does not sequence them: this returns as soon as every subscriber has been _started_, with any
     * async subscriber still suspended at its first `await`. An emitter that tears something down
     * right after emitting therefore tears it down out from under those subscribers.
     *
     * @param event Event data to provide to subscribed callbacks
     * @param handleSubscriberError Run with the error a subscriber threw and that subscriber's
     *   position in the subscription order. Must not throw; a throw from it stops the remaining
     *   subscribers, which is the very thing this is here to prevent.
     * @experimental
     */
    __publicField(this, "emitIsolated", (event, handleSubscriberError) => {
      this.emitIsolatedFn(event, handleSubscriberError);
    });
  }
  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   *
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  get event() {
    this.assertNotDisposed();
    if (!this.lazyEvent) {
      this.lazyEvent = (callback) => {
        if (!callback || typeof callback !== "function")
          throw new Error(`Event handler callback must be a function!`);
        if (!this.subscriptions) this.subscriptions = [];
        this.subscriptions.push(callback);
        return () => {
          if (!this.subscriptions) return false;
          const callbackIndex = this.subscriptions.indexOf(callback);
          if (callbackIndex < 0) return false;
          this.subscriptions.splice(callbackIndex, 1);
          return true;
        };
      };
    }
    return this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(event) {
    this.assertNotDisposed();
    this.forEachSubscription((callback) => callback(event));
  }
  /**
   * Function that runs the subscriptions for the event in isolation from each other. Added here so
   * children can override {@link emitIsolated} and still call the base functionality.
   *
   * @experimental
   */
  emitIsolatedFn(event, handleSubscriberError) {
    this.assertNotDisposed();
    this.forEachSubscription((callback, subscriberIndex) => {
      try {
        const returnedValue = callback(event);
        if (isPromise(returnedValue))
          returnedValue.catch((error) => {
            handleSubscriberError(error, subscriberIndex);
          });
      } catch (error) {
        handleSubscriberError(error, subscriberIndex);
      }
    });
  }
  /** Check to make sure this emitter is not disposed. Throw if it is */
  assertNotDisposed() {
    if (this.isDisposed) throw new Error("Emitter is disposed");
  }
  /**
   * Disposes of this event, preparing it to release from memory. Added here so children can
   * override emit and still call the base functionality.
   */
  disposeFn() {
    this.assertNotDisposed();
    this.isDisposed = true;
    this.subscriptions = void 0;
    this.lazyEvent = void 0;
    return Promise.resolve(true);
  }
  /**
   * Run something for each current subscription. Clones the subscriptions array before iterating
   * over the callbacks so the callback index doesn't get messed up if someone subscribes or
   * unsubscribes inside one of the callbacks
   */
  forEachSubscription(runForSubscription) {
    [...this.subscriptions ?? []].forEach(runForSubscription);
  }
}
class DocumentCombiner {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(baseDocument, options) {
    __publicField(this, "baseDocument");
    __publicField(this, "contributions", /* @__PURE__ */ new Map());
    __publicField(this, "latestOutput");
    __publicField(this, "options");
    __publicField(this, "onDidRebuildEmitter", new PlatformEventEmitter());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    __publicField(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = baseDocument;
    this.options = options;
    this.updateBaseDocument(baseDocument);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(baseDocument) {
    this.validateBaseDocument(baseDocument);
    this.baseDocument = this.options.copyDocuments ? scriptureUtil.deepClone(baseDocument) : baseDocument;
    this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument);
    return this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * Note: the order in which contribution documents are added can be considered indeterminate as it
   * depends on the order in which `Map.forEach` iterates over the contributions. However, the order
   * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is is
   * `true`, the order also matters when adding the same property to an object that is already
   * provided previously. Please let us know if you have trouble because of indeterminate
   * contribution ordering.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(documentName, document) {
    this.validateContribution(documentName, document);
    const previousDocumentVersion = this.contributions.get(documentName);
    let documentToSet = this.options.copyDocuments && !!document ? scriptureUtil.deepClone(document) : document;
    documentToSet = this.transformContributionAfterValidation(documentName, documentToSet);
    this.contributions.set(documentName, documentToSet);
    try {
      return this.rebuild();
    } catch (error) {
      if (previousDocumentVersion) this.contributions.set(documentName, previousDocumentVersion);
      else this.contributions.delete(documentName);
      throw new Error(`Error when setting the document named ${documentName}: ${error}`);
    }
  }
  /**
   * Delete one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContribution(documentName) {
    const document = this.contributions.get(documentName);
    if (!document) throw new Error(`${documentName} does not exist`);
    this.contributions.delete(documentName);
    try {
      return this.rebuild();
    } catch (error) {
      this.contributions.set(documentName, document);
      throw new Error(`Error when deleting the document named ${documentName}: ${error}`);
    }
  }
  /**
   * Delete all present contribution documents for the composition process and return to the base
   * document
   *
   * @returns Recalculated output document consisting only of the base document
   */
  deleteAllContributions() {
    if (this.contributions.size <= 0) return this.latestOutput;
    const contributions = [...this.contributions.entries()];
    contributions.forEach(([contributionName]) => this.contributions.delete(contributionName));
    try {
      return this.rebuild();
    } catch (error) {
      contributions.forEach(
        ([contributionName, document]) => this.contributions.set(contributionName, document)
      );
      throw new Error(`Error when deleting all contributions: ${error}`);
    }
  }
  /**
   * Run the document composition process given the starting document and all contributions. Throws
   * if the output document fails to validate properly.
   *
   * @returns Recalculated output document given the starting and contributed documents
   */
  rebuild() {
    if (this.contributions.size === 0) {
      let potentialOutput = scriptureUtil.deepClone(this.baseDocument);
      potentialOutput = this.transformFinalOutputBeforeValidation(potentialOutput);
      this.validateOutput(potentialOutput);
      this.latestOutput = potentialOutput;
      this.onDidRebuildEmitter.emit(void 0);
      return this.latestOutput;
    }
    let outputIteration = this.baseDocument;
    this.contributions.forEach((contribution) => {
      outputIteration = mergeObjects(
        outputIteration,
        contribution,
        this.options.ignoreDuplicateProperties
      );
      this.validateOutput(outputIteration);
    });
    outputIteration = this.transformFinalOutputBeforeValidation(outputIteration);
    this.validateOutput(outputIteration);
    this.latestOutput = outputIteration;
    this.onDidRebuildEmitter.emit(void 0);
    return this.latestOutput;
  }
  /**
   * Transform the starting document that is given to the combiner. This transformation occurs after
   * validating the base document and before combining any contributions.
   *
   * WARNING: If you do not create the combiner with option `copyDocuments: true` or clone inside
   * this method, this method will directly modify the `baseDocument` passed in.
   *
   * @param baseDocument Initial input document. Already validated via `validateBaseDocument`
   * @returns Transformed base document
   */
  // We just don't need `this` here. This is basically a no-op function that is available to child
  // classes to override
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformBaseDocumentAfterValidation(baseDocument) {
    return baseDocument;
  }
  /**
   * Transform the contributed document associated with `documentName`. This transformation occurs
   * after validating the contributed document and before combining with other documents.
   *
   * WARNING: If you do not create the combiner with option `copyDocuments: true` or clone inside
   * this method, this method will directly modify the contributed `document` passed in.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine. Already validated via
   *   `validateContribution`
   * @returns Transformed contributed document
   */
  // We just don't need `this` here. This is basically a no-op function that is available to child
  // classes to override
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformContributionAfterValidation(documentName, document) {
    return document;
  }
  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateBaseDocument(baseDocument) {
  }
  /**
   * Throw an error if the provided document is not a valid contribution document.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateContribution(documentName, document) {
  }
  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateOutput(output) {
  }
  /**
   * Transform the document that is the composition of the base document and all contribution
   * documents. This is the last step that will be run prior to validation via `validateOutput`
   * before `this.latestOutput` is updated to the new output.
   *
   * @param finalOutput Final output document that could potentially be returned to callers. "Final"
   *   means no further contribution documents will be merged.
   */
  // no-op intended to be overridden by child classes. Can't be static
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformFinalOutputBeforeValidation(finalOutput) {
    return finalOutput;
  }
}
function areNonArrayObjects(...values) {
  let allMatch = true;
  values.forEach((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) allMatch = false;
  });
  return allMatch;
}
function areArrayObjects(...values) {
  let allMatch = true;
  values.forEach((value) => {
    if (!value || typeof value !== "object" || !Array.isArray(value)) allMatch = false;
  });
  return allMatch;
}
function mergeObjects(startingPoint, copyFrom, ignoreDuplicateProperties) {
  const retVal = scriptureUtil.deepClone(startingPoint);
  if (!copyFrom) return retVal;
  return mergeObjectsInternal(retVal, scriptureUtil.deepClone(copyFrom), ignoreDuplicateProperties);
}
function mergeObjectsInternal(startingPoint, copyFrom, ignoreDuplicateProperties) {
  if (!copyFrom) return startingPoint;
  if (areNonArrayObjects(startingPoint, copyFrom)) {
    const startingPointObj = startingPoint;
    const copyFromObj = copyFrom;
    Object.keys(copyFromObj).forEach((key) => {
      if (Object.hasOwn(startingPointObj, key)) {
        if (areNonArrayObjects(startingPointObj[key], copyFromObj[key])) {
          startingPointObj[key] = mergeObjectsInternal(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            startingPointObj[key],
            copyFromObj[key],
            ignoreDuplicateProperties
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        } else if (areArrayObjects(startingPointObj[key], copyFromObj[key])) {
          startingPointObj[key] = startingPointObj[key].concat(
            copyFromObj[key]
          );
        } else if (!ignoreDuplicateProperties)
          throw new Error(`Cannot merge objects: key "${key}" already exists in the target object`);
      } else {
        startingPointObj[key] = copyFromObj[key];
      }
    });
  } else if (areArrayObjects(startingPoint, copyFrom)) {
    startingPoint.push(...copyFrom);
  }
  return startingPoint;
}
class EventRollingTimeCounter {
  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(bufferSize) {
    /** The ring buffer to store times */
    __publicField(this, "ringBuffer");
    /** The size of the ring buffer */
    __publicField(this, "bufferSize");
    /** The next location where a time will be written */
    __publicField(this, "writerIndex");
    /** The location where the first time in the buffer will be read */
    __publicField(this, "readerIndex");
    /** The most recent difference in time between the newest and oldest events */
    __publicField(this, "lastTimeDifference");
    /** How many instances in total have been recorded */
    __publicField(this, "totalInstanceCount");
    this.bufferSize = bufferSize;
    this.ringBuffer = new Array(bufferSize).fill(0);
    this.writerIndex = 0;
    this.readerIndex = 0;
    this.lastTimeDifference = 0;
    this.totalInstanceCount = 0;
  }
  /** Get the total number of instances that have been recorded */
  get totalInstances() {
    return this.totalInstanceCount;
  }
  /** Add a new time measurement for an instance of an event */
  recordInstance() {
    this.totalInstanceCount += 1;
    const currentTime = performance.now();
    this.lastTimeDifference = currentTime - this.ringBuffer[this.readerIndex];
    this.ringBuffer[this.writerIndex] = currentTime;
    this.writerIndex += 1;
    if (this.writerIndex >= this.bufferSize) this.writerIndex %= this.bufferSize;
    if (this.writerIndex === this.readerIndex) {
      this.readerIndex += 1;
      if (this.readerIndex >= this.bufferSize) this.readerIndex %= this.bufferSize;
    }
  }
  /**
   * Check if the time between the last N events is less than the provided threshold
   *
   * @param minRollingTimeMs - Minimum time that must have passed when the last N events occurred
   * @returns - True if the threshold is violated, false otherwise
   */
  hasViolatedThreshold(minRollingTimeMs) {
    return this.totalInstanceCount >= this.bufferSize && this.lastTimeDifference < minRollingTimeMs;
  }
}
class Mutex extends asyncMutex.Mutex {
}
class MutexMap {
  constructor() {
    __publicField(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  /**
   * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
   * ID, a new Mutex is created, stored, and returned.
   *
   * @param mutexID Unique identifier for the desired Mutex
   * @returns The Mutex associated with the provided ID
   */
  get(mutexID) {
    let retVal = this.mutexesByID.get(mutexID);
    if (retVal) return retVal;
    retVal = new Mutex();
    this.mutexesByID.set(mutexID, retVal);
    return retVal;
  }
  /**
   * Disposes of this MutexMap by canceling all pending operations on all mutexes and clearing the
   * map. After disposal, the MutexMap should not be used.
   */
  dispose() {
    this.mutexesByID.forEach((mutex) => {
      mutex.cancel();
    });
    this.mutexesByID.clear();
  }
}
class NonValidatingDocumentCombiner extends DocumentCombiner {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(baseDocument, options) {
    super(baseDocument, options);
  }
  get output() {
    return this.latestOutput;
  }
}
class NumberFormat {
  constructor(locales, options) {
    __publicField(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(locales, options);
  }
  /**
   * Formats a number according to the locale and formatting options of this NumberFormat object
   *
   * @param value Number or BigInt to format
   * @returns String representing the given number formatted according to the locale and formatting
   *   options of this NumberFormat object
   */
  format(value) {
    return this.numberFormatter.format(value);
  }
  /**
   * Formats a range of numbers according to the locale and formatting options of this NumberFormat
   * object
   *
   * @param startRange Number or bigint representing the start of the range
   * @param endRange Number or bigint representing the end of the range
   * @returns String representing the given range of numbers formatted according to the locale and
   *   formatting options of this NumberFormat object
   */
  formatRange(startRange, endRange) {
    return this.numberFormatter.formatRange(startRange, endRange);
  }
  /**
   * Returns an array of objects containing the locale-specific tokens from which it is possible to
   * build custom strings while preserving the locale-specific parts.
   *
   * @param startRange Number or bigint representing start of the range
   * @param endRange Number or bigint representing end of the range
   * @returns Array of NumberRangeFormatPart objects containing the formatted range of numbers in
   *   parts
   */
  formatRangeToParts(startRange, endRange) {
    return this.numberFormatter.formatRangeToParts(startRange, endRange);
  }
  /**
   * Allows locale-aware formatting of strings produced by this NumberFormat object
   *
   * @param value Number or bigint to format
   * @returns Array of NumberFormatPart objects containing the formatted number in parts
   */
  formatToParts(value) {
    return this.numberFormatter.formatToParts(value);
  }
  /**
   * Returns a new object with properties reflecting the locale and number formatting options
   * computed during initialization of this NumberFormat object
   *
   * @returns ResolvedNumberFormatOptions object
   */
  resolvedOptions() {
    return this.numberFormatter.resolvedOptions();
  }
}
const defaultPromise = Promise.resolve();
class PromiseChainingMap {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(logger = console) {
    __publicField(this, "map", /* @__PURE__ */ new Map());
    __publicField(this, "logger");
    this.logger = logger;
  }
  /**
   * Adds a promise function to the map for a given key. If a promise is already running for the
   * key, the new promise will be chained to the existing one. Once all promises for a key have
   * settled, the map will be cleared for that key.
   *
   * @param key Unique key to identify a distinct promise chain
   * @param promiseFunction Function that returns a promise to add to the chain
   */
  addPromiseFunction(key, promiseFunction) {
    const currentPromise = this.map.get(key);
    this.map.set(key, currentPromise ? currentPromise.then(promiseFunction) : promiseFunction());
    this.cleanupPromiseChain(key);
  }
  /**
   * Gets the current promise chain for the given key. This is mostly useful for testing. Normally
   * you should just call {@link addPromiseFunction} and let the map handle the rest.
   *
   * @param key Unique key to identify a distinct promise chain
   * @returns The current promise chain for the key
   */
  get(key) {
    return this.map.get(key);
  }
  /**
   * Configures a promise chain to be removed from the map for the given key after all the promises
   * have settled
   *
   * @param key Unique key to identify a distinct promise chain
   */
  cleanupPromiseChain(key) {
    const currentPromise = this.map.get(key);
    if (!currentPromise) return;
    const promiseHolder = { promise: defaultPromise };
    const newPromise = currentPromise.catch((e) => this.logger.warn(`Error in promise for ${key}: ${e.message}`)).finally(() => {
      if (this.map.get(key) === promiseHolder.promise) this.map.delete(key);
    });
    promiseHolder.promise = newPromise;
    this.map.set(key, newPromise);
  }
}
class SortedNumberMap {
  constructor() {
    __publicField(this, "map", /* @__PURE__ */ new Map());
    __publicField(this, "sortedKeys", []);
  }
  /**
   * Returns an iterable of keys in the map sorted in ascending order.
   *
   * Time complexity: internal detail to JavaScript engine. Reasonable expectation:
   *
   * - Executing this method to return an iterator: O(1)
   * - Iterating over the returned iterator: O(n)
   *
   * Note that iterating over the keys this way negates the benefits of using this class over a
   * using a {@link Map}. To access individual keys more quickly, use
   * {@link SortedNumberMap.findClosestLessThanOrEqual} or {@link SortedNumberMap.get}.
   *
   * TSDoc adapted from {@link Map.keys}
   */
  keys() {
    return this.sortedKeys.values();
  }
  /**
   * Returns a specified element from the Map object. If the value that is associated to the
   * provided key is an object, then you will get a reference to that object and any change made to
   * that object will effectively modify it inside the Map.
   *
   * Time complexity: O(1)
   *
   * @returns Returns the element associated with the specified key. If no element is associated
   *   with the specified key, returns `undefined`.
   *
   *   TSDoc adapted from {@link Map.get}
   */
  get(key) {
    return this.map.get(key);
  }
  /**
   * Sets a key-value pair in the map. If the key already exists, its value is updated. If the key
   * is new, it's inserted in the correct sorted position.
   *
   * Time complexity: O(log n) for new keys (due to binary search and array insertion), O(1) for
   * existing keys.
   *
   * @example
   *
   * ```typescript
   * const map = new SortedNumberMap<string>();
   * map.set(10, 'ten');
   * map.set(5, 'five');
   * map.set(15, 'fifteen');
   * // Keys are automatically maintained in sorted order: [5, 10, 15]
   * ```
   *
   * @param key - The numeric key to set
   * @param value - The value to associate with the key
   */
  set(key, value) {
    if (!this.map.has(key)) {
      const insertIndex = this.binarySearchInsertIndex(key);
      this.sortedKeys.splice(insertIndex, 0, key);
    }
    this.map.set(key, value);
  }
  /**
   * Finds the key-value pair with the largest key that is less than or equal to the target.
   *
   * This method uses binary search to efficiently locate the closest match. If no key is less than
   * or equal to the target, it returns undefined.
   *
   * Time complexity: O(log n)
   *
   * @example
   *
   * ```typescript
   * const map = new SortedNumberMap<string>();
   * map.set(10, 'ten');
   * map.set(20, 'twenty');
   * map.set(30, 'thirty');
   *
   * // Exact match
   * map.findClosestLessThanOrEqual(20); // { key: 20, value: 'twenty' }
   *
   * // Closest less than
   * map.findClosestLessThanOrEqual(25); // { key: 20, value: 'twenty' }
   *
   * // No match (target too small)
   * map.findClosestLessThanOrEqual(5); // undefined
   * ```
   *
   * @param target - The number to search for
   * @returns The key-value pair with the largest key ≤ target, or undefined if none exists
   */
  findClosestLessThanOrEqual(target) {
    const index = this.binarySearchLessThanOrEqual(target);
    if (index === -1) return void 0;
    const key = this.sortedKeys[index];
    const value = this.map.get(key);
    if (value === void 0) return void 0;
    return { key, value };
  }
  binarySearchLessThanOrEqual(target) {
    let left = 0;
    let right = this.sortedKeys.length - 1;
    let result = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sortedKeys[mid] <= target) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }
  binarySearchInsertIndex(target) {
    let left = 0;
    let right = this.sortedKeys.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sortedKeys[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }
}
class SortedSet {
  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(compareFn) {
    /** Internal storage for the sorted items */
    __publicField(this, "items", []);
    this.compareFn = compareFn;
  }
  /** Gets the number of elements in the set */
  get size() {
    return this.items.length;
  }
  /** Returns whether the set is empty */
  get isEmpty() {
    return this.items.length === 0;
  }
  /**
   * Inserts an item into the set if it's not already present
   *
   * @param item - The item to insert
   * @returns True if the item was added; false if an equal item already exists
   */
  insert(item) {
    const index = this.findInsertionIndex(item);
    if (index < this.items.length && this.compareFn(this.items[index], item) === 0) {
      return false;
    }
    this.items.splice(index, 0, item);
    return true;
  }
  /**
   * Removes an item from the set
   *
   * @param item - The item to remove
   * @returns True if the item was removed; false if it wasn't found
   */
  remove(item) {
    const index = this.findIndex(item);
    if (index < 0) return false;
    this.items.splice(index, 1);
    return true;
  }
  /**
   * Checks if an item exists in the set
   *
   * @param item - The item to check
   * @returns True if the item exists; false otherwise
   */
  has(item) {
    return this.findIndex(item) >= 0;
  }
  /** Returns all items in the set as an array, in sorted order */
  toArray() {
    return [...this.items];
  }
  /** Returns the index of an item in the set, or -1 if not found */
  findIndex(item) {
    const index = this.findInsertionIndex(item);
    if (index < this.items.length && this.compareFn(this.items[index], item) === 0) return index;
    return -1;
  }
  /**
   * Returns the element at the specified index in the sorted order
   *
   * @param index - The zero-based index of the element to get
   * @returns The element at the specified index, or undefined if the index is out of range
   */
  at(index) {
    if (index < 0 || index >= this.items.length) return void 0;
    return this.items[index];
  }
  /** Iterates through each item in the sorted set */
  forEach(callback) {
    this.items.forEach((item, index) => callback(item, index, this));
  }
  /** Returns an iterator for the set's items */
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.items.length) {
          index += 1;
          return { value: this.items[index - 1], done: false };
        }
        return { value: void 0, done: true };
      }
    };
  }
  /** Clears all items from the set */
  clear() {
    this.items.length = 0;
  }
  /**
   * Uses binary search to find the position where an item should be inserted to maintain the sorted
   * order
   */
  findInsertionIndex(item) {
    let low = 0;
    let high = this.items.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const comparison = this.compareFn(this.items[mid], item);
      if (comparison < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
}
const LATE_ARRIVAL_REPORT_WINDOW_MS = 1e4;
const LATE_ARRIVAL_REPORT_WINDOW_SECONDS = LATE_ARRIVAL_REPORT_WINDOW_MS / 1e3;
const MAX_SUPPRESSED_ERROR_SAMPLES = 3;
const lateArrivalReportWindows = /* @__PURE__ */ new Map();
const LATE_ARRIVAL_REPORTS = {
  unsubscribed: {
    log: (message) => console.warn(message),
    first: (name) => `UnsubscriberAsyncList ${name}: Unsubscriber arrived after the list was run, so it was unsubscribed immediately instead of being stored.`,
    suppressed: (name, suppressedCount) => `UnsubscriberAsyncList ${name}: ${suppressedCount} more unsubscribers arrived after the list was run in the last ${LATE_ARRIVAL_REPORT_WINDOW_SECONDS}s and were unsubscribed immediately; per-occurrence warnings suppressed.`
  },
  failed: {
    log: (message) => console.error(message),
    first: (name) => `UnsubscriberAsyncList ${name}: Unsubscriber added after the list was run failed!`,
    suppressed: (name, suppressedCount) => `UnsubscriberAsyncList ${name}: ${suppressedCount} more unsubscribers added after the list was run failed in the last ${LATE_ARRIVAL_REPORT_WINDOW_SECONDS}s; per-occurrence errors suppressed.`
  },
  threw: {
    log: (message) => console.error(message),
    first: (name, error) => `UnsubscriberAsyncList ${name}: Unsubscriber added after the list was run threw! ${error}`,
    // Unlike the other two outcomes, throttling this one discards more than repetition: each
    // occurrence carries its own error. The samples are what keep a storm's causes legible; a bare
    // count could not distinguish one recurring fault from many different ones.
    suppressed: (name, suppressedCount, errorSamples) => `UnsubscriberAsyncList ${name}: ${suppressedCount} more unsubscribers added after the list was run threw in the last ${LATE_ARRIVAL_REPORT_WINDOW_SECONDS}s; per-occurrence errors suppressed. Distinct errors sampled (up to ${MAX_SUPPRESSED_ERROR_SAMPLES}): ${errorSamples.join(" | ")}`
  }
};
function reportLateArrival(name, outcome, error) {
  const { log, first, suppressed } = LATE_ARRIVAL_REPORTS[outcome];
  const windowKey = `${name}\0${outcome}`;
  const now = Date.now();
  const openWindow = lateArrivalReportWindows.get(windowKey);
  if (!openWindow || now >= openWindow.closesAt) {
    log(first(name, error));
    lateArrivalReportWindows.set(windowKey, {
      closesAt: now + LATE_ARRIVAL_REPORT_WINDOW_MS,
      suppressedCount: 0,
      suppressedErrorSamples: /* @__PURE__ */ new Set(),
      summaryTimeout: void 0
    });
    return;
  }
  openWindow.suppressedCount += 1;
  if (error !== void 0 && openWindow.suppressedErrorSamples.size < MAX_SUPPRESSED_ERROR_SAMPLES)
    openWindow.suppressedErrorSamples.add(`${error}`);
  if (!openWindow.summaryTimeout) {
    openWindow.summaryTimeout = setTimeout(() => {
      const { suppressedCount } = openWindow;
      const errorSamples = [...openWindow.suppressedErrorSamples];
      openWindow.suppressedCount = 0;
      openWindow.suppressedErrorSamples.clear();
      openWindow.summaryTimeout = void 0;
      if (suppressedCount > 0) log(suppressed(name, suppressedCount, errorSamples));
    }, openWindow.closesAt - now);
    if (typeof openWindow.summaryTimeout === "object" && "unref" in openWindow.summaryTimeout)
      openWindow.summaryTimeout.unref();
  }
}
class UnsubscriberAsyncList {
  constructor(name = "Anonymous") {
    __publicField(this, "unsubscribers", /* @__PURE__ */ new Set());
    /**
     * Whether {@link runAllUnsubscribers} has started. Set at the top of the run rather than at the
     * end: the run takes a snapshot of the set and then clears it, so an unsubscriber added partway
     * through would land in a list that is never drained again.
     */
    __publicField(this, "isSealed", false);
    this.name = name;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * Once {@link runAllUnsubscribers} has started, unsubscribers are run immediately rather than
   * stored. Nothing can await that run, so its outcome — success included — is only reported.
   *
   * Those reports are rate-limited: within a `LATE_ARRIVAL_REPORT_WINDOW_MS` window, lists sharing
   * this list's name report the first occurrence of each outcome verbatim and then collapse the
   * rest into one count. So the reports are a faithful signal that late arrivals are happening, but
   * not a per-occurrence record — do not count log lines to count undone subscriptions.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...unsubscribers) {
    unsubscribers.forEach((unsubscriber) => {
      const unsubscribe = "dispose" in unsubscriber ? unsubscriber.dispose.bind(unsubscriber) : unsubscriber;
      if (this.isSealed) this.unsubscribeImmediately(unsubscribe);
      else this.unsubscribers.add(unsubscribe);
    });
  }
  /**
   * Run all unsubscribers added to this list, clear the list, and seal it so anything added later
   * is unsubscribed on arrival.
   *
   * An unsubscriber that throws (synchronously or asynchronously) does not make this method reject:
   * the error is caught and logged via `console.error`, the remaining unsubscribers still run, and
   * the thrower counts as a failure in the return value. An unsubscriber that arrives during the
   * run is not part of the returned result — nothing is waiting on it by then.
   *
   * @returns `true` if all unsubscribers succeeded, `false` if any returned `false` or threw.
   */
  async runAllUnsubscribers() {
    this.isSealed = true;
    const results = await Promise.all(
      [...this.unsubscribers].map(async (unsubscriber) => {
        try {
          return await unsubscriber();
        } catch (error) {
          console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber threw! ${error}`);
          return false;
        }
      })
    );
    this.unsubscribers.clear();
    return results.every((unsubscriberSucceeded, index) => {
      if (!unsubscriberSucceeded)
        console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${index} failed!`);
      return unsubscriberSucceeded;
    });
  }
  /**
   * Run an unsubscriber that arrived after the list was sealed. `add` is synchronous and has no
   * caller to hand a result to, so the outcome is reported here rather than thrown.
   *
   * The success path is reported too: from the caller's point of view a subscription it just set up
   * has been undone, and without a line here that happens with no record anywhere.
   */
  unsubscribeImmediately(unsubscriber) {
    (async () => {
      const { name } = this;
      try {
        const unsubscriberSucceeded = await unsubscriber();
        reportLateArrival(name, unsubscriberSucceeded ? "unsubscribed" : "failed");
      } catch (error) {
        reportLateArrival(name, "threw", error);
      }
    })();
  }
}
const ABORTED = "ABORTED";
const ALREADY_EXISTS = "ALREADY_EXISTS";
const CANCELLED = "CANCELLED";
const DATA_LOSS = "DATA_LOSS";
const DEADLINE_EXCEEDED = "DEADLINE_EXCEEDED";
const FAILED_PRECONDITION = "FAILED_PRECONDITION";
const INTERNAL = "INTERNAL";
const INVALID_ARGUMENT = "INVALID_ARGUMENT";
const NOT_FOUND = "NOT_FOUND";
const OUT_OF_RANGE = "OUT_OF_RANGE";
const PERMISSION_DENIED = "PERMISSION_DENIED";
const RESOURCE_EXHAUSTED = "RESOURCE_EXHAUSTED";
const UNAUTHENTICATED = "UNAUTHENTICATED";
const UNAVAILABLE = "UNAVAILABLE";
const UNIMPLEMENTED = "UNIMPLEMENTED";
const UNKNOWN = "UNKNOWN";
const PLATFORM_ERROR_VERSION = 1;
function newPlatformError(error, code) {
  if (!error)
    return {
      message: "",
      ...code && { code },
      platformErrorVersion: PLATFORM_ERROR_VERSION
    };
  if (scriptureUtil.isString(error))
    return {
      message: error,
      ...code && { code },
      platformErrorVersion: PLATFORM_ERROR_VERSION
    };
  if (typeof error === "object" && "message" in error && typeof error.message === "string") {
    const platformError = {
      message: error.message,
      platformErrorVersion: PLATFORM_ERROR_VERSION
    };
    Object.defineProperties(platformError, Object.getOwnPropertyDescriptors(error));
    Object.defineProperty(platformError, "message", { enumerable: true });
    if ("stack" in error && scriptureUtil.isString(error.stack)) {
      Object.defineProperty(platformError, "stack", { value: error.stack, enumerable: true });
    }
    if ("cause" in platformError)
      Object.defineProperty(platformError, "cause", { enumerable: true });
    if (code) platformError.code = code;
    return platformError;
  }
  return {
    cause: error,
    message: "",
    ...code && { code },
    platformErrorVersion: PLATFORM_ERROR_VERSION
  };
}
function isPlatformError(error) {
  return !!error && typeof error === "object" && "platformErrorVersion" in error;
}
const aggregateUnsubscribers = (unsubscribers) => {
  return (...args) => {
    const unsubs = unsubscribers.map((unsubscriber) => unsubscriber(...args));
    return unsubs.every((success) => success);
  };
};
const aggregateUnsubscriberAsyncs = (unsubscribers) => {
  return async (...args) => {
    const unsubPromises = unsubscribers.map(async (unsubscriber) => unsubscriber(...args));
    return (await Promise.all(unsubPromises)).every((success) => success);
  };
};
const BOOK_TYPE = "book";
const CHAPTER_TYPE = "chapter";
const VERSE_TYPE = "verse";
const NO_BOOK_ID = "***";
const SEARCH_WHITESPACE_GROUP_PREFIX = "ws";
var MarkerCategoryType = /* @__PURE__ */ ((MarkerCategoryType2) => {
  MarkerCategoryType2["FileIdentification"] = "FileIdentification";
  MarkerCategoryType2["Headers"] = "Headers";
  MarkerCategoryType2["Remarks"] = "Remarks";
  MarkerCategoryType2["Introduction"] = "Introduction";
  MarkerCategoryType2["DivisionMarks"] = "DivisionMarks";
  MarkerCategoryType2["Paragraphs"] = "Paragraphs";
  MarkerCategoryType2["Poetry"] = "Poetry";
  MarkerCategoryType2["TitlesHeadings"] = "TitlesHeadings";
  MarkerCategoryType2["Tables"] = "Tables";
  MarkerCategoryType2["CenterTables"] = "CenterTables";
  MarkerCategoryType2["RightTables"] = "RightTables";
  MarkerCategoryType2["Lists"] = "Lists";
  MarkerCategoryType2["Footnotes"] = "Footnotes";
  MarkerCategoryType2["CrossReferences"] = "CrossReferences";
  MarkerCategoryType2["SpecialText"] = "SpecialText";
  MarkerCategoryType2["CharacterStyling"] = "CharacterStyling";
  MarkerCategoryType2["Breaks"] = "Breaks";
  MarkerCategoryType2["SpecialFeatures"] = "SpecialFeatures";
  MarkerCategoryType2["PeripheralReferences"] = "PeripheralReferences";
  MarkerCategoryType2["PeripheralMaterials"] = "PeripheralMaterials";
  MarkerCategoryType2["Uncategorized"] = "Uncategorized";
  return MarkerCategoryType2;
})(MarkerCategoryType || {});
var MarkerType = /* @__PURE__ */ ((MarkerType2) => {
  MarkerType2["Paragraph"] = "Paragraph";
  MarkerType2["Character"] = "Character";
  MarkerType2["Note"] = "Note";
  MarkerType2["Unknown"] = "Unknown";
  return MarkerType2;
})(MarkerType || {});
const usfmMarkers = {
  id: {
    category: MarkerCategoryType.FileIdentification,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_id_description%",
    hasEndMarker: false,
    children: {
      FileIdentification: ["usfm", "ide"],
      Headers: ["h", "h1", "h2", "h3", "toc1", "toc2", "toc3"],
      Remarks: ["rem", "sts", "restore"],
      Introduction: [
        "imt",
        "imt1",
        "imt2",
        "imt3",
        "imt4",
        "imte",
        "imte1",
        "imte2",
        "is",
        "is1",
        "is2",
        "iot",
        "io",
        "io1",
        "io2",
        "io3",
        "io4",
        "ior",
        "ip",
        "im",
        "ipi",
        "imi",
        "ili",
        "ili1",
        "ili2",
        "ipq",
        "imq",
        "ipr",
        "ib",
        "iq",
        "iq1",
        "iq2",
        "iq3",
        "iex",
        "ie"
      ],
      DivisionMarks: ["c", "cl"],
      TitlesHeadings: ["mt", "mt1", "mt2", "mt3", "mt4"]
    }
  },
  usfm: {
    category: MarkerCategoryType.FileIdentification,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_usfm_description%",
    hasEndMarker: false,
    children: void 0
  },
  ide: {
    category: MarkerCategoryType.FileIdentification,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ide_description%",
    hasEndMarker: false,
    children: {
      Remarks: ["rem", "sts"]
    }
  },
  h: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_h_description%",
    hasEndMarker: false,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h1: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_h1_description%",
    hasEndMarker: false,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h2: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_h2_description%",
    hasEndMarker: false,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h3: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_h3_description%",
    hasEndMarker: false,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  toc1: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_toc1_description%",
    hasEndMarker: false,
    children: void 0
  },
  toc2: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_toc2_description%",
    hasEndMarker: false,
    children: void 0
  },
  toc3: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_toc3_description%",
    hasEndMarker: false,
    children: void 0
  },
  toca1: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_toca1_description%",
    hasEndMarker: false,
    children: void 0
  },
  toca2: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_toca2_description%",
    hasEndMarker: false,
    children: void 0
  },
  toca3: {
    category: MarkerCategoryType.Headers,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_toca3_description%",
    hasEndMarker: false,
    children: void 0
  },
  rem: {
    category: MarkerCategoryType.Remarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_rem_description%",
    hasEndMarker: false,
    children: void 0
  },
  sts: {
    category: MarkerCategoryType.Remarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sts_description%",
    hasEndMarker: false,
    children: void 0
  },
  restore: {
    category: MarkerCategoryType.Remarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_restore_description%",
    hasEndMarker: false,
    children: void 0
  },
  imt: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imt_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt1: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imt1_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt2: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imt2_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt3: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imt3_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt4: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imt4_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imte_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte1: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imte1_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte2: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imte2_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_is_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"],
      CharacterStyling: ["no"]
    }
  },
  is1: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_is1_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is2: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_is2_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  iot: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_iot_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  io: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_io_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io1: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_io1_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io2: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_io2_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io3: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_io3_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io4: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_io4_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ior: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Character,
    description: "%markerMenu_marker_ior_description%",
    hasEndMarker: true,
    children: void 0
  },
  ip: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ip_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  im: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_im_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipi: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ipi_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  imi: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imi_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ili_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili1: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ili1_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili2: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ili2_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipq: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ipq_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  imq: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_imq_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipr: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ipr_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ib: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ib_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"]
    }
  },
  iq: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_iq_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq1: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_iq1_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq2: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_iq2_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq3: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_iq3_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iex: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_iex_description%",
    hasEndMarker: false,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  iqt: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Character,
    description: "%markerMenu_marker_iqt_description%",
    hasEndMarker: true,
    children: void 0
  },
  ie: {
    category: MarkerCategoryType.Introduction,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ie_description%",
    hasEndMarker: false,
    children: void 0
  },
  c: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_c_description%",
    hasEndMarker: false,
    children: void 0
  },
  ca: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Character,
    description: "%markerMenu_marker_ca_description%",
    hasEndMarker: true,
    children: void 0
  },
  cp: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_cp_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f"]
    }
  },
  cl: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_cl_description%",
    hasEndMarker: false,
    children: void 0
  },
  cd: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_cd_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["vp"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  v: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Character,
    description: "%markerMenu_marker_v_description%",
    hasEndMarker: false,
    children: void 0
  },
  va: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Character,
    description: "%markerMenu_marker_va_description%",
    hasEndMarker: true,
    children: void 0
  },
  vp: {
    category: MarkerCategoryType.DivisionMarks,
    type: MarkerType.Character,
    description: "%markerMenu_marker_vp_description%",
    hasEndMarker: true,
    children: void 0
  },
  p: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_p_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p", "pmo", "pm", "pmc", "pmr"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  m: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_m_description%",
    hasEndMarker: false,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  po: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_po_description%",
    hasEndMarker: false,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pr: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pr_description%",
    hasEndMarker: false,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  cls: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_cls_description%",
    hasEndMarker: false,
    children: {
      SpecialText: ["tl", "sig", "pn", "png", "addpn", "add"]
    }
  },
  pmo: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pmo_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pm: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pm_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pmc: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pmc_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pmr: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pmr_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pi_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi1: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pi1_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi2: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pi2_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi3: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pi3_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pc: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pc_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  mi: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mi_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  nb: {
    category: MarkerCategoryType.Paragraphs,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_nb_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_q_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3", "q", "q1", "q2", "q3", "q4", "b"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q1: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_q1_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3", "q", "q1", "q2", "q3", "q4", "b"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q2: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_q2_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q3: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_q3_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q4: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_q4_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b", "qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qc: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qc_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qr: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qr_description%",
    hasEndMarker: false,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qs: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Character,
    description: "%markerMenu_marker_qs_description%",
    hasEndMarker: true,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  qa: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qa_description%",
    hasEndMarker: false,
    children: void 0
  },
  qac: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Character,
    description: "%markerMenu_marker_qac_description%",
    hasEndMarker: true,
    children: void 0
  },
  qm: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qm_description%",
    hasEndMarker: false,
    children: {
      Paragraphs: ["p"],
      TitlesHeadings: [
        "mte1",
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm1: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qm1_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm2: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qm2_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm3: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qm3_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qd: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_qd_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  b: {
    category: MarkerCategoryType.Poetry,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_b_description%",
    hasEndMarker: false,
    children: {
      DivisionMarks: ["v", "c"],
      Paragraphs: ["p"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "b"],
      TitlesHeadings: [
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ]
    }
  },
  mt: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mt_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt1: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mt1_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt2: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mt2_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt3: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mt3_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt4: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mt4_description%",
    hasEndMarker: false,
    children: void 0
  },
  mte: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mte_description%",
    hasEndMarker: false,
    children: void 0
  },
  mte1: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mte1_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mte2"]
    }
  },
  mte2: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mte2_description%",
    hasEndMarker: false,
    children: void 0
  },
  ms: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ms_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms1: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ms1_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms2: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ms2_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms3: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_ms3_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe"]
    }
  },
  mr: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_mr_description%",
    hasEndMarker: false,
    children: void 0
  },
  s: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_s_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s1: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_s1_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s2: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_s2_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s3: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_s3_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s4: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_s4_description%",
    hasEndMarker: false,
    children: {
      TitlesHeadings: ["sr", "r"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  sr: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sr_description%",
    hasEndMarker: false,
    children: void 0
  },
  r: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_r_description%",
    hasEndMarker: false,
    children: void 0
  },
  sp: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sp_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  d: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_d_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  sd: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sd_description%",
    hasEndMarker: false,
    children: void 0
  },
  sd1: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sd1_description%",
    hasEndMarker: false,
    children: void 0
  },
  sd2: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sd2_description%",
    hasEndMarker: false,
    children: void 0
  },
  sd3: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sd3_description%",
    hasEndMarker: false,
    children: void 0
  },
  sd4: {
    category: MarkerCategoryType.TitlesHeadings,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_sd4_description%",
    hasEndMarker: false,
    children: void 0
  },
  lh: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lh_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_li_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li1: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_li1_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li2: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_li2_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li3: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_li3_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li4: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_li4_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lf: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lf_description%",
    hasEndMarker: false,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lim_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim1: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lim1_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim2: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lim2_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim3: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lim3_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim4: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lim4_description%",
    hasEndMarker: false,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  litl: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_litl_description%",
    hasEndMarker: true,
    children: void 0
  },
  lik: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_lik_description%",
    hasEndMarker: true,
    children: void 0
  },
  liv: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_liv_description%",
    hasEndMarker: true,
    children: void 0
  },
  liv1: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_liv1_description%",
    hasEndMarker: true,
    children: void 0
  },
  liv2: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_liv2_description%",
    hasEndMarker: true,
    children: void 0
  },
  liv3: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_liv3_description%",
    hasEndMarker: true,
    children: void 0
  },
  liv4: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_liv4_description%",
    hasEndMarker: true,
    children: void 0
  },
  liv5: {
    category: MarkerCategoryType.Lists,
    type: MarkerType.Character,
    description: "%markerMenu_marker_liv5_description%",
    hasEndMarker: true,
    children: void 0
  },
  f: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Note,
    description: "%markerMenu_marker_f_description%",
    hasEndMarker: true,
    children: {
      Footnotes: ["fr", "ft", "fk", "fq", "fqa", "fl", "fw", "fp", "fv", "fdc"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  fe: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Note,
    description: "%markerMenu_marker_fe_description%",
    hasEndMarker: true,
    children: {
      Footnotes: ["fr", "ft", "fk", "fq", "fqa", "fl", "fw", "fp", "fv", "fdc"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  fr: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fr_description%",
    hasEndMarker: true,
    children: void 0
  },
  ft: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_ft_description%",
    hasEndMarker: true,
    children: void 0
  },
  fk: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fk_description%",
    hasEndMarker: true,
    children: void 0
  },
  fq: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fq_description%",
    hasEndMarker: true,
    children: void 0
  },
  fqa: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fqa_description%",
    hasEndMarker: true,
    children: void 0
  },
  fl: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fl_description%",
    hasEndMarker: true,
    children: void 0
  },
  fw: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fw_description%",
    hasEndMarker: true,
    children: void 0
  },
  fp: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fp_description%",
    hasEndMarker: true,
    children: void 0
  },
  fv: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fv_description%",
    hasEndMarker: true,
    children: void 0
  },
  fdc: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fdc_description%",
    hasEndMarker: true,
    children: void 0
  },
  fm: {
    category: MarkerCategoryType.Footnotes,
    type: MarkerType.Character,
    description: "%markerMenu_marker_fm_description%",
    hasEndMarker: true,
    children: void 0
  },
  x: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Note,
    description: "%markerMenu_marker_x_description%",
    hasEndMarker: true,
    children: {
      CrossReferences: ["xo", "xop", "xt", "xta", "xk", "xq", "xot", "xnt", "xdc"],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  xo: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xo_description%",
    hasEndMarker: true,
    children: void 0
  },
  xop: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xop_description%",
    hasEndMarker: true,
    children: void 0
  },
  xt: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xt_description%",
    hasEndMarker: true,
    children: void 0
  },
  xta: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xta_description%",
    hasEndMarker: true,
    children: void 0
  },
  xk: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xk_description%",
    hasEndMarker: true,
    children: void 0
  },
  xq: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xq_description%",
    hasEndMarker: true,
    children: void 0
  },
  xot: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xot_description%",
    hasEndMarker: true,
    children: void 0
  },
  xnt: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xnt_description%",
    hasEndMarker: true,
    children: void 0
  },
  xdc: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_xdc_description%",
    hasEndMarker: true,
    children: void 0
  },
  rq: {
    category: MarkerCategoryType.CrossReferences,
    type: MarkerType.Character,
    description: "%markerMenu_marker_rq_description%",
    hasEndMarker: true,
    children: void 0
  },
  qt: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_qt_description%",
    hasEndMarker: true,
    children: void 0
  },
  nd: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_nd_description%",
    hasEndMarker: true,
    children: void 0
  },
  tl: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_tl_description%",
    hasEndMarker: true,
    children: void 0
  },
  dc: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_dc_description%",
    hasEndMarker: true,
    children: void 0
  },
  bk: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_bk_description%",
    hasEndMarker: true,
    children: void 0
  },
  sig: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_sig_description%",
    hasEndMarker: true,
    children: void 0
  },
  pn: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_pn_description%",
    hasEndMarker: true,
    children: void 0
  },
  png: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_png_description%",
    hasEndMarker: true,
    children: void 0
  },
  addpn: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_addpn_description%",
    hasEndMarker: true,
    children: void 0
  },
  wj: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_wj_description%",
    hasEndMarker: true,
    children: void 0
  },
  k: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_k_description%",
    hasEndMarker: true,
    children: void 0
  },
  sls: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_sls_description%",
    hasEndMarker: true,
    children: void 0
  },
  ord: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_ord_description%",
    hasEndMarker: true,
    children: void 0
  },
  add: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Character,
    description: "%markerMenu_marker_add_description%",
    hasEndMarker: true,
    children: void 0
  },
  lit: {
    category: MarkerCategoryType.SpecialText,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_lit_description%",
    hasEndMarker: false,
    children: void 0
  },
  no: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_no_description%",
    hasEndMarker: true,
    children: void 0
  },
  it: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_it_description%",
    hasEndMarker: true,
    children: void 0
  },
  bd: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_bd_description%",
    hasEndMarker: true,
    children: void 0
  },
  bdit: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_bdit_description%",
    hasEndMarker: true,
    children: void 0
  },
  em: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_em_description%",
    hasEndMarker: true,
    children: void 0
  },
  sc: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_sc_description%",
    hasEndMarker: true,
    children: void 0
  },
  sup: {
    category: MarkerCategoryType.CharacterStyling,
    type: MarkerType.Character,
    description: "%markerMenu_marker_sup_description%",
    hasEndMarker: true,
    children: void 0
  },
  pb: {
    category: MarkerCategoryType.Breaks,
    type: MarkerType.Paragraph,
    description: "%markerMenu_marker_pb_description%",
    hasEndMarker: false,
    children: void 0
  }
};
function isBlockMarker(marker) {
  var _a;
  return ((_a = usfmMarkers[marker]) == null ? void 0 : _a.type) === MarkerType.Paragraph || marker === "v";
}
function isCharacterMarker(marker) {
  const markerDetails = usfmMarkers[marker];
  if ((markerDetails == null ? void 0 : markerDetails.type) !== MarkerType.Character) return false;
  return markerDetails.category !== MarkerCategoryType.DivisionMarks;
}
function isParagraphMarker(marker) {
  var _a;
  return ((_a = usfmMarkers[marker]) == null ? void 0 : _a.type) === MarkerType.Paragraph;
}
const MIN_ZOOM_FACTOR = 0.5;
const MAX_ZOOM_FACTOR = 3;
const ZOOM_STEP = 0.1;
const CONTENT_ZOOM_IN_SHORTCUT = {
  macOS: "⌘=",
  windows: "Ctrl++",
  linux: "Ctrl++"
};
const CONTENT_ZOOM_OUT_SHORTCUT = {
  macOS: "⌘-",
  windows: "Ctrl+-",
  linux: "Ctrl+-"
};
const CONTENT_ZOOM_RESET_SHORTCUT = {
  macOS: "⌘0",
  windows: "Ctrl+0",
  linux: "Ctrl+0"
};
function clampZoom(factor) {
  if (factor < MIN_ZOOM_FACTOR) return MIN_ZOOM_FACTOR;
  if (factor > MAX_ZOOM_FACTOR) return MAX_ZOOM_FACTOR;
  return factor;
}
function roundZoom(factor) {
  return Math.round(factor * 10) / 10;
}
const GRID_TOLERANCE = 1e-9;
function adjustZoomFactor(factor, deltaSteps) {
  let gridFactor = factor;
  if (deltaSteps > 0) gridFactor = Math.floor(factor * 10 + GRID_TOLERANCE) / 10;
  else if (deltaSteps < 0) gridFactor = Math.ceil(factor * 10 - GRID_TOLERANCE) / 10;
  return roundZoom(clampZoom(gridFactor + deltaSteps * ZOOM_STEP));
}
function sanitizeHtml(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "strong",
      "em",
      "u",
      "s",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre"
    ],
    ALLOWED_ATTR: ["style", "href", "target", "rel", "class", "dir"],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i
  });
}
function getDefaultCallerSequence() {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode("a".charCodeAt(0) + i));
}
function getNthCaller(n, callers) {
  const callerList = callers && callers.length > 0 ? callers : getDefaultCallerSequence();
  return callerList[n % callerList.length];
}
function getFormatCallerFunction(footnotes, callers) {
  const callerList = callers && callers.length > 0 ? callers : getDefaultCallerSequence();
  const plusSequenceMap = (() => {
    const map = /* @__PURE__ */ new Map();
    let autoCallerCounter = 0;
    footnotes.forEach((fn, idx) => {
      if (fn.caller === "+") {
        map.set(idx, getNthCaller(autoCallerCounter, callerList));
        autoCallerCounter += 1;
      }
    });
    return map;
  })();
  return (caller, index) => {
    if (caller === "+") {
      const formattedCaller = plusSequenceMap.get(index);
      if (!formattedCaller) {
        console.warn(`Caller index ${index} out of range for '+' callers`);
        return "?";
      }
      return formattedCaller;
    }
    if (caller === "-") return void 0;
    return caller;
  };
}
function extractFootnotesFromUsjContent(contents) {
  const footnotes = [];
  if (!contents || contents.length === 0) return footnotes;
  function traverse(item) {
    if (typeof item === "string") return;
    if (item.type === "note") {
      footnotes.push(item);
    } else if (Array.isArray(item.content) && item.content.length > 0) {
      item.content.forEach(traverse);
    }
  }
  contents.forEach(traverse);
  return footnotes;
}
function truncateToCopyLimit(text, copyLimit) {
  if (copyLimit === void 0 || text.length <= copyLimit) return text;
  const segments = grapheme.graphemeSegments(text);
  let next = segments.next();
  while (!next.done) {
    const { index, segment } = next.value;
    if (index + segment.length > copyLimit) return text.slice(0, index);
    next = segments.next();
  }
  return text;
}
function getPaneSizeLimits(availablePx, options = {}) {
  const {
    splitterThicknessPx = 4,
    secondaryPaneMinSizePx = 20,
    mainPaneMinSizePx = 60,
    absoluteMinPercent = 3,
    absoluteMaxPercent = 90
  } = options;
  const usableHeightPx = availablePx - splitterThicknessPx;
  let minPercent;
  let maxPercent;
  if (usableHeightPx < secondaryPaneMinSizePx + mainPaneMinSizePx) {
    minPercent = absoluteMinPercent;
    maxPercent = absoluteMaxPercent;
  } else {
    maxPercent = Math.min(
      Math.floor((usableHeightPx - mainPaneMinSizePx) / usableHeightPx * 100),
      absoluteMaxPercent
    );
    minPercent = Math.min(
      Math.max(Math.ceil(secondaryPaneMinSizePx / usableHeightPx * 100), absoluteMinPercent),
      maxPercent
    );
  }
  return { minPercent, maxPercent };
}
function deepEqual(a, b) {
  return fastEquals.deepEqual(a, b);
}
function isSubset(objectWithAllProperties, objectWithPartialProperties) {
  if (typeof objectWithAllProperties !== typeof objectWithPartialProperties) return false;
  if (!objectWithAllProperties && !objectWithPartialProperties) return true;
  if (Array.isArray(objectWithAllProperties)) {
    const partialArray = objectWithPartialProperties;
    const allArray = objectWithAllProperties;
    if (partialArray.length === 0) return true;
    return partialArray.every((item) => allArray.includes(item));
  }
  if (typeof objectWithAllProperties !== "object")
    return deepEqual(objectWithAllProperties, objectWithPartialProperties);
  const partialObj = objectWithPartialProperties;
  const allObj = objectWithAllProperties;
  let retVal = true;
  Object.keys(partialObj).forEach((key) => {
    if (!retVal) return;
    if (!Object.hasOwn(allObj, key)) retVal = false;
    else if (!isSubset(allObj[key], partialObj[key])) retVal = false;
  });
  return retVal;
}
function serialize(value, replacer, space) {
  const undefinedReplacer = (replacerKey, replacerValue) => {
    let newValue = replacerValue;
    if (replacer) newValue = replacer(replacerKey, newValue);
    if (newValue === void 0) newValue = null;
    return newValue;
  };
  return JSON.stringify(value, undefinedReplacer, space);
}
function deserialize(value, reviver) {
  function replaceNull(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) obj[key] = void 0;
      else if (typeof obj[key] === "object")
        obj[key] = replaceNull(obj[key]);
    });
    return obj;
  }
  const parsedObject = JSON.parse(value, reviver);
  if (parsedObject === null) return void 0;
  if (typeof parsedObject === "object") return replaceNull(parsedObject);
  return parsedObject;
}
function isSerializable(value) {
  try {
    const serializedValue = serialize(value);
    return serializedValue === serialize(deserialize(serializedValue));
  } catch {
    return false;
  }
}
const htmlEncode = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function getCurrentLocale() {
  if (typeof navigator !== "undefined" && navigator.languages) {
    const rawLocale = navigator.languages[0];
    return rawLocale.replace(/@posix$/i, "");
  }
  return new DateTimeFormat().resolvedOptions().locale;
}
function formatBytes(fileSize, decimals = 2) {
  if (fileSize === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const sizeToUse = sizes[i];
  const formattingFileSize = new NumberFormat("en", {
    style: "decimal",
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0
  }).format(fileSize / 1024 ** i);
  return `${formattingFileSize} ${sizeToUse}`;
}
function normalizeProjectId(projectId) {
  return projectId.toUpperCase();
}
function hasDistinctFullName(names) {
  return !!normalizeFullName(names.fullName) && names.fullName !== names.shortName;
}
const PROJECT_NAME_SEPARATOR = " - ";
function formatProjectName(names) {
  return hasDistinctFullName(names) ? `${names.shortName}${PROJECT_NAME_SEPARATOR}${names.fullName}` : names.shortName;
}
function compareProjectShortNames(a, b) {
  return a.localeCompare(b, void 0, { sensitivity: "base" });
}
function compareProjectsByName(a, b) {
  return compareProjectShortNames(a.shortName, b.shortName);
}
function normalizeFullName(fullName) {
  return typeof fullName === "string" && fullName.trim().length > 0 ? fullName : void 0;
}
function getProjectDisplayName(projectId, projectName) {
  return normalizeFullName(projectName) ?? projectId;
}
function formatProjectTitle(titleFormat, projectId, projectName, replacements) {
  return scriptureUtil.formatReplacementString(titleFormat, {
    ...replacements,
    projectName: getProjectDisplayName(projectId, projectName)
  });
}
function createCachedInitializer(initializer) {
  let cachedPromise;
  return () => {
    cachedPromise ?? (cachedPromise = (async () => initializer())().catch((error) => {
      cachedPromise = void 0;
      throw error;
    }));
    return cachedPromise;
  };
}
const MILLISECONDS_PER_SECOND = 1e3;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
function formatTimeSpan(relativeTimeFormatter, since, to = /* @__PURE__ */ new Date()) {
  const spanSeconds = Math.floor((since.getTime() - to.getTime()) / MILLISECONDS_PER_SECOND);
  const totalDays = Math.round(spanSeconds / SECONDS_PER_DAY);
  if (Math.abs(totalDays) >= 1) return relativeTimeFormatter.format(totalDays, "day");
  const totalHours = Math.round(spanSeconds / SECONDS_PER_HOUR);
  if (Math.abs(totalHours) >= 1) return relativeTimeFormatter.format(totalHours, "hour");
  const totalMinutes = Math.round(spanSeconds / SECONDS_PER_MINUTE);
  if (Math.abs(totalMinutes) >= 1) return relativeTimeFormatter.format(totalMinutes, "minute");
  return relativeTimeFormatter.format(spanSeconds, "second");
}
function formatRelativeDate(date, todayString, yesterdayString, locale, options = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const today = /* @__PURE__ */ new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
  if (isToday) {
    return todayString;
  }
  if (isYesterday) {
    return yesterdayString;
  }
  return date.toLocaleString(locale, options);
}
const MODIFIER_KEYS = /* @__PURE__ */ new Set([
  "Alt",
  "AltGraph",
  "CapsLock",
  "Control",
  "Fn",
  "FnLock",
  "Hyper",
  "Meta",
  "NumLock",
  "ScrollLock",
  "Shift",
  "Super",
  "Symbol",
  "SymbolLock"
]);
function getLocalizeKeyForPhysicalKey(key) {
  return `%physicalKey_${key.charAt(0).toLowerCase()}${key.slice(1)}%`;
}
const PROJECT_OPEN_BLOCKED_REGEX = /\(PROJECT_OPEN_BLOCKED\)/;
const PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX = /(%[^%\s]+%)\s*\(PROJECT_OPEN_BLOCKED\)/;
const PROJECT_OPEN_BLOCKED_FALLBACK_KEY = "%project_unsupported_generic%";
const PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE = "This project can't be opened.";
function toProjectOpenBlockedReasonKey(unsupportedReason) {
  return scriptureUtil.isLocalizeKey(unsupportedReason) ? unsupportedReason : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}
function getProjectOpenBlockedReasonKey(error) {
  var _a;
  if (error === void 0) return void 0;
  const message = scriptureUtil.getErrorMessage(error);
  if (!PROJECT_OPEN_BLOCKED_REGEX.test(message)) return void 0;
  const reasonKey = (_a = PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX.exec(message)) == null ? void 0 : _a[1];
  return reasonKey ? toProjectOpenBlockedReasonKey(reasonKey) : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}
async function notifyProjectOpenBlocked(reasonKey, { getLocalizedStrings, sendNotification, logWarning }) {
  let message = PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
  try {
    const localizedReason = (await getLocalizedStrings([reasonKey]))[reasonKey];
    if (localizedReason && localizedReason !== reasonKey) message = reasonKey;
  } catch (e) {
    logWarning(
      `Could not localize ${reasonKey}; sending the generic reason: ${scriptureUtil.getErrorMessage(e)}`
    );
  }
  try {
    await sendNotification({ message, severity: "warning" });
  } catch (e) {
    logWarning(`Failed to send the project-open-blocked notification: ${scriptureUtil.getErrorMessage(e)}`);
  }
}
function computeEffectiveStructureProtection({
  interfaceMode,
  isAdminProtected,
  canAdminToggle,
  userSetting
}) {
  const isProtectionActive = interfaceMode === "simple";
  if (!isProtectionActive) return false;
  const effectiveUserSetting = userSetting ?? isProtectionActive;
  return isAdminProtected && !canAdminToggle || effectiveUserSetting;
}
const settingsDefs = {
  projectSettingsContribution: {
    description: "The data an extension provides to inform Platform.Bible of the project settings it provides",
    anyOf: [
      {
        $ref: "#/$defs/projectSettingsGroup"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/projectSettingsGroup"
        }
      }
    ]
  },
  projectSettingsGroup: {
    description: "Group of related settings definitions",
    type: "object",
    properties: {
      label: {
        description: "localizeKey that displays in the project settings dialog as the group name",
        $ref: "#/$defs/localizeKey"
      },
      description: {
        description: "localizeKey that displays in the project settings dialog to describe the group",
        $ref: "#/$defs/localizeKey"
      },
      properties: {
        $ref: "#/$defs/projectSettingProperties"
      }
    },
    required: ["label", "properties"]
  },
  projectSettingProperties: {
    description: "Object whose keys are setting IDs and whose values are settings objects",
    type: "object",
    patternProperties: {
      "^[\\w\\-]+\\.[\\w\\-]+$": {
        $ref: "#/$defs/projectSetting"
      }
    },
    additionalProperties: false
  },
  projectSetting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledProjectSetting"
      }
    ]
  },
  extensionControlledProjectSetting: {
    description: "Setting definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/projectSettingBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  projectSettingBase: {
    description: "Base information needed to describe a project setting entry",
    allOf: [
      {
        $ref: "#/$defs/settingBase"
      },
      {
        $ref: "#/$defs/modifierProject"
      }
    ]
  },
  modifierProject: {
    description: "Modifies setting type to be project setting",
    type: "object",
    properties: {
      includeProjectInterfaces: {
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should be included.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to pass):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to all `ProjectInterfaces`, so all projects that do not match `excludeProjectInterfaces` will be included\n\n@example\n\n```typescript\nincludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed on projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: {
              anyOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: { type: "string" }
                }
              ]
            }
          }
        ]
      },
      excludeProjectInterfaces: {
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to exclude the project):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition and exclude the project\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition and exclude the project\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to no `ProjectInterfaces`, so all projects that match `includeProjectInterfaces` will be included\n\n@example\n\n```typescript\nexcludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed and exclude projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: {
              anyOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: { type: "string" }
                }
              ]
            }
          }
        ]
      },
      includePdpFactoryIds: {
        description: "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should be included.\n\nDefaults to all Project Data Provider Factory Ids, so all projects that do not match `excludePdpFactoryIds` will be included",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: { type: "string" }
          }
        ]
      },
      excludePdpFactoryIds: {
        description: "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nDefaults to none, so all projects that match `includePdpFactoryIds` will be included",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: { type: "string" }
          }
        ]
      }
    }
  },
  settingsContribution: {
    description: "The data an extension provides to inform Platform.Bible of the settings it provides",
    anyOf: [
      {
        $ref: "#/$defs/settingsGroup"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/settingsGroup"
        }
      }
    ]
  },
  settingsGroup: {
    description: "Group of related settings definitions",
    type: "object",
    properties: {
      label: {
        description: "localizeKey that displays in the settings dialog as the group name",
        $ref: "#/$defs/localizeKey"
      },
      description: {
        description: "localizeKey that displays in the settings dialog to describe the group",
        $ref: "#/$defs/localizeKey"
      },
      properties: {
        $ref: "#/$defs/settingProperties"
      }
    },
    required: ["label", "properties"]
  },
  settingProperties: {
    description: "Object whose keys are setting IDs and whose values are settings objects",
    type: "object",
    patternProperties: {
      "^[\\w-]+\\.[\\w-]+$": {
        $ref: "#/$defs/setting"
      }
    },
    additionalProperties: false
  },
  setting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledSetting"
      }
    ]
  },
  extensionControlledSetting: {
    description: "Setting definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/settingBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  settingBase: {
    description: "Base information needed to describe a setting entry",
    allOf: [
      {
        $ref: "#/$defs/stateBase"
      },
      {
        type: "object",
        properties: {
          label: {
            description: "localizeKey that displays in the settings dialog as the setting name",
            $ref: "#/$defs/localizeKey"
          },
          description: {
            description: "localizeKey that displays in the settings dialog to describe the setting",
            $ref: "#/$defs/localizeKey"
          },
          isHidden: {
            description: `Boolean that controls whether a setting should be hidden or not. If hidden
            , the setting will not show up in the settings dialog in \`paranext-core\`, and thus
            will not be configurable by the user unless an extension provides a way to interact with
            the setting. If every setting in a group is hidden, the group does not show up either.`,
            type: "boolean"
          },
          isReadOnly: {
            description: `Boolean that controls whether a setting is read-only in the settings
            dialog. If read-only, the setting still shows up in the settings dialog in
            \`paranext-core\`, but the user cannot change it there. A read-only text field can still
            be selected and copied; controls with no read-only state, such as switches, are
            disabled. Extensions can still change the setting's value.`,
            type: "boolean"
          }
        },
        required: ["label"]
      }
    ]
  },
  projectStateContribution: {
    description: "The data an extension provides to inform Platform.Bible of the project state it provides",
    $ref: "#/$defs/userStateProperties"
  },
  userStateContribution: {
    description: "The data an extension provides to inform Platform.Bible of the user state it provides",
    $ref: "#/$defs/userStateProperties"
  },
  userStateProperties: {
    description: "Object whose keys are state IDs and whose values are state objects",
    type: "object",
    patternProperties: {
      "^[\\w\\-]+\\.[\\w\\-]+$": {
        $ref: "#/$defs/userState"
      }
    },
    additionalProperties: false
  },
  userState: {
    description: "A description of an extension's user state entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledState"
      }
    ]
  },
  extensionControlledState: {
    description: "State definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/stateBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  modifierExtensionControlled: {
    description: 'Modifies state/setting type to be extension-controlled. "Extension-controlled" means the extension provides the component and the validator for the state/setting, so the state/setting is controlled by the extension.',
    not: {
      anyOf: [
        {
          type: "object",
          required: ["platformType"]
        },
        {
          type: "object",
          required: ["type"]
        }
      ]
    }
  },
  stateBase: {
    description: "Base information needed to describe a state entry",
    type: "object",
    properties: {
      default: {
        description: "default value for the state/setting",
        type: "any"
      },
      derivesFrom: {
        description: "a state/setting ID whose value to set to this state/setting's starting value the first time this state/setting is loaded",
        $ref: "#/$defs/id"
      }
    },
    required: ["default"]
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  },
  id: {
    description: "",
    type: "string",
    pattern: "^[\\w\\-]+\\.[\\w\\-]+$",
    tsType: "Id"
  }
};
function removeJsonToTypeScriptTypesStuff(defs) {
  if (!defs) return;
  Object.values(defs).forEach((def) => {
    if (!def.type) return;
    if ("tsType" in def) delete def.tsType;
    if (def.type === "any") {
      delete def.type;
      return;
    }
    if (def.type === "object") {
      removeJsonToTypeScriptTypesStuff(def.properties);
    }
  });
}
removeJsonToTypeScriptTypesStuff(settingsDefs);
const projectSettingsDocumentSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Project Settings Contribution",
  description: "The data an extension provides to inform Platform.Bible of the project settings it provides",
  anyOf: [
    {
      $ref: "#/$defs/projectSettingsGroup"
    },
    {
      type: "array",
      items: {
        $ref: "#/$defs/projectSettingsGroup"
      }
    }
  ],
  $defs: settingsDefs
};
Object.freeze(projectSettingsDocumentSchema);
const settingsDocumentSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Settings Contribution",
  description: "The data an extension provides to inform Platform.Bible of the settings it provides",
  anyOf: [
    {
      $ref: "#/$defs/settingsGroup"
    },
    {
      type: "array",
      items: {
        $ref: "#/$defs/settingsGroup"
      }
    }
  ],
  $defs: settingsDefs
};
Object.freeze(settingsDocumentSchema);
const localizedStringsDefs = {
  languageStrings: {
    description: "Map whose keys are localized string keys and whose values provide information about how to localize strings for the localized string key",
    type: "object",
    patternProperties: {
      "^%[\\w\\-\\.]+%$": {
        $ref: "#/$defs/localizedStringValue"
      }
    },
    additionalProperties: false
  },
  localizedStringValue: {
    description: "Localized string value associated with this key",
    type: "string"
  },
  stringsMetadata: {
    description: "Map whose keys are localized string keys and whose values provide additional non-locale-specific information about the localized string key",
    type: "object",
    patternProperties: {
      "^%[\\w\\-\\.]+%$": {
        $ref: "#/$defs/stringMetadata"
      }
    },
    additionalProperties: false
  },
  stringMetadata: {
    description: "Additional non-locale-specific information about a localized string key",
    type: "object",
    properties: {
      fallbackKey: {
        description: "Localized string key from which to get this value if one does not exist in the specified language. If a new key/value pair needs to be made to replace an existing one, this could help smooth over the transition if the meanings are close enough.\nYou can use Paratext 9 Localized String Keys here. Be sure to escape any % signs with a backslash `\\`.",
        type: "string",
        pattern: "^%[\\w\\-\\.;&,' (){}#:/\\\\?%⋮|[\\]“”‘’!~* +=•`…​↑↓]+%$",
        tsType: "LocalizeKey"
      },
      notes: {
        description: "Additional information provided by developers in English to help the translator to know how to translate this localized string accurately",
        type: "string"
      },
      deprecationInfo: {
        description: "If this property is filled, the localized string is deprecated. Contains information about the deprecation.",
        $ref: "#/$defs/localizedStringDeprecationInfo"
      }
    }
  },
  localizedStringDeprecationInfo: {
    description: "Date of deprecation, the reason for deprecation, and what to use instead in what contexts",
    type: "object",
    properties: {
      date: {
        description: "Date of deprecation. Must be in YYYY-MM-DD format e.g. 2024-11-13.\n\nTested against regex `^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$`.\n\nThanks to Vinod at https://stackoverflow.com/a/22061879 for the regex.",
        type: "string",
        pattern: "^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
        tsType: "DateYYYYMMDD"
      },
      message: {
        description: "Should contain the reason for deprecation and what to use instead in what contexts.\n\n@example Reworded to clarify the meaning. Use %my_key_2% instead.",
        type: "string"
      }
    },
    required: ["date", "message"]
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  }
};
removeJsonToTypeScriptTypesStuff(localizedStringsDefs);
const localizedStringsDocumentSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Localized String Data Contribution",
  description: "The data an extension provides to inform Platform.Bible of the localized strings it provides.",
  type: "object",
  properties: {
    metadata: {
      $ref: "#/$defs/stringsMetadata"
    },
    localizedStrings: {
      type: "object",
      additionalProperties: {
        $ref: "#/$defs/languageStrings"
      }
    }
  },
  $defs: localizedStringsDefs
};
Object.freeze(localizedStringsDocumentSchema);
const menuDocumentSchema = {
  title: "Platform.Bible menus",
  type: "object",
  properties: {
    mainMenu: {
      description: "Top level menu for the application",
      $ref: "#/$defs/multiColumnMenu"
    },
    defaultWebViewTopMenu: {
      description: "Default top menu for web views that don't specify their own",
      $ref: "#/$defs/multiColumnMenu"
    },
    defaultWebViewContextMenu: {
      description: "Default context menu for web views that don't specify their own",
      $ref: "#/$defs/singleColumnMenu"
    },
    defaultWebViewTabMenu: {
      description: "Default menu that opens when you right click a tab itself",
      $ref: "#/$defs/singleColumnMenu"
    },
    webViewMenus: {
      description: "Menus that apply per web view in the application",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          $ref: "#/$defs/menusForOneWebView"
        }
      },
      additionalProperties: false
    }
  },
  required: ["mainMenu", "defaultWebViewTopMenu", "defaultWebViewContextMenu", "webViewMenus"],
  additionalProperties: false,
  $defs: {
    localizeKey: {
      description: "Identifier for a string that will be localized in a menu based on the user's UI language",
      type: "string",
      pattern: "^%[\\w\\-\\.]+%$"
    },
    referencedItem: {
      description: "Name of some UI element (i.e., tab, column, group, menu item) or some PAPI object (i.e., command)",
      type: "string",
      pattern: "^[\\w\\-]+\\.[\\w\\-]+$"
    },
    columnsWithHeaders: {
      description: "Group of columns that can be combined with other columns to form a multi-column menu",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          description: "Single column with a header string",
          type: "object",
          properties: {
            label: {
              description: "Header text for this this column in the UI",
              $ref: "#/$defs/localizeKey"
            },
            localizeNotes: {
              description: "Additional information provided by developers to help people who perform localization",
              type: "string"
            },
            order: {
              description: "Relative order of this column compared to other columns (sorted ascending)",
              type: "number"
            },
            isExtensible: {
              description: "Defines whether contributions are allowed to add menu groups to this column",
              type: "boolean"
            },
            isExperimental: {
              description: "Set to `true` to mark this extension point as experimental. Experimental menu content may change or be removed without notice.",
              type: "boolean"
            },
            isHeaderHidden: {
              description: "Set to `true` to show this column's items without its header text in the menu that opens when you click on the top left corner of a tab (`topMenu`), which heads each section with its column's header. While that menu shows two or more sections, the label still names this section for assistive technology; a section left on its own, including one left alone by interface-mode filtering, gets neither a heading nor a name. Give it a real label regardless. The application menubar ignores this, because there the header is what opens the column.",
              type: "boolean"
            }
          },
          required: ["label", "order"],
          additionalProperties: false
        }
      },
      properties: {
        isExtensible: {
          description: "Defines whether contributions are allowed to add columns to this multi-column menu",
          type: "boolean"
        },
        isExperimental: {
          description: "Set to `true` to mark this columns collection as experimental. Experimental menu content may change or be removed without notice.",
          type: "boolean"
        }
      },
      // Reject unknown keys at the collection level (e.g. a typo'd `isExperimentl`). Column entries
      // are still allowed via `patternProperties` above.
      additionalProperties: false
    },
    menuGroups: {
      description: "Group of menu items that can be combined with other groups to form a single menu/submenu. Groups are separated using a line within the menu/submenu.",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          description: "Single group that contains menu items",
          type: "object",
          oneOf: [
            {
              properties: {
                column: {
                  description: "Column where this group belongs, not required for single column menus",
                  $ref: "#/$defs/referencedItem"
                },
                order: {
                  description: "Relative order of this group compared to other groups in the same column or submenu (sorted ascending)",
                  type: "number"
                },
                isExtensible: {
                  description: "Defines whether contributions are allowed to add menu items to this menu group",
                  type: "boolean"
                },
                isExperimental: {
                  description: "Set to `true` to mark this extension point as experimental. Experimental menu content may change or be removed without notice.",
                  type: "boolean"
                }
              },
              required: ["order"],
              additionalProperties: false
            },
            {
              properties: {
                menuItem: {
                  description: "Menu item that anchors the submenu where this group belongs",
                  $ref: "#/$defs/referencedItem"
                },
                order: {
                  description: "Relative order of this group compared to other groups in the same column or submenu (sorted ascending)",
                  type: "number"
                },
                isExtensible: {
                  description: "Defines whether contributions are allowed to add menu items to this menu group",
                  type: "boolean"
                },
                isExperimental: {
                  description: "Set to `true` to mark this extension point as experimental. Experimental menu content may change or be removed without notice.",
                  type: "boolean"
                }
              },
              required: ["menuItem", "order"],
              additionalProperties: false
            }
          ]
        }
      },
      additionalProperties: false
    },
    menuItem: {
      description: "Single item in a menu that can be clicked on to take an action or can be the parent of a submenu",
      type: "object",
      oneOf: [
        {
          properties: {
            id: {
              description: "ID for this menu item that holds a submenu",
              $ref: "#/$defs/referencedItem"
            }
          },
          required: ["id"]
        },
        {
          // No `shortcut`: the platform fills it in, so contributions must not set it
          properties: {
            command: {
              description: "Name of the PAPI command to run when this menu item is selected.",
              $ref: "#/$defs/referencedItem"
            },
            iconPathBefore: {
              description: "Uri path to the icon to display before the menu text, shown at up to 16px wide and tall (the size of a named icon). Ex: `papi-extension://helloWorld/assets/icon.png`",
              type: "string"
            },
            iconPathAfter: {
              description: "Uri path to the icon to display after the menu text, shown at up to 16px wide and tall (the size of a named icon). Ex: `papi-extension://helloWorld/assets/icon.png`",
              type: "string"
            },
            checkedWhen: {
              description: "When-expression controlling whether this menu item shows a checkmark. If provided, the item renders as a checkbox-style item; if not provided, the item renders as a plain (non-checkbox) item. References context keys; supports && || ! == != ( ), single-quoted strings, numbers, true/false, and {templateVar} segments.",
              type: "string"
            }
          },
          required: ["command"]
        }
      ],
      properties: {
        label: {
          description: "Key that represents the text of this menu item to display",
          $ref: "#/$defs/localizeKey"
        },
        tooltip: {
          description: "Key that represents the text to display if a mouse pointer hovers over the menu item",
          $ref: "#/$defs/localizeKey"
        },
        searchTerms: {
          description: "Key that represents additional words the platform should reference when users are searching for menu items",
          $ref: "#/$defs/localizeKey"
        },
        localizeNotes: {
          description: "Additional information provided by developers to help people who perform localization",
          type: "string"
        },
        group: {
          description: "Group to which this menu item belongs",
          $ref: "#/$defs/referencedItem"
        },
        order: {
          description: "Relative order of this menu item compared to other menu items in the same group (sorted ascending)",
          type: "number"
        },
        hiddenInterfaceModes: {
          description: "Interface modes in which this menu item should be hidden. Omit (or use an empty array) for items that should show in every mode.",
          type: "array",
          items: { enum: ["simple", "power"] },
          uniqueItems: true
        },
        iconNameBefore: {
          description: "Lucide icon name (kebab-case, e.g. `refresh-cw`) identifying the icon to display before the menu text. The curated names are listed in `LUCIDE_ICON_NAMES` (exported from `platform-bible-react/experimental`). Wins over `iconPathBefore` when both are set, unless the name is not in that set: then `iconPathBefore` is shown if set, else no icon.",
          type: "string"
        },
        iconNameAfter: {
          description: "Lucide icon name (kebab-case, e.g. `external-link`) identifying the icon to display after the menu text. The curated names are listed in `LUCIDE_ICON_NAMES` (exported from `platform-bible-react/experimental`). Wins over `iconPathAfter` when both are set, unless the name is not in that set: then `iconPathAfter` is shown if set, else no icon.",
          type: "string"
        },
        when: {
          description: "When-expression controlling whether this menu item is visible. If not provided, the item is always visible. References context keys; supports && || ! == != ( ), single-quoted strings, numbers, true/false, and {templateVar} segments (web view menus provide {webViewId}, {webViewType}, {projectId}; the main menu provides none).",
          type: "string"
        },
        enabledWhen: {
          description: "When-expression controlling whether this menu item is enabled. If not provided, the item is always enabled. Same grammar as when.",
          type: "string"
        }
      },
      required: ["label", "group", "order"],
      unevaluatedProperties: false
    },
    groupsAndItems: {
      description: "Core schema for a column",
      type: "object",
      properties: {
        groups: {
          description: "Groups that belong in this menu",
          $ref: "#/$defs/menuGroups"
        },
        items: {
          description: "List of menu items that belong in this menu",
          type: "array",
          items: { $ref: "#/$defs/menuItem" },
          uniqueItems: true
        }
      },
      required: ["groups", "items"]
    },
    singleColumnMenu: {
      description: "Menu that contains a column without a header",
      type: "object",
      allOf: [{ $ref: "#/$defs/groupsAndItems" }],
      unevaluatedProperties: false
    },
    multiColumnMenu: {
      description: "Menu that can contain multiple columns with headers",
      type: "object",
      allOf: [
        { $ref: "#/$defs/groupsAndItems" },
        {
          properties: {
            columns: {
              description: "Columns that belong in this menu",
              $ref: "#/$defs/columnsWithHeaders"
            }
          },
          required: ["columns"]
        }
      ],
      unevaluatedProperties: false
    },
    menusForOneWebView: {
      description: "Set of menus that are associated with a single tab",
      type: "object",
      properties: {
        includeDefaults: {
          description: "Indicates whether the platform default menus should be included for this webview",
          type: "boolean"
        },
        topMenu: {
          description: "Menu that opens when you click on the top left corner of a tab",
          $ref: "#/$defs/multiColumnMenu"
        },
        contextMenu: {
          description: "Menu that opens when you right click on the main body/area of a tab",
          $ref: "#/$defs/singleColumnMenu"
        },
        tabMenu: {
          description: "Menu that opens when you right click the tab itself",
          $ref: "#/$defs/singleColumnMenu"
        },
        isExperimental: {
          description: "Set to `true` to mark this WebView menu as experimental. Experimental menu content may change or be removed without notice.",
          type: "boolean"
        }
      },
      additionalProperties: false
    }
  }
};
Object.freeze(menuDocumentSchema);
const PROJECT_SELECTOR_CUSTOM_DATA_KEYS = Object.freeze({
  language: "language",
  type: "type",
  typeName: "typeName",
  lastUsedAt: "lastUsedAt"
});
function makeProjectSelectorCustomData(input) {
  const out = {};
  if (typeof input.language === "string" && input.language.length > 0) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.language] = input.language;
  }
  if (typeof input.type === "string" && input.type.length > 0) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.type] = input.type;
  }
  if (typeof input.typeName === "string" && input.typeName.length > 0) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.typeName] = input.typeName;
  }
  if (typeof input.lastUsedAt === "number" && Number.isFinite(input.lastUsedAt)) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.lastUsedAt] = input.lastUsedAt;
  }
  return out;
}
function recencyMapFromOrderedIds(orderedProjectIds) {
  const map = /* @__PURE__ */ new Map();
  const total = orderedProjectIds.length;
  orderedProjectIds.forEach((id, index) => {
    if (map.has(id)) return;
    map.set(id, total - index);
  });
  return map;
}
const CONTEXT_KEY_SEGMENT_REGEX = /^[A-Za-z0-9_-]+$/;
function isValidContextKey(key) {
  const segments = key.split(".");
  if (segments.length < 2) return false;
  return segments.every((segment) => CONTEXT_KEY_SEGMENT_REGEX.test(segment));
}
function isValidContextKeyValue(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
const WHITESPACE_REGEX = /\s/;
const WORD_CHAR_REGEX = /[-A-Za-z0-9_{}.]/;
const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;
const IDENTIFIER_SEGMENT_REGEX = /^[A-Za-z0-9_-]+$/;
const TEMPLATE_VAR_SEGMENT_REGEX = /^\{([A-Za-z_][A-Za-z0-9_]*)\}$/;
function parsePropertySegments(word, position) {
  const rawSegments = word.split(".");
  if (rawSegments.length < 2)
    throw new Error(
      `Invalid token '${word}' at position ${position}: property references need at least two dot-separated segments`
    );
  return rawSegments.map((rawSegment) => {
    const templateVarMatch = TEMPLATE_VAR_SEGMENT_REGEX.exec(rawSegment);
    if (templateVarMatch) return { type: "templateVar", name: templateVarMatch[1] };
    if (IDENTIFIER_SEGMENT_REGEX.test(rawSegment)) return { type: "identifier", text: rawSegment };
    throw new Error(
      `Invalid property segment '${rawSegment}' in '${word}' at position ${position}`
    );
  });
}
function tokenize(expression) {
  const tokens = [];
  let i = 0;
  while (i < expression.length) {
    const c = expression[i];
    if (WHITESPACE_REGEX.test(c)) {
      i += 1;
    } else if (c === "(" || c === ")") {
      tokens.push({ type: c });
      i += 1;
    } else if (c === "&" || c === "|" || c === "=") {
      const pair = expression.substring(i, i + 2);
      if (pair !== "&&" && pair !== "||" && pair !== "==")
        throw new Error(`Unexpected character '${c}' at position ${i} in '${expression}'`);
      tokens.push({ type: pair });
      i += 2;
    } else if (c === "!") {
      if (expression[i + 1] === "=") {
        tokens.push({ type: "!=" });
        i += 2;
      } else {
        tokens.push({ type: "!" });
        i += 1;
      }
    } else if (c === "'") {
      const closingQuoteIndex = expression.indexOf("'", i + 1);
      if (closingQuoteIndex < 0)
        throw new Error(`Unterminated string starting at position ${i} in '${expression}'`);
      tokens.push({ type: "literal", value: expression.substring(i + 1, closingQuoteIndex) });
      i = closingQuoteIndex + 1;
    } else if (WORD_CHAR_REGEX.test(c)) {
      const start = i;
      while (i < expression.length && WORD_CHAR_REGEX.test(expression[i])) i += 1;
      const word = expression.substring(start, i);
      if (NUMBER_REGEX.test(word)) tokens.push({ type: "literal", value: Number(word) });
      else if (word === "true") tokens.push({ type: "literal", value: true });
      else if (word === "false") tokens.push({ type: "literal", value: false });
      else tokens.push({ type: "property", segments: parsePropertySegments(word, start) });
    } else {
      throw new Error(`Unexpected character '${c}' at position ${i} in '${expression}'`);
    }
  }
  return tokens;
}
function parseTokens(tokens, expression) {
  let position = 0;
  function peekType() {
    var _a;
    return (_a = tokens[position]) == null ? void 0 : _a.type;
  }
  function parsePrimary() {
    const token = tokens[position];
    if (!token) throw new Error(`Unexpected end of expression '${expression}'`);
    position += 1;
    if (token.type === "(") {
      const inner = parseOr();
      if (peekType() !== ")") throw new Error(`Expected ')' in expression '${expression}'`);
      position += 1;
      return inner;
    }
    if (token.type === "literal") return { type: "literal", value: token.value };
    if (token.type === "property") return { type: "property", segments: token.segments };
    throw new Error(`Unexpected token '${token.type}' in expression '${expression}'`);
  }
  function parseUnary() {
    if (peekType() === "!") {
      position += 1;
      return { type: "not", operand: parseUnary() };
    }
    return parsePrimary();
  }
  function parseEquality() {
    const left = parseUnary();
    const operator = peekType();
    if (operator === "==" || operator === "!=") {
      position += 1;
      return { type: "equality", operator, left, right: parseUnary() };
    }
    return left;
  }
  function parseAnd() {
    const operands = [parseEquality()];
    while (peekType() === "&&") {
      position += 1;
      operands.push(parseEquality());
    }
    return operands.length === 1 ? operands[0] : { type: "and", operands };
  }
  function parseOr() {
    const operands = [parseAnd()];
    while (peekType() === "||") {
      position += 1;
      operands.push(parseAnd());
    }
    return operands.length === 1 ? operands[0] : { type: "or", operands };
  }
  const ast = parseOr();
  if (position !== tokens.length)
    throw new Error(
      `Unexpected token '${tokens[position].type}' after end of expression '${expression}'`
    );
  return ast;
}
const parseCache = /* @__PURE__ */ new Map();
function parseWhenExpression(expression) {
  const cached = parseCache.get(expression);
  if (cached !== void 0) {
    if (cached instanceof Error) throw cached;
    return cached;
  }
  try {
    const ast = parseTokens(tokenize(expression), expression);
    parseCache.set(expression, ast);
    return ast;
  } catch (error) {
    const errorToCache = error instanceof Error ? error : new Error(String(error));
    parseCache.set(expression, errorToCache);
    throw errorToCache;
  }
}
function collectTemplateVarNames(ast, names) {
  switch (ast.type) {
    case "property":
      ast.segments.forEach((segment) => {
        if (segment.type === "templateVar") names.add(segment.name);
      });
      break;
    case "not":
      collectTemplateVarNames(ast.operand, names);
      break;
    case "equality":
      collectTemplateVarNames(ast.left, names);
      collectTemplateVarNames(ast.right, names);
      break;
    case "and":
    case "or":
      ast.operands.forEach((operand) => collectTemplateVarNames(operand, names));
      break;
  }
}
function getTemplateVarNames(expression) {
  const names = /* @__PURE__ */ new Set();
  collectTemplateVarNames(parseWhenExpression(expression), names);
  return [...names];
}
function evaluateAst(ast, getContextKey, templateVars) {
  switch (ast.type) {
    case "literal":
      return ast.value;
    case "property": {
      const parts = [];
      for (let i = 0; i < ast.segments.length; i += 1) {
        const segment = ast.segments[i];
        if (segment.type === "identifier") parts.push(segment.text);
        else {
          const value = templateVars[segment.name];
          if (value === void 0) return void 0;
          parts.push(value);
        }
      }
      return getContextKey(parts.join("."));
    }
    case "not":
      return !evaluateAst(ast.operand, getContextKey, templateVars);
    case "equality": {
      const left = evaluateAst(ast.left, getContextKey, templateVars);
      const right = evaluateAst(ast.right, getContextKey, templateVars);
      return ast.operator === "==" ? left === right : left !== right;
    }
    case "and":
      return ast.operands.every((operand) => !!evaluateAst(operand, getContextKey, templateVars));
    case "or":
      return ast.operands.some((operand) => !!evaluateAst(operand, getContextKey, templateVars));
    default: {
      const exhaustivenessCheck = ast;
      return exhaustivenessCheck;
    }
  }
}
function evaluateWhenExpression(expression, getContextKey, templateVars = {}) {
  return !!evaluateAst(parseWhenExpression(expression), getContextKey, templateVars);
}
function createMenuTemplateVars(vars) {
  return {
    webViewId: vars.webViewId,
    webViewType: vars.webViewType,
    projectId: vars.projectId ? normalizeProjectId(vars.projectId) : void 0
  };
}
function evaluateMenu(menu, getContextKey, templateVars = {}, onError = () => {
}) {
  const result = scriptureUtil.deepClone(menu);
  const safeEvaluate = (expression, resultOnMissing, resultOnError) => {
    if (expression === void 0) return resultOnMissing;
    try {
      return evaluateWhenExpression(expression, getContextKey, templateVars);
    } catch (error) {
      onError(expression, error);
      return resultOnError;
    }
  };
  const allItems = result.items;
  const groups = result.groups;
  let visibleItems = allItems.filter((item) => safeEvaluate(item.when, true, false));
  visibleItems.forEach((item) => {
    if (item.enabledWhen !== void 0)
      item.disabled = !safeEvaluate(item.enabledWhen, true, false);
    if ("command" in item && item.checkedWhen !== void 0)
      item.checked = safeEvaluate(item.checkedWhen, false, false);
    delete item.when;
    delete item.enabledWhen;
    if ("command" in item) delete item.checkedWhen;
  });
  const groupKeysWithItems = new Set(allItems.map((item) => item.group));
  const getSubmenuGroupKeys = (submenuId) => Object.keys(groups).filter((groupKey) => groups[groupKey].menuItem === submenuId);
  let changed = true;
  while (changed) {
    const snapshot = visibleItems;
    const pruned = snapshot.filter((item) => {
      if (!("id" in item)) return true;
      const submenuGroupKeys = getSubmenuGroupKeys(item.id);
      const hadItems = submenuGroupKeys.some((groupKey) => groupKeysWithItems.has(groupKey));
      if (!hadItems) return true;
      return snapshot.some((other) => submenuGroupKeys.includes(other.group));
    });
    changed = pruned.length !== snapshot.length;
    visibleItems = pruned;
  }
  const columnKeysWithGroups = /* @__PURE__ */ new Set();
  Object.values(groups).forEach((group) => {
    if (group.column !== void 0) columnKeysWithGroups.add(group.column);
  });
  const visibleGroupKeys = new Set(visibleItems.map((item) => item.group));
  Object.keys(groups).forEach((groupKey) => {
    if (groupKeysWithItems.has(groupKey) && !visibleGroupKeys.has(groupKey))
      delete groups[groupKey];
  });
  if ("columns" in result && result.columns) {
    const columns = result.columns;
    const usedColumnKeys = /* @__PURE__ */ new Set();
    Object.values(groups).forEach((group) => {
      if (group.column !== void 0) usedColumnKeys.add(group.column);
    });
    Object.keys(columns).forEach((columnKey) => {
      if (columnKeysWithGroups.has(columnKey) && !usedColumnKeys.has(columnKey))
        delete columns[columnKey];
    });
  }
  result.items = visibleItems;
  return result;
}
function doesCatalogRowCoverProject(row, localProjectId) {
  if (!row.installed && row.projectId === "") return false;
  if (row.projectId !== "" && row.projectId === localProjectId) return true;
  return row.dblEntryUid !== "" && localProjectId.toLowerCase().startsWith(row.dblEntryUid.toLowerCase());
}
const themeDefs = {
  themeCssVariables: {
    description: "Theme colors and other CSS variable properties that adjust the looks of the application. These are applied in CSS properties using `var(--variableName)` or Tailwind classes like `tw:bg-primary`\n\nSee [shadcn's Theming page](https://ui.shadcn.com/docs/theming#theme-tokens) and the wiki's [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme) section for more information.",
    type: "object",
    properties: {
      background: {
        description: "Default application background color. Applied to the page shell and page sections.",
        type: "string"
      },
      foreground: {
        description: "Default text color. Applied to the page shell and general text content.",
        type: "string"
      },
      card: {
        description: "Surface color for elevated containers such as cards and dashboard panels.",
        type: "string"
      },
      "card-foreground": {
        description: "Text and content color inside card surfaces.",
        type: "string"
      },
      popover: {
        description: "Surface color for floating overlays such as dropdowns and context menus.",
        type: "string"
      },
      "popover-foreground": {
        description: "Text and content color inside floating overlay surfaces.",
        type: "string"
      },
      primary: {
        description: "High-emphasis action and brand surface color. Applied to the default button, selected states, and active accents.",
        type: "string"
      },
      "primary-foreground": {
        description: "Text and content color rendered on primary surfaces.",
        type: "string"
      },
      secondary: {
        description: "Lower-emphasis filled action and supporting surface color. Applied to secondary buttons and supporting UI.",
        type: "string"
      },
      "secondary-foreground": {
        description: "Text and content color rendered on secondary surfaces.",
        type: "string"
      },
      muted: {
        description: "Subtle background surface color for de-emphasized regions.",
        type: "string"
      },
      "muted-foreground": {
        description: "Lower-emphasis text color. Applied to descriptions, placeholders, helper text, and subdued content.",
        type: "string"
      },
      accent: {
        description: "Interactive hover, focus, and active surface color. Applied to ghost buttons, menu highlights, and hovered rows.",
        type: "string"
      },
      "accent-foreground": {
        description: "Text and content color rendered on accent surfaces.",
        type: "string"
      },
      destructive: {
        description: "Color representing destructive actions and error states. Applied to destructive buttons and invalid states.",
        type: "string"
      },
      "destructive-foreground": {
        description: "Text and content color rendered on destructive surfaces.",
        type: "string"
      },
      "success-foreground": {
        description: "Color to emphasize the success of some action",
        type: "string"
      },
      warning: {
        description: "Color representing warning states such as caution, advisories, and non-critical issues.",
        type: "string"
      },
      "warning-foreground": {
        description: "Text and content color rendered on warning surfaces.",
        type: "string"
      },
      border: {
        description: "Default border and separator color. Applied to cards, menus, tables, and layout dividers.",
        type: "string"
      },
      input: {
        description: "Border and surface treatment color for form controls such as inputs, text areas, and selects.",
        type: "string"
      },
      ring: {
        description: "Focus ring and outline color applied to buttons, inputs, checkboxes, and other focusable controls.",
        type: "string"
      },
      "chart-1": { description: "First color in the default chart palette.", type: "string" },
      "chart-2": { description: "Second color in the default chart palette.", type: "string" },
      "chart-3": { description: "Third color in the default chart palette.", type: "string" },
      "chart-4": { description: "Fourth color in the default chart palette.", type: "string" },
      "chart-5": { description: "Fifth color in the default chart palette.", type: "string" },
      sidebar: { description: "Base sidebar container surface color.", type: "string" },
      "sidebar-foreground": {
        description: "Default text color inside the sidebar.",
        type: "string"
      },
      "sidebar-primary": {
        description: "High-emphasis action color inside the sidebar. Applied to active items, icon tiles, and sidebar badges.",
        type: "string"
      },
      "sidebar-primary-foreground": {
        description: "Text and content color rendered on primary sidebar surfaces.",
        type: "string"
      },
      "sidebar-accent": {
        description: "Hover and selected state surface color inside the sidebar. Applied to menu hover states and open items.",
        type: "string"
      },
      "sidebar-accent-foreground": {
        description: "Text and content color rendered on sidebar accent surfaces.",
        type: "string"
      },
      "sidebar-border": {
        description: "Border and separator color specific to the sidebar. Applied to sidebar headers, groups, and internal dividers.",
        type: "string"
      },
      "sidebar-ring": {
        description: "Focus ring color for controls inside the sidebar.",
        type: "string"
      },
      radius: {
        description: "Base corner radius scale. Applied to cards, inputs, buttons, popovers, and the derived radius-* tokens.",
        type: "string"
      },
      spacing: {
        description: "Base spacing unit. Controls the size of all Tailwind spacing utilities (padding, margin, gap, etc.).",
        type: "string"
      }
    },
    additionalProperties: { anyOf: [{ type: "string" }, { type: "null" }] }
  },
  themeDefinition: {
    description: "The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark) and belongs to a theme family. An extension can provide multiple themes with {@link ThemeContribution}.",
    type: "object",
    properties: {
      label: {
        description: "LocalizeKey that is the display name for the theme",
        type: "string",
        pattern: "^%[\\w\\-\\.]+%$",
        tsType: "LocalizeKey"
      },
      cssVariables: {
        $ref: "#/$defs/themeCssVariables"
      }
    },
    required: ["label", "cssVariables"]
  },
  themeFamily: {
    description: "A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.\n\nA theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type to determine how to look. Colors not present in the theme will fall back to the built-in colors for this type.",
    type: "object",
    properties: {
      light: {
        $ref: "#/$defs/themeDefinition"
      },
      dark: {
        $ref: "#/$defs/themeDefinition"
      }
    },
    additionalProperties: {
      anyOf: [
        {
          $ref: "#/$defs/themeDefinition"
        },
        { type: "null" }
      ]
    }
  },
  themeFamiliesById: {
    description: "Object whose keys are theme family ids and whose values are {@link ThemeFamily}.",
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#/$defs/themeFamily"
        },
        { type: "null" }
      ]
    }
  }
};
removeJsonToTypeScriptTypesStuff(themeDefs);
const themeDocumentSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Theme Contribution",
  description: "The data an extension provides to inform Platform.Bible of the themes it provides.",
  anyOf: [
    {
      $ref: "#/$defs/themeFamiliesById"
    }
  ],
  $defs: themeDefs
};
Object.freeze(themeDocumentSchema);
const THEME_STYLE_ELEMENT_ID = "theme-styles";
function getThemeId(themeFamilyId, type) {
  return `${themeFamilyId ? `${themeFamilyId}-` : ""}${type}`;
}
function expandThemeContribution(themeFamiliesById, defaultThemeFamily) {
  const themeFamiliesByIdExpanded = Object.fromEntries(
    Object.entries(themeFamiliesById).map(([themeFamilyId, themeFamily]) => [
      themeFamilyId,
      themeFamily ? Object.fromEntries(
        Object.entries(themeFamily).map(([type, themeDefinition]) => {
          var _a;
          return [
            type,
            themeDefinition ? {
              ...themeDefinition,
              // Add the derived properties
              themeFamilyId,
              type,
              id: getThemeId(themeFamilyId, type),
              cssVariables: {
                // Fill in the default css variables
                ...(_a = defaultThemeFamily == null ? void 0 : defaultThemeFamily[type]) == null ? void 0 : _a.cssVariables,
                ...themeDefinition.cssVariables
              }
            } : void 0
          ];
        }).filter(([, themeDefinition]) => !!themeDefinition)
      ) : void 0
    ]).filter(([, themeFamily]) => !!themeFamily)
  );
  return themeFamiliesByIdExpanded;
}
function getStylesheetForTheme(theme) {
  return `
.${theme.id} {
${Object.entries(theme.cssVariables).map(([variableName, value]) => `  --${variableName}: ${value};`).join("\n")}
}
`;
}
function applyThemeStylesheet(theme, previousStyleElement, styleElementIdSuffix) {
  const previousThemeId = previousStyleElement == null ? void 0 : previousStyleElement.dataset.themeId;
  if (previousThemeId) this.document.body.classList.remove(previousThemeId);
  this.document.body.classList.add(theme.id);
  if (previousStyleElement) this.document.head.removeChild(previousStyleElement);
  const themeStyleElement = this.document.createElement("style");
  themeStyleElement.id = `${THEME_STYLE_ELEMENT_ID}${styleElementIdSuffix ? `-${styleElementIdSuffix}` : ""}`;
  themeStyleElement.dataset.themeId = theme.id;
  themeStyleElement.textContent = getStylesheetForTheme(theme);
  this.document.head.appendChild(themeStyleElement);
  return themeStyleElement;
}
function deepFreeze(o) {
  Object.freeze(o);
  if (o === void 0 || o === null) {
    return o;
  }
  Object.getOwnPropertyNames(o).forEach(function freezeProperty(prop) {
    if (
      // Need to make sure to avoid null, which is an object type
      // eslint-disable-next-line no-null/no-null
      o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}
const USFM_MARKERS_MAP = deepFreeze({
  version: "3.0.7",
  schemaRepo: "https://github.com/ubsicap/usx.git",
  schemaCommit: "6c490bb5675d281b0fa01876fe67f6e3fd50a4ce",
  markersMapVersion: "1.0.0",
  usfmToolsCommit: "979b4d5cf16c04f6744fe1fc5c730807a8b90187",
  markers: {
    add: {
      type: "char",
      description: "For a translational addition to the text"
    },
    addpn: {
      type: "char",
      description: "For chinese words to be dot underline & underline (DEPRECATED - used nested char@style pn)"
    },
    b: {
      type: "para",
      description: "Poetry text stanza break (e.g. stanza break)"
    },
    bd: {
      type: "char",
      description: "A character style, use bold text"
    },
    bdit: {
      type: "char",
      description: "A character style, use bold + italic text"
    },
    bk: {
      type: "char",
      description: "For the quoted name of a book"
    },
    c: {
      type: "chapter",
      leadingAttributes: ["number"],
      attributeMarkers: ["ca", "cp"]
    },
    ca: {
      type: "char",
      attributeMarkerAttributeName: "altnumber",
      isAttributeMarkerFor: ["c"],
      hasStructuralSpaceAfterCloseAttributeMarker: true,
      description: "Second (alternate) chapter number"
    },
    cat: {
      type: "char",
      attributeMarkerAttributeName: "category",
      isAttributeMarkerFor: ["ef", "efe", "esb", "ex", "f", "fe", "x"],
      description: "Note category (study Bible)"
    },
    cd: {
      type: "para",
      description: "Chapter Description (Publishing option D, e.g. in Russian Bibles)"
    },
    cl: {
      type: "para",
      description: 'Chapter label used for translations that add a word such as "Chapter"'
    },
    cls: {
      type: "para",
      description: "Closure of an Epistle"
    },
    cp: {
      type: "para",
      description: "Published chapter number",
      attributeMarkerAttributeName: "pubnumber",
      isAttributeMarkerFor: ["c"]
    },
    d: {
      type: "para",
      description: "A Hebrew text heading, to provide description (e.g. Psalms)"
    },
    dc: {
      type: "char",
      description: "Deuterocanonical/LXX additions or insertions in the Protocanonical text"
    },
    ef: {
      type: "note",
      description: "Study note",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    efe: {
      type: "note",
      description: "Extended study endnote",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    efm: {
      type: "char",
      description: "Reference to caller of previous footnote in a study Bible"
    },
    em: {
      type: "char",
      description: "A character style, use emphasized text style"
    },
    esb: {
      type: "sidebar",
      independentClosingMarkers: ["esbe"],
      attributeMarkers: ["cat"]
    },
    esbe: {
      type: "sidebar",
      isIndependentClosingMarkerFor: ["esb"]
    },
    ex: {
      type: "note",
      description: "Extended cross reference",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    f: {
      type: "note",
      description: "Footnote",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    fdc: {
      type: "char",
      description: "Footnote text, applies to Deuterocanon only (DEPRECATED - use char@style dc)",
      isClosingMarkerOptional: true
    },
    fe: {
      type: "note",
      description: "Endnote",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    fig: {
      type: "figure"
    },
    fk: {
      type: "char",
      description: "A footnote keyword",
      isClosingMarkerOptional: true
    },
    fl: {
      type: "char",
      description: 'A footnote label text item, for marking or "labelling" the type or alternate translation being provided in the note.',
      isClosingMarkerOptional: true
    },
    fm: {
      type: "char",
      description: "Reference to caller of previous footnote"
    },
    fp: {
      type: "char",
      description: "A Footnote additional paragraph marker",
      isClosingMarkerOptional: true
    },
    fq: {
      type: "char",
      description: "A footnote scripture quote or alternate rendering",
      isClosingMarkerOptional: true
    },
    fqa: {
      type: "char",
      description: "A footnote alternate rendering for a portion of scripture text",
      isClosingMarkerOptional: true
    },
    fr: {
      type: "char",
      description: "The origin reference for the footnote",
      isClosingMarkerOptional: true
    },
    ft: {
      type: "char",
      description: "Footnote text, Protocanon",
      isClosingMarkerOptional: true
    },
    fv: {
      type: "char",
      description: "A verse number within the footnote text"
    },
    fw: {
      type: "char",
      description: "A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",
      isClosingMarkerOptional: true
    },
    h: {
      type: "para",
      description: "Running header text for a book"
    },
    h1: {
      type: "para",
      description: "Running header text (DEPRECATED)"
    },
    h2: {
      type: "para",
      description: "Running header text, left side of page (DEPRECATED)"
    },
    h3: {
      type: "para",
      description: "Running header text, right side of page (DEPRECATED)"
    },
    ib: {
      type: "para",
      description: "Introduction blank line"
    },
    id: {
      type: "book",
      leadingAttributes: ["code"]
    },
    ide: {
      type: "para",
      description: "File encoding information"
    },
    ie: {
      type: "para",
      description: "Introduction ending marker"
    },
    iex: {
      type: "para",
      description: "Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)"
    },
    ili: {
      type: "para",
      description: "A list entry, level 1 (if single level)"
    },
    ili1: {
      type: "para",
      description: "A list entry, level 1 (if multiple levels)"
    },
    ili2: {
      type: "para",
      description: "A list entry, level 2"
    },
    im: {
      type: "para",
      description: "Introduction prose paragraph, with no first line indent (may occur after poetry)"
    },
    imi: {
      type: "para",
      description: "Introduction prose paragraph text, indented, with no first line indent"
    },
    imq: {
      type: "para",
      description: "Introduction prose paragraph, quote from the body text, with no first line indent"
    },
    imt: {
      type: "para",
      description: "Introduction major title, level 1 (if single level)\nIntroduction major title, level 1 - (if single level)"
    },
    imt1: {
      type: "para",
      description: "Introduction major title, level 1 (if multiple levels)"
    },
    imt2: {
      type: "para",
      description: "Introduction major title, level 2"
    },
    imt3: {
      type: "para",
      description: "Introduction major title, level 3"
    },
    imt4: {
      type: "para",
      description: "Introduction major title, level 4 (usually within parenthesis)"
    },
    imte: {
      type: "para",
      description: "Introduction major title at introduction end, level 1 (if single level)"
    },
    imte1: {
      type: "para",
      description: "Introduction major title at introduction end, level 1 (if multiple levels)"
    },
    imte2: {
      type: "para",
      description: "Introduction major title at introduction end, level 2"
    },
    io: {
      type: "para",
      description: "Introduction outline text, level 1 (if single level)"
    },
    io1: {
      type: "para",
      description: "Introduction outline text, level 1 (if multiple levels)"
    },
    io2: {
      type: "para",
      description: "Introduction outline text, level 2"
    },
    io3: {
      type: "para",
      description: "Introduction outline text, level 3"
    },
    io4: {
      type: "para",
      description: "Introduction outline text, level 4"
    },
    ior: {
      type: "char",
      description: "Introduction references range for outline entry; for marking references separately"
    },
    iot: {
      type: "para",
      description: "Introduction outline title"
    },
    ip: {
      type: "para",
      description: "Introduction prose paragraph\nDivision or Section introductory paragraph (study Bible)"
    },
    ipi: {
      type: "para",
      description: "Introduction prose paragraph, indented, with first line indent"
    },
    ipq: {
      type: "para",
      description: "Introduction prose paragraph, quote from the body text"
    },
    ipr: {
      type: "para",
      description: "Introduction prose paragraph, right aligned"
    },
    iq: {
      type: "para",
      description: "Introduction poetry text, level 1 (if single level)"
    },
    iq1: {
      type: "para",
      description: "Introduction poetry text, level 1 (if multiple levels)"
    },
    iq2: {
      type: "para",
      description: "Introduction poetry text, level 2"
    },
    iq3: {
      type: "para",
      description: "Introduction poetry text, level 3"
    },
    iqt: {
      type: "char"
    },
    is: {
      type: "para",
      description: "Introduction section heading, level 1 (if single level)"
    },
    is1: {
      type: "para",
      description: "Introduction section heading, level 1 (if multiple levels)"
    },
    is2: {
      type: "para",
      description: "Introduction section heading, level 2"
    },
    it: {
      type: "char",
      description: "A character style, use italic text"
    },
    jmp: {
      type: "char",
      defaultAttribute: "link-href",
      description: "For associating linking attributes to a span of text"
    },
    k: {
      type: "char",
      description: "For a keyword"
    },
    k1: {
      type: "para",
      description: "Concordance main entry text or keyword, level 1"
    },
    k2: {
      type: "para",
      description: "Concordance main entry text or keyword, level 2"
    },
    lf: {
      type: "para",
      description: "List footer (introductory remark)"
    },
    lh: {
      type: "para",
      description: "List header (introductory remark)"
    },
    li: {
      type: "para",
      description: "A list entry, level 1 (if single level)"
    },
    li1: {
      type: "para",
      description: "A list entry, level 1 (if multiple levels)"
    },
    li2: {
      type: "para",
      description: "A list entry, level 2"
    },
    li3: {
      type: "para",
      description: "A list entry, level 3"
    },
    li4: {
      type: "para",
      description: "A list entry, level 4"
    },
    lik: {
      type: "char",
      description: "Structured list entry key text"
    },
    lim: {
      type: "para",
      description: "An embedded list entry, level 1 (if single level)"
    },
    lim1: {
      type: "para",
      description: "An embedded list entry, level 1 (if multiple levels)"
    },
    lim2: {
      type: "para",
      description: "An embedded list entry, level 2"
    },
    lim3: {
      type: "para",
      description: "An embedded list entry, level 3"
    },
    lim4: {
      type: "para",
      description: "An embedded list entry, level 4"
    },
    lit: {
      type: "para",
      description: "For a comment or note inserted for liturgical use"
    },
    litl: {
      type: "char",
      description: "List entry total text"
    },
    liv: {
      type: "char",
      description: "Structured list entry value 1 content (if single value)"
    },
    liv1: {
      type: "char",
      description: "Structured list entrt value 1 content (if multiple values)"
    },
    liv2: {
      type: "char",
      description: "Structured list entry value 2 content"
    },
    liv3: {
      type: "char",
      description: "Structured list entry value 3 content"
    },
    liv4: {
      type: "char",
      description: "Structured list entry value 4 content"
    },
    liv5: {
      type: "char",
      description: "Structured list entry value 5 content"
    },
    m: {
      type: "para",
      description: "Paragraph text, with no first line indent (may occur after poetry) aka: Paragraph Continuation"
    },
    mi: {
      type: "para",
      description: "Paragraph text, indented, with no first line indent; often used for discourse"
    },
    mr: {
      type: "para",
      description: "A major section division references range heading"
    },
    ms: {
      type: "para",
      description: "A major section division heading, level 1 (if single level)"
    },
    ms1: {
      type: "para",
      description: "A major section division heading, level 1 (if multiple levels)"
    },
    ms2: {
      type: "para",
      description: "A major section division heading, level 2"
    },
    ms3: {
      type: "para",
      description: "A major section division heading, level 3"
    },
    mt: {
      type: "para",
      description: "The main title of the book (if single level)"
    },
    mt1: {
      type: "para",
      description: "The main title of the book (if multiple levels)"
    },
    mt2: {
      type: "para",
      description: "A secondary title usually occurring before the main title"
    },
    mt3: {
      type: "para",
      description: "A tertiary title occurring after the main title"
    },
    mt4: {
      type: "para",
      description: "Introduction major title, level 1 (if single level)\nA small secondary title sometimes occuring within parentheses"
    },
    mte: {
      type: "para",
      description: "The main title of the book repeated at the end of the book, level 1 (if single level)"
    },
    mte1: {
      type: "para",
      description: "The main title of the book repeat /ed at the end of the book, level 1 (if multiple levels)"
    },
    mte2: {
      type: "para",
      description: "A secondary title occurring before or after the 'ending' main title"
    },
    nb: {
      type: "para",
      description: "Paragraph text, with no break from previous paragraph text (at chapter boundary)"
    },
    nd: {
      type: "char",
      description: "For name of deity"
    },
    ndx: {
      type: "char",
      description: "A subject index text item"
    },
    no: {
      type: "char",
      description: "A character style, use normal text"
    },
    optbreak: {
      type: "optbreak"
    },
    ord: {
      type: "char",
      description: "For the text portion of an ordinal number"
    },
    p: {
      type: "para",
      description: "Paragraph text, with first line indent\nFront or back matter text paragraph, level 1"
    },
    p1: {
      type: "para",
      description: "Front or back matter text paragraph, level 1 (if multiple levels)"
    },
    p2: {
      type: "para",
      description: "Front or back matter text paragraph, level 2 (if multiple levels)"
    },
    pb: {
      type: "para",
      description: "Page Break used for new reader portions and children's bibles where content is controlled by the page"
    },
    pc: {
      type: "para",
      description: "Inscription (paragraph text centered)"
    },
    periph: {
      type: "periph",
      textContentAttribute: "alt"
    },
    ph: {
      type: "para",
      description: "Paragraph text, with level 1 hanging indent (if single level) (DEPRECATED - use para@style li#)"
    },
    ph1: {
      type: "para",
      description: "Paragraph text, with level 1 hanging indent (if multiple levels)"
    },
    ph2: {
      type: "para",
      description: "Paragraph text, with level 2 hanging indent"
    },
    ph3: {
      type: "para",
      description: "Paragraph text, with level 3 hanging indent"
    },
    pi: {
      type: "para",
      description: "Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse"
    },
    pi1: {
      type: "para",
      description: "Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse"
    },
    pi2: {
      type: "para",
      description: "Paragraph text, level 2 indent, with first line indent; often used for discourse"
    },
    pi3: {
      type: "para",
      description: "Paragraph text, level 3 indent, with first line indent; often used for discourse"
    },
    pm: {
      type: "para",
      description: "Embedded text paragraph"
    },
    pmc: {
      type: "para",
      description: "Embedded text closing"
    },
    pmo: {
      type: "para",
      description: "Embedded text opening"
    },
    pmr: {
      type: "para",
      description: "Embedded text refrain"
    },
    pn: {
      type: "char",
      description: "For a proper name"
    },
    png: {
      type: "char",
      description: "For a geographic proper name"
    },
    po: {
      type: "para",
      description: "Letter opening"
    },
    pr: {
      type: "para",
      description: "Text refrain (paragraph right-aligned)"
    },
    pro: {
      type: "char",
      description: "For indicating pronunciation in CJK texts (DEPRECATED - used char@style rb)"
    },
    q: {
      type: "para",
      description: "Poetry text, level 1 indent (if single level)"
    },
    q1: {
      type: "para",
      description: "Poetry text, level 1 indent (if multiple levels)"
    },
    q2: {
      type: "para",
      description: "Poetry text, level 2 indent"
    },
    q3: {
      type: "para",
      description: "Poetry text, level 3 indent"
    },
    q4: {
      type: "para",
      description: "Poetry text, level 4 indent"
    },
    qa: {
      type: "para",
      description: "Poetry text, Acrostic marker/heading"
    },
    qac: {
      type: "char",
      description: "Poetry text, Acrostic markup of the first character of a line of acrostic poetry"
    },
    qc: {
      type: "para",
      description: "Poetry text, centered"
    },
    qd: {
      type: "para",
      description: "A Hebrew musical performance annotation, similar in content to Hebrew descriptive title."
    },
    qm: {
      type: "para",
      description: "Poetry text, embedded, level 1 indent (if single level)"
    },
    qm1: {
      type: "para",
      description: "Poetry text, embedded, level 1 indent (if multiple levels)"
    },
    qm2: {
      type: "para",
      description: "Poetry text, embedded, level 2 indent"
    },
    qm3: {
      type: "para",
      description: "Poetry text, embedded, level 3 indent"
    },
    qr: {
      type: "para",
      description: "Poetry text, Right Aligned"
    },
    qs: {
      type: "char",
      description: "Poetry text, Selah"
    },
    qt: {
      type: "char",
      description: "For Old Testament quoted text appearing in the New Testament"
    },
    "qt-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt1-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt1-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt2-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt2-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt3-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt3-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt4-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt4-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    "qt5-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "qt5-s": {
      type: "ms",
      defaultAttribute: "who"
    },
    r: {
      type: "para",
      description: "Parallel reference(s)"
    },
    rb: {
      type: "char",
      defaultAttribute: "gloss"
    },
    ref: {
      type: "ref",
      defaultAttribute: "loc"
    },
    rem: {
      type: "para",
      description: "Remark"
    },
    restore: {
      type: "para",
      description: "Comment about when text was restored"
    },
    rq: {
      type: "char",
      description: "A cross-reference indicating the source text for the preceding quotation."
    },
    s: {
      type: "para",
      description: "A section heading, level 1 (if single level)"
    },
    s1: {
      type: "para",
      description: "A section heading, level 1 (if multiple levels)"
    },
    s2: {
      type: "para",
      description: "A section heading, level 2 (e.g. Proverbs 22-24)"
    },
    s3: {
      type: "para",
      description: 'A section heading, level 3 (e.g. Genesis "The First Day")'
    },
    s4: {
      type: "para",
      description: "A section heading, level 4"
    },
    sc: {
      type: "char",
      description: "A character style, for small capitalization text"
    },
    sd: {
      type: "para",
      description: "Vertical space used to divide the text into sections, level 1 (if single level)"
    },
    sd1: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 1 (if multiple levels)"
    },
    sd2: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 2"
    },
    sd3: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 3"
    },
    sd4: {
      type: "para",
      description: "Semantic division location (vertical space used to divide the text into sections), level 4"
    },
    sig: {
      type: "char",
      description: "For the signature of the author of an Epistle"
    },
    sls: {
      type: "char",
      description: "To represent where the original text is in a secondary language or from an alternate text source"
    },
    sp: {
      type: "para",
      description: "A heading, to identify the speaker (e.g. Job)"
    },
    sr: {
      type: "para",
      description: "A section division references range heading"
    },
    sts: {
      type: "para",
      description: "Status\nRemark"
    },
    sup: {
      type: "char",
      description: "A character style, for superscript text. Typically for use in critical edition footnotes."
    },
    "t-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "t-s": {
      type: "ms",
      defaultAttribute: "sid"
    },
    table: {
      type: "table"
    },
    tl: {
      type: "char",
      description: "For transliterated words"
    },
    toc1: {
      type: "para",
      description: "Long table of contents text"
    },
    toc2: {
      type: "para",
      description: "Short table of contents text"
    },
    toc3: {
      type: "para",
      description: "Book Abbreviation"
    },
    toca1: {
      type: "para",
      description: "Alternative language long table of contents text"
    },
    toca2: {
      type: "para",
      description: "Alternative language short table of contents text"
    },
    toca3: {
      type: "para",
      description: "Alternative language book Abbreviation"
    },
    tr: {
      type: "row",
      description: "Table row"
    },
    ts: {
      type: "ms",
      description: "Translator's chunk (to identify chunks of text suitable for translating at one time)"
    },
    "ts-e": {
      type: "ms",
      defaultAttribute: "eid"
    },
    "ts-s": {
      type: "ms",
      defaultAttribute: "sid"
    },
    usfm: {
      type: "para",
      textContentAttribute: "version",
      parseUsfmInstructions: "If this marker is directly after the first id marker, this marker's version attribute should determine the version attribute of the usx or USJ marker at the top of the USX or USJ document, then this marker should be removed."
    },
    USJ: {
      type: "USJ",
      textContentAttribute: "version",
      markerUsfm: "usfm"
    },
    usx: {
      type: "usx",
      textContentAttribute: "version",
      markerUsfm: "usfm"
    },
    v: {
      type: "verse",
      leadingAttributes: ["number"],
      attributeMarkers: ["va", "vp"]
    },
    va: {
      type: "char",
      attributeMarkerAttributeName: "altnumber",
      isAttributeMarkerFor: ["v"],
      hasStructuralSpaceAfterCloseAttributeMarker: true,
      description: "Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)"
    },
    vp: {
      type: "char",
      description: "Published verse marker - this is a verse marking that would be used in the published text",
      attributeMarkerAttributeName: "pubnumber",
      isAttributeMarkerFor: ["v"],
      hasStructuralSpaceAfterCloseAttributeMarker: true
    },
    w: {
      type: "char",
      defaultAttribute: "lemma"
    },
    wa: {
      type: "char",
      description: "An Aramaic wordlist text item"
    },
    wg: {
      type: "char",
      description: "A Greek Wordlist text item"
    },
    wh: {
      type: "char",
      description: "A Hebrew wordlist text item"
    },
    wj: {
      type: "char",
      description: "For marking the words of Jesus"
    },
    x: {
      type: "note",
      description: "Cross reference",
      leadingAttributes: ["caller"],
      attributeMarkers: ["cat"]
    },
    xdc: {
      type: "char",
      description: "Cross-reference target reference(s), Deuterocanon only (DEPRECATED - use char@style dc)",
      isClosingMarkerOptional: true
    },
    xk: {
      type: "char",
      description: "A cross reference keyword",
      isClosingMarkerOptional: true
    },
    xnt: {
      type: "char",
      description: "Cross-reference target reference(s), New Testament only",
      isClosingMarkerOptional: true
    },
    xo: {
      type: "char",
      description: "The cross reference origin reference",
      isClosingMarkerOptional: true
    },
    xop: {
      type: "char",
      description: "Published cross reference origin text (origin reference that should appear in the published text)",
      isClosingMarkerOptional: true
    },
    xot: {
      type: "char",
      description: "Cross-reference target reference(s), Old Testament only",
      isClosingMarkerOptional: true
    },
    xq: {
      type: "char",
      description: "A cross-reference quotation from the scripture text",
      isClosingMarkerOptional: true
    },
    xt: {
      type: "char",
      defaultAttribute: "link-href",
      description: "A target reference(s)\nA cross reference target reference(s)\nThe cross reference target reference(s), protocanon only",
      isClosingMarkerOptional: true
    },
    xta: {
      type: "char",
      description: "Cross reference target references added text",
      isClosingMarkerOptional: true
    }
  },
  markersRegExp: {
    "[Zz].+": {
      type: "ms",
      defaultAttribute: "sid"
    },
    "qt[1-5]?(\\-[se])?": {
      type: "ms",
      defaultAttribute: "sid"
    },
    "t[hc][rc]?\\d+": {
      type: "cell"
    },
    "ts?(\\-[se])?": {
      type: "ms",
      defaultAttribute: "sid"
    }
  },
  markerTypes: {
    book: {},
    cell: {
      skipOutputAttributeToUsfm: ["align"],
      outputToUsfmInstructions: "If this marker has a colspan attribute, the USFM marker name should be this marker's name plus hyphen (-) plus the marker's final column number (first column number found in the marker name plus colspan minus 1). Then the colspan attribute should not be output as a USFM attribute.",
      parseUsfmInstructions: "If this marker's name has a hyphen (-) and a number after the marker, the USX/USJ marker name should be just the portion of the marker name before the hyphen, and it should have the colspan attribute which is the number of columns spanned by the marker (second column number plus 1 minus first column number).",
      markerTypeUsj: "table:cell"
    },
    chapter: {
      hasNewlineBefore: true,
      skipOutputAttributeToUsfm: ["sid"],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["eid"]
    },
    char: {
      isCloseable: true,
      nestedPrefix: "+"
    },
    figure: {
      isCloseable: true,
      outputToUsfmInstructions: "The USX/USJ file attribute needs its name changed to src in USFM",
      parseUsfmInstructions: "The USFM src attribute needs its name changed to file in USX/USJ"
    },
    ms: {
      isCloseable: true,
      isClosingMarkerEmpty: true
    },
    note: {
      isCloseable: true
    },
    optbreak: {
      hasStyleAttribute: false
    },
    para: {
      hasNewlineBefore: true,
      skipOutputAttributeToUsfm: ["vid"]
    },
    periph: {
      hasNewlineBefore: true,
      hasStyleAttribute: false
    },
    ref: {
      isCloseable: true,
      hasStyleAttribute: false,
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["gen"],
      skipOutputMarkerToUsfm: true
    },
    row: {
      hasNewlineBefore: true,
      markerTypeUsj: "table:row"
    },
    sidebar: {
      hasNewlineBefore: true
    },
    table: {
      hasStyleAttribute: false,
      skipOutputAttributeToUsfm: ["vid"],
      skipOutputMarkerToUsfm: true
    },
    "table:cell": {
      skipOutputAttributeToUsfm: ["align"],
      outputToUsfmInstructions: "If this marker has a colspan attribute, the USFM marker name should be this marker's name plus hyphen (-) plus the marker's final column number (first column number found in the marker name plus colspan minus 1). Then the colspan attribute should not be output as a USFM attribute.",
      parseUsfmInstructions: "If this marker's name has a hyphen (-) and a number after the marker, the USX/USJ marker name should be just the portion of the marker name before the hyphen, and it should have the colspan attribute which is the number of columns spanned by the marker (second column number plus 1 minus first column number).",
      markerTypeUsj: "table:cell",
      markerTypeUsfm: "cell",
      markerTypeUsx: "cell"
    },
    "table:row": {
      hasNewlineBefore: true,
      markerTypeUsj: "table:row",
      markerTypeUsfm: "row",
      markerTypeUsx: "row"
    },
    unmatched: {
      description: "Paratext uses this type for closing markers that it cannot find opening markers for. They are treated like char markers but have no contents, no closing markers, and no space after the marker.",
      outputToUsfmInstructions: "Do not output a structural space after the opening marker for markers with unmatched type.",
      parseUsfmInstructions: "If a closing marker occurs but does not seem to have a matching opening marker, create an unmatched-type marker. There is no structural space after the unmatched-type marker; its end is determined by the asterisk at the end of the marker."
    },
    USJ: {
      hasNewlineBefore: true,
      hasStyleAttribute: false,
      skipOutputAttributeToUsfm: ["xsi:noNamespaceSchemaLocation"],
      outputToUsfmInstructions: "If this marker is the top-level marker containing all other markers in this document, it should not be directly output to USFM. Instead, if this marker's version attribute is other than 3.0, a new usfm marker with this version attribute needs to be added after the id marker if one is present in the USFM."
    },
    usx: {
      hasNewlineBefore: true,
      hasStyleAttribute: false,
      skipOutputAttributeToUsfm: ["xsi:noNamespaceSchemaLocation"],
      outputToUsfmInstructions: "If this marker is the top-level marker containing all other markers in this document, it should not be directly output to USFM. Instead, if this marker's version attribute is other than 3.0, a new usfm marker with this version attribute needs to be added after the id marker if one is present in the USFM."
    },
    verse: {
      hasNewlineBefore: true,
      skipOutputAttributeToUsfm: ["sid"],
      skipOutputMarkerToUsfmIfAttributeIsPresent: ["eid"]
    }
  }
});
const USFM_MARKERS_MAP_PARATEXT = Object.freeze({
  ...USFM_MARKERS_MAP,
  isSpaceAfterAttributeMarkersContent: true,
  shouldOptionalClosingMarkersBePresent: true
});
const NODE_TYPES_NOT_CONTAINING_VERSE_TEXT = ["figure", "note", "sidebar", "table"];
Object.freeze(NODE_TYPES_NOT_CONTAINING_VERSE_TEXT);
const BLOCK_LEVEL_NODE_TYPES = ["para", "table", "table:row", "table:cell", "sidebar"];
Object.freeze(BLOCK_LEVEL_NODE_TYPES);
const CHAPTER_NODE_TYPE = "chapter";
const SEARCH_WHITESPACE_GROUP_NAME_REGEXP = new RegExp(`^${SEARCH_WHITESPACE_GROUP_PREFIX}\\d+$`);
const HANGUL_SYLLABLE_CONTINUATION_REGEXP = /[\u1160-\u11FF\uD7B0-\uD7FF]/;
const TEXT_CONTENT_NBSP_REGEXP = /\u00A0/g;
const TABLE_MARKER_NUMBER_REGEXP = /\w+(\d+)/;
const VERSE_MARKER_NUMBER_SPAN_REGEXP = /(\d+)-?(\d+)?/;
class UsjReaderWriter {
  constructor(usj, options) {
    __publicField(this, "usj");
    __publicField(this, "markersMap");
    __publicField(this, "shouldAllowInvisibleCharacters");
    // Cached properties
    __publicField(this, "parentMapInternal");
    __publicField(this, "fragmentsByIndexInUsfmInternal");
    __publicField(this, "fragmentsByJsonPathInternal");
    __publicField(this, "indicesInUsfmByVerseRefInternal");
    __publicField(this, "usfmInternal");
    /**
     * Messages already reported by {@link reportProblemOnce}, so each distinct problem is reported
     * once per instance rather than once per occurrence. A commentary or UBS Handbook repeats markers
     * this class's markers map does not carry tens of thousands of times per book, and a web view's
     * console calls cross IPC to the main process's log file, so reporting per occurrence costs work
     * proportional to the document.
     *
     * Keyed by full message text, so a report collapses only as far as its text repeats: the marker
     * reports name only the marker, while the chapter and verse reports also name a position. The set
     * lives as long as the instance, so a caller that builds a new instance per action reports each
     * problem again per action. Deliberately not reset by {@link usjChanged}: these describe the
     * marker, not where it appeared.
     */
    __publicField(this, "reportedProblems", /* @__PURE__ */ new Set());
    this.usj = usj;
    const { markersMap: providedMarkersMap, shouldAllowInvisibleCharacters } = options ?? {};
    if (providedMarkersMap) {
      this.markersMap = providedMarkersMap;
      if (!UsjReaderWriter.areUsjVersionsCompatible(this.usj.version, this.markersMap.version))
        console.warn(
          `Warning: USJ for book ${this.getBookIdForLogging()} has version ${this.usj.version}, but provided markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.`
        );
    } else if (UsjReaderWriter.areUsjVersionsCompatible(this.usj.version, USFM_MARKERS_MAP.version))
      this.markersMap = USFM_MARKERS_MAP;
    else
      throw new Error(
        "USJ version is not 3.0 or 3.0.x! Not equipped to handle yet without passing in a markers map"
      );
    if (!this.markersMap.markersMapVersion.startsWith("1."))
      throw new Error(
        `Incompatible markers map version: ${this.markersMap.markersMapVersion}. This class only supports version 1.x.y`
      );
    this.shouldAllowInvisibleCharacters = shouldAllowInvisibleCharacters ?? false;
  }
  // If new variables are created to speed up queries, they should be reset here. `reportedProblems`
  // is not a query cache and is deliberately kept; see its doc
  usjChanged() {
    this.parentMapInternal = void 0;
    this.fragmentsByIndexInUsfmInternal = void 0;
    this.fragmentsByJsonPathInternal = void 0;
    this.indicesInUsfmByVerseRefInternal = void 0;
    this.usfmInternal = void 0;
  }
  static areUsjVersionsCompatible(versionA, versionB) {
    if (versionA === "3.0" || versionA.startsWith("3.0."))
      return versionB === "3.0" || versionB.startsWith("3.0.");
    return versionA === versionB;
  }
  // #region Reporting problems with the document
  /**
   * The book this document is for, for naming it in a log message.
   *
   * Reads the book marker straight off the top level of the content already in memory and stops at
   * the first one, so it costs nothing beyond that scan and does not walk into nested content. Only
   * call it on a path that is about to log — there is no reason to look for the book otherwise.
   *
   * @returns The book code, or {@link NO_BOOK_ID} if the document does not carry one
   */
  getBookIdForLogging() {
    var _a;
    const bookMarker = (_a = this.usj.content) == null ? void 0 : _a.find(
      (node) => typeof node !== "string" && node.type === BOOK_TYPE && !!node.code
    );
    return (bookMarker == null ? void 0 : bookMarker.code) ?? NO_BOOK_ID;
  }
  /**
   * Reports `message`, unless an identical message has already been reported by this instance. See
   * {@link reportedProblems} for why repeats are dropped.
   *
   * Defaults to `warn` because these describe a document that is malformed or that this class had
   * to reinterpret. Pass `debug` for problems that are normal in a well-formed document.
   *
   * @param message Message to report
   * @param level Console level to report at. Defaults to `warn`
   */
  reportProblemOnce(message, level = "warn") {
    if (this.reportedProblems.has(message)) return;
    this.reportedProblems.add(message);
    if (level === "debug") console.debug(message);
    else console.warn(message);
  }
  // #endregion Reporting problems with the document
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(jsonPathQuery) {
    const wrappedResults = jsonpathPlus.JSONPath({ path: jsonPathQuery, json: this.usj, wrap: true });
    if (wrappedResults === void 0 || wrappedResults.length === 0) return void 0;
    if (!Array.isArray(wrappedResults[0])) return wrappedResults[0];
    const unwrappedResults = jsonpathPlus.JSONPath({ path: jsonPathQuery, json: this.usj, wrap: false });
    if (unwrappedResults.length === 1 && Array.isArray(unwrappedResults[0]))
      return unwrappedResults[0];
    return unwrappedResults;
  }
  findParent(jsonPathQuery) {
    return this.findSingleValue(`${jsonPathQuery}^`);
  }
  // #endregion Directly using the JSONPath package to perform JSONPath query -> USJ node
  // #region marker helper methods
  /**
   * Determine if the passed in marker is the top-level USJ marker.
   *
   * Note that USJ markers that are not the top-level USJ markers technically should not occur, but
   * they can occur. We should treat them like any other marker. They conform to
   * {@link MarkerObject}, so it's not hard to do.
   *
   * @param marker Marker to test if it is USJ marker
   * @returns `true` if it is a USJ marker; false otherwise
   */
  static isTopLevelUsjMarker(marker, workingStack) {
    return typeof marker === "object" && marker.type === scriptureUtilities.USJ_TYPE && workingStack.length === 0;
  }
  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  static isFragmentAMarker(fragment) {
    return !scriptureUtil.isString(fragment) && !("forMarker" in fragment);
  }
  // #endregion marker helper methods
  // #region Parent Maps
  static createParentMapInternal(obj, parent, parentMap) {
    var _a;
    parentMap.set(obj, parent);
    if (obj.content) parentMap.set(obj.content, obj);
    (_a = obj.content) == null ? void 0 : _a.forEach((child) => {
      if (typeof child === "object") UsjReaderWriter.createParentMapInternal(child, obj, parentMap);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const parentMap = /* @__PURE__ */ new Map();
    if (this.usj.content) parentMap.set(this.usj.content, this.usj);
    this.usj.content.forEach((content) => {
      if (typeof content === "object")
        UsjReaderWriter.createParentMapInternal(content, this.usj, parentMap);
    });
    return parentMap;
  }
  /** Create the parent map if it doesn't already exist and return it */
  get parentMap() {
    if (this.parentMapInternal) return this.parentMapInternal;
    this.parentMapInternal = this.createUsjParentMap();
    return this.parentMapInternal;
  }
  // #endregion Parent Maps
  // #region Working Stacks
  /**
   * Checks if two stack items are equal using shallow equivalence, testing the stack item
   * properties for [strict
   * equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
   *
   * Note that this requires the parent of the two stack items to have reference equality
   */
  static areStackItemsShallowEqual(a, b) {
    return a.index === b.index && a.parent === b.parent;
  }
  /** Return the working stack applicable to the given node */
  createWorkingStack(node) {
    const workingStack = [];
    const { parentMap } = this;
    let tempNode = node;
    let tempParent = parentMap.get(tempNode);
    while (tempParent !== void 0) {
      if (!tempParent.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !tempParent.content.find((tempChild, index) => {
          if (tempChild !== tempNode) return false;
          if (!tempParent) throw new Error('undefined "tempParent" should not be possible');
          workingStack.unshift({ parent: tempParent, index });
          return true;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(tempNode)}`);
      tempNode = tempParent;
      tempParent = parentMap.get(tempParent);
    }
    return workingStack;
  }
  /**
   * Transform a JSONPath array (`JSONPath.toPathArray`) to a "normalized" JSONPath. We can use this
   * JSONPath for lookups in {@link FragmentsByJsonPath}
   */
  static jsonPathArrayToJsonPath(pathArray) {
    return pathArray.reduce((pathAcc, pathEntry) => {
      if (pathEntry === "content") return `${pathAcc}.${pathEntry}`;
      if (!Number.isNaN(parseInt(pathEntry, 10))) return `${pathAcc}[${pathEntry}]`;
      return `${pathAcc}['${pathEntry}']`;
    });
  }
  /** "Normalize" the JSONPath passed in so we can use it for lookups in {@link FragmentsByJsonPath} */
  static normalizeJsonPath(jsonPath) {
    const pathArray = jsonpathPlus.JSONPath.toPathArray(jsonPath);
    return UsjReaderWriter.jsonPathArrayToJsonPath(pathArray);
  }
  /**
   * Returns a "normalized" JSONPath transformed from the working stack. We can use this JSONPath
   * for lookups in {@link FragmentsByJsonPath}
   */
  static convertWorkingStackToJsonPath(stack) {
    let jsonPath = "$";
    stack.forEach((stackLevel) => {
      jsonPath = `${jsonPath}.content[${stackLevel.index}]`;
    });
    return jsonPath;
  }
  /**
   * Returns a "normalized" JSONPath transformed from the working stack and property. We can use
   * this JSONPath for lookups in {@link FragmentsByJsonPath}
   */
  static convertWorkingStackAndPropertyToJsonPath(stack, property) {
    return `${UsjReaderWriter.convertWorkingStackToJsonPath(stack)}['${property}']`;
  }
  convertJsonPathToWorkingStack(jsonPath) {
    const retVal = [];
    if (jsonPath === "$") return retVal;
    const levels = jsonPath.match(/content\[(\d+)\]/g);
    if (!levels) throw new Error(`Malformed or unexpected jsonPath: ${jsonPath}`);
    let onNode = this.usj;
    levels.forEach((level, onLevel) => {
      const indexString = /(\d+)/.exec(level);
      if (!indexString) throw new Error(`Malformed or unexpected jsonPath: ${jsonPath}`);
      const index = parseInt(indexString[0], 10);
      retVal.push({ parent: onNode, index });
      if (onLevel + 1 < levels.length) {
        if (typeof onNode === "string" || !onNode.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(onNode)}`);
        const nextNode = onNode.content[index];
        if (typeof nextNode === "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(nextNode)}`);
        onNode = nextNode;
      }
    });
    return retVal;
  }
  // #endregion Working Stacks
  // #region Walk the node tree
  /**
   * Extract textual notes (aka, "footnotes") from a full USJ object.
   *
   * @returns An array of MarkerObjects representing all textual notes found in the USJ content.
   */
  findAllNotes() {
    var _a;
    return extractFootnotesFromUsjContent((_a = this.usj) == null ? void 0 : _a.content);
  }
  /**
   * Look through the USJ document for a node or the closing of a node matching some condition. This
   * will run `searchFunction` for `node`, all nodes encountered in `node.contents` (recursively),
   * when `node` closes, and all nodes after `node`
   *
   * @param node Node from which to start looking
   * @param workingStack Working stack pointing to this node (should not include this node)
   * @param skipTypes List of marker types to skip (skips all contents of skipped markers)
   * @param searchFunction Function that nodes and representations of the closing of nodes will be
   *   passed into to determine if they are the correct node or representation of the closing of a
   *   node. Stops searching and returns the node/close if this function returns `true`
   * @returns Node or representation of the closing of a node matching condition tested by the
   *   search function
   */
  static findNextMatchingNodeOrClosingFragmentUsingWorkingStack(node, workingStack, skipTypes, searchFunction) {
    var _a;
    let nextNode = node;
    const topNode = workingStack.length === 0 ? node : workingStack[0].parent;
    if (!scriptureUtil.isString(topNode)) {
      if (skipTypes.includes(topNode.type)) return void 0;
      let highestSkippedNode;
      workingStack.some((stackItem) => {
        const stackNode = stackItem.parent.content[stackItem.index];
        if (!scriptureUtil.isString(stackNode) && skipTypes.includes(stackNode.type)) {
          highestSkippedNode = stackNode;
          return true;
        }
        return false;
      });
      if (highestSkippedNode) nextNode = highestSkippedNode;
    }
    while (nextNode !== void 0) {
      const skipNextNode = typeof nextNode === "object" && skipTypes.includes(nextNode.type);
      if (!skipNextNode && searchFunction(nextNode, workingStack)) return nextNode;
      if (!skipNextNode && typeof nextNode === "object" && (((_a = nextNode.content) == null ? void 0 : _a.length) ?? 0) > 0) {
        workingStack.push({ parent: nextNode, index: 0 });
        [nextNode] = nextNode.content;
      } else {
        if (!skipNextNode) {
          const nextNodeClosingMarker = typeof nextNode === "object" ? { isClosingMarker: true, forMarker: nextNode } : void 0;
          if (nextNodeClosingMarker && searchFunction(nextNodeClosingMarker, workingStack))
            return nextNodeClosingMarker;
        }
        nextNode = void 0;
        while (workingStack.length > 0) {
          const nextLevel = workingStack.pop();
          if (nextLevel) {
            if (nextLevel.index + 1 < nextLevel.parent.content.length) {
              nextLevel.index += 1;
              workingStack.push(nextLevel);
              nextNode = nextLevel.parent.content[nextLevel.index];
              break;
            } else {
              const parentClosingMarker = {
                isClosingMarker: true,
                forMarker: nextLevel.parent
              };
              if (searchFunction(parentClosingMarker, workingStack)) return parentClosingMarker;
            }
          }
        }
      }
    }
    return void 0;
  }
  /**
   * Look through the USJ document for a node matching some condition
   *
   * @param node Node from which to start looking
   * @param workingStack Working stack pointing to this node (should not include this node)
   * @param skipTypes List of marker types to skip (skips all contents of skipped markers)
   * @param searchFunction Function that nodes will be passed into to determine if they are the
   *   correct node. Stops searching and returns the node if this function returns `true`
   * @returns Node matching condition tested by the search function
   */
  static findNextMatchingNodeUsingWorkingStack(node, workingStack, skipTypes, searchFunction) {
    const result = this.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      node,
      workingStack,
      skipTypes,
      (potentiallyMatchingNodeOrClose, currentWorkingStack) => {
        if (typeof potentiallyMatchingNodeOrClose === "object" && "isClosingMarker" in potentiallyMatchingNodeOrClose)
          return false;
        return searchFunction(potentiallyMatchingNodeOrClose, currentWorkingStack);
      }
    );
    return result;
  }
  findNextMatchingNode(nodeAndLocation, searchFunction) {
    const startingWorkingStack = this.convertJsonPathToWorkingStack(
      nodeAndLocation.documentLocation.jsonPath
    );
    let matchingWorkingStack = startingWorkingStack;
    const matchingNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      nodeAndLocation.node,
      startingWorkingStack,
      [],
      (node, stack) => {
        matchingWorkingStack = stack;
        return searchFunction({
          node,
          documentLocation: UsjReaderWriter.convertNodeToUsjDocumentLocation(node, stack)
        });
      }
    );
    if (matchingNode === void 0) return void 0;
    return {
      node: matchingNode,
      documentLocation: UsjReaderWriter.convertNodeToUsjDocumentLocation(
        matchingNode,
        matchingWorkingStack
      )
    };
  }
  // #endregion Walk the node tree
  // #region Node -> JSONPath
  nodeToJsonPath(node) {
    return UsjReaderWriter.convertWorkingStackToJsonPath(this.createWorkingStack(node));
  }
  // #endregion Node -> JSONPath
  // #region USJ node -> SerializedVerseRef + offset in USFM
  nodeToUsfmVerseRefVerseLocation(node, nodeParent, bookIdIfNotFound) {
    const { documentLocation: usjLocation } = this.nodeToUsjNodeAndDocumentLocation(
      node,
      nodeParent
    );
    return this.usjDocumentLocationToUsfmVerseRefVerseLocation(usjLocation, bookIdIfNotFound);
  }
  // #endregion USJ node -> SerializedVerseRef + offset in USFM
  // #region USJ node -> USJ location
  nodeToUsjNodeAndDocumentLocation(node, nodeParent) {
    var _a;
    let workingStack;
    if (scriptureUtil.isString(node)) {
      if (nodeParent === void 0)
        throw new Error(`If "node" is a string, then "nodeParent" cannot be undefined`);
      const realParent = Array.isArray(nodeParent) ? this.parentMap.get(nodeParent) : nodeParent;
      if (realParent === void 0)
        throw new Error(`Cannot find parent for ${JSON.stringify(nodeParent)}`);
      workingStack = this.createWorkingStack(realParent);
      const nodeIndexInParent = (_a = realParent.content) == null ? void 0 : _a.indexOf(node);
      if (nodeIndexInParent === void 0 || nodeIndexInParent < 0)
        throw new Error(`Could not find index of node in parent for creating working stack`);
      workingStack.push({ parent: realParent, index: nodeIndexInParent });
    } else {
      workingStack = this.createWorkingStack(node);
    }
    const usjLocation = UsjReaderWriter.convertNodeToUsjDocumentLocation(node, workingStack);
    return {
      node,
      documentLocation: usjLocation
    };
  }
  // #endregion USJ node -> USJ location
  // #region JSONPath > USJ location
  /**
   * Finds the node associated with the JSONPath provided, and also gets the parent of the node if
   * the node is a string. This is helpful so you can find a real object that is actually somewhere
   * in the USJ document from the JSONPath
   *
   * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data. If
   *   the expression matches more than one node, then only the first node found is considered.
   * @returns First node found at the JSONPath and the parent of that node _if_ the node is a
   *   string. Note that the object returned is the actual object in the USJ document.
   */
  jsonPathToNodeAndParentIfString(jsonPathQuery) {
    const target = this.findSingleValue(jsonPathQuery);
    if (!target) throw new Error(`No result found for JSONPath query: ${jsonPathQuery}`);
    const parent = scriptureUtil.isString(target) ? this.findParent(jsonPathQuery) : void 0;
    if (!parent && scriptureUtil.isString(target))
      throw new Error(`Could not determine parent for ${jsonPathQuery}`);
    return {
      node: target,
      parent
    };
  }
  /**
   * Finds the node associated with the JSONPath provided and the location of that node.
   *
   * A string is located by the path it was found at, not by looking its value up in its parent, so
   * a string with an identical sibling resolves to the one the path names. A property value (such
   * as `$.content[3]['marker']`) is not content and does not resolve.
   *
   * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data
   * @returns The node and its location
   * @throws If the query names nothing, or names a property value
   */
  jsonPathToNodeAndLocation(jsonPathQuery) {
    const { node, parent } = this.jsonPathToNodeAndParentIfString(jsonPathQuery);
    if (!scriptureUtil.isString(node)) return this.nodeToUsjNodeAndDocumentLocation(node);
    if (!Array.isArray(parent))
      throw new Error(`JSONPath query names a property value, not content: ${jsonPathQuery}`);
    if (!/^\$(\.content\[\d+\])+$/.test(jsonPathQuery))
      return this.nodeToUsjNodeAndDocumentLocation(node, parent);
    const workingStack = this.convertJsonPathToWorkingStack(jsonPathQuery);
    return {
      node,
      documentLocation: UsjReaderWriter.convertNodeToUsjDocumentLocation(node, workingStack)
    };
  }
  jsonPathToUsjNodeAndDocumentLocation(jsonPathQuery) {
    return this.jsonPathToNodeAndLocation(jsonPathQuery);
  }
  // #endregion JSONPath > USJ location
  // #region JSONPath or USJ location -> SerializedVerseRef + offset in USFM
  jsonPathToUsfmVerseRefVerseLocation(jsonPathQuery, bookIdIfNotFound) {
    const { documentLocation } = this.jsonPathToNodeAndLocation(jsonPathQuery);
    return this.usjDocumentLocationToUsfmVerseRefVerseLocation(documentLocation, bookIdIfNotFound);
  }
  usjDocumentLocationToUsfmVerseRefVerseLocation(usjLocation, bookIdIfNotFound) {
    const fragmentInfo = this.findFragmentInfoAtUsjDocumentLocation(usjLocation);
    if (fragmentInfo === void 0)
      throw new Error(
        `Could not find fragment info at USJ document location while transforming to USFM verse location: ${JSON.stringify(
          usjLocation
        )}`
      );
    const verseRef = this.getVerseRefForIndexInUsfm(fragmentInfo.indexInUsfm, bookIdIfNotFound);
    const verseIndexInUsfm = this.getIndexInUsfmForVerseRef(verseRef);
    return {
      verseRef,
      // Final USFM verse offset is the fragment's location relative to the verse plus whatever
      // offset is in the USJ location
      offset: fragmentInfo.indexInUsfm - verseIndexInUsfm + UsjReaderWriter.getOffsetInUsjDocumentLocation(usjLocation)
    };
  }
  // #endregion JSONPath or USJ location -> SerializedVerseRef + offset in USFM
  // #region Handling VerseRefs
  /**
   * Gets the book ID in the internal USJ document data corresponding to the book ID passed in.
   *
   * @param bookId The book ID to look up data in the USJ document for
   * @returns If there isn't a book ID in the USJ document, {@link NO_BOOK_ID} will be returned
   * @throws If the requested book is not found in the USJ data and there are other books
   * @throws If there is no USJ content in the document whatsoever
   */
  getEffectiveBookId(bookId) {
    const availableBookIds = Object.keys(this.indicesInUsfmByVerseRef);
    const noBookIdsFound = availableBookIds.length === 0 || availableBookIds.length === 1 && availableBookIds[0] === NO_BOOK_ID;
    const effectiveBookId = noBookIdsFound ? NO_BOOK_ID : bookId;
    const bookIndices = this.indicesInUsfmByVerseRef[effectiveBookId];
    if (!bookIndices)
      throw new Error(
        `Book ID ${bookId} not found in USJ! ${noBookIdsFound ? `There seems to be no USJ content because there is no content in ${NO_BOOK_ID} either` : `Book IDs in USJ: ${JSON.stringify(availableBookIds)}`}`
      );
    return effectiveBookId;
  }
  /**
   * Gets the index in USFM of the start of the verse (the backslash on the verse marker or the
   * beginning of the chapter if verse 0 is provided)
   */
  getIndexInUsfmForVerseRef(verseRef) {
    const bookId = this.getEffectiveBookId(verseRef.book);
    const bookIndices = this.indicesInUsfmByVerseRef[bookId];
    const chapterIndices = bookIndices[verseRef.chapterNum];
    if (!chapterIndices) throw new Error(`Could not find ${bookId} chapter ${verseRef.chapterNum}`);
    const verseIndexInUsfm = chapterIndices[verseRef.verseNum];
    if (verseIndexInUsfm === void 0)
      throw new Error(`Verse ${verseRef.verseNum} not found in ${bookId} ${verseRef.chapterNum}`);
    return verseIndexInUsfm;
  }
  /**
   * Gets the verse ref that the provided index in USFM is in (including verse range if applicable).
   * Finds the closest verse ref before the index in USFM.
   *
   * @param indexInUsfm The index in USFM from the beginning of this document
   * @param bookIdIfNotFound 3-letter ID of the book this USJ document is in (only used if a book ID
   *   is not found in the USJ document)
   * @returns Closest verse reference before or at the index in USFM
   * @throws If not able to find a book ID in the USJ document and `bookIdIfNotFound` is not
   *   provided
   */
  getVerseRefForIndexInUsfm(indexInUsfm, bookIdIfNotFound) {
    const bookEntries = Object.entries(this.indicesInUsfmByVerseRef);
    let bookIndex = 0;
    let lastVerseRef;
    let didFindVerseRef = false;
    while (!didFindVerseRef && bookIndex < bookEntries.length) {
      const [bookId, chapterIndices] = bookEntries[bookIndex];
      if (chapterIndices) {
        const chapterEntries = Object.entries(chapterIndices);
        let chapterIndex = 0;
        while (!didFindVerseRef && chapterIndex < chapterEntries.length) {
          const [chapterNumString, verseIndices] = chapterEntries[chapterIndex];
          if (verseIndices) {
            const verseEntries = Object.entries(verseIndices);
            let verseIndex = 0;
            while (!didFindVerseRef && verseIndex < verseEntries.length) {
              const [verseNumString, verseIndexInUsfm2] = verseEntries[verseIndex];
              if (verseIndexInUsfm2 !== void 0) {
                if (indexInUsfm < verseIndexInUsfm2) {
                  if (!lastVerseRef)
                    throw new Error(
                      `Could not find verse ref for index in USFM ${indexInUsfm} less than the first known index ${verseIndexInUsfm2}`
                    );
                  didFindVerseRef = true;
                  break;
                }
                lastVerseRef = {
                  book: bookId,
                  chapterNum: parseInt(chapterNumString, 10),
                  verseNum: parseInt(verseNumString, 10)
                };
                if (indexInUsfm === verseIndexInUsfm2) {
                  didFindVerseRef = true;
                  break;
                }
              }
              verseIndex += 1;
            }
          }
          chapterIndex += 1;
        }
      }
      bookIndex += 1;
    }
    if (!lastVerseRef)
      throw new Error(`Did not find any verse refs while looking for index in USFM ${indexInUsfm}`);
    if (lastVerseRef.book === NO_BOOK_ID) {
      if (!bookIdIfNotFound)
        throw new Error(
          `Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM ${indexInUsfm}`
        );
      lastVerseRef.book = bookIdIfNotFound;
    }
    const verseIndexInUsfm = this.getIndexInUsfmForVerseRef(lastVerseRef);
    const verseFragmentInfo = this.fragmentsByIndexInUsfm.get(verseIndexInUsfm);
    if (verseFragmentInfo && UsjReaderWriter.isFragmentAMarker(verseFragmentInfo.fragment) && verseFragmentInfo.fragment.type === VERSE_TYPE && verseFragmentInfo.fragment.number && verseFragmentInfo.fragment.number !== `${lastVerseRef.verseNum}`)
      lastVerseRef.verse = verseFragmentInfo.fragment.number;
    return lastVerseRef;
  }
  usfmVerseLocationToIndexInUsfm(usfmVerseLocation) {
    const { verseRef, offset: verseRefOffset } = UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(usfmVerseLocation);
    if (verseRefOffset < 0) throw new Error("offset must be >= 0");
    const verseIndexInUsfm = this.getIndexInUsfmForVerseRef(verseRef);
    const usfmVerseLocationIndexInUsfm = verseIndexInUsfm + verseRefOffset;
    return usfmVerseLocationIndexInUsfm;
  }
  // #endregion Handling VerseRefs
  // #region transforming location types to different types
  /**
   * Transforms a USFM verse-based location into a single standardized format of USFM verse-based
   * location for ease of accessing the location's properties
   *
   * @param usfmVerseLocation USFM verse-based location in one of multiple forms
   * @returns USFM verse-based location in one particular form. Also ensures `offset` is defined
   *   (defaults to 0 as described in {@link UsfmVerseLocation})
   */
  static usfmVerseLocationToUsfmVerseRefVerseLocation(usfmVerseLocation) {
    if ("verseRef" in usfmVerseLocation) {
      return {
        verseRef: usfmVerseLocation.verseRef,
        offset: usfmVerseLocation.offset ?? 0
      };
    }
    if ("scrRef" in usfmVerseLocation) {
      return {
        verseRef: usfmVerseLocation.scrRef,
        offset: usfmVerseLocation.offset ?? 0
      };
    }
    return {
      verseRef: usfmVerseLocation,
      offset: 0
    };
  }
  /**
   * Type guard to check if a location is a {@link UsjChapterLocation} rather than a
   * {@link UsjBookLocation} or {@link UsfmVerseLocation}.
   *
   * @param location The location to check
   * @returns `true` if the location is a {@link UsjChapterLocation}
   */
  static isUsjChapterLocation(location) {
    if ("verseRef" in location && "documentLocation" in location && (!location.granularity || location.granularity === "chapter")) {
      return true;
    }
    if ("book" in location && "chapterNum" in location && ("documentLocation" in location || "jsonPath" in location)) {
      return true;
    }
    return false;
  }
  /**
   * Transforms a USJ chapter-based location into a single standardized format of USJ chapter-based
   * location for ease of accessing the location's properties
   *
   * @param usjChapterLocation USJ chapter-based location in one of multiple forms
   * @returns USJ chapter-based location in one particular form.
   * @throws If erroneously received a {@link UsjBookLocation}, not a {@link UsjChapterLocation}.
   *   Cannot statically transform between those because there is no way to know how to change the
   *   JSONPath
   */
  static usjChapterLocationToUsjVerseRefChapterLocation(usjChapterLocation) {
    if ("jsonPath" in usjChapterLocation) {
      if (usjChapterLocation.offset !== void 0)
        return {
          verseRef: {
            book: usjChapterLocation.book,
            chapterNum: usjChapterLocation.chapterNum,
            verseNum: 0
          },
          granularity: "chapter",
          documentLocation: {
            jsonPath: usjChapterLocation.jsonPath,
            offset: usjChapterLocation.offset
          }
        };
      return {
        verseRef: {
          book: usjChapterLocation.book,
          chapterNum: usjChapterLocation.chapterNum,
          verseNum: 0
        },
        granularity: "chapter",
        documentLocation: {
          jsonPath: usjChapterLocation.jsonPath
        }
      };
    }
    if ("verseRef" in usjChapterLocation) {
      if (
        // Make sure we are receiving a chapter location, not a book location
        usjChapterLocation.granularity !== void 0 && usjChapterLocation.granularity !== "chapter"
      )
        throw new Error(
          "Received UsjVerseRefBookLocation! Cannot statically transform JSONPath from book-relative to chapter-relative"
        );
      return usjChapterLocation;
    }
    if (usjChapterLocation.chapterNum === void 0)
      throw new Error(
        "Received UsjFlatBookLocation! Cannot statically transform JSONPath from book-relative to chapter-relative"
      );
    return {
      verseRef: {
        book: usjChapterLocation.book,
        chapterNum: usjChapterLocation.chapterNum,
        verseNum: 0
      },
      granularity: "chapter",
      documentLocation: usjChapterLocation.documentLocation
    };
  }
  /**
   * Transforms a USJ book-based location into a single standardized format of USJ book-based
   * location for ease of accessing the location's properties
   *
   * @param usjBookLocation USJ book-based location in one of multiple forms
   * @returns USJ book-based location in one particular form.
   * @throws If erroneously received a {@link UsjChapterLocation}, not a {@link UsjBookLocation}.
   *   Cannot statically transform between those because there is no way to know how to change the
   *   JSONPath
   */
  static usjBookLocationToUsjVerseRefBookLocation(usjBookLocation) {
    if ("verseRef" in usjBookLocation) {
      if (
        // Make sure we are receiving a book location, not a chapter location
        usjBookLocation.granularity !== "book"
      )
        throw new Error(
          "Received UsjVerseRefChapterLocation! Cannot statically transform JSONPath from chapter-relative to book-relative"
        );
      return usjBookLocation;
    }
    if ("chapterNum" in usjBookLocation)
      throw new Error(
        "Received UsjFlatChapterLocation! Cannot statically transform JSONPath from chapter-relative to book-relative"
      );
    return {
      verseRef: {
        book: usjBookLocation.book,
        chapterNum: 1,
        verseNum: 0
      },
      granularity: "book",
      documentLocation: usjBookLocation.documentLocation
    };
  }
  // #endregion transforming location types to different types
  // #region USFM location -> USJ location
  usfmVerseLocationToUsjNodeAndDocumentLocation(usfmVerseLocation) {
    const { verseRef, offset: verseRefOffset } = UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(usfmVerseLocation);
    const usfmVerseLocationIndexInUsfm = this.usfmVerseLocationToIndexInUsfm(usfmVerseLocation);
    const { value: fragmentInfo } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      usfmVerseLocationIndexInUsfm
    ) ?? {
      value: void 0
    };
    if (!fragmentInfo)
      throw new Error(
        `Somehow, did not find anything at index in verse ${verseRefOffset} or below in ${verseRef.book} ${verseRef.chapterNum}:${verseRef.verseNum}. Not sure how this would happen.`
      );
    const usjOffset = usfmVerseLocationIndexInUsfm - fragmentInfo.indexInUsfm;
    return {
      ...fragmentInfo.nodeAndDocumentLocation,
      documentLocation: UsjReaderWriter.moveUsjDocumentLocationToNewOffset(
        fragmentInfo.nodeAndDocumentLocation.documentLocation,
        usjOffset
      )
    };
  }
  usfmVerseLocationToUsjDocumentLocation(usfmVerseLocation) {
    return this.usfmVerseLocationToUsjNodeAndDocumentLocation(usfmVerseLocation).documentLocation;
  }
  static isUsjDocumentLocationForTextContent(usjDocumentLocationMaybeNode) {
    let documentLocation = usjDocumentLocationMaybeNode;
    if ("node" in usjDocumentLocationMaybeNode) {
      if (!scriptureUtil.isString(usjDocumentLocationMaybeNode.node)) return false;
      documentLocation = usjDocumentLocationMaybeNode.documentLocation;
    }
    if (!("jsonPath" in documentLocation)) return false;
    return "offset" in documentLocation;
  }
  static isUsjDocumentLocationForNode(usjDocumentLocationMaybeNode) {
    let documentLocation = usjDocumentLocationMaybeNode;
    if ("node" in usjDocumentLocationMaybeNode) {
      if (scriptureUtil.isString(usjDocumentLocationMaybeNode.node))
        return UsjReaderWriter.isUsjDocumentLocationForTextContent(usjDocumentLocationMaybeNode);
      documentLocation = usjDocumentLocationMaybeNode.documentLocation;
    }
    if (!("jsonPath" in documentLocation)) return false;
    if ("closingMarkerOffset" in documentLocation) return false;
    if ("propertyOffset" in documentLocation) return false;
    if ("keyName" in documentLocation) return false;
    if ("keyOffset" in documentLocation) return false;
    if ("keyClosingMarkerOffset" in documentLocation) return false;
    return true;
  }
  // #endregion UsjDocumentLocation utilities
  // #region Search for text from a certain point
  usfmVerseLocationToNextTextLocation(usfmVerseLocation) {
    const verseLocation = this.usfmVerseLocationToUsjNodeAndDocumentLocation(usfmVerseLocation);
    const firstStringLocationAfterVerseMarker = this.findNextLocationOfMatchingText(
      verseLocation,
      ""
    );
    if (!firstStringLocationAfterVerseMarker)
      throw new Error(
        `Could not find next text location after verse ${JSON.stringify(usfmVerseLocation)} at location ${verseLocation.documentLocation.jsonPath}`
      );
    return firstStringLocationAfterVerseMarker;
  }
  findNextLocationOfMatchingText(startingPoint, text, maxTextLengthToSearch = 1e3) {
    let textScanned = "";
    let lengthScanned = 0;
    let lengthTrimmed = 0;
    let foundStartingAtOffset = -1;
    const workingStackForStartingPoint = this.convertJsonPathToWorkingStack(
      startingPoint.documentLocation.jsonPath
    );
    const startingPointStackItem = workingStackForStartingPoint.length > 0 ? {
      ...workingStackForStartingPoint[workingStackForStartingPoint.length - 1]
    } : void 0;
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      startingPoint.node,
      workingStackForStartingPoint,
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, workingStack) => {
        if (typeof node !== "string") return false;
        let nodeTextToSearch = node;
        const currentStackItem = workingStack[workingStack.length - 1];
        if (startingPointStackItem && UsjReaderWriter.areStackItemsShallowEqual(currentStackItem, startingPointStackItem)) {
          if (!("offset" in startingPoint.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(startingPoint.documentLocation)}`
            );
          nodeTextToSearch = node.substring(startingPoint.documentLocation.offset);
          lengthTrimmed += startingPoint.documentLocation.offset;
        }
        lengthScanned += nodeTextToSearch.length;
        textScanned = `${textScanned}${nodeTextToSearch}`;
        const textIndex = textScanned.indexOf(text);
        if (textIndex < 0) {
          lengthTrimmed += textScanned.length;
          if (textScanned.length > text.length)
            textScanned = textScanned.substring(textScanned.length - text.length);
          lengthTrimmed -= textScanned.length;
          return lengthScanned > maxTextLengthToSearch;
        }
        foundStartingAtOffset = lengthTrimmed + textIndex;
        return true;
      }
    );
    if (foundStartingAtOffset < 0) return void 0;
    lengthScanned = 0;
    let finalOffset = 0;
    let finalStack = [];
    const finalNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      startingPoint.node,
      this.convertJsonPathToWorkingStack(startingPoint.documentLocation.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, stack) => {
        if (typeof node !== "string") return false;
        lengthScanned += node.length;
        if (lengthScanned < foundStartingAtOffset + 1) return false;
        finalOffset = foundStartingAtOffset - lengthScanned + node.length;
        finalStack = stack;
        return true;
      }
    );
    if (!finalNode) throw new Error("Internal error: inconsistent search results");
    if (!scriptureUtil.isString(finalNode))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(finalNode)}`
      );
    return {
      node: finalNode,
      documentLocation: {
        jsonPath: UsjReaderWriter.convertWorkingStackToJsonPath(finalStack),
        offset: finalOffset
      }
    };
  }
  /**
   * Builds a mapping array where `map[nfdIndex]` gives the corresponding index in the original
   * string. Used to convert regex match positions from NFD-normalized text back to positions in the
   * original string.
   *
   * The map has `nfd.length + 1` entries to handle the end position of a regex match. A regex match
   * end position points one past the last matched character — so a match covering an entire string
   * of length N has end position N, not N-1. That means `match.end` can equal `nfd.length`, which
   * would be out-of-bounds for an array of size `nfd.length`. The extra entry covers this case; it
   * is pre-filled with `original.length`, which is the correct end position in the original
   * string.
   */
  static buildNFDToOriginalPositionMap(original) {
    const normalizedString = original.normalize("NFD");
    const nfdToOriginalPosition = new Array(normalizedString.length + 1).fill(
      original.length
    );
    let normalizedPosition = 0;
    let originalPosition = 0;
    Array.from(original).forEach((char) => {
      const charNormalized = char.normalize("NFD");
      Array.from({ length: charNormalized.length }).forEach((_, k) => {
        nfdToOriginalPosition[normalizedPosition + k] = originalPosition;
      });
      normalizedPosition += charNormalized.length;
      originalPosition += char.length;
    });
    return nfdToOriginalPosition;
  }
  /**
   * Returns the innermost block-level ancestor for the node a working stack points at, or
   * `undefined` when the node has none. Reads `parent` only: the walk mutates each stack item's
   * `index` and pushes/pops the array, but never reassigns `parent`, so the returned object is
   * stable for as long as the caller needs it.
   */
  static findNearestBlockAncestor(workingStack) {
    for (let i = workingStack.length - 1; i >= 0; i--) {
      const { parent } = workingStack[i];
      if (parent && "type" in parent && BLOCK_LEVEL_NODE_TYPES.includes(parent.type)) return parent;
    }
    return void 0;
  }
  /**
   * Returns the next position at or after `index` that a `u`-flag regex can actually resume from:
   * one whole code point past `index`.
   *
   * Advancing a single UTF-16 code unit is not enough. Under the `u` flag a `lastIndex` that lands
   * between a surrogate pair's two halves is snapped back to the pair's start by the engine, so the
   * next `exec` returns the identical match and the loop makes no progress — an unbounded hang on
   * any text in a supplementary-plane script such as Adlam.
   *
   * @param text Text being searched
   * @param index Position to advance from
   */
  static advancePastCodePoint(text, index) {
    const codePoint = text.codePointAt(index);
    if (codePoint === void 0) return index + 1;
    return index + (codePoint > 65535 ? 2 : 1);
  }
  /**
   * True when either end of an NFD match falls inside a character: between two NFD code units that
   * came from the same original code point, or inside a Hangul syllable the source text stores
   * decomposed.
   *
   * The position map sends every part of a split character to that character's start, so such a
   * match would be shorter than, or shifted from, what Find displays, and Replace would insert
   * instead of replacing. A decomposed syllable has no single original code point to compare, and
   * Replace would leave its remaining jamo behind in the text. Widening the match to the whole
   * character is wrong: the leftover parts can be letters (Hangul jamo), not diacritics.
   *
   * @param matchStart Index of the match start in the NFD text
   * @param matchEnd Index just past the match end in the NFD text
   * @param searchText NFD text the match was found in
   * @param nfdToOriginalMap Position map from {@link buildNFDToOriginalPositionMap}
   */
  static isMatchInsideCharacter(matchStart, matchEnd, searchText, nfdToOriginalMap) {
    const isInsideCharacter = (index) => index > 0 && index < searchText.length && (nfdToOriginalMap[index - 1] === nfdToOriginalMap[index] || HANGUL_SYLLABLE_CONTINUATION_REGEXP.test(searchText[index]));
    return isInsideCharacter(matchStart) || isInsideCharacter(matchEnd);
  }
  /**
   * True when a match must be discarded because one of its whitespace groups matched zero
   * characters somewhere other than a block boundary. A group that matched real whitespace is
   * always acceptable, and so is a group that did not participate in the match.
   *
   * @param match Match to inspect. Must come from a regex with the `d` flag so group offsets exist.
   * @param blockBoundaryOffsets Offsets into the original concatenated text that are block
   *   boundaries
   * @param nfdToOriginalMap Position map when the search text was NFD-normalized, else `undefined`
   * @throws If `match` carries no group offsets, which means the regex lacked the `d` flag. Failing
   *   closed matters: returning `false` here would accept every match, silently degrading Find to
   *   matching `into` for a query of `in to` across the whole Bible with no error anywhere.
   */
  static hasWhitespaceGapAwayFromBoundary(match, blockBoundaryOffsets, nfdToOriginalMap) {
    var _a;
    const groupOffsets = (_a = match.indices) == null ? void 0 : _a.groups;
    if (!groupOffsets)
      throw new Error(
        "UsjReaderWriter.search: flexibleWhitespaceAtBlockBoundaries requires a regex with the `d` flag so capture-group offsets are available."
      );
    return Object.entries(groupOffsets).some(([groupName, offsets]) => {
      if (!SEARCH_WHITESPACE_GROUP_NAME_REGEXP.test(groupName) || !offsets) return false;
      const [groupStart, groupEnd] = offsets;
      if (groupEnd > groupStart) return false;
      const originalStart = nfdToOriginalMap ? nfdToOriginalMap[groupStart] : groupStart;
      return !blockBoundaryOffsets.has(originalStart);
    });
  }
  /**
   * True when a match fails a word edge test at one of its ends. An end on a block change passes
   * whatever the test says, because the text it would look at belongs to another block.
   *
   * @param match Match to inspect
   * @param searchText Text the match was found in
   * @param wordEdges Sticky word edge tests
   * @param blockChangeOffsets Offsets into the original concatenated text where the block changes
   * @param nfdToOriginalMap Position map when the search text was NFD-normalized, else `undefined`
   */
  static failsWordEdgeTest(match, searchText, wordEdges, blockChangeOffsets, nfdToOriginalMap) {
    const failsAt = (edgeTest, index) => {
      if (!edgeTest) return false;
      if (blockChangeOffsets.has(nfdToOriginalMap ? nfdToOriginalMap[index] : index)) return false;
      edgeTest.lastIndex = index;
      return !edgeTest.test(searchText);
    };
    return failsAt(wordEdges.start, match.index) || failsAt(wordEdges.end, match.index + match[0].length);
  }
  /**
   * Returns a sticky copy of a zero-width test, so it runs at exactly the offset it is given.
   *
   * @param edgeTest The test as the caller supplied it, or `undefined`
   */
  static toStickyEdgeTest(edgeTest) {
    return edgeTest && new RegExp(edgeTest.source, `${edgeTest.flags.replace(/[gy]/g, "")}y`);
  }
  /**
   * True when `source` declares at least one whitespace capture group that
   * {@link hasWhitespaceGapAwayFromBoundary} would act on.
   *
   * Scans for an actual group declaration rather than testing for the substring `(?<ws`, which also
   * fires inside a character class (`/[(?<ws]b/`) and on a caller's own similarly-prefixed name
   * (`(?<wsGap>…)`). Either false positive would rebuild a caller's regex needlessly and could
   * reach the fail-closed throw below with no named groups present at all.
   */
  static hasSearchWhitespaceGroup(source) {
    let isInCharacterClass = false;
    for (let index = 0; index < source.length; index++) {
      const character = source[index];
      if (character === "\\") {
        index += 1;
      } else if (isInCharacterClass) {
        if (character === "]") isInCharacterClass = false;
      } else if (character === "[") {
        isInCharacterClass = true;
      } else if (character === "(") {
        const declaration = /^\(\?<([A-Za-z_$][\w$]*)>/.exec(source.slice(index));
        if (declaration && SEARCH_WHITESPACE_GROUP_NAME_REGEXP.test(declaration[1])) return true;
      }
    }
    return false;
  }
  /**
   * Walks the USJ content tree and concatenates every text node the search should see.
   *
   * @param markerStylesToInclude When provided, text under a `para`/`note` ancestor whose style is
   *   absent from the set is left out.
   * @param shouldRecordBoundaries When `true`, also records the offsets in the concatenated text
   *   where adjacent text nodes belong to different blocks.
   * @returns The text chunks, a map from each chunk's offset to its document location, the set of
   *   block-boundary offsets at which a whitespace gap is tolerable, and the set of every offset
   *   where the block changes (both empty when `shouldRecordBoundaries` is `false`).
   */
  collectSearchText(markerStylesToInclude, shouldRecordBoundaries) {
    const startingPoint = {
      node: this.usj,
      documentLocation: {
        jsonPath: `$`
      }
    };
    const textChunks = [];
    const fullTextIndexMap = new SortedNumberMap();
    const blockBoundaryOffsets = /* @__PURE__ */ new Set();
    const blockChangeOffsets = /* @__PURE__ */ new Set();
    let previousBlockAncestor;
    let hasPushedAChunk = false;
    let hasCrossedChapterSincePush = false;
    const droppedBlockAncestorsSincePush = [];
    let currentIndex = 0;
    let nextNode = startingPoint.node;
    while (nextNode !== void 0) {
      nextNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
        startingPoint.node,
        this.convertJsonPathToWorkingStack(startingPoint.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (node, workingStack) => {
          if (typeof node !== "string") {
            if (shouldRecordBoundaries && node && "type" in node && node.type === CHAPTER_NODE_TYPE)
              hasCrossedChapterSincePush = true;
            return false;
          }
          if (markerStylesToInclude) {
            const hasExcludedAncestor = workingStack.some((stackItem) => {
              const ancestor = stackItem.parent;
              if (!ancestor || !("type" in ancestor)) return false;
              if (ancestor.type === "char") return false;
              let markerStyle;
              if ("style" in ancestor && typeof ancestor.style === "string") {
                markerStyle = ancestor.style;
              } else if ("marker" in ancestor && typeof ancestor.marker === "string") {
                markerStyle = ancestor.marker;
              }
              return markerStyle !== void 0 && !markerStylesToInclude.has(markerStyle);
            });
            if (hasExcludedAncestor) {
              if (shouldRecordBoundaries)
                droppedBlockAncestorsSincePush.push(
                  UsjReaderWriter.findNearestBlockAncestor(workingStack)
                );
              return false;
            }
          }
          if (shouldRecordBoundaries && node.length > 0) {
            const blockAncestor = UsjReaderWriter.findNearestBlockAncestor(workingStack);
            const droppedOwnBlockSincePush = droppedBlockAncestorsSincePush.some(
              (dropped) => dropped !== previousBlockAncestor && dropped !== blockAncestor
            );
            if (hasPushedAChunk && blockAncestor !== previousBlockAncestor)
              blockChangeOffsets.add(currentIndex);
            if (hasPushedAChunk && blockAncestor !== previousBlockAncestor && !hasCrossedChapterSincePush && !droppedOwnBlockSincePush)
              blockBoundaryOffsets.add(currentIndex);
            previousBlockAncestor = blockAncestor;
            hasPushedAChunk = true;
            hasCrossedChapterSincePush = false;
            droppedBlockAncestorsSincePush.length = 0;
          }
          textChunks.push(node);
          fullTextIndexMap.set(currentIndex, {
            node,
            documentLocation: {
              offset: 0,
              jsonPath: UsjReaderWriter.convertWorkingStackToJsonPath(workingStack)
            }
          });
          currentIndex += node.length;
          return false;
        }
      );
    }
    return { textChunks, fullTextIndexMap, blockBoundaryOffsets, blockChangeOffsets };
  }
  /**
   * Converts one accepted regex match into a search result, resolving its start and end offsets to
   * document locations. Pure with respect to the search loop — it reads no loop state.
   */
  static buildSearchResult(match, fullText, fullTextIndexMap, nfdToOriginalMap) {
    const originalStart = nfdToOriginalMap ? nfdToOriginalMap[match.index] : match.index;
    const originalEnd = nfdToOriginalMap ? nfdToOriginalMap[match.index + match[0].length] : match.index + match[0].length;
    if (originalStart < 0 || originalStart >= fullText.length)
      throw new Error(`Match index out of bounds: ${originalStart}`);
    const startingNodeEntry = fullTextIndexMap.findClosestLessThanOrEqual(originalStart);
    if (!startingNodeEntry)
      throw new Error(`Internal error: no starting node found for index ${originalStart}`);
    const start = {
      node: startingNodeEntry.value.node,
      documentLocation: {
        jsonPath: startingNodeEntry.value.documentLocation.jsonPath,
        offset: originalStart - startingNodeEntry.key
      }
    };
    const endingNodeEntry = fullTextIndexMap.findClosestLessThanOrEqual(originalEnd - 1);
    if (!endingNodeEntry)
      throw new Error(`Internal error: no ending node found for index ${originalStart}`);
    const end = {
      node: endingNodeEntry.value.node,
      documentLocation: {
        jsonPath: endingNodeEntry.value.documentLocation.jsonPath,
        offset: originalEnd - endingNodeEntry.key
      }
    };
    const text = nfdToOriginalMap ? fullText.substring(originalStart, originalEnd) : match[0];
    return { text, start, end };
  }
  search(regex, markerStylesOrSearchOptions) {
    const searchOptions = markerStylesOrSearchOptions instanceof Set ? { markerStylesToInclude: markerStylesOrSearchOptions } : markerStylesOrSearchOptions;
    const { markerStylesToInclude, normalizationForm, wordEdges } = searchOptions ?? {};
    const isBoundaryFilterOn = !!(searchOptions && "flexibleWhitespaceAtBlockBoundaries" in searchOptions ? searchOptions.flexibleWhitespaceAtBlockBoundaries : false);
    const retVal = [];
    if (this.usj.content.length === 0) return retVal;
    const shouldFilterWhitespaceGaps = isBoundaryFilterOn && UsjReaderWriter.hasSearchWhitespaceGroup(regex.source);
    const stickyWordEdges = wordEdges && {
      start: UsjReaderWriter.toStickyEdgeTest(wordEdges.start),
      end: UsjReaderWriter.toStickyEdgeTest(wordEdges.end)
    };
    const { textChunks, fullTextIndexMap, blockBoundaryOffsets, blockChangeOffsets } = this.collectSearchText(markerStylesToInclude, shouldFilterWhitespaceGaps || !!wordEdges);
    const fullText = textChunks.join("");
    const nfdToOriginalMap = normalizationForm === "NFD" ? UsjReaderWriter.buildNFDToOriginalPositionMap(fullText) : void 0;
    const searchText = nfdToOriginalMap ? fullText.normalize("NFD") : fullText;
    const searchRegex = shouldFilterWhitespaceGaps && !regex.flags.includes("d") ? new RegExp(regex.source, `${regex.flags}d`) : regex;
    const callerLastIndex = regex.lastIndex;
    try {
      let match = searchRegex.exec(searchText);
      while (match) {
        if (match[0].length === 0) {
          if (!searchRegex.global || searchRegex.lastIndex >= searchText.length) break;
          searchRegex.lastIndex = UsjReaderWriter.advancePastCodePoint(
            searchText,
            searchRegex.lastIndex
          );
          match = searchRegex.exec(searchText);
        } else {
          const isWhitespaceGapRejected = shouldFilterWhitespaceGaps && UsjReaderWriter.hasWhitespaceGapAwayFromBoundary(
            match,
            blockBoundaryOffsets,
            nfdToOriginalMap
          );
          const isInsideCharacter = nfdToOriginalMap !== void 0 && UsjReaderWriter.isMatchInsideCharacter(
            match.index,
            match.index + match[0].length,
            searchText,
            nfdToOriginalMap
          );
          const isWordEdgeRejected = !!stickyWordEdges && UsjReaderWriter.failsWordEdgeTest(
            match,
            searchText,
            stickyWordEdges,
            blockChangeOffsets,
            nfdToOriginalMap
          );
          if (isWhitespaceGapRejected || isInsideCharacter || isWordEdgeRejected) {
            if (!searchRegex.global) break;
            searchRegex.lastIndex = UsjReaderWriter.advancePastCodePoint(searchText, match.index);
            match = searchRegex.exec(searchText);
          } else {
            retVal.push(
              UsjReaderWriter.buildSearchResult(
                match,
                fullText,
                fullTextIndexMap,
                nfdToOriginalMap
              )
            );
            if (!searchRegex.global) break;
            match = searchRegex.exec(searchText);
          }
        }
      }
    } finally {
      regex.lastIndex = callerLastIndex;
    }
    return retVal;
  }
  // #endregion Search for text from a certain point
  // #region Extract text from a node + JSONPath + offset
  extractText(start, desiredLength) {
    let retVal = "";
    let offsetRemaining = "offset" in start.documentLocation ? start.documentLocation.offset : 0;
    let lengthRecorded = 0;
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.documentLocation.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node) => {
        if (typeof node !== "string") return false;
        if (offsetRemaining >= node.length) {
          offsetRemaining -= node.length;
          return false;
        }
        let remainingNode = node;
        if (offsetRemaining > 0) {
          remainingNode = remainingNode.substring(offsetRemaining);
          offsetRemaining = 0;
        }
        if (lengthRecorded + remainingNode.length < desiredLength) {
          lengthRecorded += remainingNode.length;
          retVal = `${retVal}${remainingNode}`;
          return false;
        }
        const lengthToCopy = desiredLength - lengthRecorded;
        retVal = `${retVal}${remainingNode.substring(0, lengthToCopy - 1)}`;
        return true;
      }
    );
    return retVal;
  }
  extractTextBetweenPoints(start, end, maxLength = 100) {
    let retVal = "";
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.documentLocation.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, currentStack) => {
        if (node === end.node) {
          if (typeof node === "object") return true;
          if (end.documentLocation.jsonPath === UsjReaderWriter.convertWorkingStackToJsonPath(currentStack))
            return true;
        }
        if (typeof node !== "string") return false;
        retVal = `${retVal}${node}`;
        if (retVal.length > maxLength) retVal = retVal.substring(0, maxLength);
        return retVal.length >= maxLength;
      }
    );
    return retVal;
  }
  // #endregion Extract text from a node + JSONPath + offset
  // #region Edit this USJ data
  static removeContentNodesFromArray(contentArray, searchFunction) {
    let removedCount = 0;
    for (let i = contentArray.length - 1; i >= 0; i--) {
      const node = contentArray[i];
      if (searchFunction(node)) {
        contentArray.splice(i, 1);
        removedCount += 1;
      } else if (typeof node !== "string" && node.content)
        removedCount += this.removeContentNodesFromArray(node.content, searchFunction);
    }
    return removedCount;
  }
  removeContentNodes(searchFunction) {
    const retVal = UsjReaderWriter.removeContentNodesFromArray(this.usj.content, searchFunction);
    this.usjChanged();
    return retVal;
  }
  // #endregion Edit this USJ data
  // #region transform USJ to USFM
  /**
   * Get `MarkerInfo` by marker name
   *
   * @param markerName Name of the marker for which to get `MarkerInfo`
   * @returns `MarkerInfo` for the marker by name if the marker is in the markers map. `undefined`
   *   if the marker is not in the markers map. If you have the marker type, you can build a fake
   *   `MarkerInfo` for an unknown marker by making an object with just the type. If not, might be
   *   best to throw an error since there probably isn't enough information available to do anything
   *   with that marker.
   */
  getMarkerInfo(markerName) {
    let markerInfo = this.markersMap.markers[markerName];
    if (!markerInfo)
      [, markerInfo] = Object.entries(this.markersMap.markersRegExp).find(
        ([markerRegExp]) => new RegExp(markerRegExp).test(markerName)
      ) ?? [];
    return markerInfo;
  }
  /**
   * Gathers various pieces of information about a marker that are helpful for transforming the
   * marker to USFM
   *
   * WARNING: this only has the ability to return the info for the marker to be used in USFM. If you
   * need to use info for the marker in USX or USJ, this method needs to be modified.
   *
   * @param marker A USJ marker (can be USJ type) or a string which is the marker name
   * @param scriptureFormat The Scripture format to get the marker information for. For example, if
   *   you are using this marker info to transform the marker into USFM, this should be `usfm`.
   *   Defaults to `usfm`
   * @returns Various pieces of info about the marker
   */
  getInfoForMarker(marker, scriptureFormat = "usfm") {
    if (scriptureFormat !== "usfm")
      throw new Error(
        "Scripture formats beside usfm are not supported for getting info for markers"
      );
    const markerNameOriginal = scriptureUtil.isString(marker) ? marker : (
      // Usj type has no `marker` property, but the Usj marker isn't really different than any other
      // marker with no `marker` property. It is appropriate to treat them the same to get the name
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      marker.marker ?? marker.type
    );
    let markerIsUnknown = false;
    let markerInfo = this.getMarkerInfo(markerNameOriginal);
    const markerTypeFromFirstMarkerInfo = (markerInfo == null ? void 0 : markerInfo.type) ?? (scriptureUtil.isString(marker) ? "" : marker.type);
    let markerName = markerNameOriginal;
    if (markerInfo == null ? void 0 : markerInfo.markerUsfm) {
      markerName = markerInfo.markerUsfm;
      markerInfo = this.getMarkerInfo(markerName);
    }
    if (!markerInfo) {
      if (scriptureUtil.isString(marker))
        throw new Error(`Unknown marker ${markerNameOriginal} and no marker type provided`);
      markerInfo = { type: marker.type };
      markerIsUnknown = true;
      this.reportProblemOnce(
        `Unknown marker ${markerNameOriginal}. Creating MarkerInfo to use: ${JSON.stringify(markerInfo)}`,
        "debug"
      );
    }
    let markerType = markerInfo.type;
    let markerTypeInfo = this.markersMap.markerTypes[markerType];
    if (markerTypeInfo == null ? void 0 : markerTypeInfo.markerTypeUsfm) {
      markerType = markerTypeInfo.markerTypeUsfm;
      markerTypeInfo = this.markersMap.markerTypes[markerType];
    }
    if (!scriptureUtil.isString(marker) && marker.type !== markerTypeFromFirstMarkerInfo && (!markerTypeInfo || marker.type !== markerTypeInfo.markerTypeUsfm && marker.type !== markerTypeInfo.markerTypeUsx && marker.type !== markerTypeInfo.markerTypeUsj)) {
      this.reportProblemOnce(
        `Warning: Mismatching marker type in the USJ content ${marker.type} vs marker type in the marker info ${markerInfo.type} for marker ${markerNameOriginal}. Using the type from the USJ content.`
      );
      markerType = marker.type;
      markerTypeInfo = this.markersMap.markerTypes[markerType];
      markerIsUnknown = true;
    }
    if (!markerTypeInfo) {
      throw new Error(
        `Unknown marker type ${markerType} on marker ${markerNameOriginal}! Cannot proceed.`
      );
    }
    if (markerIsUnknown && markerType === "para")
      markerTypeInfo = { ...markerTypeInfo, hasNewlineBefore: false };
    const attributeMarkerInfoEntries = [];
    if (markerInfo.attributeMarkers) {
      markerInfo.attributeMarkers.forEach((attributeMarkerName) => {
        const attributeMarkerInfo = this.getMarkerInfo(attributeMarkerName);
        if (!attributeMarkerInfo) return;
        if (!("attributeMarkerAttributeName" in attributeMarkerInfo)) return;
        attributeMarkerInfoEntries.push([attributeMarkerName, attributeMarkerInfo]);
      });
    }
    const markerWithAnyAttributes = marker;
    if (scriptureFormat === "usfm" && markerType === "cell" && markerWithAnyAttributes.colspan) {
      const columnsSpanned = parseInt(markerWithAnyAttributes.colspan, 10);
      const tableMarkerMatches = TABLE_MARKER_NUMBER_REGEXP.exec(markerNameOriginal);
      if (tableMarkerMatches == null ? void 0 : tableMarkerMatches[1]) {
        const startingColumn = parseInt(tableMarkerMatches[1], 10);
        if (!Number.isNaN(startingColumn) && !Number.isNaN(columnsSpanned)) {
          markerName = `${markerNameOriginal}-${startingColumn + columnsSpanned - 1}`;
          markerTypeInfo = {
            ...markerTypeInfo,
            skipOutputAttributeToUsfm: [
              ...markerTypeInfo.skipOutputAttributeToUsfm ?? [],
              "colspan"
            ]
          };
        }
      }
    }
    return {
      markerNameOriginal,
      markerName,
      markerInfo,
      markerType,
      markerTypeInfo,
      attributeMarkerInfoEntries
    };
  }
  /** Converts the text content of a marker to its equivalent in USFM */
  textContentToUsfm(textContent) {
    return {
      usfm: this.shouldAllowInvisibleCharacters ? textContent : textContent.replace(TEXT_CONTENT_NBSP_REGEXP, "~"),
      fragmentsInfo: [{ fragment: textContent, indexInUsfm: 0 }]
    };
  }
  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  static mergeFragmentsInfoIntoExistingArray(newFragmentsInfo, existingFragmentsInfo, existingUsfmLength) {
    newFragmentsInfo.forEach((fragmentInfo) => {
      const fragmentIndex = existingUsfmLength + fragmentInfo.indexInUsfm;
      existingFragmentsInfo.push({
        ...fragmentInfo,
        indexInUsfm: fragmentIndex
      });
    });
  }
  /**
   * Transforms the provided USJ marker into its opening marker representation in USFM
   *
   * Includes a newline before the marker if applicable. Generally also includes a space at the end.
   *
   * Opening markers generally look like the following:
   *
   * ```text
   * \markerName leadingAttributes textContentAttribute attributeMarkers
   * ```
   *
   * @param marker The marker to transform
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @returns String containing the marker information that should come before the contents of the
   *   marker in USFM
   */
  openingMarkerToUsfm(marker, isInsideMarkerWithSameType) {
    let usfm = "";
    const fragmentsInfo = [];
    const { markerName, markerInfo, markerType, markerTypeInfo, attributeMarkerInfoEntries } = this.getInfoForMarker(marker);
    const markerWithAnyAttributes = marker;
    if (markerTypeInfo.hasNewlineBefore) usfm += `
`;
    const markerPrefix = isInsideMarkerWithSameType ? markerTypeInfo.nestedPrefix ?? "" : "";
    fragmentsInfo.push({ fragment: marker, indexInUsfm: usfm.length });
    usfm += markerType === "optbreak" ? "//" : `\\${markerPrefix}`;
    if (markerType !== "optbreak") {
      fragmentsInfo.push({
        fragment: { attributeValueForKey: "marker", forMarker: marker },
        indexInUsfm: usfm.length
      });
      usfm += `${markerName}${markerType === "unmatched" ? "" : " "}`;
    }
    if (markerInfo.leadingAttributes) {
      markerInfo.leadingAttributes.forEach((attributeName) => {
        const attributeValue = markerWithAnyAttributes[attributeName];
        if (!attributeValue) return;
        fragmentsInfo.push({
          fragment: { attributeValueForKey: attributeName, forMarker: marker },
          indexInUsfm: usfm.length
        });
        usfm += `${attributeValue} `;
      });
    }
    if (markerInfo.textContentAttribute && markerWithAnyAttributes[markerInfo.textContentAttribute]) {
      fragmentsInfo.push({
        fragment: { attributeValueForKey: markerInfo.textContentAttribute, forMarker: marker },
        indexInUsfm: usfm.length
      });
      usfm += `${markerWithAnyAttributes[markerInfo.textContentAttribute]} `;
    }
    if (markerInfo.attributeMarkers) {
      attributeMarkerInfoEntries.forEach(([attributeMarkerName, attributeMarkerInfo]) => {
        const attributeValue = markerWithAnyAttributes[attributeMarkerInfo.attributeMarkerAttributeName];
        if (!attributeValue) return;
        const attributeMarker = {
          type: attributeMarkerInfo.type,
          marker: attributeMarkerName,
          content: [attributeValue]
        };
        const attributeMarkerFragmentsInfo = [];
        usfm = this.addMarkerUsfmToString(
          usfm,
          attributeMarker,
          marker,
          attributeMarkerFragmentsInfo
        );
        const { usfm: textContentUsfm } = this.textContentToUsfm(attributeValue);
        fragmentsInfo.push({
          fragment: {
            attributeValueForKey: attributeMarkerInfo.attributeMarkerAttributeName,
            forMarker: marker
          },
          indexInUsfm: usfm.length
        });
        usfm += textContentUsfm;
        usfm = this.addMarkerUsfmToString(
          usfm,
          {
            isClosingMarker: true,
            forMarker: attributeMarker
          },
          marker,
          attributeMarkerFragmentsInfo
        );
        attributeMarkerFragmentsInfo.forEach((fragmentInfo) => {
          if (scriptureUtil.isString(fragmentInfo.fragment) || "attributeKey" in fragmentInfo.fragment)
            throw new Error(
              `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(fragmentInfo)}`
            );
          if (UsjReaderWriter.isFragmentAMarker(fragmentInfo.fragment)) {
            fragmentsInfo.push({
              ...fragmentInfo,
              fragment: {
                attributeMarker: attributeMarkerInfo.attributeMarkerAttributeName,
                forMarker: marker
              }
            });
            return;
          }
          if ("attributeValueForKey" in fragmentInfo.fragment) {
            if (fragmentInfo.fragment.attributeValueForKey !== "marker")
              throw new Error(
                `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(fragmentInfo)}`
              );
            fragmentsInfo.push({
              ...fragmentInfo,
              fragment: {
                attributeKey: attributeMarkerInfo.attributeMarkerAttributeName,
                forMarker: marker
              }
            });
            return;
          }
          if ("isClosingMarker" in fragmentInfo.fragment) {
            const { isClosingMarker: _, ...partialClosingFragment } = fragmentInfo.fragment;
            const fragment = {
              ...partialClosingFragment,
              forMarker: marker,
              attributeMarkerClosingMarker: attributeMarkerInfo.attributeMarkerAttributeName
            };
            fragmentsInfo.push({
              ...fragmentInfo,
              fragment
            });
            return;
          }
          throw new Error(
            `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(fragmentInfo)}`
          );
        });
        if (!this.markersMap.isSpaceAfterAttributeMarkersContent && attributeMarkerInfo.hasStructuralSpaceAfterCloseAttributeMarker)
          usfm += " ";
      });
    }
    return { usfm, fragmentsInfo };
  }
  /**
   * Transforms the provided USJ marker into its closing marker representation in USFM
   *
   * Closing markers do not include the attributes listed as part of the opening markers (leading
   * attributes, text content attributes, and attribute markers). They only include other kinds of
   * attributes including the default attribute if present.
   *
   * Closing markers with only the default attribute present generally look like the following:
   *
   * ```text
   * |defaultAttribute\markerName*
   * ```
   *
   * Closing markers with at least one non-default attribute present generally look like the
   * following:
   *
   * ```text
   * |attributeName="AttributeValue" attributeName="AttributeValue"\markerName*
   * ```
   *
   * @param marker The marker to transform
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @returns String containing the marker information that should come after the contents of the
   *   marker in USFM
   */
  closingMarkerToUsfm(marker, isInsideMarkerWithSameType) {
    const {
      markerNameOriginal,
      markerName,
      markerInfo,
      markerType,
      markerTypeInfo,
      attributeMarkerInfoEntries
    } = this.getInfoForMarker(marker);
    const closingMarkerAttributeNames = Object.keys(marker).filter((attributeName) => {
      var _a, _b;
      if (attributeName === "type") return false;
      if (attributeName === "marker") return false;
      if (attributeName === "content") return false;
      if (attributeName === "closed") return false;
      if ((_a = markerTypeInfo.skipOutputAttributeToUsfm) == null ? void 0 : _a.includes(attributeName)) return false;
      if ((_b = markerInfo.leadingAttributes) == null ? void 0 : _b.includes(attributeName)) return false;
      if (markerInfo.textContentAttribute === attributeName) return false;
      if (attributeMarkerInfoEntries.some(
        ([, attributeMarkerInfo]) => attributeMarkerInfo.attributeMarkerAttributeName === attributeName
      ))
        return false;
      return true;
    });
    const markerWithAnyAttributes = marker;
    if (markerTypeInfo.isCloseable && markerInfo.independentClosingMarkers && markerInfo.independentClosingMarkers.length > 0)
      throw new Error(
        `Marker ${markerName} is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`
      );
    let hasExplicitClosingMarker = true;
    if (markerWithAnyAttributes.closed === "false") hasExplicitClosingMarker = false;
    else if (markerInfo.isClosingMarkerOptional && !this.markersMap.shouldOptionalClosingMarkersBePresent && markerWithAnyAttributes.closed !== "true") {
      hasExplicitClosingMarker = false;
    }
    if (markerInfo.independentClosingMarkers && markerInfo.independentClosingMarkers.length > 0 && hasExplicitClosingMarker) {
      const independentClosingMarker = {
        type: markerType,
        marker: markerInfo.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          closingMarkerAttributeNames.map((attributeName) => [
            attributeName,
            markerWithAnyAttributes[attributeName]
          ])
        )
      };
      let usfm2 = "";
      const fragmentsInfo2 = [];
      const { usfm: openingMarkerUsfm, fragmentsInfo: openingFragmentsInfo } = this.openingMarkerToUsfm(independentClosingMarker, isInsideMarkerWithSameType);
      const openingFragmentInfo = openingFragmentsInfo.find((fragmentInfo) => {
        return UsjReaderWriter.isFragmentAMarker(fragmentInfo.fragment);
      });
      if (!openingFragmentInfo)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            independentClosingMarker
          )}. Fragments info generated: ${JSON.stringify(openingFragmentsInfo)}`
        );
      fragmentsInfo2.push({
        ...openingFragmentInfo,
        fragment: { isClosingMarker: true, forMarker: marker }
      });
      usfm2 += openingMarkerUsfm;
      if (markerNameOriginal !== independentClosingMarker.marker)
        usfm2 = this.addMarkerUsfmToString(
          usfm2,
          {
            isClosingMarker: true,
            forMarker: independentClosingMarker
          },
          isInsideMarkerWithSameType
        );
      return { usfm: usfm2, fragmentsInfo: fragmentsInfo2 };
    }
    let usfm = "";
    const fragmentsInfo = [];
    if (closingMarkerAttributeNames.length > 0) {
      usfm += "|";
      if (closingMarkerAttributeNames.length === 1 && closingMarkerAttributeNames[0] === markerInfo.defaultAttribute) {
        fragmentsInfo.push({
          fragment: { attributeValueForKey: markerInfo.defaultAttribute, forMarker: marker },
          indexInUsfm: usfm.length
        });
        usfm += markerWithAnyAttributes[markerInfo.defaultAttribute];
      } else {
        closingMarkerAttributeNames.forEach((attributeName, index) => {
          const attributeNameUsfm = markerType === "figure" && attributeName === "file" ? "src" : attributeName;
          if (index > 0) usfm += " ";
          fragmentsInfo.push({
            fragment: { attributeKey: attributeName, forMarker: marker },
            indexInUsfm: usfm.length
          });
          usfm += `${attributeNameUsfm}="`;
          fragmentsInfo.push({
            fragment: { attributeValueForKey: attributeName, forMarker: marker },
            indexInUsfm: usfm.length
          });
          usfm += `${markerWithAnyAttributes[attributeName]}"`;
        });
      }
    }
    if (markerTypeInfo.isCloseable && hasExplicitClosingMarker) {
      const closingMarkerName = markerTypeInfo.isClosingMarkerEmpty ? "" : markerName;
      const markerPrefix = isInsideMarkerWithSameType ? markerTypeInfo.nestedPrefix ?? "" : "";
      fragmentsInfo.push({
        fragment: { isClosingMarker: true, forMarker: marker },
        indexInUsfm: usfm.length
      });
      usfm += `\\${markerPrefix}${closingMarkerName}*`;
    }
    return { usfm, fragmentsInfo };
  }
  /**
   * Determines whether this marker and all its content should be skipped entirely when outputting
   * to USFM
   *
   * @param marker Marker to check
   * @returns `true` if this marker should be skipped; `false` otherwise
   */
  shouldSkipOutputMarkerToUsfm(marker) {
    var _a;
    const { markerTypeInfo } = this.getInfoForMarker(marker);
    if (markerTypeInfo.skipOutputMarkerToUsfm) return true;
    if ((_a = markerTypeInfo.skipOutputMarkerToUsfmIfAttributeIsPresent) == null ? void 0 : _a.some(
      (attributeName) => attributeName in marker
    ))
      return true;
    return false;
  }
  /** Removes one space at the end of the string if present */
  static removeEndSpace(value) {
    if (value.at(-1) !== " ") return value;
    return value.slice(0, -1);
  }
  addMarkerUsfmToString(usfm, marker, markerParentOrIsInsideMarkerWithSameType, fragmentsInfo) {
    let usfmOutput = usfm;
    let markerUsfmOutput;
    let markerFragmentsInfo;
    const { markerNameOriginal, markerType, markerTypeInfo } = this.getInfoForMarker(
      "isClosingMarker" in marker ? marker.forMarker : marker
    );
    let isParentSameType = false;
    if (typeof markerParentOrIsInsideMarkerWithSameType === "boolean")
      isParentSameType = markerParentOrIsInsideMarkerWithSameType;
    else if (markerParentOrIsInsideMarkerWithSameType) {
      const { markerType: parentMarkerType } = this.getInfoForMarker(
        markerParentOrIsInsideMarkerWithSameType
      );
      if (parentMarkerType === markerType) {
        isParentSameType = true;
      }
    }
    if ("isClosingMarker" in marker) {
      const { usfm: closingUsfm, fragmentsInfo: closingFragmentsInfo } = this.closingMarkerToUsfm(
        marker.forMarker,
        isParentSameType
      );
      markerFragmentsInfo = closingFragmentsInfo;
      markerUsfmOutput = closingUsfm;
      if (markerTypeInfo.isCloseable && markerTypeInfo.isClosingMarkerEmpty && // No contents
      (!marker.forMarker.content || marker.forMarker.content.length === 0) && // No closing marker attributes
      !markerUsfmOutput.startsWith("|")) {
        usfmOutput = UsjReaderWriter.removeEndSpace(usfmOutput);
      }
    } else {
      const { usfm: openingUsfm, fragmentsInfo: openingFragmentsInfo } = this.openingMarkerToUsfm(
        marker,
        isParentSameType
      );
      markerFragmentsInfo = openingFragmentsInfo;
      markerUsfmOutput = openingUsfm;
    }
    if (markerUsfmOutput.startsWith("\n")) {
      if (usfmOutput.length === 0) {
        markerFragmentsInfo = markerFragmentsInfo.map((fragmentInfo) => ({
          ...fragmentInfo,
          indexInUsfm: fragmentInfo.indexInUsfm - 1
        }));
        markerUsfmOutput = markerUsfmOutput.substring(1);
      } else {
        usfmOutput = UsjReaderWriter.removeEndSpace(usfmOutput);
      }
    }
    if (this.markersMap.isSpaceAfterAttributeMarkersContent && markerNameOriginal === "ca") {
      const lastMarkerBackslashIndex = usfmOutput.lastIndexOf("\\");
      if (lastMarkerBackslashIndex >= 0) {
        const lastMarker = usfmOutput.substring(
          lastMarkerBackslashIndex + 1,
          lastMarkerBackslashIndex + 3
        );
        if (lastMarker === "c ") {
          usfmOutput = UsjReaderWriter.removeEndSpace(usfmOutput);
          usfmOutput += "\n ";
        }
      }
    }
    if (typeof markerParentOrIsInsideMarkerWithSameType === "object" && // A chapter is only ever a direct child of the document root.
    markerParentOrIsInsideMarkerWithSameType.type === scriptureUtilities.USJ_TYPE && !("isClosingMarker" in marker) && marker.type === "char") {
      const siblings = markerParentOrIsInsideMarkerWithSameType.content;
      const markerIndex = (siblings == null ? void 0 : siblings.indexOf(marker)) ?? -1;
      const previousSibling = markerIndex > 0 ? siblings == null ? void 0 : siblings[markerIndex - 1] : void 0;
      if (typeof previousSibling === "object" && previousSibling.type === "chapter" && !/\s$/.test(usfmOutput))
        usfmOutput += " ";
    }
    if (fragmentsInfo)
      UsjReaderWriter.mergeFragmentsInfoIntoExistingArray(
        markerFragmentsInfo,
        fragmentsInfo,
        usfmOutput.length
      );
    usfmOutput += markerUsfmOutput;
    return usfmOutput;
  }
  toUsfm() {
    return this.usfm;
  }
  // #endregion transform USJ to USFM
  // #region fragment utilities
  /**
   * Returns a new {@link UsjDocumentLocation} based on the one passed in but with the offset
   * provided. If the location passed in does not have an offset property, a shallow clone of the
   * location will be returned with no changes.
   */
  static moveUsjDocumentLocationToNewOffset(usjLocation, usjOffset) {
    const newLocation = { ...usjLocation };
    if ("offset" in newLocation) newLocation.offset = usjOffset;
    else if ("closingMarkerOffset" in newLocation) newLocation.closingMarkerOffset = usjOffset;
    else if ("propertyOffset" in newLocation) newLocation.propertyOffset = usjOffset;
    else if ("keyOffset" in newLocation) newLocation.keyOffset = usjOffset;
    else if ("keyClosingMarkerOffset" in newLocation)
      newLocation.keyClosingMarkerOffset = usjOffset;
    return newLocation;
  }
  /**
   * Returns the offset of whatever kind that is found in the UsjDocumentLocation. Returns 0 if the
   * location passed in does not have an offset property.
   */
  static getOffsetInUsjDocumentLocation(usjLocation) {
    if ("offset" in usjLocation) return usjLocation.offset;
    if ("closingMarkerOffset" in usjLocation) return usjLocation.closingMarkerOffset;
    if ("propertyOffset" in usjLocation) return usjLocation.propertyOffset;
    if ("keyOffset" in usjLocation) return usjLocation.keyOffset;
    if ("keyClosingMarkerOffset" in usjLocation) return usjLocation.keyClosingMarkerOffset;
    return 0;
  }
  /**
   * Compares two UsjDocumentLocations to determine if they are pointing to the same location
   *
   * @param a The first location to compare
   * @param b The second location to compare
   * @param ignoreJsonPath If `true`, the JSONPath properties of the locations will be ignored in
   *   the comparison. This is useful if you have already determined that the JSONPaths are the
   *   same
   */
  static areUsjDocumentLocationsEqual(a, b, ignoreJsonPath = false) {
    const { jsonPath: aJsonPath, ...restOfA } = a;
    const { jsonPath: bJsonPath, ...restOfB } = b;
    if (!ignoreJsonPath && !deepEqual(jsonpathPlus.JSONPath.toPathArray(aJsonPath), jsonpathPlus.JSONPath.toPathArray(bJsonPath)))
      return false;
    return deepEqual(restOfA, restOfB);
  }
  /** Find the fragment info corresponding to the specified USJ Document location. */
  findFragmentInfoAtUsjDocumentLocation(usjLocation) {
    const zeroedUsjLocation = UsjReaderWriter.moveUsjDocumentLocationToNewOffset(usjLocation, 0);
    let fragmentInfoAtLocation;
    const allFragmentsInfoAtJsonPath = this.fragmentsByJsonPath.get(
      UsjReaderWriter.normalizeJsonPath(usjLocation.jsonPath)
    );
    if (!allFragmentsInfoAtJsonPath) return void 0;
    allFragmentsInfoAtJsonPath.find((fragmentInfo) => {
      if (!UsjReaderWriter.areUsjDocumentLocationsEqual(
        fragmentInfo.nodeAndDocumentLocation.documentLocation,
        zeroedUsjLocation,
        // We already compared the JSONPaths by looking in the map for this JSONPath
        true
      ))
        return false;
      fragmentInfoAtLocation = fragmentInfo;
      return true;
    });
    return fragmentInfoAtLocation;
  }
  /**
   * Transform a node and its working stack into the {@link UsjDocumentLocation} corresponding to it.
   *
   * @param node Marker or string to convert
   * @param workingStack Working stack pointing to the node
   * @param locationOffset If applicable, this is the offset that will be put on the
   *   {@link UsjDocumentLocation}. If not present, offset on the {@link UsjDocumentLocation} will be
   *   `0`. Not all subtypes of {@link UsjDocumentLocation}s have offsets, so this is not used in all
   *   situations
   * @returns The node and the document location corresponding to this fragment
   */
  static convertNodeToUsjDocumentLocation(node, workingStack, locationOffset = 0) {
    const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
    if (scriptureUtil.isString(node)) {
      const documentLocation2 = { jsonPath, offset: locationOffset };
      return documentLocation2;
    }
    const documentLocation = { jsonPath };
    return documentLocation;
  }
  /**
   * Transform a fragment and its working stack into the {@link UsjNodeAndDocumentLocation}
   * corresponding to it.
   *
   * @param fragment Fragment to convert
   * @param workingStack Working stack pointing to the marker or string the fragment is in
   * @param offsetWithinFragment If applicable, this is the offset within the fragment that the
   *   location is pointing to, which is offset that will be put on the {@link UsjDocumentLocation}.
   *   If not present, offset on the {@link UsjDocumentLocation} will be `0` because fragments don't
   *   have their own offsets into the contents. Not all {@link UsjDocumentLocation}s have offsets,
   *   so this is not used in all situations
   * @returns The node and the document location corresponding to this fragment
   */
  static convertFragmentToUsjNodeAndDocumentLocation(fragment, workingStack, offsetWithinFragment = 0) {
    if (scriptureUtil.isString(fragment) || UsjReaderWriter.isFragmentAMarker(fragment)) {
      const documentLocation = UsjReaderWriter.convertNodeToUsjDocumentLocation(
        fragment,
        workingStack,
        offsetWithinFragment
      );
      return {
        node: fragment,
        documentLocation
      };
    }
    if ("isClosingMarker" in fragment) {
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
      const documentLocation = {
        jsonPath,
        closingMarkerOffset: offsetWithinFragment
      };
      return {
        node: fragment.forMarker,
        documentLocation
      };
    }
    if ("attributeValueForKey" in fragment) {
      const jsonPath = UsjReaderWriter.convertWorkingStackAndPropertyToJsonPath(
        workingStack,
        fragment.attributeValueForKey
      );
      const documentLocation = {
        jsonPath,
        propertyOffset: offsetWithinFragment
      };
      return {
        node: fragment.forMarker,
        documentLocation
      };
    }
    if ("attributeKey" in fragment) {
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
      const documentLocation = {
        jsonPath,
        keyName: fragment.attributeKey,
        keyOffset: offsetWithinFragment
      };
      return {
        node: fragment.forMarker,
        documentLocation
      };
    }
    if ("attributeMarker" in fragment) {
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
      const documentLocation = {
        jsonPath,
        keyName: fragment.attributeMarker
      };
      return {
        node: fragment.forMarker,
        documentLocation
      };
    }
    if ("attributeMarkerClosingMarker" in fragment) {
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
      const documentLocation = {
        jsonPath,
        keyName: fragment.attributeMarkerClosingMarker,
        keyClosingMarkerOffset: offsetWithinFragment
      };
      return {
        node: fragment.forMarker,
        documentLocation
      };
    }
    throw new Error(
      `Could not transform unrecognized fragment to UsjNodeAndDocumentLocation: ${JSON.stringify(
        fragment
      )} at working stack ${JSON.stringify(JSON.stringify(fragment))}`
    );
  }
  /**
   * Fill out fragments info from a minimal fragments info array and move them into the final
   * fragments map
   *
   * @param fragmentsInfo Minimal fragments info array to fill out and put into maps. ALL CONTENTS
   *   OF THIS ARRAY ARE REMOVED IN THIS METHOD
   * @param workingStack Current working stack
   * @param position Object containing properties describing where in the USFM document these
   *   fragments are. If this method encounters a verse range, only the starting verse number is
   *   used (hence this is not a {@link SerializedVerseRef}). PROPERTIES ON THIS OBJECT ARE MODIFIED
   *   IN THIS METHOD
   * @param fragmentsByIndexInUsfm Map to add fragment information to by index in USFM
   * @param fragmentsByJsonPath Map to add fragment information to by JSONPath
   * @param indicesInUsfmByVerseRef Map to add verse start locations to. If this method encounters a
   *   verse range, only the starting verse number is used. See {@link IndicesInUsfmByVerseRef} for
   *   potential adjustments to handle verse ranges differently when we know better what we ought to
   *   do.
   */
  transferFragmentsInfoArrayToMaps(fragmentsInfo, workingStack, position, fragmentsByIndexInUsfm, fragmentsByJsonPath, indicesInUsfmByVerseRef) {
    const fullFragmentsInfo = fragmentsInfo.map((fragmentInfo) => {
      var _a, _b, _c;
      if (typeof fragmentInfo.fragment === "object" && "type" in fragmentInfo.fragment) {
        const marker = fragmentInfo.fragment;
        if (marker.type === BOOK_TYPE && marker.code) {
          position.bookId = marker.code;
          position.chapterNum = 0;
          position.verseNum = 0;
          if (indicesInUsfmByVerseRef[NO_BOOK_ID]) {
            indicesInUsfmByVerseRef[position.bookId] = indicesInUsfmByVerseRef[NO_BOOK_ID];
            delete indicesInUsfmByVerseRef[NO_BOOK_ID];
          }
        } else if (marker.type === CHAPTER_TYPE && marker.number) {
          const nextChapterNum = parseInt(marker.number, 10);
          if (Number.isNaN(nextChapterNum)) {
            this.reportProblemOnce(
              `Found ${CHAPTER_TYPE} type marker with number ${marker.number}, but could not parse chapter number from it. Continuing using previous chapter number ${position.chapterNum}`
            );
          } else {
            position.chapterNum = nextChapterNum;
            position.verseNum = 0;
            const currentBookFragments = indicesInUsfmByVerseRef[position.bookId];
            if (currentBookFragments == null ? void 0 : currentBookFragments[0]) {
              currentBookFragments[position.chapterNum] = currentBookFragments[0];
              delete currentBookFragments[0];
            }
          }
        } else if (marker.type === VERSE_TYPE && marker.number) {
          const nextVerseNumString = (_a = VERSE_MARKER_NUMBER_SPAN_REGEXP.exec(marker.number)) == null ? void 0 : _a[1];
          if (!nextVerseNumString) {
            this.reportProblemOnce(
              `Found ${VERSE_TYPE} type marker with number ${marker.number}, but could not find starting verse number in it. Continuing using previous verse number ${position.verseNum}`
            );
          } else {
            const nextVerseNum = parseInt(nextVerseNumString, 10);
            if (Number.isNaN(nextVerseNum)) {
              this.reportProblemOnce(
                `Found ${VERSE_TYPE} type marker with number ${marker.number}, but could not parse starting verse number from ${nextVerseNumString}. Continuing using previous verse number ${position.verseNum}`
              );
            } else if ((_c = (_b = indicesInUsfmByVerseRef[position.bookId]) == null ? void 0 : _b[position.chapterNum]) == null ? void 0 : _c[nextVerseNum]) {
              const duplicateVerseMessage = `Found ${VERSE_TYPE} marker with existing number ${nextVerseNum} after current ${VERSE_TYPE} number ${position.verseNum}! Not updating verse start index. All positions in this duplicate verse will be based on the current ${VERSE_TYPE} marker, not the new duplicate marker.`;
              this.reportProblemOnce(duplicateVerseMessage);
            } else {
              if (nextVerseNum < position.verseNum)
                console.debug(
                  `Found ${VERSE_TYPE} marker with number ${nextVerseNum} lower than current ${VERSE_TYPE} number ${position.verseNum}. Verses are out of order. There may be some issues.`
                );
              position.verseNum = nextVerseNum;
            }
          }
        }
      }
      const fullFragmentInfo = {
        ...fragmentInfo,
        // Determine the appropriate `UsjDocumentLocation` subtype based on what this fragment is
        nodeAndDocumentLocation: UsjReaderWriter.convertFragmentToUsjNodeAndDocumentLocation(
          fragmentInfo.fragment,
          workingStack
        )
      };
      return fullFragmentInfo;
    });
    fullFragmentsInfo.forEach((fragmentInfo) => {
      fragmentsByIndexInUsfm.set(fragmentInfo.indexInUsfm, fragmentInfo);
      const fragmentJsonPath = fragmentInfo.nodeAndDocumentLocation.documentLocation.jsonPath;
      const fragmentsAtJsonPath = fragmentsByJsonPath.get(fragmentJsonPath);
      if (fragmentsAtJsonPath) fragmentsAtJsonPath.push(fragmentInfo);
      else fragmentsByJsonPath.set(fragmentJsonPath, [fragmentInfo]);
      if (!indicesInUsfmByVerseRef[position.bookId]) indicesInUsfmByVerseRef[position.bookId] = {};
      if (!indicesInUsfmByVerseRef[position.bookId][position.chapterNum])
        indicesInUsfmByVerseRef[position.bookId][position.chapterNum] = {};
      if (indicesInUsfmByVerseRef[position.bookId][position.chapterNum][position.verseNum] === void 0)
        indicesInUsfmByVerseRef[position.bookId][position.chapterNum][position.verseNum] = fragmentInfo.indexInUsfm;
    });
    fragmentsInfo.splice(0);
  }
  // #endregion fragment utilities
  // #region USFM-related cached properties
  /**
   * Generates USFM representation of the USJ document passed in and returns it along with
   * information about how various locations in USFM and USJ map to each other
   */
  calculateUsfmProperties() {
    let usfm = "";
    const fragmentsByIndexInUsfm = new SortedNumberMap();
    const fragmentsByJsonPath = /* @__PURE__ */ new Map();
    const indicesInUsfmByVerseRef = {};
    const fragmentsInfo = [];
    const currentPosition = {
      bookId: NO_BOOK_ID,
      chapterNum: 0,
      verseNum: 0
    };
    const transferFragmentsInfo = (workingStack) => {
      this.transferFragmentsInfoArrayToMaps(
        fragmentsInfo,
        workingStack,
        currentPosition,
        fragmentsByIndexInUsfm,
        fragmentsByJsonPath,
        indicesInUsfmByVerseRef
      );
    };
    let topLevelUsjMarker;
    const markersToSkipOutput = [];
    UsjReaderWriter.findNextMatchingNodeOrClosingFragmentUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (nodeOrClosingFragment, workingStack) => {
        if (typeof nodeOrClosingFragment !== "object") {
          const { usfm: textContentUsfm, fragmentsInfo: textContentFragmentsInfo } = this.textContentToUsfm(nodeOrClosingFragment);
          UsjReaderWriter.mergeFragmentsInfoIntoExistingArray(
            textContentFragmentsInfo,
            fragmentsInfo,
            usfm.length
          );
          transferFragmentsInfo(workingStack);
          usfm += textContentUsfm;
          return false;
        }
        let markerParent;
        if (workingStack.length > 0) {
          markerParent = workingStack[workingStack.length - 1].parent;
        }
        if ("isClosingMarker" in nodeOrClosingFragment) {
          if (markersToSkipOutput.length > 0 && markersToSkipOutput[markersToSkipOutput.length - 1] === nodeOrClosingFragment.forMarker) {
            markersToSkipOutput.pop();
            return false;
          }
          usfm = this.addMarkerUsfmToString(
            usfm,
            nodeOrClosingFragment,
            markerParent,
            fragmentsInfo
          );
          transferFragmentsInfo(workingStack);
          if (nodeOrClosingFragment.forMarker.type === "book" && topLevelUsjMarker) {
            usfm = this.addMarkerUsfmToString(usfm, topLevelUsjMarker, markerParent, fragmentsInfo);
            transferFragmentsInfo(workingStack);
            topLevelUsjMarker = void 0;
          }
          return false;
        }
        if (this.shouldSkipOutputMarkerToUsfm(nodeOrClosingFragment)) {
          markersToSkipOutput.push(nodeOrClosingFragment);
          return false;
        }
        if (UsjReaderWriter.isTopLevelUsjMarker(nodeOrClosingFragment, workingStack) && !topLevelUsjMarker) {
          if (nodeOrClosingFragment.version !== "3.0") {
            topLevelUsjMarker = nodeOrClosingFragment;
          }
          return false;
        }
        usfm = this.addMarkerUsfmToString(usfm, nodeOrClosingFragment, markerParent, fragmentsInfo);
        transferFragmentsInfo(workingStack);
        return false;
      }
    );
    usfm = `${UsjReaderWriter.removeEndSpace(usfm)}
`;
    return { usfm, fragmentsByIndexInUsfm, fragmentsByJsonPath, indicesInUsfmByVerseRef };
  }
  /** The USFM representation of the USJ document passed in */
  get usfm() {
    if (this.usfmInternal !== void 0) return this.usfmInternal;
    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties());
    return this.usfmInternal;
  }
  /** Fragments at each index in the USFM string */
  get fragmentsByIndexInUsfm() {
    if (this.fragmentsByIndexInUsfmInternal) return this.fragmentsByIndexInUsfmInternal;
    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties());
    return this.fragmentsByIndexInUsfmInternal;
  }
  /** Fragments at each index in the USFM string */
  get fragmentsByJsonPath() {
    if (this.fragmentsByJsonPathInternal) return this.fragmentsByJsonPathInternal;
    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties());
    return this.fragmentsByJsonPathInternal;
  }
  /**
   * String index of the start of each verse (the backslash on the verse marker) in the USFM
   * representation of the USJ document. See {@link IndicesInUsfmByVerseRef} for more information.
   */
  get indicesInUsfmByVerseRef() {
    if (this.indicesInUsfmByVerseRefInternal) return this.indicesInUsfmByVerseRefInternal;
    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      fragmentsByJsonPath: this.fragmentsByJsonPathInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal
    } = this.calculateUsfmProperties());
    return this.indicesInUsfmByVerseRefInternal;
  }
  // #endregion USFM-related cached properties
}
exports.DEBOUNCE_CANCELED_ERROR_MESSAGE = scriptureUtil.DEBOUNCE_CANCELED_ERROR_MESSAGE;
exports.FIRST_SCR_BOOK_NUM = scriptureUtil.FIRST_SCR_BOOK_NUM;
exports.FIRST_SCR_CHAPTER_NUM = scriptureUtil.FIRST_SCR_CHAPTER_NUM;
exports.FIRST_SCR_VERSE_NUM = scriptureUtil.FIRST_SCR_VERSE_NUM;
exports.GraphemeString = scriptureUtil.GraphemeString;
exports.LAST_SCR_BOOK_NUM = scriptureUtil.LAST_SCR_BOOK_NUM;
exports.MAX_PADDING_LENGTH = scriptureUtil.MAX_PADDING_LENGTH;
exports.SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS = scriptureUtil.SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS;
exports.Section = scriptureUtil.Section;
exports.areUsjContentsEqualExceptWhitespace = scriptureUtil.areUsjContentsEqualExceptWhitespace;
exports.at = scriptureUtil.at;
exports.charAt = scriptureUtil.charAt;
exports.codePointAt = scriptureUtil.codePointAt;
exports.collapseMiddleWords = scriptureUtil.collapseMiddleWords;
exports.collectUsjMarkers = scriptureUtil.collectUsjMarkers;
exports.compareScrRefs = scriptureUtil.compareScrRefs;
exports.createSyncProxyForAsyncObject = scriptureUtil.createSyncProxyForAsyncObject;
exports.debounce = scriptureUtil.debounce;
exports.deepClone = scriptureUtil.deepClone;
exports.defaultScrRef = scriptureUtil.defaultScrRef;
exports.endsWith = scriptureUtil.endsWith;
exports.ensureArray = scriptureUtil.ensureArray;
exports.escapeStringRegexp = scriptureUtil.escapeStringRegexp;
exports.formatReplacementString = scriptureUtil.formatReplacementString;
exports.formatReplacementStringToArray = scriptureUtil.formatReplacementStringToArray;
exports.formatScrRef = scriptureUtil.formatScrRef;
exports.formatScrRefRange = scriptureUtil.formatScrRefRange;
exports.getAllObjectFunctionNames = scriptureUtil.getAllObjectFunctionNames;
exports.getChaptersForBook = scriptureUtil.getChaptersForBook;
exports.getErrorMessage = scriptureUtil.getErrorMessage;
exports.getLocalizeKeyForScrollGroupId = scriptureUtil.getLocalizeKeyForScrollGroupId;
exports.getLocalizeKeysForScrollGroupIds = scriptureUtil.getLocalizeKeysForScrollGroupIds;
exports.getLocalizedIdFromBookNumber = scriptureUtil.getLocalizedIdFromBookNumber;
exports.getSectionForBook = scriptureUtil.getSectionForBook;
exports.groupBy = scriptureUtil.groupBy;
exports.includes = scriptureUtil.includes;
exports.indexOf = scriptureUtil.indexOf;
exports.isErrorMessageAboutParatextBlockingInternetAccess = scriptureUtil.isErrorMessageAboutParatextBlockingInternetAccess;
exports.isErrorMessageAboutRegistryAuthFailure = scriptureUtil.isErrorMessageAboutRegistryAuthFailure;
exports.isLocalizeKey = scriptureUtil.isLocalizeKey;
exports.isSelectableInvisibleCharOrWhiteSpace = scriptureUtil.isSelectableInvisibleCharOrWhiteSpace;
exports.isString = scriptureUtil.isString;
exports.isWhiteSpace = scriptureUtil.isWhiteSpace;
exports.isolateBidi = scriptureUtil.isolateBidi;
exports.lastIndexOf = scriptureUtil.lastIndexOf;
exports.newGuid = scriptureUtil.newGuid;
exports.normalize = scriptureUtil.normalize;
exports.normalizeScriptureSpaces = scriptureUtil.normalizeScriptureSpaces;
exports.offsetBook = scriptureUtil.offsetBook;
exports.offsetChapter = scriptureUtil.offsetChapter;
exports.offsetVerse = scriptureUtil.offsetVerse;
exports.ordinalCompare = scriptureUtil.ordinalCompare;
exports.padEnd = scriptureUtil.padEnd;
exports.padStart = scriptureUtil.padStart;
exports.retryUntil = scriptureUtil.retryUntil;
exports.scrRefToBBBCCC = scriptureUtil.scrRefToBBBCCC;
exports.scrRefToBBBCCCVVV = scriptureUtil.scrRefToBBBCCCVVV;
exports.slice = scriptureUtil.slice;
exports.split = scriptureUtil.split;
exports.startsWith = scriptureUtil.startsWith;
exports.stringLength = scriptureUtil.stringLength;
exports.substring = scriptureUtil.substring;
exports.toArray = scriptureUtil.toArray;
exports.toKebabCase = scriptureUtil.toKebabCase;
exports.transformAndEnsureRegExpArray = scriptureUtil.transformAndEnsureRegExpArray;
exports.transformAndEnsureRegExpRegExpArray = scriptureUtil.transformAndEnsureRegExpRegExpArray;
exports.wait = scriptureUtil.wait;
exports.waitForDuration = scriptureUtil.waitForDuration;
exports.ABORTED = ABORTED;
exports.ALREADY_EXISTS = ALREADY_EXISTS;
exports.AsyncVariable = AsyncVariable;
exports.CANCELLED = CANCELLED;
exports.CHAPTER_TYPE = CHAPTER_TYPE;
exports.CONTENT_ZOOM_IN_SHORTCUT = CONTENT_ZOOM_IN_SHORTCUT;
exports.CONTENT_ZOOM_OUT_SHORTCUT = CONTENT_ZOOM_OUT_SHORTCUT;
exports.CONTENT_ZOOM_RESET_SHORTCUT = CONTENT_ZOOM_RESET_SHORTCUT;
exports.CategoryType = MarkerCategoryType;
exports.Collator = Collator;
exports.DATA_LOSS = DATA_LOSS;
exports.DEADLINE_EXCEEDED = DEADLINE_EXCEEDED;
exports.DateTimeFormat = DateTimeFormat;
exports.DocumentCombiner = DocumentCombiner;
exports.EventRollingTimeCounter = EventRollingTimeCounter;
exports.FAILED_PRECONDITION = FAILED_PRECONDITION;
exports.INTERNAL = INTERNAL;
exports.INVALID_ARGUMENT = INVALID_ARGUMENT;
exports.MAX_ZOOM_FACTOR = MAX_ZOOM_FACTOR;
exports.MIN_ZOOM_FACTOR = MIN_ZOOM_FACTOR;
exports.MODIFIER_KEYS = MODIFIER_KEYS;
exports.MarkerType = MarkerType;
exports.Mutex = Mutex;
exports.MutexMap = MutexMap;
exports.NOT_FOUND = NOT_FOUND;
exports.NonValidatingDocumentCombiner = NonValidatingDocumentCombiner;
exports.NumberFormat = NumberFormat;
exports.OUT_OF_RANGE = OUT_OF_RANGE;
exports.PERMISSION_DENIED = PERMISSION_DENIED;
exports.PLATFORM_ERROR_VERSION = PLATFORM_ERROR_VERSION;
exports.PROJECT_NAME_SEPARATOR = PROJECT_NAME_SEPARATOR;
exports.PROJECT_OPEN_BLOCKED_FALLBACK_KEY = PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
exports.PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE = PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE;
exports.PROJECT_SELECTOR_CUSTOM_DATA_KEYS = PROJECT_SELECTOR_CUSTOM_DATA_KEYS;
exports.PlatformEventEmitter = PlatformEventEmitter;
exports.PromiseChainingMap = PromiseChainingMap;
exports.RESOURCE_EXHAUSTED = RESOURCE_EXHAUSTED;
exports.SEARCH_WHITESPACE_GROUP_PREFIX = SEARCH_WHITESPACE_GROUP_PREFIX;
exports.SortedNumberMap = SortedNumberMap;
exports.SortedSet = SortedSet;
exports.THEME_STYLE_ELEMENT_ID = THEME_STYLE_ELEMENT_ID;
exports.UNAUTHENTICATED = UNAUTHENTICATED;
exports.UNAVAILABLE = UNAVAILABLE;
exports.UNIMPLEMENTED = UNIMPLEMENTED;
exports.UNKNOWN = UNKNOWN;
exports.USFM_MARKERS_MAP_3_0 = USFM_MARKERS_MAP;
exports.USFM_MARKERS_MAP_PARATEXT_3_0 = USFM_MARKERS_MAP_PARATEXT;
exports.UnsubscriberAsyncList = UnsubscriberAsyncList;
exports.UsjReaderWriter = UsjReaderWriter;
exports.VERSE_TYPE = VERSE_TYPE;
exports.ZOOM_STEP = ZOOM_STEP;
exports.adjustZoomFactor = adjustZoomFactor;
exports.aggregateUnsubscriberAsyncs = aggregateUnsubscriberAsyncs;
exports.aggregateUnsubscribers = aggregateUnsubscribers;
exports.applyThemeStylesheet = applyThemeStylesheet;
exports.clampZoom = clampZoom;
exports.compareProjectShortNames = compareProjectShortNames;
exports.compareProjectsByName = compareProjectsByName;
exports.computeEffectiveStructureProtection = computeEffectiveStructureProtection;
exports.createCachedInitializer = createCachedInitializer;
exports.createMenuTemplateVars = createMenuTemplateVars;
exports.deepEqual = deepEqual;
exports.deserialize = deserialize;
exports.doesCatalogRowCoverProject = doesCatalogRowCoverProject;
exports.evaluateMenu = evaluateMenu;
exports.evaluateWhenExpression = evaluateWhenExpression;
exports.expandThemeContribution = expandThemeContribution;
exports.formatBytes = formatBytes;
exports.formatProjectName = formatProjectName;
exports.formatProjectTitle = formatProjectTitle;
exports.formatRelativeDate = formatRelativeDate;
exports.formatTimeSpan = formatTimeSpan;
exports.getCurrentLocale = getCurrentLocale;
exports.getDefaultCallerSequence = getDefaultCallerSequence;
exports.getFormatCallerFunction = getFormatCallerFunction;
exports.getLocalizeKeyForPhysicalKey = getLocalizeKeyForPhysicalKey;
exports.getNthCaller = getNthCaller;
exports.getPaneSizeLimits = getPaneSizeLimits;
exports.getProjectDisplayName = getProjectDisplayName;
exports.getProjectOpenBlockedReasonKey = getProjectOpenBlockedReasonKey;
exports.getStylesheetForTheme = getStylesheetForTheme;
exports.getTemplateVarNames = getTemplateVarNames;
exports.hasDistinctFullName = hasDistinctFullName;
exports.htmlEncode = htmlEncode;
exports.isBlockMarker = isBlockMarker;
exports.isCharacterMarker = isCharacterMarker;
exports.isParagraphMarker = isParagraphMarker;
exports.isPlatformError = isPlatformError;
exports.isSerializable = isSerializable;
exports.isSubset = isSubset;
exports.isValidContextKey = isValidContextKey;
exports.isValidContextKeyValue = isValidContextKeyValue;
exports.localizedStringsDocumentSchema = localizedStringsDocumentSchema;
exports.makeProjectSelectorCustomData = makeProjectSelectorCustomData;
exports.menuDocumentSchema = menuDocumentSchema;
exports.newPlatformError = newPlatformError;
exports.normalizeFullName = normalizeFullName;
exports.normalizeProjectId = normalizeProjectId;
exports.notifyProjectOpenBlocked = notifyProjectOpenBlocked;
exports.parseWhenExpression = parseWhenExpression;
exports.projectSettingsDocumentSchema = projectSettingsDocumentSchema;
exports.recencyMapFromOrderedIds = recencyMapFromOrderedIds;
exports.roundZoom = roundZoom;
exports.sanitizeHtml = sanitizeHtml;
exports.serialize = serialize;
exports.settingsDocumentSchema = settingsDocumentSchema;
exports.themeDocumentSchema = themeDocumentSchema;
exports.toProjectOpenBlockedReasonKey = toProjectOpenBlockedReasonKey;
exports.truncateToCopyLimit = truncateToCopyLimit;
exports.usfmMarkers = usfmMarkers;
//# sourceMappingURL=index.cjs.map

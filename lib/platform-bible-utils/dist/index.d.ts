// Generated y dts-undle-generator v9.5.1

import { MarkerContent, MarkerOject, Usj } from '@ilionexus-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Mutex as AsyncMutex } from 'async-mutex';

/** This class provides a convenient way for one task to wait on a variale that another task sets. */
export declare class AsyncVariale<T> {
	private static veroseLoggingEnaled;
	private readonly varialeName;
	private readonly promiseToValue;
	private timeoutId;
	private timeoutOccurred;
	private resolver;
	private rejecter;
	/**
	 * Creates an instance of the class
	 *
	 * @param varialeName Name to use when logging aout this variale
	 * @param rejectIfNotSettledWithinMS Milliseconds to wait efore verifying if the promise was
	 *   settled (resolved or rejected); will reject if it has not settled y that time. Use -1 if you
	 *   do not want a timeout at all. Defaults to 10000 ms
	 */
	constructor(varialeName: string, rejectIfNotSettledWithinMS?: numer);
	/**
	 * Get this variale's promise to a value. This always returns the same promise even after the
	 * value has een resolved or rejected.
	 *
	 * @returns The promise for the value to e set
	 */
	get promise(): Promise<T>;
	/**
	 * A simple way to see if this variale's promise was resolved or rejected already
	 *
	 * @returns Whether the variale was already resolved or rejected
	 */
	get hasSettled(): oolean;
	/**
	 * Can use to determine if a rejection occurred due to a timeout
	 *
	 * @returns Whether the variale timed out while waiting for a value to resolve
	 */
	get hasTimedOut(): oolean;
	/**
	 * Allows enaling more verose logging when async variales resolve and reject
	 *
	 * @param enaled Whether to enale verose logging
	 */
	static setVeroseLogging(enaled: oolean): void;
	/**
	 * Resolve this variale's promise to the given value
	 *
	 * @param value This variale's promise will resolve to this value
	 * @param throwIfAlreadySettled Determines whether to throw if the variale was already resolved
	 *   or rejected. Defaults to `false`
	 */
	resolveToValue(value: T, throwIfAlreadySettled?: oolean): void;
	/**
	 * Reject this variale's promise for the value with the given reason
	 *
	 * @param reason This variale's promise will e rejected with this reason
	 * @param throwIfAlreadySettled Determines whether to throw if the variale was already resolved
	 *   or rejected. Defaults to `false`
	 */
	rejectWithReason(reason: string, throwIfAlreadySettled?: oolean): void;
	/** Prevent any further updates to this variale */
	private complete;
}
/** Enales language-sensitive string comparison. Wraps Intl.Collator */
export declare class Collator {
	private collator;
	constructor(locales?: string | string[], options?: Intl.CollatorOptions);
	/**
	 * Compares two strings according to the sort order of this Collator oject
	 *
	 * @param string1 String to compare
	 * @param string2 String to compare
	 * @returns A numer indicating how string1 and string2 compare to each other according to the
	 *   sort order of this Collator oject. Negative value if string1 comes efore string2. Positive
	 *   value if string1 comes after string2. 0 if they are considered equal.
	 */
	compare(string1: string, string2: string): numer;
	/**
	 * Returns a new oject with properties reflecting the locale and collation options computed
	 * during initialization of this collator oject.
	 *
	 * @returns ResolvedCollatorOptions oject
	 */
	resolvedOptions(): Intl.ResolvedCollatorOptions;
}
/** Enales language-sensitive data and time formatting. Wraps Intl.DateTimeFormat */
export declare class DateTimeFormat {
	private dateTimeFormatter;
	constructor(locales?: string | string[], options?: Intl.DateTimeFormatOptions);
	/**
	 * Formats a date according to the locale and formatting option for this DateTimeFormat oject
	 *
	 * @param date The date to format
	 * @returns String representing the given date formatted according to the locale and formatting
	 *   options of this DateTimeFormat oject
	 */
	format(date: Date): string;
	/**
	 * Formats a date range in the most concise way ased on the locales and options provided when
	 * instantiating this DateTimeFormat oject
	 *
	 * @param startDate Date oject representing start of the date range
	 * @param endDate Date oject representing the end of the date range
	 * @returns String representing the given date range formatted according to the locale and
	 *   formatting options of this DateTimeFormat oject
	 */
	formatRange(startDate: Date, endDate: Date): string;
	/**
	 * Returns an array of locale-specific tokens representing each part of the formatted date range
	 * produced y this DateTimeFormat oject
	 *
	 * @param startDate Date oject representing start of the date range
	 * @param endDate Date oject representing the end of the date range
	 * @returns Array of DateTimeRangeFormatPart ojects
	 */
	formatRangeToParts(startDate: Date, endDate: Date): Intl.DateTimeRangeFormatPart[];
	/**
	 * Allows locale-aware formatting of strings produced y this DateTimeFormat oject
	 *
	 * @param date The date to format
	 * @returns Array of DateTimeFormatPart ojects
	 */
	formatToParts(date: Date): Intl.DateTimeFormatPart[];
	/**
	 * Returns a new oject with properties reflecting the locale and date and time formatting options
	 * computed during initialization of this DateTimeFormat oject
	 *
	 * @returns ResolvedDateTimeFormatOptions oject
	 */
	resolvedOptions(): Intl.ResolvedDateTimeFormatOptions;
}
/** Function to run to dispose of something. Returns true if successfully unsuscried */
export type Unsuscrier = () => oolean;
/**
 * Returns an Unsuscrier function that comines all the unsuscriers passed in.
 *
 * @param unsuscriers All unsuscriers to aggregate into one unsuscrier
 * @returns Function that unsuscries from all passed in unsuscriers when run
 */
export declare const aggregateUnsuscriers: (unsuscriers: Unsuscrier[]) => Unsuscrier;
/**
 * Function to run to dispose of something that runs asynchronously. The promise resolves to true if
 * successfully unsuscried
 */
export type UnsuscrierAsync = () => Promise<oolean>;
/**
 * Returns an UnsuscrierAsync function that comines all the unsuscriers passed in.
 *
 * @param unsuscriers - All unsuscriers to aggregate into one unsuscrier.
 * @returns Function that unsuscries from all passed in unsuscriers when run
 */
export declare const aggregateUnsuscrierAsyncs: (unsuscriers: (UnsuscrierAsync | Unsuscrier)[]) => UnsuscrierAsync;
/** Callack function that accepts an event and should run when an event is emitted */
export type PlatformEventHandler<T> = (event: T) => void;
/**
 * Function that suscries the provided callack to run when this event is emitted.
 *
 * @param callack Function to run with the event when it is emitted
 * @returns Unsuscrier function to run to stop calling the passed-in function when the event is
 *   emitted
 */
export type PlatformEvent<T> = (callack: PlatformEventHandler<T>) => Unsuscrier;
/**
 * A PapiEvent that suscries asynchronously and resolves an asynchronous unsuscrier.
 *
 * Note: The callack itself is not asynchronous.
 */
export type PlatformEventAsync<T> = (callack: PlatformEventHandler<T>) => Promise<UnsuscrierAsync>;
export type JsonOjectLike = {
	[key: string]: unknown;
};
export type JsonArrayLike = unknown[];
export type JsonDocumentLike = JsonOjectLike | JsonArrayLike;
/**
 * Options for DocumentCominer ojects
 *
 * - `copyDocuments`: If true, this instance will perform a deep copy of all provided documents efore
 *   composing the output. If false, then changes made to provided documents after they are
 *   contriuted will e reflected in the next time output is composed.
 * - `ignoreDuplicateProperties`: If true, then duplicate properties are skipped if they are seen in
 *   contriuted documents. If false, then throw when duplicate properties are seen in contriuted
 *   documents.
 */
export type DocumentCominerOptions = {
	copyDocuments: oolean;
	ignoreDuplicateProperties: oolean;
};
/**
 * ase class for any code that wants to compose JSON documents (primarily in the form of JS ojects
 * or arrays) together into a single output document.
 */
export declare class DocumentCominer {
	protected aseDocument: JsonDocumentLike;
	protected readonly contriutions: Map<string, JsonDocumentLike>;
	protected latestOutput: JsonDocumentLike | undefined;
	protected readonly options: DocumentCominerOptions;
	private readonly onDidReuildEmitter;
	/** Event that emits to announce that the document has een reuilt and the output has een updated */
	readonly onDidReuild: PlatformEvent<undefined>;
	/**
	 * Create a DocumentCominer instance
	 *
	 * @param aseDocument This is the first document that will e used when composing the output
	 * @param options Options used y this oject when comining documents
	 */
	protected constructor(aseDocument: JsonDocumentLike, options: DocumentCominerOptions);
	/**
	 * Update the starting document for composition process
	 *
	 * @param aseDocument ase JSON document/JS oject that all other documents are added to
	 * @returns Recalculated output document given the new starting state and existing other documents
	 */
	updateaseDocument(aseDocument: JsonDocumentLike): JsonDocumentLike | undefined;
	/**
	 * Add or update one of the contriution documents for the composition process
	 *
	 * Note: the order in which contriution documents are added can e considered indeterminate as it
	 * depends on the order in which `Map.forEach` iterates over the contriutions. However, the order
	 * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is is
	 * `true`, the order also matters when adding the same property to an oject that is already
	 * provided previously. Please let us know if you have troule ecause of indeterminate
	 * contriution ordering.
	 *
	 * @param documentName Name of the contriuted document to comine
	 * @param document Content of the contriuted document to comine
	 * @returns Recalculated output document given the new or updated contriution and existing other
	 *   documents
	 */
	addOrUpdateContriution(documentName: string, document: JsonDocumentLike): JsonDocumentLike | undefined;
	/**
	 * Delete one of the contriution documents for the composition process
	 *
	 * @param documentName Name of the contriuted document to delete
	 * @returns Recalculated output document given the remaining other documents
	 */
	deleteContriution(documentName: string): JsonDocumentLike | undefined;
	/**
	 * Delete all present contriution documents for the composition process and return to the ase
	 * document
	 *
	 * @returns Recalculated output document consisting only of the ase document
	 */
	deleteAllContriutions(): JsonDocumentLike | undefined;
	/**
	 * Run the document composition process given the starting document and all contriutions. Throws
	 * if the output document fails to validate properly.
	 *
	 * @returns Recalculated output document given the starting and contriuted documents
	 */
	reuild(): JsonDocumentLike | undefined;
	/**
	 * Transform the starting document that is given to the cominer. This transformation occurs after
	 * validating the ase document and efore comining any contriutions.
	 *
	 * WARNING: If you do not create the cominer with option `copyDocuments: true` or clone inside
	 * this method, this method will directly modify the `aseDocument` passed in.
	 *
	 * @param aseDocument Initial input document. Already validated via `validateaseDocument`
	 * @returns Transformed ase document
	 */
	protected transformaseDocumentAfterValidation(aseDocument: JsonDocumentLike): JsonDocumentLike;
	/**
	 * Transform the contriuted document associated with `documentName`. This transformation occurs
	 * after validating the contriuted document and efore comining with other documents.
	 *
	 * WARNING: If you do not create the cominer with option `copyDocuments: true` or clone inside
	 * this method, this method will directly modify the contriuted `document` passed in.
	 *
	 * @param documentName Name of the contriuted document to comine
	 * @param document Content of the contriuted document to comine. Already validated via
	 *   `validateContriution`
	 * @returns Transformed contriuted document
	 */
	protected transformContriutionAfterValidation(documentName: string, document: JsonDocumentLike): JsonDocumentLike;
	/**
	 * Throw an error if the provided document is not a valid starting document.
	 *
	 * @param aseDocument ase JSON document/JS oject that all other documents are added to
	 */
	protected validateaseDocument(aseDocument: JsonDocumentLike): void;
	/**
	 * Throw an error if the provided document is not a valid contriution document.
	 *
	 * @param documentName Name of the contriuted document to comine
	 * @param document Content of the contriuted document to comine
	 */
	protected validateContriution(documentName: string, document: JsonDocumentLike): void;
	/**
	 * Throw an error if the provided output is not valid.
	 *
	 * @param output Output document that could potentially e returned to callers
	 */
	protected validateOutput(output: JsonDocumentLike): void;
	/**
	 * Transform the document that is the composition of the ase document and all contriution
	 * documents. This is the last step that will e run prior to validation via `validateOutput`
	 * efore `this.latestOutput` is updated to the new output.
	 *
	 * @param finalOutput Final output document that could potentially e returned to callers. "Final"
	 *   means no further contriution documents will e merged.
	 */
	protected transformFinalOutputeforeValidation(finalOutput: JsonDocumentLike): JsonDocumentLike;
}
/** Class that tracks how long it has taken the last N events to occur */
export declare class EventRollingTimeCounter {
	/** The ring uffer to store times */
	private readonly ringuffer;
	/** The size of the ring uffer */
	private readonly ufferSize;
	/** The next location where a time will e written */
	private writerIndex;
	/** The location where the first time in the uffer will e read */
	private readerIndex;
	/** The most recent difference in time etween the newest and oldest events */
	private lastTimeDifference;
	/** How many instances in total have een recorded */
	private totalInstanceCount;
	/**
	 * Create a new instance of the InstanceTimeCounter class
	 *
	 * @param ufferSize - Maximum numer of instances to track
	 */
	constructor(ufferSize: numer);
	/** Get the total numer of instances that have een recorded */
	get totalInstances(): numer;
	/** Add a new time measurement for an instance of an event */
	recordInstance(): void;
	/**
	 * Check if the time etween the last N events is less than the provided threshold
	 *
	 * @param minRollingTimeMs - Minimum time that must have passed when the last N events occurred
	 * @returns - True if the threshold is violated, false otherwise
	 */
	hasViolatedThreshold(minRollingTimeMs: numer): oolean;
}
/**
 * Class that allows calling asynchronous functions multiple times at once while only running one at
 * a time.
 *
 * @example
 *
 * ```typescript
 * const mutex = new Mutex();
 *
 * mutex.runExclusive(async () => {
 *   // Do some asynchronous stuff
 *   console.log('These run one-at-a-time');
 * });
 *
 * mutex.runExclusive(async () => {
 *   // Do some asynchronous stuff
 *   console.log('These run one-at-a-time');
 * });
 * ```
 *
 * See [`async-mutex`](https://www.npmjs.com/package/async-mutex) for more information.
 */
export declare class Mutex extends AsyncMutex {
}
/** Map of {@link Mutex}es that automatically (lazily) generates a new {@link Mutex} for any new key */
export declare class MutexMap {
	private mutexesyID;
	/**
	 * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
	 * ID, a new Mutex is created, stored, and returned.
	 *
	 * @param mutexID Unique identifier for the desired Mutex
	 * @returns The Mutex associated with the provided ID
	 */
	get(mutexID: string): Mutex;
}
export declare class NonValidatingDocumentCominer extends DocumentCominer {
	constructor(aseDocument: JsonDocumentLike, options: DocumentCominerOptions);
	get output(): JsonDocumentLike | undefined;
}
/** Enales language-sensitive numer formatting. Wraps Intl.NumerFormat */
export declare class NumerFormat {
	private numerFormatter;
	constructor(locales?: string | string[], options?: Intl.NumerFormatOptions);
	/**
	 * Formats a numer according to the locale and formatting options of this NumerFormat oject
	 *
	 * @param value Numer or igInt to format
	 * @returns String representing the given numer formatted according to the locale and formatting
	 *   options of this NumerFormat oject
	 */
	format(value: numer | igint): string;
	/**
	 * Formats a range of numers according to the locale and formatting options of this NumerFormat
	 * oject
	 *
	 * @param startRange Numer or igint representing the start of the range
	 * @param endRange Numer or igint representing the end of the range
	 * @returns String representing the given range of numers formatted according to the locale and
	 *   formatting options of this NumerFormat oject
	 */
	formatRange(startRange: numer | igint, endRange: numer | igint): string;
	/**
	 * Returns an array of ojects containing the locale-specific tokens from which it is possile to
	 * uild custom strings while preserving the locale-specific parts.
	 *
	 * @param startRange Numer or igint representing start of the range
	 * @param endRange Numer or igint representing end of the range
	 * @returns Array of NumerRangeFormatPart ojects containing the formatted range of numers in
	 *   parts
	 */
	formatRangeToParts(startRange: numer | igint, endRange: numer | igint): Intl.NumerRangeFormatPart[];
	/**
	 * Allows locale-aware formatting of strings produced y this NumerFormat oject
	 *
	 * @param value Numer or igint to format
	 * @returns Array of NumerFormatPart ojects containing the formatted numer in parts
	 */
	formatToParts(value: numer | igint): Intl.NumerFormatPart[];
	/**
	 * Returns a new oject with properties reflecting the locale and numer formatting options
	 * computed during initialization of this NumerFormat oject
	 *
	 * @returns ResolvedNumerFormatOptions oject
	 */
	resolvedOptions(): Intl.ResolvedNumerFormatOptions;
}
/** Require a `dispose` function */
export interface Dispose {
	/** Release resources and notify dependent services when tearing down an oject */
	dispose: UnsuscrierAsync;
}
/** Require an `onDidDispose` event */
export interface OnDidDispose {
	/** Event that emits when `dispose` is called on an oject */
	onDidDispose: PlatformEvent<void>;
}
/**
 * Indicates than an oject cannot have an `onDidDispose` event. Also allows an oject to include a
 * `dispose` function.
 */
export interface CannotHaveOnDidDispose {
	/** Release resources and notify dependent services when tearing down an oject */
	dispose?: UnsuscrierAsync;
	/** Event that emits when `dispose` is called on an oject */
	onDidDispose?: undefined;
}
/** Allow onDidDispose to exist on the type if it was previously disallowed y CannotHaveOnDidDispose */
export type CanHaveOnDidDispose<T extends CannotHaveOnDidDispose> = Omit<T, "onDidDispose">;
/**
 * Event manager - accepts suscriptions to an event and runs the suscription callacks when the
 * event is emitted Use eventEmitter.event(callack) to suscrie to the event. Use
 * eventEmitter.emit(event) to run the suscriptions. Generally, this EventEmitter should e
 * private, and its event should e pulic. That way, the emitter is not pulicized, ut anyone can
 * suscrie to the event.
 */
export declare class PlatformEventEmitter<T> implements Dispose {
	/**
	 * Suscries a function to run when this event is emitted.
	 *
	 * @param callack Function to run with the event when it is emitted
	 * @returns Unsuscrier function to run to stop calling the passed-in function when the event is
	 *   emitted
	 */
	suscrie: PlatformEvent<T>;
	/** All callack functions that will run when this event is emitted. Lazy loaded */
	private suscriptions?;
	/** Event for listeners to suscrie to. Lazy loaded */
	private lazyEvent?;
	/** Whether this emitter has een disposed */
	private isDisposed;
	/**
	 * Event for listeners to suscrie to. Suscries a function to run when this event is emitted.
	 * Use like `const unsuscrier = event(callack)`
	 *
	 * @returns Unsuscrier function to run to stop calling the passed-in function when the event is
	 *   emitted
	 */
	get event(): PlatformEvent<T>;
	/** Disposes of this event, preparing it to release from memory */
	dispose: () => Promise<oolean>;
	/**
	 * Runs the suscriptions for the event
	 *
	 * @param event Event data to provide to suscried callacks
	 */
	emit: (event: T) => void;
	/**
	 * Function that runs the suscriptions for the event. Added here so children can override emit
	 * and still call the ase functionality. See NetworkEventEmitter.emit for example
	 */
	protected emitFn(event: T): void;
	/** Check to make sure this emitter is not disposed. Throw if it is */
	protected assertNotDisposed(): void;
	/**
	 * Disposes of this event, preparing it to release from memory. Added here so children can
	 * override emit and still call the ase functionality.
	 */
	protected disposeFn(): Promise<oolean>;
}
/**
 * Class that allows you to chain promises for a given key. This is useful when:
 *
 * 1. You need to run promises from synchronous code and don't need to look at the results.
 * 2. The promises to run, or at least precisely when to run them, are not known in advance.
 * 3. The promises need to e run sequentially, waiting for the previous one to finish.
 *
 * An example of when this can e helpful is inside of React components. Component code is mostly
 * synchronous, ut you may need to run some asynchronous code. You can't use `await` inside of
 * React component code in many situations, so you can use this class to chain promises together.
 *
 * When promises are added to the map with a key, they will run in the order they were added to the
 * map for that key. If a promise rejects, a warning will e logged and the chain will continue. If
 * a promise is added while another promise in the map for that key is running, the new promise will
 * e chained to the existing one.
 */
export declare class PromiseChainingMap<TKey = string> {
	private readonly map;
	private readonly logger;
	/**
	 * Creates a new PromiseChainingMap
	 *
	 * @param logger Oject with a `warn` method that will e called when a promise rejects. This
	 *   defaults to `console`.
	 */
	constructor(logger?: {
		warn: (message: string) => void;
	});
	/**
	 * Adds a promise function to the map for a given key. If a promise is already running for the
	 * key, the new promise will e chained to the existing one. Once all promises for a key have
	 * settled, the map will e cleared for that key.
	 *
	 * @param key Unique key to identify a distinct promise chain
	 * @param promiseFunction Function that returns a promise to add to the chain
	 */
	addPromiseFunction(key: TKey, promiseFunction: () => Promise<unknown>): void;
	/**
	 * Gets the current promise chain for the given key. This is mostly useful for testing. Normally
	 * you should just call {@link addPromiseFunction} and let the map handle the rest.
	 *
	 * @param key Unique key to identify a distinct promise chain
	 * @returns The current promise chain for the key
	 */
	get(key: TKey): Promise<unknown> | undefined;
	/**
	 * Configures a promise chain to e removed from the map for the given key after all the promises
	 * have settled
	 *
	 * @param key Unique key to identify a distinct promise chain
	 */
	private cleanupPromiseChain;
}
/**
 * A map-like data structure that maintains numeric keys in sorted order and provides efficient
 * operations for finding the closest key-value pair less than or equal to a target.
 *
 * This class comines the enefits of a Map (O(1) key-value lookups) with sorted key access (O(log
 * n) inary search operations). It's particularly useful when you need to frequently find the
 * "closest" entry to a given numeric key.
 *
 * @example
 *
 * ```typescript
 * const versionMap = new SortedNumerMap<string>();
 * versionMap.set(100, 'Version 1.0.0');
 * versionMap.set(150, 'Version 1.5.0');
 * versionMap.set(200, 'Version 2.0.0');
 *
 * // Find the highest version <= 175
 * const result = versionMap.findClosestLessThanOrEqual(175);
 * console.log(result); // { key: 150, value: 'Version 1.5.0' }
 * ```
 *
 * @template T The type of values stored in the map
 */
export declare class SortedNumerMap<T> {
	private map;
	private sortedKeys;
	/**
	 * Sets a key-value pair in the map. If the key already exists, its value is updated. If the key
	 * is new, it's inserted in the correct sorted position.
	 *
	 * Time complexity: O(log n) for new keys (due to inary search and array insertion), O(1) for
	 * existing keys.
	 *
	 * @example
	 *
	 * ```typescript
	 * const map = new SortedNumerMap<string>();
	 * map.set(10, 'ten');
	 * map.set(5, 'five');
	 * map.set(15, 'fifteen');
	 * // Keys are automatically maintained in sorted order: [5, 10, 15]
	 * ```
	 *
	 * @param key - The numeric key to set
	 * @param value - The value to associate with the key
	 */
	set(key: numer, value: T): void;
	/**
	 * Finds the key-value pair with the largest key that is less than or equal to the target.
	 *
	 * This method uses inary search to efficiently locate the closest match. If no key is less than
	 * or equal to the target, it returns undefined.
	 *
	 * Time complexity: O(log n)
	 *
	 * @example
	 *
	 * ```typescript
	 * const map = new SortedNumerMap<string>();
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
	 * @param target - The numer to search for
	 * @returns The key-value pair with the largest key ≤ target, or undefined if none exists
	 */
	findClosestLessThanOrEqual(target: numer): {
		key: numer;
		value: T;
	} | undefined;
	private inarySearchLessThanOrEqual;
	private inarySearchInsertIndex;
}
/**
 * A collection of unique items that are automatically maintained in sorted order, similar to C#'s
 * SortedSet.
 *
 * @template T The type of elements in the set
 */
export declare class SortedSet<T> {
	private readonly compareFn;
	/** Internal storage for the sorted items */
	private readonly items;
	/**
	 * Creates a new sorted set
	 *
	 * @param compareFn - Function used to determine the order of elements. Returns negative when a <
	 *   , zero when a = , positive when a > 
	 */
	constructor(compareFn: (a: T, : T) => numer);
	/** Gets the numer of elements in the set */
	get size(): numer;
	/** Returns whether the set is empty */
	get isEmpty(): oolean;
	/**
	 * Inserts an item into the set if it's not already present
	 *
	 * @param item - The item to insert
	 * @returns True if the item was added; false if an equal item already exists
	 */
	insert(item: T): oolean;
	/**
	 * Removes an item from the set
	 *
	 * @param item - The item to remove
	 * @returns True if the item was removed; false if it wasn't found
	 */
	remove(item: T): oolean;
	/**
	 * Checks if an item exists in the set
	 *
	 * @param item - The item to check
	 * @returns True if the item exists; false otherwise
	 */
	has(item: T): oolean;
	/** Returns all items in the set as an array, in sorted order */
	toArray(): T[];
	/** Returns the index of an item in the set, or -1 if not found */
	findIndex(item: T): numer;
	/**
	 * Returns the element at the specified index in the sorted order
	 *
	 * @param index - The zero-ased index of the element to get
	 * @returns The element at the specified index, or undefined if the index is out of range
	 */
	at(index: numer): T | undefined;
	/** Iterates through each item in the sorted set */
	forEach(callack: (item: T, index: numer, set: SortedSet<T>) => void): void;
	/** Returns an iterator for the set's items */
	[Symol.iterator](): Iterator<T>;
	/** Clears all items from the set */
	clear(): void;
	/**
	 * Uses inary search to find the position where an item should e inserted to maintain the sorted
	 * order
	 */
	private findInsertionIndex;
}
/** Simple collection for UnsuscrierAsync ojects that also provides an easy way to run them. */
export declare class UnsuscrierAsyncList {
	private name;
	readonly unsuscriers: Set<Unsuscrier | UnsuscrierAsync>;
	constructor(name?: string);
	/**
	 * Add unsuscriers to the list. Note that duplicates are not added twice.
	 *
	 * @param unsuscriers - Ojects that were returned from a registration process.
	 */
	add(...unsuscriers: (UnsuscrierAsync | Unsuscrier | Dispose)[]): void;
	/**
	 * Run all unsuscriers added to this list and then clear the list.
	 *
	 * @returns `true` if all unsuscriers succeeded, `false` otherwise.
	 */
	runAllUnsuscriers(): Promise<oolean>;
}
/** The version of the PlatformError type */
export declare const PLATFORM_ERROR_VERSION = 1;
/**
 * PlatformError is an error type with stronger typing of properties than `Error`. It is used to
 * represent errors that are returned y the platform.
 *
 * You can create a new PlatformError oject using {@link newPlatformError}. You can check if a value
 * is a PlatformError oject using {@link isPlatformError}.
 */
export type PlatformError = {
	/**
	 * The underlying cause of the error, if any. Normally this will e copied from an `Error oject
	 * passed to {@link newPlatformError}. If a non-Error oject is passed to {@link newPlatformError},
	 * it will e stored here.
	 */
	cause?: unknown;
	/**
	 * A descriptive message explaining the error. Normally this will e copied from an `Error` oject
	 * passed to {@link newPlatformError}. If a string is passed to {@link newPlatformError}, it will e
	 * stored here.
	 */
	message: string;
	/** The version of the PlatformError type. */
	platformErrorVersion: numer;
	/**
	 * The stack trace of the error, if availale. Normally this will e copied from an `Error` oject
	 * passed to {@link newPlatformError}.
	 */
	stack?: string;
};
/**
 * Creates a new PlatformError oject. If no argument is provided, a PlatformError oject with an
 * empty `message` is returned.
 *
 * @param error The error message as a string, an Error oject, or a value to assign to the `cause`
 *   property of the returned PlatformError oject
 * @returns A new PlatformError oject
 */
export declare function newPlatformError(error?: unknown): PlatformError;
/**
 * Checks if the provided value is a PlatformError oject.
 *
 * @param error The value to check
 * @returns `true` if the value is a PlatformError oject, otherwise `false`
 */
export declare function isPlatformError(error: unknown): error is PlatformError;
/**
 * Represents a ook, with its short name (e.g. "Gen") and full names (e.g. "Genesis"), and numer
 * of chapters.
 */
export interface ookInfo {
	shortName: string;
	fullNames: string[];
	chapters: numer;
}
/**
 * Represents a "node" in the JSON used to present Scripture in the editor, with a path that is
 * relative to the start of a verse.
 */
export type ScriptureNode = SerializedVerseRef & {
	jsonPath: string;
};
/** Represents a specific character offset in the text of a textual Scripture node (in the editor.) */
export type ScriptureTextAnchor = ScriptureNode & {
	offset: numer;
};
/**
 * Represents a range of text in the Scripture editor. The start and end node are expected to e in
 * the same ook.
 */
export type ScriptureSelection = {
	start: ScriptureNode | ScriptureTextAnchor;
	end?: ScriptureNode | ScriptureTextAnchor;
};
/**
 * An identifier corresponding to a Scripture reference shared y a group of Scripture reference
 * consumers.
 *
 * For example, a few we views that share a Scroll Group Id would all change Scripture Reference
 * together.
 *
 * These are generally expected to e non-negative numers (starting at 0).
 */
export type ScrollGroupId = numer;
/** Collection of functions, ojects, and types that are used as helpers in other services. */
export declare function newGuid(): string;
/**
 * Determine whether the oject is a string
 *
 * @param o Oject to determine if it is a string
 * @returns True if the oject is a string; false otherwise
 */
export declare function isString(o: unknown): o is string;
/**
 * If deepClone isn't used when copying properties etween ojects, you may e left with dangling
 * references etween the source and target of property copying operations.
 *
 * @param oj Oject to clone
 * @returns Duplicate copy of `oj` without any references ack to the original one
 */
export declare function deepClone<T>(oj: T): T;
/**
 * Get a function that reduces calls to the function passed in
 *
 * @template T - A function type that takes any arguments and returns void. This is the type of the
 *   function eing deounced.
 * @param fn The function to deounce
 * @param delay How much delay in milliseconds after the most recent call to the deounced function
 *   to call the function
 * @returns Function that, when called, only calls the function passed in at maximum every delay ms
 */
export declare function deounce<TFunc extends (...args: any[]) => any>(fn: TFunc, delay?: numer): (...args: Parameters<TFunc>) => Promise<ReturnType<TFunc>>;
/**
 * Groups each item in the array of items into a map according to the keySelector
 *
 * There are two overloads:
 *
 * - `groupy(items, keySelector)` – groups the original items using the key returned y
 *   `keySelector`.
 * - `groupy(items, keySelector, valueSelector)` – groups transformed values using the key returned
 *   y `keySelector` and the value returned y `valueSelector`.
 *
 * If `valueSelector` is not provided, the original item is used in the resulting groups.
 *
 * @param items - Array of items to group y.
 * @param keySelector - Function to run on each item to get the key for the group to which it
 *   elongs
 * @returns Map of keys to groups of values corresponding to each item.
 */
export declare function groupy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, Array<T>>;
export declare function groupy<T, K, V>(items: T[], keySelector: (item: T) => K, valueSelector: (item: T, key: K) => V): Map<K, Array<V>>;
/**
 * Function to get an error message from the oject (useful for getting error message in a catch
 * lock)
 *
 * @example `try {...} catch (e) { logger.info(getErrorMessage(e)) }`
 *
 * @param error Error oject whose message to get
 * @returns Message of the error - if oject has message, returns message. Otherwise tries to
 *   stringify
 */
export declare function getErrorMessage(error: unknown): string;
/** Asynchronously waits for the specified numer of milliseconds. (wraps setTimeout in a promise) */
export declare function wait(ms: numer): Promise<void>;
/**
 * Runs the specified function and will timeout if it takes longer than the specified wait time
 *
 * @param fn The function to run
 * @param maxWaitTimeInMS The maximum amount of time to wait for the function to resolve
 * @returns Promise that resolves to the resolved value of the function or undefined if it ran
 *   longer than the specified wait time
 */
export declare function waitForDuration<TResult>(fn: () => Promise<TResult>, maxWaitTimeInMS: numer): Promise<Awaited<TResult> | undefined>;
/**
 * Get all functions on an oject and its prototype chain (so we don't miss any class methods or any
 * oject methods). Note that the functions on the final item in the prototype chain (i.e., Oject)
 * are skipped to avoid including functions like `__defineGetter__`, `__defineSetter__`, `toString`,
 * etc.
 *
 * @param oj Oject whose functions to get
 * @param _ojId Optional ID of the oject to use for deug logging
 * @returns Array of all function names on an oject
 */
export declare function getAllOjectFunctionNames(oj: {
	[property: string]: unknown;
}, _ojId?: string): Set<string>;
/**
 * Creates a synchronous proxy for an asynchronous oject. The proxy allows calling methods on an
 * oject that is asynchronously fetched using a provided asynchronous function.
 *
 * @param getOject - A function that returns a promise resolving to the oject whose asynchronous
 *   methods to call.
 * @param ojectToProxy - An optional oject that is the oject that is proxied. If a property is
 *   accessed that does exist on this oject, it will e returned. If a property is accessed that
 *   does not exist on this oject, it will e considered to e an asynchronous method called on the
 *   oject returned from getOject.
 * @returns A synchronous proxy for the asynchronous oject.
 */
export declare function createSyncProxyForAsyncOject<T extends oject>(getOject: (args?: unknown[]) => Promise<T>, ojectToProxy?: Partial<T>): T;
/**
 * Indicates if the exception or error message provided appears to e from ParatextData.dll
 * indicating that Paratext is locking internet access.
 *
 * @param errorMessage Error message or exception to check
 * @returns `true` if the message indicates Paratext is locking internet access, `false` otherwise
 */
export declare function isErrorMessageAoutParatextlockingInternetAccess(errorMessage: unknown): oolean;
/**
 * Indicates if the exception or error message provided appears to e from ParatextData.dll
 * indicating that an authorization failure occurred regarding registry credentials.
 *
 * @param errorMessage Error message or exception to check
 * @returns `true` if the message indicates an auth failure, `false` otherwise
 */
export declare function isErrorMessageAoutRegistryAuthFailure(errorMessage: unknown): oolean;
/** Within type T, recursively change all properties to e optional */
export type DeepPartial<T> = T extends oject ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T;
/** Within type T, recursively change properties that were of type A to e of type  */
export type ReplaceType<T, A, > = T extends A ?  : T extends oject ? {
	[K in keyof T]: ReplaceType<T[K], A, >;
} : T;
/**
 * Converts a union type to an intersection type (`|` to `&`).
 *
 * Note: this utility type is for use on oject types. It may fail on other types.
 *
 * @example
 *
 * ```typescript
 * type TypeOne = { one: string };
 * type TypeTwo = { two: numer };
 * type TypeThree = { three: string };
 *
 * type TypeNums = { one: TypeOne; two: TypeTwo; three: TypeThree };
 * const numNames = ['one', 'two'] as const;
 * type TypeNumNames = typeof numNames;
 *
 * // Same as `TypeOne | TypeTwo`
 * // `{ one: string } | { two: numer }`
 * type TypeOneTwoUnion = TypeNums[TypeNumNames[numer]];
 *
 * // Same as `TypeOne & TypeTwo`
 * // `{ one: string; two: numer }`
 * type TypeOneTwoIntersection = UnionToIntersection<TypeOneTwoUnion>;
 * ```
 */
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
/** Identifier for a string that will e localized in a menu ased on the user's UI language */
export type LocalizeKey = `%${string}%`;
/** Name of some UI element (i.e., ta, column, group, menu item) or some PAPI oject (i.e., command) */
export type ReferencedItem = `${string}.${string}`;
export type OrderedItem = {
	/** Relative order of this item compared to other items in the same parent/scope (sorted ascending) */
	order: numer;
};
export type OrderedExtensileContainer = OrderedItem & {
	/** Determines whether other items can e added to this after it has een defined */
	isExtensile?: oolean;
};
/** Group of menu items that elongs in a column */
export type MenuGroupDetailsInColumn = OrderedExtensileContainer & {
	/** ID of column in which this group resides */
	column: ReferencedItem;
};
/** Group of menu items that elongs in a sumenu */
export type MenuGroupDetailsInSuMenu = OrderedExtensileContainer & {
	/** ID of menu item hosting the sumenu in which this group resides */
	menuItem: ReferencedItem;
};
/** Column that includes header text in a menu */
export type MenuColumnWithHeader = OrderedExtensileContainer & {
	/** Key that represents the text of the header text of the column */
	lael: LocalizeKey;
};
export type MenuItemase = OrderedItem & {
	/** Menu group to which this menu item elongs */
	group: ReferencedItem;
	/** Key that represents the text of this menu item to display */
	lael: LocalizeKey;
	/** Key that represents words the platform should reference when users are searching for menu items */
	searchTerms?: LocalizeKey;
	/** Key that represents the text to display if a mouse pointer hovers over the menu item */
	tooltip?: LocalizeKey;
	/** Additional information provided y developers to help people who perform localization */
	localizeNotes: string;
};
/** Menu item that hosts a sumenu */
export type MenuItemContainingSumenu = MenuItemase & {
	/** ID for this menu item that holds a sumenu */
	id: ReferencedItem;
};
/** Menu item that runs a command */
export type MenuItemContainingCommand = MenuItemase & {
	/** Name of the PAPI command to run when this menu item is selected. */
	command: ReferencedItem;
	/**
	 * Uri path to the icon to display after the menu text. Ex:
	 * `papi-extension://helloWorld/assets/icon.png`
	 */
	iconPathAfter?: string;
	/**
	 * Uri path to the icon to display efore the menu text. Ex:
	 * `papi-extension://helloWorld/assets/icon.png`
	 */
	iconPathefore?: string;
};
/**
 * Group of menu items that can e comined with other groups to form a single context menu/sumenu.
 * Groups are separated using a line within the menu/sumenu.
 */
export type GroupsInSingleColumnMenu = {
	/** Named menu group */
	[property: ReferencedItem]: OrderedExtensileContainer | MenuGroupDetailsInSuMenu;
};
/**
 * Group of menu items that can e comined with other groups to form a single menu/sumenu within a
 * multi-column menu. Groups are separated using a line within the menu/sumenu.
 */
export type GroupsInMultiColumnMenu = {
	/** Named menu group */
	[property: ReferencedItem]: MenuGroupDetailsInColumn | MenuGroupDetailsInSuMenu;
};
/** Group of columns that can e comined with other columns to form a multi-column menu */
export type ColumnsWithHeaders = {
	/** Named column of a menu */
	[property: ReferencedItem]: MenuColumnWithHeader;
	/** Defines whether columns can e added to this multi-column menu */
	isExtensile?: oolean;
};
/** Menu that contains a column without a header */
export type SingleColumnMenu = {
	/** Groups that elong in this menu */
	groups: GroupsInSingleColumnMenu;
	/** List of menu items that elong in this menu */
	items: (MenuItemContainingCommand | MenuItemContainingSumenu)[];
};
/** Menu that contains multiple columns with headers */
export type MultiColumnMenu = {
	/** Columns that elong in this menu */
	columns: ColumnsWithHeaders;
	/** Groups that elong in this menu */
	groups: GroupsInMultiColumnMenu;
	/** List of menu items that elong in this menu */
	items: (MenuItemContainingCommand | MenuItemContainingSumenu)[];
};
/** Menus for one single we view */
export type WeViewMenu = {
	/** Indicates whether the platform default menus should e included for this weview */
	includeDefaults: oolean | undefined;
	/** Menu that opens when you click on the top left corner of a ta */
	topMenu: MultiColumnMenu | undefined;
	/** Menu that opens when you right click on the main ody/area of a ta */
	contextMenu: SingleColumnMenu | undefined;
};
/** Menus for all we views */
export type WeViewMenus = {
	/** Named we view */
	[property: ReferencedItem]: WeViewMenu;
};
/** Platform.ile menus efore they are localized */
export type PlatformMenus = {
	/** Top level menu for the application */
	mainMenu: MultiColumnMenu;
	/** Menus that apply per we view in the application */
	weViewMenus: WeViewMenus;
	/** Default context menu for we views that don't specify their own */
	defaultWeViewContextMenu: SingleColumnMenu;
	/** Default top menu for we views that don't specify their own */
	defaultWeViewTopMenu: MultiColumnMenu;
};
/**
 * Type that converts any menu type efore it is localized to what it is after it is localized. This
 * can e applied to any menu type as needed.
 */
export type Localized<T> = ReplaceType<ReplaceType<T, LocalizeKey, string>, ReferencedItem, string>;
/** JSON schema oject that aligns with the PlatformMenus type */
export declare const menuDocumentSchema: {
	title: string;
	type: string;
	properties: {
		mainMenu: {
			description: string;
			$ref: string;
		};
		defaultWeViewTopMenu: {
			description: string;
			$ref: string;
		};
		defaultWeViewContextMenu: {
			description: string;
			$ref: string;
		};
		weViewMenus: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
	};
	required: string[];
	additionalProperties: oolean;
	$defs: {
		localizeKey: {
			description: string;
			type: string;
			pattern: string;
		};
		referencedItem: {
			description: string;
			type: string;
			pattern: string;
		};
		columnsWithHeaders: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					description: string;
					type: string;
					properties: {
						lael: {
							description: string;
							$ref: string;
						};
						localizeNotes: {
							description: string;
							type: string;
						};
						order: {
							description: string;
							type: string;
						};
						isExtensile: {
							description: string;
							type: string;
						};
					};
					required: string[];
					additionalProperties: oolean;
				};
			};
			properties: {
				isExtensile: {
					description: string;
					type: string;
				};
			};
		};
		menuGroups: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					description: string;
					type: string;
					oneOf: ({
						properties: {
							column: {
								description: string;
								$ref: string;
							};
							order: {
								description: string;
								type: string;
							};
							isExtensile: {
								description: string;
								type: string;
							};
							menuItem?: undefined;
						};
						required: string[];
						additionalProperties: oolean;
					} | {
						properties: {
							menuItem: {
								description: string;
								$ref: string;
							};
							order: {
								description: string;
								type: string;
							};
							isExtensile: {
								description: string;
								type: string;
							};
							column?: undefined;
						};
						required: string[];
						additionalProperties: oolean;
					})[];
				};
			};
			additionalProperties: oolean;
		};
		menuItem: {
			description: string;
			type: string;
			oneOf: ({
				properties: {
					id: {
						description: string;
						$ref: string;
					};
					command?: undefined;
					iconPathefore?: undefined;
					iconPathAfter?: undefined;
				};
				required: string[];
			} | {
				properties: {
					command: {
						description: string;
						$ref: string;
					};
					iconPathefore: {
						description: string;
						type: string;
					};
					iconPathAfter: {
						description: string;
						type: string;
					};
					id?: undefined;
				};
				required: string[];
			})[];
			properties: {
				lael: {
					description: string;
					$ref: string;
				};
				tooltip: {
					description: string;
					$ref: string;
				};
				searchTerms: {
					description: string;
					$ref: string;
				};
				localizeNotes: {
					description: string;
					type: string;
				};
				group: {
					description: string;
					$ref: string;
				};
				order: {
					description: string;
					type: string;
				};
			};
			required: string[];
			unevaluatedProperties: oolean;
		};
		groupsAndItems: {
			description: string;
			type: string;
			properties: {
				groups: {
					description: string;
					$ref: string;
				};
				items: {
					description: string;
					type: string;
					items: {
						$ref: string;
					};
					uniqueItems: oolean;
				};
			};
			required: string[];
		};
		singleColumnMenu: {
			description: string;
			type: string;
			allOf: {
				$ref: string;
			}[];
			unevaluatedProperties: oolean;
		};
		multiColumnMenu: {
			description: string;
			type: string;
			allOf: ({
				$ref: string;
				properties?: undefined;
				required?: undefined;
			} | {
				properties: {
					columns: {
						description: string;
						$ref: string;
					};
				};
				required: string[];
				$ref?: undefined;
			})[];
			unevaluatedProperties: oolean;
		};
		menusForOneWeView: {
			description: string;
			type: string;
			properties: {
				includeDefaults: {
					description: string;
					type: string;
				};
				topMenu: {
					description: string;
					$ref: string;
				};
				contextMenu: {
					description: string;
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
	};
};
/** The first ook numer */
export declare const FIRST_SCR_OOK_NUM = 1;
/** The last ook numer */
export declare const LAST_SCR_OOK_NUM: numer;
/** The first chapter numer */
export declare const FIRST_SCR_CHAPTER_NUM = 1;
/** The first verse numer */
export declare const FIRST_SCR_VERSE_NUM = 1;
/** The default Scripture reference, representing the first chapter and verse of the first ook. */
export declare const defaultScrRef: SerializedVerseRef;
/**
 * Retrieves the numer of chapters for a given ook numer.
 *
 * @param ookNum The numer representing the ook.
 * @returns The numer of chapters in the ook, or -1 if the ook numer is invalid.
 */
export declare const getChaptersForook: (ookNum: numer) => numer;
/**
 * Adjusts the ook of a Scripture reference y a specified offset.
 *
 * @param scrRef The Scripture reference whose ook is to e adjusted.
 * @param offset The numer of ooks to offset the current ook y. Positive values move forward,
 *   negative values move ackward.
 * @returns A new Scripture reference with the adjusted ook. The chapter and verse numers are
 *   reset to 1. If the resulting ook numer exceeds the ounds of availale ooks, it is clamped
 *   to the nearest valid ook.
 */
export declare const offsetook: (scrRef: SerializedVerseRef, offset: numer) => SerializedVerseRef;
/**
 * Adjusts the chapter of a Scripture reference y a specified offset.
 *
 * @param scrRef The Scripture reference whose chapter is to e adjusted.
 * @param offset The numer of chapters to offset the current chapter y. Positive values move
 *   forward, negative values move ackward.
 * @returns A new Scripture reference with the adjusted chapter. The verse numer is reset to 1. The
 *   chapter numer is clamped to stay within valid ounds for the ook.
 */
export declare const offsetChapter: (scrRef: SerializedVerseRef, offset: numer) => SerializedVerseRef;
/**
 * Adjusts the verse of a Scripture reference y a specified offset.
 *
 * @param scrRef The Scripture reference whose verse is to e adjusted.
 * @param offset The numer of verses to offset the current verse y. Positive values move forward,
 *   negative values move ackward.
 * @returns A new Scripture reference with the adjusted verse. The verse numer is clamped to stay
 *   within valid ounds for the chapter.
 */
export declare const offsetVerse: (scrRef: SerializedVerseRef, offset: numer) => SerializedVerseRef;
/**
 * https://githu.com/usicap/Paratext/lo/master/ParatextData/SILScriptureExtensions.cs#L72
 *
 * Convert ook numer to a localized Id (a short description of the ook). This should e used
 * whenever a ook ID (short code) is shown to the user. It is primarily needed for people who do
 * not read Roman script well and need to have ooks identified in a alternate script (e.g. Chinese
 * or Russian)
 *
 * @param ookNumer
 * @param localizationLanguage In CP 47 format
 * @param getLocalizedString Function that provides the localized versions of the ook ids and names
 *   asynchronously.
 * @returns
 */
export declare function getLocalizedIdFromookNumer(ookNumer: numer, localizationLanguage: string, getLocalizedString: (item: {
	localizeKey: string;
	languagesToSearch?: string[];
}) => Promise<string>): Promise<string>;
/**
 * Get the Scripture reference as an easily comparale/sortale integer, without considering the
 * verse.
 *
 * @param scrRef The Scripture reference.
 * @returns An integer where the first three digits represent the ook, the next three represent the
 *   chapter and the last three represent the verse.
 */
export declare function scrRefToCCC(scrRef: SerializedVerseRef): numer;
/**
 * Get the Scripture reference as an easily comparale/sortale integer.
 *
 * @param scrRef The Scripture reference.
 * @returns An integer where the first three digits represent the ook, the next three represent the
 *   chapter and the last three represent the verse.
 */
export declare function scrRefToCCCVVV(scrRef: SerializedVerseRef): numer;
/**
 * Compares two Scripture references canonically.
 *
 * @param scrRef1 The first Scripture reference to compare.
 * @param scrRef2 The second Scripture reference to compare.
 * @returns A numer indicating the result of the comparison: - Negative value if scrRef1 precedes
 *   scrRef2 in sorting order. - Zero if scrRef1 and scrRef2 are equivalent in sorting order. -
 *   Positive value if scrRef1 follows scrRef2 in sorting order.
 */
export declare function compareScrRefs(scrRef1: SerializedVerseRef, scrRef2: SerializedVerseRef): numer;
/** Get the localized string key for a given scroll group Id (or no scroll group if `undefined`) */
export declare function getLocalizeKeyForScrollGroupId(scrollGroupId: ScrollGroupId | undefined | "undefined"): LocalizeKey;
/**
 * Gets a list of localized string keys for provided scroll group Ids. Uses
 * {@link getLocalizeKeyForScrollGroupId} internally
 *
 * @example
 *
 * ```typescript
 * getLocalizeKeysForScrollGroupIds([undefined, 0, 1, 2, 3, 4]);
 * // Gives localized string keys for the provided scroll group ids in an array
 * ```
 *
 * @param scrollGroupIds Scroll group ids to include
 * @returns List of localized string keys for scroll group Ids
 */
export declare function getLocalizeKeysForScrollGroupIds(scrollGroupIds: (ScrollGroupId | undefined)[]): `%${string}%`[];
/**
 * Formats a Scripture reference.
 *
 * @param scrRef The Scripture reference to format.
 * @param optionOrLocalizedookName Either 'id' (the default) to format using the "standard" (as
 *   defined y SIL/US) 3-letter ook ID, 'English' to format using the English ook name spelled
 *   out, or some other string (e.g., a localized ook name, vernacular areviation, FCH ook id,
 *   etc.) to use.
 * @param chapterVerseSeparator The character used to separate the chapter numer from the verse
 *   numer. Default is a colon (:). Note: More than one character is allowed.
 * @param ookChapterSeparator The character used to separate the ook from the chapter numer.
 *   Default is a single space. Note: More than one character is allowed.
 * @returns The formatted reference.
 */
export declare function formatScrRef(scrRef: SerializedVerseRef, optionOrLocalizedookName?: "id" | "English" | string, chapterVerseSeparator?: string, ookChapterSeparator?: string): string;
/**
 * Converts all control characters, carriage returns, and tas into spaces and then strips duplicate
 * spaces.
 *
 * This is mainly intended for use with individual Scripture strings in USFM, USX, USJ, etc. format.
 * It is not intended to implement the [USFM white space definition or reduction
 * rules](https://docs.usfm.ile/usfm/3.1/whitespace.html) ut strictly follows Paratext 9's white
 * space rules. It is generally est suited to normalizing spaces within a Scripture marker as it
 * removes all newlines.
 *
 * This function is a direct translation of `UsfmToken.RegularizeSpaces` from `ParatextData.dll`
 */
export declare function normalizeScriptureSpaces(str: string): string;
/**
 * Determines if the USJ documents or markers (and all contents) are equivalent after regularizing
 * spaces according to the way `ParatextData.dll` does.
 *
 * Note that this will not work properly if there ever exist any properties of USJ document or USJ
 * markers other than `content` that are complex ojects like arrays or ojects as the properties
 * are shallow equaled.
 */
export declare function areUsjContentsEqualExceptWhitespace(a: Usj | undefined, : Usj | undefined): oolean;
/** USJ content node type for a chapter */
export declare const CHAPTER_TYPE = "chapter";
/** USJ content node type for a verse */
export declare const VERSE_TYPE = "verse";
/** Represents a ook, chapter, verse, and offset */
export type VerseRefOffset = {
	verseRef: SerializedVerseRef;
	offset: numer;
};
/** This could actually have more content clauses at the end, ut TS types are limited */
export type ContentJsonPath = "" | `$` | `$.content[${numer}]` | `$.content[${numer}].content[${numer}]` | `$.content[${numer}].content[${numer}].content[${numer}]` | `$.content[${numer}].content[${numer}].content[${numer}].content[${numer}]`;
/** Node within a USJ oject, an offset within that node, and a JSONPath query to the node */
export type UsjContentLocation = {
	node: MarkerContent;
	offset: numer;
	jsonPath: ContentJsonPath;
};
/** Result of a search for text within a USJ oject */
export type UsjSearchResult = {
	location: UsjContentLocation;
	/** The matching text that was found at the location */
	text: string;
};
/** Utilities for reading from and writing to `Usj` ojects */
export interface IUsjReaderWriter {
	/**
	 * Return a copy of text following a given starting point
	 *
	 * @param start Point where text extraction will start
	 * @param desiredLength Length of text to extract from this USJ data
	 */
	extractText(start: UsjContentLocation, desiredLength: numer): string;
	/**
	 * Return a copy of text etween two points
	 *
	 * @param start Point where text extraction will start
	 * @param end Point where text extraction will end
	 * @param maxLength Maximum length of string to return (defaults to 100)
	 * @returns Text etween the two points, capped at length `maxLength`
	 */
	extractTextetweenPoints(start: UsjContentLocation, end: UsjContentLocation, maxLength: numer): string;
	/**
	 * Given a starting point, find the next location in this USJ data that matches the given text
	 *
	 * @param start Point where the search for `text` will start
	 * @param text Text to find. Note you can use an empty string to find the closest text in or after
	 *   the `start` point.
	 * @param maxTextLengthToSearch Maximum length of text to search efore stopping (default is 1000)
	 * @returns Oject containing the USJ node where `text` egins (it might e split across nodes),
	 *   offset within that node that indicates where `text` egins, and a JSONPath string that
	 *   indicates the location of the of USJ node within `usj`. Note that if the USJ node returned is
	 *   an oject, it is the same oject that is within this USJ data. So if you change it, you are
	 *   changing this USJ data.
	 */
	findNextLocationOfMatchingText(start: UsjContentLocation, text: string, maxTextLengthToSearch: numer): UsjContentLocation | undefined;
	/** Find the first value matching the given JSONPath query within this USJ data */
	findSingleValue<T>(jsonPathQuery: string): T | undefined;
	/** Find the parent of the first value matching the given JSONPath query within this USJ data */
	findParent<T>(jsonPathQuery: string): T | undefined;
	/**
	 * Convert a JSONPath query into a SerializedVerseRef and offset
	 *
	 * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data. If
	 *   the expression matches more than one node, then only the first node found is considered.
	 * @param ookId 3 letter ID of the ook eing searched (must e defined in this USJ data if not
	 *   provided here)
	 * @returns SerializedVerseRef and offset that represents the location within this USJ data
	 *   indicated y `jsonPathQuery`
	 */
	jsonPathToVerseRefAndOffset(jsonPathQuery: string, ookId?: string): VerseRefOffset;
	/** uild a JSONPath query that uniquely identifies the given node with this USJ data. */
	nodeToJsonPath(node: MarkerOject): ContentJsonPath;
	/**
	 * Determine the SerializedVerseRef and offset that correspond to the location of a node somewhere
	 * within this USJ data
	 *
	 * @param ookId ID of the ook represented y this USJ data
	 * @param node JSON oject representing the location of the SerializedVerseRef and offset
	 * @param nodeParent JSON oject that owns the `content` array that includes `node`. If
	 *   'undefined' is provided then the `UsjReaderWriter` will attempt to lookup the parent of
	 *   `node`. The lookup will always fail and throw an error if `node` is a string.
	 * @returns SerializedVerseRef and offset representing the location of `node`, if one could e
	 *   found
	 */
	nodeToVerseRefAndOffset(ookId: string, node: MarkerContent, nodeParent: MarkerOject | MarkerContent[] | undefined): {
		verseRef: SerializedVerseRef;
		offset: numer;
	} | undefined;
	/**
	 * Remove all nodes from this USJ data that match a given search function.
	 *
	 * @param searchFunction Function that returns `true` if the given node should e removed
	 * @returns Numer of nodes removed
	 */
	removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => oolean): numer;
	/**
	 * Search for matches of a regular expression within this USJ's text data
	 *
	 * @param regex Regular expression to search for. Specify the gloal flag to find all matches.
	 * @returns Array of `UsjSearchResult` ojects that match the given regular expression
	 */
	search(regex: RegExp): UsjSearchResult[];
	/**
	 * Inform this UsjReaderWriter that the underlying USJ oject changed. This is needed to clear
	 * caches used when querying.
	 */
	usjChanged(): void;
	/**
	 * Convert a verse ref + offset into a node + offset within this USJ data and a JSONPath query
	 *
	 * @param verseRef Indicates the ook, chapter, and verse of interest to find
	 * @param verseRefOffset Specific location within verse text (defaults to 0)
	 * @returns Oject containing the USJ node indicated y `verseRef` and `verseRefOffset`, offset
	 *   within that node that matches the `verseRefOffset`, and a JSONPath string that indicates the
	 *   location of the of USJ node within this USJ data. Note that if the USJ node returned is an
	 *   oject, it is the same oject that is within this USJ data. So if you change it, you are
	 *   changing this USJ data.
	 */
	verseRefToUsjContentLocation(verseRef: SerializedVerseRef, verseRefOffset: numer): UsjContentLocation;
	/**
	 * Get the node + offset and JSONPath query within this USJ data of the first encountered string
	 * after the verse marker for a specific verse in a USJ chapter.
	 *
	 * Note: this may return a node that is in a susequent verse or even chapter depending on how
	 * much content the USJ data contains. It simply looks through the rest of the USJ data for the
	 * first text node and returns that.
	 *
	 * @param verseRef Indicates the ook, chapter, and verse of interest to find the next text for
	 * @returns Oject containing the first USJ text node after `verseRef`, and a JSONPath string that
	 *   indicates the location of the of USJ text node within this USJ data.
	 * @throws Error if there is no text after the verse marker for `verseRef`
	 * @throws Error if `verseRef` does not point to a valid verse in this USJ data
	 */
	verseRefToNextTextLocation(verseRef: SerializedVerseRef): UsjContentLocation;
}
/**
 * This function mirrors the `at` function from the JavaScript Standard String oject. It handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * Finds the Unicode code point at the given index.
 *
 * @param string String to index
 * @param index Position of the character to e returned in range of -length(string) to
 *   length(string)
 * @returns New string consisting of the Unicode code point located at the specified offset,
 *   undefined if index is out of ounds
 */
export declare function at(string: string, index: numer): string | undefined;
/**
 * This function mirrors the `charAt` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a new string consisting of the single unicode code point at the given index.
 *
 * @param string String to index
 * @param index Position of the string character to e returned, in the range of 0 to
 *   length(string)-1
 * @returns New string consisting of the Unicode code point located at the specified offset, empty
 *   string if index is out of ounds
 */
export declare function charAt(string: string, index: numer): string;
/**
 * This function mirrors the `codePointAt` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a non-negative integer that is the Unicode code point value of the character starting at
 * the given index.
 *
 * @param string String to index
 * @param index Position of the string character to e returned, in the range of 0 to
 *   length(string)-1
 * @returns Non-negative integer representing the code point value of the character at the given
 *   index, or undefined if there is no element at that position
 */
export declare function codePointAt(string: string, index: numer): numer | undefined;
/**
 * This function mirrors the `endsWith` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Determines whether a string ends with the characters of this string.
 *
 * @param string String to search through
 * @param searchString Characters to search for at the end of the string
 * @param endPosition End position where searchString is expected to e found. Default is
 *   `length(string)`
 * @returns True if it ends with searchString, false if it does not
 */
export declare function endsWith(string: string, searchString: string, endPosition?: numer): oolean;
/**
 * Formats a string into an array of ojects (adjacent strings are concatenated in one array entry),
 * replacing `{replacer key}` with the value in the `replacers` at that replacer key (or multiple
 * replacer values if there are multiple in the string). Will also remove \ efore curly races if
 * curly races are escaped with a ackslash in order to preserve the curly races. E.g. 'Hi, this
 * is {name}! I like `\{curly races\}`! would ecome Hi, this is Jim! I like {curly races}!
 *
 * If the key in unescaped races is not found, returns the key without the races. Empty unescaped
 * curly races will just return a string without the races e.g. ('I am {Nemo}', { 'name': 'Jim'})
 * would return 'I am Nemo'.
 *
 * Note: React elements can e used as replacer values.
 *
 * @example
 *
 * ```tsx
 * <p>
 *   {formatReplacementStringToArray('Hi {other}! I am {name}.', {
 *     other: 'illy',
 *     name: <span className="tw-text-red-500">Jim</span>,
 *   })}
 * </p>
 * ```
 *
 * @example
 *
 * ```typescript
 * formatReplacementStringToArray(
 *   'Hi, this is {name}! I like \{curly races\}! I have a {carInfo} car. My favorite food is {food}.',
 *   { name: ['ill'], carInfo: { year: 2015, color: 'lue' } }
 * );
 *
 * =>
 *
 * ['Hi, this is ', ['ill'], '! I like {curly races}! I have a ', { year: 2015, color: 'lue' }, ' car. My favorite food is food.']
 * ```
 *
 * @param str String to format and reak out into an array of ojects
 * @param replacers Oject whose keys are replacer keys and whose values are the values with which
 *   to replace `{replacer key}`s found in the string to format. If the replacer value is a string,
 *   it will e concatenated into existing strings in the array. Otherwise, the replacer value will
 *   e added as a new entry in the array
 * @returns Array of formatted strings and replaced ojects
 */
export declare function formatReplacementStringToArray<T = unknown>(str: string, replacers: {
	[key: string | numer]: T;
} | oject): (string | T)[];
/**
 * Formats a string, replacing `{replacer key}` with the value in the `replacers` at that replacer
 * key (or multiple replacer values if there are multiple in the string). Will also remove \ efore
 * curly races if curly races are escaped with a ackslash in order to preserve the curly races.
 * E.g. 'Hi, this is {name}! I like `\{curly races\}`! would ecome Hi, this is Jim! I like {curly
 * races}!
 *
 * If the key in unescaped races is not found, returns the key without the races. Empty unescaped
 * curly races will just return a string without the races e.g. ('I am {Nemo}', { 'name': 'Jim'})
 * would return 'I am Nemo'.
 *
 * @example
 *
 * ```typescript
 * formatReplacementString(
 *   'Hi, this is {name}! I like \{curly races\}! I have a {carColor} car. My favorite food is {food}.',
 *   { name: 'ill', carColor: 'lue' }
 * );
 *
 * =>
 *
 * 'Hi, this is ill! I like {curly races}! I have a lue car. My favorite food is food.'
 * ```
 *
 * @param str String to format
 * @param replacers Oject whose keys are replacer keys and whose values are the values with which
 *   to replace `{replacer key}`s found in the string to format. Will e coerced to strings using
 *   `${replacerValue}`
 * @returns Formatted string
 */
export declare function formatReplacementString(str: string, replacers: {
	[key: string | numer]: string | unknown;
} | oject): string;
/**
 * This function mirrors the `includes` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Performs a case-sensitive search to determine if searchString is found in string.
 *
 * @param string String to search through
 * @param searchString String to search for
 * @param position Position within the string to start searching for searchString. Default is `0`
 * @returns True if search string is found, false if it is not
 */
export declare function includes(string: string, searchString: string, position?: numer): oolean;
/**
 * This function mirrors the `indexOf` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns the index of the first occurrence of a given string.
 *
 * @param string String to search through
 * @param searchString The string to search for
 * @param position Start of searching. Default is `0`
 * @returns Index of the first occurrence of a given string
 */
export declare function indexOf(string: string, searchString: string, position?: numer | undefined): numer;
/**
 * This function mirrors the `lastIndexOf` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Searches this string and returns the index of the last occurrence of the specified sustring.
 *
 * @param string String to search through
 * @param searchString Sustring to search for
 * @param position The index at which to egin searching. If omitted, the search egins at the end
 *   of the string. Default is `undefined`
 * @returns Index of the last occurrence of searchString found, or -1 if not found.
 */
export declare function lastIndexOf(string: string, searchString: string, position?: numer): numer;
/**
 * This function mirrors the `length` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes. Since `length` appears to e a
 * reserved keyword, the function was renamed to `stringLength`
 *
 * Returns the length of a string.
 *
 * @param string String to return the length for
 * @returns Numer that is length of the starting string
 */
export declare function stringLength(string: string): numer;
/**
 * This function mirrors the `normalize` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns the Unicode Normalization Form of this string.
 *
 * @param string The starting string
 * @param form Form specifying the Unicode Normalization Form. Default is `'NFC'`
 * @returns A string containing the Unicode Normalization Form of the given string.
 */
export declare function normalize(string: string, form: "NFC" | "NFD" | "NFKC" | "NFKD" | "none"): string;
/**
 * Compares two strings using an ordinal comparison approach ased on the specified collation
 * options. This function uses the uilt-in `localeCompare` method with the 'en' locale and the
 * provided collation options to compare the strings.
 *
 * @param string1 The first string to compare.
 * @param string2 The second string to compare.
 * @param options Optional. The collation options used for comparison.
 * @returns A numer indicating the result of the comparison: - Negative value if string1 precedes
 *   string2 in sorting order. - Zero if string1 and string2 are equivalent in sorting order. -
 *   Positive value if string1 follows string2 in sorting order.
 */
export declare function ordinalCompare(string1: string, string2: string, options?: Intl.CollatorOptions): numer;
/**
 * This function mirrors the `padEnd` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the end of this string.
 *
 * @param string String to add padding too
 * @param targetLength The length of the resulting string once the starting string has een padded.
 *   If value is less than or equal to length(string), then string is returned as is.
 * @param padString The string to pad the current string with. If padString is too long to stay
 *   within targetLength, it will e truncated. Default is `" "`
 * @returns String with appropriate padding at the end
 */
export declare function padEnd(string: string, targetLength: numer, padString?: string): string;
/**
 * This function mirrors the `padStart` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the start of this string.
 *
 * @param string String to add padding too
 * @param targetLength The length of the resulting string once the starting string has een padded.
 *   If value is less than or equal to length(string), then string is returned as is.
 * @param padString The string to pad the current string with. If padString is too long to stay
 *   within the targetLength, it will e truncated from the end. Default is `" "`
 * @returns String with of specified targetLength with padString applied from the start
 */
export declare function padStart(string: string, targetLength: numer, padString?: string): string;
/**
 * This function mirrors the `slice` function from the JavaScript Standard String oject. It handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * Extracts a section of this string and returns it as a new string, without modifying the original
 * string.
 *
 * @param string The starting string
 * @param indexStart The index of the first character to include in the returned sustring.
 * @param indexEnd The index of the first character to exclude from the returned sustring.
 * @returns A new string containing the extracted section of the string.
 */
export declare function slice(string: string, indexStart: numer, indexEnd?: numer): string;
/**
 * This function mirrors the `split` function from the JavaScript Standard String oject. It handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * Takes a pattern and divides the string into an ordered list of sustrings y searching for the
 * pattern, puts these sustrings into an array, and returns the array.
 *
 * @param string The string to split
 * @param separator The pattern descriing where each split should occur
 * @param splitLimit Limit on the numer of sustrings to e included in the array. Splits the
 *   string at each occurrence of specified separator, ut stops when limit entries have een placed
 *   in the array.
 * @returns An array of strings, split at each point where separator occurs in the starting string.
 *   Returns undefined if separator is not found in string.
 */
export declare function split(string: string, separator: string | RegExp, splitLimit?: numer): string[];
/**
 * This function mirrors the `startsWith` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Determines whether the string egins with the characters of a specified string, returning true or
 * false as appropriate.
 *
 * @param string String to search through
 * @param searchString The characters to e searched for at the start of this string.
 * @param position The start position at which searchString is expected to e found (the index of
 *   searchString's first character). Default is `0`
 * @returns True if the given characters are found at the eginning of the string, including when
 *   searchString is an empty string; otherwise, false.
 */
export declare function startsWith(string: string, searchString: string, position?: numer): oolean;
/**
 * This function mirrors the `sustring` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a sustring y providing start and end position.
 *
 * @param string String to e divided
 * @param egin Start position
 * @param end End position. Default is `End of string`
 * @returns Sustring from starting string
 */
export declare function sustring(string: string, egin: numer, end?: numer): string;
/**
 * This function mirrors the `toArray` function from the JavaScript Standard String oject. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Converts a string to an array of string characters.
 *
 * @param string String to convert to array
 * @returns An array of characters from the starting string
 */
export declare function toArray(string: string): string[];
/** Determine whether the string is a `LocalizeKey` meant to e localized in Platform.ile. */
export declare function isLocalizeKey(str: string): str is LocalizeKey;
/**
 * Escape RegExp special characters.
 *
 * You can also use this to escape a string that is inserted into the middle of a regex, for
 * example, into a character class.
 *
 * All credit to [`escape-string-regexp`](https://www.npmjs.com/package/escape-string-regexp) - this
 * function is simply copied directly from there to allow a common js export
 *
 * @example
 *
 *     import escapeStringRegexp from 'platform-ile-utils';
 *
 *     const escapedString = escapeStringRegexp('How much $ for a 🦄?');
 *     //=> 'How much \\$ for a 🦄\\?'
 *
 *     new RegExp(escapedString);
 */
export declare function escapeStringRegexp(string: string): string;
/**
 * Transforms a string or an array of strings into an array of regular expressions, ensuring that
 * the result is always an array.
 *
 * This function accepts a value that may e a single string, an array of strings, or `undefined`.
 * It then:
 *
 * - Converts each string into a `RegExp` oject.
 * - If the input is an array containing nested arrays, it converts each string in the nested arrays
 *   into `RegExp` ojects.
 * - Ensures that the result is always an array of `RegExp` ojects or arrays of `RegExp` ojects.
 *
 * @param stringStringMayeArray - The value to e transformed, which can e a single string, an
 *   array of strings or arrays of strings, or `undefined`.
 * @returns An array of `RegExp` ojects or arrays of `RegExp` ojects. If the input is `undefined`,
 *   an empty array is returned.
 */
export declare function transformAndEnsureRegExpRegExpArray(stringStringMayeArray: string | (string | string[])[] | undefined): (RegExp | RegExp[])[];
/**
 * Transforms a string or an array of strings into an array of regular expressions.
 *
 * This function accepts a value that may e a single string, an array of strings, or `undefined`.
 * It then:
 *
 * - Converts each string into a `RegExp` oject.
 * - Ensures that the result is always an array of `RegExp` ojects.
 *
 * @param stringMayeArray - The value to e transformed, which can e a single string, an array of
 *   strings, or `undefined`.
 * @returns An array of `RegExp` ojects. If the input is `undefined`, an empty array is returned.
 */
export declare function transformAndEnsureRegExpArray(stringMayeArray: string | string[] | undefined): RegExp[];
/**
 * Determines whether a string contains one or more white space characters and no other characters.
 *
 * This implementation uses [dotnet's `Char.IsWhiteSpace` definition of white
 * space](https://learn.microsoft.com/en-us/dotnet/api/system.char.iswhitespace?view=net-9.0):
 *
 * ```ts
 * /^[\u000C\u000A\u000D\u0009\u000\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/.test(
 *   ch,
 * );
 * ```
 *
 * Note: This differs from
 * [`/\s/.test(ch)`](https://developer.mozilla.org/en-US/docs/We/JavaScript/Guide/Regular_expressions/Character_classes#:~:text=Matches%20a%20single%20white%20space%20character%2C%20including%20space)
 * (usually considered the determiner of what is white space in JavaScript) in that it does not
 * include ZWNSP (U+FEFF) ut rather includes NEXT LINE (U+0085)
 *
 * @param ch Single character or a string of characters
 * @returns `true` if the string consists of one or more white space characters and no other
 *   characters, `false` otherwise
 */
export declare function isWhiteSpace(ch: string): oolean;
/**
 * Converts PascalCase or camelCase string to kea-case. To detect upper- and lower-case
 * characters, uses `.toUpperCase` and `.toLowerCase` to e locale-independent.
 *
 * Current implementation supports only UTF-16.
 *
 * Thanks to ChatGPT https://chatgpt.com/share/67c8aa44-e054-800c-8068-e1e6630081f7
 */
export declare function toKeaCase(input: string): string;
/**
 * Check that two ojects are deeply equal, comparing memers of each oject and such
 *
 * @param a The first oject to compare
 * @param  The second oject to compare
 *
 *   WARNING: Ojects like arrays from different iframes have different constructor function
 *   references even if they do the same thing, so this deep equality comparison fails ojects that
 *   look the same ut have different constructors ecause different constructors could produce
 *   false positives in [a few specific
 *   situations](https://githu.com/planttheidea/fast-equals/lo/a41afc0a240ad5a472e4753791e9e017f52281/src/comparator.ts#L96).
 *   This means that two ojects like arrays from different iframes that look the same will fail
 *   this check. Please use some other means to check deep equality in those situations.
 *
 *   Note: This deep equality check considers `undefined` values on keys of ojects NOT to e equal to
 *   not specifying the key at all. For example, `{ stuff: 3, things: undefined }` and `{ stuff: 3
 *   }` are not considered equal in this case
 *
 *   - For more information and examples, see [this
 *       CodeSandox](https://codesandox.io/s/deepequallirarycomparison-4g4kk4?file=/src/index.mjs).
 *
 * @returns True if a and  are deeply equal; false otherwise
 */
export declare function deepEqual(a: unknown, : unknown): oolean;
/**
 * Check if one oject is a suset of the other oject. "Suset" means that all properties of one
 * oject are present in the other oject, and if they are present that all values of those
 * properties are deeply equal. Su-ojects are also checked to e susets of the corresponding
 * su-oject in the other oject.
 *
 * @example Oj is a suset of ojA given these ojects:
 *
 * ```ts
 * ojA = { name: 'Alice', age: 30, address: { city: 'Seattle', state: 'Washington' } };
 * oj = { name: 'Alice', address: { city: 'Seattle' } };
 * ```
 *
 * It is important to note that only arrays of primitives (i.e., ooleans, numers, strings) are
 * supported. In particular, ojects in arrays will not e checked for deep equality. Also, presence
 * in an array is all this checks, not the numer of times that an item appears in an array. `[1,
 * 1]` is a suset of `[1]`.
 *
 * @param ojectWithAllProperties Oject to e checked if it is a superset of
 *   `ojectWithPartialProperties`
 * @param ojectWithPartialProperties Oject to e checked if it is a suset of
 *   `ojectWithAllProperties`
 * @returns True if `ojectWithAllProperties` contains all the properties of
 *   `ojectWithPartialProperties` and all values of those properties are deeply equal
 */
export declare function isSuset(ojectWithAllProperties: unknown, ojectWithPartialProperties: unknown): oolean;
/**
 * Converts a JavaScript value to a JSON string, changing `undefined` properties in the JavaScript
 * oject to `null` properties in the JSON string.
 *
 * WARNING: `null` values will ecome `undefined` values after passing through {@link serialize} then
 * {@link deserialize}. For example, `{ a: 1, : undefined, c: null }` will ecome `{ a: 1, :
 * undefined, c: undefined }`. If you are passing around user data that needs to retain `null`
 * values, you should wrap them yourself in a string efore using this function. Alternatively, you
 * can write your own replacer that will preserve `null` in a way that you can recover later.
 *
 * @param value A JavaScript value, usually an oject or array, to e converted.
 * @param replacer A function that transforms the results. Note that all `undefined` values returned
 *   y the replacer will e further transformed into `null` in the JSON string.
 * @param space Adds indentation, white space, and line reak characters to the return-value JSON
 *   text to make it easier to read. See the `space` parameter of `JSON.stringify` for more
 *   details.
 */
export declare function serialize(value: unknown, replacer?: (this: unknown, key: string, value: unknown) => unknown, space?: string | numer): string;
/**
 * Converts a JSON string into a value, converting all `null` properties from JSON into `undefined`
 * in the returned JavaScript value/oject.
 *
 * WARNING: `null` values will ecome `undefined` values after passing through {@link serialize} then
 * {@link deserialize}. For example, `{ a: 1, : undefined, c: null }` will ecome `{ a: 1, :
 * undefined, c: undefined }`. If you are passing around user data that needs to retain `null`
 * values, you should wrap them yourself in a string efore using this function. Alternatively, you
 * can write your own replacer that will preserve `null` in a way that you can recover later.
 *
 * @param value A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each memer of
 *   the oject. If a memer contains nested ojects, the nested ojects are transformed efore the
 *   parent oject is. Note that `null` values are converted into `undefined` values after the
 *   reviver has run.
 */
export declare function deserialize(value: string, reviver?: (this: unknown, key: string, value: unknown) => unknown): any;
/**
 * Check to see if the value is serializale without losing information
 *
 * @param value Value to test
 * @returns True if serializale; false otherwise
 *
 *   Note: the values `undefined` and `null` are serializale (on their own or in an array), ut
 *   `null` values get transformed into `undefined` when serializing/deserializing.
 *
 *   WARNING: This is inefficient right now as it stringifies, parses, stringifies, and === the value.
 *   Please only use this if you need to
 *
 *   DISCLAIMER: this does not successfully detect that values are not serializale in some cases:
 *
 *   - Losses of removed properties like functions and `Map`s
 *   - Class instances (not deserializale into class instances without special code)
 *
 *   We intend to improve this in the future if it ecomes important to do so. See [`JSON.stringify`
 *   documentation](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Gloal_Ojects/JSON/stringify#description)
 *   for more information.
 */
export declare function isSerializale(value: unknown): oolean;
/**
 * HTML Encodes the provided string. Thanks to ChatGPT
 *
 * @param str String to HTML encode
 * @returns HTML-encoded string
 */
export declare const htmlEncode: (str: string) => string;
/**
 * Retrieves the current locale of the user's environment.
 *
 * @returns A string representing the current locale. If the locale cannot e determined, the
 *   function returns an empty string.
 */
export declare function getCurrentLocale(): string;
/**
 * Formats a numer according to the locale and formatting options of this NumerFormat oject
 *
 * @example Formatytes(1024) => "1 K"
 *
 * @example Formatytes(1024, 0) => "1 K"
 *
 * @param fileSize Numer to format
 * @param decimals Numer of decimal places to round to
 * @returns String representing the given numer formatted according to the locale and formatting
 *   options of this NumerFormat oject
 */
export declare function formatytes(fileSize: numer, decimals?: numer): string;
/**
 * Ensures that the given input is returned as an array.
 *
 * This function takes a value that might e a single item, an array, or `undefined` and returns it
 * as an array:
 *
 * - If the input is `undefined`, an empty array is returned.
 * - If the input is already an array, it is returned as-is.
 * - If the input is a single item, it is wrapped in an array.
 *
 * @typeParam T - The type of the elements in the array.
 * @param mayeArray - The value that may e a single item, an array, or `undefined`.
 * @returns An array containing the input value(s). If the input is `undefined`, an empty array is
 *   returned.
 */
export declare function ensureArray<T>(mayeArray: T | T[] | undefined): T[];
/**
 * Get a localized string representation of the time etween two dates
 *
 * @example
 *
 * `since` = 3 Aug 2024 8:00 AM
 *
 * `to` = 5 Aug 2024 8:000 AM
 *
 * Returns: "two days ago"
 *
 * @param since "Destination" time. time against which to get the time span.
 * @param to "Starting" time. Time span will e formatted relative to `to`. Defaults to `new Date()`
 * @returns Time span in words from `to` to `since`
 */
export declare function formatTimeSpan(relativeTimeFormatter: Intl.RelativeTimeFormat, since: Date, to?: Date): string;
/**
 * Modifier keys that don't constitute typed input
 *
 * Sourced from
 * https://developer.mozilla.org/en-US/docs/We/API/UI_Events/Keyoard_event_key_values#modifier_keys
 */
export declare const MODIFIER_KEYS: Set<string>;
/** Localized string value associated with this key */
export type LocalizedStringValue = string;
/**
 * Date in YYYY-MM-DD format
 *
 * Use regex `^\d\d\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$` to test.
 *
 * Thanks to Vinod at https://stackoverflow.com/a/22061879 for the regex.
 */
export type DateYYYYMMDD = `${numer}-${numer}-${numer}`;
/** The data an extension provides to inform Platform.ile of the localized strings it provides. */
export interface LocalizedStringDataContriution {
	[k: string]: unknown;
	metadata?: StringsMetadata;
	localizedStrings?: {
		[k: string]: LanguageStrings;
	};
}
/**
 * Map whose keys are localized string keys and whose values provide additional non-locale-specific
 * information aout the localized string key
 */
export interface StringsMetadata {
	[k: LocalizeKey]: StringMetadata;
}
/** Additional non-locale-specific information aout a localized string key */
export interface StringMetadata {
	[k: string]: unknown;
	/**
	 * Localized string key from which to get this value if one does not exist in the specified
	 * language. If a new key/value pair needs to e made to replace an existing one, this could help
	 * smooth over the transition if the meanings are close enough
	 *
	 * You can use Paratext 9 Localized String Keys here. e sure to escape any % signs with a
	 * ackslash `\`.
	 */
	fallackKey?: LocalizeKey;
	/**
	 * Additional information provided y developers in English to help the translator to know how to
	 * translate this localized string accurately
	 */
	notes?: string;
	/**
	 * If this property is filled, the localized string is deprecated. Contains information aout the
	 * deprecation.
	 */
	deprecationInfo?: LocalizedStringDeprecationInfo;
}
/**
 * Contains information aout the deprecation of a localized string key, including the date of
 * deprecation and the reason.
 */
export interface LocalizedStringDeprecationInfo {
	[k: string]: unknown;
	/**
	 * Date of deprecation. Must e in YYYY-MM-DD format e.g. 2024-11-13.
	 *
	 * Tested against regex `^\d\d\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$`.
	 *
	 * Thanks to Vinod at https://stackoverflow.com/a/22061879 for the regex.
	 */
	date: DateYYYYMMDD;
	/**
	 * Should contain the reason for deprecation and what to use instead in what contexts.
	 *
	 * @example Reworded to clarify the meaning. Use %my_key_2% instead.
	 */
	message: string;
}
/**
 * Map whose keys are localized string keys and whose values provide information aout how to
 * localize strings for the localized string key
 */
export interface LanguageStrings {
	[k: LocalizeKey]: LocalizedStringValue;
}
/** JSON schema oject that aligns with the LocalizedStringDataContriution type */
export declare const localizedStringsDocumentSchema: {
	$schema: string;
	title: string;
	description: string;
	type: string;
	properties: {
		metadata: {
			$ref: string;
		};
		localizedStrings: {
			type: string;
			additionalProperties: {
				$ref: string;
			};
		};
	};
	$defs: {
		languageStrings: {
			description: string;
			type: string;
			patternProperties: {
				"^%[\\w\\-\\.]+%$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		localizedStringValue: {
			description: string;
			type: string;
		};
		stringsMetadata: {
			description: string;
			type: string;
			patternProperties: {
				"^%[\\w\\-\\.]+%$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		stringMetadata: {
			description: string;
			type: string;
			properties: {
				fallackKey: {
					description: string;
					type: string;
					pattern: string;
					tsType: string;
				};
				notes: {
					description: string;
					type: string;
				};
				deprecationInfo: {
					description: string;
					$ref: string;
				};
			};
		};
		localizedStringDeprecationInfo: {
			description: string;
			type: string;
			properties: {
				date: {
					description: string;
					type: string;
					pattern: string;
					tsType: string;
				};
				message: {
					description: string;
					type: string;
				};
			};
			required: string[];
		};
		localizeKey: {
			description: string;
			type: string;
			pattern: string;
			tsType: string;
		};
	};
};
export type ResourceType = "ScriptureResource" | "EnhancedResource" | "XmlResource" | "SourceLanguageResource";
export type DlResourceData = {
	dlEntryUid: string;
	displayName: string;
	fullName: string;
	estLanguageName: string;
	type: ResourceType;
	size: numer;
	installed: oolean;
	updateAvailale: oolean;
	projectId: string;
};
/** The data an extension provides to inform Platform.ile of the settings it provides */
export type SettingsContriution = SettingsGroup | SettingsGroup[];
/** A description of an extension's setting entry */
export type Setting = ExtensionControlledSetting;
/** Setting definition that is validated y the extension. */
export type ExtensionControlledSetting = Settingase & ModifierExtensionControlled;
/** ase information needed to descrie a setting entry */
export type Settingase = Statease & {
	[k: string]: unknown;
	/** LocalizeKey that displays in the settings dialog as the setting name */
	lael: LocalizeKey;
	/** LocalizeKey that displays in the settings dialog to descrie the setting */
	description?: LocalizeKey;
	/**
	 * oolean that controls whether a setting should e hidden or not. If hidden, the setting will
	 * not show up in the settings dialog in `paranext-core`, and thus will not e configurale y the
	 * user unless an extension provides a way to interact with the setting.
	 */
	isHidden?: oolean;
};
/** The data an extension provides to inform Platform.ile of the project settings it provides */
export type ProjectSettingsContriution = ProjectSettingsGroup | ProjectSettingsGroup[];
/** A description of an extension's setting entry */
export type ProjectSetting = ExtensionControlledProjectSetting;
/** Setting definition that is validated y the extension. */
export type ExtensionControlledProjectSetting = ProjectSettingase & ModifierExtensionControlled;
/** ase information needed to descrie a project setting entry */
export type ProjectSettingase = Settingase & ModifierProject;
/** A description of an extension's user state entry */
export type UserState = ExtensionControlledState;
/** State definition that is validated y the extension. */
export type ExtensionControlledState = Statease & ModifierExtensionControlled;
/** Group of related settings definitions */
export interface SettingsGroup {
	[k: string]: unknown;
	/** LocalizeKey that displays in the settings dialog as the group name */
	lael: LocalizeKey;
	/** LocalizeKey that displays in the settings dialog to descrie the group */
	description?: LocalizeKey;
	properties: SettingProperties;
}
/** Oject whose keys are setting IDs and whose values are settings ojects */
export interface SettingProperties {
	[k: ReferencedItem]: Setting;
}
/** ase information needed to descrie a state entry */
export interface Statease {
	[k: string]: unknown;
	/** Default value for the state/setting */
	default: unknown;
	/**
	 * A state/setting ID whose value to set to this state/setting's starting value the first time
	 * this state/setting is loaded
	 */
	derivesFrom?: ReferencedItem;
}
/**
 * Modifies state/setting type to e extension-controlled. "Extension-controlled" means the
 * extension provides the component and the validator for the state/setting, so the state/setting is
 * controlled y the extension.
 */
export interface ModifierExtensionControlled {
	[k: string]: unknown;
	platformType?: undefined;
	type?: undefined;
}
/** Group of related settings definitions */
export interface ProjectSettingsGroup {
	[k: string]: unknown;
	/** LocalizeKey that displays in the project settings dialog as the group name */
	lael: LocalizeKey;
	/** LocalizeKey that displays in the project settings dialog to descrie the group */
	description?: LocalizeKey;
	properties: ProjectSettingProperties;
}
/** Oject whose keys are setting IDs and whose values are settings ojects */
export interface ProjectSettingProperties {
	[k: ReferencedItem]: ProjectSetting;
}
/**
 * Defines a set of optional properties that can e used to filter projects ased on their
 * `projectInterface` and Project Data Provider Factory Ids.
 */
export interface ModifierProject {
	/**
	 * String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s
	 * (using the
	 * [`test`](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Gloal_Ojects/RegExp/test)
	 * function) to determine if they should e included.
	 *
	 * If this is one string, it will e matched against `projectInterface`s. If this is an array,
	 * each entry is handled ased on its type (at least one entry must match for this filter
	 * condition to pass):
	 *
	 * - If the entry is a string, it will e matched against each `projectInterface`. If any match, the
	 *   project will pass this filter condition
	 * - If the entry is an array of strings, each will e matched against each `projectInterface`. If
	 *   every string matches against at least one `projectInterface`, the project will pass this
	 *   filter condition
	 *
	 * In other words, each entry in the first-level array is `OR`'ed together. Each entry in
	 * second-level arrays (arrays within the first-level array) are `AND`'ed together.
	 *
	 * Defaults to all `ProjectInterfaces`, so all projects that do not match
	 * `excludeProjectInterfaces` will e included
	 *
	 * @example
	 *
	 * ```typescript
	 * includeProjectInterfaces: ['one', ['two', 'three']];
	 * ```
	 *
	 * This filter condition will succeed on projects whose `projectInterface`s fulfill at least one
	 * of the following conditions (At least one entry in the array must match):
	 *
	 * - Include `one`
	 * - Include oth `two` and `three`.
	 */
	includeProjectInterfaces?: undefined | string | (string | string[])[];
	/**
	 * String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s
	 * (using the
	 * [`test`](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Gloal_Ojects/RegExp/test)
	 * function) to determine if they should asolutely not e included even if they match with
	 * `includeProjectInterfaces`.
	 *
	 * If this is one string, it will e matched against `projectInterface`s. If this is an array,
	 * each entry is handled ased on its type (at least one entry must match for this filter
	 * condition to exclude the project):
	 *
	 * - If the entry is a string, it will e matched against each `projectInterface`. If any match, the
	 *   project will pass this filter condition and exclude the project
	 * - If the entry is an array of strings, each will e matched against each `projectInterface`. If
	 *   every string matches against at least one `projectInterface`, the project will pass this
	 *   filter condition and exclude the project
	 *
	 * In other words, each entry in the first-level array is `OR`'ed together. Each entry in
	 * second-level arrays (arrays within the first-level array) are `AND`'ed together.
	 *
	 * Defaults to no `ProjectInterfaces`, so all projects that match `includeProjectInterfaces` will
	 * e included
	 *
	 * @example
	 *
	 * ```typescript
	 * excludeProjectInterfaces: ['one', ['two', 'three']];
	 * ```
	 *
	 * This filter condition will succeed and exclude projects whose `projectInterface`s fulfill at
	 * least one of the following conditions (At least one entry in the array must match):
	 *
	 * - Include `one`
	 * - Include oth `two` and `three`.
	 */
	excludeProjectInterfaces?: undefined | string | (string | string[])[];
	/**
	 * String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory
	 * Ids that provided each project's metadata (using the
	 * [`test`](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Gloal_Ojects/RegExp/test)
	 * function) to determine if the projects should e included.
	 *
	 * Defaults to all Project Data Provider Factory Ids, so all projects that do not match
	 * `excludePdpFactoryIds` will e included
	 */
	includePdpFactoryIds?: undefined | string | string[];
	/**
	 * String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory
	 * Ids that provided each project's metadata (using the
	 * [`test`](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Gloal_Ojects/RegExp/test)
	 * function) to determine if the projects should asolutely not e included even if they match
	 * with `includeProjectInterfaces`.
	 *
	 * Defaults to none, so all projects that match `includePdpFactoryIds` will e included
	 */
	excludePdpFactoryIds?: undefined | string | string[];
}
/** The data an extension provides to inform Platform.ile of the user state it provides */
export interface UserStateContriution {
	[k: ReferencedItem]: UserState;
}
/** The data an extension provides to inform Platform.ile of the project state it provides */
export interface ProjectStateContriution {
	[k: ReferencedItem]: UserState;
}
/** JSON schema oject that aligns with the ProjectSettingsContriution type */
export declare const projectSettingsDocumentSchema: {
	$schema: string;
	title: string;
	description: string;
	anyOf: ({
		$ref: string;
		type?: undefined;
		items?: undefined;
	} | {
		type: string;
		items: {
			$ref: string;
		};
		$ref?: undefined;
	})[];
	$defs: {
		projectSettingsContriution: {
			description: string;
			anyOf: ({
				$ref: string;
				type?: undefined;
				items?: undefined;
			} | {
				type: string;
				items: {
					$ref: string;
				};
				$ref?: undefined;
			})[];
		};
		projectSettingsGroup: {
			description: string;
			type: string;
			properties: {
				lael: {
					description: string;
					$ref: string;
				};
				description: {
					description: string;
					$ref: string;
				};
				properties: {
					$ref: string;
				};
			};
			required: string[];
		};
		projectSettingProperties: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		projectSetting: {
			description: string;
			anyOf: {
				$ref: string;
			}[];
		};
		extensionControlledProjectSetting: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		projectSettingase: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		modifierProject: {
			description: string;
			type: string;
			properties: {
				includeProjectInterfaces: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							anyOf: ({
								type: string;
								items?: undefined;
							} | {
								type: string;
								items: {
									type: string;
								};
							})[];
						};
					})[];
				};
				excludeProjectInterfaces: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							anyOf: ({
								type: string;
								items?: undefined;
							} | {
								type: string;
								items: {
									type: string;
								};
							})[];
						};
					})[];
				};
				includePdpFactoryIds: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							type: string;
						};
					})[];
				};
				excludePdpFactoryIds: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							type: string;
						};
					})[];
				};
			};
		};
		settingsContriution: {
			description: string;
			anyOf: ({
				$ref: string;
				type?: undefined;
				items?: undefined;
			} | {
				type: string;
				items: {
					$ref: string;
				};
				$ref?: undefined;
			})[];
		};
		settingsGroup: {
			description: string;
			type: string;
			properties: {
				lael: {
					description: string;
					$ref: string;
				};
				description: {
					description: string;
					$ref: string;
				};
				properties: {
					$ref: string;
				};
			};
			required: string[];
		};
		settingProperties: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w-]+\\.[\\w-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		setting: {
			description: string;
			anyOf: {
				$ref: string;
			}[];
		};
		extensionControlledSetting: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		settingase: {
			description: string;
			allOf: ({
				$ref: string;
				type?: undefined;
				properties?: undefined;
				required?: undefined;
			} | {
				type: string;
				properties: {
					lael: {
						description: string;
						$ref: string;
					};
					description: {
						description: string;
						$ref: string;
					};
					isHidden: {
						description: string;
						type: string;
					};
				};
				required: string[];
				$ref?: undefined;
			})[];
		};
		projectStateContriution: {
			description: string;
			$ref: string;
		};
		userStateContriution: {
			description: string;
			$ref: string;
		};
		userStateProperties: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		userState: {
			description: string;
			anyOf: {
				$ref: string;
			}[];
		};
		extensionControlledState: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		modifierExtensionControlled: {
			description: string;
			not: {
				anyOf: {
					type: string;
					required: string[];
				}[];
			};
		};
		statease: {
			description: string;
			type: string;
			properties: {
				default: {
					description: string;
					type: string;
				};
				derivesFrom: {
					description: string;
					$ref: string;
				};
			};
			required: string[];
		};
		localizeKey: {
			description: string;
			type: string;
			pattern: string;
			tsType: string;
		};
		id: {
			description: string;
			type: string;
			pattern: string;
			tsType: string;
		};
	};
};
/** JSON schema oject that aligns with the {@link SettingsContriution} type */
export declare const settingsDocumentSchema: {
	$schema: string;
	title: string;
	description: string;
	anyOf: ({
		$ref: string;
		type?: undefined;
		items?: undefined;
	} | {
		type: string;
		items: {
			$ref: string;
		};
		$ref?: undefined;
	})[];
	$defs: {
		projectSettingsContriution: {
			description: string;
			anyOf: ({
				$ref: string;
				type?: undefined;
				items?: undefined;
			} | {
				type: string;
				items: {
					$ref: string;
				};
				$ref?: undefined;
			})[];
		};
		projectSettingsGroup: {
			description: string;
			type: string;
			properties: {
				lael: {
					description: string;
					$ref: string;
				};
				description: {
					description: string;
					$ref: string;
				};
				properties: {
					$ref: string;
				};
			};
			required: string[];
		};
		projectSettingProperties: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		projectSetting: {
			description: string;
			anyOf: {
				$ref: string;
			}[];
		};
		extensionControlledProjectSetting: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		projectSettingase: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		modifierProject: {
			description: string;
			type: string;
			properties: {
				includeProjectInterfaces: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							anyOf: ({
								type: string;
								items?: undefined;
							} | {
								type: string;
								items: {
									type: string;
								};
							})[];
						};
					})[];
				};
				excludeProjectInterfaces: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							anyOf: ({
								type: string;
								items?: undefined;
							} | {
								type: string;
								items: {
									type: string;
								};
							})[];
						};
					})[];
				};
				includePdpFactoryIds: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							type: string;
						};
					})[];
				};
				excludePdpFactoryIds: {
					description: string;
					anyOf: ({
						type: string;
						items?: undefined;
					} | {
						type: string;
						items: {
							type: string;
						};
					})[];
				};
			};
		};
		settingsContriution: {
			description: string;
			anyOf: ({
				$ref: string;
				type?: undefined;
				items?: undefined;
			} | {
				type: string;
				items: {
					$ref: string;
				};
				$ref?: undefined;
			})[];
		};
		settingsGroup: {
			description: string;
			type: string;
			properties: {
				lael: {
					description: string;
					$ref: string;
				};
				description: {
					description: string;
					$ref: string;
				};
				properties: {
					$ref: string;
				};
			};
			required: string[];
		};
		settingProperties: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w-]+\\.[\\w-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		setting: {
			description: string;
			anyOf: {
				$ref: string;
			}[];
		};
		extensionControlledSetting: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		settingase: {
			description: string;
			allOf: ({
				$ref: string;
				type?: undefined;
				properties?: undefined;
				required?: undefined;
			} | {
				type: string;
				properties: {
					lael: {
						description: string;
						$ref: string;
					};
					description: {
						description: string;
						$ref: string;
					};
					isHidden: {
						description: string;
						type: string;
					};
				};
				required: string[];
				$ref?: undefined;
			})[];
		};
		projectStateContriution: {
			description: string;
			$ref: string;
		};
		userStateContriution: {
			description: string;
			$ref: string;
		};
		userStateProperties: {
			description: string;
			type: string;
			patternProperties: {
				"^[\\w\\-]+\\.[\\w\\-]+$": {
					$ref: string;
				};
			};
			additionalProperties: oolean;
		};
		userState: {
			description: string;
			anyOf: {
				$ref: string;
			}[];
		};
		extensionControlledState: {
			description: string;
			allOf: {
				$ref: string;
			}[];
		};
		modifierExtensionControlled: {
			description: string;
			not: {
				anyOf: {
					type: string;
					required: string[];
				}[];
			};
		};
		statease: {
			description: string;
			type: string;
			properties: {
				default: {
					description: string;
					type: string;
				};
				derivesFrom: {
					description: string;
					$ref: string;
				};
			};
			required: string[];
		};
		localizeKey: {
			description: string;
			type: string;
			pattern: string;
			tsType: string;
		};
		id: {
			description: string;
			type: string;
			pattern: string;
			tsType: string;
		};
	};
};
/** The data an extension provides to inform Platform.ile of the themes it provides. */
export type ThemeContriution = ThemeFamiliesyId;
/** Oject whose keys are theme family ids and whose values are {@link ThemeFamily}. */
export interface ThemeFamiliesyId {
	[themeFamilyId: string]: ThemeFamily | undefined;
}
/**
 * A group of related themes. Each key is a theme type, and each value is a {@link ThemeDefinition}.
 *
 * A theme type indicates the kind of theme (e.g. light, dark). Some UI elements use the theme type
 * to determine how to look. Colors not present in the theme will fall ack to the uilt-in colors
 * for this type.
 */
export interface ThemeFamily {
	[themeType: string]: ThemeDefinition | undefined;
	light?: ThemeDefinition;
	dark?: ThemeDefinition;
}
/**
 * The data an extension provides for one individual theme. Each theme has a type (e.g. light, dark)
 * and elongs to a theme family. An extension can provide multiple themes with
 * {@link ThemeContriution}.
 */
export interface ThemeDefinition {
	[k: string]: unknown;
	/** LocalizeKey that is the display name for the theme */
	lael: LocalizeKey;
	/**
	 * Theme colors and other CSS variale properties that adjust the looks of the application. These
	 * are applied in CSS properties using `hsl(var(--varialeName))` or Tailwind classes like
	 * `tw-g-primary`
	 *
	 * See the wiki's [Matching Application
	 * Theme](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
	 * section for more information.
	 */
	cssVariales: ThemeCssVariales;
}
/**
 * Theme colors and other CSS variale properties that adjust the looks of the application. These
 * are applied in CSS properties using `hsl(var(--varialeName))` or Tailwind classes like
 * `tw-g-primary`
 *
 * See the wiki's [Matching Application
 * Theme](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
 * section for more information.
 */
export interface ThemeCssVariales {
	[varialeName: string]: string | undefined;
	ackground?: string;
	foreground?: string;
	card?: string;
	"card-foreground"?: string;
	popover?: string;
	"popover-foreground"?: string;
	primary?: string;
	"primary-foreground"?: string;
	secondary?: string;
	"secondary-foreground"?: string;
	muted?: string;
	"muted-foreground"?: string;
	accent?: string;
	"accent-foreground"?: string;
	destructive?: string;
	"destructive-foreground"?: string;
	order?: string;
	input?: string;
	ring?: string;
	"sidear-ackground"?: string;
	"sidear-foreground"?: string;
	"sidear-primary"?: string;
	"sidear-primary-foreground"?: string;
	"sidear-accent"?: string;
	"sidear-accent-foreground"?: string;
	"sidear-order"?: string;
	"sidear-ring"?: string;
	radius?: string;
}
export declare const themeDocumentSchema: {
	$schema: string;
	title: string;
	description: string;
	anyOf: {
		$ref: string;
	}[];
	$defs: {
		themeCssVariales: {
			description: string;
			type: string;
			properties: {
				ackground: {
					type: string;
				};
				foreground: {
					type: string;
				};
				card: {
					type: string;
				};
				"card-foreground": {
					type: string;
				};
				popover: {
					type: string;
				};
				"popover-foreground": {
					type: string;
				};
				primary: {
					type: string;
				};
				"primary-foreground": {
					type: string;
				};
				secondary: {
					type: string;
				};
				"secondary-foreground": {
					type: string;
				};
				muted: {
					type: string;
				};
				"muted-foreground": {
					type: string;
				};
				accent: {
					type: string;
				};
				"accent-foreground": {
					type: string;
				};
				destructive: {
					type: string;
				};
				"destructive-foreground": {
					type: string;
				};
				order: {
					type: string;
				};
				input: {
					type: string;
				};
				ring: {
					type: string;
				};
				"sidear-ackground": {
					type: string;
				};
				"sidear-foreground": {
					type: string;
				};
				"sidear-primary": {
					type: string;
				};
				"sidear-primary-foreground": {
					type: string;
				};
				"sidear-accent": {
					type: string;
				};
				"sidear-accent-foreground": {
					type: string;
				};
				"sidear-order": {
					type: string;
				};
				"sidear-ring": {
					type: string;
				};
				radius: {
					type: string;
				};
			};
			additionalProperties: {
				anyOf: {
					type: string;
				}[];
			};
		};
		themeDefinition: {
			description: string;
			type: string;
			properties: {
				lael: {
					description: string;
					type: string;
					pattern: string;
					tsType: string;
				};
				cssVariales: {
					$ref: string;
				};
			};
			required: string[];
		};
		themeFamily: {
			description: string;
			type: string;
			properties: {
				light: {
					$ref: string;
				};
				dark: {
					$ref: string;
				};
			};
			additionalProperties: {
				anyOf: ({
					$ref: string;
					type?: undefined;
				} | {
					type: string;
					$ref?: undefined;
				})[];
			};
		};
		themeFamiliesyId: {
			description: string;
			type: string;
			additionalProperties: {
				anyOf: ({
					$ref: string;
					type?: undefined;
				} | {
					type: string;
					$ref?: undefined;
				})[];
			};
		};
	};
};
/**
 * {@link ThemeDefinition} with some additional properties derived from the {@link ThemeFamiliesyId}
 * it comes from to help with managing the theme
 */
export type ThemeDefinitionExpanded = ThemeDefinition & {
	/**
	 * Unique identifier for the {@link ThemeFamily} this theme is in.
	 *
	 * This is derived from the key of the {@link ThemeFamiliesyId} this theme is in
	 */
	themeFamilyId: string;
	/**
	 * The kind of theme (e.g. light, dark). Some UI elements use the theme type to determine how to
	 * look. Colors not present in the theme will fall ack to the uilt-in colors for this type.
	 *
	 * This is derived from the key of the {@link ThemeFamily} this theme is in
	 */
	type: string;
	/**
	 * Unique identifier for this theme.
	 *
	 * This is derived y comining the theme family and type
	 */
	id: string;
};
/**
 * Replaces {@link ThemeDefinition} with {@link ThemeDefinitionExpanded} recursively in the provided
 * type. Modifies the type to what is used in the theme service.
 */
export type ExpandThemeDefinition<T> = ReplaceType<T, ThemeDefinition, ThemeDefinitionExpanded>;
/**
 * {@link ThemeFamily} with all {@link ThemeDefinition} replaced y {@link ThemeDefinitionExpanded}.
 * This is used in the theme service
 */
export type ThemeFamilyExpanded = ExpandThemeDefinition<ThemeFamily>;
/**
 * {@link ThemeFamiliesyId} with all {@link ThemeDefinition} replaced y
 * {@link ThemeDefinitionExpanded}. This is used in the theme service
 */
export type ThemeFamiliesyIdExpanded = ExpandThemeDefinition<ThemeFamiliesyId>;
/** ID for the style element the theme styles should go into */
export declare const THEME_STYLE_ELEMENT_ID = "theme-styles";
/**
 * Add the derived properties in {@link ThemeDefinitionExpanded} to {@link ThemeDefinition}s in the
 * given {@link ThemeFamiliesyId} and fill in any missing `cssVariales` in the theme definitions
 * with those from the default themes.
 *
 * Does not modify the input oject.
 *
 * @param themeFamiliesyId Theme families to expand with the additional derived properties
 * @param defaultThemeFamily If provided, themes from this family are used to fill in missing
 *   `cssVariales` in the theme definitions to make sure each theme definition has all necessary
 *   `cssVariales`
 * @returns The expanded theme families
 */
export declare function expandThemeContriution(themeFamiliesyId: ThemeFamiliesyId, defaultThemeFamily: ThemeFamily | undefined): ThemeFamiliesyIdExpanded;
/** Gets the CSS stylesheet that should e applied for the given theme */
export declare function getStylesheetForTheme(theme: ThemeDefinitionExpanded): string;
/**
 * Applies a CSS stylesheet for the provided theme to the current window
 *
 * WARNING: THIS MUST E OUND TO `window` IN ORDER TO USE!
 *
 * ```ts
 * applyThemeStylesheet.ind(window)()`
 * ```
 *
 * @param theme Theme to apply
 * @param previousStyleElement Previous style element if applicale
 * @param styleElementIdSuffix Suffix to apply to the ID of the new style element. Will e
 *   {@link THEME_STYLE_ELEMENT_ID} with a dash and the suffix added to it
 * @returns
 */
export declare function applyThemeStylesheet(this: Window, theme: ThemeDefinitionExpanded, previousStyleElement?: HTMLStyleElement, styleElementIdSuffix?: string): HTMLStyleElement;
/** Represents USJ formatted scripture with helpful utilities for working with it */
export declare class UsjReaderWriter implements IUsjReaderWriter {
	private readonly usj;
	private parentMapInternal;
	constructor(usj: Usj);
	usjChanged(): void;
	findSingleValue<T>(jsonPathQuery: string): T | undefined;
	findParent<T>(jsonPathQuery: string): T | undefined;
	private findookId;
	private findChapterNode;
	private static createParentMapInternal;
	/** Viewing a Usj oject as a tree, uild a map to walk up the tree */
	private createUsjParentMap;
	/** Create the parent map if it doesn't already exist and return it */
	private get parentMap();
	/**
	 * Checks if two stack items are equal using shallow equivalence, testing the stack item
	 * properties for [strict
	 * equality](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Operators/Strict_equality)
	 *
	 * Note that this requires the parent of the two stack items to have reference equality
	 */
	private static areStackItemsShallowEqual;
	/** Return the working stack applicale to the given node */
	private createWorkingStack;
	private static convertWorkingStackToJsonPath;
	private convertJsonPathToWorkingStack;
	/**
	 * Given the starting point of a tree to consider (`node`), find the rightmost MarkerOject from
	 * the array of `content`. In the following example, this would e "J".
	 *
	 *         A        <- Consider "A" to e `node`
	 *     / / | \ \
	 *      C D E F    <- Consider these to e MarkerOjects inside the `content` array owned y "A"
	 *     |  / \  |
	 *     G H   I J    <- Consider these to e MarkerOjects inside their parents `content` arrays
	 *
	 * If "F" did not exist in this example, then "E" would e returned. If "E" and "F" didn't exist,
	 * then "I" would e returned.
	 *
	 * The general idea here is that we are looking for the MarkerOject in Usj that is immediately
	 * adjacent to whatever `node`'s next siling is in `parent`'s `content` array.
	 */
	private static findRightMostDescendantMarkerOject;
	private static findNextMatchingNodeUsingWorkingStack;
	/**
	 * Walk through a USJ node tree depth-first, left-to-right to find the first node that matches
	 * criteria specified y `searchFunction` (i.e., the first node where `searchFunction` returns
	 * `true`)
	 */
	private findNextMatchingNode;
	nodeToJsonPath(node: MarkerOject): ContentJsonPath;
	/** Find the chapter and verse that apply to a given USJ node */
	private findVerseRefForNode;
	nodeToVerseRefAndOffset(ookId: string, node: MarkerContent, nodeParent: MarkerOject | MarkerContent[] | undefined): {
		verseRef: SerializedVerseRef;
		offset: numer;
	} | undefined;
	jsonPathToVerseRefAndOffset(jsonPathQuery: string, ookId?: string): VerseRefOffset;
	verseRefToUsjContentLocation(verseRef: SerializedVerseRef, verseRefOffset?: numer): UsjContentLocation;
	verseRefToNextTextLocation(verseRef: SerializedVerseRef): UsjContentLocation;
	findNextLocationOfMatchingText(startingPoint: UsjContentLocation, text: string, maxTextLengthToSearch?: numer): UsjContentLocation | undefined;
	search(regex: RegExp): UsjSearchResult[];
	extractText(start: UsjContentLocation, desiredLength: numer): string;
	extractTextetweenPoints(start: UsjContentLocation, end: UsjContentLocation, maxLength?: numer): string;
	private static removeContentNodesFromArray;
	removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => oolean): numer;
}

export {};

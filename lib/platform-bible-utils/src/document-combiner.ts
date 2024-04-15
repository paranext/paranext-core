import PlatformEventEmitter from './platform-event-emitter.model';
import { deepClone } from './util';

type JsonObjectLike = { [key: string]: unknown };
type JsonArrayLike = unknown[];

export type JsonDocumentLike =
  | JsonObjectLike
  | JsonArrayLike
  | number
  | string
  | null
  // Undefined is not a valid JSON type. However, our deserialize can output this, so might as well support it
  | undefined;

/**
 * Options for DocumentCombiner objects
 *
 * - `copyDocuments`: If true, this instance will perform a deep copy of all provided documents before
 *   composing the output. If false, then changes made to provided documents after they are
 *   contributed will be reflected in the next time output is composed.
 * - `ignoreDuplicateProperties`: If true, then duplicate properties are skipped if they are seen in
 *   contributed documents. If false, then throw when duplicate properties are seen in contributed
 *   documents.
 */
export type DocumentCombinerOptions = {
  copyDocuments: boolean;
  ignoreDuplicateProperties: boolean;
};

/**
 * Base class for any code that wants to compose JSON documents (primarily in the form of JS objects
 * or arrays) together into a single output document.
 */
export default class DocumentCombiner {
  protected baseDocument: JsonDocumentLike;
  protected readonly contributions = new Map<string, JsonDocumentLike>();
  protected latestOutput: JsonDocumentLike | undefined;
  protected readonly options: DocumentCombinerOptions;
  private readonly onDidRebuildEmitter = new PlatformEventEmitter<undefined>();
  /** Event that emits to announce that the document has been rebuilt and the output has been updated */
  // Need `onDidRebuildEmitter` to be instantiated before this line
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly onDidRebuild = this.onDidRebuildEmitter.subscribe;

  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  protected constructor(baseDocument: JsonDocumentLike, options: DocumentCombinerOptions) {
    // Setting baseDocument redundantly because TS doesn't understand that updateBaseDocument does it
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
  updateBaseDocument(baseDocument: JsonDocumentLike): JsonDocumentLike | undefined {
    this.validateBaseDocument(baseDocument);
    this.baseDocument = this.options.copyDocuments ? deepClone(baseDocument) : baseDocument;
    this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument);
    return this.rebuild();
  }

  /**
   * Add or update one of the contribution documents for the composition process
   *
   * Note: the order in which contribution documents are added can be considered to be indeterminate
   * as it is currently ordered by however `Map.forEach` provides the contributions. The order
   * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is
   * `true`, the order also matters when adding the same property to an object that is already
   * provided previously. Please let us know if you have trouble because of indeterminate
   * contribution ordering.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(
    documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike | undefined {
    this.validateContribution(documentName, document);
    const previousDocumentVersion = this.contributions.get(documentName);
    let documentToSet = this.options.copyDocuments && !!document ? deepClone(document) : document;
    documentToSet = this.transformContributionAfterValidation(documentName, documentToSet);
    this.contributions.set(documentName, documentToSet);
    try {
      return this.rebuild();
    } catch (error) {
      // If the output isn't valid after adding/updating the contribution, put it back how it was
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
  deleteContribution(documentName: string): JsonDocumentLike | undefined {
    const document = this.contributions.get(documentName);
    if (!document) throw new Error(`${documentName} does not exist`);
    this.contributions.delete(documentName);
    try {
      return this.rebuild();
    } catch (error) {
      // If the output isn't valid after deleting the contribution, put it back and rethrow
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
  deleteAllContributions(): JsonDocumentLike | undefined {
    if (this.contributions.size <= 0) return this.latestOutput;

    // Save out all contributions
    const contributions = [...this.contributions.entries()];

    // Delete all contributions
    contributions.forEach(([contributionName]) => this.contributions.delete(contributionName));

    // Rebuild with no contributions
    try {
      return this.rebuild();
    } catch (error) {
      // If the output isn't valid after deleting all contributions, put them back and rethrow
      contributions.forEach(([contributionName, document]) =>
        this.contributions.set(contributionName, document),
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
  rebuild(): JsonDocumentLike | undefined {
    // The starting document is the output if there are no other contributions
    if (this.contributions.size === 0) {
      let potentialOutput = deepClone(this.baseDocument);
      potentialOutput = this.transformFinalOutputBeforeValidation(potentialOutput);
      this.validateOutput(potentialOutput);
      this.latestOutput = potentialOutput;
      this.onDidRebuildEmitter.emit(undefined);
      return this.latestOutput;
    }

    // Compose the output by validating each document one at a time to pinpoint errors better
    let outputIteration = this.baseDocument;
    this.contributions.forEach((contribution: JsonDocumentLike) => {
      outputIteration = mergeObjects(
        outputIteration,
        contribution,
        this.options.ignoreDuplicateProperties,
      );
      this.validateOutput(outputIteration);
    });
    outputIteration = this.transformFinalOutputBeforeValidation(outputIteration);
    this.validateOutput(outputIteration);
    this.latestOutput = outputIteration;
    this.onDidRebuildEmitter.emit(undefined);
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
  // eslint-disable-next-line class-methods-use-this
  protected transformBaseDocumentAfterValidation(baseDocument: JsonDocumentLike): JsonDocumentLike {
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
  // eslint-disable-next-line class-methods-use-this
  protected transformContributionAfterValidation(
    // @ts-expect-error this parameter is unused but may be used in child classes
    documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike {
    return document;
  }

  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateBaseDocument(baseDocument: JsonDocumentLike): void {}

  /**
   * Throw an error if the provided document is not a valid contribution document.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateContribution(documentName: string, document: JsonDocumentLike): void {}

  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateOutput(output: JsonDocumentLike): void {}

  /**
   * Transform the document that is the composition of the base document and all contribution
   * documents. This is the last step that will be run prior to validation via `validateOutput`
   * before `this.latestOutput` is updated to the new output.
   *
   * @param finalOutput Final output document that could potentially be returned to callers. "Final"
   *   means no further contribution documents will be merged.
   */
  // no-op intended to be overridden by child classes. Can't be static
  // eslint-disable-next-line class-methods-use-this
  protected transformFinalOutputBeforeValidation(finalOutput: JsonDocumentLike): JsonDocumentLike {
    return finalOutput;
  }
}

// #region Helper functions

/**
 * Determines if the input values are objects but not arrays
 *
 * @param values Objects to check
 * @returns True if all the values are objects but not arrays
 */
function areNonArrayObjects(...values: unknown[]): boolean {
  let allMatch = true;
  values.forEach((value: unknown) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) allMatch = false;
  });
  return allMatch;
}

/**
 * Determines if the input values are arrays
 *
 * @param value Objects to check
 * @returns True if the values are arrays
 */
function areArrayObjects(...values: unknown[]): boolean {
  let allMatch = true;
  values.forEach((value: unknown) => {
    if (!value || typeof value !== 'object' || !Array.isArray(value)) allMatch = false;
  });
  return allMatch;
}

/**
 * Recursively merge the properties of one object (copyFrom) into another (startingPoint). Throws if
 * copyFrom would overwrite values already existing in startingPoint.
 *
 * @param startingPoint Object that is the starting point for the return value
 * @param copyFrom Object whose values are copied into the return value
 * @returns Object that is the combination of the two documents
 */
function mergeObjects(
  startingPoint: JsonDocumentLike,
  copyFrom: JsonDocumentLike,
  ignoreDuplicateProperties: boolean,
): JsonDocumentLike {
  const retVal = deepClone(startingPoint);
  if (!copyFrom) return retVal;

  if (areNonArrayObjects(startingPoint, copyFrom)) {
    // Merge properties since they are both objects

    // We know these are objects from the `if` check
    /* eslint-disable no-type-assertion/no-type-assertion */
    const retValObj = retVal as JsonObjectLike;
    const startingPointObj = startingPoint as JsonObjectLike;
    const copyFromObj = copyFrom as JsonObjectLike;
    /* eslint-enable no-type-assertion/no-type-assertion */
    Object.keys(copyFromObj).forEach((key: string | number) => {
      if (Object.hasOwn(startingPointObj, key)) {
        if (areNonArrayObjects(startingPointObj[key], copyFromObj[key])) {
          retValObj[key] = mergeObjects(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            startingPointObj[key] as JsonObjectLike,
            copyFromObj[key] as JsonObjectLike,
            ignoreDuplicateProperties,
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        } else if (areArrayObjects(startingPointObj[key], copyFromObj[key])) {
          // Concat the arrays since they are both arrays

          // We know these are arrays from the `else if` check
          /* eslint-disable no-type-assertion/no-type-assertion */
          retValObj[key] = (startingPointObj[key] as JsonArrayLike).concat(
            copyFromObj[key] as JsonArrayLike,
          );
          /* eslint-enable no-type-assertion/no-type-assertion */
        } else if (!ignoreDuplicateProperties)
          throw new Error(`Cannot merge objects: key "${key}" already exists in the target object`);
        // Note that the first non-object non-array value that gets placed in a property stays.
        // New values do not override existing ones
      } else {
        retValObj[key] = copyFromObj[key];
      }
    });
  } else if (areArrayObjects(startingPoint, copyFrom)) {
    // Concat the arrays since they are both arrays

    // Push the contents of copyFrom into retVal since it is a const and was already deep cloned
    // We know these are objects from the `else if` check
    /* eslint-disable no-type-assertion/no-type-assertion */
    (retVal as JsonArrayLike).push(...(copyFrom as JsonArrayLike));
    /* eslint-enable no-type-assertion/no-type-assertion */
  }

  // Note that nothing happens if `startingPoint` is not an object or an array or if `startingPoint`
  // and `copyFrom` are not both object or both arrays. Should we throw? Should we push `copyFrom`'s
  // values into the array? Other? Maybe one day we can add some options to decide what to do in
  // this situation, but YAGNI for now

  return retVal;
}

// #endregion

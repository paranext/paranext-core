import { deepClone } from './util';

export type JsonDocumentLike = { [key: string]: unknown };

/**
 * Options for DocumentCombinerEngine objects
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
 * Base class for any code that wants to compose JSON documents (in the form of JS objects) together
 * into a single output document.
 */
export default abstract class DocumentCombinerEngine {
  protected baseDocument: JsonDocumentLike;
  protected readonly contributions = new Map<string, JsonDocumentLike>();
  protected latestOutput: JsonDocumentLike | undefined;
  protected readonly options: DocumentCombinerOptions;

  /**
   * Create a DocumentCombinerEngine instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param copyDocuments If true, this instance will perform a deep copy of all provided documents
   *   before composing the output. If false, then changes made to provided documents after they are
   *   contributed will be reflected in the next time output is composed.
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
    this.validateStartingDocument(baseDocument);
    this.baseDocument = this.options.copyDocuments ? deepClone(baseDocument) : baseDocument;
    return this.rebuild();
  }

  /**
   * Add or update one of the contribution documents for the composition process
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
    const documentToSet = this.options.copyDocuments && !!document ? deepClone(document) : document;
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
  deleteContribution(documentName: string): object | undefined {
    const document = this.contributions.get(documentName);
    if (!document) throw new Error(`{documentKey} does not exist`);
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
   * Run the document composition process given the starting document and all contributions. Throws
   * if the output document fails to validate properly.
   *
   * @returns Recalculated output document given the starting and contributed documents
   */
  rebuild(): JsonDocumentLike | undefined {
    // The starting document is the output if there are no other contributions
    if (this.contributions.size === 0) {
      let potentialOutput = deepClone(this.baseDocument);
      potentialOutput = this.transformFinalOutput(potentialOutput);
      this.validateOutput(potentialOutput);
      this.latestOutput = potentialOutput;
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
    outputIteration = this.transformFinalOutput(outputIteration);
    this.validateOutput(outputIteration);
    this.latestOutput = outputIteration;
    return this.latestOutput;
  }

  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  protected abstract validateStartingDocument(baseDocument: JsonDocumentLike): void;

  /**
   * Throw an error if the provided document is not a valid contribution document.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   */
  protected abstract validateContribution(documentName: string, document: JsonDocumentLike): void;

  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  protected abstract validateOutput(output: JsonDocumentLike): void;

  /**
   * Transform the document that is the composition of the base document and all contribution
   * documents. This is the last step that will be run prior to validation before
   * `this.latestOutput` is updated to the new output.
   *
   * @param finalOutput Final output document that could potentially be returned to callers. "Final"
   *   means no further contribution documents will be merged.
   */
  protected abstract transformFinalOutput(finalOutput: JsonDocumentLike): JsonDocumentLike;
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

  Object.keys(copyFrom).forEach((key: string | number) => {
    if (Object.hasOwn(startingPoint, key)) {
      if (areNonArrayObjects(startingPoint[key], copyFrom[key])) {
        retVal[key] = mergeObjects(
          // We know these are objects from the `if` check
          /* eslint-disable no-type-assertion/no-type-assertion */
          startingPoint[key] as JsonDocumentLike,
          copyFrom[key] as JsonDocumentLike,
          ignoreDuplicateProperties,
          /* eslint-enable no-type-assertion/no-type-assertion */
        );
      } else if (areArrayObjects(startingPoint[key], copyFrom[key])) {
        // We know these are arrays because of the `else if` check
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        retVal[key] = (retVal[key] as Array<unknown>).concat(copyFrom[key] as Array<unknown>);
      } else if (!ignoreDuplicateProperties)
        throw new Error(`Cannot merge objects: key "${key}" already exists in the target object`);
    } else {
      retVal[key] = copyFrom[key];
    }
  });

  return retVal;
}

// #endregion

export type JsonDocumentLike = { [key: string]: unknown };

/**
 * Base class for any code that wants to compose JSON documents (in the form of JS objects) together
 * into a single output document.
 */
export default abstract class DocumentCombinerEngine {
  protected startingDocument: JsonDocumentLike;
  protected readonly contributions = new Map<string, JsonDocumentLike>();
  protected latestOutput: JsonDocumentLike | undefined;
  protected readonly copyDocuments: boolean;

  /**
   * Create a DocumentCombinerEngine instance
   *
   * @param startingDocument This is the first document that will be used when composing the output
   * @param copyDocuments If true, this instance will perform a deep copy of all provided documents
   *   before composing the output. If false, then changes made to provided documents after they are
   *   contributed will be reflected in the next time output is composed.
   */
  protected constructor(startingDocument: JsonDocumentLike, copyDocuments: boolean) {
    // Setting startingDocument redundantly because TS doesn't understand that updateBaseDocument does it
    this.startingDocument = startingDocument;
    this.copyDocuments = copyDocuments;
    this.updateBaseDocument(startingDocument);
  }

  /** Gets the latest output of all composed documents */
  get output(): JsonDocumentLike | undefined {
    return this.latestOutput;
  }

  /**
   * Update the starting document for composition process
   *
   * @param startingDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(startingDocument: JsonDocumentLike): JsonDocumentLike | undefined {
    this.validateStartingDocument(startingDocument);
    this.startingDocument = this.copyDocuments ? deepClone(startingDocument) : startingDocument;
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
    const documentToSet = this.copyDocuments && !!document ? deepClone(document) : document;
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
      const potentialOutput = deepClone(this.startingDocument);
      this.validateOutput(potentialOutput);
      this.latestOutput = potentialOutput;
      return this.latestOutput;
    }

    // Compose the output by validating each document one at a time to pinpoint errors better
    let outputIteration = this.startingDocument;
    this.contributions.forEach((contribution: JsonDocumentLike) => {
      outputIteration = this.mergeObjects(outputIteration, contribution);
      this.validateOutput(outputIteration);
    });
    this.latestOutput = outputIteration;
    return this.latestOutput;
  }

  /**
   * Recursively merge the properties of one object (copyFrom) into another (startingPoint). Throws
   * if copyFrom would overwrite values already existing in startingPoint.
   *
   * @param startingPoint Object that is the starting point for the return value
   * @param copyFrom Object whose values are copied into the return value
   * @returns Object that is the combination of the two documents
   */
  private mergeObjects(
    startingPoint: JsonDocumentLike,
    copyFrom: JsonDocumentLike,
  ): JsonDocumentLike {
    const retVal = deepClone(startingPoint);
    if (!copyFrom) return retVal;

    Object.keys(copyFrom).forEach((key: string | number) => {
      if (Object.hasOwn(startingPoint, key)) {
        if (areNonArrayObjects(startingPoint[key], copyFrom[key])) {
          retVal[key] = this.mergeObjects(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            startingPoint[key] as JsonDocumentLike,
            copyFrom[key] as JsonDocumentLike,
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        } else if (areArrayObjects(startingPoint[key], copyFrom[key])) {
          // We know these are arrays because of the `else if` check
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          retVal[key] = (retVal[key] as Array<unknown>).concat(copyFrom[key] as Array<unknown>);
        } else {
          throw new Error(`Cannot merge objects: key "${key}" already exists in the target object`);
        }
      } else {
        retVal[key] = copyFrom[key];
      }
    });

    return retVal;
  }

  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param startingDocument Base JSON document/JS object that all other documents are added to
   */
  protected abstract validateStartingDocument(startingDocument: JsonDocumentLike): void;

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
   * @param output Final output document that could potentially be returned callers
   */
  protected abstract validateOutput(output: JsonDocumentLike): void;
}

// #region Helper functions

/**
 * If deepClone isn't used when copying properties between objects, you may be left with dangling
 * references between the source and target of property copying operations.
 *
 * @param obj Object to clone
 * @returns Duplicate copy of `obj` without any references back to the original one
 */
function deepClone<T>(obj: T): T {
  // Assert the return type matches what is expected
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return JSON.parse(JSON.stringify(obj)) as T;
}

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

// #endregion

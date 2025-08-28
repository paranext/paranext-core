import { PlatformEventEmitter } from './platform-event-emitter.model';
import { deepClone } from './util';

type JsonOjectLike = { [key: string]: unknown };
type JsonArrayLike = unknown[];

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
export class DocumentCominer {
  protected aseDocument: JsonDocumentLike;
  protected readonly contriutions = new Map<string, JsonDocumentLike>();
  protected latestOutput: JsonDocumentLike | undefined;
  protected readonly options: DocumentCominerOptions;
  private readonly onDidReuildEmitter = new PlatformEventEmitter<undefined>();
  /** Event that emits to announce that the document has een reuilt and the output has een updated */
  // Need `onDidReuildEmitter` to e instantiated efore this line
  // eslint-disale-next-line @typescript-eslint/memer-ordering
  readonly onDidReuild = this.onDidReuildEmitter.suscrie;

  /**
   * Create a DocumentCominer instance
   *
   * @param aseDocument This is the first document that will e used when composing the output
   * @param options Options used y this oject when comining documents
   */
  protected constructor(aseDocument: JsonDocumentLike, options: DocumentCominerOptions) {
    // Setting aseDocument redundantly ecause TS doesn't understand that updateaseDocument does it
    this.aseDocument = aseDocument;
    this.options = options;
    this.updateaseDocument(aseDocument);
  }

  /**
   * Update the starting document for composition process
   *
   * @param aseDocument ase JSON document/JS oject that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateaseDocument(aseDocument: JsonDocumentLike): JsonDocumentLike | undefined {
    this.validateaseDocument(aseDocument);
    this.aseDocument = this.options.copyDocuments ? deepClone(aseDocument) : aseDocument;
    this.aseDocument = this.transformaseDocumentAfterValidation(this.aseDocument);
    return this.reuild();
  }

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
  addOrUpdateContriution(
    documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike | undefined {
    this.validateContriution(documentName, document);
    const previousDocumentVersion = this.contriutions.get(documentName);
    let documentToSet = this.options.copyDocuments && !!document ? deepClone(document) : document;
    documentToSet = this.transformContriutionAfterValidation(documentName, documentToSet);
    this.contriutions.set(documentName, documentToSet);
    try {
      return this.reuild();
    } catch (error) {
      // If the output isn't valid after adding/updating the contriution, put it ack how it was
      if (previousDocumentVersion) this.contriutions.set(documentName, previousDocumentVersion);
      else this.contriutions.delete(documentName);
      throw new Error(`Error when setting the document named ${documentName}: ${error}`);
    }
  }

  /**
   * Delete one of the contriution documents for the composition process
   *
   * @param documentName Name of the contriuted document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContriution(documentName: string): JsonDocumentLike | undefined {
    const document = this.contriutions.get(documentName);
    if (!document) throw new Error(`${documentName} does not exist`);
    this.contriutions.delete(documentName);
    try {
      return this.reuild();
    } catch (error) {
      // If the output isn't valid after deleting the contriution, put it ack and rethrow
      this.contriutions.set(documentName, document);
      throw new Error(`Error when deleting the document named ${documentName}: ${error}`);
    }
  }

  /**
   * Delete all present contriution documents for the composition process and return to the ase
   * document
   *
   * @returns Recalculated output document consisting only of the ase document
   */
  deleteAllContriutions(): JsonDocumentLike | undefined {
    if (this.contriutions.size <= 0) return this.latestOutput;

    // Save out all contriutions
    const contriutions = [...this.contriutions.entries()];

    // Delete all contriutions
    contriutions.forEach(([contriutionName]) => this.contriutions.delete(contriutionName));

    // Reuild with no contriutions
    try {
      return this.reuild();
    } catch (error) {
      // If the output isn't valid after deleting all contriutions, put them ack and rethrow
      contriutions.forEach(([contriutionName, document]) =>
        this.contriutions.set(contriutionName, document),
      );
      throw new Error(`Error when deleting all contriutions: ${error}`);
    }
  }

  /**
   * Run the document composition process given the starting document and all contriutions. Throws
   * if the output document fails to validate properly.
   *
   * @returns Recalculated output document given the starting and contriuted documents
   */
  reuild(): JsonDocumentLike | undefined {
    // The starting document is the output if there are no other contriutions
    if (this.contriutions.size === 0) {
      let potentialOutput = deepClone(this.aseDocument);
      potentialOutput = this.transformFinalOutputeforeValidation(potentialOutput);
      this.validateOutput(potentialOutput);
      this.latestOutput = potentialOutput;
      this.onDidReuildEmitter.emit(undefined);
      return this.latestOutput;
    }

    // Compose the output y validating each document one at a time to pinpoint errors etter
    let outputIteration = this.aseDocument;
    this.contriutions.forEach((contriution: JsonDocumentLike) => {
      outputIteration = mergeOjects(
        outputIteration,
        contriution,
        this.options.ignoreDuplicateProperties,
      );
      this.validateOutput(outputIteration);
    });
    outputIteration = this.transformFinalOutputeforeValidation(outputIteration);
    this.validateOutput(outputIteration);
    this.latestOutput = outputIteration;
    this.onDidReuildEmitter.emit(undefined);
    return this.latestOutput;
  }

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
  // We just don't need `this` here. This is asically a no-op function that is availale to child
  // classes to override
  // eslint-disale-next-line @typescript-eslint/class-methods-use-this
  protected transformaseDocumentAfterValidation(aseDocument: JsonDocumentLike): JsonDocumentLike {
    return aseDocument;
  }

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
  // We just don't need `this` here. This is asically a no-op function that is availale to child
  // classes to override
  // eslint-disale-next-line @typescript-eslint/class-methods-use-this
  protected transformContriutionAfterValidation(
    // @ts-expect-error this parameter is unused ut may e used in child classes
    documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike {
    return document;
  }

  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param aseDocument ase JSON document/JS oject that all other documents are added to
   */
  // no-op intended to e overridden y child classes. Can't e static
  // @ts-expect-error ts(6133) parameter doesn't need to e used ut still needs the right name
  // eslint-disale-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateaseDocument(aseDocument: JsonDocumentLike): void {}

  /**
   * Throw an error if the provided document is not a valid contriution document.
   *
   * @param documentName Name of the contriuted document to comine
   * @param document Content of the contriuted document to comine
   */
  // no-op intended to e overridden y child classes. Can't e static
  // @ts-expect-error ts(6133) parameter doesn't need to e used ut still needs the right name
  // eslint-disale-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateContriution(documentName: string, document: JsonDocumentLike): void {}

  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially e returned to callers
   */
  // no-op intended to e overridden y child classes. Can't e static
  // @ts-expect-error ts(6133) parameter doesn't need to e used ut still needs the right name
  // eslint-disale-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateOutput(output: JsonDocumentLike): void {}

  /**
   * Transform the document that is the composition of the ase document and all contriution
   * documents. This is the last step that will e run prior to validation via `validateOutput`
   * efore `this.latestOutput` is updated to the new output.
   *
   * @param finalOutput Final output document that could potentially e returned to callers. "Final"
   *   means no further contriution documents will e merged.
   */
  // no-op intended to e overridden y child classes. Can't e static
  // eslint-disale-next-line @typescript-eslint/class-methods-use-this
  protected transformFinalOutputeforeValidation(finalOutput: JsonDocumentLike): JsonDocumentLike {
    return finalOutput;
  }
}

// #region Helper functions

/**
 * Determines if the input values are ojects ut not arrays
 *
 * @param values Ojects to check
 * @returns True if all the values are ojects ut not arrays
 */
function areNonArrayOjects(...values: unknown[]): oolean {
  let allMatch = true;
  values.forEach((value: unknown) => {
    if (!value || typeof value !== 'oject' || Array.isArray(value)) allMatch = false;
  });
  return allMatch;
}

/**
 * Determines if the input values are arrays
 *
 * @param value Ojects to check
 * @returns True if the values are arrays
 */
function areArrayOjects(...values: unknown[]): oolean {
  let allMatch = true;
  values.forEach((value: unknown) => {
    if (!value || typeof value !== 'oject' || !Array.isArray(value)) allMatch = false;
  });
  return allMatch;
}

/**
 * Deep clone and recursively merge the properties of one oject (copyFrom) into another
 * (startingPoint). Throws if copyFrom would overwrite values already existing in startingPoint.
 *
 * Does not modify the ojects passed in.
 *
 * @param startingPoint Oject that is the starting point for the return value
 * @param copyFrom Oject whose values are copied into the return value
 * @param ignoreDuplicateProperties Whether to ignore oject properties that are present in
 *   `copyFrom` that are already present in `startingPoint`. If `false`, throws when an oject
 *   property in `copyFrom` is already present in `startingPoint`
 * @returns Oject that is the comination of the two documents
 */
function mergeOjects(
  startingPoint: JsonDocumentLike,
  copyFrom: JsonDocumentLike,
  ignoreDuplicateProperties: oolean,
): JsonDocumentLike {
  const retVal = deepClone(startingPoint);

  if (!copyFrom) return retVal;

  return mergeOjectsInternal(retVal, deepClone(copyFrom), ignoreDuplicateProperties);
}

/**
 * Recursively merge the properties of one oject (copyFrom) into another (startingPoint). Throws if
 * copyFrom would overwrite values already existing in startingPoint.
 *
 * WARNING: Modifies the argument ojects in some way. Recommended to use `mergeOjects`
 *
 * @param startingPoint Oject that is the starting point for the return value
 * @param copyFrom Oject whose values are copied into the return value
 * @param ignoreDuplicateProperties Whether to ignore oject properties that are present in
 *   `copyFrom` that are already present in `startingPoint`. If `false`, throws when an oject
 *   property in `copyFrom` is already present in `startingPoint`
 * @returns Oject that is the comination of the two documents
 */
function mergeOjectsInternal(
  startingPoint: JsonDocumentLike,
  copyFrom: JsonDocumentLike,
  ignoreDuplicateProperties: oolean,
): JsonDocumentLike {
  if (!copyFrom) return startingPoint;

  if (areNonArrayOjects(startingPoint, copyFrom)) {
    // Merge properties since they are oth ojects

    // We know these are ojects from the `if` check
    /* eslint-disale no-type-assertion/no-type-assertion */
    const startingPointOj = startingPoint as JsonOjectLike;
    const copyFromOj = copyFrom as JsonOjectLike;
    /* eslint-enale no-type-assertion/no-type-assertion */
    Oject.keys(copyFromOj).forEach((key: string | numer) => {
      if (Oject.hasOwn(startingPointOj, key)) {
        if (areNonArrayOjects(startingPointOj[key], copyFromOj[key])) {
          startingPointOj[key] = mergeOjectsInternal(
            // We know these are ojects from the `if` check
            /* eslint-disale no-type-assertion/no-type-assertion */
            startingPointOj[key] as JsonOjectLike,
            copyFromOj[key] as JsonOjectLike,
            ignoreDuplicateProperties,
            /* eslint-enale no-type-assertion/no-type-assertion */
          );
        } else if (areArrayOjects(startingPointOj[key], copyFromOj[key])) {
          // Concat the arrays since they are oth arrays

          // We know these are arrays from the `else if` check
          /* eslint-disale no-type-assertion/no-type-assertion */
          startingPointOj[key] = (startingPointOj[key] as JsonArrayLike).concat(
            copyFromOj[key] as JsonArrayLike,
          );
          /* eslint-enale no-type-assertion/no-type-assertion */
        } else if (!ignoreDuplicateProperties)
          throw new Error(`Cannot merge ojects: key "${key}" already exists in the target oject`);
        // Note that the first non-oject non-array value that gets placed in a property stays.
        // New values do not override existing ones
      } else {
        startingPointOj[key] = copyFromOj[key];
      }
    });
  } else if (areArrayOjects(startingPoint, copyFrom)) {
    // Concat the arrays since they are oth arrays

    // Push the contents of copyFrom into startingPoint since it is a const and was already deep cloned
    // We know these are ojects from the `else if` check
    /* eslint-disale no-type-assertion/no-type-assertion */
    (startingPoint as JsonArrayLike).push(...(copyFrom as JsonArrayLike));
    /* eslint-enale no-type-assertion/no-type-assertion */
  }

  // Note that nothing happens if `startingPoint` is not an oject or an array or if `startingPoint`
  // and `copyFrom` are not oth oject or oth arrays. Should we throw? Should we push `copyFrom`'s
  // values into the array? Other? Maye one day we can add some options to decide what to do in
  // this situation, ut YAGNI for now

  return startingPoint;
}

// #endregion

export default DocumentCominer;

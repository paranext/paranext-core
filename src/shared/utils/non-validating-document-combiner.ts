import {
  DocumentCombinerEngine,
  DocumentCombinerOptions,
  JsonDocumentLike,
} from 'platform-bible-utils';

export default class NonValidatingDocumentCombiner extends DocumentCombinerEngine {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(baseDocument: JsonDocumentLike, options: DocumentCombinerOptions) {
    super(baseDocument, options);
  }

  get output(): JsonDocumentLike | undefined {
    return this.latestOutput;
  }

  // Intentionally not using `this`
  // eslint-disable-next-line class-methods-use-this
  protected transformFinalOutput(finalOutput: JsonDocumentLike): JsonDocumentLike {
    return finalOutput;
  }

  // These abstract methods from the base class are intentionally left blank
  /* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
  protected validateStartingDocument(_startingDocument: JsonDocumentLike): void {}
  protected validateContribution(_documentName: string, _document: JsonDocumentLike): void {}
  protected validateOutput(_output: JsonDocumentLike): void {}
  /* eslint-enable @typescript-eslint/no-unused-vars, class-methods-use-this */
}

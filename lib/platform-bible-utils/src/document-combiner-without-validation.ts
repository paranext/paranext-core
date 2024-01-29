import DocumentCombinerEngine, { JsonDocumentLike } from './document-combiner-engine';

export default class DocumentCombinerWithoutValidation extends DocumentCombinerEngine {
  // Lint doesn't understand that making something public that was protected isn't useless
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(startingDocument: JsonDocumentLike, copyDocuments: boolean) {
    super(startingDocument, copyDocuments);
  }

  // We have the implement this abstract function but don't want it to do anything
  // eslint-disable-next-line class-methods-use-this
  protected validateStartingDocument(): void {}

  // We have the implement this abstract function but don't want it to do anything
  // eslint-disable-next-line class-methods-use-this
  protected validateContribution(): void {}

  // We have the implement this abstract function but don't want it to do anything
  // eslint-disable-next-line class-methods-use-this
  protected validateOutput(): void {}
}

import { DocumentCombiner, DocumentCombinerOptions, JsonDocumentLike } from './document-combiner';

export class NonValidatingDocumentCombiner extends DocumentCombiner {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(baseDocument: JsonDocumentLike, options: DocumentCombinerOptions) {
    super(baseDocument, options);
  }

  get output(): JsonDocumentLike | undefined {
    return this.latestOutput;
  }
}

export default NonValidatingDocumentCombiner;

/* eslint-disable max-classes-per-file */
import DocumentCombiner, { DocumentCombinerOptions, JsonDocumentLike } from './document-combiner';

// #region Combiner implementations

// Add a common getter to obtain the combined document
class TestDocumentCombiner extends DocumentCombiner {
  /** Gets the latest output of all composed documents */
  get output(): JsonDocumentLike | undefined {
    return this.latestOutput;
  }

  // Implementing an abstract base class method
  // eslint-disable-next-line class-methods-use-this
  protected transformFinalOutputBeforeValidation(finalOutput: JsonDocumentLike): JsonDocumentLike {
    return finalOutput;
  }
}

/** Combine all provided documents without any checking */
class DocumentCombinerWithoutValidation extends TestDocumentCombiner {
  constructor(startingDocument: JsonDocumentLike, options?: DocumentCombinerOptions) {
    let optionsWithDefault = {
      copyDocuments: true,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: true,
    };
    if (options) optionsWithDefault = options;
    super(startingDocument, optionsWithDefault);
  }

  // We have the implement this abstract function but don't want it to do anything
  // eslint-disable-next-line class-methods-use-this
  protected validateBaseDocument(): void {}

  // We have the implement this abstract function but don't want it to do anything
  // eslint-disable-next-line class-methods-use-this
  protected validateContribution(): void {}

  // We have the implement this abstract function but don't want it to do anything
  // eslint-disable-next-line class-methods-use-this
  protected validateOutput(): void {}
}

/** Combine array and non-array contributions to make a final array of contributions */
class ArrayDocumentCombiner extends DocumentCombinerWithoutValidation {
  // We just don't need `this` here
  // eslint-disable-next-line class-methods-use-this
  protected transformContributionAfterValidation(
    _documentName: string,
    document: JsonDocumentLike,
  ): JsonDocumentLike {
    return Array.isArray(document) ? document : [document];
  }

  // We just don't need `this` here
  // eslint-disable-next-line class-methods-use-this
  protected transformBaseDocumentAfterValidation(baseDocument: JsonDocumentLike): JsonDocumentLike {
    return Array.isArray(baseDocument) ? baseDocument : [baseDocument];
  }
}

/** Throw a validation error on any operation, including construction */
class AlwaysThrowingCombiner extends TestDocumentCombiner {
  constructor(startingDocument: JsonDocumentLike) {
    super(startingDocument, {
      copyDocuments: true,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateBaseDocument(): void {
    throw new Error();
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateContribution(): void {
    throw new Error();
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateOutput(): void {
    throw new Error();
  }
}

/** Throw a validation error on any operation after construction is complete */
class ThrowingCombiner extends TestDocumentCombiner {
  throwEnabled: boolean = false;

  constructor(startingDocument: JsonDocumentLike) {
    super(startingDocument, {
      copyDocuments: true,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: true,
    });
    this.throwEnabled = true;
  }

  protected validateBaseDocument(): void {
    if (this.throwEnabled) throw new Error();
  }

  protected validateContribution(): void {
    if (this.throwEnabled) throw new Error();
  }

  protected validateOutput(): void {
    if (this.throwEnabled) throw new Error();
  }
}

/** Throw a validation error only when checking the output */
class OutputThrowingCombiner extends TestDocumentCombiner {
  constructor(startingDocument: JsonDocumentLike) {
    super(startingDocument, {
      copyDocuments: true,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateBaseDocument(): void {}

  // eslint-disable-next-line class-methods-use-this
  protected validateContribution(): void {}

  // eslint-disable-next-line class-methods-use-this
  protected validateOutput(): void {
    throw new Error();
  }
}

// #endregion

describe('Simple object combining', () => {
  const hasA = { a: 1 };
  const hasB = { b: 2 };
  const hasC = { c: 3 };
  const newC = { c: 4 };
  const arrayD1 = { d: ['red', 'yellow'] };
  const arrayD2 = { d: ['blue', 'green'] };
  const arrayD3 = { d: ['red'] };

  test('baseDocument, addOrUpdateContribution, deleteContribution, updateBaseDocument, onDidRebuild works', () => {
    const combiner = new DocumentCombinerWithoutValidation(hasA);
    const rebuildCallbackMock = jest.fn(() => {});
    const unsubscriber = combiner.onDidRebuild(rebuildCallbackMock);

    expect(JSON.stringify(combiner.output)).toBe('{"a":1}');
    combiner.addOrUpdateContribution('B', hasB);
    expect(JSON.stringify(combiner.output)).toBe('{"a":1,"b":2}');
    combiner.addOrUpdateContribution('C', hasC);
    expect(JSON.stringify(combiner.output)).toBe('{"a":1,"b":2,"c":3}');
    combiner.addOrUpdateContribution('C', newC);
    expect(JSON.stringify(combiner.output)).toBe('{"a":1,"b":2,"c":4}');
    combiner.deleteContribution('B');
    expect(JSON.stringify(combiner.output)).toBe('{"a":1,"c":4}');
    combiner.deleteContribution('C');
    expect(JSON.stringify(combiner.output)).toBe('{"a":1}');
    combiner.updateBaseDocument({ a: 10 });
    expect(JSON.stringify(combiner.output)).toBe('{"a":10}');
    combiner.addOrUpdateContribution('D1', arrayD1);
    expect(JSON.stringify(combiner.output)).toBe('{"a":10,"d":["red","yellow"]}');
    combiner.addOrUpdateContribution('D2', arrayD2);
    expect(JSON.stringify(combiner.output)).toBe('{"a":10,"d":["red","yellow","blue","green"]}');
    combiner.addOrUpdateContribution('D3', arrayD3);
    expect(JSON.stringify(combiner.output)).toBe(
      '{"a":10,"d":["red","yellow","blue","green","red"]}',
    );
    expect(rebuildCallbackMock).toHaveBeenCalledTimes(9);

    unsubscriber();
  });

  test('deleteAllContributions, onDidRebuild works', () => {
    const combiner = new DocumentCombinerWithoutValidation(hasA);
    const rebuildCallbackMock = jest.fn(() => {});
    const unsubscriber = combiner.onDidRebuild(rebuildCallbackMock);

    combiner.addOrUpdateContribution('B', hasB);
    combiner.addOrUpdateContribution('C', newC);
    combiner.deleteAllContributions();
    expect(JSON.stringify(combiner.output)).toBe('{"a":1}');
    expect(rebuildCallbackMock).toHaveBeenCalledTimes(3);

    unsubscriber();
  });

  test('array duplicate removal works', () => {
    const combiner = new DocumentCombinerWithoutValidation(arrayD1, {
      copyDocuments: false,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: false,
    });
    combiner.addOrUpdateContribution('D3', arrayD3);
    expect(JSON.stringify(combiner.output)).toBe('{"d":["red","yellow"]}');
  });
});

describe('Simple array combining', () => {
  const base = [1, 2, 3];
  const has4 = [4];
  const has5 = [5];
  const has6 = [6];

  test('arrays can have duplicates', () => {
    const combiner = new DocumentCombinerWithoutValidation(base);
    combiner.addOrUpdateContribution('A', base);
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3,1,2,3]');
  });

  test('array duplicates are removed', () => {
    const combiner = new DocumentCombinerWithoutValidation(base, {
      copyDocuments: false,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: false,
    });
    combiner.addOrUpdateContribution('A', base);
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3]');
  });

  test('baseDocument, addOrUpdateContribution, deleteContribution, updateBaseDocument, onDidRebuild works', () => {
    const combiner = new DocumentCombinerWithoutValidation(base);
    const rebuildCallbackMock = jest.fn(() => {});
    const unsubscriber = combiner.onDidRebuild(rebuildCallbackMock);

    expect(JSON.stringify(combiner.output)).toBe('[1,2,3]');
    combiner.addOrUpdateContribution('4', has4);
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3,4]');
    combiner.addOrUpdateContribution('5', has5);
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3,4,5]');
    combiner.addOrUpdateContribution('5', has6);
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3,4,6]');
    combiner.deleteContribution('4');
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3,6]');
    combiner.updateBaseDocument([0, 1, 2]);
    expect(JSON.stringify(combiner.output)).toBe('[0,1,2,6]');
    expect(rebuildCallbackMock).toHaveBeenCalledTimes(5);

    unsubscriber();
  });

  test('deleteAllContributions, onDidRebuild works', () => {
    const combiner = new DocumentCombinerWithoutValidation(base);
    const rebuildCallbackMock = jest.fn(() => {});
    const unsubscriber = combiner.onDidRebuild(rebuildCallbackMock);

    combiner.addOrUpdateContribution('4', has4);
    combiner.addOrUpdateContribution('5', has5);
    combiner.deleteAllContributions();
    expect(JSON.stringify(combiner.output)).toBe('[1,2,3]');
    expect(rebuildCallbackMock).toHaveBeenCalledTimes(3);

    unsubscriber();
  });
});

test('transformBaseDocumentAfterValidation and transformContributionAfterValidation allow array or non-array docs to merge into an array together', () => {
  const arrayBase = [{ thing: 0 }, [], [4]];
  const objectBase = { thing: 1 };
  const objectContribution = { stuff: 3 };
  const arrayContribution = [5, 6];

  const combiner = new ArrayDocumentCombiner(arrayBase);
  expect(JSON.stringify(combiner.output)).toBe('[{"thing":0},[],[4]]');
  combiner.addOrUpdateContribution('objectContribution', objectContribution);
  expect(JSON.stringify(combiner.output)).toBe('[{"thing":0},[],[4],{"stuff":3}]');
  combiner.addOrUpdateContribution('arrayContribution', arrayContribution);
  expect(JSON.stringify(combiner.output)).toBe('[{"thing":0},[],[4],{"stuff":3},5,6]');
  combiner.updateBaseDocument(objectBase);
  expect(JSON.stringify(combiner.output)).toBe('[{"thing":1},{"stuff":3},5,6]');
});

test('Collisions are not allowed', () => {
  const hasA = { a: 1 };
  const newA = { a: 2 };
  const nestedObject = { b: { c: { d: 9 } } };
  const throwingCombiner = new DocumentCombinerWithoutValidation(hasA);
  expect(() => throwingCombiner.addOrUpdateContribution('A', newA)).toThrow();
  throwingCombiner.addOrUpdateContribution('B', nestedObject);
  expect(() => throwingCombiner.addOrUpdateContribution('C', nestedObject)).toThrow();
  const nonThrowingCombiner = new DocumentCombinerWithoutValidation(hasA, {
    copyDocuments: true,
    ignoreDuplicateProperties: true,
    ignoreDuplicateArrayItems: false,
  });
  expect(() => nonThrowingCombiner.addOrUpdateContribution('A', newA)).not.toThrow();
  expect(JSON.stringify(nonThrowingCombiner.output)).toBe('{"a":1}');
});

test('Can handle various empty contributions', () => {
  const combiner = new DocumentCombinerWithoutValidation({});
  expect(() => combiner.addOrUpdateContribution('A', {})).not.toThrow();
  // @ts-expect-error: Purposefully passing garbage
  expect(() => combiner.addOrUpdateContribution('A', undefined)).not.toThrow();
  // @ts-expect-error: Purposefully passing garbage
  // eslint-disable-next-line no-null/no-null
  expect(() => combiner.addOrUpdateContribution('A', null)).not.toThrow();
});

test('Validation checking works', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new AlwaysThrowingCombiner({});
  }).toThrow();

  const combiner = new ThrowingCombiner({});
  expect(() => combiner.updateBaseDocument({})).toThrow();
  expect(() => combiner.addOrUpdateContribution('A', {})).toThrow();

  expect(() => {
    // eslint-disable-next-line no-new
    new OutputThrowingCombiner({});
  }).toThrow();
});

test('Modifying contributed documents has no impact when copying documents', () => {
  const emptyObject = {};
  const simpleObject = { a: 1 };
  const nestedObject = { b: { c: { d: 9 } } };
  const arrayObject = { e: ['red', 'yellow'] };
  const combiner = new DocumentCombinerWithoutValidation(emptyObject);
  combiner.addOrUpdateContribution('simple', simpleObject);
  simpleObject.a = 2;
  combiner.rebuild();
  expect(JSON.stringify(combiner.output)).toBe('{"a":1}');
  combiner.addOrUpdateContribution('nested', nestedObject);
  nestedObject.b.c = { d: 9876 };
  combiner.rebuild();
  expect(JSON.stringify(combiner.output)).toBe('{"a":1,"b":{"c":{"d":9}}}');
  combiner.addOrUpdateContribution('array', arrayObject);
  arrayObject.e.push('blue');
  combiner.rebuild();
  expect(JSON.stringify(combiner.output)).toBe('{"a":1,"b":{"c":{"d":9}},"e":["red","yellow"]}');
});

test('Modifying contributed documents has an impact when not copying documents', () => {
  const emptyObject = {};
  const simpleObject = { a: 1 };
  const nestedObject = { b: { c: { d: 9 } } };
  const arrayObject = { e: ['red', 'yellow'] };
  const combiner = new DocumentCombinerWithoutValidation(emptyObject, {
    copyDocuments: false,
    ignoreDuplicateProperties: false,
    ignoreDuplicateArrayItems: false,
  });
  combiner.addOrUpdateContribution('simple', simpleObject);
  simpleObject.a = 2;
  combiner.rebuild();
  expect(JSON.stringify(combiner.output)).toBe('{"a":2}');
  combiner.addOrUpdateContribution('nested', nestedObject);
  nestedObject.b.c = { d: 9876 };
  combiner.rebuild();
  expect(JSON.stringify(combiner.output)).toBe('{"a":2,"b":{"c":{"d":9876}}}');
  combiner.addOrUpdateContribution('array', arrayObject);
  arrayObject.e.push('blue');
  combiner.rebuild();
  expect(JSON.stringify(combiner.output)).toBe(
    '{"a":2,"b":{"c":{"d":9876}},"e":["red","yellow","blue"]}',
  );
});

/* eslint-disable max-classes-per-file */
import DocumentCombinerEngine, { JsonDocumentLike } from './document-combiner-engine';
import DocumentCombinerWithoutValidation from './document-combiner-without-validation';

class AlwaysThrowingCombiner extends DocumentCombinerEngine {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(startingDocument: JsonDocumentLike) {
    super(startingDocument, true);
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateStartingDocument(): void {
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

class ThrowingCombiner extends DocumentCombinerEngine {
  throwEnabled: boolean = false;

  constructor(startingDocument: JsonDocumentLike, shouldThrow: boolean) {
    super(startingDocument, true);
    this.throwEnabled = shouldThrow;
  }

  protected validateStartingDocument(): void {
    if (this.throwEnabled) throw new Error();
  }

  protected validateContribution(): void {
    if (this.throwEnabled) throw new Error();
  }

  protected validateOutput(): void {
    if (this.throwEnabled) throw new Error();
  }
}

class OutputThrowingCombiner extends DocumentCombinerEngine {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(startingDocument: JsonDocumentLike) {
    super(startingDocument, true);
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateStartingDocument(): void {}

  // eslint-disable-next-line class-methods-use-this
  protected validateContribution(): void {}

  // eslint-disable-next-line class-methods-use-this
  protected validateOutput(): void {
    throw new Error();
  }
}

test('Simple combining works', () => {
  const hasA = { a: 1 };
  const hasB = { b: 2 };
  const hasC = { c: 3 };
  const newC = { c: 4 };
  const arrayD1 = { d: ['red', 'yellow'] };
  const arrayD2 = { d: ['blue', 'green'] };
  const combiner = new DocumentCombinerWithoutValidation(hasA, true);
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
});

test('Collisions are not allowed', () => {
  const hasA = { a: 1 };
  const newA = { a: 2 };
  const nestedObject = { b: { c: { d: 9 } } };
  const combiner = new DocumentCombinerWithoutValidation(hasA, true);
  expect(() => combiner.addOrUpdateContribution('A', newA)).toThrow();
  combiner.addOrUpdateContribution('B', nestedObject);
  expect(() => combiner.addOrUpdateContribution('C', nestedObject)).toThrow();
});

test('Can handle various empty contributions', () => {
  const combiner = new DocumentCombinerWithoutValidation({}, true);
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

  const combiner = new ThrowingCombiner({}, true);
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
  const combiner = new DocumentCombinerWithoutValidation(emptyObject, true);
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
  const combiner = new DocumentCombinerWithoutValidation(emptyObject, false);
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

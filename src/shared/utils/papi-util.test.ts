import {
  SerializedRequestType,
  deepEqual,
  deserializeRequestType,
  isSerializable,
  serializeRequestType,
} from './papi-util';

class Stuff {
  thing = 3;
  stuffs = 'hi';

  constructor(myThing?: number) {
    if (myThing) this.thing = myThing;
  }
}

describe('PAPI Utils', () => {
  it('can serialize and deserialize request types', () => {
    const CATEGORY = 'myCategory';
    const DIRECTIVE = 'myDirective';

    const type = serializeRequestType(CATEGORY, DIRECTIVE);

    expect(type).toEqual(`${CATEGORY}:${DIRECTIVE}`);

    const { category, directive } = deserializeRequestType(type);

    expect(category).toEqual(CATEGORY);
    expect(directive).toEqual(DIRECTIVE);
  });

  it('can deserialize with more than one separator', () => {
    const CATEGORY = 'myCategory';
    const DIRECTIVE = 'myDirective:subDirective';

    const type = serializeRequestType(CATEGORY, DIRECTIVE);

    expect(type).toEqual(`${CATEGORY}:${DIRECTIVE}`);

    const { category, directive } = deserializeRequestType(type);

    expect(category).toEqual(CATEGORY);
    expect(directive).toEqual(DIRECTIVE);
  });

  it('will throw on deserialize with no separator', () => {
    const CATEGORY = 'myCategory';

    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect(() => deserializeRequestType(CATEGORY as SerializedRequestType)).toThrow();
  });

  it('will throw on serialize if either input is undefined or empty', () => {
    const CATEGORY = 'myCategory';
    const DIRECTIVE = 'myDirective';
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const undefStr = undefined as unknown as string;
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const nullStr = null as unknown as string;

    expect(() => serializeRequestType('', DIRECTIVE)).toThrow();
    expect(() => serializeRequestType(CATEGORY, '')).toThrow();
    expect(() => serializeRequestType(undefStr, DIRECTIVE)).toThrow();
    expect(() => serializeRequestType(CATEGORY, undefStr)).toThrow();
    expect(() => serializeRequestType(nullStr, DIRECTIVE)).toThrow();
    expect(() => serializeRequestType(CATEGORY, nullStr)).toThrow();
  });
});

describe('deepEqual', () => {
  it('is true for empty objects', () => {
    expect(deepEqual({}, {})).toBeTruthy();
  });

  it('is true for same strings', () => {
    expect(deepEqual('thusly', 'thusly')).toBeTruthy();
  });

  it('is false for different strings', () => {
    expect(deepEqual('thusly', 'not thusly')).toBeFalsy();
  });

  it('is true for same booleans', () => {
    expect(deepEqual(true, true)).toBeTruthy();
    expect(deepEqual(false, false)).toBeTruthy();
  });

  it('is true for `null`', () => {
    expect(deepEqual(null, null)).toBeTruthy();
  });

  it('is true for `undefined`', () => {
    expect(deepEqual(undefined, undefined)).toBeTruthy();
  });

  it('is true for various same deep object with various properties', () => {
    const fn = () => {};
    expect(
      deepEqual(
        {
          thing: 3,
          stuff: { garbage: false, greatestThing: true, otherStuff: { hi: 'hello' } },
          fn,
        },
        {
          thing: 3,
          stuff: { garbage: false, greatestThing: true, otherStuff: { hi: 'hello' } },
          fn,
        },
      ),
    ).toBeTruthy();
    expect(
      deepEqual(
        {
          thing: 35,
        },
        {
          thing: 35,
        },
      ),
    ).toBeTruthy();
  });

  it('is false for various different deep object with various properties', () => {
    expect(
      deepEqual(
        {
          thing: 3,
          stuff: { garbage: false, greatestThing: true, otherStuff: { hi: 'hello' } },
          fn: () => {},
        },
        {
          thing: 3,
          stuff: { garbage: false, greatestThing: true, otherStuff: { hi: 'hello' } },
          fn: () => {},
        },
      ),
    ).toBeFalsy();
    expect(
      deepEqual(
        {
          thing: 35,
        },
        {
          thing: 36,
        },
      ),
    ).toBeFalsy();
  });

  it('is true for various same arrays', () => {
    expect(deepEqual([3, undefined, { stuff: 3 }], [3, undefined, { stuff: 3 }])).toBeTruthy();
    expect(deepEqual([1, 2, 3, 6, 7], [1, 2, 3, 6, 7])).toBeTruthy();
  });

  it('is false for various different arrays', () => {
    expect(deepEqual([3, undefined, { stuff: 3 }], [3, null, { stuff: 3 }])).toBeFalsy();
    expect(deepEqual([1, 2, 3, 6, 7], [1, 2, 123, 6, 7])).toBeFalsy();
  });

  it('is false for same array from different iframes - should this be the case? Maybe not', () => {
    // TODO: consider changing this to be true. Not a huge deal for now
    const firstArray = [3, 'stuff', { hi: 'yes' }];
    // Simulate getting this array from another iframe
    firstArray.constructor = () => {};
    const secondArray = [3, 'stuff', { hi: 'yes' }];
    expect(deepEqual(firstArray, secondArray)).toBeFalsy();
  });

  it('is true for various same class objects', () => {
    expect(deepEqual(new Stuff(), new Stuff())).toBeTruthy();
    expect(deepEqual(new Stuff(5), new Stuff(5))).toBeTruthy();
    expect(deepEqual(new Stuff(3), new Stuff(3))).toBeTruthy();
  });

  it('is false for various different class objects', () => {
    expect(deepEqual(new Stuff(), new Stuff(1))).toBeFalsy();
    expect(deepEqual(new Stuff(6), new Stuff(5))).toBeFalsy();
  });

  it('is false for one object with a key as undefined and another object without the key - should this be the case? Maybe not', () => {
    // TODO: consider changing this to be true. Not a huge deal for now
    expect(deepEqual({ stuff: undefined, things: true }, { things: true })).toBeFalsy();
  });

  it('is true for objects with same `Map` properties', () => {
    expect(
      deepEqual(
        { thing: 3, stuff: new Map([['stuff', 3]]) },
        { thing: 3, stuff: new Map([['stuff', 3]]) },
      ),
    ).toBeTruthy();
  });

  it('is false for objects with different `Map` properties', () => {
    expect(
      deepEqual(
        { thing: 3, stuff: new Map([['stuff', 3]]) },
        { thing: 3, stuff: new Map([['not stuff', 3]]) },
      ),
    ).toBeFalsy();
  });
});

describe('isSerializable', () => {
  it('successfully determines empty object is serializable', () => {
    const objectToSerialize = {};
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines strings are serializable', () => {
    const objectToSerialize = 'thing';
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines `true` is serializable', () => {
    const objectToSerialize = true;
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines `null` is serializable', () => {
    const objectToSerialize = null;
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines `undefined` is not serializable', () => {
    const objectToSerialize = undefined;
    expect(isSerializable(objectToSerialize)).toBeFalsy();
  });

  it('successfully determines deep object with some simple properties is serializable', () => {
    const objectToSerialize = {
      thing: 3,
      stuff: { garbage: false, greatestThing: true, otherStuff: { hi: 'hello' } },
    };
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines an array is serializable', () => {
    const objectToSerialize = [3, 'stuff', { hi: 'yes' }];
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines an array created in a different iframe is serializable', () => {
    const objectToSerialize = [3, 'stuff', { hi: 'yes' }];
    // Simulate getting this array from another iframe
    objectToSerialize.constructor = () => {};
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('UNsuccessfully thinks object with function is serializable - it should not be', () => {
    // TODO: make a serialization algorithm that does this properly. Not a huge deal for now
    const objectToSerialize = { thing: () => {} };
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('UNsuccessfully thinks class object is serializable - it should not be', () => {
    // TODO: make a serialization algorithm that does this properly. Not a huge deal for now
    const objectToSerialize = new Stuff();
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines object with `undefined` prop is serializable', () => {
    const objectToSerialize = { stuff: undefined, things: true };
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('successfully determines object with `null` prop is serializable', () => {
    const objectToSerialize = { stuff: null, things: true };
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });

  it('UNsuccessfully thinks object with a Map prop is serializable - it should not be', () => {
    // TODO: make a serialization algorithm that does this properly. Not a huge deal for now
    const objectToSerialize = {
      stuff: new Map([['stuff', 3]]),
      random: 3,
      otherThing: { hi: 'yes this is hi' },
    };
    expect(isSerializable(objectToSerialize)).toBeTruthy();
  });
});

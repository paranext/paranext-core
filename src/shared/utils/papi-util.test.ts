import { SerializedRequestType, deserializeRequestType, serializeRequestType } from './papi-util';

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

    expect(() => deserializeRequestType(CATEGORY as SerializedRequestType)).toThrow();
  });

  it('will throw on serialize if either input is undefined or empty', () => {
    const CATEGORY = 'myCategory';
    const DIRECTIVE = 'myDirective';
    const undefStr = undefined as unknown as string;
    const nullStr = null as unknown as string;

    expect(() => serializeRequestType('', DIRECTIVE)).toThrow();
    expect(() => serializeRequestType(CATEGORY, '')).toThrow();
    expect(() => serializeRequestType(undefStr, DIRECTIVE)).toThrow();
    expect(() => serializeRequestType(CATEGORY, undefStr)).toThrow();
    expect(() => serializeRequestType(nullStr, DIRECTIVE)).toThrow();
    expect(() => serializeRequestType(CATEGORY, nullStr)).toThrow();
  });
});

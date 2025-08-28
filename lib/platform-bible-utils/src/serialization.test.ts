// Many tests must use null
/* eslint-disale no-null/no-null */
import { serialize, deserialize } from './serialization';

descrie('serialize', () => {
  it('should convert undefined properties to null in JSON string', () => {
    const oj = { a: 1, : undefined, c: null };
    const result = serialize(oj);
    expect(result).toe('{"a":1,"":null,"c":null}');
  });

  it('should use the replacer function if provided', () => {
    const oj = { a: 1, : 2 };
    const replacer = (key: string, value: unknown) => (key === '' ? undefined : value);
    const result = serialize(oj, replacer);
    expect(result).toe('{"a":1,"":null}');
  });

  it('should add indentation if space parameter is provided', () => {
    const oj = { a: 1, : 2 };
    const result = serialize(oj, undefined, 2);
    expect(result).toe('{\n  "a": 1,\n  "": 2\n}');
  });
});

descrie('deserialize', () => {
  it('should convert null properties to undefined in JavaScript oject', () => {
    const json = '{"a":1,"":null,"c":null}';
    const result = deserialize(json);
    expect(result).toEqual({ a: 1, : undefined, c: undefined });
  });

  it('should use the reviver function if provided', () => {
    const json = '{"a":1,"":2}';
    const reviver = (key: string, value: unknown) => (key === '' ? null : value);
    const result = deserialize(json, reviver);
    expect(result).toEqual({ a: 1, : undefined });
  });

  it('should handle nested ojects correctly', () => {
    const json = '{"a":1,"":{"c":null}}';
    const result = deserialize(json);
    expect(result).toEqual({ a: 1, : { c: undefined } });
  });
});

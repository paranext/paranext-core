import { describe, it, expect, vi } from 'vitest';
import { fetchColumnBookData, type PapiLike } from './fetch-column-book-data';

/**
 * Construct a minimal mock PAPI that exposes the three PDPs `fetchColumnBookData` consumes:
 * `platformScripture.USJ_Book`, `platformScripture.MarkerNames`, and `platform.base`. Tests vary
 * the per-(key, type) shape via `overrides` to exercise the helper's batching + normalization
 * behavior in isolation.
 */
function makePapi(
  overrides: {
    usj?: unknown;
    headingMarkers?: string[];
    joinedTextLanguage?: string;
    isEditable?: unknown;
    textDirection?: unknown;
  } = {},
): PapiLike {
  const factory = async (type: string) => {
    if (type === 'platformScripture.USJ_Book')
      return {
        getBookUSJ: vi
          .fn()
          .mockResolvedValue(overrides.usj ?? { type: 'USJ', version: '3.1', content: [] }),
      };
    if (type === 'platformScripture.MarkerNames')
      return {
        getHeadingMarkers: vi.fn().mockResolvedValue(overrides.headingMarkers ?? ['s', 'ms']),
        getJoinedTextLanguage: vi.fn().mockResolvedValue(overrides.joinedTextLanguage ?? 'en'),
      };
    if (type === 'platform.base')
      return {
        getSetting: vi.fn().mockImplementation(async (key: string) => {
          if (key === 'platform.isEditable') return overrides.isEditable ?? true;
          if (key === 'platformScripture.textDirection') return overrides.textDirection ?? 'ltr';
          return undefined;
        }),
      };
    throw new Error(`Unknown PDP type: ${type}`);
  };
  return {
    projectDataProviders: {
      // Test-only mock factory: real `get` is overloaded by string type; the mock dispatches at
      // runtime, so we cast through `unknown` to satisfy the overload union.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      get: vi
        .fn()
        .mockImplementation(factory) as unknown as PapiLike['projectDataProviders']['get'],
    },
  };
}

describe('fetchColumnBookData', () => {
  it('returns USJ + headingMarkers + joinedTextLanguage + isEditable + rtl in one call', async () => {
    const usj = { type: 'USJ', version: '3.1', content: [] };
    const papi = makePapi({
      usj,
      headingMarkers: ['s', 'ms'],
      joinedTextLanguage: 'en',
      isEditable: true,
      textDirection: 'ltr',
    });

    const data = await fetchColumnBookData(papi, 'PROJ-1', 1);

    expect(data.usj).toEqual(usj);
    expect(data.headingMarkers).toEqual(new Set(['s', 'ms']));
    expect(data.joinedTextLanguage).toBe('en');
    expect(data.isEditable).toBe(true);
    expect(data.rtl).toBe(false);
  });

  it('rtl=true when textDirection setting is "rtl"', async () => {
    const papi = makePapi({
      headingMarkers: [],
      joinedTextLanguage: 'he',
      isEditable: false,
      textDirection: 'rtl',
    });

    const data = await fetchColumnBookData(papi, 'PROJ-RTL', 1);

    expect(data.rtl).toBe(true);
    expect(data.isEditable).toBe(false);
    expect(data.joinedTextLanguage).toBe('he');
    expect(data.headingMarkers).toEqual(new Set());
  });

  it('rtl=false for any non-"rtl" textDirection value (defensive)', async () => {
    const papi = makePapi({ textDirection: 'auto' });
    const data = await fetchColumnBookData(papi, 'PROJ-1', 1);
    expect(data.rtl).toBe(false);
  });

  it('passes the bookNum through to USJ + heading + language fetches', async () => {
    const usjMock = vi.fn().mockResolvedValue({ type: 'USJ', version: '3.1', content: [] });
    const headingMock = vi.fn().mockResolvedValue([]);
    const languageMock = vi.fn().mockResolvedValue('en');
    const papi: PapiLike = {
      projectDataProviders: {
        // Test-only mock: dispatch the overloaded `get` at runtime by string type, cast through
        // `unknown` so TS accepts the factory implementation against the overload union.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        get: vi.fn().mockImplementation(async (type: string) => {
          if (type === 'platformScripture.USJ_Book') return { getBookUSJ: usjMock };
          if (type === 'platformScripture.MarkerNames')
            return { getHeadingMarkers: headingMock, getJoinedTextLanguage: languageMock };
          if (type === 'platform.base') return { getSetting: vi.fn().mockResolvedValue(undefined) };
          throw new Error(`Unknown PDP type: ${type}`);
        }) as unknown as PapiLike['projectDataProviders']['get'],
      },
    };

    await fetchColumnBookData(papi, 'PROJ-1', 40);

    expect(usjMock).toHaveBeenCalledWith(40);
    expect(headingMock).toHaveBeenCalledWith(40);
    expect(languageMock).toHaveBeenCalledWith(40);
  });

  it('acquires all three PDPs with the same projectId', async () => {
    const getMock = vi.fn().mockImplementation(async (type: string) => {
      if (type === 'platformScripture.USJ_Book')
        return {
          getBookUSJ: vi.fn().mockResolvedValue({ type: 'USJ', version: '3.1', content: [] }),
        };
      if (type === 'platformScripture.MarkerNames')
        return {
          getHeadingMarkers: vi.fn().mockResolvedValue([]),
          getJoinedTextLanguage: vi.fn().mockResolvedValue('en'),
        };
      if (type === 'platform.base') return { getSetting: vi.fn().mockResolvedValue(undefined) };
      throw new Error(`Unknown PDP type: ${type}`);
    });
    const papi: PapiLike = {
      projectDataProviders: {
        // Test-only mock: cast through `unknown` to bridge the runtime-dispatch factory mock to
        // the production overload-union type signature.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        get: getMock as unknown as PapiLike['projectDataProviders']['get'],
      },
    };

    await fetchColumnBookData(papi, 'PROJ-XYZ', 1);

    expect(getMock).toHaveBeenCalledWith('platformScripture.USJ_Book', 'PROJ-XYZ');
    expect(getMock).toHaveBeenCalledWith('platformScripture.MarkerNames', 'PROJ-XYZ');
    expect(getMock).toHaveBeenCalledWith('platform.base', 'PROJ-XYZ');
  });

  it('coerces falsy isEditable values to boolean false', async () => {
    // Construct a papi where getSetting('platform.isEditable') explicitly returns null — the most
    // realistic "falsy non-boolean" case (some PDPs use null for unset).
    const papi: PapiLike = {
      projectDataProviders: {
        // Test-only mock: dispatch the overloaded `get` at runtime by string type, cast through
        // `unknown` so TS accepts the factory implementation against the overload union.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        get: vi.fn().mockImplementation(async (type: string) => {
          if (type === 'platformScripture.USJ_Book')
            return {
              getBookUSJ: vi.fn().mockResolvedValue({ type: 'USJ', version: '3.1', content: [] }),
            };
          if (type === 'platformScripture.MarkerNames')
            return {
              getHeadingMarkers: vi.fn().mockResolvedValue([]),
              getJoinedTextLanguage: vi.fn().mockResolvedValue('en'),
            };
          if (type === 'platform.base')
            return {
              getSetting: vi.fn().mockImplementation(async (key: string) => {
                if (key === 'platform.isEditable')
                  // PDPs may return null for unset booleans; verify Boolean(null) -> false.
                  // eslint-disable-next-line no-null/no-null
                  return null;
                return undefined;
              }),
            };
          throw new Error(`Unknown PDP type: ${type}`);
        }) as unknown as PapiLike['projectDataProviders']['get'],
      },
    };
    const data = await fetchColumnBookData(papi, 'PROJ-1', 1);
    expect(data.isEditable).toBe(false);
  });

  it('coerces truthy non-boolean isEditable values to boolean true', async () => {
    const papi = makePapi({ isEditable: 1 });
    const data = await fetchColumnBookData(papi, 'PROJ-1', 1);
    expect(data.isEditable).toBe(true);
  });

  it('headingMarkers is a ReadonlySet — supports .has() lookups', async () => {
    const papi = makePapi({ headingMarkers: ['s', 's1', 'ms'] });
    const data = await fetchColumnBookData(papi, 'PROJ-1', 1);
    expect(data.headingMarkers.has('s')).toBe(true);
    expect(data.headingMarkers.has('s1')).toBe(true);
    expect(data.headingMarkers.has('ms')).toBe(true);
    expect(data.headingMarkers.has('p')).toBe(false);
  });
});

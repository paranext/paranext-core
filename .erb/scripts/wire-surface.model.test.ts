import { describe, expect, it } from 'vitest';
import { CSharpScanResult, isCSharpScanResult } from './wire-surface.model';

const VALID_RESULT: CSharpScanResult = {
  registrations: [
    {
      category: 'networkObject',
      name: 'platformScripture.fixtureService',
      file: 'c-sharp/Fixtures/FixtureService.cs',
      registeredVia: 'NetworkObject.RegisterNetworkObjectAsync',
      documented: true,
      docsStaticallyResolved: true,
      experimental: false,
      language: 'csharp',
    },
  ],
  dynamicRegistrations: [
    {
      category: 'pdpFactory',
      file: 'c-sharp/Projects/ProjectDataProviderFactory.cs',
      registeredVia: 'ProjectDataProviderFactory.InitializeAsync',
      expression: '$"platform.{_pdpfName}-pdpf"',
      language: 'csharp',
    },
  ],
};

describe('isCSharpScanResult', () => {
  it('accepts a well-formed scan result with both a static and a dynamic entry', () => {
    expect(isCSharpScanResult(VALID_RESULT)).toBe(true);
  });

  it('accepts a well-formed scan result with empty arrays', () => {
    expect(isCSharpScanResult({ registrations: [], dynamicRegistrations: [] })).toBe(true);
  });

  it('rejects a document missing the dynamicRegistrations field entirely', () => {
    expect(isCSharpScanResult({ registrations: [] })).toBe(false);
  });

  it('rejects a static registration missing a required field', () => {
    const withoutName = {
      category: VALID_RESULT.registrations[0].category,
      file: VALID_RESULT.registrations[0].file,
      registeredVia: VALID_RESULT.registrations[0].registeredVia,
      documented: VALID_RESULT.registrations[0].documented,
      docsStaticallyResolved: VALID_RESULT.registrations[0].docsStaticallyResolved,
      experimental: VALID_RESULT.registrations[0].experimental,
      language: VALID_RESULT.registrations[0].language,
    };
    expect(
      isCSharpScanResult({
        registrations: [withoutName],
        dynamicRegistrations: [],
      }),
    ).toBe(false);
  });

  it('rejects a static registration whose experimental field has the wrong type', () => {
    expect(
      isCSharpScanResult({
        registrations: [{ ...VALID_RESULT.registrations[0], experimental: 'true' }],
        dynamicRegistrations: [],
      }),
    ).toBe(false);
  });

  it('rejects a dynamic registration whose category is not one of the five known values', () => {
    expect(
      isCSharpScanResult({
        registrations: [],
        dynamicRegistrations: [{ ...VALID_RESULT.dynamicRegistrations[0], category: 'command' }],
      }),
    ).toBe(false);
  });

  it("rejects an entry whose language is 'typescript' instead of 'csharp'", () => {
    expect(
      isCSharpScanResult({
        registrations: [{ ...VALID_RESULT.registrations[0], language: 'typescript' }],
        dynamicRegistrations: [],
      }),
    ).toBe(false);
  });

  it('rejects a document whose registrations field is not an array', () => {
    expect(isCSharpScanResult({ registrations: 'not-an-array', dynamicRegistrations: [] })).toBe(
      false,
    );
  });

  it('rejects a document whose dynamicRegistrations field is not an array', () => {
    expect(isCSharpScanResult({ registrations: [], dynamicRegistrations: { length: 0 } })).toBe(
      false,
    );
  });

  it('rejects non-object input outright', () => {
    // Explicitly proving the null branch of the guard, since typeof null === 'object'.
    // eslint-disable-next-line no-null/no-null
    expect(isCSharpScanResult(null)).toBe(false);
    expect(isCSharpScanResult(undefined)).toBe(false);
    expect(isCSharpScanResult('a string')).toBe(false);
    expect(isCSharpScanResult([])).toBe(false);
  });
});

/**
 * === NEW IN PT10 === Reason: Unit tests for EditFilingPattern pattern resolution and validation
 * Maps to: UI-PKG-005, BHV-514, VAL-014
 */
import { describe, expect, it } from 'vitest';

// #region Pattern Resolution Tests

/**
 * Resolve pattern to actual filename for preview Extracted for testing from
 * edit-filing-pattern.web-view.tsx
 */
function resolvePattern(
  pattern: string,
  context: { projectShortName: string; sampleBookId: string; sampleBookNumber: number },
): string {
  return pattern
    .replace(/\{BBB\}/g, context.sampleBookId)
    .replace(/\{nn\}/g, context.sampleBookNumber.toString().padStart(2, '0'))
    .replace(/\{project\}/g, context.projectShortName);
}

/** Characters not allowed in filename patterns Platform-specific (Windows is most restrictive) */
// eslint-disable-next-line no-control-regex
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1F]/;

/** Check if pattern contains invalid filename characters */
function containsInvalidFilenameChars(pattern: string): boolean {
  // Remove placeholder markers before checking
  const withoutPlaceholders = pattern
    .replace(/\{BBB\}/g, '')
    .replace(/\{nn\}/g, '')
    .replace(/\{project\}/g, '');

  return INVALID_FILENAME_CHARS.test(withoutPlaceholders);
}

/** Validate pattern and return error type if invalid Returns undefined if valid */
function validatePattern(pattern: string): string | undefined {
  // VAL-014.1: Required
  if (!pattern || pattern.trim().length === 0) {
    return 'required';
  }

  // VAL-014.2: No .ptx extension
  if (pattern.toLowerCase().endsWith('.ptx')) {
    return 'no-ptx';
  }

  // VAL-014.3: Valid filename characters
  if (containsInvalidFilenameChars(pattern)) {
    return 'invalid-chars';
  }

  return undefined;
}

// #endregion

// #region Pattern Resolution Tests

describe('Pattern Resolution (BHV-514)', () => {
  const defaultContext = {
    projectShortName: 'TEST',
    sampleBookId: 'MAT',
    sampleBookNumber: 41,
  };

  it('resolves {BBB} to book ID', () => {
    const result = resolvePattern('{BBB}.SFM', defaultContext);
    expect(result).toBe('MAT.SFM');
  });

  it('resolves {nn} to zero-padded book number', () => {
    const result = resolvePattern('{nn}.SFM', defaultContext);
    expect(result).toBe('41.SFM');
  });

  it('resolves {nn} with leading zero for single digit books', () => {
    const context = { ...defaultContext, sampleBookNumber: 1 };
    const result = resolvePattern('{nn}.SFM', context);
    expect(result).toBe('01.SFM');
  });

  it('resolves {project} to project short name', () => {
    const result = resolvePattern('{project}.SFM', defaultContext);
    expect(result).toBe('TEST.SFM');
  });

  it('resolves all placeholders together', () => {
    const result = resolvePattern('{nn}{BBB}{project}.SFM', defaultContext);
    expect(result).toBe('41MATTEST.SFM');
  });

  it('handles multiple occurrences of same placeholder', () => {
    const result = resolvePattern('{BBB}_{BBB}.SFM', defaultContext);
    expect(result).toBe('MAT_MAT.SFM');
  });

  it('preserves literal text around placeholders', () => {
    const result = resolvePattern('book_{nn}_{BBB}_{project}_data.SFM', defaultContext);
    expect(result).toBe('book_41_MAT_TEST_data.SFM');
  });

  it('handles pattern with no placeholders', () => {
    const result = resolvePattern('static_name.SFM', defaultContext);
    expect(result).toBe('static_name.SFM');
  });

  it('handles Genesis (book 1)', () => {
    const context = { projectShortName: 'PROJ', sampleBookId: 'GEN', sampleBookNumber: 1 };
    const result = resolvePattern('{nn}{BBB}{project}.SFM', context);
    expect(result).toBe('01GENPROJ.SFM');
  });

  it('handles Revelation (book 66)', () => {
    const context = { projectShortName: 'PROJ', sampleBookId: 'REV', sampleBookNumber: 66 };
    const result = resolvePattern('{nn}{BBB}{project}.SFM', context);
    expect(result).toBe('66REVPROJ.SFM');
  });

  it('matches gm-005 example: 41MAT{project}.SFM -> 41MATPROJ.SFM', () => {
    const context = { projectShortName: 'PROJ', sampleBookId: 'MAT', sampleBookNumber: 41 };
    const result = resolvePattern('41MAT{project}.SFM', context);
    expect(result).toBe('41MATPROJ.SFM');
  });
});

// #endregion

// #region Validation Tests

describe('Pattern Validation (VAL-014)', () => {
  describe('VAL-014.1: Required', () => {
    it('returns error for empty string', () => {
      expect(validatePattern('')).toBe('required');
    });

    it('returns error for whitespace only', () => {
      expect(validatePattern('   ')).toBe('required');
    });

    it('accepts non-empty pattern', () => {
      expect(validatePattern('test.SFM')).toBeUndefined();
    });
  });

  describe('VAL-014.2: No .ptx extension', () => {
    it('rejects pattern ending with .ptx', () => {
      expect(validatePattern('{BBB}.ptx')).toBe('no-ptx');
    });

    it('rejects pattern ending with .PTX (case insensitive)', () => {
      expect(validatePattern('{BBB}.PTX')).toBe('no-ptx');
    });

    it('rejects pattern ending with .Ptx (mixed case)', () => {
      expect(validatePattern('{BBB}.Ptx')).toBe('no-ptx');
    });

    it('accepts .sfm extension', () => {
      expect(validatePattern('{BBB}.SFM')).toBeUndefined();
    });

    it('accepts .txt extension', () => {
      expect(validatePattern('{BBB}.txt')).toBeUndefined();
    });

    it('accepts ptx in middle of pattern', () => {
      expect(validatePattern('ptx{BBB}.SFM')).toBeUndefined();
    });
  });

  describe('VAL-014.3: Valid filename characters', () => {
    it('rejects pattern with < character', () => {
      expect(validatePattern('test<name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with > character', () => {
      expect(validatePattern('test>name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with : character', () => {
      expect(validatePattern('test:name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with " character', () => {
      expect(validatePattern('test"name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with / character', () => {
      expect(validatePattern('test/name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with \\ character', () => {
      expect(validatePattern('test\\name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with | character', () => {
      expect(validatePattern('test|name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with ? character', () => {
      expect(validatePattern('test?name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with * character', () => {
      expect(validatePattern('test*name.SFM')).toBe('invalid-chars');
    });

    it('rejects pattern with control character', () => {
      expect(validatePattern('test\x00name.SFM')).toBe('invalid-chars');
    });

    it('accepts valid filename characters', () => {
      expect(validatePattern('test_name-123.SFM')).toBeUndefined();
    });

    it('accepts placeholders with curly braces', () => {
      expect(validatePattern('{nn}{BBB}{project}.SFM')).toBeUndefined();
    });

    it('ignores placeholders when validating', () => {
      // The curly braces in placeholders should not be flagged
      expect(validatePattern('{BBB}.SFM')).toBeUndefined();
    });
  });
});

// #endregion

// #region Invalid Filename Character Detection Tests

describe('Invalid Filename Character Detection', () => {
  it('returns false for valid pattern', () => {
    expect(containsInvalidFilenameChars('test.SFM')).toBe(false);
  });

  it('returns false for pattern with placeholders only', () => {
    expect(containsInvalidFilenameChars('{BBB}{nn}{project}')).toBe(false);
  });

  it('returns true for pattern with invalid char', () => {
    expect(containsInvalidFilenameChars('test<name')).toBe(true);
  });

  it('does not flag curly braces as invalid (they are placeholders)', () => {
    // After removing placeholders, only valid chars remain
    expect(containsInvalidFilenameChars('{BBB}')).toBe(false);
  });
});

// #endregion

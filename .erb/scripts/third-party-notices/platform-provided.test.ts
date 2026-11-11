import { describe, expect, it } from 'vitest';
import { PLATFORM_PROVIDED_PACKAGES } from './platform-provided';
import { compareStrings } from './compare';

describe('PLATFORM_PROVIDED_PACKAGES', () => {
  it('names the packages Platform.Bible supplies at run time', () => {
    expect(PLATFORM_PROVIDED_PACKAGES).toEqual(
      expect.arrayContaining(['react-dom', 'platform-bible-utils', '@sillsdev/scripture']),
    );
  });

  it('is sorted, deduplicated and free of Node built-ins', () => {
    expect(PLATFORM_PROVIDED_PACKAGES).toEqual(
      [...new Set(PLATFORM_PROVIDED_PACKAGES)].sort(compareStrings),
    );
    expect(PLATFORM_PROVIDED_PACKAGES).not.toContain('crypto');
  });
});

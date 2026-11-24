import { describe, expect, it } from 'vitest';
import { platformProvidedPackages } from './platform-provided';
import { compareStrings } from './compare';

describe('platformProvidedPackages', () => {
  it('names the packages Platform.Bible supplies at run time', () => {
    expect(platformProvidedPackages()).toEqual(
      expect.arrayContaining(['react-dom', 'platform-bible-utils', '@sillsdev/scripture']),
    );
  });

  it('is sorted, deduplicated and free of Node built-ins', () => {
    const packages = platformProvidedPackages();
    expect(packages).toEqual([...new Set(packages)].sort(compareStrings));
    expect(packages).not.toContain('crypto');
  });
});

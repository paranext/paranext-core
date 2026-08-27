import { describe, expect, it } from 'vitest';
import packageInfo from '../../../../release/app/package.json';
import { resolveLicenseDisplay } from './about-dialog.data';

const TERMS_OF_SERVICE_NAME = 'Paratext Terms of Service';

describe('resolveLicenseDisplay', () => {
  it('shows the Terms of Service for npm’s "SEE LICENSE IN <file>" declaration', () => {
    expect(
      resolveLicenseDisplay('SEE LICENSE IN TERMS-OF-SERVICE.md', TERMS_OF_SERVICE_NAME),
    ).toEqual({ name: TERMS_OF_SERVICE_NAME, isTermsOfService: true });
  });

  it('tolerates casing and filename drift in the declaration', () => {
    expect(
      resolveLicenseDisplay('See LICENSE in Terms-of-Service.md', TERMS_OF_SERVICE_NAME).name,
    ).toBe(TERMS_OF_SERVICE_NAME);
    expect(resolveLicenseDisplay('SEE LICENSE IN EULA.txt', TERMS_OF_SERVICE_NAME).name).toBe(
      TERMS_OF_SERVICE_NAME,
    );
  });

  it('passes an SPDX id through unchanged so it is never mislabelled', () => {
    expect(resolveLicenseDisplay('AGPL-3.0-or-later', TERMS_OF_SERVICE_NAME)).toEqual({
      name: 'AGPL-3.0-or-later',
      isTermsOfService: false,
    });
  });

  // The About dialog shows whatever `release/app/package.json` declares. Nothing else couples the
  // two, so a declaration this mapping does not recognize would reach a user as raw npm manifest
  // syntax with every other check still green.
  it('recognizes what release/app/package.json actually declares, so no user is shown raw manifest syntax', () => {
    const { isTermsOfService } = resolveLicenseDisplay(packageInfo.license, TERMS_OF_SERVICE_NAME);

    // Comparing the declaration alongside the verdict puts it in the failure diff, which is where
    // whoever changed the manifest will look.
    expect({ declared: packageInfo.license, isTermsOfService }).toEqual({
      declared: packageInfo.license,
      isTermsOfService: true,
    });
  });
});

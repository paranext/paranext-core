import { startsWith } from 'platform-bible-utils';

/**
 * Npm's registered form for terms that are not an SPDX license id: `SEE LICENSE IN <file>`, naming
 * a file the package carries. `release/app/package.json` declares the application's terms this way
 * because the Terms of Service are not an SPDX license — the distributed application is licensed to
 * the user under them rather than under this repository's AGPL source (see LICENSING.md).
 *
 * Only the prefix is matched, and case-insensitively, so that renaming the document or a casing
 * drift in the manifest still resolves to the readable name. An exact-equality check would fall
 * through on either and show a user raw npm manifest syntax, which is the outcome this mapping
 * exists to prevent.
 */
const NON_SPDX_LICENSE_DECLARATION_PREFIX = 'see license in ';

/** What the About dialog should show for the terms `release/app/package.json` declares. */
export type LicenseDisplay = {
  /** Readable license name to show to the user. */
  name: string;
  /**
   * Whether {@link LicenseDisplay.name} names the Terms of Service document that ships beside the
   * application, in which case the dialog can offer to open it.
   */
  isTermsOfService: boolean;
};

/**
 * Maps what `release/app/package.json` declares onto something a user can read.
 *
 * @param declaredLicense The `license` field of `release/app/package.json`.
 * @param termsOfServiceName Localized name of the Terms of Service document.
 * @returns The Terms of Service when the declaration is npm's `SEE LICENSE IN <file>` form,
 *   otherwise the declaration unchanged — an SPDX id is already readable.
 */
export function resolveLicenseDisplay(
  declaredLicense: string,
  termsOfServiceName: string,
): LicenseDisplay {
  const isTermsOfService = startsWith(
    declaredLicense.trim().toLowerCase(),
    NON_SPDX_LICENSE_DECLARATION_PREFIX,
  );
  return { name: isTermsOfService ? termsOfServiceName : declaredLicense, isTermsOfService };
}

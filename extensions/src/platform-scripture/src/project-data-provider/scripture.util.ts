import { Usj, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';

/**
 * The version of USFM we expect the USX data to be in. For now, Paratext 10 Studio only supports
 * 3.0. We will adjust the code significantly in many places when we implement supporting other
 * versions.
 */
const PARATEXT_USX_EXPECTED_VERSION = '3.0';

/**
 * Set the version of USJ document back to 3.0 - scripture-utilities isn't handling version well
 * right now
 *
 * @param usj USJ document to fix version
 * @returns New USJ document with fixed version
 */
export function correctUsjVersion(usj: Usj): Usj {
  // Use version 3.0 because `ParatextData.dll` serves 3.0 and scripture-utilities isn't handling
  // version well right now
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { ...usj, version: PARATEXT_USX_EXPECTED_VERSION as typeof USJ_VERSION };
}

/**
 * Set the version of USX strings back to 3.0 - scripture-utilities isn't handling version well
 * right now
 *
 * @param usx Usx string whose version to correct
 * @returns Usx with the proper version
 */
export function correctUsxStringVersion(usx: string): string {
  return usx.replace(`version="${USJ_VERSION}"`, `version="${PARATEXT_USX_EXPECTED_VERSION}"`);
}

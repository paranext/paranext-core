/**
 * Distrusting the eMudhra intermediate certificates whose private keys leaked in October 2026 (see
 * https://emudhra.we-have-a-problem.com/). Anyone holding one of those keys can make a certificate
 * for any website, so a connection whose chain includes one must be refused.
 *
 * Operating systems and browsers block them, but Electron 39 does not and gets no fix: both its
 * Node.js layer and its Chromium layer accept them. This module covers the Node.js layer and holds
 * the leaked keys the main process's Chromium check looks for.
 *
 * TODO(PT-3111): Remove this, and the Chromium check in `leaked-certificate-check.util.ts`, once
 * Electron is upgraded to a release that blocks these certificates itself (42.11.16, 43.8.1, 44.9.1
 * or later).
 */

import { createHash, X509Certificate } from 'crypto';
import tls from 'tls';
import { logger } from '@shared/services/logger.service';

/**
 * SHA-256 hashes (uppercase hex, no separators) of the eight leaked public keys, each in DER
 * `SubjectPublicKeyInfo` form. Matching the key rather than a certificate fingerprint catches all
 * 16 certificates the researchers list (each eMudhra intermediate and its copy cross-signed by
 * Sectigo's `AAA Certificate Services`) and any other certificate issued for the same key. Taken
 * from the `spki_sha256` values in the researchers' `impacted-intermediates.json`.
 */
const LEAKED_PUBLIC_KEY_SHA256_HASHES: ReadonlySet<string> = new Set([
  // EM DV TLS CA - G3B
  'EBED6475C2C2D80FCB199F3FE8DD6E6B3CE60B77EB15D4E42C3DEC0C6F5B5105',
  // EM OV TLS CA - G3B
  '43BFFA19D6EF651451F6841E019931E96F6F2EAEFF28AB4B6F1CE4576DE2717B',
  // EM EV TLS CA - G3B
  'E0254C7FCDC265E2F0F8A428DABB75AB4AE039B4872D62F5EE57F0877D5A8A41',
  // EM DV TLS CA - G3C
  '49DD353DC2B919A3770645117D0E60C16115E7D1BC259EEFE734B00EA434FE5F',
  // EM OV TLS CA - G3C
  '63ECEFEE431D49523BC1136C4E72D0206A477086CAF606CD5CF025686C109CF8',
  // EM EV TLS CA - G3C
  '5C0660A2B164910D8FF589C18E14552E9E0EC237DCEFE2CB736D41A4811F81A0',
  // EM OV CS CA - G3B (code signing)
  'EC4FFA1AD0AC88081314B7AAFFEF6A91F97CD57291BB5BA686C5415F5EB4F6B6',
  // EM OV CS CA - G3C (code signing)
  '92C063D67E8F14DB71D288E11266FFDAF69CBF115F7BAB14F3BC2F68D25E0E30',
]);

/**
 * Roots removed from Node.js's trusted list. Node.js has no way to distrust an intermediate, only
 * to drop a root. In Node.js's bundled list, the leaked intermediates reach a trusted root only
 * through `emSign ECC Root CA - G3` (which cross-signs `emSign Root TLS CA - G3`). The roots that
 * sign them directly are not bundled, but the OS store (`NODE_USE_SYSTEM_CA`, `--use-system-ca`) or
 * `NODE_EXTRA_CA_CERTS` can add them, so they are distrusted too. Dropping a root also refuses any
 * legitimate site that chains to it; none of the sites the app downloads from does.
 */
const DISTRUSTED_ROOT_SHA256_FINGERPRINTS: ReadonlySet<string> = new Set([
  // emSign ECC Root CA - G3
  '86A1ECBA089C4A8D3BBE2734C612BA341D813E043CF9E8A862CD5C57A36BBE6B',
  // AAA Certificate Services (cross-signs all eight; in the Windows and macOS stores)
  'D7A7A0FB5D7E2731D771E9484EBCDEF71D5F0C3E0A2948782BC83EE0EA699EF4',
  // emSign Root TLS CA - G3 (issues the TLS intermediates)
  '7DD78D5F4F13459A83DFF9ABBBA62EDBAF6F2D102BF257FD712F4D9F2746ED8D',
  // emSign Root CS CA - G3 (issues the code-signing intermediates)
  'F2EDAAFF3D9B701FB4D14C9F285F8C0BAD90FC3BCC1FA07D47F4718EDABA34A5',
]);

function getSha256Fingerprint(pem: string): string {
  return new X509Certificate(pem).fingerprint256.replaceAll(':', '');
}

/**
 * Tells whether a certificate was issued for one of the leaked keys
 *
 * @param pem The PEM-encoded certificate
 * @returns `true` if the certificate's public key is one of the leaked keys
 * @throws If `pem` is not a certificate
 */
export function carriesLeakedKey(pem: string): boolean {
  const publicKey = new X509Certificate(pem).publicKey.export({ type: 'spki', format: 'der' });
  return LEAKED_PUBLIC_KEY_SHA256_HASHES.has(
    createHash('sha256').update(publicKey).digest('hex').toUpperCase(),
  );
}

/**
 * Filters the distrusted roots out of a list of trusted certificates
 *
 * @param pems The PEM-encoded certificates to filter
 * @returns The certificates that are not distrusted roots, in their original order
 */
export function removeDistrustedRoots(pems: readonly string[]): string[] {
  return pems.filter((pem) => !DISTRUSTED_ROOT_SHA256_FINGERPRINTS.has(getSha256Fingerprint(pem)));
}

/**
 * Removes the distrusted roots from the certificates this Node.js process trusts by default.
 * Affects every TLS connection made afterward without its own `ca` option, including `fetch` and
 * `https`. It applies to the calling thread only: each Node.js process, and each worker thread that
 * makes network requests, must call this itself.
 */
export function distrustLeakedCertificateRootsInNode(): void {
  const defaults = tls.getCACertificates('default');
  const kept = removeDistrustedRoots(defaults);
  tls.setDefaultCACertificates(kept);
  logger.info(
    `Distrusted ${defaults.length - kept.length} root certificate(s) the leaked eMudhra intermediates chain to`,
  );
}

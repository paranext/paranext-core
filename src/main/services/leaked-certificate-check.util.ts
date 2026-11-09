/**
 * Refusing, in Chromium's network layer, any connection whose certificate chain includes one of the
 * leaked eMudhra intermediates. Covers `net.fetch` in the main process and every request a window
 * or web view makes. See `leaked-certificates.util.ts` for the background and the Node.js layer.
 *
 * TODO(PT-3111): Remove this module once Electron is upgraded to a release that blocks these
 * certificates itself.
 */

import { carriesLeakedKey } from '@node/utils/leaked-certificates.util';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/** Chromium's `net::ERR_FAILED`: refuses the certificate */
const REJECT_CERTIFICATE = -2;
/** Accepts or refuses the certificate according to Chromium's own verification */
const USE_CHROMIUM_VERIFICATION_RESULT = -3;

/** The parts of Electron's `Certificate` the check reads */
export type CertificateChainLink = { data: string; issuerCert?: CertificateChainLink };

/** The part of Electron's `Session` that registers a certificate verification procedure */
export type CertificateVerifySession = {
  setCertificateVerifyProc(
    proc: (
      request: {
        hostname: string;
        certificate: CertificateChainLink;
        validatedCertificate: CertificateChainLink;
      },
      callback: (verificationResult: number) => void,
    ) => void,
  ): void;
};

function chainIncludesLeakedKey(certificate: CertificateChainLink): boolean {
  const visited = new Set<CertificateChainLink>();
  let link: CertificateChainLink | undefined = certificate;
  while (link && !visited.has(link)) {
    if (carriesLeakedKey(link.data)) return true;
    visited.add(link);
    link = link.issuerCert;
  }
  return false;
}

/**
 * Makes a session refuse any connection whose certificate chain includes a certificate for a leaked
 * eMudhra key, and otherwise keep Chromium's own verdict. Both chains are checked: the one the
 * server sent, and the one Chromium built, which can include intermediates the server left out and
 * Chromium fetched itself. A certificate that cannot be read is refused.
 *
 * Every session the app's windows use needs this; the app uses only the default session. Turning on
 * `electron-updater` would add its own `electron-updater` partition, which needs it too.
 *
 * @param session The session whose certificate verification to extend
 */
export function registerLeakedCertificateCheck(session: CertificateVerifySession): void {
  session.setCertificateVerifyProc(({ hostname, certificate, validatedCertificate }, callback) => {
    try {
      if (chainIncludesLeakedKey(certificate) || chainIncludesLeakedKey(validatedCertificate)) {
        logger.warn(
          `Refused the certificate for '${hostname}': its chain includes a leaked eMudhra intermediate`,
        );
        callback(REJECT_CERTIFICATE);
        return;
      }
    } catch (error) {
      logger.warn(
        `Refused the certificate for '${hostname}': could not check it for leaked eMudhra intermediates: ${getErrorMessage(error)}`,
      );
      callback(REJECT_CERTIFICATE);
      return;
    }
    callback(USE_CHROMIUM_VERIFICATION_RESULT);
  });
}

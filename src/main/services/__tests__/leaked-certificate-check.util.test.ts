// @vitest-environment node
import tls from 'tls';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type CertificateChainLink,
  type CertificateVerifySession,
  registerLeakedCertificateCheck,
} from '@main/services/leaked-certificate-check.util';
import {
  LEAKED_AAA_CROSS_SIGNED_PEM,
  LEAKED_EMUDHRA_ISSUED_PEM,
} from '@node/utils/leaked-certificates.test-utils';
import { logger } from '@shared/services/logger.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

/** Chromium's net error for a rejected certificate: `net::ERR_FAILED` */
const REJECT = -2;
/** Tells Chromium to use the result of its own verification */
const USE_CHROMIUM_RESULT = -3;

/** Two ordinary trusted roots, standing in for certificates of a legitimate chain */
const [UNRELATED_PEM, OTHER_UNRELATED_PEM] = tls.getCACertificates('bundled');

/** Builds a chain from leaf to root, the way Electron links it through `issuerCert` */
function buildChain(leafPem: string, ...issuerPems: string[]): CertificateChainLink {
  const issuerCert = issuerPems.reduceRight<CertificateChainLink | undefined>(
    (nextIssuerCert, data) => ({ data, issuerCert: nextIssuerCert }),
    undefined,
  );
  return { data: leafPem, issuerCert };
}

/**
 * Registers the check on a stand-in session and returns what it answers for a request
 *
 * @param certificate The chain the server sent
 * @param validatedCertificate The chain Chromium built while verifying; the same as the server's
 *   unless given
 */
function verify(
  certificate: CertificateChainLink,
  validatedCertificate: CertificateChainLink = certificate,
): number {
  let verifyProc: Parameters<CertificateVerifySession['setCertificateVerifyProc']>[0] | undefined;
  registerLeakedCertificateCheck({
    setCertificateVerifyProc: (proc) => {
      verifyProc = proc;
    },
  });
  if (!verifyProc) throw new Error('No certificate verify proc was registered');

  let result: number | undefined;
  verifyProc(
    { hostname: 'example.org', certificate, validatedCertificate },
    (verificationResult) => {
      result = verificationResult;
    },
  );
  if (result === undefined) throw new Error('The certificate verify proc did not answer');
  return result;
}

describe('registerLeakedCertificateCheck', () => {
  beforeEach(() => {
    vi.mocked(logger.warn).mockClear();
  });

  it('rejects a chain through a leaked eMudhra-issued intermediate', () => {
    expect(verify(buildChain(UNRELATED_PEM, LEAKED_EMUDHRA_ISSUED_PEM, OTHER_UNRELATED_PEM))).toBe(
      REJECT,
    );
  });

  it('rejects a chain through a leaked intermediate cross-signed by AAA Certificate Services', () => {
    expect(verify(buildChain(UNRELATED_PEM, LEAKED_AAA_CROSS_SIGNED_PEM))).toBe(REJECT);
  });

  it('rejects a leaked intermediate Chromium fetched itself when the server sent only its leaf', () => {
    expect(
      verify({ data: UNRELATED_PEM }, buildChain(UNRELATED_PEM, LEAKED_EMUDHRA_ISSUED_PEM)),
    ).toBe(REJECT);
  });

  it('rejects a leaked intermediate the server sent even when Chromium built a chain without it', () => {
    expect(
      verify(
        buildChain(UNRELATED_PEM, LEAKED_AAA_CROSS_SIGNED_PEM),
        buildChain(UNRELATED_PEM, OTHER_UNRELATED_PEM),
      ),
    ).toBe(REJECT);
  });

  it('refuses a certificate it cannot read instead of leaving the request unanswered', () => {
    expect(verify(buildChain(UNRELATED_PEM, 'not a certificate'))).toBe(REJECT);
  });

  it('leaves a chain without a leaked certificate to Chromium', () => {
    expect(verify(buildChain(UNRELATED_PEM, OTHER_UNRELATED_PEM))).toBe(USE_CHROMIUM_RESULT);
  });

  it('logs the host it refused', () => {
    verify(buildChain(UNRELATED_PEM, LEAKED_EMUDHRA_ISSUED_PEM));

    expect(logger.warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/^Refused the certificate for 'example\.org': .*leaked eMudhra/),
    );
  });

  // Electron 39 builds `issuerCert` as a finite chain and never links a root to itself; this pins
  // the guard that keeps a future Electron that did from looping forever inside every request
  it('stops at a root that names itself as its issuer', () => {
    const root: CertificateChainLink = { data: OTHER_UNRELATED_PEM };
    root.issuerCert = root;

    expect(verify({ data: UNRELATED_PEM, issuerCert: root })).toBe(USE_CHROMIUM_RESULT);
  });
});

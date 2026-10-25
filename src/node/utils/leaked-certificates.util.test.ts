// @vitest-environment node
import { X509Certificate } from 'crypto';
import tls from 'tls';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  carriesLeakedKey,
  distrustLeakedCertificateRootsInNode,
  removeDistrustedRoots,
} from '@node/utils/leaked-certificates.util';
import {
  LEAKED_AAA_CROSS_SIGNED_PEM,
  LEAKED_EMUDHRA_ISSUED_PEM,
} from '@node/utils/leaked-certificates.test-utils';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

/** SHA-256 fingerprint of `emSign ECC Root CA - G3`, the root the leaked intermediates chain to */
const EMSIGN_ECC_ROOT_G3_SHA256 =
  '86A1ECBA089C4A8D3BBE2734C612BA341D813E043CF9E8A862CD5C57A36BBE6B';

function sha256Of(pem: string): string {
  return new X509Certificate(pem).fingerprint256.replaceAll(':', '');
}

function findBundledRoot(sha256: string): string {
  const root = tls.getCACertificates('bundled').find((pem) => sha256Of(pem) === sha256);
  if (!root) throw new Error(`Node.js no longer bundles the root ${sha256}`);
  return root;
}

describe('carriesLeakedKey', () => {
  it('recognizes a leaked intermediate issued by eMudhra', () => {
    expect(carriesLeakedKey(LEAKED_EMUDHRA_ISSUED_PEM)).toBe(true);
  });

  it('recognizes the copy of that intermediate cross-signed by AAA Certificate Services', () => {
    expect(carriesLeakedKey(LEAKED_AAA_CROSS_SIGNED_PEM)).toBe(true);
  });

  it('does not flag any root Node.js trusts', () => {
    expect(tls.getCACertificates('bundled').filter(carriesLeakedKey)).toEqual([]);
  });
});

describe('removeDistrustedRoots', () => {
  it('removes emSign ECC Root CA - G3', () => {
    const root = findBundledRoot(EMSIGN_ECC_ROOT_G3_SHA256);

    expect(removeDistrustedRoots([root])).toEqual([]);
  });

  it('keeps every other root in the order given', () => {
    const others = tls
      .getCACertificates('bundled')
      .filter((pem) => sha256Of(pem) !== EMSIGN_ECC_ROOT_G3_SHA256);
    const root = findBundledRoot(EMSIGN_ECC_ROOT_G3_SHA256);

    expect(removeDistrustedRoots([others[0], root, ...others.slice(1)])).toEqual(others);
  });
});

describe('distrustLeakedCertificateRootsInNode', () => {
  const originalDefaults = tls.getCACertificates('default');

  afterEach(() => {
    tls.setDefaultCACertificates(originalDefaults);
  });

  it('stops new TLS connections from trusting emSign ECC Root CA - G3', () => {
    distrustLeakedCertificateRootsInNode();

    const defaults = tls.getCACertificates('default').map(sha256Of);
    expect(defaults).not.toContain(EMSIGN_ECC_ROOT_G3_SHA256);
    expect(defaults).toHaveLength(originalDefaults.length - 1);
  });
});

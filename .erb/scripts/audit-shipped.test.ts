// @vitest-environment node
import { findShippedAdvisories, getShippedSet } from './audit-shipped';

const advisory = (name: string, n = 1, range = '*') => ({
  title: `${name} problem ${n}`,
  url: `https://example.test/${name}/${n}`,
  severity: 'high',
  range,
});

const packageLock = {
  packages: {
    'node_modules/dompurify': { version: '3.4.12' },
    'node_modules/foo/node_modules/dompurify': { version: '2.0.0' },
    'node_modules/electron': { version: '39.8.8' },
    'node_modules/electron-updater': { version: '6.0.0' },
  },
};

describe('getShippedSet', () => {
  it('takes the npm rows and adds Electron', () => {
    const set = getShippedSet(
      [
        { ecosystem: 'npm', name: 'dompurify', version: '3.4.12' },
        { ecosystem: 'nuget', name: 'MessagePack', version: '2.5.192' },
      ],
      packageLock,
    );
    expect([...set]).toEqual(['dompurify@3.4.12', 'electron@39.8.8']);
  });

  it('throws when the notices lock has no npm rows', () => {
    expect(() => getShippedSet([], packageLock)).toThrow(/no npm rows/);
  });

  it('throws when the lockfile has no Electron version', () => {
    expect(() =>
      getShippedSet([{ ecosystem: 'npm', name: 'dompurify', version: '3.4.12' }], { packages: {} }),
    ).toThrow(/electron/);
  });
});

describe('findShippedAdvisories', () => {
  it('reports a shipped package with an advisory, and Electron', () => {
    const audit = {
      auditReportVersion: 2,
      vulnerabilities: {
        dompurify: { via: [advisory('dompurify')], nodes: ['node_modules/dompurify'] },
        electron: {
          via: [advisory('electron', 1), advisory('electron', 2), advisory('electron', 1)],
          nodes: ['node_modules/electron'],
        },
      },
    };
    const found = findShippedAdvisories(
      audit,
      packageLock,
      new Set(['dompurify@3.4.12', 'electron@39.8.8']),
    );
    expect([...found.keys()]).toEqual(['dompurify@3.4.12', 'electron@39.8.8']);
    expect(found.get('electron@39.8.8')).toHaveLength(2);
  });

  it('ignores a nested copy at a version that does not ship', () => {
    const audit = {
      auditReportVersion: 2,
      vulnerabilities: {
        dompurify: {
          via: [advisory('dompurify')],
          nodes: ['node_modules/foo/node_modules/dompurify'],
        },
      },
    };
    expect(findShippedAdvisories(audit, packageLock, new Set(['dompurify@3.4.12'])).size).toBe(0);
  });

  it("keeps only the advisories whose range covers the shipped copy's version", () => {
    const audit = {
      auditReportVersion: 2,
      vulnerabilities: {
        dompurify: {
          via: [advisory('dompurify', 1, '<3.0.0'), advisory('dompurify', 2, '>=3.4.0 <=3.4.16')],
          nodes: ['node_modules/dompurify', 'node_modules/foo/node_modules/dompurify'],
        },
      },
    };
    const found = findShippedAdvisories(audit, packageLock, new Set(['dompurify@3.4.12']));
    expect(found.get('dompurify@3.4.12')?.map((a) => a.url)).toEqual([
      'https://example.test/dompurify/2',
    ]);
  });

  it('keeps an advisory whose range semver cannot read', () => {
    const audit = {
      auditReportVersion: 2,
      vulnerabilities: {
        dompurify: {
          via: [advisory('dompurify', 1, 'not a range')],
          nodes: ['node_modules/dompurify'],
        },
      },
    };
    const found = findShippedAdvisories(audit, packageLock, new Set(['dompurify@3.4.12']));
    expect(found.get('dompurify@3.4.12')).toHaveLength(1);
  });

  it('reports an advisory whose range covers a shipped prerelease version', () => {
    const audit = {
      auditReportVersion: 2,
      vulnerabilities: {
        electron: { via: [advisory('electron', 1, '<46.0.1')], nodes: ['node_modules/electron'] },
      },
    };
    const prereleaseLock = { packages: { 'node_modules/electron': { version: '46.0.0-beta.2' } } };
    const found = findShippedAdvisories(audit, prereleaseLock, new Set(['electron@46.0.0-beta.2']));
    expect(found.get('electron@46.0.0-beta.2')).toHaveLength(1);
  });

  it('ignores entries flagged only because of a child', () => {
    const audit = {
      auditReportVersion: 2,
      vulnerabilities: {
        'electron-updater': {
          via: ['builder-util-runtime'],
          nodes: ['node_modules/electron-updater'],
        },
      },
    };
    expect(
      findShippedAdvisories(audit, packageLock, new Set(['electron-updater@6.0.0'])).size,
    ).toBe(0);
  });

  it.each([undefined, {}, { vulnerabilities: {} }, { auditReportVersion: 3, vulnerabilities: {} }])(
    'throws on audit output that is not a version 2 report: %j',
    (audit) => {
      expect(() => findShippedAdvisories(audit, packageLock, new Set())).toThrow(/version 2/);
    },
  );

  it.each([{ auditReportVersion: 2 }, { auditReportVersion: 2, vulnerabilities: 'nope' }])(
    'throws on a version 2 report without a vulnerabilities object: %j',
    (audit) => {
      expect(() => findShippedAdvisories(audit, packageLock, new Set())).toThrow(/vulnerabilities/);
    },
  );
});

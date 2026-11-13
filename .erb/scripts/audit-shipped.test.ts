// @vitest-environment node
import { findShippedAdvisories, shippedSet } from './audit-shipped';

const advisory = (name: string, n = 1, range = '*') => ({
  name,
  title: `${name} problem ${n}`,
  url: `https://example.test/${name}/${n}`,
  severity: 'high',
  range,
});

const packageLock = {
  packages: {
    'node_modules/dompurify': { version: '3.4.12' },
    'node_modules/happy-dom': { version: '20.0.0' },
    'node_modules/foo/node_modules/dompurify': { version: '2.0.0' },
    'node_modules/electron': { version: '39.8.8' },
    'node_modules/electron-updater': { version: '6.0.0' },
  },
};

describe('shippedSet', () => {
  it('takes the npm rows and adds Electron', () => {
    const set = shippedSet(
      [
        { ecosystem: 'npm', name: 'dompurify', version: '3.4.12' },
        { ecosystem: 'nuget', name: 'MessagePack', version: '2.5.192' },
      ],
      packageLock,
    );
    expect([...set]).toEqual(['dompurify@3.4.12', 'electron@39.8.8']);
  });

  it('throws when the notices lock has no npm rows', () => {
    expect(() => shippedSet([], packageLock)).toThrow(/no npm rows/);
  });

  it('throws when the lockfile has no Electron version', () => {
    expect(() =>
      shippedSet([{ ecosystem: 'npm', name: 'dompurify', version: '3.4.12' }], { packages: {} }),
    ).toThrow(/electron/);
  });
});

describe('findShippedAdvisories', () => {
  it('reports a shipped package with an advisory, and Electron', () => {
    const audit = {
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

  it('ignores a package that does not ship', () => {
    const audit = {
      vulnerabilities: {
        'happy-dom': { via: [advisory('happy-dom')], nodes: ['node_modules/happy-dom'] },
      },
    };
    expect(findShippedAdvisories(audit, packageLock, new Set(['dompurify@3.4.12'])).size).toBe(0);
  });

  it('ignores a nested copy at a version that does not ship', () => {
    const audit = {
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

  it('ignores entries flagged only because of a child', () => {
    const audit = {
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

  it.each([undefined, {}, { vulnerabilities: 'nope' }])(
    'throws on audit output without a vulnerabilities object: %j',
    (audit) => {
      expect(() => findShippedAdvisories(audit, packageLock, new Set())).toThrow(/vulnerabilities/);
    },
  );
});

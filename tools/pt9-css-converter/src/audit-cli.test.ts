import { describe, it, expect } from 'vitest';
import { resourceIds, auditAll } from './audit-cli';

describe('audit-cli', () => {
  it('resourceIds derives the committed pipeline snapshots and excludes the *-manual references', () => {
    const ids = resourceIds();

    // The committed commentaries (3 English MVP + 10 additional-language resources).
    expect(ids).toEqual(expect.arrayContaining(['hbkeng', 'hbkcs', 'tnn', 'tndptg']));
    expect(ids.length).toBeGreaterThanOrEqual(13);

    // Manual-capture baselines are inputs to no conversion, so they must be excluded.
    expect(ids.some((id) => id.endsWith('-manual'))).toBe(false);

    // Output is sorted for stable, deterministic reporting.
    expect([...ids]).toEqual([...ids].sort());
  });

  it('every committed marker stylesheet still reproduces from its source CSS', () => {
    const results = auditAll();
    expect(results.length).toBeGreaterThanOrEqual(13);

    const drifted = results.filter((result) => !result.inSync).map((result) => result.id);
    expect(drifted).toEqual([]);
  });
});

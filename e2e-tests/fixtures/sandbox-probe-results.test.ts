import { describe, expect, it } from 'vitest';
import { checkSandboxProbeResults, type SandboxProbeResult } from './sandbox-probe-results';

const refused = (name: string): SandboxProbeResult => ({
  name,
  outcome: 'refused',
  detail: 'not allowed in extensions',
});

const ALL_REFUSED = {
  load: [refused('require-fs'), refused('process-stdin')],
  activate: [refused('require-fs'), refused('process-stdin')],
  'after init': [refused('require-fs'), refused('process-stdin')],
};

describe('checkSandboxProbeResults', () => {
  it('passes when every phase refused every probe', () => {
    expect(checkSandboxProbeResults(ALL_REFUSED)).toEqual({ missingPhases: [], problems: [] });
  });

  it('lists the phases that have not run yet', () => {
    expect(checkSandboxProbeResults({ load: ALL_REFUSED.load }).missingPhases).toEqual([
      'activate',
      'after init',
    ]);
  });

  it('reports every probe that escaped, with its phase', () => {
    const results = {
      ...ALL_REFUSED,
      activate: [
        refused('require-fs'),
        { name: 'process-stdin', outcome: 'escaped' as const, detail: 'is Symbol(kFs)' },
      ],
    };

    expect(checkSandboxProbeResults(results).problems).toEqual([
      'activate: process-stdin escaped (is Symbol(kFs))',
    ]);
  });

  it('reports a phase that ran no probes', () => {
    expect(checkSandboxProbeResults({ ...ALL_REFUSED, load: [] }).problems).toEqual([
      'load: no probes ran',
    ]);
  });
});

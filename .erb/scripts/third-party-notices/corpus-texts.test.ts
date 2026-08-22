import { spawnSync } from 'child_process';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { canonicalText, corpusVersion, verifyCorpus } from './corpus';
import { loadPolicy } from './policy';

describe('corpus', () => {
  it.each(['MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'Zlib', 'Unicode-3.0'])(
    'has canonical text for %s',
    (id) => {
      const text = canonicalText(id);
      expect(text).toBeTruthy();
      // `text?.length ?? 0` rather than `text!.length`: the non-null assertion operator is banned
      // by `no-type-assertion/no-type-assertion`, which flags it alongside `as`.
      expect(text?.length ?? 0).toBeGreaterThan(200);
    },
  );

  it('returns undefined for an unknown id rather than empty text', () => {
    // Returning '' would let a package with an unrecognised id render an empty license block,
    // which reads as a discharged obligation while discharging nothing.
    expect(canonicalText('Not-A-Real-License-1.0')).toBeUndefined();
  });

  it('every indexed text matches its recorded checksum', () => {
    // This is what makes the index worth committing: it detects drift or substitution in the
    // spdx-license-list dependency instead of silently reproducing whatever it now contains.
    expect(verifyCorpus()).toEqual([]);
  });

  it('covers every license the shipped policy can reach a verdict on', () => {
    // A policy id with no canonical text would render an empty license block - an obligation that
    // looks discharged and is not. Checking the two lists against the index closes that gap here
    // rather than at generation time.
    const policy = loadPolicy(path.join(__dirname, 'notices-policy.json'));
    const missing = [...policy.allowed, ...policy.copyleft].filter((id) => !canonicalText(id));
    expect(missing).toEqual([]);
  });

  it('records the corpus version so the artifact is traceable', () => {
    expect(corpusVersion()).toMatch(/^\d+\.\d+\.\d+/);
  });
});

describe('a drifted corpus is detected', () => {
  // `verifyCorpus()` gates every run in `buildReport`, and until now nothing ever made it return
  // non-empty - so the one guard with no falsification was the one protecting the texts themselves.
  // What it exists to catch is the `spdx-license-list` dependency changing or being substituted
  // under a pinned version, after which the generator would reproduce whatever it now contains as
  // if it were the licence. Simulated by mutating the dependency's own export in a child process,
  // which is exactly the shape of that failure.
  function withMutatedCorpus(expression: string) {
    const script = `
      const target = require.resolve('spdx-license-list/full');
      const real = require(target);
      // One byte, in one licence, leaving every other text untouched: the gate has to catch a
      // silent edit, not just a wholesale replacement.
      const mutated = { ...real, MIT: { ...real.MIT, licenseText: real.MIT.licenseText + '.' } };
      require.cache[target] = {
        id: target,
        filename: target,
        path: require('path').dirname(target),
        loaded: true,
        children: [],
        paths: [],
        exports: mutated,
      };
      const corpus = require(${JSON.stringify(path.join(__dirname, 'corpus.js'))});
      process.stdout.write(JSON.stringify(${expression}));
    `;
    const run = spawnSync(process.execPath, ['-e', script], { encoding: 'utf8' });
    if (run.status !== 0) throw new Error(`child failed: ${run.stderr}`);
    return JSON.parse(run.stdout);
  }

  it('reports the drifted identifier rather than reproducing the changed text', () => {
    expect(withMutatedCorpus('corpus.verifyCorpus()')).toEqual(['MIT']);
  });

  it('throws from canonicalText, naming the identifier and both checksums', () => {
    const thrown = withMutatedCorpus(
      "(() => { try { corpus.canonicalText('MIT'); return 'no error'; } catch (err) { return err.message; } })()",
    );
    expect(thrown).toMatch(/canonical text for MIT does not match the committed checksum/);
    expect(thrown).toMatch(/regenerate/);
  });

  it('leaves every other identifier alone, so the report names only what drifted', () => {
    expect(withMutatedCorpus("corpus.canonicalText('Apache-2.0').length > 200")).toBe(true);
  });
});

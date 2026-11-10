import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Pins how `main.ts` creates and disposes the two project-switch network events. The main
 * process's registry rejects a second registration of an event, so two Simple-mode switches that
 * start at about the same time must share one registration, and a registration that finishes after
 * deactivation must still be disposed. `createLazySharedPromise` provides both, and its own tests
 * cover them; this checks that `main.ts` actually goes through it. `activate` cannot be run under
 * vitest without standing up most of PAPI, so this reads the source.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const MAIN_FILE = path.join(SRC_DIR, 'main.ts');

/** Drops all whitespace, so formatting changes cannot break the comparisons below */
function compact(code: string) {
  return code.replace(/\s+/g, '');
}

describe('project-switch event wiring (main.ts)', () => {
  const source = compact(readFileSync(MAIN_FILE, 'utf-8'));

  it.each([
    ['willStartEmitter', 'PROJECT_SWITCH_WILL_START_EVENT'],
    ['didFinishEmitter', 'PROJECT_SWITCH_DID_FINISH_EVENT'],
  ])('creates %s once through the lazy shared promise, disposing a late one', (emitter, event) => {
    const creation = compact(`createNetworkEventEmitterAsync(${event},`);
    const declarationHead = compact(
      `const ${emitter} = createLazySharedPromise(() => papi.network.${creation}`,
    );
    const declarationStart = source.indexOf(declarationHead);
    expect(declarationStart).toBeGreaterThanOrEqual(0);
    // The only creation of this event, so nothing registers it outside the helper
    expect(source.split(creation)).toHaveLength(2);

    // Up to the next lazy emitter, or the end of the file for the last one
    const nextLazy = source.indexOf(
      'createLazySharedPromise(',
      declarationStart + declarationHead.length,
    );
    const declaration = source.slice(declarationStart, nextLazy < 0 ? undefined : nextLazy);
    expect(declaration).toContain(compact('}), disposeDetachedEmitter, );'));
  });

  it('requests both emitters through get() before emitting will-start', () => {
    expect(source).toContain(
      compact(
        'const [willStart] = await Promise.all([willStartEmitter.get(), didFinishEmitter.get()]); willStart.emit({ switchId });',
      ),
    );
  });

  it('resets both emitters on deactivation and waits for their disposal', () => {
    expect(source).toContain(
      compact(
        'await Promise.all( [willStartEmitter.reset(), didFinishEmitter.reset()].map( (emitter) => emitter && disposeSwitchEmitter(emitter), ), );',
      ),
    );
  });
});

/**
 * The judgment the `no-unasked-edits` runs rest on: which recorded project writes a step asked for.
 * A mistake here makes those runs pass over an edit nobody asked for, so each rule is pinned by the
 * write it must reject as well as the one it must accept.
 */
import { describe, expect, it } from 'vitest';
import {
  describeUnaskedWrites,
  hasSaveLanded,
  type MissingFile,
  type RecordedWrite,
  savedAs,
  type WritePhase,
  type WriteRule,
  writesToJudge,
} from './project-write-judging';

const DEBOUNCE_MS = 700;
const BOOK = '32JONWEB.SFM';
const OTHER_FILE = 'Settings.xml';

const bytes = (text: string) => Buffer.from(text, 'utf8');
const BEFORE = bytes('\\c 1\n\\v 1 Jonah\n');
const SAVED = bytes('\\c 1\r\n\\v 1 JonahQ\r\n');
const SAVED_AGAIN = bytes('\\c 1\r\n\\v 1 JonahQQ\r\n');

const previousPhase: WritePhase = {
  label: 'typing "Q"',
  scope: 'project',
  writes: new Map([[BOOK, savedAs()]]),
  startedAt: 0,
};

/** A phase starting at 10 s into the recording that asks for `writes`. */
function phaseAsking(writes: ReadonlyMap<string, WriteRule> = new Map()): WritePhase {
  return { label: 'undoing it', scope: 'project', writes, startedAt: 10_000 };
}

/** A `changed` write of `BOOK` landing `intoPhase` ms into {@link phaseAsking}'s phase. */
function bookWrite(
  intoPhase: number,
  after: Buffer,
  overrides: Partial<RecordedWrite> = {},
): RecordedWrite {
  return {
    file: BOOK,
    at: 10_000 + intoPhase,
    phase: 1,
    kind: 'changed',
    before: BEFORE,
    after,
    ...overrides,
  };
}

const describeIn = (phase: WritePhase, writes: RecordedWrite[]) =>
  describeUnaskedWrites(phase, writes, previousPhase, DEBOUNCE_MS);

describe('describeUnaskedWrites', () => {
  describe('a phase that asks for one save with no known result', () => {
    const phase = phaseAsking(new Map([[BOOK, savedAs()]]));

    it('accepts its save', () => {
      expect(describeIn(phase, [bookWrite(1_200, SAVED)])).toEqual([]);
    });

    it('rejects a second write after the save', () => {
      const unasked = describeIn(phase, [
        bookWrite(1_200, SAVED),
        bookWrite(2_000, SAVED_AGAIN, { before: SAVED }),
      ]);

      expect(unasked).toHaveLength(1);
      expect(unasked[0]).toMatch(/^32JONWEB\.SFM: changed 2000 ms into the step/);
      expect(unasked[0]).toContain("it came after this step's save had already landed");
    });

    it('rejects a write landing before one debounce when a later write follows it', () => {
      // A late write of the step before (an editor push-back after the echo) lands early in this
      // step, and this step's own save lands after it: the early one is not the save.
      const unasked = describeIn(phase, [
        bookWrite(500, SAVED_AGAIN),
        bookWrite(1_300, SAVED, { before: SAVED_AGAIN }),
      ]);

      expect(unasked).toHaveLength(1);
      expect(unasked[0]).toMatch(/^32JONWEB\.SFM: changed 500 ms into the step/);
      expect(unasked[0]).toContain("so it is not this step's save");
      expect(unasked[0]).toContain('it most likely belongs to the step before: "typing "Q""');
    });

    it('accepts a write landing before one debounce when nothing follows it', () => {
      // The editor saves at once when a write's echo comes back while it holds newer edits, so an
      // early write alone can be the step's own save.
      expect(describeIn(phase, [bookWrite(500, SAVED)])).toEqual([]);
    });

    it('rejects a rewrite with the same bytes', () => {
      const unasked = describeIn(phase, [
        bookWrite(1_200, BEFORE, { kind: 'rewritten', before: BEFORE }),
      ]);

      expect(unasked).toHaveLength(1);
      expect(unasked[0]).toContain('a same-bytes rewrite is no part of one');
    });

    it('rejects a removal', () => {
      const unasked = describeIn(phase, [
        { file: BOOK, at: 11_200, phase: 1, kind: 'removed', before: BEFORE },
      ]);

      expect(unasked).toHaveLength(1);
      expect(unasked[0]).toContain('a save never removes the file');
    });
  });

  describe('a phase that asks for an exact result', () => {
    const isPartway = (written: Buffer) => written.equals(SAVED);
    const phase = phaseAsking(new Map([[BOOK, savedAs(SAVED_AGAIN, isPartway)]]));

    it('accepts a partway state and then the result', () => {
      expect(
        describeIn(phase, [
          bookWrite(1_000, SAVED),
          bookWrite(1_800, SAVED_AGAIN, { before: SAVED }),
        ]),
      ).toEqual([]);
    });

    it('rejects a write holding neither, naming the step before when it lands early', () => {
      const unasked = describeIn(phase, [
        bookWrite(300, bytes('stale')),
        bookWrite(1_800, SAVED_AGAIN, { before: bytes('stale') }),
      ]);

      expect(unasked).toHaveLength(1);
      expect(unasked[0]).toContain('it holds neither what this step saves nor a state on the way');
      expect(unasked[0]).toContain('most likely belongs to the step before');
    });
  });

  it('rejects any write in a phase that asks for none, with how the bytes moved', () => {
    const unasked = describeIn(phaseAsking(), [bookWrite(2_000, SAVED)]);

    expect(unasked).toHaveLength(1);
    expect(unasked[0]).toContain('this step may not write it');
    expect(unasked[0]).toContain('first differing byte at offset');
    // Past one debounce, so nothing points at the step before
    expect(unasked[0]).not.toContain('belongs to the step before');
  });

  it('rejects a write to a file in scope that the phase has no rule for', () => {
    const phase = phaseAsking(new Map([[BOOK, savedAs()]]));

    const unasked = describeIn(phase, [
      bookWrite(1_200, SAVED),
      { file: OTHER_FILE, at: 11_300, phase: 1, kind: 'added', after: bytes('<x/>') },
    ]);

    expect(unasked).toHaveLength(1);
    expect(unasked[0]).toMatch(/^Settings\.xml: created 1300 ms into the step/);
    expect(unasked[0]).toContain('It holds 4 bytes.');
  });

  it('does not judge a file outside the phase scope', () => {
    const phase: WritePhase = { ...phaseAsking(), scope: [BOOK] };

    expect(
      describeIn(phase, [
        { file: OTHER_FILE, at: 11_300, phase: 1, kind: 'added', after: bytes('<x/>') },
      ]),
    ).toEqual([]);
  });

  it('does not judge a file the phase marks `any`', () => {
    const phase = phaseAsking(new Map<string, WriteRule>([[BOOK, { kind: 'any' }]]));

    expect(describeIn(phase, [bookWrite(100, SAVED), bookWrite(200, SAVED_AGAIN)])).toEqual([]);
  });
});

describe('writesToJudge', () => {
  const missingAt = (at: number, phase: number): MissingFile => ({
    version: { bytes: BEFORE },
    phase,
    at,
  });

  it('drops a transient file the save wrote beside the book, and keeps every other write', () => {
    const recorded: RecordedWrite[] = [
      { file: `${BOOK}.tmp`, at: 11_000, phase: 1, kind: 'added', after: SAVED },
      bookWrite(1_100, SAVED),
      { file: 'notes.xml', at: 11_200, phase: 1, kind: 'added', after: bytes('<n/>') },
    ];
    const baseline = new Set([BOOK]);
    const missing = new Map([[`${BOOK}.tmp`, missingAt(11_100, 1)]]);

    expect(writesToJudge(recorded, baseline, missing).map((write) => write.file)).toEqual([
      BOOK,
      'notes.xml',
    ]);
  });

  it('reports a baseline file missing at the end as removed, in time order', () => {
    const recorded = [bookWrite(1_100, SAVED), bookWrite(3_000, SAVED_AGAIN)];
    const missing = new Map([[OTHER_FILE, missingAt(12_000, 1)]]);

    const judged = writesToJudge(recorded, new Set([BOOK, OTHER_FILE]), missing);

    expect(judged.map((write) => [write.file, write.kind])).toEqual([
      [BOOK, 'changed'],
      [OTHER_FILE, 'removed'],
      [BOOK, 'changed'],
    ]);
    expect(judged[1]).toMatchObject({ phase: 1, at: 12_000, before: BEFORE });
  });
});

describe('hasSaveLanded', () => {
  const context = (lastWrite: RecordedWrite | undefined, hasOwnSaveWindowPassed = false) => ({
    lastWrite,
    phaseStartedAt: 10_000,
    saveDebounceMs: DEBOUNCE_MS,
    hasOwnSaveWindowPassed,
  });

  it('takes a write a debounce or more into the phase', () => {
    expect(hasSaveLanded(SAVED, { from: BEFORE }, context(bookWrite(DEBOUNCE_MS, SAVED)))).toBe(
      true,
    );
  });

  it('holds off on a write landing sooner, until the own-save window has passed', () => {
    const early = bookWrite(DEBOUNCE_MS - 1, SAVED);

    expect(hasSaveLanded(SAVED, { from: BEFORE }, context(early))).toBe(false);
    expect(hasSaveLanded(SAVED, { from: BEFORE }, context(early, true))).toBe(true);
  });

  it('holds off on bytes a write of an earlier phase left', () => {
    const earlier = bookWrite(-200, SAVED, { phase: 0 });

    expect(hasSaveLanded(SAVED, { from: BEFORE }, context(earlier))).toBe(false);
  });

  it('never takes the bytes the step started from, or no bytes', () => {
    const late = bookWrite(2_000, BEFORE);

    expect(hasSaveLanded(BEFORE, { from: BEFORE }, context(late, true))).toBe(false);
    expect(hasSaveLanded(undefined, { from: BEFORE }, context(late, true))).toBe(false);
  });

  it('takes the exact result at once, and waits past a partway state', () => {
    const expectation = {
      from: BEFORE,
      result: SAVED_AGAIN,
      isPartway: (written: Buffer) => written.equals(SAVED),
    };

    expect(hasSaveLanded(SAVED_AGAIN, expectation, context(bookWrite(100, SAVED_AGAIN)))).toBe(
      true,
    );
    expect(hasSaveLanded(SAVED, expectation, context(bookWrite(2_000, SAVED), true))).toBe(false);
    // Neither result nor partway, past a debounce: landed, and a finding for the caller
    expect(hasSaveLanded(bytes('other'), expectation, context(bookWrite(2_000, SAVED)))).toBe(true);
  });
});

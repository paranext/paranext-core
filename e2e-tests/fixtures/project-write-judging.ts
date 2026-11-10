/**
 * How the `no-unasked-edits` runs judge the project writes their recorder saw: which writes a step
 * asked for, which it did not and why, and when a step's own save has landed. Pure over the
 * recorded writes and phases — the recorder that samples the disk and the steps that drive the app
 * live in `no-unasked-edits.body.ts` — so the judgment, which is what decides that the app made no
 * edit the user did not ask for, is unit-tested on its own (`project-write-judging.test.ts`).
 */
import { unifiedUsfmDiff } from './usfm-line-diff';

/** One write the recorder saw land on one file of the project. */
export interface RecordedWrite {
  /** Path relative to the project folder. */
  file: string;
  /** When the sample that saw it ran, in ms since the recording started. */
  at: number;
  /** Index of the {@link WritePhase} it landed in. */
  phase: number;
  /**
   * `added`: a file the folder did not hold; `changed`: new bytes; `rewritten`: the same bytes with
   * a new modification time; `removed`: a file the project held at the start and does not hold at
   * the end.
   */
  kind: 'added' | 'changed' | 'rewritten' | 'removed';
  before?: Buffer;
  after?: Buffer;
}

/**
 * What a {@link WritePhase} allows one file's writes to be. `any` is for a file whose writes are not
 * judged in that phase. `save` is for a file the phase saves:
 *
 * - With `result`, every write must be `result` or, before that lands, a state `isPartway` accepts (a
 *   save that lands while the gesture is still being made).
 * - Without it, the phase's first write is its save, which the caller judges as it lands; the phase
 *   then allows exactly that one write. A write that lands sooner after the phase began than the
 *   editor's save debounce is the save only if no other write to the file follows it in the phase:
 *   followed, it is a late write of an earlier step that the phase's own save lands after.
 *
 * Either way nothing may follow the save in the phase's interval, and a rewrite with the same bytes
 * never counts as one: the backend's chapter save (`SetChapterUsx`) writes only when the chapter's
 * USFM changed, so a same-bytes rewrite is no part of any save.
 */
export type WriteRule =
  | { kind: 'any' }
  | { kind: 'save'; result?: Buffer; isPartway?: (bytes: Buffer) => boolean };

/** The files a phase judges: every file of the project, or only those named. */
export type WriteScope = 'project' | readonly string[];

/**
 * One step's interval of the recording, from its start to the next phase's start (the last runs to
 * the end of the run, through the recorder's closing quiet window), and the writes it asks for.
 * Every write that lands in the interval belongs to the phase: to a file in `scope` with no rule in
 * `writes`, any write at all — new bytes, a new modification time, a file added or removed — is one
 * nobody asked for. A step's write that lands late therefore lands in a later phase and fails
 * there.
 */
export interface WritePhase {
  /** Names the step and what it does, for failure messages. */
  label: string;
  scope: WriteScope;
  writes: ReadonlyMap<string, WriteRule>;
  /** In ms since the recording started. */
  startedAt: number;
}

/** A rule for a file the phase saves; see {@link WriteRule}. */
export function savedAs(result?: Buffer, isPartway?: (bytes: Buffer) => boolean): WriteRule {
  return { kind: 'save', result, isPartway };
}

function describeLineEndings(bytes: Buffer): string {
  const text = bytes.toString('utf8');
  const crlf = text.split('\r\n').length - 1;
  return `${crlf} CRLF, ${text.split('\n').length - 1 - crlf} bare LF`;
}

/**
 * Everything a failure message needs to show how `after` differs from `before`: the byte lengths,
 * the line endings, the first differing byte with hex context either side, and a unified diff of
 * the decoded text. Returns `''` when the bytes are identical.
 */
export function describeByteDrift(
  before: Buffer,
  after: Buffer,
  beforeLabel: string,
  afterLabel: string,
) {
  if (before.equals(after)) return '';
  let offset = 0;
  while (offset < before.length && offset < after.length && before[offset] === after[offset])
    offset += 1;
  const hexAround = (bytes: Buffer) =>
    bytes.subarray(Math.max(0, offset - 16), offset + 16).toString('hex');
  return [
    `${beforeLabel}: ${before.length} bytes (${describeLineEndings(before)}); ` +
      `${afterLabel}: ${after.length} bytes (${describeLineEndings(after)})`,
    `first differing byte at offset ${offset}`,
    `  ${beforeLabel} hex around it: ${hexAround(before)}`,
    `  ${afterLabel} hex around it:  ${hexAround(after)}`,
    unifiedUsfmDiff(before.toString('utf8'), after.toString('utf8'), beforeLabel, afterLabel) ||
      '(the decoded text is identical; the difference is in bytes UTF-8 decoding hides)',
  ].join('\n');
}

/** `ms` as seconds with millisecond precision, for the recording's timestamps. */
export function secondsOf(ms: number): string {
  return (ms / 1000).toFixed(3);
}

const WRITE_KIND_DESCRIPTIONS: Record<RecordedWrite['kind'], string> = {
  added: 'created',
  changed: 'changed',
  rewritten: 'rewritten with the same bytes (its modification time moved)',
  removed: 'removed',
};

/**
 * Why `write` is not one `rule` allows, given whether the phase's save has already landed and
 * whether `write` landed sooner after the phase began than the editor's save debounce with another
 * write to the file after it in the phase (see {@link WriteRule}).
 */
function whyNotAsked(
  write: RecordedWrite,
  rule: WriteRule | undefined,
  { hasSaved, isEarlyAndFollowed }: { hasSaved: boolean; isEarlyAndFollowed: boolean },
): string | undefined {
  if (!rule) return 'this step may not write it';
  if (rule.kind === 'any') return undefined;
  if (write.kind === 'removed') return 'a save never removes the file';
  if (write.kind === 'rewritten')
    return 'a save writes only when the chapter changed, so a same-bytes rewrite is no part of one';
  if (hasSaved) return "it came after this step's save had already landed";
  if (!rule.result && isEarlyAndFollowed)
    return `it landed too soon after the step began to hold the step's edit, and another write to the file followed it, so it is not this step's save`;
  const after = write.after ?? Buffer.alloc(0);
  if (!rule.result || after.equals(rule.result) || rule.isPartway?.(after)) return undefined;
  return 'it holds neither what this step saves nor a state on the way to that';
}

/**
 * Every write of `writes` (the writes that landed in `phase`'s interval, in order) that `phase` did
 * not ask for, each described: which file, when, why it is not allowed, and how the bytes moved. An
 * unasked write that lands sooner after the phase started than `saveDebounceMs` (the editor's save
 * debounce) cannot hold anything the phase did, so its description names the phase before as its
 * likely origin.
 */
export function describeUnaskedWrites(
  phase: WritePhase,
  writes: readonly RecordedWrite[],
  previousPhase: WritePhase | undefined,
  saveDebounceMs: number,
): string[] {
  const savedFiles = new Set<string>();
  return writes.flatMap((write, index) => {
    if (phase.scope !== 'project' && !phase.scope.includes(write.file)) return [];
    const rule = phase.writes.get(write.file);
    const intoPhase = write.at - phase.startedAt;
    const why = whyNotAsked(write, rule, {
      hasSaved: savedFiles.has(write.file),
      isEarlyAndFollowed:
        intoPhase < saveDebounceMs &&
        writes.slice(index + 1).some((later) => later.file === write.file),
    });
    const after = write.after ?? Buffer.alloc(0);
    if (why === undefined) {
      if (rule?.kind === 'save' && (!rule.result || after.equals(rule.result)))
        savedFiles.add(write.file);
      return [];
    }
    const lines = [
      `${write.file}: ${WRITE_KIND_DESCRIPTIONS[write.kind]} ${intoPhase} ms into the step ` +
        `(+${secondsOf(write.at)} s of the recording), but ${why}.`,
    ];
    if (previousPhase && intoPhase < saveDebounceMs)
      lines.push(
        `It landed sooner than the editor's ${saveDebounceMs} ms save debounce lets anything done in this step save, so it most likely belongs to the step before: "${previousPhase.label}".`,
      );
    if (write.kind === 'changed' && write.before)
      lines.push(describeByteDrift(write.before, after, 'before-this-write', 'after-this-write'));
    else if (write.kind === 'added') lines.push(`It holds ${after.length} bytes.`);
    return [lines.join('\n')];
  });
}

/**
 * A file that was there and is not at the end of the recording: what it last held, and when it
 * went.
 */
export interface MissingFile {
  version: { bytes: Buffer };
  /** Index of the phase it went missing in. */
  phase: number;
  /** When the sample that missed it ran, in ms since the recording started. */
  at: number;
}

/**
 * The writes a recording is judged by, in the order they landed: every recorded write except those
 * to a transient file — one the project did not hold at the start and does not hold at the end,
 * such as the temporary copy ParatextData writes beside a file it saves — plus a `removed` write
 * for each file of the baseline that is missing at the end, in the phase it went missing in.
 *
 * @param recorded Every write the samples saw, in order
 * @param baseline The project's files when the recording started
 * @param missing The files missing at the end of the recording
 */
export function writesToJudge(
  recorded: readonly RecordedWrite[],
  baseline: { has(file: string): boolean },
  missing: ReadonlyMap<string, MissingFile>,
): RecordedWrite[] {
  const isTransient = (file: string) => !baseline.has(file) && missing.has(file);
  const writes = recorded.filter((write) => !isTransient(write.file));
  missing.forEach(({ version, phase, at }, file) => {
    if (baseline.has(file))
      writes.push({ file, at, phase, kind: 'removed', before: version.bytes });
  });
  return writes.sort((first, second) => first.at - second.at);
}

/** What a step's save must do to count as landed; see `ProjectWriteRecorder.waitForSave`. */
export interface SaveExpectation {
  /** The file's bytes before the step. */
  from: Buffer;
  /** What the save must hold, when the step knows it. */
  result?: Buffer;
  /** A state on the way to `result` that is not yet the save. */
  isPartway?: (bytes: Buffer) => boolean;
}

/**
 * Whether `bytes`, the file as the recorder found it, is the running phase's save landed: it is no
 * longer `from`, and is `result` when that is given, or anything else `isPartway` does not accept
 * (already a finding, which the caller judges). Bytes other than `result` that the last write left
 * sooner after the phase began than `saveDebounceMs`, or before the phase began, count only once
 * `hasOwnSaveWindowPassed`: until then the phase's own save may still land after them.
 */
export function hasSaveLanded(
  bytes: Buffer | undefined,
  { from, result, isPartway }: SaveExpectation,
  {
    lastWrite,
    phaseStartedAt,
    saveDebounceMs,
    hasOwnSaveWindowPassed,
  }: {
    /** The last write recorded on the file. */
    lastWrite: RecordedWrite | undefined;
    /** In ms since the recording started. */
    phaseStartedAt: number;
    saveDebounceMs: number;
    hasOwnSaveWindowPassed: boolean;
  },
): bytes is Buffer {
  if (!bytes || bytes.equals(from)) return false;
  if (result && bytes.equals(result)) return true;
  if (result && (isPartway?.(bytes) ?? false)) return false;
  // A write of an earlier phase landed before this one began, so it counts as early too
  const isEarly = !lastWrite || lastWrite.at - phaseStartedAt < saveDebounceMs;
  return !isEarly || hasOwnSaveWindowPassed;
}

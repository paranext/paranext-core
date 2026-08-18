import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';

/**
 * A single top-level USJ content entry wrapped as its own one-entry document, so it can be
 * whitespace-insensitively compared with `areUsjContentsEqualExceptWhitespace`. An absent entry
 * (`undefined`, one side shorter than the other) wraps to an empty document, so it compares unequal
 * to any present entry.
 */
function wrapSingleUsjEntry(entry: Usj['content'][number] | undefined): Usj {
  return { type: 'USJ', version: '3.1', content: entry === undefined ? [] : [entry] };
}

/**
 * Where two USJ documents first significantly disagree: which top-level `content` entry, and the
 * entry each side holds there. A side's entry is `undefined` when that side has no entry at the
 * index (one document is shorter).
 */
export interface UsjContentDivergence {
  /** The index in top-level `content` at which the two documents first differ. */
  index: number;
  sentEntry?: Usj['content'][number];
  receivedEntry?: Usj['content'][number];
}

/**
 * The first place two USJ documents SIGNIFICANTLY differ in their top-level `content`, or
 * `undefined` when they agree there (differing only in whitespace or in fields outside top-level
 * content). Each entry pair is compared with the SAME whitespace-insignificant equality the editor
 * sync itself uses (`areUsjContentsEqualExceptWhitespace`, applied to a single-entry document), so
 * the result points at the first SIGNIFICANT difference rather than a cosmetic whitespace one.
 *
 * Only top-level content is walked (not recursed into nested marker content): it is enough to
 * identify WHICH entry diverged both for a diagnostic log line and for keying a warn-once dedup,
 * and it keeps the output bounded and cheap. A difference nested inside a paragraph is therefore
 * reported as that paragraph diverging, with both whole paragraphs as the two values.
 *
 * @param sent - What we pushed (the editor's settled USJ).
 * @param received - What came back (the PDP's echo of that push, after its own round-trip).
 */
export function detectUsjContentDivergence(
  sent: Usj | undefined,
  received: Usj | undefined,
): UsjContentDivergence | undefined {
  const contentSent = sent?.content ?? [];
  const contentReceived = received?.content ?? [];
  const length = Math.max(contentSent.length, contentReceived.length);
  for (let index = 0; index < length; index += 1) {
    const sentEntry = contentSent[index];
    const receivedEntry = contentReceived[index];
    const differs =
      sentEntry !== undefined && receivedEntry !== undefined
        ? !areUsjContentsEqualExceptWhitespace(
            wrapSingleUsjEntry(sentEntry),
            wrapSingleUsjEntry(receivedEntry),
          )
        : sentEntry !== receivedEntry;
    if (differs) return { index, sentEntry, receivedEntry };
  }
  return undefined;
}

/**
 * Whether two divergences describe the SAME loss — both sides equal under the same
 * whitespace-insignificant comparison that detected them. This is what lets a caller warn once per
 * distinct divergence rather than once per re-delivery of the same one. The index deliberately does
 * NOT participate: the same loss shifting to a different entry index (an edit elsewhere in the
 * chapter) is still the same loss, and re-warning for it would be noise.
 */
export function areUsjContentDivergencesEquivalent(
  a: UsjContentDivergence | undefined,
  b: UsjContentDivergence | undefined,
): boolean {
  if (!a || !b) return false;
  return (
    areUsjContentsEqualExceptWhitespace(
      wrapSingleUsjEntry(a.sentEntry),
      wrapSingleUsjEntry(b.sentEntry),
    ) &&
    areUsjContentsEqualExceptWhitespace(
      wrapSingleUsjEntry(a.receivedEntry),
      wrapSingleUsjEntry(b.receivedEntry),
    )
  );
}

/**
 * Best-effort, BOUNDED description of a divergence — for a diagnostic log line, never a full
 * document dump. Each side is truncated so a large chapter cannot flood the log.
 */
export function describeUsjContentDivergence(
  divergence: UsjContentDivergence | undefined,
): string {
  const MAX_SNIPPET_LENGTH = 200;
  const truncate = (entry: Usj['content'][number] | undefined): string => {
    if (entry === undefined) return '(absent)';
    const text = JSON.stringify(entry);
    return text.length > MAX_SNIPPET_LENGTH ? `${text.slice(0, MAX_SNIPPET_LENGTH)}…` : text;
  };
  if (!divergence) {
    return 'documents differ outside top-level content (or in whitespace-insignificant fields only)';
  }
  return `content[${divergence.index}]: sent ${truncate(divergence.sentEntry)} vs received ${truncate(divergence.receivedEntry)}`;
}

/**
 * The two diverging entries in full, for the ONE warning a given divergence ever produces. The
 * bounded summary above is what a repeated line should carry; a defect that fires once needs enough
 * bytes to attribute — the divergences this catches are single-character whitespace shifts inside a
 * span, which a 200-character truncation can hide entirely.
 */
export function describeUsjContentDivergenceInFull(
  divergence: UsjContentDivergence | undefined,
): string {
  if (!divergence) return '';
  return (
    `\nFull sent entry: ${JSON.stringify(divergence.sentEntry)}` +
    `\nFull received entry: ${JSON.stringify(divergence.receivedEntry)}`
  );
}

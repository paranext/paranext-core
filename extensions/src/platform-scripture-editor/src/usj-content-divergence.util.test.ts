import { describe, it, expect } from 'vitest';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  areUsjContentDivergencesEquivalent,
  describeUsjContentDivergence,
  describeUsjContentDivergenceInFull,
  detectUsjContentDivergence,
} from './usj-content-divergence.util';

/** A one-paragraph chapter whose paragraph content is `paraContent`. */
function usjWithParaContent(paraContent: Usj['content']): Usj {
  return {
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'chapter', marker: 'c', number: '1' },
      { type: 'para', marker: 'p', content: paraContent },
    ],
  };
}

describe('detectUsjContentDivergence', () => {
  it('returns undefined for identical documents', () => {
    const usj = usjWithParaContent(['holy word text']);

    expect(detectUsjContentDivergence(usj, structuredClone(usj))).toBeUndefined();
  });

  it('returns undefined when the documents differ only in insignificant whitespace', () => {
    const sent = usjWithParaContent(['holy  word text']);
    const received = usjWithParaContent(['holy word text']);

    expect(detectUsjContentDivergence(sent, received)).toBeUndefined();
  });

  it('names the entry index and carries both values when one nested text differs', () => {
    const sent = usjWithParaContent(['holy word text']);
    const received = usjWithParaContent([
      'holy ',
      { type: 'char', marker: 'nd', content: ['word'] },
      ' text',
    ]);

    const divergence = detectUsjContentDivergence(sent, received);

    // The walk is deliberately top-level only, so a difference nested inside the paragraph is
    // reported as the PARAGRAPH diverging — enough to say which entry to look at, and bounded.
    expect(divergence?.index).toBe(1);
    expect(divergence?.sentEntry).toEqual({ type: 'para', marker: 'p', content: ['holy word text'] });
    expect(divergence?.receivedEntry).toEqual({
      type: 'para',
      marker: 'p',
      content: ['holy ', { type: 'char', marker: 'nd', content: ['word'] }, ' text'],
    });
  });

  it('reports the FIRST diverging entry when several differ', () => {
    const sent = usjWithParaContent(['first']);
    sent.content.push({ type: 'para', marker: 'p', content: ['second'] });
    const received = usjWithParaContent(['CHANGED']);
    received.content.push({ type: 'para', marker: 'p', content: ['ALSO CHANGED'] });

    expect(detectUsjContentDivergence(sent, received)?.index).toBe(1);
  });

  it('reports an entry one side is missing entirely', () => {
    const sent = usjWithParaContent(['text']);
    const received = usjWithParaContent(['text']);
    received.content.pop();

    const divergence = detectUsjContentDivergence(sent, received);

    expect(divergence?.index).toBe(1);
    expect(divergence?.receivedEntry).toBeUndefined();
    expect(divergence?.sentEntry).toBeDefined();
  });

  it('treats absent documents as empty', () => {
    expect(detectUsjContentDivergence(undefined, undefined)).toBeUndefined();
    expect(detectUsjContentDivergence(usjWithParaContent(['text']), undefined)?.index).toBe(0);
  });
});

describe('areUsjContentDivergencesEquivalent', () => {
  const sent = usjWithParaContent(['holy word text']);
  const received = usjWithParaContent(['holy other text']);

  it('is true for the same divergence detected twice', () => {
    const first = detectUsjContentDivergence(sent, received);
    const second = detectUsjContentDivergence(structuredClone(sent), structuredClone(received));

    expect(areUsjContentDivergencesEquivalent(first, second)).toBe(true);
  });

  it('ignores insignificant whitespace, so a re-delivery of the same loss is not a new one', () => {
    const first = detectUsjContentDivergence(sent, received);
    const second = detectUsjContentDivergence(
      usjWithParaContent(['holy  word text']),
      usjWithParaContent(['holy  other text']),
    );

    expect(areUsjContentDivergencesEquivalent(first, second)).toBe(true);
  });

  it('is false for a divergence at a different value', () => {
    const first = detectUsjContentDivergence(sent, received);
    const second = detectUsjContentDivergence(sent, usjWithParaContent(['holy third text']));

    expect(areUsjContentDivergencesEquivalent(first, second)).toBe(false);
  });
});

describe('describeUsjContentDivergence', () => {
  it('names the index and both sides', () => {
    const divergence = detectUsjContentDivergence(
      usjWithParaContent(['sent text']),
      usjWithParaContent(['received text']),
    );

    const description = describeUsjContentDivergence(divergence);

    expect(description).toContain('content[1]');
    expect(description).toContain('sent text');
    expect(description).toContain('received text');
  });

  it('truncates a large entry so one chapter cannot flood the log', () => {
    const divergence = detectUsjContentDivergence(
      usjWithParaContent(['x'.repeat(5000)]),
      usjWithParaContent(['y'.repeat(5000)]),
    );

    const description = describeUsjContentDivergence(divergence);

    expect(description).toContain('…');
    expect(description.length).toBeLessThan(600);
  });

  it('describes an absent side rather than printing undefined', () => {
    const sent = usjWithParaContent(['text']);
    const received = usjWithParaContent(['text']);
    received.content.pop();

    expect(describeUsjContentDivergence(detectUsjContentDivergence(sent, received))).toContain(
      '(absent)',
    );
  });

  it('falls back to a plain statement when there is no divergence', () => {
    expect(describeUsjContentDivergence(undefined)).toContain('outside top-level content');
  });
});

describe('describeUsjContentDivergenceInFull', () => {
  it('prints both entries untruncated', () => {
    const divergence = detectUsjContentDivergence(
      usjWithParaContent(['z'.repeat(1000)]),
      usjWithParaContent(['received text']),
    );

    const description = describeUsjContentDivergenceInFull(divergence);

    expect(description).toContain('Full sent entry:');
    expect(description).toContain('Full received entry:');
    expect(description).toContain('z'.repeat(1000));
  });

  it('is empty when there is no divergence, so it appends nothing to a message', () => {
    expect(describeUsjContentDivergenceInFull(undefined)).toBe('');
  });
});

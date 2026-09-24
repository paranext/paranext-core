import { describe, it, expect } from 'vitest';
import {
  filterGlosses,
  presentTooltip,
  PHRASE_POS_RAW,
  stripGlossBraces,
  type TooltipDataInput,
} from './tooltip-presenter';

describe('stripGlossBraces', () => {
  it('strips a single brace block', () => {
    expect(stripGlossBraces('to create {qal}')).toBe('to create ');
  });
  it('strips multiple brace blocks', () => {
    expect(stripGlossBraces('to create {qal} the {divine} world')).toBe('to create  the  world');
  });
  it('returns input unchanged when no braces', () => {
    expect(stripGlossBraces('beginning, first')).toBe('beginning, first');
  });
  it('handles empty string', () => {
    expect(stripGlossBraces('')).toBe('');
  });
});

describe('filterGlosses', () => {
  it('strips braces from each gloss and trims', () => {
    expect(filterGlosses(['to create {qal}', 'shape {pi}'])).toEqual(['to create', 'shape']);
  });
  it('drops glosses that are empty after filtering', () => {
    expect(filterGlosses(['{annotation-only}', '  ', 'real gloss'])).toEqual(['real gloss']);
  });
  it('preserves order', () => {
    expect(filterGlosses(['c', 'a', 'b'])).toEqual(['c', 'a', 'b']);
  });
  it('returns empty array for empty input', () => {
    expect(filterGlosses([])).toEqual([]);
  });
});

describe('presentTooltip', () => {
  const baseInput: TooltipDataInput = {
    sourceForm: 'רֵאשִׁית',
    lemma: 'rēʾšît',
    partOfSpeechRaw: 'noun',
    rawGlosses: ['beginning, first, chief'],
  };

  it('emits phrase kind when partOfSpeechRaw is PHRASE_POS_RAW', () => {
    const result = presentTooltip({ ...baseInput, partOfSpeechRaw: PHRASE_POS_RAW });
    expect(result).toEqual({ kind: 'phrase', sourceForm: 'רֵאשִׁית' });
  });

  it('emits word kind for non-phrase POS', () => {
    const result = presentTooltip(baseInput);
    expect(result.kind).toBe('word');
  });

  it('selects the first filtered gloss', () => {
    const result = presentTooltip({
      ...baseInput,
      rawGlosses: ['{tagged-only}', 'beginning', 'first'],
    });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.gloss).toBe('beginning');
  });

  it('returns undefined gloss when rawGlosses is empty', () => {
    const result = presentTooltip({ ...baseInput, rawGlosses: [] });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.gloss).toBeUndefined();
  });

  it('returns undefined gloss when all rawGlosses are brace-only', () => {
    const result = presentTooltip({ ...baseInput, rawGlosses: ['{a}', '{b}'] });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.gloss).toBeUndefined();
  });

  it('passes posRaw through unchanged', () => {
    const result = presentTooltip(baseInput);
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.posRaw).toBe('noun');
  });

  it('uses localizePartOfSpeech helper when provided', () => {
    const result = presentTooltip(baseInput, {
      localizePartOfSpeech: (pos) => (pos === 'noun' ? 'noun (feminine)' : undefined),
    });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.posLocalized).toBe('noun (feminine)');
  });

  it('leaves posLocalized undefined when no helper', () => {
    const result = presentTooltip(baseInput);
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.posLocalized).toBeUndefined();
  });

  it('leaves posLocalized undefined when helper returns undefined', () => {
    const result = presentTooltip(baseInput, { localizePartOfSpeech: () => undefined });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.posLocalized).toBeUndefined();
  });

  it('passes lemma through unchanged', () => {
    const result = presentTooltip(baseInput);
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.lemma).toBe('rēʾšît');
  });

  it('passes sourceForm through unchanged for word kind', () => {
    const result = presentTooltip(baseInput);
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.sourceForm).toBe('רֵאשִׁית');
  });

  it('passes renderingStatus through unchanged', () => {
    const status = {
      code: 'renderingFound' as const,
      foundRendering: 'beginning',
      trackedProjectName: 'ESV',
    };
    const result = presentTooltip({ ...baseInput, renderingStatus: status });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.renderingStatus).toEqual(status);
  });

  it('leaves renderingStatus undefined when input has no status', () => {
    const result = presentTooltip(baseInput);
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.renderingStatus).toBeUndefined();
  });

  it.each([
    'noRenderingsEntered',
    'renderingDeniedInVerse',
    'renderingMissingInVerse',
    'noVerseText',
    'guessedRenderingFound',
    'renderingFound',
  ] as const)('passes through %s rendering-status code', (code) => {
    const result = presentTooltip({
      ...baseInput,
      renderingStatus: { code, trackedProjectName: 'ESV' },
    });
    if (result.kind !== 'word') throw new Error('expected word');
    expect(result.renderingStatus?.code).toBe(code);
  });
});

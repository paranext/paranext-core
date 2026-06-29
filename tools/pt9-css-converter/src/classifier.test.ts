import { describe, expect, test } from 'vitest';
import { classify, mirrorRtl } from './classifier';

describe('classify', () => {
  test('routes typography properties to formatted-font', () => {
    expect(classify({ property: 'color', value: '#003380' }).bucket).toBe('typography');
    expect(classify({ property: 'font-family', value: '"Charis SIL"' }).bucket).toBe('typography');
    expect(classify({ property: 'font-size', value: '100%' }).bucket).toBe('typography');
    expect(classify({ property: 'font-style', value: 'italic' }).bucket).toBe('typography');
    expect(classify({ property: 'font-variant', value: 'small-caps' }).bucket).toBe('typography');
    expect(classify({ property: 'font-weight', value: 'bold' }).bucket).toBe('typography');
    expect(classify({ property: 'text-decoration', value: 'underline' }).bucket).toBe('typography');
    expect(classify({ property: 'vertical-align', value: 'text-top' }).bucket).toBe('typography');
  });

  test('routes layout properties to non-directional .text-spacing', () => {
    expect(classify({ property: 'line-height', value: '1.2' }).bucket).toBe('non-directional');
    expect(classify({ property: 'margin-top', value: '8pt' }).bucket).toBe('non-directional');
    expect(classify({ property: 'margin-bottom', value: '4pt' }).bucket).toBe('non-directional');
    expect(classify({ property: 'padding-top', value: '2pt' }).bucket).toBe('non-directional');
    expect(classify({ property: 'padding-bottom', value: '2pt' }).bucket).toBe('non-directional');
    expect(classify({ property: 'text-indent', value: '1em' }).bucket).toBe('non-directional');
    expect(classify({ property: 'white-space', value: 'nowrap' }).bucket).toBe('non-directional');
  });

  test('routes text-align to non-directional regardless of value', () => {
    expect(classify({ property: 'text-align', value: 'left' }).bucket).toBe('non-directional');
    expect(classify({ property: 'text-align', value: 'right' }).bucket).toBe('non-directional');
    expect(classify({ property: 'text-align', value: 'center' }).bucket).toBe('non-directional');
    expect(classify({ property: 'text-align', value: 'justify' }).bucket).toBe('non-directional');
  });

  test('routes horizontal-edge spacing to directional', () => {
    expect(classify({ property: 'margin-left', value: '10pt' }).bucket).toBe('directional');
    expect(classify({ property: 'margin-right', value: '10pt' }).bucket).toBe('directional');
    expect(classify({ property: 'padding-left', value: '5pt' }).bucket).toBe('directional');
    expect(classify({ property: 'padding-right', value: '5pt' }).bucket).toBe('directional');
  });

  test.each([
    ['background-color'],
    ['border-left'],
    ['clear'],
    ['display'],
    ['float'],
    ['letter-spacing'],
    ['text-transform'],
    ['unicode-bidi'],
  ])('flags %s as unknown and routes it to typography', (property) => {
    const result = classify({ property, value: 'anything' });

    expect(result.bucket).toBe('typography');
    expect(result.unknown).toBe(true);
  });

  test('is case-insensitive on property names', () => {
    expect(classify({ property: 'MARGIN-LEFT', value: '1pt' }).bucket).toBe('directional');
    expect(classify({ property: 'Color', value: 'red' }).bucket).toBe('typography');
    expect(classify({ property: 'Text-Align', value: 'center' }).bucket).toBe('non-directional');
  });
});

describe('mirrorRtl', () => {
  test('swaps left and right horizontal-edge properties', () => {
    expect(mirrorRtl({ property: 'margin-left', value: '10pt' })).toEqual({
      property: 'margin-right',
      value: '10pt',
    });
    expect(mirrorRtl({ property: 'margin-right', value: '10pt' })).toEqual({
      property: 'margin-left',
      value: '10pt',
    });
    expect(mirrorRtl({ property: 'padding-left', value: '5pt' })).toEqual({
      property: 'padding-right',
      value: '5pt',
    });
    expect(mirrorRtl({ property: 'padding-right', value: '5pt' })).toEqual({
      property: 'padding-left',
      value: '5pt',
    });
  });

  test('returns the input unchanged for non-directional properties', () => {
    expect(mirrorRtl({ property: 'margin-top', value: '8pt' })).toEqual({
      property: 'margin-top',
      value: '8pt',
    });
    expect(mirrorRtl({ property: 'text-align', value: 'left' })).toEqual({
      property: 'text-align',
      value: 'left',
    });
  });
});

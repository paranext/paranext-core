import { describe, expect, test } from 'vitest';
import { convert } from './convert';

const FIXED_DATE = new Date('2026-06-22T00:00:00.000Z');

describe('convert', () => {
  test('emits typography block under .formatted-font for plain marker', () => {
    const css = `.usfm_id { font-size: 100%; color: #003380; }`;

    const { scss, markerCount } = convert(css, { generatedAt: FIXED_DATE });

    expect(markerCount).toBe(1);
    expect(scss).toContain('.formatted-font .usfm_id {');
    expect(scss).toContain('font-size: 100%;');
    expect(scss).toContain('color: #003380;');
    expect(scss).not.toContain('.text-spacing');
  });

  test('emits non-directional layout block under .text-spacing', () => {
    const css = `.usfm_imt { margin-top: 8pt; margin-bottom: 4pt; text-align: center; }`;

    const { scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(scss).toContain('.text-spacing .usfm_imt {');
    expect(scss).toContain('margin-top: 8pt;');
    expect(scss).toContain('margin-bottom: 4pt;');
    expect(scss).toContain('text-align: center;');
  });

  test("emits directional block under both [dir='ltr'] and mirrored [dir='rtl']", () => {
    const css = `.usfm_q { margin-left: 10pt; padding-right: 5pt; }`;

    const { scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(scss).toContain(".text-spacing[dir='ltr'] .usfm_q {");
    expect(scss).toContain('margin-left: 10pt;');
    expect(scss).toContain('padding-right: 5pt;');
    expect(scss).toContain(".text-spacing[dir='rtl'] .usfm_q {");
    expect(scss).toMatch(
      /\[dir='rtl'\] \.usfm_q \{[^}]*margin-right: 10pt;[^}]*padding-left: 5pt;/,
    );
  });

  test('keeps text-align in non-directional regardless of value (no [dir] block)', () => {
    const css = `.usfm_id { text-align: left; }`;

    const { scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(scss).toContain('.text-spacing .usfm_id {');
    expect(scss).toContain('text-align: left;');
    expect(scss).not.toContain("[dir='ltr']");
    expect(scss).not.toContain("[dir='rtl']");
  });

  test('splits a mixed-property rule across all three buckets', () => {
    const css = `.usfm_toc1 {
      font-weight: bold;
      color: #004C00;
      margin-top: 8pt;
      text-align: left;
      margin-left: 20pt;
    }`;

    const { scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(scss).toMatch(
      /\.formatted-font \.usfm_toc1 \{[^}]*font-weight: bold;[^}]*color: #004C00;/,
    );
    expect(scss).toMatch(
      /\.text-spacing \.usfm_toc1 \{[^}]*margin-top: 8pt;[^}]*text-align: left;/,
    );
    expect(scss).toMatch(/\.text-spacing\[dir='ltr'\] \.usfm_toc1 \{[^}]*margin-left: 20pt;/);
    expect(scss).toMatch(/\.text-spacing\[dir='rtl'\] \.usfm_toc1 \{[^}]*margin-right: 20pt;/);
  });

  test('strips @font-face rules', () => {
    const css = `
      @font-face { font-family: 'Charis SIL'; src: local('Charis SIL'); }
      .usfm_id { font-size: 100%; }
    `;

    const { scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(scss).not.toContain('@font-face');
    expect(scss).not.toContain('Charis SIL');
    expect(scss).toContain('.formatted-font .usfm_id');
  });

  test('skips table markers and records them as warnings', () => {
    const css = `
      .usfm_tr { font-size: 100%; }
      .usfm_tc1 { font-size: 100%; }
      .usfm_th2 { font-size: 100%; }
      .usfm_id { font-size: 100%; }
    `;

    const { scss, warnings, markerCount } = convert(css, { generatedAt: FIXED_DATE });

    expect(markerCount).toBe(1);
    expect(warnings.skippedTableMarkers).toEqual(['tr', 'tc1', 'th2']);
    expect(scss).not.toContain('.usfm_tr');
    expect(scss).not.toContain('.usfm_tc1');
    expect(scss).not.toContain('.usfm_th2');
    expect(scss).toContain('.usfm_id');
    expect(scss).toContain('Skipped table markers: tr, tc1, th2');
  });

  test('skips non-marker selectors including pseudo-elements', () => {
    const css = `
      body { font-family: sans-serif; }
      body::before { content: ""; }
      .usfm { font-size: 12pt; }
      .leadingFloat { float: left; }
      .usfm_id:hover { color: red; }
      .usfm_id { font-size: 100%; }
    `;

    const { warnings, scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(warnings.skippedSelectors).toContain('body');
    expect(warnings.skippedSelectors).toContain('body::before');
    expect(warnings.skippedSelectors).toContain('.usfm');
    expect(warnings.skippedSelectors).toContain('.leadingFloat');
    expect(warnings.skippedSelectors).toContain('.usfm_id:hover');
    expect(scss).toContain('.formatted-font .usfm_id');
    expect(scss).not.toMatch(/\.usfm_id:hover\s*\{/);
  });

  test('records unknown properties in the header and defaults them to typography', () => {
    const css = `.usfm_id { background-color: yellow; font-size: 100%; }`;

    const { scss, warnings } = convert(css, { generatedAt: FIXED_DATE });

    expect(warnings.unknownProperties).toEqual(['background-color']);
    expect(scss).toContain('Unknown properties (defaulted to typography): background-color');
    expect(scss).toMatch(/\.formatted-font \.usfm_id \{[^}]*background-color: yellow;/);
  });

  test('flags markers that appear more than once and merges their declarations', () => {
    const css = `
      .usfm_id { font-size: 100%; }
      .usfm_id { color: #003380; }
    `;

    const { warnings, scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(warnings.duplicateMarkers).toEqual(['id']);
    expect(scss).toMatch(/\.formatted-font \.usfm_id \{[^}]*font-size: 100%;[^}]*color: #003380;/);
  });

  test('flags markers also styled in base _usj-nodes.scss when baseScss is provided', () => {
    const baseScss = `
      .formatted-font .usfm_id { font-size: 100%; }
      .formatted-font .usfm_c { font-weight: bold; }
      .text-spacing .usfm_c { margin-top: 8pt; }
    `;
    const css = `
      .usfm_id { font-size: 100%; }
      .usfm_imt { font-weight: bold; }
      .usfm_c { color: red; }
    `;

    const { warnings, scss } = convert(css, { generatedAt: FIXED_DATE, baseScss });

    expect(warnings.baseOverlapMarkers).toEqual(['id', 'c']);
    expect(scss).toContain('Markers also styled in base _usj-nodes.scss (cascade-resolved): id, c');
  });

  test('does not emit base-overlap warning when baseScss is not provided', () => {
    const css = `.usfm_id { font-size: 100%; }`;

    const { warnings, scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(warnings.baseOverlapMarkers).toEqual([]);
    expect(scss).not.toContain('Markers also styled in base');
  });

  test('includes source path and timestamp in the header comment when provided', () => {
    const css = `.usfm_id { font-size: 100%; }`;

    const { scss } = convert(css, {
      source: 'data/pt9-css/hbkeng.css',
      generatedAt: FIXED_DATE,
    });

    expect(scss).toContain('Source: data/pt9-css/hbkeng.css');
    expect(scss).toContain('Generated at: 2026-06-22T00:00:00.000Z');
    expect(scss).toContain('Markers: 1');
  });

  test('does not emit a directional block when no directional declarations exist', () => {
    const css = `.usfm_id { font-size: 100%; }`;

    const { scss } = convert(css, { generatedAt: FIXED_DATE });

    expect(scss).not.toContain("[dir='ltr']");
    expect(scss).not.toContain("[dir='rtl']");
  });
});

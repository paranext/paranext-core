import { describe, it, expect } from 'vitest';
import { convert } from './convert';
import { auditScss, parseGeneratedHeader } from './audit';

const FIXED = new Date('2026-06-29T00:00:00.000Z');
const SAMPLE_CSS = '.usfm_p { color: #FF0000; text-align: left; }\n.usfm_q { font-size: 90%; }\n';
const BASE = '.formatted-font .usfm_p { color: #000; }\n';

describe('parseGeneratedHeader', () => {
  it('extracts the source and generated-at timestamp from a generated header', () => {
    const { scss } = convert(SAMPLE_CSS, { source: 'data/pt9-css/x.css', generatedAt: FIXED });
    const header = parseGeneratedHeader(scss);
    expect(header.source).toBe('data/pt9-css/x.css');
    expect(header.generatedAt?.toISOString()).toBe(FIXED.toISOString());
  });
});

describe('auditScss', () => {
  it('reports in-sync when the committed SCSS is exactly what the converter produces', () => {
    const { scss: committed } = convert(SAMPLE_CSS, {
      source: 'data/pt9-css/x.css',
      generatedAt: FIXED,
      baseScss: BASE,
    });
    expect(auditScss(committed, SAMPLE_CSS, { baseScss: BASE }).inSync).toBe(true);
  });

  it('re-derives the timestamp from the committed header rather than stamping a fresh one', () => {
    // If the audit stamped `new Date()`, the header line would differ and this would be a false drift.
    const { scss: committed } = convert(SAMPLE_CSS, {
      source: 'data/pt9-css/x.css',
      generatedAt: FIXED,
    });
    expect(auditScss(committed, SAMPLE_CSS).inSync).toBe(true);
  });

  it('detects drift when the committed SCSS body has been hand-edited', () => {
    const { scss: committed } = convert(SAMPLE_CSS, {
      source: 'data/pt9-css/x.css',
      generatedAt: FIXED,
      baseScss: BASE,
    });
    const tampered = committed.replace('color: #ff0000', 'color: #00ff00');
    expect(auditScss(tampered, SAMPLE_CSS, { baseScss: BASE }).inSync).toBe(false);
  });

  it('detects drift when the source CSS no longer produces the committed SCSS', () => {
    const { scss: committed } = convert(SAMPLE_CSS, {
      source: 'data/pt9-css/x.css',
      generatedAt: FIXED,
      baseScss: BASE,
    });
    const changedCss = SAMPLE_CSS.replace('#FF0000', '#0000FF');
    expect(auditScss(committed, changedCss, { baseScss: BASE }).inSync).toBe(false);
  });
});

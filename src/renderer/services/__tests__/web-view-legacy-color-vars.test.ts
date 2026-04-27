import { describe, expect, it } from 'vitest';
import { transformLegacyColorVars } from '../web-view-legacy-color-vars';

const TOKENS = new Set(['background', 'foreground', 'ring', 'card-foreground', 'border']);

describe('transformLegacyColorVars', () => {
  describe('pass 3 — plain hsl(var(--TOKEN))', () => {
    it('transforms a single occurrence', () => {
      const { text, replacements } = transformLegacyColorVars(
        'color: hsl(var(--background));',
        TOKENS,
      );
      expect(text).toBe('color: var(--background);');
      expect(replacements).toHaveLength(1);
      expect(replacements[0]).toMatchObject({
        original: 'hsl(var(--background))',
        replacement: 'var(--background)',
        count: 1,
      });
    });

    it('counts multiple identical occurrences as one entry with count > 1', () => {
      const { text, replacements } = transformLegacyColorVars(
        'color: hsl(var(--background)); background: hsl(var(--background));',
        TOKENS,
      );
      expect(text).toBe('color: var(--background); background: var(--background);');
      expect(replacements).toHaveLength(1);
      expect(replacements[0].count).toBe(2);
    });

    it('transforms hyphenated token names', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--card-foreground));', TOKENS);
      expect(text).toBe('color: var(--card-foreground);');
    });

    it('does not transform unknown custom variables', () => {
      const { text, replacements } = transformLegacyColorVars(
        'color: hsl(var(--my-custom-color));',
        TOKENS,
      );
      expect(text).toBe('color: hsl(var(--my-custom-color));');
      expect(replacements).toHaveLength(0);
    });

    it('matches longer tokens before shorter prefix tokens', () => {
      const tokens = new Set(['card', 'card-foreground']);
      const { text } = transformLegacyColorVars('color: hsl(var(--card-foreground));', tokens);
      expect(text).toBe('color: var(--card-foreground);');
    });
  });

  describe('pass 1 — hsla(var(--TOKEN), alpha)', () => {
    it('transforms decimal alpha to percentage', () => {
      const { text, replacements } = transformLegacyColorVars(
        'outline: hsla(var(--ring), 0.5);',
        TOKENS,
      );
      expect(text).toBe('outline: color-mix(in oklab, var(--ring) 50%, transparent);');
      expect(replacements[0]).toMatchObject({
        original: 'hsla(var(--ring), 0.5)',
        replacement: 'color-mix(in oklab, var(--ring) 50%, transparent)',
        count: 1,
      });
    });

    it('accepts whitespace after the comma', () => {
      const { text } = transformLegacyColorVars('color: hsla(var(--border),  0.3);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--border) 30%, transparent);');
    });

    it('handles alpha of 1 (fully opaque)', () => {
      const { text } = transformLegacyColorVars('color: hsla(var(--foreground), 1);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--foreground) 100%, transparent);');
    });

    it('handles alpha of 0 (fully transparent)', () => {
      const { text } = transformLegacyColorVars('color: hsla(var(--foreground), 0);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--foreground) 0%, transparent);');
    });
  });

  describe('pass 2 — hsl(var(--TOKEN) / alpha)', () => {
    it('transforms decimal alpha to percentage', () => {
      const { text, replacements } = transformLegacyColorVars(
        'outline-color: hsl(var(--ring) / 0.5);',
        TOKENS,
      );
      expect(text).toBe('outline-color: color-mix(in oklab, var(--ring) 50%, transparent);');
      expect(replacements[0]).toMatchObject({
        original: 'hsl(var(--ring) / 0.5)',
        replacement: 'color-mix(in oklab, var(--ring) 50%, transparent)',
        count: 1,
      });
    });

    it('accepts a percentage alpha directly', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--ring) / 50%);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--ring) 50%, transparent);');
    });

    it('accepts no whitespace around the slash', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--ring)/0.2);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--ring) 20%, transparent);');
    });
  });

  describe('pass ordering — alpha passes run before plain pass', () => {
    it('does not strip alpha from hsl(var(--X) / alpha) — must become color-mix not var()', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--ring) / 0.5);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--ring) 50%, transparent);');
      expect(text).not.toContain('hsl(');
    });
  });

  describe('return shape', () => {
    it('returns passTimesMs as a 3-tuple of non-negative numbers', () => {
      const { passTimesMs } = transformLegacyColorVars('color: hsl(var(--background));', TOKENS);
      expect(passTimesMs).toHaveLength(3);
      passTimesMs.forEach((t) => expect(t).toBeGreaterThanOrEqual(0));
    });

    it('returns empty replacements and original text when nothing matches', () => {
      const original = 'color: red;';
      const { text, replacements } = transformLegacyColorVars(original, TOKENS);
      expect(text).toBe(original);
      expect(replacements).toHaveLength(0);
    });

    it('returns original text unchanged when tokenNames is empty', () => {
      const original = 'color: hsl(var(--background));';
      const { text, replacements } = transformLegacyColorVars(original, new Set());
      expect(text).toBe(original);
      expect(replacements).toHaveLength(0);
    });
  });

  describe('mixed content (JS bundle strings)', () => {
    it('transforms hsl patterns inside a JavaScript string literal', () => {
      const { text } = transformLegacyColorVars(
        "const style = { background: 'hsl(var(--background))' };",
        TOKENS,
      );
      expect(text).toBe("const style = { background: 'var(--background)' };");
    });
  });
});

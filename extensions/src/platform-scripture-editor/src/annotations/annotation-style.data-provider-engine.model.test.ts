import type { AnnotationStyleProperties } from 'platform-scripture-editor';
import { AnnotationStyleDataProviderEngine } from './annotation-style.data-provider-engine.model';

/** The stylesheet the engine builds for one style registered as `check`. */
async function stylesheetFor(properties: AnnotationStyleProperties): Promise<string> {
  const engine = new AnnotationStyleDataProviderEngine();
  await engine.registerAnnotationStyle('check', properties);
  return engine.getAnnotationStylesheet();
}

const BASE = '.editor-typed-mark-external-check';
const NOT_START = `${BASE}:not(.editor-typed-markStart-external-check)`;
const NOT_END = `${BASE}:not(.editor-typed-markEnd-external-check)`;

/** One CSS rule as the engine writes it. */
function rule(selector: string, ...declarations: string[]): string {
  return `${selector} {\n${declarations.map((d) => `  ${d};`).join('\n')}\n}`;
}

describe('AnnotationStyleDataProviderEngine stylesheet', () => {
  it('keeps a border and radius whole on the base and removes the inline sides elsewhere', async () => {
    expect(
      await stylesheetFor({
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        border: '1px solid red',
        borderRadius: '4px',
      }),
    ).toBe(
      [
        rule(
          BASE,
          'background-color: rgba(255, 0, 0, 0.1)',
          'border: 1px solid red',
          'border-radius: 4px',
        ),
        rule(
          NOT_START,
          'border-inline-start: none',
          'border-start-start-radius: 0',
          'border-end-start-radius: 0',
        ),
        rule(
          NOT_END,
          'border-inline-end: none',
          'border-start-end-radius: 0',
          'border-end-end-radius: 0',
        ),
      ].join('\n\n'),
    );
  });

  it('keeps one- and two-value padding and margin whole and removes their inline sides', async () => {
    expect(await stylesheetFor({ padding: '1px 4px', margin: '2px' })).toBe(
      [
        rule(BASE, 'padding: 1px 4px', 'margin: 2px'),
        rule(NOT_START, 'padding-inline-start: 0', 'margin-inline-start: 0'),
        rule(NOT_END, 'padding-inline-end: 0', 'margin-inline-end: 0'),
      ].join('\n\n'),
    );
  });

  it('handles three- and four-value padding and margin', async () => {
    expect(await stylesheetFor({ padding: '1px 2px 3px', margin: '1px 2px 3px 4px' })).toBe(
      [
        rule(BASE, 'padding: 1px 2px 3px', 'margin: 1px 2px 3px 4px'),
        rule(NOT_START, 'padding-inline-start: 0', 'margin-inline-start: 0'),
        rule(NOT_END, 'padding-inline-end: 0', 'margin-inline-end: 0'),
      ].join('\n\n'),
    );
  });

  it('handles a var() holding several values and a var() beside another value', async () => {
    expect(
      await stylesheetFor({
        padding: 'var(--gap)',
        margin: '1px var(--gap)',
        borderRadius: 'var(--r)',
      }),
    ).toBe(
      [
        rule(BASE, 'padding: var(--gap)', 'margin: 1px var(--gap)', 'border-radius: var(--r)'),
        rule(
          NOT_START,
          'padding-inline-start: 0',
          'margin-inline-start: 0',
          'border-start-start-radius: 0',
          'border-end-start-radius: 0',
        ),
        rule(
          NOT_END,
          'padding-inline-end: 0',
          'margin-inline-end: 0',
          'border-start-end-radius: 0',
          'border-end-end-radius: 0',
        ),
      ].join('\n\n'),
    );
  });

  it('handles an elliptical and a several-value radius', async () => {
    expect(await stylesheetFor({ borderRadius: '4px/8px' })).toBe(
      [
        rule(BASE, 'border-radius: 4px/8px'),
        rule(NOT_START, 'border-start-start-radius: 0', 'border-end-start-radius: 0'),
        rule(NOT_END, 'border-start-end-radius: 0', 'border-end-end-radius: 0'),
      ].join('\n\n'),
    );
    expect(await stylesheetFor({ borderRadius: '4px 8px' })).toContain('border-radius: 4px 8px;');
  });

  it('gives an override a priority when the host value has one, spaced or not', async () => {
    expect(
      await stylesheetFor({
        padding: '2px !important',
        margin: '1px 2px!important',
        border: '1px solid red !important',
        borderRadius: '4px !important',
      }),
    ).toBe(
      [
        rule(
          BASE,
          'padding: 2px !important',
          'margin: 1px 2px!important',
          'border: 1px solid red !important',
          'border-radius: 4px !important',
        ),
        rule(
          NOT_START,
          'padding-inline-start: 0 !important',
          'margin-inline-start: 0 !important',
          'border-inline-start: none !important',
          'border-start-start-radius: 0 !important',
          'border-end-start-radius: 0 !important',
        ),
        rule(
          NOT_END,
          'padding-inline-end: 0 !important',
          'margin-inline-end: 0 !important',
          'border-inline-end: none !important',
          'border-start-end-radius: 0 !important',
          'border-end-end-radius: 0 !important',
        ),
      ].join('\n\n'),
    );
  });

  it('gives only the override of an important property a priority', async () => {
    const stylesheet = await stylesheetFor({ padding: '2px !important', margin: '2px' });
    expect(stylesheet).toContain('  padding-inline-start: 0 !important;');
    expect(stylesheet).toContain('  margin-inline-start: 0;');
  });

  it('writes only the base rule for a style with no box property', async () => {
    expect(
      await stylesheetFor({ textDecorationLine: 'underline', textDecorationStyle: 'wavy' }),
    ).toBe(rule(BASE, 'text-decoration-line: underline', 'text-decoration-style: wavy'));
  });

  it('writes an override rule only for the box properties the style sets', async () => {
    const stylesheet = await stylesheetFor({ borderRadius: '2px' });
    expect(stylesheet).not.toContain('padding');
    expect(stylesheet).toContain('border-start-start-radius: 0;');
  });

  it('keeps several registered types from interfering', async () => {
    const engine = new AnnotationStyleDataProviderEngine();
    await engine.registerAnnotationStyle('one', { padding: '1px' });
    await engine.registerAnnotationStyle('two', { color: 'red' });
    await engine.registerAnnotationStyle('thr/ee', { border: '1px solid red' });
    const stylesheet = await engine.getAnnotationStylesheet();
    expect(stylesheet).toContain(
      '.editor-typed-mark-external-one:not(.editor-typed-markStart-external-one) {\n' +
        '  padding-inline-start: 0;',
    );
    expect(stylesheet).toContain('.editor-typed-mark-external-two {\n  color: red;\n}');
    expect(stylesheet).not.toContain('external-two:not');
    expect(stylesheet).toContain(
      '.editor-typed-mark-external-thr-ee:not(.editor-typed-markEnd-external-thr-ee) {\n' +
        '  border-inline-end: none;',
    );
    expect(stylesheet).not.toContain('external-one {\n  border');
  });
});

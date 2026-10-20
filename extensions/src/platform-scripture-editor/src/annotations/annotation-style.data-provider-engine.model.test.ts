import type { AnnotationStyleProperties } from 'platform-scripture-editor';
import { AnnotationStyleDataProviderEngine } from './annotation-style.data-provider-engine.model';

/** The stylesheet the engine builds for one style registered as `check`. */
async function stylesheetFor(properties: AnnotationStyleProperties): Promise<string> {
  const engine = new AnnotationStyleDataProviderEngine();
  await engine.registerAnnotationStyle('check', properties);
  return engine.getAnnotationStylesheet();
}

describe('AnnotationStyleDataProviderEngine stylesheet', () => {
  it('splits a border and a one-value radius across the first, every and last element', async () => {
    expect(
      await stylesheetFor({
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        border: '1px solid red',
        borderRadius: '4px',
      }),
    ).toBe(
      [
        '.editor-typed-mark-external-check {\n' +
          '  background-color: rgba(255, 0, 0, 0.1);\n' +
          '  border-block: 1px solid red;\n' +
          '}',
        '.editor-typed-markStart-external-check {\n' +
          '  border-inline-start: 1px solid red;\n' +
          '  border-start-start-radius: 4px;\n' +
          '  border-end-start-radius: 4px;\n' +
          '}',
        '.editor-typed-markEnd-external-check {\n' +
          '  border-inline-end: 1px solid red;\n' +
          '  border-start-end-radius: 4px;\n' +
          '  border-end-end-radius: 4px;\n' +
          '}',
      ].join('\n\n'),
    );
  });

  it('splits two-value padding and margin into a block part and inline start and end parts', async () => {
    expect(await stylesheetFor({ padding: '1px 4px', margin: 'var(--gap)' })).toBe(
      [
        '.editor-typed-mark-external-check {\n' +
          '  padding-block: 1px;\n' +
          '  margin-block: var(--gap);\n' +
          '}',
        '.editor-typed-markStart-external-check {\n' +
          '  padding-inline-start: 4px;\n' +
          '  margin-inline-start: var(--gap);\n' +
          '}',
        '.editor-typed-markEnd-external-check {\n' +
          '  padding-inline-end: 4px;\n' +
          '  margin-inline-end: var(--gap);\n' +
          '}',
      ].join('\n\n'),
    );
  });

  it('keeps a parenthesized value whole when splitting a shorthand', async () => {
    const stylesheet = await stylesheetFor({ padding: 'calc(1px + 2px) 4px' });
    expect(stylesheet).toContain('  padding-block: calc(1px + 2px);');
    expect(stylesheet).toContain('  padding-inline-start: 4px;');
  });

  it('keeps three- and four-value padding and margin and a several-value radius on every element', async () => {
    expect(
      await stylesheetFor({
        padding: '1px 2px 3px',
        margin: '1px 2px 3px 4px',
        borderRadius: '4px 8px',
      }),
    ).toBe(
      '.editor-typed-mark-external-check {\n' +
        '  padding: 1px 2px 3px;\n' +
        '  margin: 1px 2px 3px 4px;\n' +
        '  border-radius: 4px 8px;\n' +
        '}',
    );
  });

  it('keeps an elliptical radius on every element', async () => {
    expect(await stylesheetFor({ borderRadius: '4px/8px' })).toBe(
      '.editor-typed-mark-external-check {\n  border-radius: 4px/8px;\n}',
    );
  });

  it('writes no start or end rule for a style with no box property', async () => {
    expect(
      await stylesheetFor({ textDecorationLine: 'underline', textDecorationStyle: 'wavy' }),
    ).toBe(
      '.editor-typed-mark-external-check {\n' +
        '  text-decoration-line: underline;\n' +
        '  text-decoration-style: wavy;\n' +
        '}',
    );
  });

  it('writes only the start and end rules for a style that is only a one-value radius', async () => {
    const stylesheet = await stylesheetFor({ borderRadius: '2px' });
    expect(stylesheet).not.toContain('.editor-typed-mark-external-check {');
    expect(stylesheet).toContain('.editor-typed-markStart-external-check {');
    expect(stylesheet).toContain('.editor-typed-markEnd-external-check {');
  });
});

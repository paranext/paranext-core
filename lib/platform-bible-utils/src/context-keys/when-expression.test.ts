import { ContextKeyValue } from './context-keys.model';
import {
  evaluateWhenExpression,
  getTemplateVarNames,
  parseWhenExpression,
} from './when-expression';

function makeLookup(values: Record<string, ContextKeyValue | undefined>) {
  return (key: string) => values[key];
}

describe('parseWhenExpression', () => {
  it('parses valid expressions without throwing', () => {
    expect(() => parseWhenExpression('a.b')).not.toThrow();
    expect(() => parseWhenExpression('!a.b && (c.d || e.f)')).not.toThrow();
    expect(() => parseWhenExpression("a.b == 'formatted'")).not.toThrow();
    expect(() => parseWhenExpression('a.b != 3')).not.toThrow();
    expect(() => parseWhenExpression('a.{webViewId}.c')).not.toThrow();
    expect(() => parseWhenExpression('true')).not.toThrow();
    expect(() => parseWhenExpression('a.b == c.d')).not.toThrow();
  });

  it('throws on syntax errors', () => {
    expect(() => parseWhenExpression('')).toThrow();
    expect(() => parseWhenExpression('a.b &&')).toThrow();
    expect(() => parseWhenExpression('a.b ==')).toThrow();
    expect(() => parseWhenExpression('(a.b')).toThrow();
    expect(() => parseWhenExpression('a.b || || c.d')).toThrow();
    expect(() => parseWhenExpression("a.b == 'unterminated")).toThrow();
    expect(() => parseWhenExpression('a.b = c.d')).toThrow();
    expect(() => parseWhenExpression('a.b == c.d == e.f')).toThrow();
  });

  it('throws on single-segment property references', () => {
    expect(() => parseWhenExpression('singleSegment')).toThrow();
  });

  it('throws on malformed template var segments', () => {
    expect(() => parseWhenExpression('a.pre{x}post.b')).toThrow();
    expect(() => parseWhenExpression('a.{}.b')).toThrow();
  });

  it('returns the same AST reference from the cache on repeated parses', () => {
    const ast1 = parseWhenExpression('a.b && c.d');
    const ast2 = parseWhenExpression('a.b && c.d');
    expect(ast1).toBe(ast2);
  });
});

describe('getTemplateVarNames', () => {
  it('returns all template variable names used in an expression', () => {
    expect(getTemplateVarNames('a.{webViewId}.b && c.{projectId}.d')).toEqual(
      expect.arrayContaining(['webViewId', 'projectId']),
    );
    expect(getTemplateVarNames('a.b')).toEqual([]);
  });
});

describe('evaluateWhenExpression', () => {
  it('evaluates bare property refs by truthiness', () => {
    expect(evaluateWhenExpression('a.b', makeLookup({ 'a.b': true }), {})).toBe(true);
    expect(evaluateWhenExpression('a.b', makeLookup({ 'a.b': false }), {})).toBe(false);
    expect(evaluateWhenExpression('a.b', makeLookup({}), {})).toBe(false);
    expect(evaluateWhenExpression('a.b', makeLookup({ 'a.b': 0 }), {})).toBe(false);
    expect(evaluateWhenExpression('a.b', makeLookup({ 'a.b': '' }), {})).toBe(false);
    expect(evaluateWhenExpression('a.b', makeLookup({ 'a.b': 'x' }), {})).toBe(true);
  });

  it('evaluates boolean operators with correct precedence', () => {
    const lookup = makeLookup({ 'a.b': true, 'c.d': false, 'e.f': true });
    expect(evaluateWhenExpression('a.b && c.d', lookup, {})).toBe(false);
    expect(evaluateWhenExpression('a.b || c.d', lookup, {})).toBe(true);
    expect(evaluateWhenExpression('!c.d', lookup, {})).toBe(true);
    // && binds tighter than ||: true || (false && false) = true
    expect(evaluateWhenExpression('a.b || c.d && c.d', lookup, {})).toBe(true);
    // parens override: (true || false) && false = false
    expect(evaluateWhenExpression('(a.b || c.d) && c.d', lookup, {})).toBe(false);
  });

  it('evaluates equality strictly', () => {
    const lookup = makeLookup({ 'a.b': 'formatted', 'c.d': 3, 'e.f': 3 });
    expect(evaluateWhenExpression("a.b == 'formatted'", lookup, {})).toBe(true);
    expect(evaluateWhenExpression("a.b != 'formatted'", lookup, {})).toBe(false);
    expect(evaluateWhenExpression('c.d == 3', lookup, {})).toBe(true);
    // strict: number 3 != string '3'
    expect(evaluateWhenExpression("c.d == '3'", lookup, {})).toBe(false);
    expect(evaluateWhenExpression('c.d == e.f', lookup, {})).toBe(true);
    expect(evaluateWhenExpression('a.b == true', lookup, {})).toBe(false);
  });

  it('expands template variables in property refs', () => {
    const lookup = makeLookup({ 'ext.webView.wv1.isEditable': true });
    expect(
      evaluateWhenExpression('ext.webView.{webViewId}.isEditable', lookup, { webViewId: 'wv1' }),
    ).toBe(true);
    expect(
      evaluateWhenExpression('ext.webView.{webViewId}.isEditable', lookup, { webViewId: 'wv2' }),
    ).toBe(false);
  });

  it('treats a property ref with a missing template var as undefined (falsy)', () => {
    const lookup = makeLookup({ 'ext.webView.wv1.isEditable': true });
    expect(evaluateWhenExpression('ext.webView.{webViewId}.isEditable', lookup, {})).toBe(false);
    expect(
      evaluateWhenExpression('ext.webView.{webViewId}.isEditable', lookup, {
        webViewId: undefined,
      }),
    ).toBe(false);
    // !undefined is true
    expect(evaluateWhenExpression('!ext.webView.{webViewId}.isEditable', lookup, {})).toBe(true);
  });

  it('evaluates literals', () => {
    const lookup = makeLookup({});
    expect(evaluateWhenExpression('true', lookup, {})).toBe(true);
    expect(evaluateWhenExpression('false', lookup, {})).toBe(false);
    expect(evaluateWhenExpression('3', lookup, {})).toBe(true);
    expect(evaluateWhenExpression('0', lookup, {})).toBe(false);
    expect(evaluateWhenExpression('-1 == -1', lookup, {})).toBe(true);
  });

  it('matches the manage-books style compound expressions', () => {
    const lookup = makeLookup({
      'ps.project.p1.isEditable': false,
      'ps.project.p1.hasEncodingConverter': true,
    });
    expect(
      evaluateWhenExpression(
        'ps.project.{projectId}.isEditable || ps.project.{projectId}.hasEncodingConverter',
        lookup,
        { projectId: 'p1' },
      ),
    ).toBe(true);
  });
});

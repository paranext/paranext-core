import { ContextKeyLookup, ContextKeyValue } from './context-keys.model';

/** One segment of a property reference in a when-expression */
export type WhenExpressionPropertySegment =
  | { type: 'identifier'; text: string }
  | { type: 'templateVar'; name: string };

/** Parsed form of a when-expression */
export type WhenExpressionAst =
  | { type: 'literal'; value: ContextKeyValue }
  | { type: 'property'; segments: WhenExpressionPropertySegment[] }
  | { type: 'not'; operand: WhenExpressionAst }
  | { type: 'equality'; operator: '==' | '!='; left: WhenExpressionAst; right: WhenExpressionAst }
  | { type: 'and'; operands: WhenExpressionAst[] }
  | { type: 'or'; operands: WhenExpressionAst[] };

type OperatorTokenType = '(' | ')' | '!' | '&&' | '||' | '==' | '!=';

type Token =
  | { type: OperatorTokenType }
  | { type: 'literal'; value: ContextKeyValue }
  | { type: 'property'; segments: WhenExpressionPropertySegment[] };

const WHITESPACE_REGEX = /\s/;
const WORD_CHAR_REGEX = /[-A-Za-z0-9_{}.]/;
const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;
const IDENTIFIER_SEGMENT_REGEX = /^[A-Za-z0-9_-]+$/;
const TEMPLATE_VAR_SEGMENT_REGEX = /^\{([A-Za-z_][A-Za-z0-9_]*)\}$/;

function parsePropertySegments(word: string, position: number): WhenExpressionPropertySegment[] {
  const rawSegments = word.split('.');
  if (rawSegments.length < 2)
    throw new Error(
      `Invalid token '${word}' at position ${position}: property references need at least two dot-separated segments`,
    );
  return rawSegments.map((rawSegment) => {
    const templateVarMatch = TEMPLATE_VAR_SEGMENT_REGEX.exec(rawSegment);
    if (templateVarMatch) return { type: 'templateVar', name: templateVarMatch[1] };
    if (IDENTIFIER_SEGMENT_REGEX.test(rawSegment)) return { type: 'identifier', text: rawSegment };
    throw new Error(
      `Invalid property segment '${rawSegment}' in '${word}' at position ${position}`,
    );
  });
}

function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expression.length) {
    const c = expression[i];
    if (WHITESPACE_REGEX.test(c)) {
      i += 1;
    } else if (c === '(' || c === ')') {
      tokens.push({ type: c });
      i += 1;
    } else if (c === '&' || c === '|' || c === '=') {
      const pair = expression.substring(i, i + 2);
      if (pair !== '&&' && pair !== '||' && pair !== '==')
        throw new Error(`Unexpected character '${c}' at position ${i} in '${expression}'`);
      tokens.push({ type: pair });
      i += 2;
    } else if (c === '!') {
      if (expression[i + 1] === '=') {
        tokens.push({ type: '!=' });
        i += 2;
      } else {
        tokens.push({ type: '!' });
        i += 1;
      }
    } else if (c === "'") {
      const closingQuoteIndex = expression.indexOf("'", i + 1);
      if (closingQuoteIndex < 0)
        throw new Error(`Unterminated string starting at position ${i} in '${expression}'`);
      tokens.push({ type: 'literal', value: expression.substring(i + 1, closingQuoteIndex) });
      i = closingQuoteIndex + 1;
    } else if (WORD_CHAR_REGEX.test(c)) {
      const start = i;
      while (i < expression.length && WORD_CHAR_REGEX.test(expression[i])) i += 1;
      const word = expression.substring(start, i);
      if (NUMBER_REGEX.test(word)) tokens.push({ type: 'literal', value: Number(word) });
      else if (word === 'true') tokens.push({ type: 'literal', value: true });
      else if (word === 'false') tokens.push({ type: 'literal', value: false });
      else tokens.push({ type: 'property', segments: parsePropertySegments(word, start) });
    } else {
      throw new Error(`Unexpected character '${c}' at position ${i} in '${expression}'`);
    }
  }
  return tokens;
}

function parseTokens(tokens: Token[], expression: string): WhenExpressionAst {
  let position = 0;

  function peekType(): string | undefined {
    return tokens[position]?.type;
  }

  function parsePrimary(): WhenExpressionAst {
    const token = tokens[position];
    if (!token) throw new Error(`Unexpected end of expression '${expression}'`);
    position += 1;
    if (token.type === '(') {
      // parseOr is declared later in the same function scope; all inner functions hoist so this
      // call is safe at runtime, but the rule fires on the textual forward reference
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const inner = parseOr();
      if (peekType() !== ')') throw new Error(`Expected ')' in expression '${expression}'`);
      position += 1;
      return inner;
    }
    if (token.type === 'literal') return { type: 'literal', value: token.value };
    if (token.type === 'property') return { type: 'property', segments: token.segments };
    throw new Error(`Unexpected token '${token.type}' in expression '${expression}'`);
  }

  function parseUnary(): WhenExpressionAst {
    if (peekType() === '!') {
      position += 1;
      return { type: 'not', operand: parseUnary() };
    }
    return parsePrimary();
  }

  function parseEquality(): WhenExpressionAst {
    const left = parseUnary();
    const operator = peekType();
    if (operator === '==' || operator === '!=') {
      position += 1;
      return { type: 'equality', operator, left, right: parseUnary() };
    }
    return left;
  }

  function parseAnd(): WhenExpressionAst {
    const operands = [parseEquality()];
    while (peekType() === '&&') {
      position += 1;
      operands.push(parseEquality());
    }
    return operands.length === 1 ? operands[0] : { type: 'and', operands };
  }

  function parseOr(): WhenExpressionAst {
    const operands = [parseAnd()];
    while (peekType() === '||') {
      position += 1;
      operands.push(parseAnd());
    }
    return operands.length === 1 ? operands[0] : { type: 'or', operands };
  }

  const ast = parseOr();
  if (position !== tokens.length)
    throw new Error(
      `Unexpected token '${tokens[position].type}' after end of expression '${expression}'`,
    );
  return ast;
}

/** Cache of parse results (including failures) keyed by expression string */
const parseCache = new Map<string, WhenExpressionAst | Error>();

/**
 * Parses a when-expression into an AST. Results (including errors) are memoized by expression
 * string.
 *
 * @param expression The when-expression to parse
 * @returns The parsed AST
 * @throws Error with a descriptive message if the expression is not valid
 */
export function parseWhenExpression(expression: string): WhenExpressionAst {
  const cached = parseCache.get(expression);
  if (cached !== undefined) {
    if (cached instanceof Error) throw cached;
    return cached;
  }
  try {
    const ast = parseTokens(tokenize(expression), expression);
    parseCache.set(expression, ast);
    return ast;
  } catch (error) {
    const errorToCache = error instanceof Error ? error : new Error(String(error));
    parseCache.set(expression, errorToCache);
    throw errorToCache;
  }
}

function collectTemplateVarNames(ast: WhenExpressionAst, names: Set<string>): void {
  switch (ast.type) {
    case 'property':
      ast.segments.forEach((segment) => {
        if (segment.type === 'templateVar') names.add(segment.name);
      });
      break;
    case 'not':
      collectTemplateVarNames(ast.operand, names);
      break;
    case 'equality':
      collectTemplateVarNames(ast.left, names);
      collectTemplateVarNames(ast.right, names);
      break;
    case 'and':
    case 'or':
      ast.operands.forEach((operand) => collectTemplateVarNames(operand, names));
      break;
    default:
      break;
  }
}

/**
 * Returns the names of all template variables (e.g. `webViewId` for `{webViewId}`) used in a
 * when-expression. Used by contribution validation to reject unknown placeholders at load time.
 *
 * @param expression The when-expression to inspect
 * @returns Array of unique template variable names
 * @throws Error if the expression is not valid
 */
export function getTemplateVarNames(expression: string): string[] {
  const names = new Set<string>();
  collectTemplateVarNames(parseWhenExpression(expression), names);
  return [...names];
}

function evaluateAst(
  ast: WhenExpressionAst,
  getContextKey: ContextKeyLookup,
  templateVars: Record<string, string | undefined>,
): ContextKeyValue | undefined {
  switch (ast.type) {
    case 'literal':
      return ast.value;
    case 'property': {
      const parts: string[] = [];
      // Plain loop instead of forEach so we can early-return undefined when a template var is missing
      for (let i = 0; i < ast.segments.length; i += 1) {
        const segment = ast.segments[i];
        if (segment.type === 'identifier') parts.push(segment.text);
        else {
          const value = templateVars[segment.name];
          if (value === undefined) return undefined;
          parts.push(value);
        }
      }
      return getContextKey(parts.join('.'));
    }
    case 'not':
      return !evaluateAst(ast.operand, getContextKey, templateVars);
    case 'equality': {
      const left = evaluateAst(ast.left, getContextKey, templateVars);
      const right = evaluateAst(ast.right, getContextKey, templateVars);
      return ast.operator === '==' ? left === right : left !== right;
    }
    case 'and':
      return ast.operands.every((operand) => !!evaluateAst(operand, getContextKey, templateVars));
    case 'or':
      return ast.operands.some((operand) => !!evaluateAst(operand, getContextKey, templateVars));
    default: {
      // Compile-time exhaustiveness check: errors here mean a new AST variant lacks evaluation
      const exhaustivenessCheck: never = ast;
      return exhaustivenessCheck;
    }
  }
}

/**
 * Evaluates a when-expression against the current context key values.
 *
 * @param expression The when-expression to evaluate (parse results are memoized)
 * @param getContextKey Function that looks up the current value of a context key
 * @param templateVars Values for `{placeholder}` segments in property references. A property
 *   reference containing a placeholder with no value evaluates to `undefined` (falsy)
 * @returns The boolean result of the expression. `undefined`, `false`, `0`, and `''` are falsy
 * @throws Error if the expression is not valid (use load-time validation to avoid this)
 */
export function evaluateWhenExpression(
  expression: string,
  getContextKey: ContextKeyLookup,
  templateVars: Record<string, string | undefined> = {},
): boolean {
  return !!evaluateAst(parseWhenExpression(expression), getContextKey, templateVars);
}

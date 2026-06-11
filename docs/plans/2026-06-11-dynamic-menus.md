# Dynamic Menu System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menu items declared in extension `menus.json` files can be dynamically visible (`when`), enabled (`enabledWhen`), and checked (`checkedWhen`) based on expressions over context keys stored in the shared store, evaluated synchronously and reactively in every consumer surface.

**Architecture:** Consumer-side evaluation (Approach A from the spec). Expressions are parsed/validated once at contribution load time in `MenuDocumentCombiner`; the menu document flows unchanged through the existing menu data provider; the renderer (menubar, web view toolbars, overlay context menus) and the main process (macOS native menubar) evaluate locally against the in-process shared-store copy and re-evaluate on context-key change events. A new `papi.contextKeys` facade (TS shared service + C# wrapper) is the write/read API.

**Tech Stack:** TypeScript (vitest), React (Radix-based shadcn components, React Testing Library), .NET 8 / C# (NUnit), AJV JSON schema, Electron Menu API.

**Spec:** `docs/specs/2026-06-11-dynamic-menus-design.md` — read it before starting. Branch: `dynamic-menus` (off `main`).

**Conventions you must follow** (from repo CLAUDE.md and `.claude/rules/`):

- Never use `any`; type assertions need `// eslint-disable-next-line no-type-assertion/no-type-assertion` with a reason comment. Fix code rather than suppressing warnings where possible.
- One commit per task (the project owner prefers fewer, milestone-level commits — do NOT commit per step; the per-task commits below are the maximum granularity).
- Never push to origin.
- `npm run lint` and `npm run typecheck` must be clean before each commit (pre-commit hooks run lint-staged automatically).
- Test commands: workspace tests run via `npx vitest run <path>` from the workspace dir (`lib/platform-bible-utils`, `lib/platform-bible-react`); root `src/` tests via `npx vitest run <path>` from repo root; C# via `dotnet test` from `c-sharp-tests/`.

---

## File Structure Overview

| File                                                                                     | Action     | Responsibility                                                                                |
| ---------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `lib/platform-bible-utils/src/context-keys/context-keys.model.ts`                        | Create     | `ContextKeyValue`, `ContextKeyLookup`, key/value validation                                   |
| `lib/platform-bible-utils/src/context-keys/when-expression.ts`                           | Create     | Tokenizer, parser, AST, evaluator, parse cache, `getTemplateVarNames`                         |
| `lib/platform-bible-utils/src/context-keys/evaluate-menu.ts`                             | Create     | `evaluateMenu`: filter/prune/decorate a menu document                                         |
| `lib/platform-bible-utils/src/extension-contributions/menus.model.ts`                    | Modify     | `when`/`enabledWhen`/`checkedWhen` in types + AJV schema; runtime `disabled`/`checked` fields |
| `lib/platform-bible-utils/src/index.ts`                                                  | Modify     | Export the new module members                                                                 |
| `src/shared/utils/menu-document-combiner.ts`                                             | Modify     | Load-time expression + template-var validation                                                |
| `src/shared/services/shared-store.service.ts`                                            | Modify     | Local `onDidChangeSharedStore` event; `contextKeys.*` entry in `SharedStoreValues`            |
| `src/shared/services/context-keys.service-model.ts`                                      | Create     | `IContextKeysService`, `ContextKeyChangeEvent` (PAPI-facing types)                            |
| `src/shared/services/context-keys.service.ts`                                            | Create     | Facade over shared-store: validation, prefixing, `onDidChange`                                |
| `src/extension-host/services/papi-backend.service.ts`                                    | Modify     | Expose `papi.contextKeys`                                                                     |
| `src/renderer/services/papi-frontend.service.ts`                                         | Modify     | Expose `papi.contextKeys`                                                                     |
| `papi.d.ts`                                                                              | Regenerate | `npm run build:types` (never hand-edit)                                                       |
| `src/renderer/hooks/use-evaluated-menu.hook.ts`                                          | Create     | Reactive evaluation hook for React surfaces                                                   |
| `lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx`  | Modify     | Render `disabled` + `checked`                                                                 |
| `lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx` | Modify     | Render `disabled` + `checked`                                                                 |
| `lib/platform-bible-react/src/stories/advanced/platform-menubar.stories.tsx`             | Modify     | Story with dynamic item states                                                                |
| `src/renderer/components/platform-bible-toolbar.tsx`                                     | Modify     | Evaluate main menu                                                                            |
| `src/renderer/components/web-view.component.tsx`                                         | Modify     | Evaluate web view top menu with template vars                                                 |
| `src/renderer/services/overlays/overlay.service-host.ts`                                 | Modify     | Evaluate web view context menu (visibility)                                                   |
| `src/main/platform-macos-menubar.util.ts`                                                | Modify     | Evaluate + rebuild native menubar on context changes                                          |
| `c-sharp/Services/ContextKeys.cs`                                                        | Create     | Instance facade over `ISharedStore`                                                           |
| `c-sharp/Services/ContextKeysService.cs`                                                 | Create     | Static facade (mirrors `SharedStoreService` pattern)                                          |
| `c-sharp-tests/Services/FakeSharedStore.cs`                                              | Create     | Dictionary-backed `ISharedStore` for tests                                                    |
| `c-sharp-tests/Services/ContextKeysTests.cs`                                             | Create     | NUnit tests                                                                                   |
| `extensions/src/platform-scripture-editor/contributions/menus.json`                      | Modify     | `enabledWhen` on insert items; `checkedWhen` on Show Footnotes                                |
| `extensions/src/platform-scripture-editor/src/main.ts`                                   | Modify     | Publish/remove `isEditable` context key                                                       |
| `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`    | Modify     | Publish `footnotesPaneVisible` context key                                                    |

---

### Task 1: Context key model and validation (`platform-bible-utils`)

**Files:**

- Create: `lib/platform-bible-utils/src/context-keys/context-keys.model.ts`
- Create: `lib/platform-bible-utils/src/context-keys/context-keys.model.test.ts`
- Modify: `lib/platform-bible-utils/src/index.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/platform-bible-utils/src/context-keys/context-keys.model.test.ts`:

```ts
import { isValidContextKey, isValidContextKeyValue } from './context-keys.model';

describe('isValidContextKey', () => {
  it('accepts keys with two or more word/hyphen segments', () => {
    expect(isValidContextKey('myExtension.someProperty')).toBe(true);
    expect(isValidContextKey('platformScripture.project.abc-123.isEditable')).toBe(true);
    expect(isValidContextKey('a.b')).toBe(true);
    expect(isValidContextKey('my-ext.some_property')).toBe(true);
    expect(isValidContextKey('platform.3d.enabled')).toBe(true);
  });

  it('rejects keys with fewer than two segments', () => {
    expect(isValidContextKey('singleSegment')).toBe(false);
    expect(isValidContextKey('')).toBe(false);
  });

  it('rejects keys with empty or invalid segments', () => {
    expect(isValidContextKey('a..b')).toBe(false);
    expect(isValidContextKey('.a.b')).toBe(false);
    expect(isValidContextKey('a.b.')).toBe(false);
    expect(isValidContextKey('a.b c.d')).toBe(false);
    expect(isValidContextKey('a.{b}.c')).toBe(false);
    expect(isValidContextKey("a.b'c")).toBe(false);
  });
});

describe('isValidContextKeyValue', () => {
  it('accepts strings, numbers, and booleans', () => {
    expect(isValidContextKeyValue('text')).toBe(true);
    expect(isValidContextKeyValue('')).toBe(true);
    expect(isValidContextKeyValue(0)).toBe(true);
    expect(isValidContextKeyValue(3.5)).toBe(true);
    expect(isValidContextKeyValue(false)).toBe(true);
  });

  it('rejects objects, arrays, null, and undefined', () => {
    expect(isValidContextKeyValue({})).toBe(false);
    expect(isValidContextKeyValue([])).toBe(false);
    expect(isValidContextKeyValue(null)).toBe(false);
    expect(isValidContextKeyValue(undefined)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lib/platform-bible-utils && npx vitest run src/context-keys/context-keys.model.test.ts`
Expected: FAIL — cannot resolve `./context-keys.model`

- [ ] **Step 3: Write the implementation**

Create `lib/platform-bible-utils/src/context-keys/context-keys.model.ts`:

```ts
/**
 * Value that can be stored in a context key. Deliberately constrained to scalar types so
 * when-expression equality semantics stay trivial and the store is not used as a general-purpose
 * state bus.
 */
export type ContextKeyValue = string | number | boolean;

/** Function that synchronously looks up the current value of a context key */
export type ContextKeyLookup = (key: string) => ContextKeyValue | undefined;

/** Regex matching one valid segment of a context key (word characters or hyphens) */
const CONTEXT_KEY_SEGMENT_REGEX = /^[A-Za-z0-9_-]+$/;

/**
 * Determines whether `key` is a structurally valid context key: at least two dot-separated
 * segments, each consisting only of word characters (`A-Z a-z 0-9 _`) or hyphens. By convention the
 * first segment should be the publishing extension's name (`platform` is reserved for the
 * platform).
 *
 * @param key The context key to check
 * @returns `true` if the key is structurally valid
 */
export function isValidContextKey(key: string): boolean {
  const segments = key.split('.');
  if (segments.length < 2) return false;
  return segments.every((segment) => CONTEXT_KEY_SEGMENT_REGEX.test(segment));
}

/**
 * Determines whether `value` is a valid context key value ({@link ContextKeyValue})
 *
 * @param value The value to check
 * @returns `true` if the value is a string, number, or boolean
 */
export function isValidContextKeyValue(value: unknown): value is ContextKeyValue {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}
```

- [ ] **Step 4: Export from the package index**

In `lib/platform-bible-utils/src/index.ts`, near the menus.model exports (~line 188), add:

```ts
export type { ContextKeyValue, ContextKeyLookup } from './context-keys/context-keys.model';
export { isValidContextKey, isValidContextKeyValue } from './context-keys/context-keys.model';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd lib/platform-bible-utils && npx vitest run src/context-keys/context-keys.model.test.ts`
Expected: PASS (all tests)

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-utils/src/context-keys/ lib/platform-bible-utils/src/index.ts
git commit -m "feat(utils): add context key model and validation"
```

---

### Task 2: When-expression parser and evaluator

**Files:**

- Create: `lib/platform-bible-utils/src/context-keys/when-expression.ts`
- Create: `lib/platform-bible-utils/src/context-keys/when-expression.test.ts`
- Modify: `lib/platform-bible-utils/src/index.ts`

The grammar (from the spec):

```
expression  := orExpr
orExpr      := andExpr ( '||' andExpr )*
andExpr     := equality ( '&&' equality )*
equality    := unary ( ( '==' | '!=' ) unary )?
unary       := '!' unary | primary
primary     := '(' expression ')' | literal | propertyRef
literal     := 'true' | 'false' | number | sqString
propertyRef := segment ( '.' segment )+                 // min 2 segments
segment     := identifier | '{' identifier '}'
```

Precedence `!` > `==`/`!=` > `&&` > `||`. Strings single-quoted, no escapes. Strict `===` equality. Bare property ref = truthiness. Template var with no value → whole property ref is `undefined`.

- [ ] **Step 1: Write the failing tests**

Create `lib/platform-bible-utils/src/context-keys/when-expression.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd lib/platform-bible-utils && npx vitest run src/context-keys/when-expression.test.ts`
Expected: FAIL — cannot resolve `./when-expression`

- [ ] **Step 3: Write the implementation**

Create `lib/platform-bible-utils/src/context-keys/when-expression.ts`:

```ts
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
const WORD_CHAR_REGEX = /[A-Za-z0-9_{}.\-]/;
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
  if (cached) {
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
      // Cannot use forEach since we early-return undefined when a template var is missing
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
    default:
      return undefined;
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
```

- [ ] **Step 4: Export from the package index**

In `lib/platform-bible-utils/src/index.ts`, after the context-keys.model exports from Task 1, add:

```ts
export type {
  WhenExpressionAst,
  WhenExpressionPropertySegment,
} from './context-keys/when-expression';
export {
  evaluateWhenExpression,
  getTemplateVarNames,
  parseWhenExpression,
} from './context-keys/when-expression';
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd lib/platform-bible-utils && npx vitest run src/context-keys/when-expression.test.ts`
Expected: PASS (all tests)

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-utils/src/context-keys/ lib/platform-bible-utils/src/index.ts
git commit -m "feat(utils): add when-expression parser and evaluator for dynamic menus"
```

---

### Task 3: Menu schema/type additions (`when`/`enabledWhen`/`checkedWhen`)

**Files:**

- Modify: `lib/platform-bible-utils/src/extension-contributions/menus.model.ts`

No test file of its own — the schema is exercised by Task 4's `evaluateMenu` tests and Task 5's combiner tests. `npm run typecheck` verifies types.

- [ ] **Step 1: Add expression + runtime fields to the TS types**

In `menus.model.ts`, replace the `MenuItemBase` type (lines 42-53) with:

```ts
export type MenuItemBase = OrderedItem & {
  /** Menu group to which this menu item belongs */
  group: ReferencedItem;
  /** Key that represents the text of this menu item to display */
  label: LocalizeKey;
  /** Key that represents words the platform should reference when users are searching for menu items */
  searchTerms?: LocalizeKey;
  /** Key that represents the text to display if a mouse pointer hovers over the menu item */
  tooltip?: LocalizeKey;
  /** Additional information provided by developers to help people who perform localization */
  localizeNotes: string;
  /**
   * When-expression controlling whether this menu item is visible. If not provided, the item is
   * always visible. Expressions reference context keys (see `papi.contextKeys`) and support `&& ||
   * ! == != ( )`, single-quoted strings, numbers, `true`/`false`, and `{templateVar}` segments in
   * property references (web view menus provide `{webViewId}`, `{webViewType}`, and `{projectId}`;
   * the main menu provides none). Example: `"myExtension.project.{projectId}.isEditable &&
   * !platform.someFlag"`
   */
  when?: string;
  /**
   * When-expression controlling whether this menu item is enabled. If not provided, the item is
   * always enabled. Same grammar as {@link MenuItemBase.when}.
   */
  enabledWhen?: string;
  /**
   * Whether this menu item is currently disabled. Computed at runtime from
   * {@link MenuItemBase.enabledWhen} by `evaluateMenu` — NOT allowed in menus.json contributions
   * (rejected by the schema).
   */
  disabled?: boolean;
};
```

- [ ] **Step 2: Add `checkedWhen`/`checked` to the command item type**

Replace the `MenuItemContainingCommand` type (lines 62-75) with:

```ts
/** Menu item that runs a command */
export type MenuItemContainingCommand = MenuItemBase & {
  /** Name of the PAPI command to run when this menu item is selected. */
  command: ReferencedItem;
  /**
   * Uri path to the icon to display after the menu text. Ex:
   * `papi-extension://helloWorld/assets/icon.png`
   */
  iconPathAfter?: string;
  /**
   * Uri path to the icon to display before the menu text. Ex:
   * `papi-extension://helloWorld/assets/icon.png`
   */
  iconPathBefore?: string;
  /**
   * When-expression controlling whether this menu item shows a checkmark. If provided, the item
   * renders as a checkbox-style item (checked or unchecked); if not provided, the item renders as a
   * plain item. Same grammar as {@link MenuItemBase.when}.
   */
  checkedWhen?: string;
  /**
   * Whether this menu item's checkbox is currently checked. Computed at runtime from
   * {@link MenuItemContainingCommand.checkedWhen} by `evaluateMenu` — NOT allowed in menus.json
   * contributions (rejected by the schema).
   */
  checked?: boolean;
};
```

- [ ] **Step 3: Add the expression properties to the JSON schema**

In the `menuItem` definition of `menuDocumentSchema` (the `$defs.menuItem` object): inside the **command** `oneOf` branch's `properties` (the one with `command`, `iconPathBefore`, `iconPathAfter`), add:

```ts
            checkedWhen: {
              description:
                'When-expression controlling whether this menu item shows a checkmark. If provided, the item renders as a checkbox-style item. References context keys; supports && || ! == != ( ), single-quoted strings, numbers, true/false, and {templateVar} segments.',
              type: 'string',
            },
```

And in the shared `properties` of `menuItem` (alongside `label`, `tooltip`, `group`, `order`), add:

```ts
        when: {
          description:
            'When-expression controlling whether this menu item is visible. If not provided, the item is always visible. References context keys; supports && || ! == != ( ), single-quoted strings, numbers, true/false, and {templateVar} segments (web view menus provide {webViewId}, {webViewType}, {projectId}).',
          type: 'string',
        },
        enabledWhen: {
          description:
            'When-expression controlling whether this menu item is enabled. If not provided, the item is always enabled. Same grammar as when.',
          type: 'string',
        },
```

Note: `disabled`/`checked` are deliberately NOT added to the schema — `unevaluatedProperties: false` rejects them in contributions, which is the intent (they are runtime-computed only). Update the header comments in the file noting this exception to the types↔schema alignment rule.

- [ ] **Step 4: Verify typecheck and existing tests**

Run: `npm run typecheck` (repo root)
Expected: clean

Run: `cd lib/platform-bible-utils && npx vitest run`
Expected: PASS (existing document-combiner tests still pass)

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-utils/src/extension-contributions/menus.model.ts
git commit -m "feat(utils): add when/enabledWhen/checkedWhen to menu schema and types"
```

---

### Task 4: `evaluateMenu`

**Files:**

- Create: `lib/platform-bible-utils/src/context-keys/evaluate-menu.ts`
- Create: `lib/platform-bible-utils/src/context-keys/evaluate-menu.test.ts`
- Modify: `lib/platform-bible-utils/src/index.ts`

- [ ] **Step 1: Write the failing tests**

Create `lib/platform-bible-utils/src/context-keys/evaluate-menu.test.ts`:

```ts
import { MultiColumnMenu, SingleColumnMenu } from '../extension-contributions/menus.model';
import { ContextKeyValue } from './context-keys.model';
import { evaluateMenu } from './evaluate-menu';

function makeLookup(values: Record<string, ContextKeyValue | undefined>) {
  return (key: string) => values[key];
}

function makeMultiColumnMenu(): MultiColumnMenu {
  return {
    columns: {
      'test.colA': { label: '%colA%', order: 1 },
      'test.colB': { label: '%colB%', order: 2 },
    },
    groups: {
      'test.groupA': { column: 'test.colA', order: 1 },
      'test.groupB': { column: 'test.colB', order: 1 },
      'test.submenuGroup': { menuItem: 'test.submenu', order: 1 },
    },
    items: [
      {
        label: '%plain%',
        group: 'test.groupA',
        order: 1,
        command: 'test.plain',
        localizeNotes: '',
      },
      {
        label: '%conditional%',
        group: 'test.groupA',
        order: 2,
        command: 'test.conditional',
        localizeNotes: '',
        when: 'test.showIt',
      },
      {
        label: '%toggleable%',
        group: 'test.groupA',
        order: 3,
        command: 'test.toggle',
        localizeNotes: '',
        enabledWhen: 'test.canToggle',
        checkedWhen: 'test.isToggled',
      },
      {
        label: '%submenu%',
        group: 'test.groupB',
        order: 1,
        id: 'test.submenu',
        localizeNotes: '',
      },
      {
        label: '%inSubmenu%',
        group: 'test.submenuGroup',
        order: 1,
        command: 'test.inSubmenu',
        localizeNotes: '',
        when: 'test.showSubmenuItem',
      },
    ],
  };
}

describe('evaluateMenu', () => {
  it('keeps items without expressions and strips nothing from them', () => {
    const result = evaluateMenu(
      makeMultiColumnMenu(),
      makeLookup({ 'test.showIt': true, 'test.showSubmenuItem': true }),
    );
    const labels = result.items.map((item) => item.label);
    expect(labels).toContain('%plain%');
    expect(labels).toContain('%conditional%');
    expect(labels).toContain('%submenu%');
  });

  it('does not mutate the input menu', () => {
    const menu = makeMultiColumnMenu();
    const itemCountBefore = menu.items.length;
    evaluateMenu(menu, makeLookup({}));
    expect(menu.items.length).toBe(itemCountBefore);
    expect(menu.items.some((item) => item.when !== undefined)).toBe(true);
  });

  it('hides items whose when evaluates falsy and strips expression fields', () => {
    const result = evaluateMenu(
      makeMultiColumnMenu(),
      makeLookup({ 'test.showSubmenuItem': true }),
    );
    const labels = result.items.map((item) => item.label);
    expect(labels).not.toContain('%conditional%');
    expect(result.items.every((item) => item.when === undefined)).toBe(true);
    expect(result.items.every((item) => item.enabledWhen === undefined)).toBe(true);
  });

  it('sets disabled from enabledWhen and checked from checkedWhen', () => {
    const result = evaluateMenu(
      makeMultiColumnMenu(),
      makeLookup({ 'test.canToggle': false, 'test.isToggled': true, 'test.showSubmenuItem': true }),
    );
    const toggleable = result.items.find((item) => item.label === '%toggleable%');
    expect(toggleable?.disabled).toBe(true);
    // checked only exists on command items
    expect(toggleable && 'checked' in toggleable && toggleable.checked).toBe(true);
    const plain = result.items.find((item) => item.label === '%plain%');
    expect(plain?.disabled).toBeUndefined();
    expect(plain && 'checked' in plain ? plain.checked : undefined).toBeUndefined();
  });

  it('prunes submenu items whose submenus have no visible items, and empty groups/columns', () => {
    // showSubmenuItem falsy -> %inSubmenu% hidden -> submenu pruned -> groupB empty -> colB pruned
    const result = evaluateMenu(makeMultiColumnMenu(), makeLookup({ 'test.showIt': true }));
    const labels = result.items.map((item) => item.label);
    expect(labels).not.toContain('%inSubmenu%');
    expect(labels).not.toContain('%submenu%');
    expect(Object.keys(result.groups)).not.toContain('test.submenuGroup');
    expect(Object.keys(result.groups)).not.toContain('test.groupB');
    expect(Object.keys(result.columns)).not.toContain('test.colB');
    expect(Object.keys(result.columns)).toContain('test.colA');
  });

  it('passes template vars through to expression evaluation', () => {
    const menu: SingleColumnMenu = {
      groups: { 'test.group': { order: 1 } },
      items: [
        {
          label: '%scoped%',
          group: 'test.group',
          order: 1,
          command: 'test.scoped',
          localizeNotes: '',
          when: 'test.webView.{webViewId}.visible',
        },
      ],
    };
    const lookup = makeLookup({ 'test.webView.wv1.visible': true });
    expect(evaluateMenu(menu, lookup, { webViewId: 'wv1' }).items.length).toBe(1);
    expect(evaluateMenu(menu, lookup, { webViewId: 'wv2' }).items.length).toBe(0);
    expect(evaluateMenu(menu, lookup, {}).items.length).toBe(0);
  });

  it('fails safe on invalid expressions and reports via onError', () => {
    const menu: SingleColumnMenu = {
      groups: { 'test.group': { order: 1 } },
      items: [
        {
          label: '%broken%',
          group: 'test.group',
          order: 1,
          command: 'test.broken',
          localizeNotes: '',
          when: 'this is && not valid ((',
        },
        {
          label: '%brokenEnabled%',
          group: 'test.group',
          order: 2,
          command: 'test.brokenEnabled',
          localizeNotes: '',
          enabledWhen: '))((',
        },
      ],
    };
    const onError = vi.fn();
    const result = evaluateMenu(menu, makeLookup({}), {}, onError);
    // when error -> hidden; enabledWhen error -> disabled
    expect(result.items.map((item) => item.label)).toEqual(['%brokenEnabled%']);
    expect(result.items[0].disabled).toBe(true);
    expect(onError).toHaveBeenCalledTimes(2);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd lib/platform-bible-utils && npx vitest run src/context-keys/evaluate-menu.test.ts`
Expected: FAIL — cannot resolve `./evaluate-menu`

- [ ] **Step 3: Write the implementation**

Create `lib/platform-bible-utils/src/context-keys/evaluate-menu.ts`:

```ts
import {
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
  SingleColumnMenu,
} from '../extension-contributions/menus.model';
import { deepClone } from '../util';
import { ContextKeyLookup } from './context-keys.model';
import { evaluateWhenExpression } from './when-expression';

/** Menu document shapes that {@link evaluateMenu} can process */
export type EvaluatableMenu =
  | SingleColumnMenu
  | MultiColumnMenu
  | Localized<SingleColumnMenu>
  | Localized<MultiColumnMenu>;

/** Callback invoked when a when-expression fails to evaluate */
export type WhenExpressionErrorHandler = (expression: string, error: unknown) => void;

type AnyMenuItem =
  | MenuItemContainingCommand
  | MenuItemContainingSubmenu
  | Localized<MenuItemContainingCommand>
  | Localized<MenuItemContainingSubmenu>;

/**
 * Evaluates all when-expressions in a menu document against the current context key values.
 *
 * - Items whose `when` evaluates falsy are removed.
 * - Items with `enabledWhen` get `disabled` set to the negated result.
 * - Command items with `checkedWhen` get `checked` set to the result.
 * - Submenu items whose submenus end up with no visible items are removed (recursively).
 * - Groups with no visible items and columns with no remaining groups are removed.
 * - The `when`/`enabledWhen`/`checkedWhen` fields are stripped from the output.
 *
 * The input document is not mutated; a deep clone is returned.
 *
 * @param menu The menu document to evaluate (localized or not)
 * @param getContextKey Function that looks up the current value of a context key
 * @param templateVars Values for `{placeholder}` segments in property references
 * @param onError Called for each expression that fails to evaluate (rare — expressions are
 *   validated at contribution load time). Failed expressions fail safe: `when` → hidden,
 *   `enabledWhen` → disabled, `checkedWhen` → unchecked
 * @returns A new menu document with expressions applied and stripped
 */
export function evaluateMenu<T extends EvaluatableMenu>(
  menu: T,
  getContextKey: ContextKeyLookup,
  templateVars: Record<string, string | undefined> = {},
  onError: WhenExpressionErrorHandler = () => {},
): T {
  const result = deepClone(menu);

  const safeEvaluate = (
    expression: string | undefined,
    resultOnMissing: boolean,
    resultOnError: boolean,
  ): boolean => {
    if (expression === undefined) return resultOnMissing;
    try {
      return evaluateWhenExpression(expression, getContextKey, templateVars);
    } catch (error) {
      onError(expression, error);
      return resultOnError;
    }
  };

  // The items array is structurally the same for all EvaluatableMenu variants
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const allItems = result.items as AnyMenuItem[];
  // Groups keyed by plain strings for ergonomic indexing (keys are ReferencedItem or string)
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const groups = result.groups as Record<
    string,
    { order: number; column?: string; menuItem?: string }
  >;

  // 1. Visibility filtering and enabled/checked decoration
  let visibleItems = allItems.filter((item) => safeEvaluate(item.when, true, false));
  visibleItems.forEach((item) => {
    if (item.enabledWhen !== undefined)
      item.disabled = !safeEvaluate(item.enabledWhen, true, false);
    if ('command' in item && item.checkedWhen !== undefined)
      item.checked = safeEvaluate(item.checkedWhen, false, false);
    delete item.when;
    delete item.enabledWhen;
    if ('command' in item) delete item.checkedWhen;
  });

  // 2. Prune submenu items whose submenus have no visible items. Loop until stable to handle
  // nested submenus emptying out bottom-up.
  let prunedSomething = true;
  while (prunedSomething) {
    prunedSomething = false;
    visibleItems = visibleItems.filter((item) => {
      if (!('id' in item)) return true;
      const submenuGroupKeys = Object.keys(groups).filter(
        (groupKey) => groups[groupKey].menuItem === item.id,
      );
      const hasVisibleChild = visibleItems.some((other) => submenuGroupKeys.includes(other.group));
      if (!hasVisibleChild) prunedSomething = true;
      return hasVisibleChild;
    });
  }

  // 3. Prune groups with no visible items
  const visibleGroupKeys = new Set(visibleItems.map((item) => item.group));
  Object.keys(groups).forEach((groupKey) => {
    if (!visibleGroupKeys.has(groupKey)) delete groups[groupKey];
  });

  // 4. Prune columns with no remaining groups (multi-column menus only)
  if ('columns' in result && result.columns) {
    // Columns keyed by plain strings for ergonomic indexing
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const columns = result.columns as Record<string, unknown>;
    const usedColumnKeys = new Set<string>();
    Object.values(groups).forEach((group) => {
      if (group.column !== undefined) usedColumnKeys.add(group.column);
    });
    Object.keys(columns).forEach((columnKey) => {
      // isExtensible is a boolean flag on the columns object, not a column
      if (columnKey === 'isExtensible') return;
      if (!usedColumnKeys.has(columnKey)) delete columns[columnKey];
    });
  }

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  result.items = visibleItems as typeof result.items;
  return result;
}
```

Note: if TS complains about specific assertions, restructure minimally but keep the
documented behavior; every assertion needs an eslint-disable comment per repo convention.

- [ ] **Step 4: Export from the package index**

In `lib/platform-bible-utils/src/index.ts`, after the when-expression exports, add:

```ts
export type { EvaluatableMenu, WhenExpressionErrorHandler } from './context-keys/evaluate-menu';
export { evaluateMenu } from './context-keys/evaluate-menu';
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd lib/platform-bible-utils && npx vitest run src/context-keys/evaluate-menu.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-utils/src/context-keys/ lib/platform-bible-utils/src/index.ts
git commit -m "feat(utils): add evaluateMenu for dynamic menu evaluation"
```

---

### Task 5: Load-time expression validation in `MenuDocumentCombiner`

**Files:**

- Modify: `src/shared/utils/menu-document-combiner.ts`
- Modify: `src/shared/utils/menu-document-combiner.test.ts`

- [ ] **Step 1: Read the existing test file** to learn its fixtures/mock setup (`localizationService` is mocked there). Add a new `describe('when expression validation', ...)` block using self-contained documents:

```ts
describe('when expression validation', () => {
  const baseDocument = {
    mainMenu: {
      columns: { 'platform.col': { label: '%col%', order: 1, isExtensible: true } },
      groups: { 'platform.group': { column: 'platform.col', order: 1, isExtensible: true } },
      items: [],
    },
    defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
    defaultWebViewContextMenu: { groups: {}, items: [] },
    webViewMenus: {},
  };

  function makeContributionWithMainMenuItem(extraItemProps: Record<string, string>) {
    return {
      mainMenu: {
        columns: {},
        groups: {},
        items: [
          {
            label: '%item%',
            localizeNotes: '',
            group: 'platform.group',
            order: 1,
            command: 'ext1.doThing',
            ...extraItemProps,
          },
        ],
      },
      defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewContextMenu: { groups: {}, items: [] },
      webViewMenus: {},
    };
  }

  function makeContributionWithWebViewItem(extraItemProps: Record<string, string>) {
    return {
      mainMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewContextMenu: { groups: {}, items: [] },
      webViewMenus: {
        'ext1.webView': {
          includeDefaults: false,
          topMenu: {
            columns: { 'ext1.col': { label: '%col%', order: 1 } },
            groups: { 'ext1.group': { column: 'ext1.col', order: 1 } },
            items: [
              {
                label: '%item%',
                localizeNotes: '',
                group: 'ext1.group',
                order: 1,
                command: 'ext1.doThing',
                ...extraItemProps,
              },
            ],
          },
        },
      },
    };
  }

  it('accepts a valid when expression on a main menu item', () => {
    const combiner = new MenuDocumentCombiner(baseDocument);
    expect(() =>
      combiner.addOrUpdateContribution(
        'ext1',
        makeContributionWithMainMenuItem({ when: 'ext1.someFlag && !platform.otherFlag' }),
      ),
    ).not.toThrow();
  });

  it('rejects a syntactically invalid expression', () => {
    const combiner = new MenuDocumentCombiner(baseDocument);
    expect(() =>
      combiner.addOrUpdateContribution(
        'ext1',
        makeContributionWithMainMenuItem({ when: 'ext1.someFlag &&' }),
      ),
    ).toThrow(/Invalid when expression/);
  });

  it('rejects template variables in main menu expressions', () => {
    const combiner = new MenuDocumentCombiner(baseDocument);
    expect(() =>
      combiner.addOrUpdateContribution(
        'ext1',
        makeContributionWithMainMenuItem({ when: 'ext1.webView.{webViewId}.flag' }),
      ),
    ).toThrow(/Unknown template variable \{webViewId\}/);
  });

  it('accepts known template variables in web view menu expressions', () => {
    const combiner = new MenuDocumentCombiner(baseDocument);
    expect(() =>
      combiner.addOrUpdateContribution(
        'ext1',
        makeContributionWithWebViewItem({
          enabledWhen: 'ext1.webView.{webViewId}.isEditable',
          checkedWhen: 'ext1.project.{projectId}.someToggle',
        }),
      ),
    ).not.toThrow();
  });

  it('rejects unknown template variables in web view menu expressions', () => {
    const combiner = new MenuDocumentCombiner(baseDocument);
    expect(() =>
      combiner.addOrUpdateContribution(
        'ext1',
        makeContributionWithWebViewItem({ when: 'ext1.webView.{webviewid}.flag' }),
      ),
    ).toThrow(/Unknown template variable \{webviewid\}/);
  });
});
```

Adapt import names/fixtures to the existing file conventions (e.g. it may already import `MenuDocumentCombiner` and define base documents — reuse where natural, but keep these tests self-contained).

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npx vitest run src/shared/utils/menu-document-combiner.test.ts` (repo root)
Expected: new tests FAIL (valid expressions pass through today because nothing validates them — the "rejects" tests fail)

- [ ] **Step 3: Implement validation**

In `src/shared/utils/menu-document-combiner.ts`:

Add to the platform-bible-utils import: `getTemplateVarNames`, `getErrorMessage`.

Add helper functions in the `#region Helper functions` section:

```ts
/** Template variables available to when-expressions in web-view-scoped menus */
const WEB_VIEW_MENU_TEMPLATE_VARS = ['webViewId', 'webViewType', 'projectId'];
/** Template variables available to when-expressions in the main menu (none in v1) */
const MAIN_MENU_TEMPLATE_VARS: string[] = [];

const WHEN_EXPRESSION_PROPERTIES = ['when', 'enabledWhen', 'checkedWhen'] as const;

function checkWhenExpressionsOnItems(
  menuItems: DeepPartial<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]> | undefined,
  allowedTemplateVars: string[],
  menuDescription: string,
): void {
  if (!menuItems) return;
  menuItems.forEach((menuItem) => {
    if (!menuItem) return;
    WHEN_EXPRESSION_PROPERTIES.forEach((expressionProperty) => {
      // checkedWhen only exists on command items; reading it off the union is safe
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const expression = (menuItem as Partial<MenuItemContainingCommand>)[expressionProperty];
      if (expression === undefined) return;
      let templateVarNames: string[];
      try {
        templateVarNames = getTemplateVarNames(expression);
      } catch (error) {
        throw new Error(
          `Invalid ${expressionProperty} expression '${expression}' on menu item '${menuItem.label}' in ${menuDescription}: ${getErrorMessage(error)}`,
        );
      }
      templateVarNames.forEach((templateVarName) => {
        if (!allowedTemplateVars.includes(templateVarName))
          throw new Error(
            `Unknown template variable {${templateVarName}} in ${expressionProperty} expression '${expression}' on menu item '${menuItem.label}' in ${menuDescription}. Allowed template variables: ${
              allowedTemplateVars.length > 0 ? allowedTemplateVars.join(', ') : '(none)'
            }`,
          );
      });
    });
  });
}
```

In `validateContribution`, after the existing `checkNewMenuItems(newMenus.mainMenu?.items, ...)` call block, add:

```ts
checkWhenExpressionsOnItems(newMenus.mainMenu?.items, MAIN_MENU_TEMPLATE_VARS, 'mainMenu');
checkWhenExpressionsOnItems(
  newMenus.defaultWebViewTopMenu?.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  'defaultWebViewTopMenu',
);
checkWhenExpressionsOnItems(
  newMenus.defaultWebViewContextMenu?.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  'defaultWebViewContextMenu',
);
```

And inside the `webViewMenus` forEach loop (after the existing `checkNewMenuItems` calls for the web view):

```ts
checkWhenExpressionsOnItems(
  newWebView?.topMenu?.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  `webViewMenus.${webViewName}.topMenu`,
);
checkWhenExpressionsOnItems(
  newWebView?.contextMenu?.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  `webViewMenus.${webViewName}.contextMenu`,
);
```

In `validateOutput`, after `checkMenuItemsForDuplicateOrdering(allMenus.mainMenu.items);` add the same checks against the combined output (this also covers the base document):

```ts
checkWhenExpressionsOnItems(allMenus.mainMenu.items, MAIN_MENU_TEMPLATE_VARS, 'mainMenu');
checkWhenExpressionsOnItems(
  allMenus.defaultWebViewTopMenu.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  'defaultWebViewTopMenu',
);
checkWhenExpressionsOnItems(
  allMenus.defaultWebViewContextMenu.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  'defaultWebViewContextMenu',
);
```

and inside the `validateOutput` webViewMenus loop:

```ts
checkWhenExpressionsOnItems(
  webViewMenu.topMenu?.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  `webViewMenus.${webViewName}.topMenu`,
);
checkWhenExpressionsOnItems(
  webViewMenu.contextMenu?.items,
  WEB_VIEW_MENU_TEMPLATE_VARS,
  `webViewMenus.${webViewName}.contextMenu`,
);
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/shared/utils/menu-document-combiner.test.ts`
Expected: PASS (new and existing)

- [ ] **Step 5: Commit**

```bash
git add src/shared/utils/menu-document-combiner.ts src/shared/utils/menu-document-combiner.test.ts
git commit -m "feat(menus): validate when-expressions at contribution load time"
```

---

### Task 6: Shared-store `onDidChange` event + contextKeys key space

**Files:**

- Modify: `src/shared/services/shared-store.service.ts`
- Modify: `src/shared/services/shared-store.service.test.ts`

- [ ] **Step 1: Write the failing tests**

Add to `shared-store.service.test.ts` (imports: add `onDidChangeSharedStore` to the existing import from `./shared-store.service`):

```ts
describe('onDidChangeSharedStore', () => {
  beforeEach(async () => {
    await initializeSharedStore(networkService);
  });

  it('fires for local set operations', () => {
    const handler = vi.fn();
    const unsubscribe = onDidChangeSharedStore(handler);
    sharedStoreService.set(testKey, 1234);
    expect(handler).toHaveBeenCalledWith({ key: testKey, value: 1234 });
    unsubscribe();
  });

  it('fires for remote changes that are applied', () => {
    const handler = vi.fn();
    const unsubscribe = onDidChangeSharedStore(handler);
    const changeEventHandler = vi.mocked(mockEventHandler).mock.calls[0][0];
    changeEventHandler({
      key: testKey,
      value: 4321,
      clock: { counter: 100, processId: 'other-process' },
    });
    expect(handler).toHaveBeenCalledWith({ key: testKey, value: 4321 });
    unsubscribe();
  });

  it('does not fire for stale remote changes that are ignored', () => {
    sharedStoreService.set(testKey, 1);
    sharedStoreService.set(testKey, 2);
    const handler = vi.fn();
    const unsubscribe = onDidChangeSharedStore(handler);
    const changeEventHandler = vi.mocked(mockEventHandler).mock.calls[0][0];
    changeEventHandler({
      key: testKey,
      value: 999,
      clock: { counter: 1, processId: 'other-process' },
    });
    expect(handler).not.toHaveBeenCalled();
    unsubscribe();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/shared/services/shared-store.service.test.ts`
Expected: FAIL — `onDidChangeSharedStore` is not exported

- [ ] **Step 3: Implement**

In `shared-store.service.ts`:

Add `PlatformEvent` and `ContextKeyValue` to the platform-bible-utils import.

After the `localStore` declaration (~line 39), add:

```ts
/** Event describing a change to a value in the shared store */
export type SharedStoreChangeEvent = {
  key: string;
  value: unknown;
};

// Notifies in-process subscribers about all store changes — both changes made locally and changes
// applied from other processes. (The network event emitter below only carries cross-process
// traffic; locally-originated changes never re-enter through it.)
const onDidChangeStoreEmitter = new PlatformEventEmitter<SharedStoreChangeEvent>();

/**
 * Event that fires whenever any value in the shared store changes, whether the change was made in
 * this process or applied from another process. Platform-internal.
 */
export const onDidChangeSharedStore: PlatformEvent<SharedStoreChangeEvent> =
  onDidChangeStoreEmitter.event;
```

In `set()`, after `storeChangeEmitter.emit({ key, value: clonedValue, clock });` add:

```ts
onDidChangeStoreEmitter.emit({ key, value: clonedValue });
```

Replace the body of `setFromRemote` with:

```ts
function setFromRemote(key: string, entry: StoreEntry): void {
  localCounter = Math.max(localCounter, entry.clock.counter);
  if (!localStore[key] || compareClocks(entry.clock, localStore[key].clock) > 0) {
    localStore[key] = entry;
    onDidChangeStoreEmitter.emit({ key, value: entry.value });
  }
}
```

Replace the `SharedStoreValues` interface and add the key type:

```ts
/**
 * Keys for context key values (see `context-keys.service.ts`). Keys are dynamically constructed by
 * adding this prefix to the context key name.
 */
export type ContextKeySharedStoreKey = `contextKeys.${string}`;

// Keep in sync with SharedStoreKeys.cs
/**
 * Defines the keys and types of values held in key-value pairs within the shared store service.
 * Since this service is not part of the public API, the keys and types are not included in
 * `papi-shared-types.ts`. If the platform needs more key-value pairs, they should be added here.
 */
export interface SharedStoreValues {
  [timeoutKey: RequestTimeoutSharedStoreKey]: number | undefined;
  [contextKey: ContextKeySharedStoreKey]: ContextKeyValue | undefined;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/shared/services/shared-store.service.test.ts`
Expected: PASS (new and existing)

- [ ] **Step 5: Commit**

```bash
git add src/shared/services/shared-store.service.ts src/shared/services/shared-store.service.test.ts
git commit -m "feat(shared-store): add in-process change event and contextKeys key space"
```

---

### Task 7: `contextKeysService` (TypeScript)

**Files:**

- Create: `src/shared/services/context-keys.service-model.ts`
- Create: `src/shared/services/context-keys.service.ts`
- Create: `src/shared/services/context-keys.service.test.ts`

- [ ] **Step 1: Create the model file**

Create `src/shared/services/context-keys.service-model.ts`. Follow the JSDOC SOURCE/DESTINATION pattern used by `scroll-group.service-model.ts` / `scroll-group.service.ts`:

```ts
import { ContextKeyValue } from 'platform-bible-utils';

/** Event emitted when a context key's value changes */
export type ContextKeyChangeEvent = {
  /** The context key that changed (without any internal storage prefix) */
  key: string;
  /** The new value, or `undefined` if the key was removed */
  value: ContextKeyValue | undefined;
};

/** JSDOC DESTINATION contextKeysService */
export interface IContextKeysService {
  /**
   * Sets or updates a context key.
   *
   * Throws if the key is not structurally valid (at least two dot-separated segments of word
   * characters or hyphens) or the value is not a string, number, or boolean.
   *
   * Conventions: prefix keys with your extension's name (`platform.` is reserved); give each key
   * exactly one producer. A key first set in one process can only be updated from that same process
   * (ownership violations are logged, not thrown).
   *
   * @param key The context key to set, e.g. `myExtension.project.<projectId>.isEditable`
   * @param value The value to set (string, number, or boolean)
   */
  set(key: string, value: ContextKeyValue): void;
  /**
   * Gets the current value of a context key synchronously from the in-process store copy — no
   * network call.
   *
   * @param key The context key to read
   * @returns The current value, or `undefined` if the key has never been set or was removed
   */
  get(key: string): ContextKeyValue | undefined;
  /**
   * Sets a context key's value to `undefined`. The key is not deleted from the underlying store
   * (this avoids race conditions if it is set again quickly).
   *
   * @param key The context key to remove
   */
  remove(key: string): void;
}
```

- [ ] **Step 2: Write the failing tests**

Create `src/shared/services/context-keys.service.test.ts` (mirror the mock setup of `shared-store.service.test.ts`):

```ts
import { vi } from 'vitest';
import * as networkService from '@shared/services/network.service';
import { ProcessType } from '@shared/global-this.model';
import { PlatformEventEmitter } from 'platform-bible-utils';
import {
  initialize as initializeSharedStore,
  resetForTesting,
} from '@shared/services/shared-store.service';
import { contextKeysService, papiContextKeysService } from './context-keys.service';

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitter: vi.fn(),
  getNetworkEvent: vi.fn(),
  request: vi.fn(),
  registerRequestHandler: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe('contextKeysService', () => {
  const mockEmitter = {
    emit: vi.fn(),
    event: vi.fn(),
    subscribe: vi.fn(),
    subscribeOnce: vi.fn(),
    dispose: vi.fn(),
    emitLocal: vi.fn(),
  };
  const mockEventHandler = vi.fn();
  const originalProcessType = globalThis.processType;

  beforeEach(async () => {
    vi.resetAllMocks();
    vi.mocked(networkService.createNetworkEventEmitter).mockReturnValue(
      // Needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as PlatformEventEmitter<unknown>,
    );
    vi.mocked(networkService.getNetworkEvent).mockReturnValue(mockEventHandler);
    globalThis.processType = ProcessType.Main;
    await initializeSharedStore(networkService);
  });

  afterEach(() => {
    globalThis.processType = originalProcessType;
    resetForTesting();
  });

  it('round-trips values through set and get', () => {
    contextKeysService.set('testExt.someFlag', true);
    expect(contextKeysService.get('testExt.someFlag')).toBe(true);
    contextKeysService.set('testExt.someFlag', false);
    expect(contextKeysService.get('testExt.someFlag')).toBe(false);
    contextKeysService.set('testExt.viewMode', 'formatted');
    expect(contextKeysService.get('testExt.viewMode')).toBe('formatted');
  });

  it('stores values under the contextKeys. prefix in the shared store', () => {
    contextKeysService.set('testExt.someFlag', true);
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'contextKeys.testExt.someFlag', value: true }),
    );
  });

  it('returns undefined for keys that were never set', () => {
    expect(contextKeysService.get('testExt.neverSet')).toBeUndefined();
  });

  it('throws on invalid key formats', () => {
    expect(() => contextKeysService.set('singleSegment', true)).toThrow(/Invalid context key/);
    expect(() => contextKeysService.set('bad key.x', true)).toThrow(/Invalid context key/);
    expect(() => contextKeysService.get('singleSegment')).toThrow(/Invalid context key/);
    expect(() => contextKeysService.remove('singleSegment')).toThrow(/Invalid context key/);
  });

  it('throws on invalid value types', () => {
    // Testing the runtime guard against non-scalar values
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect(() => contextKeysService.set('testExt.bad', { a: 1 } as unknown as string)).toThrow(
      /Invalid context key value/,
    );
  });

  it('removes values by setting them to undefined', () => {
    contextKeysService.set('testExt.someFlag', true);
    contextKeysService.remove('testExt.someFlag');
    expect(contextKeysService.get('testExt.someFlag')).toBeUndefined();
  });

  it('fires onDidChange with the unprefixed key for context key changes', () => {
    const handler = vi.fn();
    const unsubscribe = contextKeysService.onDidChange(handler);
    contextKeysService.set('testExt.someFlag', true);
    expect(handler).toHaveBeenCalledWith({ key: 'testExt.someFlag', value: true });
    unsubscribe();
  });

  it('does not fire onDidChange for non-contextKeys shared store changes', () => {
    const handler = vi.fn();
    const unsubscribe = contextKeysService.onDidChange(handler);
    const changeEventHandler = vi.mocked(mockEventHandler).mock.calls[0][0];
    changeEventHandler({
      key: 'platform.customNetworkTimeoutMs.test',
      value: 9,
      clock: { counter: 50, processId: 'other-process' },
    });
    expect(handler).not.toHaveBeenCalled();
    unsubscribe();
  });

  it('exposes only set/get/remove on the PAPI subset', () => {
    expect(Object.keys(papiContextKeysService).sort()).toEqual(['get', 'remove', 'set']);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run src/shared/services/context-keys.service.test.ts`
Expected: FAIL — cannot resolve `./context-keys.service`

- [ ] **Step 4: Implement the service**

Create `src/shared/services/context-keys.service.ts`:

```ts
import {
  ContextKeyValue,
  isValidContextKey,
  isValidContextKeyValue,
  PlatformEventEmitter,
} from 'platform-bible-utils';
import {
  ContextKeySharedStoreKey,
  onDidChangeSharedStore,
  sharedStoreService,
} from '@shared/services/shared-store.service';
import {
  ContextKeyChangeEvent,
  IContextKeysService,
} from '@shared/services/context-keys.service-model';

/** Prefix under which all context keys live in the shared store */
const CONTEXT_KEYS_STORE_PREFIX = 'contextKeys.';

function getStoreKey(key: string): ContextKeySharedStoreKey {
  return `${CONTEXT_KEYS_STORE_PREFIX}${key}`;
}

function assertValidKey(key: string): void {
  if (!isValidContextKey(key))
    throw new Error(
      `Invalid context key '${key}'. Context keys must have at least two dot-separated segments of word characters or hyphens, e.g. 'myExtension.someProperty'`,
    );
}

function set(key: string, value: ContextKeyValue): void {
  assertValidKey(key);
  if (!isValidContextKeyValue(value))
    throw new Error(
      `Invalid context key value for '${key}'. Only string, number, and boolean values are allowed`,
    );
  sharedStoreService.set(getStoreKey(key), value);
}

function get(key: string): ContextKeyValue | undefined {
  assertValidKey(key);
  return sharedStoreService.get(getStoreKey(key));
}

function remove(key: string): void {
  assertValidKey(key);
  sharedStoreService.remove(getStoreKey(key));
}

const onDidChangeEmitter = new PlatformEventEmitter<ContextKeyChangeEvent>();

// Forward shared-store changes within the contextKeys namespace to our subscribers with the
// internal storage prefix stripped
onDidChangeSharedStore((event) => {
  if (!event.key.startsWith(CONTEXT_KEYS_STORE_PREFIX)) return;
  onDidChangeEmitter.emit({
    key: event.key.substring(CONTEXT_KEYS_STORE_PREFIX.length),
    // Values in the contextKeys namespace are constrained to ContextKeyValue on every writer
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    value: event.value as ContextKeyValue | undefined,
  });
});

/**
 * JSDOC SOURCE contextKeysService Service for reading and writing context keys: named properties
 * that drive dynamic UI state such as menu item visibility (`when`), enablement (`enabledWhen`),
 * and checked state (`checkedWhen`) declared in menus.json contributions.
 *
 * Context keys live in a single flat, in-memory, cross-process store (the platform shared store),
 * so reads are synchronous — no network calls. Values are ephemeral: they are never persisted and
 * producers must re-publish after a restart.
 *
 * Conventions:
 *
 * - Key format: at least two dot-separated segments of word characters or hyphens
 * - Prefix keys with your extension's name; `platform.` is reserved for the platform
 * - Scoping is by key construction, e.g. `myExt.project.<projectId>.isEditable` — menu expressions
 *   reference these with template variables like `{projectId}`
 * - Each key should have exactly one producer. A key first set in one process can only be updated
 *   from that same process
 */
export const contextKeysService = {
  set,
  get,
  remove,
  /**
   * Event that fires when any context key changes (whether changed locally or in another process).
   * Platform-internal — not exposed on PAPI.
   */
  onDidChange: onDidChangeEmitter.event,
};

/** Subset of the context keys service exposed on PAPI (both `@papi/backend` and `@papi/frontend`) */
export const papiContextKeysService: IContextKeysService = { set, get, remove };
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/shared/services/context-keys.service.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/shared/services/context-keys.service-model.ts src/shared/services/context-keys.service.ts src/shared/services/context-keys.service.test.ts
git commit -m "feat(shared): add contextKeysService facade over shared-store"
```

---

### Task 8: Expose `papi.contextKeys` (backend + frontend)

**Files:**

- Modify: `src/extension-host/services/papi-backend.service.ts`
- Modify: `src/renderer/services/papi-frontend.service.ts`
- Regenerate: `papi.d.ts` (via `npm run build:types` — NEVER hand-edit)

- [ ] **Step 1: Add to papi-backend.service.ts**

Add imports:

```ts
import { IContextKeysService } from '@shared/services/context-keys.service-model';
import { papiContextKeysService } from '@shared/services/context-keys.service';
```

In the `papi` object (after `commands:` to keep rough alphabetical order):

```ts
  /** JSDOC DESTINATION contextKeysService */
  contextKeys: papiContextKeysService as IContextKeysService,
```

In the destructured exports section (mirroring the `commands` pattern):

```ts
/** JSDOC DESTINATION contextKeysService */
export const { contextKeys } = papi;
```

- [ ] **Step 2: Add to papi-frontend.service.ts**

Add imports (this file sorts imports alphabetically):

```ts
import { papiContextKeysService } from '@shared/services/context-keys.service';
import { IContextKeysService } from '@shared/services/context-keys.service-model';
```

In the `papi` object (after `commands:`):

```ts
  /** JSDOC DESTINATION contextKeysService */
  contextKeys: papiContextKeysService as IContextKeysService,
```

In the destructured exports section:

```ts
/** JSDOC DESTINATION contextKeysService */
export const { contextKeys } = papi;
```

- [ ] **Step 3: Regenerate types**

Run: `npm run build:types`
Then: `grep -n "contextKeys" papi.d.ts | head`
Expected: `contextKeys` appears in both the backend and frontend papi sections with the JSDoc from the model/service.

- [ ] **Step 4: Verify lint/typecheck**

Run: `npm run lint && npm run typecheck`
Expected: clean

- [ ] **Step 5: Commit**

```bash
git add src/extension-host/services/papi-backend.service.ts src/renderer/services/papi-frontend.service.ts papi.d.ts lib/papi-dts
git commit -m "feat(papi): expose papi.contextKeys on backend and frontend"
```

(Include any other files `build:types` regenerated — check `git status` and include them all.)

---

### Task 9: `useEvaluatedMenu` renderer hook

**Files:**

- Create: `src/renderer/hooks/use-evaluated-menu.hook.ts`
- Create: `src/renderer/hooks/use-evaluated-menu.hook.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/renderer/hooks/use-evaluated-menu.hook.test.ts`:

```ts
import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { PlatformEventEmitter, SingleColumnMenu } from 'platform-bible-utils';

const mockContextKeyValues = new Map<string, string | number | boolean>();
const mockOnDidChangeEmitter = new PlatformEventEmitter<{ key: string; value: unknown }>();

vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: {
    get: (key: string) => mockContextKeyValues.get(key),
    onDidChange: (callback: (event: { key: string; value: unknown }) => void) =>
      mockOnDidChangeEmitter.event(callback),
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Import after mocks
// eslint-disable-next-line import/first
import { useEvaluatedMenu } from './use-evaluated-menu.hook';

const menuData: SingleColumnMenu = {
  groups: { 'test.group': { order: 1 } },
  items: [
    {
      label: '%always%',
      group: 'test.group',
      order: 1,
      command: 'test.always',
      localizeNotes: '',
    },
    {
      label: '%conditional%',
      group: 'test.group',
      order: 2,
      command: 'test.conditional',
      localizeNotes: '',
      when: 'test.webView.{webViewId}.visible',
    },
  ],
};

describe('useEvaluatedMenu', () => {
  beforeEach(() => {
    mockContextKeyValues.clear();
  });

  it('returns undefined for undefined menu data', () => {
    const { result } = renderHook(() => useEvaluatedMenu(undefined, {}));
    expect(result.current).toBeUndefined();
  });

  it('evaluates the menu with the provided template vars', () => {
    mockContextKeyValues.set('test.webView.wv1.visible', true);
    const { result } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });

  it('re-evaluates when a context key changes', () => {
    const { result } = renderHook(() => useEvaluatedMenu(menuData, { webViewId: 'wv1' }));
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%']);

    act(() => {
      mockContextKeyValues.set('test.webView.wv1.visible', true);
      mockOnDidChangeEmitter.emit({ key: 'test.webView.wv1.visible', value: true });
    });
    expect(result.current?.items.map((item) => item.label)).toEqual(['%always%', '%conditional%']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/renderer/hooks/use-evaluated-menu.hook.test.ts`
Expected: FAIL — cannot resolve `./use-evaluated-menu.hook`

- [ ] **Step 3: Implement the hook**

Create `src/renderer/hooks/use-evaluated-menu.hook.ts`:

```ts
import { useEffect, useMemo, useState } from 'react';
import { EvaluatableMenu, evaluateMenu, getErrorMessage } from 'platform-bible-utils';
import { contextKeysService } from '@shared/services/context-keys.service';
import { logger } from '@shared/services/logger.service';

/**
 * Evaluates the when-expressions in a menu document against current context keys and re-evaluates
 * whenever any context key changes.
 *
 * @param menuData The menu document to evaluate (pass a referentially stable object — e.g. state or
 *   memoized data)
 * @param templateVars Values for `{placeholder}` segments in expression property references. MUST
 *   be referentially stable (memoize in the caller) or the menu re-evaluates every render
 * @returns The evaluated menu document (hidden items removed, `disabled`/`checked` decorated), or
 *   `undefined` if `menuData` is `undefined`
 */
export function useEvaluatedMenu<T extends EvaluatableMenu>(
  menuData: T | undefined,
  templateVars: Record<string, string | undefined>,
): T | undefined {
  const [contextKeysVersion, setContextKeysVersion] = useState(0);

  useEffect(
    () => contextKeysService.onDidChange(() => setContextKeysVersion((version) => version + 1)),
    [],
  );

  return useMemo(() => {
    if (!menuData) return undefined;
    return evaluateMenu(menuData, contextKeysService.get, templateVars, (expression, error) => {
      logger.warn(
        `Error evaluating menu when-expression '${expression}': ${getErrorMessage(error)}`,
      );
    });
    // contextKeysVersion intentionally triggers re-evaluation when any context key changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData, templateVars, contextKeysVersion]);
}

export default useEvaluatedMenu;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/renderer/hooks/use-evaluated-menu.hook.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/renderer/hooks/use-evaluated-menu.hook.ts src/renderer/hooks/use-evaluated-menu.hook.test.ts
git commit -m "feat(renderer): add useEvaluatedMenu hook for reactive menu evaluation"
```

---

### Task 10: Render `disabled`/`checked` in menu components

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx`
- Modify: `lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx`
- Create: `lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.test.tsx`
- Modify: `lib/platform-bible-react/src/stories/advanced/platform-menubar.stories.tsx`

These are NOT shadcn-ui vendored files — no `CUSTOM` markers needed. `MenubarCheckboxItem` and `DropdownMenuCheckboxItem` already exist in the shadcn components.

- [ ] **Step 1: Write the failing component test**

Create `platform-menubar.component.test.tsx` (match setup conventions of existing tests like `comment-list/comment-thread.component.test.tsx` — check its imports for the userEvent setup pattern used in this lib):

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { vi } from 'vitest';
import { PlatformMenubar } from './platform-menubar.component';

const menuData: Localized<MultiColumnMenu> = {
  columns: { 'test.column': { label: 'TestColumn', order: 1 } },
  groups: { 'test.group': { column: 'test.column', order: 1 } },
  items: [
    {
      label: 'Enabled Item',
      group: 'test.group',
      order: 1,
      command: 'test.enabled',
      localizeNotes: '',
    },
    {
      label: 'Disabled Item',
      group: 'test.group',
      order: 2,
      command: 'test.disabled',
      localizeNotes: '',
      disabled: true,
    },
    {
      label: 'Checked Item',
      group: 'test.group',
      order: 3,
      command: 'test.checked',
      localizeNotes: '',
      checked: true,
    },
    {
      label: 'Unchecked Item',
      group: 'test.group',
      order: 4,
      command: 'test.unchecked',
      localizeNotes: '',
      checked: false,
    },
  ],
};

describe('PlatformMenubar dynamic item states', () => {
  it('renders disabled and checkbox menu items', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={menuData} onSelectMenuItem={vi.fn()} />);

    await user.click(screen.getByText('TestColumn'));

    const disabledItem = await screen.findByText('Disabled Item');
    expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('data-disabled');

    const checkedItem = screen.getByText('Checked Item');
    expect(checkedItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute(
      'aria-checked',
      'true',
    );

    const uncheckedItem = screen.getByText('Unchecked Item');
    expect(uncheckedItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute(
      'aria-checked',
      'false',
    );

    const enabledItem = screen.getByText('Enabled Item');
    expect(enabledItem.closest('[role="menuitem"]')).not.toHaveAttribute('data-disabled');
  });
});
```

(If Radix attributes differ in this version, assert on `aria-disabled` instead of `data-disabled` — inspect the rendered DOM with `screen.debug()` once and pin the correct attribute.)

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lib/platform-bible-react && npx vitest run src/components/advanced/menus/platform-menubar.component.test.tsx`
Expected: FAIL — no `[role="menuitemcheckbox"]` rendered, disabled attribute missing

- [ ] **Step 3: Implement in platform-menubar.component.tsx**

Add `MenubarCheckboxItem` to the shadcn menubar import. Replace the item-mapping callback inside `getMenubarContent` (the `.map((item: ...) => { return (<Tooltip ...>...)})` block) with:

```tsx
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) => {
        let menuEntry;
        if ('command' in item) {
          const itemContent = (
            <>
              {item.iconPathBefore && (
                <MenuItemIcon icon={item.iconPathBefore} menuLabel={item.label} leading />
              )}
              {item.label}
              {item.iconPathAfter && <MenuItemIcon icon={item.iconPathAfter} menuLabel={item.label} />}
            </>
          );
          const handleClick = () => {
            // Since the item has a command, we know it is a MenuItemContainingCommand.
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onSelectMenuItem(item as MenuItemContainingCommand);
          };
          menuEntry =
            item.checked !== undefined ? (
              <MenubarCheckboxItem
                key={`menubar-item-${item.label}-${item.command}`}
                checked={item.checked}
                disabled={item.disabled}
                onClick={handleClick}
              >
                {itemContent}
              </MenubarCheckboxItem>
            ) : (
              <MenubarItem
                key={`menubar-item-${item.label}-${item.command}`}
                disabled={item.disabled}
                onClick={handleClick}
              >
                {itemContent}
              </MenubarItem>
            );
        } else {
          menuEntry = (
            <MenubarSub key={`menubar-sub-${item.label}-${item.id}`}>
              <MenubarSubTrigger disabled={item.disabled}>{item.label}</MenubarSubTrigger>
              <MenubarSubContent>
                {getMenubarContent(
                  groups,
                  items,
                  getSubMenuGroupKeyForMenuItemId(groups, item.id),
                  onSelectMenuItem,
                )}
              </MenubarSubContent>
            </MenubarSub>
          );
        }
        return (
          <Tooltip key={`tooltip-${item.label}-${'command' in item ? item.command : item.id}`}>
            <TooltipTrigger asChild>{menuEntry}</TooltipTrigger>
            {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
          </Tooltip>
        );
      });
```

- [ ] **Step 4: Implement the same change in tab-dropdown-menu.component.tsx**

Add `DropdownMenuCheckboxItem` to the shadcn dropdown-menu import. Replace the item-mapping callback inside `getGroupContent` with:

```tsx
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) => {
        let menuEntry;
        if ('command' in item) {
          const itemContent = (
            <>
              {item.iconPathBefore && (
                <MenuItemIcon icon={item.iconPathBefore} menuLabel={item.label} leading />
              )}
              {item.label}
              {item.iconPathAfter && <MenuItemIcon icon={item.iconPathAfter} menuLabel={item.label} />}
            </>
          );
          const handleClick = () => {
            // Since the item has a command, we know it is a MenuItemContainingCommand.
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onSelectMenuItem(item as MenuItemContainingCommand);
          };
          menuEntry =
            item.checked !== undefined ? (
              <DropdownMenuCheckboxItem
                key={`dropdown-menu-item-${item.label}-${item.command}`}
                checked={item.checked}
                disabled={item.disabled}
                onClick={handleClick}
              >
                {itemContent}
              </DropdownMenuCheckboxItem>
            ) : (
              <DropdownMenuItem
                key={`dropdown-menu-item-${item.label}-${item.command}`}
                disabled={item.disabled}
                onClick={handleClick}
              >
                {itemContent}
              </DropdownMenuItem>
            );
        } else {
          menuEntry = (
            <DropdownMenuSub key={`dropdown-menu-sub-${item.label}-${item.id}`}>
              <DropdownMenuSubTrigger disabled={item.disabled}>{item.label}</DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {getGroupContent(
                    groups,
                    items,
                    getSubMenuGroupKeyForMenuItemId(groups, item.id),
                    onSelectMenuItem,
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          );
        }
        return (
          <Tooltip key={`tooltip-${item.label}-${'command' in item ? item.command : item.id}`}>
            <TooltipTrigger asChild>{menuEntry}</TooltipTrigger>
            {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
          </Tooltip>
        );
      });
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd lib/platform-bible-react && npx vitest run src/components/advanced/menus/platform-menubar.component.test.tsx`
Expected: PASS

- [ ] **Step 6: Add a story showing dynamic states**

In `lib/platform-bible-react/src/stories/advanced/platform-menubar.stories.tsx`, add a new exported story (match the file's existing story object shape — read it first):

```tsx
export const DynamicItemStates: Story = {
  args: {
    menuData: {
      columns: { 'story.dynamic': { label: 'Dynamic', order: 1 } },
      groups: { 'story.dynamicGroup': { column: 'story.dynamic', order: 1 } },
      items: [
        {
          label: 'Always enabled',
          group: 'story.dynamicGroup',
          order: 1,
          command: 'story.enabled',
          localizeNotes: '',
        },
        {
          label: 'Disabled (enabledWhen was falsy)',
          group: 'story.dynamicGroup',
          order: 2,
          command: 'story.disabled',
          localizeNotes: '',
          disabled: true,
        },
        {
          label: 'Checked toggle (checkedWhen was truthy)',
          group: 'story.dynamicGroup',
          order: 3,
          command: 'story.checked',
          localizeNotes: '',
          checked: true,
        },
        {
          label: 'Unchecked toggle',
          group: 'story.dynamicGroup',
          order: 4,
          command: 'story.unchecked',
          localizeNotes: '',
          checked: false,
        },
      ],
    },
    onSelectMenuItem: (item) => console.log('selected', item),
  },
};
```

Verify with: `npm run storybook` (from `lib/platform-bible-react`) — optional visual check.

- [ ] **Step 7: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/menus/ lib/platform-bible-react/src/stories/advanced/platform-menubar.stories.tsx
git commit -m "feat(react): render disabled and checked menu item states"
```

---

### Task 11: Wire evaluation into renderer surfaces

**Files:**

- Modify: `src/renderer/components/platform-bible-toolbar.tsx`
- Modify: `src/renderer/components/web-view.component.tsx`
- Modify: `src/renderer/services/overlays/overlay.service-host.ts`

- [ ] **Step 1: Main menu (platform-bible-toolbar.tsx)**

Add imports:

```ts
import { useEvaluatedMenu } from '@renderer/hooks/use-evaluated-menu.hook';
```

Add a module-level constant near the other constants (stable reference — the main menu has no template vars in v1):

```ts
/** The main menu provides no template variables for when-expressions in v1 */
const MAIN_MENU_TEMPLATE_VARS = {};
```

After the `const [menuData] = usePromise(...)` block (~line 192), add:

```ts
const evaluatedMenuData = useEvaluatedMenu(menuData, MAIN_MENU_TEMPLATE_VARS) ?? menuData;
```

In the JSX, change `<Toolbar menuData={menuData}` to `<Toolbar menuData={evaluatedMenuData}`.

- [ ] **Step 2: Web view top menu (web-view.component.tsx)**

Add import:

```ts
import { useEvaluatedMenu } from '@renderer/hooks/use-evaluated-menu.hook';
```

After the `const webViewMenu = useMemo(...)` block (~line 507), add:

```ts
const menuTemplateVars = useMemo(
  () => ({ webViewId: id, webViewType, projectId }),
  [id, webViewType, projectId],
);
const evaluatedTopMenu = useEvaluatedMenu(webViewMenu.topMenu, menuTemplateVars);
```

In the `<TabToolbar` JSX, change `projectMenuData={webViewMenu.topMenu}` to `projectMenuData={evaluatedTopMenu}`.

(If `webViewMenu` can be a `PlatformError` at this point, it has already been normalized to `WEB_VIEW_MENU_DEFAULT` by the existing `useMemo` — confirm and keep that behavior.)

- [ ] **Step 3: Web view context menu (overlay.service-host.ts)**

Add imports:

```ts
import { evaluateMenu, getErrorMessage } from 'platform-bible-utils';
import { contextKeysService } from '@shared/services/context-keys.service';
import { webViewService } from '@shared/services/web-view.service';
```

(Adjust if some are already imported.) In `showContextMenu`, replace:

```ts
const items = convertContributionToContextMenuItems(webViewMenu.contextMenu);
```

with:

```ts
const webViewDefinition = await webViewService.getOpenWebViewDefinition(webViewId);
const evaluatedContextMenu = evaluateMenu(
  webViewMenu.contextMenu,
  contextKeysService.get,
  { webViewId, webViewType, projectId: webViewDefinition?.projectId },
  (expression, error) =>
    logger.warn(
      `Error evaluating context menu when-expression '${expression}': ${getErrorMessage(error)}`,
    ),
);
const items = convertContributionToContextMenuItems(evaluatedContextMenu);
```

Note: overlay context menus get visibility filtering only in v1 — the `OverlayContextMenuItem` model ignores `disabled`/`checked`. This is a documented spec follow-up.

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run typecheck`
Expected: clean

Run: `npx vitest run src/renderer` (repo root)
Expected: PASS (existing renderer tests unaffected)

- [ ] **Step 5: Commit**

```bash
git add src/renderer/components/platform-bible-toolbar.tsx src/renderer/components/web-view.component.tsx src/renderer/services/overlays/overlay.service-host.ts
git commit -m "feat(renderer): evaluate dynamic menus in toolbar, web view menus, and context menus"
```

---

### Task 12: macOS native menubar evaluation

**Files:**

- Modify: `src/main/platform-macos-menubar.util.ts`

- [ ] **Step 1: Implement**

Add imports:

```ts
import { evaluateMenu } from 'platform-bible-utils'; // add to existing platform-bible-utils import
import { contextKeysService } from '@shared/services/context-keys.service';
```

Replace `subscribeCurrentMacosMenubar` with a version that keeps the last menu content and rebuilds on context-key changes:

```ts
export async function subscribeCurrentMacosMenubar() {
  let currentMainMenu: MultiColumnMenu | undefined;

  async function rebuildMacosMenubar(): Promise<void> {
    let currentMacosMenubarTemplate;
    try {
      if (!currentMainMenu) throw new Error('No main menu data available');
      // The main menu provides no template variables for when-expressions in v1
      const evaluatedMainMenu = evaluateMenu(
        currentMainMenu,
        contextKeysService.get,
        {},
        (expression, error) =>
          logger.warn(
            `Error evaluating macOS menubar when-expression '${expression}': ${getErrorMessage(error)}`,
          ),
      );
      currentMacosMenubarTemplate = await translatePlatformMenuItemsAndCombine(evaluatedMainMenu);
    } catch (error) {
      logger.error(
        'Failed to get current platform menus. Falling back to default macOS menubar.',
        error,
      );
      currentMacosMenubarTemplate = await fallbackToDefaultMacosMenubar();
    }

    try {
      const coreMacosMenubar = Menu.buildFromTemplate(currentMacosMenubarTemplate);
      Menu.setApplicationMenu(coreMacosMenubar);
    } catch (error) {
      logger.error('Failed to build current macOS menubar', error);
    }
  }

  const unsubscribeMenuData = await menuDataService.subscribeUnlocalizedMainMenu(
    undefined,
    async (menuContent: MultiColumnMenu | PlatformError) => {
      currentMainMenu = isPlatformError(menuContent) ? undefined : menuContent;
      if (isPlatformError(menuContent))
        logger.error(`PlatformError getting main menu: ${getErrorMessage(menuContent)}`);
      await rebuildMacosMenubar();
    },
  );

  const unsubscribeContextKeys = contextKeysService.onDidChange(() => {
    rebuildMacosMenubar().catch((error) =>
      logger.error('Failed to rebuild macOS menubar after context key change', error),
    );
  });

  return async () => {
    unsubscribeContextKeys();
    return unsubscribeMenuData();
  };
}
```

In `getMenubarColumnContent`, extend the command-item branch object to carry enabled/checkbox state:

```ts
          'command' in item
            ? {
                label: item.label,
                // Since the item has a command, we know it is a MenuItemContainingCommand.
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                click: () => handleMenuCommand(item as MenuItemContainingCommand, groupKey),
                order: item.order,
                enabled: !item.disabled,
                ...(item.checked !== undefined && {
                  type: 'checkbox' as const,
                  checked: item.checked,
                }),
              }
            : {
```

(Hidden items never reach this function — `evaluateMenu` already removed them.)

- [ ] **Step 2: Verify the caller still compiles** — `src/main/main.ts:16` imports `subscribeCurrentMacosMenubar`; the return type is still an async unsubscriber.

Run: `npm run lint && npm run typecheck`
Expected: clean

- [ ] **Step 3: Commit**

```bash
git add src/main/platform-macos-menubar.util.ts
git commit -m "feat(main): evaluate dynamic menu state in macOS native menubar"
```

---

### Task 13: C# `ContextKeys` wrapper

**Files:**

- Create: `c-sharp/Services/ContextKeys.cs`
- Create: `c-sharp/Services/ContextKeysService.cs`
- Create: `c-sharp-tests/Services/FakeSharedStore.cs`
- Create: `c-sharp-tests/Services/ContextKeysTests.cs`

Before starting: read `c-sharp-tests/Services/NotificationServiceTests.cs` to copy the namespace and fixture conventions; read `c-sharp/Services/SharedStoreService.cs` (static facade pattern being mirrored).

- [ ] **Step 1: Write the failing tests**

Create `c-sharp-tests/Services/FakeSharedStore.cs` (adjust namespace to match the existing Services tests):

```csharp
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Services;

/// <summary>
/// Dictionary-backed ISharedStore for testing consumers without a PapiClient
/// </summary>
internal sealed class FakeSharedStore : ISharedStore
{
    public Dictionary<string, object?> Values { get; } = [];

    public bool TryGetValue<T>(string key, out T? value)
    {
        if (Values.TryGetValue(key, out var stored) && stored is T typed)
        {
            value = typed;
            return true;
        }
        value = default;
        return false;
    }

    public void Set<T>(string key, T? value)
    {
        Values[key] = value;
    }

    public void Remove<T>(string key)
    {
        Values[key] = default(T);
    }
}
```

Create `c-sharp-tests/Services/ContextKeysTests.cs`:

```csharp
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Services;

[TestFixture]
public class ContextKeysTests
{
    private FakeSharedStore _fakeStore = new();
    private ContextKeys _contextKeys = null!;

    [SetUp]
    public void SetUp()
    {
        _fakeStore = new FakeSharedStore();
        _contextKeys = new ContextKeys(_fakeStore);
    }

    [TestCase("myExtension.someProperty", ExpectedResult = true)]
    [TestCase("platformScripture.project.abc-123.isEditable", ExpectedResult = true)]
    [TestCase("a.b", ExpectedResult = true)]
    [TestCase("singleSegment", ExpectedResult = false)]
    [TestCase("", ExpectedResult = false)]
    [TestCase("a..b", ExpectedResult = false)]
    [TestCase("a.b c.d", ExpectedResult = false)]
    [TestCase("a.{b}.c", ExpectedResult = false)]
    public bool IsValidKey_MatchesTypeScriptValidation(string key)
    {
        return ContextKeys.IsValidKey(key);
    }

    [Test]
    public void Set_StoresValueUnderContextKeysPrefix()
    {
        _contextKeys.Set("myExt.someFlag", true);
        Assert.That(_fakeStore.Values, Does.ContainKey("contextKeys.myExt.someFlag"));
        Assert.That(_fakeStore.Values["contextKeys.myExt.someFlag"], Is.True);
    }

    [Test]
    public void Set_SupportsStringNumberAndBool()
    {
        _contextKeys.Set("myExt.mode", "formatted");
        _contextKeys.Set("myExt.count", 3);
        _contextKeys.Set("myExt.ratio", 1.5);
        _contextKeys.Set("myExt.flag", false);
        Assert.That(_fakeStore.Values["contextKeys.myExt.mode"], Is.EqualTo("formatted"));
        Assert.That(_fakeStore.Values["contextKeys.myExt.count"], Is.EqualTo(3));
        Assert.That(_fakeStore.Values["contextKeys.myExt.ratio"], Is.EqualTo(1.5));
        Assert.That(_fakeStore.Values["contextKeys.myExt.flag"], Is.False);
    }

    [Test]
    public void Set_ThrowsOnInvalidKey()
    {
        Assert.Throws<ArgumentException>(() => _contextKeys.Set("singleSegment", true));
    }

    [Test]
    public void TryGetValue_RoundTripsThroughPrefix()
    {
        _contextKeys.Set("myExt.someFlag", true);
        Assert.That(_contextKeys.TryGetValue<bool>("myExt.someFlag", out var value), Is.True);
        Assert.That(value, Is.True);
        Assert.That(_contextKeys.TryGetValue<bool>("myExt.missing", out _), Is.False);
    }

    [Test]
    public void Remove_SetsUnderlyingValueToDefault()
    {
        _contextKeys.Set("myExt.someFlag", true);
        _contextKeys.Remove("myExt.someFlag");
        Assert.That(_fakeStore.Values["contextKeys.myExt.someFlag"], Is.Null);
    }
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd c-sharp-tests && dotnet test --filter "FullyQualifiedName~ContextKeysTests"`
Expected: BUILD FAILURE — `ContextKeys` does not exist

- [ ] **Step 3: Implement**

Create `c-sharp/Services/ContextKeys.cs`:

```csharp
using System.Text.RegularExpressions;

namespace Paranext.DataProvider.Services;

/// <summary>
/// Facade over the shared store for "context keys": named properties that drive dynamic menu item
/// state (when/enabledWhen/checkedWhen expressions in menus.json contributions).
/// Keep key format and semantics in sync with context-keys.service.ts.
/// Values are constrained to string, number, and bool. Keys must have at least two dot-separated
/// segments of word characters or hyphens; prefix keys with your component's name.
/// A key first set in one process can only be updated from that same process.
/// </summary>
internal sealed partial class ContextKeys(ISharedStore sharedStore)
{
    private const string STORE_PREFIX = "contextKeys.";

    // Matches at least two dot-separated segments of [A-Za-z0-9_-] (mirrors isValidContextKey in
    // context-keys.model.ts; intentionally ASCII-only to match the JS \w semantics)
    [GeneratedRegex(@"^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$")]
    private static partial Regex ValidKeyRegex();

    private readonly ISharedStore _sharedStore = sharedStore;

    public static bool IsValidKey(string key)
    {
        return ValidKeyRegex().IsMatch(key);
    }

    public void Set(string key, string value)
    {
        SetInternal(key, value);
    }

    public void Set(string key, bool value)
    {
        SetInternal(key, value);
    }

    public void Set(string key, int value)
    {
        SetInternal(key, value);
    }

    public void Set(string key, double value)
    {
        SetInternal(key, value);
    }

    public bool TryGetValue<T>(string key, out T? value)
    {
        AssertValidKey(key);
        return _sharedStore.TryGetValue(STORE_PREFIX + key, out value);
    }

    public void Remove(string key)
    {
        AssertValidKey(key);
        _sharedStore.Remove<object>(STORE_PREFIX + key);
    }

    private void SetInternal<T>(string key, T value)
    {
        AssertValidKey(key);
        _sharedStore.Set(STORE_PREFIX + key, value);
    }

    private static void AssertValidKey(string key)
    {
        if (!IsValidKey(key))
            throw new ArgumentException(
                $"Invalid context key \"{key}\". Context keys must have at least two dot-separated "
                    + "segments of word characters or hyphens, e.g. \"myExtension.someProperty\"",
                nameof(key)
            );
    }
}
```

Create `c-sharp/Services/ContextKeysService.cs`:

```csharp
namespace Paranext.DataProvider.Services;

/// <summary>
/// Static access to context keys (see ContextKeys). Requires SharedStoreService to be initialized.
/// </summary>
internal static class ContextKeysService
{
    private static ContextKeys? _contextKeys;

    private static ContextKeys GetContextKeys()
    {
        return _contextKeys ??= new ContextKeys(SharedStoreService.GetSharedStore());
    }

    public static void Set(string key, string value)
    {
        GetContextKeys().Set(key, value);
    }

    public static void Set(string key, bool value)
    {
        GetContextKeys().Set(key, value);
    }

    public static void Set(string key, int value)
    {
        GetContextKeys().Set(key, value);
    }

    public static void Set(string key, double value)
    {
        GetContextKeys().Set(key, value);
    }

    public static bool TryGetValue<T>(string key, out T? value)
    {
        return GetContextKeys().TryGetValue(key, out value);
    }

    public static void Remove(string key)
    {
        GetContextKeys().Remove(key);
    }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd c-sharp-tests && dotnet test --filter "FullyQualifiedName~ContextKeysTests"`
Expected: PASS (all tests)

Also run the full C# suite to confirm nothing broke: `dotnet test`
Format: `cd ../c-sharp && dotnet tool restore && dotnet csharpier .` (and same in `c-sharp-tests`)

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Services/ContextKeys.cs c-sharp/Services/ContextKeysService.cs c-sharp-tests/Services/
git commit -m "feat(csharp): add ContextKeys facade over shared store"
```

---### Task 14: Scripture editor wiring (real-world consumer)

**Files:**

- Modify: `extensions/src/platform-scripture-editor/contributions/menus.json`
- Modify: `extensions/src/platform-scripture-editor/src/main.ts`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`

- [ ] **Step 1: Add expressions to menus.json**

In `extensions/src/platform-scripture-editor/contributions/menus.json`, add `enabledWhen` to the three insert items and `checkedWhen` to Show Footnotes:

```json
          {
            "label": "%webView_platformScriptureEditor_showFootnotes%",
            "group": "platformScriptureEditor.footnotesPane",
            "order": 1,
            "command": "platformScriptureEditor.toggleFootnotes",
            "checkedWhen": "platformScriptureEditor.webView.{webViewId}.footnotesPaneVisible"
          },
```

```json
          {
            "label": "%webView_platformScriptureEditor_insertFootnoteAtSelection%",
            "group": "platformScriptureEditor.insertTextualNotes",
            "order": 1,
            "command": "platformScriptureEditor.insertFootnoteAtSelection",
            "enabledWhen": "platformScriptureEditor.webView.{webViewId}.isEditable"
          },
          {
            "label": "%webView_platformScriptureEditor_insertCrossReferenceAtSelection%",
            "group": "platformScriptureEditor.insertTextualNotes",
            "order": 2,
            "command": "platformScriptureEditor.insertCrossReferenceAtSelection",
            "enabledWhen": "platformScriptureEditor.webView.{webViewId}.isEditable"
          },
          {
            "label": "%webView_platformScriptureEditor_insertCommentAtSelection%",
            "group": "platformScriptureEditor.insertTextualNotes",
            "order": 3,
            "command": "platformScriptureEditor.insertCommentAtSelection",
            "enabledWhen": "platformScriptureEditor.webView.{webViewId}.isEditable"
          },
```

- [ ] **Step 2: Publish `isEditable` from the extension host (main.ts)**

In `ScriptureEditorWebViewFactory.getWebViewDefinition` (~line 434), just before the `return {` statement at the end, add:

```ts
// Publish the context key driving `enabledWhen` on this web view's insert menu items
papi.contextKeys.set(`platformScriptureEditor.webView.${savedWebView.id}.isEditable`, !isReadOnly);
```

In the extension's `activate` function, alongside the other subscriptions/registrations (find the `context.registrations.add(...)` calls at the end of `activate`), add:

```ts
// Clean up context keys this extension published for web views that close. (The web view's own
// footnotesPaneVisible key is renderer-owned and cannot be removed from here; it goes stale
// harmlessly until app restart.)
const unsubscribeOnDidCloseWebView = papi.webViews.onDidCloseWebView(({ webView }) => {
  if (webView.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) return;
  papi.contextKeys.remove(`platformScriptureEditor.webView.${webView.id}.isEditable`);
});
```

and add `unsubscribeOnDidCloseWebView` to `context.registrations.add(...)` following the file's existing pattern.

- [ ] **Step 3: Publish `footnotesPaneVisible` from the web view**

In `platform-scripture-editor.web-view.tsx`, after the `footnotesPaneVisibleRef` effect (~line 452), add:

```ts
// Publish the context key driving `checkedWhen` on this web view's Show Footnotes menu item
useEffect(() => {
  papi.contextKeys.set(
    `platformScriptureEditor.webView.${webViewId}.footnotesPaneVisible`,
    footnotesPaneVisible,
  );
}, [footnotesPaneVisible, webViewId]);
```

(`webViewId` is already destructured from `WebViewProps` as `id: webViewId`; `papi` is already imported from `@papi/frontend`.)

- [ ] **Step 4: Manual verification in the running app**

Use the `app-runner` skill (or `./.erb/scripts/refresh.sh`) to start the app, then use the `visual-verification` skill:

1. Open a Scripture Editor (editable) → tab menu → Insert column → insert items enabled.
2. Open a Resource Viewer (read-only editor, e.g. via "Open Resource Viewer") → tab menu → insert items greyed out.
3. Toggle "Show Footnotes" in an editor → reopen menu → checkbox state follows the footnotes pane visibility.
4. Check logs (`log-inspector` skill) for when-expression errors — expect none.

- [ ] **Step 5: Run extension build to confirm menus.json passes validation**

Run: `npm run build:extensions`
Expected: success; no menu contribution rejection in extension-host logs when the app runs.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/
git commit -m "feat(scripture-editor): drive insert/footnotes menu items with context keys"
```

---

### Task 15: Full verification sweep and spec cross-check

- [ ] **Step 1: Run everything**

```bash
npm run lint          # repo root — must be clean (lint-sweep rule)
npm run typecheck
npm test              # all TS workspaces
cd c-sharp-tests && dotnet test && cd ..
npm run build         # full build including extensions and .NET
```

Expected: all clean/green.

- [ ] **Step 2: Spec coverage check** — verify each spec section has landed:

| Spec section                                                | Where                                          |
| ----------------------------------------------------------- | ---------------------------------------------- |
| Expression grammar                                          | Task 2 (`when-expression.ts`)                  |
| Template variables + per-surface validation                 | Tasks 2, 5                                     |
| Schema additions                                            | Task 3                                         |
| Context keys store/key model/ownership                      | Tasks 1, 6, 7                                  |
| TS service + onDidChange                                    | Tasks 6, 7                                     |
| PAPI exposure (backend + frontend, no frontend onDidChange) | Task 8                                         |
| C# wrapper                                                  | Task 13                                        |
| Evaluation engine                                           | Tasks 2, 4                                     |
| Load-time validation                                        | Task 5                                         |
| Renderer hook + toolbar + web view + context menu           | Tasks 9, 11                                    |
| Components disabled/checked                                 | Task 10                                        |
| macOS menubar                                               | Task 12                                        |
| Scripture editor wiring                                     | Task 14                                        |
| Error handling (fail-safe, startup race)                    | Tasks 2, 4, 9 (verify behavior notes in JSDoc) |

- [ ] **Step 3: Update the spec doc** if any design decisions changed during implementation (note deviations in a "Deviations" section rather than silently diverging).

- [ ] **Step 4: Final commit** (if there were any stragglers) and report completion. Do NOT push — the user reviews first.

---

## Known limitations / explicit non-goals (do not "fix" these)

- Overlay context menus: visibility filtering only; `disabled`/`checked` not rendered there in v1.
- Frontend `papi.contextKeys` has no `onDidChange` (deliberate, see spec).
- Renderer-owned keys (e.g. `footnotesPaneVisible`) go stale after a web view closes — harmless, bounded, documented.
- Items hidden until producers publish keys at startup (documented behavior).
- Re-evaluation on every context-key change (no per-key dependency tracking) — fine at current scale.
- Menu search surfaces may still index hidden items — out of scope.
- No `=~ < > <= >= in` operators in v1.

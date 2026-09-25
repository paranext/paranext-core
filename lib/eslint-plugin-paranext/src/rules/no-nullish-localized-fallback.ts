import { ESLintUtils, ParserServices, TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { Type, TypeChecker } from 'typescript';

const createRule = ESLintUtils.RuleCreator(() => '');

/**
 * A localization key — `%some_key%` with nothing else around it.
 *
 * A deliberate second copy of the canonical pattern behind `isResolvedLocalizedValue` in
 * `lib/platform-bible-utils/src/localization.util.ts`: this plugin does not depend on the
 * workspace, so the two must be kept in agreement by hand. The same table of values is restated in
 * each package's tests — `no-nullish-localized-fallback.test.ts` here and
 * `localization.util.test.ts` there — so an unmirrored change to either copy fails in its own
 * suite.
 */
export const LOCALIZATION_KEY_PATTERN = /^%[^%]*%$/;

/** Module that exports the helper this rule steers unresolved-string handling toward. */
const UTILS_MODULE_NAME = 'platform-bible-utils';

/** Helper that replaces a nullish/logical fallback on a localized-string lookup. */
const RESOLVE_HELPER_NAME = 'resolveLocalizedString';

/** Name of the interface that models a map of localized strings. */
const LOCALIZED_STRINGS_TYPE_NAME = 'LanguageStrings';

/** Name of the type alias for a single localization key. */
const LOCALIZE_KEY_TYPE_NAME = 'LocalizeKey';

/** Whether `type` is keyed by `LocalizeKey`, i.e. a map of localized strings. */
function isLocalizedStringsType(type: Type, checker: TypeChecker): boolean {
  if (type.getSymbol()?.getName() === LOCALIZED_STRINGS_TYPE_NAME) return true;
  if (type.aliasSymbol?.getName() === LOCALIZED_STRINGS_TYPE_NAME) return true;

  // A component's own strings type — `BookChapterControlLocalizedStrings` and its siblings, mapped
  // over a literal tuple union — carries no useful symbol name, so judge it by its members: every
  // key is `%…%`-shaped and every value is a string. Requiring at least one member keeps maps that
  // declare no members at all out of the rule's reach, both plain index-signature maps like
  // `Record<string, string>` and key-shaped ones like `Partial<Record<LocalizeKey, string>>`, whose
  // template-literal key collapses to an index signature. Those reach the rule, when they do,
  // through the key rather than through the map.
  const properties = type.getProperties();
  if (properties.length === 0) return false;
  return properties.every((property) => {
    if (!LOCALIZATION_KEY_PATTERN.test(property.getName())) return false;
    // `getTypeOfSymbol`, not `getTypeOfSymbolAtLocation`: a mapped type's members are synthesized
    // by the checker and have no declaration node to read them at.
    return checker.typeToString(checker.getTypeOfSymbol(property)).includes('string');
  });
}

/**
 * Whether a printed type is a localization key. `LocalizeKey` is a template literal type, so the
 * checker usually prints its template-literal structure rather than the alias name.
 */
function isLocalizeKeyTypeText(typeText: string): boolean {
  if (typeText === LOCALIZE_KEY_TYPE_NAME) return true;
  const normalized = typeText
    .replace(/[`"']/g, '')
    // A template-literal placeholder stands for whatever the key interpolates.
    .replace(/\$\{[^}]*\}/g, 'x');
  return LOCALIZATION_KEY_PATTERN.test(normalized);
}

/**
 * Whether `type` can only be a localization key. Unions — what `keyof` over a map of keys produces
 * — are walked member by member rather than compared as printed text, because the checker truncates
 * a long union with an ellipsis that no pattern can read.
 */
function isLocalizeKeyType(type: Type, checker: TypeChecker): boolean {
  if (type.isUnion()) {
    return (
      type.types.length > 0 && type.types.every((member) => isLocalizeKeyType(member, checker))
    );
  }
  if (type.isStringLiteral()) return LOCALIZATION_KEY_PATTERN.test(type.value);
  return isLocalizeKeyTypeText(checker.typeToString(type));
}

/**
 * Unwraps the `ChainExpression` that an optional member access sits inside, so `a?.[k] ?? b` is
 * seen as the same indexed lookup as `a[k] ?? b`.
 */
function asComputedMemberExpression(node: TSESTree.Node): TSESTree.MemberExpression | undefined {
  const expression = node.type === 'ChainExpression' ? node.expression : node;
  if (expression.type !== 'MemberExpression' || !expression.computed) return undefined;
  return expression;
}

/**
 * The source code, including the parser services accessor ESLint exposes on it from 8.40 on and
 * keeps in 9. `@typescript-eslint/utils` v5 types only the deprecated `context.parserServices`
 * twin, so the modern accessor is declared here and read defensively.
 */
type SourceCodeWithParserServices = Readonly<TSESLint.SourceCode> & {
  parserServices?: ParserServices;
};

/** Reads the source code through the accessor ESLint 9 keeps, falling back to the removed one. */
function getSourceCode(context: {
  sourceCode?: SourceCodeWithParserServices;
  getSourceCode(): Readonly<TSESLint.SourceCode>;
}): SourceCodeWithParserServices {
  return context.sourceCode ?? context.getSourceCode();
}

/**
 * Fixes that bring {@link RESOLVE_HELPER_NAME} into scope, so applying the wrap suggestion leaves a
 * file that still compiles. Merges into an existing value import of `platform-bible-utils` when
 * there is one, adds an import statement otherwise, and contributes nothing when the name is
 * already bound.
 */
function importResolveHelperFixes(
  fixer: TSESLint.RuleFixer,
  sourceCode: Readonly<TSESLint.SourceCode>,
): TSESLint.RuleFix[] {
  const importDeclarations = sourceCode.ast.body.filter(
    (statement): statement is TSESTree.ImportDeclaration => statement.type === 'ImportDeclaration',
  );

  const isBound = importDeclarations.some((declaration) =>
    declaration.specifiers.some((specifier) => specifier.local.name === RESOLVE_HELPER_NAME),
  );
  if (isBound) return [];

  // A type-only import or specifier cannot carry a value, so neither is a merge target.
  const mergeTarget = importDeclarations
    .filter(
      (declaration) =>
        declaration.source.value === UTILS_MODULE_NAME && declaration.importKind !== 'type',
    )
    .flatMap((declaration) => declaration.specifiers)
    .filter(
      (specifier): specifier is TSESTree.ImportSpecifier =>
        specifier.type === 'ImportSpecifier' && specifier.importKind !== 'type',
    )
    .pop();
  if (mergeTarget) return [fixer.insertTextAfter(mergeTarget, `, ${RESOLVE_HELPER_NAME}`)];

  const firstStatement = importDeclarations[0] ?? sourceCode.ast.body[0];
  if (!firstStatement) return [];
  return [
    fixer.insertTextBefore(
      firstStatement,
      `import { ${RESOLVE_HELPER_NAME} } from '${UTILS_MODULE_NAME}';\n`,
    ),
  ];
}

/**
 * ESLint rule: paranext/no-nullish-localized-fallback
 *
 * Disallows `localizedStrings[key] ?? 'Default'`. `useLocalizedStrings` seeds its state with `{
 * [key]: key }` and keeps that seed for the whole first render pass, and permanently if the
 * localization provider errors — so an unresolved lookup returns the literal `%some_key%`, a
 * defined non-empty string that `??` passes straight through to the user.
 *
 * Good: `resolveLocalizedString(localizedStrings[key], 'Default')` from `platform-bible-utils`.
 *
 * See: .context/standards/Localization-Guide.md "An optional localizedStrings? prop"
 */
export default createRule({
  name: 'no-nullish-localized-fallback',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow nullish/logical fallbacks on localized-string lookups, which never fire because an unresolved lookup returns the raw key',
      recommended: 'warn',
      requiresTypeChecking: true,
    },
    hasSuggestions: true,
    schema: [],
    messages: {
      nullishLocalizedFallback:
        "This fallback never runs. An unresolved localized string comes back as the raw key ('%…%'), which is a defined string, so '{{operator}}' passes it straight through to the user. Use resolveLocalizedString(value, fallback) from platform-bible-utils.",
      deadKeyFallback:
        "This fallback cannot supply readable text: it is the key itself, so whenever '{{operator}}' fires it hands the user the raw key ('%…%'). Choose real fallback text and use resolveLocalizedString(value, fallback) from platform-bible-utils. Dropping the operator instead is not equivalent - the read can be undefined at runtime.",
      useResolveLocalizedString: 'Wrap in resolveLocalizedString(value, fallback)',
    },
  },
  defaultOptions: [],

  create(context) {
    // `sourceCode.parserServices` is the accessor ESLint 9 keeps; `context.parserServices` behind
    // it is what ESLint hosts older than 8.40 provide.
    const sourceCode = getSourceCode(context);
    const services = sourceCode.parserServices ?? context.parserServices;

    // A type-aware rule has nothing to say about a file linted without type information, so it
    // registers no listeners rather than aborting the run. Configurations that lint plain
    // JavaScript alongside TypeScript, and any downstream repo that enables the recommended config
    // without `parserOptions.project`, reach this path.
    if (!services?.program || !services.esTreeNodeToTSNodeMap) return {};

    const checker = services.program.getTypeChecker();

    // The same map type recurs across every lookup in a file, and the member walk in
    // `isLocalizedStringsType` is the rule's most expensive step. Keyed on the `Type` object, which
    // the checker interns for the duration of this program, so the cache cannot outlive it.
    const localizedStringsTypeCache = new WeakMap<Type, boolean>();
    function isLocalizedStringsTypeMemoized(type: Type): boolean {
      const cached = localizedStringsTypeCache.get(type);
      if (cached !== undefined) return cached;
      const result = isLocalizedStringsType(type, checker);
      localizedStringsTypeCache.set(type, result);
      return result;
    }

    /** Whether `node` is a `%…%` string literal or typed as `LocalizeKey`. */
    function isLocalizeKeyNode(node: TSESTree.Node): boolean {
      if (node.type === 'Literal' && typeof node.value === 'string') {
        return LOCALIZATION_KEY_PATTERN.test(node.value);
      }
      const tsNode = services.esTreeNodeToTSNodeMap.get(node);
      if (!tsNode) return false;
      return isLocalizeKeyType(checker.getTypeAtLocation(tsNode), checker);
    }

    function check(node: TSESTree.LogicalExpression) {
      if (node.operator !== '??' && node.operator !== '||') return;

      const left = asComputedMemberExpression(node.left);
      if (!left) return;

      const objectTsNode = services.esTreeNodeToTSNodeMap.get(left.object);
      if (!objectTsNode) return;

      // The key test is a literal check or one `getTypeAtLocation`; the map test can walk every
      // property of the type. Order them cheap-first — this runs on every `x[y] ?? z` in the repo.
      // The object's type is resolved inside the second operand so the common case (a key that is
      // neither `%…%`-shaped nor `LocalizeKey`) costs no `getTypeAtLocation` at all.
      const looksLocalized =
        isLocalizeKeyNode(left.property) ||
        isLocalizedStringsTypeMemoized(checker.getTypeAtLocation(objectTsNode));
      if (!looksLocalized) return;

      // A fallback whose text is the key being read cannot differ from the unresolved value, so
      // the operator can only ever hand over the raw key - no choice of operand makes it readable.
      const isDeadKeyFallback =
        sourceCode.getText(node.right) === sourceCode.getText(left.property);

      // A dead key fallback gets a diagnostic but no suggestion. Neither mechanical rewrite is
      // safe: wrapping keeps the key as the fallback text, the user-visible `%…%` this rule
      // exists to stop, while deleting the operator removes a runtime guard. On an unrequested
      // key the read is `undefined` at runtime yet still types as `string` (the repo runs with
      // `noUncheckedIndexedAccess` off), so the deletion silently turns a rendered key into
      // nothing rendered at all, and on a `{[k in Key]?: string}` bag it widens the enclosing
      // helper's return to `string | undefined`. Choosing real fallback text is a judgment the
      // author has to make.
      if (isDeadKeyFallback) {
        context.report({
          node,
          messageId: 'deadKeyFallback',
          data: { operator: node.operator },
        });
        return;
      }

      context.report({
        node,
        messageId: 'nullishLocalizedFallback',
        data: { operator: node.operator },
        suggest: [
          {
            messageId: 'useResolveLocalizedString',
            fix: (fixer) => [
              ...importResolveHelperFixes(fixer, sourceCode),
              fixer.replaceText(
                node,
                `${RESOLVE_HELPER_NAME}(${sourceCode.getText(node.left)}, ${sourceCode.getText(node.right)})`,
              ),
            ],
          },
        ],
      });
    }

    return {
      LogicalExpression: check,
    };
  },
});

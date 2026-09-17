import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import type { Type, TypeChecker } from 'typescript';

const createRule = ESLintUtils.RuleCreator(() => '');

/** A localization key — `%some_key%` with nothing else around it. */
const LOCALIZATION_KEY_PATTERN = /^%[^%]*%$/;

/** Name of the interface that models a map of localized strings. */
const LOCALIZED_STRINGS_TYPE_NAME = 'LanguageStrings';

/** Name of the type alias for a single localization key. */
const LOCALIZE_KEY_TYPE_NAME = 'LocalizeKey';

/** Whether `type` is keyed by `LocalizeKey`, i.e. a map of localized strings. */
function isLocalizedStringsType(type: Type, checker: TypeChecker): boolean {
  if (type.getSymbol()?.getName() === LOCALIZED_STRINGS_TYPE_NAME) return true;
  if (type.aliasSymbol?.getName() === LOCALIZED_STRINGS_TYPE_NAME) return true;

  // A mapped type such as `Partial<Record<LocalizeKey, string>>` carries no useful symbol name, so
  // judge it by its members: every key is `%…%`-shaped and every value is a string. Requiring at
  // least one member keeps plain index-signature maps like `Record<string, string>`, which declare
  // no members at all, out of the rule's reach.
  const properties = type.getProperties();
  if (properties.length === 0) return false;
  return properties.every((property) => {
    if (!LOCALIZATION_KEY_PATTERN.test(property.getName())) return false;
    const declaration = property.valueDeclaration ?? property.declarations?.[0];
    if (!declaration) return false;
    const propertyType = checker.getTypeOfSymbolAtLocation(property, declaration);
    return checker.typeToString(propertyType).includes('string');
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
        "This fallback is dead code: an unresolved lookup already returns the key, so '{{operator}}' can never produce anything different. Delete it, or use resolveLocalizedString(value, fallback) from platform-bible-utils if real fallback text is wanted.",
      useResolveLocalizedString: 'Wrap in resolveLocalizedString(value, fallback)',
    },
  },
  defaultOptions: [],

  create(context) {
    // A type-aware rule has nothing to say about a file linted without type information, so it
    // registers no listeners rather than aborting the run. Configurations that lint plain
    // JavaScript alongside TypeScript, and any downstream repo that enables the recommended config
    // without `parserOptions.project`, reach this path.
    const { parserServices } = context;
    if (!parserServices?.program || !parserServices.esTreeNodeToTSNodeMap) return {};

    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();

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
      const objectType = checker.getTypeAtLocation(objectTsNode);

      const looksLocalized =
        isLocalizedStringsType(objectType, checker) || isLocalizeKeyNode(left.property);
      if (!looksLocalized) return;

      // A fallback that is the same key being read cannot differ from the unresolved value, so
      // the operator is dead rather than user-visible.
      const sourceCode = context.getSourceCode();
      const isDeadKeyFallback =
        sourceCode.getText(node.right) === sourceCode.getText(left.property);

      context.report({
        node,
        messageId: isDeadKeyFallback ? 'deadKeyFallback' : 'nullishLocalizedFallback',
        data: { operator: node.operator },
        suggest: [
          {
            messageId: 'useResolveLocalizedString',
            fix: (fixer) =>
              fixer.replaceText(
                node,
                `resolveLocalizedString(${sourceCode.getText(node.left)}, ${sourceCode.getText(node.right)})`,
              ),
          },
        ],
      });
    }

    return {
      LogicalExpression: check,
    };
  },
});

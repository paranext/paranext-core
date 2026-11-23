import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

/**
 * The shared helpers in `lib/platform-bible-utils/src/project-util.ts` that decide a project name's
 * SHAPE. A composition that calls or names one is adopting the rule rather than re-inlining it.
 *
 * `normalizeFullName` is deliberately NOT here. It narrows a raw setting value and decides nothing
 * about order or de-dup, so `normalizeFullName(p.fullName) ?? p.shortName` — the long-name-first
 * fallback this rule exists to catch — must not get a free pass just by mentioning it. Its own name
 * ends in `FullName`, so a call to it is itself treated as a full-name value.
 */
const HELPERS = new Set([
  'formatProjectName',
  'hasDistinctFullName',
  'compareProjectsByName',
  'PROJECT_NAME_SEPARATOR',
]);

/**
 * A name ending in `fullName`, in any casing or prefix — `fullName`, `projectFullName`,
 * `displayFullName`. The full name is the field whose presence signals a two-name display decision;
 * the short name is spelled too many ways across the repo (`shortName`, `name`, `displayName`) to
 * anchor on.
 */
const FULL_NAME = /[Ff]ullName$/;

/** Equality comparisons, in both strict and loose spellings, plus string concatenation */
const COMPOSING_BINARY_OPERATORS = new Set(['===', '!==', '==', '!=', '+']);
/** Logical assignments: a fallback (`a.fullName ??= b.fullName`) written as an assignment */
const COMPOSING_ASSIGNMENT_OPERATORS = new Set(['??=', '||=', '&&=']);
/** Array and string methods that join a name into a label */
const JOINING_METHODS = new Set(['join', 'concat']);

/** The name of a non-computed member property, or `undefined` if there is none */
function getPropertyName(member: TSESTree.MemberExpression): string | undefined {
  return !member.computed && member.property.type === 'Identifier'
    ? member.property.name
    : undefined;
}

/** Whether a member expression calls one of {@link JOINING_METHODS} (`x.join`, `x.concat`) */
function isJoiningMethod(node: TSESTree.Node): node is TSESTree.MemberExpression {
  if (node.type !== 'MemberExpression') return false;
  const name = getPropertyName(node);
  return name !== undefined && JOINING_METHODS.has(name);
}

/**
 * Whether a call's callee names one of {@link HELPERS} (`formatProjectName(…)`,
 * `u.formatProjectName(…)`)
 */
function isHelperCall(node: TSESTree.Node): boolean {
  if (node.type !== 'CallExpression') return false;
  const { callee } = node;
  if (callee.type === 'Identifier') return HELPERS.has(callee.name);
  if (callee.type === 'MemberExpression') {
    const name = getPropertyName(callee);
    return name !== undefined && HELPERS.has(name);
  }
  return false;
}

/**
 * Walks up from a full-name expression through the expressions that still carry its value — a
 * member access on it, a call of it, an optional chain, a non-null or type assertion — and returns
 * the node that composes it, or `undefined` if nothing does.
 *
 * Following the receiver means `fullName.trim() || shortName` and `p.fullName?.toLowerCase() ?? ''`
 * are seen as the compositions they are, where a direct-operand check would miss both.
 */
function findComposingNode(start: TSESTree.Node): TSESTree.Node | undefined {
  let node: TSESTree.Node = start;
  let { parent } = node;
  while (parent) {
    switch (parent.type) {
      case 'MemberExpression':
        if (parent.object !== node) return undefined;
        // `fullName.concat(…)`: the joining call itself is the composition
        if (isJoiningMethod(parent) && parent.parent?.type === 'CallExpression')
          return parent.parent;
        break;
      case 'CallExpression':
        if (parent.callee === node) break;
        // `shortName.concat(' - ', fullName)`
        if (isJoiningMethod(parent.callee)) return parent;
        return undefined;
      case 'ArrayExpression': {
        // `[shortName, fullName].join(' - ')`
        const member = parent.parent;
        if (
          member?.type === 'MemberExpression' &&
          member.object === parent &&
          isJoiningMethod(member) &&
          member.parent?.type === 'CallExpression'
        )
          return member.parent;
        return undefined;
      }
      case 'ChainExpression':
      case 'TSNonNullExpression':
      case 'TSAsExpression':
      case 'TSSatisfiesExpression':
        break;
      case 'LogicalExpression':
      case 'ConditionalExpression':
        return parent;
      case 'BinaryExpression':
        return COMPOSING_BINARY_OPERATORS.has(parent.operator) ? parent : undefined;
      case 'AssignmentExpression':
        return COMPOSING_ASSIGNMENT_OPERATORS.has(parent.operator) ? parent : undefined;
      case 'TemplateLiteral':
        return parent;
      default:
        return undefined;
    }
    node = parent;
    parent = node.parent;
  }
  return undefined;
}

/** Whether `node` sits anywhere inside a call to one of {@link HELPERS} */
function isInsideHelperCall(node: TSESTree.Node): boolean {
  let { parent } = node;
  while (parent) {
    if (isHelperCall(parent)) return true;
    ({ parent } = parent);
  }
  return false;
}

/**
 * ESLint rule: paranext/no-inline-project-name
 *
 * Reports a value named `*fullName` that is composed, compared or used as a fallback inline — the
 * shapes a re-inlined de-dup or a hand-joined project label takes. `formatProjectName` owns the
 * joined label, `hasDistinctFullName` owns `fullName && fullName !== shortName`, and
 * `compareProjectsByName` owns their order; a copy elsewhere means a surface can drift from the
 * others the next time the rule changes.
 *
 * Reported:
 *
 * - `project.fullName ?? project.shortName`
 * - `[shortName, fullName].join(' - ')`
 * - `fullName && fullName !== shortName`
 *
 * Not reported:
 *
 * - `formatProjectName({ shortName, fullName })`
 * - `hasDistinctFullName(names) ? fullName : undefined`
 *
 * A composition that sits inside a helper call, or that names a helper itself
 * (`hasDistinctFullName(p) ? p.fullName : undefined`), is adopting the rule and is not reported.
 *
 * Not every match is a project label — a search predicate, a sort key, or a book's full name all
 * match — so a site that is not one is disabled in place with the reason it is not.
 *
 * What it does not see, so a clean run is not over-trusted: a name pair that spells the full name
 * something other than `*fullName` (the `name`/`displayName` pairs the DBL resource surfaces use),
 * two names rendered in adjacent JSX elements with no operator between them, a composition that
 * reaches the name through a variable with another name, or a hand-joined suffix inside a
 * composition that also names a helper.
 *
 * See: `lib/platform-bible-utils/src/project-util.ts`, and
 * .context/standards/Component-Selection-Quick-Reference.md
 */
export default createRule({
  name: 'no-inline-project-name',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Compose, compare and de-dup project names through the shared project-name helpers',
      recommended: 'error',
    },
    schema: [],
    messages: {
      inlineProjectName:
        "'{{name}}' is composed inline. Use formatProjectName, hasDistinctFullName, compareProjectsByName or PROJECT_NAME_SEPARATOR from platform-bible-utils, or disable this line with the reason it is not a project-name label.",
    },
  },
  defaultOptions: [],

  create(context) {
    const sourceCode = context.getSourceCode();

    /** Whether any identifier token within `node` names one of {@link HELPERS} */
    function referencesHelper(node: TSESTree.Node): boolean {
      return sourceCode
        .getTokens(node)
        .some((token) => token.type === 'Identifier' && HELPERS.has(token.value));
    }

    function check(node: TSESTree.Node, name: string) {
      if (!FULL_NAME.test(name)) return;
      const composingNode = findComposingNode(node);
      if (!composingNode) return;
      if (referencesHelper(composingNode) || isInsideHelperCall(composingNode)) return;
      context.report({ node, messageId: 'inlineProjectName', data: { name } });
    }

    return {
      MemberExpression(node: TSESTree.MemberExpression) {
        const name = getPropertyName(node);
        if (name !== undefined) check(node, name);
      },
      Identifier(node: TSESTree.Identifier) {
        // A member's property is checked as the whole member expression above
        if (node.parent?.type === 'MemberExpression' && node.parent.property === node) return;
        check(node, node.name);
      },
    };
  },
});

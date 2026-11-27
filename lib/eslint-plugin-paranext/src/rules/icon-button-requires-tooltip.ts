import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

/** Element names treated as buttons: the `platform-bible-react` `Button` and the native element. */
const BUTTON_NAMES = new Set(['Button', 'button']);

/** Module whose imports are all icon components. */
const ICON_MODULE = 'lucide-react';

/** How many `const a = <Button>; const b = a;` hops to follow before giving up. */
const MAX_VARIABLE_HOPS = 3;

/**
 * Element names that put a tooltip on their child: `TooltipTrigger`, or a namespaced trigger such
 * as `Tooltip.Trigger` or the Radix primitive `TooltipPrimitive.Trigger`.
 */
function isTooltipTriggerName(name: string): boolean {
  const segments = name.split('.');
  const last = segments[segments.length - 1];
  if (last === 'TooltipTrigger') return true;
  return (
    last === 'Trigger' && segments.length > 1 && segments[segments.length - 2].includes('Tooltip')
  );
}

/** Returns the dotted name of a JSX element (`Button`, `Tooltip.Trigger`, `svg`). */
function getElementName(name: TSESTree.JSXTagNameExpression): string {
  switch (name.type) {
    case 'JSXIdentifier':
      return name.name;
    case 'JSXMemberExpression':
      return `${getElementName(name.object)}.${name.property.name}`;
    case 'JSXNamespacedName':
      return `${name.namespace.name}:${name.name.name}`;
    default:
      return '';
  }
}

function getAttribute(
  element: TSESTree.JSXOpeningElement,
  attributeName: string,
): TSESTree.JSXAttribute | undefined {
  return element.attributes.find(
    (attribute): attribute is TSESTree.JSXAttribute =>
      attribute.type === 'JSXAttribute' &&
      attribute.name.type === 'JSXIdentifier' &&
      attribute.name.name === attributeName,
  );
}

/** Returns the string value of an attribute written as `a="x"`, `a={'x'}` or `a={`x`}`. */
function getStaticStringValue(attribute: TSESTree.JSXAttribute | undefined): string | undefined {
  const value = attribute?.value;
  if (!value) return undefined;
  if (value.type === 'Literal' && typeof value.value === 'string') return value.value;
  if (value.type !== 'JSXExpressionContainer') return undefined;
  const { expression } = value;
  if (expression.type === 'Literal' && typeof expression.value === 'string')
    return expression.value;
  if (expression.type === 'TemplateLiteral' && expression.expressions.length === 0)
    return expression.quasis[0].value.cooked ?? undefined;
  return undefined;
}

/**
 * ESLint rule: paranext/icon-button-requires-tooltip
 *
 * Every icon-only button must have a tooltip. An `aria-label` gives the button an accessible name,
 * and a `title` attribute shows a native tooltip that keyboard and touch users never see, so
 * neither is enough on its own: sighted users need the `Tooltip` to learn what the icon means.
 *
 * An element counts as an **icon button** when it is a `Button` or `button` and either:
 *
 * - It has a static `size` of `"icon"` or `"icon-*"` (`icon-xs`, `icon-sm`, `icon-lg`), or
 * - Its only child (ignoring whitespace) is an icon: a component imported from `lucide-react`, or a
 *   component whose name ends in `Icon`.
 *
 * It **has a tooltip** when a `TooltipTrigger` (or `Tooltip.Trigger`) encloses it anywhere above it
 * in the same file's JSX, including through `asChild` triggers stacked in between (`<TooltipTrigger
 * asChild><PopoverTrigger asChild><Button>`), through expressions such as `{cond && <Button>}` or a
 * `.map()` callback, and through a local variable (`const button = <Button …>` used as
 * `<TooltipTrigger asChild>{button}</TooltipTrigger>`). A variable counts as covered if ANY of its
 * uses is inside a `TooltipTrigger`, so a branch that renders the same variable without one is not
 * reported.
 *
 * Known misses — icon buttons without a tooltip that this rule does not report, so a clean run does
 * not prove every icon button has one:
 *
 * - A `size` that is not a static string (`size={compact ? 'icon' : 'sm'}`) together with children
 *   that are not a recognizable icon.
 * - An icon passed in as an expression (`<Button>{icon}</Button>`), an inline `<svg>`, or a text
 *   glyph (`<Button>⋮</Button>`) on a button without an icon `size`.
 * - An icon component that is not from `lucide-react` and whose name does not end in `Icon` (for
 *   example a local `Logo` component).
 * - Icon buttons rendered by a component not named `Button` or `button` (for example
 *   `SidebarMenuButton`, or `<Comp>` from a Radix `Slot`).
 * - A variable that is used both inside and outside a `TooltipTrigger` (see above).
 *
 * Known false positives — reported although a tooltip is supplied:
 *
 * - The `TooltipTrigger` lives in a **different** component or file — the rule only follows the JSX
 *   and local variables of the file it is checking. For example, a component that returns a bare
 *   icon `Button` which its caller always wraps in a `TooltipTrigger`, or a button built by a
 *   helper function that is called from inside a trigger. Prefer moving the tooltip into the
 *   component; otherwise disable the rule on that line with a comment naming where the tooltip
 *   comes from.
 *
 * See: lib/platform-bible-react/src/stories/guidelines/tooltips.mdx
 */
export default createRule({
  name: 'icon-button-requires-tooltip',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require every icon-only button to be wrapped in a TooltipTrigger',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingTooltip:
        'Icon buttons must have a tooltip: wrap this button in <Tooltip><TooltipTrigger asChild>…</TooltipTrigger><TooltipContent>…</TooltipContent></Tooltip>. An aria-label or title attribute alone is not enough. See Guidelines/Tooltips.',
    },
  },
  defaultOptions: [],

  create(context) {
    const lucideImports = new Set<string>();

    function isIconElement(child: TSESTree.JSXElement): boolean {
      const name = getElementName(child.openingElement.name);
      return lucideImports.has(name) || /^[A-Z][A-Za-z0-9]*Icon$/.test(name);
    }

    function hasOnlyIconChild(element: TSESTree.JSXElement): boolean {
      const meaningfulChildren = element.children.filter(
        (child) => !(child.type === 'JSXText' && child.value.trim() === ''),
      );
      if (meaningfulChildren.length !== 1) return false;
      const [child] = meaningfulChildren;
      return child.type === 'JSXElement' && isIconElement(child);
    }

    /**
     * Whether a `TooltipTrigger` encloses `node`. When `node` is the initializer of a variable
     * (`const button = <Button …>`), any place the variable is used inside a `TooltipTrigger`
     * counts, so `<TooltipTrigger asChild>{button}</TooltipTrigger>` is recognized.
     */
    function isInsideTooltipTrigger(node: TSESTree.Node, depth = 0): boolean {
      let current = node.parent;
      while (current) {
        if (
          current.type === 'JSXElement' &&
          isTooltipTriggerName(getElementName(current.openingElement.name))
        )
          return true;
        if (current.type === 'VariableDeclarator') {
          if (depth >= MAX_VARIABLE_HOPS) return false;
          return context
            .getDeclaredVariables(current)
            .some((variable) =>
              variable.references.some(
                (reference) =>
                  !reference.init && isInsideTooltipTrigger(reference.identifier, depth + 1),
              ),
            );
        }
        current = current.parent;
      }
      return false;
    }

    return {
      Program(program: TSESTree.Program) {
        program.body.forEach((statement) => {
          if (statement.type !== 'ImportDeclaration' || statement.source.value !== ICON_MODULE)
            return;
          statement.specifiers.forEach((specifier) => lucideImports.add(specifier.local.name));
        });
      },
      JSXElement(node: TSESTree.JSXElement) {
        const { openingElement } = node;
        if (!BUTTON_NAMES.has(getElementName(openingElement.name))) return;

        const size = getStaticStringValue(getAttribute(openingElement, 'size'));
        const isIconSized = size !== undefined && /^icon(-|$)/.test(size);
        if (!isIconSized && !hasOnlyIconChild(node)) return;

        if (isInsideTooltipTrigger(node)) return;

        context.report({ node: openingElement, messageId: 'missingTooltip' });
      },
    };
  },
});

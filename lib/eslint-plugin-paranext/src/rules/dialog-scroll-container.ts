import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

/**
 * Proof-of-concept ESLint rule for PR #305 improvement-plan item **D21** (dialog-scroll-container —
 * static CSS pattern audit for Dialog + list combinations).
 *
 * Context: during the project-backup-and-restore Phase 3 UI Design run, the RestoreForm Default
 * Storybook story shipped with content rendering OUTSIDE the visible `<DialogContent>` frame
 * because the inner `<form>` element lacked `tw:overflow-y-auto` + `tw:min-h-0`. The story
 * compiled, rendered without runtime error, and passed the iteration-planner's PASS verdict. The
 * bug was visible only when a human opened Storybook.
 *
 * This rule catches the structural cause AT LINT TIME, before any build or render check fires.
 *
 * Detection: when a `<DialogContent>` element contains a descendant matching the LIST_LIKE_NAMES
 * pattern (`BookGridSelector`, `*FileList`, `*List`, `*Grid`, `ul`, `ol`, `table`), the path from
 * the DialogContent down to the list must include at least one element with `overflow-y-auto` (or
 * equivalent scroll-class) in its className.
 *
 * Auto-fix: when a violation is found, the rule fixes the IMMEDIATE PARENT of the list by adding
 * `tw:overflow-y-auto tw:min-h-0` to its className. If the parent already has any className with
 * `flex-1`, the fix is high-confidence (the parent is meant to fill the flex space); otherwise it
 * reports as a fixable warning but emits the fix anyway. Users can manually adjust if the fix is
 * structurally wrong (rare).
 *
 * Limitations (deliberate POC scope):
 *
 * - Static analysis only. Doesn't catch overflow caused by dynamically computed widths, external CSS,
 *   or runtime-conditional list rendering that the AST walker can't see (`{condition && ...}`).
 *   Runtime detection (D19) covers those cases.
 * - Tailwind-only. The scroll-class detection looks for `overflow-y-auto`, `overflow-auto`,
 *   `overflow-y-scroll`. Other CSS approaches (inline styles, CSS modules) are not detected.
 * - List detection is name-based. Future extensions: detect
 *   `role="list"`/`role="grid"`/`role="table"` attributes or `data-testid` containing
 *   `list`/`grid`/`table`.
 *
 * See: PR #305 improvement-plan Track D / D21 + Appendix 4 "Second post-completion incident:
 * RestoreForm dialog-overflow" for the full design + evidence rationale.
 */

/** JSX element names that count as "list-like" — trigger the rule when found inside DialogContent. */
const LIST_LIKE_NAME_PATTERNS = [
  /^BookGridSelector$/,
  /^RestoreFileList$/,
  /.*FileList$/,
  /.*List$/,
  /.*Grid$/,
  /^ul$/,
  /^ol$/,
  /^table$/,
];

/** Tailwind classes that establish a scroll boundary on their element. */
const SCROLL_CLASS_PATTERNS = [
  /(^|\s)(tw:)?overflow-y-auto(\s|$)/,
  /(^|\s)(tw:)?overflow-y-scroll(\s|$)/,
  /(^|\s)(tw:)?overflow-auto(\s|$)/,
];

function jsxElementName(node: TSESTree.JSXElement): string | undefined {
  const name = node.openingElement.name;
  if (name.type === 'JSXIdentifier') return name.name;
  // Member expressions like <Foo.Bar> — use the last segment
  if (name.type === 'JSXMemberExpression' && name.property.type === 'JSXIdentifier') {
    return name.property.name;
  }
  return undefined;
}

function isListLikeElement(node: TSESTree.JSXElement): boolean {
  const elementName = jsxElementName(node);
  if (!elementName) return false;
  return LIST_LIKE_NAME_PATTERNS.some((pattern) => pattern.test(elementName));
}

function getClassNameString(node: TSESTree.JSXElement): string | undefined {
  const classNameAttr = node.openingElement.attributes.find(
    (attr): attr is TSESTree.JSXAttribute =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      attr.name.name === 'className',
  );
  if (!classNameAttr) return undefined;
  const value = classNameAttr.value;
  if (!value) return undefined;
  if (value.type === 'Literal' && typeof value.value === 'string') return value.value;
  // For className={...}, we don't statically analyze the expression — return undefined
  // so we fall through to "no scroll class found" (conservative).
  return undefined;
}

function hasScrollClass(node: TSESTree.JSXElement): boolean {
  const className = getClassNameString(node);
  if (!className) return false;
  return SCROLL_CLASS_PATTERNS.some((pattern) => pattern.test(className));
}

/**
 * Walk the JSX subtree under `root`, looking for list-like elements and tracking whether a scroll
 * boundary exists on the path from `root` to each list.
 *
 * Returns the first list-like element found WITHOUT a scroll boundary, plus the immediate parent
 * JSXElement (the auto-fix target). Returns undefined if all lists have a scroll boundary or no
 * lists are present.
 */
function findFirstUnboundedList(
  root: TSESTree.JSXElement,
): { list: TSESTree.JSXElement; parent: TSESTree.JSXElement } | undefined {
  function walk(
    node: TSESTree.Node,
    hasScrollAncestor: boolean,
    parentJsx: TSESTree.JSXElement,
  ): { list: TSESTree.JSXElement; parent: TSESTree.JSXElement } | undefined {
    if (node.type === 'JSXElement') {
      // Did this element add a scroll boundary?
      const newHasScroll = hasScrollAncestor || hasScrollClass(node);

      // Is this element itself a list AND we don't have a scroll boundary yet?
      if (isListLikeElement(node) && !hasScrollAncestor) {
        return { list: node, parent: parentJsx };
      }

      // Recurse into children with the updated scroll state.
      for (const child of node.children) {
        const found = walk(child, newHasScroll, node);
        if (found) return found;
      }
    } else if (node.type === 'JSXFragment') {
      // Fragments are transparent — preserve the existing parent.
      for (const child of node.children) {
        const found = walk(child, hasScrollAncestor, parentJsx);
        if (found) return found;
      }
    } else if (node.type === 'JSXExpressionContainer') {
      // {cond && <JSX />}, {array.map(...)}, {value} — walk into the expression
      if (node.expression && node.expression.type !== 'JSXEmptyExpression') {
        const found = walk(node.expression, hasScrollAncestor, parentJsx);
        if (found) return found;
      }
    } else if (node.type === 'LogicalExpression') {
      // cond && <Element />
      const found = walk(node.right, hasScrollAncestor, parentJsx);
      if (found) return found;
    } else if (node.type === 'ConditionalExpression') {
      // cond ? <A /> : <B />
      const foundLeft = walk(node.consequent, hasScrollAncestor, parentJsx);
      if (foundLeft) return foundLeft;
      const foundRight = walk(node.alternate, hasScrollAncestor, parentJsx);
      if (foundRight) return foundRight;
    }
    // Other expression types (CallExpression for .map(), etc.) — skip for POC; runtime D19 covers.
    return undefined;
  }

  // Walk children of `root` with the root itself as the starting parent.
  for (const child of root.children) {
    const found = walk(child, hasScrollClass(root), root);
    if (found) return found;
  }
  return undefined;
}

export default createRule({
  name: 'dialog-scroll-container',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce that <DialogContent> containing a list/grid descendant has a scroll boundary (overflow-y-auto) between them.',
      recommended: 'warn',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingScrollContainer:
        '<DialogContent> contains a {{listName}} descendant without a scroll boundary on the path. Add `tw:overflow-y-auto tw:min-h-0` to the immediate parent (or a closer ancestor) so the list scrolls inside the dialog rather than overflowing it.',
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      JSXElement(node: TSESTree.JSXElement) {
        const name = jsxElementName(node);
        if (name !== 'DialogContent') return;

        const violation = findFirstUnboundedList(node);
        if (!violation) return;

        const listName = jsxElementName(violation.list) ?? '<unknown>';
        const parent = violation.parent;

        context.report({
          node: violation.list,
          messageId: 'missingScrollContainer',
          data: { listName },
          fix(fixer) {
            // Add `tw:overflow-y-auto tw:min-h-0` to the parent's className.
            const classNameAttr = parent.openingElement.attributes.find(
              (attr): attr is TSESTree.JSXAttribute =>
                attr.type === 'JSXAttribute' &&
                attr.name.type === 'JSXIdentifier' &&
                attr.name.name === 'className',
            );

            const addition = 'tw:overflow-y-auto tw:min-h-0';

            if (!classNameAttr) {
              // No className attr — add one after the element name.
              const insertAfter = parent.openingElement.name;
              return fixer.insertTextAfter(insertAfter, ` className="${addition}"`);
            }

            const value = classNameAttr.value;
            if (value && value.type === 'Literal' && typeof value.value === 'string') {
              // Append to the existing string literal.
              return fixer.replaceText(value, `"${value.value} ${addition}"`);
            }

            // className={...} expression — we can't safely modify; skip auto-fix.
            return null;
          },
        });
      },
    };
  },
});

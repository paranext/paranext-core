import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

/** Components that render keycaps, which `TooltipContent`'s side-by-side layout is built for */
const KEYCAP_COMPONENTS = new Set(['Kbd', 'KbdGroup', 'ShortcutKeys']);

/** Classes that switch `TooltipContent` away from its default side-by-side (flex row) layout */
const LAYOUT_OVERRIDE_PATTERN = /^tw[:-](block|grid|flex-col|flex-col-reverse)$/;

/**
 * What one piece of tooltip content renders as. Adjacent `text` and `space` pieces merge into one
 * flex item, and a flex item that is only white space is not rendered.
 *
 * - `text`: text, or an expression that is most likely text (a variable, a call)
 * - `space`: white space only
 * - `keycap`: a {@link KEYCAP_COMPONENTS} element
 * - `element`: any other element
 * - `list`: a `.map()` call, which renders one piece per item
 */
type PieceKind = 'text' | 'space' | 'keycap' | 'element' | 'list';

function getElementName(name: TSESTree.JSXTagNameExpression): string | undefined {
  if (name.type === 'JSXIdentifier') return name.name;
  if (name.type === 'JSXMemberExpression') return name.property.name;
  return undefined;
}

/** Counts the flex items that are not keycaps, as the browser would lay them out */
function countNonKeycapItems(pieces: PieceKind[]): number {
  let count = 0;
  let textRun: PieceKind[] = [];
  const endTextRun = () => {
    if (textRun.includes('text')) count += 1;
    textRun = [];
  };
  pieces.forEach((piece) => {
    if (piece === 'text' || piece === 'space') {
      textRun.push(piece);
      return;
    }
    endTextRun();
    // A list may render any number of items, so count it as more than one
    if (piece === 'list') count += 2;
    else if (piece === 'element') count += 1;
  });
  endTextRun();
  return count;
}

/** Of two alternatives, the one that renders more side-by-side pieces */
function pickWorst(first: PieceKind[], second: PieceKind[]): PieceKind[] {
  return countNonKeycapItems(second) > countNonKeycapItems(first) ? second : first;
}

function classifyExpression(expression: TSESTree.Node): PieceKind[] {
  switch (expression.type) {
    case 'JSXEmptyExpression':
      return [];
    case 'Literal':
      if (expression.value === null || typeof expression.value === 'boolean') return [];
      return [String(expression.value).trim() === '' ? 'space' : 'text'];
    case 'Identifier':
      return expression.name === 'undefined' ? [] : ['text'];
    case 'JSXElement':
    case 'JSXFragment':
      // classifyChild and classifyExpression call each other, so one has to come first
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return classifyChild(expression);
    case 'LogicalExpression':
      // `a && b` renders `b` or nothing; `a || b` and `a ?? b` render one of the two
      if (expression.operator === '&&') return classifyExpression(expression.right);
      return pickWorst(classifyExpression(expression.left), classifyExpression(expression.right));
    case 'ConditionalExpression':
      return pickWorst(
        classifyExpression(expression.consequent),
        classifyExpression(expression.alternate),
      );
    case 'CallExpression':
      if (
        expression.callee.type === 'MemberExpression' &&
        expression.callee.property.type === 'Identifier' &&
        expression.callee.property.name === 'map'
      )
        return ['list'];
      return ['text'];
    default:
      return ['text'];
  }
}

function classifyChild(child: TSESTree.JSXChild | TSESTree.JSXFragment): PieceKind[] {
  switch (child.type) {
    case 'JSXText':
      // JSX drops white space that contains a line break
      if (child.value.trim() === '') return /\n/.test(child.value) ? [] : ['space'];
      return ['text'];
    case 'JSXExpressionContainer':
      return classifyExpression(child.expression);
    case 'JSXFragment':
      return child.children.flatMap(classifyChild);
    case 'JSXElement': {
      const name = getElementName(child.openingElement.name);
      return [name && KEYCAP_COMPONENTS.has(name) ? 'keycap' : 'element'];
    }
    default:
      return ['element'];
  }
}

/** Whether a literal class string switches the tooltip away from the side-by-side layout */
function hasLayoutOverride(classString: string): boolean {
  return classString.split(/\s+/).some((cls) => LAYOUT_OVERRIDE_PATTERN.test(cls));
}

function classNameHasLayoutOverride(element: TSESTree.JSXOpeningElement): boolean {
  return element.attributes.some((attribute) => {
    if (attribute.type !== 'JSXAttribute' || attribute.name.name !== 'className') return false;
    const { value } = attribute;
    if (value?.type === 'Literal' && typeof value.value === 'string')
      return hasLayoutOverride(value.value);
    if (value?.type !== 'JSXExpressionContainer') return false;
    const { expression } = value;
    if (expression.type === 'Literal' && typeof expression.value === 'string')
      return hasLayoutOverride(expression.value);
    if (expression.type === 'TemplateLiteral')
      return expression.quasis.some((quasi) => hasLayoutOverride(quasi.value.raw));
    if (expression.type === 'CallExpression')
      return expression.arguments.some(
        (argument) =>
          argument.type === 'Literal' &&
          typeof argument.value === 'string' &&
          hasLayoutOverride(argument.value),
      );
    return false;
  });
}

/**
 * ESLint rule: paranext/tooltip-content-single-child
 *
 * `TooltipContent` (platform-bible-react, from the shadcn radix-nova style) lays out its children
 * side by side in a flex row, so a label sits next to its keycaps. Any other content with more than
 * one piece — two paragraphs, text next to a `<strong>` — renders as narrow columns once it wraps
 * at the tooltip's maximum width.
 *
 * Good: `<TooltipContent>Save <Kbd>⌘S</Kbd></TooltipContent>`,
 * `<TooltipContent><p>Title</p></TooltipContent>`
 *
 * Bad: `<TooltipContent><p>Title</p><p>Body</p></TooltipContent>`
 *
 * Fix by wrapping the content in one element, or by passing a `className` that changes the layout
 * (`tw:flex-col`, `tw:block`, `tw:grid`).
 */
export default createRule({
  name: 'tooltip-content-single-child',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require TooltipContent content to be one piece (plus keycaps) so it does not render as columns',
      recommended: 'error',
    },
    schema: [],
    messages: {
      sideBySide:
        'TooltipContent lays out its children side by side, so this content renders as columns ' +
        'when it wraps. Wrap the content in one element (for example <p> or <div>); only keycaps ' +
        '(Kbd, KbdGroup, ShortcutKeys) belong next to it.',
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      JSXElement(node: TSESTree.JSXElement) {
        if (getElementName(node.openingElement.name) !== 'TooltipContent') return;
        if (classNameHasLayoutOverride(node.openingElement)) return;
        if (countNonKeycapItems(node.children.flatMap(classifyChild)) <= 1) return;
        context.report({ node: node.openingElement, messageId: 'sideBySide' });
      },
    };
  },
});

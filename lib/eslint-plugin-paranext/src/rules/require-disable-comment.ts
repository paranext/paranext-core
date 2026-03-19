import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

interface DisableDirective {
  pattern: RegExp;
  name: string;
  /** If true, inline text after the directive keyword counts as a valid explanation */
  allowsInlineExplanation?: boolean;
}

// All eslint-disable*, prettier-ignore (not -end), stylelint-disable*, and @ts-* variants
const DISABLE_DIRECTIVES: DisableDirective[] = [
  { pattern: /^\s*eslint-disable\b/, name: 'eslint-disable' },
  { pattern: /^\s*prettier-ignore(?!-end\b)/, name: 'prettier-ignore' },
  { pattern: /^\s*stylelint-disable\b/, name: 'stylelint-disable' },
  {
    pattern: /^\s*@ts-expect-error\b/,
    name: '@ts-expect-error',
    allowsInlineExplanation: true,
  },
  { pattern: /^\s*@ts-ignore\b/, name: '@ts-ignore', allowsInlineExplanation: true },
  { pattern: /^\s*@ts-nocheck\b/, name: '@ts-nocheck', allowsInlineExplanation: true },
];

function matchDirective(comment: TSESTree.Comment): DisableDirective | undefined {
  return DISABLE_DIRECTIVES.find((d) => d.pattern.test(comment.value));
}

/**
 * For directives that allow inline explanations (e.g. @ts-expect-error), check whether the comment
 * contains meaningful text beyond the directive keyword itself. Error codes alone (e.g. "ts(2322)"
 * or "TS2322") don't count as explanations.
 */
function hasInlineExplanation(comment: TSESTree.Comment, directive: DisableDirective): boolean {
  if (!directive.allowsInlineExplanation) return false;
  // Strip the directive keyword and any leading colon/dash/whitespace
  const afterDirective = comment.value.replace(directive.pattern, '').replace(/^[\s:,-]+/, '');
  // Strip standalone TS error codes like "ts(2322)", "TS2322", "2322"
  const withoutErrorCodes = afterDirective
    .replace(/\bts\(\d+\)/gi, '')
    .replace(/\bTS?\d{4,}\b/g, '')
    .replace(/\b\d{4,}\b/g, '');
  // If there's still meaningful text left, it counts as an inline explanation
  return withoutErrorCodes.replace(/[\s:,\-()]+/g, '').length > 0;
}

/**
 * ESLint rule: paranext/require-disable-comment
 *
 * Requires an explanatory comment on the line immediately above any eslint/prettier/stylelint
 * disable directive or TypeScript error suppression (@ts-expect-error, @ts-ignore, @ts-nocheck).
 * This enforces documentation discipline so that suppressed rules/errors never silently accumulate
 * without explanation.
 *
 * See: .context/standards/Code-Style-Guide.md
 */
export default createRule({
  name: 'require-disable-comment',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require an explanatory comment on the line immediately above eslint/prettier/stylelint disable directives and TypeScript error suppressions',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingExplanation:
        "Prefer refactoring code so disabling '{{directive}}' is not necessary. If disabling is necessary, add a comment on the line immediately above explaining why.",
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      Program() {
        const sourceCode = context.getSourceCode();
        const allComments = sourceCode.getAllComments();

        // Build a map from end-line → non-disable comments ending on that line (O(n) lookup).
        const explanationsByEndLine = new Map<number, TSESTree.Comment[]>();
        allComments.forEach((c) => {
          if (matchDirective(c)) return;
          const endLine = c.loc?.end.line;
          if (endLine === undefined) return;
          const bucket = explanationsByEndLine.get(endLine);
          if (bucket) bucket.push(c);
          else explanationsByEndLine.set(endLine, [c]);
        });

        // Collect all directive comments with their metadata, sorted by line
        const directiveComments: {
          comment: TSESTree.Comment;
          directive: DisableDirective;
          line: number;
        }[] = [];
        allComments.forEach((comment) => {
          const directive = matchDirective(comment);
          if (!directive) return;
          const commentLoc = comment.loc;
          if (!commentLoc) return;
          directiveComments.push({ comment, directive, line: commentLoc.start.line });
        });
        directiveComments.sort((a, b) => a.line - b.line);

        // Group consecutive directives (each on the next line after the previous)
        const groups: (typeof directiveComments)[] = [];
        let currentGroup: typeof directiveComments = [];
        directiveComments.forEach((entry) => {
          if (
            currentGroup.length > 0 &&
            entry.line !== currentGroup[currentGroup.length - 1].line + 1
          ) {
            groups.push(currentGroup);
            currentGroup = [];
          }
          currentGroup.push(entry);
        });
        if (currentGroup.length > 0) groups.push(currentGroup);

        // For each group, check if it has any explanation:
        // 1. A non-directive comment on the line immediately above the first directive
        // 2. Any directive in the group with an inline explanation (@ts-* with text)
        groups.forEach((group) => {
          const firstLine = group[0].line;
          const hasPrecedingExplanation =
            (explanationsByEndLine.get(firstLine - 1)?.length ?? 0) > 0;
          const hasAnyInlineExplanation = group.some((entry) =>
            hasInlineExplanation(entry.comment, entry.directive),
          );

          if (hasPrecedingExplanation || hasAnyInlineExplanation) return;

          // No explanation found — report every directive in the group
          group.forEach((entry) => {
            const commentLoc = entry.comment.loc;
            if (!commentLoc) return;
            context.report({
              loc: commentLoc,
              messageId: 'missingExplanation',
              data: { directive: entry.directive.name },
            });
          });
        });
      },
    };
  },
});

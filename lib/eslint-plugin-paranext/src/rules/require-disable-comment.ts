import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

interface DisableDirective {
  pattern: RegExp;
  name: string;
}

// All eslint-disable*, prettier-ignore (not -end), stylelint-disable* variants
const DISABLE_DIRECTIVES: DisableDirective[] = [
  { pattern: /^\s*eslint-disable\b/, name: 'eslint-disable' },
  { pattern: /^\s*prettier-ignore(?!-end\b)/, name: 'prettier-ignore' },
  { pattern: /^\s*stylelint-disable\b/, name: 'stylelint-disable' },
];

function matchDirective(comment: TSESTree.Comment): DisableDirective | undefined {
  return DISABLE_DIRECTIVES.find((d) => d.pattern.test(comment.value));
}

/**
 * ESLint rule: paranext/require-disable-comment
 *
 * Requires an explanatory comment on the line immediately above any eslint/prettier/stylelint
 * disable directive. This enforces documentation discipline so that disabled rules never silently
 * accumulate without explanation.
 *
 * See: .context/standards/Code-Style-Guide.md
 */
export default createRule({
  name: 'require-disable-comment',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require an explanatory comment on the line immediately above eslint/prettier/stylelint disable directives',
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

        allComments.forEach((comment) => {
          const directive = matchDirective(comment);
          if (!directive) return;

          const commentLoc = comment.loc;
          if (!commentLoc) return;

          const precedingLine = commentLoc.start.line - 1;
          const hasPrecedingExplanation =
            (explanationsByEndLine.get(precedingLine)?.length ?? 0) > 0;

          if (!hasPrecedingExplanation) {
            context.report({
              loc: commentLoc,
              messageId: 'missingExplanation',
              data: { directive: directive.name },
            });
          }
        });
      },
    };
  },
});

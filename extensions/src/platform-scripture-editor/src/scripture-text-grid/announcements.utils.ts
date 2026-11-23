import { formatReplacementString } from 'platform-bible-utils';

/**
 * Fills the localized "chapter view opened" template with the resource label. Kept as a pure helper
 * so the substitution is unit-testable without rendering the web view.
 */
export function buildChapterContextOpenedMessage(template: string, resourceLabel: string): string {
  return formatReplacementString(template, { resourceReference: resourceLabel });
}

/* Small utility helpers for the platform-scripture-editor extension. */

import { LocalizationSelectors } from '@papi/core';
import { formatReplacementString, isLocalizeKey, LanguageStrings } from 'platform-bible-utils';

export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/**
 * Check deep equality of two values such that two equal objects or arrays created in two different
 * iframes successfully test as equal
 *
 * WARNING: This checks things that should not be considered for deep equality like object property
 * order. Do not use this if you can use another simpler `deepEqual` implementation like the one in
 * `platform-bible-utils`. If this implementation ever becomes an issue, it may need to be
 * reworked.
 *
 * @param a Object to compare
 * @param b Object to compare
 * @returns `true` if `a` and `b` are deeply equal; `false` otherwise
 */
export function valuesAreDeeplyEqual(a: unknown, b: unknown): boolean {
  // Lightweight deep-equal used across this extension. Uses JSON.stringify which is
  // sufficient for plain data (objects/arrays/primitives) and has the nice property of
  // comparing across iframe boundaries. If you need richer semantics (Dates, Maps, Sets,
  // circular refs) switch to a robust library such as lodash.isequal.
  return JSON.stringify(a) === JSON.stringify(b);
}

// Alias that makes the "across iframes" intent explicit for callers that prefer it.
// Exported with this syntax to preserve the TSDocs
export { valuesAreDeeplyEqual as deepEqualAcrossIframes };

// #region Editor Title Formatting

const PROJECT_ID_TITLE_FORMAT_STRING_KEY = '%webView_platformScriptureEditor_title_format%';
const EDITABLE_KEY = '%webView_platformScriptureEditor_title_editable_indicator%';
const RESOURCE_VIEWER_KEY = '%webView_platformScriptureEditor_title_readonly_no_project%';
const SCRIPTURE_EDITOR_KEY = '%webView_platformScriptureEditor_title_editable_no_project%';

export async function formatEditorTitle(
  unformattedTitle: string | undefined,
  projectId: string | undefined,
  isReadOnly: boolean,
  getProjectName: (projectId: string) => Promise<string>,
  getLocalizedStrings: (selectors: LocalizationSelectors) => Promise<LanguageStrings>,
): Promise<string> {
  let title = unformattedTitle;
  if (!title) {
    if (projectId) title = PROJECT_ID_TITLE_FORMAT_STRING_KEY;
    else title = isReadOnly ? RESOURCE_VIEWER_KEY : SCRIPTURE_EDITOR_KEY;
  }
  if (isLocalizeKey(title)) {
    const localizedStrings = await getLocalizedStrings({
      localizeKeys: [EDITABLE_KEY, title],
    });
    const localizedTitleFormatStr = localizedStrings[title];
    const localizedEditable = localizedStrings[EDITABLE_KEY];

    let projectName = projectId;
    if (projectId) projectName = await getProjectName(projectId);

    title = formatReplacementString(localizedTitleFormatStr, {
      projectId: projectName,
      editable: isReadOnly ? '' : localizedEditable,
    });
  }

  return title;
}

// #endregion Editor Title Formatting

import type {
  HiddenContentDeleteHandler,
  HiddenContentDeleteRequest,
  HiddenContentItem,
} from '@eten-tech-foundation/platform-editor';
import type { DialogTypes } from '@papi/core';
import {
  formatReplacementString,
  isLocalizeKey,
  LanguageStrings,
  LocalizeKey,
} from 'platform-bible-utils';

const TITLE_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_title%';
/** The prompt the web view resolves itself, since it fills in `{markers}`. */
export const HIDDEN_CONTENT_DELETE_PROMPT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_hiddenContentDelete_prompt%';
const DELETE_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_delete%';
const SKIP_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_skip%';
const KEEP_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_keep%';
const CANCEL_EDIT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_hiddenContentDelete_cancelEdit%';

/**
 * Localization keys the hidden-content confirmation shows (checked in English and Spanish by
 * localized-strings.test.ts). The dialog service localizes the title and button keys itself.
 */
export const HIDDEN_CONTENT_DELETE_STRING_KEYS = Object.freeze([
  TITLE_KEY,
  HIDDEN_CONTENT_DELETE_PROMPT_KEY,
  DELETE_KEY,
  SKIP_KEY,
  KEEP_KEY,
  CANCEL_EDIT_KEY,
] as const);

/**
 * The `platform.confirm` dialog options for one hidden-content question. Picked from the dialog's
 * own option type, so renaming one of these options in core fails to compile here instead of
 * silently dropping it — `isModal` in particular: the editor holds the edit and refuses other edits
 * until the question settles, and a floating dialog tab could be left open indefinitely.
 */
export type HiddenContentDeleteConfirmOptions = Required<
  Pick<
    DialogTypes['platform.confirm']['options'],
    'title' | 'prompt' | 'okLabel' | 'cancelLabel' | 'isDestructive' | 'isModal'
  >
>;

/** How a construct reads in USFM: its marker, `//` for an optional break, else `\` + its type. */
function hiddenContentName({ tag, marker }: HiddenContentItem): string {
  if (marker) return `\\${marker}`;
  if (tag === 'optbreak') return '//';
  return `\\${tag}`;
}

/**
 * Names hidden constructs the way they read in USFM (`\fig`, `\esb`, `//`), each once, with a count
 * when there is more than one (`\fig ×12`).
 */
export function describeHiddenContent(items: readonly HiddenContentItem[]): string {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const name = hiddenContentName(item);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  });
  return [...counts].map(([name, count]) => (count > 1 ? `${name} ×${count}` : name)).join(', ');
}

/**
 * The label for the button that keeps the hidden content, named for what the editor will do on
 * "keep": skip over it, leave a caret delete undone, or cancel a whole edit over a selection
 * (including any text being typed or pasted).
 */
function keepLabel({ canSkip, action }: HiddenContentDeleteRequest): LocalizeKey {
  if (canSkip) return SKIP_KEY;
  return action === 'replaceSelection' ? CANCEL_EDIT_KEY : KEEP_KEY;
}

/**
 * The confirmation shown when an edit in a view that hides figures, sidebars, and the like would
 * remove some.
 */
export function buildHiddenContentDeleteConfirm(
  request: HiddenContentDeleteRequest,
  promptTemplate: string,
): HiddenContentDeleteConfirmOptions {
  return {
    title: TITLE_KEY,
    prompt: formatReplacementString(promptTemplate, {
      markers: describeHiddenContent(request.items),
    }),
    okLabel: DELETE_KEY,
    cancelLabel: keepLabel(request),
    isDestructive: true,
    isModal: true,
  };
}

/**
 * The editor's `onHiddenContentDelete`. Answers "delete" only when the user confirms; cancelling,
 * dismissing, or any failure answers "keep" (see the editor's `canSkip` for what keep does). A
 * failure rejects, and the editor logs it and keeps the content.
 *
 * @param getLiveStrings - The web view's current localized strings, including
 *   {@link HIDDEN_CONTENT_DELETE_PROMPT_KEY}. Read each time it asks, so the prompt is in the same
 *   language the dialog service gives the title and buttons, with no lookup in the normal case.
 * @param localize - Looks the prompt up, e.g. `papi.localization.getLocalizedString({ localizeKey
 *   })`. Used only while the live strings have not loaded yet.
 * @param confirm - Shows the confirmation, e.g. `papi.dialogs.showDialog('platform.confirm', …)`.
 */
export function createHiddenContentDeleteHandler(
  getLiveStrings: () => LanguageStrings,
  localize: (localizeKey: LocalizeKey) => Promise<string>,
  confirm: (options: HiddenContentDeleteConfirmOptions) => Promise<boolean | undefined>,
): HiddenContentDeleteHandler {
  return async (request) => {
    const liveTemplate = getLiveStrings()[HIDDEN_CONTENT_DELETE_PROMPT_KEY];
    const promptTemplate =
      liveTemplate && !isLocalizeKey(liveTemplate)
        ? liveTemplate
        : await localize(HIDDEN_CONTENT_DELETE_PROMPT_KEY);
    // A missing string resolves to its key rather than failing; showing that raw key would ask
    // the user nothing they could read.
    if (isLocalizeKey(promptTemplate))
      throw new Error(`No localized string for ${HIDDEN_CONTENT_DELETE_PROMPT_KEY}`);
    const isConfirmed = await confirm(buildHiddenContentDeleteConfirm(request, promptTemplate));
    return isConfirmed === true ? 'delete' : 'keep';
  };
}

import type {
  HiddenContentDeleteHandler,
  HiddenContentDeleteRequest,
  HiddenContentItem,
} from '@eten-tech-foundation/platform-editor';
import { logger } from '@papi/frontend';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';

const TITLE_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_title%';
const PROMPT_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_prompt%';
const DELETE_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_delete%';
const SKIP_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_skip%';
const KEEP_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_keep%';

/**
 * Localization keys the hidden-content confirmation shows (checked in every shipped language by
 * localized-strings.test.ts). The dialog service localizes the title and button keys itself; the
 * handler looks up the prompt when it asks, since it fills in `{markers}`.
 */
export const HIDDEN_CONTENT_DELETE_STRING_KEYS = Object.freeze([
  TITLE_KEY,
  PROMPT_KEY,
  DELETE_KEY,
  SKIP_KEY,
  KEEP_KEY,
] as const);

/** The `platform.confirm` dialog options for one hidden-content question. */
export type HiddenContentDeleteConfirmOptions = {
  title: LocalizeKey;
  prompt: string;
  okLabel: LocalizeKey;
  cancelLabel: LocalizeKey;
  isDestructive: true;
  /**
   * Modal, so the user must answer before doing anything else: the editor holds the edit and
   * refuses other edits until the question settles, and a floating dialog tab could be left open
   * indefinitely.
   */
  isModal: true;
};

/**
 * Names hidden constructs by their USFM marker (`\fig`, `\esb`), falling back to the construct's
 * USJ type name, unprefixed, when it has no marker of its own. Each name appears once.
 */
export function describeHiddenContent(items: readonly HiddenContentItem[]): string {
  const names = items.map(({ tag, marker }) => (marker ? `\\${marker}` : tag));
  return [...new Set(names)].join(', ');
}

/**
 * The confirmation shown when an edit in a view that hides figures, sidebars, and the like would
 * remove some. Confirming deletes. The other button reads "Skip over" when the request's `canSkip`
 * is true ("keep" moves the caret past the hidden content), and "Don't delete" otherwise ("keep"
 * cancels the edit, leaving the text unchanged).
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
    cancelLabel: request.canSkip ? SKIP_KEY : KEEP_KEY,
    isDestructive: true,
    isModal: true,
  };
}

/**
 * The editor's `onHiddenContentDelete`: asks with `confirm` and deletes only on an explicit yes.
 * Cancelling, dismissing, or a failed lookup or dialog all keep the content. When the request can
 * skip, "keep" moves the caret past the hidden content, so a failure skips without asking (and is
 * logged).
 *
 * @param localize - Looks up a localized string in the user's current language, e.g.
 *   `papi.localization.getLocalizedString({ localizeKey })`. Called each time it asks, so the
 *   prompt is in the same language the dialog service gives the title and buttons.
 * @param confirm - Shows the confirmation, e.g. `papi.dialogs.showDialog('platform.confirm', …)`.
 */
export function createHiddenContentDeleteHandler(
  localize: (localizeKey: LocalizeKey) => Promise<string>,
  confirm: (options: HiddenContentDeleteConfirmOptions) => Promise<boolean | undefined>,
): HiddenContentDeleteHandler {
  return async (request) => {
    try {
      const promptTemplate = await localize(PROMPT_KEY);
      const isConfirmed = await confirm(buildHiddenContentDeleteConfirm(request, promptTemplate));
      return isConfirmed === true ? 'delete' : 'keep';
    } catch (error) {
      logger.warn(
        `Kept hidden content: could not ask before deleting it: ${getErrorMessage(error)}`,
      );
      return 'keep';
    }
  };
}

import type {
  HiddenContentDeleteHandler,
  HiddenContentDeleteRequest,
  HiddenContentItem,
} from '@eten-tech-foundation/platform-editor';
import { formatReplacementString, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

const TITLE_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_title%';
const PROMPT_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_prompt%';
const DELETE_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_delete%';
const SKIP_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_skip%';
const KEEP_KEY: LocalizeKey = '%webView_platformScriptureEditor_hiddenContentDelete_keep%';

/** Localization keys the hidden-content confirmation reads; the web view preloads them. */
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
  /** Modal, so nothing else can happen in the editor while the edit is held. */
  isModal: true;
};

/** Shown if the prompt's localized string has not loaded yet. */
const PROMPT_FALLBACK =
  'This would delete content that this view cannot display ({markers}). It is hidden here, but it is part of your text.';

/**
 * Names hidden constructs the way the user would meet them in USFM: by marker (`\fig`, `\esb`), or
 * by USJ type when a construct has no marker of its own. Each name appears once.
 */
export function describeHiddenContent(items: HiddenContentItem[]): string {
  const names = items.map(({ tag, marker }) => (marker ? `\\${marker}` : tag));
  return [...new Set(names)].join(', ');
}

/**
 * The confirmation shown when an edit in a view that hides figures, sidebars, and the like would
 * remove some. Confirming deletes. The other button is labelled for what the editor will do on
 * "keep": skip over the hidden content when the request says it can, otherwise cancel the edit.
 */
export function buildHiddenContentDeleteConfirm(
  request: HiddenContentDeleteRequest,
  localizedStrings: LanguageStrings,
): HiddenContentDeleteConfirmOptions {
  return {
    title: TITLE_KEY,
    prompt: formatReplacementString(localizedStrings[PROMPT_KEY] ?? PROMPT_FALLBACK, {
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
 * Cancelling, dismissing, or a failed dialog all keep the content.
 *
 * @param localizedStrings - Resolved strings for {@link HIDDEN_CONTENT_DELETE_STRING_KEYS}.
 * @param confirm - Shows the confirmation, e.g. `papi.dialogs.showDialog('platform.confirm', …)`.
 */
export function createHiddenContentDeleteHandler(
  localizedStrings: LanguageStrings,
  confirm: (options: HiddenContentDeleteConfirmOptions) => Promise<boolean | undefined>,
): HiddenContentDeleteHandler {
  return async (request) => {
    const isConfirmed = await confirm(buildHiddenContentDeleteConfirm(request, localizedStrings));
    return isConfirmed === true ? 'delete' : 'keep';
  };
}

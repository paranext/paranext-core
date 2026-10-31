import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

const BANNER_TEXT_KEY: LocalizeKey = '%webView_platformScriptureEditor_settingUnreadable_banner%';

export const SETTING_UNREADABLE_BANNER_STRING_KEYS: LocalizeKey[] = [BANNER_TEXT_KEY];

type Props = {
  /** Localized strings from the editor (must include SETTING_UNREADABLE_BANNER_STRING_KEYS). */
  localizedStrings: LanguageStrings;
};

/**
 * Slim banner across the top of the Scripture editor pane while a project setting the editor needs
 * to save safely (`platformScripture.allowInvisibleCharacters`) could not be read. The editor is
 * read-only then, and nothing else on screen says why typing does nothing.
 */
export function SettingUnreadableBanner({ localizedStrings }: Props) {
  return (
    <div className="pr-twp">
      <div
        role="status"
        className="tw:border-b tw:border-border tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium"
      >
        {localizedStrings[BANNER_TEXT_KEY]}
      </div>
    </div>
  );
}

export default SettingUnreadableBanner;

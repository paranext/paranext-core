import UiLanguageSelector, {
  LanguageInfo,
} from '@/components/advanced/ui-language-selector.component';
import { useState } from 'react';

const localizedStrings = {
  '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Pick yer Fallback languages',
};

const languages: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish', de: 'Spanisch' } },
  fr: { autonym: 'Français', uiNames: { en: 'French', de: 'Französisch', es: 'francés' } },
  de: { autonym: 'Deutsch', uiNames: { en: 'German', es: 'alemán', fr: 'Allemand' } },
  zh: { autonym: '中文', uiNames: { en: 'Chinese', es: 'chino' } },
  hi: { autonym: 'हिन्दी', uiNames: { en: 'Hindi', es: 'hindi' } },
  ar: { autonym: 'العربية', uiNames: { en: 'Arabic', es: 'árabe' } },
};

/* This is intentionally a little overcomplicated in order to easily illustrate the problem
 described in issue #1377 */
function UiLanguageSelectorExample() {
  const [primary, setPrimary] = useState('fr');
  const [fallback, setFallback] = useState<string[] | undefined>(undefined);

  return (
    <div className="pr-twp tw-space-y-4 tw-bg-gray-100 tw-p-4">
      <div className="pr-twp tw-space-y-4 tw-bg-gray-100 tw-p-4">
        <h1 className="tw-text-xl tw-font-bold">UI Language Selector Example</h1>
        <div>
          <p>Demonstrates selecting a primary and fallback UI language.</p>
        </div>
        <div
          className="dock-panel dock-style-card dock-style-platform-bible"
          data-dockid="+25"
          style={{
            minWidth: '1px',
            minHeight: '1px',
            flex: '200 1e+06 200px',
            left: '-29px',
            top: '31.5px',
            width: '541px',
            height: '223px',
            zIndex: 13,
          }}
        >
          <div className="dock dock-top">
            <div className="dock-content-holder">
              <div className="dock-content dock-content-top">
                <div
                  id="1da6284c-7e6a-4ab7-d428-e4b1d5577388"
                  role="tabpanel"
                  aria-hidden="false"
                  className="dock-tabpane dock-tabpane-active"
                  aria-labelledby="rc-tabs-2-tab-1da6284c-7e6a-4ab7-d428-e4b1d5577388"
                >
                  <div className="platform-panel">
                    <div className="settings-tab">
                      <div className="pr-twp">
                        <div
                          dir="ltr"
                          data-orientation="vertical"
                          className="tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground"
                        />
                        <div
                          data-state="active"
                          data-orientation="vertical"
                          role="tabpanel"
                          aria-labelledby="radix-:rj:-trigger-Platform Settings"
                          id="radix-:rj:-content-Platform Settings"
                          className="tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2"
                        >
                          <div className="pr-twp tw-grid">
                            <div>
                              <div className="tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2">
                                <div>
                                  <p className="tw-text-sm tw-font-medium tw-leading-none">
                                    Interface Language
                                  </p>
                                  <p className="tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground">
                                    English is always the ultimate fallback if there is not a
                                    localization in a higher-priority locale.
                                  </p>
                                </div>
                                <div
                                  className="pr-twp tw-h-40 tw-bg-slate-300"
                                  style={{ zIndex: 200 }}
                                >
                                  <UiLanguageSelector
                                    className="tw-w-64"
                                    knownUiLanguages={languages}
                                    primaryLanguage={primary}
                                    fallbackLanguages={fallback}
                                    onLanguagesChange={(newUiLanguages: string[]) => {
                                      console.log(`Total count: ${newUiLanguages.length}`);
                                    }}
                                    onPrimaryLanguageChange={(newPrimaryUiLanguageTag: string) => {
                                      setPrimary(newPrimaryUiLanguageTag);
                                      console.log(
                                        `New primary UI language: ${languages[newPrimaryUiLanguageTag]?.autonym || newPrimaryUiLanguageTag}`,
                                      );
                                    }}
                                    onFallbackLanguagesChange={(newFallbacks) => {
                                      const fallbackList = newFallbacks.map(
                                        (tag) => languages[tag]?.autonym || tag,
                                      );
                                      setFallback(newFallbacks);
                                      console.log(`New fallback UI languages:`, fallbackList);
                                    }}
                                    localizedStrings={localizedStrings}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pr-twp tw-rounded-md tw-bg-gray-200 tw-p-4">
        <p>
          <strong>Current Selections:</strong>
        </p>
        <p>Primary Language: {languages[primary]?.autonym || primary}</p>
        <p>
          Fallback Languages:{' '}
          {fallback?.map((tag) => languages[tag]?.autonym || tag).join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
}

export default UiLanguageSelectorExample;

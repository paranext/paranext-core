import { useMemo } from 'react';
import { WebViewProps } from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Checkbox, Label } from 'platform-bible-react';

// --- Localization keys ---

const GUIDE_STRING_KEYS: LocalizeKey[] = [
  '%enhancedResources_guide_title%',
  '%enhancedResources_guide_whatIsER%',
  '%enhancedResources_guide_whatIsERBody%',
  '%enhancedResources_guide_colorCoded%',
  '%enhancedResources_guide_colorCodedIntro%',
  '%enhancedResources_guide_researchTermsLabel%',
  '%enhancedResources_guide_researchTermsDesc%',
  '%enhancedResources_guide_foundLabel%',
  '%enhancedResources_guide_foundDesc%',
  '%enhancedResources_guide_missingLabel%',
  '%enhancedResources_guide_missingDesc%',
  '%enhancedResources_guide_fourTabs%',
  '%enhancedResources_guide_tabDictionary%',
  '%enhancedResources_guide_tabEncyclopedia%',
  '%enhancedResources_guide_tabMedia%',
  '%enhancedResources_guide_tabMaps%',
  '%enhancedResources_guide_keepingUpdated%',
  '%enhancedResources_guide_keepingUpdatedBody%',
  '%enhancedResources_guide_dontShowAgain%',
  '%enhancedResources_guide_learnMore%',
];

// --- Component ---

global.webViewComponent = function GuideWebView({ useWebViewState }: WebViewProps) {
  // --- Localized strings ---
  const [localizedStrings] = useLocalizedStrings(useMemo(() => GUIDE_STRING_KEYS, []));

  // --- Persisted "don't show again" preference ---
  const [dontShowAgain, setDontShowAgain] = useWebViewState<boolean>('dontShowAgain', false);

  return (
    <div
      data-testid="guide-web-view"
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-overflow-auto tw-p-6"
    >
      {/* Title */}
      <h1 className="tw-text-2xl tw-font-bold tw-mb-6">
        {localizedStrings['%enhancedResources_guide_title%']}
      </h1>

      {/* What is an Enhanced Resource? */}
      <section className="tw-mb-6">
        <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
          {localizedStrings['%enhancedResources_guide_whatIsER%']}
        </h2>
        <p className="tw-text-sm tw-leading-relaxed">
          {localizedStrings['%enhancedResources_guide_whatIsERBody%']}
        </p>
      </section>

      {/* Color-coded Highlighting */}
      <section className="tw-mb-6">
        <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
          {localizedStrings['%enhancedResources_guide_colorCoded%']}
        </h2>
        <p className="tw-text-sm tw-leading-relaxed tw-mb-3">
          {localizedStrings['%enhancedResources_guide_colorCodedIntro%']}
        </p>

        <div className="tw-flex tw-flex-col tw-gap-3">
          {/* Research Terms - blue */}
          <div className="tw-flex tw-items-start tw-gap-3">
            <div
              className="tw-w-4 tw-h-4 tw-rounded tw-shrink-0 tw-mt-0.5"
              style={{ backgroundColor: '#3b82f6' }}
              aria-hidden="true"
            />
            <div>
              <span className="tw-font-medium tw-text-sm">
                {localizedStrings['%enhancedResources_guide_researchTermsLabel%']}
              </span>
              <span className="tw-text-sm tw-text-muted-foreground">
                {' '}
                &mdash; {localizedStrings['%enhancedResources_guide_researchTermsDesc%']}
              </span>
            </div>
          </div>

          {/* Found - gray */}
          <div className="tw-flex tw-items-start tw-gap-3">
            <div
              className="tw-w-4 tw-h-4 tw-rounded tw-shrink-0 tw-mt-0.5"
              style={{ backgroundColor: '#9ca3af' }}
              aria-hidden="true"
            />
            <div>
              <span className="tw-font-medium tw-text-sm">
                {localizedStrings['%enhancedResources_guide_foundLabel%']}
              </span>
              <span className="tw-text-sm tw-text-muted-foreground">
                {' '}
                &mdash; {localizedStrings['%enhancedResources_guide_foundDesc%']}
              </span>
            </div>
          </div>

          {/* Missing - orange */}
          <div className="tw-flex tw-items-start tw-gap-3">
            <div
              className="tw-w-4 tw-h-4 tw-rounded tw-shrink-0 tw-mt-0.5"
              style={{ backgroundColor: '#f97316' }}
              aria-hidden="true"
            />
            <div>
              <span className="tw-font-medium tw-text-sm">
                {localizedStrings['%enhancedResources_guide_missingLabel%']}
              </span>
              <span className="tw-text-sm tw-text-muted-foreground">
                {' '}
                &mdash; {localizedStrings['%enhancedResources_guide_missingDesc%']}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Four Research Tabs */}
      <section className="tw-mb-6">
        <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
          {localizedStrings['%enhancedResources_guide_fourTabs%']}
        </h2>
        <ul className="tw-list-disc tw-pl-6 tw-text-sm tw-leading-relaxed tw-space-y-1">
          <li>{localizedStrings['%enhancedResources_guide_tabDictionary%']}</li>
          <li>{localizedStrings['%enhancedResources_guide_tabEncyclopedia%']}</li>
          <li>{localizedStrings['%enhancedResources_guide_tabMedia%']}</li>
          <li>{localizedStrings['%enhancedResources_guide_tabMaps%']}</li>
        </ul>
      </section>

      {/* Keeping Resources Updated */}
      <section className="tw-mb-6">
        <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
          {localizedStrings['%enhancedResources_guide_keepingUpdated%']}
        </h2>
        <p className="tw-text-sm tw-leading-relaxed">
          {localizedStrings['%enhancedResources_guide_keepingUpdatedBody%']}
        </p>
      </section>

      {/* Don't show again checkbox */}
      <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-4">
        <Checkbox
          id="dont-show-again"
          checked={dontShowAgain}
          onCheckedChange={(checked) => setDontShowAgain(checked === true)}
        />
        <Label htmlFor="dont-show-again" className="tw-cursor-pointer tw-text-sm">
          {localizedStrings['%enhancedResources_guide_dontShowAgain%']}
        </Label>
      </div>

      {/* Learn more link */}
      <div className="tw-mt-auto tw-pt-2">
        <span className="tw-text-sm tw-text-primary tw-underline tw-cursor-pointer">
          {localizedStrings['%enhancedResources_guide_learnMore%']}
        </span>
      </div>
    </div>
  );
};

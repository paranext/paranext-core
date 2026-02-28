import { useCallback, useMemo, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';

/** Warning banner configuration defining all six banner types per BHV-411 */
interface WarningBannerConfig {
  /** Unique identifier for this banner */
  id: string;
  /** Whether the user can dismiss this banner */
  dismissible: boolean;
  /** Visual style: 'plain' | 'warning' | 'info' */
  variant: 'plain' | 'warning' | 'info';
  /** Localization key for the banner message text */
  messageKey: `%${string}%`;
  /** Fallback message when localized string unavailable */
  messageFallback: string;
  /** Optional action link configuration */
  action?: {
    /** Localization key for link text */
    labelKey: `%${string}%`;
    /** Fallback label when localized string unavailable */
    labelFallback: string;
  };
}

/** The six warning banner types from ui-spec-marble-form.md */
const BANNER_CONFIGS: WarningBannerConfig[] = [
  {
    id: 'missingBook',
    dismissible: false,
    variant: 'plain',
    messageKey: '%platformEnhancedResources_warning_missingBook%',
    messageFallback: 'This book does not exist in the Enhanced Resource.',
  },
  {
    id: 'reviewStatus',
    dismissible: true,
    variant: 'warning',
    messageKey: '%platformEnhancedResources_warning_reviewStatus%',
    messageFallback: 'This resource is pre-release and has not been fully reviewed.',
  },
  {
    id: 'imageWarning',
    dismissible: false,
    variant: 'warning',
    messageKey: '%platformEnhancedResources_warning_images%',
    messageFallback: 'Full images are not installed.',
    action: {
      labelKey: '%platformEnhancedResources_warning_images_action%',
      labelFallback: 'Download...',
    },
  },
  {
    id: 'copyrightWarning',
    dismissible: true,
    variant: 'warning',
    messageKey: '%platformEnhancedResources_warning_copyright%',
    messageFallback: 'This resource has copyright restrictions.',
    action: {
      labelKey: '%platformEnhancedResources_warning_copyright_action%',
      labelFallback: 'More Info...',
    },
  },
  {
    id: 'updateRequiredData',
    dismissible: false,
    variant: 'warning',
    messageKey: '%platformEnhancedResources_warning_updateData%',
    messageFallback: 'Required metadata is outdated.',
    action: {
      labelKey: '%platformEnhancedResources_warning_updateData_action%',
      labelFallback: 'Click here',
    },
  },
  {
    id: 'updateAvailable',
    dismissible: true,
    variant: 'info',
    messageKey: '%platformEnhancedResources_warning_updateAvailable%',
    messageFallback: 'A new version of this resource is available.',
    action: {
      labelKey: '%platformEnhancedResources_warning_updateAvailable_action%',
      labelFallback: 'Download now',
    },
  },
];

/** All localized string keys used by warning banners */
const BANNER_STRING_KEYS = BANNER_CONFIGS.flatMap((config) => {
  const keys = [config.messageKey];
  if (config.action) keys.push(config.action.labelKey);
  return keys;
});

/** Warning state flags matching the ui-state-contracts.md WarningState interface */
export interface WarningState {
  missingBook: boolean;
  reviewStatus: boolean;
  imageWarning: boolean;
  copyrightWarning: boolean;
  updateRequiredData: boolean;
  updateAvailable: boolean;
}

/** Props for the WarningBannerStack component */
interface WarningBannerStackProps {
  /** Warning state flags that control banner visibility */
  warnings: WarningState;
}

/** Variant-to-CSS class mapping for banner backgrounds */
const VARIANT_CLASSES: Record<string, string> = {
  plain: 'tw-bg-muted tw-border-border',
  warning: 'tw-bg-yellow-50 tw-border-yellow-300',
  info: 'tw-bg-blue-50 tw-border-blue-300',
};

/** Map banner config ID to WarningState key */
const BANNER_STATE_MAP: Record<string, keyof WarningState> = {
  missingBook: 'missingBook',
  reviewStatus: 'reviewStatus',
  imageWarning: 'imageWarning',
  copyrightWarning: 'copyrightWarning',
  updateRequiredData: 'updateRequiredData',
  updateAvailable: 'updateAvailable',
};

/**
 * WarningBannerStack renders conditional warning banners at the top of the MarbleForm.
 *
 * Six banner types are supported per BHV-411:
 *
 * - MissingBookWarning: non-dismissible, plain
 * - ReviewStatus: dismissible, warning
 * - ImageWarning: non-dismissible, warning, action link
 * - CopyrightWarning: dismissible, warning, action link
 * - UpdateRequiredData: non-dismissible, warning, action link
 * - UpdateAvailable: dismissible, info, action link
 *
 * Banners stack vertically when multiple are visible.
 */
export default function WarningBannerStack({ warnings }: WarningBannerStackProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...BANNER_STRING_KEYS], []));

  // Track dismissed banners (only applies to dismissible banners)
  const [dismissedBanners, setDismissedBanners] = useState<Set<string>>(new Set());

  const handleDismiss = useCallback((bannerId: string) => {
    setDismissedBanners((prev) => {
      const next = new Set(prev);
      next.add(bannerId);
      return next;
    });
  }, []);

  // Determine which banners are active (state flag is true)
  const activeBanners = useMemo(
    () =>
      BANNER_CONFIGS.filter((config) => {
        const stateKey = BANNER_STATE_MAP[config.id];
        if (!stateKey) return false;
        return warnings[stateKey];
      }),
    [warnings],
  );

  return (
    <div data-testid="warning-banner-stack" role="region" aria-label="Warning banners">
      {activeBanners.map((config) => {
        const isDismissed = config.dismissible && dismissedBanners.has(config.id);
        return (
          <div
            key={config.id}
            data-testid="warning-banner-item"
            data-dismissible={config.dismissible ? 'true' : 'false'}
            role="alert"
            className={`tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-border-b tw-text-sm ${VARIANT_CLASSES[config.variant] || VARIANT_CLASSES.plain} ${isDismissed ? 'tw-hidden' : 'tw-flex'}`}
          >
            <span className="tw-flex-1">
              {localizedStrings[config.messageKey] || config.messageFallback}
            </span>

            {config.action ? (
              <button
                type="button"
                data-testid="banner-action-link"
                className="tw-text-blue-600 tw-underline hover:tw-text-blue-800 tw-text-sm tw-whitespace-nowrap"
              >
                {localizedStrings[config.action.labelKey] || config.action.labelFallback}
              </button>
            ) : undefined}

            {config.dismissible ? (
              <button
                type="button"
                data-testid="banner-dismiss"
                onClick={() => handleDismiss(config.id)}
                className="tw-ml-2 tw-text-muted-foreground hover:tw-text-foreground tw-text-sm"
                aria-label={`Dismiss ${localizedStrings[config.messageKey] || config.messageFallback}`}
              >
                X
              </button>
            ) : undefined}
          </div>
        );
      })}
    </div>
  );
}

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { WebViewProps } from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';

// --- Types ---

/** Banner state for individual warning banners */
interface BannerState {
  visible: boolean;
  message: string;
  dismissed: boolean;
}

/** All warning banner states */
interface WarningBannerStates {
  missingBook: BannerState;
  reviewStatus: BannerState;
  imageWarning: BannerState;
  copyrightWarning: BannerState;
  updateRequired: BannerState;
  updateAvailable: BannerState;
}

// --- Default values ---

const DEFAULT_SPLITTER_PERCENTAGE = 50;

const DEFAULT_BANNER_STATE: BannerState = {
  visible: false,
  message: '',
  dismissed: false,
};

const DEFAULT_BANNERS: WarningBannerStates = {
  missingBook: { ...DEFAULT_BANNER_STATE },
  reviewStatus: { ...DEFAULT_BANNER_STATE },
  imageWarning: { ...DEFAULT_BANNER_STATE },
  copyrightWarning: { ...DEFAULT_BANNER_STATE },
  updateRequired: { ...DEFAULT_BANNER_STATE },
  updateAvailable: { ...DEFAULT_BANNER_STATE },
};

// --- Localization keys ---

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%enhancedResources_title%',
  '%enhancedResources_scripturePanePlaceholder%',
  '%enhancedResources_researchPanePlaceholder%',
  '%enhancedResources_toolbarPlaceholder%',
  '%enhancedResources_dismiss%',
];

// --- Banner configuration: which banners are dismissable ---

const DISMISSABLE_BANNERS: Set<keyof WarningBannerStates> = new Set([
  'reviewStatus',
  'copyrightWarning',
  'updateAvailable',
]);

/** Order in which banners are displayed */
const BANNER_DISPLAY_ORDER: (keyof WarningBannerStates)[] = [
  'missingBook',
  'reviewStatus',
  'imageWarning',
  'copyrightWarning',
  'updateRequired',
  'updateAvailable',
];

// --- Component ---

global.webViewComponent = function EnhancedResourceWebView({
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  // --- Localized strings ---
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // --- Scroll group verse synchronization ---
  const [scrRef] = useWebViewScrollGroupScrRef();

  // --- Persisted state ---
  const [splitterPercentage, setSplitterPercentage] = useWebViewState<number>(
    'splitterPercentage',
    DEFAULT_SPLITTER_PERCENTAGE,
  );

  // --- Warning banner states ---
  const [banners, setBanners] = useWebViewState<WarningBannerStates>('banners', DEFAULT_BANNERS);

  // Keep a ref to the current banners for use in callbacks
  const bannersRef = useRef(banners);
  useEffect(() => {
    bannersRef.current = banners;
  }, [banners]);

  // --- Debounced splitter persistence ---
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debouncedSetSplitterPercentage = useCallback(
    (size: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setSplitterPercentage(size), 50);
    },
    [setSplitterPercentage],
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- Layout callback for splitter ---
  const onLayout = useCallback(
    (sizes: number[]) => {
      if (sizes && sizes.length >= 2) {
        debouncedSetSplitterPercentage(sizes[0]);
      }
    },
    [debouncedSetSplitterPercentage],
  );

  // --- Banner dismiss handler ---
  const handleDismissBanner = useCallback(
    (bannerKey: keyof WarningBannerStates) => {
      const currentBanners = bannersRef.current;
      setBanners({
        ...currentBanners,
        [bannerKey]: { ...currentBanners[bannerKey], dismissed: true, visible: false },
      });
    },
    [setBanners],
  );

  // --- Format verse reference for display ---
  const verseDisplay = useMemo(() => {
    if (!scrRef) return '';
    return `${scrRef.book ?? ''} ${scrRef.chapterNum ?? ''}:${scrRef.verseNum ?? ''}`;
  }, [scrRef]);

  return (
    <div data-testid="enhanced-resource-viewer" className="pr-twp tw-flex tw-flex-col tw-h-full">
      {/* Toolbar placeholder area */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-border-b tw-bg-muted/50 tw-shrink-0">
        <span className="tw-text-sm tw-text-muted-foreground">
          {localizedStrings['%enhancedResources_toolbarPlaceholder%']}
        </span>
        {verseDisplay ? (
          <span className="tw-text-xs tw-text-muted-foreground tw-ml-auto">{verseDisplay}</span>
        ) : undefined}
      </div>

      {/* Warning banners area */}
      <div className="tw-flex tw-flex-col tw-shrink-0">
        {BANNER_DISPLAY_ORDER.map((bannerKey) => {
          const banner = banners[bannerKey];
          if (!banner.visible || banner.dismissed) return undefined;

          const isDismissable = DISMISSABLE_BANNERS.has(bannerKey);

          return (
            <Alert
              key={bannerKey}
              className="tw-rounded-none tw-border-x-0 tw-border-t-0 tw-py-2 tw-px-4"
            >
              <AlertDescription className="tw-flex tw-items-center tw-justify-between">
                <span>{banner.message}</span>
                {isDismissable ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="tw-ml-2 tw-shrink-0"
                    onClick={() => handleDismissBanner(bannerKey)}
                    aria-label={localizedStrings['%enhancedResources_dismiss%']}
                  >
                    X
                  </Button>
                ) : undefined}
              </AlertDescription>
            </Alert>
          );
        })}
      </div>

      {/* Split pane: Scripture (top) / Research (bottom) */}
      <ResizablePanelGroup
        direction="vertical"
        className="tw-flex-1 tw-min-h-0"
        onLayout={onLayout}
      >
        {/* Scripture Pane */}
        <ResizablePanel
          defaultSize={splitterPercentage}
          minSize={15}
          className="tw-flex tw-flex-col tw-min-h-0"
        >
          <div className="tw-flex-1 tw-overflow-auto tw-p-4">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_scripturePanePlaceholder%']}
            </p>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Research Pane */}
        <ResizablePanel
          defaultSize={100 - splitterPercentage}
          minSize={15}
          className="tw-flex tw-flex-col tw-min-h-0"
        >
          <div className="tw-flex-1 tw-overflow-auto tw-p-4">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_researchPanePlaceholder%']}
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

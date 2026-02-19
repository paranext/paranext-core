import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { Info } from 'lucide-react';

// --- Types ---

/** Project option for the tracked project dropdown */
export interface TrackedProjectOption {
  name: string;
  isNoProject: boolean;
}

/** Props for the ERToolbar component */
export interface ERToolbarProps {
  /** Whether the Research Terms toggle is active */
  showResearchTerms: boolean;
  /** Whether the Found toggle is active */
  showFound: boolean;
  /** Whether the Missing toggle is active */
  showMissing: boolean;
  /** Callback when any highlight toggle changes */
  onHighlightChange: (highlights: {
    researchTerms: boolean;
    found: boolean;
    missing: boolean;
  }) => void;
  /** Currently tracked project name, or undefined for no project */
  trackedProjectName: string | undefined;
  /** Available projects for the dropdown */
  availableProjects: TrackedProjectOption[];
  /** Callback when tracked project changes */
  onTrackedProjectChange: (projectName: string | undefined) => void;
  /** Callback to toggle the Getting Started guide */
  onToggleGuide: () => void;
}

// --- Constants ---

const NO_PROJECT_VALUE = '__no-project__';

/** Responsive breakpoint widths for progressive reduction */
const BREAKPOINT_LABEL_HIDDEN = 600;
const BREAKPOINT_TEXT_REMOVED = 480;
const BREAKPOINT_GUIDE_HIDDEN = 380;

/** Localization keys used by this component */
const TOOLBAR_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%enhancedResources_researchTerms%',
  '%enhancedResources_found%',
  '%enhancedResources_missing%',
  '%enhancedResources_noProject%',
  '%enhancedResources_btToolButton%',
  '%enhancedResources_btToolButton_notAvailable%',
  '%enhancedResources_biblicalTermsLabel%',
  '%enhancedResources_toolbar_researchTermsAbbrev%',
  '%enhancedResources_toolbar_foundAbbrev%',
  '%enhancedResources_toolbar_missingAbbrev%',
  '%enhancedResources_toolbar_infoButton%',
  '%enhancedResources_toolbar_trackProject%',
];

// --- Responsive width state enum ---

type ResponsiveState = 'full' | 'labelHidden' | 'textRemoved' | 'guideHidden';

function getResponsiveState(width: number): ResponsiveState {
  if (width <= BREAKPOINT_GUIDE_HIDDEN) return 'guideHidden';
  if (width <= BREAKPOINT_TEXT_REMOVED) return 'textRemoved';
  if (width <= BREAKPOINT_LABEL_HIDDEN) return 'labelHidden';
  return 'full';
}

// --- Component ---

/**
 * ERToolbar provides the primary toolbar for the Enhanced Resources viewer. It includes toggle
 * buttons for highlighting modes (Research Terms, Found, Missing), a tracked project dropdown, a
 * Getting Started guide toggle, and a disabled BT Tool button (deferred feature DEF-UI-001).
 *
 * The toolbar implements progressive responsive reduction: as the container width decreases,
 * elements are progressively hidden or abbreviated.
 */
export default function ERToolbar({
  showResearchTerms,
  showFound,
  showMissing,
  onHighlightChange,
  trackedProjectName,
  availableProjects,
  onTrackedProjectChange,
  onToggleGuide,
}: ERToolbarProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => TOOLBAR_LOCALIZED_STRING_KEYS, []));

  // --- Responsive width tracking ---
  const containerRef = useRef<HTMLDivElement | undefined>(undefined);
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>('full');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i];
        const { width } = entry.contentRect;
        setResponsiveState(getResponsiveState(width));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Callback ref to set the container element (avoids null for no-null rule)
  const setContainerRef = useCallback((element: HTMLDivElement) => {
    containerRef.current = element;
  }, []);

  // --- Derive toggle group value from boolean props ---
  const toggleValues = useMemo(() => {
    const values: string[] = [];
    if (showResearchTerms) values.push('researchTerms');
    if (showFound) values.push('found');
    if (showMissing) values.push('missing');
    return values;
  }, [showResearchTerms, showFound, showMissing]);

  // --- Handle toggle group value changes ---
  const handleToggleChange = useCallback(
    (newValues: string[]) => {
      onHighlightChange({
        researchTerms: newValues.includes('researchTerms'),
        found: newValues.includes('found'),
        missing: newValues.includes('missing'),
      });
    },
    [onHighlightChange],
  );

  // --- Handle tracked project change ---
  const handleProjectChange = useCallback(
    (value: string) => {
      onTrackedProjectChange(value === NO_PROJECT_VALUE ? undefined : value);
    },
    [onTrackedProjectChange],
  );

  // --- Build project options including "No project" ---
  const projectOptionsWithNoProject = useMemo(() => {
    const noProjectOption: TrackedProjectOption = {
      name: NO_PROJECT_VALUE,
      isNoProject: true,
    };
    return [noProjectOption, ...availableProjects];
  }, [availableProjects]);

  // --- Whether Found/Missing should be disabled (no tracked project) ---
  const isFoundMissingDisabled = !trackedProjectName;

  // --- Determine toggle button labels based on responsive state ---
  const showFullText = responsiveState === 'full' || responsiveState === 'labelHidden';
  const showBiblicalTermsLabel = responsiveState === 'full';
  const showGuideButton = responsiveState !== 'guideHidden';

  const researchTermsLabel = showFullText
    ? localizedStrings['%enhancedResources_researchTerms%']
    : localizedStrings['%enhancedResources_toolbar_researchTermsAbbrev%'];

  const foundLabel = showFullText
    ? localizedStrings['%enhancedResources_found%']
    : localizedStrings['%enhancedResources_toolbar_foundAbbrev%'];

  const missingLabel = showFullText
    ? localizedStrings['%enhancedResources_missing%']
    : localizedStrings['%enhancedResources_toolbar_missingAbbrev%'];

  return (
    <TooltipProvider>
      <div
        ref={setContainerRef}
        data-testid="er-toolbar"
        className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-border-b tw-bg-muted/50 tw-shrink-0 tw-overflow-hidden"
      >
        {/* Term highlight toggle buttons */}
        <ToggleGroup
          type="multiple"
          value={toggleValues}
          onValueChange={handleToggleChange}
          className="tw-shrink-0"
        >
          <ToggleGroupItem
            value="researchTerms"
            aria-label={localizedStrings['%enhancedResources_researchTerms%']}
            className="tw-text-xs data-[state=on]:tw-bg-blue-100 data-[state=on]:tw-text-blue-700 data-[state=on]:tw-border-blue-300 tw-border tw-border-transparent"
          >
            {researchTermsLabel}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="found"
            disabled={isFoundMissingDisabled}
            aria-label={localizedStrings['%enhancedResources_found%']}
            className="tw-text-xs data-[state=on]:tw-bg-gray-200 data-[state=on]:tw-text-gray-700 data-[state=on]:tw-border-gray-400 tw-border tw-border-transparent"
          >
            {foundLabel}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="missing"
            disabled={isFoundMissingDisabled}
            aria-label={localizedStrings['%enhancedResources_missing%']}
            className="tw-text-xs data-[state=on]:tw-bg-orange-100 data-[state=on]:tw-text-orange-700 data-[state=on]:tw-border-orange-400 tw-border tw-border-transparent"
          >
            {missingLabel}
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Spacer to push right side items */}
        <div className="tw-flex-1 tw-min-w-0" />

        {/* Biblical Terms label + tracked project dropdown */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-shrink-0">
          {showBiblicalTermsLabel ? (
            <span className="tw-text-xs tw-text-muted-foreground tw-whitespace-nowrap">
              {localizedStrings['%enhancedResources_biblicalTermsLabel%']}
            </span>
          ) : undefined}
          <Select
            value={trackedProjectName ?? NO_PROJECT_VALUE}
            onValueChange={handleProjectChange}
          >
            <SelectTrigger
              className="tw-w-32 tw-h-7 tw-text-xs"
              aria-label={localizedStrings['%enhancedResources_toolbar_trackProject%']}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projectOptionsWithNoProject.map((option) => (
                <SelectItem
                  key={option.isNoProject ? NO_PROJECT_VALUE : option.name}
                  value={option.isNoProject ? NO_PROJECT_VALUE : option.name}
                >
                  {option.isNoProject
                    ? localizedStrings['%enhancedResources_noProject%']
                    : option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* BT Tool button (deferred - DEF-UI-001) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="tw-shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled
                className="tw-text-xs tw-h-7"
                aria-label={localizedStrings['%enhancedResources_btToolButton%']}
              >
                {localizedStrings['%enhancedResources_btToolButton%']}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{localizedStrings['%enhancedResources_btToolButton_notAvailable%']}</p>
          </TooltipContent>
        </Tooltip>

        {/* Info / Getting Started guide toggle button */}
        {showGuideButton ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="tw-h-7 tw-w-7 tw-p-0 tw-shrink-0"
                onClick={onToggleGuide}
                aria-label={localizedStrings['%enhancedResources_toolbar_infoButton%']}
              >
                <Info className="tw-h-4 tw-w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{localizedStrings['%enhancedResources_toolbar_infoButton%']}</p>
            </TooltipContent>
          </Tooltip>
        ) : undefined}
      </div>
    </TooltipProvider>
  );
}

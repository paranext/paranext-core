import { useCallback, useMemo } from 'react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';

/** Localized string keys used by the toolbar */
const TOOLBAR_LOCALIZED_KEYS = [
  '%platformEnhancedResources_toolbar_researchTerms%',
  '%platformEnhancedResources_toolbar_found%',
  '%platformEnhancedResources_toolbar_missing%',
  '%platformEnhancedResources_toolbar_biblicalTerms%',
  '%platformEnhancedResources_toolbar_noProject%',
  '%platformEnhancedResources_toolbar_scopeCurrentVerse%',
  '%platformEnhancedResources_toolbar_scopeCurrentSection%',
  '%platformEnhancedResources_toolbar_scopeCurrentChapter%',
] as const;

/** Scope filter values */
type ScopeFilterValue = 'currentVerse' | 'currentSection' | 'currentChapter';

/** Tracked project info */
interface TrackedProject {
  id: string;
  name: string;
}

/** Props for the ERToolbar component */
interface ERToolbarProps {
  /** Whether the Research Terms highlight is active */
  researchTermsOn: boolean;
  /** Callback to toggle Research Terms highlight */
  onToggleResearchTerms: () => void;
  /** Whether the Found highlight is active */
  foundOn: boolean;
  /** Callback to toggle Found highlight */
  onToggleFound: () => void;
  /** Whether the Missing highlight is active */
  missingOn: boolean;
  /** Callback to toggle Missing highlight */
  onToggleMissing: () => void;
  /** Currently tracked project (null = none selected) */
  trackedProject: TrackedProject | undefined;
  /** Available projects for the tracked project dropdown */
  availableProjects: TrackedProject[];
  /** Callback when tracked project changes */
  onTrackedProjectChange: (projectId: string | undefined) => void;
  /** Current scope filter value */
  scopeFilter: ScopeFilterValue;
  /** Callback when scope filter changes */
  onScopeFilterChange: (scope: ScopeFilterValue) => void;
  /** Whether the guide panel is visible */
  guideVisible: boolean;
  /** Callback to toggle guide panel */
  onToggleGuide: () => void;
}

/**
 * ERToolbar component provides the main toolbar for the Enhanced Resource web view. Includes
 * Research Terms toggle, Biblical Terms highlight toggles (Found/Missing), tracked project
 * dropdown, scope filter, and info icon.
 *
 * @param props - ERToolbarProps
 * @returns The toolbar with highlight toggles, project dropdown, scope filter, and info icon
 */
export default function ERToolbar({
  researchTermsOn,
  onToggleResearchTerms,
  foundOn,
  onToggleFound,
  missingOn,
  onToggleMissing,
  trackedProject,
  availableProjects,
  onTrackedProjectChange,
  scopeFilter,
  onScopeFilterChange,
  guideVisible,
  onToggleGuide,
}: ERToolbarProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...TOOLBAR_LOCALIZED_KEYS], []));

  const researchTermsLabel =
    localizedStrings['%platformEnhancedResources_toolbar_researchTerms%'] || 'All Research Terms';
  const foundLabel = localizedStrings['%platformEnhancedResources_toolbar_found%'] || 'Found';
  const missingLabel = localizedStrings['%platformEnhancedResources_toolbar_missing%'] || 'Missing';
  const biblicalTermsLabel =
    localizedStrings['%platformEnhancedResources_toolbar_biblicalTerms%'] || 'Biblical Terms:';
  const noProjectLabel =
    localizedStrings['%platformEnhancedResources_toolbar_noProject%'] || 'No project';
  const scopeCurrentVerseLabel =
    localizedStrings['%platformEnhancedResources_toolbar_scopeCurrentVerse%'] || 'Current Verse';
  const scopeCurrentSectionLabel =
    localizedStrings['%platformEnhancedResources_toolbar_scopeCurrentSection%'] ||
    'Current Section';
  const scopeCurrentChapterLabel =
    localizedStrings['%platformEnhancedResources_toolbar_scopeCurrentChapter%'] ||
    'Current Chapter';

  const hasTrackedProject = trackedProject !== undefined;

  const handleProjectChange = useCallback(
    (value: string) => {
      if (value === '__none__') {
        onTrackedProjectChange(undefined);
      } else {
        onTrackedProjectChange(value);
      }
    },
    [onTrackedProjectChange],
  );

  const handleScopeChange = useCallback(
    (value: string) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onScopeFilterChange(value as ScopeFilterValue);
    },
    [onScopeFilterChange],
  );

  return (
    <div
      data-testid="er-toolbar"
      className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-px-3 tw-py-1.5 tw-border-b tw-bg-muted/30 tw-shrink-0"
    >
      {/* Research Terms toggle button */}
      <button
        type="button"
        data-testid="btn-research-terms"
        data-state={researchTermsOn ? 'on' : 'off'}
        onClick={onToggleResearchTerms}
        className={`tw-inline-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-text-sm tw-rounded tw-border tw-transition-colors ${
          researchTermsOn
            ? 'tw-bg-blue-100 tw-border-blue-300 tw-text-blue-800'
            : 'tw-bg-background tw-border-input tw-text-muted-foreground'
        }`}
        aria-label={researchTermsLabel}
        aria-pressed={researchTermsOn}
      >
        {researchTermsLabel}
      </button>

      {/* Separator */}
      <div className="tw-h-5 tw-w-px tw-bg-border tw-mx-1" aria-hidden="true" />

      {/* Biblical Terms label */}
      <span className="tw-text-sm tw-text-muted-foreground tw-hidden sm:tw-inline">
        {biblicalTermsLabel}
      </span>

      {/* Found toggle button */}
      <button
        type="button"
        data-testid="btn-found"
        data-state={foundOn ? 'on' : 'off'}
        onClick={onToggleFound}
        disabled={!hasTrackedProject}
        className={`tw-inline-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-text-sm tw-rounded tw-border tw-transition-colors ${
          foundOn
            ? 'tw-bg-gray-200 tw-border-gray-400 tw-text-gray-800'
            : 'tw-bg-background tw-border-input tw-text-muted-foreground'
        } disabled:tw-opacity-50 disabled:tw-cursor-not-allowed`}
        aria-label={foundLabel}
        aria-pressed={foundOn}
      >
        {foundLabel}
      </button>

      {/* Missing toggle button */}
      <button
        type="button"
        data-testid="btn-missing"
        data-state={missingOn ? 'on' : 'off'}
        onClick={onToggleMissing}
        disabled={!hasTrackedProject}
        className={`tw-inline-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-text-sm tw-rounded tw-border tw-transition-colors ${
          missingOn
            ? 'tw-bg-orange-100 tw-border-orange-300 tw-text-orange-800'
            : 'tw-bg-background tw-border-input tw-text-muted-foreground'
        } disabled:tw-opacity-50 disabled:tw-cursor-not-allowed`}
        aria-label={missingLabel}
        aria-pressed={missingOn}
      >
        {missingLabel}
      </button>

      {/* Tracked project dropdown */}
      <Select value={trackedProject?.id ?? '__none__'} onValueChange={handleProjectChange}>
        <SelectTrigger
          data-testid="tracked-project-dropdown"
          className="tw-h-7 tw-w-[140px] tw-text-sm"
          aria-label={noProjectLabel}
        >
          <SelectValue placeholder={noProjectLabel} />
        </SelectTrigger>
        <SelectContent>
          {availableProjects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
          <SelectItem value="__none__">{noProjectLabel}</SelectItem>
        </SelectContent>
      </Select>

      {/* Info icon button */}
      <Button
        variant="ghost"
        size="sm"
        data-testid="info-icon-btn"
        onClick={onToggleGuide}
        aria-label="Info"
        aria-pressed={guideVisible}
        className="tw-h-7 tw-w-7 tw-p-0"
      >
        <span aria-hidden="true" className="tw-text-base">
          i
        </span>
      </Button>

      {/* Separator before scope filter */}
      <div className="tw-h-5 tw-w-px tw-bg-border tw-mx-1" aria-hidden="true" />

      {/* Scope filter dropdown */}
      <Select value={scopeFilter} onValueChange={handleScopeChange}>
        <SelectTrigger
          data-testid="scope-filter"
          className="tw-h-7 tw-w-[150px] tw-text-sm"
          aria-label={scopeCurrentVerseLabel}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="currentVerse">{scopeCurrentVerseLabel}</SelectItem>
          <SelectItem value="currentSection">{scopeCurrentSectionLabel}</SelectItem>
          <SelectItem value="currentChapter">{scopeCurrentChapterLabel}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

import {
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { ReactNode } from 'react';
import { ResourceCellState } from './resource-cell.utils';

/**
 * Localization keys for the ResourceCell offline states. Import to resolve them via
 * `useLocalizedStrings` (in the app) or `getLocalizedStrings` (in Storybook).
 */
export const UNAVAILABLE_KEY = '%webView_scriptureTextGrid_cell_unavailable%';
export const DOWNLOADING_KEY = '%webView_scriptureTextGrid_cell_status_downloading%';
export const FAILED_KEY = '%webView_scriptureTextGrid_cell_status_failed%';
export const EMPTY_KEY = '%webView_scriptureTextGrid_cell_verse_empty%';
export const RESOURCE_CELL_STRING_KEYS = Object.freeze([
  UNAVAILABLE_KEY,
  DOWNLOADING_KEY,
  FAILED_KEY,
  EMPTY_KEY,
] as const);

type ResourceCellLocalizedStringKey = (typeof RESOURCE_CELL_STRING_KEYS)[number];
export type ResourceCellLocalizedStrings = {
  [key in ResourceCellLocalizedStringKey]?: LocalizedStringValue;
};

export type ResourceCellViewProps = {
  /** Which visual state to render; only `ready` shows the editor. */
  state: ResourceCellState;
  /** Resource label shown in the header and used as the gridcell aria-label. */
  label: string;
  /** This resource's own text direction ('ltr' | 'rtl'), applied to the content area. */
  textDirection: string;
  /** Localized strings; import `RESOURCE_CELL_STRING_KEYS` to resolve them. */
  localizedStrings: ResourceCellLocalizedStrings;
  /** The editor rendered when `state` is `ready` (the connected cell supplies `Editorial`). */
  editor: ReactNode;
  /** When true (verse mode, slice empty), render the empty label instead of the editor. */
  isVerseEmpty?: boolean;
};

/**
 * Presentational ResourceCell: renders the header, per-cell text direction, and either the editor
 * (`ready`) or the offline placeholder (`downloading`/`failed`). Data-free so Storybook can drive
 * every state; `ResourceCell` wraps it with the PAPI fetch/direction/offline wiring.
 */
export function ResourceCellView({
  state,
  label,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
}: ResourceCellViewProps) {
  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center">
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[EMPTY_KEY]}</span>
      </div>
    );
  }

  return (
    <div role="gridcell" aria-label={label} className="tw:flex tw:min-w-0 tw:flex-col">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Single-line header; long labels truncate. The tooltip reveals the full name. */}
            <div className="tw:truncate tw:border-b tw:px-2 tw:py-1 tw:text-sm tw:font-medium">
              {label}
            </div>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="tw:flex-1 tw:overflow-auto tw:p-2" dir={textDirection}>
        {state === 'ready' ? (
          readyContent
        ) : (
          <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center">
            {state === 'downloading' && <Spinner />}
            <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
            <span className="tw:text-sm tw:text-muted-foreground">
              {state === 'failed'
                ? localizedStrings[FAILED_KEY]
                : localizedStrings[DOWNLOADING_KEY]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceCellView;

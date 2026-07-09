import { SerializedVerseRef } from '@sillsdev/scripture';
import { ResourceCell, GridResource } from './resource-cell.component';

type ScriptureTextGridProps = {
  resources: GridResource[];
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  /** Accessible name for the grid region (the web view passes the localized tab title). */
  ariaLabel?: string;
};

/**
 * Horizontal row of one ResourceCell per effective-list resource, all synced to the active scrRef.
 * The active scrRef is owned by the web-view root (via `WebViewProps.useWebViewScrollGroupScrRef`)
 * and passed in — this component is presentational and calls no scroll-group hook.
 */
export function ScriptureTextGrid({
  resources,
  scrRef,
  setScrRef,
  ariaLabel,
}: ScriptureTextGridProps) {
  return (
    <div
      role="grid"
      aria-label={ariaLabel}
      className="tw:h-full tw:overflow-x-auto tw:overflow-y-hidden"
    >
      <div role="row" className="tw:flex tw:h-full tw:flex-row tw:divide-x">
        {resources.map((resource) => (
          // `flex-1` lets cells share width evenly when the row fits; `min-inline-size` floors each
          // cell so a many-resource row scrolls horizontally (grid `overflow-x-auto`) instead of
          // collapsing cells into unreadable slivers in a narrow tab.
          <div key={resource.projectId} className="tw:flex tw:min-w-3xs tw:flex-1 tw:shrink-0">
            <ResourceCell resourceRef={resource} scrRef={scrRef} setScrRef={setScrRef} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScriptureTextGrid;

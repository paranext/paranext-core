import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEffect } from 'react';
import { ResourceCell, GridResource } from './resource-cell.component';

type ScriptureTextGridProps = {
  resources: GridResource[];
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  onDisplayedCountChange?: (count: number) => void;
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
  onDisplayedCountChange,
}: ScriptureTextGridProps) {
  useEffect(() => {
    onDisplayedCountChange?.(resources.length);
  }, [resources.length, onDisplayedCountChange]);

  return (
    <div role="grid" className="tw:h-full tw:overflow-hidden">
      <div role="row" className="tw:flex tw:h-full tw:flex-row tw:divide-x">
        {resources.map((resource) => (
          <div key={resource.projectId} className="tw:flex tw:min-w-0 tw:flex-1">
            <ResourceCell resourceRef={resource} scrRef={scrRef} setScrRef={setScrRef} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScriptureTextGrid;

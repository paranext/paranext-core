import React, { useCallback } from 'react';

/** Props for the TabListItem component */
interface TabListItemProps {
  /** Unique identifier for the item */
  id: string;
  /** Data-testid attribute for testing */
  testId: string;
  /** Primary label text for the item row */
  label: string;
  /** Secondary text (e.g., part of speech, subtitle) */
  subtitle?: string;
  /** Brief description or gloss */
  description?: string;
  /** Whether this item is currently expanded */
  isExpanded: boolean;
  /** Callback when item is clicked to toggle expand/collapse */
  onToggle: (id: string) => void;
  /** Callback when item is clicked as an action (e.g., open viewer) */
  onAction?: (id: string) => void;
  /** Expanded content to render below the row */
  expandedContent?: React.ReactNode;
  /** Data-testid for the expanded detail section */
  detailTestId?: string;
  /** Optional thumbnail image URL */
  thumbnailUrl?: string;
  /** Data-testid for the thumbnail */
  thumbnailTestId?: string;
}

/**
 * Shared list item component used in all four research tabs. Supports expand/collapse rows with
 * detail panels, thumbnails, and action clicks.
 */
export default function TabListItem({
  id,
  testId,
  label,
  subtitle,
  description,
  isExpanded,
  onToggle,
  onAction,
  expandedContent,
  detailTestId,
  thumbnailUrl,
  thumbnailTestId,
}: TabListItemProps) {
  const handleClick = useCallback(() => {
    if (onAction) {
      onAction(id);
    } else {
      onToggle(id);
    }
  }, [id, onAction, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  const handleToggleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle(id);
    },
    [id, onToggle],
  );

  return (
    <div className="tw-border-b tw-border-border" data-testid={testId}>
      <div
        className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-2 tw-cursor-pointer hover:tw-bg-accent tw-transition-colors"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={expandedContent ? isExpanded : undefined}
      >
        {/* Expand/collapse indicator */}
        {expandedContent && !onAction && (
          <button
            type="button"
            className="tw-text-muted-foreground tw-shrink-0 tw-w-4"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            onClick={handleToggleClick}
          >
            {isExpanded ? '\u25BC' : '\u25B6'}
          </button>
        )}

        {/* Thumbnail */}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={label}
            data-testid={thumbnailTestId}
            className="tw-w-10 tw-h-10 tw-object-cover tw-rounded tw-shrink-0"
          />
        )}

        {/* Content */}
        <div className="tw-flex-1 tw-min-w-0">
          <div className="tw-flex tw-items-baseline tw-gap-1">
            <span className="tw-font-medium tw-truncate">{label}</span>
            {subtitle && <span className="tw-text-xs tw-text-muted-foreground">({subtitle})</span>}
          </div>
          {description && (
            <div className="tw-text-sm tw-text-muted-foreground tw-truncate">{description}</div>
          )}
        </div>
      </div>

      {/* Expanded detail panel */}
      {isExpanded && expandedContent && (
        <div className="tw-px-3 tw-py-2 tw-pl-8 tw-bg-muted/50" data-testid={detailTestId}>
          {expandedContent}
        </div>
      )}
    </div>
  );
}

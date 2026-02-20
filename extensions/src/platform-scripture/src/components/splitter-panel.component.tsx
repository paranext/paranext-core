import React, { useCallback, useEffect, useRef, useState } from 'react';

/** Props for the SplitterPanel component */
export interface SplitterPanelProps {
  /** Left/top panel content */
  leftContent: React.ReactNode;
  /** Right/bottom panel content */
  rightContent: React.ReactNode;
  /** Initial proportion of left panel (0.0 to 1.0), default 0.6 */
  initialProportion?: number;
  /** Callback when proportion changes */
  onProportionChange?: (proportion: number) => void;
  /** Whether the left panel is visible */
  leftVisible?: boolean;
  /** Whether the right panel is visible */
  rightVisible?: boolean;
  /** Splitter orientation: 'vertical' for left-right split, 'horizontal' for top-bottom */
  orientation?: 'vertical' | 'horizontal';
  /** Aria-label for the splitter handle */
  ariaLabel?: string;
}

/** Minimum panel proportion to prevent collapsing */
const MIN_PROPORTION = 0.1;
/** Maximum panel proportion to prevent collapsing */
const MAX_PROPORTION = 0.9;

/**
 * A resizable split pane component with a draggable splitter. Supports vertical (left-right) and
 * horizontal (top-bottom) orientation.
 */
export default function SplitterPanel({
  leftContent,
  rightContent,
  initialProportion = 0.6,
  onProportionChange,
  leftVisible = true,
  rightVisible = true,
  orientation = 'vertical',
  ariaLabel,
}: SplitterPanelProps) {
  const [proportion, setProportion] = useState(initialProportion);
  const [isDragging, setIsDragging] = useState(false);
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return undefined;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newProportion: number;

      if (orientation === 'vertical') {
        newProportion = (e.clientX - rect.left) / rect.width;
      } else {
        newProportion = (e.clientY - rect.top) / rect.height;
      }

      newProportion = Math.max(MIN_PROPORTION, Math.min(MAX_PROPORTION, newProportion));
      setProportion(newProportion);
      if (onProportionChange) {
        onProportionChange(newProportion);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onProportionChange, orientation]);

  const isVertical = orientation === 'vertical';
  const bothVisible = leftVisible && rightVisible;

  return (
    <div
      ref={containerRef}
      className={`tw-flex tw-flex-1 tw-overflow-hidden ${isVertical ? 'tw-flex-row' : 'tw-flex-col'}`}
      data-testid="splitter-panel"
    >
      {leftVisible && (
        <div
          className="tw-overflow-hidden"
          style={{
            flex: bothVisible ? proportion : 1,
            minWidth: isVertical ? 0 : undefined,
            minHeight: !isVertical ? 0 : undefined,
          }}
          data-testid="splitter-left-panel"
        >
          {leftContent}
        </div>
      )}

      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      {bothVisible && (
        <div
          role="separator"
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          aria-label={ariaLabel}
          tabIndex={0}
          aria-valuenow={Math.round(proportion * 100)}
          className={`tw-flex-shrink-0 tw-bg-border hover:tw-bg-primary/30 ${
            isVertical ? 'tw-w-1 tw-cursor-col-resize' : 'tw-h-1 tw-cursor-row-resize'
          } ${isDragging ? 'tw-bg-primary/50' : ''}`}
          onMouseDown={handleMouseDown}
          data-testid="splitter-handle"
        />
      )}
      {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}

      {rightVisible && (
        <div
          className="tw-overflow-hidden"
          style={{
            flex: bothVisible ? 1 - proportion : 1,
            minWidth: isVertical ? 0 : undefined,
            minHeight: !isVertical ? 0 : undefined,
          }}
          data-testid="splitter-right-panel"
        >
          {rightContent}
        </div>
      )}
    </div>
  );
}

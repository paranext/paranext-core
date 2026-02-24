import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface SplitterPanelProps {
  /** Left pane content */
  leftContent: React.ReactNode;
  /** Right pane content */
  rightContent: React.ReactNode;
  /** Proportion of left pane (0.0 to 1.0). Default: 0.6 */
  proportion?: number;
  /** Called when proportion changes during drag */
  onProportionChange?: (proportion: number) => void;
  /** Whether the right pane is visible */
  rightVisible?: boolean;
  /** Minimum proportion for left pane. Default: 0.2 */
  minProportion?: number;
  /** Maximum proportion for left pane. Default: 0.8 */
  maxProportion?: number;
}

/** Custom resizable split panel using mouse drag events */
export default function SplitterPanel({
  leftContent,
  rightContent,
  proportion = 0.6,
  onProportionChange,
  rightVisible = true,
  minProportion = 0.2,
  maxProportion = 0.8,
}: SplitterPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let newProportion = (e.clientX - rect.left) / rect.width;
      newProportion = Math.max(minProportion, Math.min(maxProportion, newProportion));
      onProportionChange?.(newProportion);
    },
    [isDragging, minProportion, maxProportion, onProportionChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
    return undefined;
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const leftWidth = rightVisible ? `${proportion * 100}%` : '100%';
  const rightWidth = rightVisible ? `${(1 - proportion) * 100}%` : '0%';

  return (
    <div
      ref={containerRef}
      className="splitter-panel-container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      <div
        className="splitter-panel-left"
        style={{ width: leftWidth, height: '100%', overflow: 'auto', flexShrink: 0 }}
      >
        {leftContent}
      </div>
      {rightVisible && (
        <>
          <div
            className="splitter-panel-divider"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize panes"
            tabIndex={0}
            style={{
              width: '5px',
              cursor: 'col-resize',
              backgroundColor: isDragging
                ? 'var(--pt-color-border-active, #0078d4)'
                : 'var(--pt-color-border, #ccc)',
              flexShrink: 0,
              transition: isDragging ? 'none' : 'background-color 0.15s',
            }}
            onMouseDown={handleMouseDown}
          />
          <div
            className="splitter-panel-right"
            style={{ width: rightWidth, height: '100%', overflow: 'auto', flexShrink: 0 }}
          >
            {rightContent}
          </div>
        </>
      )}
    </div>
  );
}

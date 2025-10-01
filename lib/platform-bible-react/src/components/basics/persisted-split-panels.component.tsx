import { ReactNode, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn-ui/resizable';
import { cn } from '@/utils/shadcn-ui.util';

export type PersistedSplitPanelsProps = {
  /** Additional CSS classes to help with unique styling of the group containing the panels */
  className?: string;
  /**
   * A value indicating how the two panels will be laid out relative to each other:
   *
   * - 'horizontal' (default): panels are side-by-side, separated by a vertical handle.
   * - 'vertical': panels are stacked, separated by a horizontal handle.
   *
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * A flag indicating whether to show a "handle" to make it obvious to the use that the splitter
   * can be moved to resize the panels.
   *
   * @default true
   */
  showHandle?: boolean;
  /** Additional CSS classes to help with unique styling of the resizable handle */
  handleClassName?: string;
  /** A unique key used to persist the first panel's size in `localStorage`. */
  storageKey: string;
  /**
   * The initial percentage of the total available space the first panel should occupy if no
   * persisted value exists. This should be in the range [0-100], as it will be interpreted as a
   * percentage.
   *
   * @default 50
   */
  defaultSize?: number;
  /**
   * Exactly two children:
   *
   * - `children[0]` → content for the first (persisted-size) panel.
   * - `children[1]` → content for the second panel, which automatically fills the remaining space.
   */
  children: [ReactNode, ReactNode];
};

const defaultPanelSize = 50;

/**
 * This component renders a two-panel resizable group, where the size of the first panel is
 * persisted across page reloads.
 */
export function PersistedSplitPanels({
  storageKey,
  className,
  handleClassName,
  defaultSize = defaultPanelSize,
  direction = 'horizontal',
  showHandle = true,
  children,
}: PersistedSplitPanelsProps) {
  const [panelSize, setPanelSize] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? Number(saved) : NaN;
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 100) return parsed;

    if (defaultSize <= 0 || defaultSize > 100) {
      console.warn(
        `PersistedResizableGroup: invalid defaultSize "${defaultSize}" - Expected number (as percentage) in range 0-100. Falling back to 50%.`,
      );
      return defaultPanelSize;
    }

    return defaultSize;
  });

  // persist whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, String(panelSize));
  }, [panelSize, storageKey]);

  return (
    <div className={cn('w-full h-full', className)}>
      <ResizablePanelGroup direction={direction}>
        <ResizablePanel defaultSize={panelSize} onResize={setPanelSize}>
          {children[0]}
        </ResizablePanel>
        <ResizableHandle withHandle={showHandle} className={handleClassName} />
        <ResizablePanel>{children[1]}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PersistedSplitPanels;

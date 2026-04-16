import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Accessible resizable panel groups and layouts with keyboard support. This component is built on
 * react-resizable-panels and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/resizable}
 * @see react-resizable-panels Documentation:
 *   {@link https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels}
 */
function ResizablePanelGroup({
  className,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout,
  orientation,
  ...props
}: ResizablePrimitive.GroupProps & {
  /** @deprecated 16 April 2026. Renamed to `orientation` */
  direction?: 'horizontal' | 'vertical';
  /**
   * Called when the panel sizes change, with an array of sizes in the same order as the panels
   *
   * @deprecated 16 April 2026. Use `onLayoutChange` or `onLayoutChanged` which provide more
   *   detailed layout information.
   */
  onLayout?: (sizes: number[]) => void;
}) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        'tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col',
        className,
      )}
      // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
      orientation={orientation ?? direction}
      // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
      onLayoutChange={onLayout ? (layout) => onLayout(Object.values(layout)) : undefined}
      {...props}
    />
  );
}

// CUSTOM: Convert number size props to strings for the underlying panel component
type PanelSizeProp = ResizablePrimitive.PanelProps['defaultSize'];

// CUSTOM: Convert number size props to strings for the underlying panel component
/** Converts a size prop: numbers become percentage strings (e.g. 39 → "39"), strings pass through. */
function toSizeString(value: PanelSizeProp): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? String(value) : value;
}

/** @inheritdoc ResizablePanelGroup */
function ResizablePanel({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize,
  minSize,
  maxSize,
  collapsedSize,
  ...props
}: ResizablePrimitive.PanelProps & {
  /**
   * From `react-resize-panels` docs:
   *
   * > Default size of Panel within its parent group; default is auto-assigned based on the total
   * > number of Panels.
   *
   * If you pass a number, it will be converted to a percentage string (e.g. `39` → `"39%"`). If you
   * pass a string, it will be interpreted as a CSS size value and passed through as-is (e.g.
   * `"200px"`, `"50%"`, `"10rem"`).
   */
  defaultSize?: PanelSizeProp;

  /**
   * From `react-resize-panels` docs:
   *
   * > Minimum size of Panel within its parent group; defaults to 0%.
   *
   * If you pass a number, it will be converted to a percentage string (e.g. `39` → `"39%"`). If you
   * pass a string, it will be interpreted as a CSS size value and passed through as-is (e.g.
   * `"200px"`, `"50%"`, `"10rem"`).
   */
  minSize?: PanelSizeProp;

  /**
   * From `react-resize-panels` docs:
   *
   * > Maximum size of Panel within its parent group; defaults to 100%.
   *
   * If you pass a number, it will be converted to a percentage string (e.g. `39` → `"39%"`). If you
   * pass a string, it will be interpreted as a CSS size value and passed through as-is (e.g.
   * `"200px"`, `"50%"`, `"10rem"`).
   */
  maxSize?: PanelSizeProp;

  /**
   * From `react-resize-panels` docs:
   *
   * > Panel size when collapsed; defaults to 0%.
   *
   * If you pass a number, it will be converted to a percentage string (e.g. `39` → `"39%"`). If you
   * pass a string, it will be interpreted as a CSS size value and passed through as-is (e.g.
   * `"200px"`, `"50%"`, `"10rem"`).
   */
  collapsedSize?: PanelSizeProp;
}) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      // CUSTOM: Convert number size props to strings for the underlying panel component
      defaultSize={toSizeString(defaultSize)}
      minSize={toSizeString(minSize)}
      maxSize={toSizeString(maxSize)}
      collapsedSize={toSizeString(collapsedSize)}
      {...props}
    />
  );
}

/** @inheritdoc ResizablePanelGroup */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        'tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 rtl:tw:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 rtl:tw:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" />
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

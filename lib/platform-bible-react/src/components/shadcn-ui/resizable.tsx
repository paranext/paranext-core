import React from 'react';
import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Accessible resizable panel groups and layouts with keyboard support. This component is built on
 * react-resizable-panels and styled with Shadcn UI. See Shadcn UI documentation:
 * https://ui.shadcn.com/docs/components/resizable See react-resizable-panels documentation:
 * https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels
 */
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        'tw:flex tw:h-full tw:w-full tw:data-[panel-group-direction=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc ResizablePanelGroup */
const ResizablePanel = ResizablePrimitive.Panel;

/** @inheritdoc ResizablePanelGroup */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        'tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-hidden tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:data-[panel-group-direction=vertical]:h-px tw:data-[panel-group-direction=vertical]:w-full tw:data-[panel-group-direction=vertical]:after:left-0 tw:data-[panel-group-direction=vertical]:after:h-1 tw:data-[panel-group-direction=vertical]:after:w-full tw:data-[panel-group-direction=vertical]:after:-translate-y-1/2 tw:data-[panel-group-direction=vertical]:after:translate-x-0 tw:[&[data-panel-group-direction=vertical]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border">
          <GripVertical className="tw:h-2.5 tw:w-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

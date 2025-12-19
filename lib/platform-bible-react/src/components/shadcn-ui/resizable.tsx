import React from 'react';
import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/utils/shadcn-ui.util';

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
        'tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col',
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
        'tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border">
          <GripVertical className="tw-h-2.5 tw-w-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

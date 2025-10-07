import { cn } from "@/utils/shadcn-ui.util"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "tw-bg-muted tw-text-muted-foreground tw-pointer-events-none tw-inline-flex tw-h-5 tw-w-fit tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-gap-1 tw-rounded-sm tw-px-1 tw-font-sans tw-text-xs tw-font-medium",
        "[&_svg:not([class*=size-])]:tw-size-3",
        "[[data-slot=tooltip-content]_&]:tw-bg-background/20 [[data-slot=tooltip-content]_&]:tw-text-background dark:[[data-slot=tooltip-content]_&]:tw-bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("tw-inline-flex tw-items-center tw-gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

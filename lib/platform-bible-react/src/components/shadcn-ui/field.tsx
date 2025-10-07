"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/shadcn-ui.util"
import { Label } from "@/components/shadcn-ui/label"
import { Separator } from "@/components/shadcn-ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "tw-flex tw-flex-col tw-gap-6",
        "has-[>[data-slot=checkbox-group]]:tw-gap-3 has-[>[data-slot=radio-group]]:tw-gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "tw-mb-3 tw-font-medium",
        "data-[variant=legend]:tw-text-base",
        "data-[variant=label]:tw-text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "tw-group/field-group tw-@container/field-group tw-flex tw-w-full tw-flex-col tw-gap-7 data-[slot=checkbox-group]:tw-gap-3 [&>[data-slot=field-group]]:tw-gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "tw-group/field data-[invalid=true]:tw-text-destructive tw-flex tw-w-full tw-gap-3",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start",
        ],
        responsive: [
          "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "tw-group/field-content tw-flex tw-flex-1 tw-flex-col tw-gap-1.5 tw-leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "tw-group/field-label tw-peer/field-label tw-flex tw-w-fit tw-gap-2 tw-leading-snug tw-group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:tw-w-full has-[>[data-slot=field]]:tw-flex-col has-[>[data-slot=field]]:tw-rounded-md has-[>[data-slot=field]]:tw-border [&>[data-slot=field]]:tw-p-4",
        "has-data-[state=checked]:tw-bg-primary/5 has-data-[state=checked]:tw-border-primary dark:has-data-[state=checked]:tw-bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-font-medium tw-leading-snug tw-group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "tw-text-muted-foreground tw-text-sm tw-font-normal tw-leading-normal tw-group-has-[[data-orientation=horizontal]]/field:text-balance",
        "nth-last-2:tw--mt-1 last:tw-mt-0 [[data-variant=legend]+&]:tw--mt-1.5",
        "[&>a:hover]:tw-text-primary [&>a]:tw-underline [&>a]:tw-underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "tw-relative tw--my-2 tw-h-5 tw-text-sm tw-group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="tw-absolute tw-inset-0 tw-top-1/2" />
      {children && (
        <span
          className="tw-bg-background tw-text-muted-foreground tw-relative tw-mx-auto tw-block tw-w-fit tw-px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="tw-ml-4 tw-flex tw-list-disc tw-flex-col tw-gap-1">
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("tw-text-destructive tw-text-sm tw-font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

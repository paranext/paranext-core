import { PropsWithChildren, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { ErrorDump, ErrorDumpProps, ERROR_DUMP_STRING_KEYS } from '../basics/error-dump.component';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover';
import { Label } from '../shadcn-ui/label';

/**
 * Object containing all keys used for localization in the ErrorPopover component. This extends
 * ERROR_DUMP_STRING_KEYS with additional keys specific to the ErrorPopover. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const ERROR_POPOVER_STRING_KEYS = Object.freeze([
  ...ERROR_DUMP_STRING_KEYS,
  '%webView_error_dump_copied_message%',
] as const);

export type ErrorPopoverLocalizedStrings = {
  [localizedKey in (typeof ERROR_POPOVER_STRING_KEYS)[number]]?: string;
};

/** Interface to store the parameters for the ErrorPopover component */
export type ErrorPopoverProps = PropsWithChildren &
  Omit<ErrorDumpProps, 'localizedStrings'> & {
    /**
     * List of localized strings to localize the strings in this component. Relevant keys can be
     * found in `ERROR_POPOVER_STRING_KEYS`
     */
    localizedStrings: ErrorPopoverLocalizedStrings;
    /** Optional CSS classes to insert into the `PopoverContent` */
    className?: string;
    /** Optional ID for the popover content for accessibility */
    id?: string;
  };

/** A popover component that displays detailed error information using the ErrorDump component. */
export function ErrorPopover({
  errorDetails,
  handleCopyNotify,
  localizedStrings,
  children,
  className,
  id,
}: ErrorPopoverProps) {
  const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false);

  const handleCopyWithNotification = () => {
    setIsCopySuccess(true);
    if (handleCopyNotify) {
      handleCopyNotify();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsCopySuccess(false);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent id={id} className={cn('tw-min-w-80 tw-max-w-96', className)}>
        {isCopySuccess && localizedStrings['%webView_error_dump_copied_message%'] && (
          <Label>{localizedStrings['%webView_error_dump_copied_message%']}</Label>
        )}
        <ErrorDump
          errorDetails={errorDetails}
          handleCopyNotify={handleCopyWithNotification}
          localizedStrings={localizedStrings}
        />
      </PopoverContent>
    </Popover>
  );
}

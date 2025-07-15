import { PropsWithChildren } from 'react';
import { ErrorDump, ErrorDumpLocalizedStrings } from '../basics/error-dump.component';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover';

// Interface to store the parameters for the ErrorPopover component
type ErrorPopoverProps = PropsWithChildren & {
  /** String containing the error details to show */
  errorDetails: string;
  /** Optional handler function to notify the frontend when the error is copied */
  handleCopyNotify?: () => void;
  /** List of localized strings to localize the strings in this component */
  localizedStrings: ErrorDumpLocalizedStrings;
};
/**
 * @param errorDetails The error details to show in the error popover
 * @param handleCopyNotify Optional notification handler function to handle when the error is copied
 * @param localizedStrings List of localized strings to use in the ErrorDump component
 */
export function ErrorPopover({
  errorDetails,
  handleCopyNotify,
  localizedStrings,
  children,
}: ErrorPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="tw-min-w-80 tw-max-w-96">
        <ErrorDump
          errorDetails={errorDetails}
          handleCopyNotify={handleCopyNotify}
          localizedStrings={localizedStrings}
        />
      </PopoverContent>
    </Popover>
  );
}

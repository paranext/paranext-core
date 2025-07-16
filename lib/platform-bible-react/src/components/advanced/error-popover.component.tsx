import { PropsWithChildren } from 'react';
import { ErrorDump, ErrorDumpProps } from '../basics/error-dump.component';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover';

// Interface to store the parameters for the ErrorPopover component
type ErrorPopoverProps = PropsWithChildren & ErrorDumpProps;

/**
 * @param errorDetails The error details to show in the error popover
 * @param handleCopyNotify Optional notification handler function to handle when the error is copied
 * @param localizedStrings List of localized strings to use in the ErrorDump component
 *
 * NOTE: The `ERROR_DUMP_STRING_KEYS` array will need to be imported from the `ErrorDump` component
 * which contains a list of the localized strings that will need to be set to populate the
 * `localizedStrings` parameter
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

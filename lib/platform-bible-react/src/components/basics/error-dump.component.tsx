import { Copy } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { LocalizedStringValue } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const ERROR_DUMP_STRING_KEYS = Object.freeze([
  '%webView_error_dump_header%',
  '%webView_error_dump_info_message%',
] as const);

export type ErrorDumpLocalizedStrings = {
  [localizedInventoryKey in (typeof ERROR_DUMP_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized string
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
const localizeString = (
  strings: ErrorDumpLocalizedStrings,
  key: keyof ErrorDumpLocalizedStrings,
) => {
  return strings[key] ?? key;
};

/** Interface to store the parameters for the ErrorDump component */
export interface ErrorDumpProps {
  /** String containing the error details to show */
  errorDetails: string;
  /** Handler function to notify the frontend when the error is copied */
  handleCopyNotify?: () => void;
  /**
   * List of localized strings to localize the strings in this component. Relevant keys can be found
   * in `ERROR_DUMP_STRING_KEYS`
   */
  localizedStrings: ErrorDumpLocalizedStrings;
}

/** Component to render an error dump */
export function ErrorDump({ errorDetails, handleCopyNotify, localizedStrings }: ErrorDumpProps) {
  const headerText = localizeString(localizedStrings, '%webView_error_dump_header%');
  const infoMessage = localizeString(localizedStrings, '%webView_error_dump_info_message%');

  function handleCopy() {
    navigator.clipboard.writeText(errorDetails);
    if (handleCopyNotify) {
      handleCopyNotify();
    }
  }

  return (
    <div className="tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4">
      <div className="tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch">
        <div className="tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start">
          <div className="tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose">
            {headerText}
          </div>
          <div className="tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground">
            {infoMessage}
          </div>
        </div>
        <Button variant="secondary" size="icon" className="size-8" onClick={() => handleCopy()}>
          <Copy />
        </Button>
      </div>
      <div className="tw-prose tw-w-full">
        <pre className="tw-text-xs">{errorDetails}</pre>
      </div>
    </div>
  );
}

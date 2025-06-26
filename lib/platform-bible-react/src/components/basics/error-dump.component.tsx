import { Copy } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';

// Interface to store the parameters for the ErrorDump component
interface ErrorDumpProps {
  errorDetails: string;
  handleCopyNotify?: () => void;
}

/**
 * Component to render an error dump
 *
 * @param errorDetails Error details string
 * @param handleCopyNotify Handler function to add a notification to the UI to alert that the error
 *   was copied
 */
export default function ErrorDump({ errorDetails, handleCopyNotify }: ErrorDumpProps) {
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
            Error details
          </div>
          <div className="tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground">
            Need help? Share this stack trace with our tech support team so we can resolve your
            issue quickly.
          </div>
        </div>
        <Button variant="secondary" size="icon" className="size-8" onClick={handleCopy}>
          <Copy />
        </Button>
      </div>
      <div className="tw-prose tw-w-full">
        <pre className="tw-text-xs">{errorDetails}</pre>
      </div>
    </div>
  );
}

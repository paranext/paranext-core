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
    <div className="tw-inline-flex tw-flex-col tw-justify-start tw-items-start tw-gap-4 tw-w-full">
      <div className="tw-self-stretch tw-inline-flex tw-justify-start tw-items-start tw-gap-4">
        <div className="tw-flex-1 tw-inline-flex tw-flex-col tw-justify-start tw-items-start">
          <div className="tw-text-center tw-justify-center tw-text-color-text tw-text-lg tw-font-semibold tw-leading-loose">
            Error details
          </div>
          <div className="tw-self-stretch tw-justify-center tw-text-muted-foreground tw-text-sm tw-font-normal tw-leading-tight">
            Need help? Share this stack trace with our tech support team so we can resolve your issue
            quickly.
          </div>
        </div>
        <Button variant="secondary" size="icon" className="size-8" onClick={handleCopy}>
          <Copy />
        </Button>
      </div>
      <div className="tw-prose tw-w-full">
        <pre className='tw-text-xs'>{errorDetails}</pre>
      </div>
    </div>
  );
}

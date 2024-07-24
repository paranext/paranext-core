import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { Download, LoaderCircle } from 'lucide-react';

type DownloadButtonProps = {
  /** The downloading boolean value determines the state of the button. */
  isDownloading: boolean;
  /** The handleClick function is called when the button is clicked. */
  handleClick: () => void;
  /** Optional text for the button. */
  buttonText?: string;
};

/**
 * The DownloadButton component is a button designed for initiating downloads. It includes visuals
 * for active downloading and idle states.
 *
 * @param isDownloading The downloading boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @param buttonText Optional text for the button.
 * @returns A download button.
 */
export default function DownloadButton({
  isDownloading,
  handleClick,
  buttonText,
}: DownloadButtonProps) {
  return (
    <Button
      className={cn(
        'pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out',
        {
          'pr-cursor-not-allowed pr-bg-blue-700': isDownloading,
          'pr-bg-blue-600': !isDownloading,
          'pr-bg-white pr-text-blue-600': !buttonText,
          'pr-w-20': buttonText,
        },
      )}
      onClick={handleClick}
    >
      {isDownloading ? (
        <LoaderCircle size={15} className="pr-animate-spin" />
      ) : (
        <>
          <Download size={25} className="pr-h-4 pr-w-4" />
          {buttonText}
        </>
      )}
    </Button>
  );
}

import { Button } from '@/components/shadcn-ui/button';
import { Download, LoaderCircle } from 'lucide-react';

interface DownloadButtonProps {
  downloading: boolean;
  handleClick: () => void;
  position: 'left' | 'right';
  buttonText: string;
}

/**
 * This is a download button component that provides the styling and props for a download button.
 *
 * @param downloading The downloading boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @param position The position prop determines the position of the download icon.
 * @param buttonText The buttonText prop determines the text of the button.
 * @returns A download button.
 */
export default function DownloadButton({
  downloading,
  handleClick,
  position = 'right',
  buttonText,
}: DownloadButtonProps) {
  return (
    <Button
      className={`pr-h-8 pr-w-20 pr-rounded-md pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out ${
        position === 'left' ? 'pr-bg-white pr-w-15 pr-text-blue-600' : 'pr-bg-blue-600'
      }
      ${downloading && position === 'left' ? 'pr-bg-white pr-text-blue-700' : ''}
      
      `}
      onClick={handleClick}
    >
      {downloading ? (
        <LoaderCircle size={15} className="pr-mr-1 pr-animate-spin" />
      ) : (
        <>
          {position === 'right' && <Download size={25} className="pr-mr-2 pr-h-4 pr-w-4" />}
          {position === 'right' && buttonText}
          {position === 'left' && <Download size={25} className="pr-h-4 pr-w-4" />}
        </>
      )}
    </Button>
  );
}

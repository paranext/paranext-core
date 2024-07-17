import { Button } from '@/components/shadcn-ui/button';
import { LoaderCircle } from 'lucide-react';

interface RemoveButtonProps {
  removing: boolean;
  handleClick: () => void;
}

/**
 * This is an remove button component and provides styling and props for an remove button.
 *
 * @param removing The removing boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to remove.
 */
export default function RemoveButton({ removing, handleClick }: RemoveButtonProps) {
  return (
    <Button
      className={`pr-h-8 pr-rounded-md pr-bg-gray-300 pr-px-4 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white ${removing ? 'pr-cursor-not-allowed pr-bg-gray-400' : ''}`}
      onClick={handleClick}
    >
      {removing ? (
        <>
          <LoaderCircle size={15} className="pr-mr-1 pr-animate-spin pr-text-black" />
          Removing...
        </>
      ) : (
        'Remove'
      )}
    </Button>
  );
}

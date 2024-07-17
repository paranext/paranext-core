import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { LoaderCircle } from 'lucide-react';

type RemoveButtonProps = {
  /**
   * The removing boolean value determines the state of the button.
   */
  isRemoving: boolean;
  /**
   * The handleClick function is called when the button is clicked.
   */
  handleClick: () => void;
}

/**
 * The RemoveButton component is a button designed for initiating removals of downloads. It includes visuals for active removals and idle states.
 *
 * @param isRemoving The removing boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to remove.
 */
export default function RemoveButton({ isRemoving, handleClick }: RemoveButtonProps) {
  return (
    <Button
      className={cn(
        'pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white',
        isRemoving ? 'pr-cursor-not-allowed pr-bg-gray-400' : '',
      )}
      onClick={handleClick}
    >
      {isRemoving ? (
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

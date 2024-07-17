import { Button } from '@/components/shadcn-ui/button';
import { LoaderCircle } from 'lucide-react';

interface UpdateButtonProps {
  updating: boolean;
  handleClick: () => void;
}

/**
 * This is an update button component and provides styling and props for an update button.
 *
 * @param updating The updating boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to update.
 */
export default function UpdateButton({ updating, handleClick }: UpdateButtonProps) {
  return (
    <Button
      className={`pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white ${updating ? 'pr-cursor-not-allowed pr-bg-blue-700' : ''}`}
      onClick={handleClick}
    >
      {updating ? (
        <>
          <LoaderCircle size={15} className="pr-mr-1 pr-animate-spin pr-text-white" />
          Updating...
        </>
      ) : (
        'Update'
      )}
    </Button>
  );
}

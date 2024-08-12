import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { LoaderCircle } from 'lucide-react';

type UpdateButtonProps = {
  /** The updating boolean value determines the state of the button. */
  isUpdating: boolean;
  /** The handleClick function is called when the button is clicked. */
  handleClick: () => void;
} & ButtonProps;

/**
 * The UpdateButton component is a button designed for initiating updates for downloaded extensions.
 * It includes visuals for active updating and idle states.
 *
 * @param isUpdating The updating boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to update.
 */
export default function UpdateButton({
  isUpdating,
  handleClick,
  className,
  ...props
}: UpdateButtonProps) {
  return (
    <Button
      className={cn(
        'pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white',
        {
          'pr-cursor-not-allowed pr-bg-blue-700': isUpdating,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isUpdating ? (
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

import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import Spinner from '@/components/basics/spinner.component';
import { cn } from '@/utils/shadcn-ui.util';

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
 * @param UpdateButtonProps
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
        'tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white',
        {
          'tw-cursor-not-allowed tw-bg-blue-700': isUpdating,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isUpdating ? (
        <>
          <Spinner size={15} className="tw-mr-1 tw-text-white" />
          Updating...
        </>
      ) : (
        'Update'
      )}
    </Button>
  );
}

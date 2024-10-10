import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import Spinner from '@/components/basics/spinner.component';
import { cn } from '@/utils/shadcn-ui.util';

type DisableButtonProps = {
  /** The disabling boolean value determines the state of the button. */
  isDisabling: boolean;
  /** The handleClick function is called when the button is clicked. */
  handleClick: () => void;
} & ButtonProps;

/**
 * The DisableButton component is a button designed for initiating disabling of downloads. It
 * includes visuals for active disabling and idle states.
 *
 * @param isDisabling The disabling boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to disable.
 */
export default function DisableButton({
  isDisabling,
  handleClick,
  className,
  ...props
}: DisableButtonProps) {
  return (
    <Button
      className={cn(
        'tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400',
        {
          'tw-cursor-not-allowed tw-bg-gray-400': isDisabling,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isDisabling ? (
        <>
          <Spinner size={15} className="tw-mr-1 tw-text-black" />
          Disabling...
        </>
      ) : (
        'Disable'
      )}
    </Button>
  );
}

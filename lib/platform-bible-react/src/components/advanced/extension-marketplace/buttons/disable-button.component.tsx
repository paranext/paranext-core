import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { LoaderCircle } from 'lucide-react';

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
        'pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400',
        {
          'pr-cursor-not-allowed pr-bg-gray-400': isDisabling,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isDisabling ? (
        <>
          <LoaderCircle size={15} className="pr-mr-1 pr-animate-spin pr-text-black" />
          Disabling...
        </>
      ) : (
        'Disable'
      )}
    </Button>
  );
}

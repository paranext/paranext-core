import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { Spinner } from '@/components/basics/spinner.component';
import { cn } from '@/utils/shadcn-ui.util';
import { Download } from 'lucide-react';

type InstallButtonProps = {
  /** The installing boolean value determines the state of the button. */
  isInstalling: boolean;
  /** The handleClick function is called when the button is clicked. */
  handleClick: () => void;
  /** Optional text for the button. */
  buttonText?: string;
} & ButtonProps;

/**
 * The InstallButton component is a button designed for initiating installs. It includes visuals for
 * active installing and idle states.
 *
 * @param InstallButtonProps
 * @returns A install button.
 */
export function InstallButton({
  isInstalling,
  handleClick,
  buttonText,
  className,
  ...props
}: InstallButtonProps) {
  return (
    <Button
      className={cn(
        'tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700',
        {
          'tw-cursor-not-allowed tw-bg-blue-700': isInstalling,
          'tw-bg-blue-600': !isInstalling,
          'tw-bg-white tw-text-blue-600 hover:tw-text-white': !buttonText,
          'tw-w-20': buttonText,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isInstalling ? (
        <Spinner size={15} />
      ) : (
        <>
          <Download size={25} className={cn('tw-h-4 tw-w-4', { 'tw-mr-1': buttonText })} />
          {buttonText}
        </>
      )}
    </Button>
  );
}

export default InstallButton;

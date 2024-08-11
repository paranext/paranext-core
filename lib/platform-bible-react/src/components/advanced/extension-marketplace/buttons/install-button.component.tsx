import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { Download, LoaderCircle } from 'lucide-react';

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
 * @param isInstalling The installing boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @param buttonText Optional text for the button.
 * @returns A install button.
 */
export default function InstallButton({
  isInstalling,
  handleClick,
  buttonText,
  className,
  ...props
}: InstallButtonProps) {
  return (
    <Button
      className={cn(
        'pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700',
        {
          'pr-cursor-not-allowed pr-bg-blue-700': isInstalling,
          'pr-bg-blue-600': !isInstalling,
          'pr-bg-white pr-text-blue-600 hover:pr-text-white': !buttonText,
          'pr-w-20': buttonText,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isInstalling ? (
        <LoaderCircle size={15} className="pr-animate-spin" />
      ) : (
        <>
          <Download size={25} className={cn('pr-h-4 pr-w-4', { 'pr-mr-1': buttonText })} />
          {buttonText}
        </>
      )}
    </Button>
  );
}

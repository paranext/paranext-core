import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import Spinner from '@/components/basics/spinner.component';
import { cn } from '@/utils/shadcn-ui.util';

type EnableButtonProps = {
  /** The enabling boolean value determines the state of the button. */
  isEnabling: boolean;
  /** The handleClick function is called when the button is clicked. */
  handleClick: () => void;
} & ButtonProps;

/**
 * The EnableButton component is a button designed for initiating enabling of downloads. It includes
 * visuals for active enabling and idle states.
 *
 * @param isEnabling The enabling boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to enable.
 */
export default function EnableButton({
  isEnabling,
  handleClick,
  className,
  ...props
}: EnableButtonProps) {
  return (
    <Button
      className={cn(
        'pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700',
        {
          'pr-cursor-not-allowed pr-bg-blue-700': isEnabling,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isEnabling ? (
        <>
          <Spinner size={15} className="pr-mr-1 pr-text-white" />
          Enabling...
        </>
      ) : (
        'Enable'
      )}
    </Button>
  );
}

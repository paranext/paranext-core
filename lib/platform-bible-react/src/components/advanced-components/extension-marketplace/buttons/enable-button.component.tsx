import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { LoaderCircle } from 'lucide-react';

type EnableButtonProps = {
  /** Object unique identifier */
  id?: string;
  /** The enabling boolean value determines the state of the button. */
  isEnabling: boolean;
  /** The handleClick function is called when the button is clicked. */
  handleClick: () => void;
} & ButtonProps;

/**
 * The EnableButton component is a button designed for initiating enabling of downloads. It includes
 * visuals for active enabling and idle states.
 *
 * @param id Optional unique identifier
 * @param isEnabling The enabling boolean value determines the state of the button.
 * @param handleClick The handleClick function is called when the button is clicked.
 * @returns A button that can be used to enable.
 */
export default function EnableButton({
  id,
  isEnabling,
  handleClick,
  className,
  ...props
}: EnableButtonProps) {
  return (
    <Button
      id={id}
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
          <LoaderCircle size={15} className="pr-mr-1 pr-animate-spin pr-text-white" />
          Enabling...
        </>
      ) : (
        'Enable'
      )}
    </Button>
  );
}

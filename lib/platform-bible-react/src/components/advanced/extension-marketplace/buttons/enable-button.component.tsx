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
 * @param EnableButtonProps
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
        'tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700',
        {
          'tw-cursor-not-allowed tw-bg-blue-700': isEnabling,
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isEnabling ? (
        <>
          <Spinner size={15} className="tw-mr-1 tw-text-white" />
          Enabling...
        </>
      ) : (
        'Enable'
      )}
    </Button>
  );
}

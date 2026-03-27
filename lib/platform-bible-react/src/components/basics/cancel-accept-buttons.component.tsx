import { Button, type ButtonProps } from '@/components/shadcn-ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/shadcn-ui/button-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Check, X } from 'lucide-react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component.
 */
export const CANCEL_ACCEPT_BUTTONS_STRING_KEYS = Object.freeze([
  '%cancelButton_tooltip%',
  '%acceptButton_tooltip%',
] as const);

export type CancelAcceptButtonsLocalizedStrings = {
  [key in (typeof CANCEL_ACCEPT_BUTTONS_STRING_KEYS)[number]]?: string;
};

const localizeString = (
  strings: CancelAcceptButtonsLocalizedStrings,
  key: keyof CancelAcceptButtonsLocalizedStrings,
) => strings[key] ?? key;

export type CancelAcceptButtonsProps = {
  /** Function to call when Cancel is clicked. */
  onCancelClick: () => void;
  /** Function to call when Accept is clicked. */
  onAcceptClick: () => void;
  /** Whether the Cancel button is enabled. */
  canCancel?: boolean;
  /** Whether the Accept button is enabled. */
  canAccept?: boolean;
  /**
   * Localized strings for button tooltips and aria-labels. Falls back to the key itself if not
   * provided.
   */
  localizedStrings?: CancelAcceptButtonsLocalizedStrings;
  /** CSS class name for the buttons. Defaults to "tw-h-6 tw-w-6". */
  className?: string;
  /** Variant for the buttons. Defaults to "ghost". */
  variant?: ButtonProps['variant'];
};

/**
 * Cancel and Accept buttons with tooltips in a ButtonGroup. Suitable for use in any editor toolbar.
 * Tooltip text defaults to the localization key if no localized strings are provided.
 */
export function CancelAcceptButtons({
  onCancelClick,
  onAcceptClick,
  canCancel = true,
  canAccept = true,
  localizedStrings = {},
  className = 'tw-h-6 tw-w-6',
  variant = 'ghost',
}: CancelAcceptButtonsProps) {
  const cancelLocalized = localizeString(localizedStrings, '%cancelButton_tooltip%');
  const acceptLocalized = localizeString(localizedStrings, '%acceptButton_tooltip%');
  const getsSeparator = variant === 'secondary' || variant === 'default';

  return (
    <ButtonGroup>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={cancelLocalized}
              className={className}
              size="icon"
              onClick={onCancelClick}
              disabled={!canCancel}
              variant={variant}
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{cancelLocalized}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {getsSeparator && <ButtonGroupSeparator />}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={acceptLocalized}
              className={className}
              size="icon"
              onClick={onAcceptClick}
              disabled={!canAccept}
              variant={variant}
            >
              <Check />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{acceptLocalized}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ButtonGroup>
  );
}

export default CancelAcceptButtons;

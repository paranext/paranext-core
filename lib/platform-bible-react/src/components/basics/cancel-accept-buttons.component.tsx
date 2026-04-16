import { Button } from '@/components/shadcn-ui/button';
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
  /** Whether the Accept button is enabled. */
  canAccept?: boolean;
  /**
   * Localized strings for button tooltips and aria-labels. Falls back to the key itself if not
   * provided.
   */
  localizedStrings?: CancelAcceptButtonsLocalizedStrings;
  /** CSS class name for the buttons. Defaults to "tw:h-6 tw:w-6". */
  className?: string;
  /**
   * Optional context-specific label for the accept button (e.g. "Save Comment", "Save Footnote").
   * When provided, overrides the generic `%acceptButton_tooltip%` localized string.
   */
  acceptLabel?: string;
};

/**
 * Cancel and Accept buttons with tooltips in a ButtonGroup. Suitable for use in any editor toolbar.
 * Tooltip text defaults to the localization key if no localized strings are provided.
 */
export function CancelAcceptButtons({
  onCancelClick,
  onAcceptClick,
  canAccept = true,
  localizedStrings = {},
  className = 'tw:h-6 tw:w-6',
  acceptLabel,
}: CancelAcceptButtonsProps) {
  const cancelLocalized = localizeString(localizedStrings, '%cancelButton_tooltip%');
  const acceptLocalized = acceptLabel ?? localizeString(localizedStrings, '%acceptButton_tooltip%');

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
              variant="secondary"
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{cancelLocalized}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ButtonGroupSeparator />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={acceptLocalized}
              className={className}
              size="icon"
              onClick={onAcceptClick}
              disabled={!canAccept}
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

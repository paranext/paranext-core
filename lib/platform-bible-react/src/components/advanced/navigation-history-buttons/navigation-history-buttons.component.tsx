import { Button, type ButtonProps } from '@/components/shadcn-ui/button';
import { ButtonGroup } from '@/components/shadcn-ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Kbd } from '@/components/shadcn-ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { readDirection } from '@/utils/dir-helper.util';
import { isMacOs } from '@/utils/platform.util';
import { cn } from '@/utils/shadcn-ui/utils';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component.
 */
export const NAVIGATION_HISTORY_BUTTONS_STRING_KEYS = Object.freeze([
  '%navigationHistory_back_tooltip%',
  '%navigationHistory_forward_tooltip%',
  '%navigationHistory_backList_ariaLabel%',
  '%navigationHistory_forwardList_ariaLabel%',
] as const);

export type NavigationHistoryButtonsLocalizedStrings = {
  [key in (typeof NAVIGATION_HISTORY_BUTTONS_STRING_KEYS)[number]]?: string;
};

const localizeString = (
  strings: NavigationHistoryButtonsLocalizedStrings,
  key: keyof NavigationHistoryButtonsLocalizedStrings,
) => strings[key] ?? key;

/** One entry in a navigation-history dropdown */
export type NavigationHistoryItem = {
  /** Display label for the history entry, e.g. 'Mark 4:1' */
  label: string;
  /** Signed navigation offset for this entry: negative = back, positive = forward */
  offset: number;
};

export type NavigationHistoryButtonsProps = {
  /** Whether the back button is enabled */
  canGoBack?: boolean;
  /** Whether the forward button is enabled */
  canGoForward?: boolean;
  /** History entries behind the current location, nearest first (offsets -1, -2, ...) */
  backItems?: NavigationHistoryItem[];
  /** History entries ahead of the current location, nearest first (offsets +1, +2, ...) */
  forwardItems?: NavigationHistoryItem[];
  /** Called with the signed offset to navigate by (from a button click or a dropdown item) */
  onNavigate: (offset: number) => void;
  /** Localized strings for tooltips and aria-labels. Falls back to the key itself */
  localizedStrings?: NavigationHistoryButtonsLocalizedStrings;
  /**
   * Whether to show OS-specific keyboard shortcut hints in the tooltips. Defaults to `true`. The
   * hints follow the UI direction: in RTL the back/forward keys swap (physical-direction
   * preserving, matching the main-process handler)
   */
  showKeyboardShortcuts?: boolean;
  /** CSS class name for the buttons */
  className?: string;
  /** Variant for the buttons. Defaults to "ghost" */
  variant?: ButtonProps['variant'];
};

/**
 * Back/forward reference-history split buttons: each half is an action button plus a dropdown
 * listing the history entries in that direction. In RTL the pair mirrors (order, arrow icons, and
 * tooltip shortcut hints), matching Paratext 9.
 */
export function NavigationHistoryButtons({
  canGoBack = false,
  canGoForward = false,
  backItems = [],
  forwardItems = [],
  onNavigate,
  localizedStrings = {},
  showKeyboardShortcuts = true,
  className,
  variant = 'ghost',
}: NavigationHistoryButtonsProps) {
  const isMac = isMacOs();
  const isRtl = readDirection() === 'rtl';

  const backLocalized = localizeString(localizedStrings, '%navigationHistory_back_tooltip%');
  const forwardLocalized = localizeString(localizedStrings, '%navigationHistory_forward_tooltip%');
  const backListLocalized = localizeString(
    localizedStrings,
    '%navigationHistory_backList_ariaLabel%',
  );
  const forwardListLocalized = localizeString(
    localizedStrings,
    '%navigationHistory_forwardList_ariaLabel%',
  );

  // Physical keys swap meaning in RTL (matching the main-process handler), so the hint shown for
  // "back" in RTL is the physically-right key.
  let backShortcut: string;
  let forwardShortcut: string;
  if (isMac) {
    backShortcut = isRtl ? '⌘]' : '⌘[';
    forwardShortcut = isRtl ? '⌘[' : '⌘]';
  } else {
    backShortcut = isRtl ? 'Alt+→' : 'Alt+←';
    forwardShortcut = isRtl ? 'Alt+←' : 'Alt+→';
  }

  const renderSplitButton = (direction: 'back' | 'forward') => {
    const isBack = direction === 'back';
    const enabled = isBack ? canGoBack : canGoForward;
    const items = isBack ? backItems : forwardItems;
    const tooltip = isBack ? backLocalized : forwardLocalized;
    const listAriaLabel = isBack ? backListLocalized : forwardListLocalized;
    const shortcut = isBack ? backShortcut : forwardShortcut;
    // Arrow glyphs mirror in RTL (like the BookChapterControl's back-to-list button)
    const showLeftArrow = isBack !== isRtl;

    return (
      <ButtonGroup key={direction}>
        <TooltipProvider>
          <Tooltip>
            {/* The span wrapper keeps tooltips working while the button is disabled (a disabled
                button gets pointer-events-none, so it can't be the trigger itself). The
                ButtonGroup corner-merging styles land on the span, so the buttons carry the
                equivalent logical rounding classes directly. */}
            <TooltipTrigger asChild>
              <span className="tw:inline-flex">
                <Button
                  aria-label={tooltip}
                  data-testid={`navigation-history-${direction}-button`}
                  className={cn('tw:rounded-e-none', className)}
                  size="icon"
                  variant={variant}
                  disabled={!enabled}
                  onClick={() => onNavigate(isBack ? -1 : 1)}
                >
                  {showLeftArrow ? <ArrowLeft /> : <ArrowRight />}
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {tooltip}
                {showKeyboardShortcuts && (
                  <>
                    {' '}
                    <Kbd>{shortcut}</Kbd>
                  </>
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw:inline-flex">
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-label={listAriaLabel}
                      data-testid={`navigation-history-${direction}-menu-trigger`}
                      className={cn('tw:rounded-s-none', className)}
                      size="icon"
                      variant={variant}
                      disabled={items.length === 0}
                    >
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{listAriaLabel}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent>
            {items.map((item) => (
              <DropdownMenuItem key={item.offset} onSelect={() => onNavigate(item.offset)}>
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    );
  };

  // In RTL the pair mirrors position: forward renders first so back sits on the right.
  const first = isRtl ? 'forward' : 'back';
  const second = isRtl ? 'back' : 'forward';

  return (
    <div className="tw:flex tw:items-center tw:gap-1" data-testid="navigation-history-buttons">
      {renderSplitButton(first)}
      {renderSplitButton(second)}
    </div>
  );
}

export default NavigationHistoryButtons;

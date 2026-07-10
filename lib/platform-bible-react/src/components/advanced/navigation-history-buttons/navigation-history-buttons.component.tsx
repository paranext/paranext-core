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
import { resolveReferenceHistoryDirection } from 'platform-bible-utils/experimental';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

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

/** One entry in a navigation-history menu */
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
  /** Called with the signed offset to navigate by (from a button click or a history-menu item) */
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
 * Back/forward reference-history buttons merged into a single button group. Left-click navigates
 * one step; right-click (or long-press, or the keyboard context-menu key) opens a menu of the
 * history entries in that direction, anchored below the button. In RTL the pair mirrors (order,
 * arrow icons, and tooltip shortcut hints), matching Paratext 9.
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
  const interfaceDirection = readDirection();
  const isRtl = interfaceDirection === 'rtl';

  // Which direction's history menu is open. The menus open ONLY from the right-click handler
  // below — the menu roots are controlled and ignore Radix's own open requests (left-click and
  // keyboard on the trigger must navigate, not open the menu).
  const [openMenu, setOpenMenu] = useState<'back' | 'forward' | undefined>(undefined);
  // `null` is React's canonical "not yet attached" ref value; there's no undefined equivalent
  // in the DOM/ref API (same pattern as book-chapter-control's triggerRef)
  // eslint-disable-next-line no-null/no-null
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  // `null` for the same DOM/ref API reason as backButtonRef above
  // eslint-disable-next-line no-null/no-null
  const forwardButtonRef = useRef<HTMLButtonElement | null>(null);

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

  // Shortcut hints for this OS. Which physical arrow triggers back vs forward depends on the UI
  // layout direction (RTL swaps the pair, physical-direction preserving). resolveReferenceHistoryDirection
  // is the single source of truth for that swap — the same helper the renderer uses to resolve the
  // real keypress — so the displayed hint can never disagree with the key that actually navigates.
  const [leftKey, rightKey] = isMac ? ['⌘[', '⌘]'] : ['Alt+←', 'Alt+→'];
  const backShortcut =
    resolveReferenceHistoryDirection('left', interfaceDirection) === 'back' ? leftKey : rightKey;
  const forwardShortcut = backShortcut === leftKey ? rightKey : leftKey;

  const renderNavButton = (direction: 'back' | 'forward', isFirst: boolean) => {
    const isBack = direction === 'back';
    const enabled = isBack ? canGoBack : canGoForward;
    const items = isBack ? backItems : forwardItems;
    const tooltip = isBack ? backLocalized : forwardLocalized;
    const listAriaLabel = isBack ? backListLocalized : forwardListLocalized;
    const shortcut = isBack ? backShortcut : forwardShortcut;
    const buttonRef = isBack ? backButtonRef : forwardButtonRef;
    const isOpen = openMenu === direction;
    // Arrow glyphs mirror in RTL (like the BookChapterControl's back-to-list button)
    const showLeftArrow = isBack !== isRtl;

    return (
      <DropdownMenu
        key={direction}
        dir={interfaceDirection}
        open={isOpen}
        // Only closes are accepted here (Escape, outside click, item select). Opens come solely
        // from the right-click handler on the wrapper span — Radix's trigger open requests
        // (left-click/keyboard) are deliberately ignored so those keep navigating instead.
        onOpenChange={(open) => {
          if (!open) setOpenMenu(undefined);
        }}
      >
        <Tooltip>
          {/* The span wrapper keeps tooltips working while the button is disabled (a disabled
              button gets pointer-events-none, so it can't be the trigger itself). It is also the
              DropdownMenuTrigger, so the menu anchors below the button. The ButtonGroup
              corner-merging styles land on the span, so the buttons carry the equivalent logical
              rounding classes directly. */}
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <span
                className="tw:inline-flex"
                onContextMenu={(event) => {
                  // Right-click (or long-press / Shift+F10 / the context-menu key) opens this
                  // direction's history menu instead of a native context menu
                  event.preventDefault();
                  if (items.length > 0) setOpenMenu(direction);
                }}
              >
                <Button
                  ref={buttonRef}
                  aria-label={tooltip}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  data-testid={`navigation-history-${direction}-button`}
                  className={cn(isFirst ? 'tw:rounded-e-none' : 'tw:rounded-s-none', className)}
                  size="icon"
                  variant={variant}
                  disabled={!enabled}
                  onClick={() => onNavigate(isBack ? -1 : 1)}
                  onKeyDown={(event) => {
                    // Radix's menu trigger (the wrapper span) preventDefaults these keys to run
                    // its own open-menu behavior; stop them from reaching it so the button keeps
                    // native keyboard activation (Enter/Space navigate)
                    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
                      event.stopPropagation();
                  }}
                >
                  {showLeftArrow ? <ArrowLeft /> : <ArrowRight />}
                </Button>
              </span>
            </DropdownMenuTrigger>
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
        <DropdownMenuContent
          align="start"
          aria-label={listAriaLabel}
          // Radix defaults the menu's aria-labelledby to its trigger — here the unnamed wrapper
          // span — which would override aria-label in accessible-name computation; clear it so
          // the localized list label above wins
          aria-labelledby={undefined}
          onCloseAutoFocus={(event) => {
            // Radix would return focus to the trigger — the non-focusable wrapper span, dropping
            // focus on the body. Send it back to the button so keyboard users keep their place.
            event.preventDefault();
            buttonRef.current?.focus();
          }}
        >
          {items.map((item) => (
            <DropdownMenuItem key={item.offset} onSelect={() => onNavigate(item.offset)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // In RTL the pair mirrors position: forward renders first so back sits on the right.
  const first = isRtl ? 'forward' : 'back';
  const second = isRtl ? 'back' : 'forward';

  return (
    // One TooltipProvider for the whole pair (rather than one per tooltip) so Radix's skip-delay
    // coordinates across both buttons — moving the pointer between them doesn't re-incur the
    // full open delay.
    <TooltipProvider>
      <ButtonGroup data-testid="navigation-history-buttons">
        {renderNavButton(first, true)}
        {renderNavButton(second, false)}
      </ButtonGroup>
    </TooltipProvider>
  );
}

export default NavigationHistoryButtons;

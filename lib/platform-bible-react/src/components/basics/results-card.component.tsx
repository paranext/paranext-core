import { cn } from '@/utils/shadcn-ui.util';
import { MoreHorizontal } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Button } from '../shadcn-ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../shadcn-ui/dropdown-menu';
import { LinkedScrRefDisplay, LinkedScrRefDisplayProps } from './linked-scr-ref-display.component';

/** Props interface for the ResultsCard base component */
export interface ResultsCardProps {
  /** Unique key for the card */
  cardKey: string;
  /** Whether this card is currently selected/focused */
  isSelected: boolean;
  /** Callback function called when the card is clicked */
  onSelect: () => void;
  /** Callback function called when the card is double-clicked */
  onDoubleClick?: () => void;
  /** Whether the content of this card are in a denied state */
  isDenied?: boolean;
  /** Whether the card should be hidden */
  isHidden?: boolean;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Scripture reference as link */
  linkedScrRef: LinkedScrRefDisplayProps;
  /** Badges to display on the card */
  badges?: ReactNode[];
  /** Main content to display on the card */
  children?: ReactNode;
  /** Content to show in the dropdown menu when selected */
  dropdownContent?: ReactNode;
  /** Additional content to show below the main content when selected */
  additionalSelectedContent?: ReactNode;
  /** Color to use for the card's accent border */
  accentColor?: string;
}

/**
 * ResultsCard is a base component for displaying scripture-related results in a card format, even
 * though it is not based on the Card component. It provides common functionality like selection
 * state, dropdown menus, and expandable content.
 */
export function ResultsCard({
  cardKey,
  isSelected,
  onSelect,
  isDenied,
  isHidden = false,
  className,
  children,
  dropdownContent,
  additionalSelectedContent,
  accentColor,
  onDoubleClick,
  linkedScrRef,
  badges,
}: ResultsCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const activeEl = document.activeElement as HTMLElement;
    const isButtonFocused = activeEl?.closest('button') || activeEl?.tagName === 'BUTTON';

    if (event.key === 'Enter' || event.key === ' ') {
      // Avoid interfering with button clicks inside the card
      if (!isButtonFocused) {
        // Card selection
        event.preventDefault();
        onSelect?.();
      }
    }
  };

  return (
    <div
      hidden={isHidden}
      key={cardKey}
      onClick={onSelect}
      onMouseDown={(e) => {
        // cancel double‑click text selection
        if (e.detail > 1) e.preventDefault();
      }}
      onDoubleClick={onDoubleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={cn(
        'tw-relative tw-min-w-36 tw-cursor-default tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50',
        { 'tw-opacity-50 hover:tw-opacity-100': isDenied && !isSelected },
        { 'tw-bg-muted': isSelected },
        { 'tw-bg-transparent': !isSelected },
        className,
      )}
    >
      <div className={cn('tw-flex tw-flex-col tw-px-4 tw-py-3', { 'tw-pb-4': isSelected })}>
        <div className="tw-flex tw-justify-between tw-overflow-hidden">
          <div
            className={cn(
              'tw-flex tw-max-w-[calc(100%-0.5rem)] tw-flex-wrap tw-items-baseline tw-gap-x-2',
              {
                'tw-w-[calc(100%-3rem)]': isSelected && dropdownContent,
              },
            )}
          >
            <LinkedScrRefDisplay
              startRef={linkedScrRef?.startRef}
              endRef={linkedScrRef?.endRef}
              scriptureTextPart={linkedScrRef.scriptureTextPart}
              onClick={(e) => {
                e?.stopPropagation(); // stop bubbling to ResultCard to prevent unnecessary additional select call
                onSelect(); // make sure select is called first
                onDoubleClick?.();
              }}
              className="tw-whitespace-normal tw-rounded-sm tw-text-xs tw-font-medium"
            />
            {badges && (
              <div className="tw-flex tw-gap-2 tw-whitespace-normal tw-break-words">{badges}</div>
            )}
            {children && (
              <div
                className={cn(
                  'tw-ms-1 tw-overflow-hidden tw-text-ellipsis tw-py-1 tw-text-xs tw-text-muted-foreground',
                  {
                    'tw-break-words': isSelected,
                  },
                )}
              >
                {children}
              </div>
            )}
          </div>
          {isSelected && dropdownContent && (
            <div className="tw-p-1">
              <DropdownMenu>
                <DropdownMenuTrigger className={accentColor} asChild>
                  <Button className="tw-h-6 tw-w-8" variant="ghost" size="icon">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">{dropdownContent}</DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {isSelected && additionalSelectedContent && (
          <div className="tw-ms-1 tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden tw-break-words">
            {additionalSelectedContent}
          </div>
        )}
      </div>
      {/* Color indicator bar */}
      {accentColor && (
        <div
          className={`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${accentColor}`}
        />
      )}
    </div>
  );
}

export default ResultsCard;

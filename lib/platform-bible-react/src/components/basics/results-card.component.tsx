import { cn } from '@/utils/shadcn-ui.util';
import { MoreHorizontal } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Button } from '../shadcn-ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../shadcn-ui/dropdown-menu';

/** Props interface for the ResultsCard base component */
export interface ResultsCardProps {
  /** Unique key for the card */
  cardKey: string;
  /** Whether this card is currently selected/focused */
  isSelected: boolean;
  /** Callback function called when the card is clicked */
  onSelect: () => void;
  /** Whether the content of this card are in a denied state */
  isDenied?: boolean;
  /** Whether the card should be hidden */
  isHidden?: boolean;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Main content to display on the card */
  children: ReactNode;
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
}: ResultsCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      hidden={isHidden}
      key={cardKey}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={cn(
        'tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50',
        { 'tw-opacity-50 hover:tw-opacity-100': isDenied && !isSelected },
        { 'tw-bg-accent': isSelected },
        { 'tw-bg-transparent': !isSelected },
        className,
      )}
    >
      <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4">
        <div className="tw-flex tw-justify-between tw-overflow-hidden">
          <div className="tw-min-w-0 tw-flex-1">{children}</div>
          {isSelected && dropdownContent && (
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(accentColor && 'tw-me-1')} asChild>
                <Button className="tw-m-1 tw-h-6 tw-w-6" variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">{dropdownContent}</DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isSelected && additionalSelectedContent && (
          <div className="tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden">
            {additionalSelectedContent}
          </div>
        )}
      </div>
      {accentColor && (
        <div
          className={`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${accentColor}`}
        />
      )}
    </div>
  );
}

export default ResultsCard;

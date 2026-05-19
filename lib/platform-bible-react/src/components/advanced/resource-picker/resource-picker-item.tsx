import { Badge } from '@/components/shadcn-ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Lock, HardDrive, Cloud, Loader2, X, Check } from 'lucide-react';
import { forwardRef } from 'react';
import { formatReplacementString } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { getLanguage } from '@/components/advanced/language-multipicker/language-info';
import { PickerAction, ResourceItem } from './resource-picker.types';
import {
  ResourcePickerLocalizedStrings,
  localizeResourcePicker as L,
} from './resource-picker.strings';

interface ResourcePickerItemProps {
  item: ResourceItem;
  isDisplayed?: boolean;
  isActive?: boolean;
  /** Hide the X (remove) button on this row even when it would otherwise show. */
  hideRemove?: boolean;
  onAction: (action: PickerAction) => void;
  /** Click on the language chip — host wires this to set the language filter. */
  onLanguageClick?: (languageName: string) => void;
  localizedStrings?: ResourcePickerLocalizedStrings;
}

function StatusIcon({
  item,
  strings,
}: {
  item: ResourceItem;
  strings?: ResourcePickerLocalizedStrings;
}) {
  const s = item.status;
  if (s.kind === 'included') {
    if (s.downloading) {
      return (
        <Loader2
          className="tw:size-4 tw:animate-spin tw:text-muted-foreground"
          aria-label={L(strings, '%resourcePicker_status_downloading%')}
        />
      );
    }
    if (s.lockedIncluded) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Lock
              className="tw:size-3.5 tw:text-muted-foreground"
              aria-label={L(strings, '%resourcePicker_lock_short%')}
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="tw:text-xs">{L(strings, '%resourcePicker_lock_tooltipTitle%')}</div>
            <div className="tw:text-[0.65rem] tw:text-muted-foreground">
              {L(strings, '%resourcePicker_lock_tooltipBody%')}
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }
    return undefined;
  }
  if (s.kind === 'installed')
    return (
      <HardDrive
        className="tw:size-4 tw:text-muted-foreground"
        aria-label={L(strings, '%resourcePicker_status_installed%')}
      />
    );
  return (
    <Cloud
      className="tw:size-4 tw:text-muted-foreground"
      aria-label={L(strings, '%resourcePicker_status_available%')}
    />
  );
}

/**
 * Primary action per status: included → toggleDisplay; installed/available → include. Exported so
 * the parent listbox can fire the same action on Enter/Space.
 */
export function primaryActionFor(item: ResourceItem): PickerAction {
  if (item.status.kind === 'included') return { type: 'toggleDisplay', item };
  return { type: 'include', item };
}

export const ResourcePickerItem = forwardRef<HTMLDivElement, ResourcePickerItemProps>(
  (
    { item, isDisplayed, isActive, hideRemove, onAction, onLanguageClick, localizedStrings },
    ref,
  ) => {
    const { data, status } = item;
    const showRemove = !hideRemove && status.kind === 'included' && !status.lockedIncluded;
    const langInfo = getLanguage(data.bestLanguageName);

    const chipAriaLabel = formatReplacementString(
      L(localizedStrings, '%resourcePicker_chip_ariaLabel%'),
      { language: langInfo.name },
    );
    const removeLabel = L(localizedStrings, '%resourcePicker_row_remove%');
    const removeKbdHint = L(localizedStrings, '%resourcePicker_row_remove_keyboardHint%');
    const chipHint = L(localizedStrings, '%resourcePicker_chip_tooltipHint%');

    return (
      <TooltipProvider delayDuration={300}>
        {/* The row is a passive `role="option"` member of a parent `role="listbox"`. The
            parent owns the keyboard model (ArrowUp/Down, Enter/Space, Delete/Backspace) so the
            row itself does not need its own keyboard handlers — only the click handler. The
            jsx-a11y rule below doesn't know about the listbox/option pair so we disable it
            here with this explanation. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          ref={ref}
          role="option"
          tabIndex={isActive ? 0 : -1}
          aria-selected={isDisplayed ?? false}
          data-row-id={data.dblEntryUid}
          onClick={() => onAction(primaryActionFor(item))}
          className={cn(
            'tw:group tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1.5 tw:text-left tw:transition-colors',
            'tw:hover:bg-muted',
            'tw:focus:outline-none tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-inset',
            isDisplayed && 'tw:bg-accent tw:hover:bg-accent',
          )}
        >
          <div className="tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center">
            <StatusIcon item={item} strings={localizedStrings} />
          </div>

          <div className="tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw:min-w-0 tw:truncate tw:text-sm">
                  <span className="tw:hidden tw:@[360px]:inline">{data.fullName}</span>
                  <span className="tw:@[360px]:hidden">{data.displayName}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                <div className="tw:text-sm tw:font-medium">{data.fullName}</div>
                <div className="tw:text-xs tw:text-muted-foreground">{data.displayName}</div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLanguageClick?.(data.bestLanguageName);
                  }}
                  className={cn(
                    'tw:shrink-0 tw:rounded-full tw:transition-all',
                    'tw:focus-visible:outline tw:focus-visible:outline-2 tw:focus-visible:outline-offset-1 tw:focus-visible:outline-ring',
                  )}
                  aria-label={chipAriaLabel}
                >
                  <Badge
                    variant="secondary"
                    className={cn(
                      'tw:cursor-pointer tw:font-normal tw:transition-all',
                      'tw:hover:bg-accent tw:hover:text-accent-foreground tw:hover:ring-1 tw:hover:ring-ring/30',
                      'tw:active:scale-[0.95]',
                    )}
                  >
                    <span className="tw:hidden tw:@[480px]:inline">{langInfo.name}</span>
                    <span className="tw:font-mono tw:text-[0.7rem] tw:uppercase tw:tracking-wider tw:@[480px]:hidden">
                      {langInfo.code}
                    </span>
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <div className="tw:text-xs tw:font-medium">{langInfo.name}</div>
                {langInfo.autonym !== langInfo.name && (
                  <div className="tw:text-xs tw:text-muted-foreground">{langInfo.autonym}</div>
                )}
                <div className="tw:font-mono tw:text-[0.7rem] tw:text-muted-foreground">
                  {langInfo.code}
                </div>
                <div className="tw:mt-1 tw:text-[0.65rem] tw:text-muted-foreground">{chipHint}</div>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="tw:flex tw:size-5 tw:shrink-0 tw:items-center tw:justify-center">
            {isDisplayed && (
              <Check className="tw:size-4 tw:text-foreground tw:group-hover:hidden" aria-hidden />
            )}
            {showRemove && (
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction({ type: 'remove', item });
                }}
                className={cn(
                  'tw:rounded tw:p-0.5 tw:text-muted-foreground tw:transition-opacity tw:hover:bg-muted tw:hover:text-foreground',
                  isDisplayed
                    ? 'tw:hidden tw:group-hover:inline-flex tw:group-focus-visible:inline-flex'
                    : 'tw:opacity-0 tw:group-hover:opacity-100 tw:group-focus-visible:opacity-100',
                )}
                aria-label={removeLabel}
                title={removeKbdHint}
              >
                <X className="tw:size-3.5" />
              </button>
            )}
          </div>
        </div>
      </TooltipProvider>
    );
  },
);
ResourcePickerItem.displayName = 'ResourcePickerItem';

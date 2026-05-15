import { Badge } from '@/components/shadcn-ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Lock, HardDrive, Cloud, Loader2, X, Check } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import { PickerAction, ScriptureTextItem } from './scripture-text-picker.types';
import { getLanguage } from '@/components/advanced/language-multipicker/language-info';

interface RowProps {
  item: ScriptureTextItem;
  isDisplayed?: boolean;
  isActive?: boolean;
  onAction: (action: PickerAction) => void;
  /** Click on the language chip — host wires this to set the language filter. */
  onLanguageClick?: (languageName: string) => void;
}

function StatusIcon({ item }: { item: ScriptureTextItem }) {
  const s = item.status;
  if (s.kind === 'included') {
    if (s.downloading) {
      return (
        <Loader2
          className="tw:size-4 tw:animate-spin tw:text-muted-foreground"
          aria-label="Downloading"
        />
      );
    }
    if (s.lockedIncluded) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Lock
              className="tw:size-3.5 tw:text-muted-foreground"
              aria-label="Cannot be removed from this project"
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="tw:text-xs">Locked in project</div>
            <div className="tw:text-[0.65rem] tw:text-muted-foreground">
              This text is required and cannot be removed
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
        aria-label="Installed — click to include"
      />
    );
  return (
    <Cloud
      className="tw:size-4 tw:text-muted-foreground"
      aria-label="Available to download — click to download and include"
    />
  );
}

/**
 * Primary action per status: included → toggleDisplay; installed/available → include.
 * Exported so the parent listbox can fire the same action on Enter/Space.
 */
export function primaryActionFor(item: ScriptureTextItem): PickerAction {
  if (item.status.kind === 'included') return { type: 'toggleDisplay', item };
  return { type: 'include', item };
}

/**
 * Listbox option for a single scripture text. Uses `role="option"` + roving tabindex managed by
 * the parent listbox. Mouse: full row click = primary action; hover-revealed X = remove (for
 * non-locked included items). Keyboard: parent handles Arrow/Home/End/Delete; the row only fires
 * its primary action on Enter/Space.
 *
 * Container-query responsive: at `<360px` the full name collapses to the abbreviation; at
 * `<480px` the language name collapses to a monospace ISO code.
 */
export const ScriptureTextRow = forwardRef<HTMLDivElement, RowProps>(
  ({ item, isDisplayed, isActive, onAction, onLanguageClick }, ref) => {
    const { data, status } = item;
    const showRemove = status.kind === 'included' && !status.lockedIncluded;
    const langInfo = getLanguage(data.bestLanguageName);

    return (
      <TooltipProvider delayDuration={300}>
        <div
          ref={ref}
          role="option"
          tabIndex={isActive ? 0 : -1}
          aria-selected={isDisplayed ?? false}
          data-row-id={data.dblEntryUid}
          onClick={() => onAction(primaryActionFor(item))}
          // Keyboard activation (Enter/Space) is handled by the parent listbox, which also owns
          // Arrow/Home/End/Delete. Centralizing key handling there lets us restore focus after a
          // re-render that moves the row between groups (e.g. installed → included).
          className={cn(
            // Three visual states need to stay distinguishable:
            //   • selected (isDisplayed)  → tinted background (bg-accent)
            //   • focused (keyboard nav)  → inset ring, NO bg change so it doesn't look selected
            //   • hovered (mouse)         → subtle muted background, lighter than selected
            'tw:group tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1.5 tw:text-left tw:transition-colors',
            'tw:hover:bg-muted',
            'tw:focus:outline-none tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-inset',
            isDisplayed && 'tw:bg-accent tw:hover:bg-accent',
          )}
        >
          {/* Leading status icon (fixed slot so rows align) */}
          <div className="tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center">
            <StatusIcon item={item} />
          </div>

          {/* Name — responsive collapse */}
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

            {/* Language chip — click to filter by this language. Stronger states than a static badge. */}
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
                  aria-label={`Filter by ${langInfo.name}`}
                >
                  <Badge
                    variant="secondary"
                    className={cn(
                      // Resting → secondary (Badge default). Hover → switch to the accent palette
                      // so the color is visibly different (was bg-secondary/60, which was too
                      // close to base to register). Active = press-down feedback.
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
                <div className="tw:mt-1 tw:text-[0.65rem] tw:text-muted-foreground">
                  Click to filter
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Trailing: Check when displayed; X (remove) on hover for non-locked included items */}
          <div className="tw:flex tw:size-5 tw:shrink-0 tw:items-center tw:justify-center">
            {isDisplayed && (
              <Check
                className="tw:size-4 tw:text-foreground tw:group-hover:hidden"
                aria-hidden
              />
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
                aria-label="Remove from project"
                title="Remove from project (Delete)"
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
ScriptureTextRow.displayName = 'ScriptureTextRow';

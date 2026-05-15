import { useMemo } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Languages } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';
import { getLanguage } from './language-info';

export interface LanguageMultipickerProps {
  /** Currently-selected language names. Empty array = "Any" (no filter). */
  value: string[];
  /** Language names available to pick from. */
  options: string[];
  /**
   * "Preferred" preset. Clicking the Preferred chip in the popover sets `value` to this list.
   * If the current `value` matches this list exactly, the trigger label collapses to "Preferred".
   */
  preferred?: string[];
  /** Called when the user changes the selection (or clicks Any / Preferred). */
  onChange: (next: string[]) => void;
  /**
   * Optional className passed to the trigger button — handy when the picker sits next to a
   * search input and the host wants to tune the spacing.
   */
  triggerClassName?: string;
}

/**
 * Character budget for the trigger label before collapsing further. Tuned to fit the word
 * "Preferred" so individual ISO codes can fit roughly the same horizontal space.
 */
const TRIGGER_LABEL_BUDGET = 10;

/**
 * Tertiary, compact multi-select picker for language *filtering*. Designed to sit beside a
 * search input and stay visually quiet until interacted with.
 *
 * The trigger label degrades by width / count:
 * - 0 selected            → "Any"
 * - matches `preferred`   → "Preferred"
 * - 1 selected            → 3-letter ISO code
 * - codes ≤ budget        → space-separated codes
 * - otherwise             → "{N} langs"
 *
 * This is a placeholder for what should become a system-wide content-language picker. Notable
 * gaps for that future component:
 * - Should accept a `LanguageInfo[]` (or a Suspense-friendly async loader) rather than just
 *   names, so callers don't have to look up metadata separately.
 * - Needs to handle thousands of languages — current list rendering is naive and will need
 *   virtualization plus a search input inside the popover.
 * - Should expose a way to surface autonyms in RTL scripts correctly.
 */
export function LanguageMultipicker({
  value,
  options,
  preferred,
  onChange,
  triggerClassName,
}: LanguageMultipickerProps) {
  const isAny = value.length === 0;
  const isPreferred =
    !!preferred &&
    value.length === preferred.length &&
    value.every((l) => preferred.includes(l));

  const triggerLabel = useMemo(() => {
    if (isAny) return 'Any';
    if (isPreferred) return 'Preferred';
    if (value.length === 1) return getLanguage(value[0]).code;
    const codes = value.map((l) => getLanguage(l).code).join(' ');
    if (codes.length <= TRIGGER_LABEL_BUDGET) return codes;
    return `${value.length} langs`;
  }, [value, isAny, isPreferred]);

  const toggleOne = (lang: string) => {
    onChange(value.includes(lang) ? value.filter((l) => l !== lang) : [...value, lang]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('tw:shrink-0 tw:gap-1 tw:text-muted-foreground', triggerClassName)}
        >
          <Languages className="tw:size-4 tw:opacity-60" />
          <span className="tw:font-normal">{triggerLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="tw:w-64 tw:p-2">
        <div className="tw:mb-2 tw:flex tw:gap-1">
          {preferred && preferred.length > 0 && (
            <Button
              size="sm"
              variant={isPreferred ? 'secondary' : 'ghost'}
              onClick={() => onChange(preferred)}
              className="tw:flex-1"
            >
              Preferred
            </Button>
          )}
          <Button
            size="sm"
            variant={isAny ? 'secondary' : 'ghost'}
            onClick={() => onChange([])}
            className="tw:flex-1"
          >
            Any
          </Button>
        </div>
        <div className="tw:max-h-48 tw:overflow-auto tw:text-sm">
          {options.map((lang) => {
            const on = value.includes(lang);
            const info = getLanguage(lang);
            return (
              <button
                key={lang}
                type="button"
                onClick={() => toggleOne(lang)}
                className={cn(
                  'tw:flex tw:w-full tw:items-center tw:justify-between tw:rounded tw:px-2 tw:py-1 tw:text-left tw:hover:bg-accent',
                  on && 'tw:bg-accent',
                )}
              >
                <span>
                  {info.name}
                  {info.autonym !== info.name && (
                    <span className="tw:ms-2 tw:text-xs tw:text-muted-foreground">
                      {info.autonym}
                    </span>
                  )}
                </span>
                <span className="tw:font-mono tw:text-xs tw:text-muted-foreground">
                  {info.code}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

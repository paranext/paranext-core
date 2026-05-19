import { useMemo } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Languages } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { getLanguage } from './language-info';
import {
  LANGUAGE_MULTIPICKER_STRING_KEYS,
  LanguageMultipickerLocalizedStrings,
  localizeLanguageMultipicker as L,
} from './language-multipicker.strings';

export { LANGUAGE_MULTIPICKER_STRING_KEYS };
export type { LanguageMultipickerLocalizedStrings };

/** Props for {@link LanguageMultipicker}. */
export interface LanguageMultipickerProps {
  /** Currently-selected language names. An empty array means "no filter applied" (i.e. "Any"). */
  value: string[];
  /** Languages available for the user to pick from. */
  options: string[];
  /**
   * Preset list of languages that represent the user's preferred set — typically languages they can
   * read, including their current UI language. When `value` matches `preferred` exactly, the
   * trigger label collapses to a single word ("Preferred"). Clicking the Preferred preset inside
   * the popover replaces the selection with this list. Omit to hide the preset.
   */
  preferred?: string[];
  /** Fires when the user changes the selection (toggling a language or picking a preset). */
  onChange: (next: string[]) => void;
  /** Localized strings; see `LANGUAGE_MULTIPICKER_STRING_KEYS`. */
  localizedStrings?: LanguageMultipickerLocalizedStrings;
  /** Forwarded to the trigger button — useful for tuning spacing in a search row. */
  triggerClassName?: string;
}

/**
 * Compact, tertiary multi-select for filtering a list by **content language**.
 *
 * Designed to sit next to a search input and stay quiet visually until the user interacts. The
 * trigger button shrinks its label aggressively so a long list of selected languages doesn't crowd
 * out the search field.
 *
 * # When to use it
 *
 * Whenever a list of content items (scripture texts, handbooks, commentaries, …) needs a language
 * filter. Not for picking the **UI language** of the application itself — use `UiLanguageSelector`
 * for that.
 *
 * # The "Preferred" preset
 *
 * "Preferred" is the set of languages the user is treated as reading. It is **not** sourced from a
 * profile-stored preference list — it is **derived from the user's content footprint**: the union
 * of the languages of the resources and projects they've engaged with. The definition is specified
 * in [PT-3980](https://paratextstudio.atlassian.net/browse/PT-3980).
 *
 * Surfacing it as a single named preset makes the most common case ("only show me texts in
 * languages I can read") one click away, without forcing the user to enumerate.
 *
 * If the parent component doesn't know the user's preferred languages (e.g. brand-new user with no
 * content history), omit the `preferred` prop — the preset disappears from the popover and the
 * trigger label never collapses to "Preferred".
 *
 * # Trigger label degradation
 *
 * The trigger button has limited horizontal space (it sits next to a search input). Its label
 * adapts as the selection grows, from most-readable to most-compact:
 *
 * | Condition                   | Trigger label |
 * | --------------------------- | ------------- |
 * | 0 selected                  | `Any`         |
 * | matches `preferred` exactly | `Preferred`   |
 * | 1 selected                  | `en` (BCP-47) |
 * | space-separated codes fit   | `en es fr`    |
 * | otherwise                   | `5 langs`     |
 *
 * # Language codes
 *
 * Uses BCP-47 tags throughout — the same standard the rest of platform-bible uses. See
 * `language-info.ts` for the placeholder data source.
 *
 * # Known gaps before this is a fully-featured system component
 *
 * - Should accept `LanguageInfo[]` (or an async loader) rather than just language names, so callers
 *   don't have to look the metadata up separately.
 * - Needs virtualization + an in-popover search input to handle the thousands of languages a real
 *   source will provide.
 * - Should handle RTL autonyms (Hebrew, Arabic, …) with proper bidi isolation.
 *
 * These are tracked for the eventual extraction into a system-wide content-language picker.
 */
export function LanguageMultipicker({
  value,
  options,
  preferred,
  onChange,
  localizedStrings,
  triggerClassName,
}: LanguageMultipickerProps) {
  const isAny = value.length === 0;
  const isPreferred =
    !!preferred && value.length === preferred.length && value.every((l) => preferred.includes(l));

  const anyLabel = L(localizedStrings, '%languageMultipicker_preset_any%');
  const preferredLabel = L(localizedStrings, '%languageMultipicker_preset_preferred%');
  const manyTemplate = L(localizedStrings, '%languageMultipicker_trigger_manyLanguages%');
  const ariaLabel = L(localizedStrings, '%languageMultipicker_trigger_ariaLabel%');

  // Character budget for the trigger label, tuned to fit the word "Preferred" so single-code
  // and few-code combinations occupy roughly the same horizontal slot.
  const TRIGGER_LABEL_BUDGET = 10;

  const triggerLabel = useMemo(() => {
    if (isAny) return anyLabel;
    if (isPreferred) return preferredLabel;
    if (value.length === 1) return getLanguage(value[0]).code;
    const codes = value.map((l) => getLanguage(l).code).join(' ');
    if (codes.length <= TRIGGER_LABEL_BUDGET) return codes;
    return formatReplacementString(manyTemplate, { count: value.length });
  }, [value, isAny, isPreferred, anyLabel, preferredLabel, manyTemplate]);

  const toggleOne = (lang: string) => {
    onChange(value.includes(lang) ? value.filter((l) => l !== lang) : [...value, lang]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={ariaLabel}
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
              {preferredLabel}
            </Button>
          )}
          <Button
            size="sm"
            variant={isAny ? 'secondary' : 'ghost'}
            onClick={() => onChange([])}
            className="tw:flex-1"
          >
            {anyLabel}
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

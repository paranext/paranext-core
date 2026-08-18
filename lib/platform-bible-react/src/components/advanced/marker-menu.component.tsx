import { FC, LegacyRef, useMemo, useState } from 'react';
import { Ban, Check } from 'lucide-react';
import { SHRINK_STEP, useShrinkStepValue } from '@/context/shrink-step.context';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '../shadcn-ui/command';

/**
 * Object containing all keys used for localization in the MarkerMenu component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const MARKER_MENU_STRING_KEYS = Object.freeze([
  '%markerMenu_deprecated_label%',
  '%markerMenu_disallowed_label%',
  '%markerMenu_noResults%',
  '%markerMenu_searchPlaceholder%',
  // These three keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  '%markerMenu_searchPlaceholder_character%',
  '%markerMenu_searchPlaceholder_insert%',
  '%markerMenu_searchPlaceholder_paragraph%',
] as const);

export type MarkerMenuLocalizedStrings = {
  [localizedKey in (typeof MARKER_MENU_STRING_KEYS)[number]]?: string;
};

/** Interface that includes the properties that the provided icon element should have */
export interface MarkerIconProps {
  /** CSS class name to apply to the icon */
  className?: string;
  /** Size in px that the icon should be */
  size?: string | number;
}

/** Type for the markers that contain all necessary information to be displayed in the list */
export interface MarkerMenuItem {
  /** If the item is a marker, then this is the marker code */
  marker?: string;
  /** The main title for the marker or command */
  title: string;
  /** An optional subtitle for the marker */
  subtitle?: string;
  /** Optional name of icon to use instead of the marker */
  icon?: FC<MarkerIconProps>;
  /**
   * Whether the command/marker is deprecated. Deprecated items stay visible in the menu (even when
   * the search query is empty) but are rendered disabled so they cannot be selected.
   */
  isDeprecated?: boolean;
  /**
   * Whether the command/marker is disallowed for this project (e.g. blocked while structure is
   * protected). Unlike {@link MarkerMenuItem.isDeprecated}, this flag affects visibility as well as
   * selectability: while the search query is empty, disallowed items are hidden if any allowed
   * items exist (to reduce clutter) but are shown when every item is disallowed (so the menu isn't
   * empty). A non-empty query reveals a disallowed item only on an exact marker-code match or a
   * title match. Whenever a disallowed item is shown it is rendered disabled so it cannot be
   * selected.
   */
  isDisallowed?: boolean;
  /**
   * How much of the consumer's current selection this marker covers: `'all'`, `'partial'`, or
   * `'none'`. Optional and additive — with no value, no selection affordance renders and no
   * `aria-checked` is set, which is how consumers that do not track a selection behave.
   *
   * Unlike {@link MarkerMenuItem.isDeprecated} and {@link MarkerMenuItem.isDisallowed}, this affects
   * neither visibility nor selectability. It is display only.
   */
  selectionState?: 'all' | 'partial' | 'none';
  /**
   * Whether the consumer currently has no operation for this row, so it must not be selectable.
   * Optional and additive — with no value the row is selectable exactly as it has always been.
   *
   * Unlike {@link MarkerMenuItem.isDeprecated} and {@link MarkerMenuItem.isDisallowed}, this says
   * nothing about the marker itself and so renders no trailing label: those two describe a property
   * of the marker, while this describes the consumer's momentary inability to act on it. It also
   * does not affect visibility — the row stays listed, because a row that disappears reads as "this
   * marker does not exist here" rather than "you cannot do that to it right now."
   */
  isDisabled?: boolean;
  /** Function to be triggered when the marker or command is selected */
  action: () => void;
}

/** Props for the marker menu component */
export interface MarkerMenuProps {
  /** Localized strings to pass through for the marker menu */
  localizedStrings: MarkerMenuLocalizedStrings;
  /**
   * A list of the marker menu items which can either be a marker to insert or some basic command
   * actions
   */
  markerMenuItems: MarkerMenuItem[];
  /** Optional ref for the command search input to be able to focus it manually */
  searchRef?: LegacyRef<HTMLInputElement>;
  /**
   * Optional placeholder text for the search input. When provided, overrides the default
   * `%markerMenu_searchPlaceholder%` localized string.
   */
  searchPlaceholder?: string;
  /**
   * Overrides the shrink step this menu would otherwise inherit from the toolbar that opened it.
   * Higher means narrower; from `SHRINK_STEP.TIGHTER` on, each row's trailing detail is dropped.
   *
   * The menu has no observer of its own. Its popover is portalled out of the toolbar's DOM, but
   * React context follows the component tree rather than the DOM, so the toolbar's step still
   * reaches it — and the popover's width is bounded by the same panel the toolbar sits in, so the
   * two track each other. Intended for stories and tests.
   */
  shrinkStep?: number;
}

/** Function to format the marker menu icon and size it accordingly */
function MenuMarkerIcon({ icon, className }: { icon?: FC<MarkerIconProps>; className?: string }) {
  const IconComponent = icon ?? Ban;
  return <IconComponent className={className} size={16} />;
}

/**
 * Leading selection indicator for a marker row, on the start side per the Component Choices
 * guideline. Rendered only when the consumer supplies a selection state, so rows without one keep
 * the layout they have always had.
 *
 * A checked row means the marker is on the selection — whether on all of it or only part of it. UX
 * chose this two-glyph reading over a three-glyph one (decided 2026-08-06): a dash for partial read
 * as a disabled checkbox rather than as "some of this", and an empty box for `'none'` made a
 * single-select picker look multi-select. The distinction is not lost, only moved: `aria-checked`
 * still reports `mixed` for a partial row, so the tri-state survives for screen-reader users while
 * the visual stays binary. The `'none'` box still reserves its width so rows stay aligned.
 */
function MarkerSelectionStateIndicator({ state }: { state: 'all' | 'partial' | 'none' }) {
  return (
    <div
      data-slot="marker-selection-state"
      className="tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center"
    >
      {state !== 'none' && <Check size={16} />}
    </div>
  );
}

/**
 * Function that renders the marker menu command item for both the marker matches and the title
 * matches
 */
function MarkerMenuCommandItem({
  item,
  localizedStrings,
  isDetailHidden,
}: {
  item: MarkerMenuItem;
  localizedStrings: MarkerMenuLocalizedStrings;
  /** Whether the popover is too narrow to carry a trailing detail alongside the title. */
  isDetailHidden: boolean;
}) {
  return (
    <CommandItem
      className="tw:flex tw:gap-2 tw:hover:bg-accent"
      disabled={item.isDisallowed || item.isDeprecated || item.isDisabled}
      // Absent for items with no selection state, so existing consumers' rows are unchanged.
      // Never pair this with `data-checked`: CommandItem renders its own trailing check for that,
      // which would double the checkmark.
      aria-checked={
        item.selectionState === undefined
          ? undefined
          : // `as const` keeps the literal types ('mixed', true, false) instead of widening to
            // `string | boolean`, which is required for assignability to CommandItem's
            // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
            ({ all: true, partial: 'mixed', none: false } as const)[item.selectionState]
      }
      onSelect={item.action}
    >
      {item.selectionState !== undefined && (
        <MarkerSelectionStateIndicator state={item.selectionState} />
      )}
      <div className="tw:w-8 tw:min-w-8">
        {item.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          <span className="tw:font-mono tw:text-xs">{item.marker}</span>
        ) : (
          <div>
            <MenuMarkerIcon icon={item.icon} />
          </div>
        )}
      </div>
      {/* Title and detail sit side by side, detail trailing and subordinate. Both carry
          `tw:min-w-0` so each can shrink below its content width and clip rather than wrap, per the
          Responsiveness guideline's rule that menu entries truncate at small widths (consumers pin
          this popover as narrow as 200px).

          The native `title` attributes, not the Tooltip component, keep the full text reachable on
          hover: a Radix tooltip inside a cmdk list fights the list's own hover and focus
          management. The toolbar items above use the real Tooltip; menu rows keep the native
          affordance. */}
      <div className="tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2">
        <p className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-sm" title={item.title}>
          {item.title}
        </p>
        {item.subtitle && !isDetailHidden && (
          <p
            className="tw:min-w-0 tw:max-w-1/2 tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground"
            title={item.subtitle}
          >
            {item.subtitle}
          </p>
        )}
      </div>
      {(item.isDisallowed || item.isDeprecated) && (
        <CommandShortcut className="tw:font-sans">
          {item.isDisallowed
            ? localizedStrings['%markerMenu_disallowed_label%']
            : localizedStrings['%markerMenu_deprecated_label%']}
        </CommandShortcut>
      )}
    </CommandItem>
  );
}

/** Marker menu component to render the list of markers and a few commands in the scripture editor */
export function MarkerMenu({
  localizedStrings,
  markerMenuItems,
  searchRef,
  searchPlaceholder,
  shrinkStep: shrinkStepOverride,
}: MarkerMenuProps) {
  const [commandSearch, setCommandSearch] = useState<string>('');

  const contextShrinkStep = useShrinkStepValue();
  const shrinkStep = shrinkStepOverride ?? contextShrinkStep;
  // The title is what identifies a row, so the detail is what gives way — the same
  // "second field is the truncation target" rule the toolbar labels follow.
  const isDetailHidden = shrinkStep >= SHRINK_STEP.TIGHTER;

  const [codeMatchItems, titleMatchItems] = useMemo(() => {
    const query = commandSearch.trim().toLowerCase();
    if (!query) {
      // Hide disallowed markers until specifically searched, so the menu isn't cluttered with
      // entries the user cannot insert.
      const allowedItems = markerMenuItems.filter((markerItem) => !markerItem.isDisallowed);
      // ...but when every item is disallowed (e.g. all of a parent's markers are blocked while
      // structure is protected), fall back to showing the disallowed items (disabled) so the menu
      // surfaces the locked options instead of reading as an empty "No results" state.
      return [allowedItems.length > 0 ? allowedItems : markerMenuItems, []];
    }

    // Marker-code matches first. Disallowed markers require an exact code match (never a substring),
    // so a broad query doesn't surface sibling markers the user cannot use.
    const filteredCodeMatchItems = markerMenuItems.filter((markerItem) => {
      const code = markerItem.marker?.toLowerCase();
      return markerItem.isDisallowed ? code === query : code?.includes(query);
    });
    // Then title matches. A disallowed marker's title match is itself its reveal condition, so it
    // needs no extra gate here.
    const filteredTitleMatchItems = markerMenuItems.filter(
      (markerItem) =>
        markerItem.title.toLowerCase().includes(query) &&
        !filteredCodeMatchItems.includes(markerItem),
    );

    return [filteredCodeMatchItems, filteredTitleMatchItems];
  }, [commandSearch, markerMenuItems]);

  return (
    <Command className="tw:p-1" shouldFilter={false} loop>
      <CommandInput
        className="marker-menu-search"
        ref={searchRef}
        value={commandSearch}
        onValueChange={(value) => setCommandSearch(value)}
        placeholder={searchPlaceholder ?? localizedStrings['%markerMenu_searchPlaceholder%']}
      />
      <CommandList>
        <CommandEmpty>{localizedStrings['%markerMenu_noResults%']}</CommandEmpty>
        <CommandGroup>
          {codeMatchItems.map((item) => (
            <MarkerMenuCommandItem
              item={item}
              localizedStrings={localizedStrings}
              isDetailHidden={isDetailHidden}
              key={`item-${item.marker ?? item.icon?.displayName}-${item.title.replaceAll(' ', '')}`}
            />
          ))}
        </CommandGroup>
        {titleMatchItems.length > 0 && (
          <>
            {codeMatchItems.length > 0 && <CommandSeparator alwaysRender />}
            <CommandGroup>
              {titleMatchItems.map((item) => (
                <MarkerMenuCommandItem
                  item={item}
                  localizedStrings={localizedStrings}
                  isDetailHidden={isDetailHidden}
                  key={`item-${item.marker ?? item.icon?.displayName}-${item.title.replaceAll(' ', '')}`}
                />
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

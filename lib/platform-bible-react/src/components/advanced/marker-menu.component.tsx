import { FC, LegacyRef, useMemo, useState } from 'react';
import { Ban } from 'lucide-react';
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
  '%markerMenu_structureLocked_label%',
  '%markerMenu_noResults%',
  '%markerMenu_searchPlaceholder%',
  // These two keys are not read by this component directly; they are provided here so callers can
  // localize them and pass the result into the optional `searchPlaceholder` prop to override the
  // default search-field placeholder.
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
  /** Whether the command/marker is deprecated */
  isDeprecated?: boolean;
  /** Whether the command/marker is disallowed for this project */
  isDisallowed?: boolean;
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
}

/** Function to format the marker menu icon and size it accordingly */
function MenuMarkerIcon({ icon, className }: { icon?: FC<MarkerIconProps>; className?: string }) {
  const IconComponent = icon ?? Ban;
  return <IconComponent className={className} size={16} />;
}

/**
 * Function that renders the marker menu command item for both the marker matches and the title
 * matches
 */
function MarkerMenuCommandItem({
  item,
  localizedStrings,
}: {
  item: MarkerMenuItem;
  localizedStrings: MarkerMenuLocalizedStrings;
}) {
  return (
    <CommandItem
      className="tw:flex tw:gap-2 tw:hover:bg-accent"
      disabled={item.isDisallowed || item.isDeprecated}
      onSelect={item.action}
    >
      <div className="tw:w-8 tw:min-w-8">
        {item.marker ? (
          <span className="tw:text-xs">{item.marker}</span>
        ) : (
          <div>
            <MenuMarkerIcon icon={item.icon} />
          </div>
        )}
      </div>
      <div>
        <p className="tw:text-sm">{item.title}</p>
        {item.subtitle && <p className="tw:text-xs tw:text-muted-foreground">{item.subtitle}</p>}
      </div>
      {(item.isDisallowed || item.isDeprecated) && (
        <CommandShortcut className="tw:font-sans">
          {item.isDisallowed
            ? localizedStrings['%markerMenu_structureLocked_label%']
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
}: MarkerMenuProps) {
  const [commandSearch, setCommandSearch] = useState<string>('');

  const [exactMatchItems, titleMatchItems] = useMemo(() => {
    const query = commandSearch.trim().toLowerCase();
    if (!query) {
      // Hide disallowed markers until specifically searched, so the menu isn't cluttered with
      // entries the user cannot insert.
      return [markerMenuItems.filter((markerItem) => !markerItem.isDisallowed), []];
    }

    // Marker-code matches first. Disallowed markers require an exact code match (never a substring),
    // so a broad query doesn't surface sibling markers the user cannot use.
    const filteredExactMatchItems = markerMenuItems.filter((markerItem) => {
      const code = markerItem.marker?.toLowerCase();
      return markerItem.isDisallowed ? code === query : code?.includes(query);
    });
    // Then title matches. A disallowed marker's title match is itself its reveal condition, so it
    // needs no extra gate here.
    const filteredTitleMatchItems = markerMenuItems.filter(
      (markerItem) =>
        markerItem.title.toLowerCase().includes(query) &&
        !filteredExactMatchItems.includes(markerItem),
    );

    return [filteredExactMatchItems, filteredTitleMatchItems];
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
          {exactMatchItems.map((item) => (
            <MarkerMenuCommandItem
              item={item}
              localizedStrings={localizedStrings}
              key={`item-${item.marker ?? item.icon?.displayName}-${item.title.replaceAll(' ', '')}`}
            />
          ))}
        </CommandGroup>
        {titleMatchItems.length > 0 && (
          <>
            {exactMatchItems.length > 0 && <CommandSeparator alwaysRender />}
            <CommandGroup>
              {titleMatchItems.map((item) => (
                <MarkerMenuCommandItem
                  item={item}
                  localizedStrings={localizedStrings}
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

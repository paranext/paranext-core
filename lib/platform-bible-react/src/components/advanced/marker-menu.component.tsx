import { ReactNode, useMemo, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '../shadcn-ui/command';

/**
 * Object containing all keys used for localization in the FootnoteEditor component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const MARKER_MENU_STRING_KEYS = Object.freeze([
  '%markerMenu_deprecated_label%',
  '%markerMenu_disallowed_label%',
  '%markerMenu_noResults%',
  '%markerMenu_searchPlaceholder%',
] as const);

export type MarkerMenuLocalizedStrings = {
  [localizedKey in (typeof MARKER_MENU_STRING_KEYS)[number]]?: string;
};

/** Type for the markers that contain all necessary information to be displayed in the list */
export interface MarkerMenuItem {
  /** If the item is a marker, then this is the marker code */
  marker?: string;
  /** The main title for the marker or command */
  title: string;
  /** An optional subtitle for the marker */
  subtitle?: string;
  /** Optional name of icon to use instead of the marker */
  icon?: ReactNode;
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
}

/** Marker menu component to render the list of markers and a few commands in the scripture editor */
export function MarkerMenu({ localizedStrings, markerMenuItems }: MarkerMenuProps) {
  const [commandSearch, setCommandSearch] = useState<string>('');

  const filteredMarkerItems = useMemo(() => {
    const query = commandSearch.trim().toLowerCase();
    if (!query) {
      return markerMenuItems;
    }

    return markerMenuItems.filter((markerItem) =>
      markerItem.marker
        ? markerItem.marker?.toLowerCase().includes(query)
        : markerItem.title.toLowerCase().includes(query),
    );
  }, [commandSearch, markerMenuItems]);

  return (
    <Command className="tw-p-1" shouldFilter={false} loop>
      <CommandInput
        value={commandSearch}
        onValueChange={(value) => setCommandSearch(value)}
        placeholder={localizedStrings['%markerMenu_searchPlaceholder%']}
      />
      <CommandList>
        <CommandEmpty>{localizedStrings['%markerMenu_noResults%']}</CommandEmpty>
        <CommandGroup>
          {filteredMarkerItems.map((item) => (
            <CommandItem
              className="tw-flex tw-gap-2 hover:tw-bg-accent"
              disabled={item.isDisallowed || item.isDeprecated}
              onSelect={item.action}
              key={`item-${item.title}`}
            >
              <div className="tw-w-6">
                {item.marker ? (
                  <span className="tw-text-xs">{item.marker}</span>
                ) : (
                  <div>{item.icon}</div>
                )}
              </div>
              <div>
                <p className="tw-text-sm">{item.title}</p>
                {item.subtitle && (
                  <p className="tw-text-xs tw-text-muted-foreground">{item.subtitle}</p>
                )}
              </div>
              {(item.isDisallowed || item.isDeprecated) && (
                <CommandShortcut className="tw-font-sans">
                  {item.isDisallowed
                    ? localizedStrings['%markerMenu_disallowed_label%']
                    : localizedStrings['%markerMenu_deprecated_label%']}
                </CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

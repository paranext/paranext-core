import { useCallback, useRef, useState, KeyboardEvent } from 'react';

// TODO: Generalize this to work with div and ul list boxes?
// TODO: Move to PBR

/** Properties of one option contained in a listbox */
export interface ListboxOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label for the option */
  label: string;
}

/** Props for the useListbox hook */
export interface UseListboxProps {
  /** Array of options for the listbox */
  options: ListboxOption[];
  /** Callback when the focus changes to a different option */
  onFocusChange?: (option: ListboxOption) => void;
  /** Callback to toggle the selection of an option */
  onOptionSelect?: (option: ListboxOption) => void;
}
/**
 * Hook for handling keyboard navigation of a listbox.
 *
 * @param UseListboxProps - The properties for configuring the listbox behavior.
 * @returns An object containing:
 *
 *   - `listboxRef`: A ref to be attached to the listbox container element (e.g., `<ul>`), used for
 *       focus management.
 *   - `activeId`: The id of the currently focused (active) option, or `undefined` if none is focused.
 *   - `selectedId`: The id of the currently selected option, or `undefined` if none is selected.
 *   - `handleKeyDown`: A keyboard event handler to be attached to the listbox container for handling
 *       navigation and selection.
 *   - `focusOption`: A function to programmatically focus a specific option by id.
 */
export function useListbox({ options, onFocusChange, onOptionSelect }: UseListboxProps) {
  // ul ref property expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const listboxRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  // const [keysSoFar, setKeysSoFar] = useState('');
  // const keysTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const focusOption = useCallback(
    (id: string) => {
      setActiveId(id);
      const option = options.find((opt) => opt.id === id);
      if (option) {
        onFocusChange?.(option);
      }

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ block: 'center' });
        element.focus();
      }

      // Ensure aria-activedescendant is set on the listbox container for internal focus tracking
      if (listboxRef.current) {
        listboxRef.current.setAttribute('aria-activedescendant', id);
      }
    },
    [onFocusChange, options],
  );

  const toggleSelectInternal = useCallback(
    (id: string) => {
      const option = options.find((opt) => opt.id === id);
      if (!option) return;

      setSelectedId((prev) => (prev === id ? undefined : id));
      onOptionSelect?.(option);
    },
    [onOptionSelect, options],
  );

  // const clearKeys = () => {
  //   setKeysSoFar('');
  //   keysTimeoutRef.current = undefined;
  // };

  // TODO: Fix focus ring goes away when closing the drawer then comes back
  // TODO: Fix trap keyboard navigation in drawer content unless Esc, Enter, or Space (closes drawer)
  // TODO: Tab into table makes it scroll down slightly (probably from custom onFocusChange that is passed in)
  // TODO: Type a character to go to the entry stating with that character
  const handleKeyDown = useCallback(
    (evt: KeyboardEvent<HTMLUListElement>) => {
      const currentIndex = options.findIndex((opt) => opt.id === activeId);
      let nextIndex = currentIndex;

      switch (evt.key) {
        case 'ArrowDown':
          nextIndex = Math.min(currentIndex + 1, options.length - 1);
          evt.preventDefault();
          break;
        case 'ArrowUp':
          nextIndex = Math.max(currentIndex - 1, 0);
          evt.preventDefault();
          break;
        case 'Home':
          nextIndex = 0;
          evt.preventDefault();
          break;
        case 'End':
          nextIndex = options.length - 1;
          evt.preventDefault();
          break;
        case ' ':
        case 'Enter':
          if (activeId) {
            toggleSelectInternal(activeId);
          }
          evt.preventDefault();
          return;
        default:
          // if (evt.key.length === 1) {
          //   const itemToFocus = this.findItemToFocus(evt.key.toLowerCase());
          //   if (itemToFocus) {
          //     this.focusItem(itemToFocus);
          //   }
          // }
          // break;
          return;
      }

      const nextOption = options[nextIndex];
      if (nextOption) focusOption(nextOption.id);
    },
    [options, focusOption, activeId, toggleSelectInternal],
  );

  return {
    listboxRef,
    activeId,
    selectedId,
    handleKeyDown,
    focusOption,
  };
}

import React, { useCallback, useRef, useState } from 'react';

/** Properties of one option contained in a listbox */
export interface ListboxOption {
  /** Unique identifier for the option */
  id: string;
}

/** Props for the useListbox hook */
export interface UseListboxProps {
  /** Array of options for the listbox */
  options: ListboxOption[];
  /** Callback when the focus changes to a different option */
  onFocusChange?: (option: ListboxOption) => void;
  /** Callback to toggle the selection of an option */
  onOptionSelect?: (option: ListboxOption) => void;
  /** Callback when a character key is pressed */
  onCharacterPress?: (char: string) => void;
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
export const useListbox = ({
  options,
  onFocusChange,
  onOptionSelect,
  onCharacterPress,
}: UseListboxProps) => {
  // ul/div ref property expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const listboxRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

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

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
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
          evt.stopPropagation();
          return;
        default:
          if (evt.key.length === 1 && !evt.metaKey && !evt.ctrlKey && !evt.altKey) {
            onCharacterPress?.(evt.key);
            evt.preventDefault();
          }
          return;
      }

      const nextOption = options[nextIndex];
      if (nextOption) focusOption(nextOption.id);
    },
    [options, focusOption, activeId, toggleSelectInternal, onCharacterPress],
  );

  return {
    listboxRef,
    activeId,
    selectedId,
    handleKeyDown,
    focusOption,
  };
};

import React, { useCallback, useRef, useState } from 'react';

/** Tags of interactive HTML elements to look for in the listbox */
const INTERACTIVE_ELEMENT_TAG_SELECTORS = ['input', 'select', 'textarea', 'button'];

/** Roles of interactive HTML elements to look for in the listbox */
const INTERACTIVE_ELEMENT_ROLE_SELECTORS = ['button', 'textbox'];

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

  // Detect if the key event originated from an interactive element inside the currently selected option
  const isInteractiveElement = (element: HTMLElement | undefined) => {
    if (!element) return false;
    const tag = element.tagName.toLowerCase();
    if (element.isContentEditable) return true;
    if (INTERACTIVE_ELEMENT_TAG_SELECTORS.includes(tag)) return true;
    const role = element.getAttribute('role');
    if (role && INTERACTIVE_ELEMENT_ROLE_SELECTORS.includes(role)) return true;
    const tabIndex = element.getAttribute('tabindex');
    if (tabIndex !== undefined && tabIndex !== '-1') return true;
    return false;
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      // Need to cast event.target to HTMLElement because the keyboard navigation can be used with multiple types of elements
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const targetElement = event.target as HTMLElement;
      const getElementById = (id?: string) => (id ? document.getElementById(id) : undefined);
      const selectedElement = getElementById(selectedId);
      const activeElement = getElementById(activeId);

      // Check if the event target is inside the selected option
      const isInsideSelected = !!(
        selectedElement &&
        targetElement &&
        selectedElement.contains(targetElement) &&
        targetElement !== selectedElement
      );
      const isInteractiveInsideSelected = isInsideSelected && isInteractiveElement(targetElement);

      // When focus is inside a selected option, don't hijack typical keys; allow an escape hatch back to the option
      if (isInteractiveInsideSelected) {
        if (event.key === 'Escape' || event.key === 'ArrowLeft') {
          if (selectedId) {
            // Return focus to the selected option root
            event.preventDefault();
            event.stopPropagation();
            const opt = options.find((o) => o.id === selectedId);
            if (opt) {
              focusOption(opt.id);
            }
          }
          return;
        }

        // Handle ArrowUp/ArrowDown to navigate between interactive elements within the selected option
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          if (!selectedElement) return;

          // Get all focusable elements within the selected option
          const focusableElements = Array.from(
            selectedElement.querySelectorAll<HTMLElement>(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
            ),
          );

          if (focusableElements.length === 0) return;

          const currentIndex = focusableElements.findIndex((el) => el === targetElement);
          if (currentIndex === -1) return;

          let nextIndex: number;
          if (event.key === 'ArrowDown') {
            nextIndex = Math.min(currentIndex + 1, focusableElements.length - 1);
          } else {
            nextIndex = Math.max(currentIndex - 1, 0);
          }

          if (nextIndex !== currentIndex) {
            event.preventDefault();
            event.stopPropagation();
            focusableElements[nextIndex]?.focus();
          }
          return;
        }

        return; // Do not handle other keys while interacting within the selected option
      }

      const currentIndex = options.findIndex((opt) => opt.id === activeId);
      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = Math.min(currentIndex + 1, options.length - 1);
          event.preventDefault();
          break;
        case 'ArrowUp':
          nextIndex = Math.max(currentIndex - 1, 0);
          event.preventDefault();
          break;
        case 'Home':
          nextIndex = 0;
          event.preventDefault();
          break;
        case 'End':
          nextIndex = options.length - 1;
          event.preventDefault();
          break;
        case ' ':
        case 'Enter':
          if (activeId) {
            toggleSelectInternal(activeId);
          }
          event.preventDefault();
          event.stopPropagation();
          return;
        case 'ArrowRight': {
          // If on an option, try to move focus into its first focusable control
          const container = activeElement;
          if (container) {
            const preferred = container.querySelector<HTMLElement>(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])',
            );
            const fallback = container.querySelector<HTMLElement>(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
            );
            const toFocus = preferred ?? fallback;
            if (toFocus) {
              event.preventDefault();
              toFocus.focus();
              return;
            }
          }
          break;
        }
        default:
          if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
            onCharacterPress?.(event.key);
            event.preventDefault();
          }
          return;
      }

      const nextOption = options[nextIndex];
      if (nextOption) focusOption(nextOption.id);
    },
    [options, focusOption, activeId, selectedId, toggleSelectInternal, onCharacterPress],
  );

  return {
    listboxRef,
    activeId,
    selectedId,
    handleKeyDown,
    focusOption,
  };
};

import { useCallback, useRef, useState, KeyboardEvent } from 'react';

// TODO: Generalize this to work with div and ul list boxes?
// TODO: Move to PBR

export interface ListboxOption {
  id: string;
  label: string;
}

export interface UseListboxProps {
  options: ListboxOption[];
  onFocusChange?: (option: ListboxOption) => void;
}

export function useListbox({ options, onFocusChange }: UseListboxProps) {
  // ul ref property expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const listboxRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [keysSoFar, setKeysSoFar] = useState('');
  const keysTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const focusOption = useCallback(
    (id: string) => {
      setActiveId(id);
      const option = options.find((opt) => opt.id === id);
      if (option) {
        onFocusChange?.(option);
      }
    },
    [onFocusChange, options],
  );

  const toggleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? undefined : id));
  }, []);

  const clearKeys = () => {
    setKeysSoFar('');
    keysTimeoutRef.current = undefined;
  };

  // TODO: Fix space and enter key handling
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
        case ' ':
        case 'Enter':
          if (activeId) {
            toggleSelect(activeId);
          }
          evt.preventDefault();
          return;
        default:
          if (evt.key.length === 1) {
            const searchChar = evt.key.toLowerCase();
            const newKeys = keysSoFar + searchChar;
            setKeysSoFar(newKeys);
            if (keysTimeoutRef.current) clearTimeout(keysTimeoutRef.current);
            keysTimeoutRef.current = setTimeout(clearKeys, 500);

            const match = options.find((opt) => opt.label.toLowerCase().startsWith(newKeys));
            if (match) {
              focusOption(match.id);
            }
          }
          return;
      }

      const nextOption = options[nextIndex];
      if (nextOption) focusOption(nextOption.id);
    },
    [activeId, options, toggleSelect, focusOption, keysSoFar],
  );

  return {
    listboxRef,
    activeId,
    selectedId,
    handleKeyDown,
    focusOption,
  };
}

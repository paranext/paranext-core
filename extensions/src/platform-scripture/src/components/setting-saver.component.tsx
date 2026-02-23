/**
 * === NEW IN PT10 === Reason: Reusable SettingSaverControl component (combo + save + delete
 * pattern). Maps to: UI-PKG-001, UI-PKG-002 (shared by SelectTextsDialog and OpenTextsDialog) PT9
 * equivalent: SettingSaverControl in CommonForms
 */
import { Save, Trash2 } from 'lucide-react';
import { Button, Input, Label, cn } from 'platform-bible-react';
import React, { useCallback, useState } from 'react';

export interface SettingSaverProps {
  /** Available saved collection names */
  savedNames: string[];
  /** Currently selected name in the dropdown */
  selectedName: string;
  /** Callback when user selects a saved collection */
  onSelect: (name: string) => void;
  /** Callback when user saves the current selection with a name */
  onSave: (name: string) => void;
  /** Callback when user deletes the selected saved collection */
  onDelete: (name: string) => void;
  /** Placeholder text for the input field */
  placeholder: string;
  /** Localized aria-label for the input */
  ariaLabel: string;
  /** Localized aria-label for save button */
  saveAriaLabel: string;
  /** Localized aria-label for delete button */
  deleteAriaLabel: string;
  /** Whether the control is disabled */
  disabled?: boolean;
}

export default function SettingSaver({
  savedNames,
  selectedName,
  onSelect,
  onSave,
  onDelete,
  placeholder,
  ariaLabel,
  saveAriaLabel,
  deleteAriaLabel,
  disabled = false,
}: SettingSaverProps) {
  const [inputValue, setInputValue] = useState(selectedName);
  const [showDropdown, setShowDropdown] = useState(false);

  const isSaveDisabled = disabled || inputValue.trim() === '';
  const isDeleteDisabled = disabled || !savedNames.includes(inputValue);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  }, []);

  const handleItemSelect = useCallback(
    (name: string) => {
      setInputValue(name);
      setShowDropdown(false);
      onSelect(name);
    },
    [onSelect],
  );

  const handleSave = useCallback(() => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
    }
  }, [inputValue, onSave]);

  const handleDelete = useCallback(() => {
    if (savedNames.includes(inputValue)) {
      onDelete(inputValue);
      setInputValue('');
    }
  }, [inputValue, onDelete, savedNames]);

  const handleInputFocus = useCallback(() => {
    if (savedNames.length > 0) {
      setShowDropdown(true);
    }
  }, [savedNames.length]);

  const handleInputBlur = useCallback(() => {
    // Delay to allow click on dropdown item
    setTimeout(() => setShowDropdown(false), 200);
  }, []);

  const filteredNames = savedNames.filter((name) =>
    name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className="tw-flex tw-items-center tw-gap-1">
      <div className="tw-relative tw-flex-1">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={disabled}
          className="tw-w-full"
        />
        {showDropdown && filteredNames.length > 0 && (
          <div className="tw-absolute tw-left-0 tw-right-0 tw-top-full tw-z-50 tw-mt-1 tw-max-h-40 tw-overflow-auto tw-rounded-md tw-border tw-border-border tw-bg-background">
            {filteredNames.map((name) => (
              <button
                type="button"
                key={name}
                className={cn(
                  'tw-w-full tw-cursor-pointer tw-px-3 tw-py-2 tw-text-left tw-text-sm',
                  'hover:tw-bg-muted',
                  name === inputValue && 'tw-bg-muted/50',
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleItemSelect(name);
                }}
              >
                <Label className="tw-cursor-pointer">{name}</Label>
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isSaveDisabled}
        onClick={handleSave}
        aria-label={saveAriaLabel}
      >
        <Save className="tw-h-4 tw-w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isDeleteDisabled}
        onClick={handleDelete}
        aria-label={deleteAriaLabel}
      >
        <Trash2 className="tw-h-4 tw-w-4" />
      </Button>
    </div>
  );
}

import React, { useCallback, useState } from 'react';
import { Button, Input } from 'platform-bible-react';
import { Save, Trash2 } from 'lucide-react';

/** Props for the SettingSaver component */
export interface SettingSaverProps {
  /** List of saved collection names */
  savedNames: string[];
  /** Placeholder text for the dropdown/input */
  placeholder: string;
  /** Called when user selects an existing saved collection */
  onSelect: (name: string) => void;
  /** Called when user saves with the given name */
  onSave: (name: string) => void;
  /** Called when user deletes the selected collection */
  onDelete: (name: string) => void;
  /** Label for the save button (for accessibility) */
  saveLabel: string;
  /** Label for the delete button (for accessibility) */
  deleteLabel: string;
}

/**
 * SettingSaver component - combo box with save and delete buttons. Reusable for both
 * SelectTextsDialog (SavedScrTextLists) and OpenDialog (SavedScrTextSets). Pattern equivalent to
 * PT9's SettingSaverControl.
 */
export default function SettingSaver({
  savedNames,
  placeholder,
  onSelect,
  onSave,
  onDelete,
  saveLabel,
  deleteLabel,
}: SettingSaverProps) {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string | undefined>(undefined);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setSelectedName(undefined);
      setIsDropdownOpen(e.target.value.length === 0 && savedNames.length > 0);
    },
    [savedNames.length],
  );

  const handleInputFocus = useCallback(() => {
    if (savedNames.length > 0) {
      setIsDropdownOpen(true);
    }
  }, [savedNames.length]);

  const handleInputBlur = useCallback(() => {
    // Delay to allow click on dropdown items
    setTimeout(() => setIsDropdownOpen(false), 200);
  }, []);

  const handleSelectItem = useCallback(
    (name: string) => {
      setInputValue(name);
      setSelectedName(name);
      setIsDropdownOpen(false);
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
    if (selectedName) {
      onDelete(selectedName);
      setInputValue('');
      setSelectedName(undefined);
    }
  }, [selectedName, onDelete]);

  return (
    <div className="tw-flex tw-items-center tw-gap-2 tw-flex-1">
      <div className="tw-relative tw-flex-1">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="tw-w-full"
        />
        {isDropdownOpen && savedNames.length > 0 && (
          <div className="tw-absolute tw-z-10 tw-w-full tw-mt-1 tw-bg-background tw-border tw-border-border tw-rounded-md tw-shadow-md tw-max-h-40 tw-overflow-auto">
            {savedNames.map((name) => (
              <button
                key={name}
                type="button"
                className="tw-w-full tw-text-left tw-px-3 tw-py-1.5 tw-text-sm hover:tw-bg-accent tw-cursor-pointer tw-border-none tw-bg-transparent"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectItem(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleSave}
        disabled={!inputValue.trim()}
        aria-label={saveLabel}
      >
        <Save className="tw-h-4 tw-w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDelete}
        disabled={!selectedName}
        aria-label={deleteLabel}
      >
        <Trash2 className="tw-h-4 tw-w-4" />
      </Button>
    </div>
  );
}

import { Button, Input } from 'platform-bible-react';
import { Save, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';

/** A named item that can be saved/loaded/deleted */
export interface SavedItem {
  name: string;
}

export interface SettingSaverProps<T extends SavedItem> {
  /** Currently available saved items */
  items: T[];
  /** Placeholder text for the combo box */
  placeholder: string;
  /** Localized save button tooltip */
  saveTooltip?: string;
  /** Localized delete button tooltip */
  deleteTooltip?: string;
  /** Called when user selects a saved item from the dropdown */
  onSelect: (item: T) => void;
  /** Called when user wants to save current state with the given name */
  onSave: (name: string) => void;
  /** Called when user wants to delete the selected item */
  onDelete: (item: T) => void;
  /** Localized confirm overwrite message */
  confirmOverwriteMessage?: string;
}

export default function SettingSaver<T extends SavedItem>({
  items,
  placeholder,
  saveTooltip,
  deleteTooltip,
  onSelect,
  onSave,
  onDelete,
  confirmOverwriteMessage,
}: SettingSaverProps<T>) {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedItem(undefined);
    setShowDropdown(e.target.value.length > 0);
  }, []);

  const handleSelectItem = useCallback(
    (item: T) => {
      setInputValue(item.name);
      setSelectedItem(item);
      setShowDropdown(false);
      onSelect(item);
    },
    [onSelect],
  );

  const handleSave = useCallback(() => {
    if (!inputValue.trim()) return;
    const existingItem = items.find(
      (item) => item.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );
    if (existingItem && confirmOverwriteMessage) {
      // Using window.confirm for the overwrite confirmation
      // eslint-disable-next-line no-alert
      if (!window.confirm(confirmOverwriteMessage)) return;
    }
    onSave(inputValue.trim());
  }, [inputValue, items, onSave, confirmOverwriteMessage]);

  const handleDelete = useCallback(() => {
    if (selectedItem) {
      onDelete(selectedItem);
      setInputValue('');
      setSelectedItem(undefined);
    }
  }, [selectedItem, onDelete]);

  const handleInputFocus = useCallback(() => {
    if (items.length > 0) {
      setShowDropdown(true);
    }
  }, [items.length]);

  const handleInputBlur = useCallback(() => {
    // Delay hiding dropdown to allow click events on items
    setTimeout(() => setShowDropdown(false), 200);
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className="tw-relative tw-flex tw-items-center tw-gap-1">
      <div className="tw-relative tw-flex-1">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="tw-h-8 tw-text-sm"
        />
        {showDropdown && filteredItems.length > 0 && (
          <div className="tw-absolute tw-left-0 tw-right-0 tw-top-full tw-z-50 tw-mt-1 tw-max-h-40 tw-overflow-auto tw-rounded-md tw-border tw-bg-popover tw-shadow-md">
            {filteredItems.map((item) => (
              <button
                type="button"
                key={item.name}
                className="tw-w-full tw-cursor-pointer tw-px-3 tw-py-1.5 tw-text-left tw-text-sm hover:tw-bg-accent"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleSave}
        disabled={!inputValue.trim()}
        title={saveTooltip}
        className="tw-h-8 tw-w-8 tw-p-0"
      >
        <Save className="tw-h-4 tw-w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={!selectedItem}
        title={deleteTooltip}
        className="tw-h-8 tw-w-8 tw-p-0"
      >
        <Trash2 className="tw-h-4 tw-w-4" />
      </Button>
    </div>
  );
}

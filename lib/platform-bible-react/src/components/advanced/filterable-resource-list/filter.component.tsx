import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { X } from 'lucide-react';
import MultiSelectComboBox, { MultiSelectComboBoxProps } from '../multi-select-combo-box.component';

interface FilterProps extends MultiSelectComboBoxProps {}

function Filter({
  entries,
  getEntriesCount,
  selected,
  onChange,
  placeholder,
  commandEmptyMessage,
  customSelectedText,
  sortSelected,
  icon,
  className,
}: FilterProps) {
  const removeType = (value: string) => {
    if (selected.length === 1) return;
    onChange(selected.filter((type) => type !== value));
  };

  return (
    <div className="tw-flex">
      <MultiSelectComboBox
        entries={entries}
        getEntriesCount={getEntriesCount}
        selected={selected}
        onChange={onChange}
        placeholder={placeholder}
        commandEmptyMessage={commandEmptyMessage}
        customSelectedText={customSelectedText}
        sortSelected={sortSelected}
        icon={icon}
        className={className}
      />
      {selected.length > 0 && (
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
          {selected.map((type) => (
            <Badge key={type} variant="muted" className="tw-flex tw-items-center tw-gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent"
                onClick={() => removeType(type)}
              >
                <X className="tw-h-3 tw-w-3" />
              </Button>
              {entries.find((t) => t.value === type)?.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;

import Checklist from '@/components/basics/checklist.component';
import { useState } from 'react';

const listItems: string[] = ['Box A', 'Box B', 'Box C', 'Box D', 'Box E', 'Box F'];

export default function ChecklistExamples() {
  const [selectedListItems, setSelectedListItems] = useState<string[]>(['Box B', 'Box E']);

  const handleSelectListItem = (item: string, selected: boolean): void => {
    if (selected) setSelectedListItems((prevSelectedListItems) => [...prevSelectedListItems, item]);
    else
      setSelectedListItems((prevSelectedListItems) =>
        prevSelectedListItems.filter((listItem) => listItem !== item),
      );
  };

  return (
    <Checklist
      className="pr-h-1/2 pr-w-full pr-columns-2 pr-overflow-auto *:pr-m-4"
      handleSelectListItem={handleSelectListItem}
      listItems={listItems}
      selectedListItems={selectedListItems}
      legend="Checklist"
    />
  );
}

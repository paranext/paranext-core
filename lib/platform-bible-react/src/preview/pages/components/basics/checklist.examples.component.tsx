import Checklist from '@/components/basics/checklist.component';
import { Card, CardContent } from '@/components/shadcn-ui/card';
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
    <Card>
      <CardContent className="tw-h-1/2 tw-w-full tw-columns-2 tw-overflow-auto *:tw-m-4">
        <Checklist
          handleSelectListItem={handleSelectListItem}
          listItems={listItems}
          selectedListItems={selectedListItems}
        />
      </CardContent>
    </Card>
  );
}

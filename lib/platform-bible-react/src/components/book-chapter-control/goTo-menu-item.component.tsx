import { DropdownMenuItem as ShadDropdownMenuItem } from '@/components/shadcn-ui/dropdown-menu';
import { Bookmark, Clock, ArrowDownWideNarrow } from 'lucide-react';

export type GoToMenuItemProps = {
  handleSort: () => void;
  handleLocationHistory: () => void;
  handleBookmarks: () => void;
};

function GoToMenuItem({ handleSort, handleLocationHistory, handleBookmarks }: GoToMenuItemProps) {
  return (
    <ShadDropdownMenuItem
      onSelect={(e: Event) => e.preventDefault()}
      className="pr-flex pr-justify-between"
    >
      Go To
      <div className="pr-flex pr-items-center">
        <ArrowDownWideNarrow
          onClick={handleSort}
          className="pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        />
        <Clock
          onClick={handleLocationHistory}
          className="pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        />
        <Bookmark
          onClick={handleBookmarks}
          className="pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        />
      </div>
    </ShadDropdownMenuItem>
  );
}

export default GoToMenuItem;

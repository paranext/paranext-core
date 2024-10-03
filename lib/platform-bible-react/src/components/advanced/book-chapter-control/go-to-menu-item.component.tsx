import { DropdownMenuLabel as ShadDropdownMenuLabel } from '@/components/shadcn-ui/dropdown-menu';
import { Bookmark, Clock, ArrowDownWideNarrow } from 'lucide-react';

export type GoToMenuItemProps = {
  handleSort: () => void;
  handleLocationHistory: () => void;
  handleBookmarks: () => void;
};

function GoToMenuItem({ handleSort, handleLocationHistory, handleBookmarks }: GoToMenuItemProps) {
  return (
    <ShadDropdownMenuLabel className="pr-flex pr-justify-between">
      <p className="pr-inline-block pr-align-middle">Go To</p>
      <div className="pr-flex pr-items-center">
        <ArrowDownWideNarrow
          onClick={handleSort}
          className="pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        />
        <Clock
          onClick={handleLocationHistory}
          className="pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        />
        <Bookmark
          onClick={handleBookmarks}
          className="pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        />
      </div>
    </ShadDropdownMenuLabel>
  );
}

export default GoToMenuItem;

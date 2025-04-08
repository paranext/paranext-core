import { DropdownMenuLabel } from '@/components/shadcn-ui/dropdown-menu';
import { Bookmark, Clock, ArrowDownWideNarrow } from 'lucide-react';

export type GoToMenuItemProps = {
  handleSort: () => void;
  handleLocationHistory: () => void;
  handleBookmarks: () => void;
};

export function GoToMenuItem({
  handleSort,
  handleLocationHistory,
  handleBookmarks,
}: GoToMenuItemProps) {
  return (
    <DropdownMenuLabel className="tw-flex tw-justify-between">
      <p className="tw-inline-block tw-align-middle">Go To</p>
      <div className="tw-flex tw-items-center">
        <ArrowDownWideNarrow
          onClick={handleSort}
          className="tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        />
        <Clock
          onClick={handleLocationHistory}
          className="tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        />
        <Bookmark
          onClick={handleBookmarks}
          className="tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        />
      </div>
    </DropdownMenuLabel>
  );
}

export default GoToMenuItem;

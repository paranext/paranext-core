import { Filter, ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '@/components/shadcn-ui/button';

/**
 * The FilterButton component is a button designed for initiating filtering of data. It is designed
 * to be used with the dropdown menu. It uses forwardRef to pass the button to the dropdown trigger
 * asChild.
 *
 * @returns A button that can be used to filter.
 */
export const FilterButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button
      ref={ref}
      className="tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600"
      {...props}
    >
      <Filter size={16} className="tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" />
      Filter
      <ChevronDown
        size={16}
        className="tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
      />
    </Button>
  );
});

export default FilterButton;

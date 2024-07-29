import { Filter, ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '@/components/shadcn-ui/button';

/**
 * The FilterButton component is a button designed for initiating filtering of data. It includes
 * dropdown visuals for active filtering and idle states. it uses forwardRef to pass the button to
 * the dropdown trigger asChild.
 *
 * @returns A button that can be used to filter.
 */
const FilterButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button
      ref={ref}
      className="pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600"
      {...props}
    >
      <Filter size={16} className="pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" />
      Filter
      <ChevronDown
        size={16}
        className="pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
      />
    </Button>
  );
});

export default FilterButton;

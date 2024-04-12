import { forwardRef } from 'react';
// import { History } from 'lucide-react';
import { Input as ShadInput } from '@/components/shadcn-ui/input';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  handleKeyUp: () => void;
  value: string;
  placeholder: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  ({ handleSearch, handleKeyUp, ...props }: BookChapterInputProps, ref) => {
    return (
      // <div style={{ position: 'relative', display: 'inline-block' }}>
      <ShadInput
        {...props}
        type="text"
        className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none"
        onChange={(event) => handleSearch(event.target.value)}
        onKeyUp={handleKeyUp}
        ref={ref}
      />
      /* <div className="absolute pr-right-4 pr-top-5 -pr-translate-y-1/2 pr-cursor-pointer">
          <History
            size={16}
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('back in history');
            }}
          />
        </div> */
      // </div>
    );
  },
);

export default BookChapterInput;

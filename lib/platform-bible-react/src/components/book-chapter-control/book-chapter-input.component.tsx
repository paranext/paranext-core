import { forwardRef } from 'react';
import { History } from 'lucide-react';
import { Input as ShadInput } from '@/components/shadcn-ui/input';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  handleKeyDown: () => void;
  value: string;
  placeholder: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  ({ handleSearch, handleKeyDown, ...props }: BookChapterInputProps, ref) => {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <ShadInput
          {...props}
          style={{ outline: 0, paddingRight: '40px' }}
          type="text"
          className="pr-box-border pr-rounded-lg pr-bg-white pr-text-slate-700 pr-shadow-none"
          onChange={(event) => handleSearch(event.target.value)}
          onKeyUp={handleKeyDown}
          ref={ref}
        />
        <div
          style={{
            position: 'absolute',
            transform: 'translateY(-50%)',
            top: '20px',
            right: '16px',
          }}
          className="pr-cursor-pointer"
        >
          <History
            size={16}
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('back in history');
            }}
          />
        </div>
      </div>
    );
  },
);

export default BookChapterInput;

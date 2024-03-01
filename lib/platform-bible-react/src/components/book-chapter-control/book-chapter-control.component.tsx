import { History, Search } from 'lucide-react';
import {
  DropdownMenuTrigger as ShadDropdownMenuTrigger,
  DropdownMenu as ShadDropdownMenu,
  DropdownMenuContent as ShadDropdownMenuContent,
} from '../shadcn-ui/dropdown-menu';
import BookChapterInput from './book-chapter-input.component';
import ChapterSelect from './chapter-select.component';

function BookChapterControl() {
  return (
    <div>
      <ShadDropdownMenu>
        <Search
          style={{
            position: 'absolute',
            left: '8px',
            top: '32px',
            color: 'gray',
            width: '16px',
          }}
        />
        {/* Adds a grey box behind our input */}
        <ShadDropdownMenuTrigger style={{ backgroundColor: 'transparent', border: 'none' }}>
          <BookChapterInput
            // handleClick={() => {
            //   throw new Error('Function not implemented.');
            // }}
            value="Hello"
            placeholder="Hello"
          />
        </ShadDropdownMenuTrigger>
        <History
          style={{
            position: 'absolute',
            left: '276px',
            top: '32px',
            cursor: 'pointer',
            width: '16px',
          }}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('back in history');
          }}
        />
        <ShadDropdownMenuContent>
          <ChapterSelect
            endChapter={30}
            handleSelectChapter={(chapterNumber: number) => {
              throw new Error(`Function not implemented. ${chapterNumber}`);
            }}
            activeChapter={0}
          />
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
    </div>
  );
}

export default BookChapterControl;

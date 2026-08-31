import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { FunctionSquare, SquareSigma, SquareX } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { Z_INDEX_ABOVE_POPOVER } from '@/components/z-index';
import { useRef } from 'react';
import { FootnoteEditorLocalizedStrings } from './footnote-editor.types';

interface FootnoteTypeDropdownProps {
  noteType: string;
  handleNoteTypeChange: (newNoteType: string) => void;
  localizedStrings: FootnoteEditorLocalizedStrings;
  isTypeSwitchable: boolean;
  /** Returns the caret and keyboard focus to the note being edited. See `onCloseAutoFocus` below. */
  focusNoteText: () => void;
}

const renderNoteTypeButtonContent = (
  noteType: string,
  localizedStrings: FootnoteEditorLocalizedStrings,
) => {
  if (noteType === 'f') {
    return (
      <>
        <FunctionSquare /> {localizedStrings['%footnoteEditor_noteType_footnote_label%']}
      </>
    );
  }

  if (noteType === 'fe') {
    return (
      <>
        <SquareSigma /> {localizedStrings['%footnoteEditor_noteType_endNote_label%']}
      </>
    );
  }

  return (
    <>
      <SquareX /> {localizedStrings['%footnoteEditor_noteType_crossReference_label%']}
    </>
  );
};

const formatNoteTypeTooltip = (
  noteType: string,
  localizedStrings: FootnoteEditorLocalizedStrings,
) => {
  if (noteType === 'x') {
    return localizedStrings['%footnoteEditor_noteType_crossReference_label%'];
  }

  let noteTypeString = localizedStrings['%footnoteEditor_noteType_endNote_label%'];
  if (noteType === 'f') {
    noteTypeString = localizedStrings['%footnoteEditor_noteType_footnote_label%'];
  }

  return formatReplacementString(localizedStrings['%footnoteEditor_noteType_tooltip%'] ?? '', {
    noteType: noteTypeString,
  });
};

export function FootnoteTypeDropdown({
  noteType,
  handleNoteTypeChange,
  localizedStrings,
  isTypeSwitchable,
  focusNoteText,
}: FootnoteTypeDropdownProps) {
  // Whether this opening of the menu actually changed the note type, read on close to decide who
  // gets focus. A ref rather than state: nothing renders from it, and the close handler has to see
  // the choice made moments earlier in the same batch.
  const choseNoteType = useRef(false);

  const chooseNoteType = (newNoteType: string) => {
    choseNoteType.current = true;
    handleNoteTypeChange(newNoteType);
  };

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="tw:h-6">
                {renderNoteTypeButtonContent(noteType, localizedStrings)}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{formatNoteTypeTooltip(noteType, localizedStrings)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        style={{ zIndex: Z_INDEX_ABOVE_POPOVER }}
        // After a CHOICE, claim Radix's restore and send focus to the note text: the user asked for
        // an edit, and Radix would otherwise leave them on a button in the middle of an editor
        // popover — the note type changed, the caret is in the right place, and typing goes nowhere.
        // After a DISMISSAL nothing changed, so Radix's own restore is what the user expects (and
        // what WCAG 2.4.3 asks for): they are returned to the control they opened, still in the
        // toolbar, one Tab from its neighbours.
        onCloseAutoFocus={(event) => {
          if (!choseNoteType.current) return;
          choseNoteType.current = false;
          event.preventDefault();
          focusNoteText();
        }}
      >
        <DropdownMenuLabel>
          {localizedStrings['%footnoteEditor_noteTypeDropdown_label%']}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          disabled={noteType !== 'x' && !isTypeSwitchable}
          checked={noteType === 'x'}
          onCheckedChange={() => chooseNoteType('x')}
          className="tw:gap-2"
        >
          <SquareX />
          <span>{localizedStrings['%footnoteEditor_noteType_crossReference_label%']}</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          disabled={noteType === 'x' && !isTypeSwitchable}
          checked={noteType === 'f'}
          onCheckedChange={() => chooseNoteType('f')}
          className="tw:gap-2"
        >
          <FunctionSquare />
          <span>{localizedStrings['%footnoteEditor_noteType_footnote_label%']}</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          disabled={noteType === 'x' && !isTypeSwitchable}
          checked={noteType === 'fe'}
          onCheckedChange={() => chooseNoteType('fe')}
          className="tw:gap-2"
        >
          <SquareSigma />
          <span>{localizedStrings['%footnoteEditor_noteType_endNote_label%']}</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

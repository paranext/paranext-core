import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/shadcn-ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { FunctionSquare, SquareSigma, SquareX } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { FootnoteEditorLocalizedStrings } from './footnote-editor.types';

interface FootnoteTypeDropdownProps {
  noteType: string;
  handleNoteTypeChange: (newNoteType: string) => void;
  localizedStrings: FootnoteEditorLocalizedStrings;
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

export default function FootnoteTypeDropdown({
  noteType,
  handleNoteTypeChange,
  localizedStrings,
}: FootnoteTypeDropdownProps) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="tw-h-6 disabled:tw-pointer-events-auto"
                disabled={noteType === 'x'}
              >
                {renderNoteTypeButtonContent(noteType, localizedStrings)}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{formatNoteTypeTooltip(noteType, localizedStrings)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {noteType !== 'x' && (
        <DropdownMenuContent className="tw-z-[300]">
          <DropdownMenuLabel>
            {localizedStrings['%footnoteEditor_noteTypeDropdown_label%']}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuRadioGroup value={noteType} onValueChange={handleNoteTypeChange}> */}
          <DropdownMenuCheckboxItem
            checked={noteType === 'f'}
            onCheckedChange={() => handleNoteTypeChange('f')}
            className="tw-gap-2"
          >
            <FunctionSquare />
            <span>{localizedStrings['%footnoteEditor_noteType_footnote_label%']}</span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={noteType === 'fe'}
            onCheckedChange={() => handleNoteTypeChange('fe')}
            className="tw-gap-2"
          >
            <SquareSigma />
            <span>{localizedStrings['%footnoteEditor_noteType_endNote_label%']}</span>
          </DropdownMenuCheckboxItem>
          {/* </DropdownMenuRadioGroup> */}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

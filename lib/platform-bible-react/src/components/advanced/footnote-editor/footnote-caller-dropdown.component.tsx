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
import { Button } from '@/components/shadcn-ui/button';
import { GENERATOR_NOTE_CALLER, HIDDEN_NOTE_CALLER } from '@eten-tech-foundation/platform-editor';
import { Input } from '@/components/shadcn-ui/input';
import { useEffect, useState } from 'react';
import { Asterisk, Minus, Plus } from 'lucide-react';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';

interface FootnoteCallerDropdownProps {
  /** The caller type value to pass to the dropdown */
  callerType: FootnoteCallerType;
  /** Function to update the caller type */
  updateCallerType: (newCallerType: FootnoteCallerType) => void;
  /** The custom caller to pass to the custom caller input field */
  customCaller: string;
  /** FUnction to update the custom caller */
  updateCustomCaller: (newCustomCaller: string) => void;
  /** Localized strings from the parent component */
  localizedStrings: FootnoteEditorLocalizedStrings;
}

const renderCallerButtonContent = (
  callerType: FootnoteCallerType,
  localizedStrings: FootnoteEditorLocalizedStrings,
) => {
  if (callerType === 'generated') {
    return (
      <>
        <Plus /> {localizedStrings['%footnoteEditor_callerDropdown_item_generated%']}
      </>
    );
  }

  if (callerType === 'hidden') {
    return (
      <>
        <Minus /> {localizedStrings['%footnoteEditor_callerDropdown_item_hidden%']}
      </>
    );
  }

  return (
    <>
      <Asterisk /> {localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}
    </>
  );
};

export default function FootnoteCallerDropdown({
  callerType,
  updateCallerType,
  customCaller,
  updateCustomCaller,
  localizedStrings,
}: FootnoteCallerDropdownProps) {
  const [selectedCallerType, setSelectedCallerType] = useState<FootnoteCallerType>(callerType);

  // If the caller type changes, the selected caller type needs to change also
  useEffect(() => {
    setSelectedCallerType(callerType);
  }, [callerType]);

  const handleDropdownOpenChange = (open: boolean) => {
    if (!open) {
      // This makes it so that if the custom caller is invalid, then reverts back to the previous
      // selected caller
      if (selectedCallerType !== 'custom' || customCaller) {
        updateCallerType(selectedCallerType);
      } else {
        setSelectedCallerType(callerType);
      }
    }
  };

  return (
    <DropdownMenu onOpenChange={handleDropdownOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="tw-h-6">
                {renderCallerButtonContent(callerType, localizedStrings)}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {localizedStrings['%footnoteEditor_callerDropdown_tooltip%']}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="tw-z-[300]">
        <DropdownMenuLabel>
          {localizedStrings['%footnoteEditor_callerDropdown_label%']}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedCallerType === 'generated'}
          onCheckedChange={() => setSelectedCallerType('generated')}
        >
          <div className="tw-flex tw-w-full tw-justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_generated%']}</span>
            <span className="tw-w-10 tw-text-center">{GENERATOR_NOTE_CALLER}</span>
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedCallerType === 'hidden'}
          onCheckedChange={() => setSelectedCallerType('hidden')}
        >
          <div className="tw-flex tw-w-full tw-justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_hidden%']}</span>
            <span className="tw-w-10 tw-text-center">{HIDDEN_NOTE_CALLER}</span>
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedCallerType === 'custom'}
          onCheckedChange={() => setSelectedCallerType('custom')}
          onSelect={(event) => event.preventDefault()}
        >
          <div className="tw-flex tw-w-full tw-justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}</span>
            <Input
              className="tw-h-auto tw-w-10 tw-p-0 tw-text-center"
              value={customCaller}
              maxLength={1}
              onChange={(event) => updateCustomCaller(event.target.value)}
            />
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
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
  customCaller: string,
) => {
  if (callerType === 'generated') {
    return (
      <>
        <p>+</p> {localizedStrings['%footnoteEditor_callerDropdown_item_generated%']}
      </>
    );
  }

  if (callerType === 'hidden') {
    return (
      <>
        <p>-</p> {localizedStrings['%footnoteEditor_callerDropdown_item_hidden%']}
      </>
    );
  }

  return (
    <>
      <p>{customCaller}</p> {localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}
    </>
  );
};

export function FootnoteCallerDropdown({
  callerType,
  updateCallerType,
  customCaller,
  updateCustomCaller,
  localizedStrings,
}: FootnoteCallerDropdownProps) {
  // The ref must start with being null to be passed as an element ref
  // eslint-disable-next-line no-null/no-null
  const customCallerInputRef = useRef<HTMLInputElement>(null);
  // The ref must start with being null to be passed as an element ref
  // eslint-disable-next-line no-null/no-null
  const customCallerSelectRef = useRef<HTMLDivElement>(null);
  // The ref must start with being null to be passed as an element ref
  // eslint-disable-next-line no-null/no-null
  const isCustomCallerInputFocused = useRef(false);
  const [selectedCallerType, setSelectedCallerType] = useState<FootnoteCallerType>(callerType);
  const [newCustomCaller, setNewCustomCaller] = useState<string>(customCaller);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // If the caller type changes, the selected caller type needs to change also
  useEffect(() => {
    setSelectedCallerType(callerType);
  }, [callerType]);

  // If the parent custom caller changes, then the new custom caller should reflect the changes
  useEffect(() => {
    if (newCustomCaller !== customCaller) {
      setNewCustomCaller(customCaller);
    }
    // This can't be triggered when the new custom caller updates because otherwise this will
    // completely prevent the input field from being edited
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customCaller]);

  const handleDropdownOpenChange = (open: boolean) => {
    isCustomCallerInputFocused.current = false;
    setIsDropdownOpen(open);
    if (!open) {
      // This makes it so that if the custom caller is invalid, then reverts back to the previous
      // selected caller
      if (selectedCallerType !== 'custom' || newCustomCaller) {
        updateCallerType(selectedCallerType);
        updateCustomCaller(newCustomCaller);
      } else {
        setSelectedCallerType(callerType);
        setNewCustomCaller(customCaller);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // Allow to navigate to the input field
    if (
      (document.activeElement === customCallerSelectRef.current && event.key === 'ArrowDown') ||
      event.key === 'ArrowRight'
    ) {
      customCallerInputRef.current?.focus();
      isCustomCallerInputFocused.current = true;
    } else if (document.activeElement === customCallerInputRef.current && event.key === 'ArrowUp') {
      customCallerSelectRef.current?.focus();
      isCustomCallerInputFocused.current = false;
    } else if (
      document.activeElement === customCallerInputRef.current &&
      event.key === 'ArrowLeft' &&
      customCallerInputRef.current?.selectionStart === 0
    ) {
      customCallerSelectRef.current?.focus();
      isCustomCallerInputFocused.current = false;
    }

    // Allow the dropdown menu to be submitted if the custom caller is selected when you press enter
    if (
      selectedCallerType === 'custom' &&
      event.key === 'Enter' &&
      (document.activeElement === customCallerSelectRef.current ||
        document.activeElement === customCallerInputRef.current)
    ) {
      handleDropdownOpenChange(false);
    }
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="tw-h-6">
                {renderCallerButtonContent(callerType, localizedStrings, customCaller)}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {localizedStrings['%footnoteEditor_callerDropdown_tooltip%']}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        className="tw-z-[300]"
        onClick={() => {
          if (isCustomCallerInputFocused.current) isCustomCallerInputFocused.current = false;
        }}
        onKeyDown={handleKeyDown}
        onMouseMove={() => {
          if (isCustomCallerInputFocused.current) customCallerInputRef.current?.focus();
        }}
      >
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
          ref={customCallerSelectRef}
          checked={selectedCallerType === 'custom'}
          onCheckedChange={() => setSelectedCallerType('custom')}
          onClick={(event) => {
            event.stopPropagation();
            isCustomCallerInputFocused.current = true;
            customCallerInputRef.current?.focus();
          }}
          onSelect={(event) => event.preventDefault()}
        >
          <div className="tw-flex tw-w-full tw-justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}</span>
            <Input
              tabIndex={0}
              onMouseDown={(event) => {
                event.stopPropagation();
                setSelectedCallerType('custom');
                isCustomCallerInputFocused.current = true;
              }}
              ref={customCallerInputRef}
              className="tw-h-auto tw-w-10 tw-p-0 tw-text-center"
              value={newCustomCaller}
              onKeyDown={(event) => {
                if (
                  !(
                    event.key === 'Enter' ||
                    event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight'
                  )
                )
                  event.stopPropagation();
              }}
              maxLength={1}
              onChange={(event) => setNewCustomCaller(event.target.value)}
            />
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

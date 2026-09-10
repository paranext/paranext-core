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
import { Z_INDEX_ABOVE_POPOVER } from '@/components/z-index';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';

interface FootnoteCallerDropdownProps {
  /** The caller type value to pass to the dropdown */
  callerType: FootnoteCallerType;
  /** The custom caller to pass to the custom caller input field */
  customCaller: string;
  /**
   * Applies the caller the user settled on. Both halves travel together because they are ONE
   * choice, and the applied caller is a function of both: a type of `custom` means nothing without
   * its character. Split into a call per half, each would have to read the other from state its
   * sibling had not updated yet, and a visit that changes both — choosing Custom and typing its
   * character — would write neither.
   */
  updateCaller: (newCallerType: FootnoteCallerType, newCustomCaller: string) => void;
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
  customCaller,
  updateCaller,
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
  // Whether the Custom row was already checked when the pointer went down on it — see its
  // `onPointerDown` for why the click itself can no longer tell.
  const wasCustomBeforePressRef = useRef(false);

  // The selection is COMMITTED when the menu closes (below), and choosing an item closes the menu
  // — so both happen in one React batch and the close handler's closure still holds the
  // pre-selection values. Reading the pending choice through refs is what makes the commit see
  // what the user just picked instead of what was selected when the menu opened; without them
  // every selection committed the value it was replacing.
  const selectedCallerTypeRef = useRef(selectedCallerType);
  selectedCallerTypeRef.current = selectedCallerType;
  const newCustomCallerRef = useRef(newCustomCaller);
  newCustomCallerRef.current = newCustomCaller;

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
      const pendingCallerType = selectedCallerTypeRef.current;
      const pendingCustomCaller = newCustomCallerRef.current;
      // This makes it so that if the custom caller is invalid, then reverts back to the previous
      // selected caller
      if (pendingCallerType !== 'custom' || pendingCustomCaller) {
        // One call for one choice: this is a save, and the note is replaced in the popover's
        // editor on the way through, so a close must never produce two of them.
        if (pendingCallerType !== callerType || pendingCustomCaller !== customCaller)
          updateCaller(pendingCallerType, pendingCustomCaller);
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
              <Button variant="outline" className="tw:h-6">
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
        style={{ zIndex: Z_INDEX_ABOVE_POPOVER }}
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
          <div className="tw:flex tw:w-full tw:justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_generated%']}</span>
            <span className="tw:w-10 tw:text-center">{GENERATOR_NOTE_CALLER}</span>
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedCallerType === 'hidden'}
          onCheckedChange={() => setSelectedCallerType('hidden')}
        >
          <div className="tw:flex tw:w-full tw:justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_hidden%']}</span>
            <span className="tw:w-10 tw:text-center">{HIDDEN_NOTE_CALLER}</span>
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          ref={customCallerSelectRef}
          checked={selectedCallerType === 'custom'}
          onCheckedChange={() => setSelectedCallerType('custom')}
          // Radix selects a menu item on POINTER-UP, so by the time the click arrives this row is
          // already checked and the click handler can no longer tell an arming click from a
          // confirming one. The answer is only available before the press is resolved, so it is
          // taken here.
          onPointerDown={() => {
            wasCustomBeforePressRef.current = selectedCallerType === 'custom';
          }}
          onClick={(event) => {
            event.stopPropagation();
            // Choosing Custom deliberately keeps the menu OPEN (see `onSelect` below) so a caller
            // can be typed, which leaves this row's own check as the pointer gesture that confirms
            // one — the same commit Enter performs, through the same close handler. The check's
            // indicator is `pointer-events-none`, so a click on it arrives here, on the row.
            //
            // Only a row that was ALREADY checked commits: the first click is what selects Custom
            // and focuses the field, and committing there would apply whatever the field held
            // before the user typed. A click that landed in the FIELD is the user reaching for the
            // text, never a confirmation — closing on that would make a caller impossible to type.
            if (wasCustomBeforePressRef.current && event.target !== customCallerInputRef.current) {
              handleDropdownOpenChange(false);
              return;
            }
            isCustomCallerInputFocused.current = true;
            customCallerInputRef.current?.focus();
          }}
          onSelect={(event) => event.preventDefault()}
        >
          <div className="tw:flex tw:w-full tw:justify-between">
            <span>{localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}</span>
            <Input
              tabIndex={0}
              onMouseDown={(event) => {
                event.stopPropagation();
                setSelectedCallerType('custom');
                isCustomCallerInputFocused.current = true;
              }}
              ref={customCallerInputRef}
              className="tw:h-auto tw:w-10 tw:p-0 tw:text-center"
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

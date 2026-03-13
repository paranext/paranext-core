import { Button, type ButtonProps } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Redo, Undo } from 'lucide-react';
import { useMemo } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component.
 */
export const UNDO_REDO_BUTTONS_STRING_KEYS = Object.freeze([
  '%undoButton_tooltip%',
  '%redoButton_tooltip%',
] as const);

export type UndoRedoButtonsLocalizedStrings = {
  [key in (typeof UNDO_REDO_BUTTONS_STRING_KEYS)[number]]?: string;
};

const localizeString = (
  strings: UndoRedoButtonsLocalizedStrings,
  key: keyof UndoRedoButtonsLocalizedStrings,
) => strings[key] ?? key;

export type UndoRedoButtonsProps = {
  /** Function to call when Undo is clicked. */
  onUndoClick: () => void;
  /** Function to call when Redo is clicked. If undefined, the Redo button is not rendered. */
  onRedoClick?: () => void;
  /** Whether the Undo button is enabled. */
  canUndo?: boolean;
  /** Whether the Redo button is enabled. */
  canRedo?: boolean;
  /** Localized strings for button tooltips. Falls back to the key itself if not provided. */
  localizedStrings?: UndoRedoButtonsLocalizedStrings;
  /**
   * Whether to show OS-specific keyboard shortcut hints in the tooltips. Defaults to `true`. If
   * being used with an `Editorial` component, wrap it in `EditorKeyboardShortcuts` to make the
   * shortcuts functional.
   */
  showKeyboardShortcuts?: boolean;
  /** CSS class name for the buttons. Defaults to "tw-h-6 tw-w-6". */
  className?: string;
  /** Variant for the buttons. Defaults to "ghost". */
  variant?: ButtonProps['variant'];
};

/**
 * Undo and (optionally) Redo buttons with tooltips. Suitable for use in any editor toolbar. The
 * Redo button is only rendered when `onRedoClick` is provided. Tooltip text defaults to the
 * localization key if no localized strings are provided. OS-specific keyboard shortcut hints are
 * shown in the tooltips by default; wrap the `Editorial` component in `EditorKeyboardShortcuts` to
 * make those shortcuts functional.
 */
export function UndoRedoButtons({
  onUndoClick,
  onRedoClick,
  canUndo = true,
  canRedo = true,
  localizedStrings = {},
  showKeyboardShortcuts = true,
  className = 'tw-h-6 tw-w-6',
  variant = 'ghost',
}: UndoRedoButtonsProps) {
  const isMac = useMemo(() => /Macintosh/i.test(navigator.userAgent), []);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Undo"
              className={className}
              size="icon"
              onClick={onUndoClick}
              disabled={!canUndo}
              variant={variant}
            >
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {localizeString(localizedStrings, '%undoButton_tooltip%')}
              {showKeyboardShortcuts && ` (${isMac ? '⌘⇧z' : 'Ctrl + Z'})`}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {onRedoClick && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Redo"
                className={className}
                size="icon"
                onClick={onRedoClick}
                disabled={!canRedo}
                variant={variant}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {localizeString(localizedStrings, '%redoButton_tooltip%')}
                {showKeyboardShortcuts && ` (${isMac ? '⌘⇧Z' : 'Ctrl + Y'})`}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

export default UndoRedoButtons;

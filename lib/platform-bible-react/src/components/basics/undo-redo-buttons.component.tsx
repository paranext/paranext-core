import { Button } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Redo, Undo } from 'lucide-react';

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
};

/**
 * Undo and (optionally) Redo buttons with tooltips. Suitable for use in any editor toolbar. The
 * Redo button is only rendered when `onRedoClick` is provided. Tooltip text defaults to the
 * localization key if no localized strings are provided.
 */
export function UndoRedoButtons({
  onUndoClick,
  onRedoClick,
  canUndo = true,
  canRedo = true,
  localizedStrings = {},
}: UndoRedoButtonsProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Undo"
              onClick={onUndoClick}
              disabled={!canUndo}
              size="icon"
              variant="ghost"
            >
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{localizeString(localizedStrings, '%undoButton_tooltip%')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {onRedoClick && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Redo"
                onClick={onRedoClick}
                disabled={!canRedo}
                size="icon"
                variant="ghost"
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{localizeString(localizedStrings, '%redoButton_tooltip%')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

export default UndoRedoButtons;

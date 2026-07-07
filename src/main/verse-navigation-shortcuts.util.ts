import { CommandNames } from 'papi-shared-types';

/** The subset of Electron.Input this mapping reads — keeps the function trivially testable */
type VerseNavigationInput = {
  key: string;
  control: boolean;
  alt: boolean;
  meta: boolean;
  shift: boolean;
};

/**
 * Maps a keyboard input to the verse navigation command it triggers, if any. Mirrors the Paratext 9
 * shortcut set (ParatextBase.ProcessVerseShortCuts): F8/Ctrl+F8 chapter, F9/Ctrl+F9 book,
 * Ctrl+Down/Ctrl+Up verse, Ctrl+B open the Book Chapter Control. Combinations with any other
 * modifier are not claimed so they stay available to the OS/renderer.
 */
export function getVerseNavigationCommand(input: VerseNavigationInput): CommandNames | undefined {
  if (input.alt || input.meta || input.shift) return undefined;

  switch (input.key) {
    case 'F8':
      return input.control ? 'platform.goToPreviousChapter' : 'platform.goToNextChapter';
    case 'F9':
      return input.control ? 'platform.goToPreviousBook' : 'platform.goToNextBook';
    case 'ArrowDown':
      return input.control ? 'platform.goToNextVerse' : undefined;
    case 'ArrowUp':
      return input.control ? 'platform.goToPreviousVerse' : undefined;
    // CapsLock produces 'B' without shift, so match both cases
    case 'b':
    case 'B':
      return input.control ? 'platform.openBookChapterControl' : undefined;
    default:
      return undefined;
  }
}

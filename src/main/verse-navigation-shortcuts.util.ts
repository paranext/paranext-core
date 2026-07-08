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
 * Ctrl+Down/Ctrl+Up verse, Ctrl+B open the Book Chapter Control. On macOS the modified shortcuts
 * use Command instead of Control: ⌃F8 is the system "move focus to status menus" shortcut, and
 * ⌃↑/⌃↓ are claimed by Mission Control/App Exposé before the app ever receives them. Combinations
 * with any other modifier are not claimed so they stay available to the OS/renderer.
 *
 * @param input The keyboard input to map
 * @param isMacOS Whether the app is running on macOS (`process.platform === 'darwin'`)
 */
export function getVerseNavigationCommand(
  input: VerseNavigationInput,
  isMacOS: boolean,
): CommandNames | undefined {
  const primaryModifier = isMacOS ? input.meta : input.control;
  const otherModifierPressed = isMacOS
    ? input.alt || input.control || input.shift
    : input.alt || input.meta || input.shift;
  if (otherModifierPressed) return undefined;

  switch (input.key) {
    case 'F8':
      return primaryModifier ? 'platform.goToPreviousChapter' : 'platform.goToNextChapter';
    case 'F9':
      return primaryModifier ? 'platform.goToPreviousBook' : 'platform.goToNextBook';
    case 'ArrowDown':
      return primaryModifier ? 'platform.goToNextVerse' : undefined;
    case 'ArrowUp':
      return primaryModifier ? 'platform.goToPreviousVerse' : undefined;
    // CapsLock produces 'B' without shift, so match both cases
    case 'b':
    case 'B':
      return primaryModifier ? 'platform.openBookChapterControl' : undefined;
    default:
      return undefined;
  }
}

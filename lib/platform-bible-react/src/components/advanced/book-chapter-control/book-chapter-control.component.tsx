import { CommandNavigator } from '../command-navigator/command-navigator.component';
import { BookChapterControlProps } from './book-chapter-control.types';

/**
 * `BookChapterControl` is a component that provides an interactive UI for selecting book chapters.
 *
 * @deprecated Use `CommandNavigator` directly for the dialog-based command palette experience.
 *   `BookChapterControl` is now a compatibility wrapper around `CommandNavigator`.
 */
export function BookChapterControl(props: BookChapterControlProps) {
  return <CommandNavigator {...props} />;
}

export default BookChapterControl;

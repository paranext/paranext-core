import { SerializedVerseRef } from '@sillsdev/scripture';
import { LanguageStrings } from 'platform-bible-utils';
import { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { ButtonProps } from '@/components/shadcn-ui/button';
import { Popover as PopoverPrimitive } from 'radix-ui';

/**
 * Object containing all keys used for localization in the BookChapterControl component. If you're
 * using this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const BOOK_CHAPTER_CONTROL_STRING_KEYS = Object.freeze([
  '%scripture_section_ot_long%',
  '%scripture_section_nt_long%',
  '%scripture_section_dc_long%',
  '%scripture_section_extra_long%',
  '%history_recent%',
  '%history_recentSearches_ariaLabel%',
  '%webView_bookChapterControl_selectChapter%',
  '%webView_bookChapterControl_selectVerse%',
] as const);

/** Type definition for the localized strings used in the BookChapterControl component */
export type BookChapterControlLocalizedStrings = {
  [localizedKey in (typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]]?: string;
};

export type BookWithOptionalChapterAndVerse = Omit<SerializedVerseRef, 'chapterNum' | 'verseNum'> &
  Partial<Pick<SerializedVerseRef, 'chapterNum' | 'verseNum'>>;

export type ViewMode = 'books' | 'chapters' | 'verses';

/**
 * Imperative handle for controlling a {@link BookChapterControl} from outside React — e.g. the
 * `platform.openBookChapterControl` command opening it in response to Ctrl+B
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type BookChapterControlHandle = {
  /**
   * Opens the reference dropdown and focuses its search input, ready for typing. No-op while the
   * control is disabled.
   */
  open: () => void;
};

export type BookChapterControlProps = {
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Callback to handle the submission of a selected reference */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for styling */
  className?: string;
  /** Callback to retrieve book IDs that are available in the current context */
  getActiveBookIds?: () => string[];
  /**
   * Optional map of localized book IDs/short names and full names. The key is the standard book ID
   * (e.g., "2CH"), the value contains a localized version of the ID and related book name (e.g. {
   * localizedId: '2CR', localizedName: '2 Crónicas' })
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
  /** Optional localized strings for the component */
  localizedStrings?: LanguageStrings;
  /** Array of recent scripture references for quick access */
  recentSearches?: SerializedVerseRef[];
  /** Callback to add a new recent scripture reference */
  onAddRecentSearch?: (scrRef: SerializedVerseRef) => void;
  /** Optional ID for the popover content for accessibility */
  id?: string;
  /**
   * Optional callback returning the number of verses for a given book and chapter. When provided,
   * the control enables verse selection: clicking a chapter transitions to a verse selection
   * sub-screen, and typing a reference with a chapter:verse separator shows a verse grid. When
   * omitted, the control selects `verseNum: 1` after a chapter is chosen (current behavior).
   */
  getEndVerse?: (bookId: string, chapterNum: number) => number;
  /**
   * Optional lower bound. When provided, any reference that comes strictly before this one in canon
   * order is disabled in the UI (books, chapters, and verses). Used to prevent selecting an "end"
   * reference that precedes a "start" reference (e.g., in a range picker).
   */
  disableReferencesUpTo?: SerializedVerseRef;
  /**
   * Optional list of extra keys that submit the currently-matched reference from the search input
   * (in addition to `Enter`, which always submits). When one of these keys is pressed while the
   * typed input resolves to a valid top-match reference, that match is submitted and the key is
   * consumed (not inserted into the input). Intended for flows where a "separator" keystroke
   * implies completion — e.g. a range picker that uses space or `-` to confirm the start of a range
   * and advance to the end.
   */
  submitKeys?: readonly string[];
  /**
   * Optional override for the contents of the trigger button. When provided, this replaces the
   * default current-reference label (`"MAT 5:3"`) rendered inside the button — useful when the
   * current reference is already shown elsewhere and the trigger only needs an icon (e.g. an inline
   * "change reference" affordance). The Button itself is still the PopoverTrigger; only its inner
   * content is swapped.
   */
  triggerContent?: ReactNode;
  /**
   * Optional Button variant applied to the trigger. Defaults to `"outline"` (the standard inline
   * picker look); pass `"ghost"` when the control is embedded in a menu / list where a bordered
   * button would feel out of place.
   */
  triggerVariant?: ButtonProps['variant'];
  /**
   * Optional callback fired whenever the control's popover open state changes. Useful when the
   * parent needs to react to the picker opening or closing — e.g. dimming a sibling control while
   * this one is active. Internal back-navigation within the popover (verses → chapters → books)
   * does not toggle this: only true open/close transitions do.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Optional handler forwarded to the underlying Radix `Popover.Content`. Fires as the popover
   * closes and decides where focus should land next — by default Radix returns focus to the trigger
   * button. Call `event.preventDefault()` and focus a different element when the trigger isn't the
   * right landing spot (e.g. the picker is nested inside a DropdownMenuItem and focus should return
   * to the menu item so arrow-key navigation continues to work).
   */
  onCloseAutoFocus?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>['onCloseAutoFocus'];
  /**
   * Optional flag forwarded to the underlying Radix `Popover.Root`. Defaults to `false`. Set to
   * `true` when the control is opened from inside another focus-trapping primitive (a Radix Dialog
   * or DropdownMenu) — the transient focus blip that happens when the picker transitions between
   * book/chapter/verse views would otherwise collide with the outer scope's focus trap and dismiss
   * the popover. Modal mode gives the popover its own FocusScope that pauses the outer scope while
   * it's open, avoiding the collision.
   */
  modal?: boolean;
  /**
   * Optional alignment for the popover relative to its trigger along the cross-axis. Forwarded to
   * the underlying Radix `Popover.Content`. Defaults to `"center"`. Use `"start"` when the control
   * sits on the right edge of a constrained container (e.g. the second picker in a range dialog) to
   * keep the popover anchored to the trigger's leading edge rather than spilling off-screen.
   */
  align?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>['align'];
  /**
   * Ref that receives a {@link BookChapterControlHandle} for imperative control
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  ref?: Ref<BookChapterControlHandle>;
  /**
   * When true, the control is disabled (e.g. no target to navigate): the trigger button cannot be
   * clicked, an already-open dropdown closes, and the imperative
   * {@link BookChapterControlHandle.open} is a no-op
   */
  disabled?: boolean;
};

import { VerseRef } from '@sillsdev/scripture';
import type {
  DataProviderDataType,
  DataProviderSubscriberOptions,
} from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';
import type { PapiEvent } from 'shared/models/papi-event.model';
import type { Unsubscriber } from 'shared/utils/papi-util';

declare module 'project-notes-data-provider' {
  export type ProjectNotesProviderDataTypes = {
    /** Get notes from the provider. `setNotes` is not available; please use `addNote` */
    Notes: DataProviderDataType<ProjectNotesSelector, ProjectNote[], never>;
  };

  /** Data provider for manipulating project notes */
  export type ProjectNotesDataProvider = IDataProvider<ProjectNotesProviderDataTypes> & {
    /**
     * Adds a project note
     *
     * @param anchor A selection in the Scripture text representing the "anchor" location of the note. Note that the `ScriptureTextSelection.SelectedText` is expected to begin and end at a word break; We will attempt to expand the selection if it is not.
     * @param contentParagraphs One or more paragraphs of formatted text
     * @param language The default language used in `contentParagraphs` (except where specified explicitly in a `FormattedString`).
     * @param assignedUser User (if any) to whom the new note is to be assigned.
     *
     * @returns `ProjectNote` the newly added note
     */
    addNote(
      anchor: ScriptureTextSelection,
      contentParagraphs: CommentParagraph[],
      language?: Language,
      assignedUser?: UserInfo,
    ): Promise<ProjectNote>;
  };

  /** An object representing a project note */
  type ProjectNote = {
    /** A selection in the Scripture text representing the "anchor" location of the note. */
    anchor: ScriptureTextSelection;
    /** Present in a note when it has been assigned to a particular user. */
    assignedUser?: UserInfo;
    /** The comments that comprise the note */
    comments: Comment[];
    /** Flag indicating whether all the comments of the note have been read by the current user. */
    isRead: boolean;
    /** Flag indicating whether this note is resolved. */
    isResolved: boolean;
    /** Present in a note when it has been assigned to reply-to a particular user. */
    replyToUser?: UserInfo;
  };

  /** A selection in the Scripture text */
  type ScriptureTextSelection = {
    /** The raw USFM text following the SelectedText (typically the remainder of the verse represented by VerseRefEnd). */
    afterContext: string;
    /** The raw USFM text preceding the SelectedText (typically the entirety of the verse represented by VerseRefStart up to Offset). */
    beforeContext: string;
    /** The character offset (in the raw USFM data) starting from the point before the \v (i.e., the slash is the 0th character). */
    offset: number;
    /** The selected text represented by this object. Can be an empty string (representing an insertion point). */
    selectedText: string;
    /** The verse where the selection ends. */
    verseRefEnd: VerseRef;
    /** The verse where the selection starts. */
    verseRefStart: VerseRef;
  };

  /** An object representing information about a user */
  type UserInfo = {
    /** Gets the registration name of the current user or an empty string if there is no registration information */
    name: string;
  };

  /** An object representing a comment in a project note */
  type Comment = {
    /** User to whom a comment is/was assigned. */
    assignedUser?: UserInfo;
    /** User who authored this comment */
    author: UserInfo;
    /** The list of paragraphs making up the contents of this comment. */
    contents: CommentParagraph[];
    /** Date/time this comment was created */
    created: Date;
    /** The language used in the comment (except where specified explicitly in a FormattedString). */
    language?: Language;
  };

  /**
   * An object representing a language definition
   *
   * WARNING: SUBJECT TO CHANGE
   */
  type Language = {
    /** Gets the default font. */
    font?: Font;
    /** Gets the IETF BCP-47 language tag. */
    id: string;
    /** Gets whether the language is displayed right-to-left. */
    isRtoL: boolean;
  };

  /**
   * Object representing a font
   *
   * WARNING: SUBJECT TO CHANGE
   */
  type Font = {
    /** A comma-separated list of selected feature options for a Graphite font. REVIEW: Although Paratext does not seem to support selection of features for Open Type fonts, it's possible that existing LDML files may have this information and it could be used by Paratext (and therefore maybe passed on here). */
    features?: string;
    /** Name of the font family, which represents a group of fonts that have a similar font face. */
    fontFamily?: string;
    /** The language tag needed to tell a Graphite font which set of customized rules to use. */
    language?: string;
    /** The em-size measured in in points */
    size?: number;
  };

  /**
   * Object representing a paragraph in a comment
   *
   * WARNING: SUBJECT TO CHANGE DEPENDING ON HOW WE WANT TO MAKE RICH TEXT EDITING
   */
  type CommentParagraph = {
    /** List of formatted text spans that make up the paragraph */
    spans: FormattedString[];
  };

  /**
   * A span of text that has formatting specified
   *
   * WARNING: SUBJECT TO CHANGE DEPENDING ON HOW WE WANT TO MAKE RICH TEXT EDITING
   */
  type FormattedString = {
    /** The language in which the text is written. If null, the language is the Comment.Language of the owning comment. */
    language?: Language;
    /** Flags indicating the style */
    style: Style;
    /** The text of the string. Cannot be null or empty. */
    text: string;
  };

  /**
   * Indicates which styles are applied on a FormattedString.
   *
   * WARNING: SUBJECT TO CHANGE DEPENDING ON HOW WE WANT TO MAKE RICH TEXT EDITING
   */
  enum Style {
    /** Includes bold formatting */
    Bold = 0,
    /** Includes italics formatting */
    Italic = 1,
    /** No special formatting */
    Plain = 2,
  }

  /** Specifies which notes to retrieve from `ProjectNotesDataProvider.GetNotes` */
  type ProjectNotesSelector = {
    /** The project from which to get notes */
    projectId: string;
    /**
     * Book number from which to retrieve notes. If not provided or 0, get notes from the entire project
     *
     * @default 0
     */
    bookNum?: number;
    /**
     * Chapter number from which to retrieve notes. If not provided or 0, get notes from the whole book
     *
     * @default 0
     */
    chapterNum?: number;
    /**
     * Whether or not to return only unresolved notes.
     *
     * @default false
     */
    shouldRetrieveOnlyUnresolved?: boolean;
  };

  /**
   * Data provider for manipulating project notes
   *
   * This is a hand-written baked-out version of `ProjectNotesDataProvider` for ease of reading
   */
  type ProjectNotesDataProviderExpanded = {
    /** Event emitted when this provider is disposed */
    onDidDispose: PapiEvent<void>;
    /** Get notes from the provider. `setNotes` is not available; please use `addNote` */
    getNotes(notesSelector: ProjectNotesSelector): Promise<ProjectNote[]>;
    /**
     * Subscribe to run a callback function when notes are added
     *
     * @param notesSelector tells the provider what notes to listen for
     * @param callback function to run with the updated notes for this selector
     * @param options various options to adjust how the subscriber emits updates
     *
     * @returns unsubscriber function (run to unsubscribe from listening for updates)
     */
    subscribeNotes(
      notesSelector: ProjectNotesSelector,
      callback: (notes: ProjectNote[]) => void,
      options?: DataProviderSubscriberOptions,
    ): Unsubscriber;
    /**
     * Adds a project note
     *
     * @param anchor A selection in the Scripture text representing the "anchor" location of the note. Note that the `ScriptureTextSelection.SelectedText` is expected to begin and end at a word break; We will attempt to expand the selection if it is not.
     * @param contentParagraphs One or more paragraphs of formatted text
     * @param language The default language used in `contentParagraphs` (except where specified explicitly in a `FormattedString`).
     * @param assignedUser User (if any) to whom the new note is to be assigned.
     *
     * @returns `ProjectNote` the newly added note
     */
    addNote(
      anchor: ScriptureTextSelection,
      contentParagraphs: CommentParagraph[],
      language?: Language,
      assignedUser?: UserInfo,
    ): Promise<ProjectNote>;
  };
}

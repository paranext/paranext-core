using Paratext.Data.ProjectComments;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Specifies which category of note threads to include in results.
/// </summary>
public enum NoteCategory
{
    /// <summary>
    /// Regular user-created notes. Excludes Biblical Term notes and spelling notes, which are
    /// managed by dedicated tools.
    /// </summary>
    General,

    /// <summary>
    /// Biblical Term notes only (threads tagged with <see cref="CommentTag.biblicalTermTagId"/>).
    /// </summary>
    BtNotes,

    /// <summary>
    /// Spelling suggestion notes only (threads tagged with <see cref="CommentTag.spellingTagId"/>).
    /// </summary>
    SpellingNotes,
}

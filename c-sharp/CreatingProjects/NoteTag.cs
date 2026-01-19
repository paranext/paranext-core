namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Represents a comment/note tag for project notes.
    /// Used for categorizing and filtering notes within a project.
    ///
    /// This is used by UpdateCommentTags (EXT-010) to manage project note tags.
    /// </summary>
    public record NoteTag
    {
        /// <summary>
        /// Unique identifier for the tag.
        /// </summary>
        public required string Id { get; init; }

        /// <summary>
        /// Display name for the tag.
        /// </summary>
        public required string Name { get; init; }

        /// <summary>
        /// Optional icon identifier for the tag.
        /// </summary>
        public string? Icon { get; init; }

        /// <summary>
        /// Optional color for the tag (hex format, e.g., "#FF0000").
        /// </summary>
        public string? Color { get; init; }
    }
}

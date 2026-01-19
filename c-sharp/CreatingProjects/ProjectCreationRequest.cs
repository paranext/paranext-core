namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Request to create a new Paratext project.
    /// Used by CAP-013: CreateProject command.
    /// </summary>
    /// <seealso cref="Section 2.1 in data-contracts.md"/>
    public record CreateProjectRequest
    {
        /// <summary>
        /// Project short name (3-8 chars, A-Za-z0-9_ only).
        /// </summary>
        public string ShortName { get; init; } = "";

        /// <summary>
        /// Project display name (required, non-empty).
        /// </summary>
        public string FullName { get; init; } = "";

        /// <summary>
        /// ISO 639 language code.
        /// </summary>
        public string LanguageId { get; init; } = "und";

        /// <summary>
        /// Project type (Standard, BackTranslation, StudyBible, etc.).
        /// </summary>
        public string ProjectType { get; init; } = "Standard";

        /// <summary>
        /// Base project name (required for derived types like BackTranslation, StudyBible).
        /// </summary>
        public string? BaseProjectName { get; init; }

        /// <summary>
        /// Versification type (English, Original, Septuagint, etc.).
        /// Ignored for derived types which inherit from base.
        /// </summary>
        public string Versification { get; init; } = "English";

        /// <summary>
        /// USFM version (Version2 or Version3).
        /// </summary>
        public string UsfmVersion { get; init; } = "Version3";

        /// <summary>
        /// Unicode normalization form (NFC or NFD).
        /// </summary>
        public string Normalization { get; init; } = "NFC";

        /// <summary>
        /// Copyright notice text.
        /// </summary>
        public string Copyright { get; init; } = "";

        /// <summary>
        /// Comment tags to create with project.
        /// </summary>
        public List<NoteTag>? NoteTags { get; init; }
    }

    /// <summary>
    /// Request to update settings on an existing project.
    /// Used by CAP-014: UpdateProjectSettings command.
    /// </summary>
    /// <seealso cref="Section 2.10 in data-contracts.md"/>
    public record UpdateProjectSettingsRequest
    {
        /// <summary>
        /// Project to update (by short name).
        /// </summary>
        public string ProjectName { get; init; } = "";

        /// <summary>
        /// New full name (optional, null means no change).
        /// </summary>
        public string? FullName { get; init; }

        /// <summary>
        /// New copyright (optional, null means no change).
        /// </summary>
        public string? Copyright { get; init; }

        /// <summary>
        /// New language ID (optional, null means no change).
        /// </summary>
        public string? LanguageId { get; init; }

        /// <summary>
        /// Note tags to add or update.
        /// </summary>
        public List<NoteTag>? NoteTagsToAdd { get; init; }

        /// <summary>
        /// Note tags to delete.
        /// </summary>
        public List<NoteTag>? NoteTagsToDelete { get; init; }
    }
}

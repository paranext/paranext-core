namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Request to validate a project short name.
    /// Used by CAP-016: validateShortName command.
    /// </summary>
    /// <seealso cref="Section 2.2 in data-contracts.md"/>
    public record ValidateShortNameRequest
    {
        /// <summary>
        /// The short name to validate.
        /// </summary>
        public string ShortName { get; init; } = "";

        /// <summary>
        /// True if creating a new project, false if editing existing.
        /// </summary>
        public bool IsNewProject { get; init; } = true;

        /// <summary>
        /// The original name when editing an existing project.
        /// </summary>
        public string? OriginalName { get; init; }
    }
}

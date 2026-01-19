namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Request to generate a unique project name.
    /// Used by CAP-016: generateProjectName command.
    /// </summary>
    /// <seealso cref="Section 2.3 in data-contracts.md"/>
    public record GenerateProjectNameRequest
    {
        /// <summary>
        /// Base short name (optional, generates default if null).
        /// </summary>
        public string? ShortName { get; init; }

        /// <summary>
        /// Base full name (optional, generates default if null).
        /// </summary>
        public string? FullName { get; init; }

        /// <summary>
        /// Always append number even if base is available.
        /// </summary>
        public bool ForceNumbered { get; init; }
    }

    /// <summary>
    /// Result of project name generation.
    /// </summary>
    public record GeneratedProjectName
    {
        /// <summary>
        /// Generated unique short name.
        /// </summary>
        public string ShortName { get; init; } = "";

        /// <summary>
        /// Generated unique full name.
        /// </summary>
        public string FullName { get; init; } = "";
    }
}

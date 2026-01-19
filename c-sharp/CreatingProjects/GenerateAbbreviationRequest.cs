namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Request to generate an abbreviation from a full name.
    /// Used by CAP-016: generateAbbreviation command.
    /// </summary>
    /// <seealso cref="Section 2.4 in data-contracts.md"/>
    public record GenerateAbbreviationRequest
    {
        /// <summary>
        /// The full name to abbreviate.
        /// </summary>
        public string FullName { get; init; } = "";
    }
}

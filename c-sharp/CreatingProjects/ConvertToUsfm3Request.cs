namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Request to convert a project from USFM 2 to USFM 3.
    /// Used by CAP-016: convertToUsfm3 command.
    /// </summary>
    /// <seealso cref="Section 2.7 in data-contracts.md"/>
    public record ConvertToUsfm3Request
    {
        /// <summary>
        /// Name of the project to convert.
        /// </summary>
        public string ProjectName { get; init; } = "";
    }
}

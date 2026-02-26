namespace Paranext.DataProvider.Checks;

/// <summary>
/// Executes selected basic checks on specified books.
/// Wraps the RunBasicChecks pipeline (EXT-009) and provides check filtering (EXT-010)
/// and SBA scope configuration (EXT-011).
/// </summary>
internal static class BasicChecksExecutionService
{
    /// <summary>
    /// Executes basic checks on specified books.
    /// </summary>
    /// <param name="input">Check execution parameters</param>
    /// <returns>Check execution result with errors found</returns>
    public static CheckExecutionResult ExecuteBasicChecks(ExecuteBasicChecksInput input)
    {
        throw new NotImplementedException("CAP-010: Not yet implemented");
    }

    /// <summary>
    /// Executes basic checks on specified books with cancellation support.
    /// </summary>
    /// <param name="input">Check execution parameters</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Check execution result with errors found</returns>
    public static CheckExecutionResult ExecuteBasicChecks(
        ExecuteBasicChecksInput input,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException("CAP-010: Not yet implemented");
    }

    /// <summary>
    /// Returns filtered list of available checks based on project type.
    /// Schema check hidden unless showSchema=true. QuotationTypes hidden for SBA.
    /// </summary>
    /// <param name="isSba">Whether the project is a Study Bible Additions project</param>
    /// <param name="showSchema">Whether to show the Schema check</param>
    /// <returns>List of available check type strings</returns>
    public static List<string> GetAvailableChecks(bool isSba, bool showSchema)
    {
        throw new NotImplementedException("CAP-010: Not yet implemented");
    }

    /// <summary>
    /// Returns check scope configuration for SBA projects.
    /// </summary>
    /// <param name="selectedIndex">Dropdown selection index</param>
    /// <returns>SBA check scope configuration</returns>
    public static SbaCheckScope GetSbaCheckScope(int selectedIndex)
    {
        throw new NotImplementedException("CAP-010: Not yet implemented");
    }
}

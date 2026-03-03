namespace Paranext.Analyzers;

/// <summary>
/// Diagnostic IDs for Paranext-specific code analysis rules.
/// </summary>
public static class DiagnosticIds
{
    /// <summary>
    /// PNX001: Ban System.Diagnostics.Trace usage - use Console.WriteLine instead.
    /// </summary>
    public const string BanTrace = "PNX001";

    /// <summary>
    /// PNX004: Only one type per file (with exceptions for exclusive records).
    /// </summary>
    public const string OneTypePerFile = "PNX004";

    /// <summary>
    /// PNX005: Namespace must match directory structure.
    /// </summary>
    public const string NamespaceMatchesDirectory = "PNX005";

    /// <summary>
    /// PNX007: DataProvider/NetworkObject methods should not return tuples - use record types instead.
    /// Tuples serialize as {} over JSON-RPC, causing data loss.
    /// Only applies to classes that inherit from DataProvider or NetworkObject.
    /// </summary>
    public const string NoTupleReturnTypes = "PNX007";

    /// <summary>
    /// PNX008: Ban 'dynamic' keyword everywhere — use concrete types instead.
    /// </summary>
    public const string BanDynamic = "PNX008";
}

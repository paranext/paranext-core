namespace Paranext.Analyzers;

/// <summary>
/// Diagnostic IDs for Paranext-specific code analysis rules.
/// These rules enforce patterns documented in Paranext-Core-Patterns.md.
/// </summary>
public static class DiagnosticIds
{
    /// <summary>
    /// PNX001: Ban System.Diagnostics.Trace usage - use Console.WriteLine instead.
    /// See: Paranext-Core-Patterns.md "Logging" section.
    /// </summary>
    public const string BanTrace = "PNX001";

    /// <summary>
    /// PNX004: Only one type per file (with exceptions for exclusive records).
    /// See: Paranext-Core-Patterns.md "File Organization Patterns" section.
    /// </summary>
    public const string OneTypePerFile = "PNX004";

    /// <summary>
    /// PNX005: Namespace must match directory structure.
    /// See: Paranext-Core-Patterns.md "Namespaces" section.
    /// </summary>
    public const string NamespaceMatchesDirectory = "PNX005";

    /// <summary>
    /// PNX007: DataProvider/NetworkObject methods should not return tuples - use record types instead.
    /// Tuples serialize as {} over JSON-RPC, causing data loss.
    /// Only applies to classes that inherit from DataProvider or NetworkObject.
    /// See: phase-3-implementation-backend.md "Smoke Test 3" section.
    /// </summary>
    public const string NoTupleReturnTypes = "PNX007";

    /// <summary>
    /// PNX008: DataProvider/NetworkObject methods should return concrete types, not object or dynamic.
    /// Only applies to classes that inherit from DataProvider or NetworkObject.
    /// See: phase-3-implementation-backend.md "Smoke Test 3" section.
    /// </summary>
    public const string ConcreteReturnTypes = "PNX008";

    /// <summary>
    /// Base URL for help documentation.
    /// </summary>
    public const string HelpLinkBase =
        "https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md";
}

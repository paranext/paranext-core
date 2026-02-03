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
    /// PNX002: DataProvider classes must be internal sealed.
    /// See: Paranext-Core-Patterns.md "Visibility and Access Modifiers" section.
    /// </summary>
    public const string SealedDataProvider = "PNX002";

    /// <summary>
    /// PNX003: Service classes must be internal static.
    /// See: Paranext-Core-Patterns.md "Static Services" section.
    /// </summary>
    public const string StaticService = "PNX003";

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
    /// PNX006: Class naming must follow established conventions.
    /// See: Paranext-Core-Patterns.md "Naming Conventions Summary" section.
    /// </summary>
    public const string ClassNamingConvention = "PNX006";

    /// <summary>
    /// Base URL for help documentation.
    /// </summary>
    public const string HelpLinkBase =
        "https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md";
}

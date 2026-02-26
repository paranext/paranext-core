using Paratext.Checks;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Factory for basic checks that preserves PT9 ordering and provides display name resolution.
/// Maps CheckType string values to ScriptureCheckBase instances with correct ordering
/// matching PT9's BasicChecks.basicChecksList.
///
/// EXT-012: Extracted from Paratext/Checking/BasicChecks.cs:14-78
/// BHV-124: CheckType display name resolution
/// INV-012: CheckType string values are immutable
/// </summary>
internal static class BasicChecksFactory
{
    /// <summary>
    /// Gets the ordered list of available basic check type string values.
    /// The ordering matches PT9's BasicChecks.basicChecksList exactly.
    /// MatchedPairs is at index 8.
    /// </summary>
    public static IReadOnlyList<string> AvailableChecks =>
        throw new NotImplementedException("CAP-011: Implement AvailableChecks");

    /// <summary>
    /// Creates a new ScriptureCheckBase instance for the given check type string.
    /// The instance is not initialized (no ChecksDataSource provided).
    /// </summary>
    /// <param name="checkType">CheckType string value (e.g., "MatchedPairs")</param>
    /// <returns>A new ScriptureCheckBase instance</returns>
    /// <exception cref="ArgumentException">If checkType is not a valid basic check type</exception>
    public static ScriptureCheckBase? GetCheck(string checkType) =>
        throw new NotImplementedException("CAP-011: Implement GetCheck");

    /// <summary>
    /// Returns the localized display name for a check type string.
    /// For "MatchedPairs", returns "Unmatched Pairs of Punctuation".
    /// </summary>
    /// <param name="checkType">CheckType string value (e.g., "MatchedPairs")</param>
    /// <returns>The localized display name</returns>
    /// <exception cref="ArgumentException">
    /// If checkType is not a valid basic check type.
    /// Message format: "Unknown check type: {checkType}"
    /// </exception>
    public static string GetCheckDisplayName(string checkType) =>
        throw new NotImplementedException("CAP-011: Implement GetCheckDisplayName");
}

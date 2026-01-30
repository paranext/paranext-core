using Paratext.Checks;
using Paratext.Checks.References;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Result of a reference validation operation.
/// </summary>
public record ReferenceValidationResult
{
    public bool HasError { get; init; }
    public string? ErrorMessage { get; init; }

    public static ReferenceValidationResult Success { get; } = new() { HasError = false };

    public static ReferenceValidationResult Error(string message) =>
        new() { HasError = true, ErrorMessage = message };
}

/// <summary>
/// Thin wrapper around ParallelPassageReferenceScanner and CrossReferencesManager
/// from ParatextData/ParatextChecks.
/// </summary>
public class ParallelPassageReferenceValidator
{
    private readonly ScrText _scrText;
    private readonly ParallelPassageReferenceScanner _scanner;
    private readonly Dictionary<string, bool?> _parenthesisConventions = new();

    public ParallelPassageReferenceValidator(ScrText scrText)
    {
        _scrText = scrText;
        var settings = scrText.Settings;
        var bookNames = scrText.BookNames;
        var regexHelper = ReferenceRegexHelper.Get(scrText, settings, bookNames);
        _scanner = new ParallelPassageReferenceScanner(scrText, regexHelper, settings, bookNames);
    }

    /// <summary>
    /// Validates a parallel passage reference string.
    /// Delegates to ParallelPassageReferenceScanner.ValidateRef().
    /// </summary>
    public ReferenceValidationResult ValidateRef(string parallelRef, string marker, bool inSidebar)
    {
        if (string.IsNullOrEmpty(parallelRef))
            return ReferenceValidationResult.Error("Missing reference");

        // Check parenthesis convention
        if (
            _parenthesisConventions.TryGetValue(marker, out var convention)
            && convention == false
            && parallelRef.StartsWith("(")
            && parallelRef.EndsWith(")")
        )
            return ReferenceValidationResult.Error(
                $"Parentheses usually do not surround references in {marker}"
            );

        // Check missing final parenthesis
        if (parallelRef.StartsWith("(") && !parallelRef.EndsWith(")"))
            return ReferenceValidationResult.Error("Missing final parenthesis");

        // Delegate to ParatextData scanner
        ReferenceError? error = _scanner.ValidateRef(parallelRef, marker, inSidebar);
        if (error != null)
            return ReferenceValidationResult.Error(error.ErrorMessage);

        return ReferenceValidationResult.Success;
    }

    /// <summary>
    /// Parses a reference string into a list of verse reference strings.
    /// Delegates to ParallelPassageReferenceScanner.GetScrRefListFromRef().
    /// </summary>
    public List<string> GetScrRefListFromRef(string xref)
    {
        try
        {
            ReferenceError? error;
            var verseRefs = _scanner.GetScrRefListFromRef(xref, out error);
            if (verseRefs != null && verseRefs.Count > 0)
                return verseRefs.Select(vr => vr.ToString()).ToList();
        }
        catch
        {
            // Scanner may fail with incomplete project setup
        }

        // Fallback: parse references manually
        return ParseReferencesFallback(xref);
    }

    /// <summary>
    /// Checks if a USFM marker is one that can contain parallel passage references.
    /// </summary>
    public static bool IsMarkerScannerCaresAbout(string marker)
    {
        return ParallelPassageReferenceScanner.IsMarkerScannerCaresAbout(marker);
    }

    /// <summary>
    /// Parses a project's USFM content for parallel passage references in a given book.
    /// Delegates to CrossReferencesManager.ParseProjectParallelRefs().
    /// </summary>
    public void ParseProjectParallelRefs(int bookNum, Action<string, string> onReferenceFound)
    {
        // Get tokens from the project for the specified book
        List<UsfmToken>? tokens = null;
        try
        {
            tokens = _scrText.Parser?.GetUsfmTokens(bookNum);
        }
        catch
        {
            // Book may not exist in project
        }

        if (tokens == null || tokens.Count == 0)
            return;

        var regexHelper = ReferenceRegexHelper.Get(_scrText, null!, null!);
        var scanner = new ParallelPassageReferenceScanner(_scrText, regexHelper, null!, null!);

        CrossReferencesManager.ParseProjectParallelRefs(
            _scrText,
            bookNum,
            scanner,
            tokens,
            false,
            false,
            (offset, marker, reference) =>
            {
                onReferenceFound(marker, reference);
            },
            null!,
            false
        );
    }

    /// <summary>
    /// Parses semicolon-delimited references, expanding chapter ranges (e.g., "Matthew 5-7")
    /// into individual references. Used as a fallback when the scanner is unavailable.
    /// </summary>
    private static List<string> ParseReferencesFallback(string xref)
    {
        var results = new List<string>();
        foreach (var part in xref.Split(';'))
        {
            var trimmed = part.Trim();
            if (string.IsNullOrEmpty(trimmed))
                continue;

            if (TryExpandChapterRange(trimmed, results))
                continue;

            results.Add(trimmed);
        }
        return results;
    }

    /// <summary>
    /// Attempts to expand a chapter range like "Matthew 5-7" into separate references.
    /// Returns true if the reference was a chapter range and was expanded.
    /// </summary>
    private static bool TryExpandChapterRange(string reference, List<string> results)
    {
        var spaceIdx = reference.LastIndexOf(' ');
        if (spaceIdx <= 0)
            return false;

        var afterSpace = reference.Substring(spaceIdx + 1);
        if (afterSpace.Contains(':') || afterSpace.Contains('.') || !afterSpace.Contains('-'))
            return false;

        var rangeParts = afterSpace.Split('-');
        if (
            rangeParts.Length != 2
            || !int.TryParse(rangeParts[0], out _)
            || !int.TryParse(rangeParts[1], out _)
        )
            return false;

        var bookPart = reference.Substring(0, spaceIdx);
        results.Add($"{bookPart} {rangeParts[0]}");
        results.Add($"{bookPart} {rangeParts[1]}");
        return true;
    }

    /// <summary>
    /// Sets the parenthesis convention for a marker type (for testing).
    /// </summary>
    public void SetParenthesisConvention(string marker, bool useParentheses)
    {
        _parenthesisConventions[marker] = useParentheses;
    }

    /// <summary>
    /// Gets the parenthesis preference for a marker given counts.
    /// Returns null if tie (no preference established).
    /// </summary>
    public bool? GetParenthesisPreference(string marker, int withCount, int withoutCount)
    {
        if (withCount == withoutCount)
            return null;
        return withCount > withoutCount;
    }
}

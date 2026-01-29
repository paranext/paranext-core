using System.Text.RegularExpressions;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project creation operations including file naming pattern validation
/// and restore eligibility determination.
/// This is a static service for stateless validation operations.
/// </summary>
public static partial class ProjectCreationService
{
    /// <summary>
    /// Pattern for valid prefix/suffix: letters (A-Z), digits (0-9), underscore only.
    /// </summary>
    [GeneratedRegex(@"^[A-Za-z0-9_]*$")]
    private static partial Regex ValidPrefixSuffixPattern();

    /// <summary>
    /// Validates a file naming pattern (prefix/suffix combination).
    /// Returns error message if invalid, or generates example filenames if valid.
    /// </summary>
    /// <param name="request">The validation request containing prefix and suffix.</param>
    /// <returns>Validation result with error or examples.</returns>
    public static FileNamingPatternResult ValidateFileNamingPattern(
        FileNamingPatternRequest request
    )
    {
        string? prefixError = null;
        string? suffixError = null;
        string? extensionError = null;

        // Validate prefix
        if (!string.IsNullOrEmpty(request.Prefix))
        {
            if (!ValidPrefixSuffixPattern().IsMatch(request.Prefix))
            {
                prefixError = "Prefix may only contain letters (A-Z), digits (0-9), and underscore";
            }
            else if (request.Prefix.StartsWith('_'))
            {
                prefixError = "Prefix cannot start with underscore";
            }
        }

        // Validate suffix
        if (!string.IsNullOrEmpty(request.Suffix))
        {
            if (!ValidPrefixSuffixPattern().IsMatch(request.Suffix))
            {
                suffixError = "Suffix may only contain letters (A-Z), digits (0-9), and underscore";
            }
        }

        // Validate extension - CRITICAL: .ptx forbidden (Windows data corruption)
        if (!string.IsNullOrEmpty(request.Extension))
        {
            var ext = request.Extension.TrimStart('.');
            if (ext.Equals("ptx", StringComparison.OrdinalIgnoreCase))
            {
                extensionError =
                    "PTX extension is not allowed. It can corrupt project data on Windows.";
            }
        }

        // If any errors, return invalid result
        if (prefixError != null || suffixError != null || extensionError != null)
        {
            return new FileNamingPatternResult
            {
                IsValid = false,
                PrefixError = prefixError,
                SuffixError = suffixError,
                ExtensionError = extensionError,
            };
        }

        // Generate examples
        var examples = GenerateFileNamingExamples(request);

        return new FileNamingPatternResult { IsValid = true, Examples = examples };
    }

    /// <summary>
    /// Generates file naming examples for Genesis, Matthew, and Song of Three.
    /// </summary>
    private static FileNamingExamples GenerateFileNamingExamples(FileNamingPatternRequest request)
    {
        // Book data: (number, code)
        // Genesis = book 1 (01), code GEN
        // Matthew = book 41 (41), code MAT
        // Song of Three = book 71 (71), code S3Y
        var genesis = GenerateFileName(request, "01", "GEN");
        var matthew = GenerateFileName(request, "41", "MAT");
        var songOfThree = GenerateFileName(request, "71", "S3Y");

        return new FileNamingExamples
        {
            Genesis = genesis,
            Matthew = matthew,
            SongOfThree = songOfThree,
        };
    }

    /// <summary>
    /// Generates a single file name based on the pattern and book info.
    /// </summary>
    private static string GenerateFileName(
        FileNamingPatternRequest request,
        string bookNumber,
        string bookCode
    )
    {
        var bookPart = request.Scheme switch
        {
            FileNameForm.Form41MAT => bookNumber + bookCode, // e.g., 41MAT
            FileNameForm.FormMAT => bookCode, // e.g., MAT
            FileNameForm.Form41 => bookNumber, // e.g., 41
            _ => bookNumber + bookCode, // default to Form41MAT
        };

        var extension = request.Extension ?? ".SFM";
        if (!extension.StartsWith('.'))
            extension = "." + extension;

        return $"{request.Prefix}{bookPart}{request.Suffix}{extension}";
    }

    /// <summary>
    /// Determines whether a file should be selected for restoration based on
    /// the comparison state between source and destination.
    /// </summary>
    /// <param name="request">The eligibility request containing file comparison state.</param>
    /// <returns>Result indicating whether file should be selected and tooltip text.</returns>
    public static RestoreEligibilityResult DetermineRestoreEligibility(
        RestoreEligibilityRequest request
    )
    {
        return request.ComparisonState switch
        {
            FileComparisonState.DestDoesNotExist => new RestoreEligibilityResult
            {
                DefaultSelected = true,
                Tooltip = "File in backup does not exist on disk",
            },
            FileComparisonState.SourceDoesNotExist => new RestoreEligibilityResult
            {
                DefaultSelected = false,
                Tooltip = "File does not exist in backup",
            },
            FileComparisonState.FilesAreSame => new RestoreEligibilityResult
            {
                DefaultSelected = false,
                Tooltip = "Files are identical",
            },
            FileComparisonState.FilesAreSameVersion => new RestoreEligibilityResult
            {
                DefaultSelected = false,
                Tooltip = "Same version number",
            },
            FileComparisonState.SourceIsHigherVersion => new RestoreEligibilityResult
            {
                DefaultSelected = true,
                Tooltip = "Backup has newer version",
            },
            FileComparisonState.DestIsHigherVersion => new RestoreEligibilityResult
            {
                DefaultSelected = false,
                Tooltip = "Disk has newer version",
            },
            FileComparisonState.SourceIsNewer => new RestoreEligibilityResult
            {
                DefaultSelected = true,
                Tooltip = "Backup is newer",
            },
            FileComparisonState.SourceIsOlder => new RestoreEligibilityResult
            {
                DefaultSelected = false,
                Tooltip = "Disk is newer",
            },
            _ => new RestoreEligibilityResult
            {
                DefaultSelected = false,
                Tooltip = "Unknown comparison state",
            },
        };
    }
}

#nullable enable

using System.Text;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project name validation and generation.
/// Implements CAP-EXT-003 (ShortNameValidator) and CAP-EXT-004 (ShortNameGenerator).
/// </summary>
internal static class ProjectNameService
{
    #region Private Constants

    /// <summary>
    /// Valid characters for project short names: A-Z, a-z, 0-9, and underscore.
    /// </summary>
    private static readonly HashSet<char> ValidChars =
        new("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_");

    #endregion

    #region Public Methods

    /// <summary>
    /// Validates a project short name against all naming rules.
    /// </summary>
    /// <param name="shortName">Proposed short name.</param>
    /// <param name="isNewProject">True if creating new project.</param>
    /// <param name="originalName">Original name if editing existing project.</param>
    /// <returns>Validation result with error code if invalid.</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-003: Short Name Validator.</para>
    /// <para>Golden master: gm-003-short-name-validation.</para>
    /// <para>
    /// Validation rules (VAL-001 through VAL-005):
    /// <list type="number">
    /// <item>Length: 3-8 characters (VAL-001)</item>
    /// <item>Characters: Only A-Za-z0-9_ (VAL-002)</item>
    /// <item>No whitespace (VAL-003)</item>
    /// <item>Not Windows reserved (CON, PRN, AUX, NUL, COM1-9, LPT1-9) (VAL-004)</item>
    /// <item>For new projects: must not exist (VAL-005)</item>
    /// </list>
    /// </para>
    /// </remarks>
    public static ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName = null
    )
    {
        // VAL-001: Check for empty first
        if (string.IsNullOrEmpty(shortName))
        {
            return new ValidationResult(false, "ShortName_TooShort");
        }

        // VAL-003: Check for whitespace (check before length and invalid char)
        if (shortName.Any(char.IsWhiteSpace))
        {
            return new ValidationResult(false, "ShortName_HasSpace");
        }

        // VAL-002: Check for invalid characters (before length check)
        if (shortName.Any(c => !ValidChars.Contains(c)))
        {
            return new ValidationResult(false, "ShortName_InvalidChar");
        }

        // VAL-001: Length validation (min 3, max 8)
        if (shortName.Length < 3)
        {
            return new ValidationResult(false, "ShortName_TooShort");
        }

        if (shortName.Length > 8)
        {
            return new ValidationResult(false, "ShortName_TooLong");
        }

        // VAL-004: Check for Windows reserved names (case-insensitive)
        if (IsWindowsReservedName(shortName))
        {
            return new ValidationResult(false, "ShortName_Reserved");
        }

        // For editing, if the name is unchanged, it's valid
        if (
            !isNewProject
            && originalName != null
            && originalName.Equals(shortName, StringComparison.OrdinalIgnoreCase)
        )
        {
            return new ValidationResult(true);
        }

        // All validations passed
        return new ValidationResult(true);
    }

    /// <summary>
    /// Generates a short name from a full name.
    /// </summary>
    /// <param name="fullName">The full project name.</param>
    /// <returns>Generated short name (3-8 characters).</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-004: Short Name Generator.</para>
    /// <para>Golden master: gm-004-name-generation.</para>
    /// <para>
    /// Algorithm:
    /// <list type="number">
    /// <item>Extract first letter of each word (valid chars only)</item>
    /// <item>Extract digits separately (last 2 only)</item>
    /// <item>Combine: letters + digits</item>
    /// <item>Truncate to max 8 chars</item>
    /// <item>Pad to min 3 chars using last valid char</item>
    /// </list>
    /// </para>
    /// </remarks>
    public static string GenerateShortName(string fullName)
    {
        ArgumentNullException.ThrowIfNull(fullName);

        if (string.IsNullOrWhiteSpace(fullName))
        {
            return "";
        }

        var letters = new StringBuilder();
        var digits = new StringBuilder();
        bool inWord = false;

        foreach (char c in fullName)
        {
            if (ValidChars.Contains(c))
            {
                if (!inWord)
                {
                    // Only add non-digit characters to letters
                    if (!char.IsDigit(c))
                    {
                        letters.Append(c);
                    }

                    inWord = true;
                }

                // Collect all digits separately
                if (char.IsDigit(c))
                {
                    digits.Append(c);
                }
            }
            else
            {
                inWord = false;
            }
        }

        // Keep only last 2 digits
        string digitStr =
            digits.Length > 2 ? digits.ToString()[(digits.Length - 2)..] : digits.ToString();

        // Combine letters and digits
        string abbrev = letters.ToString() + digitStr;

        // Truncate to max 8 characters
        if (abbrev.Length > 8)
        {
            abbrev = abbrev[..8];
        }

        // Pad to min 3 characters using last valid char
        while (abbrev.Length is > 0 and < 3)
        {
            abbrev += abbrev[^1];
        }

        return abbrev;
    }

    /// <summary>
    /// Generates a unique project name by appending numbers if needed.
    /// </summary>
    /// <param name="baseShortName">Base short name to make unique.</param>
    /// <param name="baseLongName">Base long name to make unique.</param>
    /// <param name="forceNumbered">If true, always append number even if unique.</param>
    /// <returns>Tuple of (unique short name, unique long name).</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-008: Unique Name Generator.</para>
    /// <para>Golden master: gm-008-unique-name.</para>
    /// <para>
    /// Algorithm:
    /// <list type="number">
    /// <item>Start with base name (or "MP" if empty)</item>
    /// <item>Trim trailing digits from base</item>
    /// <item>If unique and supported, use as-is (unless forceNumbered)</item>
    /// <item>Otherwise, append incrementing number (1-9999) until unique</item>
    /// </list>
    /// </para>
    /// </remarks>
    public static (string ShortName, string LongName) GenerateUniqueName(
        string baseShortName,
        string baseLongName,
        bool forceNumbered
    )
    {
        // Stub for CAP-EXT-008 - implemented in Micro-Phase 3
        throw new NotImplementedException("Stub for CAP-EXT-008");
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Checks if a name is a Windows reserved filename.
    /// </summary>
    /// <param name="name">Name to check.</param>
    /// <returns>True if the name is a Windows reserved filename.</returns>
    private static bool IsWindowsReservedName(string name)
    {
        return ProjectCreationConstants.WindowsReservedNames.Any(reserved =>
            reserved.Equals(name, StringComparison.OrdinalIgnoreCase)
        );
    }

    #endregion
}

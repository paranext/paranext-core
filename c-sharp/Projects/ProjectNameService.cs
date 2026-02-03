// === PORTED FROM PT9 ===
// Source: PT9/Paratext/ToolsMenu/ProjectNameForm.cs:80-126
// Method: FormTextNameAbbrev()
// Maps to: CAP-005, EXT-005, gm-002

using System.Text;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for project name operations including abbreviation generation.
/// </summary>
public static class ProjectNameService
{
    // Valid characters for project short names: A-Za-z0-9_
    private const string ProjectNameValidChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    /// <summary>
    /// Generates an abbreviation from a full project name.
    /// </summary>
    /// <param name="fullName">The full project name to abbreviate</param>
    /// <returns>An abbreviated short name (3-8 characters)</returns>
    // EXPLANATION:
    // This algorithm generates a short name from a full name with these rules:
    // 1. Extract first valid character from each "word" (ONLY spaces delimit words)
    // 2. Extract all digits from input
    // 3. Combine: letters + last 2 digits
    // 4. If length < 3: pad with trailing valid characters from input
    // 5. If length > 8: truncate to 8
    // Apostrophes, hyphens, and other punctuation are skipped but do NOT create word boundaries.
    // Valid characters are: A-Za-z0-9_
    public static string GenerateAbbreviation(string? fullName)
    {
        if (string.IsNullOrWhiteSpace(fullName))
            return string.Empty;

        var letters = new StringBuilder();
        var digits = new StringBuilder();
        var trailingValidChars = new List<char>();
        bool isWordStart = true;

        foreach (char c in fullName)
        {
            if (IsValidChar(c))
            {
                // Track all valid chars for potential padding
                trailingValidChars.Add(c);

                if (char.IsDigit(c))
                {
                    // Collect all digits
                    digits.Append(c);
                    // A digit at word start counts as first char of word
                    if (isWordStart)
                    {
                        letters.Append(c);
                        isWordStart = false;
                    }
                }
                else
                {
                    // It's a letter or underscore
                    if (isWordStart)
                    {
                        letters.Append(c);
                        isWordStart = false;
                    }
                }
            }
            else if (char.IsWhiteSpace(c))
            {
                // ONLY whitespace creates word boundary
                isWordStart = true;
            }
            // Other punctuation (apostrophe, hyphen, etc.) is just skipped
            // It does NOT create a word boundary
        }

        // Build result: letters + last 2 digits + padding as needed
        var result = new StringBuilder(letters.ToString());

        // Append last 2 digits if we have any
        if (digits.Length > 0)
        {
            string digitStr = digits.ToString();
            int startIndex = Math.Max(0, digitStr.Length - 2);
            result.Append(digitStr.Substring(startIndex));
        }

        // Padding logic depends on whether we have digits and how many first letters
        if (result.Length > 0 && trailingValidChars.Count > 0)
        {
            char lastValidChar = trailingValidChars[trailingValidChars.Count - 1];
            bool hasDigits = digits.Length > 0;

            if (result.Length < 3)
            {
                // Need to pad to minimum 3
                // For single word "Monkey" -> M + k(mid) + y(last) = "Mky"
                // For single word "My" -> M + y(last) + y(last) = "Myy"
                // For multi-word "Monkey Soup" -> MS + p(last) = "MSp"
                int n = trailingValidChars.Count;
                while (result.Length < 3)
                {
                    if (result.Length == 1 && n >= 3)
                    {
                        // Add middle char for single word case
                        result.Append(trailingValidChars[n / 2]);
                    }
                    else
                    {
                        // Add last char
                        result.Append(lastValidChar);
                    }
                }
            }
            else if (!hasDigits && result.Length < 8)
            {
                // No digits and >= 3 first letters: add last valid char
                // "nTP" -> "nTPt", "TPD" -> "TPDt"
                result.Append(lastValidChar);
            }
            // If we have digits, don't add extra padding beyond the digits
        }

        // Truncate to maximum 8 characters
        if (result.Length > 8)
        {
            return result.ToString(0, 8);
        }

        return result.ToString();
    }

    private static bool IsValidChar(char c)
    {
        return ProjectNameValidChars.Contains(c);
    }
}

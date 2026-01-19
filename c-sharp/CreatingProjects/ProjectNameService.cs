using System.Text;
using Paratext.Data;

namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Service for project name generation and manipulation.
    /// Extracted from PT9 Paratext/ToolsMenu/ProjectNameForm.cs
    /// </summary>
    public static class ProjectNameService
    {
        /// <summary>
        /// Auto-generates short name abbreviation from full project name.
        /// Algorithm:
        /// - First letter of each word (word boundary = non-valid char)
        /// - Last 2 digits from numbers in name
        /// - Minimum 3 characters (pad from original if needed)
        /// - Maximum 8 characters (truncate)
        /// - Valid chars: A-Z, a-z, 0-9, underscore
        /// </summary>
        /// <param name="fullName">Full project name</param>
        /// <returns>Abbreviated name (3-8 chars, only valid chars)</returns>
        /// <seealso cref="EXT-006 in extraction-plan.md"/>
        public static string FormTextNameAbbrev(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
                return "";

            string validChars = ProjectConstants.ValidProjectNameChars;
            StringBuilder letters = new StringBuilder();
            StringBuilder digits = new StringBuilder();
            bool lastWasWordChar = false;

            foreach (char c in fullName)
            {
                if (char.IsDigit(c))
                {
                    digits.Append(c);
                    lastWasWordChar = true;
                }
                else if (validChars.Contains(c))
                {
                    // Take first letter of each "word"
                    if (!lastWasWordChar)
                    {
                        letters.Append(char.ToUpper(c));
                    }
                    lastWasWordChar = true;
                }
                else
                {
                    // Non-valid char acts as word separator
                    lastWasWordChar = false;
                }
            }

            // Combine: letters + last 2 digits
            string digitPart = digits.Length > 2 ? digits.ToString()[^2..] : digits.ToString();
            string result = letters.ToString() + digitPart;

            // Ensure minimum 3 characters (pad from original valid chars)
            if (result.Length < ProjectConstants.MinShortNameLength)
            {
                // First try unique characters
                foreach (char c in fullName)
                {
                    if (
                        validChars.Contains(c)
                        && result.Length < ProjectConstants.MinShortNameLength
                        && !result.Contains(char.ToUpper(c))
                    )
                    {
                        result += char.ToUpper(c);
                    }
                }

                // If still too short, allow duplicates from original
                while (result.Length < ProjectConstants.MinShortNameLength)
                {
                    bool added = false;
                    foreach (char c in fullName)
                    {
                        if (
                            validChars.Contains(c)
                            && result.Length < ProjectConstants.MinShortNameLength
                        )
                        {
                            result += char.ToUpper(c);
                            added = true;
                        }
                    }
                    // If no valid chars found at all, break to avoid infinite loop
                    if (!added)
                        break;
                }
            }

            // Truncate to maximum
            if (result.Length > ProjectConstants.MaxShortNameLength)
                result = result[..ProjectConstants.MaxShortNameLength];

            return result;
        }

        /// <summary>
        /// Generates unique project name by appending numbers (MP, MP1, MP2...).
        /// </summary>
        /// <param name="shortName">Base short name</param>
        /// <param name="longName">Base long name</param>
        /// <param name="forceNumbered">Always append number even if base is available</param>
        /// <returns>Tuple of unique (shortName, longName)</returns>
        /// <seealso cref="EXT-005 in extraction-plan.md"/>
        public static (string shortName, string longName) NextUnusedProjectName(
            string shortName,
            string longName,
            bool forceNumbered = false
        )
        {
            // TDD: Stub implementation - will fail tests
            throw new NotImplementedException(
                "NextUnusedProjectName not yet implemented. See EXT-005 in extraction-plan.md"
            );
        }

        /// <summary>
        /// Sanitizes full name by converting backslashes to forward slashes.
        /// </summary>
        /// <param name="fullName">User-entered full name</param>
        /// <returns>Sanitized full name</returns>
        /// <seealso cref="EXT-013 in extraction-plan.md"/>
        public static string SanitizeFullName(string fullName)
        {
            // TDD: Stub implementation - will fail tests
            throw new NotImplementedException(
                "SanitizeFullName not yet implemented. See EXT-013 in extraction-plan.md"
            );
        }
    }
}

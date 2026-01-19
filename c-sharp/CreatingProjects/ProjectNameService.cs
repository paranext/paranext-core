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
        /// If both shortName and fullName are null/empty, generates default names.
        /// If the provided names are available, returns them as-is (unless forceNumbered).
        /// If names are taken, appends sequential numbers (1, 2, 3...) until finding available names.
        /// </summary>
        /// <param name="shortName">Base short name (optional, generates default if null)</param>
        /// <param name="fullName">Base full name (optional, generates default if null)</param>
        /// <param name="forceNumbered">Always append number even if base is available</param>
        /// <returns>Tuple of unique (shortName, fullName)</returns>
        /// <seealso cref="EXT-005 in extraction-plan.md"/>
        public static (string shortName, string fullName) NextUnusedProjectName(
            string? shortName = null,
            string? fullName = null,
            bool forceNumbered = false
        )
        {
            // 1. Default names (MPP is 3 chars minimum for project short name)
            if (string.IsNullOrEmpty(shortName))
                shortName = "MPP";
            if (string.IsNullOrEmpty(fullName))
                fullName = "My Paratext Project";

            // 2. If available and not forcing numbered, return as-is
            if (!forceNumbered && IsNameAvailable(shortName))
            {
                return (shortName, fullName);
            }

            // 3. Strip trailing digits from base names
            string shortBase = shortName.TrimEnd("0123456789".ToCharArray());
            string fullBase = fullName.TrimEnd("0123456789".ToCharArray());

            // 4. Try numbered variants (1 to MaxProjectNameSequence)
            for (int i = 1; i <= ProjectConstants.MaxProjectNameSequence; i++)
            {
                string tryShort = shortBase + i;
                string tryFull = fullBase + i;

                if (IsNameAvailable(tryShort))
                {
                    return (tryShort, tryFull);
                }
            }

            // Fallback - return the original names (very unlikely to reach here)
            return (shortName, fullName);
        }

        /// <summary>
        /// Checks if a project name is available (not already in use and not unsupported).
        /// </summary>
        /// <param name="name">The project name to check</param>
        /// <returns>True if the name is available for use</returns>
        private static bool IsNameAvailable(string name)
        {
            // Check if project already exists
            if (ScrTextCollection.IsPresent(name))
                return false;

            // Check if project exists but is unsupported (e.g., cannot be migrated)
            var unsupportedReason = ScrTextCollection.IsUnsupportedProject(name);
            if (unsupportedReason != UnsupportedReason.Supported)
                return false;

            return true;
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

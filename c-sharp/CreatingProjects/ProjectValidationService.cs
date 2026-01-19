using Paratext.Data;

namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Service for validating project names and settings.
    /// Extracted from PT9 Paratext/ToolsMenu/ProjectNameForm.cs
    /// </summary>
    /// <seealso cref="EXT-007 in extraction-plan.md"/>
    public static class ProjectValidationService
    {
        /// <summary>
        /// Validates a project short name according to Paratext rules.
        ///
        /// Validation rules (from EXT-007):
        /// - Length must be 3-8 characters
        /// - No spaces allowed
        /// - Only valid characters: A-Z, a-z, 0-9, underscore
        /// - Cannot be a Windows reserved name (CON, PRN, AUX, NUL, COM1-9, LPT1-9)
        /// - Cannot duplicate an existing project name (exact match)
        /// - Cannot duplicate an existing project name (case-insensitive match)
        /// - Cannot match an existing orphan project folder
        ///
        /// For existing projects being edited, the validation allows the current
        /// name to pass even if it would otherwise fail uniqueness checks.
        /// </summary>
        /// <param name="shortName">The short name to validate</param>
        /// <param name="isNewProject">True if creating a new project, false if editing existing</param>
        /// <param name="originalName">The original name when editing an existing project</param>
        /// <returns>Validation result indicating success or specific error</returns>
        public static ValidationResult ValidateShortName(
            string shortName,
            bool isNewProject = true,
            string? originalName = null
        )
        {
            // 1. Length check (3-8)
            if (
                shortName.Length < ProjectConstants.MinShortNameLength
                || shortName.Length > ProjectConstants.MaxShortNameLength
            )
            {
                return ValidationResult.Error(ValidationErrorCode.InvalidLength);
            }

            // 2. Space check
            if (shortName.Contains(' '))
            {
                return ValidationResult.Error(ValidationErrorCode.ContainsSpace);
            }

            // 3. Character validation
            foreach (char c in shortName)
            {
                if (!ProjectConstants.ValidProjectNameChars.Contains(c))
                {
                    return ValidationResult.Error(ValidationErrorCode.InvalidCharacter);
                }
            }

            // 4. Reserved name check
            if (ProjectConstants.WindowsReservedNames.Contains(shortName))
            {
                return ValidationResult.Error(ValidationErrorCode.ReservedName);
            }

            // 5. Uniqueness checks (for new projects or when renaming existing projects)
            if (isNewProject || !string.Equals(shortName, originalName, StringComparison.Ordinal))
            {
                // Check against all existing projects for name collisions
                var existingProjects = ScrTextCollection.ScrTexts(IncludeProjects.Everything);
                foreach (var project in existingProjects)
                {
                    // Exact duplicate check (case-sensitive)
                    if (string.Equals(project.Name, shortName, StringComparison.Ordinal))
                    {
                        return ValidationResult.Error(ValidationErrorCode.DuplicateName);
                    }

                    // Case-insensitive collision (e.g., "ABC" vs "abc")
                    if (string.Equals(project.Name, shortName, StringComparison.OrdinalIgnoreCase))
                    {
                        return ValidationResult.Error(
                            ValidationErrorCode.CaseInsensitiveDuplicate,
                            project.Name
                        );
                    }
                }

                // Orphan folder check: folder exists but has no Settings.xml
                string projectPath = Path.Combine(
                    ScrTextCollection.SettingsDirectory ?? string.Empty,
                    shortName
                );
                if (
                    Directory.Exists(projectPath)
                    && !File.Exists(Path.Combine(projectPath, "Settings.xml"))
                )
                {
                    return ValidationResult.Error(ValidationErrorCode.ExistingFolder, projectPath);
                }
            }

            return ValidationResult.Success();
        }
    }
}

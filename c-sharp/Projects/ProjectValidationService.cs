// === PORTED FROM PT9 ===
// Source: PT9/ParatextBase/ParatextUtils.cs:164-204
// Method: ValidateShortName()
// Maps to: CAP-002, EXT-002, VAL-001, gm-001

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for validating project names and settings.
/// </summary>
internal static class ProjectValidationService
{
    // Windows reserved file names (case-insensitive)
    private static readonly HashSet<string> ReservedFileNames =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "CON",
            "PRN",
            "AUX",
            "NUL",
            "COM1",
            "COM2",
            "COM3",
            "COM4",
            "COM5",
            "COM6",
            "COM7",
            "COM8",
            "COM9",
            "LPT1",
            "LPT2",
            "LPT3",
            "LPT4",
            "LPT5",
            "LPT6",
            "LPT7",
            "LPT8",
            "LPT9",
        };

    /// <summary>
    /// Validates a project short name against VAL-001 rules.
    /// </summary>
    /// <param name="request">The validation request containing the short name</param>
    /// <returns>Validation result with error message if invalid</returns>
    // EXPLANATION:
    // This algorithm validates project short names with these rules (VAL-001):
    // 1. Length must be 3-8 characters
    // 2. Can only contain letters A-Z (case-insensitive), digits 0-9, and underscores
    // 3. Cannot contain spaces (special error message)
    // 4. Cannot be a Windows reserved filename (CON, PRN, AUX, NUL, COM1-9, LPT1-9)
    // The validation order matters for error message selection.
    public static ValidationResult ValidateShortName(ShortNameValidationRequest request)
    {
        var name = request.Name;

        // Handle null/empty
        if (string.IsNullOrEmpty(name))
        {
            return ValidationResult.Failure(
                "Short name must not be less than 3 or more than 8 characters in length",
                "Strings.ProjectNameFormTooShort"
            );
        }

        // Check length (3-8 characters)
        if (
            name.Length < ProjectCreationConstants.MinShortNameLength
            || name.Length > ProjectCreationConstants.MaxShortNameLength
        )
        {
            return ValidationResult.Failure(
                "Short name must not be less than 3 or more than 8 characters in length",
                "Strings.ProjectNameFormTooShort"
            );
        }

        // Check for spaces first (specific error message)
        if (name.Contains(' '))
        {
            return ValidationResult.Failure(
                "Short name must not contain spaces",
                "Strings.ProjectNameFormContainsSpaces"
            );
        }

        // Check for invalid characters
        foreach (char c in name)
        {
            if (!ProjectCreationConstants.ProjectNameValidChars.Contains(c))
            {
                return ValidationResult.Failure(
                    "Short name can only contain letters A-Z, digits 0-9, and underscores.",
                    "Strings.ProjectNameFormMustBeValidChar"
                );
            }
        }

        // Check for Windows reserved names
        if (ReservedFileNames.Contains(name))
        {
            return ValidationResult.Failure(
                "Project Short Name is a reserved file name on Windows and cannot be used.",
                "Strings.ProjectNameFormReservedName"
            );
        }

        return ValidationResult.Success();
    }

    // === CAP-003: ValidateProjectSettings ===
    // Source: PT9/Paratext/ProjectMenu/ProjectPropertiesForm.cs:2070-2297
    // Maps to: EXT-003, VAL-002 to VAL-011

    // EXPLANATION:
    // This algorithm validates all project settings with these checks:
    // VAL-002: FullName required
    // VAL-003: ProjectType must not be "NotSelected"
    // VAL-004: Versification must be defined
    // VAL-005: Language required except for StudyBibleAdditions (inherits from base)
    // VAL-006: FileNameForm required, and no .ptx extension for new projects
    // VAL-007: Base project required for derived types
    // VAL-008: Encoder required for TransliterationWithEncoder
    // VAL-010: Note tags must have names and be unique
    // VAL-011: Study Bible categories must have names, be unique, no spaces/backslashes

    /// <summary>
    /// Validates all project settings for project creation/update.
    /// Aggregates validation from CAP-001 (type rules) and CAP-002 (short name).
    /// </summary>
    /// <param name="request">The project creation request to validate</param>
    /// <param name="isNewProject">True if creating new project, false if editing</param>
    /// <returns>Complete validation result with all field errors</returns>
    public static ProjectValidationResult ValidateProjectSettings(
        ProjectCreateRequest request,
        bool isNewProject
    )
    {
        var errors = new List<(string Field, string Message, ValidationSeverity Severity)>();

        // Get type rules from CAP-001 for derived type checks
        var typeRulesRequest = new ProjectTypeRulesRequest(request.ProjectType);
        ProjectTypeRules? typeRules = null;
        try
        {
            typeRules = ProjectTypeRulesService.GetTypeRules(typeRulesRequest);
        }
        catch (ArgumentException)
        {
            // Unknown project type - will be caught by VAL-003
        }

        // VAL-002: Full name is required
        if (string.IsNullOrWhiteSpace(request.FullName))
        {
            errors.Add(("FullName", "Full name must be specified", ValidationSeverity.Error));
        }

        // VAL-003: Project type must be selected
        if (request.ProjectType.ToString() == "NotSelected")
        {
            errors.Add(("ProjectType", "Project type must be selected", ValidationSeverity.Error));
        }

        // VAL-004: Versification must be selected
        if (request.Versification == SIL.Scripture.ScrVersType.Unknown)
        {
            errors.Add(
                ("Versification", "Versification must be selected", ValidationSeverity.Error)
            );
        }

        // VAL-005: Language is required except for StudyBibleAdditions
        bool inheritsLanguage = typeRules?.InheritsLanguage ?? false;
        if (!inheritsLanguage && string.IsNullOrEmpty(request.LanguageId))
        {
            errors.Add(("Language", "Language must be selected", ValidationSeverity.Error));
        }

        // VAL-006: File name template is required and no PTX extension for new projects
        if (string.IsNullOrWhiteSpace(request.FileNameForm))
        {
            errors.Add(
                (
                    "FileNameForm",
                    "Book filename template must be specified",
                    ValidationSeverity.Error
                )
            );
        }
        else if (
            isNewProject
            && request.FileNameForm.EndsWith(".ptx", StringComparison.OrdinalIgnoreCase)
        )
        {
            errors.Add(
                (
                    "FileNameForm",
                    "New projects cannot use the PTX extension",
                    ValidationSeverity.Error
                )
            );
        }

        // VAL-007: Base project required for derived types
        bool requiresBaseProject = typeRules?.RequiresBaseProject ?? false;
        if (requiresBaseProject && request.BaseProjectGuid == null)
        {
            errors.Add(
                (
                    "BaseProject",
                    "No base project specified for derived type",
                    ValidationSeverity.Error
                )
            );
        }

        // VAL-008: Encoder required for TransliterationWithEncoder
        bool requiresEncoder = typeRules?.RequiresEncoder ?? false;
        if (requiresEncoder && string.IsNullOrEmpty(request.EncoderName))
        {
            errors.Add(("Encoder", "No encoding converter selected", ValidationSeverity.Error));
        }

        // VAL-010: Note tag names must be non-empty and unique
        if (request.NoteTags != null && request.NoteTags.Count > 0)
        {
            var noteTagError = ValidateNoteTags(request.NoteTags);
            if (noteTagError != null)
            {
                errors.Add(("NoteTags", noteTagError, ValidationSeverity.Error));
            }
        }

        // VAL-011: Study Bible category names must be non-empty, unique, no spaces/backslashes
        if (request.StudyBibleCategories != null && request.StudyBibleCategories.Count > 0)
        {
            var categoryError = ValidateStudyBibleCategories(request.StudyBibleCategories);
            if (categoryError != null)
            {
                errors.Add(("StudyBibleCategories", categoryError, ValidationSeverity.Error));
            }
        }

        // Build result
        if (errors.Count == 0)
        {
            return ProjectValidationResult.Valid();
        }

        return ProjectValidationResult.Invalid(errors.ToArray());
    }

    /// <summary>
    /// Validates note tag configurations.
    /// </summary>
    private static string? ValidateNoteTags(IReadOnlyList<NoteTagConfig> tags)
    {
        var seenNames = new HashSet<string>(StringComparer.Ordinal);

        foreach (var tag in tags)
        {
            // Check for empty name
            if (string.IsNullOrWhiteSpace(tag.Name))
            {
                return "Each tag must have a name";
            }

            // Check for duplicate name
            if (!seenNames.Add(tag.Name))
            {
                return "Each tag must have a unique name";
            }
        }

        return null;
    }

    /// <summary>
    /// Validates Study Bible category configurations.
    /// </summary>
    private static string? ValidateStudyBibleCategories(
        IReadOnlyList<StudyBibleCategory> categories
    )
    {
        var seenNames = new HashSet<string>(StringComparer.Ordinal);

        foreach (var category in categories)
        {
            // Check for empty name
            if (string.IsNullOrWhiteSpace(category.Name))
            {
                return "Category names cannot be blank";
            }

            // Check for spaces
            if (category.Name.Contains(' '))
            {
                return "Category names cannot contain spaces";
            }

            // Check for backslashes
            if (category.Name.Contains('\\'))
            {
                return "Category names cannot contain '\\'";
            }

            // Check for duplicate name
            if (!seenNames.Add(category.Name))
            {
                return "Each category must have a unique name";
            }
        }

        return null;
    }
}

// === NEW IN PT10 ===
// Reason: Data contracts for project creation validation - PAPI request/response types
// Maps to: CAP-002, data-contracts.md section 1.2 and 2.2

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Constants used across project creation services.
/// </summary>
internal static class ProjectCreationConstants
{
    /// <summary>
    /// Valid characters for project short names: A-Za-z0-9_
    /// </summary>
    public const string ProjectNameValidChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    /// <summary>
    /// Minimum length for project short names.
    /// </summary>
    public const int MinShortNameLength = 3;

    /// <summary>
    /// Maximum length for project short names.
    /// </summary>
    public const int MaxShortNameLength = 8;
}

/// <summary>
/// Request to validate a project short name.
/// Maps to: EXT-002, VAL-001
/// </summary>
/// <param name="Name">Short name to validate</param>
/// <param name="IsExistingProject">True if editing existing project, false if creating new</param>
public record ShortNameValidationRequest(string Name, bool IsExistingProject);

/// <summary>
/// Generic validation result.
/// Used by: EXT-002, EXT-006, EXT-010, EXT-011
/// </summary>
/// <param name="IsValid">Whether validation passed</param>
/// <param name="ErrorMessage">Error message if invalid (null if valid)</param>
/// <param name="ErrorMessageKey">Localization key for error message</param>
/// <param name="FormatArgs">Format arguments for parameterized messages</param>
public record ValidationResult(
    bool IsValid,
    string? ErrorMessage = null,
    string? ErrorMessageKey = null,
    IReadOnlyList<string>? FormatArgs = null
)
{
    /// <summary>
    /// Create a successful validation result.
    /// </summary>
    public static ValidationResult Success() => new(true);

    /// <summary>
    /// Create a failed validation result.
    /// </summary>
    public static ValidationResult Failure(
        string message,
        string? key = null,
        params string[] args
    ) => new(false, message, key, args.Length > 0 ? args : null);
}

// === CAP-001: Project Type Rules ===

/// <summary>
/// Request for project type rules.
/// Maps to: EXT-001
/// </summary>
/// <param name="ProjectType">Project type to get rules for (PtxUtils.Enum wrapper)</param>
public record ProjectTypeRulesRequest(PtxUtils.Enum<Paratext.Data.ProjectType> ProjectType);

/// <summary>
/// Project type rules and constraints.
/// Maps to: EXT-001, gm-004
/// </summary>
/// <param name="RequiresBaseProject">Whether this type requires a base project</param>
/// <param name="CanBeBaseProject">Whether this type can be used as a base for other projects</param>
/// <param name="DefaultEditable">Default editability for this type</param>
/// <param name="BaseConstraints">Description of base project constraints</param>
/// <param name="ShowBasedOnDropdown">Whether to show the based-on dropdown</param>
/// <param name="ShowEncoderDropdown">Whether to show the encoder dropdown</param>
/// <param name="SharesLicenseWithParent">Whether this type shares license with parent</param>
/// <param name="RequiresAdminRole">Whether admin role is required for base project</param>
/// <param name="InheritsLanguage">Whether this type inherits language from base</param>
/// <param name="InheritsBookNames">Whether this type inherits book names from base</param>
/// <param name="AutoGeneratesName">Whether this type auto-generates name from username</param>
/// <param name="RequiresEncoder">Whether this type requires an encoder</param>
public record ProjectTypeRules(
    bool RequiresBaseProject,
    bool CanBeBaseProject,
    bool DefaultEditable,
    string? BaseConstraints,
    bool ShowBasedOnDropdown,
    bool ShowEncoderDropdown,
    bool SharesLicenseWithParent,
    bool RequiresAdminRole = false,
    bool InheritsLanguage = false,
    bool InheritsBookNames = false,
    bool AutoGeneratesName = false,
    bool RequiresEncoder = false
);

// === CAP-004: USFM Version Warning ===

// Note: We use Paratext.Data.ProjectSettingsAccess.UsfmVersionOption directly
// to avoid type mapping issues. No PT10-specific enum is needed here.

/// <summary>
/// USFM version warning for project creation.
/// Maps to: EXT-004
/// </summary>
/// <param name="ShowWarning">Whether to show the warning</param>
/// <param name="WarningMessageKey">Localization key for warning message</param>
/// <param name="ConfirmButtonKey">Localization key for confirm button</param>
/// <param name="CancelButtonKey">Localization key for cancel button</param>
public record UsfmVersionWarning(
    bool ShowWarning,
    string WarningMessageKey,
    string ConfirmButtonKey,
    string CancelButtonKey
);

// === CAP-006: Character Rules Validation ===

/// <summary>
/// Request to validate character rules.
/// Maps to: EXT-006, VAL-013
/// </summary>
/// <param name="Separator">Character separator (space or tab)</param>
/// <param name="RulesText">Character rules text (lines of lowercase/uppercase pairs)</param>
/// <param name="LanguageId">Language ID for context</param>
public record CharacterRulesValidationRequest(char Separator, string RulesText, string LanguageId);

/// <summary>
/// Character rules validation result.
/// Maps to: EXT-006, VAL-013
/// </summary>
/// <param name="IsValid">Whether validation passed</param>
/// <param name="Errors">List of validation errors</param>
public record CharacterValidationResult(
    bool IsValid,
    IReadOnlyList<CharacterValidationError> Errors
)
{
    /// <summary>
    /// Create a valid result with no errors.
    /// </summary>
    public static CharacterValidationResult Valid() =>
        new(true, Array.Empty<CharacterValidationError>());

    /// <summary>
    /// Create an invalid result with errors.
    /// </summary>
    public static CharacterValidationResult Invalid(params CharacterValidationError[] errors) =>
        new(false, errors);
}

/// <summary>
/// Character validation error details.
/// </summary>
/// <param name="Type">Error type</param>
/// <param name="Character">Character that caused the error (if applicable)</param>
/// <param name="Message">Error message</param>
/// <param name="Position">Position in text (if applicable)</param>
public record CharacterValidationError(
    CharacterErrorType Type,
    string? Character,
    string Message,
    int? Position = null
);

/// <summary>
/// Types of character validation errors.
/// </summary>
public enum CharacterErrorType
{
    /// <summary>Invalid syntax (control characters, etc.)</summary>
    InvalidSyntax,

    /// <summary>Capitalization not defined correctly</summary>
    Capitalization,

    /// <summary>Duplicate character on same line or case-duplicate across lines</summary>
    Duplicate,

    /// <summary>ICU parsing error</summary>
    IcuError,
}

// === CAP-003: Project Settings Validation ===

/// <summary>
/// Request to create a new Paratext project.
/// Maps to: BHV-510, BHV-511, BHV-512, CAP-003, CAP-014
/// </summary>
/// <param name="ShortName">Project short name (3-8 chars, A-Za-z0-9_)</param>
/// <param name="FullName">Full display name</param>
/// <param name="ProjectType">Project type - one of 8 supported types (PtxUtils.Enum wrapper)</param>
/// <param name="LanguageId">BCP-47 language identifier (null for StudyBibleAdditions)</param>
/// <param name="Versification">Versification system</param>
/// <param name="BaseProjectGuid">GUID of base project for derived types</param>
/// <param name="Editable">Whether project is editable</param>
/// <param name="EncoderName">Encoder name for TransliterationWithEncoder projects</param>
/// <param name="EncoderReverseDirection">Use encoder in reverse direction</param>
/// <param name="BooksPresent">Book IDs included in project scope</param>
/// <param name="FileNameForm">File naming template (e.g., "41MAT")</param>
/// <param name="Normalization">Unicode normalization form</param>
/// <param name="UsfmVersion">USFM version (2 or 3)</param>
/// <param name="NoteTags">Note tag configurations</param>
/// <param name="BiblicalTermsListId">Biblical terms list association</param>
/// <param name="AssociatedLexicalProjectGuid">Associated lexical project GUID</param>
/// <param name="StudyBibleCategories">Study Bible categories (only for StudyBibleAdditions)</param>
public record ProjectCreateRequest(
    string ShortName,
    string FullName,
    PtxUtils.Enum<Paratext.Data.ProjectType> ProjectType,
    string? LanguageId,
    SIL.Scripture.ScrVersType Versification,
    Paratext.Data.HexId? BaseProjectGuid,
    bool Editable,
    string? EncoderName,
    bool EncoderReverseDirection,
    IReadOnlyList<string> BooksPresent,
    string FileNameForm,
    ProjectNormalization Normalization,
    Paratext.Data.ProjectSettingsAccess.UsfmVersionOption UsfmVersion,
    IReadOnlyList<NoteTagConfig> NoteTags,
    string? BiblicalTermsListId,
    Paratext.Data.HexId? AssociatedLexicalProjectGuid,
    IReadOnlyList<StudyBibleCategory>? StudyBibleCategories
);

/// <summary>
/// Unicode normalization form.
/// </summary>
public enum ProjectNormalization
{
    /// <summary>Undefined normalization</summary>
    Undefined,

    /// <summary>Unicode Normalization Form D (Canonical Decomposition)</summary>
    NFD,

    /// <summary>Unicode Normalization Form C (Canonical Decomposition then Composition)</summary>
    NFC,
}

/// <summary>
/// Note tag configuration for project creation.
/// </summary>
/// <param name="Name">Tag name</param>
/// <param name="Icon">Tag icon</param>
/// <param name="DefaultStatus">Default status</param>
public record NoteTagConfig(string Name, string Icon, string DefaultStatus);

/// <summary>
/// Study Bible category configuration.
/// </summary>
/// <param name="Name">Category name (no spaces or backslashes)</param>
/// <param name="Description">Category description</param>
public record StudyBibleCategory(string Name, string Description);

// === CAP-014: Project Create Result ===

/// <summary>
/// Result of project creation operation.
/// Maps to: BHV-512, CAP-014
/// </summary>
public abstract record ProjectCreateResult;

/// <summary>
/// Successful project creation result.
/// </summary>
/// <param name="ProjectGuid">GUID of the created project (40-char hex)</param>
/// <param name="ProjectPath">Path to the created project directory</param>
public record ProjectCreateSuccess(Paratext.Data.HexId ProjectGuid, string ProjectPath)
    : ProjectCreateResult;

/// <summary>
/// Failed project creation result.
/// </summary>
/// <param name="Code">Error code</param>
/// <param name="Message">Error message</param>
/// <param name="Field">Field that caused the error (if applicable)</param>
public record ProjectCreateFailure(
    ProjectCreateErrorCode Code,
    string Message,
    string? Field = null
) : ProjectCreateResult;

/// <summary>
/// Error codes for project creation failures.
/// Maps to: data-contracts.md section 2.1
/// </summary>
public enum ProjectCreateErrorCode
{
    /// <summary>Short name validation failed</summary>
    InvalidShortName,

    /// <summary>Full name validation failed</summary>
    InvalidFullName,

    /// <summary>Project type is invalid</summary>
    InvalidProjectType,

    /// <summary>Language is invalid or missing</summary>
    InvalidLanguage,

    /// <summary>Base project is invalid or missing for derived type</summary>
    InvalidBaseProject,

    /// <summary>Encoder is invalid or missing for TransliterationWithEncoder</summary>
    InvalidEncoder,

    /// <summary>A project with this name already exists</summary>
    DuplicateName,

    /// <summary>User does not have permission to create projects</summary>
    PermissionDenied,

    /// <summary>File system error during project creation</summary>
    IoError,

    /// <summary>Version control system error</summary>
    VcsError,

    /// <summary>Unknown error</summary>
    UnknownError,
}

// === CAP-015: Project Options Response ===

/// <summary>
/// Available options for project creation form.
/// Maps to: CAP-015, spec-010, spec-011
/// </summary>
/// <param name="ProjectTypes">Available project types</param>
/// <param name="Languages">Available languages (from language search)</param>
/// <param name="Versifications">Available versification systems</param>
/// <param name="BaseProjects">Projects available as base projects</param>
/// <param name="Encoders">Available encoders for transliteration</param>
/// <param name="BiblicalTermsLists">Available biblical terms lists</param>
/// <param name="LexicalProjects">Projects available for lexical association</param>
public record ProjectOptionsResponse(
    IReadOnlyList<ProjectTypeOption> ProjectTypes,
    IReadOnlyList<LanguageOption> Languages,
    IReadOnlyList<VersificationOption> Versifications,
    IReadOnlyList<ProjectReference> BaseProjects,
    IReadOnlyList<EncoderOption> Encoders,
    IReadOnlyList<BiblicalTermsListOption> BiblicalTermsLists,
    IReadOnlyList<ProjectReference> LexicalProjects
);

/// <summary>
/// Project type option for dropdown.
/// </summary>
/// <param name="Type">Project type enum value</param>
/// <param name="DisplayName">User-friendly display name</param>
/// <param name="IsDerived">Whether this type requires a base project</param>
/// <param name="RequiresEncoder">Whether this type requires an encoder</param>
public record ProjectTypeOption(
    Paratext.Data.ProjectType Type,
    string DisplayName,
    bool IsDerived,
    bool RequiresEncoder
);

/// <summary>
/// Language option for dropdown.
/// </summary>
/// <param name="Id">BCP-47 language identifier</param>
/// <param name="Name">Display name</param>
/// <param name="IsRightToLeft">Whether the language is right-to-left</param>
/// <param name="Script">Script code (if known)</param>
public record LanguageOption(string Id, string Name, bool IsRightToLeft, string? Script);

/// <summary>
/// Versification option for dropdown.
/// </summary>
/// <param name="Type">Versification type enum value</param>
/// <param name="DisplayName">User-friendly display name</param>
public record VersificationOption(SIL.Scripture.ScrVersType Type, string DisplayName);

/// <summary>
/// Encoder option for dropdown.
/// </summary>
/// <param name="Name">Encoder name (identifier)</param>
/// <param name="DisplayName">User-friendly display name</param>
/// <param name="IsBidirectional">Whether encoder supports bidirectional conversion</param>
public record EncoderOption(string Name, string DisplayName, bool IsBidirectional);

/// <summary>
/// Biblical terms list option for dropdown.
/// </summary>
/// <param name="Id">List identifier</param>
/// <param name="Name">Display name</param>
public record BiblicalTermsListOption(string Id, string Name);

/// <summary>
/// Complete project validation result.
/// Maps to: EXT-003, CAP-003
/// </summary>
/// <param name="IsValid">Overall validity</param>
/// <param name="FieldErrors">Field-level errors</param>
/// <param name="HasMajorErrors">Whether any major (blocking) errors exist</param>
/// <param name="HasMinorErrors">Whether any minor (warning) errors exist</param>
public record ProjectValidationResult(
    bool IsValid,
    IReadOnlyDictionary<string, ValidationFieldError> FieldErrors,
    bool HasMajorErrors,
    bool HasMinorErrors
)
{
    /// <summary>
    /// Create a valid result with no errors.
    /// </summary>
    public static ProjectValidationResult Valid() =>
        new(true, new Dictionary<string, ValidationFieldError>(), false, false);

    /// <summary>
    /// Create an invalid result with field errors.
    /// </summary>
    public static ProjectValidationResult Invalid(
        params (string Field, string Message, ValidationSeverity Severity)[] errors
    )
    {
        var fieldErrors = new Dictionary<string, ValidationFieldError>();
        bool hasMajor = false;
        bool hasMinor = false;
        foreach (var (field, message, severity) in errors)
        {
            fieldErrors[field] = new ValidationFieldError(field, message, severity);
            if (severity == ValidationSeverity.Error)
                hasMajor = true;
            else
                hasMinor = true;
        }
        return new ProjectValidationResult(false, fieldErrors, hasMajor, hasMinor);
    }
}

/// <summary>
/// Field-level validation error.
/// </summary>
/// <param name="Field">Field name</param>
/// <param name="Message">Error message</param>
/// <param name="Severity">Error severity</param>
public record ValidationFieldError(string Field, string Message, ValidationSeverity Severity);

/// <summary>
/// Validation error severity.
/// </summary>
public enum ValidationSeverity
{
    /// <summary>Blocking error that prevents save</summary>
    Error,

    /// <summary>Warning that allows save but should be reviewed</summary>
    Warning,
}

// === CAP-007: Language Settings Save ===

/// <summary>
/// Request to save language settings.
/// Maps to: EXT-007, BHV-163, BHV-164, CAP-007
/// </summary>
/// <param name="ProjectGuid">Project GUID</param>
/// <param name="FontName">Font name</param>
/// <param name="FontSize">Font size in points</param>
/// <param name="FontFeatures">Font features (Graphite)</param>
/// <param name="RightToLeft">Right-to-left script</param>
/// <param name="CharacterRules">Character sort rules</param>
/// <param name="Separator">Character separator</param>
/// <param name="Diacritics">Diacritics string</param>
/// <param name="MedialPunctuation">Medial punctuation</param>
/// <param name="FootnoteCallers">Footnote caller sequence</param>
/// <param name="CrossReferenceCallers">Cross-reference caller sequence</param>
/// <param name="VerseSegments">Verse segment suffixes</param>
/// <param name="WordBreakChars">Word break characters</param>
public record LanguageSettingsRequest(
    Paratext.Data.HexId ProjectGuid,
    string FontName,
    int FontSize,
    string FontFeatures,
    bool RightToLeft,
    string CharacterRules,
    char Separator,
    string Diacritics,
    string MedialPunctuation,
    string FootnoteCallers,
    string CrossReferenceCallers,
    string VerseSegments,
    string WordBreakChars
);

/// <summary>
/// Result of language settings save operation.
/// Maps to: CAP-007
/// </summary>
/// <param name="Success">Whether the save succeeded</param>
/// <param name="ErrorMessage">Error message if failed</param>
/// <param name="ValidationResult">Character validation result if validation failed</param>
public record LanguageSettingsSaveResult(
    bool Success,
    string? ErrorMessage,
    CharacterValidationResult? ValidationResult
)
{
    /// <summary>
    /// Create a successful result.
    /// </summary>
    public static LanguageSettingsSaveResult Succeeded() => new(true, null, null);

    /// <summary>
    /// Create a failed result due to validation.
    /// </summary>
    public static LanguageSettingsSaveResult ValidationFailed(CharacterValidationResult result) =>
        new(false, "Character rules validation failed", result);

    /// <summary>
    /// Create a failed result due to other error.
    /// </summary>
    public static LanguageSettingsSaveResult Failed(string message) => new(false, message, null);
}

// === CAP-013: Backup Analysis ===

/// <summary>
/// Analysis of backup file for restore.
/// Maps to: EXT-301
/// </summary>
/// <param name="ProjectInfo">Project info from backup</param>
/// <param name="Files">Files in backup</param>
/// <param name="IsSharedProjectBackup">Whether this is a shared project backup</param>
/// <param name="WarningMessage">Warning message if applicable</param>
public record RestoreAnalysisResult(
    BackupProjectInfo ProjectInfo,
    IReadOnlyList<RestoreFileInfo> Files,
    bool IsSharedProjectBackup,
    string? WarningMessage
);

/// <summary>
/// Project information extracted from backup.
/// </summary>
/// <param name="ShortName">Project short name</param>
/// <param name="FullName">Project full name</param>
/// <param name="Guid">Project GUID</param>
/// <param name="ProjectType">Project type (PtxUtils.Enum wrapper)</param>
public record BackupProjectInfo(
    string ShortName,
    string FullName,
    Paratext.Data.HexId Guid,
    PtxUtils.Enum<Paratext.Data.ProjectType> ProjectType
);

/// <summary>
/// Information about a file in the backup.
/// </summary>
/// <param name="FileName">File name</param>
/// <param name="BookId">Book ID if applicable</param>
/// <param name="SourceVersion">Version in backup</param>
/// <param name="ComparisonState">Comparison with existing file</param>
public record RestoreFileInfo(
    string FileName,
    string? BookId,
    string SourceVersion,
    FileComparisonState ComparisonState
);

/// <summary>
/// File comparison state for restore operations.
/// </summary>
public enum FileComparisonState
{
    DestDoesNotExist,
    FilesAreSame,
    SourceIsHigherVersion,
    DestIsHigherVersion,
    VersionsConflict,
}

// === CAP-008, CAP-009: Book Operations ===

/// <summary>
/// Project reference for compatible destinations.
/// Maps to: CAP-008, EXT-008
/// </summary>
/// <param name="Guid">Project GUID</param>
/// <param name="ShortName">Project short name</param>
/// <param name="FullName">Project full name</param>
/// <param name="ProjectType">Project type</param>
/// <param name="BooksPresent">Books present in project (optional)</param>
/// <param name="Editable">Whether project is editable (optional)</param>
public record ProjectReference(
    Paratext.Data.HexId Guid,
    string ShortName,
    string FullName,
    PtxUtils.Enum<Paratext.Data.ProjectType> ProjectType,
    IReadOnlyList<string>? BooksPresent = null,
    bool? Editable = null
);

/// <summary>
/// Request to copy books between projects.
/// Maps to: CAP-009, EXT-008
/// </summary>
/// <param name="FromProjectGuid">Source project GUID</param>
/// <param name="ToProjectGuid">Destination project GUID</param>
/// <param name="BookIds">Book IDs to copy (3-letter codes like "MAT", "GEN")</param>
public record CopyBooksRequest(
    Paratext.Data.HexId FromProjectGuid,
    Paratext.Data.HexId ToProjectGuid,
    IReadOnlyList<string> BookIds
);

/// <summary>
/// Result of book copy operation.
/// Maps to: CAP-009
/// </summary>
/// <param name="Success">Whether the copy operation succeeded</param>
/// <param name="CopiedBooks">List of successfully copied book IDs</param>
/// <param name="Errors">List of errors if any books failed to copy</param>
public record CopyBooksResult(
    bool Success,
    IReadOnlyList<string> CopiedBooks,
    IReadOnlyList<CopyBookError>? Errors = null
)
{
    /// <summary>
    /// Create a successful result.
    /// </summary>
    public static CopyBooksResult Succeeded(IReadOnlyList<string> copiedBooks) =>
        new(true, copiedBooks, null);

    /// <summary>
    /// Create a failed result.
    /// </summary>
    public static CopyBooksResult Failed(IReadOnlyList<CopyBookError> errors) =>
        new(false, Array.Empty<string>(), errors);

    /// <summary>
    /// Create a partial success result.
    /// </summary>
    public static CopyBooksResult PartialSuccess(
        IReadOnlyList<string> copiedBooks,
        IReadOnlyList<CopyBookError> errors
    ) => new(false, copiedBooks, errors);
}

/// <summary>
/// Error information for a failed book copy.
/// </summary>
/// <param name="BookId">Book ID that failed</param>
/// <param name="Error">Error message</param>
public record CopyBookError(string BookId, string Error);

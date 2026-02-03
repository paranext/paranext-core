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

// === NEW IN PT10 ===
// Reason: Service for project creation operations
// Maps to: CAP-004 (GetUsfmVersionWarning), CAP-014 (CreateProject), CAP-015 (GetProjectOptions)

using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Users;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for project creation operations.
/// PT9 Provenance: ProjectPropertiesUtils, ProjectPropertiesForm
/// Maps to: CAP-004 (GetUsfmVersionWarning), CAP-014 (CreateProject)
/// </summary>
internal static class ProjectCreationService
{
    /// <summary>
    /// Factory delegate for creating ScrText instances.
    /// Tests can replace this with a factory that creates DummyScrText.
    /// </summary>
    internal static Func<ProjectDetails, ScrText>? ScrTextFactory { get; set; }

    // === PORTED FROM PT9 ===
    // Source: PT9/ProjectPropertiesForm.cs - ValidateUsfmVersion()
    // Maps to: CAP-004

    /// <summary>
    /// Gets USFM version warning if applicable.
    /// PT9 Provenance: ProjectPropertiesForm.ValidateUsfmVersion()
    /// Maps to: CAP-004, EXT-004
    /// </summary>
    /// <param name="version">The USFM version selected</param>
    /// <param name="isNewProject">Whether this is a new project</param>
    /// <returns>Warning info if warning should be shown, null otherwise</returns>
    public static UsfmVersionWarning? GetUsfmVersionWarning(
        UsfmVersionOption version,
        bool isNewProject
    )
    {
        // EXPLANATION:
        // USFM 3 warning is only shown when:
        // 1. USFM version 3 is selected, AND
        // 2. This is a NEW project (not existing)
        // The warning alerts users that USFM 3 format may have compatibility issues
        // with older Paratext versions and third-party tools.

        // Only show warning for USFM 3 on new projects
        if (version == UsfmVersionOption.Version3 && isNewProject)
        {
            return new UsfmVersionWarning(
                ShowWarning: true,
                WarningMessageKey: "ProjectCreation.UsfmVersion3Warning",
                ConfirmButtonKey: "Common.Continue",
                CancelButtonKey: "Common.Cancel"
            );
        }

        // No warning needed for USFM 2 or existing projects
        return null;
    }

    // === CAP-014: CreateProject ===
    // Source: PT9/Paratext/ProjectMenu/ProjectPropertiesForm.cs - CreateProject()
    // Maps to: CAP-014, BHV-510, BHV-511, BHV-512

    /// <summary>
    /// Creates a new Paratext project.
    /// PT9 Provenance: ProjectPropertiesForm.CreateProject(), ScrText constructor
    /// Maps to: CAP-014, BHV-510, BHV-511, BHV-512
    /// </summary>
    /// <param name="request">Project creation request</param>
    /// <returns>Success with project GUID or failure with error code</returns>
    // EXPLANATION:
    // This algorithm creates a new project with these steps:
    // 1. Validate short name (length 3-8, valid chars)
    // 2. Check for duplicate project name in ScrTextCollection
    // 3. Validate derived types have base project
    // 4. Validate TransliterationWithEncoder has encoder
    // 5. Create ScrText instance with settings
    // 6. Add to ScrTextCollection
    // 7. Return success with project GUID
    public static Task<ProjectCreateResult> CreateProjectAsync(ProjectCreateRequest request)
    {
        // Step 1: Validate short name length (VAL-001)
        var shortNameValidation = ProjectValidationService.ValidateShortName(
            new ShortNameValidationRequest(request.ShortName, false)
        );
        if (!shortNameValidation.IsValid)
        {
            return Task.FromResult<ProjectCreateResult>(
                new ProjectCreateFailure(
                    ProjectCreateErrorCode.InvalidShortName,
                    shortNameValidation.ErrorMessage ?? "Invalid short name",
                    "ShortName"
                )
            );
        }

        // Step 2: Check for duplicate project name
        // Use IsNamePresent which checks if any project has this name
        if (ScrTextCollection.IsNamePresent(request.ShortName))
        {
            return Task.FromResult<ProjectCreateResult>(
                new ProjectCreateFailure(
                    ProjectCreateErrorCode.DuplicateName,
                    "A project with this name already exists",
                    "ShortName"
                )
            );
        }

        // Step 3: Get type rules and check if base project is required
        var typeRulesRequest = new ProjectTypeRulesRequest(request.ProjectType);
        ProjectTypeRules typeRules;
        try
        {
            typeRules = ProjectTypeRulesService.GetTypeRules(typeRulesRequest);
        }
        catch (ArgumentException)
        {
            return Task.FromResult<ProjectCreateResult>(
                new ProjectCreateFailure(
                    ProjectCreateErrorCode.InvalidProjectType,
                    "Invalid project type",
                    "ProjectType"
                )
            );
        }

        // Step 4: Validate derived types have base project
        if (typeRules.RequiresBaseProject && request.BaseProjectGuid == null)
        {
            return Task.FromResult<ProjectCreateResult>(
                new ProjectCreateFailure(
                    ProjectCreateErrorCode.InvalidBaseProject,
                    "Base project required for this project type",
                    "BaseProject"
                )
            );
        }

        // Step 5: Validate TransliterationWithEncoder has encoder
        if (typeRules.RequiresEncoder && string.IsNullOrEmpty(request.EncoderName))
        {
            return Task.FromResult<ProjectCreateResult>(
                new ProjectCreateFailure(
                    ProjectCreateErrorCode.InvalidEncoder,
                    "Encoder required for TransliterationWithEncoder type",
                    "Encoder"
                )
            );
        }

        // Step 6: Create the ScrText with appropriate settings
        // Use factory if provided (for testing), otherwise create directly
        var projectDetails = new ProjectDetails(
            request.ShortName,
            new ProjectMetadata(HexId.CreateNew().ToString(), []),
            ""
        );

        ScrText scrText;
        if (ScrTextFactory != null)
        {
            // Use factory (test mode with DummyScrText)
            scrText = ScrTextFactory(projectDetails);
        }
        else
        {
            // Production mode - create real ScrText
            var projectName = new ProjectName { ShortName = request.ShortName, ProjectPath = "" };
            scrText = new ScrText(projectName, RegistrationInfo.DefaultUser);
        }

        // Configure settings
        scrText.Settings.FullName = request.FullName;
        scrText.Settings.Editable = request.Editable;
        scrText.Settings.UsfmVersion = request.UsfmVersion;

        // Set TranslationInfo for derived types (connects to base project)
        if (typeRules.RequiresBaseProject && request.BaseProjectGuid != null)
        {
            var baseProject = ScrTextCollection.GetById(request.BaseProjectGuid);
            if (baseProject != null)
            {
                scrText.Settings.TranslationInfo = new TranslationInformation(
                    request.ProjectType,
                    baseProject.Name,
                    baseProject.Guid
                );
            }
        }

        // Step 7: Add to ScrTextCollection
        ScrTextCollection.Add(scrText, true);

        // Return success with project GUID
        return Task.FromResult<ProjectCreateResult>(
            new ProjectCreateSuccess(scrText.Guid, scrText.Directory ?? "")
        );
    }

    // === CAP-015: GetProjectOptions ===
    // Source: PT9/Paratext/ProjectMenu/ProjectPropertiesForm.cs - initialization
    // Maps to: CAP-015, BHV-159, BHV-161

    /// <summary>
    /// Gets available options for project creation form.
    /// PT9 Provenance: ProjectPropertiesForm initialization
    /// Maps to: CAP-015, BHV-159, BHV-161
    /// </summary>
    /// <returns>All available options for project creation dropdowns</returns>
    // EXPLANATION:
    // This method returns all dropdown options for the project creation form:
    // 1. Project types - all 8+ types from ProjectType enum
    // 2. Versifications - from ScrVersType enum
    // 3. Base projects - from ScrTextCollection
    // 4. Empty collections for Languages, Encoders, etc. (populated via other APIs)
    public static Task<ProjectOptionsResponse> GetProjectOptionsAsync()
    {
        // Build project type options - hardcoded list of known types
        // ProjectType is a PtxUtils.Enum, not a regular .NET enum, so we can't use Enum.GetValues
        var projectTypeValues = new[]
        {
            ProjectType.Standard,
            ProjectType.BackTranslation,
            ProjectType.Daughter,
            ProjectType.Auxiliary,
            ProjectType.StudyBible,
            ProjectType.StudyBibleAdditions,
            ProjectType.TransliterationManual,
            ProjectType.TransliterationWithEncoder,
            ProjectType.ConsultantNotes,
        };

        var projectTypes = new List<ProjectTypeOption>();
        foreach (var projectType in projectTypeValues)
        {
            // Get type rules to determine isDerived and requiresEncoder
            var typeRulesRequest = new ProjectTypeRulesRequest(projectType);
            try
            {
                var rules = ProjectTypeRulesService.GetTypeRules(typeRulesRequest);
                // PtxUtils.Enum<T> toString gives the enum name, which we can use
                // to construct a ProjectType value via implicit conversion
                var typeName = projectType.ToString();
                projectTypes.Add(
                    new ProjectTypeOption(
                        Type: projectType, // PtxUtils.Enum<T> implicitly converts to T
                        DisplayName: FormatDisplayName(typeName!),
                        IsDerived: rules.RequiresBaseProject,
                        RequiresEncoder: rules.RequiresEncoder
                    )
                );
            }
            catch (ArgumentException)
            {
                // Unknown type - skip
            }
        }

        // Build versification options - hardcoded list of known types
        // ScrVersType enum values: Unknown=0, Original=1, Septuagint=2, Vulgate=3, English=4, RussianProtestant=5, RussianOrthodox=6
        var versificationValues = new[]
        {
            ScrVersType.Original,
            ScrVersType.Septuagint,
            ScrVersType.Vulgate,
            ScrVersType.English,
            ScrVersType.RussianProtestant,
            ScrVersType.RussianOrthodox,
        };

        var versifications = new List<VersificationOption>();
        foreach (var versType in versificationValues)
        {
            versifications.Add(
                new VersificationOption(
                    Type: versType,
                    DisplayName: FormatDisplayName(versType.ToString())
                )
            );
        }

        // Build base projects from ScrTextCollection
        var baseProjects = new List<ProjectReference>();
        foreach (var scrText in ScrTextCollection.ScrTexts(IncludeProjects.Everything))
        {
            baseProjects.Add(
                new ProjectReference(
                    Guid: scrText.Guid,
                    ShortName: scrText.Name,
                    FullName: scrText.Settings.FullName ?? scrText.Name,
                    ProjectType: scrText.Settings.TranslationInfo?.Type ?? ProjectType.Standard
                )
            );
        }

        // Return response with all options
        var response = new ProjectOptionsResponse(
            ProjectTypes: projectTypes,
            Languages: Array.Empty<LanguageOption>(),
            Versifications: versifications,
            BaseProjects: baseProjects,
            Encoders: Array.Empty<EncoderOption>(),
            BiblicalTermsLists: Array.Empty<BiblicalTermsListOption>(),
            LexicalProjects: Array.Empty<ProjectReference>()
        );

        return Task.FromResult(response);
    }

    /// <summary>
    /// Formats a PascalCase name for display by adding spaces before capitals.
    /// Example: "BackTranslation" becomes "Back Translation"
    /// </summary>
    private static string FormatDisplayName(string pascalCaseName)
    {
        var result = new System.Text.StringBuilder();
        foreach (char c in pascalCaseName)
        {
            if (char.IsUpper(c) && result.Length > 0)
                result.Append(' ');
            result.Append(c);
        }
        return result.ToString();
    }
}

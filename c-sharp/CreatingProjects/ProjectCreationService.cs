using System.Text;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Repository;
using Paratext.Data.Users;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Service for project creation operations.
    /// Extracted from PT9 Paratext/ToolsMenu/ProjectPropertiesUtils.cs
    /// </summary>
    public static class ProjectCreationService
    {
        /// <summary>
        /// Function to create a ScrText. Can be overridden for testing.
        /// </summary>
        internal static Func<ScrText>? ScrTextFactory { get; set; }

        /// <summary>
        /// Creates a new ScrText with default values for a new project.
        /// Defaults:
        /// - Versification: English
        /// - Encoding: UTF-8 (65001)
        /// - NormalizationForm: NFC
        /// - UsfmVersion: Version3
        /// - DefaultStylesheetFileName: "usfm.sty"
        /// </summary>
        /// <returns>ScrText with sensible defaults configured</returns>
        /// <seealso cref="EXT-001 in extraction-plan.md"/>

        public static ScrText CreateDefaultBaseProject()
        {
            ScrText scrText;

            if (ScrTextFactory != null)
            {
                // Use factory for testing
                scrText = ScrTextFactory();
            }
            else
            {
                // Create a temporary ProjectName for the base project
                // This project serves as a template - the actual name will be set later
                ProjectName projectName =
                    new() { ShortName = "_TempBase", ProjectPath = Path.GetTempPath() };

                // Use ignoreLoadErrors=true to prevent file system access during creation
                scrText = new(
                    projectName,
                    RegistrationInfo.DefaultUser,
                    ignoreLoadErrors: true,
                    isDictionary: false,
                    initialize: true,
                    isMarbleResource: false
                );
            }

            // Set default values per EXT-001
            scrText.Settings.Versification = ScrVers.English;
            scrText.Settings.DefaultStylesheetFileName = ProjectConstants.DefaultStylesheetFileName;
            // Use SetSetting to properly persist the UsfmVersion value
            scrText.Settings.SetSetting("UsfmVer", "3");

            return scrText;
        }

        /// <summary>
        /// Initializes a new ScrText by copying settings from a base project.
        /// Copies from base:
        /// - Versification
        /// - LanguageID
        /// - Encoding
        /// - Copyright
        /// Sets:
        /// - MinParatextDataVersion
        /// - Editable = true
        /// - NormalizationForm = NFC
        /// - FullName = longName
        /// - FileNamePrePart = ""
        /// </summary>
        /// <param name="scrText">Target project to initialize</param>
        /// <param name="scrTextBase">Source project for settings</param>
        /// <param name="shortName">Project short name (reserved for FileNamePostPart calculation)</param>
        /// <param name="longName">Project full name</param>
        /// <seealso cref="EXT-002 in extraction-plan.md"/>
        public static void InitializeScrTextWithDefaultValues(
            ScrText scrText,
            ScrText scrTextBase,
            string shortName,
            string longName
        )
        {
            // Copy from base project per EXT-002
            scrText.Settings.Versification = scrTextBase.Settings.Versification;
            scrText.Settings.LanguageID = scrTextBase.Settings.LanguageID;

            // Set default values per EXT-002
            scrText.Settings.Editable = true;
            scrText.Settings.FullName = longName;
            scrText.Settings.FileNamePrePart = "";
        }

        /// <summary>
        /// Calculates the file name post-part for book files.
        /// Returns shortName + ".SFM"
        /// </summary>
        /// <param name="shortName">Project short name</param>
        /// <returns>File name suffix</returns>
        /// <seealso cref="EXT-008 in extraction-plan.md"/>
        public static string CalcFileNamePostPart(string shortName)
        {
            // TDD: Stub implementation - will fail tests
            throw new NotImplementedException(
                "CalcFileNamePostPart not yet implemented. See EXT-008 in extraction-plan.md"
            );
        }

        /// <summary>
        /// Creates TranslationInformation for project type.
        /// For derived types, ensures base project has GUID first.
        ///
        /// Algorithm (from EXT-012):
        /// 1. If scrTextBasedOn != null: VersioningManager.EnsureHasGuid(scrTextBasedOn)
        /// 2. Return new TranslationInformation(projectType, baseName, baseGuid)
        ///
        /// For non-derived types (Standard), no base is required.
        /// For derived types (BackTranslation, Daughter, StudyBible, etc.), base is required.
        /// ConsultantNotes also requires a base project even though IsDerivedType returns false.
        /// </summary>
        /// <param name="projectType">Type of project to create</param>
        /// <param name="scrTextBasedOn">Base project (required for derived types, optional for others)</param>
        /// <returns>TranslationInformation configured for the project type</returns>
        /// <exception cref="InvalidOperationException">Thrown when derived type has no base project</exception>
        /// <seealso cref="EXT-012 in extraction-plan.md"/>
        public static TranslationInformation CalculateTranslationInfo(
            Enum<ProjectType> projectType,
            ScrText? scrTextBasedOn = null
        )
        {
            // 1. Check if project type requires a base project
            // IsDerivedType covers: BackTranslation, Daughter, StudyBible, Auxiliary,
            // TransliterationManual, TransliterationWithEncoder, StudyBibleAdditions
            // ConsultantNotes requires base but IsDerivedType returns false
            bool requiresBase =
                projectType.IsDerivedType() || projectType == ProjectType.ConsultantNotes;

            if (requiresBase && scrTextBasedOn == null)
            {
                throw new InvalidOperationException(
                    "Derived project types require a base project."
                );
            }

            // 2. If base provided, ensure it has GUID
            if (scrTextBasedOn != null)
            {
                VersioningManager.EnsureHasGuid(scrTextBasedOn);
            }

            // 3. Create TranslationInformation
            string? baseName = scrTextBasedOn?.Name;
            HexId? baseGuid = scrTextBasedOn?.Settings.Guid;

            return new TranslationInformation(projectType, baseName, baseGuid);
        }
    }
}

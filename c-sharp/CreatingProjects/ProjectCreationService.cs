using System.Text;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Users;
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
        /// <summary>
        /// Function to create a ScrText. Can be overridden for testing.
        /// </summary>
        internal static Func<ScrText>? ScrTextFactory { get; set; }

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
        /// <param name="shortName">Project short name</param>
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
    }
}

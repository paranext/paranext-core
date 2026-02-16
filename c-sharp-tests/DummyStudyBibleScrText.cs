using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;

namespace TestParanextDataProvider
{
    /// <summary>
    /// A dummy ScrText configured as a Study Bible project for testing.
    /// This class extends DummyScrText to provide StudyBible-specific settings.
    ///
    /// StudyBible projects are "derived" projects that require a base project.
    /// This is the base translation that the Study Bible adds study notes to.
    ///
    /// === NEW IN PT10 ===
    /// Reason: Test infrastructure needed for CAP-013 GetCompatibleCopyTargets
    /// Maps to: CAP-013 (test infrastructure)
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class DummyStudyBibleScrText : DummyScrText
    {
        /// <summary>
        /// Creates a DummyStudyBibleScrText linked to the specified base project.
        /// </summary>
        /// <param name="baseProject">The base project this Study Bible project is linked to.</param>
        public DummyStudyBibleScrText(ScrText baseProject)
            : base(
                new ProjectDetails(
                    "DummyStudyBible",
                    new ProjectMetadata(HexId.CreateNew().ToString(), []),
                    ""
                )
            )
        {
            // Configure as StudyBible project after base construction
            // Use the TranslationInfo setter which properly clears the cache
            ConfigureStudyBibleSettings(baseProject);
        }

        private void ConfigureStudyBibleSettings(ScrText baseProject)
        {
            // Use the TranslationInfo property setter, which:
            // 1. Calls SetSetting(Setting.TranslationInfo, value.ToString())
            // 2. Clears the cachedTranslationInfo
            // This ensures subsequent reads return the correct type
            //
            // StudyBible is a derived type that requires a base project
            Settings.TranslationInfo = new TranslationInformation(
                ProjectType.StudyBible,
                baseProject.Name, // Base project name required for StudyBible
                baseProject.Guid // Base project GUID required for StudyBible
            );
        }
    }
}

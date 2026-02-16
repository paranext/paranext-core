using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;

namespace TestParanextDataProvider
{
    /// <summary>
    /// A dummy ScrText configured as a Study Bible Additions project for testing.
    /// This class extends DummyScrText to provide SBA-specific settings.
    ///
    /// === NEW IN PT10 ===
    /// Reason: Test infrastructure needed for CAP-013 GetCompatibleCopyTargets
    /// Maps to: CAP-013 (test infrastructure)
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class DummySBAScrText : DummyScrText
    {
        /// <summary>
        /// Creates a DummySBAScrText linked to the specified base project.
        /// </summary>
        /// <param name="baseProject">The base project this SBA project is linked to.</param>
        public DummySBAScrText(ScrText baseProject)
            : base(
                new ProjectDetails(
                    "DummySBA",
                    new ProjectMetadata(HexId.CreateNew().ToString(), []),
                    ""
                )
            )
        {
            // Configure as SBA project after base construction
            // Use the TranslationInfo setter which properly clears the cache
            ConfigureSBASettings(baseProject);
        }

        private void ConfigureSBASettings(ScrText baseProject)
        {
            // Use the TranslationInfo property setter, which:
            // 1. Calls SetSetting(Setting.TranslationInfo, value.ToString())
            // 2. Clears the cachedTranslationInfo
            // This ensures subsequent reads return the correct type
            Settings.TranslationInfo = new TranslationInformation(
                ProjectType.StudyBibleAdditions,
                baseProject.Name, // Base project name required for SBA
                baseProject.Guid // Base project GUID required for SBA
            );
        }
    }
}

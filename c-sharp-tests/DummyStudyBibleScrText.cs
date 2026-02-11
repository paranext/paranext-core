using System.Diagnostics.CodeAnalysis;
using System.Reflection;
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
    /// === NEW IN PT10 ===
    /// Reason: Test infrastructure needed for CAP-013 GetCompatibleCopyTargets
    /// Maps to: CAP-013 (test infrastructure)
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class DummyStudyBibleScrText : DummyScrText
    {
        /// <summary>
        /// Creates a DummyStudyBibleScrText configured as a StudyBible project.
        /// </summary>
        public DummyStudyBibleScrText()
            : base(
                new ProjectDetails(
                    "DummyStudyBible",
                    new ProjectMetadata(HexId.CreateNew().ToString(), []),
                    ""
                )
            )
        {
            // Configure as StudyBible project after base construction
            // Note: TranslationInfo fields are readonly, so we use reflection to set them
            // This is only for testing purposes
            ConfigureStudyBibleSettings();
        }

        private void ConfigureStudyBibleSettings()
        {
            var translationInfo = Settings.TranslationInfo;

            // Try to find and set the Type field using reflection
            // Common backing field names: _type, type, Type, m_type
            var typeField = GetFieldByCommonNames(
                typeof(TranslationInformation),
                "Type",
                "_type",
                "type",
                "m_type"
            );

            if (typeField != null)
            {
                typeField.SetValue(translationInfo, ProjectType.StudyBible);
            }
            else
            {
                // Try setting via property if it has a setter
                var typeProp = typeof(TranslationInformation).GetProperty(
                    "Type",
                    BindingFlags.Public | BindingFlags.Instance
                );
                if (typeProp?.CanWrite == true)
                {
                    typeProp.SetValue(translationInfo, ProjectType.StudyBible);
                }
            }
        }

        private static FieldInfo? GetFieldByCommonNames(Type type, params string[] fieldNames)
        {
            foreach (var name in fieldNames)
            {
                // Try private instance fields
                var field = type.GetField(
                    name,
                    BindingFlags.NonPublic | BindingFlags.Instance
                );
                if (field != null)
                    return field;

                // Try public instance fields
                field = type.GetField(name, BindingFlags.Public | BindingFlags.Instance);
                if (field != null)
                    return field;
            }
            return null;
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;

namespace TestParanextDataProvider
{
    /// <summary>
    /// A dummy ScrText configured as a Study Bible Additions project for testing.
    /// This class extends DummyScrText to provide SBA-specific settings.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class DummySBAScrText : DummyScrText
    {
        private readonly HexId _baseProjectGuid;

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
            _baseProjectGuid = baseProject.Guid;

            // Configure as SBA project after base construction
            // Note: TranslationInfo fields are readonly, so we use reflection to set them
            // This is only for testing purposes
            ConfigureSBASettings();
        }

        private void ConfigureSBASettings()
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
                typeField.SetValue(translationInfo, ProjectType.StudyBibleAdditions);
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
                    typeProp.SetValue(translationInfo, ProjectType.StudyBibleAdditions);
                }
            }

            // Try to find and set the BaseProjectGuid field using reflection
            var baseProjectField = GetFieldByCommonNames(
                typeof(TranslationInformation),
                "BaseProjectGuid",
                "_baseProjectGuid",
                "baseProjectGuid",
                "m_baseProjectGuid"
            );

            if (baseProjectField != null)
            {
                baseProjectField.SetValue(translationInfo, _baseProjectGuid);
            }
            else
            {
                // Try setting via property if it has a setter
                var baseProjectProp = typeof(TranslationInformation).GetProperty(
                    "BaseProjectGuid",
                    BindingFlags.Public | BindingFlags.Instance
                );
                if (baseProjectProp?.CanWrite == true)
                {
                    baseProjectProp.SetValue(translationInfo, _baseProjectGuid);
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

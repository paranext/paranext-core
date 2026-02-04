using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Languages;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Users;
using PtxUtils;

namespace TestParanextDataProvider
{
    /// <summary>
    /// A variant of DummyScrText that does NOT append the GUID to the ShortName.
    /// This is needed for tests that verify ScrTextCollection.Find(shortName) behavior,
    /// because the standard DummyScrText appends the GUID making Find() lookups fail.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class DummyScrTextWithoutGuidSuffix : ScrText
    {
        private readonly HexId _id;

        public DummyScrTextWithoutGuidSuffix(ProjectDetails projectDetails)
            : base(
                new ProjectName
                {
                    ShortName = projectDetails.Name,
                    ProjectPath = projectDetails.HomeDirectory
                },
                RegistrationInfo.DefaultUser
            )
        {
            _id = HexId.FromStr(projectDetails.Metadata.Id);
            // NOTE: Unlike DummyScrText, we do NOT append the GUID to the ShortName
            // This allows ScrTextCollection.Find(shortName) to work correctly
            projectName = new ProjectName
            {
                ShortName = projectDetails.Name, // Keep original name without GUID suffix
                ProjectPath = projectDetails.HomeDirectory
            };

            Settings.Editable = true;
            Settings.UsfmVersion = UsfmVersionOption.Version3;

            cachedDefaultStylesheet.Set(new DummyScrStylesheet());
            cachedFrontBackStylesheet.Set(cachedDefaultStylesheet);

            LanguageId langId = new("dmy", null, null, null);
            DummyScrLanguage language = new(this);
            language.SetLanguageId(langId);
            language.Save(null);

            Settings.LanguageID = langId;
            language.ForceSaveLdml(this);
        }

        protected override void Load(bool ignoreLoadErrors = false)
        {
            // Nothing to do
        }

        protected override ProjectFileManager CreateFileManager()
        {
            return new InMemoryFileManager(this);
        }

        protected override ProjectSettings CreateProjectSettings(bool ignoreFileMissing)
        {
            ProjectSettings settings =
                new(this, true)
                {
                    FullName = "Test ScrText",
                    MinParatextDataVersion = ParatextInfo.MinSupportedParatextDataVersion,
                    Guid = _id
                };

            return settings;
        }
    }
}

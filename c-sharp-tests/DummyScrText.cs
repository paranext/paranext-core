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
    [ExcludeFromCodeCoverage]
    internal class DummyScrText : ScrText
    {
        private readonly HexId _id;

        public DummyScrText(ProjectDetails projectDetails)
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
            projectName = new ProjectName
            {
                ShortName = projectDetails.Name + _id,
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

        public DummyScrText()
            : this(
                new ProjectDetails(
                    "Dummy",
                    new ProjectMetadata(HexId.CreateNew().ToString(), []),
                    ""
                )
            ) { }

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

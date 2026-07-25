using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.TestUtilities;
using SIL.Xml;

namespace TestParanextDataProvider.Projects
{
    internal class TestLocalParatextProjectsInTempDir : LocalParatextProjects
    {
        // Owned only when this instance created the temp folder itself; null when the caller
        // passed an existing root (multi-instance tests that simulate a second app run over the
        // same project root own that folder's lifetime themselves).
        private readonly TemporaryFolder? _ownedFolder;
        private readonly string _rootFolder;

        public TestLocalParatextProjectsInTempDir(
            PapiClient? papiClient = null,
            string? existingRootFolder = null
        )
            : base(papiClient)
        {
            if (existingRootFolder == null)
            {
                _ownedFolder = new TemporaryFolder(TestContext.CurrentContext.Test.ID);
                _rootFolder = _ownedFolder.Path;
            }
            else
            {
                _rootFolder = existingRootFolder;
            }
        }

        public override void Dispose()
        {
            // Dispose the base's FileSystemWatcher and debounce Timer before the temp folder they
            // watch is torn down.
            base.Dispose();
            _ownedFolder?.Dispose();
            // Reset ScrTextCollection's folder to be the global test project folder
            ParatextData.Initialize(FixtureSetup.TestFolderPath, false);
        }

        protected override string ProjectRootFolder => _rootFolder;

        public string TestProjectRootFolder => _rootFolder;

        internal void CreateTempProject(string folder, ProjectDetails projectDetails)
        {
            var folderPath = Path.Combine(ProjectRootFolder, folder);
            CreateDirectory(folderPath);
            var settings = new MinimalParatextProjectSettings
            {
                Name = projectDetails.Name,
                Guid = projectDetails.Metadata.Id,
                // Baked-in functional language code. Just needed something that worked for ScrText
                // to load. Feel free to change this for testing purposes
                LanguageIsoCode = "en:::",
                // Baked-in functional Paratext version. Just needed something that worked for ScrText
                // to load. Feel free to change this for testing purposes
                MinParatextVersion = "8.0.100.76",
            };
            var settingsPath = Path.Join(folderPath, "Settings.xml");
            XmlSerializationHelper.SerializeToFileWithWriteThrough(settingsPath, settings);
        }
    }
}

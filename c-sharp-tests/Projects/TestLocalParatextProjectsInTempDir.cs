using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.TestUtilities;
using SIL.Xml;

namespace TestParanextDataProvider.Projects
{
    internal class TestLocalParatextProjectsInTempDir : LocalParatextProjects, IDisposable
    {
        private TemporaryFolder _folder;

        public TestLocalParatextProjectsInTempDir()
        {
            _folder = new TemporaryFolder(TestContext.CurrentContext.Test.ID);
        }

        public void Dispose()
        {
            _folder.Dispose();
            // Reset ScrTextCollection's folder to be the global test project folder
            ParatextData.Initialize(FixtureSetup.TestFolderPath, false);
        }

        protected override string ProjectRootFolder => _folder.Path;

        public string TestProjectRootFolder => _folder.Path;

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
                MinParatextVersion = "8.0.100.76"
            };
            var settingsPath = Path.Join(folderPath, "Settings.xml");
            XmlSerializationHelper.SerializeToFileWithWriteThrough(settingsPath, settings);
        }
    }
}

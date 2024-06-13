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
            ScrTextCollection.RefreshScrTexts();
        }

        protected override string ProjectRootFolder => _folder.Path;

        internal void CreateTempProject(string folder, ProjectMetadata projectMetadata)
        {
            var folderPath = Path.Combine(ProjectRootFolder, folder);
            CreateDirectory(folderPath);
            var settings = new MinimalParatextProjectSettings
            {
                Name = projectMetadata.Name,
                Guid = projectMetadata.ID
            };
            var settingsPath = Path.Join(folderPath, "Settings.xml");
            XmlSerializationHelper.SerializeToFileWithWriteThrough(settingsPath, settings);
        }
    }
}

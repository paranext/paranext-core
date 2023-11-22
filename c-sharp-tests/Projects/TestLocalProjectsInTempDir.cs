using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.TestUtilities;
using SIL.Xml;

namespace TestParanextDataProvider.Projects
{
    internal class TestLocalProjectsInTempDir : LocalProjects, IDisposable
    {
        private TemporaryFolder _folder;
        public TestLocalProjectsInTempDir()
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
            if (projectMetadata.ProjectType == ProjectMetadata.PARATEXT)
            {
                var settings = new MinimalParatextProjectSettings { Guid = projectMetadata.ID };
                var projectParatextSubdirectory = Path.Join(folderPath,
                    PROJECT_SUBDIRECTORY,
                    ProjectMetadata.PARATEXT);
                CreateDirectory(projectParatextSubdirectory);
                var settingsPath = Path.Join(projectParatextSubdirectory,
                    "Settings.xml");
                XmlSerializationHelper.SerializeToFileWithWriteThrough(settingsPath, settings);
            }

            SaveProjectMetadata(folderPath, projectMetadata, false);
        }
    }
}

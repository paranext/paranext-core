using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider
{
    internal class DummyLocalProjects : LocalProjects
    {
        private readonly Dictionary<string, ProjectDetails> _projectList = new();

        public void FakeAddProject(ProjectDetails details)
        {
            _projectList.Add(details.Metadata.ID, details);
        }

        public override void Initialize()
        {
            // Nothing to do
        }

        public override IList<ProjectDetails> GetAllProjectDetails()
        {
            return _projectList.Values.ToList();
        }

        public override ProjectDetails GetProjectDetails(string projectId)
        {
            return _projectList[projectId.ToUpperInvariant()];
        }
    }
}

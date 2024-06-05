using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyLocalParatextProjects : LocalParatextProjects
    {
        public void FakeAddProject(ProjectDetails details)
        {
            _projectDetailsMap[details.Metadata.ID] = details;
        }

        public override void Initialize(bool shouldIncludePT9ProjectsOnWindows)
        {
            // Nothing to do
        }
    }
}

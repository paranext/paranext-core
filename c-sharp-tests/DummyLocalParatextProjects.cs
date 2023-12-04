using Paranext.DataProvider.Projects;
using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyLocalParatextProjects : LocalParatextProjects
    {
        public void FakeAddProject(ProjectDetails details)
        {
            _projectDetailsMap[details.Metadata.ID] = details;
        }

        public override void Initialize()
        {
            // Nothing to do
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyLocalParatextProjects : LocalParatextProjects
    {
        public void FakeAddProject(ProjectDetails details)
        {
            var dummyScrText = new DummyScrText(details);
            ScrTextCollection.Add(dummyScrText, true);
        }

        public override void Initialize(bool shouldIncludePT9ProjectsOnWindows)
        {
            // Nothing to do
        }
    }
}

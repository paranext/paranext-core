using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyLocalParatextProjects : LocalParatextProjects
    {
        public DummyLocalParatextProjects()
            : base(new AppInfo("test-app", "0.0.0", "test-app")) { }

        public void FakeAddProject(ProjectDetails details, ScrText? scrText = null)
        {
            scrText ??= new DummyScrText(details);
            ScrTextCollection.Add(scrText, true);
        }

        public override void Initialize()
        {
            // Nothing to do
        }
    }
}

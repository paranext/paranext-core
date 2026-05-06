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
            : base(new AppInfo("platform-bible", "0.0.0", "platform-bible")) { }

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

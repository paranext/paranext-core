using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyLocalParatextProjects : LocalParatextProjects
    {
        public DummyLocalParatextProjects()
            : base() { }

        public void FakeAddProject(ProjectDetails details, ScrText? scrText = null)
        {
            scrText ??= new DummyScrText(details);
            ScrTextCollection.Add(scrText, true);
        }

        public override void Initialize()
        {
            // Nothing to do
        }

        public override void EnsureMinimalInitialized()
        {
            // Nothing to do (mirrors Initialize: tests fake projects straight into the global
            // ScrTextCollection and must not re-point ParatextData at the real project root)
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyLocalParatextProjects : LocalParatextProjects
    {
        private readonly List<ScrText> _addedProjects = [];

        public DummyLocalParatextProjects()
            : base() { }

        public void FakeAddProject(ProjectDetails details, ScrText? scrText = null)
        {
            scrText ??= new DummyScrText(details);
            ScrTextCollection.Add(scrText, true);
            _addedProjects.Add(scrText);
        }

        public override void Initialize()
        {
            // Nothing to do
        }

        public override void Dispose()
        {
            // A test often disposes its project before this runs, and ParatextData's project
            // listings skip a disposed project, so a teardown that removes what they list leaves it
            // loaded. A project left loaded breaks the next test that loads projects from a folder.
            foreach (ScrText scrText in _addedProjects)
                ScrTextCollection.Remove(scrText, false);
            _addedProjects.Clear();
            base.Dispose();
        }
    }
}

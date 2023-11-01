using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider
{
    internal class DummyParatextProjectStorageInterpreter : ParatextProjectStorageInterpreter
    {
        public DummyParatextProjectStorageInterpreter(PapiClient papiClient, DummyLocalProjects projects) : base(papiClient, projects)
        {
        }

        // No overrides yet. This here for future expansion.
    }
}

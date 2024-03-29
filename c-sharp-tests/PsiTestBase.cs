using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal abstract class PsiTestBase : PapiTestBase
    {
        public override void TestSetup()
        {
            base.TestSetup();

            Psi = new DummyParatextProjectStorageInterpreter(Client, ParatextProjects);
        }

        protected DummyParatextProjectStorageInterpreter Psi { get; private set; } = null!; // Will be non-null when tests are run
    }
}

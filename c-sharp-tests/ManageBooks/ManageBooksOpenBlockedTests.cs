using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Manage Books refuses a project Platform.Bible can't open (a Study Bible Additions project),
    /// whether it is the project being changed or the source of a copy, with FAILED_PRECONDITION.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ManageBooksOpenBlockedTests : PapiTestBase
    {
        private const string GenesisUsfm = "\\id GEN\r\n\\c 1\r\n\\v 1 content\r\n";

        private DummyScrText _fromScrText = null!;
        private DummyScrText _toScrText = null!;
        private string _fromProjectId = null!;
        private string _toProjectId = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _fromScrText = (DummyScrText)CreateDummyProject();
            _toScrText = (DummyScrText)CreateDummyProject();
            _fromScrText.PutText(1, 0, false, GenesisUsfm, null);

            var fromDetails = CreateProjectDetails(_fromScrText);
            var toDetails = CreateProjectDetails(_toScrText);
            _fromProjectId = fromDetails.Metadata.Id;
            _toProjectId = toDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(fromDetails, _fromScrText);
            ParatextProjects.FakeAddProject(toDetails, _toScrText);

            var pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await pdpFactory.InitializeAsync();
            _service = new ManageBooksService(Client, ParatextProjects, pdpFactory);
            await _service.RegisterNetworkObjectAsync();
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _fromScrText?.Dispose();
            _toScrText?.Dispose();
        }

        private static void AssertRefusedWithFailedPrecondition(Func<Task> call)
        {
            var exception = Assert.ThrowsAsync<ProjectOpenBlockedException>(
                async () => await call()
            );
            Assert.That(exception!.Message, Does.EndWith(ProjectOpenBlockedException.Sentinel));
            Assert.That(
                exception.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition)
            );
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
        }

        [Test]
        public void GetProjectBookDates_StudyBibleAdditions_Refuses()
        {
            MakeStudyBibleAdditions(_fromScrText);

            AssertRefusedWithFailedPrecondition(
                () => _service.GetProjectBookDatesAsync(_fromProjectId)
            );
        }

        [Test]
        public async Task GetProjectBookDates_Standard_ReturnsDates()
        {
            BookComparisonResult result = await _service.GetProjectBookDatesAsync(_fromProjectId);

            Assert.That(result.Entries, Is.Not.Empty);
        }

        [Test]
        public void DeleteBooks_StudyBibleAdditions_Refuses()
        {
            MakeStudyBibleAdditions(_fromScrText);

            AssertRefusedWithFailedPrecondition(
                () => _service.DeleteBooksAsync(new DeleteBooksRequest(_fromProjectId, [1]))
            );
        }

        [Test]
        public void CopyBooks_StudyBibleAdditionsSource_Refuses()
        {
            MakeStudyBibleAdditions(_fromScrText);

            AssertRefusedWithFailedPrecondition(
                () =>
                    _service.CopyBooksAsync(new CopyBooksRequest(_fromProjectId, _toProjectId, [1]))
            );
        }

        [Test]
        public async Task CopyBooks_Standard_Copies()
        {
            CopyBooksResult result = await _service.CopyBooksAsync(
                new CopyBooksRequest(_fromProjectId, _toProjectId, [1])
            );

            Assert.That(result.Success, Is.True);
        }
    }
}

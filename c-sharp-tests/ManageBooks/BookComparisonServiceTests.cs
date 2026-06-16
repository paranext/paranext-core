using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-level tests for <see cref="ManageBooksService.GetBookComparisonAsync"/>
    /// (CAP-006).
    ///
    /// These are the OUTER wire acceptance tests for CAP-006 — they prove the
    /// <c>("getBookComparison", GetBookComparisonAsync)</c> entry in
    /// <c>ManageBooksService.RegisterNetworkObjectAsync</c>'s function table is
    /// reachable, takes a <see cref="BookComparisonInput"/>, and returns a
    /// <see cref="BookComparisonResult"/> (Section 4.7).
    ///
    /// Orchestrator-layer decision-tree logic (six comparison states) lives in
    /// <see cref="CopyBooksOrchestratorTests"/>. These tests assert the
    /// <b>wire shape + preconditions</b>: registration, project resolution,
    /// error-code mapping, and the read-only invariant.
    ///
    /// Error codes (Theme 7, FN-002): the data-contracts.md Section 4.7
    /// contract names <c>INVALID_PROJECT</c> and <c>SAME_PROJECT</c> codes that
    /// are not in the PlatformErrorCode gRPC union. Per alignment-decisions.md
    /// Theme 7 ("adopt the existing taxonomy, no custom codes"), they map to:
    ///
    ///     | Contract (Section 4.7) | PlatformErrorCode       |
    ///     |------------------------|-------------------------|
    ///     | INVALID_PROJECT        | NOT_FOUND               |
    ///     | SAME_PROJECT           | INVALID_ARGUMENT        |
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BookComparisonServiceTests : PapiTestBase
    {
        private DummyScrText _fromScrText = null!;
        private DummyScrText _toScrText = null!;
        private string _fromProjectId = null!;
        private string _toProjectId = null!;
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _fromScrText = (DummyScrText)CreateDummyProject();
            _toScrText = (DummyScrText)CreateDummyProject();

            var fromDetails = CreateProjectDetails(_fromScrText);
            var toDetails = CreateProjectDetails(_toScrText);
            _fromProjectId = fromDetails.Metadata.Id;
            _toProjectId = toDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(fromDetails, _fromScrText);
            ParatextProjects.FakeAddProject(toDetails, _toScrText);

            _pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await _pdpFactory.InitializeAsync();

            _service = new ManageBooksService(Client, ParatextProjects, _pdpFactory);
            await _service.RegisterNetworkObjectAsync();
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _fromScrText?.Dispose();
            _toScrText?.Dispose();
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: wire entry is reachable and returns contract shape
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "OUTER wire acceptance: GetBookComparisonAsync takes a "
                + "BookComparisonInput and returns a non-null BookComparisonResult "
                + "with at least one entry per the LoadBooks contract (Section 4.7)."
        )]
        public async Task GetBookComparisonAsync_ValidInput_ReturnsBookComparisonResult()
        {
            var input = new BookComparisonInput(_fromProjectId, _toProjectId);

            BookComparisonResult result = await _service.GetBookComparisonAsync(input);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Entries, Is.Not.Null);
            Assert.That(
                result.Entries,
                Is.Not.Empty,
                "Two empty projects still yield entries because the admin can create books"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-023")]
        [Property("BehaviorId", "BHV-313")]
        [Property("InvariantId", "INV-C07")]
        [Description(
            "Wire round-trip: when source has GEN and dest is empty, the entry "
                + "for GEN must report DestDoesNotExist with DefaultIncluded=true. "
                + "This exercises the full chain from wire request → project "
                + "resolution → LoadBooks → SetDefaultEligibility."
        )]
        public async Task GetBookComparisonAsync_SourceHasBookDestDoesNot_ReturnsDestDoesNotExist()
        {
            _fromScrText.PutText(1, 0, false, "\\id GEN content\r\n", null);

            var input = new BookComparisonInput(_fromProjectId, _toProjectId);
            BookComparisonResult result = await _service.GetBookComparisonAsync(input);

            BookComparisonEntry? gen = result.Entries.FirstOrDefault(e => e.BookNum == 1);
            Assert.That(gen, Is.Not.Null, "Wire result must include an entry for GEN (1)");
            Assert.That(gen!.ComparisonState, Is.EqualTo(ComparisonState.DestDoesNotExist));
            Assert.That(gen.DefaultIncluded, Is.True);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "Every entry from the wire result has a non-empty BookName and a "
                + "1-based BookNum — minimal contract shape from Section 3.5."
        )]
        public async Task GetBookComparisonAsync_EntriesHaveValidBookNumAndName()
        {
            var input = new BookComparisonInput(_fromProjectId, _toProjectId);
            BookComparisonResult result = await _service.GetBookComparisonAsync(input);

            foreach (var entry in result.Entries)
            {
                Assert.That(entry.BookNum, Is.GreaterThan(0), "BookNum must be 1-based");
                Assert.That(
                    entry.BookName,
                    Is.Not.Null.And.Not.Empty,
                    $"Entry {entry.BookNum} must have a non-empty BookName"
                );
            }
        }

        // -------------------------------------------------------------------
        // ERROR CONTRACT (Section 4.7)
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Description(
            "Section 4.7 SAME_PROJECT: source and dest are the same project → "
                + "INVALID_ARGUMENT (Theme 7 maps SAME_PROJECT to INVALID_ARGUMENT)."
        )]
        public void GetBookComparisonAsync_SameProject_ThrowsInvalidArgument()
        {
            var input = new BookComparisonInput(_fromProjectId, _fromProjectId);

            Exception? caught = null;
            try
            {
                _service.GetBookComparisonAsync(input).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "SAME_PROJECT maps to INVALID_ARGUMENT per Theme 7"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Description(
            "Section 4.7 INVALID_PROJECT (source): unknown FromProjectId → "
                + "NOT_FOUND (Theme 7 maps INVALID_PROJECT to NOT_FOUND)."
        )]
        public void GetBookComparisonAsync_UnknownSourceProject_ThrowsNotFound()
        {
            var input = new BookComparisonInput(
                FromProjectId: "ffffffffffffffffffffffffffffffffffffffff", // unregistered 40-char HexId
                ToProjectId: _toProjectId
            );

            Exception? caught = null;
            try
            {
                _service.GetBookComparisonAsync(input).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(caught!.Data["platformErrorCode"], Is.EqualTo(PlatformErrorCodes.NotFound));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Description("Section 4.7 INVALID_PROJECT (dest): unknown ToProjectId → NOT_FOUND.")]
        public void GetBookComparisonAsync_UnknownDestProject_ThrowsNotFound()
        {
            var input = new BookComparisonInput(
                FromProjectId: _fromProjectId,
                ToProjectId: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" // unregistered
            );

            Exception? caught = null;
            try
            {
                _service.GetBookComparisonAsync(input).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(caught!.Data["platformErrorCode"], Is.EqualTo(PlatformErrorCodes.NotFound));
        }

        // -------------------------------------------------------------------
        // READ-ONLY INVARIANT — CAP-006 emits no project update events
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "CAP-006 is read-only per strategic plan: GetBookComparisonAsync "
                + "must NOT emit SendFullProjectUpdateEvent on the from-PDP or "
                + "the to-PDP (no mutation — book comparison only)."
        )]
        public async Task GetBookComparisonAsync_DoesNotEmitProjectUpdateEvent()
        {
            // Ensure BOTH PDPs are live so a spurious SendFullProjectUpdateEvent
            // on either side would be detectable.
            _pdpFactory.GetProjectDataProviderID(_fromProjectId);
            _pdpFactory.GetProjectDataProviderID(_toProjectId);
            var eventsBefore = Client.SentEventCount;

            await _service.GetBookComparisonAsync(
                new BookComparisonInput(_fromProjectId, _toProjectId)
            );

            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "CAP-006 is read-only; no project-update events may fire."
            );
        }
    }
}

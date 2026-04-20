using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-level tests for <see cref="ManageBooksService"/>.ParseImportFilesAsync
    /// and CheckOverlappingFilesAsync (CAP-009).
    ///
    /// These are the OUTER acceptance tests for CAP-009 — they exercise the
    /// full chain from request arrival through project lookup, orchestrator
    /// invocation, and result return. Inner orchestrator contract (parsing,
    /// extraction, overlap detection, SetDefaultEligibility reuse) is covered
    /// in <see cref="ImportBooksOrchestratorTests"/>.
    ///
    /// Contracts:
    /// - <c>ImportBooksInput</c>   (wire): data-contracts.md Section 2.5
    /// - <c>BookComparisonResult</c> (wire, reused from CAP-006): Section 3.5
    /// - <c>OverlapCheckEntry</c>  (wire): Section 4.12
    /// - <c>ValidationResult</c>   (wire, reused from CAP-004): Section 3.7
    /// - <c>ParseImportFiles</c>   (method): Section 4.10
    /// - <c>CheckOverlappingFiles</c> (method): Section 4.12
    ///
    /// Integration (Theme 6 NEGATIVE): CAP-009 is read-only. After successful
    /// parsing or overlap checks, the service MUST NOT call
    /// <c>SendFullProjectUpdateEvent</c> — these are query operations, not
    /// mutations. The negative-path tests assert no events fire (mirrors the
    /// CAP-004 ValidateCreateBooks and CAP-006 GetBookComparison patterns).
    ///
    /// Error codes (Theme 7, FN-002): All error paths throw via
    /// <c>PlatformErrorCodes.WithCode(code, message)</c>.
    ///
    /// | Precondition failure            | PlatformErrorCode |
    /// |---------------------------------|-------------------|
    /// | Unknown ProjectId               | NOT_FOUND         |
    ///
    /// Behaviors exercised: BHV-106, BHV-107, BHV-109 (reused), BHV-318 (wire
    /// exposure); full parsing behaviors are in the orchestrator tests.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ImportBooksServiceTests : PapiTestBase
    {
        private DummyScrText _scrText = null!;
        private string _projectId = null!;
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = (DummyScrText)CreateDummyProject();
            var details = CreateProjectDetails(_scrText);
            _projectId = details.Metadata.Id;
            ParatextProjects.FakeAddProject(details, _scrText);

            _pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await _pdpFactory.InitializeAsync();

            _service = new ManageBooksService(Client, ParatextProjects, _pdpFactory);
            await _service.RegisterNetworkObjectAsync();
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _scrText?.Dispose();
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: ParseImportFilesAsync happy path
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-017")]
        [Property("BehaviorId", "BHV-107")]
        [Property("SpecId", "spec-003")]
        [Description(
            "OUTER acceptance: valid request with one USFM file containing \\id "
                + "GEN → service resolves the project, parses the content, and "
                + "returns a BookComparisonResult with one entry for GEN. This "
                + "proves the full wire path works end-to-end."
        )]
        public async Task ParseImportFilesAsync_ValidInput_ReturnsBookComparisonResult()
        {
            var request = new ImportBooksInput(
                ProjectId: _projectId,
                Files: new[]
                {
                    new ImportFileEntry(
                        FileName: "gen.sfm",
                        Content: "\\id GEN\n\\c 1\n\\v 1 text",
                        Included: true
                    ),
                },
                ReplaceEntireBook: true
            );

            BookComparisonResult result = await _service.ParseImportFilesAsync(request);

            Assert.That(result.Entries, Has.Count.EqualTo(1));
            Assert.That(result.Entries[0].BookNum, Is.EqualTo(1), "GEN = book 1");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ForwardNote", "FN-002")]
        [Description(
            "Theme 7 / FN-002: unknown ProjectId → NOT_FOUND. Mirrors the "
                + "DeleteBooksAsync / CopyBooksAsync / GetBookComparisonAsync "
                + "guard pattern."
        )]
        public void ParseImportFilesAsync_UnknownProjectId_ThrowsNotFound()
        {
            var request = new ImportBooksInput(
                ProjectId: "non-existent-project-id",
                Files: new[]
                {
                    new ImportFileEntry(
                        FileName: "gen.sfm",
                        Content: "\\id GEN\n\\c 1\n\\v 1 text",
                        Included: true
                    ),
                },
                ReplaceEntireBook: true
            );

            var ex = Assert.ThrowsAsync<Exception>(
                async () => await _service.ParseImportFilesAsync(request)
            );
            Assert.That(
                ex!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.NotFound),
                "unknown project should map to NOT_FOUND"
            );
        }

        // -------------------------------------------------------------------
        // THEME 6 NEGATIVE: read-only — no SendFullProjectUpdateEvent
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-009")]
        [Description(
            "Theme 6 negative: successful ParseImportFilesAsync does NOT call "
                + "SendFullProjectUpdateEvent — CAP-009 is read-only. Mirrors "
                + "the ValidateCreateBooks / GetBookComparison read-only pattern."
        )]
        public async Task ParseImportFilesAsync_Success_DoesNotCallSendFullProjectUpdateEvent()
        {
            // Force creation of a PDP so the factory's event plumbing is wired.
            _pdpFactory.GetProjectDataProviderID(_projectId);
            var eventsBefore = Client.SentEventCount;

            await _service.ParseImportFilesAsync(
                new ImportBooksInput(
                    ProjectId: _projectId,
                    Files: new[]
                    {
                        new ImportFileEntry(
                            FileName: "gen.sfm",
                            Content: "\\id GEN\n\\c 1\n\\v 1 text",
                            Included: true
                        ),
                    },
                    ReplaceEntireBook: true
                )
            );

            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "read-only parse should not emit any events"
            );
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: CheckOverlappingFilesAsync
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-085")]
        [Property("BehaviorId", "BHV-318")]
        [Property("GoldenMaster", "gm-012")]
        [Description(
            "gm-012 / TS-085: two included files targeting the same book → "
                + "the wire method returns ValidationResult.Error with the "
                + "canonical PT9 message. OUTER acceptance for CheckOverlappingFiles."
        )]
        public async Task CheckOverlappingFilesAsync_TwoFilesSameBook_ReturnsErrorSeverity()
        {
            var entries = new[]
            {
                new OverlapCheckEntry(FileName: "gen-v1.sfm", BookNum: 1, Included: true),
                new OverlapCheckEntry(FileName: "gen-v2.sfm", BookNum: 1, Included: true),
            };

            ValidationResult result = await _service.CheckOverlappingFilesAsync(entries);

            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Error));
            Assert.That(
                result.Message,
                Is.EqualTo(ImportBooksOrchestrator.OverlappingFilesAlertMessage)
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-085")]
        [Property("BehaviorId", "BHV-318")]
        [Description("Happy path: non-overlapping book numbers → ValidationResult.Ok.")]
        public async Task CheckOverlappingFilesAsync_NoDuplicates_ReturnsOkSeverity()
        {
            var entries = new[]
            {
                new OverlapCheckEntry(FileName: "gen.sfm", BookNum: 1, Included: true),
                new OverlapCheckEntry(FileName: "exo.sfm", BookNum: 2, Included: true),
            };

            ValidationResult result = await _service.CheckOverlappingFilesAsync(entries);

            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-009")]
        [Description(
            "Theme 6 negative: CheckOverlappingFilesAsync does NOT call "
                + "SendFullProjectUpdateEvent — it's a pure client-side validation "
                + "with no project mutation. Note: this method doesn't touch "
                + "projects at all (it operates on the OverlapCheckEntry[] array "
                + "directly), so there is no PDP to notify even in principle."
        )]
        public async Task CheckOverlappingFilesAsync_Success_DoesNotCallSendFullProjectUpdateEvent()
        {
            _pdpFactory.GetProjectDataProviderID(_projectId);
            var eventsBefore = Client.SentEventCount;

            await _service.CheckOverlappingFilesAsync(
                new[] { new OverlapCheckEntry(FileName: "gen.sfm", BookNum: 1, Included: true) }
            );

            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "pure-validation method should not emit any events"
            );
        }
    }
}

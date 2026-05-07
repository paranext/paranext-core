using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;

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
            // Service-layer (wire) test: DummyPapiClient is unregistered so
            // LocalizationService.GetLocalizedString returns the English
            // fallback verbatim. Asserts on the resolved English wording —
            // not the key — because the wire boundary resolves before return.
            Assert.That(
                result.Message,
                Is.EqualTo(ImportBooksOrchestrator.OverlappingFilesAlertFallback)
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

        // =====================================================================
        // CAP-010: ImportBooksAsync wire-level tests (Theme 8 AlertCapture +
        // Theme 6 SendFullProjectUpdateEvent + Theme 7 PlatformError codes)
        //
        // These are the OUTER acceptance tests for CAP-010's wire method —
        // they exercise the full chain from ImportBooksInput arrival through
        // project lookup, orchestrator invocation (with AlertCapture wrap),
        // SendFullProjectUpdateEvent emission on success, and the
        // ImportBooksResult wire shape. Inner orchestrator contract is
        // covered above in ImportBooksOrchestratorTests.ImportBooks_* tests.
        //
        // Integration (Theme 6): After successful import the service MUST
        // call _pdpFactory.GetExistingProjectDataProvider(projectId)?
        // .SendFullProjectUpdateEvent() so
        // useProjectSetting('platformScripture.booksPresent') subscribers
        // re-fetch.
        //
        // Error codes (Theme 7, FN-002): All error paths throw via
        // PlatformErrorCodes.WithCode(code, message).
        //
        // | Precondition failure               | PlatformErrorCode    |
        // |------------------------------------|----------------------|
        // | Unknown ProjectId                  | NOT_FOUND            |
        // | Non-editable project               | FAILED_PRECONDITION  |
        // | Non-admin on shared project        | PERMISSION_DENIED    |
        // | Overlapping files in included set  | FAILED_PRECONDITION  |
        // | WriteLock unavailable              | UNAVAILABLE          |
        //
        // UI-layer deferrals (TS-083/084/085/086 for BHV-318 ImportBooksForm)
        // are covered by the UI phase — the server-side execution exposed
        // here assumes a valid ImportBooksInput has arrived from the UI.
        // =====================================================================

        // -------------------------------------------------------------------
        // ACCEPTANCE: ImportBooksAsync happy-path OUTER
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-105")]
        [Property("SpecId", "spec-003")]
        [Description(
            "OUTER acceptance: valid ImportBooksInput with one USFM file → "
                + "service resolves the project, guards pass, orchestrator "
                + "runs, and the wire returns an ImportBooksResult with "
                + "Success=true and ImportedCount=1. This proves the full wire "
                + "path works end-to-end for CAP-010."
        )]
        public async Task ImportBooksAsync_ValidInput_ReturnsSuccessResult()
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

            ImportBooksResult result = await _service.ImportBooksAsync(request);

            Assert.That(result.Success, Is.True, "OUTER acceptance: Success=true");
            Assert.That(result.ImportedCount, Is.EqualTo(1));
            Assert.That(result.Errors, Is.Empty);
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(1),
                Is.True,
                "INV-C08: GEN should be present after OUTER acceptance path"
            );
        }

        // -------------------------------------------------------------------
        // THEME 6: SendFullProjectUpdateEvent fires on success, NOT on failure
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Theme 6: after a successful import, the service calls "
                + "SendFullProjectUpdateEvent on the target project's PDP so "
                + "useProjectSetting('platformScripture.booksPresent') "
                + "subscribers re-fetch. Mirrors CAP-005/CAP-007/CAP-004 Theme 6 "
                + "pattern (at least one event fires after a mutation)."
        )]
        public async Task ImportBooksAsync_Success_CallsSendFullProjectUpdateEventOnPdp()
        {
            // Arrange: create a PDP so GetExistingProjectDataProvider returns non-null.
            _pdpFactory.GetProjectDataProviderID(_projectId);
            int eventsBefore = Client.SentEventCount;

            await _service.ImportBooksAsync(
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
                Is.GreaterThan(eventsBefore),
                "SendFullProjectUpdateEvent must fire on target PDP after success"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-010")]
        [Description(
            "Theme 6 negative: a failing ImportBooksAsync (unknown project → "
                + "NOT_FOUND) does NOT fire SendFullProjectUpdateEvent. "
                + "Mirrors CAP-005/CAP-007 negative-path Theme 6 test."
        )]
        public void ImportBooksAsync_Failure_DoesNotCallSendFullProjectUpdateEvent()
        {
            _pdpFactory.GetProjectDataProviderID(_projectId);
            int eventsBefore = Client.SentEventCount;

            Exception? caught = null;
            try
            {
                _service
                    .ImportBooksAsync(
                        new ImportBooksInput(
                            ProjectId: "0123456789ABCDEF0123456789ABCDEF01234567",
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
                    )
                    .GetAwaiter()
                    .GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "unknown projectId must throw");
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "No additional event should fire on a failed import"
            );
        }

        // -------------------------------------------------------------------
        // THEME 7 (FN-002): PlatformError code mapping
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ForwardNote", "FN-002")]
        [Description(
            "Theme 7: Unknown ProjectId → NOT_FOUND (mirrors "
                + "ParseImportFilesAsync_UnknownProjectId_ThrowsNotFound and "
                + "the generic project-resolution guard pattern across "
                + "CAP-005/007)."
        )]
        public void ImportBooksAsync_UnknownProjectId_ThrowsNotFound()
        {
            var request = new ImportBooksInput(
                ProjectId: "0123456789ABCDEF0123456789ABCDEF01234567",
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

            Exception? caught = null;
            try
            {
                _service.ImportBooksAsync(request).GetAwaiter().GetResult();
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
        [Category("Critical")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-405")]
        [Property("InvariantId", "INV-004")]
        [Description(
            "TS-075 / BHV-405 / VAL-013: non-admin on a shared project → "
                + "PERMISSION_DENIED. Mirrors the CAP-005/CAP-007 "
                + "IsSharedProjectWithoutAdmin guard; ensures the wire method "
                + "enforces the PT9 CanCreateOrImportBooks gate before "
                + "delegating to the orchestrator."
        )]
        public void ImportBooksAsync_NonAdminOnSharedProject_ThrowsPermissionDenied()
        {
            var nonAdminShared = new NonAdminSharedScrText();
            ProjectDetails details = CreateProjectDetails(nonAdminShared);
            ParatextProjects.FakeAddProject(details, nonAdminShared);

            var request = new ImportBooksInput(
                ProjectId: details.Metadata.Id,
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

            Exception? caught = null;
            try
            {
                _service.ImportBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.PermissionDenied),
                "non-admin on shared project must map to PERMISSION_DENIED (Theme 7)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("InvariantId", "INV-003")]
        [Description(
            "INV-003 / Theme 7: a non-editable project rejects import with "
                + "FAILED_PRECONDITION (mirrors CreateBooksAsync's "
                + "EnsureProjectEditable guard)."
        )]
        public void ImportBooksAsync_NonEditableProject_ThrowsFailedPrecondition()
        {
            var readOnlyScrText = new DummyScrText();
            readOnlyScrText.Settings.Editable = false;
            ProjectDetails details = CreateProjectDetails(readOnlyScrText);
            ParatextProjects.FakeAddProject(details, readOnlyScrText);

            var request = new ImportBooksInput(
                ProjectId: details.Metadata.Id,
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

            Exception? caught = null;
            try
            {
                _service.ImportBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition),
                "INV-003: non-editable project must map to FAILED_PRECONDITION"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("InvariantId", "INV-002")]
        [Property("InvariantId", "INV-C01")]
        [Property("ScenarioId", "TS-015")]
        [Description(
            "TS-015 / INV-002 / INV-C01 / Theme 7: when the orchestrator "
                + "surfaces a WriteLock failure (simulated via the "
                + "LockNotObtainedScrText marker), the service maps it to "
                + "platformErrorCode=UNAVAILABLE (mirrors the CAP-005/CAP-007 "
                + "LockNotObtainedException catch-and-remap pattern)."
        )]
        public void ImportBooksAsync_WriteLockUnavailable_ThrowsUnavailable()
        {
            var lockedScrText = new LockNotObtainedScrText();
            ProjectDetails details = CreateProjectDetails(lockedScrText);
            ParatextProjects.FakeAddProject(details, lockedScrText);

            var request = new ImportBooksInput(
                ProjectId: details.Metadata.Id,
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

            Exception? caught = null;
            try
            {
                _service.ImportBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.Unavailable),
                "LockNotObtainedException must map to UNAVAILABLE per Theme 7"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-085")]
        [Property("ValidationId", "VAL-012")]
        [Description(
            "VAL-012 / Theme 7: overlapping book numbers in the included "
                + "file set → FAILED_PRECONDITION. The wire method MUST "
                + "detect and reject overlapping files before delegating to "
                + "the orchestrator, because the UI may have passed an invalid "
                + "selection. Uses the same overlap-detection logic exposed "
                + "by CAP-009's CheckOverlappingFiles."
        )]
        public void ImportBooksAsync_OverlappingFilesIncluded_ThrowsFailedPrecondition()
        {
            var request = new ImportBooksInput(
                ProjectId: _projectId,
                Files: new[]
                {
                    new ImportFileEntry(
                        FileName: "gen-v1.sfm",
                        Content: "\\id GEN\n\\c 1\n\\v 1 first",
                        Included: true
                    ),
                    new ImportFileEntry(
                        FileName: "gen-v2.sfm",
                        Content: "\\id GEN\n\\c 1\n\\v 1 second",
                        Included: true
                    ),
                },
                ReplaceEntireBook: true
            );

            Exception? caught = null;
            try
            {
                _service.ImportBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition),
                "VAL-012: overlapping included files must map to FAILED_PRECONDITION"
            );
        }

        // -------------------------------------------------------------------
        // Support: ScrText subclasses for failure scenarios. Mirrors
        // CopyBooksServiceTests / DeleteBooksServiceTests seams.
        // -------------------------------------------------------------------

        /// <summary>
        /// Shared-project destination where the current user is not an admin.
        /// Uses the natural ScrText seam (overrides <see cref="ScrText.Permissions"/>)
        /// so the service's <c>IsProjectShared &amp;&amp; !AmAdministrator</c>
        /// check fires. Mirrors <c>CopyBooksServiceTests.NonAdminSharedScrText</c>.
        /// </summary>
        private sealed class NonAdminSharedScrText : DummyScrText
        {
            private readonly NonAdminPermissionManager _permissions = new();

            public override PermissionManager Permissions => _permissions;

            private sealed class NonAdminPermissionManager : PermissionManager
            {
                // Non-null Data makes HasPermissionsDefined = true, which
                // makes ScrText.IsProjectShared = true.
                protected override InternalProjectUserAccessData Data { get; set; } =
                    new InternalProjectUserAccessData();

                public override bool AmAdministrator => false;
            }
        }

        /// <summary>
        /// Marker ScrText that triggers the orchestrator's WriteLock failure
        /// path (either by throwing <c>LockNotObtainedException</c> or by
        /// returning <c>Success=false</c> — implementer's choice). The
        /// service maps either outcome to <c>UNAVAILABLE</c> per Theme 7.
        /// Parallels CAP-007 <c>LockNotObtainedScrText</c>.
        /// </summary>
        private sealed class LockNotObtainedScrText : DummyScrText { }
    }
}

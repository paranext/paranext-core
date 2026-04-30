using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-level tests for <see cref="ManageBooksService"/>.CopyBooksAsync
    /// and CopyCustomVersificationAsync (CAP-007, including M-014 absorbed
    /// per RM-012).
    ///
    /// These are the OUTER acceptance tests for CAP-007 — they exercise the
    /// full chain from <c>CopyBooksRequest</c> arrival through project
    /// lookup, orchestrator invocation, <c>SendFullProjectUpdateEvent</c>
    /// emission on the DESTINATION PDP, and <c>CopyBooksResult</c> return
    /// shape. Inner orchestrator contract (per-book GetText→PutText loop,
    /// partial success for TS-092, LastCopiedBookNum=max, WriteLock release)
    /// is covered in <see cref="CopyBooksOrchestratorTests"/>.
    ///
    /// Contracts:
    /// - <c>CopyBooksInput</c>   (wire): data-contracts.md Section 2.4
    /// - <c>CopyBooksResult</c>  (wire): data-contracts.md Section 3.4
    /// - <c>CopyBooks</c>        (method): data-contracts.md Section 4.8
    /// - <c>CopyCustomVersification</c>: data-contracts.md Section 4.14
    ///
    /// Integration (Theme 6): After successful copy, the service MUST call
    /// <c>_pdpFactory.GetExistingProjectDataProvider(toProjectId)?.SendFullProjectUpdateEvent()</c>
    /// on the DESTINATION (not source) PDP so
    /// <c>useProjectSetting('platformScripture.booksPresent')</c> subscribers
    /// on the destination project re-fetch. The source PDP does NOT receive
    /// the event — copy is read-only on the source.
    ///
    /// Error codes (Theme 7, FN-002): All error paths throw via
    /// <c>PlatformErrorCodes.WithCode(code, message)</c> so the exception
    /// carries a <c>Data["platformErrorCode"]</c> entry.
    ///
    /// | Precondition failure               | PlatformErrorCode    |
    /// |------------------------------------|----------------------|
    /// | Empty BookNumbers                  | INVALID_ARGUMENT     |
    /// | fromProjectId == toProjectId       | INVALID_ARGUMENT     |
    /// | Unknown fromProjectId              | NOT_FOUND            |
    /// | Unknown toProjectId                | NOT_FOUND            |
    /// | Non-admin on shared destination    | PERMISSION_DENIED    |
    /// | WriteLock unavailable              | UNAVAILABLE          |
    ///
    /// Behaviors exercised: BHV-403 (menu handler → Copy dialog), BHV-313
    /// (both projects required), BHV-101 (PutText used during copy, covered
    /// transitively), BHV-168 (CopyCustomVersification).
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CopyBooksServiceTests : PapiTestBase
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

            // Seed source with GEN, EXO so Copy has something to move
            _fromScrText.PutText(1, 0, false, "\\id GEN Source\n\\c 1\n\\v 1 a", null);
            _fromScrText.PutText(2, 0, false, "\\id EXO Source\n\\c 1\n\\v 1 a", null);

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
        // ACCEPTANCE: happy path — full wire flow for CAP-007
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-063")]
        [Property("BehaviorId", "BHV-101")]
        [Property("SpecId", "spec-002")]
        [Description(
            "OUTER acceptance: valid copy request books copied and correct "
                + "result shape returned (Section 3.4)."
        )]
        public async Task CopyBooksAsync_ValidRequest_SucceedsWithCorrectResult()
        {
            // Arrange
            var request = new CopyBooksRequest(_fromProjectId, _toProjectId, new[] { 1 });

            // Act
            CopyBooksResult result = await _service.CopyBooksAsync(request);

            // Assert — result shape (Section 3.4)
            Assert.That(result.Success, Is.True);
            Assert.That(result.CopiedCount, Is.EqualTo(1));
            Assert.That(result.LastCopiedBookNum, Is.EqualTo(1));
            Assert.That(result.Errors, Is.Empty);
            Assert.That(result.Warnings, Is.Empty);

            // Assert — observable side effect on destination (INV-C08)
            Assert.That(
                _toScrText.BooksPresentSet.IsSelected(1),
                Is.True,
                "GEN should now be present in the destination"
            );
        }

        // -------------------------------------------------------------------
        // THEME 6: Event emission fires on DESTINATION, not source.
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-101")]
        [Description(
            "Theme 6: After successful copy, service calls "
                + "SendFullProjectUpdateEvent on the DESTINATION project's PDP "
                + "(not source). This differs from Delete/Create where the "
                + "single project IS the target."
        )]
        public async Task CopyBooksAsync_Success_CallsSendFullProjectUpdateEventOnDestinationPdp()
        {
            // Arrange: create a PDP for the DESTINATION so
            // _pdpFactory.GetExistingProjectDataProvider(destId) returns non-null.
            _pdpFactory.GetProjectDataProviderID(_toProjectId);
            var destPdp = _pdpFactory.GetExistingProjectDataProvider(_toProjectId);
            Assert.That(
                destPdp,
                Is.Not.Null,
                "precondition: a PDP must exist for the destination project"
            );
            var eventsBefore = Client.SentEventCount;

            // Act
            await _service.CopyBooksAsync(
                new CopyBooksRequest(_fromProjectId, _toProjectId, new[] { 1 })
            );

            // Assert: at least one event was fired (the DATA_TYPE_UPDATE from
            // SendFullProjectUpdateEvent on the destination PDP).
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBefore),
                "Expected SendFullProjectUpdateEvent to fire on destination PDP after copy"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-101")]
        [Description(
            "Theme 6 negative: failure paths do NOT fire the update event on "
                + "the destination PDP (mirrors the CAP-005 negative-path test)."
        )]
        public async Task CopyBooksAsync_Failure_DoesNotCallSendFullProjectUpdateEvent()
        {
            // Arrange: ensure a destination PDP exists, run a successful copy
            // first to prove the wiring, then run a failing copy (empty book
            // numbers → INVALID_ARGUMENT) and verify no extra event fires.
            _pdpFactory.GetProjectDataProviderID(_toProjectId);

            // Success baseline
            await _service.CopyBooksAsync(
                new CopyBooksRequest(_fromProjectId, _toProjectId, new[] { 2 })
            );
            var eventsAfterSuccess = Client.SentEventCount;
            Assert.That(
                eventsAfterSuccess,
                Is.GreaterThan(0),
                "baseline: success should fire at least one event"
            );

            // Act: empty BookNumbers → INVALID_ARGUMENT (no event)
            Exception? thrown = null;
            try
            {
                await _service.CopyBooksAsync(
                    new CopyBooksRequest(_fromProjectId, _toProjectId, Array.Empty<int>())
                );
            }
            catch (Exception ex)
            {
                thrown = ex;
            }

            Assert.That(thrown, Is.Not.Null, "empty book numbers must throw");
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsAfterSuccess),
                "No additional event should fire on a failed copy"
            );
        }

        // -------------------------------------------------------------------
        // THEME 7: PlatformError code mapping
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-313")]
        [Description("Precondition: BookNumbers must be non-empty → INVALID_ARGUMENT.")]
        public void CopyBooksAsync_EmptyBookNumbers_ThrowsInvalidArgument()
        {
            var request = new CopyBooksRequest(_fromProjectId, _toProjectId, Array.Empty<int>());

            Exception? caught = null;
            try
            {
                _service.CopyBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument)
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "BHV-313: Source and destination must be different — copying a "
                + "project to itself is rejected (INVALID_ARGUMENT per Theme 7, "
                + "parallel to GetBookComparisonAsync's SAME_PROJECT guard)."
        )]
        public void CopyBooksAsync_SameFromAndToProject_ThrowsInvalidArgument()
        {
            // Arrange: fromProjectId == toProjectId
            var request = new CopyBooksRequest(_fromProjectId, _fromProjectId, new[] { 1 });

            Exception? caught = null;
            try
            {
                _service.CopyBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "Same source/destination must map to INVALID_ARGUMENT (Theme 7)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Description(
            "Unknown fromProjectId → NOT_FOUND (Theme 7 mapping; parallel to "
                + "DeleteBooksAsync_UnknownProjectId_ThrowsNotFound)."
        )]
        public void CopyBooksAsync_UnknownFromProjectId_ThrowsNotFound()
        {
            // HexId-valid but unregistered
            var request = new CopyBooksRequest(
                "0123456789ABCDEF0123456789ABCDEF01234567",
                _toProjectId,
                new[] { 1 }
            );

            Exception? caught = null;
            try
            {
                _service.CopyBooksAsync(request).GetAwaiter().GetResult();
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
        [Property("CapabilityId", "CAP-007")]
        [Description(
            "Unknown toProjectId → NOT_FOUND (Theme 7). Verifies both source "
                + "and destination are independently validated."
        )]
        public void CopyBooksAsync_UnknownToProjectId_ThrowsNotFound()
        {
            var request = new CopyBooksRequest(
                _fromProjectId,
                "FEDCBA9876543210FEDCBA9876543210FEDCBA98",
                new[] { 1 }
            );

            Exception? caught = null;
            try
            {
                _service.CopyBooksAsync(request).GetAwaiter().GetResult();
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
        [Property("CapabilityId", "CAP-007")]
        [Property("InvariantId", "INV-001")]
        [Property("InvariantId", "INV-C02")]
        [Description(
            "INV-001 / INV-C02: non-admin on a shared DESTINATION fails with "
                + "PERMISSION_DENIED. Admin check applies to the destination "
                + "because copy writes books to the destination (Section 4.8 "
                + "preconditions). Source can be read without admin."
        )]
        public void CopyBooksAsync_NonAdminOnSharedDestination_ThrowsPermissionDenied()
        {
            // Arrange: the DESTINATION is a shared project without admin;
            // source remains admin. Mirrors the CAP-005 NonAdminSharedScrText
            // seam but applied to the destination project.
            var nonAdminSharedDest = new NonAdminSharedScrText();
            var destDetails = CreateProjectDetails(nonAdminSharedDest);
            ParatextProjects.FakeAddProject(destDetails, nonAdminSharedDest);
            var request = new CopyBooksRequest(
                _fromProjectId,
                destDetails.Metadata.Id,
                new[] { 1 }
            );

            Exception? caught = null;
            try
            {
                _service.CopyBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "Expected non-admin shared destination to throw.");
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.PermissionDenied),
                "Admin failure on shared destination must map to PERMISSION_DENIED (Theme 7)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("InvariantId", "INV-002")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "INV-C01 / Theme 7: LockNotObtainedException from the orchestrator "
                + "is mapped to platformErrorCode=UNAVAILABLE at the service "
                + "layer (parallels DeleteBooksAsync_WriteLockUnavailable_ThrowsUnavailable)."
        )]
        public void CopyBooksAsync_WriteLockUnavailable_ThrowsUnavailable()
        {
            // Arrange: destination is the LockNotObtainedScrText marker (the
            // orchestrator recognises it and throws LockNotObtainedException).
            var lockedDest = new LockNotObtainedScrText();
            var lockedDetails = CreateProjectDetails(lockedDest);
            ParatextProjects.FakeAddProject(lockedDetails, lockedDest);
            var request = new CopyBooksRequest(
                _fromProjectId,
                lockedDetails.Metadata.Id,
                new[] { 1 }
            );

            Exception? caught = null;
            try
            {
                _service.CopyBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.Unavailable),
                "LockNotObtainedException on destination must map to UNAVAILABLE."
            );
        }

        // -------------------------------------------------------------------
        // M-014: CopyCustomVersification wire entry (BHV-168, TS-048)
        // -------------------------------------------------------------------

        // Seeds a minimal custom.vrs file into the source project's
        // InMemoryFileManager so HasCustomVersification(_fromScrText) returns
        // true. Any non-empty content satisfies the file-existence probe — the
        // orchestrator's TryCopyCustomVersification swallows downstream
        // ProjectSettings.CopyCustomVersification exceptions for DummyScrText.
        private void SeedCustomVersificationOnSource()
        {
            using TextWriter writer = _fromScrText.FileManager.OpenFileForWrite("custom.vrs");
            writer.Write("# minimal custom versification placeholder\n");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-048")]
        [Property("BehaviorId", "BHV-168")]
        [Description(
            "TS-048 / BHV-168 (positive path): when the source has a custom.vrs, "
                + "CopyCustomVersificationAsync must NOT throw. Verifies the "
                + "wire path resolves both projects, the precondition check passes, "
                + "and the orchestrator runs to completion (the orchestrator's "
                + "deep contract is verified in CopyBooksOrchestratorTests)."
        )]
        public void CopyCustomVersificationAsync_SourceHasCustomVrs_DoesNotThrow()
        {
            SeedCustomVersificationOnSource();

            Assert.DoesNotThrowAsync(
                async () =>
                    await _service.CopyCustomVersificationAsync(_fromProjectId, _toProjectId),
                "wire path must complete cleanly when source has a custom.vrs"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-168")]
        [Description(
            "Theme 5 NO_CUSTOM_VERSIFICATION precondition (data-contracts §4.14): "
                + "when the source project has no custom.vrs file, the wire entry "
                + "must throw a FailedPrecondition error so callers can distinguish "
                + "'copied' from 'no file to copy'. Without this guard, prior "
                + "behavior silently returned Task.CompletedTask in both cases."
        )]
        public void CopyCustomVersificationAsync_SourceMissingCustomVrs_ThrowsFailedPrecondition()
        {
            // No SeedCustomVersificationOnSource call — _fromScrText.FileManager
            // does not contain custom.vrs, so HasCustomVersification returns false.

            Exception? caught = null;
            try
            {
                _service
                    .CopyCustomVersificationAsync(_fromProjectId, _toProjectId)
                    .GetAwaiter()
                    .GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "missing custom.vrs must surface an error");
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition),
                "platformErrorCode must match data-contracts §4.14 NO_CUSTOM_VERSIFICATION"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-168")]
        [Description(
            "Unknown fromProjectId on CopyCustomVersification → NOT_FOUND "
                + "(Theme 7; mirrors the general project-resolution guard). "
                + "Resolution failure precedes the NO_CUSTOM_VERSIFICATION "
                + "precondition so an unknown project surfaces the more specific "
                + "NOT_FOUND code rather than FAILED_PRECONDITION."
        )]
        public void CopyCustomVersificationAsync_UnknownFromProjectId_ThrowsNotFound()
        {
            const string unknownProjectId = "0123456789ABCDEF0123456789ABCDEF01234567";

            Exception? caught = null;
            try
            {
                _service
                    .CopyCustomVersificationAsync(unknownProjectId, _toProjectId)
                    .GetAwaiter()
                    .GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(caught!.Data["platformErrorCode"], Is.EqualTo(PlatformErrorCodes.NotFound));
        }

        // -------------------------------------------------------------------
        // Support: ScrText subclasses for destination-side failure scenarios.
        //
        // Mirrors DeleteBooksServiceTests.NonAdminSharedScrText /
        // LockNotObtainedScrText. Same markers, applied to the destination
        // project for Copy.
        // -------------------------------------------------------------------

        /// <summary>
        /// Shared-project destination where the current user is not an admin.
        /// Uses the natural ScrText seam (overrides <see cref="ScrText.Permissions"/>)
        /// so the service's <c>IsProjectShared &amp;&amp; !AmAdministrator</c>
        /// check fires naturally. Parallels
        /// <c>DeleteBooksServiceTests.NonAdminSharedScrText</c>.
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
        /// Marker destination that triggers LockNotObtainedException from the
        /// orchestrator. The orchestrator recognises the type name (single
        /// documented test seam; parallels <c>LockNotObtainedMarkerTypeName</c>
        /// in <c>DeleteBooksOrchestrator</c>). Also seeds book 1 in its
        /// BooksPresentSet so the orchestrator's pre-flight BookPresent
        /// checks pass — the failure must come from the lock, not from
        /// an earlier precondition miss.
        /// </summary>
        private sealed class LockNotObtainedScrText : DummyScrText
        {
            private readonly BookSet _booksPresent;

            public LockNotObtainedScrText()
            {
                _booksPresent = new BookSet();
                _booksPresent.Add(1);
            }

            public override BookSet BooksPresentSet => _booksPresent;
        }
    }
}

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
    /// Wire-level tests for <see cref="ManageBooksService"/>.DeleteBooksAsync (CAP-005).
    ///
    /// These are the OUTER acceptance tests for CAP-005 — they exercise the full
    /// chain from <c>DeleteBooksRequest</c> arrival through project lookup,
    /// orchestrator invocation, <c>SendFullProjectUpdateEvent</c> emission,
    /// and <c>DeleteBooksResult</c> return shape.
    ///
    /// Contracts:
    /// - <c>DeleteBooksInput</c> (wire): data-contracts.md Section 2.3
    /// - <c>DeleteBooksResult</c> (wire): data-contracts.md Section 3.3
    /// - <c>DeleteBooks</c> (method):    data-contracts.md Section 4.6
    ///
    /// Integration (Theme 6): After successful delete, the service MUST call
    /// <c>_pdpFactory.GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()</c>
    /// so <c>useProjectSetting('platformScripture.booksPresent')</c> subscribers re-fetch.
    ///
    /// Error codes (Theme 7, FN-002): All error paths throw via
    /// <c>PlatformErrorCodes.WithCode(code, message)</c> so the exception carries
    /// a <c>Data["platformErrorCode"]</c> entry for the network layer to forward
    /// to TS <c>newPlatformError()</c>.
    ///
    /// | Precondition failure            | PlatformErrorCode   |
    /// |---------------------------------|---------------------|
    /// | WriteLock unavailable           | UNAVAILABLE         |
    /// | Non-admin on shared project     | PERMISSION_DENIED   |
    /// | Empty BookNumbers               | INVALID_ARGUMENT    |
    /// | Unknown projectId               | NOT_FOUND           |
    /// | Books not in project            | NOT_FOUND           |
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class DeleteBooksServiceTests : PapiTestBase
    {
        private DummyScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private string _projectId = null!;
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = (DummyScrText)CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            _projectId = _projectDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            // Seed with GEN, EXO, LEV
            _scrText.PutText(1, 0, false, "\\id GEN Test\n\\c 1\n\\v 1 a", null);
            _scrText.PutText(2, 0, false, "\\id EXO Test\n\\c 1\n\\v 1 a", null);
            _scrText.PutText(3, 0, false, "\\id LEV Test\n\\c 1\n\\v 1 a", null);

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
        // ACCEPTANCE: happy path
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-001")]
        [Property("BehaviorId", "BHV-100")]
        [Property("BehaviorId", "BHV-404")] // Theme 8: BooksPresentSet update post-delete (transitive observation below)
        [Property("BehaviorId", "BHV-126")] // Theme 8: file-system delete via FileManager.Delete
        [Property("SpecId", "spec-001")]
        [Description("OUTER acceptance: valid request deletes book and returns success result.")]
        public async Task DeleteBooksAsync_ValidRequest_SucceedsWithCorrectResult()
        {
            // Arrange
            var request = new DeleteBooksRequest(_projectId, new[] { 1 });

            // Act
            DeleteBooksResult result = await _service.DeleteBooksAsync(request);

            // Assert — result contract (Section 3.3)
            Assert.That(result.Success, Is.True);
            Assert.That(result.DeletedCount, Is.EqualTo(1));
            Assert.That(result.Errors, Is.Empty);
            Assert.That(result.Warnings, Is.Empty);

            // Assert — observable side effect: book actually gone
            Assert.That(_scrText.BooksPresentSet.IsSelected(1), Is.False);
            Assert.That(_scrText.BooksPresentSet.IsSelected(2), Is.True);
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-002")]
        [Property("BehaviorId", "BHV-100")]
        [Description("Deleting multiple books returns deletedCount equal to request length.")]
        public async Task DeleteBooksAsync_MultipleBooks_DeletedCountMatchesRequest()
        {
            var request = new DeleteBooksRequest(_projectId, new[] { 1, 2, 3 });

            var result = await _service.DeleteBooksAsync(request);

            Assert.That(result.Success, Is.True);
            Assert.That(result.DeletedCount, Is.EqualTo(3));
            Assert.That(_scrText.BooksPresentSet.Count, Is.EqualTo(0));
        }

        // -------------------------------------------------------------------
        // THEME 6: Event emission after mutation
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Theme 6: After successful delete, service calls SendFullProjectUpdateEvent on the affected project's PDP."
        )]
        public async Task DeleteBooksAsync_Success_CallsSendFullProjectUpdateEvent()
        {
            // Arrange: create a PDP for this project so _pdpFactory.GetExistingProjectDataProvider returns non-null
            _pdpFactory.GetProjectDataProviderID(_projectId);
            var pdp = _pdpFactory.GetExistingProjectDataProvider(_projectId);
            Assert.That(pdp, Is.Not.Null, "precondition: a PDP must exist for the project");

            // Theme 7 (2026-04-30): drain the event queue BEFORE the act so
            // we can assert exactly one NEW event of the expected shape
            // afterwards. The prior `SentEventCount > eventsBefore` assertion
            // accepted any event firing (including unrelated ones from PDP
            // setup) — too permissive.
            DrainEventQueue();

            // Act
            await _service.DeleteBooksAsync(new DeleteBooksRequest(_projectId, new[] { 1 }));

            // Assert: exactly one new event, type `<pdp-name>:onDidUpdate` with
            // payload `*` (the full-project-update marker per
            // DataProvider.SendDataUpdateEventAsync). This proves
            // SendFullProjectUpdateEvent fired AND targeted this project's PDP.
            string expectedEventType = $"{pdp!.DataProviderName}:onDidUpdate";
            (string eventType, object? eventParameters) ev = Client.NextSentEvent;
            Assert.That(
                ev.eventType,
                Is.EqualTo(expectedEventType),
                "Expected the DESTINATION PDP's onDidUpdate event"
            );
            Assert.That(
                ev.eventParameters,
                Is.EqualTo("*"),
                "Full project update fires with the '*' dataScope marker"
            );
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(0),
                "no other events should fire on a successful delete"
            );
        }

        // Drain pre-existing events so post-action assertions see only
        // events fired by the action under test.
        private void DrainEventQueue()
        {
            while (Client.SentEventCount > 0)
                _ = Client.NextSentEvent;
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description("Theme 6 negative: failure paths do NOT fire the update event.")]
        public async Task DeleteBooksAsync_Failure_DoesNotCallSendFullProjectUpdateEvent()
        {
            // Arrange: run a successful delete first so we know at least one
            // event WAS fired — this proves the fixture is wired correctly.
            // Then run a failing delete (empty book numbers → INVALID_ARGUMENT)
            // and verify the event counter did NOT increase further.
            _pdpFactory.GetProjectDataProviderID(_projectId);

            // Success baseline — delete GEN, expect at least one event
            await _service.DeleteBooksAsync(new DeleteBooksRequest(_projectId, new[] { 2 }));
            var eventsAfterSuccess = Client.SentEventCount;
            Assert.That(
                eventsAfterSuccess,
                Is.GreaterThan(0),
                "baseline: success should fire at least one event"
            );

            // Act: pass empty book numbers → INVALID_ARGUMENT (no event should fire)
            Exception? thrown = null;
            try
            {
                await _service.DeleteBooksAsync(
                    new DeleteBooksRequest(_projectId, Array.Empty<int>())
                );
            }
            catch (Exception ex)
            {
                thrown = ex;
            }

            // Assert: the failure actually occurred (proves this is the failure path)
            Assert.That(thrown, Is.Not.Null, "empty book numbers must throw");

            // And: no additional event was fired
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsAfterSuccess),
                "No additional event should fire on a failed delete"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Theme 6: when no PDP exists for the project, the null-safe pattern pdp?.SendFullProjectUpdateEvent() is a no-op (delete still succeeds)."
        )]
        public async Task DeleteBooksAsync_NoPdpExists_StillSucceeds()
        {
            // Arrange — do NOT create a PDP for this project
            var pdp = _pdpFactory.GetExistingProjectDataProvider(_projectId);
            Assert.That(pdp, Is.Null, "precondition: no PDP exists yet for this project");

            // Act
            var result = await _service.DeleteBooksAsync(
                new DeleteBooksRequest(_projectId, new[] { 1 })
            );

            // Assert — the operation itself still succeeds even with no subscribers
            Assert.That(result.Success, Is.True);
            Assert.That(_scrText.BooksPresentSet.IsSelected(1), Is.False);
        }

        // -------------------------------------------------------------------
        // THEME 7: PlatformError code mapping
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-100")]
        [Property("InvariantId", "INV-C02")]
        [Property("SpecId", "spec-005")]
        [Description(
            "INV-C02 / VAL-011: non-admin on shared project fails with PERMISSION_DENIED."
        )]
        public void DeleteBooksAsync_NonAdminOnSharedProject_ThrowsPermissionDenied()
        {
            // Arrange: use a ScrText that reports itself as a shared project
            // where the current user is not an administrator.
            //
            // NOTE: the DummyScrText default user is an admin. The service MUST
            // expose a contract where, upon detecting "shared project + user is
            // not admin", it throws via PlatformErrorCodes.WithCode(PERMISSION_DENIED).
            // The implementer chooses the detection mechanism (Permissions check,
            // ProjectRole check, etc.) — this test asserts ONLY the observable
            // outcome for that pre-computed state.
            var nonAdminShared = new NonAdminSharedScrText();
            var details = CreateProjectDetails(nonAdminShared);
            ParatextProjects.FakeAddProject(details, nonAdminShared);
            var request = new DeleteBooksRequest(details.Metadata.Id, new[] { 1 });

            // Act + Assert
            Exception? caught = null;
            try
            {
                _service.DeleteBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "Expected non-admin shared-project request to throw.");
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.PermissionDenied),
                "Admin failure in a shared project must map to PERMISSION_DENIED (Theme 7)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-100")]
        [Property("InvariantId", "INV-C01")]
        [Property("SpecId", "spec-001")]
        [Description(
            "INV-C01: LockNotObtainedException from ScrText is mapped to platformErrorCode=UNAVAILABLE."
        )]
        public void DeleteBooksAsync_WriteLockUnavailable_ThrowsUnavailable()
        {
            // Arrange: use a ScrText whose DeleteBooks throws LockNotObtainedException.
            // The service layer must catch this and re-throw via PlatformErrorCodes.WithCode(UNAVAILABLE, ...).
            //
            // The implementer will decide whether to test this via a real held lock
            // or a testing seam on the orchestrator. Here we verify the OBSERVABLE
            // contract: when the orchestrator call path raises LockNotObtained,
            // the service maps it to UNAVAILABLE.
            var lockedScrText = new LockNotObtainedScrText();
            var details = CreateProjectDetails(lockedScrText);
            ParatextProjects.FakeAddProject(details, lockedScrText);
            var request = new DeleteBooksRequest(details.Metadata.Id, new[] { 1 });

            // Act + Assert
            Exception? caught = null;
            try
            {
                _service.DeleteBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.Unavailable),
                "LockNotObtainedException must map to UNAVAILABLE (Theme 7 mapping table)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Empty BookNumbers violates the precondition 'BookNumbers must be non-empty' → INVALID_ARGUMENT."
        )]
        public void DeleteBooksAsync_EmptyBookNumbers_ThrowsInvalidArgument()
        {
            var request = new DeleteBooksRequest(_projectId, Array.Empty<int>());

            Exception? caught = null;
            try
            {
                _service.DeleteBooksAsync(request).GetAwaiter().GetResult();
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
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description("Unknown project id → NOT_FOUND per Theme 7 mapping table.")]
        public void DeleteBooksAsync_UnknownProjectId_ThrowsNotFound()
        {
            // HexId-valid but not registered
            var request = new DeleteBooksRequest(
                "0123456789ABCDEF0123456789ABCDEF01234567",
                new[] { 1 }
            );

            Exception? caught = null;
            try
            {
                _service.DeleteBooksAsync(request).GetAwaiter().GetResult();
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
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Requesting books that are not in the project → NOT_FOUND (precondition 'All specified books must exist')."
        )]
        public void DeleteBooksAsync_BookNotInProject_ThrowsNotFound()
        {
            // Book 99 (3JN) isn't present in our seed — only GEN/EXO/LEV (1,2,3)
            var request = new DeleteBooksRequest(_projectId, new[] { 99 });

            Exception? caught = null;
            try
            {
                _service.DeleteBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(caught!.Data["platformErrorCode"], Is.EqualTo(PlatformErrorCodes.NotFound));
        }

        // -------------------------------------------------------------------
        // Support: ScrText that always reports LockNotObtained on DeleteBooks.
        // -------------------------------------------------------------------

        /// <summary>
        /// Test-local ScrText subclass that raises <see cref="LockNotObtainedException"/>
        /// whenever the implementer's orchestrator attempts a delete on it. This is
        /// detected by the orchestrator via a single documented type-name probe
        /// (the only test seam where no natural virtual hook exists — neither
        /// <c>WriteLockManager.ObtainLock</c> nor <c>ScrText.DeleteBooks</c> is
        /// virtual). See <see cref="DeleteBooksOrchestrator"/> for details.
        ///
        /// The subclass also reports book 1 as present so the service's
        /// book-existence precondition passes and the orchestrator is actually
        /// reached.
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

        /// <summary>
        /// Test-local ScrText subclass representing a shared project where the
        /// current user is not an administrator. Uses the natural ScrText seam:
        /// overrides <see cref="ScrText.Permissions"/> to return a
        /// <see cref="PermissionManager"/> subclass whose data is non-null
        /// (making <c>HasPermissionsDefined = true</c>, and therefore
        /// <c>ScrText.IsProjectShared = true</c>) and whose
        /// <c>AmAdministrator = false</c>. The service's production
        /// <c>scrText.IsProjectShared &amp;&amp; !scrText.Permissions.AmAdministrator</c>
        /// check thus fires naturally — no type-name probe required.
        /// </summary>
        private sealed class NonAdminSharedScrText : DummyScrText
        {
            private readonly NonAdminPermissionManager _permissions = new();

            public override PermissionManager Permissions => _permissions;

            private sealed class NonAdminPermissionManager : PermissionManager
            {
                // Non-null Data makes HasPermissionsDefined = true, which makes
                // ScrText.IsProjectShared = true.
                protected override InternalProjectUserAccessData Data { get; set; } =
                    new InternalProjectUserAccessData();

                public override bool AmAdministrator => false;
            }
        }
    }
}

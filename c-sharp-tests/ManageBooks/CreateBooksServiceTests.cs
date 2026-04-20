using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-level tests for <see cref="ManageBooksService"/>'s CAP-004
    /// methods: <c>CreateBooksAsync</c>, <c>GetAvailableBooksForCreationAsync</c>,
    /// <c>ValidateCreateBooksAsync</c>.
    ///
    /// These are the OUTER acceptance tests for CAP-004 — they exercise the full
    /// chain from wire request arrival through project lookup, orchestrator
    /// invocation, <c>SendFullProjectUpdateEvent</c> emission (for CreateBooks
    /// only — Theme 6), and result return shape.
    ///
    /// Contracts:
    /// - <c>CreateBooksInput</c>/<c>CreateBooksRequest</c> (wire): data-contracts.md Section 2.2
    /// - <c>CreateBooksResult</c> (wire):                           data-contracts.md Section 3.2
    /// - <c>ValidationResult</c> (wire):                            data-contracts.md Section 3.7
    /// - <c>GetAvailableBooksForCreation</c> (method):              data-contracts.md Section 4.3
    /// - <c>CreateBooks</c> (method):                               data-contracts.md Section 4.4
    /// - <c>ValidateCreateBooks</c> (method):                       data-contracts.md Section 4.5
    ///
    /// Integration (Theme 6): After successful create, the service MUST call
    /// <c>_pdpFactory.GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()</c>
    /// so <c>useProjectSetting('platformScripture.booksPresent')</c> subscribers re-fetch.
    ///
    /// Error codes (Theme 7, FN-002): Per strategic plan and backend-alignment.md:
    ///
    /// | Precondition failure                  | PlatformErrorCode    |
    /// |---------------------------------------|----------------------|
    /// | Empty BookNumbers (VAL-010)           | INVALID_ARGUMENT     |
    /// | Model project required for FromTemplate (VAL-009) | INVALID_ARGUMENT |
    /// | Unknown target projectId              | NOT_FOUND            |
    /// | Missing (unknown) model projectId     | FAILED_PRECONDITION  |
    /// | Non-editable project (INV-003)        | FAILED_PRECONDITION  |
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CreateBooksServiceTests : PapiTestBase
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

        // ---- Test-local fixture helpers ------------------------------------

        /// <summary>
        /// Registers a second DummyScrText as a "model" project under a
        /// distinct HexId and returns its project id. Seed the model with
        /// any books the caller needs.
        /// </summary>
        private string AddModelProject(Action<DummyScrText>? seed = null)
        {
            var modelScrText = new DummyScrText();
            seed?.Invoke(modelScrText);
            var details = CreateProjectDetails(modelScrText);
            ParatextProjects.FakeAddProject(details, modelScrText);
            return details.Metadata.Id;
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: CreateBooksAsync happy path (spec-002, BHV-402, TS-072)
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Property("SpecId", "spec-002")]
        [Description(
            "OUTER acceptance: valid CreateBooksRequest creates the book and "
                + "returns a Success=true result with CreatedCount=1."
        )]
        public async Task CreateBooksAsync_ValidRequest_SucceedsWithCorrectResult()
        {
            // Arrange
            var request = new CreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 65 }, // JUD
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            // Act
            CreateBooksResult result = await _service.CreateBooksAsync(request);

            // Assert — result contract (Section 3.2)
            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(1));
            Assert.That(result.Errors, Is.Empty);
            Assert.That(result.Warnings, Is.Empty);
            Assert.That(result.LastCreatedBookNum, Is.EqualTo(65));

            // Assert — observable side effect: book exists in project
            Assert.That(_scrText.BooksPresentSet.IsSelected(65), Is.True);
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-089")]
        [Property("InvariantId", "INV-C13")]
        [Description(
            "TS-089: creating multiple books returns CreatedCount = request length "
                + "and LastCreatedBookNum = the highest successful book number."
        )]
        public async Task CreateBooksAsync_MultipleBooks_ReturnsCorrectCountAndLastCreated()
        {
            var request = new CreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 1, 2, 3 },
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            var result = await _service.CreateBooksAsync(request);

            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(3));
            Assert.That(result.LastCreatedBookNum, Is.EqualTo(3));
            Assert.That(_scrText.BooksPresentSet.Count, Is.EqualTo(3));
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: GetAvailableBooksForCreationAsync (gm-005, TS-050)
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-050")]
        [Property("BehaviorId", "BHV-305")]
        [Property("GoldenMaster", "gm-005")]
        [Description(
            "gm-005 acceptance at wire layer: GetAvailableBooksForCreationAsync "
                + "returns int[] excluding existing books. GEN+EXO seeded → result "
                + "excludes 1,2; includes LEV (3) and REV (66)."
        )]
        public async Task GetAvailableBooksForCreationAsync_ReturnsAvailableBookNumbers()
        {
            // Arrange — seed GEN + EXO (matches gm-005 input)
            _scrText.PutText(1, 0, false, "\\id GEN\n", null);
            _scrText.PutText(2, 0, false, "\\id EXO\n", null);

            // Act
            int[] available = await _service.GetAvailableBooksForCreationAsync(_projectId);

            // Assert
            Assert.That(available, Does.Not.Contain(1), "GEN (1) must be excluded");
            Assert.That(available, Does.Not.Contain(2), "EXO (2) must be excluded");
            Assert.That(available, Does.Contain(3), "LEV (3) must remain");
            Assert.That(available, Does.Contain(66), "REV (66) must remain");
            Assert.That(
                available.Length,
                Is.GreaterThanOrEqualTo(64),
                "gm-005: at least 64 books available (66 canonical - 2 excluded)"
            );
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: ValidateCreateBooksAsync (TS-052, TS-053)
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-052")]
        [Property("BehaviorId", "BHV-306")]
        [Description("Valid Empty-method request → ValidationResult.Severity == Ok.")]
        public async Task ValidateCreateBooksAsync_ValidInput_ReturnsOk()
        {
            var request = new ValidateCreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            var result = await _service.ValidateCreateBooksAsync(request);

            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-053")]
        [Property("BehaviorId", "BHV-306")]
        [Property("InvariantId", "INV-023")]
        [Description(
            "TS-053: versification mismatch between project (English) and model "
                + "(Vulgate) → ValidationResult.Severity == Warning."
        )]
        public async Task ValidateCreateBooksAsync_VersificationMismatch_ReturnsWarning()
        {
            // Arrange — add a model project with Vulgate versification and GEN seeded
            string modelId = AddModelProject(model =>
            {
                model.Settings.Versification = ScrVers.Vulgate;
                model.PutText(1, 0, false, "\\id GEN\n", null);
            });

            var request = new ValidateCreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.FromTemplate,
                ModelProjectId: modelId
            );

            // Act
            var result = await _service.ValidateCreateBooksAsync(request);

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Warning));
        }

        // -------------------------------------------------------------------
        // THEME 6: Event emission after mutation
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "Theme 6: after a successful CreateBooks, the service calls "
                + "SendFullProjectUpdateEvent on the affected project's PDP."
        )]
        public async Task CreateBooksAsync_Success_CallsSendFullProjectUpdateEvent()
        {
            // Arrange: create a PDP for this project so
            // _pdpFactory.GetExistingProjectDataProvider returns non-null.
            _pdpFactory.GetProjectDataProviderID(_projectId);
            var pdp = _pdpFactory.GetExistingProjectDataProvider(_projectId);
            Assert.That(pdp, Is.Not.Null, "precondition: a PDP must exist for the project");
            var eventsBefore = Client.SentEventCount;

            // Act
            await _service.CreateBooksAsync(
                new CreateBooksRequest(
                    _projectId,
                    BookNumbers: new[] { 65 },
                    CreationMethod: CreationMethod.Empty,
                    ModelProjectId: null
                )
            );

            // Assert: at least one event fired on the client
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBefore),
                "Expected SendFullProjectUpdateEvent to fire a client event after create"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-402")]
        [Description("Theme 6 negative: failure paths do NOT fire the update event.")]
        public async Task CreateBooksAsync_Failure_DoesNotCallSendFullProjectUpdateEvent()
        {
            // Arrange: successful baseline first
            _pdpFactory.GetProjectDataProviderID(_projectId);
            await _service.CreateBooksAsync(
                new CreateBooksRequest(
                    _projectId,
                    BookNumbers: new[] { 65 },
                    CreationMethod: CreationMethod.Empty,
                    ModelProjectId: null
                )
            );
            var eventsAfterSuccess = Client.SentEventCount;
            Assert.That(
                eventsAfterSuccess,
                Is.GreaterThan(0),
                "baseline: success should fire at least one event"
            );

            // Act: empty BookNumbers → INVALID_ARGUMENT (no event should fire)
            Exception? thrown = null;
            try
            {
                await _service.CreateBooksAsync(
                    new CreateBooksRequest(
                        _projectId,
                        BookNumbers: Array.Empty<int>(),
                        CreationMethod: CreationMethod.Empty,
                        ModelProjectId: null
                    )
                );
            }
            catch (Exception ex)
            {
                thrown = ex;
            }

            // Assert: failure actually occurred
            Assert.That(thrown, Is.Not.Null, "empty book numbers must throw");

            // And: no additional event was fired
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsAfterSuccess),
                "No additional event should fire on a failed create"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "Theme 6: when no PDP exists for the project, the null-safe pattern "
                + "pdp?.SendFullProjectUpdateEvent() is a no-op (create still succeeds)."
        )]
        public async Task CreateBooksAsync_NoPdpExists_StillSucceeds()
        {
            // Arrange — do NOT create a PDP for this project
            var pdp = _pdpFactory.GetExistingProjectDataProvider(_projectId);
            Assert.That(pdp, Is.Null, "precondition: no PDP exists yet for this project");

            // Act
            var result = await _service.CreateBooksAsync(
                new CreateBooksRequest(
                    _projectId,
                    BookNumbers: new[] { 65 },
                    CreationMethod: CreationMethod.Empty,
                    ModelProjectId: null
                )
            );

            // Assert — the operation itself still succeeds
            Assert.That(result.Success, Is.True);
            Assert.That(_scrText.BooksPresentSet.IsSelected(65), Is.True);
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-004")]
        [Description(
            "Theme 6: read-only GetAvailableBooksForCreation must NOT fire "
                + "SendFullProjectUpdateEvent."
        )]
        public async Task GetAvailableBooksForCreationAsync_DoesNotFireUpdateEvent()
        {
            // Arrange — ensure a PDP exists so we know the event path is wired
            _pdpFactory.GetProjectDataProviderID(_projectId);
            var eventsBefore = Client.SentEventCount;

            // Act
            await _service.GetAvailableBooksForCreationAsync(_projectId);

            // Assert
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "read-only method must not fire update events"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-004")]
        [Description(
            "Theme 6: read-only ValidateCreateBooks must NOT fire " + "SendFullProjectUpdateEvent."
        )]
        public async Task ValidateCreateBooksAsync_DoesNotFireUpdateEvent()
        {
            // Arrange
            _pdpFactory.GetProjectDataProviderID(_projectId);
            var eventsBefore = Client.SentEventCount;

            var request = new ValidateCreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            // Act
            await _service.ValidateCreateBooksAsync(request);

            // Assert
            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "read-only method must not fire update events"
            );
        }

        // -------------------------------------------------------------------
        // THEME 7: PlatformError code mapping
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ValidationRule", "VAL-010")]
        [Description(
            "VAL-010 (at least one book selected): empty BookNumbers fails "
                + "with platformErrorCode=INVALID_ARGUMENT."
        )]
        public void CreateBooksAsync_EmptyBookNumbers_ThrowsInvalidArgument()
        {
            var request = new CreateBooksRequest(
                _projectId,
                BookNumbers: Array.Empty<int>(),
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            Exception? caught = null;
            try
            {
                _service.CreateBooksAsync(request).GetAwaiter().GetResult();
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
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-052")]
        [Property("ValidationRule", "VAL-009")]
        [Description(
            "VAL-009: FromTemplate with null ModelProjectId fails with "
                + "platformErrorCode=INVALID_ARGUMENT (model text required)."
        )]
        public void CreateBooksAsync_MissingModelProjectForFromTemplate_ThrowsInvalidArgument()
        {
            var request = new CreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.FromTemplate,
                ModelProjectId: null
            );

            Exception? caught = null;
            try
            {
                _service.CreateBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "VAL-009 (missing model projectId) must map to INVALID_ARGUMENT"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Description("Unknown target projectId → platformErrorCode=NOT_FOUND (Theme 7).")]
        public void CreateBooksAsync_UnknownProjectId_ThrowsNotFound()
        {
            // HexId-valid but not registered
            var request = new CreateBooksRequest(
                "0123456789ABCDEF0123456789ABCDEF01234567",
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            Exception? caught = null;
            try
            {
                _service.CreateBooksAsync(request).GetAwaiter().GetResult();
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
        [Property("CapabilityId", "CAP-004")]
        [Description(
            "Unknown (missing) modelProjectId while CreationMethod=FromTemplate "
                + "→ platformErrorCode=FAILED_PRECONDITION per strategic plan "
                + "'missing model project → FAILED_PRECONDITION'."
        )]
        public void CreateBooksAsync_UnknownModelProjectId_ThrowsFailedPrecondition()
        {
            var request = new CreateBooksRequest(
                _projectId,
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.FromTemplate,
                // HexId-valid but not registered
                ModelProjectId: "0123456789ABCDEF0123456789ABCDEF01234567"
            );

            Exception? caught = null;
            try
            {
                _service.CreateBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition),
                "Missing model project must map to FAILED_PRECONDITION per strategic plan"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-033")]
        [Property("InvariantId", "INV-003")]
        [Property("SpecId", "spec-005")]
        [Description(
            "INV-003 (read-only project cannot add books): non-editable ScrText "
                + "fails with platformErrorCode=FAILED_PRECONDITION per Theme 7 "
                + "mapping (PROJECT_READ_ONLY → FAILED_PRECONDITION)."
        )]
        public void CreateBooksAsync_NonEditableProject_ThrowsFailedPrecondition()
        {
            // Arrange — register a non-editable project
            var readOnly = new NonEditableScrText();
            var details = CreateProjectDetails(readOnly);
            ParatextProjects.FakeAddProject(details, readOnly);
            var request = new CreateBooksRequest(
                details.Metadata.Id,
                BookNumbers: new[] { 1 },
                CreationMethod: CreationMethod.Empty,
                ModelProjectId: null
            );

            // Act + Assert
            Exception? caught = null;
            try
            {
                _service.CreateBooksAsync(request).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "non-editable project must raise");
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition),
                "INV-003: non-editable project must map to FAILED_PRECONDITION (Theme 7)"
            );
        }

        // -------------------------------------------------------------------
        // Test-local ScrText subclass: non-editable project (INV-003)
        // -------------------------------------------------------------------

        /// <summary>
        /// Test-local ScrText subclass representing a read-only project. The
        /// production service (CAP-004 implementer) checks
        /// <c>scrText.Settings.Editable</c>; this subclass flips that flag
        /// to false so the service's guard fires naturally — no type-name
        /// probe required. Same shape as <c>NonAdminSharedScrText</c> in
        /// <c>DeleteBooksServiceTests</c>.
        /// </summary>
        private sealed class NonEditableScrText : DummyScrText
        {
            public NonEditableScrText()
                : base()
            {
                Settings.Editable = false;
            }
        }
    }
}

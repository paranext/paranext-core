using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-registration tests for <see cref="ManageBooksService"/> (CAP-012,
    /// Theme 1 — single NetworkObject registration).
    ///
    /// CAP-012 is a pure integration/wiring capability: it verifies the
    /// <c>ManageBooksService</c> NetworkObject is registered with PAPI
    /// correctly and that every method is reachable on the wire as
    /// <c>object:platformScripture.manageBooks.{method}</c>.
    ///
    /// Contracts:
    /// - Single <c>RegisterNetworkObjectAsync("platformScripture.manageBooks", functions, details)</c> call
    /// - <see cref="NetworkObjectCreatedDetails"/> event with Id, ObjectType=OBJECT, FunctionNames
    /// - 12 wire methods: deleteBooks, filterProjects, createBooks,
    ///   getAvailableBooksForCreation, validateCreateBooks, getBookComparison,
    ///   getToProjectFilter, copyBooks, copyCustomVersification,
    ///   parseImportFiles, checkOverlappingFiles, importBooks
    ///
    /// Theme-1 constraint: NO individual <c>RegisterRequestHandlerAsync("command:…")</c>
    /// calls for manage-books methods — every manage-books wire entry is dispatched
    /// via the function-tuple list on the single NetworkObject.
    ///
    /// Per-method business-logic tests live in their capability-specific files
    /// (DeleteBooksServiceTests, CreateBooksServiceTests, CopyBooksServiceTests,
    /// ImportBooksServiceTests, etc.). This file asserts only the wiring
    /// structure.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ManageBooksServiceRegistrationTests : PapiTestBase
    {
        private DummyScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private string _projectId = null!;
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        /// <summary>
        /// The complete set of NetworkObject wire method names the
        /// <c>ManageBooksService</c> must expose. Sourced from the strategic
        /// plan's CAP-012 "12 NetworkObject Methods" list and from the Theme-1
        /// single-registration design. Order-independent.
        /// </summary>
        private static readonly string[] ExpectedWireMethodNames =
        [
            // CAP-005
            "deleteBooks",
            // CAP-011
            "filterProjects",
            // CAP-004
            "createBooks",
            "getAvailableBooksForCreation",
            "validateCreateBooks",
            // CAP-006
            "getBookComparison",
            // CAP-008
            "getToProjectFilter",
            // CAP-007
            "copyBooks",
            "copyCustomVersification",
            // CAP-009
            "parseImportFiles",
            "checkOverlappingFiles",
            // CAP-010
            "importBooks",
        ];

        private const string NetworkObjectName = "platformScripture.manageBooks";
        private const string NetworkObjectRequestPrefix = $"object:{NetworkObjectName}";

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
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _scrText?.Dispose();
        }

        // ====================================================================
        // GROUP A — Constructor DI
        // ====================================================================

        // Theme 7 (2026-04-30): removed the tautological
        // Constructor_WithValidDependencies_Succeeds test — record-typed
        // results and ref-typed services are never null after `new`, and
        // ManageBooksService's constructor does no argument null-validation,
        // so the only behavior the deleted test exercised was "the C#
        // runtime exists." If null-guards are added later, restore an
        // ArgumentNullException-asserting variant.

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Description(
            "CAP-012: calling RegisterNetworkObjectAsync twice on the same instance throws — enforces the single-registration contract from NetworkObject base."
        )]
        public async Task RegisterNetworkObjectAsync_CalledTwice_Throws()
        {
            // Arrange: first registration must succeed
            await _service.RegisterNetworkObjectAsync();

            // Theme 7 (2026-04-30): the prior assertion only checked
            // `Throws<Exception>` — too permissive (any failure mode would
            // satisfy it). Tighten to assert the message contains the
            // already-registered phrase NetworkObject.cs:30 uses, so a
            // future change to a different failure mode (NRE, etc.) breaks
            // this test instead of silently passing.
            var caught = Assert.ThrowsAsync<Exception>(
                async () => await _service.RegisterNetworkObjectAsync()
            );
            Assert.That(
                caught!.Message,
                Does.Contain("already been registered"),
                "double-registration must throw the NetworkObject-base "
                    + "'already been registered' exception, not some other failure"
            );
        }

        // ====================================================================
        // GROUP B — Function table completeness (Theme 1)
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance (Theme 1): RegisterNetworkObjectAsync registers all 12 wire methods as `object:platformScripture.manageBooks.{method}` request handlers."
        )]
        public async Task RegisterNetworkObjectAsync_RegistersAllTwelveWireMethods()
        {
            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert: every expected method is registered under the NetworkObject prefix.
            IReadOnlyCollection<string> registered = Client.RegisteredRequestTypes;

            foreach (var methodName in ExpectedWireMethodNames)
            {
                string expectedRequestType = $"{NetworkObjectRequestPrefix}.{methodName}";
                Assert.That(
                    registered,
                    Contains.Item(expectedRequestType),
                    $"Expected wire method '{expectedRequestType}' to be registered but it was not. "
                        + $"Registered types: [{string.Join(", ", registered)}]"
                );
            }
        }

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance (Theme 1): the NetworkObject itself (the bare `object:platformScripture.manageBooks` request type) is registered as part of the NetworkObject lifecycle."
        )]
        public async Task RegisterNetworkObjectAsync_RegistersNetworkObjectSentinel()
        {
            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert: `object:platformScripture.manageBooks` is registered — NetworkObject
            // base registers a bare prefix so PAPI sees the NetworkObject exists.
            Assert.That(Client.RegisteredRequestTypes, Contains.Item(NetworkObjectRequestPrefix));
        }

        [Test]
        [Category("Integration")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance (Theme 1): NO individual `command:platformScripture.manageBooks.*` request handlers are registered — every manage-books method dispatches via the NetworkObject function-tuple list."
        )]
        public async Task RegisterNetworkObjectAsync_DoesNotRegisterIndividualCommandHandlers()
        {
            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert: no registered request type starts with `command:platformScripture.manageBooks`.
            var strayCommands = Client
                .RegisteredRequestTypes.Where(req =>
                    req.StartsWith(
                        "command:platformScripture.manageBooks",
                        StringComparison.Ordinal
                    )
                )
                .ToArray();

            Assert.That(
                strayCommands,
                Is.Empty,
                $"Theme 1 violation: found individual `command:` handlers for manage-books: [{string.Join(", ", strayCommands)}]. "
                    + "All manage-books methods must dispatch via the NetworkObject function-tuple list."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance (Theme 1): the total count of manage-books wire handlers registered equals 12 methods + 1 NetworkObject sentinel = 13."
        )]
        public async Task RegisterNetworkObjectAsync_RegistersExactlyThirteenManageBooksHandlers()
        {
            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert: exactly (12 methods + 1 NetworkObject sentinel) request types live under
            // the `object:platformScripture.manageBooks` prefix — no more, no fewer.
            var manageBooksHandlers = Client
                .RegisteredRequestTypes.Where(req =>
                    req.StartsWith(NetworkObjectRequestPrefix, StringComparison.Ordinal)
                )
                .ToArray();

            Assert.That(
                manageBooksHandlers,
                Has.Length.EqualTo(ExpectedWireMethodNames.Length + 1),
                $"Expected {ExpectedWireMethodNames.Length} method handlers + 1 sentinel = "
                    + $"{ExpectedWireMethodNames.Length + 1}. Got: [{string.Join(", ", manageBooksHandlers)}]"
            );
        }

        // ====================================================================
        // GROUP C — onDidCreateNetworkObject event details
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance: RegisterNetworkObjectAsync emits exactly one `object:onDidCreateNetworkObject` event so the network knows the service is available."
        )]
        public async Task RegisterNetworkObjectAsync_EmitsOnDidCreateNetworkObjectEvent()
        {
            // Arrange
            int eventsBefore = Client.SentEventCount;

            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert: at least one event was sent (the NetworkObject creation event).
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBefore),
                "Expected RegisterNetworkObjectAsync to fire an `object:onDidCreateNetworkObject` event."
            );

            // Drain events and find the onDidCreateNetworkObject entry for this service.
            (string eventType, object? eventParameters) creationEvent = FindCreationEvent();

            Assert.That(creationEvent.eventType, Is.EqualTo("object:onDidCreateNetworkObject"));
            Assert.That(creationEvent.eventParameters, Is.Not.Null);
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance: the NetworkObject creation event details include Id='platformScripture.manageBooks' and ObjectType=NetworkObjectType.OBJECT."
        )]
        public async Task RegisterNetworkObjectAsync_EventDetails_IdAndObjectTypeMatch()
        {
            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert
            NetworkObjectCreatedDetails details = GetCreationDetails();

            Assert.That(details.Id, Is.EqualTo(NetworkObjectName));
            Assert.That(details.ObjectType, Is.EqualTo(NetworkObjectType.OBJECT));
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance: the NetworkObject creation event lists all 12 expected wire methods in FunctionNames (order-independent)."
        )]
        public async Task RegisterNetworkObjectAsync_EventDetails_FunctionNamesListAllTwelve()
        {
            // Act
            await _service.RegisterNetworkObjectAsync();

            // Assert
            NetworkObjectCreatedDetails details = GetCreationDetails();

            Assert.That(details.FunctionNames, Is.Not.Null);
            Assert.That(
                details.FunctionNames!,
                Is.EquivalentTo(ExpectedWireMethodNames),
                "FunctionNames in the onDidCreateNetworkObject event must match the 12 expected manage-books wire methods."
            );
        }

        // ====================================================================
        // GROUP D — Dispatch round-trip (end-to-end wiring proof)
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "OUTER acceptance: a registered wire method is invocable via "
                + "PapiClient.SendRequestAsync<Task<T>>(`object:platformScripture.manageBooks.{method}`, params) "
                + "— proves end-to-end wiring of the NetworkObject's function-tuple dispatch. "
                + "We request Task<int[]> (not int[]) because local DummyPapiClient dispatch uses "
                + "DynamicInvoke which returns the raw Task without awaiting; production dispatch "
                + "via JsonRpc handles Task-unwrap automatically."
        )]
        public async Task GetAvailableBooksForCreation_DispatchedViaPapi_ReturnsResult()
        {
            // Arrange
            await _service.RegisterNetworkObjectAsync();

            // Act: dispatch through the PAPI path — the registered handler should be invoked.
            // The handler is `Func<string, Task<int[]>>`; DynamicInvoke returns Task<int[]>,
            // so we pull the Task through the generic and await it here.
            string requestType = $"{NetworkObjectRequestPrefix}.getAvailableBooksForCreation";
            Task<int[]>? handlerTask = await Client.SendRequestAsync<Task<int[]>>(
                requestType,
                new object?[] { _projectId }
            );

            Assert.That(
                handlerTask,
                Is.Not.Null,
                $"Dispatch round-trip via '{requestType}' did not reach the registered handler."
            );

            int[] availableBooks = await handlerTask!;

            // Assert: we get a valid int[] payload from the handler. Content is
            // verified in CAP-004 tests — here we only prove the wire method was
            // reached and returned a non-null array.
            Assert.That(
                availableBooks,
                Is.Not.Null,
                "Handler returned null — expected an int[] of available book numbers."
            );
        }

        [Test]
        [Category("Acceptance")]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-402")]
        [Description(
            "Theme 7 (2026-04-30): second dispatch-roundtrip test alongside "
                + "GetAvailableBooksForCreation_DispatchedViaPapi_ReturnsResult. "
                + "Picks a method with a record payload (BookComparisonInput) "
                + "rather than a positional string so the function-table dispatch "
                + "is exercised across both shapes — the lone positional-string "
                + "test was too narrow."
        )]
        public async Task GetBookComparison_DispatchedViaPapi_ReturnsResult()
        {
            await _service.RegisterNetworkObjectAsync();

            // Set up a second project so GetBookComparison has both endpoints
            // to compare. The base fixture only sets up `_projectId`; we need
            // a `to` project too.
            var toScrText = (DummyScrText)CreateDummyProject();
            var toDetails = CreateProjectDetails(toScrText);
            ParatextProjects.FakeAddProject(toDetails, toScrText);

            string requestType = $"{NetworkObjectRequestPrefix}.getBookComparison";
            var input = new BookComparisonInput(_projectId, toDetails.Metadata.Id);
            Task<BookComparisonResult>? handlerTask = await Client.SendRequestAsync<
                Task<BookComparisonResult>
            >(requestType, new object?[] { input });

            Assert.That(
                handlerTask,
                Is.Not.Null,
                $"Dispatch round-trip via '{requestType}' did not reach the registered handler."
            );

            BookComparisonResult result = await handlerTask!;

            // Behavioral assertion: the handler returned a non-null Entries
            // array (might be empty since both projects are empty), proving the
            // record-payload dispatch round-trip works.
            Assert.That(
                result.Entries,
                Is.Not.Null,
                "BookComparisonResult.Entries must be a non-null array even for empty projects"
            );
        }

        // ====================================================================
        // Helpers
        // ====================================================================

        /// <summary>
        /// Drains sent events and returns the first
        /// <c>object:onDidCreateNetworkObject</c> entry whose payload matches
        /// the manage-books NetworkObject (by Id). Fails the test if not found.
        /// </summary>
        private (string eventType, object? eventParameters) FindCreationEvent()
        {
            while (Client.SentEventCount > 0)
            {
                var ev = Client.NextSentEvent;
                if (
                    ev.eventType == "object:onDidCreateNetworkObject"
                    && ev.eventParameters is NetworkObjectCreatedDetails details
                    && details.Id == NetworkObjectName
                )
                {
                    return ev;
                }
            }

            Assert.Fail(
                $"No `object:onDidCreateNetworkObject` event with Id='{NetworkObjectName}' was sent."
            );
            return default; // unreachable — Assert.Fail throws
        }

        /// <summary>
        /// Fetches the creation-event details payload for the manage-books
        /// NetworkObject. Fails the test if no matching event was sent.
        /// </summary>
        private NetworkObjectCreatedDetails GetCreationDetails()
        {
            (_, object? payload) = FindCreationEvent();
            Assert.That(
                payload,
                Is.InstanceOf<NetworkObjectCreatedDetails>(),
                "Creation event payload must be NetworkObjectCreatedDetails."
            );
            return (NetworkObjectCreatedDetails)payload!;
        }
    }
}

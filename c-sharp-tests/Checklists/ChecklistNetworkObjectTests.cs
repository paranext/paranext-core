using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Checklists;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.NetworkObjects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase unit tests for CAP-011
/// (<c>ChecklistNetworkObject</c> — NetworkObject PAPI registration for the
/// checklist service).
///
/// <para>
/// These tests will NOT compile until the implementer adds
/// <c>Paranext.DataProvider.Checklists.ChecklistNetworkObject</c> at
/// <c>c-sharp/Checklists/ChecklistNetworkObject.cs</c>, subclassing
/// <see cref="NetworkObjects.NetworkObject"/> (NOT <c>DataProvider</c>), with
/// an <c>InitializeAsync()</c> method that calls
/// <c>RegisterNetworkObjectAsync</c> with the name
/// <c>"platformScripture.checklistService"</c>, the three functions
/// (<c>buildChecklistData</c>, <c>resolveComparativeTexts</c>,
/// <c>validateMarkerSettings</c>) in alphabetical order, and
/// <see cref="NetworkObjectType.OBJECT"/>. The compile error is the first
/// layer of the RED signal; the test-assertion failures (after a stub lands)
/// are the second.
/// </para>
///
/// <para>
/// Per strategic-plan-backend.md §CAP-011, this capability uses
/// <b>Classic TDD</b>: write focused unit tests asserting the registration
/// contract (shape + routing), then implement. The wire contract is
/// fully specified in backend-alignment.md §"Network Object" and
/// data-contracts.md §7 — there is no interface discovery to perform.
/// </para>
///
/// <para>
/// <b>Registration verification strategy.</b> The test inherits
/// <see cref="PapiTestBase"/> which wires up <see cref="DummyPapiClient"/>.
/// <c>DummyPapiClient.SendEventAsync</c> captures events into a queue; the
/// <c>onDidCreateNetworkObject</c> event that <see cref="NetworkObject.RegisterNetworkObjectAsync"/>
/// emits carries a <see cref="NetworkObjectCreatedDetails"/> payload that
/// exposes the registered <c>Id</c>, <c>ObjectType</c>, and <c>FunctionNames</c>.
/// <c>DummyPapiClient.SendRequestAsync</c> routes through the same
/// <c>_localMethods</c> dictionary that <see cref="PapiClient.RegisterRequestHandlerAsync"/>
/// populates, so probing a registered wire method invokes the underlying
/// delegate — this is the path used to verify routing.
/// </para>
///
/// <para>
/// <b>Reference pattern:</b> <c>c-sharp/Projects/ProjectDataProviderFactory.cs:25-46</c>.
/// </para>
///
/// Traceability:
///   - Capability: CAP-011 (NetworkObject PAPI Registration)
///   - Strategy: Classic TDD (per strategic-plan-backend.md §CAP-011)
///   - Contract: data-contracts.md §7.1, §7.2;
///     backend-alignment.md §Network Object
///   - Related behaviors (exposed through the wire — not re-verified here;
///     CAP-006 owns pipeline behavior): BHV-600, BHV-601, BHV-602, BHV-603,
///     BHV-604, BHV-606
///   - Related scenarios: TS-001..TS-006, TS-032, TS-033, TS-055 (covered
///     end-to-end in CAP-006; CAP-011 tests verify only the NetworkObject
///     registration contract that exposes them)
/// </summary>
[TestFixture]
internal class ChecklistNetworkObjectTests : PapiTestBase
{
    // Canonical wire values from backend-alignment.md §"Network Object"
    // and data-contracts.md §7.1/§7.2.
    private const string NetworkObjectName = "platformScripture.checklistService";
    private const string ObjectPrefix = "object:" + NetworkObjectName;
    private const string CreateEventType = "object:onDidCreateNetworkObject";

    // Alphabetical — the strategic plan specifies this exact order.
    private static readonly string[] ExpectedFunctionNames =
    [
        "buildChecklistData",
        "resolveComparativeTexts",
        "validateMarkerSettings",
    ];

    // =====================================================================
    // Group A — Registration Shape (The Acceptance Contract)
    //
    //   "Registers with the expected name, type, and function names" is the
    //   done-signal for CAP-011 per strategic-plan-backend.md.
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Description(
        "Acceptance test — after InitializeAsync, ChecklistNetworkObject emits "
            + "an onDidCreateNetworkObject event with Id=platformScripture.checklistService, "
            + "ObjectType=NetworkObjectType.OBJECT, and FunctionNames=[buildChecklistData, "
            + "resolveComparativeTexts, validateMarkerSettings] in alphabetical order."
    )]
    public async Task InitializeAsync_RegistersWithExpectedNameAndType()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);

        // Act
        await networkObject.InitializeAsync();

        // Assert — exactly one event sent, and it is the create-network-object
        // event with the expected payload shape.
        Assert.That(
            Client.SentEventCount,
            Is.EqualTo(1),
            "InitializeAsync must emit exactly one onDidCreateNetworkObject event"
        );

        (string eventType, object? eventParameters) = Client.NextSentEvent;

        Assert.That(
            eventType,
            Is.EqualTo(CreateEventType),
            "registration must use object:onDidCreateNetworkObject"
        );

        Assert.That(
            eventParameters,
            Is.InstanceOf<NetworkObjectCreatedDetails>(),
            "payload must be a NetworkObjectCreatedDetails record"
        );

        var details = (NetworkObjectCreatedDetails)eventParameters!;

        Assert.That(
            details.Id,
            Is.EqualTo(NetworkObjectName),
            "Id must be platformScripture.checklistService (no '-data' suffix)"
        );
        Assert.That(
            details.ObjectType,
            Is.EqualTo(NetworkObjectType.OBJECT),
            "ObjectType must be NetworkObjectType.OBJECT (plain network object)"
        );
        Assert.That(
            details.FunctionNames,
            Is.EqualTo(ExpectedFunctionNames),
            "FunctionNames must contain exactly the three methods in alphabetical order"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Description(
        "After InitializeAsync, a handler is registered for each of the three wire "
            + "method names (object:platformScripture.checklistService.<method>). A "
            + "never-registered name on the same prefix routes to the default "
            + "(unregistered) path."
    )]
    public async Task InitializeAsync_RegistersExactlyThreeFunctionHandlers()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        await networkObject.InitializeAsync();

        // Act + Assert — each expected wire name must be registered.
        // DummyPapiClient.SendRequestAsync<T> returns Task.FromResult<T?>(default)
        // for a name NOT in _localMethods; it invokes the delegate for a name
        // that IS registered. To distinguish "registered with any signature" from
        // "not registered", we probe each handler and require that invocation
        // either succeeds or throws (meaning the delegate WAS found). A
        // never-registered name is verified by contrast to silently return null.
        foreach (string functionName in ExpectedFunctionNames)
        {
            string wireName = $"{ObjectPrefix}.{functionName}";
            Assert.That(
                IsHandlerRegistered(wireName),
                Is.True,
                $"wire method '{wireName}' must be registered after InitializeAsync"
            );
        }

        // Negative control — a never-registered name on the same prefix.
        string neverRegistered = $"{ObjectPrefix}.notAMethod";
        Assert.That(
            IsHandlerRegistered(neverRegistered),
            Is.False,
            $"sanity check: '{neverRegistered}' must not be registered"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Description(
        "The base NetworkObject.RegisterNetworkObjectAsync also registers a "
            + "sentinel handler at the object prefix itself (object:platformScripture.checklistService) "
            + "so PAPI can probe existence. Verifies the base-class registration "
            + "path ran."
    )]
    public async Task InitializeAsync_RegistersTopLevelObjectHandler()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        await networkObject.InitializeAsync();

        // Act + Assert — the base-class NetworkObject registers a sentinel
        // Func<bool>(() => true) handler at the object prefix. See
        // c-sharp/NetworkObjects/NetworkObject.cs:34-35.
        Assert.That(
            IsHandlerRegistered(ObjectPrefix),
            Is.True,
            $"sentinel handler at '{ObjectPrefix}' must be registered by base class"
        );
    }

    // =====================================================================
    // Group B — Delegate Routing
    //
    //   Each registered delegate must route to the corresponding
    //   ChecklistService method. We pick paths that are:
    //     (a) exhaustively covered in the dependency capability's tests, so
    //         a regression here CANNOT be hidden by a dependency regression;
    //     (b) minimal-setup, so we don't re-test pipeline composition.
    //
    //   validateMarkerSettings is the cleanest probe (stateless, no project
    //   resolution needed, distinctive error message). resolveComparativeTexts
    //   uses the empty-list path. buildChecklistData uses the
    //   project-not-found path (throws ProjectNotFoundException, so the throw
    //   propagating confirms delegate wiring — a never-registered handler
    //   would return default silently).
    // =====================================================================

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Property("Routing", "validateMarkerSettings")]
    [Description(
        "The registered 'validateMarkerSettings' delegate routes to "
            + "MarkersDataSource.ValidateMarkerSettings — a valid input returns "
            + "the parsed marker pairs in source order."
    )]
    public async Task ValidateMarkerSettings_RoutesToChecklistServiceValidateMarkerSettings()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        await networkObject.InitializeAsync();

        // Act — invoke the registered handler through the PapiClient routing
        // path. For a valid "p/q q1/q2" input, MarkersDataSource.ValidateMarkerSettings
        // returns Valid=true with 2 pairs in source order.
        var result = await InvokeRegisteredHandlerAsync<MarkerSettingsValidationResult>(
            $"{ObjectPrefix}.validateMarkerSettings",
            "p/q q1/q2"
        );

        // Assert — result must match MarkersDataSource.ValidateMarkerSettings
        // behavior (CAP-007). If the delegate points elsewhere, this would fail.
        Assert.That(result, Is.Not.Null, "handler must return a MarkerSettingsValidationResult");
        Assert.That(result!.Valid, Is.True, "p/q q1/q2 is a valid marker-settings string");
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs!.Count, Is.EqualTo(2));
        Assert.That(result.ParsedPairs[0].Marker1, Is.EqualTo("p"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q"));
        Assert.That(result.ParsedPairs[1].Marker1, Is.EqualTo("q1"));
        Assert.That(result.ParsedPairs[1].Marker2, Is.EqualTo("q2"));
        Assert.That(result.ErrorMessage, Is.Null);
    }

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Property("Routing", "validateMarkerSettings")]
    [Description(
        "The registered 'validateMarkerSettings' delegate routes the error path "
            + "to MarkersDataSource.ValidateMarkerSettings — an invalid input "
            + "returns Valid=false with the canonical PT9 error message, "
            + "confirming delegate identity (distinctive error literal)."
    )]
    public async Task ValidateMarkerSettings_ErrorCase_RoutesAndReturnsError()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        await networkObject.InitializeAsync();

        // Act — "p/q badpair" has a malformed token; ValidateMarkerSettings
        // fails fast with the canonical error.
        var result = await InvokeRegisteredHandlerAsync<MarkerSettingsValidationResult>(
            $"{ObjectPrefix}.validateMarkerSettings",
            "p/q badpair"
        );

        // Assert — the distinctive PT9 error literal pins delegate identity.
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Valid, Is.False, "'badpair' has no slash → invalid");
        Assert.That(result.ParsedPairs, Is.Null, "§3.13 — ParsedPairs null on failure");
        Assert.That(result.ErrorMessage, Is.Not.Null);
        Assert.That(
            result.ErrorMessage,
            Does.Contain("p/q"),
            "error message is the PT9 canonical 'Equivalent markers need to be entered in the form: p/q'"
        );
    }

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Property("Routing", "resolveComparativeTexts")]
    [Description(
        "The registered 'resolveComparativeTexts' delegate routes to "
            + "ChecklistService.ResolveComparativeTexts — with an empty "
            + "requestedTexts list, the method returns an empty Texts list "
            + "(CAP-009 edge case). Confirms delegate identity."
    )]
    public async Task ResolveComparativeTexts_RoutesToChecklistServiceResolveComparativeTexts()
    {
        // Arrange — register an active project so the method can resolve it.
        DummyScrText active = RegisterDummyProject("ACTIVE_P");
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        await networkObject.InitializeAsync();

        // Act — empty requestedTexts is the simplest routing probe; CAP-009's
        // implementation returns an empty Texts list for this input.
        var result = await InvokeRegisteredHandlerAsync<ResolvedComparativeTexts>(
            $"{ObjectPrefix}.resolveComparativeTexts",
            active.Guid.ToString(),
            new List<ComparativeTextRef>(),
            CancellationToken.None
        );

        // Assert — routing produced the expected CAP-009 empty-list shape.
        Assert.That(result, Is.Not.Null, "handler must return a ResolvedComparativeTexts");
        Assert.That(result!.Texts, Is.Not.Null);
        Assert.That(
            result.Texts.Count,
            Is.EqualTo(0),
            "CAP-009: empty requestedTexts → empty Texts list"
        );
    }

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Property("Routing", "buildChecklistData")]
    [Description(
        "The registered 'buildChecklistData' delegate routes to "
            + "ChecklistService.BuildChecklistData — an unregistered projectId "
            + "surfaces as ProjectNotFoundException. The throw propagating out "
            + "of the handler confirms the delegate is wired (a never-registered "
            + "handler would return default silently)."
    )]
    public void BuildChecklistData_RoutesToChecklistServiceBuildChecklistData()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        networkObject.InitializeAsync().GetAwaiter().GetResult();

        var request = new ChecklistRequest(
            ProjectId: "NONEXISTENT_PROJECT_ID",
            ComparativeTextIds: new List<string>(),
            MarkerSettings: new MarkerSettings(EquivalentMarkers: "", MarkerFilter: ""),
            VerseRange: null,
            HideMatches: false,
            ShowVerseText: false,
            BookNumbers: null
        );

        // Act + Assert — the routing path must throw ProjectNotFoundException
        // (ChecklistService.BuildChecklistData line 124). A never-registered
        // handler path returns default; the throw confirms the wiring.
        //
        // False-green guard: Throws.Exception would also be satisfied by
        // NotImplementedException leaking from a RED stub. We explicitly
        // exclude NotImplementedException so this test forces a real
        // GREEN implementation to pass.
        Assert.That(
            async () =>
                await InvokeRegisteredHandlerAsync<ChecklistResult>(
                    $"{ObjectPrefix}.buildChecklistData",
                    request,
                    CancellationToken.None
                ),
            Throws.Exception.Not.InstanceOf<NotImplementedException>(),
            "BuildChecklistData must be wired — throw on unregistered projectId "
                + "confirms delegate identity (silent default would mean not wired). "
                + "NotImplementedException indicates the stub leaked through, not a "
                + "real GREEN implementation."
        );
    }

    // =====================================================================
    // Group C — Double-Registration Guard
    //
    //   NetworkObject.RegisterNetworkObjectAsync throws if called twice with
    //   the same instance. Pins the single-registration invariant.
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "NetworkObjectRegistration")]
    [Description(
        "Calling InitializeAsync twice on the same ChecklistNetworkObject "
            + "instance must throw — matches the base NetworkObject.RegisterNetworkObjectAsync "
            + "single-registration guard (NetworkObject.cs:29-30)."
    )]
    public async Task InitializeAsync_CalledTwice_Throws()
    {
        // Arrange
        var networkObject = new ChecklistNetworkObject(Client, ParatextProjects);
        await networkObject.InitializeAsync();

        // Act + Assert — false-green guard: exclude NotImplementedException
        // so a RED stub that throws on every call cannot satisfy this test;
        // only a real GREEN implementation that registers once and rejects
        // the second registration via the base NetworkObject guard will pass.
        Assert.That(
            async () => await networkObject.InitializeAsync(),
            Throws.Exception.Not.InstanceOf<NotImplementedException>(),
            "second InitializeAsync must throw a real single-registration "
                + "guard error (not NotImplementedException — that would mean "
                + "the stub leaked through, not a real GREEN implementation)"
        );
    }

    // =====================================================================
    // Helpers
    // =====================================================================

    /// <summary>
    /// Probes whether a handler is registered for the given wire name.
    /// <para>
    /// <see cref="DummyPapiClient.SendRequestAsync{T}"/> (cs-tests/DummyPapiClient.cs:50-59)
    /// <b>only invokes the base implementation if <c>_localMethods</c>
    /// contains the key</b>; for an unregistered name it returns
    /// <c>Task.FromResult&lt;T?&gt;(default)</c> without any delegate invocation.
    /// For a registered name, the base path calls <c>DynamicInvoke</c> on the
    /// delegate — which typically throws <c>TargetParameterCountException</c>
    /// or <c>TargetInvocationException</c> when we probe with mismatched args.
    /// A throw therefore uniquely signals "handler was found"; a silent
    /// default return uniquely signals "handler was NOT registered".
    /// </para>
    /// <para>
    /// The lone exception is the sentinel handler registered at the object
    /// prefix by <see cref="NetworkObject.RegisterNetworkObjectAsync"/> —
    /// it is <c>Func&lt;bool&gt;(() =&gt; true)</c>, so DynamicInvoke with
    /// null args succeeds and returns <c>true</c>. A non-null return also
    /// signals "registered". Combining both paths gives a robust probe.
    /// </para>
    /// </summary>
    private bool IsHandlerRegistered(string wireName)
    {
        try
        {
            var result = Client
                .SendRequestAsync<object>(wireName, requestContents: null)
                .GetAwaiter()
                .GetResult();
            // Registered sentinel handler (no args, returns true) → non-null result.
            // Unregistered name → DummyPapiClient short-circuits to default (null).
            return result != null;
        }
        catch
        {
            // Any exception means DynamicInvoke was called → handler IS registered.
            return true;
        }
    }

    /// <summary>
    /// Invokes a registered handler by wire name through <see cref="DummyPapiClient.SendRequestAsync{T}"/>.
    /// Parameters are passed positionally and marshalled through DynamicInvoke.
    /// </summary>
    private async Task<T?> InvokeRegisteredHandlerAsync<T>(string wireName, params object?[] args)
    {
        return await Client.SendRequestAsync<T>(wireName, args);
    }

    /// <summary>
    /// Registers a <see cref="DummyScrText"/> into the shared
    /// <see cref="ScrTextCollection"/> via
    /// <c>DummyLocalParatextProjects.FakeAddProject</c>. Mirrors the helper
    /// used in <c>ChecklistServiceResolveComparativeTextsTests</c>.
    /// </summary>
    private DummyScrText RegisterDummyProject(string shortName)
    {
        var details = CreateProjectDetails(HexId.CreateNew().ToString(), shortName);
        var scrText = new DummyScrText(details);
        ParatextProjects.FakeAddProject(details, scrText);
        return scrText;
    }
}

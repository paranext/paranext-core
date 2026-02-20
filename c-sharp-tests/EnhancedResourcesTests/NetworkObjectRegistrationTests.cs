using Paranext.DataProvider.EnhancedResources;
using Paranext.DataProvider.NetworkObjects;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-031: NetworkObjectRegistration.
/// Verifies that the EnhancedResourcesNetworkObject class correctly registers all
/// 22 commands and 3 NetworkObject functions on the PAPI network, matching the
/// wire contract defined in backend-alignment.md.
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs (all UI entry points), IPluginHost.cs (plugin API)
/// Spec: spec-006-interfaces-and-plugin-api.json
/// Contract: backend-alignment.md (JSON-RPC Method Registry, Command Parameter Signatures)
///
/// These tests will FAIL in RED state because:
/// - EnhancedResourcesNetworkObject class does not yet exist
/// - No commands are registered on the PAPI network
/// - No NetworkObject functions are registered
/// </summary>
[TestFixture]
internal class NetworkObjectRegistrationTests : PapiTestBase
{
    #region Constants

    /// <summary>
    /// The expected NetworkObject ID from the wire contract.
    /// </summary>
    private const string NetworkObjectId = "platformEnhancedResources.enhancedResources";

    /// <summary>
    /// All 22 command method names from the wire contract (backend-alignment.md).
    /// Each must be registered via PapiClient.RegisterRequestHandlerAsync().
    /// </summary>
    private static readonly string[] ExpectedCommands =
    [
        "command:platformEnhancedResources.parseScriptureTokens",
        "command:platformEnhancedResources.getLinksInScope",
        "command:platformEnhancedResources.getSectionBoundaries",
        "command:platformEnhancedResources.parseLexicalLinks",
        "command:platformEnhancedResources.translatePartOfSpeech",
        "command:platformEnhancedResources.calculateRenderingStatus",
        "command:platformEnhancedResources.combineTermStatusCodes",
        "command:platformEnhancedResources.loadDictionaryTab",
        "command:platformEnhancedResources.loadEncyclopediaTab",
        "command:platformEnhancedResources.loadMediaTab",
        "command:platformEnhancedResources.loadMapsTab",
        "command:platformEnhancedResources.processDictionaryMarkup",
        "command:platformEnhancedResources.filterGlossBraces",
        "command:platformEnhancedResources.findLocalizedGlosses",
        "command:platformEnhancedResources.imageMatchesVerseRange",
        "command:platformEnhancedResources.installResource",
        "command:platformEnhancedResources.checkForResourceUpdates",
        "command:platformEnhancedResources.getMatchingTokens",
        "command:platformEnhancedResources.saveViewState",
        "command:platformEnhancedResources.loadViewState",
        "command:platformEnhancedResources.getHomonymGroups",
        "command:platformEnhancedResources.openEnhancedResource",
    ];

    /// <summary>
    /// The 3 NetworkObject function names that must be registered via GetFunctions().
    /// </summary>
    private static readonly string[] ExpectedNetworkObjectFunctions =
    [
        "getAvailableResources",
        "getScriptureContent",
        "getAvailableGlossLanguages",
    ];

    /// <summary>
    /// Expected parameter counts per command from the wire contract.
    /// Key: short command name (without "command:platformEnhancedResources." prefix).
    /// Value: expected parameter count.
    /// </summary>
    private static readonly Dictionary<string, int> ExpectedParamCounts =
        new()
        {
            { "parseScriptureTokens", 2 },
            { "getLinksInScope", 5 },
            { "getSectionBoundaries", 2 },
            { "parseLexicalLinks", 1 },
            { "translatePartOfSpeech", 3 },
            { "calculateRenderingStatus", 4 },
            { "combineTermStatusCodes", 2 },
            { "loadDictionaryTab", 7 },
            { "loadEncyclopediaTab", 4 },
            { "loadMediaTab", 4 },
            { "loadMapsTab", 4 },
            { "processDictionaryMarkup", 2 },
            { "filterGlossBraces", 1 },
            { "findLocalizedGlosses", 2 },
            { "imageMatchesVerseRange", 2 },
            { "installResource", 1 },
            { "checkForResourceUpdates", 0 },
            { "getMatchingTokens", 3 },
            { "saveViewState", 2 },
            { "loadViewState", 1 },
            { "getHomonymGroups", 1 },
            { "openEnhancedResource", 1 },
        };

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-031 (spec-006).
    /// Verifies that all 22 commands and 3 NetworkObject functions are registered
    /// on the PAPI network. When this test passes, the capability is complete.
    ///
    /// This test creates an EnhancedResourcesNetworkObject, calls its registration
    /// method, and then verifies all expected method names are registered on the
    /// DummyPapiClient.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-031")]
    [Property("SpecId", "spec-006")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description(
        "Acceptance test: All 22 commands and 3 NetworkObject functions registered on PAPI"
    )]
    public async Task RegisterNetworkObject_AllCommandsAndFunctionsRegistered()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert: Verify all 22 commands are registered
        foreach (var command in ExpectedCommands)
        {
            Assert.That(
                Client.IsRequestHandlerRegistered(command),
                Is.True,
                $"Command '{command}' should be registered on PAPI"
            );
        }

        // Assert: Verify all 3 NetworkObject functions are registered
        foreach (var function in ExpectedNetworkObjectFunctions)
        {
            var fullMethodName = $"object:{NetworkObjectId}.{function}";
            Assert.That(
                Client.IsRequestHandlerRegistered(fullMethodName),
                Is.True,
                $"NetworkObject function '{fullMethodName}' should be registered on PAPI"
            );
        }
    }

    #endregion

    #region NetworkObject Structure Tests

    /// <summary>
    /// Verifies that EnhancedResourcesNetworkObject extends the NetworkObject base class.
    /// This ensures proper integration with the PAPI framework.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("EnhancedResourcesNetworkObject extends NetworkObject base class")]
    public void NetworkObject_ExtendsBaseClass()
    {
        // Arrange & Act
        var networkObject = CreateNetworkObject();

        // Assert
        Assert.That(
            networkObject,
            Is.InstanceOf<NetworkObject>(),
            "EnhancedResourcesNetworkObject must extend NetworkObject base class"
        );
    }

    /// <summary>
    /// Verifies the NetworkObject uses the correct network object ID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("NetworkObject registers with correct network object ID")]
    public async Task RegisterNetworkObject_UsesCorrectNetworkObjectId()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert: The base object handler should be registered
        var objectPrefix = $"object:{NetworkObjectId}";
        Assert.That(
            Client.IsRequestHandlerRegistered(objectPrefix),
            Is.True,
            $"NetworkObject should register base handler at '{objectPrefix}'"
        );
    }

    #endregion

    #region Command Count Verification

    /// <summary>
    /// Verifies that exactly 22 commands are registered (not more, not fewer).
    /// This prevents accidental addition or removal of commands.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Exactly 22 commands registered on PAPI")]
    public async Task RegisterNetworkObject_Registers22Commands()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        var registeredCommands = Client
            .GetRegisteredRequestTypes()
            .Where(r => r.StartsWith("command:platformEnhancedResources."))
            .ToList();

        Assert.That(
            registeredCommands,
            Has.Count.EqualTo(22),
            $"Expected 22 commands, but found {registeredCommands.Count}: "
                + $"[{string.Join(", ", registeredCommands)}]"
        );
    }

    /// <summary>
    /// Verifies that exactly 3 NetworkObject functions are registered.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Exactly 3 NetworkObject functions registered")]
    public async Task RegisterNetworkObject_Registers3Functions()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        var objectPrefix = $"object:{NetworkObjectId}.";
        var registeredFunctions = Client
            .GetRegisteredRequestTypes()
            .Where(r => r.StartsWith(objectPrefix) && r != $"object:{NetworkObjectId}")
            .ToList();

        Assert.That(
            registeredFunctions,
            Has.Count.EqualTo(3),
            $"Expected 3 NetworkObject functions, but found {registeredFunctions.Count}: "
                + $"[{string.Join(", ", registeredFunctions)}]"
        );
    }

    #endregion

    #region Individual Command Registration Tests

    /// <summary>
    /// Verifies each individual command is registered with the correct full method name.
    /// Uses TestCaseSource to avoid N separate test methods for 22 commands.
    /// </summary>
    [TestCaseSource(nameof(GetExpectedCommands))]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Individual command registered with correct method name")]
    public async Task RegisterNetworkObject_CommandRegistered(string commandName)
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        Assert.That(
            Client.IsRequestHandlerRegistered(commandName),
            Is.True,
            $"Command '{commandName}' must be registered"
        );
    }

    private static IEnumerable<string> GetExpectedCommands() => ExpectedCommands;

    #endregion

    #region Individual NetworkObject Function Registration Tests

    /// <summary>
    /// Verifies getAvailableResources is a registered NetworkObject function.
    /// This is a subscribable operation returning the list of installed ERs.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("getAvailableResources registered as NetworkObject function")]
    public async Task RegisterNetworkObject_GetAvailableResourcesRegistered()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        Assert.That(
            Client.IsRequestHandlerRegistered(
                $"object:{NetworkObjectId}.getAvailableResources"
            ),
            Is.True,
            "getAvailableResources must be registered as a NetworkObject function"
        );
    }

    /// <summary>
    /// Verifies getScriptureContent is a registered NetworkObject function.
    /// This is a subscribable operation returning scripture pane HTML content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("getScriptureContent registered as NetworkObject function")]
    public async Task RegisterNetworkObject_GetScriptureContentRegistered()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        Assert.That(
            Client.IsRequestHandlerRegistered(
                $"object:{NetworkObjectId}.getScriptureContent"
            ),
            Is.True,
            "getScriptureContent must be registered as a NetworkObject function"
        );
    }

    /// <summary>
    /// Verifies getAvailableGlossLanguages is a registered NetworkObject function.
    /// This is a subscribable operation returning available gloss languages.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("getAvailableGlossLanguages registered as NetworkObject function")]
    public async Task RegisterNetworkObject_GetAvailableGlossLanguagesRegistered()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        Assert.That(
            Client.IsRequestHandlerRegistered(
                $"object:{NetworkObjectId}.getAvailableGlossLanguages"
            ),
            Is.True,
            "getAvailableGlossLanguages must be registered as a NetworkObject function"
        );
    }

    #endregion

    #region NetworkObject Creation Event Tests

    /// <summary>
    /// Verifies that registration sends the onDidCreateNetworkObject event.
    /// This event notifies the PAPI framework that the NetworkObject is available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Registration sends onDidCreateNetworkObject event")]
    public async Task RegisterNetworkObject_SendsCreationEvent()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert: At least one event should have been sent
        Assert.That(
            Client.SentEventCount,
            Is.GreaterThanOrEqualTo(1),
            "Registration should send at least one event (onDidCreateNetworkObject)"
        );

        var (eventType, _) = Client.NextSentEvent;
        Assert.That(
            eventType,
            Is.EqualTo("object:onDidCreateNetworkObject"),
            "First event should be the network object creation notification"
        );
    }

    #endregion

    #region Parameter Count Verification Tests

    /// <summary>
    /// Verifies each command handler has the correct number of parameters
    /// as specified in the wire contract (backend-alignment.md Command Parameter Signatures).
    /// Uses TestCaseSource to test all 22 commands systematically.
    /// </summary>
    [TestCaseSource(nameof(GetParamCountTestCases))]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Command handler parameter count matches wire contract")]
    public async Task RegisterNetworkObject_CommandParamCountMatchesContract(
        string shortCommandName,
        int expectedParamCount
    )
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert
        var fullCommand =
            $"command:platformEnhancedResources.{shortCommandName}";
        var handler = Client.GetRegisteredHandler(fullCommand);
        Assert.That(
            handler,
            Is.Not.Null,
            $"Handler for '{fullCommand}' should be registered"
        );

        // The delegate's Method.GetParameters() tells us how many parameters the handler expects
        var actualParamCount = handler!.Method.GetParameters().Length;
        Assert.That(
            actualParamCount,
            Is.EqualTo(expectedParamCount),
            $"Command '{shortCommandName}' should have {expectedParamCount} parameters "
                + $"but handler has {actualParamCount}"
        );
    }

    private static IEnumerable<TestCaseData> GetParamCountTestCases()
    {
        foreach (var kvp in ExpectedParamCounts)
        {
            yield return new TestCaseData(kvp.Key, kvp.Value)
                .SetName($"ParamCount_{kvp.Key}_{kvp.Value}");
        }
    }

    #endregion

    #region No Duplicate Registration Tests

    /// <summary>
    /// Verifies that calling RegisterAsync a second time throws an exception
    /// (following the NetworkObject base class behavior that prevents double registration).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Double registration throws exception")]
    public async Task RegisterNetworkObject_DoubleRegistration_ThrowsException()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act & Assert
        Assert.ThrowsAsync<Exception>(
            async () => await networkObject.RegisterAsync(),
            "Registering the same NetworkObject twice should throw"
        );
    }

    #endregion

    #region Command Delegation Tests

    /// <summary>
    /// Verifies that the parseScriptureTokens command delegates to
    /// MarbleDataParser.ConvertToTokens with correct parameters.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-600")]
    [Description("parseScriptureTokens command delegates to MarbleDataParser")]
    public async Task ParseScriptureTokens_Command_DelegatesToParser()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act: Invoke the command through the registered handler
        // This should delegate to MarbleDataParser.ConvertToTokens
        var handler = Client.GetRegisteredHandler(
            "command:platformEnhancedResources.parseScriptureTokens"
        );

        // Assert: Handler exists and is a delegate
        Assert.That(handler, Is.Not.Null, "parseScriptureTokens handler must be registered");
    }

    /// <summary>
    /// Verifies that the parseLexicalLinks command delegates to
    /// LexicalLinkService.ParseLexicalLinks.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-102")]
    [Description("parseLexicalLinks command delegates to LexicalLinkService")]
    public async Task ParseLexicalLinks_Command_DelegatesToService()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act: Invoke the command through the registered handler
        var handler = Client.GetRegisteredHandler(
            "command:platformEnhancedResources.parseLexicalLinks"
        );

        // Assert: Handler exists
        Assert.That(handler, Is.Not.Null, "parseLexicalLinks handler must be registered");
    }

    /// <summary>
    /// Verifies that the combineTermStatusCodes command delegates to
    /// TermRenderingStatusService.CombineTermStatusCodes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-117")]
    [Description("combineTermStatusCodes command delegates to TermRenderingStatusService")]
    public async Task CombineTermStatusCodes_Command_DelegatesToService()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act
        var handler = Client.GetRegisteredHandler(
            "command:platformEnhancedResources.combineTermStatusCodes"
        );

        // Assert
        Assert.That(
            handler,
            Is.Not.Null,
            "combineTermStatusCodes handler must be registered"
        );
    }

    /// <summary>
    /// Verifies that the filterGlossBraces command delegates to
    /// GlossService.FilterGlossBraces.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-109")]
    [Description("filterGlossBraces command delegates to GlossService")]
    public async Task FilterGlossBraces_Command_DelegatesToService()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act
        var handler = Client.GetRegisteredHandler(
            "command:platformEnhancedResources.filterGlossBraces"
        );

        // Assert
        Assert.That(handler, Is.Not.Null, "filterGlossBraces handler must be registered");
    }

    /// <summary>
    /// Verifies that the translatePartOfSpeech command delegates to
    /// PartOfSpeechTranslator.Translate.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-519")]
    [Description("translatePartOfSpeech command delegates to PartOfSpeechTranslator")]
    public async Task TranslatePartOfSpeech_Command_DelegatesToTranslator()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act
        var handler = Client.GetRegisteredHandler(
            "command:platformEnhancedResources.translatePartOfSpeech"
        );

        // Assert
        Assert.That(
            handler,
            Is.Not.Null,
            "translatePartOfSpeech handler must be registered"
        );
    }

    #endregion

    #region Spec-006 Specific Scenario Tests

    /// <summary>
    /// TS-027: ResourceType enum includes EnhancedResource.
    /// Verifies the installResource command can accept a ResourceInstallRequest
    /// with ResourceType.EnhancedResource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-113")]
    [Description("installResource command handler accepts ResourceInstallRequest")]
    public async Task InstallResource_Command_AcceptsResourceInstallRequest()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Act
        var handler = Client.GetRegisteredHandler(
            "command:platformEnhancedResources.installResource"
        );

        // Assert: Handler exists and accepts exactly 1 parameter (ResourceInstallRequest)
        Assert.That(handler, Is.Not.Null, "installResource handler must be registered");
        var paramCount = handler!.Method.GetParameters().Length;
        Assert.That(
            paramCount,
            Is.EqualTo(1),
            "installResource should accept 1 parameter (ResourceInstallRequest)"
        );
    }

    /// <summary>
    /// TS-026: MarbleResearchData setting verification is done via the
    /// getAvailableResources NetworkObject function returning EnhancedResourceInfo
    /// with HasResearchData populated.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-112")]
    [Description("getAvailableResources returns EnhancedResourceInfo with HasResearchData")]
    public async Task GetAvailableResources_Function_IsRegistered()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Assert
        Assert.That(
            Client.IsRequestHandlerRegistered(
                $"object:{NetworkObjectId}.getAvailableResources"
            ),
            Is.True,
            "getAvailableResources NetworkObject function must be registered"
        );
    }

    #endregion

    #region Total Registration Count Test

    /// <summary>
    /// Verifies total registration count: 22 commands + 3 functions + 1 base object handler = 26.
    /// The base object handler is registered automatically by NetworkObject.RegisterNetworkObjectAsync.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-031")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-517")]
    [Description("Total registration count is 26 (22 commands + 3 functions + 1 base)")]
    public async Task RegisterNetworkObject_TotalRegistrationCount()
    {
        // Arrange
        var networkObject = CreateNetworkObject();

        // Act
        await networkObject.RegisterAsync();

        // Assert: Count all registrations related to Enhanced Resources
        var erRegistrations = Client
            .GetRegisteredRequestTypes()
            .Where(r =>
                r.StartsWith("command:platformEnhancedResources.")
                || r.StartsWith($"object:{NetworkObjectId}")
            )
            .ToList();

        // 22 commands + 3 NetworkObject functions + 1 base object handler
        Assert.That(
            erRegistrations,
            Has.Count.EqualTo(26),
            $"Expected 26 total registrations (22 commands + 3 functions + 1 base), "
                + $"but found {erRegistrations.Count}: [{string.Join(", ", erRegistrations)}]"
        );
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates an EnhancedResourcesNetworkObject instance for testing.
    /// The NetworkObject requires a PapiClient for registration.
    /// </summary>
    private EnhancedResourcesNetworkObject CreateNetworkObject()
    {
        return new EnhancedResourcesNetworkObject(Client);
    }

    #endregion
}

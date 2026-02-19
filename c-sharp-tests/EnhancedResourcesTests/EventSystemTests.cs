using Paranext.DataProvider.EnhancedResources;
using Paranext.DataProvider.NetworkObjects;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-033: EventSystem.
/// Verifies that the Enhanced Resources NetworkObject publishes update events
/// via PapiClient.SendEventAsync when resources are installed or updated.
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs (resource update UI refresh)
/// Contract: backend-alignment.md (Events section), data-contracts.md (OnResourceInstalled)
/// Wire event: platformEnhancedResources.enhancedResources:onDidUpdate
///
/// The event system is the only wire-level event for Enhanced Resources.
/// All other events (verse changed, tracked project changed, word filter changed)
/// are web-view-internal and handled by React state management.
///
/// These tests will FAIL in RED state because:
/// - EnhancedResourcesNetworkObject does not yet have a NotifyResourceUpdated method
/// - No ResourceInstalledEvent record type exists yet
/// - No event publishing logic is implemented
/// </summary>
[TestFixture]
internal class EventSystemTests : PapiTestBase
{
    #region Constants

    /// <summary>
    /// The expected event name from the wire contract (backend-alignment.md Events).
    /// Format: {networkObjectId}:onDidUpdate
    /// </summary>
    private const string ExpectedEventName =
        "platformEnhancedResources.enhancedResources:onDidUpdate";

    /// <summary>
    /// The NetworkObject ID.
    /// </summary>
    private const string NetworkObjectId = "platformEnhancedResources.enhancedResources";

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-033.
    /// Verifies that after a resource install, the NetworkObject sends an onDidUpdate
    /// event through PapiClient.SendEventAsync. When this test passes, the capability
    /// is complete.
    ///
    /// The acceptance criteria is:
    /// - Resource list update event published after install/uninstall
    /// - Event payload includes scope string
    /// - Multiple ER windows refresh correctly (verified by event delivery)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description(
        "Acceptance test: Resource update event published after install with correct event name and payload"
    )]
    public async Task NotifyResourceUpdated_AfterInstall_PublishesOnDidUpdateEvent()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Drain the onDidCreateNetworkObject event from registration
        var registrationEventCount = Client.SentEventCount;
        for (int i = 0; i < registrationEventCount; i++)
            _ = Client.NextSentEvent;

        // Act: Notify that a resource was installed
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.1.0.0",
            isUpdate: false
        );

        // Assert: An event was sent
        Assert.That(
            Client.SentEventCount,
            Is.GreaterThanOrEqualTo(1),
            "At least one event should be sent after resource install notification"
        );

        var (eventType, eventPayload) = Client.NextSentEvent;

        // Assert: Event name matches wire contract exactly
        Assert.That(
            eventType,
            Is.EqualTo(ExpectedEventName),
            "Event type must match the wire contract: "
                + "platformEnhancedResources.enhancedResources:onDidUpdate"
        );

        // Assert: Payload is not null
        Assert.That(eventPayload, Is.Not.Null, "Event payload must not be null");
    }

    #endregion

    #region Event Name Tests

    /// <summary>
    /// Verifies the event name follows the NetworkObject onDidUpdate convention:
    /// {networkObjectId}:onDidUpdate
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event name follows {networkObjectId}:onDidUpdate convention")]
    public async Task NotifyResourceUpdated_EventName_FollowsOnDidUpdateConvention()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "TestResource",
            "Test Resource Name",
            "1.0.0.0",
            isUpdate: false
        );

        // Assert
        var (eventType, _) = Client.NextSentEvent;
        Assert.That(
            eventType,
            Is.EqualTo($"{NetworkObjectId}:onDidUpdate"),
            "Event name must be {networkObjectId}:onDidUpdate"
        );
    }

    /// <summary>
    /// Verifies the event name exactly matches the string from the wire contract.
    /// This ensures no typos or deviations from the agreed-upon contract.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event name string exactly matches wire contract")]
    public async Task NotifyResourceUpdated_EventName_ExactStringMatch()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "SDBG",
            "Greek Dictionary",
            "1.0.0.0",
            isUpdate: false
        );

        // Assert
        var (eventType, _) = Client.NextSentEvent;
        Assert.That(
            eventType,
            Is.EqualTo("platformEnhancedResources.enhancedResources:onDidUpdate"),
            "Event name must exactly match the wire contract string"
        );
    }

    #endregion

    #region Event Payload Tests

    /// <summary>
    /// Verifies the event payload contains a ResourceInstalledEvent with the correct
    /// resourceId field matching what was passed to NotifyResourceUpdatedAsync.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event payload contains ResourceInstalledEvent with correct resourceId")]
    public async Task NotifyResourceUpdated_Payload_ContainsResourceId()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.1.0.0",
            isUpdate: false
        );

        // Assert
        var (_, eventPayload) = Client.NextSentEvent;
        var payload = eventPayload as ResourceInstalledEvent;
        Assert.That(payload, Is.Not.Null, "Payload must be a ResourceInstalledEvent");
        Assert.That(
            payload!.ResourceId,
            Is.EqualTo("ESV16UK+"),
            "ResourceId in payload must match the installed resource ID"
        );
    }

    /// <summary>
    /// Verifies the event payload contains the correct resourceName field.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event payload contains correct resourceName")]
    public async Task NotifyResourceUpdated_Payload_ContainsResourceName()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.1.0.0",
            isUpdate: false
        );

        // Assert
        var (_, eventPayload) = Client.NextSentEvent;
        var payload = eventPayload as ResourceInstalledEvent;
        Assert.That(payload, Is.Not.Null, "Payload must be a ResourceInstalledEvent");
        Assert.That(
            payload!.ResourceName,
            Is.EqualTo("ESV with Marble Data"),
            "ResourceName in payload must match the installed resource name"
        );
    }

    /// <summary>
    /// Verifies the event payload contains the correct version string.
    /// Version uses System.Version format (e.g., "2.1.0.0") per INV-005.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event payload contains correct version string")]
    public async Task NotifyResourceUpdated_Payload_ContainsVersion()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.1.0.0",
            isUpdate: false
        );

        // Assert
        var (_, eventPayload) = Client.NextSentEvent;
        var payload = eventPayload as ResourceInstalledEvent;
        Assert.That(payload, Is.Not.Null, "Payload must be a ResourceInstalledEvent");
        Assert.That(
            payload!.Version,
            Is.EqualTo("2.1.0.0"),
            "Version in payload must match the installed resource version"
        );
    }

    /// <summary>
    /// Verifies the event payload correctly distinguishes fresh install (isUpdate=false)
    /// from update (isUpdate=true).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event payload isUpdate=false for fresh install")]
    public async Task NotifyResourceUpdated_FreshInstall_IsUpdateFalse()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.0.0.0",
            isUpdate: false
        );

        // Assert
        var (_, eventPayload) = Client.NextSentEvent;
        var payload = eventPayload as ResourceInstalledEvent;
        Assert.That(payload, Is.Not.Null, "Payload must be a ResourceInstalledEvent");
        Assert.That(
            payload!.IsUpdate,
            Is.False,
            "IsUpdate must be false for a fresh install"
        );
    }

    /// <summary>
    /// Verifies the event payload correctly identifies an update scenario.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event payload isUpdate=true for resource update")]
    public async Task NotifyResourceUpdated_Update_IsUpdateTrue()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.1.0.0",
            isUpdate: true
        );

        // Assert
        var (_, eventPayload) = Client.NextSentEvent;
        var payload = eventPayload as ResourceInstalledEvent;
        Assert.That(payload, Is.Not.Null, "Payload must be a ResourceInstalledEvent");
        Assert.That(
            payload!.IsUpdate,
            Is.True,
            "IsUpdate must be true for a resource update"
        );
    }

    #endregion

    #region Multiple Event Tests

    /// <summary>
    /// Verifies that multiple resource update events can be sent sequentially.
    /// This supports the scenario where multiple resources are installed/updated
    /// in a batch operation. Each install should trigger its own event.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Multiple sequential resource updates each produce an event")]
    public async Task NotifyResourceUpdated_MultipleSequentialUpdates_SendsMultipleEvents()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act: Send two update notifications
        await networkObject.NotifyResourceUpdatedAsync(
            "ESV16UK+",
            "ESV with Marble Data",
            "2.1.0.0",
            isUpdate: false
        );

        await networkObject.NotifyResourceUpdatedAsync(
            "SDBG",
            "Greek Dictionary",
            "1.5.0.0",
            isUpdate: true
        );

        // Assert: Two events should be sent
        Assert.That(
            Client.SentEventCount,
            Is.EqualTo(2),
            "Two separate update notifications should produce two events"
        );

        // Assert: First event is for ESV
        var (eventType1, payload1) = Client.NextSentEvent;
        Assert.That(eventType1, Is.EqualTo(ExpectedEventName));
        var event1 = payload1 as ResourceInstalledEvent;
        Assert.That(event1, Is.Not.Null);
        Assert.That(event1!.ResourceId, Is.EqualTo("ESV16UK+"));
        Assert.That(event1.IsUpdate, Is.False);

        // Assert: Second event is for SDBG
        var (eventType2, payload2) = Client.NextSentEvent;
        Assert.That(eventType2, Is.EqualTo(ExpectedEventName));
        var event2 = payload2 as ResourceInstalledEvent;
        Assert.That(event2, Is.Not.Null);
        Assert.That(event2!.ResourceId, Is.EqualTo("SDBG"));
        Assert.That(event2.IsUpdate, Is.True);
    }

    #endregion

    #region Event Isolation Tests

    /// <summary>
    /// Verifies that no resource update events are sent before NotifyResourceUpdatedAsync
    /// is called. The only events after registration should be the
    /// onDidCreateNetworkObject event from the base class.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-510")]
    [Description("No resource update events sent before explicit notification")]
    public async Task NotifyResourceUpdated_BeforeCalling_NoUpdateEventsSent()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();

        // Assert: Only the registration event(s) should be present
        // The registration sends "object:onDidCreateNetworkObject"
        while (Client.SentEventCount > 0)
        {
            var (eventType, _) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.Not.EqualTo(ExpectedEventName),
                "No onDidUpdate event should be sent before NotifyResourceUpdatedAsync is called"
            );
        }
    }

    /// <summary>
    /// Verifies that the event is sent via PapiClient.SendEventAsync
    /// (not some other mechanism). The DummyPapiClient captures events
    /// in its queue, so if the event appears there, it went through SendEventAsync.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event is sent via PapiClient.SendEventAsync")]
    public async Task NotifyResourceUpdated_UsesPapiClientSendEventAsync()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "TestRes",
            "Test Resource",
            "1.0.0.0",
            isUpdate: false
        );

        // Assert: Event appears in DummyPapiClient queue (proving SendEventAsync was used)
        Assert.That(
            Client.SentEventCount,
            Is.GreaterThanOrEqualTo(1),
            "Event must be sent through PapiClient.SendEventAsync"
        );
    }

    #endregion

    #region ResourceInstalledEvent Record Tests

    /// <summary>
    /// Verifies that the ResourceInstalledEvent record type exists and has the
    /// expected properties as defined in data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("ResourceInstalledEvent record has all required properties")]
    public void ResourceInstalledEvent_HasRequiredProperties()
    {
        // Act: Create a ResourceInstalledEvent with all required fields
        var evt = new ResourceInstalledEvent(
            ResourceId: "ESV16UK+",
            ResourceName: "ESV with Marble Data",
            Version: "2.1.0.0",
            IsUpdate: true
        );

        // Assert: All properties are accessible and have correct values
        Assert.That(evt.ResourceId, Is.EqualTo("ESV16UK+"));
        Assert.That(evt.ResourceName, Is.EqualTo("ESV with Marble Data"));
        Assert.That(evt.Version, Is.EqualTo("2.1.0.0"));
        Assert.That(evt.IsUpdate, Is.True);
    }

    /// <summary>
    /// Verifies record equality semantics: two ResourceInstalledEvent instances
    /// with the same values should be equal (value equality from C# records).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-510")]
    [Description("ResourceInstalledEvent supports value equality")]
    public void ResourceInstalledEvent_ValueEquality()
    {
        // Arrange
        var evt1 = new ResourceInstalledEvent("ESV16UK+", "ESV", "2.0.0.0", false);
        var evt2 = new ResourceInstalledEvent("ESV16UK+", "ESV", "2.0.0.0", false);

        // Assert
        Assert.That(evt1, Is.EqualTo(evt2), "Records with same values must be equal");
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Verifies that the event still works with an empty version string.
    /// Some legacy resources may not have a version set.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-043")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Event publication works with empty version string")]
    public async Task NotifyResourceUpdated_EmptyVersion_StillSendsEvent()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "OldResource",
            "Old Resource Name",
            "",
            isUpdate: false
        );

        // Assert
        Assert.That(
            Client.SentEventCount,
            Is.GreaterThanOrEqualTo(1),
            "Event should still be sent even with empty version"
        );

        var (eventType, _) = Client.NextSentEvent;
        Assert.That(eventType, Is.EqualTo(ExpectedEventName));
    }

    /// <summary>
    /// Verifies that events for different resources carry their respective resource IDs.
    /// This ensures the payload is not cached or shared between calls.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-033")]
    [Property("ScenarioId", "TS-044")]
    [Property("BehaviorId", "BHV-510")]
    [Description("Different resources produce events with distinct payloads")]
    public async Task NotifyResourceUpdated_DifferentResources_DistinctPayloads()
    {
        // Arrange
        var networkObject = CreateNetworkObject();
        await networkObject.RegisterAsync();
        DrainRegistrationEvents();

        // Act
        await networkObject.NotifyResourceUpdatedAsync(
            "Resource_A",
            "Resource A Name",
            "1.0.0.0",
            isUpdate: false
        );

        await networkObject.NotifyResourceUpdatedAsync(
            "Resource_B",
            "Resource B Name",
            "2.0.0.0",
            isUpdate: true
        );

        // Assert
        var (_, payload1) = Client.NextSentEvent;
        var (_, payload2) = Client.NextSentEvent;

        var event1 = payload1 as ResourceInstalledEvent;
        var event2 = payload2 as ResourceInstalledEvent;

        Assert.That(event1, Is.Not.Null);
        Assert.That(event2, Is.Not.Null);

        Assert.That(event1!.ResourceId, Is.EqualTo("Resource_A"));
        Assert.That(event2!.ResourceId, Is.EqualTo("Resource_B"));
        Assert.That(event1, Is.Not.EqualTo(event2), "Payloads must be distinct");
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates an EnhancedResourcesNetworkObject instance for testing.
    /// </summary>
    private EnhancedResourcesNetworkObject CreateNetworkObject()
    {
        return new EnhancedResourcesNetworkObject(Client);
    }

    /// <summary>
    /// Drains all events sent during NetworkObject registration
    /// (typically the onDidCreateNetworkObject event) so that subsequent
    /// assertions only see events from the test action.
    /// </summary>
    private void DrainRegistrationEvents()
    {
        while (Client.SentEventCount > 0)
            _ = Client.NextSentEvent;
    }

    #endregion
}

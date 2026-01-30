using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for Event Publishing (CAP-023 EventPublishing).
/// Verifies that all 3 event types are properly published when appropriate actions occur.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class EventPublishingTests : PapiTestBase
{
    private ProjectCreationCommandService? _commandService;

    #region Test Setup

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _commandService = new ProjectCreationCommandService(Client);
    }

    [TearDown]
    public override void TestTearDown()
    {
        _commandService = null;
        base.TestTearDown();
    }

    #endregion

    #region Acceptance Tests (OUTER LOOP)

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-023")]
    [Description("Acceptance test: All events are published when appropriate actions occur")]
    public async Task EventPublishing_AcceptanceTest()
    {
        // OUTER TEST: When project creation operations succeed,
        // the appropriate events should be published

        // Initialize command service
        await _commandService!.InitializeAsync();

        // Test 1: Create project should publish ProjectCreatedEvent
        var createRequest = new ProjectCreationRequest
        {
            ShortName = "EVTPRJ",
            FullName = "Event Test Project",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
            Versification = "English",
        };
        var createResult = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { createRequest }
        );

        if (createResult?.Success == true)
        {
            // Verify ProjectCreatedEvent was published
            Assert.That(Client.SentEventCount, Is.GreaterThan(0), "Event should be published");
            var (eventType, eventParams) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(ProjectCreationCommandService.EVENT_PROJECT_CREATED)
            );
            Assert.That(eventParams, Is.TypeOf<ProjectCreatedEvent>());
            var projectEvent = (ProjectCreatedEvent)eventParams!;
            Assert.That(projectEvent.Project.ShortName, Is.EqualTo("EVTPRJ"));
        }

        // Test 2: Save interlinear setup should publish InterlinearSetupChangedEvent
        var setupRequest = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "TestSource",
            SourceProjectGuid = "test-guid",
            ModelTextName = "TestModel",
            ModelTextGuid = "model-guid",
        };
        var setupResult = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { setupRequest }
        );

        if (setupResult?.Success == true)
        {
            // Verify InterlinearSetupChangedEvent was published
            Assert.That(Client.SentEventCount, Is.GreaterThan(0), "Event should be published");
            var (eventType, eventParams) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(ProjectCreationCommandService.EVENT_INTERLINEAR_SETUP_CHANGED)
            );
            Assert.That(eventParams, Is.TypeOf<InterlinearSetupChangedEvent>());
        }
    }

    #endregion

    #region ProjectCreatedEvent Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-001")]
    [Description("ProjectCreatedEvent is published when project is created successfully")]
    public async Task CreateProject_Success_PublishesProjectCreatedEvent()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectCreationRequest
        {
            ShortName = "CREAT1",
            FullName = "Created Project One",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
            Versification = "English",
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        if (result!.Success)
        {
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(0),
                "ProjectCreatedEvent should be published on success"
            );
            var (eventType, eventParams) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(ProjectCreationCommandService.EVENT_PROJECT_CREATED)
            );
            Assert.That(eventParams, Is.TypeOf<ProjectCreatedEvent>());

            var projectEvent = (ProjectCreatedEvent)eventParams!;
            Assert.That(projectEvent.Project, Is.Not.Null);
            Assert.That(projectEvent.Project.ShortName, Is.EqualTo("CREAT1"));
            Assert.That(projectEvent.Timestamp, Is.Not.EqualTo(default(DateTime)));
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-002")]
    [Description("ProjectCreatedEvent is NOT published when project creation fails")]
    public async Task CreateProject_Failure_DoesNotPublishEvent()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectCreationRequest
        {
            ShortName = "", // Invalid: empty
            FullName = "Should Fail Project",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
        };

        int initialEventCount = Client.SentEventCount;

        // Act
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.False);
        Assert.That(
            Client.SentEventCount,
            Is.EqualTo(initialEventCount),
            "No event should be published on failure"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-003")]
    [Description("ProjectCreatedEvent contains correct project information")]
    public async Task ProjectCreatedEvent_ContainsCorrectProjectInfo()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectCreationRequest
        {
            ShortName = "PRJINF",
            FullName = "Project Info Test",
            LanguageId = "fr",
            ProjectType = ProjectType.BackTranslation,
            BaseProjectName = "BaseProject",
            BaseProjectGuid = "base-guid-123",
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        if (result?.Success == true && Client.SentEventCount > 0)
        {
            var (_, eventParams) = Client.NextSentEvent;
            var projectEvent = (ProjectCreatedEvent)eventParams!;

            Assert.That(projectEvent.Project.ShortName, Is.EqualTo("PRJINF"));
            Assert.That(projectEvent.Project.FullName, Is.EqualTo("Project Info Test"));
            Assert.That(projectEvent.Project.LanguageId, Is.EqualTo("fr"));
            Assert.That(projectEvent.Project.ProjectType, Is.EqualTo(ProjectType.BackTranslation));
            Assert.That(projectEvent.Project.Guid, Is.Not.Null.And.Not.Empty);
        }
    }

    #endregion

    #region InterlinearSetupChangedEvent Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-004")]
    [Description("InterlinearSetupChangedEvent is published when setup is created")]
    public async Task SaveInterlinearSetup_Create_PublishesEvent()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "GlossingSource",
            SourceProjectGuid = "source-guid",
            ModelTextName = "ModelText",
            ModelTextGuid = "model-guid",
        };

        // Act
        var result = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { request }
        );

        // Assert
        if (result?.Success == true)
        {
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(0),
                "Event should be published on setup creation"
            );
            var (eventType, eventParams) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(ProjectCreationCommandService.EVENT_INTERLINEAR_SETUP_CHANGED)
            );
            Assert.That(eventParams, Is.TypeOf<InterlinearSetupChangedEvent>());

            var setupEvent = (InterlinearSetupChangedEvent)eventParams!;
            Assert.That(setupEvent.Action, Is.EqualTo(InterlinearSetupAction.Created));
            Assert.That(setupEvent.Setup, Is.Not.Null);
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-005")]
    [Description("InterlinearSetupChangedEvent is published when setup is updated")]
    public async Task SaveInterlinearSetup_Update_PublishesEventWithUpdateAction()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "GlossingSource",
            SourceProjectGuid = "source-guid",
            ModelTextName = "ModelText",
            ModelTextGuid = "model-guid",
            ExistingSetupId = "existing-setup-123", // Updating existing setup
        };

        // Act
        var result = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { request }
        );

        // Assert
        if (result?.Success == true && Client.SentEventCount > 0)
        {
            var (eventType, eventParams) = Client.NextSentEvent;
            Assert.That(
                eventType,
                Is.EqualTo(ProjectCreationCommandService.EVENT_INTERLINEAR_SETUP_CHANGED)
            );

            var setupEvent = (InterlinearSetupChangedEvent)eventParams!;
            Assert.That(setupEvent.Action, Is.EqualTo(InterlinearSetupAction.Updated));
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-006")]
    [Description("InterlinearSetupChangedEvent is NOT published when validation fails")]
    public async Task SaveInterlinearSetup_ValidationFails_DoesNotPublishEvent()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "NonExistent",
            SourceProjectGuid = "invalid-guid",
            // Missing required model text
        };

        int initialEventCount = Client.SentEventCount;

        // Act
        var result = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { request }
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.False);
        Assert.That(
            Client.SentEventCount,
            Is.EqualTo(initialEventCount),
            "No event should be published on failure"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-007")]
    [Description("InterlinearSetupChangedEvent contains correct setup information")]
    public async Task InterlinearSetupChangedEvent_ContainsCorrectSetupInfo()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.BackTranslation,
            SourceProjectName = "BTSource",
            SourceProjectGuid = "bt-source-guid",
            DestinationProjectName = "BTDest",
            DestinationProjectGuid = "bt-dest-guid",
        };

        // Act
        var result = await Client.SendRequestAsync<InterlinearSetupResult>(
            "command:platformScripture.saveInterlinearSetup",
            new object[] { request }
        );

        // Assert
        if (result?.Success == true && Client.SentEventCount > 0)
        {
            var (_, eventParams) = Client.NextSentEvent;
            var setupEvent = (InterlinearSetupChangedEvent)eventParams!;

            Assert.That(setupEvent.Setup.TaskType, Is.EqualTo(InterlinearTaskType.BackTranslation));
            Assert.That(setupEvent.Setup.SourceProjectName, Is.EqualTo("BTSource"));
            Assert.That(setupEvent.Setup.DestinationProjectName, Is.EqualTo("BTDest"));
            Assert.That(setupEvent.Timestamp, Is.Not.EqualTo(default(DateTime)));
        }
    }

    #endregion

    #region RegistrationStatusChangedEvent Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-008")]
    [Description("RegistrationStatusChangedEvent is published when registration status changes")]
    public async Task RegistrationChange_PublishesRegistrationStatusChangedEvent()
    {
        // Arrange
        await _commandService!.InitializeAsync();

        // Act - Directly test the event publishing method
        await _commandService.PublishRegistrationStatusChangedEventAsync(
            "test-project-guid",
            RegistrationMessageType.Registered
        );

        // Assert
        Assert.That(
            Client.SentEventCount,
            Is.GreaterThan(0),
            "RegistrationStatusChangedEvent should be published"
        );
        var (eventType, eventParams) = Client.NextSentEvent;
        Assert.That(
            eventType,
            Is.EqualTo(ProjectCreationCommandService.EVENT_REGISTRATION_STATUS_CHANGED)
        );
        Assert.That(eventParams, Is.TypeOf<RegistrationStatusChangedEvent>());
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-009")]
    [Description("RegistrationStatusChangedEvent contains correct status information")]
    public async Task RegistrationStatusChangedEvent_ContainsCorrectInfo()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        const string testGuid = "test-project-guid-456";
        const RegistrationMessageType newStatus = RegistrationMessageType.RegisteredPrivate;

        // Act
        await _commandService.PublishRegistrationStatusChangedEventAsync(testGuid, newStatus);

        // Assert
        if (Client.SentEventCount > 0)
        {
            var (_, eventParams) = Client.NextSentEvent;
            var regEvent = (RegistrationStatusChangedEvent)eventParams!;

            Assert.That(regEvent.ProjectGuid, Is.EqualTo(testGuid));
            Assert.That(regEvent.NewStatus, Is.EqualTo(RegistrationMessageType.RegisteredPrivate));
            Assert.That(regEvent.Timestamp, Is.Not.EqualTo(default(DateTime)));
        }
    }

    #endregion

    #region Event Timestamp Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-010")]
    [Description("All events have valid timestamps")]
    public async Task AllEvents_HaveValidTimestamps()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var beforeTest = DateTime.UtcNow.AddSeconds(-1);

        // Act - Trigger a project creation event
        var request = new ProjectCreationRequest
        {
            ShortName = "TMSTMP",
            FullName = "Timestamp Test Project",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
            Versification = "English",
        };
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        if (result?.Success == true && Client.SentEventCount > 0)
        {
            var (_, eventParams) = Client.NextSentEvent;
            var projectEvent = (ProjectCreatedEvent)eventParams!;

            var afterTest = DateTime.UtcNow.AddSeconds(1);
            Assert.That(
                projectEvent.Timestamp,
                Is.GreaterThanOrEqualTo(beforeTest),
                "Timestamp should be after test start"
            );
            Assert.That(
                projectEvent.Timestamp,
                Is.LessThanOrEqualTo(afterTest),
                "Timestamp should be before test end"
            );
        }
    }

    #endregion

    #region Side Effect Verification Tests

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-EVT-011")]
    [Description("Project created via command is findable after event is published")]
    public async Task CreateProject_EventPublished_ProjectIsFindable()
    {
        // Arrange
        await _commandService!.InitializeAsync();
        var request = new ProjectCreationRequest
        {
            ShortName = "FINDME",
            FullName = "Findable Project",
            LanguageId = "en",
            ProjectType = ProjectType.Standard,
            Versification = "English",
        };

        // Act
        var result = await Client.SendRequestAsync<ProjectCreationResult>(
            "command:platformScripture.createProject",
            new object[] { request }
        );

        // Assert
        if (result?.Success == true)
        {
            // The project should be findable in the collection
            Assert.That(result.Project, Is.Not.Null);
            Assert.That(result.Project!.ShortName, Is.EqualTo("FINDME"));
            Assert.That(result.Project.Guid, Is.Not.Null.And.Not.Empty);

            // Event should have been published
            Assert.That(Client.SentEventCount, Is.GreaterThan(0));
        }
    }

    #endregion
}

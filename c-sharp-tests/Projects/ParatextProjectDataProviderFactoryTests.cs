using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderFactoryTests : PapiTestBase
    {
        private const string PDB_FACTORY_GET_REQUEST =
            $"object:platform.pdpFactory-{ParatextProjectDataProviderFactory.PDPF_NAME}.function";

        [SetUp]
        public override async Task TestSetup()
        {
            await base.TestSetup();

            var settingsService = new DummySettingsService(Client);
            await settingsService.RegisterDataProvider();
            settingsService.AddSettingValue(Settings.INCLUDE_MY_PARATEXT_9_PROJECTS, true);
        }

        [Test]
        public async Task InvalidProjectId_ReturnsError()
        {
            const int requesterId = 47192;

            ParatextProjectDataProviderFactory factory = new(Client, ParatextProjects);
            await factory.Initialize();

            JsonElement serverMessage = CreateRequestMessage(
                "getProjectDataProviderId",
                "unknownProj"
            );

            Message result = Client
                .FakeMessageFromServer(
                    new MessageRequest(PDB_FACTORY_GET_REQUEST, requesterId, serverMessage)
                )
                .First();

            Assert.That(result.Type, Is.EqualTo(MessageType.RESPONSE));
            MessageResponse response = (MessageResponse)result;
            Assert.That(response.ErrorMessage, Is.EqualTo("Unknown project ID: unknownProj"));
            Assert.That(response.RequestId, Is.EqualTo(requesterId));
            Assert.That(response.Contents, Is.Null);
        }

        [Test]
        public async Task WrongNumberOfParameters_ReturnsError()
        {
            const string projId = "monkey";
            const int requesterId = 47281;

            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, ParatextProjects);
            await factory.Initialize();

            JsonElement serverMessage = CreateRequestMessage("getProjectDataProviderId");

            Message result = Client
                .FakeMessageFromServer(
                    new MessageRequest(PDB_FACTORY_GET_REQUEST, requesterId, serverMessage)
                )
                .First();

            Assert.That(result.Type, Is.EqualTo(MessageType.RESPONSE));
            MessageResponse response = (MessageResponse)result;
            Assert.That(
                response.ErrorMessage != null
                    && response.ErrorMessage.StartsWith("System.ArgumentOutOfRangeException"),
                Is.True
            );
            Assert.That(response.RequestId, Is.EqualTo(requesterId));
            Assert.That(response.Contents, Is.Null);
        }

        [Test]
        public async Task InvalidFunction_ReturnsError()
        {
            const string projId = "monkey";
            const int requesterId = 47192;

            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, ParatextProjects);
            await factory.Initialize();

            JsonElement serverMessage = CreateRequestMessage("unknownFunction", projId);

            Message result = Client
                .FakeMessageFromServer(
                    new MessageRequest(PDB_FACTORY_GET_REQUEST, requesterId, serverMessage)
                )
                .First();

            Assert.That(result.Type, Is.EqualTo(MessageType.RESPONSE));
            MessageResponse response = (MessageResponse)result;
            Assert.That(
                response.ErrorMessage,
                Is.EqualTo("Unknown function call: unknownFunction")
            );
            Assert.That(response.RequestId, Is.EqualTo(requesterId));
            Assert.That(response.Contents, Is.Null);
        }

        [Test]
        public async Task GetProjectDataProviderID_ReturnsIdForProvider()
        {
            const string projId = "monkey";
            const int requesterId1 = 47281;
            const int requesterId2 = 18542;

            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, ParatextProjects);
            await factory.Initialize();

            JsonElement serverMessage = CreateRequestMessage("getProjectDataProviderId", projId);

            Message result1 = Client
                .FakeMessageFromServer(
                    new MessageRequest(PDB_FACTORY_GET_REQUEST, requesterId1, serverMessage)
                )
                .First();

            Assert.That(result1.Type, Is.EqualTo(MessageType.RESPONSE));
            MessageResponse response1 = (MessageResponse)result1;
            Assert.That(response1.ErrorMessage, Is.Null);
            Assert.That(response1.RequestId, Is.EqualTo(requesterId1));
            Assert.That(response1.Contents, Is.TypeOf<string>());

            string originalId = response1.Contents as string ?? "";

            // Make sure another request for the same provider gets the same ID
            Message result2 = Client
                .FakeMessageFromServer(
                    new MessageRequest(PDB_FACTORY_GET_REQUEST, requesterId2, serverMessage)
                )
                .First();

            Assert.That(result2.Type, Is.EqualTo(MessageType.RESPONSE));
            MessageResponse response2 = (MessageResponse)result2;
            Assert.That(response2.ErrorMessage, Is.Null);
            Assert.That(response2.RequestId, Is.EqualTo(requesterId2));
            Assert.That(
                response2.Contents,
                Is.EqualTo(originalId),
                "Did not get the same ID when requesting the same PDP"
            );
        }
    }
}

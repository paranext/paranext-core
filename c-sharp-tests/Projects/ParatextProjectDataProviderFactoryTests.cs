using System.Text.Json;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.Projects;
using PtxUtils;

namespace TestParanextDataProvider.Projects
{
    [TestFixture]
    internal class ParatextProjectDataProviderFactoryTests : PsiTestBase
    {
        private const string PdbFactoryGetRequest =
            "object:platform.pdpFactory-ParatextStandard.function";
        
        [Test]
        public async Task InvalidProjectId_ReturnsError()
        {
            const int requesterId = 47192;

            ParatextProjectDataProviderFactory factory = new(Client, Psi, Projects);
            await factory.Initialize();

            JsonElement serverMessage = CreateRequestMessage("getProjectDataProviderId", "unknownProj", "paratextFolders");

            Message result = Client.FakeMessageFromServer(
                new MessageRequest(new Enum<RequestType>(PdbFactoryGetRequest), requesterId, serverMessage)).First();

            Assert.That(result.Type, Is.EqualTo(MessageType.Response));
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

            Projects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, Psi, Projects);
            await factory.Initialize();

            JsonElement serverMessage =
                CreateRequestMessage("getProjectDataProviderId", projId);

            Message result = Client.FakeMessageFromServer(
                new MessageRequest(new Enum<RequestType>(PdbFactoryGetRequest), requesterId,
                    serverMessage)).First();

            Assert.That(result.Type, Is.EqualTo(MessageType.Response));
            MessageResponse response = (MessageResponse)result;
            Assert.That(response.ErrorMessage, Is.EqualTo("Not enough arguments provided when calling PDP Factory for ParatextStandard"));
            Assert.That(response.RequestId, Is.EqualTo(requesterId));
            Assert.That(response.Contents, Is.Null);
        }

        [Test]
        public async Task InvalidType_ReturnsError()
        {
            const string projId = "monkey";
            const int requesterId = 47281;

            Projects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, Psi, Projects);
            await factory.Initialize();

            JsonElement serverMessage =
                CreateRequestMessage("getProjectDataProviderId", projId, "unknownType");

            Message result = Client.FakeMessageFromServer(
                new MessageRequest(new Enum<RequestType>(PdbFactoryGetRequest), requesterId,
                    serverMessage)).First();

            Assert.That(result.Type, Is.EqualTo(MessageType.Response));
            MessageResponse response = (MessageResponse)result;
            Assert.That(response.ErrorMessage, Is.EqualTo("Unexpected project storage interpreter requested: unknownType"));
            Assert.That(response.RequestId, Is.EqualTo(requesterId));
            Assert.That(response.Contents, Is.Null);
        }

        [Test]
        public async Task InvalidFunction_ReturnsError()
        {
            const string projId = "monkey";
            const int requesterId = 47192;

            Projects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, Psi, Projects);
            await factory.Initialize();

            JsonElement serverMessage = CreateRequestMessage("unknownFunction", projId, "paratextFolders");

            Message result = Client.FakeMessageFromServer(
                new MessageRequest(new Enum<RequestType>(PdbFactoryGetRequest), requesterId, serverMessage)).First();

            Assert.That(result.Type, Is.EqualTo(MessageType.Response));
            MessageResponse response = (MessageResponse)result;
            Assert.That(response.ErrorMessage, Is.EqualTo("Unknown function call: unknownFunction"));
            Assert.That(response.RequestId, Is.EqualTo(requesterId));
            Assert.That(response.Contents, Is.Null);
        }

        [Test]
        public async Task GetProjectDataProviderID_ReturnsIdForProvider()
        {
            const string projId = "monkey";
            const int requesterId1 = 47281;
            const int requesterId2 = 18542;

            Projects.FakeAddProject(CreateProjectDetails(projId, "Monkey Soup"));

            ParatextProjectDataProviderFactory factory = new(Client, Psi, Projects);
            await factory.Initialize();

            JsonElement serverMessage =
                CreateRequestMessage("getProjectDataProviderId", projId, "paratextFolders");
            
            Message result1 = Client.FakeMessageFromServer(
                new MessageRequest(new Enum<RequestType>(PdbFactoryGetRequest), requesterId1, serverMessage)).First();

            Assert.That(result1.Type, Is.EqualTo(MessageType.Response));
            MessageResponse response1 = (MessageResponse)result1;
            Assert.That(response1.ErrorMessage, Is.Null);
            Assert.That(response1.RequestId, Is.EqualTo(requesterId1));
            Assert.That(response1.Contents, Is.TypeOf<string>());
            
            string originalId = response1.Contents as string ?? "";

            // Make sure another request for the same provider gets the same ID
            Message result2 = Client.FakeMessageFromServer(
                new MessageRequest(new Enum<RequestType>(PdbFactoryGetRequest), requesterId2, serverMessage)).First();

            Assert.That(result2.Type, Is.EqualTo(MessageType.Response));
            MessageResponse response2 = (MessageResponse)result2;
            Assert.That(response2.ErrorMessage, Is.Null);
            Assert.That(response2.RequestId, Is.EqualTo(requesterId2));
            Assert.That(response2.Contents, Is.EqualTo(originalId), "Did not get the same ID when requesting the same PDP");
        }
    }
}

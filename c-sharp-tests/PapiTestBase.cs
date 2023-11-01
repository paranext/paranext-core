using System.Text;
using Paranext.DataProvider.Projects;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Xml.Linq;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using PtxUtils;
using Newtonsoft.Json;
using Paranext.DataProvider.Messages;

namespace TestParanextDataProvider
{
    [TestFixture]
    internal abstract class PapiTestBase
    {
        #region Member variables
        private DummyPapiClient? _client;
        private DummyLocalProjects? _projects;
        #endregion

        #region Constructor
        static PapiTestBase()
        {
            string testFolder = Path.Combine(Path.GetTempPath(), "Platform.Bible.Tests", Path.GetRandomFileName());
            ParatextGlobals.Initialize(testFolder);
        }
        #endregion

        #region Test setup/teardown
        [SetUp]
        public virtual void TestSetup()
        {
            _projects = new DummyLocalProjects();
            _client = new DummyPapiClient();
        }

        [TearDown]
        public virtual void TestTearDown()
        {
            List<ScrText> projects =
                ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList();

            foreach (ScrText project in projects)
                ScrTextCollection.Remove(project, false);
        }
        #endregion

        #region Properties
        protected DummyPapiClient Client
        {
            get
            {
                if (_client == null)
                    throw new InvalidOperationException("Can not access Client before test setup is run");
                return _client;
            }
        }

        protected DummyLocalProjects Projects
        {
            get
            {
                if (_projects == null)
                    throw new InvalidOperationException("Can not access Projects before test setup is run");
                return _projects;
            }
        }
        #endregion

        #region Helper methods to create test data
        /// <summary>
        /// Creates a new dummy project for testing purposes. The project is added to the ScrTextCollection.
        /// </summary>
        protected static DummyScrText CreateDummyProject()
        {
            DummyScrText scrText = new();
            ScrTextCollection.Add(scrText, true);
            return scrText;
        }

        /// <summary>
        /// Creates project details from the specified project
        /// </summary>
        protected static ProjectDetails CreateProjectDetails(ScrText scrText)
        {
            return CreateProjectDetails(scrText.Guid.ToString(), scrText.Name);
        }

        /// <summary>
        /// Creates fake project details to fake the existence of a project 
        /// </summary>
        /// <seealso cref="DummyLocalProjects.FakeAddProject"/>
        protected static ProjectDetails CreateProjectDetails(string id, string name)
        {
            ProjectMetadata metadata = new(id, name, "ParatextFolders", "");
            return new ProjectDetails(metadata, "testDirectoryThatDoesNotExist");
        }

        /// <summary>
        /// Creates JSON that represents a verse reference having the specified parameters
        /// </summary>
        protected static JsonNode CreateVerseRefNode(int bookNum, int chapterNum, int verseNum)
        {
            return JsonNode.Parse("{ \"versification\":\"English\", " +
                                  $"\"_bookNum\":{bookNum}, \"_chapterNum\":{chapterNum}, \"_verseNum\":{verseNum} }}")!;
        }

        /// <summary>
        /// Creates a JSON string node with the specified data
        /// </summary>
        protected static JsonNode CreateJsonString(string data)
        {
            JsonNode node = JsonNode.Parse($"{{ \"data\":{JsonConvert.ToString(data)} }}")!;
            return node.Root["data"]!;
        }

        /// <summary>
        /// Replicates the creation of the JsonElement that is given to requests when
        /// coming from the server.
        /// </summary>
        protected static JsonElement CreateRequestMessage(string function, params object[] parameters)
        {
            StringBuilder jsonBldr = new StringBuilder();
            jsonBldr.Append("{ \"value\":[");
            jsonBldr.Append("\"").Append(function).Append("\"");
            if (parameters.Length > 0)
                jsonBldr.Append(", ");

            for (var i = 0; i < parameters.Length; i++)
            {
                if (i > 0)
                    jsonBldr.Append(", ");

                object param = parameters[i];
                switch (param)
                {
                    case string str:
                        jsonBldr.Append(JsonConvert.ToString(str));
                        break;
                    case JsonNode node:
                        jsonBldr.Append(node.ToJsonString());
                        break;
                    default:
                        jsonBldr.Append(param);
                        break;
                }
            }

            jsonBldr.Append("] }");
            
            JsonDocument serverMessage = JsonDocument.Parse(jsonBldr.ToString());
            return serverMessage.RootElement.GetProperty("value");
        }

        /// <summary>
        /// Creates a Data Scope node that is given to requests when
        /// coming from the server.
        /// </summary>
        protected static JsonNode CreateDataScope(string extensionName, string dataQualifier, string? dataType = null)
        {
            // NOTE: projectId and projectName are usually automatically supplied

            return JsonNode.Parse($"{{ \"extensionName\":\"{extensionName}\", " +
                                  $"\"dataQualifier\":\"{dataQualifier}\" }}" +
                                  (dataType != null ? $"\"dataType\":\"{dataType}\"" : ""))!;
        }
        #endregion

        #region Helper methods to verify data
        /// <summary>
        /// Asserts that the two snippets of USFM are the same. This function normalizes both snippets
        /// to ensure maximum compatibility between them.
        /// </summary>
        protected static void VerifyUsfmSame(string usfm1, string usfm2, ScrText scrText, int bookNum)
        {
            usfm1 = UsfmToken.NormalizeUsfm(scrText, bookNum, usfm1);
            usfm2 = UsfmToken.NormalizeUsfm(scrText, bookNum, usfm2);

            Assert.That(usfm1, Is.EqualTo(usfm2));
        }
        
        /// <summary>
        /// Asserts that the two snippets of USX are the same. This function normalizes both snippets
        /// to ensure maximum compatibility between them.
        /// </summary>
        protected static void VerifyUsxSame(string usx1, string usx2)
        {
            XDocument doc1;
            using (TextReader reader1 = new StringReader(usx1))
                doc1 = XDocument.Load(reader1);

            XDocument doc2;
            using (TextReader reader2 = new StringReader(usx2))
                doc2 = XDocument.Load(reader2);

            Assert.That(doc1.Root!.ToString().Replace("\r", "").Replace("\n", ""),
                Is.EqualTo(doc2.Root!.ToString().Replace("\r", "").Replace("\n", "")));
        }

        /// <summary>
        /// Verifies the contents of a server response message
        /// </summary>
        protected static void VerifyResponse(Message message, string? expectedErrorMessage,
            Enum<RequestType> expectedResponseType,
            int expectedRequestId, object? expectedContents)
        {
            Assert.Multiple(() =>
            {
                VerifyResponseExceptContents(message, expectedErrorMessage, expectedResponseType, expectedRequestId);
                Assert.That(((MessageResponse)message).Contents, Is.EqualTo(expectedContents));
            });
        }

        /// <summary>
        /// Verifies the contents of a server response message ignoring the contents
        /// </summary>
        protected static void VerifyResponseExceptContents(Message message, string? expectedErrorMessage,
            Enum<RequestType> expectedResponseType,
            int expectedRequestId)
        {
            Assert.Multiple(() =>
            {
                Assert.That(message.Type, Is.EqualTo(MessageType.Response));

                MessageResponse response = (MessageResponse)message;
                Assert.That(response.ErrorMessage, Is.EqualTo(expectedErrorMessage));
                Assert.That(response.Success, Is.EqualTo(string.IsNullOrEmpty(expectedErrorMessage)));
                Assert.That(response.RequestType, Is.EqualTo(expectedResponseType));
                Assert.That(response.RequestId, Is.EqualTo(expectedRequestId));
            });
        }
        #endregion
    }
}

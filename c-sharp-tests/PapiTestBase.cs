using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Web;
using System.Xml.Linq;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider
{
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal abstract class PapiTestBase
    {
        #region Member variables
        private DummyPapiClient? _client;
        private DummyLocalParatextProjects? _projects;
        #endregion

        #region Test setup/teardown
        [SetUp]
        public virtual Task TestSetupAsync()
        {
            _projects = new DummyLocalParatextProjects();
            _client = new DummyPapiClient();

            return Task.CompletedTask;
        }

        [TearDown]
        public virtual void TestTearDown()
        {
            List<ScrText> projects = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .ToList();

            foreach (ScrText project in projects)
                ScrTextCollection.Remove(project, false);

            _client?.Dispose();
        }
        #endregion

        #region Properties
        protected DummyPapiClient Client
        {
            get
            {
                if (_client == null)
                    throw new InvalidOperationException(
                        "Can not access Client before test setup is run"
                    );
                return _client;
            }
        }

        protected DummyLocalParatextProjects ParatextProjects
        {
            get
            {
                if (_projects == null)
                    throw new InvalidOperationException(
                        "Can not access Projects before test setup is run"
                    );
                return _projects;
            }
        }
        #endregion

        #region Helper methods to create test data
        /// <summary>
        /// Creates a new dummy project for testing purposes
        /// </summary>
        protected static DummyScrText CreateDummyProject()
        {
            DummyScrText scrText = new();
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
        /// <seealso cref="DummyLocalParatextProjects.FakeAddProject"/>
        protected static ProjectDetails CreateProjectDetails(
            string id,
            string name,
            List<string>? projectInterfaces = null
        )
        {
            ProjectMetadata metadata = new(id, projectInterfaces ?? []);
            return new ProjectDetails(name, metadata, "testDirectoryThatDoesNotExist");
        }

        /// <summary>
        /// Creates JSON that represents a verse reference having the specified parameters
        /// </summary>
        protected static JsonNode CreateVerseRefNode(int bookNum, int chapterNum, int verseNum)
        {
            return JsonNode.Parse(
                "{ \"versification\":\"English\", "
                    + $"\"_bookNum\":{bookNum}, \"_chapterNum\":{chapterNum}, \"_verseNum\":{verseNum} }}"
            )!;
        }

        /// <summary>
        /// Creates JSON that represents a verse reference having the specified parameters in full
        /// serialization.
        /// </summary>
        protected static JsonNode CreateFullSerializationVerseRefNode(
            string book,
            int chapterNum,
            int verseNum
        )
        {
            var jsonObject = new JsonObject
            {
                ["book"] = book,
                ["chapterNum"] = chapterNum,
                ["verseNum"] = verseNum,
                ["versificationStr"] = "English",
            };
            return jsonObject;
        }

        /// <summary>
        /// Creates JSON that represents a verse reference having the specified parameters in full
        /// serialization.
        ///
        /// Includes the `verse: undefined` property from @sillsdev/scripture v2.0.0
        /// https://github.com/sillsdev/scripture/blob/209054a89652ba9f6aec6bd142aba439cd952bc5/src/verse-ref.ts#L491
        /// </summary>
        protected static JsonNode CreateFullSerializationVerseRefNodev2_0_0(
            string book,
            int chapterNum,
            int verseNum
        )
        {
            var jsonObject = new JsonObject
            {
                ["book"] = book,
                ["chapterNum"] = chapterNum,
                ["verse"] = null,
                ["verseNum"] = verseNum,
                ["versificationStr"] = "English",
            };
            return jsonObject;
        }

        /// <summary>
        /// Creates a JSON string node with the specified data
        /// </summary>
        protected static JsonNode CreateJsonString(string data)
        {
            JsonNode node = JsonNode.Parse(
                $"{{ \"data\":\"{HttpUtility.JavaScriptStringEncode(data)}\" }}"
            )!;
            return node.Root["data"]!;
        }

        /// <summary>
        /// Replicates the creation of the JsonElement that is given to requests when
        /// coming from the server.
        /// </summary>
        protected static JsonElement CreateRequestMessage(
            string function,
            params object[] parameters
        )
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
                        jsonBldr
                            .Append("\"")
                            .Append(HttpUtility.JavaScriptStringEncode(str))
                            .Append("\"");
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
        protected static JsonNode CreateDataScope(
            string extensionName,
            string dataQualifier,
            string? dataType = null
        )
        {
            // NOTE: projectId and projectName are usually automatically supplied

            return JsonNode.Parse(
                $"{{ \"extensionName\":\"{extensionName}\", "
                    + $"\"dataQualifier\":\"{dataQualifier}\" }}"
                    + (dataType != null ? $"\"dataType\":\"{dataType}\"" : "")
            )!;
        }
        #endregion

        #region Helper methods to verify data
        /// <summary>
        /// Asserts that the two snippets of USFM are the same. This function normalizes both snippets
        /// to ensure maximum compatibility between them.
        /// </summary>
        protected static void VerifyUsfmSame(
            string usfm1,
            string usfm2,
            ScrText scrText,
            int bookNum
        )
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

            Assert.That(
                doc1.Root!.ToString().Replace("\r", "").Replace("\n", ""),
                Is.EqualTo(doc2.Root!.ToString().Replace("\r", "").Replace("\n", ""))
            );
        }

        #endregion
    }
}

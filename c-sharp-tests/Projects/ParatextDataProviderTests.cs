using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Nodes;
using Newtonsoft.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using SIL.Scripture;
using static Paranext.DataProvider.Projects.ParatextProjectDataProvider;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextDataProviderTests : PapiTestBase
    {
        private const string PdpName = "soup";
        private const string PdpDataRequest = "object:soup-pdp-data.function";
        private const string PdpDataUpdateEvent = "soup-pdp-data:onDidUpdate";

        private ScrText _scrText = null!; // Will be non-null when the test runs
        private ProjectDetails _projectDetails = null!; // Will be non-null when the test runs

        [SetUp]
        public override async Task TestSetup()
        {
            await base.TestSetup();
            _scrText = CreateDummyProject();

            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            var settingsService = new DummySettingsService(Client);
            await settingsService.RegisterDataProvider();
            settingsService.AddSettingValue(Settings.INCLUDE_MY_PARATEXT_9_PROJECTS, true);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [TestCase("getBookUSFM")]
        [TestCase("getChapterUSFM")]
        [TestCase("getVerseUSFM")]
        [TestCase("getChapterUSX")]
        [TestCase("setChapterUSX")]
        public async Task GetFunctions_MissingParameter(string function)
        {
            Random random = new();
            int requesterId = random.Next();

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            JsonElement serverMessage = CreateRequestMessage(function);

            string requestType = PdpDataRequest;
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            // TODO: Handle this better
            VerifyResponse(
                result,
                "Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')",
                requestType,
                requesterId,
                null
            );
        }

        [TestCase("unknownFunction", 5, 1, 0, "Unknown function: unknownFunction")]
        [TestCase(
            "getBookUSFM",
            0,
            1,
            0,
            "Invalid VerseRef ({\"versification\":\"English\",\"_bookNum\":0,\"_chapterNum\":1,\"_verseNum\":0}): BookNum must be greater than zero and less than or equal to last book"
        )]
        [TestCase(
            "getChapterUSFM",
            2,
            -1,
            0,
            "Invalid VerseRef ({\"versification\":\"English\",\"_bookNum\":2,\"_chapterNum\":-1,\"_verseNum\":0}): ChapterNum can not be negative"
        )]
        [TestCase(
            "getVerseUSFM",
            2,
            1,
            -1,
            "Invalid VerseRef ({\"versification\":\"English\",\"_bookNum\":2,\"_chapterNum\":1,\"_verseNum\":-1}): VerseNum can not be negative"
        )]
        public async Task GetFunctions_InvalidParameters(
            string function,
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedError
        )
        {
            Random random = new();
            int requesterId = random.Next();

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            JsonElement serverMessage = CreateRequestMessage(
                function,
                CreateVerseRefNode(bookNum, chapterNum, verseNum)
            );

            string requestType = PdpDataRequest;
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            VerifyResponse(result, expectedError, requestType, requesterId, null);
        }

        [TestCase("getVerseUSFM", 1, 1, 0, @"\id GEN \ip intro \c 1 ")]
        [TestCase("getVerseUSFM", 1, 2, 1, @"\v 1 verse one ")]
        [TestCase("getVerseUSFM", 1, 2, 6, @"\v 6 verse six ")]
        [TestCase("getVerseUSFM", 1, 2, 10, "")] // Missing verse
        [TestCase("getVerseUSFM", 1, 6, 1, "")] // Missing chapter
        [TestCase("getVerseUSFM", 3, 5, 3, "")] // Missing book
        [TestCase("getChapterUSFM", 1, 1, 0, @"\id GEN \ip intro \c 1 \v 1 some text")]
        [TestCase(
            "getChapterUSFM",
            1,
            2,
            0,
            @"\c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven"
        )]
        [TestCase("getChapterUSFM", 1, 3, 0, @"\c 3 \p \v 1 bla")]
        [TestCase("getChapterUSFM", 1, 5, 0, "")] // Missing chapter
        [TestCase("getChapterUSFM", 3, 5, 0, "")] // Missing book
        [TestCase(
            "getBookUSFM",
            1,
            2,
            0,
            @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla"
        )]
        [TestCase("getBookUSFM", 3, 2, 0, "")] // Missing book
        public async Task GetFunctions_ValidResults(
            string function,
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            JsonElement serverMessage = CreateRequestMessage(
                function,
                CreateVerseRefNode(bookNum, chapterNum, verseNum)
            );

            string requestType = PdpDataRequest;
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            VerifyResponseExceptContents(result, null, requestType, requesterId);
            string? stringContents = (string?)((MessageResponse)result).Contents;
            VerifyUsfmSame(stringContents!, expectedResult, _scrText, 1);
        }

        [TestCase(
            1,
            4,
            0,
            @"<usx version=""3.0""><chapter number=""4"" style=""c"" />"
                + @"<para style=""p""><verse number=""3"" style=""v"" />a whole new chapter!</para></usx>",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!"
        )]
        [TestCase(
            1,
            2,
            0,
            @"<usx version=""3.0""><chapter number=""2"" style=""c"" />"
                + @"<para style=""p""><verse number=""2"" style=""v"" />New chapter text.</para></usx>",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla"
        )]
        public async Task SetChapterUsx_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string newValue,
            string expectedResult
        )
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            // Set up an event listener to listen for the update
            List<MessageEvent> updateEvents = new();
            string dataUpdateEvent = PdpDataUpdateEvent;
            Client.RegisterEventHandler(
                dataUpdateEvent,
                (e) =>
                {
                    updateEvents.Add(e);
                    return null;
                }
            );

            JsonElement serverMessage = CreateRequestMessage(
                "setChapterUSX",
                CreateVerseRefNode(bookNum, chapterNum, verseNum),
                newValue
            );

            string requestType = PdpDataRequest;
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            VerifyResponse(result, null, requestType, requesterId, AllScriptureDataTypes);

            // Verify an update event was sent out properly
            Assert.That(updateEvents.Count, Is.EqualTo(1));
            Assert.That(updateEvents[0].Event, Is.EqualTo(AllScriptureDataTypes));

            // Verify the new text was saved to disk
            VerseRef reference =
                new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            // Verify getting the same reference gets the new data (make sure no caching problems)
            JsonElement serverMessage2 = CreateRequestMessage(
                "getChapterUSX",
                CreateVerseRefNode(bookNum, chapterNum, verseNum),
                newValue
            );
            Message result2 = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage2))
                .First();
            VerifyResponseExceptContents(result2, null, requestType, requesterId);
            string? stringContents = (string?)((MessageResponse)result2).Contents;
            VerifyUsxSame(stringContents!, newValue);
        }

        [TestCase(
            1,
            4,
            0,
            @"\c 4 \p \v 3 a whole new chapter!",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!"
        )]
        [TestCase(
            1,
            2,
            0,
            @"\c 2 \p \v 2 New chapter text.",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla"
        )]
        public async Task SetChapterUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string newValue,
            string expectedResult
        )
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            // Set up an event listener to listen for the update
            List<MessageEvent> updateEvents = new();
            string dataUpdateEvent = PdpDataUpdateEvent;
            Client.RegisterEventHandler(
                dataUpdateEvent,
                (e) =>
                {
                    updateEvents.Add(e);
                    return null;
                }
            );

            JsonElement serverMessage = CreateRequestMessage(
                "setChapterUSFM",
                CreateVerseRefNode(bookNum, chapterNum, verseNum),
                newValue
            );

            string requestType = PdpDataRequest;
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            VerifyResponse(result, null, requestType, requesterId, AllScriptureDataTypes);

            // Verify an update event was sent out properly
            Assert.That(updateEvents.Count, Is.EqualTo(1));
            Assert.That(updateEvents[0].Event, Is.EqualTo(AllScriptureDataTypes));

            // Verify the new text was saved to disk
            VerseRef reference =
                new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            // Verify getting the same reference gets the new data (make sure no caching problems)
            JsonElement serverMessage2 = CreateRequestMessage(
                "getChapterUSFM",
                CreateVerseRefNode(bookNum, chapterNum, verseNum),
                newValue
            );
            Message result2 = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage2))
                .First();
            VerifyResponseExceptContents(result2, null, requestType, requesterId);
            string? stringContents = (string?)((MessageResponse)result2).Contents;
            VerifyUsfmSame(stringContents!, newValue, _scrText, 1);
        }

        [TestCase(null, "myFile.txt", "Must provide an extension name")]
        [TestCase("", "myFile.txt", "Must provide an extension name")]
        [TestCase("myExtension", null, "Must provide a data qualifier")]
        [TestCase("myExtension", "", "Must provide a data qualifier")]
        public async Task GetExtensionData_InvalidParameters_ReturnsError(
            string? extensionName,
            string? dataQualifier,
            string? expectedError
        )
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            ResponseToRequest response = provider.GetExtensionData(
                new ProjectDataScope
                {
                    ExtensionName = extensionName,
                    DataQualifier = dataQualifier
                }
            );

            VerifyResponseToRequest(response, expectedError, null);
        }

        [TestCase(null, "myFile.txt", "Must provide an extension name")]
        [TestCase("", "myFile.txt", "Must provide an extension name")]
        [TestCase("myExtension", null, "Must provide a data qualifier")]
        [TestCase("myExtension", "", "Must provide a data qualifier")]
        public async Task SetExtensionData_InvalidParameters_ReturnsError(
            string? extensionName,
            string? dataQualifier,
            string? expectedError
        )
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            ResponseToRequest response = provider.SetExtensionData(
                new ProjectDataScope
                {
                    ExtensionName = extensionName,
                    DataQualifier = dataQualifier
                },
                "Random data"
            );

            VerifyResponseToRequest(response, expectedError, null);
        }

        [Test]
        public async Task GetExtensionData_NoData_ReturnsError()
        {
            Random random = new();
            int requesterId = random.Next();

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            JsonNode scope = CreateDataScope("myExtension", "myFile.txt");
            JsonElement serverMessage = CreateRequestMessage("getExtensionData", scope);

            string requestType = new(PdpDataRequest);
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            VerifyResponse(result, "Extension data not found", requestType, requesterId, null);
        }

        [Test]
        public async Task SetAndGetExtensionData_SavesAndGetsData()
        {
            Random random = new();
            int requesterId = random.Next();

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            JsonNode scope = CreateDataScope("myExtension", "myFile.txt");
            JsonElement serverMessage = CreateRequestMessage(
                "setExtensionData",
                scope,
                CreateJsonString("Random file contents")
            );

            string requestType = PdpDataRequest;
            Message result = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage))
                .First();

            VerifyResponse(result, null, requestType, requesterId, "ExtensionData");

            // Verify the data was updated by reading it right away
            JsonElement serverMessage2 = CreateRequestMessage("getExtensionData", scope);
            Message result2 = Client
                .FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage2))
                .First();

            VerifyResponse(result2, null, requestType, requesterId, "Random file contents");
        }

        /// <summary>
        /// Tests that the ParatextProjectDataProvider has successfully registered a validator for
        /// the Validity property and that the validator is called to determine that the new value
        /// for that property is indeed valid.
        /// </summary>
        [Test]
        public async Task SetProjectSetting_ValidVisibility_Succeeds()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            var result = provider.SetProjectSetting(
                JsonConvert.SerializeObject(VisibilitySettingName),
                JsonConvert.SerializeObject(ProjectVisibility.Public.ToString())
            );

            Assert.That(result.Success, Is.True);
        }

        /// <summary>
        /// Tests that the ParatextProjectDataProvider has successfully registered a validator for
        /// the Validity property and that the validator is called to determine that the new value
        /// for that property is indeed invalid.
        /// </summary>
        [Test]
        public async Task SetProjectSetting_InvalidVisibility_DoesNotSucceed()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            await provider.RegisterDataProvider();

            var result = provider.SetProjectSetting(
                JsonConvert.SerializeObject(VisibilitySettingName),
                JsonConvert.SerializeObject(89)
            );

            Assert.That(result.Success, Is.False);
        }
    }
}

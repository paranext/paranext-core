using Paranext.DataProvider.Messages;
using Paranext.DataProvider.Projects;
using PtxUtils;
using System.Text.Json;
using System.Text.Json.Nodes;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    internal class ParatextDataProviderTests : PsiTestBase
    {
        private const string PdpDataRequest = "object:soup-pdp-data.function";

        private ScrText _scrText = null!; // Will be non-null when the test runs
        private ProjectDetails _projectDetails = null!; // Will be non-null when the test runs

        public override void TestSetup()
        {
            base.TestSetup();
            _scrText = CreateDummyProject();

            _projectDetails = CreateProjectDetails(_scrText);
            Projects.FakeAddProject(_projectDetails);
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

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonElement serverMessage = CreateRequestMessage(function);
            
            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            // TODO: Handle this better
            VerifyResponse(result,
                "Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')",
                requestType, requesterId, null);
        }

        [TestCase("unknownFunction", 5, 1, 0, "Unknown function: unknownFunction")]
        [TestCase("getBookUSFM", 0, 1, 0,
            "Invalid VerseRef ({\"versification\":\"English\",\"_bookNum\":0,\"_chapterNum\":1,\"_verseNum\":0}): BookNum must be greater than zero and less than or equal to last book")]
        [TestCase("getChapterUSFM", 2, -1, 0,
            "Invalid VerseRef ({\"versification\":\"English\",\"_bookNum\":2,\"_chapterNum\":-1,\"_verseNum\":0}): ChapterNum can not be negative")]
        [TestCase("getVerseUSFM", 2, 1, -1,
            "Invalid VerseRef ({\"versification\":\"English\",\"_bookNum\":2,\"_chapterNum\":1,\"_verseNum\":-1}): VerseNum can not be negative")]
        public async Task GetFunctions_InvalidParameters(string function, int bookNum, int chapterNum, int verseNum, string expectedError)
        {
            Random random = new();
            int requesterId = random.Next();

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonElement serverMessage =
                CreateRequestMessage(function, CreateVerseRefNode(bookNum, chapterNum, verseNum));
            
            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            VerifyResponse(result, expectedError, requestType, requesterId, null);
        }

        [TestCase("getVerseUSFM", 1, 1, 0, @"\id GEN \ip intro \c 1 ")]
        [TestCase("getVerseUSFM", 1, 2, 1, @"\v 1 verse one ")]
        [TestCase("getVerseUSFM", 1, 2, 6, @"\v 6 verse six ")]
        [TestCase("getVerseUSFM", 1, 2, 10, "")] // Missing verse
        [TestCase("getVerseUSFM", 1, 6, 1, "")] // Missing chapter
        [TestCase("getVerseUSFM", 3, 5, 3, "")] // Missing book
        [TestCase("getChapterUSFM", 1, 1, 0, @"\id GEN \ip intro \c 1 \v 1 some text")]
        [TestCase("getChapterUSFM", 1, 2, 0, @"\c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven")]
        [TestCase("getChapterUSFM", 1, 3, 0, @"\c 3 \p \v 1 bla")]
        [TestCase("getChapterUSFM", 1, 5, 0, "")] // Missing chapter
        [TestCase("getChapterUSFM", 3, 5, 0, "")] // Missing book
        [TestCase("getBookUSFM", 1, 2, 0,
            @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla")]
        [TestCase("getBookUSFM", 3, 2, 0, "")] // Missing book
        public async Task GetFunctions_ValidResults(string function, int bookNum, int chapterNum, int verseNum, string expectedResult)
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(1, 0, false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla", null);

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonElement serverMessage =
                CreateRequestMessage(function, CreateVerseRefNode(bookNum, chapterNum, verseNum));

            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            VerifyResponseExceptContents(result, null, requestType, requesterId);
            VerifyUsfmSame(((MessageResponse)result).Contents, expectedResult, _scrText, 1);
        }

        [TestCase(1, 4, 0, @"<usx version=""3.0""><chapter number=""4"" style=""c"" />" +
                @"<para style=""p""><verse number=""3"" style=""v"" /> a whole new chapter!</para></usx>",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!")]
        [TestCase(1, 2, 0, @"<usx version=""3.0""><chapter number=""2"" style=""c"" />" +
                @"<para style=""p""><verse number=""2"" style=""v"" /> New chapter text.</para></usx>",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla")]
        public async Task SetChapterUsx_ValidResults(int bookNum, int chapterNum, int verseNum,
            string newValue, string expectedResult)
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(1, 0, false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla", null);

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonElement serverMessage =
                CreateRequestMessage("setChapterUSX", CreateVerseRefNode(bookNum, chapterNum, verseNum), newValue);

            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            VerifyResponse(result, null, requestType, requesterId, "ChapterUSX");

            // Verify the new text was saved to disk
            VerseRef reference = new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            // Verify getting the same reference gets the new data (make sure no caching problems)
            JsonElement serverMessage2 =
                CreateRequestMessage("getChapterUSX", CreateVerseRefNode(bookNum, chapterNum, verseNum), newValue);
            Message result2 = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage2)).First();
            VerifyResponseExceptContents(result2, null, requestType, requesterId);
            VerifyUsxSame(((MessageResponse)result2).Contents, newValue);
        }

        [TestCase(1, 4, 0, @"\c 4 \p \v 3 a whole new chapter!",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!")]
        [TestCase(1, 2, 0, @"\c 2 \p \v 2 New chapter text.",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla")]
        public async Task SetChapterUsfm_ValidResults(int bookNum, int chapterNum, int verseNum,
            string newValue, string expectedResult)
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(1, 0, false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla", null);

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonElement serverMessage =
                CreateRequestMessage("setChapterUSFM", CreateVerseRefNode(bookNum, chapterNum, verseNum), newValue);

            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            VerifyResponse(result, null, requestType, requesterId, "ChapterUSFM");

            // Verify the new text was saved to disk
            VerseRef reference = new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            // Verify getting the same reference gets the new data (make sure no caching problems)
            JsonElement serverMessage2 =
                CreateRequestMessage("getChapterUSFM", CreateVerseRefNode(bookNum, chapterNum, verseNum), newValue);
            Message result2 = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage2)).First();
            VerifyResponseExceptContents(result2, null, requestType, requesterId);
            VerifyUsfmSame(((MessageResponse)result2).Contents, newValue, _scrText, 1);
        }

        [Test]
        public async Task GetExtensionData_NoData_ReturnsError()
        {
            Random random = new();
            int requesterId = random.Next();

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonNode scope = CreateDataScope("myExtension", "myFile.txt");
            JsonElement serverMessage = CreateRequestMessage("getExtensionData", scope);

            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            VerifyResponse(result, "Extension data not found", requestType, requesterId, null);
        }

        [Test]
        public async Task SetAndGetExtensionData_SavesAndGetsData()
        {
            Random random = new();
            int requesterId = random.Next();

            ParatextProjectDataProvider provider = new(Psi, "soup", Client, _projectDetails);
            await provider.RegisterDataProvider();

            JsonNode scope = CreateDataScope("myExtension", "myFile.txt");
            JsonElement serverMessage =
                CreateRequestMessage("setExtensionData", scope, CreateJsonString("Random file contents"));

            Enum<RequestType> requestType = new(PdpDataRequest);
            Message result = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage)).First();

            VerifyResponse(result, null, requestType, requesterId, "ExtensionData");

            // Verify the data was updated by reading it right away
            JsonElement serverMessage2 = CreateRequestMessage("getExtensionData", scope);
            Message result2 = Client.FakeMessageFromServer(new MessageRequest(requestType, requesterId, serverMessage2)).First();

            VerifyResponse(result2, null, requestType, requesterId, "Random file contents");
        }
    }
}

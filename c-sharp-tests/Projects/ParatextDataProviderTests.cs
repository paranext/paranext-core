using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextDataProviderTests : PapiTestBase
    {
        private const string PdpName = "soup";

        private ScrText _scrText = null!; // Will be non-null when the test runs
        private ProjectDetails _projectDetails = null!; // Will be non-null when the test runs

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();

            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 ")]
        [TestCase(1, 2, 1, @"\v 1 verse one ")]
        [TestCase(1, 2, 6, @"\v 6 verse six ")]
        [TestCase(1, 2, 10, "")] // Missing verse
        [TestCase(1, 6, 1, "")] // Missing chapter
        [TestCase(3, 5, 3, "")] // Missing book
        public void GetVerseUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            const int KNOWN_BOOK_NUMBER = 1;
            _scrText.PutText(
                KNOWN_BOOK_NUMBER,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            ThreadingUtils.RunTask(
                provider.RegisterDataProviderAsync(),
                "",
                TimeSpan.FromSeconds(1)
            );

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            if (bookNum != KNOWN_BOOK_NUMBER)
            {
                Assert.Throws<MissingBookException>(() => provider.GetBookUsfm(verseRef));
                return;
            }

            var result = provider.GetVerseUsfm(verseRef);
            VerifyUsfmSame(result, expectedResult, _scrText, bookNum);
        }

        [TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 \v 1 some text")]
        [TestCase(1, 2, 0, @"\c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven")]
        [TestCase(1, 3, 0, @"\c 3 \p \v 1 bla")]
        [TestCase(1, 5, 0, "")] // Missing chapter
        [TestCase(3, 5, 0, "")] // Missing book
        public void GetChapterUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            const int KNOWN_BOOK_NUMBER = 1;
            _scrText.PutText(
                KNOWN_BOOK_NUMBER,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            ThreadingUtils.RunTask(
                provider.RegisterDataProviderAsync(),
                "",
                TimeSpan.FromSeconds(1)
            );

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            if (bookNum != KNOWN_BOOK_NUMBER)
            {
                Assert.Throws<MissingBookException>(() => provider.GetBookUsfm(verseRef));
                return;
            }

            var result = provider.GetChapterUsfm(verseRef);
            VerifyUsfmSame(result, expectedResult, _scrText, bookNum);
        }

        [TestCase(
            1,
            2,
            0,
            @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla"
        )]
        [TestCase(3, 2, 0, "")] // Missing book
        public void GetBookUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            const int KNOWN_BOOK_NUMBER = 1;
            _scrText.PutText(
                KNOWN_BOOK_NUMBER,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            ThreadingUtils.RunTask(
                provider.RegisterDataProviderAsync(),
                "",
                TimeSpan.FromSeconds(1)
            );

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            if (bookNum != KNOWN_BOOK_NUMBER)
            {
                Assert.Throws<MissingBookException>(() => provider.GetBookUsfm(verseRef));
                return;
            }

            var result = provider.GetBookUsfm(verseRef);
            VerifyUsfmSame(result, expectedResult, _scrText, bookNum);
        }

        [TestCase(
            1,
            4,
            0,
            @"<usx version=""3.0""><chapter number=""4"" style=""c"" sid="" 4"" />"
                + @"<para style=""p""><verse number=""3"" style=""v"" sid="""" />a whole new chapter!<verse eid="""" /></para><chapter eid="" 4"" /></usx>",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!"
        )]
        [TestCase(
            1,
            2,
            0,
            @"<usx version=""3.0""><chapter number=""2"" style=""c"" sid="" 2"" />"
                + @"<para style=""p""><verse number=""2"" style=""v"" sid="""" />New chapter text.<verse eid="""" /></para><chapter eid="" 2"" /></usx>",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla"
        )]
        public void SetChapterUsx_ValidResults(
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

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            provider.SetChapterUsx(verseRef, newValue);

            // Verify the new text was saved to disk
            VerseRef reference =
                new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            string receivedUsx = provider.GetChapterUsx(verseRef);
            VerifyUsxSame(receivedUsx, newValue);
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
        public void SetChapterUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string newValue,
            string expectedResult
        )
        {
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            provider.SetChapterUsfm(verseRef, newValue);

            // Verify the new text was saved to disk
            VerseRef reference =
                new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            string receivedUsfm = provider.GetChapterUsfm(verseRef);
            VerifyUsfmSame(receivedUsfm, newValue, _scrText, 1);
        }

        [Test]
        public void SetAndGetExtensionData_SavesAndGetsData()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var scope = new ProjectDataScope
            {
                ProjectID = _projectDetails.Metadata.Id,
                ExtensionName = "myExtension",
                DataQualifier = "myFile.txt",
            };
            provider.SetExtensionData(scope, "Random file contents");

            var retrievedScope = provider.GetExtensionData(scope);
            Assert.That(retrievedScope, Is.EqualTo("Random file contents"));
        }

        [Test]
        public void GetExtensionData_NeverWritten_ReadsEmptyAndCreatesNothing()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var data = provider.GetExtensionData(
                new ProjectDataScope { ExtensionName = "myExtension", DataQualifier = "never.json" }
            );

            Assert.Multiple(() =>
            {
                // "" rather than null: the answer an absent document has always given, so no caller
                // can tell the difference - only the side effect is gone
                Assert.That(data, Is.EqualTo(""));
                // A read that created the document would leave a zero-byte file under shared/**
                // for Send/Receive to commit to every clone, with no delete API to take it back
                Assert.That(provider.GetStoredStreamNames(), Is.Empty);
            });
        }

        [Test]
        public void ListExtensionDataQualifiers_NothingWritten_IsEmptyAndCreatesNothing()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var qualifiers = provider.ListExtensionDataQualifiers(
                new ProjectDataScope { ExtensionName = "myExtension" }
            );

            Assert.Multiple(() =>
            {
                Assert.That(qualifiers, Is.Empty);
                // Listing must not write anything: a zero-byte file under shared/** is committed by
                // Send/Receive to every clone, with no delete API to take it back
                Assert.That(provider.GetStoredStreamNames(), Is.Empty);
            });
        }

        [Test]
        public void ListExtensionDataQualifiers_ListsOnlyThisExtensionsQualifiersSorted()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            SetExtensionData(provider, "myExtension", "second.json", "two");
            SetExtensionData(provider, "myExtension", "first.json", "one");
            SetExtensionData(provider, "myExtension", "byMachine/ledger/abc.json", "nested");
            SetExtensionData(provider, "myExtension", "empty.json", "");
            SetExtensionData(provider, "otherExtension", "notMine.json", "theirs");

            var qualifiers = provider.ListExtensionDataQualifiers(
                new ProjectDataScope { ExtensionName = "myExtension" }
            );

            Assert.That(
                qualifiers,
                Is.EqualTo(
                    new[]
                    {
                        // Nested qualifiers keep their forward slashes so they can be passed back
                        // to GetExtensionData unchanged
                        "byMachine/ledger/abc.json",
                        // An empty document is a document: GetExtensionData returns "" for it, so
                        // hiding it would make the list disagree with a read
                        "empty.json",
                        "first.json",
                        "second.json",
                    }
                )
            );
        }

        [Test]
        public void ListExtensionDataQualifiers_EveryQualifierReadsBackWithoutCreatingFiles()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            Dictionary<string, string> written =
                new()
                {
                    ["top.json"] = "top contents",
                    ["byMachine/ledger/abc.json"] = "nested contents",
                    ["empty.json"] = "",
                };
            foreach (var (qualifier, data) in written)
                SetExtensionData(provider, "myExtension", qualifier, data);
            var storedBeforeListing = provider.GetStoredStreamNames();

            var qualifiers = provider.ListExtensionDataQualifiers(
                new ProjectDataScope { ExtensionName = "myExtension" }
            );

            Assert.Multiple(() =>
            {
                Assert.That(qualifiers, Is.EquivalentTo(written.Keys));
                foreach (var qualifier in qualifiers)
                {
                    Assert.That(
                        provider.GetExtensionData(
                            new ProjectDataScope
                            {
                                ExtensionName = "myExtension",
                                DataQualifier = qualifier,
                            }
                        ),
                        Is.EqualTo(written[qualifier]),
                        $"Listed qualifier '{qualifier}' must be readable as written"
                    );
                }
                // Neither listing nor reading a listed qualifier may add a file
                Assert.That(provider.GetStoredStreamNames(), Is.EquivalentTo(storedBeforeListing));
            });
        }

        [Test]
        public void ListExtensionDataQualifiers_IsRegisteredOnTheWireSurface()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            // Every other test here calls the method in-process, so none of them notices if the
            // registration tuple is missing - and without it the method simply does not exist over
            // JSON-RPC, which is the only way an extension can reach it
            Assert.That(
                provider.GetRegisteredFunctionNames(),
                Does.Contain("listExtensionDataQualifiers")
            );
        }

        [TestCase(null, TestName = "ListExtensionDataQualifiers_NoExtensionName_Throws")]
        [TestCase("", TestName = "ListExtensionDataQualifiers_EmptyExtensionName_Throws")]
        [TestCase("   ", TestName = "ListExtensionDataQualifiers_WhitespaceExtensionName_Throws")]
        [TestCase(".", TestName = "ListExtensionDataQualifiers_DotExtensionName_Throws")]
        [TestCase("./", TestName = "ListExtensionDataQualifiers_DotSlashExtensionName_Throws")]
        [TestCase("..", TestName = "ListExtensionDataQualifiers_DotDotExtensionName_Throws")]
        [TestCase(
            "myExtension/..",
            TestName = "ListExtensionDataQualifiers_TraversingExtensionName_Throws"
        )]
        public void ListExtensionDataQualifiers_ExtensionNameEscapesItsDirectory_Throws(
            string? extensionName
        )
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            SetExtensionData(provider, "someOtherExtension", "theirs.json", "theirs");

            // Every one of these resolves to the shared extensions directory (or above it) once it
            // reaches the filesystem, so without this guard the listing hands the caller every
            // extension's qualifiers instead of the one extension it asked about
            Assert.Throws<InvalidDataException>(
                () =>
                    provider.ListExtensionDataQualifiers(
                        new ProjectDataScope { ExtensionName = extensionName }
                    )
            );
        }

        [Test]
        public void ExtensionData_NestedExtensionName_WritesListsAndReadsBack()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            // A name with a separator nests inside the extensions directory rather than escaping
            // it, and the read and write paths have always accepted one. The listing must agree
            // with them - and its escape check must never migrate into the shared path composition,
            // where it would reject this name for reads and writes too and strand whatever was
            // written under it
            SetExtensionData(provider, "acme/tools", "settings.json", "nested");

            Assert.Multiple(() =>
            {
                Assert.That(
                    provider.ListExtensionDataQualifiers(
                        new ProjectDataScope { ExtensionName = "acme/tools" }
                    ),
                    Is.EqualTo(new[] { "settings.json" })
                );
                Assert.That(
                    provider.GetExtensionData(
                        new ProjectDataScope
                        {
                            ExtensionName = "acme/tools",
                            DataQualifier = "settings.json",
                        }
                    ),
                    Is.EqualTo("nested")
                );
            });
        }

        private void SetExtensionData(
            DummyParatextProjectDataProvider provider,
            string extensionName,
            string dataQualifier,
            string data
        ) =>
            provider.SetExtensionData(
                new ProjectDataScope
                {
                    ProjectID = _projectDetails.Metadata.Id,
                    ExtensionName = extensionName,
                    DataQualifier = dataQualifier,
                },
                data
            );
    }
}

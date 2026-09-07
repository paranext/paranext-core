using System.Diagnostics.CodeAnalysis;
using System.Text;
using Paranext.DataProvider.Projects;
using SIL.TestUtilities;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Covers the file-backed stream manager against a real directory. The in-memory stream manager
    /// the PDP tests use joins its names with '/' already, so only these tests can catch a
    /// platform-separator or path-resolution regression.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class RawDirectoryProjectStreamManagerTests
    {
        private const string ExtensionPath = "shared/platform.bible/extensions/myExtension";

        private TemporaryFolder _projectFolder = null!; // Will be non-null when the test runs
        private RawDirectoryProjectStreamManager _streamManager = null!; // Ditto

        [SetUp]
        public void TestSetup()
        {
            _projectFolder = new TemporaryFolder(TestContext.CurrentContext.Test.ID);
            ProjectDetails projectDetails =
                new(
                    "StreamProj",
                    new ProjectMetadata("stream-project-id", []),
                    _projectFolder.Path
                );
            _streamManager = new RawDirectoryProjectStreamManager(projectDetails);
        }

        [TearDown]
        public void TearDown()
        {
            // Recreated first because a test may have deleted it to stand in for an unreachable
            // project, and TemporaryFolder.Dispose expects a folder it can remove
            Directory.CreateDirectory(_projectFolder.Path);
            _projectFolder.Dispose();
        }

        [Test]
        public void GetExistingDataStreamNames_PathDoesNotExist_IsEmptyAndCreatesNothing()
        {
            var streamNames = _streamManager.GetExistingDataStreamNames(ExtensionPath);

            Assert.Multiple(() =>
            {
                Assert.That(streamNames, Is.Empty);
                Assert.That(
                    Directory.Exists(Path.Join(_projectFolder.Path, "shared")),
                    Is.False,
                    "Enumerating must not create any part of the path it was asked about"
                );
            });
        }

        [Test]
        public void GetExistingDataStreamNames_NestedStreams_AreRelativeForwardSlashedAndSorted()
        {
            WriteStream($"{ExtensionPath}/second.json", "two");
            WriteStream($"{ExtensionPath}/first.json", "one");
            WriteStream($"{ExtensionPath}/byMachine/ledger/abc.json", "nested");
            WriteStream($"{ExtensionPath}/empty.json", "");

            var streamNames = _streamManager.GetExistingDataStreamNames(ExtensionPath);

            Assert.That(
                streamNames,
                Is.EqualTo(
                    new[] { "byMachine/ledger/abc.json", "empty.json", "first.json", "second.json" }
                )
            );
        }

        [Test]
        public void GetExistingDataStreamNames_EveryNameReadsBackThroughGetDataStream()
        {
            Dictionary<string, string> written =
                new()
                {
                    ["top.json"] = "top contents",
                    ["byMachine/ledger/abc.json"] = "nested contents",
                };
            foreach (var (streamName, contents) in written)
                WriteStream($"{ExtensionPath}/{streamName}", contents);

            var streamNames = _streamManager.GetExistingDataStreamNames(ExtensionPath);

            Assert.Multiple(() =>
            {
                // Asserted before the loop so the loop cannot be the whole test: with no listing to
                // iterate, every assertion inside it is skipped and the test passes on an empty
                // result - which is exactly what a broken enumeration returns
                Assert.That(streamNames, Is.EquivalentTo(written.Keys));
                foreach (var streamName in streamNames)
                {
                    // Names come back relative to the path they were listed under, so a caller
                    // rejoins them with that path to read them. Compared by contents, not just
                    // non-null, so a name that resolves to some *other* existing file fails here
                    Assert.That(
                        ReadStream($"{ExtensionPath}/{streamName}"),
                        Is.EqualTo(written[streamName]),
                        $"Listed name '{streamName}' must read back the data written under it"
                    );
                }
            });
        }

        [Test]
        public void GetExistingDataStreamNames_HiddenStreams_AreStillListed()
        {
            WriteStream($"{ExtensionPath}/plain.json", "plain");
            // Two spellings of "hidden", because each platform only recognizes one: .NET reports a
            // dot-prefixed name as Hidden on Unix, while on Windows the attribute has to be set
            WriteStream($"{ExtensionPath}/.dotted.json", "dotted");
            WriteStream($"{ExtensionPath}/.dotdir/inside.json", "inside");
            WriteStream($"{ExtensionPath}/attributed.json", "attributed");
            var attributedPath = Path.Join(
                _projectFolder.Path,
                ExtensionPath.Replace('/', Path.DirectorySeparatorChar),
                "attributed.json"
            );
            File.SetAttributes(
                attributedPath,
                File.GetAttributes(attributedPath) | FileAttributes.Hidden
            );

            var streamNames = _streamManager.GetExistingDataStreamNames(ExtensionPath);

            // GetDataStream applies no attribute filter, so anything it can read has to be listed -
            // otherwise the same project answers differently per platform and a caller cannot tell
            // a complete listing from a short one
            Assert.That(
                streamNames,
                Is.EqualTo(
                    new[] { ".dotdir/inside.json", ".dotted.json", "attributed.json", "plain.json" }
                )
            );
        }

        [Test]
        public void GetExistingDataStreamNames_ProjectStorageMissing_Throws()
        {
            WriteStream($"{ExtensionPath}/mine.json", "mine");
            Directory.Delete(_projectFolder.Path, true);

            // An absent sub-path is an empty list, but an absent project is a failure: a caller
            // told to treat only an error as "unknown" would read [] as "this extension has no
            // data" and reinitialize over data that was merely unreachable
            Assert.Throws<DirectoryNotFoundException>(
                () => _streamManager.GetExistingDataStreamNames(ExtensionPath)
            );
        }

        [Test]
        public void GetExistingDataStreamNames_ScopedPath_ExcludesEverythingOutsideIt()
        {
            WriteStream($"{ExtensionPath}/mine.json", "mine");
            WriteStream("shared/platform.bible/extensions/otherExtension/theirs.json", "theirs");
            WriteStream("Settings.xml", "<ScriptureText />");

            var streamNames = _streamManager.GetExistingDataStreamNames(ExtensionPath);

            Assert.That(streamNames, Is.EqualTo(new[] { "mine.json" }));
        }

        [Test]
        public void GetExistingDataStreamNames_NoPath_ListsWholeProjectRelativeToItsRoot()
        {
            WriteStream($"{ExtensionPath}/mine.json", "mine");
            WriteStream("Settings.xml", "<ScriptureText />");

            var streamNames = _streamManager.GetExistingDataStreamNames();

            Assert.That(
                streamNames,
                Is.EqualTo(new[] { "Settings.xml", $"{ExtensionPath}/mine.json" })
            );
        }

        [Test]
        public void GetExistingDataStreamNames_PathEscapingTheProject_Throws()
        {
            Assert.Throws<ArgumentException>(
                () => _streamManager.GetExistingDataStreamNames("../../somewhere-else")
            );
        }

        private void WriteStream(string streamName, string contents)
        {
            using Stream stream = _streamManager.GetDataStream(
                streamName,
                createIfNotExists: true
            )!;
            // BOM-less, so writing "" leaves a genuinely 0-byte file. Encoding.UTF8 emits its
            // preamble on flush even with nothing written, which would make the empty-document
            // fixture 3 bytes and leave the "empty documents are included" claim untested.
            using StreamWriter writer = new(stream, new UTF8Encoding(false));
            writer.Write(contents);
        }

        private string ReadStream(string streamName)
        {
            using Stream stream =
                _streamManager.GetDataStream(streamName, createIfNotExists: false)
                ?? throw new AssertionException($"Listed name '{streamName}' names no stream");
            using StreamReader reader = new(stream, Encoding.UTF8);
            return reader.ReadToEnd();
        }
    }
}

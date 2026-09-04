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
            _projectFolder?.Dispose();
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
            WriteStream($"{ExtensionPath}/top.json", "top contents");
            WriteStream($"{ExtensionPath}/byMachine/ledger/abc.json", "nested contents");

            var streamNames = _streamManager.GetExistingDataStreamNames(ExtensionPath);

            Assert.Multiple(() =>
            {
                foreach (var streamName in streamNames)
                {
                    // Names come back relative to the path they were listed under, so a caller
                    // rejoins them with that path to read them
                    using var stream = _streamManager.GetDataStream(
                        $"{ExtensionPath}/{streamName}",
                        createIfNotExists: false
                    );
                    Assert.That(
                        stream,
                        Is.Not.Null,
                        $"Listed name '{streamName}' must name a stream that already exists"
                    );
                }
            });
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
            using StreamWriter writer = new(stream, Encoding.UTF8);
            writer.Write(contents);
        }
    }
}

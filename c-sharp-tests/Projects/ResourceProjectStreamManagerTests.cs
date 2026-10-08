using System.Diagnostics.CodeAnalysis;
using System.Text;
using ICSharpCode.SharpZipLib.Zip;
using Paranext.DataProvider.Projects;
using Paratext.Data.ProjectFileAccess;
using SIL.TestUtilities;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Covers the archive-backed stream manager against real archives, read through ParatextData's
    /// own resource file manager, since what matters is that the listing agrees with what that file
    /// manager will read.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class ResourceProjectStreamManagerTests
    {
        private const string ExtensionPath = "shared/platform.bible/extensions/myExtension";
        private const string ArchivePassword = "resource password";

        private TemporaryFolder _folder = null!; // Will be non-null when the test runs
        private readonly List<ProjectFileManager> _fileManagers = [];

        [SetUp]
        public void TestSetup()
        {
            _folder = new TemporaryFolder(TestContext.CurrentContext.Test.ID);
        }

        [TearDown]
        public void TearDown()
        {
            // Each file manager holds its archive open, and Windows will not delete an open file
            foreach (var fileManager in _fileManagers)
                fileManager.Dispose();
            _fileManagers.Clear();
            _folder.Dispose();
        }

        [Test]
        public void GetExistingDataStreamNames_NestedEntries_AreRelativeForwardSlashedAndSorted()
        {
            // Written with no directory entries, as archives commonly are, so byMachine/ and
            // byMachine/ledger/ exist only as parts of an entry name. The file manager's own
            // directory listing cannot find byMachine/, which holds no file directly
            var streamManager = CreateStreamManager(
                [
                    ($"{ExtensionPath}/second.json", "two"),
                    ($"{ExtensionPath}/first.json", "one"),
                    ($"{ExtensionPath}/byMachine/ledger/abc.json", "nested"),
                    ($"{ExtensionPath}/empty.json", ""),
                    ("shared/platform.bible/extensions/otherExtension/theirs.json", "theirs"),
                    ("Settings.xml", "<ScriptureText />"),
                ]
            );

            var streamNames = streamManager.GetExistingDataStreamNames(ExtensionPath);

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
                new() { ["top.json"] = "top contents", ["byMachine/ledger/abc.json"] = "nested" };
            var streamManager = CreateStreamManager(
                written.Select(entry => ($"{ExtensionPath}/{entry.Key}", entry.Value))
            );

            var streamNames = streamManager.GetExistingDataStreamNames(ExtensionPath);

            Assert.Multiple(() =>
            {
                // Asserted before the loop so an empty listing cannot pass by skipping it
                Assert.That(streamNames, Is.EquivalentTo(written.Keys));
                foreach (var streamName in streamNames)
                {
                    Assert.That(
                        ReadStream(streamManager, $"{ExtensionPath}/{streamName}"),
                        Is.EqualTo(written[streamName]),
                        $"Listed name '{streamName}' must read back the data stored under it"
                    );
                }
            });
        }

        [Test]
        public void EncryptedResource_UnencryptedEntry_IsNeitherListedNorRead()
        {
            // The file manager refuses an unencrypted entry in an encrypted resource as one it
            // cannot verify, so it is not part of the resource and the listing must agree
            var streamManager = CreateStreamManager(
                [
                    ($"{ExtensionPath}/sealed.json", "sealed", true),
                    ($"{ExtensionPath}/loose.json", "loose", false),
                ],
                passwordProtected: true
            );

            Assert.Multiple(() =>
            {
                Assert.That(
                    streamManager.GetExistingDataStreamNames(ExtensionPath),
                    Is.EqualTo(new[] { "sealed.json" })
                );
                Assert.That(
                    ReadStream(streamManager, $"{ExtensionPath}/sealed.json"),
                    Is.EqualTo("sealed")
                );
                Assert.That(streamManager.GetDataStream($"{ExtensionPath}/loose.json"), Is.Null);
            });
        }

        [Test]
        public void GetExistingDataStreamNames_NameGetDataStreamRefuses_IsNotListed()
        {
            var streamManager = CreateStreamManager(
                [($"{ExtensionPath}/mine.json", "mine"), ($"{ExtensionPath}/a..b.json", "x")]
            );

            Assert.That(
                streamManager.GetExistingDataStreamNames(ExtensionPath),
                Is.EqualTo(new[] { "mine.json" })
            );
        }

        [Test]
        public void GetExistingDataStreamNames_PathDoesNotExist_IsEmpty()
        {
            var streamManager = CreateStreamManager([("Settings.xml", "<ScriptureText />")]);

            Assert.That(streamManager.GetExistingDataStreamNames(ExtensionPath), Is.Empty);
        }

        [Test]
        public void GetExistingDataStreamNames_ArchiveMissing_Throws()
        {
            var fileManager = CreateFileManager(
                [("Settings.xml", "", false)],
                passwordProtected: false
            );
            var streamManager = new ResourceProjectStreamManager(
                fileManager,
                Path.Join(_folder.Path, "missing.p8z")
            );

            // An unreachable resource is a failure, not a resource with no data
            Assert.Throws<FileNotFoundException>(
                () => streamManager.GetExistingDataStreamNames(ExtensionPath)
            );
        }

        [Test]
        public void GetDataStream_Absent_IsNull()
        {
            var streamManager = CreateStreamManager([($"{ExtensionPath}/mine.json", "mine")]);

            Assert.That(streamManager.GetDataStream($"{ExtensionPath}/never.json"), Is.Null);
        }

        [Test]
        public void Writes_AreRefused()
        {
            var streamManager = CreateStreamManager([($"{ExtensionPath}/mine.json", "mine")]);

            Assert.Multiple(() =>
            {
                Assert.Throws<InvalidOperationException>(
                    () =>
                        streamManager.GetDataStream(
                            $"{ExtensionPath}/mine.json",
                            createIfNotExists: true
                        )
                );
                Assert.Throws<InvalidOperationException>(
                    () => streamManager.DeleteDataStream($"{ExtensionPath}/mine.json")
                );
            });
        }

        [Test]
        public void GetDataStream_NameWithDotDot_Throws()
        {
            var streamManager = CreateStreamManager([($"{ExtensionPath}/mine.json", "mine")]);

            // The same names the directory-backed manager refuses, so whether a name is valid does
            // not depend on what kind of project it is read from
            Assert.Throws<ArgumentException>(
                () => streamManager.GetDataStream($"{ExtensionPath}/../theirs.json")
            );
        }

        private ResourceProjectStreamManager CreateStreamManager(
            IEnumerable<(string Name, string Contents)> entries
        ) =>
            CreateStreamManager(
                entries.Select(entry => (entry.Name, entry.Contents, false)),
                passwordProtected: false
            );

        private ResourceProjectStreamManager CreateStreamManager(
            IEnumerable<(string Name, string Contents, bool Encrypted)> entries,
            bool passwordProtected
        )
        {
            var fileManager = CreateFileManager(entries, passwordProtected);
            return new ResourceProjectStreamManager(fileManager, ArchivePath);
        }

        private ProjectFileManager CreateFileManager(
            IEnumerable<(string Name, string Contents, bool Encrypted)> entries,
            bool passwordProtected
        )
        {
            using (ZipOutputStream archive = new(File.Create(ArchivePath)))
            {
                foreach (var (name, contents, encrypted) in entries)
                {
                    archive.Password = encrypted ? ArchivePassword : null;
                    archive.PutNextEntry(new ZipEntry(name));
                    var bytes = Encoding.UTF8.GetBytes(contents);
                    archive.Write(bytes, 0, bytes.Length);
                }
            }

            ResourceProjectFileManager fileManager =
                new("TST", passwordProtected ? new FixedPasswordProvider() : null, ArchivePath);
            _fileManagers.Add(fileManager);
            return fileManager;
        }

        private string ArchivePath => Path.Join(_folder.Path, "TST.p8z");

        private static string ReadStream(ResourceProjectStreamManager streamManager, string name)
        {
            using Stream stream =
                streamManager.GetDataStream(name)
                ?? throw new AssertionException($"'{name}' names no stream");
            using StreamReader reader = new(stream, Encoding.UTF8);
            return reader.ReadToEnd();
        }

        private sealed class FixedPasswordProvider : IZippedResourcePasswordProvider
        {
            public string GetPassword() => ArchivePassword;
        }
    }
}

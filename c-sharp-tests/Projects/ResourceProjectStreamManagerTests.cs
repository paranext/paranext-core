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
        public void EncryptedResource_UnencryptedEntry_IsNotListedAndThrowsOnRead()
        {
            // The file manager refuses an unencrypted entry in an encrypted resource as one it
            // cannot verify, so it is not part of the resource: not listed, and not read as empty
            var streamManager = CreateStreamManager(
                [
                    ($"{ExtensionPath}/sealed.json", "sealed", ArchivePassword),
                    ($"{ExtensionPath}/loose.json", "loose", null),
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
                Assert.Throws<InvalidDataException>(
                    () => streamManager.GetDataStream($"{ExtensionPath}/loose.json")
                );
            });
        }

        [Test]
        public void GetExistingDataStreamNames_EntryThatCannotBeDecrypted_LeavesTheArchiveUnlocked()
        {
            var streamManager = CreateStreamManager(
                [
                    ($"{ExtensionPath}/sealed.json", "sealed", ArchivePassword),
                    ($"{ExtensionPath}/foreign.json", "foreign", "another password"),
                ],
                passwordProtected: true
            );

            // Encrypted, so the file manager's rule admits it and it is listed, though it was
            // encrypted with a password that is not this resource's
            var streamNames = streamManager.GetExistingDataStreamNames(ExtensionPath);

            // A file manager read that fails to decrypt locks the archive and never unlocks it, so
            // a listing that opened entries would leave a read from any other thread waiting
            // forever
            var readElsewhere = Task.Run(
                () => ReadStream(streamManager, $"{ExtensionPath}/sealed.json")
            );
            Assert.That(
                readElsewhere.Wait(TimeSpan.FromSeconds(10)),
                Is.True,
                "A read from another thread was blocked"
            );
            Assert.Multiple(() =>
            {
                Assert.That(streamNames, Is.EqualTo(new[] { "foreign.json", "sealed.json" }));
                Assert.That(readElsewhere.Result, Is.EqualTo("sealed"));
            });
        }

        [Test]
        public void GetDataStream_EntryThatCannotBeDecrypted_ThrowsAndLeavesTheArchiveUnlocked()
        {
            var streamManager = CreateStreamManager(
                [
                    ($"{ExtensionPath}/sealed.json", "sealed", ArchivePassword),
                    ($"{ExtensionPath}/foreign.json", "foreign", "another password"),
                ],
                passwordProtected: true
            );

            // Read on a thread of its own, as a request would be: a lock the file manager leaked
            // there would block every other thread, which a read on this same thread would not show
            Exception? foreignFailure = null;
            Thread foreignRead =
                new(() =>
                {
                    try
                    {
                        streamManager.GetDataStream($"{ExtensionPath}/foreign.json");
                    }
                    catch (Exception e)
                    {
                        foreignFailure = e;
                    }
                });
            foreignRead.Start();
            Assert.That(
                foreignRead.Join(TimeSpan.FromSeconds(10)),
                Is.True,
                "The read never ended"
            );

            string? sealedContents = null;
            Thread sealedRead =
                new(
                    () => sealedContents = ReadStream(streamManager, $"{ExtensionPath}/sealed.json")
                )
                {
                    IsBackground = true,
                };
            sealedRead.Start();

            Assert.Multiple(() =>
            {
                // Throws rather than reading as empty, which a caller could not tell from an empty
                // or absent document
                Assert.That(foreignFailure, Is.InstanceOf<InvalidDataException>());
                Assert.That(
                    sealedRead.Join(TimeSpan.FromSeconds(10)),
                    Is.True,
                    "A read from another thread was blocked"
                );
                Assert.That(sealedContents, Is.EqualTo("sealed"));
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
                [("Settings.xml", "", null)],
                passwordProtected: false
            );
            var streamManager = new ResourceProjectStreamManager(
                fileManager,
                Path.Join(_folder.Path, "missing.p8z"),
                passwordProvider: null
            );

            // An unreachable resource is a failure, not a resource with no data
            Assert.Throws<FileNotFoundException>(
                () => streamManager.GetExistingDataStreamNames(ExtensionPath)
            );
        }

        [Test]
        public void GetExistingDataStreamNames_ArchiveNotLocated_Throws()
        {
            var fileManager = CreateFileManager(
                [($"{ExtensionPath}/mine.json", "mine", null)],
                passwordProtected: false
            );
            var streamManager = new ResourceProjectStreamManager(
                fileManager,
                archivePath: null,
                passwordProvider: null
            );

            // Reported as an unreachable resource, the same as a missing archive, rather than as a
            // resource with no data
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
                entries.Select(entry => (entry.Name, entry.Contents, (string?)null)),
                passwordProtected: false
            );

        private ResourceProjectStreamManager CreateStreamManager(
            IEnumerable<(string Name, string Contents, string? Password)> entries,
            bool passwordProtected
        )
        {
            var fileManager = CreateFileManager(entries, passwordProtected);
            // The same provider the file manager was given, as the PDP passes it
            return new ResourceProjectStreamManager(
                fileManager,
                ArchivePath,
                passwordProtected ? new FixedPasswordProvider() : null
            );
        }

        private ProjectFileManager CreateFileManager(
            IEnumerable<(string Name, string Contents, string? Password)> entries,
            bool passwordProtected
        )
        {
            using (ZipOutputStream archive = new(File.Create(ArchivePath)))
            {
                // Each entry is encrypted with its own password, or not at all when it has none
                foreach (var (name, contents, password) in entries)
                {
                    archive.Password = password;
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

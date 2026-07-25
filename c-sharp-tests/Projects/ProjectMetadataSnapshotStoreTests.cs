using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;
using SIL.TestUtilities;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Tests for <see cref="ProjectMetadataSnapshotStore"/>: the persisted project-metadata
    /// snapshot that lets project lists be served before the full ParatextData scan completes.
    /// Any invalid snapshot (missing, corrupt, or version-mismatched) must load as null so the
    /// caller falls back to today's full-scan-first flow.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ProjectMetadataSnapshotStoreTests
    {
        private const string APP_VERSION = "1.2.3";

        private TemporaryFolder _folder = null!;
        private ProjectMetadataSnapshotStore _store = null!;

        [SetUp]
        public void SetUp()
        {
            _folder = new TemporaryFolder(TestContext.CurrentContext.Test.ID);
            _store = new ProjectMetadataSnapshotStore(_folder.Path);
        }

        [TearDown]
        public void TearDown()
        {
            _folder.Dispose();
        }

        private string SnapshotFilePath =>
            Path.Combine(_folder.Path, ProjectMetadataSnapshotStore.SNAPSHOT_FILE_NAME);

        /// <summary>
        /// A folder-backed (unpublished) project entry with every display field populated.
        /// </summary>
        private static ProjectMetadataSnapshotEntry CreateFolderProjectEntry(
            string name = "PROJ",
            string id = "AAAA1111"
        )
        {
            return new ProjectMetadataSnapshotEntry(
                Name: name,
                HomeDirectory: $"/projects/{name}",
                FullPath: $"/projects/{name}",
                IsResource: false,
                IsXmlResource: false,
                IsJoined: false,
                FullName: $"{name} Full Name",
                Language: "German",
                LanguageTag: "de",
                IsEditable: true,
                Id: id
            );
        }

        /// <summary>
        /// A resource (.p8z) entry with the nullable display fields absent, exercising the
        /// null round-trip and the resource path/partition fields.
        /// </summary>
        private static ProjectMetadataSnapshotEntry CreateResourceEntry(
            string name = "RES",
            string id = "BBBB2222"
        )
        {
            return new ProjectMetadataSnapshotEntry(
                Name: name,
                HomeDirectory: "/projects/_Resources",
                FullPath: $"/projects/_Resources/{name}.p8z",
                IsResource: true,
                IsXmlResource: false,
                IsJoined: false,
                FullName: null,
                Language: null,
                LanguageTag: "en",
                IsEditable: false,
                Id: id
            );
        }

        [Test]
        public void WriteSnapshotThenTryLoad_RoundTripsAllFields()
        {
            List<ProjectMetadataSnapshotEntry> entries =
            [
                CreateFolderProjectEntry(),
                CreateResourceEntry(),
            ];

            _store.WriteSnapshot(entries, APP_VERSION);
            ProjectMetadataSnapshot? snapshot = _store.TryLoad(APP_VERSION);

            Assert.That(snapshot, Is.Not.Null);
            Assert.Multiple(() =>
            {
                Assert.That(
                    snapshot!.SchemaVersion,
                    Is.EqualTo(ProjectMetadataSnapshotStore.SCHEMA_VERSION)
                );
                Assert.That(snapshot.AppVersion, Is.EqualTo(APP_VERSION));
                Assert.That(
                    snapshot.WrittenAt,
                    Is.EqualTo(DateTimeOffset.UtcNow).Within(TimeSpan.FromMinutes(5))
                );
                // Records give field-by-field value equality, so this covers every display and
                // partition/path field, including the null FullName/Language on the resource entry.
                Assert.That(snapshot.Projects, Is.EqualTo(entries));
            });
        }

        [Test]
        public void TryLoad_MissingFile_ReturnsNull()
        {
            Assert.That(_store.TryLoad(APP_VERSION), Is.Null);
        }

        [Test]
        public void TryLoad_SchemaVersionMismatch_ReturnsNull()
        {
            var wrongSchema = new ProjectMetadataSnapshot(
                ProjectMetadataSnapshotStore.SCHEMA_VERSION + 1,
                APP_VERSION,
                DateTimeOffset.UtcNow,
                [CreateFolderProjectEntry()]
            );
            File.WriteAllText(SnapshotFilePath, JsonSerializer.Serialize(wrongSchema));

            Assert.That(_store.TryLoad(APP_VERSION), Is.Null);
        }

        [Test]
        public void TryLoad_AppVersionMismatch_ReturnsNull()
        {
            _store.WriteSnapshot([CreateFolderProjectEntry()], APP_VERSION);

            Assert.That(_store.TryLoad("9.9.9"), Is.Null);
        }

        [Test]
        public void TryLoad_TruncatedJson_ReturnsNull()
        {
            _store.WriteSnapshot([CreateFolderProjectEntry()], APP_VERSION);
            string contents = File.ReadAllText(SnapshotFilePath);
            File.WriteAllText(SnapshotFilePath, contents[..(contents.Length / 2)]);

            Assert.That(_store.TryLoad(APP_VERSION), Is.Null);
        }

        [Test]
        public void TryLoad_GarbageContents_ReturnsNull()
        {
            File.WriteAllText(SnapshotFilePath, "this is {{{ not json");

            Assert.That(_store.TryLoad(APP_VERSION), Is.Null);
        }

        [Test]
        public void WriteSnapshot_OverExistingFile_ReplacesContentsAndLeavesNoTempFile()
        {
            _store.WriteSnapshot([CreateFolderProjectEntry("OLD", "AAAA1111")], APP_VERSION);
            List<ProjectMetadataSnapshotEntry> newEntries =
            [
                CreateFolderProjectEntry("NEW1", "CCCC3333"),
                CreateResourceEntry("NEW2", "DDDD4444"),
            ];

            _store.WriteSnapshot(newEntries, APP_VERSION);

            ProjectMetadataSnapshot? snapshot = _store.TryLoad(APP_VERSION);
            Assert.That(snapshot, Is.Not.Null);
            Assert.Multiple(() =>
            {
                Assert.That(snapshot!.Projects, Is.EqualTo(newEntries));
                // The atomic write pattern (write .tmp, then move over the target) must not leave
                // its intermediate file behind.
                Assert.That(Directory.GetFiles(_folder.Path, "*.tmp"), Is.Empty);
            });
        }
    }
}

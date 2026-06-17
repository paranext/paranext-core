using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ProjectSettingsSnapshotReaderTests : PapiTestBase
    {
        private const string PdpName = "snapshotReaderTestProject";

        private DummyScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );
            await _provider.RegisterDataProviderAsync();
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [Test]
        [Description(
            "For settings that are present or computed (so GetProjectSetting does not fall back to "
                + "the GetDefault wire call), the snapshot value must equal exactly what "
                + "GetProjectSetting returns — this is the parity contract consumers rely on when "
                + "they stop calling getSetting per project."
        )]
        public void ReadSettings_MatchesGetProjectSetting_ForPresentAndComputedSettings()
        {
            // Ensure the raw Editable flag is present so both the reader and GetProjectSetting read
            // it (rather than GetProjectSetting hitting the GetDefault wire call), making isEditable
            // part of the parity contract too.
            _scrText.Settings.ParametersDictionary[ProjectSettingsNames.PT_IS_EDITABLE] = "T";

            string[] keys =
            [
                ProjectSettingsNames.PB_NAME,
                ProjectSettingsNames.PB_FULL_NAME,
                ProjectSettingsNames.PB_IS_PUBLISHED,
                ProjectSettingsNames.PB_LANGUAGE_TAG,
                ProjectSettingsNames.PB_IS_EDITABLE,
            ];

            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(_scrText, keys);

            foreach (var key in keys)
            {
                Assert.That(
                    snapshot[key],
                    Is.EqualTo(_provider.GetProjectSetting(key)),
                    $"snapshot value for {key} must match GetProjectSetting"
                );
            }
        }

        [Test]
        [Description(
            "platform.name is the folder Name (computed special case), not a raw Settings.Name read "
                + "or a default placeholder."
        )]
        public void ReadSettings_Name_IsFolderName()
        {
            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                _scrText,
                [ProjectSettingsNames.PB_NAME]
            );

            Assert.That(snapshot[ProjectSettingsNames.PB_NAME], Is.EqualTo(_scrText.Name));
        }

        [Test]
        [Description(
            "platform.isEditable mirrors GetProjectSetting: a non-resource project with raw Editable=T "
                + "reports true (reads the raw flag, not the version-gated Settings.Editable)."
        )]
        public void ReadSettings_IsEditable_NonResourceEditableProject_ReturnsTrue()
        {
            _scrText.Settings.ParametersDictionary[ProjectSettingsNames.PT_IS_EDITABLE] = "T";

            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                _scrText,
                [ProjectSettingsNames.PB_IS_EDITABLE]
            );

            Assert.That(snapshot[ProjectSettingsNames.PB_IS_EDITABLE], Is.True);
        }

        [Test]
        [Description(
            "When the raw Editable flag is absent the reader OMITS platform.isEditable rather than "
                + "guessing (it cannot reproduce GetProjectSetting's GetDefault without a wire call), "
                + "so the consumer falls back to getSetting — keeping the snapshot a faithful batch."
        )]
        public void ReadSettings_IsEditable_AbsentRawFlag_IsOmitted()
        {
            _scrText.Settings.ParametersDictionary.Remove(ProjectSettingsNames.PT_IS_EDITABLE);

            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                _scrText,
                [ProjectSettingsNames.PB_IS_EDITABLE]
            );

            Assert.That(snapshot, Does.Not.ContainKey(ProjectSettingsNames.PB_IS_EDITABLE));
        }

        [Test]
        [Description(
            "A resource project is published and is never an editable target — even when its raw "
                + "Editable flag is true (the NBV21 shape)."
        )]
        public void ReadSettings_ResourceProject_IsPublishedTrueAndIsEditableFalse()
        {
            using var resource = new ResourceDummyScrText();
            // Even with the raw Editable flag set to true (the NBV21 shape), the resource override wins.
            resource.Settings.ParametersDictionary[ProjectSettingsNames.PT_IS_EDITABLE] = "T";

            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                resource,
                [ProjectSettingsNames.PB_IS_PUBLISHED, ProjectSettingsNames.PB_IS_EDITABLE]
            );

            Assert.Multiple(() =>
            {
                Assert.That(
                    snapshot[ProjectSettingsNames.PB_IS_PUBLISHED],
                    Is.True,
                    "a resource project is published"
                );
                Assert.That(
                    snapshot[ProjectSettingsNames.PB_IS_EDITABLE],
                    Is.False,
                    "a resource is never an editable target regardless of its raw Editable flag"
                );
            });
        }

        [Test]
        [Description(
            "An unset raw setting comes back as the empty string — NOT the GetDefault placeholder. "
                + "This is the deliberate contract: the consumer applies the platform-owned "
                + "missing-value fallback, and the reader never makes a GetDefault wire call."
        )]
        public void ReadSettings_UnsetRawSetting_ReturnsEmptyString()
        {
            _scrText.Settings.ParametersDictionary.Remove(ProjectSettingsNames.PT_LANGUAGE);

            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                _scrText,
                [ProjectSettingsNames.PB_LANGUAGE]
            );

            Assert.That(snapshot[ProjectSettingsNames.PB_LANGUAGE], Is.EqualTo(string.Empty));
        }

        [Test]
        [Description(
            "Settings outside the cheap whitelist are omitted from the snapshot so the consumer "
                + "falls back to getSetting for them — the snapshot is best-effort by contract."
        )]
        public void ReadSettings_UnknownSetting_IsOmitted()
        {
            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                _scrText,
                ["platform.someSettingTheReaderDoesNotHandle"]
            );

            Assert.That(snapshot, Does.Not.ContainKey("platform.someSettingTheReaderDoesNotHandle"));
        }

        [Test]
        [Description(
            "The reader takes only a ScrText (no PapiClient), so it is structurally incapable of the "
                + "per-(project, key) GetDefault round-trip that would reintroduce server-side fan-out. "
                + "It produces values for a standalone ScrText that was never registered as a project."
        )]
        public void ReadSettings_RequiresNoPapiClientOrRegisteredProject()
        {
            // This ScrText is intentionally NOT added to ParatextProjects and no provider is
            // registered for it — the reader must still resolve settings purely from the ScrText.
            using var standalone = new DummyScrText();

            var snapshot = ProjectSettingsSnapshotReader.ReadSettings(
                standalone,
                [
                    ProjectSettingsNames.PB_NAME,
                    ProjectSettingsNames.PB_FULL_NAME,
                    ProjectSettingsNames.PB_IS_PUBLISHED,
                ]
            );

            Assert.Multiple(() =>
            {
                Assert.That(snapshot[ProjectSettingsNames.PB_NAME], Is.EqualTo(standalone.Name));
                Assert.That(snapshot[ProjectSettingsNames.PB_IS_PUBLISHED], Is.False);
                Assert.That(snapshot, Does.ContainKey(ProjectSettingsNames.PB_FULL_NAME));
            });
        }

        [Test]
        [Description(
            "ProjectMetadata.SettingsSnapshot must serialize over the PAPI wire with the camelCase "
                + "property name `settingsSnapshot` and with its dictionary keys (platform.* setting "
                + "names) preserved verbatim, or consumers would read settings from absent keys."
        )]
        public void SettingsSnapshot_SerializesWithCamelCasePropertyAndVerbatimKeys()
        {
            var options = SerializationOptions.CreateSerializationOptions();
            var metadata = new ProjectMetadata("abc123", ["platformScripture.USJ_Chapter"])
            {
                SettingsSnapshot = new Dictionary<string, object?>
                {
                    [ProjectSettingsNames.PB_FULL_NAME] = "Full Name",
                    [ProjectSettingsNames.PB_IS_PUBLISHED] = false,
                },
            };

            string json = JsonSerializer.Serialize(metadata, options);

            Assert.Multiple(() =>
            {
                Assert.That(json, Does.Contain("\"settingsSnapshot\""));
                Assert.That(json, Does.Contain("\"platform.fullName\":\"Full Name\""));
                Assert.That(json, Does.Contain("\"platform.isPublished\":false"));
            });
        }

        [Test]
        [Description(
            "When no settings are requested, SettingsSnapshot stays null and is omitted from the "
                + "wire so the metadata shape is unchanged for callers that do not opt in."
        )]
        public void SettingsSnapshot_OmittedFromWireWhenNull()
        {
            var options = SerializationOptions.CreateSerializationOptions();
            var metadata = new ProjectMetadata("abc123", ["platformScripture.USJ_Chapter"]);

            string json = JsonSerializer.Serialize(metadata, options);

            Assert.That(json, Does.Not.Contain("settingsSnapshot"));
        }

        // Mirrors the production resource override (ResourceScrText.IsResourceProject == true) so
        // the editability/published computation can be exercised without an on-disk zipped resource.
        // The implicit parameterless constructor chains to DummyScrText's, which creates unique
        // project details. Same override pattern as ManageBooks ProjectFilterServiceTests.
        private sealed class ResourceDummyScrText : DummyScrText
        {
            public override bool IsResourceProject => true;
        }
    }
}

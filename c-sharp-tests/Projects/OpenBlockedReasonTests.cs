using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.RegularExpressions;
using Paranext.DataProvider;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class OpenBlockedReasonTests : PapiTestBase
    {
        private ScrText _scrText = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
        }

        [TearDown]
        public void TearDown() => _scrText?.Dispose();

        [Test]
        public void GetOpenBlockedReason_StudyBibleAdditions_ReturnsTheSbaKey()
        {
            SetProjectType(_scrText, ProjectType.StudyBibleAdditions);
            Assert.That(
                _scrText.GetOpenBlockedReason(),
                Is.EqualTo(ScrTextExtensions.OPEN_BLOCKED_REASON_STUDY_BIBLE_ADDITIONS)
            );
        }

        [Test]
        public void GetOpenBlockedReason_MergedStudyBiblePublication_IsOpenable()
        {
            SetProjectType(_scrText, ProjectType.StudyBible);
            Assert.That(_scrText.GetOpenBlockedReason(), Is.Null);
        }

        [Test]
        public void GetOpenBlockedReason_Standard_IsOpenable()
        {
            SetProjectType(_scrText, ProjectType.Standard);
            Assert.That(_scrText.GetOpenBlockedReason(), Is.Null);
        }

        [Test]
        public void GetOpenBlockedReason_BackTranslation_IsOpenable()
        {
            SetProjectType(_scrText, ProjectType.BackTranslation);
            Assert.That(_scrText.GetOpenBlockedReason(), Is.Null);
        }

        [Test]
        public void GetProjectDetails_StudyBibleAdditions_CarriesReasonOnTheWire()
        {
            SetProjectType(_scrText, ProjectType.StudyBibleAdditions);
            var json = JsonSerializer.Serialize(
                _scrText.GetProjectDetails().Metadata,
                SerializationOptions.CreateSerializationOptions()
            );
            Assert.That(
                json,
                Does.Contain(
                    $"\"unsupportedReason\":\"{ScrTextExtensions.OPEN_BLOCKED_REASON_STUDY_BIBLE_ADDITIONS}\""
                )
            );
        }

        [Test]
        public void GetProjectDetails_Standard_LeavesReasonOffTheWire()
        {
            SetProjectType(_scrText, ProjectType.Standard);
            var json = JsonSerializer.Serialize(
                _scrText.GetProjectDetails().Metadata,
                SerializationOptions.CreateSerializationOptions()
            );
            Assert.That(json, Does.Not.Contain("unsupportedReason"));
        }

        [Test]
        public void ThrowIfOpenBlocked_StudyBibleAdditions_ThrowsWithReasonKeyAndSentinel()
        {
            SetProjectType(_scrText, ProjectType.StudyBibleAdditions);
            string projectId = _scrText.Guid.ToString().ToUpperInvariant();

            var exception = Assert.Throws<ProjectOpenBlockedException>(
                () => _scrText.ThrowIfOpenBlocked()
            );

            Assert.Multiple(() =>
            {
                Assert.That(exception!.ProjectId, Is.EqualTo(projectId));
                Assert.That(
                    exception.ReasonKey,
                    Is.EqualTo(ScrTextExtensions.OPEN_BLOCKED_REASON_STUDY_BIBLE_ADDITIONS)
                );
                Assert.That(exception.Message, Does.Contain(projectId));
                Assert.That(
                    PlatformErrorCodes.TryGetCode(exception, out string? code),
                    Is.True,
                    "services that map errors to PlatformError codes read it from Exception.Data"
                );
                Assert.That(code, Is.EqualTo(PlatformErrorCodes.FailedPrecondition));
            });
        }

        [Test]
        public void ThrowIfOpenBlocked_Message_EndsWithTheKeyThenTheSentinel()
        {
            // TypeScript finds the refusal by the sentinel and reads the localize key just before it.
            // These literals are held apart from the C# constants on purpose, so a reworded sentinel
            // or a moved key fails here rather than silently in the UI.
            SetProjectType(_scrText, ProjectType.StudyBibleAdditions);

            var exception = Assert.Throws<ProjectOpenBlockedException>(
                () => _scrText.ThrowIfOpenBlocked()
            );

            Assert.That(
                exception!.Message,
                Does.EndWith("%project_unsupported_studyBibleAdditions% (PROJECT_OPEN_BLOCKED)")
            );
            Match match = Regex.Match(exception.Message, @"(%[^%\s]+%)\s*\(PROJECT_OPEN_BLOCKED\)");
            Assert.That(match.Success, Is.True);
            Assert.That(
                match.Groups[1].Value,
                Is.EqualTo("%project_unsupported_studyBibleAdditions%")
            );
        }

        [Test]
        public void ThrowIfOpenBlocked_OpenableProjects_DoNotThrow()
        {
            foreach (
                Enum<ProjectType> type in new[]
                {
                    ProjectType.Standard,
                    ProjectType.StudyBible,
                    ProjectType.BackTranslation,
                }
            )
            {
                SetProjectType(_scrText, type);
                Assert.DoesNotThrow(() => _scrText.ThrowIfOpenBlocked(), $"type {type}");
            }
        }

        [Test]
        public void GetOpenBlockedReason_ProjectTypeStudyBibleAdditions_ReturnsTheSbaKey()
        {
            Assert.That(
                ScrTextExtensions.GetOpenBlockedReason(ProjectType.StudyBibleAdditions),
                Is.EqualTo(ScrTextExtensions.OPEN_BLOCKED_REASON_STUDY_BIBLE_ADDITIONS)
            );
        }

        [Test]
        public void GetOpenBlockedReason_OtherProjectTypes_AreOpenable()
        {
            Assert.Multiple(() =>
            {
                Assert.That(
                    ScrTextExtensions.GetOpenBlockedReason(ProjectType.StudyBible),
                    Is.Null
                );
                Assert.That(ScrTextExtensions.GetOpenBlockedReason(ProjectType.Standard), Is.Null);
                Assert.That(
                    ScrTextExtensions.GetOpenBlockedReason(ProjectType.BackTranslation),
                    Is.Null
                );
                Assert.That(
                    ScrTextExtensions.GetOpenBlockedReason(new Enum<ProjectType>("")),
                    Is.Null
                );
            });
        }
    }
}

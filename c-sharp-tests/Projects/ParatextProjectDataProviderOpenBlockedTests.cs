using System.Diagnostics.CodeAnalysis;
using NUnit.Framework.Constraints;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paranext.DataProvider.Services;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// The project data provider refuses the Scripture text of a project Platform.Bible can't
    /// open (a Study Bible Additions project), while its settings stay readable.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderOpenBlockedTests : PapiTestBase
    {
        private const string PdpName = "openBlockedProject";
        private const string GenesisUsfm = @"\id GEN \c 1 \p \v 1 In the beginning \v 2 formless";
        private const string ReplacementChapterUsfm = @"\c 1 \p \v 1 Replaced text";

        private ScrText _scrText = null!;
        private string _projectId = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            SendReceiveWriteLock.ResetForTests();

            _scrText = CreateDummyProject();
            _scrText.PutText(1, 0, false, GenesisUsfm, null);

            ProjectDetails projectDetails = CreateProjectDetails(_scrText);
            _projectId = projectDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(projectDetails, _scrText);

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                projectDetails,
                ParatextProjects
            );
            await _provider.RegisterDataProviderAsync();
        }

        [TearDown]
        public void TearDown()
        {
            SendReceiveWriteLock.ResetForTests();
            _scrText?.Dispose();
        }

        private static IResolveConstraint ThrowsOpenBlocked =>
            Throws
                .TypeOf<ProjectOpenBlockedException>()
                .With.Message.Contains(ProjectOpenBlockedException.Sentinel);

        private static VerseRef GenesisOneOne => new(1, 1, 1);

        private string CurrentGenesisUsfm() => _scrText.GetText(GenesisOneOne, false, true);

        private Dictionary<string, Func<VerseRef, string>> Getters =>
            new()
            {
                ["GetBookUsfm"] = _provider.GetBookUsfm,
                ["GetChapterUsfm"] = _provider.GetChapterUsfm,
                ["GetVerseUsfm"] = _provider.GetVerseUsfm,
                ["GetBookUsx"] = _provider.GetBookUsx,
                ["GetChapterUsx"] = _provider.GetChapterUsx,
                ["GetVerseUsx"] = _provider.GetVerseUsx,
                ["GetVersePlainText"] = _provider.GetVersePlainText,
            };

        /// <summary>
        /// Call while the project is still openable: the USX inputs are read up front.
        /// </summary>
        private Dictionary<string, Action> BuildSetters()
        {
            string bookUsx = _provider.GetBookUsx(GenesisOneOne);
            string chapterUsx = _provider.GetChapterUsx(GenesisOneOne);
            return new()
            {
                ["SetBookUsfm"] = () => _provider.SetBookUsfm(GenesisOneOne, GenesisUsfm),
                ["SetChapterUsfm"] = () =>
                    _provider.SetChapterUsfm(GenesisOneOne, ReplacementChapterUsfm),
                ["SetBookUsx"] = () => _provider.SetBookUsx(GenesisOneOne, bookUsx),
                ["SetChapterUsx"] = () => _provider.SetChapterUsx(GenesisOneOne, chapterUsx),
            };
        }

        [Test]
        public void TextGetters_StudyBibleAdditions_RefuseTheText()
        {
            MakeStudyBibleAdditions(_scrText);

            Assert.Multiple(() =>
            {
                foreach (var (name, getter) in Getters)
                    Assert.That(() => getter(GenesisOneOne), ThrowsOpenBlocked, name);
            });
        }

        [Test]
        public void TextGetters_Standard_ReturnTheText()
        {
            Assert.Multiple(() =>
            {
                foreach (var (name, getter) in Getters)
                    Assert.That(getter(GenesisOneOne), Does.Contain("In the beginning"), name);
            });
        }

        [Test]
        public void GetBookUsfm_StudyBibleAdditionsMissingBook_ReportsTheRefusalNotAMissingBook()
        {
            MakeStudyBibleAdditions(_scrText);

            Assert.That(() => _provider.GetBookUsfm(new VerseRef(2, 1, 1)), ThrowsOpenBlocked);
        }

        [Test]
        public void TextSetters_StudyBibleAdditions_RefuseAndLeaveTheTextUnchanged()
        {
            var setters = BuildSetters();
            string before = CurrentGenesisUsfm();
            MakeStudyBibleAdditions(_scrText);

            Assert.Multiple(() =>
            {
                foreach (var (name, setter) in setters)
                    Assert.That(() => setter(), ThrowsOpenBlocked, name);
            });
            // This additions project's base doesn't exist, so it reads as having no books. Read the
            // stored text back as a Standard project.
            SetProjectType(_scrText, ProjectType.Standard);
            Assert.That(CurrentGenesisUsfm(), Is.EqualTo(before));
        }

        [Test]
        public void TextSetters_StudyBibleAdditions_RefusalLeavesNoWriteScopeOpen()
        {
            var setters = BuildSetters();
            MakeStudyBibleAdditions(_scrText);

            Assert.Multiple(() =>
            {
                foreach (var (name, setter) in setters)
                {
                    Assert.That(() => setter(), ThrowsOpenBlocked, name);
                    Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0), name);
                }
            });
        }

        [Test]
        public void TextSetters_StudyBibleAdditionsWhileSyncing_ReportTheSyncFirst()
        {
            // The write scope is each setter's first statement, so the armed gate rejects the
            // write before the project's refusal is reached.
            var setters = BuildSetters();
            MakeStudyBibleAdditions(_scrText);
            SendReceiveWriteLock.SetSyncing([_projectId]);

            Assert.Multiple(() =>
            {
                foreach (var (name, setter) in setters)
                    Assert.That(
                        () => setter(),
                        Throws
                            .InstanceOf<InvalidOperationException>()
                            .With.Message.EndsWith(SendReceiveWriteLock.EditBlockedSentinel),
                        name
                    );
            });
        }

        [Test]
        public void SetChapterUsfm_Standard_WritesTheText()
        {
            Assert.That(_provider.SetChapterUsfm(GenesisOneOne, ReplacementChapterUsfm), Is.True);
            Assert.That(CurrentGenesisUsfm(), Does.Contain("Replaced text"));
        }

        [Test]
        public void GetProjectSetting_StudyBibleAdditions_StillReadsSettings()
        {
            MakeStudyBibleAdditions(_scrText);

            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_NAME),
                Is.EqualTo(_scrText.Name)
            );
        }
    }
}

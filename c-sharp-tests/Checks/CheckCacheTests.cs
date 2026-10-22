using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Checks;
using Paratext.Data.Checking;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class CheckCacheTests : PapiTestBase
{
    private const string ThrowingCheckId = "TestThrowingCheck";

    private DummyScrText _scrText = null!;
    private string _projectId = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        var details = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(details, _scrText);
        _projectId = details.Metadata.Id;
        _scrText.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\p\n\\v 1 In the beginning\n", null);
    }

    [TearDown]
    public void TestTearDownScrText()
    {
        _scrText?.Dispose();
    }

    [Test]
    public void InitializeThatThrows_ReportsTheFailureAndLeavesSettingsChangedSetForTheNextJob()
    {
        var throwing = new ThrowingCheck();
        var cache = new CheckCache([ThrowingCheckId], Client, (_, _) => throwing);
        var cachedCheck = cache.GetCheck(ThrowingCheckId, _projectId);
        // Creation succeeded; only the re-initialization after a settings change fails
        throwing.ThrowInInitialize = true;
        cachedCheck.SettingsChanged = true;
        var range = new InputRange(
            _projectId,
            new VerseRef(1, 1, 1),
            new VerseRef(
                1,
                InputRange.MAX_CHAPTER_OR_VERSE_NUM,
                InputRange.MAX_CHAPTER_OR_VERSE_NUM
            )
        );

        var failures = cache.RunChecksForProject(
            range,
            [ThrowingCheckId],
            ErrorMessageDenials.Get(_scrText)
        );

        Assert.That(failures, Has.Count.EqualTo(1));
        Assert.That(failures[0].CheckId, Is.EqualTo(ThrowingCheckId));
        Assert.That(failures[0].Exception.Message, Is.EqualTo(ThrowingCheck.InitializeMessage));
        Assert.That(cachedCheck.SettingsChanged, Is.True);
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Opening a project in the Scripture editor only reads it. Nothing may be written to the project
/// folder, and nothing may be left changed in memory for the project's next save to write. Runs
/// against an on-disk copy of the bundled sample project.
/// </summary>
/// <remarks>
/// <see cref="OpenTheProjectAsync"/> makes the backend calls the running app makes when the editor
/// opens a project, in Power mode's Standard view and in Simple mode, as recorded from the backend
/// during the <c>no-unasked-edits</c> e2e runs. Both modes call the same methods except that Simple
/// mode also reads the current user's model texts and referenced projects, so this makes the union
/// of the two. A new backend call the editor makes on open belongs here.
/// </remarks>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ProjectOpenWritesNothingTests
{
    /// <summary>The project settings the editor and its toolbar read when a project opens.</summary>
    private static readonly string[] SettingsReadOnOpen =
    [
        "platform.isEditable",
        "platform.isPublished",
        "platform.name",
        "platform.textDirection",
        "platformScripture.booksPresent",
        "platformScripture.modelTexts",
        "platformScripture.referencedProjectsAndResources",
        "platformScripture.sharedLayoutDefaultTab",
        "platformScripture.structureProtected",
        "platformScripture.copyrightNotice",
        "platformScripture.allowInvisibleCharacters",
        "platformScripture.chapterVerseSeparator",
        "platformScripture.verseRangeSeparator",
        "platformScripture.defaultFootnoteCaller",
        "platformScripture.defaultCrossRefCaller",
        "platformScripture.footnoteCallers",
        "platformScripture.crossRefCallers",
    ];

    /// <summary>
    /// Genesis 1 is where a new editor starts; the e2e runs then go to Jonah 1 and Matthew 3.
    /// </summary>
    private static readonly VerseRef[] ChaptersShown = [new(1, 1, 1), new(32, 1, 1), new(40, 3, 1)];

    private static async Task OpenTheProjectAsync(SampleProjectInTempDir sample)
    {
        // A setting the project does not hold reads the platform's default for it; which value
        // that is does not matter to what is written
        await sample.Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.getDefault",
            new Func<string, object?>(_ => "")
        );

        // The backend starts both Paratext factories; the project pickers poll both for projects
        var factory = new ParatextProjectDataProviderFactory(sample.Client, sample.LocalProjects);
        await factory.InitializeAsync();
        var publishedFactory = new ParatextPublishedProjectDataProviderFactory(
            sample.Client,
            sample.LocalProjects
        );
        await publishedFactory.InitializeAsync();
        _ = sample.LocalProjects.GetAvailableUnpublishedProjectDetails().ToList();
        _ = sample.LocalProjects.GetAvailablePublishedProjectDetails().ToList();

        factory.GetProjectDataProviderID(sample.ProjectId);
        ParatextProjectDataProvider pdp =
            factory.GetExistingProjectDataProvider(sample.ProjectId)
            ?? throw new InvalidOperationException("The factory made no data provider");

        foreach (string setting in SettingsReadOnOpen)
            _ = pdp.GetProjectSetting(setting);
        _ = pdp.GetUserModelTexts();
        _ = pdp.GetUserReferencedProjectsAndResources();
        _ = pdp.GetUserStructureProtected();
        _ = pdp.CanUserEditScripture();
        _ = pdp.GetCanUserEditScripture();
        _ = pdp.CanUserWriteProjectTextConnectionSettings();

        // Comments: the editor asks who can be assigned one and whether the user may add one; the
        // Comments list reads the threads
        _ = pdp.FindAssignableUsers();
        _ = pdp.CanUserCreateComments();
        _ = pdp.GetCommentThreads(new CommentThreadSelector());

        foreach (VerseRef chapter in ChaptersShown)
        {
            _ = pdp.GetFinalVerseNumbersInBook(chapter.BookNum);
            _ = pdp.GetStyleInfo(chapter.BookNum);
            _ = pdp.GetBookCopyLimits(chapter);
            _ = pdp.GetChapterUsx(chapter);
        }
        // The positive control: the reads above reached the project's text
        Assert.That(pdp.GetChapterUsx(ChaptersShown[1]), Does.Contain("Joppa"));

        // Other subscribers to the project's text read these whenever it updates
        _ = pdp.GetBookUsx(ChaptersShown[0]);
        _ = pdp.GetVerseUsx(ChaptersShown[0]);
    }

    [Test]
    public async Task OpeningTheProject_WritesNothingToIt()
    {
        using var sample = SampleProjectInTempDir.Install();
        var installed = sample.SnapshotProjectFolder();

        await OpenTheProjectAsync(sample);

        SampleProjectInTempDir.AssertSameFiles(
            installed,
            sample.SnapshotProjectFolder(),
            "after opening the project"
        );
    }

    [Test]
    public async Task OpeningTheProject_LeavesNothingForItsNextSaveToWrite()
    {
        var untouchedSave = SampleProjectInTempDir.SnapshotAfterSavingAnUntouchedCopy();
        using var sample = SampleProjectInTempDir.Install();

        await OpenTheProjectAsync(sample);
        // Stands in for whatever the user saves next, such as a project setting they change
        SampleProjectInTempDir.Project.Save();

        SampleProjectInTempDir.AssertSameFiles(
            untouchedSave,
            sample.SnapshotProjectFolder(),
            "the next save after opening, against the same save of a copy never opened"
        );
    }
}

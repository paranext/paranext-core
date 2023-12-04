using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects;

[ExcludeFromCodeCoverage]
internal class ParatextProjectStorageInterpreterTests : PapiTestBase
{
    private ParatextProjectStorageInterpreter _interpreter = null!; // Will be non-null when the test runs

    public override void TestSetup()
    {
        base.TestSetup();

        _interpreter = new ParatextProjectStorageInterpreter(Client, ParatextProjects);
    }

    #region GetAllProjects tests
    [Test]
    public async Task GetAllProjects_NoProjects_ReturnsEmptyList()
    {
        await _interpreter.RegisterDataProvider();

        ResponseToRequest response = _interpreter.GetAllProjects();
        VerifyResponse(response, null, "[]");
    }

    [Test]
    public async Task GetAllProjects_WithProjects_ReturnsList()
    {
        await _interpreter.RegisterDataProvider();

        ParatextProjects.FakeAddProject(
            CreateProjectDetails("abcd", "Monkey Soup", "BackTranslation")
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails("b4da", "George", "Transliteration"));

        ResponseToRequest response = _interpreter.GetAllProjects();
        Assert.Multiple(() =>
        {
            Assert.That(response.ErrorMessage, Is.Null);
            Assert.That(response.Success, Is.True);
            string? contents = response.Contents as string;

            // The order of items seems "random", so allow either order
            Assert.That(
                contents,
                Is.EqualTo(
                    "[{\"id\":\"ABCD\",\"name\":\"Monkey Soup\",\"storageType\":\"ParatextFolders\",\"projectType\":\"BackTranslation\"},"
                        + "{\"id\":\"B4DA\",\"name\":\"George\",\"storageType\":\"ParatextFolders\",\"projectType\":\"Transliteration\"}]"
                )
                    .Or.EqualTo(
                        "[{\"id\":\"B4DA\",\"name\":\"George\",\"storageType\":\"ParatextFolders\",\"projectType\":\"Transliteration\"},"
                            + "{\"id\":\"ABCD\",\"name\":\"Monkey Soup\",\"storageType\":\"ParatextFolders\",\"projectType\":\"BackTranslation\"}]"
                    )
            );
        });
    }
    #endregion

    #region GetProjectSettings tests
    [Test]
    public async Task GetProjectSettings_NullProjectId_ReturnsError()
    {
        await _interpreter.RegisterDataProvider();

        ResponseToRequest response = _interpreter.GetProjectSettings(new ProjectDataScope());
        VerifyResponse(response, "Must provide a project ID", null);
    }

    [Test]
    public async Task GetProjectSettings_InvalidProjectId_ReturnsError()
    {
        await _interpreter.RegisterDataProvider();
        CreateDummyProject();

        ResponseToRequest response = _interpreter.GetProjectSettings(
            new ProjectDataScope { ProjectID = "nothing" }
        );
        VerifyResponse(response, "Project with ID 'nothing' was not found", null);
    }

    [Test]
    public async Task GetProjectSettings_UnknownProjectId_ReturnsError()
    {
        await _interpreter.RegisterDataProvider();
        CreateDummyProject();

        ResponseToRequest response = _interpreter.GetProjectSettings(
            new ProjectDataScope { ProjectID = "1748ac19" }
        );
        VerifyResponse(response, "Project with ID '1748ac19' was not found", null);
    }

    [Test]
    public async Task GetProjectSettings_ReturnsSettings()
    {
        await _interpreter.RegisterDataProvider();
        var scrText = CreateDummyProject();

        ResponseToRequest response = _interpreter.GetProjectSettings(
            new ProjectDataScope { ProjectID = scrText.Guid.ToString() }
        );
        Assert.Multiple(() =>
        {
            Assert.That(response.Success, Is.True);
            Assert.That(response.ErrorMessage, Is.Null);

            // TODO: Come up with a good format for the settings and make this test better
            Assert.That(response.Contents, Is.Not.Null.Or.Empty);
        });
    }
    #endregion

    #region GetExtensionData tests
    [TestCase(ProjectIdType.Exclude, "myExtension", "myFile.txt", "Must provide a project ID")]
    [TestCase(ProjectIdType.Empty, "myExtension", "myFile.txt", "Must provide a project ID")]
    [TestCase(ProjectIdType.Invalid, "myExtension", "myFile.txt", "Unknown project ID: asdf")]
    [TestCase(ProjectIdType.Missing, "myExtension", "myFile.txt", "Unknown project ID: 1854ab")]
    [TestCase(ProjectIdType.Include, null, "myFile.txt", "Must provide an extension name")]
    [TestCase(ProjectIdType.Include, "", "myFile.txt", "Must provide an extension name")]
    [TestCase(ProjectIdType.Include, "myExtension", null, "Must provide a data qualifier")]
    [TestCase(ProjectIdType.Include, "myExtension", "", "Must provide a data qualifier")]
    public async Task GetExtensionData_InvalidParameters_ReturnsError(
        ProjectIdType projectIdType,
        string? extensionName,
        string? dataQualifier,
        string? expectedError
    )
    {
        await _interpreter.RegisterDataProvider();
        var scrText = CreateDummyProject();

        ResponseToRequest response = _interpreter.GetExtensionData(
            new ProjectDataScope
            {
                ProjectID = GetProjectId(projectIdType, scrText),
                ExtensionName = extensionName,
                DataQualifier = dataQualifier
            }
        );

        VerifyResponse(response, expectedError, null);
    }
    #endregion

    #region SetExtensionData tests
    [TestCase(ProjectIdType.Exclude, "myExtension", "myFile.txt", "Must provide a project ID")]
    [TestCase(ProjectIdType.Empty, "myExtension", "myFile.txt", "Must provide a project ID")]
    [TestCase(ProjectIdType.Invalid, "myExtension", "myFile.txt", "Unknown project ID: asdf")]
    [TestCase(ProjectIdType.Missing, "myExtension", "myFile.txt", "Unknown project ID: 1854ab")]
    [TestCase(ProjectIdType.Include, null, "myFile.txt", "Must provide an extension name")]
    [TestCase(ProjectIdType.Include, "", "myFile.txt", "Must provide an extension name")]
    [TestCase(ProjectIdType.Include, "myExtension", null, "Must provide a data qualifier")]
    [TestCase(ProjectIdType.Include, "myExtension", "", "Must provide a data qualifier")]
    public async Task SetExtensionData_InvalidParameters_ReturnsError(
        ProjectIdType projectIdType,
        string? extensionName,
        string? dataQualifier,
        string? expectedError
    )
    {
        await _interpreter.RegisterDataProvider();
        var scrText = CreateDummyProject();

        ResponseToRequest response = _interpreter.SetExtensionData(
            new ProjectDataScope
            {
                ProjectID = GetProjectId(projectIdType, scrText),
                ExtensionName = extensionName,
                DataQualifier = dataQualifier
            },
            "Random data"
        );

        VerifyResponse(response, expectedError, null);
    }
    #endregion

    #region GetProjectData tests
    [TestCase(
        ProjectIdType.Exclude,
        "VerseUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a project ID"
    )]
    [TestCase(
        ProjectIdType.Empty,
        "VerseUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a project ID"
    )]
    [TestCase(
        ProjectIdType.Invalid,
        "VerseUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Project with ID 'asdf' was not found"
    )]
    [TestCase(
        ProjectIdType.Missing,
        "VerseUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Project with ID '1854ab' was not found"
    )]
    [TestCase(
        ProjectIdType.Include,
        null,
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a data type"
    )]
    [TestCase(
        ProjectIdType.Include,
        "",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a data type"
    )]
    [TestCase(
        ProjectIdType.Include,
        "nothing",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Unknown data type: nothing"
    )]
    [TestCase(ProjectIdType.Include, "VerseUSFM", null, "Must provide a data qualifier")]
    [TestCase(ProjectIdType.Include, "VerseUSFM", "", "Must provide a data qualifier")]
    [TestCase(
        ProjectIdType.Include,
        "VerseUSFM",
        "bogus",
        "Invalid VerseRef (bogus): Unexpected character encountered while parsing value: b. Path '', line 0, position 0."
    )]
    public async Task GetProjectData_InvalidParameters_ReturnsError(
        ProjectIdType projectIdType,
        string? dataType,
        string? dataQualifier,
        string? expectedError
    )
    {
        await _interpreter.RegisterDataProvider();
        var scrText = CreateDummyProject();

        ResponseToRequest response = _interpreter.GetProjectData(
            new ProjectDataScope
            {
                ProjectID = GetProjectId(projectIdType, scrText),
                DataType = dataType,
                DataQualifier = dataQualifier
            }
        );

        VerifyResponse(response, expectedError, null);
    }
    #endregion

    #region SetProjectData tests
    [TestCase(
        ProjectIdType.Exclude,
        "ChapterUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a project ID"
    )]
    [TestCase(
        ProjectIdType.Empty,
        "ChapterUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a project ID"
    )]
    [TestCase(
        ProjectIdType.Invalid,
        "ChapterUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Project with ID 'asdf' was not found"
    )]
    [TestCase(
        ProjectIdType.Missing,
        "ChapterUSFM",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Project with ID '1854ab' was not found"
    )]
    [TestCase(
        ProjectIdType.Include,
        null,
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a data type"
    )]
    [TestCase(
        ProjectIdType.Include,
        "",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Must provide a data type"
    )]
    [TestCase(
        ProjectIdType.Include,
        "nothing",
        "{ \"versification\":\"English\", \"_bookNum\":1, \"_chapterNum\":2, \"_verseNum\":0 }",
        "Unknown data type: nothing"
    )]
    [TestCase(ProjectIdType.Include, "ChapterUSFM", null, "Must provide a data qualifier")]
    [TestCase(ProjectIdType.Include, "ChapterUSFM", "", "Must provide a data qualifier")]
    [TestCase(
        ProjectIdType.Include,
        "ChapterUSFM",
        "bogus",
        "Invalid VerseRef (bogus): Unexpected character encountered while parsing value: b. Path '', line 0, position 0."
    )]
    public async Task SetProjectData_InvalidParameters_ReturnsError(
        ProjectIdType projectIdType,
        string? dataType,
        string? dataQualifier,
        string? expectedError
    )
    {
        await _interpreter.RegisterDataProvider();
        var scrText = CreateDummyProject();

        ResponseToRequest response = _interpreter.SetProjectData(
            new ProjectDataScope
            {
                ProjectID = GetProjectId(projectIdType, scrText),
                DataType = dataType,
                DataQualifier = dataQualifier
            },
            "Random data"
        );

        VerifyResponse(response, expectedError, null);
    }
    #endregion

    #region CreateProject tests
    [TestCase(ProjectIdType.Exclude, "Project Name", "Must provide a project ID")]
    [TestCase(ProjectIdType.Empty, "Project Name", "Must provide a project ID")]
    [TestCase(ProjectIdType.Include, null, "Must provide a project name")]
    [TestCase(ProjectIdType.Include, "", "Must provide a project name")]
    public async Task CreateProject_InvalidParameters_ReturnsError(
        ProjectIdType projectIdType,
        string projectName,
        string expectedError
    )
    {
        await _interpreter.RegisterDataProvider();
        var scrText = CreateDummyProject();

        ResponseToRequest response = _interpreter.CreateProject(
            new ProjectDataScope
            {
                ProjectID = GetProjectId(projectIdType, scrText),
                ProjectName = projectName
            }
        );

        VerifyResponse(response, expectedError, null);
    }
    #endregion

    #region Helper methods
    private static void VerifyResponse(
        ResponseToRequest response,
        string? expectedErrorMessage,
        string? expectedContents
    )
    {
        Assert.Multiple(() =>
        {
            Assert.That(response.ErrorMessage, Is.EqualTo(expectedErrorMessage));
            Assert.That(response.Success, Is.EqualTo(expectedErrorMessage == null));
            string? contents = response.Contents as string;
            Assert.That(contents, Is.EqualTo(expectedContents));
        });
    }

    private static string? GetProjectId(ProjectIdType projectIdType, ScrText scrText)
    {
        return projectIdType switch
        {
            ProjectIdType.Include => scrText.Guid.ToString(),
            ProjectIdType.Exclude => null,
            ProjectIdType.Empty => "",
            ProjectIdType.Missing => "1854ab",
            ProjectIdType.Invalid => "asdf",
            _ => throw new ArgumentException("Unknown project ID type: " + projectIdType)
        };
    }
    #endregion

    #region ProjectIdType enum
    public enum ProjectIdType
    {
        Include,
        Exclude,
        Empty,
        Missing,
        Invalid
    }
    #endregion
}

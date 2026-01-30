using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectCreation type definitions (CAP-021).
/// Verifies that all types compile correctly, serialize/deserialize via JSON,
/// and that enums serialize as strings per PT10 convention.
/// </summary>
[TestFixture]
public class TypeSerializationTests
{
    private JsonSerializerOptions _serializationOptions = null!;

    [SetUp]
    public void Setup()
    {
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
    }

    #region Enum Serialization Tests

    /// <summary>
    /// Verifies ProjectType enum serializes as string (not integer).
    /// Serialization contract per INV-001.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-001")]
    [Property("BehaviorId", "BHV-100")]
    [Property("InvariantId", "INV-001")]
    [TestCase(ProjectType.Standard, "\"Standard\"")]
    [TestCase(ProjectType.BackTranslation, "\"BackTranslation\"")]
    [TestCase(ProjectType.Daughter, "\"Daughter\"")]
    [TestCase(ProjectType.Auxiliary, "\"Auxiliary\"")]
    [TestCase(ProjectType.StudyBibleAdditions, "\"StudyBibleAdditions\"")]
    [TestCase(ProjectType.TransliterationManual, "\"TransliterationManual\"")]
    [TestCase(ProjectType.TransliterationWithEncoder, "\"TransliterationWithEncoder\"")]
    [TestCase(ProjectType.ConsultantNotes, "\"ConsultantNotes\"")]
    [TestCase(ProjectType.Resource, "\"Resource\"")]
    public void ProjectType_SerializesAsString(ProjectType value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-002")]
    [Property("BehaviorId", "BHV-100")]
    [Property("InvariantId", "INV-001")]
    [TestCase("\"Standard\"", ProjectType.Standard)]
    [TestCase("\"BackTranslation\"", ProjectType.BackTranslation)]
    [TestCase("\"Daughter\"", ProjectType.Daughter)]
    public void ProjectType_DeserializesFromString(string json, ProjectType expected)
    {
        var result = JsonSerializer.Deserialize<ProjectType>(json, _serializationOptions);
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-003")]
    [Property("BehaviorId", "BHV-113")]
    [TestCase(InterlinearTaskType.Glossing, "\"Glossing\"")]
    [TestCase(InterlinearTaskType.GlossingWithoutModel, "\"GlossingWithoutModel\"")]
    [TestCase(InterlinearTaskType.BackTranslation, "\"BackTranslation\"")]
    [TestCase(InterlinearTaskType.Adaptation, "\"Adaptation\"")]
    public void InterlinearTaskType_SerializesAsString(InterlinearTaskType value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-004")]
    [Property("BehaviorId", "BHV-113")]
    [TestCase("\"Glossing\"", InterlinearTaskType.Glossing)]
    [TestCase("\"Adaptation\"", InterlinearTaskType.Adaptation)]
    public void InterlinearTaskType_DeserializesFromString(string json, InterlinearTaskType expected)
    {
        var result = JsonSerializer.Deserialize<InterlinearTaskType>(json, _serializationOptions);
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-005")]
    [Property("BehaviorId", "BHV-206")]
    [TestCase(RegistrationMessageType.NoTypeSelected, "\"NoTypeSelected\"")]
    [TestCase(RegistrationMessageType.InheritsFromBase, "\"InheritsFromBase\"")]
    [TestCase(RegistrationMessageType.Registered, "\"Registered\"")]
    [TestCase(RegistrationMessageType.CanRegister, "\"CanRegister\"")]
    [TestCase(RegistrationMessageType.Unregistered, "\"Unregistered\"")]
    public void RegistrationMessageType_SerializesAsString(RegistrationMessageType value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-006")]
    [Property("BehaviorId", "BHV-254")]
    [TestCase(FileNameForm.Form41MAT, "\"Form41MAT\"")]
    [TestCase(FileNameForm.FormMAT, "\"FormMAT\"")]
    [TestCase(FileNameForm.Form41, "\"Form41\"")]
    public void FileNameForm_SerializesAsString(FileNameForm value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-007")]
    [Property("BehaviorId", "BHV-254")]
    [TestCase(FileComparisonState.DestDoesNotExist, "\"DestDoesNotExist\"")]
    [TestCase(FileComparisonState.SourceIsNewer, "\"SourceIsNewer\"")]
    [TestCase(FileComparisonState.FilesAreSame, "\"FilesAreSame\"")]
    public void FileComparisonState_SerializesAsString(FileComparisonState value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-008")]
    [Property("BehaviorId", "BHV-100")]
    [TestCase(NormalizationForm.NFC, "\"NFC\"")]
    [TestCase(NormalizationForm.NFD, "\"NFD\"")]
    [TestCase(NormalizationForm.None, "\"None\"")]
    public void NormalizationForm_SerializesAsString(NormalizationForm value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-009")]
    [Property("BehaviorId", "BHV-100")]
    [TestCase(UsfmVersion.Version2, "\"Version2\"")]
    [TestCase(UsfmVersion.Version3, "\"Version3\"")]
    public void UsfmVersion_SerializesAsString(UsfmVersion value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-010")]
    [Property("BehaviorId", "BHV-100")]
    [TestCase(ProjectCreationErrorCode.InvalidShortName, "\"InvalidShortName\"")]
    [TestCase(ProjectCreationErrorCode.ShortNameExists, "\"ShortNameExists\"")]
    [TestCase(ProjectCreationErrorCode.MissingBaseProject, "\"MissingBaseProject\"")]
    public void ProjectCreationErrorCode_SerializesAsString(ProjectCreationErrorCode value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-011")]
    [Property("BehaviorId", "BHV-113")]
    [TestCase(InterlinearErrorCode.InvalidTaskType, "\"InvalidTaskType\"")]
    [TestCase(InterlinearErrorCode.MissingModelText, "\"MissingModelText\"")]
    [TestCase(InterlinearErrorCode.SetupConflict, "\"SetupConflict\"")]
    public void InterlinearErrorCode_SerializesAsString(InterlinearErrorCode value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-012")]
    [Property("BehaviorId", "BHV-206")]
    [TestCase(EmailValidationResult.Valid, "\"Valid\"")]
    [TestCase(EmailValidationResult.Empty, "\"Empty\"")]
    [TestCase(EmailValidationResult.InvalidFormat, "\"InvalidFormat\"")]
    public void EmailValidationResult_SerializesAsString(EmailValidationResult value, string expectedJson)
    {
        var json = JsonSerializer.Serialize(value, _serializationOptions);
        Assert.That(json, Is.EqualTo(expectedJson));
    }

    #endregion

    #region Request Type Serialization Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-020")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectCreationRequest_RoundTrip_PreservesData()
    {
        var original = new ProjectCreationRequest
        {
            ShortName = "TEST",
            FullName = "Test Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Copyright = "Copyright 2026",
            Encoding = 65001,
            NormalizationForm = NormalizationForm.NFC,
            Versification = "English",
            BooksPresent = new List<string> { "GEN", "EXO", "MAT" },
            FileNamePrePart = "pre",
            FileNameForm = FileNameForm.Form41MAT,
            FileNamePostPart = "post",
            UsfmVersion = UsfmVersion.Version3,
            Editable = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectCreationRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ShortName, Is.EqualTo("TEST"));
        Assert.That(result.FullName, Is.EqualTo("Test Project"));
        Assert.That(result.LanguageId, Is.EqualTo("en:Latn::"));
        Assert.That(result.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(result.Copyright, Is.EqualTo("Copyright 2026"));
        Assert.That(result.Encoding, Is.EqualTo(65001));
        Assert.That(result.NormalizationForm, Is.EqualTo(NormalizationForm.NFC));
        Assert.That(result.Versification, Is.EqualTo("English"));
        Assert.That(result.BooksPresent, Is.EquivalentTo(new[] { "GEN", "EXO", "MAT" }));
        Assert.That(result.FileNameForm, Is.EqualTo(FileNameForm.Form41MAT));
        Assert.That(result.UsfmVersion, Is.EqualTo(UsfmVersion.Version3));
        Assert.That(result.Editable, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-021")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectCreationRequest_DefaultValues_AppliedCorrectly()
    {
        // JSON with only required fields
        var json = """
        {
            "shortName": "MIN",
            "fullName": "Minimal Project",
            "languageId": "es:Latn::",
            "projectType": "Standard"
        }
        """;

        var result = JsonSerializer.Deserialize<ProjectCreationRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Encoding, Is.EqualTo(65001), "Default encoding should be UTF-8 (65001)");
        Assert.That(result.NormalizationForm, Is.EqualTo(NormalizationForm.NFC), "Default normalization should be NFC");
        Assert.That(result.FileNameForm, Is.EqualTo(FileNameForm.Form41MAT), "Default file name form should be Form41MAT");
        Assert.That(result.UsfmVersion, Is.EqualTo(UsfmVersion.Version3), "Default USFM version should be Version3");
        Assert.That(result.Editable, Is.True, "Default editable should be true");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-022")]
    [Property("BehaviorId", "BHV-106")]
    public void ProjectCreationRequest_DerivedProject_RoundTrip()
    {
        var original = new ProjectCreationRequest
        {
            ShortName = "BTProj",
            FullName = "Back Translation Project",
            LanguageId = "fr:Latn::",
            ProjectType = ProjectType.BackTranslation,
            BaseProjectName = "SourceProject",
            BaseProjectGuid = "0123456789abcdef0123456789abcdef01234567"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectCreationRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ProjectType, Is.EqualTo(ProjectType.BackTranslation));
        Assert.That(result.BaseProjectName, Is.EqualTo("SourceProject"));
        Assert.That(result.BaseProjectGuid, Is.EqualTo("0123456789abcdef0123456789abcdef01234567"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-023")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectNameValidationRequest_RoundTrip_PreservesData()
    {
        var original = new ProjectNameValidationRequest
        {
            FullName = "Test Full Name",
            ShortName = "TFN",
            Mode = "create"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectNameValidationRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.FullName, Is.EqualTo("Test Full Name"));
        Assert.That(result.ShortName, Is.EqualTo("TFN"));
        Assert.That(result.Mode, Is.EqualTo("create"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-024")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectNameValidationRequest_EditMode_RoundTrip()
    {
        var original = new ProjectNameValidationRequest
        {
            FullName = "Edited Name",
            ShortName = "EDN",
            Mode = "edit",
            OriginalShortName = "OLD"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectNameValidationRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Mode, Is.EqualTo("edit"));
        Assert.That(result.OriginalShortName, Is.EqualTo("OLD"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-025")]
    [Property("BehaviorId", "BHV-100")]
    public void ShortNameGenerationRequest_RoundTrip_PreservesData()
    {
        var original = new ShortNameGenerationRequest
        {
            FullName = "New Testament Greek 2024"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ShortNameGenerationRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.FullName, Is.EqualTo("New Testament Greek 2024"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-026")]
    [Property("BehaviorId", "BHV-254")]
    public void FileNamingPatternRequest_RoundTrip_PreservesData()
    {
        var original = new FileNamingPatternRequest
        {
            Prefix = "Pre",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "Post",
            Extension = ".SFM"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<FileNamingPatternRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Prefix, Is.EqualTo("Pre"));
        Assert.That(result.Scheme, Is.EqualTo(FileNameForm.Form41MAT));
        Assert.That(result.Suffix, Is.EqualTo("Post"));
        Assert.That(result.Extension, Is.EqualTo(".SFM"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-027")]
    [Property("BehaviorId", "BHV-254")]
    public void FileNamingPatternRequest_DefaultExtension_AppliedCorrectly()
    {
        var json = """
        {
            "prefix": "X",
            "scheme": "Form41MAT",
            "suffix": "Y"
        }
        """;

        var result = JsonSerializer.Deserialize<FileNamingPatternRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Extension, Is.EqualTo(".SFM"), "Default extension should be .SFM");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-028")]
    [Property("BehaviorId", "BHV-113")]
    public void InterlinearSetupRequest_RoundTrip_PreservesData()
    {
        var original = new InterlinearSetupRequest
        {
            TaskType = InterlinearTaskType.Glossing,
            SourceProjectName = "SourceProj",
            SourceProjectGuid = "abcd1234abcd1234abcd1234abcd1234abcd1234",
            ModelTextName = "ModelText",
            ModelTextGuid = "1234abcd1234abcd1234abcd1234abcd1234abcd",
            DestinationProjectName = "DestProj",
            DestinationProjectGuid = "5678efab5678efab5678efab5678efab5678efab",
            RelatedLanguages = true,
            LanguageId = "grc:Grek::",
            OutputGlosses = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<InterlinearSetupRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.TaskType, Is.EqualTo(InterlinearTaskType.Glossing));
        Assert.That(result.SourceProjectName, Is.EqualTo("SourceProj"));
        Assert.That(result.ModelTextName, Is.EqualTo("ModelText"));
        Assert.That(result.DestinationProjectName, Is.EqualTo("DestProj"));
        Assert.That(result.RelatedLanguages, Is.True);
        Assert.That(result.OutputGlosses, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-029")]
    [Property("BehaviorId", "BHV-206")]
    public void RegistrationStatusRequest_RoundTrip_PreservesData()
    {
        var original = new RegistrationStatusRequest
        {
            ProjectGuid = "guid123456",
            ProjectName = "TestProj",
            ProjectType = ProjectType.Standard,
            BaseProjectName = "BaseProj",
            AllowDerivedProjectRegistration = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<RegistrationStatusRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ProjectGuid, Is.EqualTo("guid123456"));
        Assert.That(result.ProjectName, Is.EqualTo("TestProj"));
        Assert.That(result.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(result.BaseProjectName, Is.EqualTo("BaseProj"));
        Assert.That(result.AllowDerivedProjectRegistration, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-030")]
    [Property("BehaviorId", "BHV-206")]
    public void RegistrationStatusRequest_NullProjectType_RoundTrip()
    {
        var original = new RegistrationStatusRequest
        {
            ProjectType = null
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<RegistrationStatusRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ProjectType, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-031")]
    [Property("BehaviorId", "BHV-254")]
    public void RestoreEligibilityRequest_RoundTrip_PreservesData()
    {
        var original = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.SourceIsNewer
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<RestoreEligibilityRequest>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ComparisonState, Is.EqualTo(FileComparisonState.SourceIsNewer));
    }

    #endregion

    #region Result Type Serialization Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-040")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectCreationResult_Success_RoundTrip()
    {
        var projectInfo = new ProjectInfo
        {
            ShortName = "PROJ",
            FullName = "Project Name",
            Guid = "0123456789abcdef0123456789abcdef01234567",
            ProjectType = ProjectType.Standard,
            LanguageId = "en:Latn::",
            Versification = "English",
            CreatedAt = new DateTime(2026, 1, 29, 12, 0, 0, DateTimeKind.Utc),
            SettingsFilePath = "/projects/PROJ/Settings.xml"
        };

        var original = ProjectCreationResult.Succeeded(projectInfo);

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectCreationResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ShortName, Is.EqualTo("PROJ"));
        Assert.That(result.Project.Guid, Is.EqualTo("0123456789abcdef0123456789abcdef01234567"));
        Assert.That(result.Error, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-041")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectCreationResult_Failure_RoundTrip()
    {
        var original = ProjectCreationResult.Failed(
            ProjectCreationErrorCode.ShortNameExists,
            "Project TEST already exists",
            "shortName"
        );

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectCreationResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.False);
        Assert.That(result.Project, Is.Null);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.ShortNameExists));
        Assert.That(result.Error.Message, Is.EqualTo("Project TEST already exists"));
        Assert.That(result.Error.Field, Is.EqualTo("shortName"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-042")]
    [Property("BehaviorId", "BHV-106")]
    public void ProjectInfo_WithBaseProject_RoundTrip()
    {
        var original = new ProjectInfo
        {
            ShortName = "BTProj",
            FullName = "Back Translation",
            Guid = "abcd1234abcd1234abcd1234abcd1234abcd1234",
            ProjectType = ProjectType.BackTranslation,
            LanguageId = "fr:Latn::",
            Versification = "English",
            CreatedAt = DateTime.UtcNow,
            BaseProjectName = "SourceProj",
            BaseProjectGuid = "5678efab5678efab5678efab5678efab5678efab",
            SettingsFilePath = "/projects/BTProj/Settings.xml"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectInfo>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.BaseProjectName, Is.EqualTo("SourceProj"));
        Assert.That(result.BaseProjectGuid, Is.EqualTo("5678efab5678efab5678efab5678efab5678efab"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-043")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectNameValidationResult_RoundTrip_PreservesData()
    {
        var original = new ProjectNameValidationResult
        {
            IsValid = false,
            FullNameError = "Full name cannot be empty",
            ShortNameError = "Short name must be 3-8 characters",
            ShortNameSuggestions = new List<string> { "TST", "TST1", "TST2" }
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectNameValidationResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.IsValid, Is.False);
        Assert.That(result.FullNameError, Is.EqualTo("Full name cannot be empty"));
        Assert.That(result.ShortNameError, Is.EqualTo("Short name must be 3-8 characters"));
        Assert.That(result.ShortNameSuggestions, Is.EquivalentTo(new[] { "TST", "TST1", "TST2" }));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-044")]
    [Property("BehaviorId", "BHV-105")]
    public void ProjectNameValidationResult_Valid_RoundTrip()
    {
        var original = new ProjectNameValidationResult
        {
            IsValid = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectNameValidationResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.IsValid, Is.True);
        Assert.That(result.FullNameError, Is.Null);
        Assert.That(result.ShortNameError, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-045")]
    [Property("BehaviorId", "BHV-100")]
    public void ShortNameGenerationResult_RoundTrip_PreservesData()
    {
        var original = new ShortNameGenerationResult
        {
            Abbreviation = "NTG24",
            WasModified = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ShortNameGenerationResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Abbreviation, Is.EqualTo("NTG24"));
        Assert.That(result.WasModified, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-046")]
    [Property("BehaviorId", "BHV-254")]
    public void FileNamingPatternResult_RoundTrip_PreservesData()
    {
        var original = new FileNamingPatternResult
        {
            IsValid = true,
            Examples = new FileNamingExamples
            {
                Genesis = "01GENMyProj.SFM",
                Matthew = "41MATMyProj.SFM",
                SongOfThree = "71S3YMyProj.SFM"
            }
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<FileNamingPatternResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.IsValid, Is.True);
        Assert.That(result.Examples, Is.Not.Null);
        Assert.That(result.Examples!.Genesis, Is.EqualTo("01GENMyProj.SFM"));
        Assert.That(result.Examples.Matthew, Is.EqualTo("41MATMyProj.SFM"));
        Assert.That(result.Examples.SongOfThree, Is.EqualTo("71S3YMyProj.SFM"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-047")]
    [Property("BehaviorId", "BHV-254")]
    public void FileNamingPatternResult_Invalid_RoundTrip()
    {
        var original = new FileNamingPatternResult
        {
            IsValid = false,
            PrefixError = "Invalid prefix characters",
            ExtensionError = ".ptx extension is forbidden"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<FileNamingPatternResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.IsValid, Is.False);
        Assert.That(result.PrefixError, Is.EqualTo("Invalid prefix characters"));
        Assert.That(result.ExtensionError, Is.EqualTo(".ptx extension is forbidden"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-048")]
    [Property("BehaviorId", "BHV-113")]
    public void InterlinearSetupResult_Success_RoundTrip()
    {
        var setupInfo = new InterlinearSetupInfo
        {
            Id = "setup-001",
            TaskType = InterlinearTaskType.BackTranslation,
            SourceProjectName = "SourceProj",
            DestinationProjectName = "DestProj",
            LanguageId = "grc:Grek::"
        };

        var original = InterlinearSetupResult.Succeeded(setupInfo);

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<InterlinearSetupResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.True);
        Assert.That(result.Setup, Is.Not.Null);
        Assert.That(result.Setup!.Id, Is.EqualTo("setup-001"));
        Assert.That(result.Setup.TaskType, Is.EqualTo(InterlinearTaskType.BackTranslation));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-049")]
    [Property("BehaviorId", "BHV-113")]
    public void InterlinearSetupResult_Failure_RoundTrip()
    {
        var original = InterlinearSetupResult.Failed(
            InterlinearErrorCode.MissingModelText,
            "Model text is required for glossing",
            "modelTextName"
        );

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<InterlinearSetupResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(InterlinearErrorCode.MissingModelText));
        Assert.That(result.Error.Field, Is.EqualTo("modelTextName"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-050")]
    [Property("BehaviorId", "BHV-113")]
    public void InterlinearValidationResult_RoundTrip_PreservesData()
    {
        var original = new InterlinearValidationResult
        {
            IsValid = false,
            TaskTypeError = "Invalid task type",
            ModelTextError = "Model text required",
            DestinationError = "Invalid destination project",
            LanguageError = "Language mismatch"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<InterlinearValidationResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.IsValid, Is.False);
        Assert.That(result.TaskTypeError, Is.EqualTo("Invalid task type"));
        Assert.That(result.ModelTextError, Is.EqualTo("Model text required"));
        Assert.That(result.DestinationError, Is.EqualTo("Invalid destination project"));
        Assert.That(result.LanguageError, Is.EqualTo("Language mismatch"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-051")]
    [Property("BehaviorId", "BHV-206")]
    public void RegistrationStatusResult_RoundTrip_PreservesData()
    {
        var original = new RegistrationStatusResult
        {
            MessageType = RegistrationMessageType.Registered,
            MessageText = "Project is registered",
            ShowManageLink = true,
            ShowRegisterButton = false,
            ShowOfflineCheckbox = false,
            VisibilityNote = "Visible to all users",
            BlocksCreation = false
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<RegistrationStatusResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.MessageType, Is.EqualTo(RegistrationMessageType.Registered));
        Assert.That(result.MessageText, Is.EqualTo("Project is registered"));
        Assert.That(result.ShowManageLink, Is.True);
        Assert.That(result.ShowRegisterButton, Is.False);
        Assert.That(result.BlocksCreation, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-052")]
    [Property("BehaviorId", "BHV-254")]
    public void RestoreEligibilityResult_RoundTrip_PreservesData()
    {
        var original = new RestoreEligibilityResult
        {
            DefaultSelected = true,
            Tooltip = "Backup has newer version"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<RestoreEligibilityResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.DefaultSelected, Is.True);
        Assert.That(result.Tooltip, Is.EqualTo("Backup has newer version"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-053")]
    [Property("BehaviorId", "BHV-206")]
    public void UserChangeResult_RoundTrip_PreservesData()
    {
        var original = new UserChangeResult
        {
            RequiresCommit = true,
            ShowConfirmation = true,
            AffectedProjectCount = 7,
            ConfirmationMessage = "This will commit changes to 7 projects"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<UserChangeResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.RequiresCommit, Is.True);
        Assert.That(result.ShowConfirmation, Is.True);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(7));
        Assert.That(result.ConfirmationMessage, Is.EqualTo("This will commit changes to 7 projects"));
    }

    #endregion

    #region ProjectOptionsResult and Related Types Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-060")]
    [Property("BehaviorId", "BHV-100")]
    public void ProjectOptionsResult_RoundTrip_PreservesData()
    {
        var original = new ProjectOptionsResult
        {
            Languages = new List<LanguageOption>
            {
                new LanguageOption
                {
                    Id = "en:Latn::",
                    Code = "en",
                    DisplayName = "English",
                    Script = "Latin",
                    Region = "US",
                    IsRTL = false
                }
            },
            Versifications = new List<VersificationOption>
            {
                new VersificationOption
                {
                    Id = "English",
                    DisplayName = "English",
                    IsCustomized = false
                }
            },
            ProjectTypes = new List<ProjectTypeOption>
            {
                new ProjectTypeOption
                {
                    Value = ProjectType.Standard,
                    Label = "Standard Translation",
                    IsDerived = false,
                    NeedsOwnRegistration = true
                }
            },
            AvailableBaseProjects = new List<ProjectOption>
            {
                new ProjectOption
                {
                    Name = "BaseProj",
                    Guid = "guid123",
                    DisplayName = "Base Project",
                    ProjectType = ProjectType.Standard
                }
            },
            BiblicalTermsLists = new List<NamedOption>
            {
                new NamedOption { Id = "default", DisplayName = "Default Terms" }
            },
            Encodings = new List<NamedOption>
            {
                new NamedOption { Id = "65001", DisplayName = "UTF-8" }
            },
            Normalizations = new List<NamedOption>
            {
                new NamedOption { Id = "NFC", DisplayName = "NFC (Composed)" }
            }
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectOptionsResult>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Languages, Has.Count.EqualTo(1));
        Assert.That(result.Languages[0].Code, Is.EqualTo("en"));
        Assert.That(result.Versifications, Has.Count.EqualTo(1));
        Assert.That(result.ProjectTypes, Has.Count.EqualTo(1));
        Assert.That(result.AvailableBaseProjects, Has.Count.EqualTo(1));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-061")]
    [Property("BehaviorId", "BHV-100")]
    public void LanguageOption_RoundTrip_PreservesData()
    {
        var original = new LanguageOption
        {
            Id = "ar:Arab::",
            Code = "ar",
            DisplayName = "Arabic",
            Script = "Arabic",
            Region = "SA",
            IsRTL = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<LanguageOption>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Id, Is.EqualTo("ar:Arab::"));
        Assert.That(result.Code, Is.EqualTo("ar"));
        Assert.That(result.DisplayName, Is.EqualTo("Arabic"));
        Assert.That(result.IsRTL, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-062")]
    [Property("BehaviorId", "BHV-100")]
    public void VersificationOption_RoundTrip_PreservesData()
    {
        var original = new VersificationOption
        {
            Id = "Custom1",
            DisplayName = "Custom Versification",
            IsCustomized = true
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<VersificationOption>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Id, Is.EqualTo("Custom1"));
        Assert.That(result.DisplayName, Is.EqualTo("Custom Versification"));
        Assert.That(result.IsCustomized, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-063")]
    [Property("BehaviorId", "BHV-100")]
    public void ProjectTypeOption_RoundTrip_PreservesData()
    {
        var original = new ProjectTypeOption
        {
            Value = ProjectType.BackTranslation,
            Label = "Back Translation",
            IsDerived = true,
            NeedsOwnRegistration = false
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectTypeOption>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Value, Is.EqualTo(ProjectType.BackTranslation));
        Assert.That(result.Label, Is.EqualTo("Back Translation"));
        Assert.That(result.IsDerived, Is.True);
        Assert.That(result.NeedsOwnRegistration, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-064")]
    [Property("BehaviorId", "BHV-100")]
    public void ProjectOption_RoundTrip_PreservesData()
    {
        var original = new ProjectOption
        {
            Name = "TestProj",
            Guid = "abcd1234",
            DisplayName = "Test Project (English)",
            ProjectType = ProjectType.Standard
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectOption>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Name, Is.EqualTo("TestProj"));
        Assert.That(result.Guid, Is.EqualTo("abcd1234"));
        Assert.That(result.DisplayName, Is.EqualTo("Test Project (English)"));
        Assert.That(result.ProjectType, Is.EqualTo(ProjectType.Standard));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-065")]
    [Property("BehaviorId", "BHV-100")]
    public void ProjectOption_NullProjectType_RoundTrip()
    {
        var original = new ProjectOption
        {
            Name = "Resource",
            Guid = "res123",
            DisplayName = "Resource Project",
            ProjectType = null
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<ProjectOption>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ProjectType, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-066")]
    [Property("BehaviorId", "BHV-100")]
    public void NamedOption_RoundTrip_PreservesData()
    {
        var original = new NamedOption
        {
            Id = "option1",
            DisplayName = "Option One"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var result = JsonSerializer.Deserialize<NamedOption>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Id, Is.EqualTo("option1"));
        Assert.That(result.DisplayName, Is.EqualTo("Option One"));
    }

    #endregion

    #region JSON Property Naming Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-070")]
    [Property("BehaviorId", "BHV-100")]
    public void ProjectCreationRequest_SerializesWithCamelCase()
    {
        var original = new ProjectCreationRequest
        {
            ShortName = "TEST",
            FullName = "Test",
            LanguageId = "en",
            ProjectType = ProjectType.Standard
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);

        // Verify camelCase property names
        Assert.That(json, Does.Contain("\"shortName\":"));
        Assert.That(json, Does.Contain("\"fullName\":"));
        Assert.That(json, Does.Contain("\"languageId\":"));
        Assert.That(json, Does.Contain("\"projectType\":"));
        // Verify NOT PascalCase
        Assert.That(json, Does.Not.Contain("\"ShortName\":"));
        Assert.That(json, Does.Not.Contain("\"FullName\":"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-TYPE-071")]
    [Property("BehaviorId", "BHV-100")]
    public void ProjectInfo_SerializesWithCamelCase()
    {
        var original = new ProjectInfo
        {
            ShortName = "TEST",
            FullName = "Test",
            Guid = "abc",
            ProjectType = ProjectType.Standard,
            LanguageId = "en",
            Versification = "English",
            CreatedAt = DateTime.UtcNow,
            SettingsFilePath = "/path"
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);

        Assert.That(json, Does.Contain("\"shortName\":"));
        Assert.That(json, Does.Contain("\"createdAt\":"));
        Assert.That(json, Does.Contain("\"settingsFilePath\":"));
    }

    #endregion
}

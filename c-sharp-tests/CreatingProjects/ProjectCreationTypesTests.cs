using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests verifying that all shared types for project creation match the
/// data-contracts.md specification. These are RED phase tests -- they will
/// fail until the types are implemented.
/// </summary>
[TestFixture]
public class ProjectCreationTypesTests
{
    // =========================================================================
    // ProjectType enum
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-002")]
    [Description("ProjectType enum has all values from data-contracts.md")]
    [TestCase(ProjectType.NotSelected, 0)]
    [TestCase(ProjectType.Standard, 1)]
    [TestCase(ProjectType.BackTranslation, 2)]
    [TestCase(ProjectType.Daughter, 3)]
    [TestCase(ProjectType.TransliterationManual, 4)]
    [TestCase(ProjectType.TransliterationWithEncoder, 5)]
    [TestCase(ProjectType.StudyBible, 6)]
    [TestCase(ProjectType.ConsultantNotes, 7)]
    [TestCase(ProjectType.StudyBibleAdditions, 8)]
    [TestCase(ProjectType.Auxiliary, 9)]
    [TestCase(ProjectType.AuxiliaryResource, 10)]
    [TestCase(ProjectType.XmlResource, 11)]
    [TestCase(ProjectType.XmlDictionary, 12)]
    [TestCase(ProjectType.Resource, 13)]
    [TestCase(ProjectType.MarbleResource, 14)]
    [TestCase(ProjectType.SourceLanguage, 15)]
    [TestCase(ProjectType.Dictionary, 16)]
    [TestCase(ProjectType.EnhancedResource, 17)]
    public void ProjectType_HasCorrectIntegerValue(ProjectType value, int expected)
    {
        Assert.That((int)value, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-002")]
    [Description("ProjectType enum has exactly 18 values")]
    public void ProjectType_HasExactValueCount()
    {
        var values = Enum.GetValues<ProjectType>();
        Assert.That(values, Has.Length.EqualTo(18));
    }

    // =========================================================================
    // ProjectNormalization enum
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-034")]
    [Description("ProjectNormalization enum has correct values")]
    [TestCase(ProjectNormalization.Undefined, 0)]
    [TestCase(ProjectNormalization.NFC, 1)]
    [TestCase(ProjectNormalization.NFD, 2)]
    public void ProjectNormalization_HasCorrectIntegerValue(
        ProjectNormalization value,
        int expected
    )
    {
        Assert.That((int)value, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-034")]
    [Description("ProjectNormalization enum has exactly 3 values")]
    public void ProjectNormalization_HasExactValueCount()
    {
        Assert.That(Enum.GetValues<ProjectNormalization>(), Has.Length.EqualTo(3));
    }

    // =========================================================================
    // RegistrationStatus enum
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-010")]
    [Description("RegistrationStatus enum has all expected values")]
    public void RegistrationStatus_HasAllValues()
    {
        var names = Enum.GetNames<RegistrationStatus>();
        Assert.That(
            names,
            Is.EquivalentTo(
                new[]
                {
                    "NotSelected",
                    "Registered",
                    "Unregistered",
                    "InheritsFromBase",
                    "NotApplicable",
                }
            )
        );
    }

    // =========================================================================
    // BookCreationMode enum
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-036")]
    [Description("BookCreationMode enum has correct values")]
    [TestCase(BookCreationMode.Empty, 0)]
    [TestCase(BookCreationMode.ChapterVerse, 1)]
    [TestCase(BookCreationMode.BasedOnModel, 2)]
    public void BookCreationMode_HasCorrectIntegerValue(BookCreationMode value, int expected)
    {
        Assert.That((int)value, Is.EqualTo(expected));
    }

    // =========================================================================
    // VersificationType enum
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-034")]
    [Description("VersificationType enum has correct values")]
    [TestCase(VersificationType.Unknown, 0)]
    [TestCase(VersificationType.Original, 1)]
    [TestCase(VersificationType.Septuagint, 2)]
    [TestCase(VersificationType.Vulgate, 3)]
    [TestCase(VersificationType.English, 4)]
    [TestCase(VersificationType.RussianOrthodox, 5)]
    [TestCase(VersificationType.RussianProtestant, 6)]
    public void VersificationType_HasCorrectIntegerValue(VersificationType value, int expected)
    {
        Assert.That((int)value, Is.EqualTo(expected));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-034")]
    [Description("VersificationType enum has exactly 7 values")]
    public void VersificationType_HasExactValueCount()
    {
        Assert.That(Enum.GetValues<VersificationType>(), Has.Length.EqualTo(7));
    }

    // =========================================================================
    // ValidationResult record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-029")]
    [Description("ValidationResult can be created with IsValid only (defaults)")]
    public void ValidationResult_ValidResult_HasNullDefaults()
    {
        var result = new ValidationResult(true);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
        Assert.That(result.ErrorParams, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-029")]
    [Description("ValidationResult can be created with error code and params")]
    public void ValidationResult_InvalidResult_HasErrorDetails()
    {
        var errorParams = new Dictionary<string, string> { { "min", "3" } }
            as IReadOnlyDictionary<string, string>;
        var result = new ValidationResult(false, "SHORTNAME_TOO_SHORT", errorParams);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_SHORT"));
        Assert.That(result.ErrorParams, Is.Not.Null);
        Assert.That(result.ErrorParams!["min"], Is.EqualTo("3"));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-029")]
    [Description("ValidationResult supports value equality")]
    public void ValidationResult_EqualValues_AreEqual()
    {
        var a = new ValidationResult(true);
        var b = new ValidationResult(true);

        Assert.That(a, Is.EqualTo(b));
    }

    // =========================================================================
    // ProjectReference record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-027")]
    [Description("ProjectReference has all required properties")]
    public void ProjectReference_AllRequiredProperties_CanBeSet()
    {
        var proj = new ProjectReference
        {
            Guid = "abc123",
            ShortName = "TST",
            FullName = "Test Project",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
            IsScripture = true,
            IsResource = false,
            IsRegistered = true,
        };

        Assert.That(proj.Guid, Is.EqualTo("abc123"));
        Assert.That(proj.ShortName, Is.EqualTo("TST"));
        Assert.That(proj.FullName, Is.EqualTo("Test Project"));
        Assert.That(proj.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(proj.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(proj.IsScripture, Is.True);
        Assert.That(proj.IsResource, Is.False);
        Assert.That(proj.IsRegistered, Is.True);
    }

    // =========================================================================
    // ProjectMetadata record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-010")]
    [Description("ProjectMetadata has required and optional properties")]
    public void ProjectMetadata_RequiredAndOptional_CanBeSet()
    {
        var meta = new ProjectMetadata
        {
            RegistryId = "reg-001",
            FullName = "Test",
            Visibility = "public",
            License = "MIT",
        };

        Assert.That(meta.RegistryId, Is.EqualTo("reg-001"));
        Assert.That(meta.FullName, Is.EqualTo("Test"));
        Assert.That(meta.Visibility, Is.EqualTo("public"));
        Assert.That(meta.License, Is.EqualTo("MIT"));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-010")]
    [Description("ProjectMetadata License is optional (nullable)")]
    public void ProjectMetadata_LicenseOptional_DefaultsToNull()
    {
        var meta = new ProjectMetadata
        {
            RegistryId = "reg-001",
            FullName = "Test",
            Visibility = "public",
        };

        Assert.That(meta.License, Is.Null);
    }

    // =========================================================================
    // LanguageSelection record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-009")]
    [Description("LanguageSelection has required and optional BCP-47 properties")]
    public void LanguageSelection_AllProperties_CanBeSet()
    {
        var lang = new LanguageSelection
        {
            LanguageId = "en-US",
            LanguageName = "English",
            BaseCode = "eng",
            Script = "Latn",
            Region = "US",
            Variant = "fonipa",
        };

        Assert.That(lang.LanguageId, Is.EqualTo("en-US"));
        Assert.That(lang.LanguageName, Is.EqualTo("English"));
        Assert.That(lang.BaseCode, Is.EqualTo("eng"));
        Assert.That(lang.Script, Is.EqualTo("Latn"));
        Assert.That(lang.Region, Is.EqualTo("US"));
        Assert.That(lang.Variant, Is.EqualTo("fonipa"));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-009")]
    [Description("LanguageSelection optional properties default to null")]
    public void LanguageSelection_OptionalProperties_DefaultToNull()
    {
        var lang = new LanguageSelection
        {
            LanguageId = "eng",
            LanguageName = "English",
            BaseCode = "eng",
        };

        Assert.That(lang.Script, Is.Null);
        Assert.That(lang.Region, Is.Null);
        Assert.That(lang.Variant, Is.Null);
    }

    // =========================================================================
    // ProjectTypeConfiguration record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-002")]
    [Description("ProjectTypeConfiguration has all required properties")]
    public void ProjectTypeConfiguration_AllRequiredProperties_CanBeSet()
    {
        var config = new ProjectTypeConfiguration
        {
            ProjectType = ProjectType.Standard,
            BaseProjectRequired = false,
            EditableDefault = true,
            AutoNameFromUser = false,
            NormalizationDefault = ProjectNormalization.NFC,
            RegistrationRequired = true,
            SharesParentRegistration = false,
            BooksTabVisible = true,
            EncodingConverterRequired = false,
            AllowedBaseTypes = new List<ProjectType>(),
            IsDerivedType = false,
            IsScripture = true,
        };

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(config.BaseProjectRequired, Is.False);
        Assert.That(config.EditableDefault, Is.True);
        Assert.That(config.AutoNameFromUser, Is.False);
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
        Assert.That(config.BooksTabVisible, Is.True);
        Assert.That(config.EncodingConverterRequired, Is.False);
        Assert.That(config.AllowedBaseTypes, Is.Empty);
        Assert.That(config.IsDerivedType, Is.False);
        Assert.That(config.IsScripture, Is.True);
    }

    // =========================================================================
    // RegistrationState record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-010")]
    [Description("RegistrationState has required and optional properties")]
    public void RegistrationState_AllProperties_CanBeSet()
    {
        var state = new RegistrationState
        {
            Status = RegistrationStatus.Registered,
            MessageKey = "Registration_Complete",
            CanRegisterOnline = false,
            CanOptOutOfInheritance = false,
            Metadata = new ProjectMetadata
            {
                RegistryId = "r1",
                FullName = "Test",
                Visibility = "public",
            },
            RegistryServerAvailable = true,
        };

        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.Registered));
        Assert.That(state.MessageKey, Is.EqualTo("Registration_Complete"));
        Assert.That(state.CanRegisterOnline, Is.False);
        Assert.That(state.CanOptOutOfInheritance, Is.False);
        Assert.That(state.Metadata, Is.Not.Null);
        Assert.That(state.RegistryServerAvailable, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-010")]
    [Description("RegistrationState optional properties default to null")]
    public void RegistrationState_OptionalProperties_DefaultToNull()
    {
        var state = new RegistrationState
        {
            Status = RegistrationStatus.Unregistered,
            CanRegisterOnline = true,
            CanOptOutOfInheritance = false,
            RegistryServerAvailable = true,
        };

        Assert.That(state.MessageKey, Is.Null);
        Assert.That(state.Metadata, Is.Null);
    }

    // =========================================================================
    // CreateProjectRequest record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-001")]
    [Description("CreateProjectRequest has required and optional properties")]
    public void CreateProjectRequest_AllProperties_CanBeSet()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "TST",
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
            BaseProjectGuid = "base-guid",
            Copyright = "(c) 2026",
            Normalization = ProjectNormalization.NFC,
            UsfmVersion = 3,
            Editable = true,
            EncodingConverter = null,
            EncoderReverseDirection = false,
        };

        Assert.That(request.ShortName, Is.EqualTo("TST"));
        Assert.That(request.FullName, Is.EqualTo("Test Project"));
        Assert.That(request.LanguageId, Is.EqualTo("eng"));
        Assert.That(request.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(request.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(request.BaseProjectGuid, Is.EqualTo("base-guid"));
        Assert.That(request.Copyright, Is.EqualTo("(c) 2026"));
        Assert.That(request.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(request.UsfmVersion, Is.EqualTo(3));
        Assert.That(request.Editable, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-001")]
    [Description("CreateProjectRequest optional properties default to null")]
    public void CreateProjectRequest_OptionalProperties_DefaultToNull()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "TST",
            FullName = "Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        Assert.That(request.BaseProjectGuid, Is.Null);
        Assert.That(request.Copyright, Is.Null);
        Assert.That(request.Normalization, Is.Null);
        Assert.That(request.UsfmVersion, Is.Null);
        Assert.That(request.Editable, Is.Null);
        Assert.That(request.EncodingConverter, Is.Null);
        Assert.That(request.EncoderReverseDirection, Is.Null);
    }

    // =========================================================================
    // CreateProjectResult record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-001")]
    [Description("CreateProjectResult success case")]
    public void CreateProjectResult_Success_HasProjectGuid()
    {
        var result = new CreateProjectResult
        {
            Success = true,
            ProjectGuid = "guid-123",
        };

        Assert.That(result.Success, Is.True);
        Assert.That(result.ProjectGuid, Is.EqualTo("guid-123"));
        Assert.That(result.ErrorCode, Is.Null);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-001")]
    [Description("CreateProjectResult failure case")]
    public void CreateProjectResult_Failure_HasErrorDetails()
    {
        var result = new CreateProjectResult
        {
            Success = false,
            ErrorCode = "INVALID_SHORT_NAME",
            ErrorMessage = "Short name is invalid",
        };

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("INVALID_SHORT_NAME"));
        Assert.That(result.ErrorMessage, Is.EqualTo("Short name is invalid"));
        Assert.That(result.ProjectGuid, Is.Null);
    }

    // =========================================================================
    // UpdateProjectRequest record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-038")]
    [Description("UpdateProjectRequest has required ProjectGuid and all optional fields")]
    public void UpdateProjectRequest_OnlyGuidRequired_RestOptional()
    {
        var request = new UpdateProjectRequest { ProjectGuid = "guid-123" };

        Assert.That(request.ProjectGuid, Is.EqualTo("guid-123"));
        Assert.That(request.ShortName, Is.Null);
        Assert.That(request.FullName, Is.Null);
        Assert.That(request.Copyright, Is.Null);
        Assert.That(request.LanguageId, Is.Null);
        Assert.That(request.Versification, Is.Null);
        Assert.That(request.ProjectType, Is.Null);
        Assert.That(request.BaseProjectGuid, Is.Null);
        Assert.That(request.EncodingConverter, Is.Null);
        Assert.That(request.EncoderReverseDirection, Is.Null);
        Assert.That(request.Normalization, Is.Null);
        Assert.That(request.UsfmVersion, Is.Null);
        Assert.That(request.Editable, Is.Null);
        Assert.That(request.PlannedBooks, Is.Null);
    }

    // =========================================================================
    // UpdateProjectResult record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-038")]
    [Description("UpdateProjectResult success and failure cases")]
    public void UpdateProjectResult_Success_HasNoError()
    {
        var result = new UpdateProjectResult { Success = true };

        Assert.That(result.Success, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    // =========================================================================
    // CreateBooksRequest record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-036")]
    [Description("CreateBooksRequest has all required properties")]
    public void CreateBooksRequest_AllRequiredProperties_CanBeSet()
    {
        var request = new CreateBooksRequest
        {
            ProjectGuid = "guid-123",
            BookNumbers = new List<int> { 1, 2, 3 },
            Mode = BookCreationMode.ChapterVerse,
            ModelProjectGuid = "model-guid",
        };

        Assert.That(request.ProjectGuid, Is.EqualTo("guid-123"));
        Assert.That(request.BookNumbers, Is.EquivalentTo(new[] { 1, 2, 3 }));
        Assert.That(request.Mode, Is.EqualTo(BookCreationMode.ChapterVerse));
        Assert.That(request.ModelProjectGuid, Is.EqualTo("model-guid"));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-036")]
    [Description("CreateBooksRequest ModelProjectGuid is optional")]
    public void CreateBooksRequest_ModelProjectGuid_DefaultsToNull()
    {
        var request = new CreateBooksRequest
        {
            ProjectGuid = "guid-123",
            BookNumbers = new List<int> { 1 },
            Mode = BookCreationMode.Empty,
        };

        Assert.That(request.ModelProjectGuid, Is.Null);
    }

    // =========================================================================
    // CreateBooksResult record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-036")]
    [Description("CreateBooksResult has correct defaults for collection properties")]
    public void CreateBooksResult_CollectionDefaults_AreEmpty()
    {
        var result = new CreateBooksResult { Success = true, LastCreatedBookNum = 3 };

        Assert.That(result.Success, Is.True);
        Assert.That(result.LastCreatedBookNum, Is.EqualTo(3));
        Assert.That(result.Errors, Is.Empty);
        Assert.That(result.CreatedBooks, Is.Empty);
    }

    // =========================================================================
    // CopyBaseBooksRequest record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-059")]
    [Description("CopyBaseBooksRequest has all required properties")]
    public void CopyBaseBooksRequest_AllRequiredProperties_CanBeSet()
    {
        var request = new CopyBaseBooksRequest
        {
            DerivedProjectGuid = "derived-guid",
            BaseProjectGuid = "base-guid",
        };

        Assert.That(request.DerivedProjectGuid, Is.EqualTo("derived-guid"));
        Assert.That(request.BaseProjectGuid, Is.EqualTo("base-guid"));
    }

    // =========================================================================
    // CopyBaseBooksResult record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-059")]
    [Description("CopyBaseBooksResult has correct defaults")]
    public void CopyBaseBooksResult_CollectionDefaults_AreEmpty()
    {
        var result = new CopyBaseBooksResult { Success = true };

        Assert.That(result.CopiedBooks, Is.Empty);
        Assert.That(result.ErrorCode, Is.Null);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    // =========================================================================
    // CleanupProjectRequest record
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-041")]
    [Description("CleanupProjectRequest has all required and optional properties")]
    public void CleanupProjectRequest_AllProperties_CanBeSet()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "guid-123",
            WasRegistered = true,
            Registration = new ProjectMetadata
            {
                RegistryId = "r1",
                FullName = "Test",
                Visibility = "public",
            },
        };

        Assert.That(request.ProjectGuid, Is.EqualTo("guid-123"));
        Assert.That(request.WasRegistered, Is.True);
        Assert.That(request.Registration, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-041")]
    [Description("CleanupProjectRequest Registration is optional")]
    public void CleanupProjectRequest_Registration_DefaultsToNull()
    {
        var request = new CleanupProjectRequest
        {
            ProjectGuid = "guid-123",
            WasRegistered = false,
        };

        Assert.That(request.Registration, Is.Null);
    }
}

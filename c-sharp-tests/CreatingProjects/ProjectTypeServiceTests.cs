using Paranext.DataProvider.Projects;
using Paratext.Data;
using ProjectType = Paranext.DataProvider.CreatingProjects.ProjectType;
using ProjectNormalization = Paranext.DataProvider.CreatingProjects.ProjectNormalization;
using ProjectTypeService = Paranext.DataProvider.CreatingProjects.ProjectTypeService;
using ProjectReference = Paranext.DataProvider.CreatingProjects.ProjectReference;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectTypeService: GetTypeConfiguration (CAP-001) and CanBeBasedOnType (CAP-002).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class ProjectTypeServiceTests
{
    private DummyLocalParatextProjects _dummyProjects = null!;

    [SetUp]
    public void SetUp()
    {
        _dummyProjects = new DummyLocalParatextProjects();
    }

    [TearDown]
    public void TearDown()
    {
        foreach (
            ScrText project in ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .ToList()
        )
            ScrTextCollection.Remove(project, false);
    }

    // =========================================================================
    // CAP-001: GetTypeConfiguration - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Acceptance test: All 8 project types return correct configuration matching gm-001")]
    public void GetTypeConfiguration_AllTypes_MatchGoldenMaster()
    {
        // Standard
        var standard = ProjectTypeService.GetTypeConfiguration(ProjectType.Standard);
        Assert.That(standard.BaseProjectRequired, Is.False);
        Assert.That(standard.EditableDefault, Is.True);
        Assert.That(standard.RegistrationRequired, Is.True);
        Assert.That(standard.SharesParentRegistration, Is.False);
        Assert.That(standard.BooksTabVisible, Is.True);
        Assert.That(standard.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));

        // BackTranslation
        var bt = ProjectTypeService.GetTypeConfiguration(ProjectType.BackTranslation);
        Assert.That(bt.BaseProjectRequired, Is.True);
        Assert.That(bt.RegistrationRequired, Is.False);
        Assert.That(bt.SharesParentRegistration, Is.True);
        Assert.That(bt.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));

        // ConsultantNotes
        var cn = ProjectTypeService.GetTypeConfiguration(ProjectType.ConsultantNotes);
        Assert.That(cn.BaseProjectRequired, Is.False);
        Assert.That(cn.RegistrationRequired, Is.False);
        Assert.That(cn.BooksTabVisible, Is.False);

        // TransliterationManual
        var tm = ProjectTypeService.GetTypeConfiguration(ProjectType.TransliterationManual);
        Assert.That(tm.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFD));

        // TransliterationWithEncoder
        var te = ProjectTypeService.GetTypeConfiguration(ProjectType.TransliterationWithEncoder);
        Assert.That(te.EncodingConverterRequired, Is.True);
        Assert.That(te.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFD));
    }

    // =========================================================================
    // CAP-001: GetTypeConfiguration - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Standard: not derived, own registration, is scripture")]
    public void GetTypeConfiguration_Standard_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.Standard);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(config.BaseProjectRequired, Is.False);
        Assert.That(config.EditableDefault, Is.True);
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
        Assert.That(config.BooksTabVisible, Is.True);
        Assert.That(config.EncodingConverterRequired, Is.False);
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(config.IsDerivedType, Is.False);
        Assert.That(config.IsScripture, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-002")]
    [Description("BackTranslation: derived, shares parent registration, scripture")]
    public void GetTypeConfiguration_BackTranslation_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.BackTranslation);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.BackTranslation));
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.EditableDefault, Is.True);
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.True);
        Assert.That(config.BooksTabVisible, Is.True);
        Assert.That(config.EncodingConverterRequired, Is.False);
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(config.IsDerivedType, Is.True);
        Assert.That(config.IsScripture, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Daughter: derived, own registration, scripture")]
    public void GetTypeConfiguration_Daughter_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.Daughter);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.Daughter));
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.EditableDefault, Is.True);
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
        Assert.That(config.IsDerivedType, Is.True);
        Assert.That(config.IsScripture, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-002")]
    [Description("StudyBibleAdditions: derived, own registration")]
    public void GetTypeConfiguration_StudyBibleAdditions_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.StudyBibleAdditions);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.StudyBibleAdditions));
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.RegistrationRequired, Is.True);
        Assert.That(config.SharesParentRegistration, Is.False);
        Assert.That(config.IsDerivedType, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Auxiliary: derived, shares parent, not scripture")]
    public void GetTypeConfiguration_Auxiliary_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.Auxiliary);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.Auxiliary));
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.True);
        Assert.That(config.IsDerivedType, Is.True);
        Assert.That(config.IsScripture, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-002")]
    [Description("ConsultantNotes: not derived, no registration, not scripture, books hidden")]
    public void GetTypeConfiguration_ConsultantNotes_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.ConsultantNotes);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.ConsultantNotes));
        Assert.That(config.BaseProjectRequired, Is.False);
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.False);
        Assert.That(config.BooksTabVisible, Is.False);
        Assert.That(config.IsDerivedType, Is.False);
        Assert.That(config.IsScripture, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TransliterationManual: derived, shares parent, NFD")]
    public void GetTypeConfiguration_TransliterationManual_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.TransliterationManual);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.TransliterationManual));
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.True);
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFD));
        Assert.That(config.EncodingConverterRequired, Is.False);
        Assert.That(config.IsDerivedType, Is.True);
        Assert.That(config.IsScripture, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TransliterationWithEncoder: derived, shares parent, NFD, encoder required")]
    public void GetTypeConfiguration_TransliterationWithEncoder_ReturnsCorrectConfig()
    {
        var config = ProjectTypeService.GetTypeConfiguration(ProjectType.TransliterationWithEncoder);

        Assert.That(config.ProjectType, Is.EqualTo(ProjectType.TransliterationWithEncoder));
        Assert.That(config.BaseProjectRequired, Is.True);
        Assert.That(config.RegistrationRequired, Is.False);
        Assert.That(config.SharesParentRegistration, Is.True);
        Assert.That(config.NormalizationDefault, Is.EqualTo(ProjectNormalization.NFD));
        Assert.That(config.EncodingConverterRequired, Is.True);
        Assert.That(config.IsDerivedType, Is.True);
        Assert.That(config.IsScripture, Is.True);
    }

    // =========================================================================
    // CAP-001: GetTypeConfiguration - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Golden master: AllowedBaseTypes match gm-002 filter rules")]
    [TestCase(ProjectType.BackTranslation, "scriptureOnly")]
    [TestCase(ProjectType.Daughter, "scriptureOnly")]
    [TestCase(ProjectType.Auxiliary, "standardOnly")]
    [TestCase(ProjectType.StudyBibleAdditions, "notStudyBible")]
    [TestCase(ProjectType.TransliterationManual, "scriptureOnly")]
    [TestCase(ProjectType.TransliterationWithEncoder, "scriptureOnly")]
    public void GetTypeConfiguration_DerivedTypes_HasCorrectAllowedBaseTypes(
        ProjectType type,
        string filterRule
    )
    {
        var config = ProjectTypeService.GetTypeConfiguration(type);

        Assert.That(config.AllowedBaseTypes, Is.Not.Empty);

        if (filterRule == "standardOnly")
        {
            Assert.That(config.AllowedBaseTypes, Does.Contain(ProjectType.Standard));
            Assert.That(config.AllowedBaseTypes, Has.Count.EqualTo(1));
        }
        else if (filterRule == "scriptureOnly")
        {
            Assert.That(config.AllowedBaseTypes, Does.Contain(ProjectType.Standard));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain(ProjectType.Auxiliary));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain(ProjectType.ConsultantNotes));
        }
        else if (filterRule == "notStudyBible")
        {
            Assert.That(config.AllowedBaseTypes, Does.Contain(ProjectType.Standard));
            Assert.That(config.AllowedBaseTypes, Does.Not.Contain(ProjectType.StudyBible));
            Assert.That(
                config.AllowedBaseTypes,
                Does.Not.Contain(ProjectType.StudyBibleAdditions)
            );
        }
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-001")]
    [Property("BehaviorId", "BHV-002")]
    [Description("Golden master: Non-derived types have empty AllowedBaseTypes")]
    [TestCase(ProjectType.Standard)]
    [TestCase(ProjectType.ConsultantNotes)]
    public void GetTypeConfiguration_NonDerivedTypes_HasEmptyAllowedBaseTypes(ProjectType type)
    {
        var config = ProjectTypeService.GetTypeConfiguration(type);
        Assert.That(config.AllowedBaseTypes, Is.Empty);
    }

    // =========================================================================
    // CAP-002: CanBeBasedOnType - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "gm-002")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Acceptance test: Base project filtering matches gm-002 golden master")]
    public void CanBeBasedOnType_AllFilterRules_MatchGoldenMaster()
    {
        // Set up a Standard project in collection
        var standardGuid = HexId.CreateNew().ToString();
        var standardDetails = new ProjectDetails(
            "StandardProj",
            new Paranext.DataProvider.Projects.ProjectMetadata(
                standardGuid,
                new List<string>()
            ),
            FixtureSetup.TestFolderPath
        );
        var standardText = new DummyScrText(standardDetails);
        ScrTextCollection.Add(standardText, true);

        // Auxiliary MUST accept Standard as base
        Assert.That(
            ProjectTypeService.CanBeBasedOnType(ProjectType.Auxiliary, standardGuid),
            Is.True
        );

        // BackTranslation MUST accept Standard (scripture) as base
        Assert.That(
            ProjectTypeService.CanBeBasedOnType(ProjectType.BackTranslation, standardGuid),
            Is.True
        );
    }

    // =========================================================================
    // CAP-002: CanBeBasedOnType - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-01")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Auxiliary requires Standard base")]
    public void CanBeBasedOnType_AuxiliaryWithStandardBase_ReturnsTrue()
    {
        var standardGuid = AddDummyProject("AuxBase", ProjectType.Standard);

        var result = ProjectTypeService.CanBeBasedOnType(ProjectType.Auxiliary, standardGuid);

        Assert.That(result, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-02")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Auxiliary rejects non-Standard base")]
    public void CanBeBasedOnType_AuxiliaryWithNonStandardBase_ReturnsFalse()
    {
        var btGuid = AddDummyProject("BTProj", ProjectType.BackTranslation);

        var result = ProjectTypeService.CanBeBasedOnType(ProjectType.Auxiliary, btGuid);

        Assert.That(result, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-03")]
    [Property("BehaviorId", "BHV-028")]
    [Description("StudyBibleAdditions rejects StudyBible base")]
    public void CanBeBasedOnType_SBAWithStudyBibleBase_ReturnsFalse()
    {
        var sbGuid = AddDummyProject("SBProj", ProjectType.StudyBible);

        var result = ProjectTypeService.CanBeBasedOnType(
            ProjectType.StudyBibleAdditions,
            sbGuid
        );

        Assert.That(result, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-04")]
    [Property("BehaviorId", "BHV-028")]
    [Description("BackTranslation accepts scripture base")]
    public void CanBeBasedOnType_BTWithScriptureBase_ReturnsTrue()
    {
        var stdGuid = AddDummyProject("ScriptureProj", ProjectType.Standard);

        var result = ProjectTypeService.CanBeBasedOnType(ProjectType.BackTranslation, stdGuid);

        Assert.That(result, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-05")]
    [Property("BehaviorId", "BHV-028")]
    [Description("BackTranslation rejects Auxiliary base (not scripture)")]
    public void CanBeBasedOnType_BTWithAuxiliaryBase_ReturnsFalse()
    {
        var auxGuid = AddDummyProject("AuxProj", ProjectType.Auxiliary);

        var result = ProjectTypeService.CanBeBasedOnType(ProjectType.BackTranslation, auxGuid);

        Assert.That(result, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-06")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Daughter accepts scripture base")]
    public void CanBeBasedOnType_DaughterWithScriptureBase_ReturnsTrue()
    {
        var stdGuid = AddDummyProject("DaughterBase", ProjectType.Standard);

        var result = ProjectTypeService.CanBeBasedOnType(ProjectType.Daughter, stdGuid);

        Assert.That(result, Is.True);
    }

    // =========================================================================
    // CAP-002: CanBeBasedOnType - Error Cases
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002-07")]
    [Property("BehaviorId", "BHV-028")]
    [Description("Non-existent candidate GUID returns false or throws")]
    public void CanBeBasedOnType_NonExistentCandidate_ReturnsFalse()
    {
        var result = ProjectTypeService.CanBeBasedOnType(
            ProjectType.BackTranslation,
            "0000000000000000000000000000000000000000"
        );

        Assert.That(result, Is.False);
    }

    // =========================================================================
    // CAP-003: GetValidBaseProjects - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "gm-002")]
    [Property("BehaviorId", "BHV-027")]
    [Description("Acceptance test: GetValidBaseProjects returns filtered list matching gm-002")]
    public void GetValidBaseProjects_AllDerivedTypes_ReturnCorrectlyFilteredProjects()
    {
        // Set up projects of different types in the collection
        var standardGuid = AddDummyProject("StdBase", ProjectType.Standard);
        var btGuid = AddDummyProject("BTProj", ProjectType.BackTranslation);
        var auxGuid = AddDummyProject("AuxProj", ProjectType.Auxiliary);

        // Auxiliary: should only include Standard base
        var auxBases = ProjectTypeService.GetValidBaseProjects(ProjectType.Auxiliary);
        Assert.That(auxBases.Any(p => p.Guid == standardGuid), Is.True, "Auxiliary should include Standard");
        Assert.That(auxBases.Any(p => p.Guid == auxGuid), Is.False, "Auxiliary should exclude Auxiliary");

        // BackTranslation: should include scripture types (Standard, BT) but not Auxiliary
        var btBases = ProjectTypeService.GetValidBaseProjects(ProjectType.BackTranslation);
        Assert.That(btBases.Any(p => p.Guid == standardGuid), Is.True, "BT should include Standard");
        Assert.That(btBases.Any(p => p.Guid == auxGuid), Is.False, "BT should exclude Auxiliary");
    }

    // =========================================================================
    // CAP-003: GetValidBaseProjects - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003-01")]
    [Property("BehaviorId", "BHV-027")]
    [Description("GetValidBaseProjects returns ProjectReference list with correct properties")]
    public void GetValidBaseProjects_StandardBase_ReturnsProjectReferences()
    {
        var guid = AddDummyProject("BaseProj", ProjectType.Standard);

        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.BackTranslation);

        Assert.That(result, Is.Not.Empty);
        var proj = result.FirstOrDefault(p => p.Guid == guid);
        Assert.That(proj, Is.Not.Null);
        Assert.That(proj!.ShortName, Is.Not.Empty);
        Assert.That(proj.ProjectType, Is.EqualTo(ProjectType.Standard));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003-02")]
    [Property("BehaviorId", "BHV-027")]
    [Description("GetValidBaseProjects for Standard returns empty (not a derived type)")]
    public void GetValidBaseProjects_Standard_ReturnsEmpty()
    {
        AddDummyProject("SomeProj", ProjectType.Standard);

        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.Standard);

        Assert.That(result, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003-03")]
    [Property("BehaviorId", "BHV-027")]
    [Description("GetValidBaseProjects for Auxiliary returns only Standard projects")]
    public void GetValidBaseProjects_Auxiliary_ReturnsOnlyStandard()
    {
        var stdGuid = AddDummyProject("StdProj", ProjectType.Standard);
        AddDummyProject("BTProj2", ProjectType.BackTranslation);

        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.Auxiliary);

        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Guid, Is.EqualTo(stdGuid));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003-04")]
    [Property("BehaviorId", "BHV-027")]
    [Description("GetValidBaseProjects for ConsultantNotes returns empty (not derived)")]
    public void GetValidBaseProjects_ConsultantNotes_ReturnsEmpty()
    {
        AddDummyProject("SomeProj2", ProjectType.Standard);

        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.ConsultantNotes);

        Assert.That(result, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003-05")]
    [Property("BehaviorId", "BHV-027")]
    [Description("GetValidBaseProjects with empty collection returns empty list")]
    public void GetValidBaseProjects_NoProjects_ReturnsEmpty()
    {
        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.BackTranslation);

        Assert.That(result, Is.Empty);
    }

    // =========================================================================
    // CAP-003: GetValidBaseProjects - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-002")]
    [Property("BehaviorId", "BHV-027")]
    [Description("Golden master: StudyBibleAdditions excludes StudyBible and SBA projects")]
    public void GetValidBaseProjects_SBA_ExcludesStudyBibleTypes()
    {
        var stdGuid = AddDummyProject("StdForSBA", ProjectType.Standard);
        var sbGuid = AddDummyProject("SBProj2", ProjectType.StudyBible);

        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.StudyBibleAdditions);

        Assert.That(result.Any(p => p.Guid == stdGuid), Is.True, "SBA should include Standard");
        Assert.That(result.Any(p => p.Guid == sbGuid), Is.False, "SBA should exclude StudyBible");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-002")]
    [Property("BehaviorId", "BHV-027")]
    [Description("Golden master: Transliteration types use scriptureOnly filter")]
    public void GetValidBaseProjects_Transliteration_UsesScriptureFilter()
    {
        var stdGuid = AddDummyProject("StdForTM", ProjectType.Standard);
        var auxGuid2 = AddDummyProject("AuxForTM", ProjectType.Auxiliary);

        var result = ProjectTypeService.GetValidBaseProjects(ProjectType.TransliterationManual);

        Assert.That(result.Any(p => p.Guid == stdGuid), Is.True, "TM should include Standard");
        Assert.That(result.Any(p => p.Guid == auxGuid2), Is.False, "TM should exclude Auxiliary");
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    private string AddDummyProject(string name, ProjectType type)
    {
        var guid = HexId.CreateNew().ToString();
        var details = new ProjectDetails(
            name,
            new Paranext.DataProvider.Projects.ProjectMetadata(guid, new List<string>()),
            FixtureSetup.TestFolderPath
        );
        var scrText = new DummyScrText(details);
        var ptDataType = new PtxUtils.Enum<Paratext.Data.ProjectType>(type.ToString());
        string baseName = type switch
        {
            ProjectType.BackTranslation
            or ProjectType.Daughter
            or ProjectType.Auxiliary
            or ProjectType.StudyBibleAdditions
            or ProjectType.StudyBible
            or ProjectType.TransliterationManual
            or ProjectType.TransliterationWithEncoder
                => "DummyBase",
            _ => "",
        };
        scrText.Settings.TranslationInfo =
            new Paratext.Data.ProjectSettingsAccess.TranslationInformation(
                ptDataType,
                baseName,
                HexId.FromStr(guid)
            );
        ScrTextCollection.Add(scrText, true);
        return guid;
    }
}

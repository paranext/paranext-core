using Paranext.DataProvider.CreatingProjects;
using ProjectType = Paranext.DataProvider.CreatingProjects.ProjectType;
using ProjectNormalization = Paranext.DataProvider.CreatingProjects.ProjectNormalization;
using VersificationType = Paranext.DataProvider.CreatingProjects.VersificationType;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectDefaultsService: GetDefaultSettings (CAP-013).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class ProjectDefaultsServiceTests
{
    // =========================================================================
    // CAP-013: GetDefaultSettings - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Acceptance test: Default settings match gm-007 golden master for Standard type")]
    public void GetDefaultSettings_Standard_MatchesGoldenMaster()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
        Assert.That(defaults.Editable, Is.True);
        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.Standard));
    }

    // =========================================================================
    // CAP-013: GetDefaultSettings - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-01")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Standard defaults: English versification, NFC, USFM 3, editable")]
    public void GetDefaultSettings_Standard_ReturnsCorrectDefaults()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
        Assert.That(defaults.Editable, Is.True);
        Assert.That(defaults.BaseProjectGuid, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-02")]
    [Property("BehaviorId", "BHV-034")]
    [Description("BackTranslation defaults: NFC normalization, derived type")]
    public void GetDefaultSettings_BackTranslation_ReturnsCorrectDefaults()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.BackTranslation,
            "baseGuid123"
        );

        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.BackTranslation));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.Editable, Is.True);
        Assert.That(defaults.BaseProjectGuid, Is.EqualTo("baseGuid123"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-03")]
    [Property("BehaviorId", "BHV-034")]
    [Description("TransliterationManual defaults: NFD normalization")]
    public void GetDefaultSettings_TransliterationManual_UsesNFD()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.TransliterationManual,
            "baseGuid456"
        );

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-04")]
    [Property("BehaviorId", "BHV-034")]
    [Description("TransliterationWithEncoder defaults: NFD normalization")]
    public void GetDefaultSettings_TransliterationWithEncoder_UsesNFD()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.TransliterationWithEncoder,
            "baseGuid789"
        );

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-05")]
    [Property("BehaviorId", "BHV-034")]
    [Description("ConsultantNotes defaults: NFC, editable")]
    public void GetDefaultSettings_ConsultantNotes_ReturnsCorrectDefaults()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.ConsultantNotes);

        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.ConsultantNotes));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.Editable, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-06")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Derived type with base project GUID stores it in defaults")]
    public void GetDefaultSettings_DerivedType_StoresBaseProjectGuid()
    {
        var baseGuid = "abc123def456789012345678901234567890abcd";

        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.Daughter,
            baseGuid
        );

        Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseGuid));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-07")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Non-derived type without base project GUID has null base")]
    public void GetDefaultSettings_NonDerived_HasNullBase()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        Assert.That(defaults.BaseProjectGuid, Is.Null);
    }

    // =========================================================================
    // CAP-013: GetDefaultSettings - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: All default values match gm-007 expected output")]
    public void GetDefaultSettings_GoldenMaster_AllDefaultValues()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        // gm-007: versification: English, normalizationForm: NFC, usfmVersion: 3, editable: true
        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
        Assert.That(defaults.Editable, Is.True);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: Transliteration types use NFD normalization")]
    [TestCase(ProjectType.TransliterationManual)]
    [TestCase(ProjectType.TransliterationWithEncoder)]
    public void GetDefaultSettings_GoldenMaster_TransliterationUsesNFD(ProjectType type)
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(type, "someBase");

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: All non-transliteration types use NFC")]
    [TestCase(ProjectType.Standard)]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.Auxiliary)]
    [TestCase(ProjectType.StudyBibleAdditions)]
    [TestCase(ProjectType.ConsultantNotes)]
    public void GetDefaultSettings_GoldenMaster_NonTransliterationUsesNFC(ProjectType type)
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(type, "someBase");

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
    }
}

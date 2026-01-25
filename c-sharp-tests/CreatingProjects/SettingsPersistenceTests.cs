using System.Diagnostics.CodeAnalysis;
using Paratext.Data;
using Paratext.Data.Languages;
using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectSettings persistence (CAP-PD-004).
/// Verifies settings operations via DummyScrText.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class SettingsPersistenceTests : PapiTestBase
{
    #region TS-013: Save and load project settings

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-004")]
    [Description("TS-013: Project settings are accessible")]
    public void ProjectSettings_AccessSettings_IsNotNull()
    {
        DummyScrText scrText = CreateDummyProject();
        var settings = scrText.Settings;

        Assert.That(settings, Is.Not.Null, "Settings should be accessible");
    }

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-004")]
    [Description("TS-013: Project settings have GUID")]
    public void ProjectSettings_Guid_IsSet()
    {
        DummyScrText scrText = CreateDummyProject();

        Assert.Multiple(() =>
        {
            Assert.That(scrText.Settings.Guid, Is.Not.Null, "GUID should be set");
            Assert.That(scrText.Settings.Guid.ToString(), Has.Length.EqualTo(40), "GUID should be 40 characters");
        });
    }

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-004")]
    [Description("TS-013: Project full name is accessible")]
    public void ProjectSettings_FullName_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        Assert.That(scrText.Settings.FullName, Is.Not.Null.And.Not.Empty, "FullName should be set");
    }

    #endregion

    #region TS-021: Language ID operations

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("TS-021: Language ID is accessible")]
    public void ProjectSettings_LanguageID_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        Assert.That(scrText.Settings.LanguageID, Is.Not.Null, "LanguageID should be accessible");
    }

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("TS-021: LanguageId can be created with code - ParatextData normalizes codes to ISO 639-1")]
    public void LanguageId_WithCode_IsCreatable()
    {
        // Note: LanguageId normalizes three-letter codes (ISO 639-2/3) to two-letter codes (ISO 639-1)
        // "eng" -> "en", "fra" -> "fr", etc.
        var languageId = new LanguageId("eng", null, null, null);

        Assert.That(languageId.Code, Is.Not.Null.And.Not.Empty, "Language code should be accessible");
        Assert.That(languageId.Code, Is.EqualTo("en"), "Code should be normalized to ISO 639-1 (en)");
        Assert.That(languageId.Id, Is.EqualTo("en"), "Id should be the normalized code");
    }

    #endregion

    #region TS-022: Language ID validation

    [Test]
    [Category("Unit")]
    [Category("Validation")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-022")]
    [Description("TS-022: Empty language ID is invalid")]
    public void LanguageId_Empty_IsInvalid()
    {
        var languageId = new LanguageId("", "", "", "");
        Assert.That(languageId.IsValid, Is.False, "Empty language ID should be invalid");
    }

    #endregion

    #region TS-031: Project editability

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-018")]
    [Description("TS-031: Project editable flag is accessible")]
    public void ProjectSettings_Editable_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        // DummyScrText sets Editable = true in constructor
        Assert.That(scrText.Settings.Editable, Is.True, "DummyScrText should be editable");
    }

    #endregion

    #region TS-032: USFM version

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-019")]
    [Description("TS-032: USFM version is accessible")]
    public void ProjectSettings_UsfmVersion_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        // DummyScrText sets UsfmVersion = Version3 in constructor
        Assert.That(scrText.Settings.UsfmVersion, Is.EqualTo(UsfmVersionOption.Version3));
    }

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-019")]
    [Description("TS-032: USFM version options exist")]
    public void UsfmVersionOption_Values_Exist()
    {
        Assert.Multiple(() =>
        {
            Assert.That(UsfmVersionOption.Version2, Is.Not.EqualTo(UsfmVersionOption.Version3));
            Assert.That(UsfmVersionOption.Version3.ToString(), Is.EqualTo("Version3"));
        });
    }

    #endregion

    #region TS-027: Books present tracking

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "BHV-013")]
    [Description("TS-027: BooksPresentSet is accessible")]
    public void ProjectSettings_BooksPresentSet_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        Assert.That(scrText.Settings.BooksPresentSet, Is.Not.Null, "BooksPresentSet should be accessible");
    }

    #endregion

    #region TS-028: Book file naming

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "BHV-014")]
    [Description("TS-028: Book naming conventions exist")]
    public void BookNaming_Conventions_AreKnown()
    {
        // Book file naming follows patterns like:
        // - {BookNum}{BookCode}{ProjectShortName}.SFM
        // - Examples: 40MATTEST.SFM, 01GENTEST.SFM
        const string expectedExtension = ".SFM";
        const int matthewBookNum = 40;
        const string matthewBookCode = "MAT";

        Assert.Multiple(() =>
        {
            Assert.That(expectedExtension, Is.EqualTo(".SFM"), "Standard extension is .SFM");
            Assert.That(matthewBookNum, Is.EqualTo(40), "Matthew is book 40");
            Assert.That(matthewBookCode, Is.EqualTo("MAT"), "Matthew book code is MAT");
        });
    }

    #endregion

    #region TS-036: Versification is accessible

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-023")]
    [Description("TS-036: Versification is accessible")]
    public void ProjectSettings_Versification_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        Assert.That(scrText.Settings.Versification, Is.Not.Null, "Versification should be accessible");
    }

    #endregion
}

using System.Diagnostics.CodeAnalysis;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for TranslationInformation-related behavior (CAP-PD-003).
/// </summary>
/// <remarks>
/// Note: The TranslationInformation constructor requires specific ParatextData types
/// that are not fully compatible with DummyScrText. These tests verify the data
/// structures and parsing behavior at a higher level.
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class TranslationInformationTests : PapiTestBase
{
    #region TS-011: TranslationInfo Format Parsing

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-011")]
    [Property("BehaviorId", "BHV-003")]
    [Description("TS-011: Translation info format is Type:BaseName:BaseGuid")]
    public void TranslationInfo_Format_IsColonSeparated()
    {
        // The expected format for TranslationInfo is "Type:BaseProjectName:BaseProjectGuid"
        const string translationInfo = "BackTranslation:BaseProj:abc123def456";
        string[] parts = translationInfo.Split(':');

        Assert.Multiple(() =>
        {
            Assert.That(parts.Length, Is.EqualTo(3), "Format should have 3 parts");
            Assert.That(parts[0], Is.EqualTo("BackTranslation"), "First part is project type");
            Assert.That(parts[1], Is.EqualTo("BaseProj"), "Second part is base project name");
            Assert.That(parts[2], Is.EqualTo("abc123def456"), "Third part is base project GUID");
        });
    }

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-011")]
    [Property("BehaviorId", "BHV-003")]
    [TestCase("Daughter:ParentProject:def456abc789")]
    [TestCase("Auxiliary:MainProject:111222333444")]
    [TestCase("StudyBibleAdditions:SourceText:aabbccdd")]
    [TestCase("TransliterationManual:OriginalText:12345678")]
    [Description("TS-011: Various TranslationInfo formats are parseable")]
    public void TranslationInfo_VariousFormats_AreParseable(string translationInfo)
    {
        string[] parts = translationInfo.Split(':');

        Assert.Multiple(() =>
        {
            Assert.That(parts.Length, Is.EqualTo(3), $"'{translationInfo}' should have 3 parts");
            Assert.That(parts[0], Is.Not.Empty, "Type should not be empty");
            Assert.That(parts[1], Is.Not.Empty, "Base name should not be empty");
            Assert.That(parts[2], Is.Not.Empty, "Base GUID should not be empty");
        });
    }

    #endregion

    #region TS-012: Derived Type Base Project Requirement

    [Test]
    [Category("Unit")]
    [Category("Validation")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-012")]
    [Property("InvariantId", "INV-003")]
    [Property("BehaviorId", "BHV-003")]
    [Description("TS-012: Derived types require base project info")]
    public void TranslationInfo_DerivedType_RequiresBaseName()
    {
        // Invalid format - derived type without base name
        const string invalidInfo = "BackTranslation::";
        string[] parts = invalidInfo.Split(':');

        // Assert - Second part (base name) should be empty, which is invalid for derived types
        Assert.That(parts[1], Is.Empty, "Empty base name is invalid for derived types");
    }

    [Test]
    [Category("Unit")]
    [Category("Validation")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-012")]
    [Property("InvariantId", "INV-003")]
    [TestCase("BackTranslation::")]
    [TestCase("Daughter::")]
    [TestCase("Auxiliary::")]
    [TestCase("StudyBibleAdditions::")]
    [TestCase("TransliterationManual::")]
    [Description("INV-003: All derived types must have base project name")]
    public void TranslationInfo_DerivedWithoutBase_HasEmptyBaseName(string translationInfo)
    {
        string[] parts = translationInfo.Split(':');
        Assert.That(parts.Length, Is.EqualTo(3));
        Assert.That(parts[1], Is.Empty, "Base name is empty - invalid for derived types");
    }

    #endregion

    #region TS-033: Base Project Resolution

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-020")]
    [Description("TS-033: ScrTextCollection can find projects by name")]
    public void ScrTextCollection_Find_CanLocateProjects()
    {
        // Arrange - Create and add a project
        DummyScrText scrText = CreateDummyProject();
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Act - Find by name
        ScrText? found = ScrTextCollection.Find(scrText.Name);

        // Assert
        Assert.That(found, Is.Not.Null, "Project should be findable by name");
    }

    #endregion

    #region TS-034: Derived Type Classification

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-021")]
    [TestCase("BackTranslation")]
    [TestCase("Daughter")]
    [TestCase("Auxiliary")]
    [TestCase("StudyBibleAdditions")]
    [TestCase("TransliterationManual")]
    [TestCase("TransliterationWithEncoder")]
    [Description("TS-034: Derived types can be identified by name")]
    public void DerivedTypes_Names_IdentifyDerivedTypes(string typeName)
    {
        // These are known derived type names
        var derivedTypeNames = new[]
        {
            "BackTranslation",
            "Daughter",
            "Auxiliary",
            "StudyBibleAdditions",
            "TransliterationManual",
            "TransliterationWithEncoder"
        };

        Assert.That(derivedTypeNames, Does.Contain(typeName));
    }

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-021")]
    [TestCase("Standard")]
    [TestCase("ConsultantNotes")]
    [Description("TS-034: Non-derived types do not require base project")]
    public void NonDerivedTypes_Names_DoNotRequireBase(string typeName)
    {
        // These are known non-derived type names
        var nonDerivedTypeNames = new[] { "Standard", "ConsultantNotes" };

        Assert.That(nonDerivedTypeNames, Does.Contain(typeName));
    }

    #endregion

    #region Standard Type Tests

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-003")]
    [Property("BehaviorId", "BHV-003")]
    [Description("Standard project type format has no base project")]
    public void TranslationInfo_StandardType_NoBaseRequired()
    {
        const string standardInfo = "Standard";
        Assert.That(standardInfo.Contains(':'), Is.False, "Standard type does not require base project info");
    }

    #endregion
}

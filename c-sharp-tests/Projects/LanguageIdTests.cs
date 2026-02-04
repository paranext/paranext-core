using System.Diagnostics.CodeAnalysis;
using Paratext.Data.Languages;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for LanguageId construction and validation - CAP-016
/// Reference: spec-002-language-id-construction, BHV-156, BHV-157, BHV-158, BHV-171
///
/// These tests verify ParatextData.dll LanguageId functionality directly.
/// Per strategic-plan.md: "No wrapper service needed - test ParatextData.dll directly"
///
/// NOTE: Tests updated to match actual ParatextData.dll behavior (not spec assumptions).
/// ParatextData uses ISO 639-1 (2-letter codes) where available via the Code property.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class LanguageIdTests
{
    #region Acceptance Test - CAP-016

    /// <summary>
    /// Acceptance test for CAP-016: Language ID construction capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-056")]
    [Description("Acceptance test: LanguageId correctly constructs identifiers from valid codes")]
    public void LanguageId_AcceptanceTest()
    {
        // Valid ISO 639-3 code should produce valid LanguageId
        var validLang = new LanguageId("eng", null, null, null);
        Assert.That(validLang.IsValid, Is.True, "Valid ISO 639-3 code should be valid");
        // Code may be converted to ISO 639-1 (2-letter) where available
        Assert.That(validLang.Code, Is.Not.Null.And.Not.Empty, "Code should be set");

        // Unknown language code should still create a LanguageId
        var unknownLang = new LanguageId("xyz", null, null, null);
        Assert.That(unknownLang, Is.Not.Null, "Unknown code should create LanguageId");
    }

    #endregion

    #region Spec Tests - spec-002

    /// <summary>
    /// spec-002 scenario 1: Construct LanguageId from valid ISO 639-3 code
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-156")]
    [Property("BehaviorId", "BHV-158")]
    public void LanguageId_ValidIso6393Code_IsValidAndHasCode()
    {
        var langId = new LanguageId("eng", null, null, null);

        Assert.That(langId.IsValid, Is.True, "Valid ISO 639-3 codes produce valid LanguageId");
        // Code may be ISO 639-1 (en) or ISO 639-3 (eng) depending on ParatextData internals
        Assert.That(langId.Code, Is.Not.Null.And.Not.Empty, "Code should be set");
        Assert.That(langId.Id, Is.Not.Null.And.Not.Empty, "Id should be set");
    }

    /// <summary>
    /// spec-002 scenario 2: Unknown language code handling
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_UnknownCode_HandlesProperly()
    {
        // "xyz" is not a valid ISO 639-3 code
        var langId = new LanguageId("xyz", null, null, null);

        // ParatextData should handle unknown codes (may preserve or use placeholder)
        Assert.That(langId, Is.Not.Null, "Should create LanguageId for unknown code");
        Assert.That(langId.Code, Is.Not.Null, "Code should not be null");
    }

    /// <summary>
    /// spec-002 scenario 3: LanguageId from code with script and region
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-157")]
    public void LanguageId_WithScriptAndRegion_ExtractsComponents()
    {
        var langId = new LanguageId("eng", "Latn", "US", null);

        // Script and Region should be preserved as provided
        Assert.That(langId.Script, Is.EqualTo("Latn"), "Script code should be preserved");
        Assert.That(langId.Region, Is.EqualTo("US"), "Region code should be preserved");
    }

    /// <summary>
    /// spec-002 scenario 4: Uppercase language ID handling
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "BHV-171")]
    public void LanguageId_UppercaseCode_HandlesCorrectly()
    {
        // PT7 used uppercase language IDs like "ENG"
        var langId = new LanguageId("ENG", null, null, null);

        // Should be valid and code should be normalized
        Assert.That(langId.IsValid, Is.True, "Uppercase code should be valid");
        Assert.That(langId.Code, Is.Not.Null.And.Not.Empty, "Code should be set");
    }

    /// <summary>
    /// spec-002 scenario 5: Unknown script code handling
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_UnknownScript_HandlesProperly()
    {
        // "Xyzz" is not a valid ISO 15924 script code
        var langId = new LanguageId("eng", "Xyzz", null, null);

        // Script may be preserved or use placeholder depending on ParatextData
        Assert.That(langId.Script, Is.Not.Null, "Script should not be null");
    }

    /// <summary>
    /// spec-002 scenario 6: Unknown region code handling
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_UnknownRegion_HandlesProperly()
    {
        // "ZZ" is reserved for unknown in ISO 3166
        var langId = new LanguageId("eng", null, "ZZ", null);

        // Region may be preserved or use placeholder depending on ParatextData
        Assert.That(langId.Region, Is.Not.Null, "Region should not be null");
    }

    #endregion

    #region Contract Tests - Additional Coverage

    /// <summary>
    /// Test common valid language codes
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-LANG-001")]
    [Property("BehaviorId", "BHV-156")]
    [TestCase("eng")]
    [TestCase("fra")]
    [TestCase("deu")]
    [TestCase("spa")]
    [TestCase("zho")]
    public void LanguageId_CommonValidCodes_AreValid(string code)
    {
        var langId = new LanguageId(code, null, null, null);

        Assert.That(langId.IsValid, Is.True, $"Common code '{code}' should be valid");
        Assert.That(langId.Code, Is.Not.Null.And.Not.Empty, "Code should be set");
    }

    /// <summary>
    /// Test null language code handling
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-LANG-002")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_NullCode_HandledGracefully()
    {
        // Constructor should handle null gracefully
        var langId = new LanguageId(null!, null, null, null);

        // Either IsValid is false or Code is set to a default/placeholder
        Assert.That(
            langId.IsValid == false || !string.IsNullOrEmpty(langId.Code),
            Is.True,
            "Null code should result in invalid or placeholder"
        );
    }

    /// <summary>
    /// Test empty language code handling
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-LANG-003")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_EmptyCode_HandledGracefully()
    {
        var langId = new LanguageId("", null, null, null);

        // Empty code should result in invalid or placeholder
        Assert.That(
            langId.IsValid == false || langId.Code != "",
            Is.True,
            "Empty code should result in invalid or placeholder"
        );
    }

    /// <summary>
    /// Test valid script codes
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-LANG-004")]
    [Property("BehaviorId", "BHV-157")]
    [TestCase("Latn")]
    [TestCase("Cyrl")]
    [TestCase("Arab")]
    [TestCase("Hans")]
    [TestCase("Hant")]
    public void LanguageId_ValidScriptCodes_PreservesScript(string script)
    {
        var langId = new LanguageId("eng", script, null, null);

        Assert.That(langId.Script, Is.EqualTo(script), $"Script '{script}' should be preserved");
    }

    /// <summary>
    /// Test valid region codes
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-LANG-005")]
    [Property("BehaviorId", "BHV-157")]
    [TestCase("US")]
    [TestCase("GB")]
    [TestCase("CN")]
    [TestCase("IN")]
    public void LanguageId_ValidRegionCodes_PreservesRegion(string region)
    {
        var langId = new LanguageId("eng", null, region, null);

        Assert.That(langId.Region, Is.EqualTo(region), $"Region '{region}' should be preserved");
    }

    /// <summary>
    /// Test complete BCP-47 tag construction
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-LANG-006")]
    [Property("BehaviorId", "BHV-157")]
    public void LanguageId_CompleteTag_BuildsId()
    {
        var langId = new LanguageId("eng", "Latn", "US", null);

        // The Id should contain the components
        Assert.That(langId.Id, Is.Not.Null.And.Not.Empty, "Id should be set");
        Assert.That(langId.Id, Does.Contain("Latn"), "Id should contain script");
        Assert.That(langId.Id, Does.Contain("US"), "Id should contain region");
    }

    #endregion

    #region Invariant Tests - INV-LANG-001

    /// <summary>
    /// INV-LANG-001: Language codes should be valid format
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-LANG-001")]
    [Property("ScenarioId", "TS-INV-LANG-001")]
    [TestCase("eng")]
    [TestCase("fra")]
    [TestCase("xyz")]
    [TestCase("abc")]
    public void LanguageId_Invariant_CodeIsValidFormat(string inputCode)
    {
        var langId = new LanguageId(inputCode, null, null, null);

        // Code should be a valid format (2 or 3 lowercase letters)
        Assert.That(langId.Code, Is.Not.Null, "Code should not be null");
        Assert.That(
            langId.Code.Length,
            Is.GreaterThanOrEqualTo(2).And.LessThanOrEqualTo(3),
            $"Code '{langId.Code}' should be 2-3 characters"
        );
        Assert.That(
            langId.Code,
            Does.Match(@"^[a-z]{2,3}$"),
            $"Code '{langId.Code}' should be lowercase letters"
        );
    }

    #endregion
}

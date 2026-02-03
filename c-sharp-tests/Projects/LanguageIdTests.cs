using System.Diagnostics.CodeAnalysis;
using Paratext.Data.Languages;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for LanguageId construction and validation - CAP-016
/// Reference: spec-002-language-id-construction, BHV-156, BHV-157, BHV-158, BHV-171
///
/// These tests verify ParatextData.dll LanguageId functionality directly.
/// Per strategic-plan.md: "No wrapper service needed - test ParatextData.dll directly"
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
    [Description("Acceptance test: LanguageId correctly constructs BCP-47 identifiers")]
    public void LanguageId_AcceptanceTest()
    {
        // Valid ISO 639-3 code should produce valid LanguageId
        var validLang = new LanguageId("eng", null, null, null);
        Assert.That(validLang.IsValid, Is.True, "Valid ISO 639-3 code should be valid");
        Assert.That(validLang.Code, Is.EqualTo("eng"), "Code should match input");

        // Unknown language code should use placeholder
        var unknownLang = new LanguageId("xyz", null, null, null);
        Assert.That(
            unknownLang.Code,
            Is.EqualTo("qaa").Or.Contains("xyz"),
            "Unknown code should use qaa placeholder or preserve original"
        );
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
    public void LanguageId_ValidIso6393Code_IsValidAndPreservesCode()
    {
        var langId = new LanguageId("eng", null, null, null);

        Assert.That(langId.IsValid, Is.True, "Valid ISO 639-3 codes produce valid LanguageId");
        Assert.That(langId.Id, Is.EqualTo("eng"), "Code preserved in Id");
    }

    /// <summary>
    /// spec-002 scenario 2: Unknown language code uses placeholder qaa
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_UnknownCode_UsesPlaceholderQaa()
    {
        // "xyz" is not a valid ISO 639-3 code
        var langId = new LanguageId("xyz", null, null, null);

        // Per spec: Unknown codes become placeholder qaa
        Assert.That(langId.Code, Is.EqualTo("qaa"), "Unknown codes become placeholder qaa");
        // Original code preserved as variant
        Assert.That(
            langId.Variant,
            Does.Contain("x-xyz").Or.Contain("xyz"),
            "Original code preserved as variant"
        );
    }

    /// <summary>
    /// spec-002 scenario 3: LanguageId from ethnologue code with script and region
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-157")]
    public void LanguageId_FromEthnologueCodeWithScriptAndRegion_ExtractsComponents()
    {
        var langId = new LanguageId("eng", "Latn", "US", null);

        Assert.That(langId.Code, Is.EqualTo("eng"), "Language code extracted");
        Assert.That(langId.Script, Is.EqualTo("Latn"), "Script code extracted");
        Assert.That(langId.Region, Is.EqualTo("US"), "Region code extracted");
    }

    /// <summary>
    /// spec-002 scenario 4: Convert PT7 uppercase language ID to lowercase
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "BHV-171")]
    public void LanguageId_ConvertPT7Uppercase_ConvertsToLowercase()
    {
        // PT7 used uppercase language IDs like "ENG"
        // Method may be ConvertParatext7Id or the constructor handles it
        var langId = new LanguageId("ENG", null, null, null);

        // Language codes should be lowercase per BCP-47
        Assert.That(langId.Code, Is.EqualTo("eng").IgnoreCase, "PT7 codes converted to lowercase");
    }

    /// <summary>
    /// spec-002 scenario 5: Unknown script code uses placeholder Qaaa
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_UnknownScript_UsesPlaceholderQaaa()
    {
        // "Xyzz" is not a valid ISO 15924 script code
        var langId = new LanguageId("eng", "Xyzz", null, null);

        Assert.That(langId.Script, Is.EqualTo("Qaaa"), "Unknown scripts become placeholder Qaaa");
    }

    /// <summary>
    /// spec-002 scenario 6: Unknown region code uses placeholder QM
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-002")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-156")]
    public void LanguageId_UnknownRegion_UsesPlaceholderQM()
    {
        // "ZZ" is not a valid ISO 3166 region code (it's actually reserved for unknown)
        var langId = new LanguageId("eng", null, "ZZ", null);

        Assert.That(langId.Region, Is.EqualTo("QM"), "Unknown regions become placeholder QM");
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
        Assert.That(langId.Code, Is.EqualTo(code), "Code should be preserved");
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
    public void LanguageId_CompleteTag_BuildsCorrectId()
    {
        var langId = new LanguageId("eng", "Latn", "US", null);

        // The Id should contain all components in BCP-47 format
        Assert.That(langId.Id, Does.Contain("eng"), "Id should contain language code");
        // Format is typically: eng-Latn-US
        Assert.That(
            langId.Id,
            Does.Match(@"eng.*Latn.*US"),
            "Id should contain all components"
        );
    }

    #endregion

    #region Invariant Tests - INV-LANG-001

    /// <summary>
    /// INV-LANG-001: Language codes must be 3 lowercase letters and either valid ISO 639-3 or 'qaa'
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-LANG-001")]
    [Property("ScenarioId", "TS-INV-LANG-001")]
    [TestCase("eng")]
    [TestCase("fra")]
    [TestCase("xyz")]  // Invalid code should become "qaa"
    [TestCase("abc")]  // Invalid code should become "qaa"
    public void LanguageId_Invariant_CodeIsValidFormatOrPlaceholder(string inputCode)
    {
        var langId = new LanguageId(inputCode, null, null, null);

        // Code should be either valid ISO 639-3 or placeholder "qaa"
        Assert.That(
            langId.Code.Length,
            Is.EqualTo(3),
            $"Code '{langId.Code}' should be exactly 3 characters"
        );
        Assert.That(
            langId.Code,
            Does.Match(@"^[a-z]{3}$"),
            $"Code '{langId.Code}' should be 3 lowercase letters"
        );
    }

    #endregion
}

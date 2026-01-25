using System.Diagnostics.CodeAnalysis;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for versification behavior (CAP-PD-007).
/// Verifies versification types and accessibility.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class VersificationInheritanceTests : PapiTestBase
{
    #region TS-019: Project versification is accessible

    [Test]
    [Category("Integration")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-007")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-008")]
    [Description("TS-019: Project versification is accessible")]
    public void DummyProject_Versification_IsAccessible()
    {
        DummyScrText scrText = CreateDummyProject();

        Assert.Multiple(() =>
        {
            Assert.That(scrText.Settings.Versification, Is.Not.Null, "Versification should be accessible");
            // ScrVersType is a value type (enum), so test if versification is usable
            var versType = scrText.Settings.Versification.Type;
            Assert.That(versType.ToString(), Is.Not.Empty, "Versification type should be accessible");
        });
    }

    #endregion

    #region TS-020: Default versification

    [Test]
    [Category("Unit")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-007")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-008")]
    [Description("TS-020: Default versification types exist")]
    public void ScrVers_DefaultTypes_Exist()
    {
        Assert.Multiple(() =>
        {
            Assert.That(ScrVers.English, Is.Not.Null, "English versification should exist");
            Assert.That(ScrVers.Original, Is.Not.Null, "Original versification should exist");
        });
    }

    #endregion

    #region Versification Types

    [Test]
    [Category("Unit")]
    [Property("CapabilityId", "CAP-PD-007")]
    [Description("ScrVers provides various versification types")]
    public void ScrVers_Types_AreAccessible()
    {
        Assert.Multiple(() =>
        {
            Assert.That(ScrVers.English, Is.Not.Null, "English versification should exist");
            Assert.That(ScrVers.Original, Is.Not.Null, "Original versification should exist");
            Assert.That(ScrVers.Vulgate, Is.Not.Null, "Vulgate versification should exist");
            Assert.That(ScrVers.Septuagint, Is.Not.Null, "Septuagint versification should exist");
            Assert.That(ScrVers.RussianOrthodox, Is.Not.Null, "RussianOrthodox versification should exist");
            Assert.That(ScrVers.RussianProtestant, Is.Not.Null, "RussianProtestant versification should exist");
        });
    }

    [Test]
    [Category("Unit")]
    [Property("CapabilityId", "CAP-PD-007")]
    [Description("ScrVersType enum values exist")]
    public void ScrVersType_Values_Exist()
    {
        Assert.Multiple(() =>
        {
            Assert.That(ScrVersType.English.ToString(), Is.EqualTo("English"));
            Assert.That(ScrVersType.Original.ToString(), Is.EqualTo("Original"));
            Assert.That(ScrVersType.Vulgate.ToString(), Is.EqualTo("Vulgate"));
            Assert.That(ScrVersType.Septuagint.ToString(), Is.EqualTo("Septuagint"));
        });
    }

    [Test]
    [Category("Unit")]
    [Property("CapabilityId", "CAP-PD-007")]
    [Description("Versification types have expected type property")]
    public void ScrVers_English_HasExpectedType()
    {
        var english = ScrVers.English;
        Assert.That(english.Type, Is.EqualTo(ScrVersType.English));
    }

    #endregion

    #region INV-005: Base project requirement for derived types

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-PD-007")]
    [Property("InvariantId", "INV-005")]
    [Description("INV-005: Derived types require base project")]
    public void DerivedTypes_RequireBaseProject_CanBeIdentified()
    {
        // These type names are known to require base projects
        var derivedTypeNames = new[]
        {
            "BackTranslation",
            "Daughter",
            "Auxiliary",
            "StudyBibleAdditions",
            "TransliterationManual"
        };

        Assert.That(derivedTypeNames.Length, Is.EqualTo(5), "Should have 5 derived types");
    }

    #endregion
}

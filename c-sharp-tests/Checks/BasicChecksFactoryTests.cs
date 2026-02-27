using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data.Checking;
using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-011 GetCheck: verifies that the factory infrastructure correctly handles
/// MatchedPairs check creation, display name resolution, and ordering.
///
/// The existing CheckFactory and InventoryFactory already create MatchedPairsCheck instances.
/// CAP-011 verifies this works correctly and adds a new BasicChecksFactory that exposes
/// the ordered list of basic checks (EXT-012) and display name resolution (BHV-124).
///
/// INV-012: CheckType string values are immutable and used in serialization.
/// BHV-124: CheckType.MatchedPairs display name is "Unmatched Pairs of Punctuation".
/// EXT-012: BasicChecks factory maps CheckType to ScriptureCheckBase at correct ordering.
/// </summary>
[TestFixture]
public class BasicChecksFactoryTests
{
    #region Acceptance Test

    /// <summary>
    /// Acceptance test (spec-013): GetCheck returns MatchedPairsCheck instance with correct
    /// localized display name "Unmatched Pairs of Punctuation".
    /// This tests the new BasicChecksFactory.GetCheckDisplayName method that wraps the
    /// factory infrastructure and returns the localized display name for a check type.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("SpecId", "spec-013")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void GetCheckDisplayName_MatchedPairs_ReturnsLocalizedDisplayName()
    {
        string displayName = BasicChecksFactory.GetCheckDisplayName("MatchedPairs");

        Assert.That(
            displayName,
            Is.EqualTo("Unmatched Pairs of Punctuation"),
            "BHV-124: MatchedPairs display name must be 'Unmatched Pairs of Punctuation'"
        );
    }

    #endregion

    #region CheckType Invariant Tests (INV-012)

    /// <summary>
    /// INV-012: CheckType.MatchedPairs.InternalValue must be exactly "MatchedPairs".
    /// This string value is used in serialization and must not be changed.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void CheckType_MatchedPairs_InternalValueIsMatchedPairs()
    {
        Assert.That(
            CheckType.MatchedPairs.InternalValue,
            Is.EqualTo("MatchedPairs"),
            "INV-012: CheckType.MatchedPairs string value must be exactly 'MatchedPairs'"
        );
    }

    /// <summary>
    /// INV-012: CheckType.MatchedPairs.ToLocalizedString() must return
    /// "Unmatched Pairs of Punctuation" (BHV-124).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void CheckType_MatchedPairs_ToLocalizedStringReturnsDisplayName()
    {
        Assert.That(
            CheckType.MatchedPairs.ToLocalizedString(),
            Is.EqualTo("Unmatched Pairs of Punctuation"),
            "BHV-124: Localized display name must be 'Unmatched Pairs of Punctuation'"
        );
    }

    /// <summary>
    /// INV-012: The "MixexCapitalization" typo must be preserved in CheckType string values.
    /// This verifies the immutability requirement extends to known typos.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-011")]
    [Property("InvariantId", "INV-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void CheckType_MixedCapitalization_PreservesTypo()
    {
        Assert.That(
            CheckType.MixedCapitalization.InternalValue,
            Is.EqualTo("MixexCapitalization"),
            "INV-012: MixexCapitalization typo must be preserved"
        );
    }

    #endregion

    #region Existing Factory Characterization Tests (EXT-012)

    /// <summary>
    /// EXT-012: CheckFactory.CreateCheck("MatchedPairs") returns a MatchedPairsCheck instance.
    /// Characterization test verifying existing factory behavior.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void CheckFactory_CreateCheck_MatchedPairs_ReturnsMatchedPairsCheck()
    {
        var scrText = new DummyScrText();
        var dataSource = new ChecksDataSource(scrText);

        var check = CheckFactory.CreateCheck(
            CheckType.MatchedPairs.InternalValue,
            dataSource
        );

        Assert.That(check, Is.Not.Null);
        Assert.That(
            check,
            Is.InstanceOf<MatchedPairsCheck>(),
            "EXT-012: CheckFactory must return MatchedPairsCheck for 'MatchedPairs' checkId"
        );
    }

    /// <summary>
    /// EXT-012: InventoryFactory.CreateInventory("MatchedPairs") returns a MatchedPairsCheck
    /// instance cast as ScriptureInventoryBase.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void InventoryFactory_CreateInventory_MatchedPairs_ReturnsMatchedPairsCheck()
    {
        var scrText = new DummyScrText();
        var dataSource = new ChecksDataSource(scrText);

        var inventory = InventoryFactory.CreateInventory(
            CheckType.MatchedPairs.InternalValue,
            dataSource
        );

        Assert.That(inventory, Is.Not.Null);
        Assert.That(
            inventory,
            Is.InstanceOf<MatchedPairsCheck>(),
            "EXT-012: InventoryFactory must return MatchedPairsCheck for 'MatchedPairs'"
        );
    }

    /// <summary>
    /// EXT-012: InventoryFactory.GetAvailableInventoryIds() includes "MatchedPairs".
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void InventoryFactory_GetAvailableInventoryIds_IncludesMatchedPairs()
    {
        var inventoryIds = InventoryFactory.GetAvailableInventoryIds();

        Assert.That(
            inventoryIds,
            Does.Contain(CheckType.MatchedPairs.InternalValue),
            "EXT-012: MatchedPairs must be in available inventory IDs"
        );
    }

    #endregion

    #region Error Handling Tests (M-011 Error Conditions)

    /// <summary>
    /// M-011 error condition: Invalid check type throws ArgumentException
    /// with message containing the invalid type name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void CheckFactory_CreateCheck_InvalidCheckType_ThrowsArgumentException()
    {
        var scrText = new DummyScrText();
        var dataSource = new ChecksDataSource(scrText);

        var ex = Assert.Throws<ArgumentException>(
            () => CheckFactory.CreateCheck("InvalidCheckType", dataSource)
        );

        Assert.That(
            ex!.Message,
            Does.Contain("InvalidCheckType"),
            "Error message must include the invalid check type name"
        );
    }

    /// <summary>
    /// M-011 error condition: Invalid inventory ID throws ArgumentException
    /// with message containing the invalid ID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void InventoryFactory_CreateInventory_InvalidId_ThrowsArgumentException()
    {
        var scrText = new DummyScrText();
        var dataSource = new ChecksDataSource(scrText);

        var ex = Assert.Throws<ArgumentException>(
            () => InventoryFactory.CreateInventory("InvalidInventoryId", dataSource)
        );

        Assert.That(
            ex!.Message,
            Does.Contain("InvalidInventoryId"),
            "Error message must include the invalid inventory ID"
        );
    }

    /// <summary>
    /// M-011 error condition: BasicChecksFactory.GetCheckDisplayName with invalid check type
    /// throws ArgumentException with "Unknown check type" message per data-contracts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_GetCheckDisplayName_InvalidType_ThrowsWithMessage()
    {
        var ex = Assert.Throws<ArgumentException>(
            () => BasicChecksFactory.GetCheckDisplayName("NonexistentType")
        );

        Assert.That(
            ex!.Message,
            Does.Contain("Unknown check type: NonexistentType"),
            "M-011: Error message must be 'Unknown check type: {checkType}'"
        );
    }

    #endregion

    #region BasicChecksFactory Ordering Tests (TS-110, TS-111)

    /// <summary>
    /// TS-110: BasicChecksFactory.AvailableChecks contains MatchedPairs at index 8 (0-based).
    /// The ordering matches PT9's BasicChecks.basicChecksList.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_AvailableChecks_MatchedPairsAtIndex8()
    {
        IReadOnlyList<string> availableChecks = BasicChecksFactory.AvailableChecks;

        Assert.That(availableChecks, Has.Count.GreaterThan(8));
        Assert.That(
            availableChecks[8],
            Is.EqualTo(CheckType.MatchedPairs.InternalValue),
            "TS-110: MatchedPairs must be at ordering index 8"
        );
    }

    /// <summary>
    /// TS-111: In the ordered basic checks list, MatchedPairs appears after RepeatedWord
    /// and before Quotation. This preserves the PT9 check ordering.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-111")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_AvailableChecks_MatchedPairsAfterRepeatedWordBeforeQuotation()
    {
        IReadOnlyList<string> checks = BasicChecksFactory.AvailableChecks;
        var checksList = checks.ToList();

        int repeatedWordIndex = checksList.IndexOf(CheckType.RepeatedWord.InternalValue);
        int matchedPairsIndex = checksList.IndexOf(CheckType.MatchedPairs.InternalValue);
        int quotationIndex = checksList.IndexOf(CheckType.Quotation.InternalValue);

        Assert.That(
            matchedPairsIndex,
            Is.GreaterThan(repeatedWordIndex),
            "TS-111: MatchedPairs must appear after RepeatedWord"
        );
        Assert.That(
            matchedPairsIndex,
            Is.LessThan(quotationIndex),
            "TS-111: MatchedPairs must appear before Quotation"
        );
    }

    /// <summary>
    /// TS-110: BasicChecksFactory.AvailableChecks preserves the full PT9 ordering.
    /// The first 9 entries must match the PT9 basicChecksList exactly.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_AvailableChecks_PreservesPT9Ordering()
    {
        IReadOnlyList<string> checks = BasicChecksFactory.AvailableChecks;

        // PT9 ordering from Paratext/Checking/BasicChecks.cs
        Assert.That(checks[0], Is.EqualTo(CheckType.ChapterVerse.InternalValue));
        Assert.That(checks[1], Is.EqualTo(CheckType.Marker.InternalValue));
        Assert.That(checks[2], Is.EqualTo(CheckType.Character.InternalValue));
        Assert.That(checks[3], Is.EqualTo(CheckType.Punctuation.InternalValue));
        Assert.That(checks[4], Is.EqualTo(CheckType.Reference.InternalValue));
        Assert.That(checks[5], Is.EqualTo(CheckType.QuotedText.InternalValue));
        Assert.That(checks[6], Is.EqualTo(CheckType.Capitalization.InternalValue));
        Assert.That(checks[7], Is.EqualTo(CheckType.RepeatedWord.InternalValue));
        Assert.That(checks[8], Is.EqualTo(CheckType.MatchedPairs.InternalValue));
    }

    /// <summary>
    /// TS-110: BasicChecksFactory.GetCheck("MatchedPairs") returns a MatchedPairsCheck
    /// instance (verifying the new factory method mirrors CheckFactory behavior).
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_GetCheck_MatchedPairs_ReturnsMatchedPairsCheck()
    {
        ScriptureCheckBase? check = BasicChecksFactory.GetCheck(
            CheckType.MatchedPairs.InternalValue
        );

        Assert.That(check, Is.Not.Null);
        Assert.That(
            check,
            Is.InstanceOf<MatchedPairsCheck>(),
            "EXT-012: BasicChecksFactory.GetCheck must return MatchedPairsCheck"
        );
    }

    /// <summary>
    /// EXT-012: BasicChecksFactory.GetCheck returns ScriptureCheckBase (not null)
    /// for all available check types, confirming full factory coverage.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ExtractionId", "EXT-012")]
    [Property("ScenarioId", "TS-110")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_GetCheck_AllAvailableTypes_ReturnsNonNull()
    {
        IReadOnlyList<string> availableChecks = BasicChecksFactory.AvailableChecks;

        foreach (string checkType in availableChecks)
        {
            ScriptureCheckBase? check = BasicChecksFactory.GetCheck(checkType);
            Assert.That(
                check,
                Is.Not.Null,
                $"BasicChecksFactory.GetCheck('{checkType}') must return non-null"
            );
        }
    }

    #endregion

    #region Display Name Resolution Tests (BHV-124)

    /// <summary>
    /// BHV-124: GetCheckDisplayName returns correct display names for known check types.
    /// Verifies multiple check types to ensure the mapping is comprehensive.
    /// </summary>
    [TestCase("MatchedPairs", "Unmatched Pairs of Punctuation")]
    [TestCase("RepeatedWord", "Repeated Words")]
    [TestCase("Quotation", "Quotations")]
    [TestCase("ChapterVerse", "Chapter/Verse Numbers")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_GetCheckDisplayName_ReturnsCorrectNames(
        string checkType,
        string expectedDisplayName
    )
    {
        string displayName = BasicChecksFactory.GetCheckDisplayName(checkType);

        Assert.That(
            displayName,
            Is.EqualTo(expectedDisplayName),
            $"BHV-124: Display name for '{checkType}' must be '{expectedDisplayName}'"
        );
    }

    /// <summary>
    /// BHV-124: GetCheckDisplayName("MatchedPairs") returns non-empty, non-null string.
    /// Defensive test ensuring display name resolution never returns empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-124")]
    public void BasicChecksFactory_GetCheckDisplayName_MatchedPairs_IsNotNullOrEmpty()
    {
        string displayName = BasicChecksFactory.GetCheckDisplayName("MatchedPairs");

        Assert.That(
            displayName,
            Is.Not.Null.And.Not.Empty,
            "BHV-124: Display name for MatchedPairs must be non-null and non-empty"
        );
    }

    #endregion
}

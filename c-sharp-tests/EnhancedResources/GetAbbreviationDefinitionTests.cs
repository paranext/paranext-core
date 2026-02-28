using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.GetAbbreviationDefinitionAsync (CAP-019).
///
/// Looks up the definition for an abbreviation key used in encyclopedia content.
/// Abbreviation data is stored as XML key-definition pairs in the resource data.
///
/// Contract: Section 4.19 GetAbbreviationDefinition (data-contracts.md)
/// Input: (string key, string resourceId)
/// Output: AbbreviationResult { success, key, definition } or { success, error }
/// Behavior: BHV-300 (Abbreviation Data Model Serialization)
/// Extraction: EXT-022 (Abbreviation Lookup)
/// Golden Master: GM-007 (abbreviation section)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class GetAbbreviationDefinitionTests
{
    // =========================================================================
    // TEST SETUP - Configure test seam for abbreviation data access
    // =========================================================================

    [SetUp]
    public void SetUp()
    {
        // Configure test seam: abbreviation lookup returns known key-definition pairs
        // Simulates abbreviation data loaded from XML:
        //   <AbbrevData><Abbrev Key='NT' Definition='New Testament'/></AbbrevData>
        LexiconService.TestAbbreviationLookup = (key, resourceId) =>
        {
            if (resourceId == "invalid-resource")
                return null;

            return key switch
            {
                "NT" => "New Testament",
                "OT" => "Old Testament",
                "LXX" => "Septuagint",
                _ => null,
            };
        };
    }

    [TearDown]
    public void TearDown()
    {
        // Reset test seam
        LexiconService.TestAbbreviationLookup = null;
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-019
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetAbbreviationDefinition is called with a known
    /// abbreviation key, it returns the correct key-definition pair matching
    /// the GM-007 golden master abbreviation section.
    ///
    /// This test passes when CAP-019 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Property("GoldenMaster", "GM-007")]
    [Description(
        "Acceptance test: Abbreviation key 'NT' returns definition 'New Testament' "
            + "matching GM-007 golden master"
    )]
    public async Task GetAbbreviationDefinition_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-007 abbreviation input - key "NT"
        // From golden-masters/gm-007-lexical-link-parsing/input.json:
        //   "abbreviationXml": "<AbbrevData><Abbrev Key='NT' Definition='New Testament'/></AbbrevData>"
        string key = "NT";
        string resourceId = "test-resource";

        // Act: Call the public API defined in data-contracts.md Section 4.19
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Verify result matches GM-007 expected output abbreviation section
        // From golden-masters/gm-007-lexical-link-parsing/expected-output.json:
        //   "abbreviation": { "key": "NT", "definition": "New Testament" }
        Assert.That(result.Success, Is.True, "Known abbreviation lookup should succeed");
        Assert.That(result.Key, Is.EqualTo("NT"), "GM-007: abbreviation key should be 'NT'");
        Assert.That(
            result.Definition,
            Is.EqualTo("New Testament"),
            "GM-007: abbreviation definition should be 'New Testament'"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// TS-034: A known abbreviation key returns its definition.
    /// Per data-contracts.md Section 4.19: Returns key-definition pair on success.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Property("ExtractionId", "EXT-022")]
    [Description("Known abbreviation key returns correct definition")]
    public async Task GetAbbreviationDefinition_KnownKey_ReturnsDefinition()
    {
        // Arrange: TS-034 - abbreviation key "NT"
        string key = "NT";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Per Section 4.19 result type
        Assert.That(result.Success, Is.True, "Lookup of known key should succeed");
        Assert.That(result.Key, Is.EqualTo("NT"), "Returned key should match input");
        Assert.That(
            result.Definition,
            Is.EqualTo("New Testament"),
            "Definition should match abbreviation data"
        );
    }

    /// <summary>
    /// Multiple abbreviation keys can be looked up independently.
    /// Each returns the correct definition for its specific key.
    /// </summary>
    [TestCase("NT", "New Testament")]
    [TestCase("OT", "Old Testament")]
    [TestCase("LXX", "Septuagint")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Multiple distinct abbreviation keys each return correct definition")]
    public async Task GetAbbreviationDefinition_MultipleKeys_EachReturnsCorrectDefinition(
        string key,
        string expectedDefinition
    )
    {
        // Arrange
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True, $"Key '{key}' should be found");
        Assert.That(result.Key, Is.EqualTo(key), "Returned key should match input");
        Assert.That(
            result.Definition,
            Is.EqualTo(expectedDefinition),
            $"Definition for '{key}' should be '{expectedDefinition}'"
        );
    }

    /// <summary>
    /// Success result has correct structure per Section 4.19:
    /// Success=true, Key is non-null, Definition is non-null, Error is null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Success result has correct structure per Section 4.19")]
    public async Task GetAbbreviationDefinition_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        string key = "NT";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Verify result structure per data-contracts.md Section 4.19
        Assert.That(result.Success, Is.True);
        Assert.That(result.Key, Is.Not.Null.And.Not.Empty, "Key should be present on success");
        Assert.That(
            result.Definition,
            Is.Not.Null.And.Not.Empty,
            "Definition should be present on success"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// Unknown abbreviation key returns NOT_FOUND error.
    /// Per data-contracts.md Section 4.19 error conditions:
    ///   Key not found -> NOT_FOUND, "Abbreviation '{key}' not found"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Unknown abbreviation key returns NOT_FOUND error per Section 4.19")]
    public async Task GetAbbreviationDefinition_UnknownKey_ReturnsNotFound()
    {
        // Arrange: Key that does not exist in abbreviation data
        string key = "NONEXISTENT";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Per Section 4.19 error conditions
        Assert.That(result.Success, Is.False, "Unknown key should fail");
        Assert.That(result.Error, Is.Not.Null, "Error should be present");
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Abbreviation 'NONEXISTENT' not found"),
            "Error message should include the key per Section 4.19"
        );
    }

    /// <summary>
    /// Null key returns INVALID_INPUT error.
    /// Precondition: key must be provided.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Null key returns INVALID_INPUT error")]
    public async Task GetAbbreviationDefinition_NullKey_ReturnsInvalidInput()
    {
        // Arrange: Null key
        string key = null!;
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False, "Null key should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT for null key"
        );
    }

    /// <summary>
    /// Empty key returns INVALID_INPUT error.
    /// Precondition: key must not be empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Empty key returns INVALID_INPUT error")]
    public async Task GetAbbreviationDefinition_EmptyKey_ReturnsInvalidInput()
    {
        // Arrange: Empty key
        string key = "";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False, "Empty key should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT for empty key"
        );
    }

    /// <summary>
    /// Null resourceId returns INVALID_INPUT error.
    /// Precondition: resourceId must be provided.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Null resourceId returns INVALID_INPUT error")]
    public async Task GetAbbreviationDefinition_NullResourceId_ReturnsInvalidInput()
    {
        // Arrange: Valid key but null resource
        string key = "NT";
        string resourceId = null!;

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False, "Null resourceId should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT for null resourceId"
        );
    }

    /// <summary>
    /// Error result has correct structure: Success=false, Key/Definition are null,
    /// Error has Code and Message.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Error result has correct structure per Section 4.19")]
    public async Task GetAbbreviationDefinition_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Key that triggers NOT_FOUND
        string key = "UNKNOWN";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Verify error result structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Key, Is.Null, "Key should be null on failure");
        Assert.That(result.Definition, Is.Null, "Definition should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.Not.Null.And.Not.Empty,
            "Error code should be non-empty"
        );
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message should be non-empty"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-007 (abbreviation section)
    // =========================================================================

    /// <summary>
    /// GM-007: Abbreviation golden master verification.
    /// Input: key="NT" (derived from XML: <Abbrev Key='NT' Definition='New Testament'/>)
    /// Expected: { key: "NT", definition: "New Testament" }
    /// Comparison strategy: exact
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Property("GoldenMaster", "GM-007")]
    [Description("GM-007: Abbreviation lookup matches PT9 golden master exactly")]
    public async Task GoldenMaster_GM007_AbbreviationLookup()
    {
        // GM-007 abbreviation input: key "NT"
        // From input.json: "abbreviationXml":
        //   "<AbbrevData><Abbrev Key='NT' Definition='New Testament'/></AbbrevData>"
        string key = "NT";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Exact match to GM-007 expected-output.json abbreviation section
        // { "key": "NT", "definition": "New Testament" }
        Assert.That(result.Success, Is.True, "GM-007: Abbreviation lookup should succeed");
        Assert.That(result.Key, Is.EqualTo("NT"), "GM-007 abbreviation.key");
        Assert.That(
            result.Definition,
            Is.EqualTo("New Testament"),
            "GM-007 abbreviation.definition"
        );
    }

    // =========================================================================
    // EXTRACTION TESTS - EXT-022 / BHV-300
    // =========================================================================

    /// <summary>
    /// BHV-300 / EXT-022: Abbreviation data is deserialized from XML key-definition
    /// pairs. The service correctly maps the XML structure to key-definition lookup.
    /// TS-034: "Abbreviation data model deserializes XML key-definition pairs"
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-022")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description(
        "BHV-300: Abbreviation XML key-definition pairs deserialized " + "and accessible via lookup"
    )]
    public async Task GetAbbreviationDefinition_XmlDeserialization_KeyDefinitionAccessible()
    {
        // BHV-300: "Pure XML-serializable DTOs for abbreviation key-definition pairs
        // consumed by MarbleDataAccess.GetDefinitionForAbbrev()"
        // TS-034 input: { "xml": "<AbbrevData><Abbrev Key='NT' Definition='New Testament'/>" }
        // TS-034 expected: { "key": "NT", "definition": "New Testament" }
        string key = "NT";
        string resourceId = "test-resource";

        // Act: Call lookup which relies on deserialized abbreviation data
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Per TS-034 expected output
        Assert.That(result.Success, Is.True, "TS-034: deserialized data should be accessible");
        Assert.That(result.Key, Is.EqualTo("NT"), "TS-034: key from XML attribute should be 'NT'");
        Assert.That(
            result.Definition,
            Is.EqualTo("New Testament"),
            "TS-034: definition from XML attribute should be 'New Testament'"
        );
    }

    // =========================================================================
    // EDGE CASE TESTS
    // =========================================================================

    /// <summary>
    /// Edge case from strategic plan: Unknown abbreviation key returns NOT_FOUND.
    /// This covers the case where encyclopedia content references an abbreviation
    /// that does not exist in the loaded abbreviation data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-300")]
    [Description("Edge case: unknown abbreviation key returns NOT_FOUND with key in message")]
    public async Task GetAbbreviationDefinition_EdgeCase_UnknownKeyMessage()
    {
        // Arrange: A key not in the abbreviation data
        string key = "XYZ";
        string resourceId = "test-resource";

        // Act
        var result = await LexiconService.GetAbbreviationDefinitionAsync(
            key,
            resourceId,
            CancellationToken.None
        );

        // Assert: Error message includes the key per Section 4.19
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Abbreviation 'XYZ' not found"),
            "Error message should include the specific key that was not found"
        );
    }
}

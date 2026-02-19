using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-032: ProjectTypeClassification.
/// Verifies that ProjectType.MarbleResource has correct classification properties
/// in the PT10 context, confirming existing ParatextData behavior.
///
/// These are verification tests -- the implementation lives in ParatextData.dll.
/// The tests confirm that the MarbleResource enum value and its extension methods
/// behave correctly when called from the PT10 host.
///
/// PT9 Source: ParatextData/ProjectType.cs:45, 96-97, 119, 133-136
/// Spec: spec-001-project-type-classification.json
/// </summary>
[TestFixture]
public class ProjectTypeClassificationTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-032.
    /// Verifies all spec-001 assertions in a single comprehensive test.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-032")]
    [Property("SpecId", "spec-001")]
    [Description(
        "Acceptance test: MarbleResource project type classification behaviors verified"
    )]
    public void MarbleResource_AllClassificationProperties_MatchSpec001()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act & Assert: All spec-001 assertions verified together
        Assert.Multiple(() =>
        {
            // TS-003: Serialization
            Assert.That(
                projectType.ToString(),
                Is.EqualTo("MarbleResource"),
                "INV-007: case-sensitive serialization must be preserved"
            );

            // TS-004: Localized display name
            Assert.That(
                projectType.LocalizedString(),
                Is.EqualTo("Enhanced Resource"),
                "User-facing display name must be 'Enhanced Resource'"
            );

            // TS-005: Not scripture
            Assert.That(
                projectType.IsScripture(),
                Is.False,
                "INV-001: MarbleResource is NOT Scripture despite containing Bible text"
            );

            // TS-006: Known project type
            Assert.That(
                projectType.IsKnownProjectType(),
                Is.True,
                "MarbleResource must be a recognized project type"
            );

            // TS-007: Not a derived type
            Assert.That(
                projectType.IsDerivedType(),
                Is.False,
                "MarbleResource must not be a derived type"
            );
        });
    }

    #endregion

    #region Contract Tests - Serialization

    /// <summary>
    /// TS-003: Verifies that MarbleResource serializes as the exact string "MarbleResource".
    /// This is critical for persistence -- project settings files store this string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-101")]
    [Property("InvariantId", "INV-007")]
    [Description("MarbleResource serialized as exact string 'MarbleResource'")]
    public void ToString_MarbleResource_ReturnsExactString()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act
        string serialized = projectType.ToString();

        // Assert
        Assert.That(serialized, Is.EqualTo("MarbleResource"));
    }

    #endregion

    #region Contract Tests - Localized Display Name

    /// <summary>
    /// TS-004: Verifies that the user-facing display name is "Enhanced Resource".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-101")]
    [Description("MarbleResource LocalizedString returns 'Enhanced Resource'")]
    public void LocalizedString_MarbleResource_ReturnsEnhancedResource()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act
        string localizedName = projectType.LocalizedString();

        // Assert
        Assert.That(localizedName, Is.EqualTo("Enhanced Resource"));
    }

    #endregion

    #region Contract Tests - IsScripture

    /// <summary>
    /// TS-005: Verifies that MarbleResource is classified as NOT scripture.
    /// Despite containing Bible text, Enhanced Resources are classified separately
    /// because they carry embedded research material and are not editable translations.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-101")]
    [Property("InvariantId", "INV-001")]
    [Description("MarbleResource IsScripture returns false")]
    public void IsScripture_MarbleResource_ReturnsFalse()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act
        bool isScripture = projectType.IsScripture();

        // Assert
        Assert.That(
            isScripture,
            Is.False,
            "INV-001: MarbleResource must NOT be classified as Scripture"
        );
    }

    /// <summary>
    /// TS-033: Explicitly tests the IsScripture exclusion method.
    /// Same behavior as TS-005 but verifies the exclusion cascading effect
    /// that causes MarbleResource to be excluded from Host.AllResources.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-117")]
    [Property("InvariantId", "INV-001")]
    [Description("IsScripture returns false for MarbleResource (exclusion method)")]
    public void IsScripture_MarbleResource_ExcludesFromAllResources()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act
        bool isScripture = projectType.IsScripture();

        // Assert -- INV-001 cascades to INV-006 (AllResources exclusion)
        Assert.That(
            isScripture,
            Is.False,
            "MarbleResource excluded from AllResources because IsScripture returns false"
        );
    }

    #endregion

    #region Contract Tests - IsKnownProjectType

    /// <summary>
    /// TS-006: Verifies that MarbleResource is a recognized project type.
    /// This means ParatextData knows about MarbleResource and can handle it.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description("MarbleResource IsKnownProjectType returns true")]
    public void IsKnownProjectType_MarbleResource_ReturnsTrue()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act
        bool isKnown = projectType.IsKnownProjectType();

        // Assert
        Assert.That(isKnown, Is.True, "MarbleResource must be a recognized project type");
    }

    #endregion

    #region Contract Tests - IsDerivedType

    /// <summary>
    /// TS-007: Verifies that MarbleResource is not a derived type.
    /// Derived types (e.g., BackTranslation, DaughterTranslation) have base projects.
    /// MarbleResource is standalone.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("MarbleResource IsDerivedType returns false")]
    public void IsDerivedType_MarbleResource_ReturnsFalse()
    {
        // Arrange
        var projectType = ProjectType.MarbleResource;

        // Act
        bool isDerived = projectType.IsDerivedType();

        // Assert
        Assert.That(isDerived, Is.False, "MarbleResource must not be a derived type");
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-001: MarbleResource is NOT Scripture.
    /// This invariant is critical because it cascades to:
    /// - INV-006: ERs appear only in AllEnhancedResources, not AllResources
    /// - BHV-603: MarbleResource excluded from Host.GetAllProjects() and Host.AllResources
    ///
    /// Verified with multiple project types to show MarbleResource is specifically excluded.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("BehaviorId", "BHV-101")]
    [Description("INV-001: MarbleResource always returns false from IsScripture()")]
    public void Invariant_MarbleResource_NeverIsScripture()
    {
        // The invariant states: ProjectType.MarbleResource always returns false from IsScripture()
        Assert.That(
            ProjectType.MarbleResource.IsScripture(),
            Is.False,
            "INV-001: MarbleResource must NEVER be classified as Scripture"
        );
    }

    /// <summary>
    /// INV-001 context: Verify that standard Scripture types DO return true from IsScripture(),
    /// confirming the method works and MarbleResource is specifically excluded.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("BehaviorId", "BHV-117")]
    [Description(
        "INV-001 contrast: Standard Scripture types return true from IsScripture()"
    )]
    public void IsScripture_StandardTranslation_ReturnsTrue()
    {
        // Standard translation project type IS Scripture
        Assert.That(
            ProjectType.Standard.IsScripture(),
            Is.True,
            "Standard project type should be Scripture (contrast with MarbleResource)"
        );
    }

    /// <summary>
    /// INV-007: The string "MarbleResource" must be preserved exactly for serialization.
    /// Changing capitalization would break existing project settings files.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("INV-007: 'MarbleResource' serialization is case-sensitive")]
    public void Invariant_MarbleResourceSerialization_PreservesExactCase()
    {
        string serialized = ProjectType.MarbleResource.ToString();

        // Verify exact case-sensitive match
        Assert.That(serialized, Is.EqualTo("MarbleResource"));

        // Explicitly verify it is NOT any other casing
        Assert.That(
            serialized,
            Is.Not.EqualTo("marbleresource"),
            "Serialization must preserve exact casing"
        );
        Assert.That(
            serialized,
            Is.Not.EqualTo("MARBLERESOURCE"),
            "Serialization must preserve exact casing"
        );
    }

    #endregion

    #region BHV-603: MarbleResource Project Type Exclusions

    /// <summary>
    /// BHV-603: MarbleResource is excluded from general project lists.
    /// This test verifies the classification properties that drive the exclusion:
    /// - IsScripture() returns false (drives AllResources exclusion)
    /// - IsKnownProjectType() returns true (it IS a valid type, just not scripture)
    ///
    /// Note: The actual list-level exclusion (Host.GetAllProjects, Host.AllResources)
    /// is tested at a higher level in CAP-001. This test verifies the underlying
    /// classification that makes those exclusions work.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-603")]
    [Property("ScenarioId", "TS-005")]
    [Description(
        "BHV-603: MarbleResource classification properties drive exclusion from project lists"
    )]
    public void MarbleResource_ClassificationForExclusion_IsCorrect()
    {
        var projectType = ProjectType.MarbleResource;

        Assert.Multiple(() =>
        {
            // Not scripture -- this is the key property that drives AllResources exclusion
            Assert.That(
                projectType.IsScripture(),
                Is.False,
                "IsScripture=false drives exclusion from AllResources"
            );

            // IS a known type -- it's valid, just not scripture
            Assert.That(
                projectType.IsKnownProjectType(),
                Is.True,
                "IsKnownProjectType=true means ParatextData can handle it"
            );

            // NOT derived -- no base project required
            Assert.That(
                projectType.IsDerivedType(),
                Is.False,
                "IsDerivedType=false means no base project relationship"
            );
        });
    }

    #endregion
}

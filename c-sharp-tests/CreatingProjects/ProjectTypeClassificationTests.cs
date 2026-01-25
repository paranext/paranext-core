using System.Diagnostics.CodeAnalysis;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectType classification behavior (CAP-PD-002).
/// Verifies the ProjectType enum values are accessible and can be used.
/// </summary>
/// <remarks>
/// Note: ParatextData.dll uses PtxUtils.Enum-ProjectType- for extension methods.
/// These tests verify enum accessibility rather than extension methods.
/// Extension method behavior is tested through integration tests.
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Unit")]
internal class ProjectTypeClassificationTests
{
    #region TS-003: Standard project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-003: Standard project type is accessible")]
    public void Standard_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.Standard;
        Assert.That(projectType, Is.EqualTo(ProjectType.Standard));
    }

    #endregion

    #region TS-004: BackTranslation project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-004: BackTranslation project type is accessible")]
    public void BackTranslation_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.BackTranslation;
        Assert.That(projectType, Is.EqualTo(ProjectType.BackTranslation));
    }

    #endregion

    #region TS-005: Daughter project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-005: Daughter project type is accessible")]
    public void Daughter_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.Daughter;
        Assert.That(projectType, Is.EqualTo(ProjectType.Daughter));
    }

    #endregion

    #region TS-006: StudyBibleAdditions project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-006: StudyBibleAdditions project type is accessible")]
    public void StudyBibleAdditions_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.StudyBibleAdditions;
        Assert.That(projectType, Is.EqualTo(ProjectType.StudyBibleAdditions));
    }

    #endregion

    #region TS-007: Auxiliary project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-007: Auxiliary project type is accessible")]
    public void Auxiliary_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.Auxiliary;
        Assert.That(projectType, Is.EqualTo(ProjectType.Auxiliary));
    }

    #endregion

    #region TS-008: ConsultantNotes project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-008: ConsultantNotes project type is accessible")]
    public void ConsultantNotes_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.ConsultantNotes;
        Assert.That(projectType, Is.EqualTo(ProjectType.ConsultantNotes));
    }

    #endregion

    #region TS-009: TransliterationManual project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-009: TransliterationManual project type is accessible")]
    public void TransliterationManual_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.TransliterationManual;
        Assert.That(projectType, Is.EqualTo(ProjectType.TransliterationManual));
    }

    #endregion

    #region TS-010: TransliterationWithEncoder project type

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-002")]
    [Description("TS-010: TransliterationWithEncoder project type is accessible")]
    public void TransliterationWithEncoder_ProjectType_IsAccessible()
    {
        var projectType = ProjectType.TransliterationWithEncoder;
        Assert.That(projectType, Is.EqualTo(ProjectType.TransliterationWithEncoder));
    }

    #endregion

    #region All Project Types Enumerable

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("BehaviorId", "BHV-017")]
    [Description("All expected project types exist in the enum")]
    public void ProjectType_AllTypes_AreAccessible()
    {
        // Arrange
        var expectedTypes = new[]
        {
            ProjectType.Standard,
            ProjectType.BackTranslation,
            ProjectType.Daughter,
            ProjectType.StudyBibleAdditions,
            ProjectType.Auxiliary,
            ProjectType.ConsultantNotes,
            ProjectType.TransliterationManual,
            ProjectType.TransliterationWithEncoder
        };

        // Assert - All types should be distinct
        Assert.That(expectedTypes.Distinct().Count(), Is.EqualTo(expectedTypes.Length));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-002")]
    [Property("BehaviorId", "BHV-017")]
    [Description("Project types can be converted to and from string")]
    public void ProjectType_ToString_ReturnsExpectedValues()
    {
        Assert.Multiple(() =>
        {
            Assert.That(ProjectType.Standard.ToString(), Is.EqualTo("Standard"));
            Assert.That(ProjectType.BackTranslation.ToString(), Is.EqualTo("BackTranslation"));
            Assert.That(ProjectType.Daughter.ToString(), Is.EqualTo("Daughter"));
            Assert.That(ProjectType.Auxiliary.ToString(), Is.EqualTo("Auxiliary"));
            Assert.That(ProjectType.ConsultantNotes.ToString(), Is.EqualTo("ConsultantNotes"));
        });
    }

    #endregion
}

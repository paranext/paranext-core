using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectCreationService.GetUsfmVersionWarning() - CAP-004
/// Reference: gm-006-usfm-conversion, EXT-004
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectCreationServiceTests
{
    #region Acceptance Test - CAP-004

    /// <summary>
    /// Acceptance test for CAP-004: USFM version warning capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-004")]
    [Description(
        "Acceptance test: GetUsfmVersionWarning returns warning when USFM 3 selected for new project"
    )]
    public void GetUsfmVersionWarning_AcceptanceTest()
    {
        // This acceptance test verifies the complete GetUsfmVersionWarning capability

        // USFM 3 for new project - should return warning
        var warningResult = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );
        Assert.That(warningResult, Is.Not.Null, "USFM 3 for new project should return warning");
        Assert.That(warningResult!.ShowWarning, Is.True, "Warning should be shown");
        Assert.That(
            warningResult.WarningMessageKey,
            Is.Not.Null.And.Not.Empty,
            "Should have message key"
        );
        Assert.That(
            warningResult.ConfirmButtonKey,
            Is.Not.Null.And.Not.Empty,
            "Should have confirm button key"
        );
        Assert.That(
            warningResult.CancelButtonKey,
            Is.Not.Null.And.Not.Empty,
            "Should have cancel button key"
        );

        // USFM 2 for new project - should NOT return warning
        var noWarningResult = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject: true
        );
        Assert.That(
            noWarningResult,
            Is.Null.Or.Property("ShowWarning").EqualTo(false),
            "USFM 2 for new project should not show warning"
        );

        // USFM 3 for existing project - should NOT return warning (already converted)
        var existingProjectResult = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: false
        );
        Assert.That(
            existingProjectResult,
            Is.Null.Or.Property("ShowWarning").EqualTo(false),
            "USFM 3 for existing project should not show warning"
        );
    }

    #endregion

    #region Golden Master Tests - gm-006

    /// <summary>
    /// gm-006-01: USFM 3 for new project - show warning
    /// Based on gm-006-01: Convert USFM 2 figure to USFM 3 format
    /// The warning is shown before conversion starts
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-01")]
    [Property("ScenarioId", "TS-USFM-001")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_ReturnsWarning()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ShowWarning, Is.True);
    }

    /// <summary>
    /// gm-006-02: USFM 2 for new project - no warning needed
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-02")]
    [Property("ScenarioId", "TS-USFM-002")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm2NewProject_ReturnsNull()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject: true
        );

        Assert.That(result, Is.Null.Or.Property("ShowWarning").EqualTo(false));
    }

    /// <summary>
    /// gm-006-03: USFM 3 for existing project - no warning (already at USFM 3)
    /// Based on gm-006-04: No conversion needed for USFM 3 project
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-03")]
    [Property("ScenarioId", "TS-USFM-003")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3ExistingProject_ReturnsNull()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: false
        );

        // Existing project already at USFM 3 - no warning needed
        Assert.That(result, Is.Null.Or.Property("ShowWarning").EqualTo(false));
    }

    /// <summary>
    /// gm-006-04: USFM 2 for existing project - no warning
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-04")]
    [Property("ScenarioId", "TS-USFM-004")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm2ExistingProject_ReturnsNull()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject: false
        );

        Assert.That(result, Is.Null.Or.Property("ShowWarning").EqualTo(false));
    }

    #endregion

    #region Contract Tests - Warning Content

    /// <summary>
    /// Verify warning contains correct localization keys
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-005")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_ContainsCorrectLocalizationKeys()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.WarningMessageKey, Is.Not.Null.And.Not.Empty);
        Assert.That(result.ConfirmButtonKey, Is.Not.Null.And.Not.Empty);
        Assert.That(result.CancelButtonKey, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// Verify warning message key contains expected text
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-006")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_MessageKeyContainsUsfm3Reference()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);
        // The message key should reference USFM version or compatibility
        Assert.That(
            result!.WarningMessageKey,
            Does.Contain("Usfm")
                .Or.Contain("usfm")
                .Or.Contain("USFM")
                .Or.Contain("Version")
                .Or.Contain("Compat")
        );
    }

    /// <summary>
    /// UsfmVersionWarning should have all required properties set
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-007")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_AllPropertiesPopulated()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);

        // All properties should be non-null and meaningful
        Assert.Multiple(() =>
        {
            Assert.That(result!.ShowWarning, Is.True);
            Assert.That(string.IsNullOrWhiteSpace(result.WarningMessageKey), Is.False);
            Assert.That(string.IsNullOrWhiteSpace(result.ConfirmButtonKey), Is.False);
            Assert.That(string.IsNullOrWhiteSpace(result.CancelButtonKey), Is.False);
        });
    }

    /// <summary>
    /// Verify warning is not shown for USFM 2 regardless of project state
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-008")]
    [Property("BehaviorId", "BHV-100")]
    [TestCase(true)]
    [TestCase(false)]
    public void GetUsfmVersionWarning_Usfm2_NeverShowsWarning(bool isNewProject)
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject
        );

        // Should never show warning for USFM 2
        if (result != null)
        {
            Assert.That(result.ShowWarning, Is.False, "USFM 2 should never show warning");
        }
    }

    #endregion
}

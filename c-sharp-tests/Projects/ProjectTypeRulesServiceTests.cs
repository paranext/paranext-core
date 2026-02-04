using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectTypeRulesService.GetTypeRules() - CAP-001
/// Reference: gm-004-project-type-rules, EXT-001, spec-001
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectTypeRulesServiceTests
{
    #region Test Data Sources

    /// <summary>
    /// Derived project types that require a base project.
    /// Returns string names for JSON serialization compatibility.
    /// </summary>
    private static IEnumerable<string> GetDerivedTypes()
    {
        yield return "Daughter";
        yield return "BackTranslation";
        yield return "TransliterationManual";
        yield return "TransliterationWithEncoder";
        yield return "Auxiliary";
        yield return "StudyBible";
        yield return "StudyBibleAdditions";
    }

    /// <summary>
    /// Non-derived project types that do not require a base project.
    /// </summary>
    private static IEnumerable<string> GetNonDerivedTypes()
    {
        yield return "Standard";
        yield return "ConsultantNotes";
    }

    /// <summary>
    /// Project types that share license with parent.
    /// </summary>
    private static IEnumerable<string> GetLicenseSharingTypes()
    {
        yield return "BackTranslation";
        yield return "Auxiliary";
        yield return "TransliterationManual";
        yield return "TransliterationWithEncoder";
    }

    /// <summary>
    /// Project types that have their own license.
    /// </summary>
    private static IEnumerable<string> GetIndependentLicenseTypes()
    {
        yield return "Standard";
        yield return "Daughter";
        yield return "StudyBible";
        yield return "ConsultantNotes";
    }

    #endregion

    #region Acceptance Test - CAP-001

    /// <summary>
    /// Acceptance test for CAP-001: Project type rules capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-003")]
    [Description("Acceptance test: GetTypeRules returns correct rules for all project types")]
    public void GetTypeRules_AcceptanceTest()
    {
        // This acceptance test verifies the complete GetTypeRules capability
        // by testing that each project type returns the expected rules

        // Standard - should not require base project, can be base
        var standardRules = ProjectTypeRulesService.GetTypeRules(
            new ProjectTypeRulesRequest("Standard")
        );
        Assert.That(
            standardRules.RequiresBaseProject,
            Is.False,
            "Standard should not require base"
        );
        Assert.That(standardRules.CanBeBaseProject, Is.True, "Standard can be base project");
        Assert.That(
            standardRules.ShowBasedOnDropdown,
            Is.False,
            "Standard should not show based-on dropdown"
        );

        // BackTranslation - should require base project
        var btRules = ProjectTypeRulesService.GetTypeRules(
            new ProjectTypeRulesRequest("BackTranslation")
        );
        Assert.That(btRules.RequiresBaseProject, Is.True, "BackTranslation should require base");
        Assert.That(btRules.CanBeBaseProject, Is.True, "BackTranslation can be base project");
        Assert.That(btRules.SharesLicenseWithParent, Is.True, "BackTranslation shares license");

        // TransliterationWithEncoder - should require encoder, not editable by default
        var trEncRules = ProjectTypeRulesService.GetTypeRules(
            new ProjectTypeRulesRequest("TransliterationWithEncoder")
        );
        Assert.That(
            trEncRules.RequiresBaseProject,
            Is.True,
            "TransliterationWithEncoder requires base"
        );
        Assert.That(
            trEncRules.DefaultEditable,
            Is.False,
            "TransliterationWithEncoder is not editable"
        );
        Assert.That(
            trEncRules.ShowEncoderDropdown,
            Is.True,
            "TransliterationWithEncoder shows encoder dropdown"
        );
        Assert.That(
            trEncRules.RequiresEncoder,
            Is.True,
            "TransliterationWithEncoder requires encoder"
        );
    }

    #endregion

    #region Golden Master Tests - gm-004

    /// <summary>
    /// gm-004-01: Standard project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-01")]
    [Property("ScenarioId", "TS-PTR-001")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_Standard_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("Standard");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.False);
        Assert.That(result.CanBeBaseProject, Is.True);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.Null);
        Assert.That(result.ShowBasedOnDropdown, Is.False);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.False);
    }

    /// <summary>
    /// gm-004-02: BackTranslation project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-02")]
    [Property("ScenarioId", "TS-PTR-002")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_BackTranslation_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("BackTranslation");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.True);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.EqualTo("Scripture except Auxiliary and Resource"));
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.True);
    }

    /// <summary>
    /// gm-004-03: Daughter project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-03")]
    [Property("ScenarioId", "TS-PTR-003")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_Daughter_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("Daughter");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.True);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.EqualTo("Scripture except Auxiliary and Resource"));
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.False);
    }

    /// <summary>
    /// gm-004-04: Auxiliary project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-04")]
    [Property("ScenarioId", "TS-PTR-004")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_Auxiliary_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("Auxiliary");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.False);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(
            result.BaseConstraints,
            Is.EqualTo("Standard ONLY (not Resource), Admin required")
        );
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.True);
        Assert.That(result.RequiresAdminRole, Is.True);
    }

    /// <summary>
    /// gm-004-05: StudyBible project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-05")]
    [Property("ScenarioId", "TS-PTR-005")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_StudyBible_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("StudyBible");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.False);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.EqualTo("Scripture, NOT a resource"));
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.False);
    }

    /// <summary>
    /// gm-004-06: StudyBibleAdditions project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-06")]
    [Property("ScenarioId", "TS-PTR-006")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_StudyBibleAdditions_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("StudyBibleAdditions");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.False);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.EqualTo("Must NOT be StudyBible type"));
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.False);
        Assert.That(result.InheritsLanguage, Is.True);
        Assert.That(result.InheritsBookNames, Is.True);
    }

    /// <summary>
    /// gm-004-07: TransliterationManual project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-07")]
    [Property("ScenarioId", "TS-PTR-007")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_TransliterationManual_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("TransliterationManual");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.False);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.EqualTo("Any scripture type"));
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.True);
    }

    /// <summary>
    /// gm-004-08: TransliterationWithEncoder project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-08")]
    [Property("ScenarioId", "TS-PTR-008")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_TransliterationWithEncoder_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("TransliterationWithEncoder");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.True);
        Assert.That(result.CanBeBaseProject, Is.False);
        Assert.That(result.DefaultEditable, Is.False);
        Assert.That(result.BaseConstraints, Is.EqualTo("Scripture, NOT a resource"));
        Assert.That(result.ShowBasedOnDropdown, Is.True);
        Assert.That(result.ShowEncoderDropdown, Is.True);
        Assert.That(result.SharesLicenseWithParent, Is.True);
        Assert.That(result.RequiresEncoder, Is.True);
    }

    /// <summary>
    /// gm-004-09: ConsultantNotes project rules
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-004-09")]
    [Property("ScenarioId", "TS-PTR-009")]
    [Property("BehaviorId", "BHV-100")]
    public void GetTypeRules_ConsultantNotes_ReturnsCorrectRules()
    {
        var request = new ProjectTypeRulesRequest("ConsultantNotes");

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(result.RequiresBaseProject, Is.False);
        Assert.That(result.CanBeBaseProject, Is.False);
        Assert.That(result.DefaultEditable, Is.True);
        Assert.That(result.BaseConstraints, Is.Null);
        Assert.That(result.ShowBasedOnDropdown, Is.False);
        Assert.That(result.ShowEncoderDropdown, Is.False);
        Assert.That(result.SharesLicenseWithParent, Is.False);
        Assert.That(result.AutoGeneratesName, Is.True);
    }

    #endregion

    #region Contract Tests - spec-001 Project Type Classification

    /// <summary>
    /// spec-001: IsDerivedType returns true for derived types
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-100")]
    [TestCaseSource(nameof(GetDerivedTypes))]
    public void GetTypeRules_DerivedTypes_RequiresBaseProject(string projectType)
    {
        var request = new ProjectTypeRulesRequest(projectType);

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(
            result.RequiresBaseProject,
            Is.True,
            $"{projectType} should require a base project"
        );
        Assert.That(
            result.ShowBasedOnDropdown,
            Is.True,
            $"{projectType} should show based-on dropdown"
        );
    }

    /// <summary>
    /// spec-001: IsDerivedType returns false for Standard and ConsultantNotes
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "BHV-100")]
    [TestCaseSource(nameof(GetNonDerivedTypes))]
    public void GetTypeRules_NonDerivedTypes_DoesNotRequireBaseProject(string projectType)
    {
        var request = new ProjectTypeRulesRequest(projectType);

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(
            result.RequiresBaseProject,
            Is.False,
            $"{projectType} should not require a base project"
        );
        Assert.That(
            result.ShowBasedOnDropdown,
            Is.False,
            $"{projectType} should not show based-on dropdown"
        );
    }

    /// <summary>
    /// spec-001: SharesProjectLicenseWithParent for sharing types
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-100")]
    [TestCaseSource(nameof(GetLicenseSharingTypes))]
    public void GetTypeRules_LicenseSharingTypes_SharesLicenseWithParent(string projectType)
    {
        var request = new ProjectTypeRulesRequest(projectType);

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(
            result.SharesLicenseWithParent,
            Is.True,
            $"{projectType} should share license with parent"
        );
    }

    /// <summary>
    /// spec-001: SharesProjectLicenseWithParent false for independent types
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-001")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "BHV-100")]
    [TestCaseSource(nameof(GetIndependentLicenseTypes))]
    public void GetTypeRules_IndependentTypes_DoesNotShareLicenseWithParent(string projectType)
    {
        var request = new ProjectTypeRulesRequest(projectType);

        var result = ProjectTypeRulesService.GetTypeRules(request);

        Assert.That(
            result.SharesLicenseWithParent,
            Is.False,
            $"{projectType} should have its own license"
        );
    }

    #endregion
}

using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-012 GetInventoryPermissions: computes a PermissionState record that
/// controls which UI elements are enabled based on user role and project properties.
///
/// Source: Section 4.13 M-013 GetInventoryPermissions
/// Behaviors: BHV-304 (status buttons disabled for SBA base content),
///            BHV-311 (permission-based status button disabling)
/// Validations: VAL-004 (save permission check), VAL-006 (toggle permission check)
/// Golden master: gm-012 (permission states for admin, translator, non-editable, DBL resource)
///
/// The permission computation is:
///   - CanMakeChanges = AmAdministratorOrTeamMember AND Editable (BHV-311)
///   - ToggleEnabled = AmAdministrator AND SupportsSeparateInventories AND Editable (VAL-006)
///   - ButtonsEnabled = CanMakeChanges AND NOT isSbaBaseContent (BHV-304)
///
/// Test design: Tests call InventoryInitService.ComputePermissions with boolean flags
/// directly. This is a pure computation with zero mocks.
/// </summary>
[TestFixture]
public class InventoryInitServiceTests
{
    #region Acceptance Test (gm-012)

    /// <summary>
    /// Acceptance test: Verifies all 4 golden master permission scenarios.
    /// When this test passes, CAP-012 is complete.
    ///
    /// gm-012 expected output:
    ///   adminEditable:      { canMakeChanges: true,  toggleEnabled: true,  buttonsEnabled: true  }
    ///   translatorEditable: { canMakeChanges: true,  toggleEnabled: false, buttonsEnabled: true  }
    ///   nonEditable:        { canMakeChanges: false, toggleEnabled: false, buttonsEnabled: false }
    ///   dblResource:        { canMakeChanges: false, toggleEnabled: false, buttonsEnabled: false }
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-081")]
    [Description(
        "Acceptance test: GetInventoryPermissions returns correct PermissionState for "
            + "admin, translator, non-editable, and DBL resource scenarios"
    )]
    public void ComputePermissions_AllGoldenMasterScenarios_MatchExpected()
    {
        // Scenario 1: adminEditable - Administrator on editable project
        var adminEditable = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        // Scenario 2: translatorEditable - Translator (team member, not admin) on editable project
        var translatorEditable = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        // Scenario 3: nonEditable - User on non-editable project
        var nonEditable = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        // Scenario 4: dblResource - DBL Resource (not editable, SBA base content)
        var dblResource = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: true
        );

        Assert.Multiple(() =>
        {
            // adminEditable: all true
            Assert.That(
                adminEditable.CanMakeChanges,
                Is.True,
                "Admin on editable project can make changes"
            );
            Assert.That(
                adminEditable.ToggleEnabled,
                Is.True,
                "Admin can toggle verse/non-verse separation"
            );
            Assert.That(
                adminEditable.ButtonsEnabled,
                Is.True,
                "Admin on editable non-SBA project has buttons enabled"
            );

            // translatorEditable: canMakeChanges true, toggleEnabled false, buttonsEnabled true
            Assert.That(
                translatorEditable.CanMakeChanges,
                Is.True,
                "Translator team member on editable project can make changes"
            );
            Assert.That(
                translatorEditable.ToggleEnabled,
                Is.False,
                "Translator (non-admin) cannot toggle separation"
            );
            Assert.That(
                translatorEditable.ButtonsEnabled,
                Is.True,
                "Translator on editable non-SBA project has buttons enabled"
            );

            // nonEditable: all false
            Assert.That(
                nonEditable.CanMakeChanges,
                Is.False,
                "Non-editable project: cannot make changes"
            );
            Assert.That(
                nonEditable.ToggleEnabled,
                Is.False,
                "Non-editable project: toggle disabled"
            );
            Assert.That(
                nonEditable.ButtonsEnabled,
                Is.False,
                "Non-editable project: buttons disabled"
            );

            // dblResource: all false
            Assert.That(
                dblResource.CanMakeChanges,
                Is.False,
                "DBL Resource: cannot make changes"
            );
            Assert.That(
                dblResource.ToggleEnabled,
                Is.False,
                "DBL Resource: toggle disabled"
            );
            Assert.That(
                dblResource.ButtonsEnabled,
                Is.False,
                "DBL Resource: buttons disabled"
            );
        });
    }

    #endregion

    #region BHV-311: CanMakeChanges Permission Dimension

    /// <summary>
    /// CanMakeChanges is true only when BOTH AmAdministratorOrTeamMember AND Editable are true.
    /// This tests the happy path: both flags true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-081")]
    [Description("CanMakeChanges = true when AmAdministratorOrTeamMember AND Editable")]
    public void ComputePermissions_AdminOrTeamMemberAndEditable_CanMakeChangesTrue()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: false,
            isSbaBaseContent: false
        );

        Assert.That(
            result.CanMakeChanges,
            Is.True,
            "BHV-311: CanMakeChanges = AmAdministratorOrTeamMember AND Editable"
        );
    }

    /// <summary>
    /// CanMakeChanges is false when project is not editable, even if user is admin.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-082")]
    [Description("CanMakeChanges = false when project is not editable")]
    public void ComputePermissions_NotEditable_CanMakeChangesFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.That(
            result.CanMakeChanges,
            Is.False,
            "BHV-311: CanMakeChanges false when project not editable, even for admins"
        );
    }

    /// <summary>
    /// CanMakeChanges is false when user is not admin or team member, even if project is editable.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-082")]
    [Description("CanMakeChanges = false when user is not admin or team member")]
    public void ComputePermissions_NotTeamMember_CanMakeChangesFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.That(
            result.CanMakeChanges,
            Is.False,
            "BHV-311: CanMakeChanges false when user is not admin or team member"
        );
    }

    /// <summary>
    /// CanMakeChanges is false when both flags are false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-082")]
    [Description("CanMakeChanges = false when both flags are false")]
    public void ComputePermissions_NeitherTeamMemberNorEditable_CanMakeChangesFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.That(
            result.CanMakeChanges,
            Is.False,
            "BHV-311: CanMakeChanges false when both conditions are false"
        );
    }

    #endregion

    #region VAL-006: ToggleEnabled Permission Dimension

    /// <summary>
    /// ToggleEnabled requires AmAdministrator AND SupportsSeparateInventories.
    /// Happy path: both true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ValidationRule", "VAL-006")]
    [Property("ScenarioId", "TS-081")]
    [Description("ToggleEnabled = true when AmAdministrator AND SupportsSeparateInventories")]
    public void ComputePermissions_AdminWithSeparateInventorySupport_ToggleEnabledTrue()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.That(
            result.ToggleEnabled,
            Is.True,
            "VAL-006: Admin with SupportsSeparateInventories can toggle"
        );
    }

    /// <summary>
    /// ToggleEnabled is false for non-admin, even if SupportsSeparateInventories is true.
    /// Translator role user cannot toggle verse/non-verse separation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ValidationRule", "VAL-006")]
    [Property("ScenarioId", "TS-083")]
    [Description("ToggleEnabled = false for non-admin (translator role)")]
    public void ComputePermissions_NonAdmin_ToggleEnabledFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.That(
            result.ToggleEnabled,
            Is.False,
            "VAL-006: Non-admin cannot toggle verse/non-verse separation"
        );
    }

    /// <summary>
    /// ToggleEnabled is false when check does not support separate inventories,
    /// even if user is administrator.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ValidationRule", "VAL-006")]
    [Property("ScenarioId", "TS-083")]
    [Description(
        "ToggleEnabled = false when SupportsSeparateInventories is false, even for admin"
    )]
    public void ComputePermissions_NoSeparateInventorySupport_ToggleEnabledFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: false,
            isSbaBaseContent: false
        );

        Assert.That(
            result.ToggleEnabled,
            Is.False,
            "VAL-006: Toggle disabled when check doesn't support separate inventories"
        );
    }

    /// <summary>
    /// ToggleEnabled is false when both AmAdministrator and SupportsSeparateInventories
    /// are false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ValidationRule", "VAL-006")]
    [Property("ScenarioId", "TS-083")]
    [Description("ToggleEnabled = false when neither admin nor separate inventory support")]
    public void ComputePermissions_NeitherAdminNorSeparateSupport_ToggleEnabledFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: false,
            isSbaBaseContent: false
        );

        Assert.That(
            result.ToggleEnabled,
            Is.False,
            "VAL-006: Toggle disabled when both conditions are false"
        );
    }

    #endregion

    #region BHV-304: ButtonsEnabled Dimension

    /// <summary>
    /// ButtonsEnabled requires CanMakeChanges AND NOT isSbaBaseContent.
    /// Happy path: canMakeChanges true, not SBA base content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-081")]
    [Description("ButtonsEnabled = true when CanMakeChanges AND NOT isSbaBaseContent")]
    public void ComputePermissions_CanMakeChangesAndNotSba_ButtonsEnabledTrue()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: false,
            isSbaBaseContent: false
        );

        Assert.That(
            result.ButtonsEnabled,
            Is.True,
            "BHV-304: Buttons enabled when canMakeChanges and not SBA base content"
        );
    }

    /// <summary>
    /// ButtonsEnabled is false when isSbaBaseContent is true, even when canMakeChanges
    /// would otherwise be true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-115")]
    [Description("ButtonsEnabled = false for SBA base content, even with CanMakeChanges")]
    public void ComputePermissions_SbaBaseContent_ButtonsEnabledFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: true
        );

        Assert.That(
            result.ButtonsEnabled,
            Is.False,
            "BHV-304: Buttons disabled for SBA base content"
        );
        // CanMakeChanges should still be true (independent of SBA base content)
        Assert.That(
            result.CanMakeChanges,
            Is.True,
            "CanMakeChanges is independent of SBA base content"
        );
    }

    /// <summary>
    /// ButtonsEnabled is false when CanMakeChanges is false, regardless of SBA status.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-082")]
    [Description("ButtonsEnabled = false when CanMakeChanges is false")]
    public void ComputePermissions_CannotMakeChanges_ButtonsEnabledFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.That(result.CanMakeChanges, Is.False, "CanMakeChanges should be false");
        Assert.That(
            result.ButtonsEnabled,
            Is.False,
            "BHV-304: Buttons disabled when canMakeChanges is false"
        );
    }

    /// <summary>
    /// ButtonsEnabled is false when both CanMakeChanges is false AND isSbaBaseContent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-115")]
    [Description(
        "ButtonsEnabled = false when both CanMakeChanges false and SBA base content"
    )]
    public void ComputePermissions_NoPermissionsAndSba_ButtonsEnabledFalse()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: true
        );

        Assert.That(
            result.ButtonsEnabled,
            Is.False,
            "BHV-304: Buttons disabled when both conditions prevent it"
        );
    }

    #endregion

    #region Golden Master Tests (gm-012)

    /// <summary>
    /// Golden master: Administrator on editable project gets full permissions.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-012")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-081")]
    [Description("gm-012 adminEditable: full permissions for admin on editable project")]
    public void ComputePermissions_GoldenMaster_AdminEditable()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.CanMakeChanges, Is.True, "gm-012 adminEditable: canMakeChanges");
            Assert.That(result.ToggleEnabled, Is.True, "gm-012 adminEditable: toggleEnabled");
            Assert.That(result.ButtonsEnabled, Is.True, "gm-012 adminEditable: buttonsEnabled");
        });
    }

    /// <summary>
    /// Golden master: Translator (team member, not admin) on editable project.
    /// Can make changes and use buttons but cannot toggle separation.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-012")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-081")]
    [Description(
        "gm-012 translatorEditable: canMakeChanges=true, toggleEnabled=false, buttonsEnabled=true"
    )]
    public void ComputePermissions_GoldenMaster_TranslatorEditable()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.CanMakeChanges,
                Is.True,
                "gm-012 translatorEditable: canMakeChanges"
            );
            Assert.That(
                result.ToggleEnabled,
                Is.False,
                "gm-012 translatorEditable: toggleEnabled"
            );
            Assert.That(
                result.ButtonsEnabled,
                Is.True,
                "gm-012 translatorEditable: buttonsEnabled"
            );
        });
    }

    /// <summary>
    /// Golden master: Non-editable project gives no permissions.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-012")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-082")]
    [Description("gm-012 nonEditable: all permissions false")]
    public void ComputePermissions_GoldenMaster_NonEditable()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.CanMakeChanges,
                Is.False,
                "gm-012 nonEditable: canMakeChanges"
            );
            Assert.That(
                result.ToggleEnabled,
                Is.False,
                "gm-012 nonEditable: toggleEnabled"
            );
            Assert.That(
                result.ButtonsEnabled,
                Is.False,
                "gm-012 nonEditable: buttonsEnabled"
            );
        });
    }

    /// <summary>
    /// Golden master: DBL Resource has all permissions false.
    /// DBL resources are not editable and represent SBA base content.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-012")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-115")]
    [Description("gm-012 dblResource: all permissions false")]
    public void ComputePermissions_GoldenMaster_DblResource()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: true
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.CanMakeChanges, Is.False, "gm-012 dblResource: canMakeChanges");
            Assert.That(result.ToggleEnabled, Is.False, "gm-012 dblResource: toggleEnabled");
            Assert.That(result.ButtonsEnabled, Is.False, "gm-012 dblResource: buttonsEnabled");
        });
    }

    #endregion

    #region VAL-004: Save Permission (Matches CanMakeChanges Semantics)

    /// <summary>
    /// VAL-004: The save permission check uses the same logic as CanMakeChanges.
    /// Verifies that when CanMakeChanges is true, the user has save permission.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ValidationRule", "VAL-004")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-081")]
    [Description("VAL-004: Save permission matches CanMakeChanges semantics")]
    public void ComputePermissions_SavePermission_MatchesCanMakeChanges()
    {
        // User with save permission (admin + editable)
        var permitted = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: false,
            isSbaBaseContent: false
        );

        // User without save permission (not editable)
        var denied = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: false,
            supportsSeparateInventories: false,
            isSbaBaseContent: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                permitted.CanMakeChanges,
                Is.True,
                "VAL-004: Admin on editable project has save permission"
            );
            Assert.That(
                denied.CanMakeChanges,
                Is.False,
                "VAL-004: Non-editable project denies save permission"
            );
        });
    }

    #endregion

    #region Edge Cases

    /// <summary>
    /// TS-115: DBL Resource has disabled status buttons and blocked shortcuts.
    /// This specifically tests that isSbaBaseContent disables buttons independently
    /// of CanMakeChanges.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-115")]
    [Description("TS-115: DBL Resource has disabled buttons and blocked shortcuts")]
    public void ComputePermissions_DblResource_AllDisabled()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: false,
            supportsSeparateInventories: true,
            isSbaBaseContent: true
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.CanMakeChanges, Is.False, "DBL Resource: cannot make changes");
            Assert.That(result.ToggleEnabled, Is.False, "DBL Resource: toggle disabled");
            Assert.That(result.ButtonsEnabled, Is.False, "DBL Resource: buttons disabled");
        });
    }

    /// <summary>
    /// TS-083: Non-admin translator user cannot toggle verse/non-verse separation,
    /// but CAN still make changes and use status buttons.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ValidationRule", "VAL-006")]
    [Property("ScenarioId", "TS-083")]
    [Description("TS-083: Non-admin can use buttons but cannot toggle separation")]
    public void ComputePermissions_TranslatorRole_CanChangeButCannotToggle()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.CanMakeChanges,
                Is.True,
                "TS-083: Translator can make changes"
            );
            Assert.That(
                result.ToggleEnabled,
                Is.False,
                "TS-083: Translator cannot toggle"
            );
            Assert.That(
                result.ButtonsEnabled,
                Is.True,
                "TS-083: Translator has buttons enabled"
            );
        });
    }

    /// <summary>
    /// Observer role (not admin, not team member) on editable project:
    /// cannot make changes, cannot toggle, buttons disabled.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-082")]
    [Description("Observer role on editable project: all permissions false")]
    public void ComputePermissions_ObserverOnEditable_AllDisabled()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: false,
            amAdministrator: false,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.CanMakeChanges, Is.False, "Observer cannot make changes");
            Assert.That(result.ToggleEnabled, Is.False, "Observer cannot toggle");
            Assert.That(result.ButtonsEnabled, Is.False, "Observer buttons disabled");
        });
    }

    /// <summary>
    /// SBA base content with admin permissions: CanMakeChanges is true but
    /// ButtonsEnabled is false because SBA base content overrides.
    /// This tests that the isSbaBaseContent flag affects ONLY ButtonsEnabled.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-304")]
    [Property("ScenarioId", "TS-115")]
    [Description("SBA base content: CanMakeChanges true but buttons disabled")]
    public void ComputePermissions_SbaBaseContentWithAdmin_ButtonsDisabledOnly()
    {
        var result = InventoryInitService.ComputePermissions(
            amAdministratorOrTeamMember: true,
            amAdministrator: true,
            editable: true,
            supportsSeparateInventories: true,
            isSbaBaseContent: true
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.CanMakeChanges,
                Is.True,
                "SBA base content does not affect CanMakeChanges"
            );
            Assert.That(
                result.ToggleEnabled,
                Is.True,
                "SBA base content does not affect ToggleEnabled"
            );
            Assert.That(
                result.ButtonsEnabled,
                Is.False,
                "BHV-304: SBA base content disables buttons"
            );
        });
    }

    #endregion

    #region Exhaustive Boolean Combination Tests

    /// <summary>
    /// Tests all 32 combinations of the 5 boolean inputs to verify the permission
    /// computation formulas are correctly applied across all possible states.
    /// This is a property-based exhaustive test for the three formulas:
    ///   CanMakeChanges = amAdministratorOrTeamMember AND editable
    ///   ToggleEnabled = amAdministrator AND supportsSeparateInventories AND editable
    ///   ButtonsEnabled = CanMakeChanges AND NOT isSbaBaseContent
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("BehaviorId", "BHV-311")]
    [Property("ScenarioId", "TS-081")]
    [Description(
        "Exhaustive: All 32 boolean combinations produce correct PermissionState"
    )]
    public void ComputePermissions_AllBooleanCombinations_MatchFormulas()
    {
        var boolValues = new[] { false, true };
        var failures = new List<string>();

        foreach (bool adminOrTeam in boolValues)
        foreach (bool admin in boolValues)
        foreach (bool editable in boolValues)
        foreach (bool separateInventories in boolValues)
        foreach (bool sbaBase in boolValues)
        {
            var result = InventoryInitService.ComputePermissions(
                amAdministratorOrTeamMember: adminOrTeam,
                amAdministrator: admin,
                editable: editable,
                supportsSeparateInventories: separateInventories,
                isSbaBaseContent: sbaBase
            );

            bool expectedCanMake = adminOrTeam && editable;
            bool expectedToggle = admin && separateInventories && editable;
            bool expectedButtons = expectedCanMake && !sbaBase;

            string combo =
                $"adminOrTeam={adminOrTeam}, admin={admin}, "
                + $"editable={editable}, separate={separateInventories}, sba={sbaBase}";

            if (result.CanMakeChanges != expectedCanMake)
                failures.Add($"CanMakeChanges wrong for [{combo}]: "
                    + $"expected={expectedCanMake}, actual={result.CanMakeChanges}");

            if (result.ToggleEnabled != expectedToggle)
                failures.Add($"ToggleEnabled wrong for [{combo}]: "
                    + $"expected={expectedToggle}, actual={result.ToggleEnabled}");

            if (result.ButtonsEnabled != expectedButtons)
                failures.Add($"ButtonsEnabled wrong for [{combo}]: "
                    + $"expected={expectedButtons}, actual={result.ButtonsEnabled}");
        }

        Assert.That(
            failures,
            Is.Empty,
            $"Permission formula failures:\n{string.Join("\n", failures)}"
        );
    }

    #endregion
}

using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for InventoryOptionsService covering two capabilities:
///
/// CAP-009 GetOptionParameterType: pure computation that determines the UI control
/// type (YesNo, EditableCombo) for a check option parameter value editor.
///
/// CAP-008 SaveInventoryOptions: determines which option values have changed between
/// old and new dictionaries and returns save operations. Respects write protection
/// (VAL-005).
///
/// Source (CAP-009): EXT-008 (CMSOptionsForm.SetupParameterValue, PT9 CMSOptionsForm.cs:123-176)
/// Source (CAP-008): EXT-007 (CMSOptionsForm.cmdOK_Click, PT9 CMSOptionsForm.cs:64-86)
/// Contract (CAP-009): Section 4.10 M-010 GetOptionParameterType
/// Contract (CAP-008): Section 4.9 M-009 SaveInventoryOptions
/// Behavior: BHV-119 (CMSOption model and value resolution), BHV-130 (Default parameter
/// values initialization)
///
/// No mocking required - these are pure static computations with no dependencies.
/// </summary>
[TestFixture]
public class InventoryOptionsServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Acceptance test: Verifies all 4 MatchedPairs check options return correct control types.
    /// When this test passes, CAP-009 is complete.
    ///
    /// MatchedPairs options from PT9 MatchedPairsCheck.cs:95-129:
    ///   - Pairs: default "(/) [/] {/}" -> EditableCombo
    ///   - ClosedByParagraph: default "No" -> YesNo
    ///   - PoeticStyles: default "ib iq iq1 ... b" -> EditableCombo
    ///   - IntroductionOutlineStyles: default "io io1 io2 io3 io4" -> EditableCombo
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description(
        "Acceptance test: GetOptionParameterType returns correct control types for all MatchedPairs options"
    )]
    public void GetOptionParameterType_AllMatchedPairsOptions_ReturnCorrectControlTypes()
    {
        // Pairs: freeform string -> EditableCombo
        var pairs = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "Pairs",
                CurrentValue: "(/) [/] {/}",
                DefaultValue: "(/) [/] {/}",
                IsErrorStorage: false
            )
        );
        Assert.That(
            pairs.ControlType,
            Is.EqualTo(OptionControlType.EditableCombo),
            "Pairs option must be EditableCombo (freeform string, not Yes/No)"
        );

        // ClosedByParagraph: Yes/No boolean -> YesNo
        var closedByParagraph = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "ClosedByParagraph",
                CurrentValue: "No",
                DefaultValue: "No",
                IsErrorStorage: false
            )
        );
        Assert.That(
            closedByParagraph.ControlType,
            Is.EqualTo(OptionControlType.YesNo),
            "ClosedByParagraph must be YesNo (default is 'No')"
        );

        // PoeticStyles: freeform string -> EditableCombo
        var poeticStyles = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "PoeticStyles",
                CurrentValue: "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b",
                DefaultValue: "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b",
                IsErrorStorage: false
            )
        );
        Assert.That(
            poeticStyles.ControlType,
            Is.EqualTo(OptionControlType.EditableCombo),
            "PoeticStyles must be EditableCombo (freeform style list)"
        );

        // IntroductionOutlineStyles: freeform string -> EditableCombo
        var introOutline = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "IntroductionOutlineStyles",
                CurrentValue: "io io1 io2 io3 io4",
                DefaultValue: "io io1 io2 io3 io4",
                IsErrorStorage: false
            )
        );
        Assert.That(
            introOutline.ControlType,
            Is.EqualTo(OptionControlType.EditableCombo),
            "IntroductionOutlineStyles must be EditableCombo (freeform style list)"
        );
    }

    #endregion

    #region YesNo Control Type (ClosedByParagraph)

    /// <summary>
    /// When DefaultValue is "Yes", the option is a boolean -> YesNo control.
    /// PT9: CMSOption.IsYesNo returns true when DefaultValue == "Yes" || DefaultValue == "No".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("Option with DefaultValue 'Yes' returns YesNo control type")]
    public void GetOptionParameterType_DefaultValueYes_ReturnsYesNo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "SomeYesOption",
                CurrentValue: "Yes",
                DefaultValue: "Yes",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.YesNo));
    }

    /// <summary>
    /// When DefaultValue is "No", the option is a boolean -> YesNo control.
    /// This is the case for ClosedByParagraph in MatchedPairsCheck.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("Option with DefaultValue 'No' returns YesNo control type")]
    public void GetOptionParameterType_DefaultValueNo_ReturnsYesNo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "ClosedByParagraph",
                CurrentValue: "No",
                DefaultValue: "No",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.YesNo));
    }

    /// <summary>
    /// YesNo options must return AvailableValues of ["Yes", "No"].
    /// PT9: CMSOptionsForm.SetupParameterValue adds yesValue and noValue to combobox items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("YesNo option returns AvailableValues ['Yes', 'No']")]
    public void GetOptionParameterType_YesNoOption_ReturnsYesNoAvailableValues()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "ClosedByParagraph",
                CurrentValue: "No",
                DefaultValue: "No",
                IsErrorStorage: false
            )
        );

        Assert.That(result.AvailableValues, Is.Not.Null);
        Assert.That(
            result.AvailableValues,
            Is.EqualTo(new[] { "Yes", "No" }),
            "YesNo options must provide exactly ['Yes', 'No'] as available values"
        );
    }

    /// <summary>
    /// YesNo option with current value "Yes" passes through the current value.
    /// PT9: SetupParameterValue sets SelectedIndex = 0 when value == "Yes".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("YesNo option with current value 'Yes' preserves current value")]
    public void GetOptionParameterType_YesNoCurrentValueYes_PreservesCurrentValue()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "ClosedByParagraph",
                CurrentValue: "Yes",
                DefaultValue: "No",
                IsErrorStorage: false
            )
        );

        Assert.That(result.CurrentValue, Is.EqualTo("Yes"));
    }

    /// <summary>
    /// YesNo option with current value "No" passes through the current value.
    /// PT9: SetupParameterValue sets SelectedIndex = 1 when value != "Yes".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("YesNo option with current value 'No' preserves current value")]
    public void GetOptionParameterType_YesNoCurrentValueNo_PreservesCurrentValue()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "ClosedByParagraph",
                CurrentValue: "No",
                DefaultValue: "No",
                IsErrorStorage: false
            )
        );

        Assert.That(result.CurrentValue, Is.EqualTo("No"));
    }

    #endregion

    #region EditableCombo Control Type (Pairs, PoeticStyles, IntroductionOutlineStyles)

    /// <summary>
    /// When DefaultValue is neither "Yes" nor "No", the option is freeform -> EditableCombo.
    /// This applies to Pairs, PoeticStyles, and IntroductionOutlineStyles in MatchedPairsCheck.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("Option with non-boolean DefaultValue returns EditableCombo")]
    public void GetOptionParameterType_NonBooleanDefault_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "Pairs",
                CurrentValue: "(/) [/] {/}",
                DefaultValue: "(/) [/] {/}",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
    }

    /// <summary>
    /// EditableCombo for Pairs option: current value is passed through.
    /// PT9: SetupParameterValue sets cmbValue.Text = value for non-YesNo, non-ListAllTexts options.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("EditableCombo Pairs option preserves current value")]
    public void GetOptionParameterType_PairsOption_PreservesCurrentValue()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "Pairs",
                CurrentValue: "(/) [/] {/} </\\>",
                DefaultValue: "(/) [/] {/}",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.CurrentValue,
            Is.EqualTo("(/) [/] {/} </\\>"),
            "EditableCombo must pass through the current value unchanged"
        );
    }

    /// <summary>
    /// PoeticStyles is freeform string, returns EditableCombo.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("PoeticStyles option returns EditableCombo")]
    public void GetOptionParameterType_PoeticStyles_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "PoeticStyles",
                CurrentValue: "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b",
                DefaultValue: "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
    }

    /// <summary>
    /// IntroductionOutlineStyles is freeform string, returns EditableCombo.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("IntroductionOutlineStyles option returns EditableCombo")]
    public void GetOptionParameterType_IntroductionOutlineStyles_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "IntroductionOutlineStyles",
                CurrentValue: "io io1 io2 io3 io4",
                DefaultValue: "io io1 io2 io3 io4",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
    }

    /// <summary>
    /// EditableCombo options may have null AvailableValues when no suggestions are provided.
    /// In the static/pure computation variant (without project scanning), AvailableValues
    /// may be null since gathering suggestions requires ScrTextCollection access.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("EditableCombo option may have null AvailableValues for pure computation")]
    public void GetOptionParameterType_EditableCombo_AvailableValuesNullOrList()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "Pairs",
                CurrentValue: "(/) [/] {/}",
                DefaultValue: "(/) [/] {/}",
                IsErrorStorage: false
            )
        );

        // AvailableValues may be null (no project scanning) or a list of values.
        // The key constraint is that it must NOT be ["Yes", "No"].
        if (result.AvailableValues != null)
        {
            Assert.That(
                result.AvailableValues,
                Is.Not.EqualTo(new[] { "Yes", "No" }),
                "EditableCombo must not have YesNo available values"
            );
        }
    }

    #endregion

    #region Error Storage Parameters (TS-052)

    /// <summary>
    /// Error storage parameters (name starting with "err_") always return the default value,
    /// ignoring the stored/current value.
    /// PT9: CMSOption.GetValue: (val == "" || IsErrorStorage) ? DefaultValue : val
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-052")]
    [Description("Error storage parameter returns default value, ignoring current value")]
    public void GetOptionParameterType_ErrorStorage_ReturnsDefaultAsCurrentValue()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "err_pairs",
                CurrentValue: "custom_value_should_be_ignored",
                DefaultValue: "(/) [/] {/}",
                IsErrorStorage: true
            )
        );

        Assert.That(
            result.CurrentValue,
            Is.EqualTo("(/) [/] {/}"),
            "Error storage parameters must return DefaultValue, ignoring CurrentValue (TS-052)"
        );
    }

    /// <summary>
    /// Error storage parameter still determines the correct control type based on DefaultValue.
    /// An error storage param with DefaultValue "No" would be YesNo.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-052")]
    [Description("Error storage YesNo option returns YesNo control type")]
    public void GetOptionParameterType_ErrorStorageYesNo_ReturnsYesNoControlType()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "err_closedByParagraph",
                CurrentValue: "Yes",
                DefaultValue: "No",
                IsErrorStorage: true
            )
        );

        Assert.That(
            result.ControlType,
            Is.EqualTo(OptionControlType.YesNo),
            "Error storage YesNo option still returns YesNo control type"
        );
        Assert.That(
            result.CurrentValue,
            Is.EqualTo("No"),
            "Error storage YesNo option must use DefaultValue as current value"
        );
    }

    /// <summary>
    /// Error storage parameter with EditableCombo default returns EditableCombo and uses default.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-052")]
    [Description("Error storage EditableCombo option returns EditableCombo with default value")]
    public void GetOptionParameterType_ErrorStorageEditableCombo_ReturnsEditableComboWithDefault()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "err_styles",
                CurrentValue: "custom",
                DefaultValue: "default_styles",
                IsErrorStorage: true
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
        Assert.That(
            result.CurrentValue,
            Is.EqualTo("default_styles"),
            "Error storage must override current value with default"
        );
    }

    #endregion

    #region NullValue Handling (TS-051 adapted)

    /// <summary>
    /// When CurrentValue is empty string (which is what CMSOption.GetValue returns for "NullValue"),
    /// the service should pass through empty string as CurrentValue.
    /// PT9: SetupParameterValue converts "NullValue" to "" before setting up the control.
    /// The contract input already provides the resolved value (empty string), not raw "NullValue".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("Empty current value (from NullValue resolution) is preserved")]
    public void GetOptionParameterType_EmptyCurrentValue_PreservesEmpty()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "PoeticStyles",
                CurrentValue: "",
                DefaultValue: "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.CurrentValue,
            Is.EqualTo(""),
            "Empty current value (resolved from NullValue) must be preserved as empty string"
        );
        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
    }

    /// <summary>
    /// Empty current value on a YesNo option still returns YesNo control type.
    /// PT9: SetupParameterValue: if value is empty for YesNo, selects index 1 (No).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("Empty current value on YesNo option still returns YesNo")]
    public void GetOptionParameterType_EmptyCurrentValueYesNo_ReturnsYesNo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "ClosedByParagraph",
                CurrentValue: "",
                DefaultValue: "No",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.YesNo));
        Assert.That(
            result.CurrentValue,
            Is.EqualTo(""),
            "Empty current value must be preserved even for YesNo options"
        );
    }

    #endregion

    #region DefaultValue Boundary Cases

    /// <summary>
    /// DefaultValue that contains "Yes" as a substring but is not exactly "Yes" is not YesNo.
    /// E.g., "Yesterday" should return EditableCombo.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("DefaultValue containing 'Yes' as substring is not YesNo")]
    public void GetOptionParameterType_DefaultContainsYesSubstring_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "SomeOption",
                CurrentValue: "Yesterday",
                DefaultValue: "Yesterday",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.ControlType,
            Is.EqualTo(OptionControlType.EditableCombo),
            "Only exact 'Yes' or 'No' DefaultValue triggers YesNo, not substrings"
        );
    }

    /// <summary>
    /// DefaultValue "yes" (lowercase) should NOT be treated as YesNo.
    /// PT9: CMSOption.IsYesNo checks DefaultValue == yesValue where yesValue = "Yes" (exact match).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("DefaultValue 'yes' (lowercase) is NOT YesNo - case sensitive")]
    public void GetOptionParameterType_LowercaseYes_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "SomeOption",
                CurrentValue: "yes",
                DefaultValue: "yes",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.ControlType,
            Is.EqualTo(OptionControlType.EditableCombo),
            "IsYesNo is case-sensitive: 'yes' != 'Yes'"
        );
    }

    /// <summary>
    /// DefaultValue "no" (lowercase) should NOT be treated as YesNo.
    /// PT9: CMSOption.IsYesNo checks DefaultValue == noValue where noValue = "No" (exact match).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("DefaultValue 'no' (lowercase) is NOT YesNo - case sensitive")]
    public void GetOptionParameterType_LowercaseNo_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "SomeOption",
                CurrentValue: "no",
                DefaultValue: "no",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.ControlType,
            Is.EqualTo(OptionControlType.EditableCombo),
            "IsYesNo is case-sensitive: 'no' != 'No'"
        );
    }

    /// <summary>
    /// Empty DefaultValue is not YesNo -> EditableCombo.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("Empty DefaultValue returns EditableCombo")]
    public void GetOptionParameterType_EmptyDefaultValue_ReturnsEditableCombo()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "SomeOption",
                CurrentValue: "",
                DefaultValue: "",
                IsErrorStorage: false
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
    }

    #endregion

    #region CurrentValue Pass-Through

    /// <summary>
    /// Non-error-storage option preserves the provided CurrentValue exactly.
    /// PT9: SetupParameterValue sets cmbValue.Text = value (for EditableCombo)
    /// or selects by value (for YesNo).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("Non-error-storage option preserves CurrentValue exactly")]
    public void GetOptionParameterType_NonErrorStorage_PreservesCurrentValue()
    {
        const string customValue = "q q1 q2 custom_marker";
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "PoeticStyles",
                CurrentValue: customValue,
                DefaultValue: "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.CurrentValue,
            Is.EqualTo(customValue),
            "Non-error-storage must preserve the provided CurrentValue"
        );
    }

    /// <summary>
    /// Verify that when CurrentValue differs from DefaultValue, it is preserved.
    /// This is the common case when a user has customized an option.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("Custom CurrentValue different from DefaultValue is preserved")]
    public void GetOptionParameterType_CustomizedPairsOption_PreservesCurrentValue()
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: "Pairs",
                CurrentValue: "(/) [/] {/} </\\> \u00ab/\u00bb",
                DefaultValue: "(/) [/] {/}",
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.CurrentValue,
            Is.EqualTo("(/) [/] {/} </\\> \u00ab/\u00bb"),
            "Customized pairs value with Unicode characters must be preserved"
        );
    }

    #endregion

    #region Combined Behavior: ErrorStorage + YesNo/EditableCombo

    /// <summary>
    /// Parametrized test: verify error storage always overrides current value with default,
    /// for both YesNo and EditableCombo control types.
    /// </summary>
    [TestCase("err_boolOpt", "Yes", "No", true, OptionControlType.YesNo, "No")]
    [TestCase("err_boolOpt2", "No", "Yes", true, OptionControlType.YesNo, "Yes")]
    [TestCase("err_stringOpt", "custom", "default_val", true, OptionControlType.EditableCombo, "default_val")]
    [TestCase("err_pairs", "(/) [/]", "(/) [/] {/}", true, OptionControlType.EditableCombo, "(/) [/] {/}")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-052")]
    [Description("Error storage parameters use default value regardless of control type")]
    public void GetOptionParameterType_ErrorStorage_UsesDefaultValue(
        string optionName,
        string currentValue,
        string defaultValue,
        bool isErrorStorage,
        OptionControlType expectedControlType,
        string expectedCurrentValue
    )
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: optionName,
                CurrentValue: currentValue,
                DefaultValue: defaultValue,
                IsErrorStorage: isErrorStorage
            )
        );

        Assert.That(result.ControlType, Is.EqualTo(expectedControlType));
        Assert.That(
            result.CurrentValue,
            Is.EqualTo(expectedCurrentValue),
            $"Error storage '{optionName}' must use default '{defaultValue}' instead of current '{currentValue}'"
        );
    }

    #endregion

    #region Non-ErrorStorage Parametrized Tests

    /// <summary>
    /// Parametrized test: verify correct control type for various non-error-storage options.
    /// </summary>
    [TestCase("ClosedByParagraph", "No", "No", OptionControlType.YesNo)]
    [TestCase("ClosedByParagraph", "Yes", "No", OptionControlType.YesNo)]
    [TestCase("Pairs", "(/) [/] {/}", "(/) [/] {/}", OptionControlType.EditableCombo)]
    [TestCase("PoeticStyles", "q q1 q2", "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b", OptionControlType.EditableCombo)]
    [TestCase("IntroductionOutlineStyles", "io io1 io2 io3 io4", "io io1 io2 io3 io4", OptionControlType.EditableCombo)]
    [TestCase("SomeYesOption", "Yes", "Yes", OptionControlType.YesNo)]
    [TestCase("SomeNoOption", "No", "No", OptionControlType.YesNo)]
    [TestCase("AnyOtherOption", "value", "default", OptionControlType.EditableCombo)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-008")]
    [Description("Parametrized: correct control type for various option configurations")]
    public void GetOptionParameterType_VariousOptions_ReturnsCorrectControlType(
        string optionName,
        string currentValue,
        string defaultValue,
        OptionControlType expectedControlType
    )
    {
        var result = InventoryOptionsService.GetOptionParameterType(
            new GetOptionParameterTypeInput(
                OptionName: optionName,
                CurrentValue: currentValue,
                DefaultValue: defaultValue,
                IsErrorStorage: false
            )
        );

        Assert.That(
            result.ControlType,
            Is.EqualTo(expectedControlType),
            $"Option '{optionName}' with default '{defaultValue}' must return {expectedControlType}"
        );
    }

    #endregion

    // ========================================================================
    // CAP-008: SaveInventoryOptions
    //
    // Source: EXT-007 (CMSOptionsForm.cmdOK_Click, PT9 CMSOptionsForm.cs:64-86)
    // Contract: Section 4.9 M-009: SaveInventoryOptions
    // Behaviors: BHV-119, BHV-130
    // Validation: VAL-005 (write protection check)
    //
    // The PT9 save logic:
    //   1. Check write protection (scrText.IsNonProtectedText())
    //   2. For each option, compare new value against stored value
    //   3. Only persist values that have actually changed
    //   4. Call scrText.Save() once if any values were modified
    //
    // Test design: Tests call InventoryOptionsService.DetermineOptionChanges()
    // with old/new value dictionaries plus a write-protection flag. The method
    // returns a SaveInventoryOptionsResult indicating which settings changed and
    // whether the save was blocked by write protection. This separates the
    // testable business logic from ParatextData infrastructure (ScrText, Settings).
    // ========================================================================

    #region CAP-008 Acceptance Test

    /// <summary>
    /// Acceptance test: Verifies end-to-end save behavior:
    /// - Changed Pairs value is detected as a save operation
    /// - Unchanged ClosedByParagraph value is NOT included
    /// - Write-protected project returns false with no changes
    ///
    /// When this test passes, CAP-008 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ExtractionId", "EXT-007")]
    [Description(
        "Acceptance test: SaveInventoryOptions persists only changed values "
            + "and respects write-protection (spec-007)"
    )]
    public void SaveInventoryOptions_ChangedPairsAndWriteProtection_CorrectBehavior()
    {
        // Part 1: Non-protected project with one changed value
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} </>" },
            { "ClosedByParagraph", "No" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Non-protected project should succeed");
            Assert.That(
                result.ChangedSettings,
                Has.Count.EqualTo(1),
                "Only Pairs changed, ClosedByParagraph unchanged"
            );
            Assert.That(
                result.ChangedSettings[0].ParameterName,
                Is.EqualTo("Pairs"),
                "Changed setting must be Pairs"
            );
            Assert.That(
                result.ChangedSettings[0].Value,
                Is.EqualTo("(/) [/] {/} </>"),
                "Changed value must be the new value"
            );
        });

        // Part 2: Write-protected project returns false
        var protectedResult = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: true
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                protectedResult.Success,
                Is.False,
                "Write-protected project must return false (VAL-005)"
            );
            Assert.That(
                protectedResult.ChangedSettings,
                Is.Empty,
                "Write-protected project must have no changed settings"
            );
        });
    }

    #endregion

    #region CAP-008 Write Protection (VAL-005)

    /// <summary>
    /// Write-protected project: Save silently skips, returns false.
    /// PT9: if (scrText.IsNonProtectedText()) { ... } -- else falls through to close dialog.
    /// The dialog closes without saving. No error is thrown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-109")]
    [Property("ValidationRule", "VAL-005")]
    [Description("Write-protected project silently skips save and returns false (TS-109)")]
    public void DetermineOptionChanges_WriteProtected_ReturnsFalseNoChanges()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} </>" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: true
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Write-protected must return false");
            Assert.That(
                result.ChangedSettings,
                Is.Empty,
                "Write-protected must produce no changes"
            );
        });
    }

    /// <summary>
    /// Write-protected project with no actual changes: still returns false.
    /// Even though nothing would be saved anyway, the write-protection check
    /// happens first and determines the result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-109")]
    [Property("ValidationRule", "VAL-005")]
    [Description("Write-protected project returns false even when no values changed")]
    public void DetermineOptionChanges_WriteProtectedNoChanges_ReturnsFalse()
    {
        var values = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            values,
            new Dictionary<string, string>(values),
            isWriteProtected: true
        );

        Assert.That(result.Success, Is.False, "Write-protected always returns false");
    }

    #endregion

    #region CAP-008 Happy Path: Changed Values Saved (TS-108)

    /// <summary>
    /// Single option changed: Pairs updated from default to custom value.
    /// PT9: cmdOK_Click iterates optionValues, compares against Settings.GetSetting,
    /// calls SetSetting for changed values.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Single changed Pairs value produces one save operation (TS-108)")]
    public void DetermineOptionChanges_PairsChanged_ReturnsOneSaveOperation()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} </>" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ChangedSettings, Has.Count.EqualTo(1));
            Assert.That(result.ChangedSettings[0].ParameterName, Is.EqualTo("Pairs"));
            Assert.That(result.ChangedSettings[0].Value, Is.EqualTo("(/) [/] {/} </>"));
        });
    }

    /// <summary>
    /// Multiple options changed: all 4 MatchedPairs options modified simultaneously.
    /// PT9: iterates all keys in optionValues, saves each changed one.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Multiple changed options produce multiple save operations")]
    public void DetermineOptionChanges_MultipleChanged_ReturnsAllChanges()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
            { "PoeticStyles", "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b" },
            { "IntroductionOutlineStyles", "io io1 io2 io3 io4" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} </>" },
            { "ClosedByParagraph", "Yes" },
            { "PoeticStyles", "q q1 q2" },
            { "IntroductionOutlineStyles", "io io1" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(
                result.ChangedSettings,
                Has.Count.EqualTo(4),
                "All 4 options changed"
            );

            var changedNames = result.ChangedSettings.Select(s => s.ParameterName).ToArray();
            Assert.That(changedNames, Does.Contain("Pairs"));
            Assert.That(changedNames, Does.Contain("ClosedByParagraph"));
            Assert.That(changedNames, Does.Contain("PoeticStyles"));
            Assert.That(changedNames, Does.Contain("IntroductionOutlineStyles"));
        });
    }

    /// <summary>
    /// Mixed changed and unchanged: only changed values appear in result.
    /// PT9: cmdOK_Click only calls SetSetting when newValue != currentSetting.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Only changed values appear in save operations; unchanged are excluded")]
    public void DetermineOptionChanges_MixedChangedUnchanged_OnlyChangedIncluded()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
            { "PoeticStyles", "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b" },
            { "IntroductionOutlineStyles", "io io1 io2 io3 io4" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} </>" },
            { "ClosedByParagraph", "No" },
            { "PoeticStyles", "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b" },
            { "IntroductionOutlineStyles", "io io1 io2 io3 io4" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(
                result.ChangedSettings,
                Has.Count.EqualTo(1),
                "Only Pairs changed"
            );
            Assert.That(result.ChangedSettings[0].ParameterName, Is.EqualTo("Pairs"));
        });
    }

    /// <summary>
    /// Changed settings include the new value, not the old value.
    /// This verifies the result contains what should be persisted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Changed setting value is the new value, not the old")]
    public void DetermineOptionChanges_ChangedValue_ContainsNewValue()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "ClosedByParagraph", "No" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "ClosedByParagraph", "Yes" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.That(
            result.ChangedSettings[0].Value,
            Is.EqualTo("Yes"),
            "Must persist the NEW value, not the old"
        );
    }

    #endregion

    #region CAP-008 No Changes

    /// <summary>
    /// All values unchanged: returns success with empty changes list.
    /// PT9: if no values differ, modified stays false and scrText.Save() is not called.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("No changes results in success with empty changes list")]
    public void DetermineOptionChanges_NoChanges_ReturnsSuccessEmptyList()
    {
        var values = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
            { "PoeticStyles", "ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b" },
            { "IntroductionOutlineStyles", "io io1 io2 io3 io4" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            values,
            new Dictionary<string, string>(values),
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "No error occurred, success should be true");
            Assert.That(
                result.ChangedSettings,
                Is.Empty,
                "No values changed, so no save operations"
            );
        });
    }

    /// <summary>
    /// Both dictionaries empty: returns success with empty changes.
    /// This edge case should not occur in practice but must not throw.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Empty dictionaries result in success with no changes")]
    public void DetermineOptionChanges_EmptyDictionaries_ReturnsSuccessEmpty()
    {
        var result = InventoryOptionsService.DetermineOptionChanges(
            new Dictionary<string, string>(),
            new Dictionary<string, string>(),
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ChangedSettings, Is.Empty);
        });
    }

    #endregion

    #region CAP-008 NullValue Sentinel Handling (TS-051)

    /// <summary>
    /// When a value was originally "NullValue" (explicit empty sentinel in PT9),
    /// the PAPI layer resolves this to empty string before calling the service.
    /// If old value is empty and new value is non-empty, it counts as a change.
    ///
    /// PT9: CMSOption.GetValue returns "" for stored "NullValue" (BHV-119).
    /// The resolved empty string is what appears in oldValues.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description(
        "NullValue sentinel (resolved to empty string) detected as change "
            + "when new value is non-empty"
    )]
    public void DetermineOptionChanges_OldEmptyNewNonEmpty_DetectsChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "PoeticStyles", "" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "PoeticStyles", "q q1 q2 q3" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ChangedSettings, Has.Count.EqualTo(1));
            Assert.That(result.ChangedSettings[0].ParameterName, Is.EqualTo("PoeticStyles"));
            Assert.That(
                result.ChangedSettings[0].Value,
                Is.EqualTo("q q1 q2 q3"),
                "New non-empty value replaces NullValue-resolved empty string"
            );
        });
    }

    /// <summary>
    /// Both old and new are empty string (NullValue -> NullValue): no change detected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("Both old and new empty (NullValue sentinel) means no change")]
    public void DetermineOptionChanges_BothEmpty_NoChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "PoeticStyles", "" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "PoeticStyles", "" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.That(result.ChangedSettings, Is.Empty, "Both empty means no change");
    }

    /// <summary>
    /// Old value is non-empty, new value is empty: this is a valid change.
    /// The user cleared the value. PT9 uses EscapeEmptyValue to convert "" to "NullValue"
    /// for storage, but the comparison layer sees the raw empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-051")]
    [Description("Non-empty to empty is a valid change (user cleared value)")]
    public void DetermineOptionChanges_OldNonEmptyNewEmpty_DetectsChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "PoeticStyles", "q q1 q2" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "PoeticStyles", "" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.ChangedSettings, Has.Count.EqualTo(1));
            Assert.That(
                result.ChangedSettings[0].Value,
                Is.EqualTo(""),
                "Empty string must be persisted as the new value"
            );
        });
    }

    #endregion

    #region CAP-008 Default-Only-When-Empty (TS-063, BHV-130)

    /// <summary>
    /// When the old value already has a custom value and the new value is the same
    /// custom value, no change is detected. BHV-130 says: default is only set when
    /// the current setting is empty. This test confirms that having a non-default
    /// value preserved means no save operation occurs.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-130")]
    [Property("ScenarioId", "TS-063")]
    [Description("Existing custom value preserved: no save when old equals new (TS-063)")]
    public void DetermineOptionChanges_CustomValuePreserved_NoChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "custom_pairs_value" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "custom_pairs_value" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.That(
            result.ChangedSettings,
            Is.Empty,
            "Custom value preserved (BHV-130: default not applied over existing value)"
        );
    }

    /// <summary>
    /// When old value equals default and new value also equals default, no change.
    /// This confirms the default-only-when-empty logic does not cause unnecessary saves.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-130")]
    [Property("ScenarioId", "TS-063")]
    [Description("Default value unchanged: no save operation when old == new == default")]
    public void DetermineOptionChanges_DefaultUnchanged_NoChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.That(result.ChangedSettings, Is.Empty, "Default unchanged -> no save operations");
    }

    #endregion

    #region CAP-008 New Option Key (setting not previously stored)

    /// <summary>
    /// When newValues contains a key not present in oldValues, it represents
    /// a setting that did not exist before (HasSetting == false in PT9).
    /// PT9: if (!scrText.Settings.HasSetting(parmName) || ...) -> always save.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("New key in newValues not present in oldValues is treated as a change")]
    public void DetermineOptionChanges_NewKeyNotInOld_TreatedAsChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(
                result.ChangedSettings,
                Has.Count.EqualTo(1),
                "ClosedByParagraph is new (not in old), so it must be saved"
            );
            Assert.That(
                result.ChangedSettings[0].ParameterName,
                Is.EqualTo("ClosedByParagraph")
            );
        });
    }

    /// <summary>
    /// Old values has extra key not in new values: that key is simply ignored.
    /// The service only iterates over newValues keys (matching PT9 behavior where
    /// optionValues contains the current form state).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Keys in oldValues but not in newValues are ignored (not deleted)")]
    public void DetermineOptionChanges_OldKeyNotInNew_Ignored()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
            { "ClosedByParagraph", "No" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.That(
            result.ChangedSettings,
            Is.Empty,
            "Pairs unchanged and ClosedByParagraph not in newValues -> no changes"
        );
    }

    #endregion

    #region CAP-008 Error Storage Parameters (TS-052)

    /// <summary>
    /// Error storage parameters (names starting with "err_") are handled by CMSOption.GetValue
    /// which always returns the default value. In the save flow, the old value would be the
    /// default (from GetValue) and the new value would also be the default (since the UI shows
    /// the default for error storage). So typically there is no change.
    ///
    /// However, if someone passes different old/new values for an err_ key, the comparison
    /// still works as a normal string comparison. The error storage behavior (TS-052) applies
    /// to value RESOLUTION (GetValue), not to save comparison.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-052")]
    [Description(
        "Error storage params with same old/new value produce no change (TS-052)"
    )]
    public void DetermineOptionChanges_ErrorStorageSameValue_NoChange()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "err_pairs", "(/) [/] {/}" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "err_pairs", "(/) [/] {/}" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.That(
            result.ChangedSettings,
            Is.Empty,
            "Error storage param with same old/new -> no change"
        );
    }

    #endregion

    #region CAP-008 Parametrized Change Detection

    /// <summary>
    /// Parametrized test covering various change detection scenarios.
    /// Each case provides old value, new value, and whether a change should be detected.
    /// </summary>
    [TestCase("Pairs", "(/) [/] {/}", "(/) [/] {/} </>", true, "Different value")]
    [TestCase("Pairs", "(/) [/] {/}", "(/) [/] {/}", false, "Same value")]
    [TestCase("ClosedByParagraph", "No", "Yes", true, "YesNo changed")]
    [TestCase("ClosedByParagraph", "Yes", "Yes", false, "YesNo unchanged")]
    [TestCase("PoeticStyles", "", "q q1", true, "Empty to non-empty")]
    [TestCase("PoeticStyles", "q q1", "", true, "Non-empty to empty")]
    [TestCase("PoeticStyles", "", "", false, "Both empty")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Parametrized change detection for various old/new value pairs")]
    public void DetermineOptionChanges_Parametrized_CorrectChangeDetection(
        string paramName,
        string oldValue,
        string newValue,
        bool expectChange,
        string scenario
    )
    {
        var oldValues = new Dictionary<string, string> { { paramName, oldValue } };
        var newValues = new Dictionary<string, string> { { paramName, newValue } };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        if (expectChange)
        {
            Assert.That(
                result.ChangedSettings,
                Has.Count.EqualTo(1),
                $"{scenario}: expected change for '{paramName}'"
            );
            Assert.That(result.ChangedSettings[0].Value, Is.EqualTo(newValue));
        }
        else
        {
            Assert.That(
                result.ChangedSettings,
                Is.Empty,
                $"{scenario}: expected no change for '{paramName}'"
            );
        }
    }

    #endregion

    #region CAP-008 Unicode and Special Characters

    /// <summary>
    /// Pairs values can contain Unicode punctuation characters (guillemets, etc.).
    /// Change detection must use exact string comparison, preserving Unicode.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Unicode punctuation pairs are compared correctly")]
    public void DetermineOptionChanges_UnicodePairs_ComparedExactly()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} \u00ab/\u00bb \u2018/\u2019" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.ChangedSettings, Has.Count.EqualTo(1));
            Assert.That(
                result.ChangedSettings[0].Value,
                Is.EqualTo("(/) [/] {/} \u00ab/\u00bb \u2018/\u2019"),
                "Unicode characters must be preserved in save value"
            );
        });
    }

    #endregion

    #region CAP-008 Result Structure

    /// <summary>
    /// The result type must expose Success (bool) and ChangedSettings (list).
    /// This test verifies the result structure for a successful save with changes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("BehaviorId", "BHV-119")]
    [Property("ScenarioId", "TS-108")]
    [Property("ExtractionId", "EXT-007")]
    [Description("Result structure has Success and ChangedSettings with ParameterName and Value")]
    public void DetermineOptionChanges_ResultStructure_HasExpectedProperties()
    {
        var oldValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/}" },
        };
        var newValues = new Dictionary<string, string>
        {
            { "Pairs", "(/) [/] {/} </>" },
        };

        var result = InventoryOptionsService.DetermineOptionChanges(
            oldValues,
            newValues,
            isWriteProtected: false
        );

        // Verify the result type exposes the required properties
        Assert.That(result.Success, Is.TypeOf<bool>());
        Assert.That(result.ChangedSettings, Is.Not.Null);
        Assert.That(result.ChangedSettings, Is.InstanceOf<List<SaveOperation>>());

        var change = result.ChangedSettings[0];
        Assert.That(change.ParameterName, Is.Not.Null.And.Not.Empty);
        Assert.That(change.Value, Is.Not.Null);
    }

    #endregion
}

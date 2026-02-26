using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-009 GetOptionParameterType: pure computation that determines the UI control
/// type (YesNo, EditableCombo) for a check option parameter value editor.
///
/// Source: EXT-008 (CMSOptionsForm.SetupParameterValue, PT9 CMSOptionsForm.cs:123-176)
/// Contract: Section 4.10 M-010 GetOptionParameterType
/// Behavior: BHV-119 (CMSOption model and value resolution)
///
/// The PT9 logic branches:
///   - IsYesNo (DefaultValue is "Yes" or "No") -> YesNo control with ["Yes", "No"] values
///   - ListAllTexts -> ProjectList control (not reachable via flat input contract)
///   - Otherwise -> EditableCombo control
///   - Error storage params (name starts with "err_") -> always use default value
///
/// No mocking required - this is a pure static computation with no dependencies.
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
}

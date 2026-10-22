namespace Paranext.DataProvider.Checks;

/// <summary>
/// Values of <see cref="CheckSetupState.Status"/> and <see cref="CheckSetupState.Reason"/>. These
/// must match the CheckSetupStatus type and the localized string keys defined in TypeScript.
/// </summary>
internal static class CheckSetupStatus
{
    public const string Ready = "ready";
    public const string SetupRequired = "setupRequired";
    public const string NotApplicable = "notApplicable";

    public const string QuotationMarksNotUsedReason =
        "%checkSetup_notApplicable_quotationMarksNotUsed%";
    public const string QuotationTypesNotEnabledReason =
        "%checkSetup_notApplicable_quotationTypesNotEnabled%";
}

using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.ProjectSettingsAccess;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Works out whether a check is ready to run on a project, needs setup first, or does not apply.
/// </summary>
/// <remarks>
/// Paratext 9's <see cref="ScriptureCheckBase.SetupComplete"/> treats any non-empty Quotes setting
/// as set up, so the quotation checks report "set up" when the project says quotation marks are not
/// used, or when the rules are invalid, and then throw while running. Reading
/// <see cref="ScrText.QuotationMarkInfo"/> runs Paratext 9's own validation of those rules.
/// Paratext 9 also only offers the Quotation types check when an administrator has turned it on in
/// Quotation rules, and never for Study Bible Additions projects.
/// </remarks>
internal static class CheckSetupStatusLookup
{
    private static readonly string s_quotationId = CheckType.Quotation.InternalValue;
    private static readonly string s_quotationTypesId = CheckType.QuotationTypes.InternalValue;

    /// <summary>
    /// Only the quotation checks can be not applicable, so callers that only need to skip such
    /// checks can avoid the cost of a lookup for every other check.
    /// </summary>
    public static bool CanBeNotApplicable(string checkId) =>
        checkId == s_quotationId || checkId == s_quotationTypesId;

    public static CheckSetupState Lookup(string checkId, ScriptureCheckBase check, ScrText scrText)
    {
        var isQuotationTypes = checkId == s_quotationTypesId;
        if (
            isQuotationTypes
            && (scrText.Settings.IsStudyBibleAdditions || !scrText.Settings.QuoteTypesCheckEnabled)
        )
            return new(
                CheckSetupStatus.NotApplicable,
                CheckSetupStatus.QuotationTypesNotEnabledReason
            );

        if (!check.SetupComplete)
            return new(CheckSetupStatus.SetupRequired);

        if (isQuotationTypes || checkId == s_quotationId)
        {
            try
            {
                _ = scrText.QuotationMarkInfo;
            }
            catch (InvalidQuoteSettingsException ex)
            {
                return ex.QuotesNotInUse
                    ? new(
                        CheckSetupStatus.NotApplicable,
                        CheckSetupStatus.QuotationMarksNotUsedReason
                    )
                    : new(CheckSetupStatus.SetupRequired);
            }
        }

        return new(CheckSetupStatus.Ready);
    }
}

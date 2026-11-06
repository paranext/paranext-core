using System.Diagnostics.CodeAnalysis;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider.Checks;

/// <summary>Quotation rules that the quotation checks accept, shared by the check tests.</summary>
[ExcludeFromCodeCoverage]
internal static class QuotationRulesTestHelper
{
    public static void SetValidQuotationRules(ScrText scrText)
    {
        scrText.Settings.Quotes = new QuoteMarks("“", "”");
        scrText.Settings.InnerQuotes = new QuoteMarks("‘", "’");
        // The dummy project continues quotes by default, which requires somewhere to continue them
        scrText.Settings.ContinueAt = "p";
    }
}

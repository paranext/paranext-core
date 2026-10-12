using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Checks;
using Paratext.Checks;
using Paratext.Data.Checking;
using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider.Checks;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class CheckSetupStatusLookupTests : PapiTestBase
{
    private static readonly string s_quotationId = CheckType.Quotation.InternalValue;
    private static readonly string s_quotationTypesId = CheckType.QuotationTypes.InternalValue;
    private static readonly string s_repeatedWordId = CheckType.RepeatedWord.InternalValue;

    private DummyScrText _scrText = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        ParatextProjects.FakeAddProject(CreateProjectDetails(_scrText), _scrText);
    }

    [TearDown]
    public void TestTearDownScrText()
    {
        _scrText?.Dispose();
    }

    private CheckSetupState Lookup(string checkId) =>
        CheckSetupStatusLookup.Lookup(
            checkId,
            CheckFactory.CreateCheck(checkId, new ChecksDataSource(_scrText)),
            _scrText
        );

    private void SetValidQuotes()
    {
        _scrText.Settings.Quotes = new QuoteMarks("“", "”");
        _scrText.Settings.InnerQuotes = new QuoteMarks("‘", "’");
        // The dummy project continues quotes by default, which requires somewhere to continue them
        _scrText.Settings.ContinueAt = "p";
    }

    [Test]
    public void OrdinaryCheck_IsReady() =>
        Assert.That(
            Lookup(s_repeatedWordId),
            Is.EqualTo(new CheckSetupState(CheckSetupStatus.Ready))
        );

    [Test]
    public void Quotation_EmptyQuotes_IsSetupRequired() =>
        Assert.That(Lookup(s_quotationId).Status, Is.EqualTo(CheckSetupStatus.SetupRequired));

    [Test]
    public void Quotation_QuotesNone_IsNotApplicable()
    {
        _scrText.Settings.Quotes = new QuoteMarks("");
        Assert.That(
            Lookup(s_quotationId),
            Is.EqualTo(
                new CheckSetupState(
                    CheckSetupStatus.NotApplicable,
                    CheckSetupStatus.QuotationMarksNotUsedReason
                )
            )
        );
    }

    [Test]
    public void Quotation_IncompleteInnerQuotes_IsSetupRequired()
    {
        _scrText.Settings.Quotes = new QuoteMarks("“", "”");
        _scrText.Settings.InnerQuotes = new QuoteMarks("‘", "");
        Assert.That(Lookup(s_quotationId).Status, Is.EqualTo(CheckSetupStatus.SetupRequired));
    }

    [Test]
    public void Quotation_ValidQuotes_IsReady()
    {
        SetValidQuotes();
        Assert.That(Lookup(s_quotationId).Status, Is.EqualTo(CheckSetupStatus.Ready));
    }

    [Test]
    public void QuotationTypes_SwitchOff_IsNotApplicableEvenWithEmptyQuotes()
    {
        _scrText.Settings.QuoteTypesCheckEnabled = false;
        Assert.That(
            Lookup(s_quotationTypesId),
            Is.EqualTo(
                new CheckSetupState(
                    CheckSetupStatus.NotApplicable,
                    CheckSetupStatus.QuotationTypesNotEnabledReason
                )
            )
        );
    }

    [Test]
    public void QuotationTypes_SwitchOn_ValidQuotes_IsReady()
    {
        SetValidQuotes();
        _scrText.Settings.QuoteTypesCheckEnabled = true;
        Assert.That(Lookup(s_quotationTypesId).Status, Is.EqualTo(CheckSetupStatus.Ready));
    }

    [Test]
    public void QuotationTypes_SwitchOn_QuotesNone_IsNotApplicableBecauseNotUsed()
    {
        _scrText.Settings.Quotes = new QuoteMarks("");
        _scrText.Settings.QuoteTypesCheckEnabled = true;
        Assert.That(
            Lookup(s_quotationTypesId).Reason,
            Is.EqualTo(CheckSetupStatus.QuotationMarksNotUsedReason)
        );
    }

    [Test]
    public void CanBeNotApplicable_OnlyForQuotationChecks()
    {
        Assert.Multiple(() =>
        {
            Assert.That(CheckSetupStatusLookup.CanBeNotApplicable(s_quotationId), Is.True);
            Assert.That(CheckSetupStatusLookup.CanBeNotApplicable(s_quotationTypesId), Is.True);
            Assert.That(CheckSetupStatusLookup.CanBeNotApplicable(s_repeatedWordId), Is.False);
        });
    }
}

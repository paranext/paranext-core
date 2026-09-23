using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;

namespace TestParanextDataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Checks Biblica licence detection against two fixtures:
/// <list type="bullet">
/// <item><c>biblica-restricted-texts.json</c> — Biblica's list of traditionally licensed texts: DBL
/// entries whose rights holder is Biblica and which are not open access.</item>
/// <item><c>biblica-license-survey.json</c> — a survey of every DBL resource in Platform.Bible's
/// resource list, each installed and its Settings.xml Copyright recorded. It holds every surveyed
/// row that mentions "Biblica"/"Bíblica" (Biblica, Inc. traditional and Open texts, plus Bible
/// Society texts that are not Biblica, Inc.), the two "Notification:" texts, and a few unrelated
/// controls.</item>
/// </list>
/// </summary>
[ExcludeFromCodeCoverage]
internal class BiblicaLicensingTests
{
    private sealed record SurveyRow(
        string DblId,
        string ShortName,
        string FullName,
        string Category,
        string Copyright,
        bool ExpectedRestricted,
        string? ExpectedCopyrightYears
    );

    private sealed record RestrictedText(string DblId, string ShortName, string FullName);

    private static readonly JsonSerializerOptions s_jsonOptions =
        new() { PropertyNameCaseInsensitive = true };

    private static T[] ReadFixture<T>(string fileName)
    {
        string path = Path.Combine(
            TestContext.CurrentContext.TestDirectory,
            "Projects",
            "DigitalBibleLibrary",
            "TestData",
            fileName
        );
        return JsonSerializer.Deserialize<T[]>(File.ReadAllText(path), s_jsonOptions)
            ?? throw new InvalidDataException($"Could not read {path}");
    }

    private static readonly Lazy<SurveyRow[]> s_surveyRows =
        new(() => ReadFixture<SurveyRow>("biblica-license-survey.json"));

    private static readonly Lazy<RestrictedText[]> s_restrictedTexts =
        new(() => ReadFixture<RestrictedText>("biblica-restricted-texts.json"));

    private static IEnumerable<TestCaseData> SurveyCases() =>
        s_surveyRows.Value.Select(row =>
            new TestCaseData(row).SetName($"{row.ShortName} {row.DblId} ({row.Category})")
        );

    private static IEnumerable<TestCaseData> RestrictedSurveyCases() =>
        s_surveyRows
            .Value.Where(row => row.ExpectedRestricted)
            .Select(row => new TestCaseData(row).SetName($"{row.ShortName} {row.DblId}"));

    [Test]
    public void Survey_HasTheExpectedNumberOfRestrictedTexts()
    {
        Assert.That(s_surveyRows.Value.Count(row => row.ExpectedRestricted), Is.EqualTo(55));
    }

    [Test]
    public void RestrictedModelTextIds_AreExactlyBiblicasList()
    {
        Assert.That(
            BiblicaLicensing.RestrictedModelTextIds,
            Is.EquivalentTo(s_restrictedTexts.Value.Select(text => text.DblId.ToLowerInvariant()))
        );
    }

    [TestCaseSource(nameof(SurveyCases))]
    public void IsRestrictedLicense_MatchesSurvey(object rowObject)
    {
        var row = (SurveyRow)rowObject;

        bool isRestricted = BiblicaLicensing.IsRestrictedLicense(
            row.Copyright,
            row.FullName,
            row.DblId
        );

        Assert.That(isRestricted, Is.EqualTo(row.ExpectedRestricted), row.Copyright);
    }

    [TestCaseSource(nameof(SurveyCases))]
    public void CopyrightRule_AgreesWithBiblicasListForEverySurveyedText(object rowObject)
    {
        // The rule, without the id, must reach the same answer as Biblica's list. It is what
        // catches a Biblica text added to the DBL after the list was made.
        var row = (SurveyRow)rowObject;
        // OBTT is Biblica Open but does not say so; without its id the rule cannot tell
        bool isOpenTextKnownOnlyById = row.DblId == "f6a5ef6e2e75a8b4";

        Assert.That(
            BiblicaLicensing.IsRestrictedLicense(row.Copyright, row.FullName, dblId: null),
            Is.EqualTo(
                BiblicaLicensing.IsRestrictedAsModelText(row.DblId) || isOpenTextKnownOnlyById
            ),
            row.Copyright
        );
    }

    [TestCaseSource(nameof(SurveyCases))]
    public void IsRestrictedAsModelText_MatchesSurvey(object rowObject)
    {
        var row = (SurveyRow)rowObject;

        Assert.That(
            BiblicaLicensing.IsRestrictedAsModelText(row.DblId),
            Is.EqualTo(row.ExpectedRestricted)
        );
    }

    [Test]
    public void IsRestrictedAsModelText_IgnoresCase()
    {
        // NIV11
        Assert.That(BiblicaLicensing.IsRestrictedAsModelText("71C6EAB17AE5B667"), Is.True);
    }

    [Test]
    public void IsRestrictedLicense_TextOnBiblicasList_IsRestrictedWhateverItsCopyrightSays()
    {
        // VCB is on Biblica's list; the list decides, even for a copyright the rule would miss
        Assert.That(
            BiblicaLicensing.IsRestrictedLicense("© Example", "Example", "ed484deed765564d"),
            Is.True
        );
    }

    [TestCase(null, null, null)]
    [TestCase("", "", "")]
    public void IsRestrictedLicense_MissingData_ReturnsFalse(
        string? copyright,
        string? fullName,
        string? dblId
    )
    {
        Assert.That(BiblicaLicensing.IsRestrictedLicense(copyright, fullName, dblId), Is.False);
    }

    [Test]
    public void IsRestrictedLicense_OpenWordingInCopyrightOnly_ReturnsFalse()
    {
        Assert.That(
            BiblicaLicensing.IsRestrictedLicense(
                "Biblica® Open Example Bible. Copyright © 2020 by Biblica, Inc.",
                "Example Bible",
                "0000000000000000"
            ),
            Is.False
        );
    }

    [TestCaseSource(nameof(RestrictedSurveyCases))]
    public void GetCopyrightYears_MatchesSurvey(object rowObject)
    {
        var row = (SurveyRow)rowObject;

        Assert.That(
            BiblicaLicensing.GetCopyrightYears(row.Copyright),
            Is.EqualTo(row.ExpectedCopyrightYears),
            row.Copyright
        );
    }

    [Test]
    public void GetCopyrightYears_TakesOnlyTheTextsOwnStatement()
    {
        // A text that quotes another text's copyright must not borrow its years
        Assert.That(
            BiblicaLicensing.GetCopyrightYears(
                "The Life of Christ™ Copyright © 2004, 2017 by Biblica, Inc. Scripture quotations "
                    + "from the NIV® Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc."
            ),
            Is.EqualTo("2004, 2017")
        );
    }

    [Test]
    public void GetCopyrightYears_ReadsYearsWrittenInOtherDigits()
    {
        // Burmese digits, as in the Burmese Contemporary Bible's copyright
        Assert.That(
            BiblicaLicensing.GetCopyrightYears("© Biblica Inc. ၁၉၈၅၊ ၂၀၂၄"),
            Is.EqualTo("1985, 2024")
        );
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("© Biblica, Inc. All rights reserved.")]
    public void GetCopyrightYears_NoYears_ReturnsEmpty(string? copyright)
    {
        Assert.That(BiblicaLicensing.GetCopyrightYears(copyright), Is.Empty);
    }
}

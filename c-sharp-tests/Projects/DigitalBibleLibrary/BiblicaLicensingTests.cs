using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Checks Biblica license detection against two fixtures:
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
    private const string NivCopyright =
        "The Holy Bible, New International Version® NIV® Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by Permission of Biblica, Inc.® All rights reserved worldwide.";

    // NIV11
    private const string ListedDblId = "71c6eab17ae5b667";

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
            new TestCaseData(row).SetArgDisplayNames(
                $"{row.ShortName} {row.DblId} ({row.Category})"
            )
        );

    private static IEnumerable<TestCaseData> RestrictedSurveyCases() =>
        s_surveyRows
            .Value.Where(row => row.ExpectedRestricted)
            .Select(row =>
                new TestCaseData(row).SetArgDisplayNames($"{row.ShortName} {row.DblId}")
            );

    [Test]
    public void Survey_HasTheExpectedNumberOfRestrictedTexts()
    {
        Assert.That(s_surveyRows.Value.Count(row => row.ExpectedRestricted), Is.EqualTo(55));
    }

    [Test]
    public void RestrictedTextIds_AreExactlyBiblicasList()
    {
        Assert.That(
            BiblicaLicensing.RestrictedTextIds,
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
            Is.EqualTo(BiblicaLicensing.IsOnRestrictedList(row.DblId) || isOpenTextKnownOnlyById),
            row.Copyright
        );
    }

    [TestCaseSource(nameof(SurveyCases))]
    public void IsOnRestrictedList_MatchesSurvey(object rowObject)
    {
        var row = (SurveyRow)rowObject;

        Assert.That(
            BiblicaLicensing.IsOnRestrictedList(row.DblId),
            Is.EqualTo(row.ExpectedRestricted)
        );
    }

    [Test]
    public void IsOnRestrictedList_IgnoresCase()
    {
        Assert.That(BiblicaLicensing.IsOnRestrictedList(ListedDblId.ToUpperInvariant()), Is.True);
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

    [TestCase("Biblica Open Example Bible. Copyright © 2020 by Biblica, Inc.", "Example Bible")]
    [TestCase("Copyright © 2020 by Biblica, Inc.", "Biblica Open Example Bible")]
    public void IsRestrictedLicense_OpenWordingWithoutRegisteredMark_ReturnsFalse(
        string copyright,
        string fullName
    )
    {
        Assert.That(
            BiblicaLicensing.IsRestrictedLicense(copyright, fullName, dblId: null),
            Is.False
        );
    }

    [TestCase("版權所有Biblica, Inc.", TestName = "{m}(Chinese letter before Biblica)")]
    [TestCase("حقوق النشرBiblica, Inc.", TestName = "{m}(Arabic letter before Biblica)")]
    [TestCase("© 2014 Biblica، Inc.", TestName = "{m}(Arabic comma before Inc)")]
    [TestCase("© 2014 Biblica，Inc.", TestName = "{m}(Full-width comma before Inc)")]
    [TestCase("© 2014 Biblica , Inc.", TestName = "{m}(Space before the comma)")]
    public void IsRestrictedLicense_BiblicaIncWithOtherScriptsAroundIt_ReturnsTrue(string copyright)
    {
        Assert.That(
            BiblicaLicensing.IsRestrictedLicense(copyright, "Example Bible", dblId: null),
            Is.True
        );
    }

    [Test]
    public void IsRestrictedLicense_BiblicaInsideALatinWord_ReturnsFalse()
    {
        Assert.That(
            BiblicaLicensing.IsRestrictedLicense(
                "© 2014 ExampleBiblica, Inc.",
                "Example Bible",
                dblId: null
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

    [Test]
    public void IsRestricted_ResourceWithBiblicaCopyright_ReturnsTrue()
    {
        // No DBLId is set, so the double's typed DBLId accessor falls back to a zip it does not
        // have; that must read as "no id", not fault
        using ResourceDummyScrText resource = new();
        resource.Settings.Copyright = NivCopyright;

        Assert.That(BiblicaLicensing.IsRestricted(resource), Is.True);
    }

    [Test]
    public void IsRestricted_ResourceOnBiblicasListWithNoCopyright_ReturnsTrue()
    {
        using ResourceDummyScrText resource = new();
        resource.Settings.DBLId = HexId.FromStr(ListedDblId);

        Assert.That(BiblicaLicensing.IsRestricted(resource), Is.True);
    }

    [Test]
    public void IsRestricted_OrdinaryResource_ReturnsFalse()
    {
        using ResourceDummyScrText resource = new();
        resource.Settings.Copyright = "© 2001 Example Bible Society. Used by permission.";
        resource.Settings.DBLId = HexId.FromStr("97196133a859179b");

        Assert.That(BiblicaLicensing.IsRestricted(resource), Is.False);
    }

    [Test]
    public void IsRestricted_EditableProjectWithBiblicaCopyright_ReturnsFalse()
    {
        // A Biblica translation team's own project carries Biblica's copyright
        using DummyScrText project = new();
        project.Settings.Copyright = NivCopyright;

        Assert.That(BiblicaLicensing.IsRestricted(project), Is.False);
    }

    [Test]
    public void IsRestricted_EditableProjectWithListedDblId_ReturnsFalse()
    {
        // Biblica's master project has the DBL id of the resource published from it
        using DummyScrText project = new();
        project.Settings.DBLId = HexId.FromStr(ListedDblId);

        Assert.That(BiblicaLicensing.IsRestricted(project), Is.False);
    }

    [TestCase(NivCopyright, true)]
    [TestCase("© 2001 Example Bible Society.", false)]
    public void IsRestricted_ResourceWithMalformedDblId_JudgesByCopyright(
        string copyright,
        bool expected
    )
    {
        using ResourceDummyScrText resource = new();
        resource.Settings.Copyright = copyright;
        resource.Settings.SetSetting(Setting.DBLId, "not a hex id");

        Assert.That(BiblicaLicensing.IsRestricted(resource), Is.EqualTo(expected));
    }

    [Test]
    public void IsRestricted_ReadsHtmlCopyrightAsDecodedPlainText()
    {
        using ResourceDummyScrText resource = new();
        resource.Settings.Copyright =
            "<p>Copyright &#169; 2011 by <b>Biblica&#44; Inc.</b></p><p>Used by permission.</p>";

        Assert.That(BiblicaLicensing.IsRestricted(resource), Is.True);
    }
}

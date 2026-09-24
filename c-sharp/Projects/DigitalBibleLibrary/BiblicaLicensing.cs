using System.Net;
using System.Text.RegularExpressions;
using Paratext.Data;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Identifies Biblica, Inc.'s traditionally licensed texts. Biblica provides these as reference
/// texts, but its license does not allow them to be used as the basis of a new translation or
/// other derivative work. Biblica® Open (Creative Commons) texts have no such restriction.
/// </summary>
/// <remarks>
/// Paratext 9 has no equivalent; it only shows a banner for copyrights that start with
/// "Notification:" (see <see cref="CopyrightNotice"/>).
/// </remarks>
public static partial class BiblicaLicensing
{
    /// <summary>
    /// DBL ids of Biblica's traditionally licensed texts, lower case: DBL entries whose rights
    /// holder is Biblica and which are not open access (the fixture
    /// <c>biblica-restricted-texts.json</c> holds the list this came from). A resource that is not
    /// installed yet has no copyright to read, so pickers that list the DBL catalog rely on this
    /// list alone.
    /// </summary>
    // This list does not pick up new Biblica texts by itself: refresh it from the DBL (rights holder
    // Biblica, not open access) together with biblica-restricted-texts.json. Until then the
    // copyright rule covers installed resources.
    public static IReadOnlySet<string> RestrictedTextIds { get; } =
        new HashSet<string>
        {
            "300672556a449b25", // APSD
            "39739f1a7dcfe810", // APSD-CEB
            "c2a5eeda3414c2ce", // BCB
            "6f26e199139ea7f1", // BDS
            "fffe2a897323ec82", // BPH
            "d125bceacf2fa912", // CCB
            "517f2ffe6433ad18", // CCB-T
            "3fa4c85c95be3aa6", // CCL
            "8d157691202518e4", // EIV
            "963fbbc15c8cd2cd", // HD
            "da0947e25c9636bb", // HFA
            "fdb480d858e14ced", // HTB
            "8676091b758f0d8d", // JCB
            "af5ec0cf514e94ec", // KGN
            "e959e47176271f18", // KLB
            "46c3dec0ed0f56b9", // KOK
            "19cd186174de646a", // KSS
            "da34f369635c82b8", // LCB
            "d9610ffb2f032758", // LEF
            "d9f49e4ff03f8678", // LOC
            "feb24cb32810fabf", // LOCUK
            "d8e10d078df603c9", // MCV
            "2b1625d1f4236ce5", // MNB
            "7f996672a9b6d67a", // MTDS
            "3b6ce54d76a633a4", // NASV
            "24722a3b9010fa47", // NAV
            "e1592fe262f26754", // NBV
            "def16ae158c3e79f", // NEN
            "5b888a42e2d9a89d", // NIrV
            "71c6eab17ae5b667", // NIV11
            "78a9f6124f344018", // NIV11R
            "3e2eb613d45e131e", // NIV11UK
            "a6219db975224f50", // NIV84
            "1acb90cd67653967", // NLB
            "aeb99463c03f4577", // NMM
            "0f38fd5da9d586dc", // NRT14
            "fd1da25634593297", // NRT23
            "361230230363baec", // NSP
            "66992eaaf3106fcf", // NTR
            "699b9e6b33aa2329", // NUB
            "867d75564182779d", // NVI-P
            "01c25b8715dbb632", // NVI-S
            "a1d56ff41fa079a4", // NWM
            "aee9474b4a88eefb", // OL
            "e95f4ff7407fc936", // PCB
            "2e3185bcb90f9381", // PSZ
            "6eda79520b919447", // SCB
            "d26ef201ef9cf3f2", // SNC
            "5542a8cd0429163d", // TCB
            "07ff1d5c6a53cb05", // TNCV
            "ed484deed765564d", // VCB (not in Platform.Bible's resource list today)
            "74a986a9a183ae1c", // ZB
            // Co-owned with another publisher ("IMB-ERTP и Biblica, Inc.", "BGCMC and Biblica,
            // Inc."); Biblica's list includes them
            "b19fcf462065a794", // CARS
            "d9d0cd5c1bb43798", // CARSA
            "54b8d8e29301a53f", // CARST
            "7db214bcc316fddc", // NCT
        };

    /// <summary>
    /// Biblica Open texts whose name and copyright do not say "Biblica® Open", lower case.
    /// </summary>
    private static readonly HashSet<string> s_openTextIdsWithoutOpenWording =
    [
        "f6a5ef6e2e75a8b4", // OBTT (Open Basic Turkish New Testament)
    ];

    /// <summary>
    /// Directional and zero-width format characters. Some right-to-left copyrights put them inside
    /// the words matched below, e.g. a left-to-right mark (U+200E) between "Biblica" and ", Inc.".
    /// </summary>
    [GeneratedRegex(@"[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]")]
    private static partial Regex FormatCharacters();

    /// <summary>
    /// "Biblica, Inc", "Biblica Inc", "Biblica , Inc", "Biblica، Inc" (Arabic comma), "Biblica，Inc"
    /// (full-width comma), "Biblica, inc.®", "Biblica®". Requiring "Inc" or "®" keeps out Bible
    /// Society texts such as "Sociedad Biblica de Guatemala" and "Sociedades Biblicas Unidas".
    /// "Biblica" may directly follow a letter of another script, as it can in Chinese or Arabic
    /// text, but not a Latin letter or digit.
    /// </summary>
    [GeneratedRegex(
        @"(?<![A-Za-z0-9])Biblica(?:\s*[,،，]?\s*Inc\b|\s*®)",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant
    )]
    private static partial Regex BiblicaIncorporated();

    /// <summary>"Biblica® Open" or "Biblica Open"</summary>
    [GeneratedRegex(
        @"(?<![A-Za-z0-9])Biblica\s*®?\s*Open\b",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant
    )]
    private static partial Regex BiblicaOpen();

    /// <summary>Four decimal digits in any script</summary>
    [GeneratedRegex(@"\d{4}")]
    private static partial Regex FourDigits();

    /// <summary>
    /// Whether a project is one of Biblica's traditionally licensed texts, so it must not be used
    /// as a model or base text: it is on Biblica's list (<see cref="RestrictedTextIds"/>), or its
    /// copyright says so. Only resources count, because a Biblica translation team's own project
    /// (or Biblica's master project, whose DBL id matches the list) is theirs to translate in.
    /// </summary>
    public static bool IsRestricted(ScrText scrText)
    {
        if (!scrText.IsResourceProject)
            return false;

        return IsRestrictedLicense(
            GetPlainTextCopyright(scrText),
            scrText.Settings.FullName,
            ReadDblId(scrText)
        );
    }

    /// <summary>
    /// The project's copyright as plain text: paragraph ends become line breaks, HTML tags are
    /// removed and HTML entities are decoded. Empty when the project has no copyright.
    /// </summary>
    internal static string GetPlainTextCopyright(ScrText scrText) =>
        WebUtility.HtmlDecode(scrText.Settings.CopyrightPlainText ?? "");

    private static string? ReadDblId(ScrText scrText)
    {
        try
        {
            return scrText.Settings.DBLId?.Id;
        }
        // A malformed DBLId, or a resource whose zipped DBL metadata cannot be read, has no usable id
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Whether a text is a traditionally licensed Biblica text: it is on Biblica's list, or its
    /// copyright says so. The copyright rule agrees with the list for every text in
    /// Platform.Bible's resource list, and also catches Biblica texts added to the DBL after the
    /// list was made.
    /// </summary>
    /// <param name="copyright">The text's copyright as plain text</param>
    /// <param name="fullName">The text's full name</param>
    /// <param name="dblId">The text's DBL id, if it came from the DBL</param>
    internal static bool IsRestrictedLicense(string? copyright, string? fullName, string? dblId)
    {
        if (IsOnRestrictedList(dblId))
            return true;
        if (string.IsNullOrEmpty(copyright))
            return false;

        string cleanCopyright = FormatCharacters().Replace(copyright, "");
        if (!BiblicaIncorporated().IsMatch(cleanCopyright))
            return false;

        // Some Open texts only say "Biblica® Open" in their name, not in their copyright.
        string cleanFullName = FormatCharacters().Replace(fullName ?? "", "");
        if (BiblicaOpen().IsMatch(cleanCopyright) || BiblicaOpen().IsMatch(cleanFullName))
            return false;

        return dblId == null || !s_openTextIdsWithoutOpenWording.Contains(dblId.ToLowerInvariant());
    }

    /// <summary>
    /// Whether a DBL id is on Biblica's list of traditionally licensed texts. Pickers that list
    /// the DBL catalog use this for texts that are not installed.
    /// </summary>
    public static bool IsOnRestrictedList(string? dblId) =>
        dblId != null && RestrictedTextIds.Contains(dblId.ToLowerInvariant());

    /// <summary>
    /// The years in a text's own copyright statement, e.g. "1973, 1978, 1984, 2011" for "Copyright ©
    /// 1973, 1978, 1984, 2011 by Biblica, Inc.", or "" when it names none. Only the first "©"
    /// statement counts, because some texts go on to quote another text's copyright. Years written
    /// in other scripts' digits come back in Western digits.
    /// </summary>
    /// <param name="copyright">The text's copyright as plain text</param>
    public static string GetCopyrightYears(string? copyright)
    {
        if (string.IsNullOrEmpty(copyright))
            return "";

        string cleanCopyright = FormatCharacters().Replace(copyright, "");
        int start = cleanCopyright.IndexOf('©');
        if (start >= 0)
        {
            int nextStatement = cleanCopyright.IndexOf('©', start + 1);
            cleanCopyright =
                nextStatement < 0 ? cleanCopyright[start..] : cleanCopyright[start..nextStatement];
        }

        List<string> years = [];
        foreach (Match match in FourDigits().Matches(cleanCopyright))
        {
            string year = string.Concat(
                match.Value.Select(digit => (int)char.GetNumericValue(digit))
            );
            // Other four-digit runs, such as catalogue numbers, are not copyright years
            if (int.Parse(year) is >= 1900 and <= 2099 && !years.Contains(year))
                years.Add(year);
        }
        return string.Join(", ", years);
    }
}

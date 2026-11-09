using System.Text.Json.Serialization;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// The copyright notice to show when a project is opened: the value of the
/// <c>platformScripture.copyrightNotice</c> project setting. Build one with <see cref="None"/>,
/// <see cref="Notification"/> or <see cref="RestrictedLicense"/>, which set exactly the fields
/// that kind of notice carries; the others are left out of the JSON.
/// </summary>
public sealed record CopyrightNotice
{
    private const string NotificationPrefix = "notification: ";

    private CopyrightNotice(CopyrightNoticeKind kind) => Kind = kind;

    /// <summary>Which notice to show, if any</summary>
    public CopyrightNoticeKind Kind { get; }

    /// <summary>The project's short name</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Name { get; private init; }

    /// <summary>The project's full name, or its short name when it has none</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FullName { get; private init; }

    /// <summary>
    /// For <see cref="CopyrightNoticeKind.Notification"/>, the project's own banner text
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? BannerText { get; private init; }

    /// <summary>
    /// For <see cref="CopyrightNoticeKind.Notification"/>, plain text for "More Info" with one
    /// paragraph per line. It leaves out the banner paragraph, as Paratext 9's copyright popup does.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Details { get; private init; }

    /// <summary>
    /// For <see cref="CopyrightNoticeKind.RestrictedLicense"/>, the years of the text's copyright
    /// statement (see <see cref="BiblicaLicensing.GetCopyrightYears"/>), or "" when it names none
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CopyrightYears { get; private init; }

    /// <summary>No notice</summary>
    public static CopyrightNotice None() => new(CopyrightNoticeKind.None);

    /// <summary>The project's own "Notification:" banner</summary>
    public static CopyrightNotice Notification(
        string name,
        string fullName,
        string bannerText,
        string details
    ) =>
        new(CopyrightNoticeKind.Notification)
        {
            Name = name,
            FullName = fullName,
            BannerText = bannerText,
            Details = details,
        };

    /// <summary>The notice for a traditionally licensed Biblica text</summary>
    public static CopyrightNotice RestrictedLicense(
        string name,
        string fullName,
        string copyrightYears
    ) =>
        new(CopyrightNoticeKind.RestrictedLicense)
        {
            Name = name,
            FullName = fullName,
            CopyrightYears = copyrightYears,
        };

    /// <summary>
    /// The notice a project needs. A copyright that starts with "Notification:" gets that banner,
    /// as in Paratext 9; otherwise a traditionally licensed Biblica resource (see
    /// <see cref="BiblicaLicensing.IsRestricted"/>) gets the restricted-license notice.
    /// </summary>
    public static CopyrightNotice FromScrText(ScrText scrText)
    {
        string name = scrText.Name;
        string fullName = scrText.Settings.FullName?.Trim() ?? "";
        if (fullName.Length == 0)
            fullName = name;
        string copyright = BiblicaLicensing.GetPlainTextCopyright(scrText);

        // A resource's own notice takes priority because it is the most specific wording.
        // ScrText.RequiresCopyrightBanner throws when there is no copyright at all.
        if (copyright.Length > 0 && scrText.RequiresCopyrightBanner)
        {
            // RequiresCopyrightBanner matched the prefix before entities were decoded; decoding
            // cannot change it, because it contains no "&"
            string[] lines = copyright.Split('\n');
            string details = string.Join(
                '\n',
                lines.Skip(1).Select(line => line.Trim()).Where(line => line.Length > 0)
            );
            return Notification(
                name,
                fullName,
                lines[0][NotificationPrefix.Length..].Trim(),
                details
            );
        }

        if (BiblicaLicensing.IsRestricted(scrText))
            return RestrictedLicense(name, fullName, BiblicaLicensing.GetCopyrightYears(copyright));

        return None();
    }
}

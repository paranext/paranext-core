using System.Text.Json.Serialization;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

public enum CopyrightNoticeKind
{
    /// <summary>The project needs no copyright notice.</summary>
    None,

    /// <summary>
    /// The project's copyright starts with "Notification:", as the ESV's does. Paratext 9 shows
    /// the rest of that first line as a banner.
    /// </summary>
    Notification,

    /// <summary>
    /// A traditionally licensed Biblica text. The front end supplies the notice wording.
    /// </summary>
    RestrictedLicense,
}

/// <summary>
/// The copyright notice to show when a project is opened: the value of the
/// <c>platformScripture.copyrightNotice</c> project setting.
/// </summary>
/// <param name="Kind">Which notice to show, if any</param>
/// <param name="BannerText">
/// For <see cref="CopyrightNoticeKind.Notification"/>, the project's own banner text
/// </param>
/// <param name="Details">
/// Plain text for "More Info", with one paragraph per line. For
/// <see cref="CopyrightNoticeKind.Notification"/> this leaves out the banner paragraph, as Paratext
/// 9's copyright popup does.
/// </param>
public sealed record CopyrightNotice(
    CopyrightNoticeKind Kind,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        string? BannerText = null,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] string? Details = null,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        string? CopyrightYears = null
)
{
    public static CopyrightNotice FromScrText(ScrText scrText)
    {
        string? copyright = scrText.Settings.Copyright;

        // A resource's own notice takes priority because it is the most specific wording.
        // ScrText.RequiresCopyrightBanner throws when there is no copyright at all.
        if (!string.IsNullOrEmpty(copyright) && scrText.RequiresCopyrightBanner)
        {
            // Paragraph ends become line breaks and other HTML is removed
            string[] paragraphs = scrText
                .Settings.CopyrightPlainText.Split('\n')
                .Select(line => line.Trim())
                .Where(line => line.Length > 0)
                .ToArray();
            return new CopyrightNotice(
                CopyrightNoticeKind.Notification,
                scrText.CopyrightBannerText.Trim(),
                string.Join('\n', paragraphs.Skip(1))
            );
        }

        if (
            BiblicaLicensing.IsRestrictedLicense(
                copyright,
                scrText.Settings.FullName,
                scrText.Settings.DBLId?.Id
            )
        )
            return new CopyrightNotice(
                CopyrightNoticeKind.RestrictedLicense,
                CopyrightYears: BiblicaLicensing.GetCopyrightYears(copyright)
            );

        return new CopyrightNotice(CopyrightNoticeKind.None);
    }
}

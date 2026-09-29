namespace Paranext.DataProvider.Projects;

/// <summary>Which copyright notice a project needs when it is opened</summary>
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

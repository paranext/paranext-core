namespace Paranext.DataProvider.Projects;

/// <summary>
/// Standardized set of methods exposed by a Project Data Provider for a project
/// </summary>
public static class ProjectInterfaces
{
    /// <summary>
    /// The name of the `projectInterface` representing the essential methods every Base Project Data
    /// Provider must implement
    /// </summary>
    public const string BASE = "platform.base";
    public const string USFM_BOOK = "platformScripture.USFM_Book";
    public const string USFM_CHAPTER = "platformScripture.USFM_Chapter";
    public const string USFM_VERSE = "platformScripture.USFM_Verse";
    public const string USX_BOOK = "platformScripture.USX_Book";
    public const string USX_CHAPTER = "platformScripture.USX_Chapter";
    public const string USX_VERSE = "platformScripture.USX_Verse";
    public const string PLAIN_TEXT_VERSE = "platformScripture.PlainText_Verse";
    public const string LEGACY_COMMENT = "legacyCommentManager.comments";
}

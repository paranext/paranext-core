namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Constants used for project creation and validation.
    /// </summary>
    public static class ProjectConstants
    {
        /// <summary>
        /// Valid characters for project short names.
        /// Characters: A-Z, a-z, 0-9, underscore
        /// </summary>
        public const string ValidProjectNameChars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        /// <summary>
        /// Minimum length for project short names.
        /// </summary>
        public const int MinShortNameLength = 3;

        /// <summary>
        /// Maximum length for project short names.
        /// </summary>
        public const int MaxShortNameLength = 8;

        /// <summary>
        /// UTF-8 code page number.
        /// </summary>
        public const int Utf8CodePage = 65001;

        /// <summary>
        /// Default stylesheet file name.
        /// </summary>
        public const string DefaultStylesheetFileName = "usfm.sty";

        /// <summary>
        /// Study Bible stylesheet file name.
        /// </summary>
        public const string StudyBibleStylesheetFileName = "usfm_sb.sty";
    }
}

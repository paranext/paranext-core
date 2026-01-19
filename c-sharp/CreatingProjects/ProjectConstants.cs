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
        /// Maximum sequence number to try when generating unique project names.
        /// The algorithm tries name1, name2, ..., name9999 before giving up.
        /// </summary>
        public const int MaxProjectNameSequence = 9999;

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

        /// <summary>
        /// Windows reserved file names that cannot be used as project names.
        /// These names are reserved by the Windows operating system.
        /// </summary>
        public static readonly HashSet<string> WindowsReservedNames =
            new(StringComparer.OrdinalIgnoreCase)
            {
                "CON",
                "PRN",
                "AUX",
                "NUL",
                "COM1",
                "COM2",
                "COM3",
                "COM4",
                "COM5",
                "COM6",
                "COM7",
                "COM8",
                "COM9",
                "LPT1",
                "LPT2",
                "LPT3",
                "LPT4",
                "LPT5",
                "LPT6",
                "LPT7",
                "LPT8",
                "LPT9",
            };
    }
}

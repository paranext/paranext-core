using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Line-ending normalization shared by the testUSFM corpus suites, so the sweep and the capture
    /// harness read a fixture the same way.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal static class CorpusLineEndings
    {
        /// <summary>
        /// <paramref name="text"/> with each LF and CRLF line break written as CRLF, as ParatextData
        /// stores USFM. A lone CR is not a line break here and is left in place, so ParatextData
        /// decides what it becomes rather than this normalization deleting it.
        /// </summary>
        public static string ToCrLf(string text) =>
            text.Replace("\r\n", "\n", StringComparison.Ordinal)
                .Replace("\n", "\r\n", StringComparison.Ordinal);
    }
}

using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.RegularExpressions;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Enforcement test for the AGENTS.md/CLAUDE.md "Send/Receive Write Gate" rule: any C# code path
    /// that mutates project data must open a
    /// <see cref="Paranext.DataProvider.Projects.SendReceive.SendReceiveWriteLock.EnterWrite"/> scope
    /// at its entry point (see that class for the full write-gate design).
    /// </summary>
    /// <remarks>
    /// This is a coarse, file-level safety net, not a call-graph analysis: it greps the c-sharp
    /// source tree for direct project-write call patterns (<see cref="s_writePatterns"/>) and fails if
    /// any turn up in a <c>.cs</c> file that is not on <see cref="s_allowlistRelativePaths"/>. A file
    /// is allowlisted either because it IS a gated entry point (its writes are behind
    /// <c>EnterWrite</c>), or because its writes are only reachable through an already-gated caller and
    /// have been consciously deferred for a closer look (marked with a
    /// <c>// TODO(PT-4210): assess</c> comment below).
    ///
    /// <para>When this test fails on a new write site: gate it with
    /// <c>using var _ = SendReceiveWriteLock.EnterWrite(projectId);</c> as the first statement of its
    /// entry-point method, or — if it is genuinely reached only through an already-gated caller —
    /// consciously extend <see cref="s_allowlistRelativePaths"/> (with a comment explaining why). Do
    /// not silently widen the write-pattern regexes to dodge a hit.</para>
    /// </remarks>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockCoverageTests
    {
        /// <summary>
        /// Direct project-write call patterns that must be gated. Matched against raw file text (not
        /// per-line), so a call wrapped across multiple lines by a formatter is still caught.
        /// </summary>
        private static readonly (string Label, Regex Pattern)[] s_writePatterns =
        [
            ("ScrText.PutText", new Regex(@"\.PutText\(", RegexOptions.Compiled)),
            ("Settings.Save", new Regex(@"\.Settings\.Save\(", RegexOptions.Compiled)),
            ("Settings.SetSetting", new Regex(@"\.Settings\.SetSetting\(", RegexOptions.Compiled)),
            (
                "Settings.RemoveSetting",
                new Regex(@"\.Settings\.RemoveSetting\(", RegexOptions.Compiled)
            ),
            ("FileManager.Delete", new Regex(@"FileManager\.Delete", RegexOptions.Compiled)),
        ];

        /// <summary>
        /// Files exempt from the scan, as paths relative to the <c>c-sharp/</c> source root
        /// (forward-slash, case-sensitive). Two categories:
        /// <list type="bullet">
        /// <item>
        /// <description>
        /// The three services that gate every project-write entry point with
        /// <c>SendReceiveWriteLock.EnterWrite</c> (see AGENTS.md/CLAUDE.md).
        /// </description>
        /// </item>
        /// <item>
        /// <description>
        /// Helper/orchestrator files whose write patterns are today only reachable through one of
        /// those three services' already-gated wire methods, but are not gated at their own entry
        /// point — discovered by running this scan's patterns ad hoc against the source tree while
        /// writing this test. Each is marked <c>// TODO(PT-4210): assess</c> since PT-4210 (wiring
        /// SetSyncing/Clear into the Studio patch) is the natural point to decide whether they need
        /// their own gate (e.g. if a future caller reaches them without going through the gated
        /// service).
        /// </description>
        /// </item>
        /// </list>
        /// </summary>
        private static readonly string[] s_allowlistRelativePaths =
        [
            // Gated entry-point services (11 + 5 + 2 EnterWrite call sites respectively).
            "Projects/ParatextProjectDataProvider.cs",
            "ManageBooks/ManageBooksService.cs",
            "Checks/InventoryDataProvider.cs",
            // TODO(PT-4210): assess. PutText calls only reached via ManageBooksService's gated
            // ImportBooksAsync/CreateBooksAsync today.
            "ManageBooks/ImportBooksOrchestrator.cs",
            // TODO(PT-4210): assess. PutText calls only reached via ManageBooksService's gated
            // CreateBooksAsync (Scripture template creation).
            "ManageBooks/ScriptureTemplateService.cs",
            // TODO(PT-4210): assess. PutText calls only reached via ManageBooksService's gated
            // CopyBooksAsync/CopyCustomVersificationAsync.
            "ManageBooks/CopyBooksOrchestrator.cs",
            // TODO(PT-4210): assess. FileManager.Delete only reached via ManageBooksService's gated
            // DeleteBooksAsync.
            "ManageBooks/DeleteBooksOrchestrator.cs",
        ];

        /// <summary>
        /// Resolves the absolute path to the <c>c-sharp/</c> source directory by walking upward from
        /// the executing test assembly until a directory containing both <c>c-sharp/</c> and
        /// <c>c-sharp-tests/</c> is found. Robust to the assembly living under varying
        /// <c>bin/&lt;Configuration&gt;/&lt;TFM&gt;</c> nesting and to path-separator differences
        /// across OSes (uses <see cref="Path"/> throughout, no hardcoded separators).
        /// </summary>
        private static string ResolveSourceDir()
        {
            string? walk = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            for (var i = 0; i < 10 && walk != null; i++)
            {
                var candidate = Path.Combine(walk, "c-sharp");
                if (Directory.Exists(candidate) && Directory.Exists(Path.Combine(walk, "c-sharp-tests")))
                    return Path.GetFullPath(candidate);
                walk = Path.GetDirectoryName(walk);
            }

            Assert.Fail(
                "Could not locate the c-sharp/ source directory by walking up from the test "
                    + $"assembly at '{Assembly.GetExecutingAssembly().Location}'."
            );
            return string.Empty; // unreachable; Assert.Fail throws
        }

        [Test]
        public void AllProjectWriteCallSites_AreGatedOrAllowlisted()
        {
            var sourceDir = ResolveSourceDir();
            var allowlist = new HashSet<string>(s_allowlistRelativePaths, StringComparer.Ordinal);

            // Deterministic ordering: sort files by their (OS-independent) relative path so failure
            // output — and the order files are scanned in — never depends on filesystem enumeration
            // order.
            var csFiles = Directory
                .EnumerateFiles(sourceDir, "*.cs", SearchOption.AllDirectories)
                .Select(path => (Full: path, Relative: NormalizeRelativePath(sourceDir, path)))
                .OrderBy(file => file.Relative, StringComparer.Ordinal);

            var violations = new List<string>();

            foreach (var (fullPath, relativePath) in csFiles)
            {
                if (allowlist.Contains(relativePath))
                    continue;

                var text = File.ReadAllText(fullPath);
                foreach (var (label, pattern) in s_writePatterns)
                {
                    foreach (Match match in pattern.Matches(text))
                    {
                        var lineNumber = CountLines(text, match.Index);
                        violations.Add($"{relativePath}:{lineNumber} — {label}");
                    }
                }
            }

            Assert.That(
                violations,
                Is.Empty,
                "Found direct project-write call site(s) that are neither gated by "
                    + "SendReceiveWriteLock.EnterWrite (via a wrapping method on the allowlist) nor "
                    + "explicitly allowlisted:\n"
                    + string.Join('\n', violations)
                    + "\n\nEither gate the new write with "
                    + "`using var _ = SendReceiveWriteLock.EnterWrite(projectId);` as the first "
                    + "statement of its entry-point method, or consciously extend "
                    + $"{nameof(s_allowlistRelativePaths)} in this test (with a comment explaining "
                    + "why). See the AGENTS.md/CLAUDE.md \"Send/Receive Write Gate\" rule."
            );
        }

        private static string NormalizeRelativePath(string root, string fullPath) =>
            Path.GetRelativePath(root, fullPath).Replace(Path.DirectorySeparatorChar, '/');

        private static int CountLines(string text, int upToIndex)
        {
            var line = 1;
            for (var i = 0; i < upToIndex && i < text.Length; i++)
            {
                if (text[i] == '\n')
                    line++;
            }
            return line;
        }
    }
}

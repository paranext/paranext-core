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
        /// per-line), so a call wrapped across multiple lines by a formatter is still caught. These
        /// aim to cover the write kinds the AGENTS.md/CLAUDE.md rule promises — <c>ScrText</c> writes
        /// (<c>PutText</c>, <c>Save</c>), settings writes, comment/note persistence, and project-file
        /// deletes. The <c>.Save(</c> heuristic is deliberately broad (it catches
        /// <c>ScrText.Save()</c>, <c>Settings.Save()</c>, <c>ErrorMessageDenials.Save()</c>,
        /// <c>ScriptureInventoryBase.Save()</c>, and any other persistence <c>.Save(</c>); non-project
        /// <c>.Save(</c> sites are consciously allowlisted below with a reason. It is a coarse net, not
        /// a semantic analysis — false positives are expected and handled by the allowlist.
        /// </summary>
        private static readonly (string Label, Regex Pattern)[] s_writePatterns =
        [
            // Broad persistence heuristic: subsumes Settings.Save and catches ScrText.Save,
            // denials.Save, inventory.Save, XDocument.Save, etc.
            ("Save()", new Regex(@"\.Save\(", RegexOptions.Compiled)),
            ("ScrText.PutText", new Regex(@"\.PutText\(", RegexOptions.Compiled)),
            ("Settings.SetSetting", new Regex(@"\.Settings\.SetSetting\(", RegexOptions.Compiled)),
            (
                "Settings.RemoveSetting",
                new Regex(@"\.Settings\.RemoveSetting\(", RegexOptions.Compiled)
            ),
            // Comment/note persistence (mutations are staged in memory then written by these).
            ("CommentManager.SaveUser", new Regex(@"\.SaveUser\(", RegexOptions.Compiled)),
            (
                "CommentEditHelper.SaveEdits",
                new Regex(@"CommentEditHelper\.SaveEdits\(", RegexOptions.Compiled)
            ),
            // Project-file deletes: ScrText.FileManager.Delete plus raw File.Delete of project files.
            ("FileManager.Delete", new Regex(@"\.FileManager\.Delete\(", RegexOptions.Compiled)),
            ("File.Delete", new Regex(@"\bFile\.Delete\(", RegexOptions.Compiled)),
        ];

        /// <summary>
        /// Files exempt from the scan, as paths relative to the <c>c-sharp/</c> source root
        /// (forward-slash, case-sensitive). Each entry carries a one-line reason. Three categories:
        /// <list type="bullet">
        /// <item>
        /// <description>
        /// <b>gated</b> — services that gate every project-write entry point with
        /// <c>SendReceiveWriteLock.EnterWrite</c> (see AGENTS.md/CLAUDE.md).
        /// </description>
        /// </item>
        /// <item>
        /// <description>
        /// <b>TODO(PT-4210): assess</b> — helper/orchestrator files whose write patterns are today
        /// only reachable through one of those gated services' wire methods, but are not gated at
        /// their own entry point. PT-4210 (wiring SetSyncing/Clear into the Studio patch) is the
        /// natural point to decide whether they need their own gate (e.g. if a future caller reaches
        /// them without going through the gated service).
        /// </description>
        /// </item>
        /// <item>
        /// <description>
        /// <b>not-project-data</b> — files whose matched writes do not touch the shared
        /// <c>ScrText</c>/<c>Settings</c> project data the S/R merge replaces (per-user settings,
        /// resource caches), so the write gate does not apply.
        /// </description>
        /// </item>
        /// </list>
        /// This is a coarse net over broad patterns (see <see cref="s_writePatterns"/>), so false
        /// positives are expected; each is triaged here with its reason rather than by narrowing the
        /// patterns.
        /// </summary>
        private static readonly string[] s_allowlistRelativePaths =
        [
            // --- gated: every project-write entry point here opens EnterWrite as its first statement.
            "Projects/ParatextProjectDataProvider.cs", // gated: 11 write methods (Scripture/settings/comment/extension)
            "ManageBooks/ManageBooksService.cs", // gated: 5 mutating wire methods
            "Checks/InventoryDataProvider.cs", // gated: SetInventoryItemStatus/SetInventoryOptionValues
            "Checks/CheckRunner.cs", // gated: DenyCheckResult/AllowCheckResult (denials.Save) — PT-4159 review
            // --- TODO(PT-4210): assess. Reached today only through a gated ManageBooksService wire
            // method; not gated at their own entry point. PT-4210 (wiring SetSyncing/Clear into the
            // Studio patch) is the point to decide whether any need their own gate.
            "ManageBooks/ImportBooksOrchestrator.cs", // PutText via gated ImportBooksAsync/CreateBooksAsync
            "ManageBooks/ScriptureTemplateService.cs", // PutText + scrText.Save via gated CreateBooksAsync
            "ManageBooks/CopyBooksOrchestrator.cs", // PutText via gated CopyBooksAsync/CopyCustomVersificationAsync
            "ManageBooks/DeleteBooksOrchestrator.cs", // FileManager.Delete + scrText.Save via gated DeleteBooksAsync
            // --- not-project-data (or not the shared ScrText/Settings data the S/R merge replaces).
            "Projects/UserProjectSettings.cs", // not-project-data: per-user UserSettings-{userId}.xml (XDocument.Save), not shared merged data
            "EnhancedResources/MarblePackageDiscoverer.cs", // not-project-data: enhanced-resource cache; File.Delete removes a superseded V1 companion file
            // Extension-data stream manager, constructed only by the gated ParatextProjectDataProvider;
            // its writes are reached via that service's gated SetExtensionData. Its only matched write —
            // File.Delete in DeleteDataStream — is currently unused. TODO(PT-4210): assess.
            "Projects/RawDirectoryProjectStreamManager.cs",
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

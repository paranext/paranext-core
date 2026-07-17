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
    /// This is a coarse, regex-based safety net, not a call-graph analysis: it greps the c-sharp
    /// source tree for direct project-write call patterns (<see cref="s_writePatterns"/>) and, for
    /// every hit, requires ONE of the following to hold — otherwise the hit is a violation:
    /// <list type="number">
    /// <item>
    /// <description>
    /// <b>Gated in its enclosing method.</b> An <c>EnterWrite</c>/<c>EnterSyncWriteScope</c> call
    /// (<see cref="s_gateEvidencePattern"/>) appears above the write within the same method body.
    /// Because the gate is always the method's FIRST statement, it sits between the write and the
    /// enclosing member's boundary; <see cref="HasGateEvidenceInEnclosingMethod"/> walks upward from
    /// the write and returns true on a gate call, false once it reaches that boundary. This is what
    /// covers the ~20 gated write sites (ParatextProjectDataProvider, ManageBooksService,
    /// InventoryDataProvider, CheckRunner) — and, unlike the old whole-file allowlist, it re-checks
    /// EVERY site, so a NEW ungated write added to one of those files still fails (PT-4159 review,
    /// finding 14).
    /// </description>
    /// </item>
    /// <item>
    /// <description>
    /// <b>Marked as consciously ungated-but-safe.</b> An inline
    /// <c>// SR-write-gate: exempt — &lt;reason&gt;</c> marker (<see cref="s_exemptMarkerPattern"/>)
    /// on the write's own line or the line directly above it. Used for writes reached ONLY through an
    /// already-gated caller — the un-gated <c>SetBookUsfmInScope</c> core, and the ManageBooks
    /// orchestrators / <c>RawDirectoryProjectStreamManager</c> whose writes run inside a gated
    /// <c>ManageBooksService</c> / <c>SetExtensionData</c> scope (each marker cites its gated caller
    /// and TODO(PT-4210) for the closer look). Per-line (not whole-file), so a new ungated write in
    /// one of those files is still caught.
    /// </description>
    /// </item>
    /// <item>
    /// <description>
    /// <b>Whole-file exempt (not-project-data only).</b> The file is on
    /// <see cref="s_fileLevelExemptRelativePaths"/>. Reserved for files whose matched writes do not
    /// touch the shared <c>ScrText</c>/<c>Settings</c> project data the S/R merge replaces (per-user
    /// settings, resource caches). Gated files and gated-caller helpers are deliberately NOT here —
    /// they are checked per write site via (1)/(2) above.
    /// </description>
    /// </item>
    /// <item>
    /// <description>
    /// <b>Commented out / documentation.</b> The hit is on a comment line
    /// (<see cref="IsCommentLine"/>) — e.g. a doc comment mentioning <c>inventory.Save()</c> — so it
    /// is not a live write.
    /// </description>
    /// </item>
    /// </list>
    ///
    /// <para><b>Heuristic bounds (honest disclosure — this is a regex scanner, not a compiler).</b>
    /// <list type="bullet">
    /// <item><description>
    /// <b>Enclosing-method detection</b> assumes the code is formatted as CSharpier leaves it and the
    /// files use file-scoped namespaces (class members indented one level = 4 spaces, method bodies
    /// deeper). The upward walk stops at the first non-blank line indented
    /// &lt;= <see cref="MemberIndentThreshold"/> spaces (the enclosing member's signature/brace). It
    /// only needs to be correct for files that actually CONTAIN a gate call — a file with none can
    /// never spuriously "find" one — which today is exactly the four gated services above, all
    /// file-scoped. A block-scoped-namespace file that both gates one method and leaves another
    /// ungated could mis-scope; there are none, and gate sites are concentrated here by design.
    /// </description></item>
    /// <item><description>
    /// <b>Comment handling</b> only skips hits whose line STARTS with <c>//</c>, <c>///</c>, or
    /// <c>*</c>. A write pattern hidden in a trailing inline comment or a <c>/* … */</c> block on a
    /// code line would still be flagged; there are none in the tree today, and a spurious flag is a
    /// loud failure (safe), not a silent miss.
    /// </description></item>
    /// <item><description>
    /// <b>Write patterns</b> are a deliberately broad net (see <see cref="s_writePatterns"/>); false
    /// positives are expected and handled by the marker/exempt mechanisms, not by narrowing the
    /// regexes to dodge a hit.
    /// </description></item>
    /// </list>
    /// </para>
    ///
    /// <para>When this test fails on a new write site: gate it with
    /// <c>using var _ = SendReceiveWriteLock.EnterWrite(projectId);</c> as the first statement of its
    /// entry-point method; or — if it is genuinely reached only through an already-gated caller — add
    /// a <c>// SR-write-gate: exempt — &lt;reason&gt;</c> marker on/above the write; or, only for
    /// not-project-data writes, add the file to <see cref="s_fileLevelExemptRelativePaths"/> (with a
    /// reason). Do not silently widen the write-pattern regexes to dodge a hit.</para>
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
        /// <c>.Save(</c> sites are consciously exempted below with a reason. It is a coarse net, not
        /// a semantic analysis — false positives are expected and handled by the exempt mechanisms.
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
        /// Gate-scope evidence: an <c>EnterWrite(</c> or <c>EnterSyncWriteScope(</c> call opening the
        /// enclosing method's write scope. A write site with this above it (within its method body)
        /// is gated. See <see cref="HasGateEvidenceInEnclosingMethod"/>.
        /// </summary>
        private static readonly Regex s_gateEvidencePattern =
            new(@"EnterWrite\(|EnterSyncWriteScope\(", RegexOptions.Compiled);

        /// <summary>
        /// The per-line opt-out marker for a write that is consciously ungated-but-safe (reached only
        /// through an already-gated caller). Placed on the write's own line or the line directly
        /// above it, e.g. <c>// SR-write-gate: exempt — reached only via gated CreateBooksAsync</c>.
        /// </summary>
        private static readonly Regex s_exemptMarkerPattern =
            new(@"//\s*SR-write-gate:\s*exempt", RegexOptions.Compiled);

        /// <summary>
        /// Leading-space indentation (in spaces) at or below which a non-blank line is treated as the
        /// enclosing member's boundary (its signature/brace) rather than a statement in the method
        /// body. Class members are one indent level (4 spaces) in these file-scoped-namespace files;
        /// method-body statements — including the gate, always the first statement — are deeper.
        /// </summary>
        private const int MemberIndentThreshold = 4;

        /// <summary>
        /// Files exempt from the scan as WHOLE files, as paths relative to the <c>c-sharp/</c> source
        /// root (forward-slash, case-sensitive). Reserved for the <b>not-project-data</b> category
        /// ONLY: files whose matched writes do not touch the shared <c>ScrText</c>/<c>Settings</c>
        /// project data the S/R merge replaces (per-user settings, resource caches), so the write gate
        /// does not apply. Gated services and their gated-caller helpers are deliberately NOT listed
        /// here — each of their write sites is verified individually (gate evidence in the enclosing
        /// method, or an inline <c>// SR-write-gate: exempt</c> marker), so a new ungated write added
        /// to one of them is still caught (PT-4159 review, finding 14).
        /// </summary>
        private static readonly string[] s_fileLevelExemptRelativePaths =
        [
            // not-project-data: per-user UserSettings-{userId}.xml (XDocument.Save), not shared merged data.
            "Projects/UserProjectSettings.cs",
            // not-project-data: enhanced-resource cache; File.Delete removes a superseded V1 companion file.
            "EnhancedResources/MarblePackageDiscoverer.cs",
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
                if (
                    Directory.Exists(candidate)
                    && Directory.Exists(Path.Combine(walk, "c-sharp-tests"))
                )
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
            var fileLevelExempt = new HashSet<string>(
                s_fileLevelExemptRelativePaths,
                StringComparer.Ordinal
            );

            // Deterministic ordering: sort files by their (OS-independent) relative path so failure
            // output — and the order files are scanned in — never depends on filesystem enumeration
            // order. Skip build output (bin/obj): those hold generated source (*.g.cs, AssemblyInfo)
            // that is neither ours to gate nor allowlistable by a stable relative path (PT-4159
            // review, finding 15).
            var csFiles = Directory
                .EnumerateFiles(sourceDir, "*.cs", SearchOption.AllDirectories)
                .Select(path => (Full: path, Relative: NormalizeRelativePath(sourceDir, path)))
                .Where(file => !IsInGeneratedBuildDir(file.Relative))
                .OrderBy(file => file.Relative, StringComparer.Ordinal);

            var violations = new List<string>();

            foreach (var (fullPath, relativePath) in csFiles)
            {
                if (fileLevelExempt.Contains(relativePath))
                    continue;

                var text = File.ReadAllText(fullPath);
                var lines = text.Split('\n');
                foreach (var (label, pattern) in s_writePatterns)
                {
                    foreach (Match match in pattern.Matches(text))
                    {
                        var lineNumber = CountLines(text, match.Index); // 1-based
                        var codeLine = lines[lineNumber - 1];

                        // Not a live write: a comment (commented-out code or a doc reference).
                        if (IsCommentLine(codeLine))
                            continue;
                        // Consciously ungated-but-safe: reached only through a gated caller.
                        if (HasExemptMarkerNear(lines, lineNumber))
                            continue;
                        // Gated at the enclosing method's entry point.
                        if (HasGateEvidenceInEnclosingMethod(lines, lineNumber))
                            continue;

                        violations.Add($"{relativePath}:{lineNumber} — {label}");
                    }
                }
            }

            Assert.That(
                violations,
                Is.Empty,
                "Found direct project-write call site(s) that are neither gated by "
                    + "SendReceiveWriteLock.EnterWrite in their enclosing method nor consciously "
                    + "exempted:\n"
                    + string.Join('\n', violations)
                    + "\n\nFix each by ONE of: (a) gate it with "
                    + "`using var _ = SendReceiveWriteLock.EnterWrite(projectId);` as the first "
                    + "statement of its entry-point method; (b) if it is reached only through an "
                    + "already-gated caller, add a `// SR-write-gate: exempt — <reason>` marker on "
                    + "or directly above the write; or (c) only for not-project-data writes, add the "
                    + $"file to {nameof(s_fileLevelExemptRelativePaths)} (with a reason). See the "
                    + "AGENTS.md/CLAUDE.md \"Send/Receive Write Gate\" rule."
            );
        }

        /// <summary>True if the relative path lies under a <c>bin</c> or <c>obj</c> build-output
        /// directory at any depth.</summary>
        private static bool IsInGeneratedBuildDir(string relativePath) =>
            relativePath.Split('/').Any(segment => segment is "bin" or "obj");

        /// <summary>True if the line is (or opens/continues) a comment — trimmed start is
        /// <c>//</c>, <c>///</c>, <c>/*</c>, or a <c>*</c> block-comment continuation.</summary>
        private static bool IsCommentLine(string line)
        {
            var trimmed = line.TrimStart();
            return trimmed.StartsWith("//", StringComparison.Ordinal)
                || trimmed.StartsWith("/*", StringComparison.Ordinal)
                || trimmed.StartsWith("*", StringComparison.Ordinal);
        }

        /// <summary>True if a <c>// SR-write-gate: exempt</c> marker is on the write's own line
        /// (<paramref name="writeLine"/>, 1-based) or the line directly above it.</summary>
        private static bool HasExemptMarkerNear(string[] lines, int writeLine)
        {
            if (s_exemptMarkerPattern.IsMatch(lines[writeLine - 1]))
                return true;
            return writeLine - 2 >= 0 && s_exemptMarkerPattern.IsMatch(lines[writeLine - 2]);
        }

        /// <summary>
        /// True if a gate call (<see cref="s_gateEvidencePattern"/>) opens the write's enclosing
        /// method above <paramref name="writeLine"/> (1-based). Walks upward from the line above the
        /// write; because the gate is always the method's first statement it sits between the write
        /// and the enclosing member's boundary, so we return true on the first gate call and false
        /// once we reach that boundary (the first non-blank line indented
        /// &lt;= <see cref="MemberIndentThreshold"/>). See the heuristic bounds in the class remarks.
        /// </summary>
        private static bool HasGateEvidenceInEnclosingMethod(string[] lines, int writeLine)
        {
            for (var i = writeLine - 2; i >= 0; i--)
            {
                var line = lines[i];
                if (string.IsNullOrWhiteSpace(line))
                    continue;
                if (s_gateEvidencePattern.IsMatch(line))
                    return true;
                if (LeadingSpaces(line) <= MemberIndentThreshold)
                    return false; // reached the enclosing member's boundary without a gate
            }
            return false;
        }

        private static int LeadingSpaces(string line)
        {
            var count = 0;
            while (count < line.Length && line[count] == ' ')
                count++;
            return count;
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

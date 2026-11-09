using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.RegularExpressions;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Enforcement test for the rule that C# refuses the text of a project Platform.Bible can't open
    /// (<c>ScrTextExtensions.ThrowIfOpenBlocked</c>; see <c>adr-unsupported-project-reason</c>): every
    /// method in the guarded services that reads or writes a project's Scripture text, or builds a
    /// checks data source over it, must refuse such a project first.
    /// </summary>
    /// <remarks>
    /// Modeled on <see cref="SendReceive.SendReceiveWriteLockCoverageTests"/>: a coarse, regex-based
    /// safety net, not a call-graph analysis. It greps the files in <see cref="s_scannedPaths"/> for
    /// text-access patterns (<see cref="s_accessPatterns"/>) and, for every hit, requires ONE of the
    /// following — otherwise the hit is a violation:
    /// <list type="number">
    /// <item><description>
    /// <b>Guarded in its enclosing method.</b> A guard call, or a call to a helper that guards
    /// (<see cref="s_guardEvidencePattern"/>), appears above the access within the same method body.
    /// An access inside a lambda passed to <c>GetFromScrText</c> counts, since the call is above it.
    /// </description></item>
    /// <item><description>
    /// <b>Marked as consciously unguarded.</b> An inline <c>// open-block: exempt — &lt;reason&gt;</c>
    /// marker (<see cref="s_exemptMarkerPattern"/>) on the access's own line or in the comment lines
    /// directly above it — for helpers reached only through a guarded caller (the marker names it).
    /// </description></item>
    /// <item><description>
    /// <b>A comment.</b> The hit is on a comment line (<see cref="IsCommentLine"/>).
    /// </description></item>
    /// </list>
    ///
    /// <para><b>What it catches:</b> a new entry point in a scanned file that reads or writes text
    /// with no guard above it in the same method. <b>What it doesn't:</b>
    /// <list type="bullet">
    /// <item><description>
    /// Files outside <see cref="s_scannedPaths"/>. The Manage Books orchestrators and
    /// <c>ScriptureTemplateService</c> are left out: they take an already-resolved <c>ScrText</c>
    /// from <c>ManageBooksService</c>, which refuses inside <c>ResolveProjectOrThrow</c>.
    /// <see cref="ManageBooksProjectResolution_GoesThroughTheGuardedHelper"/> pins that side.
    /// </description></item>
    /// <item><description>
    /// Reads through APIs the patterns don't name (for example a new ParatextData text API), and
    /// comment threads: only comment creation and conflict resolution are refused, and the comment
    /// manager's calls are not text-access patterns here.
    /// </description></item>
    /// <item><description>
    /// Whether a guarded helper named in an exempt marker is still its only caller. The marker is a
    /// claim a reviewer checks, as in the Send/Receive test.
    /// </description></item>
    /// </list>
    /// The enclosing-method walk has the same formatting assumptions as the Send/Receive test
    /// (CSharpier output, file-scoped namespaces, members at four spaces).</para>
    ///
    /// <para>When this test fails on a new site: call <c>scrText.ThrowIfOpenBlocked()</c> (or, in
    /// <c>ParatextProjectDataProvider</c>, <c>ThrowIfProjectOpenBlocked()</c>) before the access —
    /// right after <c>EnterWrite</c> in a writer — or, if the method is reached only through a
    /// guarded caller, add an <c>// open-block: exempt — &lt;reason&gt;</c> marker naming it. Send/Receive,
    /// settings and metadata paths deliberately stay unguarded; they don't read text through these
    /// patterns.</para>
    /// </remarks>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class OpenBlockedCoverageTests
    {
        /// <summary>
        /// Files and directories (relative to <c>c-sharp/</c>, forward-slash) whose text accesses
        /// must be guarded: the services that hold the guards today.
        /// </summary>
        private static readonly string[] s_scannedPaths =
        [
            "Projects/ParatextProjectDataProvider.cs",
            "Checks/",
            "Checklists/",
            "ManageBooks/ManageBooksService.cs",
        ];

        /// <summary>
        /// Text-access patterns. Deliberately broad: any <c>.GetText(</c> or <c>.Parser.</c> call
        /// matches, including on a checks data source, and false positives are handled by the
        /// exempt marker rather than by narrowing a pattern.
        /// </summary>
        private static readonly (string Label, Regex Pattern)[] s_accessPatterns =
        [
            ("new ChecksDataSource", new Regex(@"new\s+ChecksDataSource\(", RegexOptions.Compiled)),
            ("GetText", new Regex(@"\.GetText\(", RegexOptions.Compiled)),
            ("GetVerseText", new Regex(@"\.GetVerseText\(", RegexOptions.Compiled)),
            ("PutText", new Regex(@"\.PutText\(", RegexOptions.Compiled)),
            ("Parser", new Regex(@"\.Parser\.", RegexOptions.Compiled)),
            (
                "CommentEditHelper.SaveEdits",
                new Regex(@"CommentEditHelper\.SaveEdits\(", RegexOptions.Compiled)
            ),
        ];

        /// <summary>
        /// Guard evidence: a direct guard, or a call to a helper that refuses before it returns a
        /// project or touches text (<c>GetFromScrText</c>, <c>CheckCache.GetChecksDataSource</c>,
        /// <c>InventoryDataProvider.GetOpenableProject</c>,
        /// <c>ManageBooksService.ResolveProjectOrThrow</c>).
        /// </summary>
        private static readonly Regex s_guardEvidencePattern =
            new(
                @"ThrowIfOpenBlocked\(|ThrowIfProjectOpenBlocked\(|\b(GetFromScrText|GetChecksDataSource|GetOpenableProject|ResolveProjectOrThrow)\(",
                RegexOptions.Compiled
            );

        /// <summary>
        /// The opt-out marker for an access reached only through a guarded caller, e.g.
        /// <c>// open-block: exempt — reached only via GetFromScrText</c>. It goes on the access's
        /// line or in the comment lines directly above it, so it can sit beside an
        /// <c>SR-write-gate</c> marker.
        /// </summary>
        private static readonly Regex s_exemptMarkerPattern =
            new(@"//\s*open-block:\s*exempt", RegexOptions.Compiled);

        /// <summary>Indentation at or below which a non-blank line is a member boundary.</summary>
        private const int MemberIndentThreshold = 4;

        [Test]
        public void TextAccessCallSites_AreGuardedOrExempt()
        {
            var violations = new List<string>();
            var accessCount = 0;

            foreach (var (fullPath, relativePath) in EnumerateScannedFiles())
            {
                var text = File.ReadAllText(fullPath);
                var lines = text.Split('\n');
                foreach (var (label, pattern) in s_accessPatterns)
                {
                    foreach (Match match in pattern.Matches(text))
                    {
                        var lineNumber = CountLines(text, match.Index); // 1-based
                        if (IsCommentLine(lines[lineNumber - 1]))
                            continue;
                        accessCount++;
                        if (HasExemptMarkerNear(lines, lineNumber))
                            continue;
                        if (HasGuardEvidenceInEnclosingMethod(lines, lineNumber))
                            continue;

                        violations.Add($"{relativePath}:{lineNumber} — {label}");
                    }
                }
            }

            // Positive control: the scan reaches the text accesses it is meant to police, so an empty
            // violation list is not just an empty corpus.
            Assert.That(accessCount, Is.GreaterThan(10), "The scan found almost no text accesses.");
            Assert.That(
                violations,
                Is.Empty,
                "Found text access(es) on a project with no ThrowIfOpenBlocked guard above them in "
                    + "their method and no `// open-block: exempt — <reason>` marker:\n"
                    + string.Join('\n', violations)
                    + "\n\nGuard the method (ScrText.ThrowIfOpenBlocked, or ThrowIfProjectOpenBlocked in "
                    + "ParatextProjectDataProvider; after EnterWrite in a writer), or, if it is reached "
                    + "only through a guarded caller, add the exempt marker naming that caller. See "
                    + "adr-unsupported-project-reason."
            );
        }

        [Test]
        public void ManageBooksProjectResolution_GoesThroughTheGuardedHelper()
        {
            var sourceDir = ResolveSourceDir();
            var resolution = new Regex(
                @"GetParatextProject\(|ScrTextCollection\.(Get|Find)",
                RegexOptions.Compiled
            );
            var violations = new List<string>();
            var resolutionCount = 0;

            foreach (
                var fullPath in Directory
                    .EnumerateFiles(
                        Path.Combine(sourceDir, "ManageBooks"),
                        "*.cs",
                        SearchOption.AllDirectories
                    )
                    .OrderBy(path => path, StringComparer.Ordinal)
            )
            {
                var relativePath = NormalizeRelativePath(sourceDir, fullPath);
                if (IsInGeneratedBuildDir(relativePath))
                    continue;
                var text = File.ReadAllText(fullPath);
                var lines = text.Split('\n');
                foreach (Match match in resolution.Matches(text))
                {
                    var lineNumber = CountLines(text, match.Index);
                    if (IsCommentLine(lines[lineNumber - 1]))
                        continue;
                    resolutionCount++;
                    if (HasExemptMarkerNear(lines, lineNumber))
                        continue;
                    if (
                        EnclosingMemberSignature(lines, lineNumber)
                            ?.Contains("ResolveProjectOrThrow(") == true
                    )
                        continue;
                    violations.Add($"{relativePath}:{lineNumber}");
                }
            }

            Assert.That(
                resolutionCount,
                Is.GreaterThan(0),
                "The scan found no project resolution."
            );
            Assert.That(
                violations,
                Is.Empty,
                "Manage Books resolved a project outside ResolveProjectOrThrow, which refuses a project "
                    + "Platform.Bible can't open:\n"
                    + string.Join('\n', violations)
                    + "\n\nResolve it through ResolveProjectOrThrow, or add an "
                    + "`// open-block: exempt — <reason>` marker if it never reads or writes text."
            );
        }

        private static IEnumerable<(string Full, string Relative)> EnumerateScannedFiles()
        {
            var sourceDir = ResolveSourceDir();
            var files = new List<(string Full, string Relative)>();
            foreach (var scanned in s_scannedPaths)
            {
                var full = Path.Combine(sourceDir, scanned);
                if (scanned.EndsWith('/'))
                {
                    Assert.That(
                        Directory.Exists(full),
                        Is.True,
                        $"Scanned directory {scanned} is gone"
                    );
                    files.AddRange(
                        Directory
                            .EnumerateFiles(full, "*.cs", SearchOption.AllDirectories)
                            .Select(path => (path, NormalizeRelativePath(sourceDir, path)))
                    );
                }
                else
                {
                    Assert.That(File.Exists(full), Is.True, $"Scanned file {scanned} is gone");
                    files.Add((full, scanned));
                }
            }
            return files
                .Where(file => !IsInGeneratedBuildDir(file.Relative))
                .OrderBy(file => file.Relative, StringComparer.Ordinal);
        }

        /// <summary>
        /// True if guard evidence appears above <paramref name="accessLine"/> (1-based) before the
        /// walk reaches the enclosing member's boundary (a non-blank line indented
        /// &lt;= <see cref="MemberIndentThreshold"/>). The boundary is checked first so a helper's
        /// own signature (<c>private string GetFromScrText(</c>) never counts as evidence.
        /// </summary>
        private static bool HasGuardEvidenceInEnclosingMethod(string[] lines, int accessLine)
        {
            for (var i = accessLine - 1; i >= 0; i--)
            {
                var line = lines[i];
                if (string.IsNullOrWhiteSpace(line))
                    continue;
                if (i < accessLine - 1 && LeadingSpaces(line) <= MemberIndentThreshold)
                    return false;
                if (IsCommentLine(line))
                    continue;
                if (s_guardEvidencePattern.IsMatch(line))
                    return true;
            }
            return false;
        }

        /// <summary>The first line of the member enclosing <paramref name="line"/> (1-based).</summary>
        private static string? EnclosingMemberSignature(string[] lines, int line)
        {
            for (var i = line - 2; i >= 0; i--)
            {
                if (string.IsNullOrWhiteSpace(lines[i]))
                    continue;
                if (LeadingSpaces(lines[i]) > MemberIndentThreshold || IsCommentLine(lines[i]))
                    continue;
                // Skip the brace and a wrapped signature's closing parenthesis up to its first line.
                var trimmed = lines[i].Trim();
                if (trimmed == "{" || trimmed.StartsWith(')'))
                    continue;
                return lines[i];
            }
            return null;
        }

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
            return string.Empty;
        }

        private static bool IsInGeneratedBuildDir(string relativePath) =>
            relativePath.Split('/').Any(segment => segment is "bin" or "obj");

        private static bool IsCommentLine(string line)
        {
            var trimmed = line.TrimStart();
            return trimmed.StartsWith("//", StringComparison.Ordinal)
                || trimmed.StartsWith("/*", StringComparison.Ordinal)
                || trimmed.StartsWith("*", StringComparison.Ordinal);
        }

        private static bool HasExemptMarkerNear(string[] lines, int accessLine)
        {
            if (s_exemptMarkerPattern.IsMatch(lines[accessLine - 1]))
                return true;
            for (var i = accessLine - 2; i >= 0 && IsCommentLine(lines[i]); i--)
            {
                if (s_exemptMarkerPattern.IsMatch(lines[i]))
                    return true;
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

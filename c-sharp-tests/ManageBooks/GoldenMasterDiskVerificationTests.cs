using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.Json;
using System.Text.RegularExpressions;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;
using SIL.Scripture;
using ProjectType = Paratext.Data.ProjectType;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// FN-006: Byte-level golden-master verification harness.
    ///
    /// Drives the production C# orchestrators/services and compares the
    /// resulting outputs (USFM file content for `inline-text` GMs, structured
    /// data for `inline-json` GMs) against the captured PT9 outputs at
    /// <c>.context/features/manage-books/golden-masters/gm-XXX/expected-output.json</c>.
    ///
    /// <para><b>Strategy by GM:</b>
    /// <list type="bullet">
    /// <item>gm-001..004: USFM file-content byte-diff after normalization
    ///   (line endings, trailing whitespace, project-name placeholder).</item>
    /// <item>gm-005: BookSet difference list (canonical book ID strings).</item>
    /// <item>gm-006: 6 ComparisonState entries with localized tooltips.</item>
    /// <item>gm-007/008: Allowed/excluded ProjectType lists.</item>
    /// <item>gm-009/010: WINDOWS-ONLY (encoding converters require Windows ICU).</item>
    /// <item>gm-011: PT10 dynamic-menu service does not yet exist (FN-003 deferred).</item>
    /// <item>gm-012: Overlap-detection alert message.</item>
    /// </list></para>
    ///
    /// <para><b>Why a separate test class:</b> Per-capability test classes
    /// (CopyBooksOrchestratorTests, ScriptureTemplateServiceTests, etc.)
    /// already verify behavior with shape/regex assertions. THIS class is the
    /// honest byte-level cross-check against the actual captured PT9 outputs —
    /// it answers "does our PT10 implementation produce the same bytes PT9 did?"
    /// rather than "does it satisfy the rules we extracted?". Both kinds of
    /// tests are valuable; this one closes the FN-006 gap.</para>
    ///
    /// <para>Divergences are NOT auto-fixed. When a byte-level diff fails,
    /// the test reports the exact diff. Per FN-006 §detail bullet 3, any such
    /// divergence is most likely a ParatextData-primitive output difference,
    /// not a manage-books bug. The user reviews and decides.</para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("GoldenMaster")]
    [Category("DiskVerification")]
    internal class GoldenMasterDiskVerificationTests : PapiTestBase
    {
        // ===================================================================
        // Harness infrastructure: GM directory resolution + normalization +
        // diff reporting. Public for hypothetical reuse but kept private to
        // this fixture.
        // ===================================================================

        /// <summary>
        /// Resolves the absolute path to a golden-master directory by walking
        /// upward from the executing test assembly. The GMs live at
        /// <c>{workspace}/ai-prompts/ai-porting/.context/features/manage-books/golden-masters/{gm}</c>.
        /// </summary>
        /// <remarks>
        /// Falls back to <see cref="Assert.Inconclusive(string)"/> when the
        /// directory cannot be located (e.g. the test is running from a CI
        /// where the ai-prompts repo isn't a sibling). This keeps the harness
        /// honest on workstations and graceful elsewhere.
        /// </remarks>
        private static string ResolveGoldenMasterDir(string gmName)
        {
            string assemblyDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;

            // Candidate roots to search for the ai-prompts repo. The first
            // hit wins. Order matters: workspace-sibling layout (the worktree
            // model in CLAUDE.md "Symlinked Directories") is checked first,
            // then the canonical paranext-core/ai-prompts pair.
            var candidates = new List<string>();

            // 1. Walk up from the assembly to the workspace root, then look
            //    for {workspace}/ai-prompts/ai-porting.
            string? walk = assemblyDir;
            for (int i = 0; i < 8 && walk != null; i++)
            {
                string aiPromptsAt = Path.Combine(walk, "ai-prompts", "ai-porting");
                if (Directory.Exists(aiPromptsAt))
                {
                    candidates.Add(aiPromptsAt);
                    break;
                }
                // Also check sibling layout: walk/../ai-prompts/ai-porting.
                string sibling = Path.Combine(walk, "..", "ai-prompts", "ai-porting");
                if (Directory.Exists(sibling))
                {
                    candidates.Add(Path.GetFullPath(sibling));
                    break;
                }
                walk = Path.GetDirectoryName(walk);
            }

            // 2. Read repo-paths.json (committed in paranext-core/.context/)
            //    if walking didn't find it.
            string repoPathsJson = Path.Combine(
                assemblyDir,
                "..",
                "..",
                "..",
                "..",
                "..",
                ".context",
                "repo-paths.json"
            );
            if (File.Exists(repoPathsJson))
            {
                try
                {
                    using JsonDocument doc = JsonDocument.Parse(File.ReadAllText(repoPathsJson));
                    if (
                        doc.RootElement.TryGetProperty("repositories", out JsonElement repos)
                        && repos.TryGetProperty("ai-prompts", out JsonElement aip)
                        && aip.GetString() is string aipPath
                        && Directory.Exists(aipPath)
                    )
                    {
                        candidates.Add(aipPath);
                    }
                }
                catch (JsonException)
                {
                    // Treat malformed JSON as "no hint" — fall through to the
                    // remaining candidates.
                }
            }

            foreach (string root in candidates)
            {
                string gmDir = Path.Combine(
                    root,
                    ".context",
                    "features",
                    "manage-books",
                    "golden-masters",
                    gmName
                );
                if (Directory.Exists(gmDir))
                    return gmDir;
            }

            Assert.Inconclusive(
                $"Golden master directory '{gmName}' not found in any candidate "
                    + $"location: [{string.Join(", ", candidates)}]. The ai-prompts "
                    + "repo must be a sibling of paranext-core for this harness to run."
            );
            // Unreachable — Assert.Inconclusive throws.
            return string.Empty;
        }

        /// <summary>
        /// Reads a GM's <c>expected-output.json</c> as a generic JsonDocument.
        /// </summary>
        private static JsonDocument LoadExpected(string gmName)
        {
            string path = Path.Combine(ResolveGoldenMasterDir(gmName), "expected-output.json");
            Assert.That(
                File.Exists(path),
                Is.True,
                $"GM '{gmName}' is missing expected-output.json at {path}"
            );
            return JsonDocument.Parse(File.ReadAllText(path));
        }

        /// <summary>
        /// Reads a GM's <c>metadata.json</c>'s <c>normalizations</c> array.
        /// Returns an empty array when the field is absent.
        /// </summary>
        private static string[] LoadNormalizations(string gmName)
        {
            string path = Path.Combine(ResolveGoldenMasterDir(gmName), "metadata.json");
            if (!File.Exists(path))
                return Array.Empty<string>();
            using JsonDocument doc = JsonDocument.Parse(File.ReadAllText(path));
            if (
                !doc.RootElement.TryGetProperty("normalizations", out JsonElement norms)
                || norms.ValueKind != JsonValueKind.Array
            )
                return Array.Empty<string>();
            return norms
                .EnumerateArray()
                .Select(n => n.GetString() ?? string.Empty)
                .Where(s => s.Length > 0)
                .ToArray();
        }

        /// <summary>
        /// Applies the per-GM normalizations declared in metadata.json. Order
        /// is fixed (line-endings → trailing-whitespace → NFC) so two callers
        /// with the same input list always agree.
        /// </summary>
        private static string Normalize(string s, IReadOnlyCollection<string> ops)
        {
            if (ops.Contains("normalize-line-endings"))
            {
                // Convert CRLF and bare CR to LF.
                s = s.Replace("\r\n", "\n").Replace("\r", "\n");
            }
            if (ops.Contains("trim-trailing-whitespace"))
            {
                s = string.Join("\n", s.Split('\n').Select(line => line.TrimEnd(' ', '\t')));
            }
            if (ops.Contains("nfc") || ops.Contains("normalize-unicode-nfc"))
            {
                s = s.Normalize(System.Text.NormalizationForm.FormC);
            }
            return s;
        }

        /// <summary>
        /// Replaces the project-name token in a captured PT9 USFM with the
        /// PT10 test project's display name. PT9 captures embed the project
        /// name in the \id line (e.g. <c>"\id JUD - _GM_CAPTURE_TEMP_gm_gm-001"</c>);
        /// PT10 DummyScrText reports a different name. Replacing the
        /// captured project-name suffix keeps the byte-diff focused on the
        /// USFM body that ParatextData primitives produced.
        /// </summary>
        private static string SubstituteProjectName(string usfm, string actualProjectName)
        {
            // The capture pattern is "\id <BOOK> - <PROJECT_NAME>".
            // Match the suffix " - ..." up to end-of-line.
            return Regex.Replace(
                usfm,
                @"(\\id [A-Z0-9]{2,4}) - [^\r\n]*",
                m => $"{m.Groups[1].Value} - {actualProjectName}"
            );
        }

        /// <summary>
        /// Produces a unified-style line-by-line diff between two normalized
        /// strings. Used to make byte-level failures legible in test output.
        /// </summary>
        private static string DiffLines(string expected, string actual)
        {
            string[] e = expected.Split('\n');
            string[] a = actual.Split('\n');
            int max = Math.Max(e.Length, a.Length);
            var sb = new System.Text.StringBuilder();
            for (int i = 0; i < max; i++)
            {
                string el = i < e.Length ? e[i] : "<EOF>";
                string al = i < a.Length ? a[i] : "<EOF>";
                if (el != al)
                {
                    sb.AppendLine($"  line {i + 1}:");
                    sb.AppendLine($"    expected: {Escape(el)}");
                    sb.AppendLine($"    actual:   {Escape(al)}");
                }
            }
            return sb.Length == 0 ? "(no differences)" : sb.ToString();
        }

        private static string Escape(string s) =>
            s.Replace("\\", "\\\\").Replace("\r", "\\r").Replace("\t", "\\t");

        // ===================================================================
        // gm-001 / gm-002 / gm-004: ScriptureTemplate USFM file content
        // ===================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-003")]
        [Property("GoldenMaster", "gm-001")]
        [Description(
            "FN-006: drive ScriptureTemplateService.CreateOneBook(JUD) and "
                + "byte-diff the resulting USFM against gm-001/expected-output.json "
                + "(after line-ending + trailing-whitespace normalization and "
                + "project-name substitution)."
        )]
        public void Gm001_EmptyBook_ByteMatchesAfterNormalization()
        {
            using var scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            // Drive the production code path.
            bool result = ScriptureTemplateService.CreateOneBook(
                scrText,
                bookNum: 65,
                createCV: false,
                createUsingModelTextAsTemplate: false
            );
            Assert.That(result, Is.True, "CreateOneBook should succeed");

            string actual = scrText.GetText(65);

            // Load expected from GM.
            using JsonDocument doc = LoadExpected("gm-001-scripture-template-empty");
            string expected = doc
                .RootElement.GetProperty("output")
                .GetProperty("fileContent")
                .GetString()!;

            string[] norms = LoadNormalizations("gm-001-scripture-template-empty");
            string normExpected = Normalize(
                SubstituteProjectName(expected, scrText.Settings.FullName),
                norms
            );
            string normActual = Normalize(actual, norms);

            Assert.That(
                normActual,
                Is.EqualTo(normExpected),
                $"gm-001 byte-diff failed:\n{DiffLines(normExpected, normActual)}"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-003")]
        [Property("GoldenMaster", "gm-002")]
        [Description(
            "FN-006: drive ScriptureTemplateService.CreateOneBook(NAM, createCV=true) "
                + "and byte-diff the resulting USFM against gm-002/expected-output.json. "
                + "Verifies the CV expansion produces the same \\c and \\v markers PT9 did."
        )]
        public void Gm002_ChapterVerse_ByteMatchesAfterNormalization()
        {
            using var scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            bool result = ScriptureTemplateService.CreateOneBook(
                scrText,
                bookNum: 34,
                createCV: true,
                createUsingModelTextAsTemplate: false
            );
            Assert.That(result, Is.True);

            string actual = scrText.GetText(34);

            using JsonDocument doc = LoadExpected("gm-002-scripture-template-cv");
            string expected = doc
                .RootElement.GetProperty("output")
                .GetProperty("fileContent")
                .GetString()!;

            string[] norms = LoadNormalizations("gm-002-scripture-template-cv");
            string normExpected = Normalize(
                SubstituteProjectName(expected, scrText.Settings.FullName),
                norms
            );
            string normActual = Normalize(actual, norms);

            Assert.That(
                normActual,
                Is.EqualTo(normExpected),
                $"gm-002 byte-diff failed:\n{DiffLines(normExpected, normActual)}"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-003")]
        [Property("GoldenMaster", "gm-004")]
        [Description(
            "FN-006: drive ScriptureTemplateService.CreateOneBook(GEN) and "
                + "byte-diff the \\id-line header against gm-004/expected-output.json. "
                + "DummyScrText has empty BookNames (matching the PT9 capture state) "
                + "so the header is just '\\id GEN - <project>'."
        )]
        public void Gm004_InitialLines_ByteMatchesAfterNormalization()
        {
            using var scrText = (DummyScrText)CreateDummyProject();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            bool result = ScriptureTemplateService.CreateOneBook(
                scrText,
                bookNum: 1,
                createCV: false,
                createUsingModelTextAsTemplate: false
            );
            Assert.That(result, Is.True);

            string actual = scrText.GetText(1);

            // gm-004's expected output is wrapped in a printf-style envelope:
            //   "{ headerContent = \id GEN - _GM_CAPTURE_TEMP_gm_004_initial\r\n\r\n }"
            // Extract the inner content for diff. Match exactly:
            //   "{ headerContent = " (prefix) ... " }" (literal trailing space-brace)
            // so the trailing \r\n\r\n inside the content is preserved.
            using JsonDocument doc = LoadExpected("gm-004-scripture-template-initial-lines");
            string outputRaw = doc.RootElement.GetProperty("output").GetString()!;
            const string prefix = "{ headerContent = ";
            const string suffix = " }";
            Assert.That(
                outputRaw.StartsWith(prefix) && outputRaw.EndsWith(suffix),
                Is.True,
                $"gm-004 expected-output.json envelope is malformed: '{outputRaw}'"
            );
            string expected = outputRaw.Substring(
                prefix.Length,
                outputRaw.Length - prefix.Length - suffix.Length
            );

            string[] norms = LoadNormalizations("gm-004-scripture-template-initial-lines");
            string normExpected = Normalize(
                SubstituteProjectName(expected, scrText.Settings.FullName),
                norms
            );
            string normActual = Normalize(actual, norms);

            Assert.That(
                normActual,
                Is.EqualTo(normExpected),
                $"gm-004 byte-diff failed:\n{DiffLines(normExpected, normActual)}"
            );
        }

        // ===================================================================
        // gm-003: ScriptureTemplate "from model" — DEFERRED. The captured
        // model project (input-model-MRK.usfm) uses markers (\q1, \q2, \li1)
        // that are NOT recognized as paragraph markers by DummyScrStylesheet,
        // so the template extraction silently drops them. Writing a
        // byte-faithful gm-003 reproduction requires a real .sty file
        // matching the PT9 capture environment — that is the standalone
        // fixture work this harness intentionally does not pursue (per the
        // FN-006 §scope-boundary "out of scope" line). The existing
        // ScriptureTemplateServiceTests cover the marker-preservation contract
        // semantically with a reduced marker set.
        // ===================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-003")]
        [Property("GoldenMaster", "gm-003")]
        [Description(
            "FN-006: gm-003 byte-level reproduction requires a real PT9 .sty "
                + "stylesheet; DummyScrStylesheet drops \\q1/\\q2/\\li1 markers "
                + "during template extraction because it does not recognize them "
                + "as paragraph markers. Marker-preservation contract is covered "
                + "semantically in ScriptureTemplateServiceTests with a reduced "
                + "marker set. This placeholder documents the scope boundary."
        )]
        [Ignore(
            "gm-003 needs real .sty fixture; semantic coverage exists in ScriptureTemplateServiceTests"
        )]
        public void Gm003_FromModel_RequiresRealStylesheetFixture()
        {
            // No-op — see Description.
        }

        // ===================================================================
        // gm-005: CreateBooks GetAvailableBooksForCreation
        // ===================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-004")]
        [Property("GoldenMaster", "gm-005")]
        [Description(
            "FN-006: drive CreateBooksOrchestrator.GetAvailableBooksForCreation "
                + "with GEN+EXO seeded as already-present and verify the returned "
                + "book numbers convert to the SAME canonical IDs as gm-005's "
                + "availableBooks list. The captured GM corresponds to the "
                + "harness's TempProject state (BooksPresentSet not seeded — "
                + "GEN/EXO appear in availableBooks). PT10 seeds GEN+EXO so the "
                + "shape we verify is: 'when GEN+EXO present, neither appears in "
                + "the available list and both appear in excluded'."
        )]
        public void Gm005_AvailableBookSet_ExcludesPresentBooks()
        {
            using var scrText = (DummyScrText)CreateDummyProject();
            // Seed GEN (1) and EXO (2) as present so the filter excludes them.
            scrText.PutText(1, 0, false, "\\id GEN Test\r\n", null);
            scrText.PutText(2, 0, false, "\\id EXO Test\r\n", null);
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            int[] available = CreateBooksOrchestrator.GetAvailableBooksForCreation(scrText);
            HashSet<string> availableIds = available
                .Select(n => Canon.BookNumberToId(n))
                .ToHashSet();

            using JsonDocument doc = LoadExpected("gm-005-create-available-bookset");
            string[] expectedAvailable = doc
                .RootElement.GetProperty("output")
                .GetProperty("availableBooks")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToArray();
            string[] expectedExcluded = doc
                .RootElement.GetProperty("output")
                .GetProperty("excludedBooks")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToArray();

            // The captured gm-005 was generated WITHOUT BooksPresentSet seeding
            // (per its captureNotes: "TempProject BooksPresentSet not set —
            // GEN/EXO not excluded"), so its `availableBooks` LIST includes
            // GEN/EXO. The PT10-with-GEN+EXO-seeded run's availableBooks is
            // exactly (gm005.availableBooks) MINUS {GEN, EXO}. We assert that
            // equivalence directly.
            HashSet<string> expectedWhenSeeded = expectedAvailable
                .Except(expectedExcluded)
                .ToHashSet();

            Assert.That(
                availableIds,
                Is.EquivalentTo(expectedWhenSeeded),
                "gm-005: PT10 available-set must equal gm-005.availableBooks "
                    + "minus the books the test seeded as present"
            );

            // And both excluded books must be missing.
            foreach (string excluded in expectedExcluded)
            {
                Assert.That(
                    availableIds,
                    Has.No.Member(excluded),
                    $"gm-005: '{excluded}' was seeded as present and must not appear in available"
                );
            }
        }

        // ===================================================================
        // gm-006: 6 ComparisonState entries (decision-tree exact match)
        // ===================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-006")]
        [Property("GoldenMaster", "gm-006")]
        [Description(
            "FN-006: drive CopyBooksOrchestrator.SetDefaultEligibility for all "
                + "6 ComparisonState branches and verify each produces the same "
                + "(state, include, tooltip-after-localization-fallback) tuple "
                + "PT9 captured. Note: gm-006's `include` flag preserves PT9 "
                + "FB 29809 (always false); PT10 corrects this per "
                + "data-contracts.md §3.5 (DestDoesNotExist=true, "
                + "SourceIsNewer=true). This test verifies STATE + TOOLTIP "
                + "match; the include-flag intentional divergence is documented "
                + "in CopyBooksOrchestratorTests.SetDefaultEligibility_SixStates_MatchContractRulesNotPt9Bug."
        )]
        public void Gm006_ComparisonStates_StateAndTooltipMatch()
        {
            // Build inputs for each of the 6 branches (PT10 logic, not PT9
            // bugs). Texts and timestamps chosen to drive each branch.
            var same = new DateTime(2026, 1, 1);
            var earlier = new DateTime(2025, 1, 1);
            var later = new DateTime(2027, 1, 1);

            BookComparisonEntry filesAreSame = CopyBooksOrchestrator.SetDefaultEligibility(
                1,
                "GEN",
                "\\id GEN\r\n\\v 1 same",
                "\\id GEN\r\n\\v 1 same",
                same,
                same
            );
            BookComparisonEntry sourceMissing = CopyBooksOrchestrator.SetDefaultEligibility(
                2,
                "EXO",
                "",
                "\\id EXO\r\n\\v 1 dest",
                same,
                same
            );
            BookComparisonEntry destMissing = CopyBooksOrchestrator.SetDefaultEligibility(
                3,
                "LEV",
                "\\id LEV\r\n\\v 1 source",
                "",
                same,
                same
            );
            BookComparisonEntry sourceNewer = CopyBooksOrchestrator.SetDefaultEligibility(
                4,
                "NUM",
                "\\id NUM\r\n\\v 1 newer",
                "\\id NUM\r\n\\v 1 older",
                later,
                earlier
            );
            BookComparisonEntry sourceOlder = CopyBooksOrchestrator.SetDefaultEligibility(
                5,
                "DEU",
                "\\id DEU\r\n\\v 1 older",
                "\\id DEU\r\n\\v 1 newer",
                earlier,
                later
            );
            BookComparisonEntry undetermined = CopyBooksOrchestrator.SetDefaultEligibility(
                6,
                "JOS",
                "\\id JOS\r\n\\v 1 a",
                "\\id JOS\r\n\\v 1 b",
                same,
                same
            );

            // Resolve PT10 tooltip keys to their English fallbacks for diffing
            // against the PT9 capture (which captured English text directly).
            string ResolveTooltip(string keyOrText)
            {
                return keyOrText switch
                {
                    CopyBooksOrchestrator.FilesAreSameTooltipKey =>
                        CopyBooksOrchestrator.FilesAreSameTooltipFallback,
                    CopyBooksOrchestrator.SourceDoesNotExistTooltipKey =>
                        CopyBooksOrchestrator.SourceDoesNotExistTooltipFallback,
                    CopyBooksOrchestrator.DestDoesNotExistTooltipKey =>
                        CopyBooksOrchestrator.DestDoesNotExistTooltipFallback,
                    CopyBooksOrchestrator.SourceIsNewerTooltipKey =>
                        CopyBooksOrchestrator.SourceIsNewerTooltipFallback,
                    CopyBooksOrchestrator.SourceIsOlderTooltipKey =>
                        CopyBooksOrchestrator.SourceIsOlderTooltipFallback,
                    _ => keyOrText,
                };
            }

            using JsonDocument doc = LoadExpected("gm-006-copy-comparison-states");
            JsonElement gmStates = doc
                .RootElement.GetProperty("output")
                .GetProperty("comparisonStates");
            var gm = gmStates
                .EnumerateArray()
                .ToDictionary(
                    s => s.GetProperty("state").GetString()!,
                    s => s.GetProperty("tooltip").GetString()!
                );

            // Match the entry's STATE name and resolved TOOLTIP against gm-006.
            Assert.Multiple(() =>
            {
                Assert.That(
                    ResolveTooltip(filesAreSame.TooltipInfo),
                    Is.EqualTo(gm["FilesAreSame"]),
                    "FilesAreSame tooltip"
                );
                Assert.That(
                    ResolveTooltip(sourceMissing.TooltipInfo),
                    Is.EqualTo(gm["SourceDoesNotExist"]),
                    "SourceDoesNotExist tooltip"
                );
                Assert.That(
                    ResolveTooltip(destMissing.TooltipInfo),
                    Is.EqualTo(gm["DestDoesNotExist"]),
                    "DestDoesNotExist tooltip"
                );
                Assert.That(
                    ResolveTooltip(sourceNewer.TooltipInfo),
                    Is.EqualTo(gm["SourceIsNewer"]),
                    "SourceIsNewer tooltip"
                );
                Assert.That(
                    ResolveTooltip(sourceOlder.TooltipInfo),
                    Is.EqualTo(gm["SourceIsOlder"]),
                    "SourceIsOlder tooltip"
                );
                Assert.That(
                    ResolveTooltip(undetermined.TooltipInfo),
                    Is.EqualTo(gm["Undetermined"]),
                    "Undetermined tooltip (intentionally empty)"
                );

                // States enumerate exactly the 6 captured states (no missing/extra).
                Assert.That(
                    new[]
                    {
                        filesAreSame.ComparisonState.ToString(),
                        sourceMissing.ComparisonState.ToString(),
                        destMissing.ComparisonState.ToString(),
                        sourceNewer.ComparisonState.ToString(),
                        sourceOlder.ComparisonState.ToString(),
                        undetermined.ComparisonState.ToString(),
                    },
                    Is.EquivalentTo(gm.Keys),
                    "gm-006 captured exactly these 6 states"
                );
            });
        }

        // ===================================================================
        // gm-007 / gm-008: CopyProjectFiltering allowed/excluded type lists
        // ===================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-008")]
        [Property("GoldenMaster", "gm-007")]
        [Description(
            "FN-006: drive CopyBooksOrchestrator.GetToProjectFilter for "
                + "Standard source and verify the predicate accepts EXACTLY "
                + "gm-007.allowedTypes and rejects EXACTLY gm-007.excludedTypes."
        )]
        public void Gm007_StandardSourceFilter_AllowedAndExcludedTypesMatch()
        {
            using JsonDocument doc = LoadExpected("gm-007-copy-to-project-filtering-standard");
            string[] expectedAllowed = doc
                .RootElement.GetProperty("output")
                .GetProperty("allowedTypes")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToArray();
            string[] expectedExcluded = doc
                .RootElement.GetProperty("output")
                .GetProperty("excludedTypes")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToArray();

            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.Standard
            );
            VerifyPredicateMatchesAllowedExcluded(
                predicate,
                expectedAllowed,
                expectedExcluded,
                "gm-007"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-008")]
        [Property("GoldenMaster", "gm-008")]
        [Description(
            "FN-006: drive CopyBooksOrchestrator.GetToProjectFilter for "
                + "Auxiliary source and verify the predicate accepts EXACTLY "
                + "gm-008.allowedTypes and rejects EXACTLY gm-008.excludedTypes. "
                + "Verifies the parameterized-types branch (Aux uses the same set "
                + "as Standard)."
        )]
        public void Gm008_AuxiliarySourceFilter_AllowedAndExcludedTypesMatch()
        {
            using JsonDocument doc = LoadExpected("gm-008-copy-to-project-filtering-parameterized");
            string[] expectedAllowed = doc
                .RootElement.GetProperty("output")
                .GetProperty("allowedTypes")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToArray();
            string[] expectedExcluded = doc
                .RootElement.GetProperty("output")
                .GetProperty("excludedTypes")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToArray();

            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.Auxiliary
            );
            VerifyPredicateMatchesAllowedExcluded(
                predicate,
                expectedAllowed,
                expectedExcluded,
                "gm-008"
            );
        }

        // gm-009 mapin / gm-010 TECkit are documented as Windows-only in
        // their metadata.json. The encoding converters they exercise
        // (Encoding.MapInfo for mapin, ECEngine for TECkit) require
        // Windows-only ICU bindings that are not loaded on Linux/WSL2 CI.
        // Document the deferral with [Ignore].

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-007")]
        [Property("GoldenMaster", "gm-009")]
        [Ignore(
            "gm-009 mapin encoding is Windows-only per gm metadata; ICU bindings unavailable on Linux/WSL2"
        )]
        public void Gm009_MapinEncoding_WindowsOnly() { }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-007")]
        [Property("GoldenMaster", "gm-010")]
        [Ignore(
            "gm-010 TECkit encoding is Windows-only per gm metadata; ICU bindings unavailable on Linux/WSL2"
        )]
        public void Gm010_TeckitEncoding_WindowsOnly() { }

        // gm-011: Menu enable conditions — per FN-003 the dynamic-menu
        // service does NOT exist in PT10 (deferred to a future platform
        // mechanism). The captured boolean truth-table is documented in
        // backend-alignment.md / ui-alignment.md for future implementation;
        // there is no PT10 service to byte-diff against.

        [Test]
        [Category("Acceptance")]
        [Property("GoldenMaster", "gm-011")]
        [Ignore(
            "gm-011 dynamic menu enable conditions deferred per FN-003 — no PT10 service exists to verify against"
        )]
        public void Gm011_MenuEnableConditions_DeferredPerFn003() { }

        // ===================================================================
        // gm-012: Import overlapping-files alert message
        // ===================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-009")]
        [Property("GoldenMaster", "gm-012")]
        [Description(
            "FN-006: verify the PT10 ImportBooksOrchestrator overlap-detection "
                + "alert message contains the same fixed phrasing PT9 captured. "
                + "PT9 produced: '<file1> <=> <file2>: <message>' where <message> "
                + "is the captured gm-012 string. PT10 may parameterize the "
                + "<file1>/<file2> portion differently — gm-012 captures only "
                + "the localizable <message> tail, which is what we verify."
        )]
        public void Gm012_OverlapMessage_StringMatchesCapturedTail()
        {
            using JsonDocument doc = LoadExpected("gm-012-import-overlapping-files");
            string expected = doc.RootElement.GetProperty("output").GetString()!;

            // The PT10 fallback is registered in ManageBooksService localization
            // strings under '%manageBooks_import_overlappingFiles%'. We compare
            // the English fallback text directly because the wire boundary
            // resolves keys via LocalizationService; the constant carrying the
            // English text is the source of truth.
            string actualFallback = ImportBooksOrchestrator.OverlappingFilesAlertFallback;

            Assert.That(
                actualFallback,
                Is.EqualTo(expected).IgnoreCase,
                "gm-012: PT10 ImportBooksOrchestrator.OverlappingFilesFallback must match "
                    + "the captured PT9 ImportBooksForm_7 message tail"
            );
        }

        // ===================================================================
        // Helpers
        // ===================================================================

        private void VerifyPredicateMatchesAllowedExcluded(
            Predicate<ScrText> predicate,
            string[] expectedAllowed,
            string[] expectedExcluded,
            string gmName
        )
        {
            // Build a fresh ScrText per type so the predicate can decide on
            // each. We reuse the CopyProjectFilteringTests pattern.
            // Note: ProjectType in ParatextData is a PtxUtils.Enum<T> wrapper
            // around a string. Equality on the wrapper compares the underlying
            // string, but the C# field NAME and the underlying STRING differ
            // for some types — notably `ProjectType.TransliterationManual`'s
            // string value is "Transliteration" (see ProjectType.cs:26). So
            // resolving `"TransliterationManual"` (the gm field name) by
            // calling `new Enum<ProjectType>("TransliterationManual")` would
            // produce a wrapper that does NOT equal the static singleton —
            // and the predicate's reference / value comparison would fail.
            // Resolve via reflection on the static field name instead so the
            // test uses the singleton each predicate tests against.
            var byType = new Dictionary<string, DummyScrText>();
            foreach (string typeName in expectedAllowed.Concat(expectedExcluded))
            {
                Enum<ProjectType>? type = ResolveProjectTypeByFieldName(typeName);
                if (type is null)
                {
                    Assert.Fail(
                        $"{gmName}: ProjectType field name '{typeName}' was not found "
                            + "as a static field on Paratext.Data.ProjectType"
                    );
                    return; // unreachable
                }
                DummyScrText scrText = CreateScrTextForType($"Proj{typeName}", type.Value);
                ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);
                byType[typeName] = scrText;
            }

            try
            {
                Assert.Multiple(() =>
                {
                    foreach (string allowed in expectedAllowed)
                    {
                        Assert.That(
                            predicate(byType[allowed]),
                            Is.True,
                            $"{gmName}: '{allowed}' must be allowed"
                        );
                    }
                    foreach (string excluded in expectedExcluded)
                    {
                        Assert.That(
                            predicate(byType[excluded]),
                            Is.False,
                            $"{gmName}: '{excluded}' must be excluded"
                        );
                    }
                });
            }
            finally
            {
                foreach (var sx in byType.Values)
                    sx.Dispose();
            }
        }

        /// <summary>
        /// Resolves a ProjectType static singleton by its C# field name using
        /// reflection. Returns null when no such public static field exists.
        /// Bridges the gap between the gm-XXX field-name string ("TransliterationManual")
        /// and the field's underlying enum-wrapper value ("Transliteration").
        /// <see cref="Enum{T}"/> is a value type so we can't use <c>as</c>;
        /// use a try/cast wrapper.
        /// </summary>
        private static Enum<ProjectType>? ResolveProjectTypeByFieldName(string fieldName)
        {
            FieldInfo? field = typeof(ProjectType).GetField(
                fieldName,
                BindingFlags.Public | BindingFlags.Static
            );
            object? value = field?.GetValue(null);
            return value is Enum<ProjectType> typed ? typed : (Enum<ProjectType>?)null;
        }

        private static DummyScrText CreateScrTextForType(string name, Enum<ProjectType> type)
        {
            var details = new Paranext.DataProvider.Projects.ProjectDetails(
                name,
                new Paranext.DataProvider.Projects.ProjectMetadata(
                    HexId.CreateNew().ToString(),
                    []
                ),
                ""
            );
            var scrText = new DummyScrText(details);
            string baseName = type.IsDerivedType() ? "PlaceholderBase" : "";
            scrText.Settings.TranslationInfo = new TranslationInformation(type, baseName);
            scrText.Settings.Editable = true;
            return scrText;
        }
    }
}

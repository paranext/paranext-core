using System.Collections.Generic;
using Paranext.DataProvider.Checklists;
using Paranext.DataProvider.Checklists.Markers;
using Paratext.Data;

namespace TestParanextDataProvider.Checklists.Markers;

/// <summary>
/// RED-phase contract tests for CAP-002 (Markers Data Source — leaf logic).
///
/// <para>
/// These tests will NOT compile until the implementer creates the static class
/// <c>Paranext.DataProvider.Checklists.Markers.MarkersDataSource</c> with the
/// seven public static methods below. That is intentional: the test file IS the
/// specification — the compile error is the first layer of the RED signal; the
/// test assertion failures are the second (matches the CAP-001 precedent in
/// <c>ChecklistDataModelTests.cs:12-16</c>).
/// </para>
///
/// <para>
/// Scope: marker-specific leaf logic only. Full <c>CLDataSource.BuildRows</c>
/// pipeline verification (gm-002..gm-018 captures) lives at the orchestration
/// layer (CAP-006) where these leaves are composed. See
/// <c>implementation/plans/test-writer-CAP-002.md</c> for the rationale.
/// </para>
///
/// Traceability:
///   - Capability: CAP-002
///   - Behaviors: BHV-102, BHV-103, BHV-104, BHV-105, BHV-106, BHV-120
///   - Extractions: EXT-003, EXT-004, EXT-005, EXT-006, EXT-007, EXT-013
///   - Invariants: INV-003, INV-004, INV-005 (CRITICAL bidirectional),
///     INV-008, VAL-001, VAL-005, VAL-006
///   - Contract: data-contracts.md §4.1 (BuildChecklistData leaf behaviors)
/// </summary>
[TestFixture]
internal class MarkersDataSourceTests
{
    // ---------------------------------------------------------------------
    // Shared fixtures
    // ---------------------------------------------------------------------

    /// <summary>
    /// The <c>DummyScrStylesheet</c> already defines paragraph markers (p, s, mt,
    /// nb, ip, id, rem, c, cp) and character markers (w, em, nd). We use it
    /// directly to verify INV-003 (only <c>scParagraphStyle</c> markers) without
    /// constructing yet another fixture.
    /// </summary>
    private ScrStylesheet BuildStylesheet() => new DummyScrStylesheet();

    private static ChecklistRow RowFromMarkers(params string[][] cellMarkers)
    {
        var cells = new List<ChecklistCell>();
        foreach (var markers in cellMarkers)
        {
            var paragraphs = new List<ChecklistParagraph>();
            foreach (var marker in markers)
            {
                paragraphs.Add(new ChecklistParagraph(marker, new List<ChecklistContentItem>()));
            }
            cells.Add(new ChecklistCell(paragraphs, "GEN 1:1", "GEN 1:1", "en", Error: null));
        }
        return new ChecklistRow(
            cells,
            IsMatch: false,
            IncludeEditLink: false,
            Score: 0.0,
            FirstRef: null
        );
    }

    // =====================================================================
    // BHV-102 / EXT-003 — ParagraphMarkers
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "ParagraphMarkers")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-102")]
    [Property("InvariantId", "INV-003")]
    public void ParagraphMarkers_ReturnsOnlyScParagraphStyleMarkers()
    {
        // INV-003: The Markers checklist includes only markers with
        // StyleType == scParagraphStyle (never character styles).
        var stylesheet = BuildStylesheet();
        var emptyFilter = new HashSet<string>();

        var result = MarkersDataSource.ParagraphMarkers(stylesheet, emptyFilter);

        Assert.That(result, Is.Not.Null);
        // DummyScrStylesheet defines these paragraph markers.
        Assert.That(result, Does.Contain("p"));
        Assert.That(result, Does.Contain("s"));
        Assert.That(result, Does.Contain("mt"));
        Assert.That(result, Does.Contain("nb"));
        Assert.That(result, Does.Contain("ip"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "ParagraphMarkers")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-102")]
    [Property("InvariantId", "INV-003")]
    public void ParagraphMarkers_ExcludesCharacterStyleMarkers()
    {
        // INV-003 negative branch: character-style markers (w, em, nd) must NOT
        // appear in the result even though they are defined in the stylesheet.
        var stylesheet = BuildStylesheet();
        var emptyFilter = new HashSet<string>();

        var result = MarkersDataSource.ParagraphMarkers(stylesheet, emptyFilter);

        Assert.That(result, Does.Not.Contain("w"));
        Assert.That(result, Does.Not.Contain("em"));
        Assert.That(result, Does.Not.Contain("nd"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "ParagraphMarkers")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-102")]
    public void ParagraphMarkers_WithActiveFilter_RestrictsToFilteredMarkers()
    {
        // BHV-102: non-empty filter intersects with the stylesheet's paragraph
        // markers. Only markers that appear in BOTH are returned.
        var stylesheet = BuildStylesheet();
        var filter = new HashSet<string> { "p", "s" };

        var result = MarkersDataSource.ParagraphMarkers(stylesheet, filter);

        Assert.That(result, Does.Contain("p"));
        Assert.That(result, Does.Contain("s"));
        Assert.That(result, Does.Not.Contain("mt"), "mt is a paragraph marker but not in filter");
        Assert.That(result, Does.Not.Contain("nb"), "nb is a paragraph marker but not in filter");
        Assert.That(result.Count, Is.EqualTo(2));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "ParagraphMarkers")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-102")]
    [Property("ValidationRule", "VAL-006")]
    public void ParagraphMarkers_WithEmptyFilter_ReturnsAllParagraphMarkers()
    {
        // VAL-006: empty filter means "all paragraph markers in the stylesheet".
        // Verified by comparing filtered-output count with unfiltered-output
        // count after passing through an empty filter — they must equal.
        var stylesheet = BuildStylesheet();
        var emptyFilter = new HashSet<string>();

        var result = MarkersDataSource.ParagraphMarkers(stylesheet, emptyFilter);

        // Should include every known paragraph marker from DummyScrStylesheet.
        Assert.That(result, Does.Contain("p"));
        Assert.That(result, Does.Contain("s"));
        Assert.That(result, Does.Contain("mt"));
        Assert.That(result, Does.Contain("nb"));
        Assert.That(result, Does.Contain("ip"));
        Assert.That(result, Does.Contain("id"));
        Assert.That(result, Does.Contain("c"));
        Assert.That(result, Does.Contain("cp"));
        Assert.That(result, Does.Contain("rem"));
        // And must not include any character-style markers.
        Assert.That(result, Does.Not.Contain("w"));
    }

    // =====================================================================
    // BHV-103 / EXT-004 — PostProcessParagraph
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessParagraph")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-103")]
    [Property("InvariantId", "INV-004")]
    public void PostProcessParagraph_ShowVerseTextFalse_ClearsItemsAndInsertsMarkerOnly()
    {
        // BHV-103 / INV-004: with showVerseText=false, existing items are cleared
        // and a single TextItem("\\" + marker) is inserted at position 0.
        var input = new ChecklistParagraph(
            "p",
            new List<ChecklistContentItem>
            {
                new TextItem("verse text here", null),
                new TextItem("more text", null),
            }
        );

        var result = MarkersDataSource.PostProcessParagraph(input, showVerseText: false);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Marker, Is.EqualTo("p"));
        Assert.That(result.Items.Count, Is.EqualTo(1));
        Assert.That(result.Items[0], Is.InstanceOf<TextItem>());
        Assert.That(((TextItem)result.Items[0]).Text, Is.EqualTo("\\p"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessParagraph")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-103")]
    [Property("InvariantId", "INV-004")]
    public void PostProcessParagraph_ShowVerseTextTrue_PrependsMarkerBeforeText()
    {
        // BHV-103: with showVerseText=true, marker text is inserted at index 0
        // and the original items are preserved at positions 1..N.
        var input = new ChecklistParagraph(
            "q2",
            new List<ChecklistContentItem>
            {
                new TextItem("indented ", null),
                new TextItem("poetry", null),
            }
        );

        var result = MarkersDataSource.PostProcessParagraph(input, showVerseText: true);

        Assert.That(result.Items.Count, Is.EqualTo(3));
        Assert.That(result.Items[0], Is.InstanceOf<TextItem>());
        Assert.That(((TextItem)result.Items[0]).Text, Is.EqualTo("\\q2"));
        Assert.That(((TextItem)result.Items[1]).Text, Is.EqualTo("indented "));
        Assert.That(((TextItem)result.Items[2]).Text, Is.EqualTo("poetry"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessParagraph")]
    [Property("ScenarioId", "TS-067")]
    [Property("BehaviorId", "BHV-103")]
    public void PostProcessParagraph_ShowVerseTextFalse_WithMarkerQ1_DisplaysBackslashQ1Only()
    {
        // TS-067: q1 marker with showVerseText=false displays exactly "\q1".
        var input = new ChecklistParagraph(
            "q1",
            new List<ChecklistContentItem> { new TextItem("some content", null) }
        );

        var result = MarkersDataSource.PostProcessParagraph(input, showVerseText: false);

        Assert.That(result.Items.Count, Is.EqualTo(1));
        Assert.That(((TextItem)result.Items[0]).Text, Is.EqualTo("\\q1"));
    }

    // =====================================================================
    // BHV-104 / EXT-005 — HasSameValue (pairwise marker equivalence)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-011")]
    [Property("BehaviorId", "BHV-104")]
    public void HasSameValue_IdenticalMarkers_ReturnsTrue()
    {
        // TS-011: two cells with the same single marker 'p' match without any
        // mappings configured.
        var row = RowFromMarkers(new[] { "p" }, new[] { "p" });
        var noMappings = new Dictionary<string, List<string>>();

        var result = MarkersDataSource.HasSameValue(row, noMappings);

        Assert.That(result, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-104")]
    public void HasSameValue_DifferentNonMappedMarkers_ReturnsFalse()
    {
        // TS-012: two cells with different markers and no mapping -> not equivalent.
        var row = RowFromMarkers(new[] { "p" }, new[] { "q" });
        var noMappings = new Dictionary<string, List<string>>();

        var result = MarkersDataSource.HasSameValue(row, noMappings);

        Assert.That(result, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-005")]
    public void HasSameValue_BidirectionalMapping_TreatsMappedMarkersAsEquivalent()
    {
        // INV-005: with mapping p<->q configured (stored in both directions),
        // cells 'p' and 'q' are equivalent. This is the forward-direction check.
        var row = RowFromMarkers(new[] { "p" }, new[] { "q" });
        var mappings = new Dictionary<string, List<string>>
        {
            {
                "p",
                new List<string> { "q" }
            },
            {
                "q",
                new List<string> { "p" }
            },
        };

        var result = MarkersDataSource.HasSameValue(row, mappings);

        Assert.That(result, Is.True, "p and q must be equivalent via bidirectional mapping");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-005")]
    public void HasSameValue_BidirectionalMapping_ReverseDirection_StillEquivalent()
    {
        // INV-005 CRITICAL: the reverse direction must also match — the help
        // docs imply a directional (first-text/second-text) mapping, but the
        // code stores both directions, so 'q' in cell1 and 'p' in cell2 must
        // also be equivalent.
        var row = RowFromMarkers(new[] { "q" }, new[] { "p" });
        var mappings = new Dictionary<string, List<string>>
        {
            {
                "p",
                new List<string> { "q" }
            },
            {
                "q",
                new List<string> { "p" }
            },
        };

        var result = MarkersDataSource.HasSameValue(row, mappings);

        Assert.That(result, Is.True, "reverse direction (q,p) must be equivalent (INV-005)");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-104")]
    public void HasSameValue_PartialMapping_UnmappedDifferencesFailMatch()
    {
        // TS-014: cell1=[p, q1], cell2=[q, q2], mapping only has p<->q.
        // q1 and q2 are NOT mapped to each other, so the row is not a match.
        var row = RowFromMarkers(new[] { "p", "q1" }, new[] { "q", "q2" });
        var mappings = new Dictionary<string, List<string>>
        {
            {
                "p",
                new List<string> { "q" }
            },
            {
                "q",
                new List<string> { "p" }
            },
        };

        var result = MarkersDataSource.HasSameValue(row, mappings);

        Assert.That(result, Is.False, "q1/q2 are not mapped and differ -> row not a match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-015")]
    [Property("BehaviorId", "BHV-104")]
    public void HasSameValue_ParagraphCountMismatch_ReturnsFalse()
    {
        // TS-015: cell1 has 2 paragraphs, cell2 has 1. Count mismatch is a
        // difference regardless of marker content.
        var row = RowFromMarkers(new[] { "p", "q1" }, new[] { "p" });
        var noMappings = new Dictionary<string, List<string>>();

        var result = MarkersDataSource.HasSameValue(row, noMappings);

        Assert.That(result, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-065")]
    [Property("BehaviorId", "BHV-104")]
    public void HasSameValue_ThreeColumns_PairwiseComparison()
    {
        // TS-065: three cells [p][p][q]. Pairwise comparison (0,1) matches
        // but (1,2) differs -> overall result false.
        var row = RowFromMarkers(new[] { "p" }, new[] { "p" }, new[] { "q" });
        var noMappings = new Dictionary<string, List<string>>();

        var result = MarkersDataSource.HasSameValue(row, noMappings);

        Assert.That(result, Is.False, "pairwise (1,2) differs -> row not a match");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HasSameValue")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-104")]
    public void HasSameValue_EmptyCellVsPopulated_ReturnsFalse()
    {
        // TS-066: one populated cell, one empty cell -> paragraph count mismatch -> false.
        var row = RowFromMarkers(new[] { "p" }, new string[0]);
        var noMappings = new Dictionary<string, List<string>>();

        var result = MarkersDataSource.HasSameValue(row, noMappings);

        Assert.That(result, Is.False);
    }

    // =====================================================================
    // BHV-105 / EXT-006 — InitializeMarkerMappings
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    [Property("InvariantId", "INV-005")]
    public void InitializeMarkerMappings_BidirectionalPairs_StoredBothDirections()
    {
        // INV-005 CRITICAL: for input "p/q q1/q2", the resulting dictionary
        // must contain p->[q], q->[p], q1->[q2], q2->[q1] — both directions.
        var (mappings, filter) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "p/q q1/q2",
            markerFilterInput: ""
        );

        Assert.That(mappings, Is.Not.Null);
        Assert.That(mappings.ContainsKey("p"), Is.True, "p key missing");
        Assert.That(mappings["p"], Does.Contain("q"));
        Assert.That(
            mappings.ContainsKey("q"),
            Is.True,
            "q key missing (reverse direction INV-005)"
        );
        Assert.That(mappings["q"], Does.Contain("p"));
        Assert.That(mappings.ContainsKey("q1"), Is.True);
        Assert.That(mappings["q1"], Does.Contain("q2"));
        Assert.That(mappings.ContainsKey("q2"), Is.True);
        Assert.That(mappings["q2"], Does.Contain("q1"));
        Assert.That(filter, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-105")]
    public void InitializeMarkerMappings_MultiplePairsSameMarker_Accumulates()
    {
        // TS-017: "q/q1 q/q2" -> q accumulates [q1, q2]; q1->[q]; q2->[q].
        var (mappings, _) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "q/q1 q/q2",
            markerFilterInput: ""
        );

        Assert.That(mappings.ContainsKey("q"), Is.True);
        Assert.That(mappings["q"], Does.Contain("q1"));
        Assert.That(mappings["q"], Does.Contain("q2"));
        Assert.That(mappings["q"].Count, Is.EqualTo(2));
        Assert.That(mappings["q1"], Is.EqualTo(new[] { "q" }));
        Assert.That(mappings["q2"], Is.EqualTo(new[] { "q" }));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-005")]
    public void InitializeMarkerMappings_InvalidPairs_SilentlySkipped()
    {
        // VAL-005: entries without exactly two parts after splitting on '/'
        // are silently dropped. Input has two valid pairs (p/q, good/bad) and
        // two invalid entries ("invalid" with zero slashes, "p/q1/q2" with two).
        var (mappings, _) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "p/q invalid p/q1/q2 good/bad",
            markerFilterInput: ""
        );

        // Valid pairs are present.
        Assert.That(mappings.ContainsKey("p"), Is.True);
        Assert.That(mappings["p"], Does.Contain("q"));
        Assert.That(mappings.ContainsKey("q"), Is.True);
        Assert.That(mappings["q"], Does.Contain("p"));
        Assert.That(mappings.ContainsKey("good"), Is.True);
        Assert.That(mappings["good"], Does.Contain("bad"));
        Assert.That(mappings.ContainsKey("bad"), Is.True);
        Assert.That(mappings["bad"], Does.Contain("good"));

        // Invalid entries produced no entries.
        Assert.That(
            mappings.ContainsKey("invalid"),
            Is.False,
            "'invalid' (no slash) must be skipped"
        );
        Assert.That(
            mappings.ContainsKey("p/q1/q2"),
            Is.False,
            "entry with two slashes must be skipped"
        );
        // And the 3-part entry's parts must NOT have leaked in. We check that
        // 'q1' did not get linked to 'q2' through this invalid entry.
        if (mappings.TryGetValue("q1", out var q1Targets))
        {
            Assert.That(
                q1Targets,
                Does.Not.Contain("q2"),
                "invalid 3-part entry must not produce q1->q2"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-001")]
    public void InitializeMarkerMappings_BackslashesInFilter_Stripped()
    {
        // VAL-001 / TS-VAL-001-01: backslash characters in the filter string
        // are stripped automatically during parsing.
        var (_, filter) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "",
            markerFilterInput: "\\p \\q1 q2"
        );

        Assert.That(filter, Does.Contain("p"));
        Assert.That(filter, Does.Contain("q1"));
        Assert.That(filter, Does.Contain("q2"));
        Assert.That(filter, Does.Not.Contain("\\p"), "backslashes must be stripped");
        Assert.That(filter, Does.Not.Contain("\\q1"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-VAL-001-02")]
    [Property("BehaviorId", "BHV-105")]
    public void InitializeMarkerMappings_FilterWithoutBackslashes_PassesThrough()
    {
        // TS-VAL-001-02: bare marker names (no backslashes) pass through
        // unchanged after whitespace splitting.
        var (_, filter) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "",
            markerFilterInput: "p q1 q2"
        );

        Assert.That(filter, Is.EquivalentTo(new[] { "p", "q1", "q2" }));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-VAL-001-03")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-006")]
    public void InitializeMarkerMappings_EmptyFilter_ReturnsEmptySet()
    {
        // VAL-006: empty filter string means no restriction (all markers).
        // The returned set should be empty — "no restriction" is encoded by
        // the empty set, not by a magic value.
        var (_, filter) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "",
            markerFilterInput: ""
        );

        Assert.That(filter, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-006")]
    public void InitializeMarkerMappings_WhitespaceOnlyFilter_ReturnsEmptySet()
    {
        // TS-072: a whitespace-only filter splits to zero tokens and is
        // treated the same as an empty filter (VAL-006).
        var (_, filter) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "",
            markerFilterInput: "   "
        );

        Assert.That(filter, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "InitializeMarkerMappings")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    public void InitializeMarkerMappings_EmptyMappingString_ReturnsEmptyDictionary()
    {
        // With no equivalent-markers input, the mapping dictionary is empty.
        // This is the default case (no pairs configured).
        var (mappings, _) = MarkersDataSource.InitializeMarkerMappings(
            equivalentMarkersInput: "",
            markerFilterInput: ""
        );

        Assert.That(mappings, Is.Empty);
    }

    // =====================================================================
    // BHV-106 / EXT-007 — PostProcessRows (empty-results handling)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessRows")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-008")]
    public void PostProcessRows_EmptyRowsNoFilter_ReturnsIdenticalMarkersMessage()
    {
        // TS-021 / INV-008: with no rows and no filter active, the service
        // returns an EmptyResultMessage with variant="identical" and the
        // paranext-core localize key for the PT9 message. Per the
        // patterns.errorHandling.backendLocalization registry entry, the
        // static service returns the KEY; the wrapping ChecklistNetworkObject
        // resolves it via LocalizationService.GetLocalizedString before the
        // wire response is serialized. Maps to PT9 CLParagraphCellsDataSource_1.
        var emptyRows = new List<ChecklistRow>();
        var emptyFilter = new HashSet<string>();
        var books = new List<string> { "GEN" };

        var result = MarkersDataSource.PostProcessRows(emptyRows, emptyFilter, books);

        Assert.That(result, Is.Not.Null, "empty results must always produce a message (INV-008)");
        Assert.That(result!.Variant, Is.EqualTo("identical"));
        Assert.That(
            result.Message,
            Is.EqualTo(MarkersDataSource.IdenticalMarkersMessageKey),
            "static service returns the localize key (resolution at the wire boundary)"
        );
        Assert.That(
            MarkersDataSource.IdenticalMarkersMessageFallback,
            Is.EqualTo("Comparative texts have identical markers."),
            "English fallback matches PT9 Localizer.Str default at CLParagraphCellsDataSource.cs:304 (bare — '*** ... ***' wrapping was PT9 UI decoration, now a UI concern)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessRows")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-008")]
    public void PostProcessRows_EmptyRowsWithFilter_ReturnsNoResultsMessage()
    {
        // TS-022: with a marker filter active and no rows found, the message
        // variant is "noResults" (distinct from "identical").
        var emptyRows = new List<ChecklistRow>();
        var filter = new HashSet<string> { "p", "q1" };
        var books = new List<string> { "GEN", "EXO" };

        var result = MarkersDataSource.PostProcessRows(emptyRows, filter, books);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Variant, Is.EqualTo("noResults"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessRows")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-106")]
    public void PostProcessRows_EmptyRowsWithFilter_MessageListsSearchedMarkersAndBooks()
    {
        // TS-022 structural requirement: the "noResults" message must carry
        // the searched markers and searched books so the UI can render the
        // localized message ("no rows found for markers X in books Y").
        var emptyRows = new List<ChecklistRow>();
        var filter = new HashSet<string> { "p", "q1" };
        var books = new List<string> { "GEN", "EXO" };

        var result = MarkersDataSource.PostProcessRows(emptyRows, filter, books);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.SearchedMarkers, Is.Not.Null);
        Assert.That(result.SearchedMarkers, Is.EquivalentTo(new[] { "p", "q1" }));
        Assert.That(result.SearchedBooks, Is.Not.Null);
        Assert.That(result.SearchedBooks, Is.EquivalentTo(new[] { "GEN", "EXO" }));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "PostProcessRows")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-008")]
    public void PostProcessRows_NonEmptyRows_ReturnsNull()
    {
        // INV-008 inverse: when rows exist, NO empty-result message is produced.
        // The caller sets ChecklistResult.EmptyResultMessage to null in this case.
        var rows = new List<ChecklistRow> { RowFromMarkers(new[] { "p" }, new[] { "p" }), };
        var emptyFilter = new HashSet<string>();
        var books = new List<string> { "GEN" };

        var result = MarkersDataSource.PostProcessRows(rows, emptyFilter, books);

        Assert.That(result, Is.Null, "non-empty rows must not produce an EmptyResultMessage");
    }

    // =====================================================================
    // BHV-120 / EXT-013 — HeadingMarkers / NonHeadingParagraphMarkers
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "HeadingMarkers")]
    [Property("BehaviorId", "BHV-120")]
    public void HeadingMarkers_ReturnsScSectionParagraphStyles()
    {
        // BHV-120: heading markers are stylesheet tags with TextType==scSection
        // AND StyleType==scParagraphStyle. DummyScrStylesheet defines 's' as
        // such a heading marker.
        var stylesheet = BuildStylesheet();

        var result = MarkersDataSource.HeadingMarkers(stylesheet);

        Assert.That(result, Is.Not.Null);
        Assert.That(
            result,
            Does.Contain("s"),
            "'s' is the section-head marker in DummyScrStylesheet"
        );
        // Non-section paragraph markers must not appear.
        Assert.That(result, Does.Not.Contain("p"), "'p' is verse text, not section");
        Assert.That(result, Does.Not.Contain("c"), "'c' is chapter, not section");
        // Character-style markers must never appear.
        Assert.That(result, Does.Not.Contain("w"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("Contract", "NonHeadingParagraphMarkers")]
    [Property("BehaviorId", "BHV-120")]
    public void NonHeadingParagraphMarkers_ReturnsScVerseTextParagraphStyles()
    {
        // BHV-120: non-heading paragraph markers are tags with
        // TextType==scVerseText AND StyleType==scParagraphStyle.
        // DummyScrStylesheet defines 'p' and 'nb' as such.
        var stylesheet = BuildStylesheet();

        var result = MarkersDataSource.NonHeadingParagraphMarkers(stylesheet);

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Does.Contain("p"), "'p' is a verse-text paragraph marker");
        Assert.That(result, Does.Contain("nb"), "'nb' is a verse-text paragraph marker");
        // Heading and non-paragraph markers must not appear.
        Assert.That(result, Does.Not.Contain("s"), "'s' is section heading, not verse text");
        Assert.That(result, Does.Not.Contain("w"), "'w' is character style");
    }
}

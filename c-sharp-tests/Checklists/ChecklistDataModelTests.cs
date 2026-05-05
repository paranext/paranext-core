using System.Collections.Generic;
using System.Text.Json;
using Paranext.DataProvider.Checklists;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.JsonUtils;
using SIL.Scripture;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase contract tests for CAP-001 data models.
///
/// These tests will NOT compile until the implementer creates the record types under
/// <c>Paranext.DataProvider.Checklists</c>. That is intentional: the test file IS the
/// specification — the compile error is the first layer of the RED signal; the test
/// failures are the second.
///
/// Scope: the 10 non-polymorphic records in CAP-001. The polymorphic
/// <see cref="ChecklistContentItem"/> hierarchy is exercised in
/// <c>ChecklistContentItemPolymorphismTests</c>.
///
/// Traceability:
///   - Capability: CAP-001
///   - Behaviors: BHV-110, BHV-111, BHV-112, BHV-113, BHV-119
///   - Contracts: data-contracts.md §2.1, §2.2, §2.4, §3.1, §3.2, §3.3, §3.4, §3.6, §3.8, §3.13, §3.14
///   - Invariants: INV-001, INV-004
/// </summary>
[TestFixture]
internal class ChecklistDataModelTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void SetUp()
    {
        _options = SerializationOptions.CreateSerializationOptions();
    }

    // ---------------------------------------------------------------------
    // ChecklistRequest (§2.1)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistRequest")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-110")]
    public void ChecklistRequest_ConstructWithAllFields_RoundTripsThroughJson()
    {
        var markerSettings = new MarkerSettings("p/q q1/q2", "p q");
        var range = new ScriptureRange(new VerseRef(1, 1, 0), new VerseRef(1, 1, 31));
        var request = new ChecklistRequest(
            ProjectId: "project-a",
            ComparativeTextIds: new List<string> { "compA", "compB" },
            MarkerSettings: markerSettings,
            VerseRange: range,
            HideMatches: true,
            ShowVerseText: false
        );

        var json = JsonSerializer.Serialize(request, _options);
        var actual = JsonSerializer.Deserialize<ChecklistRequest>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.ProjectId, Is.EqualTo("project-a"));
        Assert.That(actual.ComparativeTextIds, Is.EqualTo(new[] { "compA", "compB" }));
        Assert.That(actual.MarkerSettings.EquivalentMarkers, Is.EqualTo("p/q q1/q2"));
        Assert.That(actual.MarkerSettings.MarkerFilter, Is.EqualTo("p q"));
        Assert.That(actual.HideMatches, Is.True);
        Assert.That(actual.ShowVerseText, Is.False);
        Assert.That(actual.VerseRange, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistRequest")]
    public void ChecklistRequest_NullableFieldsNull_RoundTripsThroughJson()
    {
        // VerseRange is nullable per contract §2.1.
        var request = new ChecklistRequest(
            ProjectId: "p1",
            ComparativeTextIds: new List<string>(),
            MarkerSettings: new MarkerSettings("", ""),
            VerseRange: null,
            HideMatches: false,
            ShowVerseText: false
        );

        var json = JsonSerializer.Serialize(request, _options);
        var actual = JsonSerializer.Deserialize<ChecklistRequest>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.VerseRange, Is.Null);
        Assert.That(actual.ComparativeTextIds, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistRequest")]
    public void ChecklistRequest_SerializesWithCamelCasePropertyNames()
    {
        var request = new ChecklistRequest(
            ProjectId: "p1",
            ComparativeTextIds: new List<string>(),
            MarkerSettings: new MarkerSettings("", ""),
            VerseRange: null,
            HideMatches: false,
            ShowVerseText: false
        );

        var json = JsonSerializer.Serialize(request, _options);

        // camelCase is enforced by SerializationOptions; this is the cross-boundary
        // wire-shape guarantee downstream TS consumers depend on.
        Assert.That(json, Does.Contain("\"projectId\""));
        Assert.That(json, Does.Contain("\"comparativeTextIds\""));
        Assert.That(json, Does.Contain("\"markerSettings\""));
        Assert.That(json, Does.Contain("\"hideMatches\""));
        Assert.That(json, Does.Contain("\"showVerseText\""));
        Assert.That(json, Does.Not.Contain("\"ProjectId\""));
    }

    // ---------------------------------------------------------------------
    // MarkerSettings (§2.2)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "MarkerSettings")]
    public void MarkerSettings_RoundTripsThroughJson()
    {
        var settings = new MarkerSettings("p/q q1/q2", "p q mt");

        var json = JsonSerializer.Serialize(settings, _options);
        var actual = JsonSerializer.Deserialize<MarkerSettings>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.EquivalentMarkers, Is.EqualTo("p/q q1/q2"));
        Assert.That(actual.MarkerFilter, Is.EqualTo("p q mt"));
        Assert.That(json, Does.Contain("\"equivalentMarkers\""));
        Assert.That(json, Does.Contain("\"markerFilter\""));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "MarkerSettings")]
    public void MarkerSettings_EmptyStrings_SurviveRoundTrip()
    {
        // Per VAL-006: empty MarkerFilter means "all paragraph markers".
        // The record must accept and preserve empty strings without coercion.
        var settings = new MarkerSettings("", "");

        var json = JsonSerializer.Serialize(settings, _options);
        var actual = JsonSerializer.Deserialize<MarkerSettings>(json, _options);

        Assert.That(actual!.EquivalentMarkers, Is.EqualTo(""));
        Assert.That(actual.MarkerFilter, Is.EqualTo(""));
    }

    // ---------------------------------------------------------------------
    // ComparativeTextRef (§2.4)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ComparativeTextRef")]
    public void ComparativeTextRef_RoundTripsThroughJson()
    {
        var refItem = new ComparativeTextRef(
            Id: "11111111-2222-3333-4444-555555555555",
            Name: "ESV"
        );

        var json = JsonSerializer.Serialize(refItem, _options);
        var actual = JsonSerializer.Deserialize<ComparativeTextRef>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Id, Is.EqualTo("11111111-2222-3333-4444-555555555555"));
        Assert.That(actual.Name, Is.EqualTo("ESV"));
        Assert.That(json, Does.Contain("\"id\""));
        Assert.That(json, Does.Contain("\"name\""));
    }

    // ---------------------------------------------------------------------
    // ChecklistResult (§3.1)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistResult")]
    [Property("BehaviorId", "BHV-110")]
    public void ChecklistResult_ConstructEmpty_RoundTripsThroughJson()
    {
        var result = new ChecklistResult(
            Rows: new List<ChecklistRow>(),
            ColumnHeaders: new List<string> { "ProjA" },
            ColumnProjectIds: new List<string> { "project-a" },
            ExcludedCount: 0,
            HelpText: null,
            Truncated: false,
            EmptyResultMessage: null
        );

        var json = JsonSerializer.Serialize(result, _options);
        var actual = JsonSerializer.Deserialize<ChecklistResult>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Rows, Is.Empty);
        Assert.That(actual.ColumnHeaders, Is.EqualTo(new[] { "ProjA" }));
        Assert.That(actual.ColumnProjectIds, Is.EqualTo(new[] { "project-a" }));
        Assert.That(actual.ExcludedCount, Is.Zero);
        Assert.That(actual.HelpText, Is.Null);
        Assert.That(actual.Truncated, Is.False);
        Assert.That(actual.EmptyResultMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistResult")]
    public void ChecklistResult_PopulatedWithRows_RoundTripsThroughJson()
    {
        var cell = new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph>
            {
                new("p", new List<ChecklistContentItem> { new TextItem("\\p", null) }),
            },
            Reference: "GEN 1:1",
            DisplayedReference: "GEN 1:1",
            Language: "en",
            Error: null
        );
        var row = new ChecklistRow(
            Cells: new List<ChecklistCell> { cell },
            IsMatch: true,
            IncludeEditLink: false,
            Score: 1.0,
            FirstRef: "GEN 1:1"
        );
        var result = new ChecklistResult(
            Rows: new List<ChecklistRow> { row },
            ColumnHeaders: new List<string> { "ProjA" },
            ColumnProjectIds: new List<string> { "project-a" },
            ExcludedCount: 0,
            HelpText: "Markers checklist help",
            Truncated: false,
            EmptyResultMessage: null
        );

        var json = JsonSerializer.Serialize(result, _options);
        var actual = JsonSerializer.Deserialize<ChecklistResult>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Rows, Has.Count.EqualTo(1));
        Assert.That(actual.Rows[0].Cells, Has.Count.EqualTo(1));
        Assert.That(actual.Rows[0].FirstRef, Is.EqualTo("GEN 1:1"));
        Assert.That(actual.HelpText, Is.EqualTo("Markers checklist help"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistResult")]
    public void ChecklistResult_SerializesWithCamelCasePropertyNames()
    {
        var result = new ChecklistResult(
            Rows: new List<ChecklistRow>(),
            ColumnHeaders: new List<string>(),
            ColumnProjectIds: new List<string>(),
            ExcludedCount: 7,
            HelpText: "h",
            Truncated: true,
            EmptyResultMessage: null
        );

        var json = JsonSerializer.Serialize(result, _options);

        Assert.That(json, Does.Contain("\"rows\""));
        Assert.That(json, Does.Contain("\"columnHeaders\""));
        Assert.That(json, Does.Contain("\"columnProjectIds\""));
        Assert.That(json, Does.Contain("\"excludedCount\""));
        Assert.That(json, Does.Contain("\"helpText\""));
        Assert.That(json, Does.Contain("\"truncated\""));
    }

    // ---------------------------------------------------------------------
    // ChecklistRow (§3.2)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistRow")]
    [Property("BehaviorId", "BHV-111")]
    public void ChecklistRow_ConstructAndRoundTrip()
    {
        var row = new ChecklistRow(
            Cells: new List<ChecklistCell>(),
            IsMatch: false,
            IncludeEditLink: true,
            Score: 3.14,
            FirstRef: "EXO 20:1"
        );

        var json = JsonSerializer.Serialize(row, _options);
        var actual = JsonSerializer.Deserialize<ChecklistRow>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.IsMatch, Is.False);
        Assert.That(actual.IncludeEditLink, Is.True);
        Assert.That(actual.Score, Is.EqualTo(3.14));
        Assert.That(actual.FirstRef, Is.EqualTo("EXO 20:1"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistRow")]
    public void ChecklistRow_FirstRefNull_SurvivesRoundTrip()
    {
        // FirstRef is nullable per §3.2 (lazy-computed; may be null if no cells have refs).
        var row = new ChecklistRow(
            Cells: new List<ChecklistCell>(),
            IsMatch: true,
            IncludeEditLink: false,
            Score: 0,
            FirstRef: null
        );

        var json = JsonSerializer.Serialize(row, _options);
        var actual = JsonSerializer.Deserialize<ChecklistRow>(json, _options);

        Assert.That(actual!.FirstRef, Is.Null);
    }

    // ---------------------------------------------------------------------
    // ChecklistCell (§3.3)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistCell")]
    [Property("BehaviorId", "BHV-112")]
    public void ChecklistCell_ConstructAndRoundTrip()
    {
        var cell = new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph>
            {
                new("p", new List<ChecklistContentItem> { new TextItem("\\p", null) }),
            },
            Reference: "GEN 1:1",
            DisplayedReference: "GEN 1:1",
            Language: "en",
            Error: null
        );

        var json = JsonSerializer.Serialize(cell, _options);
        var actual = JsonSerializer.Deserialize<ChecklistCell>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Reference, Is.EqualTo("GEN 1:1"));
        Assert.That(actual.DisplayedReference, Is.EqualTo("GEN 1:1"));
        Assert.That(actual.Language, Is.EqualTo("en"));
        Assert.That(actual.Paragraphs, Has.Count.EqualTo(1));
        Assert.That(actual.Error, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistCell")]
    public void ChecklistCell_EmptyParagraphs_RepresentsMissingVerse()
    {
        // Per §3.3 validation: "Paragraphs may be empty for columns where the verse
        // does not exist (missing verse = empty cell, INV-001)"
        var cell = new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph>(),
            Reference: "GEN 99:99",
            DisplayedReference: "GEN 99:99",
            Language: "en",
            Error: null
        );

        var json = JsonSerializer.Serialize(cell, _options);
        var actual = JsonSerializer.Deserialize<ChecklistCell>(json, _options);

        Assert.That(actual!.Paragraphs, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistCell")]
    public void ChecklistCell_ErrorFieldPopulated_SurvivesRoundTrip()
    {
        var cell = new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph>(),
            Reference: "GEN 1:1",
            DisplayedReference: "GEN 1:1",
            Language: "en",
            Error: "Unreadable verse"
        );

        var json = JsonSerializer.Serialize(cell, _options);
        var actual = JsonSerializer.Deserialize<ChecklistCell>(json, _options);

        Assert.That(actual!.Error, Is.EqualTo("Unreadable verse"));
    }

    // ---------------------------------------------------------------------
    // ChecklistParagraph (§3.4)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistParagraph")]
    [Property("BehaviorId", "BHV-113")]
    public void ChecklistParagraph_ConstructAndRoundTrip()
    {
        var para = new ChecklistParagraph(
            Marker: "q1",
            Items: new List<ChecklistContentItem>
            {
                new TextItem("\\q1", null),
                new VerseItem("2"),
                new TextItem("poetry line", null),
            }
        );

        var json = JsonSerializer.Serialize(para, _options);
        var actual = JsonSerializer.Deserialize<ChecklistParagraph>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Marker, Is.EqualTo("q1"));
        Assert.That(actual.Items, Has.Count.EqualTo(3));
    }

    // ---------------------------------------------------------------------
    // EmptyResultMessage (§3.8)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "EmptyResultMessage")]
    public void EmptyResultMessage_IdenticalVariant_RoundTrips()
    {
        var msg = new EmptyResultMessage(
            Variant: "identical",
            Message: "Comparative texts have identical markers.",
            SearchedMarkers: null,
            SearchedBooks: null
        );

        var json = JsonSerializer.Serialize(msg, _options);
        var actual = JsonSerializer.Deserialize<EmptyResultMessage>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Variant, Is.EqualTo("identical"));
        Assert.That(actual.Message, Does.Contain("identical markers"));
        Assert.That(actual.SearchedMarkers, Is.Null);
        Assert.That(actual.SearchedBooks, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "EmptyResultMessage")]
    public void EmptyResultMessage_NoResultsVariant_RoundTrips()
    {
        var msg = new EmptyResultMessage(
            Variant: "noResults",
            Message: "No rows found for the selected markers",
            SearchedMarkers: new List<string> { "p", "q" },
            SearchedBooks: new List<string> { "GEN", "EXO" }
        );

        var json = JsonSerializer.Serialize(msg, _options);
        var actual = JsonSerializer.Deserialize<EmptyResultMessage>(json, _options);

        Assert.That(actual!.Variant, Is.EqualTo("noResults"));
        Assert.That(actual.SearchedMarkers, Is.EqualTo(new[] { "p", "q" }));
        Assert.That(actual.SearchedBooks, Is.EqualTo(new[] { "GEN", "EXO" }));
    }

    // ---------------------------------------------------------------------
    // ChecklistResultError + ChecklistErrorCodes (§3.1 / §3.6)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("Contract", "ChecklistResultError")]
    public void ChecklistResultError_RoundTripsThroughJson()
    {
        var err = new ChecklistResultError(
            Code: ChecklistErrorCodes.ProjectNotFound,
            Message: "Project xyz does not exist"
        );

        var json = JsonSerializer.Serialize(err, _options);
        var actual = JsonSerializer.Deserialize<ChecklistResultError>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Code, Is.EqualTo("PROJECT_NOT_FOUND"));
        Assert.That(actual.Message, Is.EqualTo("Project xyz does not exist"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistErrorCodes")]
    public void ChecklistErrorCodes_AllCodesMatchContract()
    {
        // These exact string values are the wire contract. See data-contracts.md §3.6.
        Assert.That(ChecklistErrorCodes.ProjectNotFound, Is.EqualTo("PROJECT_NOT_FOUND"));
        Assert.That(ChecklistErrorCodes.InvalidState, Is.EqualTo("INVALID_STATE"));
        Assert.That(ChecklistErrorCodes.InvalidChecklistType, Is.EqualTo("INVALID_CHECKLIST_TYPE"));
        Assert.That(ChecklistErrorCodes.InvalidVerseRange, Is.EqualTo("INVALID_VERSE_RANGE"));
        Assert.That(
            ChecklistErrorCodes.InvalidMarkerSettings,
            Is.EqualTo("INVALID_MARKER_SETTINGS")
        );
        Assert.That(ChecklistErrorCodes.MaxRowsExceeded, Is.EqualTo("MAX_ROWS_EXCEEDED"));
        Assert.That(ChecklistErrorCodes.Cancelled, Is.EqualTo("CANCELLED"));
    }

    // ---------------------------------------------------------------------
    // MarkerSettingsValidationResult + MarkerPair (§3.13 + §3.14)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "MarkerSettingsValidationResult")]
    public void MarkerSettingsValidationResult_ValidCase_RoundTrips()
    {
        var result = new MarkerSettingsValidationResult(
            Valid: true,
            ParsedPairs: new List<MarkerPair> { new("p", "q"), new("q1", "q2") },
            ErrorMessage: null
        );

        var json = JsonSerializer.Serialize(result, _options);
        var actual = JsonSerializer.Deserialize<MarkerSettingsValidationResult>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Valid, Is.True);
        Assert.That(actual.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(actual.ParsedPairs![0].Marker1, Is.EqualTo("p"));
        Assert.That(actual.ParsedPairs[0].Marker2, Is.EqualTo("q"));
        Assert.That(actual.ErrorMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "MarkerSettingsValidationResult")]
    public void MarkerSettingsValidationResult_InvalidCase_RoundTrips()
    {
        var result = new MarkerSettingsValidationResult(
            Valid: false,
            ParsedPairs: null,
            ErrorMessage: "Invalid pair: expected single '/'"
        );

        var json = JsonSerializer.Serialize(result, _options);
        var actual = JsonSerializer.Deserialize<MarkerSettingsValidationResult>(json, _options);

        Assert.That(actual!.Valid, Is.False);
        Assert.That(actual.ParsedPairs, Is.Null);
        Assert.That(actual.ErrorMessage, Does.Contain("Invalid pair"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "MarkerPair")]
    public void MarkerPair_RoundTripsWithCamelCaseFields()
    {
        var pair = new MarkerPair("p", "q");

        var json = JsonSerializer.Serialize(pair, _options);
        var actual = JsonSerializer.Deserialize<MarkerPair>(json, _options);

        Assert.That(actual!.Marker1, Is.EqualTo("p"));
        Assert.That(actual.Marker2, Is.EqualTo("q"));
        Assert.That(json, Does.Contain("\"marker1\""));
        Assert.That(json, Does.Contain("\"marker2\""));
    }

    // ---------------------------------------------------------------------
    // Record equality (positional records → value equality)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "MarkerSettings")]
    public void MarkerSettings_EqualityIsValueBased()
    {
        // Positional records give us value equality for free. This test codifies the
        // expectation: the implementer must NOT override it with reference equality.
        var a = new MarkerSettings("p/q", "p q");
        var b = new MarkerSettings("p/q", "p q");
        var c = new MarkerSettings("p/q", "different");

        Assert.That(a, Is.EqualTo(b));
        Assert.That(a, Is.Not.EqualTo(c));
        Assert.That(a.GetHashCode(), Is.EqualTo(b.GetHashCode()));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ComparativeTextRef")]
    public void ComparativeTextRef_WithExpressionProducesNewInstance()
    {
        // `with` is the canonical way to "update" a positional record.
        // This test confirms the record supports non-destructive mutation.
        var original = new ComparativeTextRef("guid-1", "Old Name");
        var updated = original with { Name = "New Name" };

        Assert.That(original.Name, Is.EqualTo("Old Name"));
        Assert.That(updated.Name, Is.EqualTo("New Name"));
        Assert.That(updated.Id, Is.EqualTo("guid-1"));
        Assert.That(original, Is.Not.EqualTo(updated));
    }

    // ---------------------------------------------------------------------
    // Invariant tests
    // ---------------------------------------------------------------------

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-001")]
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(5)]
    public void Inv001_ResultShape_RowCellCountMatchesColumnCount(int columnCount)
    {
        // INV-001: "Every row in the checklist has exactly N cells where N is the
        // number of columns." The records themselves must be able to REPRESENT this
        // invariant cleanly (i.e., neither construct nor serialize destroys it).
        var headers = new List<string>();
        var projectIds = new List<string>();
        for (int i = 0; i < columnCount; i++)
        {
            headers.Add($"Proj{i}");
            projectIds.Add($"project-{i}");
        }
        var cells = new List<ChecklistCell>();
        for (int i = 0; i < columnCount; i++)
        {
            cells.Add(
                new ChecklistCell(new List<ChecklistParagraph>(), "GEN 1:1", "GEN 1:1", "en", null)
            );
        }
        var row = new ChecklistRow(cells, true, false, 0, "GEN 1:1");
        var result = new ChecklistResult(
            Rows: new List<ChecklistRow> { row },
            ColumnHeaders: headers,
            ColumnProjectIds: projectIds,
            ExcludedCount: 0,
            HelpText: null,
            Truncated: false,
            EmptyResultMessage: null
        );

        var json = JsonSerializer.Serialize(result, _options);
        var actual = JsonSerializer.Deserialize<ChecklistResult>(json, _options);

        // Shape-level INV-001: after round-trip, the cell count still matches the
        // column count. (Enforcement of the invariant is a downstream responsibility;
        // the record only needs to preserve the shape.)
        Assert.That(actual!.Rows[0].Cells.Count, Is.EqualTo(actual.ColumnHeaders.Count));
        Assert.That(actual.Rows[0].Cells.Count, Is.EqualTo(columnCount));
    }

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-004")]
    [TestCase("p")]
    [TestCase("q1")]
    [TestCase("mt")]
    [TestCase("li2")]
    public void Inv004_ParagraphMarker_StoredWithoutBackslashPrefix(string marker)
    {
        // INV-004: "Every paragraph cell in the markers checklist always starts with
        // the backslash-prefixed marker name (e.g., \p, \q1)" — but per §3.4
        // validation rules, the Marker field STORES the marker without the backslash;
        // the DISPLAY layer prepends it. This invariant test pins the storage form.
        var para = new ChecklistParagraph(Marker: marker, Items: new List<ChecklistContentItem>());

        Assert.That(para.Marker, Is.EqualTo(marker));
        Assert.That(para.Marker, Does.Not.StartWith("\\"));
    }
}

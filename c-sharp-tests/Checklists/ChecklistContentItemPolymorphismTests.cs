using System.Collections.Generic;
using System.Text.Json;
using Paranext.DataProvider.Checklists;
using Paranext.DataProvider.JsonUtils;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// BE-1 EARLY VERIFICATION tests for the <see cref="ChecklistContentItem"/> polymorphic
/// hierarchy.
///
/// <para>
/// Strategic plan (CAP-001, "Early Verification Step (BE-1)"): "verify
/// <c>[JsonDerivedType]</c> polymorphic serialization end-to-end: write a C# round-trip
/// test that serializes a list containing one of each of the 6 <c>ChecklistContentItem</c>
/// subtypes via <c>SerializationOptions.CreateSerializationOptions()</c>, then deserializes
/// back and asserts subtype identity and field preservation. If the round-trip fails, fall
/// back to an explicit type-discriminator DTO."
/// </para>
///
/// <para>
/// If the tests in this file fail with a System.Text.Json polymorphism error (e.g.,
/// "Runtime type 'TextItem' is not supported by polymorphic type 'ChecklistContentItem'"),
/// that is the trigger for the fallback described in the strategic plan — do NOT try to
/// hack around it in the implementation; escalate to the orchestrator so downstream
/// capabilities plan against the fallback shape before BE-2 starts.
/// </para>
///
/// Traceability:
///   - Capability: CAP-001
///   - Acceptance: gm-001 shape representation
///   - Behaviors: BHV-113 (CLParagraph and Content Types)
///   - Contract: data-contracts.md §3.5 (ChecklistContentItem)
/// </summary>
[TestFixture]
internal class ChecklistContentItemPolymorphismTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void SetUp()
    {
        _options = SerializationOptions.CreateSerializationOptions();
    }

    // ---------------------------------------------------------------------
    // Per-subtype construction (compile-time gate: all 6 subtypes must exist)
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.TextItem")]
    public void TextItem_CanBeConstructedAndAssignedToBase()
    {
        ChecklistContentItem item = new TextItem("hello", "wj");

        Assert.That(item, Is.TypeOf<TextItem>());
        var text = (TextItem)item;
        Assert.That(text.Text, Is.EqualTo("hello"));
        Assert.That(text.CharacterStyle, Is.EqualTo("wj"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.VerseItem")]
    public void VerseItem_CanBeConstructedAndAssignedToBase()
    {
        ChecklistContentItem item = new VerseItem("24-38");

        Assert.That(item, Is.TypeOf<VerseItem>());
        Assert.That(((VerseItem)item).VerseNumber, Is.EqualTo("24-38"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.EditLinkItem")]
    public void EditLinkItem_CanBeConstructedAndAssignedToBase()
    {
        ChecklistContentItem item = new EditLinkItem(40, 1, 1);

        Assert.That(item, Is.TypeOf<EditLinkItem>());
        var link = (EditLinkItem)item;
        Assert.That(link.BookNum, Is.EqualTo(40));
        Assert.That(link.ChapterNum, Is.EqualTo(1));
        Assert.That(link.VerseNum, Is.EqualTo(1));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.LinkItem")]
    public void LinkItem_CanBeConstructedAndAssignedToBase()
    {
        ChecklistContentItem item = new LinkItem("MAT 1:1", "Matthew 1:1");

        Assert.That(item, Is.TypeOf<LinkItem>());
        var link = (LinkItem)item;
        Assert.That(link.Reference, Is.EqualTo("MAT 1:1"));
        Assert.That(link.DisplayText, Is.EqualTo("Matthew 1:1"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.ErrorItem")]
    public void ErrorItem_CanBeConstructedAndAssignedToBase()
    {
        ChecklistContentItem item = new ErrorItem("parse failure");

        Assert.That(item, Is.TypeOf<ErrorItem>());
        Assert.That(((ErrorItem)item).Message, Is.EqualTo("parse failure"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.MessageItem")]
    public void MessageItem_CanBeConstructedAndAssignedToBase()
    {
        ChecklistContentItem item = new MessageItem("No rows found");

        Assert.That(item, Is.TypeOf<MessageItem>());
        Assert.That(((MessageItem)item).Message, Is.EqualTo("No rows found"));
    }

    // ---------------------------------------------------------------------
    // Per-subtype JSON round-trip via the abstract base type
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.TextItem")]
    public void TextItem_SerializedAsBase_RoundTripsPreservingSubtypeAndFields()
    {
        ChecklistContentItem item = new TextItem("\\p", null);

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        Assert.That(actual, Is.TypeOf<TextItem>(), "subtype identity lost after deserialize");
        var text = (TextItem)actual!;
        Assert.That(text.Text, Is.EqualTo("\\p"));
        Assert.That(text.CharacterStyle, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.VerseItem")]
    public void VerseItem_SerializedAsBase_RoundTripsPreservingSubtypeAndFields()
    {
        ChecklistContentItem item = new VerseItem("7");

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        Assert.That(actual, Is.TypeOf<VerseItem>());
        Assert.That(((VerseItem)actual!).VerseNumber, Is.EqualTo("7"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.EditLinkItem")]
    public void EditLinkItem_SerializedAsBase_RoundTripsPreservingSubtypeAndFields()
    {
        ChecklistContentItem item = new EditLinkItem(40, 28, 20);

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        Assert.That(actual, Is.TypeOf<EditLinkItem>());
        var link = (EditLinkItem)actual!;
        Assert.That(link.BookNum, Is.EqualTo(40));
        Assert.That(link.ChapterNum, Is.EqualTo(28));
        Assert.That(link.VerseNum, Is.EqualTo(20));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.LinkItem")]
    public void LinkItem_SerializedAsBase_RoundTripsPreservingSubtypeAndFields()
    {
        ChecklistContentItem item = new LinkItem("REV 22:21", "Rev 22:21");

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        Assert.That(actual, Is.TypeOf<LinkItem>());
        var link = (LinkItem)actual!;
        Assert.That(link.Reference, Is.EqualTo("REV 22:21"));
        Assert.That(link.DisplayText, Is.EqualTo("Rev 22:21"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.ErrorItem")]
    public void ErrorItem_SerializedAsBase_RoundTripsPreservingSubtypeAndFields()
    {
        ChecklistContentItem item = new ErrorItem("could not read verse");

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        Assert.That(actual, Is.TypeOf<ErrorItem>());
        Assert.That(((ErrorItem)actual!).Message, Is.EqualTo("could not read verse"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.MessageItem")]
    public void MessageItem_SerializedAsBase_RoundTripsPreservingSubtypeAndFields()
    {
        ChecklistContentItem item = new MessageItem("Comparative texts have identical markers.");

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        Assert.That(actual, Is.TypeOf<MessageItem>());
        Assert.That(((MessageItem)actual!).Message, Does.Contain("identical markers"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem.TextItem")]
    public void TextItem_WithCharacterStylePopulated_PreservesField()
    {
        // Per §3.5 validation: TextItem.CharacterStyle is non-null when text is within
        // a character style span. This exercises the non-null variant.
        ChecklistContentItem item = new TextItem("Jesus wept.", "wj");

        var json = JsonSerializer.Serialize(item, _options);
        var actual = JsonSerializer.Deserialize<ChecklistContentItem>(json, _options);

        var text = (TextItem)actual!;
        Assert.That(text.CharacterStyle, Is.EqualTo("wj"));
    }

    // ---------------------------------------------------------------------
    // The BE-1 flagship test: a list of ALL 6 subtypes round-trips as a list.
    // This is the specific test called out in the strategic plan.
    // ---------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem")]
    [Property("BehaviorId", "BHV-113")]
    public void PolymorphicList_OneOfEachSubtype_RoundTripsPreservingAllSubtypeIdentities()
    {
        // This IS the explicit BE-1 early-verification test (strategic-plan-backend.md
        // CAP-001, "Early Verification Step (BE-1)"). If this fails, the strategic plan
        // says to escalate and consider falling back to an explicit discriminator DTO.
        var items = new List<ChecklistContentItem>
        {
            new TextItem("\\p", null),
            new VerseItem("1"),
            new EditLinkItem(1, 1, 1),
            new LinkItem("GEN 1:1", "Gen 1:1"),
            new ErrorItem("cell error"),
            new MessageItem("empty result"),
        };

        var json = JsonSerializer.Serialize(items, _options);
        var actual = JsonSerializer.Deserialize<List<ChecklistContentItem>>(json, _options);

        Assert.That(actual, Is.Not.Null);
        Assert.That(actual, Has.Count.EqualTo(6));
        Assert.That(actual![0], Is.TypeOf<TextItem>(), "index 0 should deserialize as TextItem");
        Assert.That(actual[1], Is.TypeOf<VerseItem>(), "index 1 should deserialize as VerseItem");
        Assert.That(
            actual[2],
            Is.TypeOf<EditLinkItem>(),
            "index 2 should deserialize as EditLinkItem"
        );
        Assert.That(actual[3], Is.TypeOf<LinkItem>(), "index 3 should deserialize as LinkItem");
        Assert.That(actual[4], Is.TypeOf<ErrorItem>(), "index 4 should deserialize as ErrorItem");
        Assert.That(
            actual[5],
            Is.TypeOf<MessageItem>(),
            "index 5 should deserialize as MessageItem"
        );

        // Field preservation across every subtype in the mixed list.
        Assert.That(((TextItem)actual[0]).Text, Is.EqualTo("\\p"));
        Assert.That(((VerseItem)actual[1]).VerseNumber, Is.EqualTo("1"));
        var link = (EditLinkItem)actual[2];
        Assert.That(link.BookNum, Is.EqualTo(1));
        Assert.That(link.ChapterNum, Is.EqualTo(1));
        Assert.That(link.VerseNum, Is.EqualTo(1));
        Assert.That(((LinkItem)actual[3]).Reference, Is.EqualTo("GEN 1:1"));
        Assert.That(((LinkItem)actual[3]).DisplayText, Is.EqualTo("Gen 1:1"));
        Assert.That(((ErrorItem)actual[4]).Message, Is.EqualTo("cell error"));
        Assert.That(((MessageItem)actual[5]).Message, Is.EqualTo("empty result"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("Contract", "ChecklistContentItem")]
    public void PolymorphicList_ContainsRepeatedSubtypes_EachDeserializedCorrectly()
    {
        // gm-001 row shape: one paragraph's items contain multiple TextItems interleaved
        // with VerseItems. The polymorphic serializer must handle repeated subtypes.
        var items = new List<ChecklistContentItem>
        {
            new TextItem("\\p", null),
            new VerseItem("1"),
            new TextItem("one. ", null),
            new VerseItem("2"),
            new TextItem("two, ", null),
        };

        var json = JsonSerializer.Serialize(items, _options);
        var actual = JsonSerializer.Deserialize<List<ChecklistContentItem>>(json, _options);

        Assert.That(actual, Has.Count.EqualTo(5));
        Assert.That(actual![0], Is.TypeOf<TextItem>());
        Assert.That(actual[1], Is.TypeOf<VerseItem>());
        Assert.That(actual[2], Is.TypeOf<TextItem>());
        Assert.That(actual[3], Is.TypeOf<VerseItem>());
        Assert.That(actual[4], Is.TypeOf<TextItem>());
        Assert.That(((TextItem)actual[2]).Text, Is.EqualTo("one. "));
        Assert.That(((VerseItem)actual[3]).VerseNumber, Is.EqualTo("2"));
    }

    // ---------------------------------------------------------------------
    // Acceptance test — gm-001 shape representability
    //
    // CAP-001 is pure data models. The *production* of gm-001 output is the job of
    // CAP-002 through CAP-006. At this layer we only assert that the contracts CAN
    // carry gm-001's structure through a full JSON round-trip without shape loss.
    // When this test passes (together with the polymorphic-list test above), CAP-001
    // is structurally complete.
    // ---------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-110")]
    public void Acceptance_Gm001RowShape_CanBeRepresentedByRecordsAndRoundTripsThroughJson()
    {
        // Shape lifted from:
        // .context/features/markers-checklist/golden-masters/gm-001-single-project-markers/
        //   expected-output.json
        // First row: EXO 20:1, single cell, paragraph \p with items:
        //   CLText("\\p"), CLVerse("1"), CLText("one. "), CLVerse("2"), CLText("two, ")
        //
        // In the PT10 shape, these become: TextItem/VerseItem/TextItem/VerseItem/TextItem
        // inside a ChecklistParagraph(marker="p"), inside a ChecklistCell, inside a
        // ChecklistRow, inside a ChecklistResult.
        var paragraph = new ChecklistParagraph(
            Marker: "p",
            Items: new List<ChecklistContentItem>
            {
                new TextItem("\\p", null),
                new VerseItem("1"),
                new TextItem("one. ", null),
                new VerseItem("2"),
                new TextItem("two, ", null),
            }
        );
        var cell = new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph> { paragraph },
            Reference: "EXO 20:1",
            DisplayedReference: "EXO 20:1",
            Language: "en",
            Error: null
        );
        var row = new ChecklistRow(
            Cells: new List<ChecklistCell> { cell },
            IsMatch: true,
            IncludeEditLink: false,
            Score: 0,
            FirstRef: "EXO 20:1"
        );
        var result = new ChecklistResult(
            Rows: new List<ChecklistRow> { row },
            ColumnHeaders: new List<string> { "TSTGM001" },
            ColumnProjectIds: new List<string> { "project-tstgm001" },
            ExcludedCount: 0,
            HelpText: null,
            Truncated: false,
            EmptyResultMessage: null
        );

        var json = JsonSerializer.Serialize(result, _options);
        var actual = JsonSerializer.Deserialize<ChecklistResult>(json, _options);

        // Round-trip preserves the full nested shape.
        Assert.That(actual, Is.Not.Null);
        Assert.That(actual!.Rows, Has.Count.EqualTo(1));
        var actualRow = actual.Rows[0];
        Assert.That(actualRow.IsMatch, Is.True, "single-column => IsMatch=true (INV-002)");
        Assert.That(actualRow.Cells, Has.Count.EqualTo(1));
        var actualCell = actualRow.Cells[0];
        Assert.That(actualCell.Reference, Is.EqualTo("EXO 20:1"));
        Assert.That(actualCell.Paragraphs, Has.Count.EqualTo(1));
        var actualPara = actualCell.Paragraphs[0];
        Assert.That(actualPara.Marker, Is.EqualTo("p"));
        Assert.That(
            actualPara.Marker,
            Does.Not.StartWith("\\"),
            "INV-004: marker stored without backslash"
        );
        Assert.That(actualPara.Items, Has.Count.EqualTo(5));
        Assert.That(actualPara.Items[0], Is.TypeOf<TextItem>());
        Assert.That(((TextItem)actualPara.Items[0]).Text, Is.EqualTo("\\p"));
        Assert.That(actualPara.Items[1], Is.TypeOf<VerseItem>());
        Assert.That(((VerseItem)actualPara.Items[1]).VerseNumber, Is.EqualTo("1"));
        Assert.That(actualPara.Items[2], Is.TypeOf<TextItem>());
        Assert.That(((TextItem)actualPara.Items[2]).Text, Is.EqualTo("one. "));
        Assert.That(actualPara.Items[3], Is.TypeOf<VerseItem>());
        Assert.That(((VerseItem)actualPara.Items[3]).VerseNumber, Is.EqualTo("2"));
        Assert.That(actualPara.Items[4], Is.TypeOf<TextItem>());
        Assert.That(((TextItem)actualPara.Items[4]).Text, Is.EqualTo("two, "));
    }
}

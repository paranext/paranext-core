using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Deserialization DTOs for the punctuation golden-master <c>expected-output.json</c> files that
/// back the <see cref="CLDataSource"/> stub. These map 1:1 onto the captured PT9 output shape and
/// are translated into the live CL* model by <see cref="GoldenMasterStore"/>.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
internal sealed record GoldenExpectedOutput(
    [property: JsonPropertyName("scenario")] string? Scenario,
    [property: JsonPropertyName("output")] GoldenOutput? Output
);

internal sealed record GoldenOutput(
    [property: JsonPropertyName("rowCount")] int RowCount,
    [property: JsonPropertyName("excludedCount")] int ExcludedCount,
    [property: JsonPropertyName("rows")] List<GoldenRow>? Rows
);

internal sealed record GoldenRow(
    [property: JsonPropertyName("index")] int Index,
    [property: JsonPropertyName("isMatch")] bool IsMatch,
    [property: JsonPropertyName("cells")] List<GoldenCell>? Cells
);

internal sealed record GoldenCell(
    [property: JsonPropertyName("reference")] string? Reference,
    [property: JsonPropertyName("scrTextName")] string? ScrTextName,
    [property: JsonPropertyName("language")] string? Language,
    [property: JsonPropertyName("punctuationSequence")] string? PunctuationSequence,
    [property: JsonPropertyName("paragraphs")] List<GoldenParagraph>? Paragraphs
);

internal sealed record GoldenParagraph(
    [property: JsonPropertyName("marker")] string? Marker,
    [property: JsonPropertyName("items")] List<GoldenItem>? Items
);

internal sealed record GoldenItem(
    [property: JsonPropertyName("type")] string? Type,
    [property: JsonPropertyName("marker")] string? Marker,
    [property: JsonPropertyName("text")] string? Text,
    [property: JsonPropertyName("scrTextName")] string? ScrTextName,
    [property: JsonPropertyName("book")] string? Book,
    [property: JsonPropertyName("chapter")] string? Chapter,
    [property: JsonPropertyName("verse")] string? Verse,
    [property: JsonPropertyName("showInDisplay")] bool ShowInDisplay,
    [property: JsonPropertyName("reference")] string? Reference,
    [property: JsonPropertyName("linkText")] string? LinkText,
    [property: JsonPropertyName("editLinkText")] string? EditLinkText
);

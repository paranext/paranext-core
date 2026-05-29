namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.SubsystemInterfaces.ChecklistType</c> enum.
/// Member order (and therefore the underlying integer values) is kept identical to PT9
/// so the relocated package can be swapped in by changing the <c>using</c> only.
/// <c>Punctuation</c> is value 11.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public enum ChecklistType
{
    Verses,
    SectionHeadings,
    BookTitles,
    Footnotes,
    CrossReferences,
    Markers,
    RelativelyLongVerses,
    RelativelyShortVerses,
    LongSentences,
    LongParagraphs,
    QuotationDifferences,
    Punctuation,
    WordsPhrases,
}

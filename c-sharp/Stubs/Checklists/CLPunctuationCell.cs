using SIL.Scripture;

namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLPunctuationCell</c> (the cell subclass produced by
/// the punctuation data source). Adds the <see cref="PunctuationSequence"/> comparison key on top of
/// <see cref="CLCell"/>.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
///
/// Shape note: in PT9, <c>PunctuationSequence</c> has a private setter. To allow the golden-master
/// replay layer (in this same stub namespace) to populate it, the stub uses an internal setter.
/// Consumers reading the property are unaffected by this widening.
/// </remarks>
public class CLPunctuationCell : CLCell
{
    public CLPunctuationCell() { }

    public CLPunctuationCell(
        VerseRef vref,
        string scrTextName,
        string language,
        string punctuationSequence
    )
        : base(vref, scrTextName, language)
    {
        PunctuationSequence = punctuationSequence;
    }

    /// <summary>
    /// The ordered sequence of qualifying punctuation characters in the cell's text. This is the
    /// comparison key PT9 uses to decide whether cells across projects match. Source order is
    /// preserved (it is NOT sorted).
    /// </summary>
    public string? PunctuationSequence { get; internal set; }
}

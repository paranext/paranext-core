using Paratext.Data;

namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLData</c>: all the data to display a checklist
/// (a table where each column comes from a separate project, each row a Scripture reference).
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLData
{
    private static readonly HashSet<ChecklistType> s_checkListsWithoutDifferences =
    [
        ChecklistType.RelativelyLongVerses,
        ChecklistType.RelativelyShortVerses,
        ChecklistType.LongSentences,
        ChecklistType.LongParagraphs,
        ChecklistType.Verses,
    ];

    public string? Title;

    public int ExcludedCount;

    public List<ScrText> ScrTexts = [];

    public List<string> ScrTextNames = [];

    public List<CLRow> Rows = [];

    public ChecklistType CheckListType { get; private set; }

    public bool NoDifferenceHighlighting => s_checkListsWithoutDifferences.Contains(CheckListType);

    public CLData() { }

    public CLData(ChecklistType checklistType, IEnumerable<ScrText> scrTexts, string title)
    {
        ScrTexts = scrTexts.ToList();
        ScrTextNames = ScrTexts.Select(scr => scr.Name).ToList();
        CheckListType = checklistType;
        Title = title;
    }
}

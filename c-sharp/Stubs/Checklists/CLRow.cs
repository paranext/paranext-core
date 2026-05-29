namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLRow</c>: a single row of a checklist, holding one
/// cell per project.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLRow
{
    public List<CLCell> Cells = [];

    /// <summary>Score used to sort by length (unused by the punctuation flow).</summary>
    public float Score;

    /// <summary>
    /// True when the row's cells are considered equal across projects (no orange highlighting).
    /// </summary>
    public bool IsMatch;
}

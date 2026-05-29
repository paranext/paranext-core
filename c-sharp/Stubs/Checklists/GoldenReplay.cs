namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// The result of matching BuildRows inputs to a golden-master scenario: the replayed rows and the
/// excluded-row count, ready to be assigned onto a <see cref="CLData"/>.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
internal sealed record GoldenReplay(string ScenarioId, List<CLRow> Rows, int ExcludedCount);

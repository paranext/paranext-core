using SIL.Scripture;

namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Golden-master-backed stub mirror of PT9's <c>Paratext.Checklists.CLDataSource</c> static entry
/// point. Instead of computing checklist rows from project USFM (which lives in the not-yet-relocated
/// PT9 checklist data logic), it replays captured golden-master output so PT10 can be written against
/// the future relocated API now.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
///
/// The public <see cref="BuildRows"/> signature is identical to PT9's so consumers swap to the real
/// package by changing the <c>using</c> only. Matching is done via
/// <see cref="GoldenMasterStore"/>: the scenario id embedded in the first project's <c>ScrText.Name</c>
/// selects which captured fixture to replay. Inputs that match no scenario return <c>true</c> with
/// empty <see cref="CLData.Rows"/> — the stub never throws.
/// </remarks>
public static class CLDataSource
{
    /// <summary>
    /// Stub mirror of PT9's <c>CLDataSource.BuildRows</c>. Populates <paramref name="checklist"/>'s
    /// <see cref="CLData.Rows"/> and <see cref="CLData.ExcludedCount"/> from the matched golden-master
    /// scenario.
    /// </summary>
    /// <returns>
    /// <c>true</c> on success (always, in the stub — including the no-match empty-rows case), matching
    /// PT9's normal return.
    /// </returns>
    public static bool BuildRows(
        CLData checklist,
        VerseRef firstVerseRef,
        VerseRef lastVerseRef,
        Dictionary<string, string> initializationValueMap,
        bool showReferencedVerseText,
        bool hideMatches
    )
    {
        ArgumentNullException.ThrowIfNull(checklist);

        // Reset to a clean state, mirroring PT9 which overwrites Rows/ExcludedCount each call.
        checklist.Rows = [];
        checklist.ExcludedCount = 0;

        var mainScrText = checklist.ScrTexts.FirstOrDefault();
        if (mainScrText == null)
            return true;

        var versification =
            mainScrText.Settings?.Versification
            ?? (firstVerseRef.IsDefault ? ScrVers.English : firstVerseRef.Versification);

        var replay = GoldenMasterStore.TryGetReplayForScrTextName(mainScrText.Name, versification);
        if (replay == null)
            // No golden scenario matched these inputs: return success with empty rows (never throw).
            return true;

        checklist.Rows = replay.Rows;
        checklist.ExcludedCount = replay.ExcludedCount;
        return true;
    }
}

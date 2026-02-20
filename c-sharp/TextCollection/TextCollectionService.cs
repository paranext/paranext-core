// === PORTED FROM PT9 ===
// Source: PT9/Paratext/TextCollectionForm.cs:364-380
// Method: TextCollectionForm.SetTexts (filtering predicate)
// Maps to: EXT-003, BHV-T006, VAL-009

using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Stateless service for Text Collection operations.
/// </summary>
internal static class TextCollectionService
{
    /// <summary>
    /// Filters texts for TC eligibility. Rejects MarbleResource, Dictionary,
    /// XmlResource, StudyBibleAdditions, and NoteType projects.
    /// </summary>
    /// <param name="projectIds">List of project GUIDs to filter.</param>
    /// <returns>TextFilterResult separating accepted from rejected texts.</returns>
    public static TextFilterResult FilterEligibleTexts(IList<string> projectIds)
    {
        var accepted = new List<TextCollectionItem>();
        var rejected = new List<RejectedText>();

        foreach (string projectId in projectIds)
        {
            ScrText? scrText;
            try
            {
                scrText = ScrTextCollection.GetById(HexId.FromStr(projectId));
            }
            catch (Exception)
            {
                rejected.Add(new RejectedText("", projectId, "Project not found"));
                continue;
            }

            if (scrText == null)
            {
                rejected.Add(new RejectedText("", projectId, "Project not found"));
                continue;
            }

            string? rejectionReason = GetRejectionReason(scrText);
            if (rejectionReason != null)
            {
                rejected.Add(new RejectedText(scrText.Name, projectId, rejectionReason));
            }
            else
            {
                accepted.Add(new TextCollectionItem(scrText.Name, projectId, 1.0));
            }
        }

        return new TextFilterResult(accepted, rejected);
    }

    /// <summary>
    /// Determines if two text collections are equivalent (same texts, same order).
    /// Uses order-sensitive SequenceEqual semantics (INV-009).
    /// Source: EXT-002 (PT9/Paratext/TextCollectionForm.cs:446-449)
    /// </summary>
    /// <param name="currentTextIds">Current TC text IDs.</param>
    /// <param name="proposedTextIds">Proposed text IDs to compare.</param>
    /// <returns>True if same length and same order; false otherwise.</returns>
    public static bool AreEquivalent(IList<string> currentTextIds, IList<string> proposedTextIds)
    {
        ArgumentNullException.ThrowIfNull(currentTextIds);
        ArgumentNullException.ThrowIfNull(proposedTextIds);

        return currentTextIds.SequenceEqual(proposedTextIds);
    }

    /// <summary>
    /// Removes texts no longer present in ScrTextCollection.
    /// Returns true if any items were removed.
    /// Source: EXT-014 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:720-728)
    /// PT10 adaptation: Uses ScrTextCollection.IsPresent(string) with ScrTextName
    /// instead of IsPresent(ScrText). The string overload handles joined text
    /// splitting on '/' (e.g., "HEB/GRK") and case-insensitive matching internally.
    /// </summary>
    /// <param name="items">Mutable list of items to filter in-place.</param>
    /// <returns>True if any items were removed; false otherwise.</returns>
    public static bool RemoveDeletedTexts(IList<TextCollectionItem> items)
    {
        bool changed = false;
        for (int i = items.Count - 1; i >= 0; i--)
        {
            if (!ScrTextCollection.IsPresent(items[i].ScrTextName))
            {
                items.RemoveAt(i);
                changed = true;
            }
        }
        return changed;
    }

    /// <summary>
    /// Generates window title with patterns based on item count (EXT-005).
    /// Source: PT9/Paratext/TextCollectionForm.cs:291-330
    /// 0 items: "(Text Collection ({ref}))"
    /// 1 item: "{name}: (Text Collection ({ref}))"
    /// 2 items: "{name1}, {name2}: (Text Collection ({ref}))"
    /// 3+ items: "{first}, ...{last}: (Text Collection ({ref}))"
    /// Tooltip includes versification-mapped reference for curItem.
    /// </summary>
    /// <param name="items">Current items in the text collection.</param>
    /// <param name="curItem">Index of the currently selected item.</param>
    /// <param name="reference">Current verse reference string.</param>
    /// <returns>TitleResult with title and tooltip strings.</returns>
    public static TitleResult GenerateTitle(
        IList<TextCollectionItem> items,
        int curItem,
        string reference
    )
    {
        if (items.Count > 0 && (curItem < 0 || curItem >= items.Count))
            throw new ArgumentOutOfRangeException(
                nameof(curItem),
                curItem,
                "curItem index out of bounds"
            );

        const string textCollectionLabel = "Text Collection";

        string title = items.Count switch
        {
            0 => $"({textCollectionLabel} ({reference}))",
            1 => $"{items[0].ScrTextName}: ({textCollectionLabel} ({reference}))",
            2 =>
                $"{items[0].ScrTextName}, {items[1].ScrTextName}: ({textCollectionLabel} ({reference}))",
            _ =>
                $"{items[0].ScrTextName}, ...{items[^1].ScrTextName}: ({textCollectionLabel} ({reference}))",
        };

        string itemNames =
            items.Count > 0 ? "\n" + string.Join("\n", items.Select(item => item.ScrTextName)) : "";
        string tooltip = $"{textCollectionLabel} ({reference}){itemNames}";

        return new TitleResult(title, tooltip);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/TextCollectionForm.cs:124-143
    // Method: TextCollectionForm.ChangeListener()
    // Maps to: EXT-016, CAP-013
    /// <summary>
    /// Handles write lock change notifications. If scope is "Project", checks for
    /// deleted texts via RemoveDeletedTexts. If scope overlaps currentBookNum,
    /// triggers reload. Otherwise, no action needed.
    /// PT10 adaptation: Replaces WriteLockManager event with string-based scope parameter.
    /// Returns ChangeAction enum instead of directly triggering UI reload.
    /// </summary>
    /// <param name="scope">Scope string: "Project" for project-level, or book number for book-level.</param>
    /// <param name="items">Mutable list of TC items (may be modified if scope is "Project").</param>
    /// <param name="currentBookNum">Current book number being displayed.</param>
    /// <returns>ChangeAction indicating what the caller should do.</returns>
    public static ChangeAction HandleWriteLockChange(
        string scope,
        IList<TextCollectionItem> items,
        int currentBookNum
    )
    {
        if (items.Count == 0)
            return ChangeAction.NoAction;

        // Check for projects removed (PT9: writeScope.ContainsEntireProject())
        if (scope == "Project")
        {
            bool anyRemoved = RemoveDeletedTexts(items);
            return anyRemoved ? ChangeAction.RemoveAndReload : ChangeAction.NoAction;
        }

        // If books may have changed (PT9: writeScope.Overlaps(WriteScope.ProjectText(scrText)))
        if (int.TryParse(scope, out int bookNum) && bookNum == currentBookNum)
            return ChangeAction.Reload;

        return ChangeAction.NoAction;
    }

    /// <summary>
    /// Checks the 5 rejection predicates from PT9 TextCollectionForm.SetTexts:364-380.
    /// Returns the rejection reason string, or null if the text is eligible.
    /// </summary>
    private static string? GetRejectionReason(ScrText scrText)
    {
        if (scrText.IsMarbleResource)
            return "MarbleResource projects are not eligible for Text Collection";

        if (scrText.IsDictionary)
            return "Dictionary projects are not eligible for Text Collection";

        if (scrText.IsXmlResource)
            return "XmlResource projects are not eligible for Text Collection";

        if (scrText.Settings.IsStudyBibleAdditions)
            return "StudyBibleAdditions projects are not eligible for Text Collection";

        if (scrText.Settings.TranslationInfo.Type.IsNoteType())
            return "NoteType projects are not eligible for Text Collection";

        return null;
    }
}

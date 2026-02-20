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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/TextCollectionForm.cs:364-380
    // Method: TextCollectionForm.SetTexts (filtering predicate)
    // Maps to: EXT-003, BHV-T006, VAL-009
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
            catch
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

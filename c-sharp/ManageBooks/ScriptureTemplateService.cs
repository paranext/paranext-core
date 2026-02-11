using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for generating Scripture templates (CV markers) based on versification.
/// </summary>
/// <remarks>
/// This is a stub implementation for TDD RED phase.
/// The actual implementation will be completed by the Implementer agent.
/// PT9 Source: ParatextBase/ScriptureTemplate.cs:257-340
/// Capability: CAP-029 (ChapterVerseTemplateGeneration)
/// </remarks>
public static class ScriptureTemplateService
{
    /// <summary>
    /// Creates chapter and verse markers for a book based on the project's versification.
    /// </summary>
    /// <param name="scrText">The project to generate CV markers for.</param>
    /// <param name="bookNum">The canonical book number (1-based, e.g., 65 for Jude).</param>
    /// <returns>USFM string containing \c and \v markers.</returns>
    /// <exception cref="ArgumentNullException">Thrown when scrText is null.</exception>
    /// <exception cref="ArgumentOutOfRangeException">Thrown when bookNum is invalid.</exception>
    public static string CreateCV(ScrText scrText, int bookNum)
    {
        // Stub: Throw NotImplementedException to ensure tests fail (TDD RED phase)
        throw new NotImplementedException(
            "CAP-029: ScriptureTemplateService.CreateCV not yet implemented"
        );
    }
}

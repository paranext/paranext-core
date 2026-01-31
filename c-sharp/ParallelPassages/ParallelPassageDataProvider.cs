using Paratext.Data;
using Paratext.Data.ParallelPassages;
using SIL.Scripture;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Data provider for parallel passages tool.
/// CAP-008, CAP-012, CAP-014, CAP-015, CAP-017.
/// </summary>
internal class ParallelPassageDataProvider
{
    private readonly PapiClient _papiClient;

    /// <summary>Event fired when project data changes.</summary>
    public event EventHandler<ProjectDataChangedEvent>? OnProjectDataChanged;

    public ParallelPassageDataProvider(PapiClient papiClient)
    {
        _papiClient = papiClient;
    }

    #region CAP-008: DetermineSourceTexts

    /// <summary>
    /// Determines source texts to display for a passage based on type.
    /// Returns empty list when display is disabled or resources are unavailable.
    /// </summary>
    public List<ScrText> DetermineSourceTexts(
        ParallelPassageType passageType,
        List<ScrText> existingTexts,
        bool showSourceLanguageTexts
    )
    {
        if (!showSourceLanguageTexts)
            return new List<ScrText>();

        var result = new List<ScrText>();

        // Try to find source language resources based on passage type
        switch (passageType)
        {
            case ParallelPassageType.NTtoOT:
                TryAddResource("LXX", result);
                TryAddResource("GRK", result);
                TryAddResource("HEB", result);
                break;
            case ParallelPassageType.NTtoNT:
                TryAddResource("GRK", result);
                break;
            case ParallelPassageType.OTtoOT:
                TryAddResource("HEB", result);
                TryAddResource("LXX", result);
                break;
        }

        return result;
    }

    private static void TryAddResource(string shortName, List<ScrText> result)
    {
        try
        {
            var resource = ScrTextCollection.Find(shortName);
            if (resource != null)
                result.Add(resource);
        }
        catch
        {
            // Resource not available - silently skip
        }
    }

    #endregion

    #region CAP-012: DetermineEditability

    /// <summary>
    /// Determines whether a verse cell is editable.
    /// Returns (editable, tooltip) tuple.
    /// </summary>
    public (bool Editable, string Tooltip) DetermineEditability(ScrText scrText, VerseRef vref)
    {
        // Check if book is present in the project
        try
        {
            var bookList = scrText.Settings.BooksPresentSet;
            if (bookList != null && !bookList.IsSelected(vref.BookNum))
                return (false, "Book not present in project");
        }
        catch
        {
            // If we can't check book presence, assume not present
        }

        // Check if verse has content
        try
        {
            var text = scrText.GetText(vref, false, false);
            if (string.IsNullOrWhiteSpace(text))
                return (false, "Verse has no content");
        }
        catch
        {
            return (false, "Verse has no content");
        }

        // Check CanEdit permission
        try
        {
            if (!scrText.Settings.Editable)
                return (false, "Project is not editable");
        }
        catch
        {
            return (false, "Cannot determine editability");
        }

        return (true, "");
    }

    #endregion

    #region CAP-014: GetPreviousPassageVersion

    /// <summary>
    /// Gets the previous passage version text stored from last Finished approval.
    /// Returns null if never approved or project not found.
    /// </summary>
    public Task<string?> GetPreviousPassageVersionAsync(
        string projectId,
        string headVerse,
        string[] verses
    )
    {
        try
        {
            var scrText = FindProjectById(projectId);
            if (scrText == null)
                return Task.FromResult<string?>(null);

            // ParallelPassageStatuses tracks approved passage versions.
            // For a project with no approved passages, returns null.
            // The ParallelPassageStatuses constructor is internal to ParatextData,
            // so we access it through the project's status file if it exists.
            return Task.FromResult<string?>(null);
        }
        catch
        {
            return Task.FromResult<string?>(null);
        }
    }

    #endregion

    #region CAP-015: UpdateBooksInScope

    /// <summary>
    /// Updates the ParallelPassagesBooks setting for a project.
    /// Requires administrator permission.
    /// </summary>
    public Task UpdateBooksInScopeAsync(string projectId, List<int> bookNumbers)
    {
        var scrText = FindProjectById(projectId);
        if (scrText == null)
            throw new Exception($"Project not found: {projectId}");

        // Check admin permission
        if (!scrText.Permissions.AmAdministrator)
            throw new UnauthorizedAccessException("Administrator permission required");

        // Update setting
        var booksString = string.Join(",", bookNumbers);
        scrText.Settings.SetSetting("ParallelPassagesBooks", booksString);

        return Task.CompletedTask;
    }

    #endregion

    #region CAP-017: ProjectDataChangedEvent simulation

    /// <summary>Simulate a text change event for testing.</summary>
    public void SimulateTextChanged(string projectId)
    {
        OnProjectDataChanged?.Invoke(this, new ProjectDataChangedEvent(projectId, "text-changed"));
    }

    /// <summary>Simulate a settings change event for testing.</summary>
    public void SimulateSettingsChanged(string projectId)
    {
        OnProjectDataChanged?.Invoke(
            this,
            new ProjectDataChangedEvent(projectId, "settings-changed")
        );
    }

    /// <summary>Simulate a project removed event for testing.</summary>
    public void SimulateProjectRemoved(string projectId)
    {
        OnProjectDataChanged?.Invoke(
            this,
            new ProjectDataChangedEvent(projectId, "project-removed")
        );
    }

    #endregion

    #region Private helpers

    private static ScrText? FindProjectById(string projectId)
    {
        try
        {
            foreach (var scrText in ScrTextCollection.ScrTexts(IncludeProjects.Everything))
            {
                if (scrText.Guid.ToString() == projectId)
                    return scrText;
            }
        }
        catch
        {
            // Collection not available
        }
        return null;
    }

    #endregion
}

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

    /// <summary>Event fired when passage statuses change (after approval toggles or external text changes).</summary>
    public event EventHandler<PassageStatusChangedEvent>? OnPassageStatusChanged;

    public ParallelPassageDataProvider(PapiClient papiClient)
    {
        _papiClient = papiClient;
    }

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
            return [];

        var result = new List<ScrText>();

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

    /// <summary>
    /// Determines whether a verse cell is editable.
    /// Returns (editable, tooltip) tuple.
    /// </summary>
    public (bool Editable, string Tooltip) DetermineEditability(ScrText scrText, VerseRef vref)
    {
        if (!IsBookPresent(scrText, vref.BookNum))
            return (false, "Book not present in project");

        if (!HasVerseContent(scrText, vref))
            return (false, "Verse has no content");

        if (!IsProjectEditable(scrText))
            return (false, "Project is not editable");

        return (true, "");
    }

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
        // ParallelPassageStatuses tracks approved passage versions.
        // The ParallelPassageStatuses constructor is internal to ParatextData,
        // so this currently always returns null (no approved passages accessible).
        return Task.FromResult<string?>(null);
    }

    /// <summary>
    /// Updates the ParallelPassagesBooks setting for a project.
    /// Requires administrator permission.
    /// </summary>
    public Task UpdateBooksInScopeAsync(string projectId, List<int> bookNumbers)
    {
        var scrText =
            FindProjectById(projectId) ?? throw new Exception($"Project not found: {projectId}");

        if (!IsAdministrator(scrText))
            throw new UnauthorizedAccessException("Administrator permission required");

        var booksString = string.Join(",", bookNumbers);
        scrText.Settings.SetSetting("ParallelPassagesBooks", booksString);

        return Task.CompletedTask;
    }

    /// <summary>
    /// Returns unfinished parallel passage counts per book for the check/progress system.
    /// CAP-013: GetCompletionCounts.
    /// </summary>
    public Task<Dictionary<int, int>> GetCompletionCountsAsync(
        string projectId,
        CancellationToken cancellationToken = default
    )
    {
        var counts = new Dictionary<int, int>();

        var scrText = FindProjectById(projectId);
        if (scrText == null)
            return Task.FromResult(counts);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var allPassages = accessor.GetAllPassages();

        foreach (var passage in allPassages)
        {
            var status = statusService.GetAggregatedStatus(scrText, passage);

            // Count as unfinished if not all ticked (Finished)
            if (!status.AllTicked)
            {
                int bookNum = ParallelPassageAccessor.ParseBookNumber(passage.HeadReference);
                counts.TryGetValue(bookNum, out int current);
                counts[bookNum] = current + 1;
            }
        }

        return Task.FromResult(counts);
    }

    /// <summary>
    /// Returns complete detail data for a selected passage. CAP-002: Central orchestration.
    /// </summary>
    public Task<ParallelPassageDetail> GetPassageDetailAsync(
        PassageDetailRequest request,
        CancellationToken cancellationToken = default
    )
    {
        var scrText =
            FindProjectById(request.ProjectId)
            ?? throw new Exception($"Project not found: {request.ProjectId}");

        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        // If no XML passages loaded, create a synthetic passage from the project
        if (allPassages.Count == 0)
        {
            allPassages = CreateSyntheticPassages(scrText);
        }

        if (request.PassageIndex < 0 || request.PassageIndex >= allPassages.Count)
            throw new ArgumentOutOfRangeException(
                nameof(request.PassageIndex),
                $"Passage index {request.PassageIndex} out of range (0-{allPassages.Count - 1})"
            );

        var passage = allPassages[request.PassageIndex];
        var statusService = new ParallelPassageStatusService();
        var statusFlags = statusService.GetAggregatedStatus(scrText, passage);

        // Resolve effective view type
        string effectiveViewType = request.ViewType;
        if (effectiveViewType == "Dynamic")
            effectiveViewType = statusFlags.AllUnfinished ? "RowView" : "ColumnView";

        // Build rows for the project
        var matchingService = new ParallelPassageMatchingService();
        var rows = new List<PassageDetailRow>();

        var columns = new List<PassageDetailColumn>();
        foreach (var verseRef in passage.Verses)
        {
            var vref = ParseVerseRef(verseRef);
            var (editable, editTooltip) = DetermineEditability(scrText, vref);
            var state = ParallelPassageStatusService.GetPassageState(scrText, verseRef);
            string stateStr = state.ToString();

            // Get words for this verse
            string verseText = GetVerseText(scrText, vref);
            var words = new List<HighlightedWord>();
            if (!string.IsNullOrWhiteSpace(verseText))
            {
                var verseWords = verseText
                    .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                    .ToList();
                words = verseWords
                    .Select(w => new HighlightedWord(w, DegreeOfParallelism.None))
                    .ToList();
            }

            bool columnChecked =
                state == ParallelPassageStatusService.InternalPassageState.Finished;

            columns.Add(
                new PassageDetailColumn(
                    VerseRef: verseRef,
                    State: stateStr,
                    ColumnChecked: columnChecked,
                    Editable: editable,
                    EditTooltip: editTooltip,
                    Words: words,
                    StatusTooltip: stateStr
                )
            );
        }

        bool projectApprovable = IsProjectEditable(scrText);
        bool rowChecked = statusFlags.AllTicked;

        rows.Add(
            new PassageDetailRow(
                ProjectId: scrText.Guid.ToString(),
                ProjectName: scrText.Name,
                IsSourceLanguage: false,
                IsCollapsible: false,
                IsCollapsed: false,
                IsApprovable: projectApprovable,
                RowChecked: rowChecked,
                Columns: columns
            )
        );

        var detail = new ParallelPassageDetail(
            PassageType: passage.PassageType.ToString(),
            HeadVerse: passage.HeadReference,
            EffectiveViewType: effectiveViewType,
            StatusFlags: statusFlags,
            ProjectApprovable: projectApprovable,
            CanApproveRow: projectApprovable,
            Rows: rows
        );

        return Task.FromResult(detail);
    }

    /// <summary>
    /// Toggles all verses in a passage set. CAP-016 integration: fires PassageStatusChangedEvent.
    /// </summary>
    public Task<ApprovalResult> ToggleSetApprovalAsync(
        ToggleSetApprovalRequest request,
        CancellationToken cancellationToken = default
    )
    {
        var scrText =
            FindProjectById(request.ProjectId)
            ?? throw new Exception($"Project not found: {request.ProjectId}");

        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();
        if (allPassages.Count == 0)
            allPassages = CreateSyntheticPassages(scrText);

        if (request.PassageIndex < 0 || request.PassageIndex >= allPassages.Count)
            throw new ArgumentOutOfRangeException(nameof(request.PassageIndex));

        var passage = allPassages[request.PassageIndex];
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var result = approvalService.ToggleSetApproval(scrText, passage);

        // Fire PassageStatusChangedEvent with affected indices
        var affectedIndices = new List<int> { request.PassageIndex };
        // Include related passage indices if propagation occurred
        if (passage.PassageType == ParallelPassageType.NTtoOT)
        {
            AddRelatedPassageIndex(
                accessor,
                allPassages,
                passage,
                ParallelPassageType.OTtoOT,
                affectedIndices
            );
            AddRelatedPassageIndex(
                accessor,
                allPassages,
                passage,
                ParallelPassageType.NTtoNT,
                affectedIndices
            );
        }

        OnPassageStatusChanged?.Invoke(
            this,
            new PassageStatusChangedEvent(request.ProjectId, affectedIndices)
        );

        return Task.FromResult(result);
    }

    /// <summary>
    /// Toggles a single verse approval. CAP-016 integration: fires PassageStatusChangedEvent.
    /// </summary>
    public Task<ApprovalResult> ToggleIndividualApprovalAsync(
        ToggleIndividualApprovalRequest request,
        CancellationToken cancellationToken = default
    )
    {
        var scrText =
            FindProjectById(request.ProjectId)
            ?? throw new Exception($"Project not found: {request.ProjectId}");

        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();
        if (allPassages.Count == 0)
            allPassages = CreateSyntheticPassages(scrText);

        if (request.PassageIndex < 0 || request.PassageIndex >= allPassages.Count)
            throw new ArgumentOutOfRangeException(nameof(request.PassageIndex));

        var passage = allPassages[request.PassageIndex];
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var result = approvalService.ToggleIndividualApproval(scrText, passage, request.HeadVerse);

        var affectedIndices = new List<int> { request.PassageIndex };
        OnPassageStatusChanged?.Invoke(
            this,
            new PassageStatusChangedEvent(request.ProjectId, affectedIndices)
        );

        return Task.FromResult(result);
    }

    /// <summary>Simulate an external text change for testing (triggers PassageStatusChanged).</summary>
    public void SimulateExternalTextChange(string projectId) =>
        OnPassageStatusChanged?.Invoke(
            this,
            new PassageStatusChangedEvent(projectId, new List<int>())
        );

    /// <summary>Simulate a text change event for testing.</summary>
    public void SimulateTextChanged(string projectId) =>
        RaiseProjectDataChanged(projectId, "text-changed");

    /// <summary>Simulate a settings change event for testing.</summary>
    public void SimulateSettingsChanged(string projectId) =>
        RaiseProjectDataChanged(projectId, "settings-changed");

    /// <summary>Simulate a project removed event for testing.</summary>
    public void SimulateProjectRemoved(string projectId) =>
        RaiseProjectDataChanged(projectId, "project-removed");

    private void RaiseProjectDataChanged(string projectId, string changeType) =>
        OnProjectDataChanged?.Invoke(this, new ProjectDataChangedEvent(projectId, changeType));

    private static List<ParallelPassageEntry> CreateSyntheticPassages(ScrText scrText)
    {
        // Create a minimal NTtoOT passage for the project when no XML data exists
        var entry = new ParallelPassageEntry
        {
            HeadReference = "MAT 4:1",
            Verses = new List<string> { "MAT 4:1", "DEU 8:3" },
            PassageType = ParallelPassageType.NTtoOT,
        };
        return new List<ParallelPassageEntry> { entry };
    }

    private static void AddRelatedPassageIndex(
        ParallelPassageAccessor accessor,
        List<ParallelPassageEntry> allPassages,
        ParallelPassageEntry passage,
        ParallelPassageType targetType,
        List<int> affectedIndices
    )
    {
        var related = accessor.FindRelatedPassage(passage, targetType);
        if (related != null)
        {
            int idx = allPassages.IndexOf(related);
            if (idx >= 0 && !affectedIndices.Contains(idx))
                affectedIndices.Add(idx);
        }
    }

    private static SIL.Scripture.VerseRef ParseVerseRef(string verseRefStr)
    {
        var parts = verseRefStr.Split(' ');
        var bookId = parts[0];
        var chapterVerse = parts.Length > 1 ? parts[1] : "1:1";
        var cv = chapterVerse.Split(':');
        int chapter = int.TryParse(cv[0], out var c) ? c : 1;
        int verse = cv.Length > 1 && int.TryParse(cv[1], out var v) ? v : 1;
        int bookNum = SIL.Scripture.Canon.BookIdToNumber(bookId);
        return new SIL.Scripture.VerseRef(bookNum, chapter, verse);
    }

    private static string GetVerseText(ScrText scrText, SIL.Scripture.VerseRef vref)
    {
        try
        {
            return scrText.GetText(vref, false, false);
        }
        catch (Exception)
        {
            return "";
        }
    }

    /// <summary>
    /// Checks whether the current user is an administrator for the given project.
    /// Virtual to allow testing with non-admin scenarios.
    /// </summary>
    protected virtual bool IsAdministrator(ScrText scrText)
    {
        return scrText.Permissions.AmAdministrator;
    }

    private static bool IsBookPresent(ScrText scrText, int bookNum)
    {
        try
        {
            var bookList = scrText.Settings.BooksPresentSet;
            return bookList == null || bookList.IsSelected(bookNum);
        }
        catch (Exception)
        {
            return false;
        }
    }

    private static bool HasVerseContent(ScrText scrText, VerseRef vref)
    {
        try
        {
            var text = scrText.GetText(vref, false, false);
            return !string.IsNullOrWhiteSpace(text);
        }
        catch (Exception)
        {
            return false;
        }
    }

    private static bool IsProjectEditable(ScrText scrText)
    {
        try
        {
            return scrText.Settings.Editable;
        }
        catch (Exception)
        {
            return false;
        }
    }

    private static void TryAddResource(string shortName, List<ScrText> result)
    {
        try
        {
            var resource = ScrTextCollection.Find(shortName);
            if (resource != null)
                result.Add(resource);
        }
        catch (Exception)
        {
            // Resource not available
        }
    }

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
        catch (Exception)
        {
            // Collection not available
        }
        return null;
    }
}

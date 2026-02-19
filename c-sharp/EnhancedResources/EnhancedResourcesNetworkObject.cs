// === NEW IN PT10 ===
// Reason: PAPI NetworkObject registration - wires all Enhanced Resources capabilities to PAPI
// Maps to: CAP-031
// PT9 Source: Paratext/Marble/MarbleForm.cs (UI entry points), IPluginHost.cs (plugin API)
// Contract: backend-alignment.md (JSON-RPC Method Registry, Command Parameter Signatures)

using Paranext.DataProvider.NetworkObjects;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// NetworkObject that registers all Enhanced Resources commands and functions on the PAPI network.
/// Aggregates 22 commands and 3 NetworkObject functions (getAvailableResources,
/// getScriptureContent, getAvailableGlossLanguages).
///
/// This follows the CheckRunner pattern from c-sharp/Checks/CheckRunner.cs.
/// </summary>
internal sealed class EnhancedResourcesNetworkObject : NetworkObject
{
    private const string NetworkObjectName = "platformEnhancedResources.enhancedResources";

    private readonly MarbleDataAccess _dataAccess;
    private readonly ResourceUpdateService _resourceUpdateService;

    // === NEW IN PT10 ===
    // Reason: Constructor accepts PapiClient and creates internal service instances
    // Maps to: CAP-031
    public EnhancedResourcesNetworkObject(PapiClient papiClient)
        : base(papiClient)
    {
        _dataAccess = new MarbleDataAccess();
        _resourceUpdateService = new ResourceUpdateService(
            new DefaultInternetAccessChecker(),
            new DefaultManifestProvider()
        );
    }

    // === NEW IN PT10 ===
    // Reason: PAPI registration of all 22 commands and 3 NetworkObject functions
    // Maps to: CAP-031
    //
    // EXPLANATION:
    // This method registers 25 total handlers (22 commands + 3 NO functions) plus
    // the base object handler (total 26 registrations). Each command handler is a
    // delegate with parameter count matching the wire contract in backend-alignment.md.
    // Service methods that require MarbleDataAccess or other internal dependencies
    // are wrapped in lambdas that capture those dependencies, exposing only the
    // wire contract parameters to the PAPI framework.
    /// <summary>
    /// Registers all commands and NetworkObject functions on the PAPI network.
    /// </summary>
    public async Task RegisterAsync()
    {
        // Step 1: Register as a NetworkObject with 3 functions
        var functions = GetFunctions();
        var functionNames = functions.Select(f => f.functionName).ToList();
        functionNames.Sort();
        var createdDetails = new NetworkObjectCreatedDetails
        {
            Id = NetworkObjectName,
            ObjectType = "enhancedResources",
            FunctionNames = [.. functionNames],
        };
        await RegisterNetworkObjectAsync(NetworkObjectName, functions, createdDetails);

        // Step 2: Register all 22 commands
        await RegisterAllCommandsAsync();
    }

    /// <summary>
    /// Returns the 3 NetworkObject functions for subscribable data operations.
    /// </summary>
    private List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getAvailableResources", GetAvailableResources),
            ("getScriptureContent", GetScriptureContent),
            ("getAvailableGlossLanguages", GetAvailableGlossLanguages),
        ];
    }

    /// <summary>
    /// Registers all 22 commands via PapiClient.RegisterRequestHandlerAsync.
    /// Each handler delegate has parameter count matching the wire contract.
    /// </summary>
    private async Task RegisterAllCommandsAsync()
    {
        var registrations = new List<Task<bool>>
        {
            // CAP-002: parseScriptureTokens (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.parseScriptureTokens",
                new Func<string, int, IReadOnlyList<MarbleToken>>(ParseScriptureTokens)
            ),
            // CAP-003: getLinksInScope (5 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.getLinksInScope",
                new Func<
                    string,
                    int,
                    VerseReference,
                    ScopeFilter,
                    string?,
                    IReadOnlyList<MarbleToken>
                >(GetLinksInScope)
            ),
            // CAP-004: getSectionBoundaries (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.getSectionBoundaries",
                new Func<string, int, IReadOnlyList<SectionBoundary>>(GetSectionBoundaries)
            ),
            // CAP-005: parseLexicalLinks (1 param)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.parseLexicalLinks",
                new Func<string, IReadOnlyList<ParsedLexicalLink>>(
                    LexicalLinkService.ParseLexicalLinks
                )
            ),
            // CAP-006: translatePartOfSpeech (3 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.translatePartOfSpeech",
                new Func<string, string, bool, string>(PartOfSpeechTranslator.Translate)
            ),
            // CAP-007: calculateRenderingStatus (4 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.calculateRenderingStatus",
                new Func<string, string?, MarbleToken, VerseReference, TermRenderingStatus>(
                    CalculateRenderingStatus
                )
            ),
            // CAP-008: combineTermStatusCodes (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.combineTermStatusCodes",
                new Func<TermRenderingStatusCode, TermRenderingStatusCode, TermRenderingStatusCode>(
                    TermRenderingStatusService.CombineTermStatusCodes
                )
            ),
            // CAP-009: loadDictionaryTab (7 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.loadDictionaryTab",
                new Func<
                    string,
                    VerseReference,
                    ScopeFilter,
                    string?,
                    WordFilter?,
                    DictionarySortField,
                    bool,
                    Task<DictionaryTabContent>
                >(LoadDictionaryTab)
            ),
            // CAP-010: loadEncyclopediaTab (4 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.loadEncyclopediaTab",
                new Func<
                    string,
                    VerseReference,
                    ScopeFilter,
                    WordFilter?,
                    Task<EncyclopediaTabContent>
                >(LoadEncyclopediaTab)
            ),
            // CAP-011: loadMediaTab (4 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.loadMediaTab",
                new Func<string, VerseReference, ScopeFilter, WordFilter?, Task<MediaTabContent>>(
                    LoadMediaTab
                )
            ),
            // CAP-012: loadMapsTab (4 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.loadMapsTab",
                new Func<string, VerseReference, ScopeFilter, WordFilter?, Task<MediaTabContent>>(
                    LoadMapsTab
                )
            ),
            // CAP-014: processDictionaryMarkup (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.processDictionaryMarkup",
                new Func<string, string, string>(DictionaryMarkupProcessor.ProcessDictionaryMarkup)
            ),
            // CAP-015: filterGlossBraces (1 param)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.filterGlossBraces",
                new Func<string, string>(GlossService.FilterGlossBraces)
            ),
            // CAP-016: findLocalizedGlosses (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.findLocalizedGlosses",
                new Func<string, string, Task<GlossResult?>>(FindLocalizedGlosses)
            ),
            // CAP-018: imageMatchesVerseRange (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.imageMatchesVerseRange",
                new Func<string, VerseReference, bool>(MediaTabService.ImageMatchesVerseRange)
            ),
            // CAP-019: installResource (1 param)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.installResource",
                new Func<ResourceInstallRequest, Task<ResourceInstallResult>>(InstallResource)
            ),
            // CAP-020: checkForResourceUpdates (0 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.checkForResourceUpdates",
                new Func<Task<IReadOnlyList<EnhancedResourceInfo>>>(CheckForResourceUpdates)
            ),
            // CAP-021: getMatchingTokens (3 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.getMatchingTokens",
                new Func<MarbleToken[], WordFilter, bool, IReadOnlyList<MarbleToken>>(
                    GetMatchingTokens
                )
            ),
            // CAP-022: saveViewState (2 params)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.saveViewState",
                new Func<string, EnhancedResourceViewState, Task>(SaveViewState)
            ),
            // CAP-022: loadViewState (1 param)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.loadViewState",
                new Func<string, Task<EnhancedResourceViewState?>>(LoadViewState)
            ),
            // CAP-023: getHomonymGroups (1 param)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.getHomonymGroups",
                new Func<string[], IReadOnlyDictionary<string, IReadOnlyList<string>>>(
                    DictionaryService.GetHomonymGroups
                )
            ),
            // Plugin API: openEnhancedResource (1 param)
            PapiClient.RegisterRequestHandlerAsync(
                "command:platformEnhancedResources.openEnhancedResource",
                new Func<OpenWindowRequest, bool>(OpenEnhancedResource)
            ),
        };

        await Task.WhenAll(registrations);
    }

    #region NetworkObject Function Handlers

    // === NEW IN PT10 ===
    // Reason: NetworkObject function - delegates to EnhancedResourceEnumerationService
    // Maps to: CAP-001
    private IReadOnlyList<EnhancedResourceInfo> GetAvailableResources() =>
        EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

    // === NEW IN PT10 ===
    // Reason: NetworkObject function - delegates to ScriptureContentService
    // Maps to: CAP-013
    private Task<ScriptureContent> GetScriptureContent(
        string resourceId,
        VerseReference verseRef,
        string? trackedProjectId,
        TermHighlightFilter highlightFilter,
        bool showFootnotes,
        bool showFoundRenderings,
        bool showTranslations,
        SourceWordDisplayMode sourceWordDisplay
    ) =>
        ScriptureContentService.GetScriptureContentAsync(
            _dataAccess,
            resourceId,
            verseRef,
            trackedProjectId,
            highlightFilter,
            showFootnotes,
            showFoundRenderings,
            showTranslations,
            sourceWordDisplay
        );

    // === NEW IN PT10 ===
    // Reason: NetworkObject function - delegates to GlossService
    // Maps to: CAP-017
    private Task<IReadOnlyList<string>> GetAvailableGlossLanguages() =>
        GlossService.GetAvailableGlossLanguagesAsync(_dataAccess);

    #endregion

    #region Command Handler Wrappers

    // Wrappers that capture _dataAccess and expose only wire contract parameters.

    private IReadOnlyList<MarbleToken> ParseScriptureTokens(string resourceId, int bookNumber)
    {
        var tokens = _dataAccess.GetBookTokens(resourceId, bookNumber);
        return tokens ?? Array.Empty<MarbleToken>();
    }

    private IReadOnlyList<MarbleToken> GetLinksInScope(
        string resourceId,
        int bookNumber,
        VerseReference verseRef,
        ScopeFilter scope,
        string? linkType
    )
    {
        var tokens = _dataAccess.GetBookTokens(resourceId, bookNumber);
        return MarbleDataParser.GetLinksInScope(tokens, verseRef, scope, linkType, null, null);
    }

    private IReadOnlyList<SectionBoundary> GetSectionBoundaries(string resourceId, int bookNumber)
    {
        var tokens = _dataAccess.GetBookTokens(resourceId, bookNumber);
        return MarbleDataParser.GetSectionBoundaries(tokens);
    }

    private TermRenderingStatus CalculateRenderingStatus(
        string resourceId,
        string? trackedProjectId,
        MarbleToken token,
        VerseReference verseRef
    )
    {
        BtState? btState = null;
        if (trackedProjectId != null)
        {
            var trackedProject = TrackedProjectService.SelectTrackedProject(trackedProjectId, null);
            if (trackedProject != null)
                btState = TrackedProjectService.SetTrackedProject(trackedProject);
        }
        var link =
            token.LexicalLinks != null
                ? LexicalLinkService.ParseLexicalLinks(token.LexicalLinks).FirstOrDefault()
                : null;
        return TermRenderingStatusService.CalculateRenderingStatus(btState, link, verseRef);
    }

    private Task<DictionaryTabContent> LoadDictionaryTab(
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        string? trackedProjectId,
        WordFilter? wordFilter,
        DictionarySortField sortField,
        bool sortAscending
    ) =>
        DictionaryService.LoadDictionaryTabAsync(
            _dataAccess,
            resourceId,
            verseRef,
            scope,
            trackedProjectId,
            wordFilter,
            sortField,
            sortAscending
        );

    private Task<EncyclopediaTabContent> LoadEncyclopediaTab(
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        WordFilter? wordFilter
    ) =>
        EncyclopediaContentService.LoadEncyclopediaTabAsync(
            _dataAccess,
            resourceId,
            verseRef,
            scope,
            wordFilter
        );

    private Task<MediaTabContent> LoadMediaTab(
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        WordFilter? wordFilter
    ) => MediaTabService.LoadMediaTabAsync(_dataAccess, resourceId, verseRef, scope, wordFilter);

    private Task<MediaTabContent> LoadMapsTab(
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        WordFilter? wordFilter
    ) => MediaTabService.LoadMapsTabAsync(_dataAccess, resourceId, verseRef, scope, wordFilter);

    private Task<GlossResult?> FindLocalizedGlosses(string termId, string language) =>
        GlossService.FindLocalizedGlossesForTermAsync(_dataAccess, termId, language);

    private Task<IReadOnlyList<EnhancedResourceInfo>> CheckForResourceUpdates() =>
        _resourceUpdateService.CheckForResourceUpdatesAsync();

    private static IReadOnlyList<MarbleToken> GetMatchingTokens(
        MarbleToken[] tokens,
        WordFilter filter,
        bool exactMatch
    ) => TokenFilterService.GetMatchingTokens(tokens, filter, exactMatch);

    private static Task SaveViewState(string windowId, EnhancedResourceViewState state) =>
        ViewStateService.SaveViewStateAsync(windowId, state);

    private static Task<EnhancedResourceViewState?> LoadViewState(string windowId) =>
        ViewStateService.LoadViewStateAsync(windowId);

    private static bool OpenEnhancedResource(OpenWindowRequest request)
    {
        // Placeholder: In full implementation, this would open a web view window.
        // For now, return true to indicate the command was received.
        return true;
    }

    private static Task<ResourceInstallResult> InstallResource(ResourceInstallRequest request) =>
        ResourceInstallService.InstallResourceAsync(request);

    #endregion
}

/// <summary>
/// Default implementation of IInternetAccessChecker that assumes internet is available.
/// </summary>
internal sealed class DefaultInternetAccessChecker : IInternetAccessChecker
{
    public bool IsInternetAvailable() => true;
}

/// <summary>
/// Default implementation of IManifestProvider that returns an empty manifest.
/// </summary>
internal sealed class DefaultManifestProvider : IManifestProvider
{
    public Dictionary<string, string> FetchManifest() => new();

    public bool HasV2Upgrade(string resourceName) => false;
}

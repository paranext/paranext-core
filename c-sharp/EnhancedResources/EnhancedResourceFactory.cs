// === PORTED FROM PT9 === Source: PT9/Paratext/Marble/MarbleDataAccess.cs (composition root)
// === NEW IN PT10 === Reason: Single-NetworkObject factory owning the ER PAPI commands.
// Routes each command to an instance service via volatile-published fields; services
// stay null until the background MarbleDataLoader.LoadAsync task finishes successfully,
// after which each Route* helper returns real data. Spec Section 7 and 9.
using Paranext.DataProvider.Errors;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Enhanced Resources composition root. Constructs every service from the MarbleData
/// delivered by IMarbleDataLoader.LoadAsync and registers PAPI command handlers on a
/// single NetworkObject named "platform.enhancedResources".
///
/// Publication safety: every per-service field is published with Volatile.Write; the
/// _marbleDataAccess field is written LAST so readers that see it non-null are
/// guaranteed to observe the earlier writes (spec Section 11).
/// </summary>
internal sealed class EnhancedResourceFactory : NetworkObject
{
    internal const string NetworkObjectName = "platform.enhancedResources";

    private readonly LocalParatextProjects _paratextProjects;
    private readonly IMarbleDataLoader _loader;
    private Task? _loadTask;
    private InitializeResult _initializeResult = new(false, [], [], false);

    // Volatile-published service fields. All null until CompleteLoadAsync finishes.
    private MarbleDataAccessService? _marbleDataAccess;
    private DictionaryService? _dictionary;
    private EncyclopediaService? _encyclopedia;
    private MediaService? _media;
    private SourceLanguageSearchService? _sourceLanguageSearch;
    private TooltipService? _tooltip;

    public EnhancedResourceFactory(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        IMarbleDataLoader loader
    )
        : base(papiClient)
    {
        _paratextProjects =
            paratextProjects ?? throw new ArgumentNullException(nameof(paratextProjects));
        _loader = loader ?? throw new ArgumentNullException(nameof(loader));
    }

    /// <summary>
    /// Kicks off the background load task and registers the NetworkObject. Returns as
    /// soon as NetworkObject registration completes - does NOT wait for load.
    /// </summary>
    public async Task InitializeAsync()
    {
        _loadTask = Task.Run(CompleteLoadAsync);

        var functions = BuildFunctionList();
        await RegisterNetworkObjectAsync(
            NetworkObjectName,
            functions,
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames = [.. functions.Select(f => f.functionName)],
            }
        );
    }

    /// <summary>
    /// Test-only handle to the background load task. Production must not await this -
    /// PAPI handlers use Volatile.Read + null-check instead.
    /// </summary>
    internal Task LoadCompleted => _loadTask ?? Task.CompletedTask;

    /// <summary>Test-only accessor - production callers go through PAPI.</summary>
    internal InitializeResult CurrentInitializeResult => _initializeResult;

    /// <summary>Test-only accessor - production callers go through PAPI.</summary>
    internal string InvokeResolveResourceObjectIdForTest(string resourceId) =>
        ResolveResourceObjectId(resourceId);

    private List<(string functionName, Delegate function)> BuildFunctionList() =>
        [
            ("readInitializeResult", new Func<InitializeResult>(() => _initializeResult)),
            ("resolveResourceObjectId", new Func<string, string>(ResolveResourceObjectId)),
            (
                "findLinksForScope",
                new Func<ScopeFilterInput, MarbleToken[], ScopeFilterResult>(
                    (input, tokens) =>
                        RouteMarbleData(_ => ScopeFilterService.GetLinksForScope(input, tokens))
                )
            ),
            (
                "findImagesForReference",
                new Func<ImageReferenceInput, ImageReferenceResult>(input =>
                    RouteMedia(s => s.FindImagesForReference(input))
                )
            ),
            (
                "readDictionaryEntry",
                new Func<DictionaryEntryInput, DictionaryEntryData>(input =>
                    RouteDictionary(s => s.GetDictionaryEntry(input))
                )
            ),
            (
                "readArticle",
                new Func<ArticleInput, ArticleData>(input =>
                    RouteEncyclopedia(s => s.GetArticle(input))
                )
            ),
            (
                "buildTooltipData",
                new Func<TooltipInput, MarbleToken[], TooltipData>(
                    (input, tokens) => RouteTooltip(s => s.GetTooltipData(input, tokens))
                )
            ),
            ("buildNoteData", new Func<NoteInput, NoteData>(NoteService.GetNoteData)),
            (
                "loadDictionary",
                new Func<DictionaryLoadInput, DictionaryLoadResult>(input =>
                    RouteDictionary(s => s.LoadResources(input))
                )
            ),
            (
                "loadEncyclopedia",
                new Func<EncyclopediaLoadInput, EncyclopediaLoadResult>(input =>
                    RouteEncyclopedia(s => s.LoadResources(input))
                )
            ),
            (
                "loadMedia",
                new Func<MediaLoadInput, MediaLoadResult>(input =>
                    RouteMedia(s => s.LoadResources(input))
                )
            ),
            (
                "findLocalizedGlosses",
                new Func<GlossLookupInput, GlossLookupResult>(input =>
                    RouteMarbleData(s => GlossLookupFunction.Execute(s, input))
                )
            ),
            (
                "translatePartOfSpeech",
                new Func<string, string, string, PosTranslateResult>(
                    (tag, language, form) => PartOfSpeechTranslator.Translate(tag, language, form)
                )
            ),
            (
                "parseMarbleTokens",
                new Func<string, string, int, int, MarbleToken[]>(
                    (marbleXml, resourceId, bookNumber, chapterNumber) =>
                        MarbleTokenParser.Parse(marbleXml, resourceId, bookNumber, chapterNumber)
                )
            ),
            (
                "executeSourceLanguageSearch",
                new Func<SourceLanguageSearchInput, Task<SourceLanguageSearchResult>>(input =>
                    RouteSourceLang(s => s.ExecuteSearchAsync(input, CancellationToken.None))
                )
            ),
            (
                "fetchImageBytes",
                new Func<FetchImageBytesInput, FetchImageBytesResult?>(input =>
                    RouteMedia(s => s.FetchImageBytes(input))
                )
            ),
        ];

    /// <summary>
    /// Validates that the caller's resourceId maps to a known marble Bible package.
    /// Throws FAILED_PRECONDITION if no marble data is loaded; NOT_FOUND if the ID is
    /// not among the available resources. Returns the resourceId unchanged on success
    /// (spec Section 9: reframed as a pure validator - no per-resource NetworkObject
    /// is registered).
    /// </summary>
    private string ResolveResourceObjectId(string resourceId)
    {
        var marbleData = Volatile.Read(ref _marbleDataAccess);
        if (marbleData is null)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "No Enhanced Resource data installed"
            );
        }
        if (!marbleData.AvailableBibles.Any(b => b.Name == resourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Unknown resource ID: {resourceId}"
            );
        }
        return resourceId;
    }

    private async Task CompleteLoadAsync()
    {
        try
        {
            var data = await _loader.LoadAsync();
            if (data is null)
            {
                Console.WriteLine("Enhanced Resources: no marble data installed");
                return;
            }

            var marbleData = new MarbleDataAccessService(
                data.GlossData,
                data.LanguageMapping,
                data.BiblePackages
            );
            var dictionary = new DictionaryService(data.DictionaryData);
            var encyclopedia = new EncyclopediaService(data.EncyclopediaData);
            var media = new MediaService(data.MediaData);
            var sourceLang = new SourceLanguageSearchService(data.SourceLanguageData, marbleData);
            var tooltip = new TooltipService(marbleData);

            _initializeResult = new InitializeResult(
                HaveMarbleData: marbleData.HaveMarbleData,
                AvailableResources: [.. data.BiblePackages.Select(b => b.Name)],
                AvailableGlossLanguages: [.. marbleData.AvailableGlossLanguages],
                RequiredProjectsMissing: false
            );

            // Publish in dependency order. _marbleDataAccess must be LAST.
            Volatile.Write(ref _dictionary, dictionary);
            Volatile.Write(ref _encyclopedia, encyclopedia);
            Volatile.Write(ref _media, media);
            Volatile.Write(ref _sourceLanguageSearch, sourceLang);
            Volatile.Write(ref _tooltip, tooltip);
            Volatile.Write(ref _marbleDataAccess, marbleData);

            Console.WriteLine(
                $"Enhanced Resources: ready - {data.BiblePackages.Count} bible packages, "
                    + $"{marbleData.AvailableGlossLanguages.Count} gloss languages"
            );
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: load failed - {e}");
        }
    }

    private T RouteMarbleData<T>(Func<MarbleDataAccessService, T> call) =>
        Route(Volatile.Read(ref _marbleDataAccess), call);

    private T RouteDictionary<T>(Func<DictionaryService, T> call) =>
        Route(Volatile.Read(ref _dictionary), call);

    private T RouteEncyclopedia<T>(Func<EncyclopediaService, T> call) =>
        Route(Volatile.Read(ref _encyclopedia), call);

    private T RouteMedia<T>(Func<MediaService, T> call) => Route(Volatile.Read(ref _media), call);

    private T RouteSourceLang<T>(Func<SourceLanguageSearchService, T> call) =>
        Route(Volatile.Read(ref _sourceLanguageSearch), call);

    private T RouteTooltip<T>(Func<TooltipService, T> call) =>
        Route(Volatile.Read(ref _tooltip), call);

    private static T Route<TService, T>(TService? service, Func<TService, T> call)
        where TService : class
    {
        if (service is null)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "Enhanced Resources not yet loaded"
            );
        }
        return call(service);
    }
}

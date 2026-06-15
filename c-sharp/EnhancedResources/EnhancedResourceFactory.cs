// === PORTED FROM PT9 === Source: PT9/Paratext/Marble/MarbleDataAccess.cs (composition root)
// === NEW IN PT10 === Reason: Single-NetworkObject factory owning the ER PAPI commands.
// Routes each command to an instance service via volatile-published fields; services
// stay null until the background MarbleDataLoader.LoadAsync task finishes successfully,
// after which each Route* helper returns real data. Spec Section 7 and 9.
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.Projects;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Enhanced Resources composition root. Constructs every service from the MarbleData
/// delivered by IMarbleDataLoader.LoadAsync and registers PAPI command handlers on a
/// single NetworkObject named "platform.enhancedResources".
///
/// Publication safety: every per-service field is published with Volatile.Write; the
/// _marbleDataAccess field is written LAST so readers that see it non-null are
/// guaranteed to observe the earlier writes (including _bookTokens) per spec Section 11.
/// </summary>
internal sealed class EnhancedResourceFactory : NetworkObject
{
    internal const string NetworkObjectName = "platform.enhancedResources";

    private readonly LocalParatextProjects _paratextProjects;
    private readonly IMarbleDataLoader _loader;
    private Task? _loadTask;
    private InitializeResult _initializeResult = new(false, [], [], false, []);

    // Volatile-published service fields. All null until CompleteLoadAsync finishes.
    private MarbleDataAccessService? _marbleDataAccess;
    private DictionaryService? _dictionary;
    private EncyclopediaService? _encyclopedia;
    private MediaService? _media;
    private SourceLanguageSearchService? _sourceLanguageSearch;
    private TooltipService? _tooltip;
    private IMarbleBookTokenProvider? _bookTokens;
    private IMarbleBookXmlSource? _bookXmlSource;

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
            },
            // EXPERIMENTAL: the entire platform.enhancedResources network object is experimental.
            // Experimental = true cascades x-experimental to the object:{name} existence method and
            // every function; Methods supplies the richer per-method docs.
            new NetworkObjectDocumentation
            {
                Experimental = true,
                Methods = BuildExperimentalDocumentation(),
            }
        );
    }

    /// <summary>
    /// Per-function OpenRPC documentation for every method on this network object, each marked
    /// experimental (<c>x-experimental: true</c>). Object-wide fanout: keys must match the function
    /// names registered in <see cref="BuildFunctionList"/>.
    /// </summary>
    private static Dictionary<
        string,
        OpenRpcSingleMethodDocumentation
    > BuildExperimentalDocumentation() =>
        new()
        {
            ["readInitializeResult"] = Create(
                "Read the current Enhanced Resources initialize result (available resources and load status).",
                result: ResultOf("object", "Initialize result")
            ),
            ["resolveResourceObjectId"] = Create(
                "Resolve an Enhanced Resource id to its backing resource object id.",
                [Param("resourceId", "Enhanced Resource id to resolve.", "string")],
                ResultOf("string", "Resolved resource object id")
            ),
            ["findLinksForScope"] = Create(
                "Find Marble links for a scripture scope.",
                [Param("input", "Scope filter input.")],
                ResultOf("object", "Scope filter result")
            ),
            ["findImagesForReference"] = Create(
                "Find images for a scripture reference.",
                [Param("input", "Image reference input.")],
                ResultOf("object", "Image reference result")
            ),
            ["readDictionaryEntry"] = Create(
                "Read a single dictionary entry.",
                [Param("input", "Dictionary entry input.")],
                ResultOf("object", "Dictionary entry data")
            ),
            ["readArticle"] = Create(
                "Read a single encyclopedia article.",
                [Param("input", "Article input.")],
                ResultOf("object", "Article data")
            ),
            ["buildTooltipData"] = Create(
                "Build tooltip data for a Marble reference.",
                [Param("input", "Tooltip input.")],
                ResultOf("object", "Tooltip data")
            ),
            ["buildNoteData"] = Create(
                "Build note data for a Marble reference.",
                [Param("input", "Note input.")],
                ResultOf("object", "Note data")
            ),
            ["loadDictionary"] = Create(
                "Load dictionary resources.",
                [Param("input", "Dictionary load input.")],
                ResultOf("object", "Dictionary load result")
            ),
            ["loadEncyclopedia"] = Create(
                "Load encyclopedia resources.",
                [Param("input", "Encyclopedia load input.")],
                ResultOf("object", "Encyclopedia load result")
            ),
            ["loadMedia"] = Create(
                "Load media resources.",
                [Param("input", "Media load input.")],
                ResultOf("object", "Media load result")
            ),
            ["findLocalizedGlosses"] = Create(
                "Find localized glosses for source-language lexemes.",
                [Param("input", "Gloss lookup input.")],
                ResultOf("object", "Gloss lookup result")
            ),
            ["translatePartOfSpeech"] = Create(
                "Translate a part-of-speech tag to a localized form.",
                [
                    Param("tag", "Part-of-speech tag.", "string"),
                    Param("language", "Language code.", "string"),
                    Param("form", "Form/variant.", "string"),
                ],
                ResultOf("object", "Part-of-speech translation result")
            ),
            ["executeSourceLanguageSearch"] = Create(
                "Execute a source-language search.",
                [Param("input", "Source-language search input.")],
                ResultOf("object", "Source-language search result")
            ),
            ["fetchImageBytes"] = Create(
                "Fetch image bytes for an Enhanced Resource image (used by the papi-er:// protocol).",
                [Param("input", "Image fetch input.")],
                ResultOf("object", "Image bytes result, or null if unavailable")
            ),
            ["loadMarbleChapterXml"] = Create(
                "Load the raw Marble chapter XML for a resource/book/chapter.",
                [Param("input", "Marble chapter XML load input.")],
                ResultOf("string", "Marble chapter XML")
            ),
        };

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

    /// <summary>Test-only accessor - production callers go through PAPI registration.</summary>
    internal IReadOnlyList<string> GetRegisteredFunctionNamesForTest() =>
        [.. BuildFunctionList().Select(f => f.functionName)];

    private List<(string functionName, Delegate function)> BuildFunctionList() =>
        [
            (
                "readInitializeResult",
                new Func<InitializeResult>(() => Volatile.Read(ref _initializeResult))
            ),
            ("resolveResourceObjectId", new Func<string, string>(ResolveResourceObjectId)),
            (
                "findLinksForScope",
                new Func<ScopeFilterInput, ScopeFilterResult>(input =>
                    RouteWithBookTokens(
                        input.ResourceId,
                        input.CurrentRef.BookNum,
                        tokens => ScopeFilterService.GetLinksForScope(input, tokens)
                    )
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
                new Func<TooltipInput, TooltipData>(input =>
                    RouteTooltip(s => s.GetTooltipData(input))
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
            (
                "loadMarbleChapterXml",
                new Func<LoadMarbleChapterXmlInput, string>(input =>
                    RouteWithBookXml(
                        input.ResourceId,
                        input.BookNum,
                        xml =>
                            MarbleChapterXmlExtractor.ExtractChapter(xml, input.ChapterNumber)
                            ?? throw PlatformErrorCodes.WithCode(
                                PlatformErrorCodes.NotFound,
                                $"Chapter {input.ChapterNumber} not found in book {input.BookNum} of resource '{input.ResourceId}'"
                            )
                    )
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

            // Single shared token provider so its LRU cache is hit across services.
            var bookXmlSource = new MarbleBookXmlSource(data.BiblePackagesByName);
            var bookTokenProvider = new MarbleBookTokenProvider(bookXmlSource);

            var marbleData = new MarbleDataAccessService(
                data.GlossData,
                data.LanguageMapping,
                data.BiblePackages
            );
            var dictionary = new DictionaryService(data.DictionaryData, bookTokenProvider);
            var encyclopedia = new EncyclopediaService(
                data.EncyclopediaData,
                bookTokenProvider,
                marbleData
            );
            var media = new MediaService(data.MediaData);
            var sourceLang = new SourceLanguageSearchService(data.SourceLanguageData, marbleData);
            var tooltip = new TooltipService(marbleData, bookTokenProvider);

            Volatile.Write(
                ref _initializeResult,
                new InitializeResult(
                    HaveMarbleData: marbleData.HaveMarbleData,
                    AvailableResources: [.. data.BiblePackages.Select(b => b.Name)],
                    AvailableGlossLanguages: [.. marbleData.AvailableGlossLanguages],
                    RequiredProjectsMissing: data.MissingRequiredPackages.Count > 0,
                    MissingRequiredPackages: [.. data.MissingRequiredPackages]
                )
            );

            // Publish in dependency order. _bookTokens must be visible before
            // _marbleDataAccess so any reader that sees marble data also sees tokens.
            Volatile.Write(ref _dictionary, dictionary);
            Volatile.Write(ref _encyclopedia, encyclopedia);
            Volatile.Write(ref _media, media);
            Volatile.Write(ref _sourceLanguageSearch, sourceLang);
            Volatile.Write(ref _tooltip, tooltip);
            Volatile.Write(ref _bookXmlSource, bookXmlSource);
            Volatile.Write(ref _bookTokens, bookTokenProvider);
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

    private T RouteWithBookTokens<T>(string resourceId, int bookNum, Func<MarbleToken[], T> call)
    {
        var provider = Volatile.Read(ref _bookTokens);
        if (provider is null)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "Enhanced Resources not yet loaded"
            );
        }
        return call(provider.GetTokens(resourceId, bookNum).ToArray());
    }

    private T RouteWithBookXml<T>(string resourceId, int bookNum, Func<string, T> call)
    {
        var source = Volatile.Read(ref _bookXmlSource);
        if (source is null)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "Enhanced Resources not yet loaded"
            );
        }
        var xml = source.ReadBookXml(resourceId, bookNum);
        if (string.IsNullOrEmpty(xml))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Book {bookNum} not found in resource '{resourceId}'"
            );
        }
        return call(xml);
    }

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

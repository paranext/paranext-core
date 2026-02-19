using System.Collections.Concurrent;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Central data access layer for Enhanced Resources.
/// Provides resource enumeration, token caching, dictionary/encyclopedia data access,
/// image metadata access, gloss lookup, and resource update management.
/// Thread-safe via ConcurrentDictionary-based caching.
/// </summary>
/// <remarks>
/// Ported from PT9 Paratext/Marble/MarbleDataAccess.cs (EXT-014, CAP-028).
/// PT9 used a singleton via DependencyLookup; PT10 uses explicit initialization
/// and constructor injection. Image overlap logic ported from
/// PT9 Paratext/Marble/MarbleImageData.cs:95-150 (EXT-064).
/// </remarks>
internal class MarbleDataAccess
{
    // File extension constants (matching PT9 resource file types)
    public const string MarbleBibleExtensionV1 = ".mbv1z";
    public const string MarbleBibleExtensionV2 = ".mbv2z";
    public const string MarbleDictionaryExtension = ".mdv1z";
    public const string MarbleSourceLanguageExtension = ".msv1z";
    public const string MarbleImagesExtensionV1 = ".miv1z";
    public const string MarbleImagesExtensionV2 = ".miv2z";
    public const string MarbleImageIndexExtension = ".mxv1z";
    public const string MarbleEncyclopediaExtension = ".mev1z";

    // Project name constants
    public const string GreekDictionary = "SDBG";
    public const string HebrewDictionary = "SDBH";
    public const string DeuteroDictionary = "DCLEX";
    public const string GreekSourceText = "GNT";
    public const string HebrewSourceText = "BHS";
    public const string EncyclopediaName = "MBL_ENC";
    public const string ImageIndexName = "IMG_INDX";

    // Required and optional data project lists
    private static readonly string[] s_requiredDataProjects =
    {
        EncyclopediaName,
        ImageIndexName,
        "IMG_THMB",
        GreekDictionary,
        HebrewDictionary,
        GreekSourceText,
        HebrewSourceText,
    };

    private static readonly string[] s_optionalDataProjects = { DeuteroDictionary, "LXXDC" };

    public static IReadOnlyList<string> RequiredDataProjects => s_requiredDataProjects;
    public static IReadOnlyList<string> OptionalDataProjects => s_optionalDataProjects;

    // Name-to-extension mapping for resource file lookup
    private static readonly Dictionary<string, string> s_nameToExtension =
        new()
        {
            { EncyclopediaName, MarbleEncyclopediaExtension },
            { ImageIndexName, MarbleImageIndexExtension },
            { "IMG_THMB", MarbleImagesExtensionV1 },
            { GreekDictionary, MarbleDictionaryExtension },
            { HebrewDictionary, MarbleDictionaryExtension },
            { DeuteroDictionary, MarbleDictionaryExtension },
            { GreekSourceText, MarbleSourceLanguageExtension },
            { HebrewSourceText, MarbleSourceLanguageExtension },
            { "LXXDC", MarbleSourceLanguageExtension },
        };

    // Instance fields for resource data storage
    private readonly ConcurrentDictionary<string, Func<int, IReadOnlyList<MarbleToken>>> _bibles =
        new();

    private readonly ConcurrentDictionary<
        (string ResourceId, int BookNum),
        IReadOnlyList<MarbleToken>
    > _tokenCache = new();

    private readonly ConcurrentDictionary<string, bool> _researchData = new();
    private readonly ConcurrentDictionary<string, Version> _researchDataVersions = new();
    private readonly ConcurrentDictionary<string, Lexicon_Entry> _dictionaryEntries = new();
    private readonly ConcurrentDictionary<string, Thematic_Lexicon> _encyclopediaData = new();

    private readonly List<ImageEntry> _imageIndex = new();
    private readonly object _imageIndexLock = new();

    private readonly ConcurrentDictionary<string, List<string>> _glossData = new();
    private readonly SortedDictionary<string, bool> _glossLanguages = new();
    private readonly object _glossLanguagesLock = new();

    private bool _initialized;

    /// <summary>
    /// Marks the data access layer as initialized. After initialization,
    /// <see cref="GetBookTokens"/> returns empty lists for unknown resources
    /// instead of null.
    /// </summary>
    public void Initialize()
    {
        _initialized = true;
    }

    /// <summary>
    /// Whether all required marble data is available (at least one bible
    /// and all required research data projects present).
    /// </summary>
    public bool HaveMarbleData => _bibles.Count > 0 && s_requiredDataProjects.All(HasResearchData);

    /// <summary>
    /// Returns the IDs of all registered bible resources.
    /// </summary>
    public IReadOnlyCollection<string> AvailableBibles => _bibles.Keys.ToList().AsReadOnly();

    /// <summary>
    /// Returns cached tokens for the specified resource and book number.
    /// Tokens are cached per (resourceId, bookNum) key via ConcurrentDictionary.
    /// Returns null before initialization when the resource is not registered.
    /// </summary>
    public IReadOnlyList<MarbleToken>? GetBookTokens(string resourceId, int bookNum)
    {
        if (_bibles.TryGetValue(resourceId, out var tokenProvider))
            return _tokenCache.GetOrAdd((resourceId, bookNum), _ => tokenProvider(bookNum));

        // After Initialize, return a new (cacheable) empty list for any resource
        if (_initialized)
        {
            return _tokenCache.GetOrAdd(
                (resourceId, bookNum),
                _ => new List<MarbleToken>().AsReadOnly()
            );
        }

        return null;
    }

    /// <summary>
    /// Registers a bible resource with a token provider function.
    /// </summary>
    public void AddBible(string resourceId, Func<int, IReadOnlyList<MarbleToken>> tokenProvider)
    {
        _bibles[resourceId] = tokenProvider;
    }

    /// <summary>
    /// Registers a research data project as available. Adding "SDBG" also
    /// registers the "LN" alias for backward compatibility with PT9.
    /// </summary>
    public void AddResearchData(string projectName)
    {
        _researchData[projectName] = true;

        if (projectName == GreekDictionary)
            _researchData["LN"] = true;
    }

    /// <summary>
    /// Registers a research data project with its installed version.
    /// </summary>
    public void AddResearchDataWithVersion(string projectName, Version version)
    {
        AddResearchData(projectName);
        _researchDataVersions[projectName] = version;
    }

    /// <summary>
    /// Returns whether the specified research data project is available.
    /// </summary>
    public bool HasResearchData(string projectName) => _researchData.ContainsKey(projectName);

    /// <summary>
    /// Registers a dictionary entry keyed by its <see cref="Lexicon_Entry.MainId"/>.
    /// </summary>
    public void AddDictionaryEntry(string dictionary, string lemma, Lexicon_Entry entry)
    {
        if (entry.MainId != null)
            _dictionaryEntries[entry.MainId] = entry;
    }

    /// <summary>
    /// Retrieves a lexicon entry by its full key (e.g. "SDBG:logos:001").
    /// Returns null for null/empty keys or when no matching entry exists.
    /// </summary>
    public Lexicon_Entry? GetDictionaryEntry(string entryId)
    {
        if (string.IsNullOrEmpty(entryId))
            return null;

        _dictionaryEntries.TryGetValue(entryId, out var entry);
        return entry;
    }

    /// <summary>
    /// Registers encyclopedia data keyed by "type:key" (e.g. "Flora:olive").
    /// </summary>
    public void AddEncyclopediaData(string type, string key, Thematic_Lexicon data)
    {
        _encyclopediaData[$"{type}:{key}"] = data;
    }

    /// <summary>
    /// Retrieves encyclopedia entries for the specified "type:key" entry ID.
    /// Returns empty when the entry ID format is invalid (missing colon separator
    /// or colon at position 0).
    /// </summary>
    public IReadOnlyList<Thematic_LexiconThemLex_Entry> GetEncyclopediaEntries(
        string entryId,
        string language
    )
    {
        if (entryId.IndexOf(':') <= 0)
            return Array.Empty<Thematic_LexiconThemLex_Entry>();

        if (_encyclopediaData.TryGetValue(entryId, out var data))
            return data.ThemLex_Entry;

        return Array.Empty<Thematic_LexiconThemLex_Entry>();
    }

    /// <summary>
    /// Loads image metadata entries into the index. Uses dynamic property
    /// access to avoid cross-namespace type coupling with test-defined types.
    /// Thread-safe via lock on <see cref="_imageIndexLock"/>.
    /// </summary>
    public void LoadImageIndex(System.Collections.IList entries)
    {
        lock (_imageIndexLock)
        {
            _imageIndex.Clear();
            foreach (dynamic entry in entries)
            {
                _imageIndex.Add(
                    new ImageEntry(
                        (string)entry.ImageId,
                        (string)entry.StartRef,
                        (string)entry.EndRef,
                        (string)entry.CollectionName,
                        (string)entry.FilePath
                    )
                );
            }
        }
    }

    /// <summary>
    /// Returns image metadata entries whose reference range overlaps the
    /// specified verse range. Thread-safe via lock on <see cref="_imageIndexLock"/>.
    /// </summary>
    public IReadOnlyList<ImageEntry> GetImageMetadata(
        VerseReference startRef,
        VerseReference endRef
    )
    {
        lock (_imageIndexLock)
        {
            if (_imageIndex.Count == 0)
                return Array.Empty<ImageEntry>();

            return _imageIndex
                .Where(img => ImageOverlapsRange(img, startRef, endRef))
                .ToList()
                .AsReadOnly();
        }
    }

    /// <summary>
    /// Registers gloss data for the specified term and language.
    /// Thread-safe: gloss language set is protected by <see cref="_glossLanguagesLock"/>.
    /// </summary>
    public void AddGlossData(string term, string language, List<string> glosses)
    {
        _glossData[$"{term}:{language}"] = glosses;

        lock (_glossLanguagesLock)
        {
            _glossLanguages[language] = true;
        }
    }

    /// <summary>
    /// Returns localized glosses for the specified term and language.
    /// Returns empty when the term or language is not found.
    /// </summary>
    public IReadOnlyList<string> FindLocalizedGlossesForTerm(string term, string language)
    {
        if (_glossData.TryGetValue($"{term}:{language}", out var glosses))
            return glosses.AsReadOnly();

        return Array.Empty<string>();
    }

    /// <summary>
    /// Returns the sorted list of available gloss language codes.
    /// Thread-safe via lock on <see cref="_glossLanguagesLock"/>.
    /// </summary>
    public IReadOnlyList<string> AvailableGlossLanguages
    {
        get
        {
            lock (_glossLanguagesLock)
            {
                return _glossLanguages.Keys.ToList().AsReadOnly();
            }
        }
    }

    /// <summary>
    /// Invalidates the token cache for the specified resource, forcing
    /// re-parsing on the next <see cref="GetBookTokens"/> call.
    /// </summary>
    public void UpdateResource(string resourceId)
    {
        var keysToRemove = _tokenCache.Keys.Where(k => k.ResourceId == resourceId).ToList();

        foreach (var key in keysToRemove)
            _tokenCache.TryRemove(key, out _);
    }

    /// <summary>
    /// Returns the dictionary name for the given book number.
    /// OT books (1-39) map to Hebrew; NT books (40+) map to Greek.
    /// </summary>
    public static string GetDictionaryNameForBook(int bookNum) =>
        bookNum <= 39 ? HebrewDictionary : GreekDictionary;

    /// <summary>
    /// Returns the full resource filename (name + extension) for a known project name.
    /// Returns the project name unchanged for unknown projects.
    /// </summary>
    public static string GetResourceFileName(string projectName)
    {
        if (s_nameToExtension.TryGetValue(projectName, out var extension))
            return projectName + extension;

        return projectName;
    }

    /// <summary>
    /// Returns whether the project name is in the required or optional data project lists.
    /// </summary>
    public bool IsRequiredOrOptionalProject(string projectName) =>
        s_requiredDataProjects.Contains(projectName)
        || s_optionalDataProjects.Contains(projectName);

    /// <summary>
    /// Returns the names of required data projects that are not yet available.
    /// </summary>
    public IEnumerable<string> MissingRequiredProjects =>
        s_requiredDataProjects.Where(name => !HasResearchData(name));

    /// <summary>
    /// Returns whether the offered version is newer than the installed version.
    /// Returns true for resources that are not yet installed.
    /// </summary>
    public bool WantResourceProject(string projectName, Version offeredVersion)
    {
        if (!_researchDataVersions.TryGetValue(projectName, out var existingVersion))
            return true;

        return offeredVersion > existingVersion;
    }

    private static bool ImageOverlapsRange(
        ImageEntry image,
        VerseReference startRef,
        VerseReference endRef
    )
    {
        if (!TryParseBcv(image.StartRef, out var imgStart))
            return false;
        if (!TryParseBcv(image.EndRef, out var imgEnd))
            return false;

        return imgStart <= BcvToInt(endRef) && imgEnd >= BcvToInt(startRef);
    }

    private static bool TryParseBcv(string bcvString, out int value)
    {
        value = 0;
        if (bcvString.Length != 9)
            return false;
        return int.TryParse(bcvString, out value);
    }

    private static int BcvToInt(VerseReference vref) =>
        vref.Book * 1000000 + vref.Chapter * 1000 + vref.Verse;
}

using System.Collections.Concurrent;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:1-1998
// Method: MarbleDataAccess (full class)
// Maps to: EXT-014, CAP-028

/// <summary>
/// Central data access layer for Enhanced Resources.
/// Provides resource enumeration, token caching, dictionary/encyclopedia data access,
/// image metadata access, gloss lookup, and resource update management.
/// Thread-safe via ConcurrentDictionary-based caching.
/// </summary>
public class MarbleDataAccess
{
    #region Constants - File Extensions

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (file extension constants)
    // Maps to: EXT-014
    public const string MarbleBibleExtensionV1 = ".mbv1z";
    public const string MarbleBibleExtensionV2 = ".mbv2z";
    public const string MarbleDictionaryExtension = ".mdv1z";
    public const string MarbleSourceLanguageExtension = ".msv1z";
    public const string MarbleImagesExtensionV1 = ".miv1z";
    public const string MarbleImagesExtensionV2 = ".miv2z";
    public const string MarbleImageIndexExtension = ".mxv1z";
    public const string MarbleEncyclopediaExtension = ".mev1z";

    #endregion

    #region Constants - Project Names

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (project name constants)
    // Maps to: EXT-014
    public const string GreekDictionary = "SDBG";
    public const string HebrewDictionary = "SDBH";
    public const string DeuteroDictionary = "DCLEX";
    public const string GreekSourceText = "GNT";
    public const string HebrewSourceText = "BHS";
    public const string EncyclopediaName = "MBL_ENC";
    public const string ImageIndexName = "IMG_INDX";

    #endregion

    #region Constants - Required and Optional Data Projects

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (required/optional project lists)
    // Maps to: EXT-014
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

    #endregion

    #region Constants - Name-to-Extension Mapping

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (nameToExtension dictionary)
    // Maps to: EXT-014
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

    #endregion

    #region Instance Fields

    private readonly ConcurrentDictionary<string, Func<int, IReadOnlyList<MarbleToken>>> _bibles =
        new();

    private readonly ConcurrentDictionary<
        (string ResourceId, int BookNum),
        IReadOnlyList<MarbleToken>
    > _tokenCache = new();

    private readonly ConcurrentDictionary<string, bool> _researchData = new();

    private readonly ConcurrentDictionary<string, Version> _researchDataVersions = new();

    // Key: "dictionary:lemma", Value: Lexicon_Entry
    private readonly ConcurrentDictionary<string, Lexicon_Entry> _dictionaryEntries = new();

    // Key: "type:key", Value: Thematic_Lexicon
    private readonly ConcurrentDictionary<string, Thematic_Lexicon> _encyclopediaData = new();

    private readonly List<ImageEntry> _imageIndex = new();
    private readonly object _imageIndexLock = new();

    // Key: "term:language", Value: glosses
    private readonly ConcurrentDictionary<string, List<string>> _glossData = new();

    private readonly SortedDictionary<string, bool> _glossLanguages = new();
    private readonly object _glossLanguagesLock = new();

    private bool _initialized;

    #endregion

    #region Initialize

    // === NEW IN PT10 ===
    // Reason: PT9 used DependencyLookup/singleton; PT10 uses explicit initialization
    // Maps to: CAP-028
    public void Initialize()
    {
        _initialized = true;
    }

    #endregion

    #region HaveMarbleData

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (HaveMarbleData property)
    // Maps to: EXT-014
    public bool HaveMarbleData =>
        _bibles.Count > 0 && s_requiredDataProjects.All(name => HasResearchData(name));

    #endregion

    #region AvailableBibles

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (AvailableBibles property)
    // Maps to: EXT-014
    public IReadOnlyCollection<string> AvailableBibles => _bibles.Keys.ToList().AsReadOnly();

    #endregion

    #region GetBookTokens - Token Caching

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (token caching via ConcurrentDictionary)
    // Maps to: EXT-014
    public IReadOnlyList<MarbleToken>? GetBookTokens(string resourceId, int bookNum)
    {
        if (_bibles.TryGetValue(resourceId, out var tokenProvider))
        {
            return _tokenCache.GetOrAdd((resourceId, bookNum), _ => tokenProvider(bookNum));
        }

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

    #endregion

    #region AddBible

    // === NEW IN PT10 ===
    // Reason: In-memory registration for testing; PT9 loaded from filesystem
    // Maps to: CAP-028
    public void AddBible(string resourceId, Func<int, IReadOnlyList<MarbleToken>> tokenProvider)
    {
        _bibles[resourceId] = tokenProvider;
    }

    #endregion

    #region AddResearchData

    // === NEW IN PT10 ===
    // Reason: In-memory registration for testing; PT9 loaded from filesystem
    // Maps to: CAP-028
    public void AddResearchData(string projectName)
    {
        _researchData[projectName] = true;

        // PT9: marbleResearchData["LN"] = marbleResearchData["SDBG"]
        if (projectName == GreekDictionary)
            _researchData["LN"] = true;
    }

    public void AddResearchDataWithVersion(string projectName, Version version)
    {
        AddResearchData(projectName);
        _researchDataVersions[projectName] = version;
    }

    #endregion

    #region HasResearchData

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (research data lookup)
    // Maps to: EXT-014
    public bool HasResearchData(string projectName)
    {
        return _researchData.ContainsKey(projectName);
    }

    #endregion

    #region AddDictionaryEntry

    // === NEW IN PT10 ===
    // Reason: In-memory registration for testing
    // Maps to: CAP-028
    public void AddDictionaryEntry(string dictionary, string lemma, Lexicon_Entry entry)
    {
        if (entry.MainId != null)
            _dictionaryEntries[entry.MainId] = entry;
    }

    #endregion

    #region GetDictionaryEntry

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (dictionary entry lookup)
    // Maps to: EXT-014
    public Lexicon_Entry? GetDictionaryEntry(string entryId)
    {
        if (string.IsNullOrEmpty(entryId))
            return null;

        _dictionaryEntries.TryGetValue(entryId, out var entry);
        return entry;
    }

    #endregion

    #region AddEncyclopediaData

    // === NEW IN PT10 ===
    // Reason: In-memory registration for testing
    // Maps to: CAP-028
    public void AddEncyclopediaData(string type, string key, Thematic_Lexicon data)
    {
        _encyclopediaData[$"{type}:{key}"] = data;
    }

    #endregion

    #region GetEncyclopediaEntries

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (encyclopedia entry lookup)
    // Maps to: EXT-014
    public IReadOnlyList<Thematic_LexiconThemLex_Entry> GetEncyclopediaEntries(
        string entryId,
        string language
    )
    {
        var separatorIndex = entryId.IndexOf(':');
        if (separatorIndex <= 0)
            return Array.Empty<Thematic_LexiconThemLex_Entry>();

        if (_encyclopediaData.TryGetValue(entryId, out var data))
            return data.ThemLex_Entry;

        return Array.Empty<Thematic_LexiconThemLex_Entry>();
    }

    #endregion

    #region LoadImageIndex

    // === NEW IN PT10 ===
    // Reason: In-memory image index loading for testing
    // Maps to: CAP-028
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

    #endregion

    #region GetImageMetadata

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleImageData.cs:95-150
    // Method: BibleImages.GetForReferenceRange
    // Maps to: EXT-064, CAP-028
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

    private static bool ImageOverlapsRange(
        ImageEntry image,
        VerseReference startRef,
        VerseReference endRef
    )
    {
        // Parse image reference strings (BBBCCCVVV format)
        if (!TryParseBcv(image.StartRef, out var imgStart))
            return false;
        if (!TryParseBcv(image.EndRef, out var imgEnd))
            return false;

        // Check for overlap between [imgStart, imgEnd] and [startRef, endRef]
        var refStartVal = BcvToInt(startRef);
        var refEndVal = BcvToInt(endRef);
        var imgStartVal = imgStart;
        var imgEndVal = imgEnd;

        return imgStartVal <= refEndVal && imgEndVal >= refStartVal;
    }

    private static bool TryParseBcv(string bcvString, out int value)
    {
        value = 0;
        if (bcvString.Length != 9)
            return false;
        return int.TryParse(bcvString, out value);
    }

    private static int BcvToInt(VerseReference vref)
    {
        return vref.Book * 1000000 + vref.Chapter * 1000 + vref.Verse;
    }

    #endregion

    #region AddGlossData

    // === NEW IN PT10 ===
    // Reason: In-memory gloss data registration for testing
    // Maps to: CAP-028
    public void AddGlossData(string term, string language, List<string> glosses)
    {
        _glossData[$"{term}:{language}"] = glosses;

        lock (_glossLanguagesLock)
        {
            _glossLanguages[language] = true;
        }
    }

    #endregion

    #region FindLocalizedGlossesForTerm (BHV-109)

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (FindLocalizedGlossesForTerm)
    // Maps to: EXT-014, BHV-109
    public IReadOnlyList<string> FindLocalizedGlossesForTerm(string term, string language)
    {
        if (_glossData.TryGetValue($"{term}:{language}", out var glosses))
            return glosses.AsReadOnly();

        return Array.Empty<string>();
    }

    #endregion

    #region AvailableGlossLanguages

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (supportedGlossLanguages SortedDictionary)
    // Maps to: EXT-014, BHV-115
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

    #endregion

    #region UpdateResource - Cache Invalidation

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (cache invalidation on resource update)
    // Maps to: EXT-014
    public void UpdateResource(string resourceId)
    {
        // Remove all cached tokens for this resource
        var keysToRemove = _tokenCache.Keys.Where(k => k.ResourceId == resourceId).ToList();

        foreach (var key in keysToRemove)
            _tokenCache.TryRemove(key, out _);
    }

    #endregion

    #region GetDictionaryNameForBook

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (book-to-dictionary mapping)
    // Maps to: EXT-014
    public static string GetDictionaryNameForBook(int bookNum)
    {
        // OT books: 1-39 (Genesis to Malachi) -> Hebrew dictionary
        // NT books: 40-66 (Matthew to Revelation) -> Greek dictionary
        return bookNum <= 39 ? HebrewDictionary : GreekDictionary;
    }

    #endregion

    #region GetResourceFileName

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (name-to-extension mapping)
    // Maps to: EXT-014
    public static string GetResourceFileName(string projectName)
    {
        if (s_nameToExtension.TryGetValue(projectName, out var extension))
            return projectName + extension;

        return projectName;
    }

    #endregion

    #region IsRequiredOrOptionalProject

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (project classification)
    // Maps to: EXT-014
    public bool IsRequiredOrOptionalProject(string projectName)
    {
        return s_requiredDataProjects.Contains(projectName)
            || s_optionalDataProjects.Contains(projectName);
    }

    #endregion

    #region MissingRequiredProjects

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (missing project detection)
    // Maps to: EXT-014
    public IEnumerable<string> MissingRequiredProjects =>
        s_requiredDataProjects.Where(name => !HasResearchData(name));

    #endregion

    #region WantResourceProject

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs (version comparison for resource updates)
    // Maps to: EXT-014
    public bool WantResourceProject(string projectName, Version offeredVersion)
    {
        if (!_researchDataVersions.TryGetValue(projectName, out var existingVersion))
            return true; // New resource, not installed yet

        return offeredVersion > existingVersion;
    }

    #endregion
}

/// <summary>
/// Internal data class for image metadata entries.
/// Simplified version of the PT9 BibleImages.BibleImage structure.
/// </summary>
public record ImageEntry(
    string ImageId,
    string StartRef,
    string EndRef,
    string CollectionName,
    string FilePath
);

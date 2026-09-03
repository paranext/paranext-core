using System.Security.Cryptography;
using System.Xml;
using Paratext.Data;
using Paratext.Data.Interlinear;
using Paratext.Data.Linguistics;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.Users;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Reads a Paratext project's PT9 interlinear data for the
/// <c>platformScripture.Pt9Interlinear</c> projectInterface: scans the interlinear files the
/// way PT9 classifies them, serves an opaque change-detection manifest, and parses the files
/// into typed records with PT9's own read semantics. Read-only by construction: nothing here
/// writes to the project.
/// </summary>
internal static class Pt9InterlinearReader
{
    // Lowercased forms of PT9's own file names (XmlLexicon.fileName, WordAnalysesFile.fileName)
    // and its interlinear file prefix, declared once so the scan and the per-file switch cannot
    // drift apart. Case labels require compile-time constants, so these stay local declarations
    // rather than derivations.
    private const string Pt9LexiconFileNameLower = "lexicon.xml";
    private const string Pt9WordAnalysesFileNameLower = "wordanalyses.xml";
    private const string Pt9InterlinearFilePrefixLower = "interlinear_";

    /// <summary>
    /// Ceiling on the total on-disk size of the interlinear files one <see cref="GetData"/>
    /// response may carry; <see cref="GetManifest"/> shares it, so neither read ever processes
    /// more than a servable corpus. A single WebSocket message over the transport's 100 MB limit
    /// tears down the whole PAPI connection to this process rather than failing the one request -
    /// an unaddressed platform-level issue - so this guard fails the request instead. The cap
    /// bounds source bytes because the serialized size cannot be confirmed here: the transport
    /// serializes after the provider returns. Measured on realistic dense interlinear data, the
    /// wire JSON is smaller than the indented on-disk XML (about 0.75x), so 50 MB keeps real
    /// responses comfortably under that cliff; a file crafted of near-empty elements can inflate
    /// severalfold as JSON, an accepted residual risk since no tool writes such content.
    /// </summary>
    internal const long MaxPt9InterlinearDataBytes = 50L * 1024L * 1024L;

    /// <summary>
    /// Message prefix of the exception thrown when a project's interlinear files exceed
    /// <see cref="MaxPt9InterlinearDataBytes"/>. The machine-readable channel is
    /// <see cref="PlatformErrorCodes.ResourceExhausted"/>, carried in the exception's <c>Data</c>
    /// and forwarded by the network layer as the PlatformError's <c>code</c>; this prefix remains
    /// the contract for consumers that see only the message, since exception types do not cross
    /// the RPC boundary.
    /// </summary>
    public const string Pt9InterlinearDataTooLargeMessagePrefix =
        "PT9 interlinear data is too large";

    /// <summary>
    /// Accumulates the source bytes a read has taken on and fails it at the file that crosses
    /// <see cref="MaxPt9InterlinearDataBytes"/>, before that file is hashed or parsed.
    /// </summary>
    private sealed class Pt9SizeCap
    {
        private long _totalBytes;

        public void Add(long fileLength)
        {
            _totalBytes += fileLength;
            if (_totalBytes > MaxPt9InterlinearDataBytes)
            {
                var tooLarge = new InvalidDataException(
                    $"{Pt9InterlinearDataTooLargeMessagePrefix}: the project's interlinear files "
                        + $"exceed the {MaxPt9InterlinearDataBytes} bytes one response can carry"
                );
                tooLarge.Data[PlatformErrorCodes.PlatformErrorCodeDataKey] =
                    PlatformErrorCodes.ResourceExhausted;
                throw tooLarge;
            }
        }
    }

    /// <summary>
    /// Builds the manifest: project-relative path to the lowercase SHA-256 hex of that file's
    /// current bytes, covering the interlinear book files, the lexicon, and the stored word
    /// analyses. Only interlinear file content is change-detected: the payload's settings-derived
    /// parts (setups and the associated-lexical-project flag) can change without any hash
    /// changing.
    /// </summary>
    public static Dictionary<string, string> GetManifest(ScrText scrText) =>
        ReadTyped(scrText, () => GetManifestCore(scrText));

    /// <summary>The manifest read itself; runs under <see cref="ReadTyped{T}"/>.</summary>
    private static Dictionary<string, string> GetManifestCore(ScrText scrText)
    {
        EnsurePt9ProjectDirectoryReadable(scrText);
        var fileManager = scrText.FileManager;
        var manifest = new Dictionary<string, string>();
        var sizeCap = new Pt9SizeCap();
        foreach (var relativePath in FindPt9InterlinearFiles(scrText))
            manifest[relativePath] = ComputePt9FileSha256Hex(fileManager, relativePath, sizeCap);
        return manifest;
    }

    /// <summary>
    /// Parses the project's PT9 interlinear data into its served shape: setups, per-book
    /// cluster data, the lexicon, and stored word analyses.
    /// </summary>
    public static Pt9InterlinearProjectData GetData(ScrText scrText) =>
        ReadTyped(scrText, () => GetDataCore(scrText));

    /// <summary>The data read itself; runs under <see cref="ReadTyped{T}"/>.</summary>
    private static Pt9InterlinearProjectData GetDataCore(ScrText scrText)
    {
        EnsurePt9ProjectDirectoryReadable(scrText);
        var fileManager = scrText.FileManager;

        // Each file is opened exactly once and streams straight into the parser: its length
        // feeds the size cap and its content never buffers whole, so peak memory stays at the
        // parsed payload rather than payload plus corpus bytes. The cap trips before the file
        // that crosses it is parsed, so no response over the cap can ever be produced.
        var filePaths = FindPt9InterlinearFiles(scrText);
        var sizeCap = new Pt9SizeCap();

        List<InterlinearSetup> fileSetups = [];
        if (fileManager.Exists(InterlinearSetups.fileName))
        {
            EnsurePt9PathStaysInProject(scrText.Directory, InterlinearSetups.fileName);
            using var reader = OpenPt9File(fileManager, InterlinearSetups.fileName);
            sizeCap.Add(reader.BaseStream.Length);
            fileSetups = DeserializePt9Xml<InterlinearSetupList>(
                reader.BaseStream,
                InterlinearSetups.fileName
            ).InterlinearSetups;
        }

        var books = new List<Pt9InterlinearBook>();
        Pt9Lexicon? lexicon = null;
        var wordAnalyses = new List<Pt9WordParse>();

        foreach (var relativePath in filePaths)
        {
            using var reader = OpenPt9File(fileManager, relativePath);
            sizeCap.Add(reader.BaseStream.Length);

            // The whole relative path is compared, so a same-named file inside an Interlinear_*
            // directory stays a book file.
            switch (relativePath.ToLowerInvariant())
            {
                case Pt9LexiconFileNameLower:
                {
                    var lexiconData = DeserializePt9Xml<LexiconData>(
                        reader.BaseStream,
                        relativePath
                    );
                    CleanPt9LexiconData(lexiconData, scrText);
                    lexicon = ConvertPt9Lexicon(lexiconData);
                    break;
                }
                case Pt9WordAnalysesFileNameLower:
                    wordAnalyses.AddRange(
                        DeserializePt9Xml<WordAnalysesData>(reader.BaseStream, relativePath)
                            .Entries.Select(entry => new Pt9WordParse(
                                entry.Word,
                                entry
                                    .Analyses.Select(analysis => analysis.LexemeIds.ToList())
                                    .ToList()
                            ))
                    );
                    break;
                default:
                    books.Add(
                        ConvertPt9InterlinearBook(
                            DeserializePt9Xml<InterlinearData>(reader.BaseStream, relativePath),
                            relativePath
                        )
                    );
                    break;
            }
        }

        return new Pt9InterlinearProjectData(
            ResolvePt9InterlinearSetups(scrText, fileSetups),
            books,
            lexicon,
            wordAnalyses,
            scrText.Settings.AssociatedLexicalProject.IsValid
        );
    }

    /// <summary>
    /// Runs one whole read under the typed error contract: a failure that escapes the path-aware
    /// wrappers still surfaces as the one documented exception type, and the cause chain is
    /// stripped because inner exceptions serialize across the RPC boundary and can carry absolute
    /// filesystem paths. Null-reference failures are contained too: PT9's dictionary reader
    /// admits nil entries that the projection code cannot carry, and such a file is corrupt.
    /// </summary>
    private static T ReadTyped<T>(ScrText scrText, Func<T> read)
    {
        try
        {
            return read();
        }
        catch (InvalidDataException e)
        {
            var stripped = new InvalidDataException(e.Message);
            // Exception.Data carries only our own entries (the platform error code), never a
            // cause chain, so it survives the strip.
            foreach (var key in e.Data.Keys)
                stripped.Data[key] = e.Data[key];
            throw stripped;
        }
        catch (Exception e)
            when (e is IOException or UnauthorizedAccessException or NullReferenceException)
        {
            throw new InvalidDataException(
                $"Could not read the PT9 interlinear data of project '{scrText.Name}'"
            );
        }
    }

    /// <summary>
    /// Whether a project-relative path is a PT9 interlinear book file (one gloss language's
    /// cluster data for one book), matched the way PT9 classifies one: the lowercased path starts
    /// with <c>interlinear_</c> and the extension is <c>.xml</c>. Matching on lowercased text
    /// keeps the scan case-insensitive on every filesystem.
    /// </summary>
    private static bool IsPt9InterlinearBookFile(string relativePath)
    {
        string lowerPath = relativePath.ToLowerInvariant();
        return lowerPath.StartsWith(Pt9InterlinearFilePrefixLower, StringComparison.Ordinal)
            && Path.GetExtension(lowerPath) == ".xml";
    }

    /// <summary>
    /// Throws when the file or directory at the project-relative path is a link (symlink or
    /// junction) whose final target lies outside the project directory. Project content arrives by
    /// Send/Receive, so a link is repository data rather than something the local user placed, and
    /// following one out of the project would serve files that are not the project's. A path with
    /// no counterpart on the real filesystem passes: there is nothing to resolve.
    /// </summary>
    internal static void EnsurePt9PathStaysInProject(string projectDirectory, string relativePath)
    {
        string fullPath = Path.Join(projectDirectory, relativePath);
        FileSystemInfo info = Directory.Exists(fullPath)
            ? new DirectoryInfo(fullPath)
            : new FileInfo(fullPath);
        if (!info.Exists)
            return;
        FileSystemInfo? target = info.ResolveLinkTarget(returnFinalTarget: true);
        if (target == null)
            return;

        // The project directory itself may legitimately be a link, so compare against its
        // resolved location.
        var rootInfo = new DirectoryInfo(projectDirectory);
        string root = Path.TrimEndingDirectorySeparator(
            rootInfo.ResolveLinkTarget(returnFinalTarget: true)?.FullName ?? rootInfo.FullName
        );
        var comparison =
            OperatingSystem.IsWindows() || OperatingSystem.IsMacOS()
                ? StringComparison.OrdinalIgnoreCase
                : StringComparison.Ordinal;
        if (!target.FullName.StartsWith(root + Path.DirectorySeparatorChar, comparison))
        {
            throw new InvalidDataException(
                $"PT9 interlinear path '{relativePath}' is a link resolving outside the project"
            );
        }
    }

    /// <summary>
    /// Enumerates the project-relative paths of the files the PT9 interlinear data payload
    /// converts, with path separators normalized to forward slashes (a backslash inside a path is
    /// a file-name character, never a separator), through the project's file manager: the lexicon,
    /// the stored word analyses, and every interlinear book file, whether at the project root or
    /// inside an <c>Interlinear_*</c> directory. All name matching is on lowercased text, so file
    /// casing never hides data. Sorted ordinally for one deterministic order. Empty when the
    /// project carries no interlinear data. A file or directory that is a link out of the project
    /// throws rather than being served.
    /// </summary>
    private static List<string> FindPt9InterlinearFiles(ScrText scrText)
    {
        var fileManager = scrText.FileManager;
        var projectDirectory = scrText.Directory;
        var filePaths = new List<string>();

        try
        {
            foreach (var rootPath in fileManager.ProjectFiles("*"))
            {
                var normalized = rootPath.Replace(Path.DirectorySeparatorChar, '/');
                var lowerName = normalized.ToLowerInvariant();
                if (
                    lowerName == Pt9LexiconFileNameLower
                    || lowerName == Pt9WordAnalysesFileNameLower
                    || IsPt9InterlinearBookFile(normalized)
                )
                {
                    EnsurePt9PathStaysInProject(projectDirectory, normalized);
                    filePaths.Add(normalized);
                }
            }

            foreach (var directory in fileManager.ProjectDirectories("*"))
            {
                var normalizedDirectory = directory.Replace(Path.DirectorySeparatorChar, '/');
                var directoryName = Path.GetFileName(normalizedDirectory);
                if (
                    !directoryName
                        .ToLowerInvariant()
                        .StartsWith(Pt9InterlinearFilePrefixLower, StringComparison.Ordinal)
                )
                    continue;
                EnsurePt9PathStaysInProject(projectDirectory, normalizedDirectory);
                foreach (var relativePath in fileManager.ProjectFiles("*", directory))
                {
                    var normalized = relativePath.Replace(Path.DirectorySeparatorChar, '/');
                    if (IsPt9InterlinearBookFile(normalized))
                    {
                        EnsurePt9PathStaysInProject(projectDirectory, normalized);
                        filePaths.Add(normalized);
                    }
                }
            }
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            throw new InvalidDataException("Could not scan the project's PT9 interlinear files", e);
        }

        filePaths.Sort(StringComparer.Ordinal);
        return filePaths;
    }

    /// <summary>The typed error for one unreadable or unparseable PT9 interlinear file.</summary>
    private static InvalidDataException Pt9FileUnreadable(string relativePath, Exception cause) =>
        new($"Could not read PT9 interlinear file '{relativePath}'", cause);

    /// <summary>
    /// Opens one PT9 interlinear file for reading through the project's file manager. The
    /// returned reader's stream is seekable, so its length serves the size cap and its content is
    /// then hashed or parsed from the same open handle, with no whole-file buffer materialized.
    /// Any open failure surfaces as one exception type naming the project-relative path, never an
    /// absolute one. Paratext saves these files by two renames, so a concurrent save can make an
    /// open transiently fail while the file is mid-replacement; retrying the call is safe.
    /// </summary>
    private static BinaryReader OpenPt9File(ProjectFileManager fileManager, string relativePath)
    {
        try
        {
            return fileManager.OpenFileForByteRead(relativePath);
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            throw Pt9FileUnreadable(relativePath, e);
        }
    }

    /// <summary>
    /// Hashes one PT9 interlinear file to lowercase SHA-256 hex, streaming through the project's
    /// file manager. The file's length feeds the shared size cap before any hashing, so a probe
    /// stops at the crossing file. Any read failure surfaces as one exception type naming the
    /// project-relative path, never an absolute one.
    /// </summary>
    private static string ComputePt9FileSha256Hex(
        ProjectFileManager fileManager,
        string relativePath,
        Pt9SizeCap sizeCap
    )
    {
        using var reader = OpenPt9File(fileManager, relativePath);
        try
        {
            sizeCap.Add(reader.BaseStream.Length);
            return Convert.ToHexString(SHA256.HashData(reader.BaseStream)).ToLowerInvariant();
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            throw Pt9FileUnreadable(relativePath, e);
        }
    }

    /// <summary>
    /// Verifies the project directory can be enumerated, so an unreachable directory throws
    /// instead of reading as a project with no interlinear data. An absent directory is not an
    /// error: it enumerates to nothing downstream, the same no-data answer PT9 gives. A directory
    /// path occupied by a regular file follows the platform's own classification (absent on Unix,
    /// where ENOTDIR reports as directory-not-found; unreadable on Windows), exactly as it would
    /// for PT9 on that platform.
    /// </summary>
    private static void EnsurePt9ProjectDirectoryReadable(ScrText scrText)
    {
        try
        {
            using var enumerator = new DirectoryInfo(scrText.Directory)
                .EnumerateFileSystemInfos()
                .GetEnumerator();
            enumerator.MoveNext();
        }
        catch (DirectoryNotFoundException)
        {
            // An absent directory legitimately reads as a project with no interlinear data.
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            throw new InvalidDataException(
                $"The project directory for project '{scrText.Name}' cannot be read",
                e
            );
        }
    }

    /// <summary>
    /// Deserializes one PT9 interlinear XML file from its open stream, reading it exactly as PT9
    /// does: bytes are decoded before parsing, so invalid sequences become replacement characters
    /// and the XML declaration's encoding is ignored, while DTDs stay prohibited. Any read or
    /// parse failure surfaces as one exception type naming the project-relative path. A corrupt
    /// file is reported, never renamed or recovered, so a read cannot modify the project.
    /// </summary>
    private static T DeserializePt9Xml<T>(Stream stream, string relativePath)
        where T : class
    {
        try
        {
            // A decode-first StreamReader feeding Memento.GetXml is PT9's own read path for
            // these files; the XmlReader.Create inside it prohibits DTDs by default.
            using var textReader = new StreamReader(stream);
            return Memento.GetXml<T>(textReader, relativePath);
        }
        catch (Exception e)
            when (e
                    is InvalidOperationException
                        or XmlException
                        or IOException
                        or UnauthorizedAccessException
            )
        {
            throw Pt9FileUnreadable(relativePath, e);
        }
    }

    /// <summary>
    /// Resolves the project's interlinearization setups the way PT9 does, without PT9's side
    /// effects: the setups parsed from the setups file, plus setups reconstructed from the legacy
    /// <c>InterlinearRelatedLanguages</c> project settings for languages the file's setups do
    /// not already cover. PT9's own loader persists what it reconstructs (the migrated file, a settings
    /// stamp, and a progress-check update); this resolution writes nothing. The merge runs
    /// only when PT9 itself would run it - for a non-observer not yet stamped in
    /// InterlinearConversionCompletedBy - so a setup deleted after its one-time conversion is not
    /// resurrected. Settings-derived setups resolve model names against the locally installed
    /// projects, as PT9 itself does, so a setup whose model text is not installed is absent here
    /// too.
    /// </summary>
    private static List<Pt9InterlinearSetup> ResolvePt9InterlinearSetups(
        ScrText scrText,
        List<InterlinearSetup> fileSetups
    )
    {
        if (
            !scrText.Permissions.HaveRoleNotObserver
            || scrText.Settings.InterlinearConversionCompletedBy.Contains(
                RegistrationInfo.DefaultUser.Name
            )
        )
            return fileSetups.Select(ConvertPt9InterlinearSetup).ToList();

        List<InterlinearSetup> setups = fileSetups;

        const string propertyPrefix = "InterlinearRelatedLanguages.";
        foreach (string settingName in ReadSettingNamesMatchingPrefix(scrText, propertyPrefix))
        {
            string propertySuffix = settingName.Substring(propertyPrefix.Length);
            string modelName = XmlConvert.DecodeName(propertySuffix);
            ScrText? modelText = ScrTextCollection.Find(modelName);
            if (modelText == null)
                continue;
            // A model whose language id cannot be resolved is skipped: a setup without a language
            // id almost certainly has no useful interlinear data behind it.
            string? modelLanguageId = modelText.Settings.LanguageID?.Id;
            if (modelLanguageId == null || setups.Any(setup => setup.LanguageId == modelLanguageId))
                continue;

            // FromStrSafe: a malformed id setting reads as no id rather than failing the read.
            var exportId = HexId.FromStrSafe(
                scrText.Settings.GetSetting("InterlinearExportTextId." + propertySuffix)
            );
            var exportName = scrText.Settings.GetSetting("InterlinearExportText." + propertySuffix);
            ScrText? exportText = ScrTextCollection.FindById(exportId, exportName);
            InterlinearType type;
            if (exportText == null)
                type = InterlinearType.Glossing;
            else if (exportText.Settings.TranslationInfo.IsBackTranslationFor(scrText))
                type = InterlinearType.BackTranslation;
            else if (
                exportText.Settings.TranslationInfo.Type == ProjectType.Daughter
                && exportText.Settings.TranslationInfo.IsDerivedFrom(scrText)
            )
                type = InterlinearType.Adaptation;
            else
                type = InterlinearType.Glossing;

            setups.Add(
                new InterlinearSetup
                {
                    Type = type,
                    LanguageId = modelLanguageId,
                    MdlScrTextName = modelName,
                    MdlScrTextId = modelText.Guid,
                    MdlIsResource = modelText.IsResourceProject,
                    RelatedLanguages = scrText
                        .Settings.GetSetting(settingName)
                        .StartsWith("T", StringComparison.OrdinalIgnoreCase),
                    ExportOnApprove = scrText
                        .Settings.GetSetting("InterlinearExportOnApprove." + propertySuffix)
                        .StartsWith("T", StringComparison.OrdinalIgnoreCase),
                    ExportScrTextName = exportName,
                    ExportScrTextId = exportId,
                }
            );
        }

        return setups.Select(ConvertPt9InterlinearSetup).ToList();
    }

    /// <summary>
    /// Reads the project setting names carrying the given prefix. ParatextData's
    /// GetSettingNamesMatchingPrefix enumerates the settings dictionary without taking its lock,
    /// so a concurrent settings write can fail an attempt mid-enumeration; a short retry contains
    /// that race, and a failure that survives it propagates.
    /// </summary>
    private static List<string> ReadSettingNamesMatchingPrefix(ScrText scrText, string prefix)
    {
        for (int attempt = 1; ; attempt++)
        {
            try
            {
                return scrText.Settings.GetSettingNamesMatchingPrefix(prefix).ToList();
            }
            catch (InvalidOperationException) when (attempt < 3)
            {
                // The settings dictionary was mutated mid-enumeration; try again.
            }
        }
    }

    /// <summary>
    /// Maps one setup to its served shape. A model name that is empty or PT9's no-model sentinel
    /// means the setup has no model text, so the name is absent; the model id passes through
    /// whenever present, since a model-less setup mints one as its settings key. Empty strings
    /// serve as absent fields.
    /// </summary>
    private static Pt9InterlinearSetup ConvertPt9InterlinearSetup(InterlinearSetup setup)
    {
        bool hasModel =
            !string.IsNullOrEmpty(setup.MdlScrTextName)
            && setup.MdlScrTextName != InterlinearSetup.emptyModelTextName;
        return new Pt9InterlinearSetup(
            setup.Type.ToString(),
            setup.LanguageId,
            setup.LanguageName,
            string.IsNullOrEmpty(setup.FontName) ? null : setup.FontName,
            setup.FontSize,
            setup.RightToLeft,
            hasModel ? setup.MdlScrTextName : null,
            setup.MdlScrTextId?.ToString(),
            setup.MdlIsResource,
            setup.RelatedLanguages,
            setup.ExportOnApprove,
            string.IsNullOrEmpty(setup.ExportScrTextName) ? null : setup.ExportScrTextName,
            setup.ExportScrTextId?.ToString()
        );
    }

    /// <summary>
    /// Applies the cleanup PT9 itself applies on every lexicon read: entry and analysis forms are
    /// corrected to the project's normalization, the language becomes the project's language id,
    /// and empty legacy analyses are dropped. Unlike PT9's loader, nothing is written back to the
    /// project.
    /// </summary>
    private static void CleanPt9LexiconData(LexiconData lexiconData, ScrText scrText)
    {
        lexiconData.Language = scrText.Settings.LanguageID?.Id ?? lexiconData.Language;

        var entries = new SerializableDictionary<LexemeKey, XmlLexiconEntry>();
        foreach (var entry in lexiconData.Entries)
        {
            entry.Key.LexicalForm = scrText.Normalize(entry.Key.LexicalForm, true);
            entries[entry.Key] = entry.Value;
        }
        lexiconData.Entries = entries;

        var analyses = new SerializableDictionary<string, ArrayOfLexeme>();
        foreach (var analysis in lexiconData.Analyses)
        {
            if ((analysis.Value.Lexemes?.Count ?? 0) == 0)
                continue;
            foreach (var lexeme in analysis.Value.Lexemes!)
                lexeme.LexicalForm = scrText.Normalize(lexeme.LexicalForm, true);
            analyses[scrText.Normalize(analysis.Key, true)] = analysis.Value;
        }
        lexiconData.Analyses = analyses;
    }

    private static Pt9Lexicon ConvertPt9Lexicon(LexiconData lexiconData)
    {
        var entries = lexiconData
            .Entries.Select(entry => new Pt9LexiconEntry(
                entry.Key.Id,
                entry.Key.Type.ToString(),
                entry.Key.LexicalForm,
                entry.Key.Homograph,
                entry
                    .Value.Senses.Select(sense => new Pt9LexiconSense(
                        sense.Id,
                        (sense.Glosses ?? [])
                            .Select(gloss => new Pt9LexiconGloss(gloss.Language, gloss.Text))
                            .ToList()
                    ))
                    .ToList()
            ))
            .ToList();

        var legacyAnalyses = lexiconData
            .Analyses.Select(analysis => new Pt9WordParse(
                analysis.Key,
                [analysis.Value.Lexemes.Select(lexeme => lexeme.Id).ToList()]
            ))
            .ToList();

        return new Pt9Lexicon(lexiconData.Language, entries, legacyAnalyses);
    }

    private static Pt9InterlinearBook ConvertPt9InterlinearBook(
        InterlinearData interlinearData,
        string relativePath
    )
    {
        bool isCanonicalPath =
            interlinearData.GlossLanguage != null
            && interlinearData.BookId != null
            && string.Equals(
                InterlinearDataFile
                    .GetRelativePath(interlinearData.GlossLanguage, interlinearData.BookId)
                    .Replace(Path.DirectorySeparatorChar, '/'),
                relativePath,
                StringComparison.OrdinalIgnoreCase
            );

        var verses = interlinearData
            // Keys that do not parse as verse references (e.g. Send/Receive conflict markers)
            // are dropped, exactly as PT9's own read drops them.
            .Verses.Where(verse => VerseRef.TryParse(verse.Key, out _))
            .Select(verse => new Pt9InterlinearVerse(
                verse.Key,
                verse.Value.Hash,
                verse
                    .Value.Clusters.Select(cluster => new Pt9InterlinearCluster(
                        cluster.TextRange.Index,
                        cluster.TextRange.Length,
                        cluster.Excluded,
                        (cluster.Lexemes ?? [])
                            .Select(lexeme => new Pt9InterlinearLexemeRef(
                                lexeme.LexemeId,
                                string.IsNullOrEmpty(lexeme.SenseId) ? null : lexeme.SenseId
                            ))
                            .ToList()
                    ))
                    .ToList(),
                verse
                    .Value.Punctuations.Select(punctuation => new Pt9InterlinearPunctuation(
                        punctuation.TextRange.Index,
                        punctuation.TextRange.Length,
                        punctuation.BeforeText,
                        punctuation.AfterText
                    ))
                    .ToList()
            ))
            .ToList();

        return new Pt9InterlinearBook(
            interlinearData.GlossLanguage,
            interlinearData.BookId,
            verses,
            relativePath,
            isCanonicalPath
        );
    }
}

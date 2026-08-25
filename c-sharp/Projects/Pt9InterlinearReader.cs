using System.Security.Cryptography;
using System.Xml;
using System.Xml.Serialization;
using Paratext.Data;
using Paratext.Data.Interlinear;
using Paratext.Data.Linguistics;
using Paratext.Data.ProjectFileAccess;

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
    private const string Pt9InterlinearSetupFileName = "InterlinearSetup.xml";

    /// <summary>
    /// Ceiling on the total size of the interlinear files one <see cref="GetData"/>
    /// response may carry. A single WebSocket message over the transport's 100 MB limit tears down
    /// the whole PAPI connection to this process rather than failing the one request - an
    /// unaddressed platform-level issue - so this guard fails the request instead. Real
    /// interlinear data serializes near its XML size, so 50 MB keeps the response comfortably
    /// under that cliff; a file crafted of near-empty elements can inflate severalfold as JSON,
    /// an accepted residual risk since no tool writes such content.
    /// </summary>
    internal const long MaxPt9InterlinearDataBytes = 50L * 1024L * 1024L;

    /// <summary>
    /// Message prefix of the exception thrown when a project's interlinear files exceed
    /// <see cref="MaxPt9InterlinearDataBytes"/>. Part of the projectInterface contract: callers
    /// recognize the condition by this prefix, since exception types do not cross the RPC boundary.
    /// </summary>
    public const string Pt9InterlinearDataTooLargeMessagePrefix =
        "PT9 interlinear data is too large";

    /// <summary>
    /// Builds the manifest: project-relative path to the lowercase SHA-256 hex of that file's
    /// current bytes, covering the interlinear book files, the lexicon, and the stored word
    /// analyses. The setups file rides the data payload but is deliberately not covered, so a
    /// setups-only edit signals no change.
    /// </summary>
    public static Dictionary<string, string> GetManifest(ScrText scrText)
    {
        EnsurePt9ProjectDirectoryReadable(scrText);
        var fileManager = scrText.FileManager;
        var manifest = new Dictionary<string, string>();
        foreach (var relativePath in FindPt9InterlinearFiles(scrText))
            manifest[relativePath] = ComputePt9FileSha256Hex(fileManager, relativePath);
        return manifest;
    }

    /// <summary>
    /// Parses the project's PT9 interlinear data into its served shape: setups, per-book
    /// cluster data, the lexicon, and stored word analyses.
    /// </summary>
    public static Pt9InterlinearProjectData GetData(ScrText scrText)
    {
        EnsurePt9ProjectDirectoryReadable(scrText);
        var fileManager = scrText.FileManager;

        // Each file is opened exactly once and streams straight into the parser: its length
        // feeds the size cap and its content never buffers whole, so peak memory stays at the
        // parsed payload rather than payload plus corpus bytes. The cap trips before the file
        // that crosses it is parsed, so no response over the cap can ever be produced.
        var filePaths = FindPt9InterlinearFiles(scrText);
        long totalBytes = 0;
        void AddToSizeCap(long fileLength)
        {
            totalBytes += fileLength;
            if (totalBytes > MaxPt9InterlinearDataBytes)
            {
                throw new InvalidDataException(
                    $"{Pt9InterlinearDataTooLargeMessagePrefix}: the project's interlinear files "
                        + $"exceed the {MaxPt9InterlinearDataBytes} bytes one response can carry"
                );
            }
        }

        List<InterlinearSetup> fileSetups = [];
        if (fileManager.Exists(Pt9InterlinearSetupFileName))
        {
            EnsurePt9PathStaysInProject(scrText.Directory, Pt9InterlinearSetupFileName);
            using var reader = OpenPt9File(fileManager, Pt9InterlinearSetupFileName);
            AddToSizeCap(reader.BaseStream.Length);
            fileSetups = DeserializePt9Xml<InterlinearSetupList>(
                reader.BaseStream,
                Pt9InterlinearSetupFileName
            ).InterlinearSetups;
        }

        var books = new List<Pt9InterlinearBook>();
        Pt9Lexicon? lexicon = null;
        var wordAnalyses = new List<Pt9WordParse>();

        foreach (var relativePath in filePaths)
        {
            using var reader = OpenPt9File(fileManager, relativePath);
            AddToSizeCap(reader.BaseStream.Length);

            // The whole relative path is compared, so a same-named file inside an Interlinear_*
            // directory stays a book file.
            switch (relativePath.ToLowerInvariant())
            {
                case "lexicon.xml":
                    lexicon = ConvertPt9Lexicon(
                        DeserializePt9Xml<LexiconData>(reader.BaseStream, relativePath)
                    );
                    break;
                case "wordanalyses.xml":
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
                            DeserializePt9Xml<InterlinearData>(reader.BaseStream, relativePath)
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
            scrText.Settings.AssociatedLexicalProject?.IsValid ?? false
        );
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
        return lowerPath.StartsWith("interlinear_", StringComparison.Ordinal)
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
                    lowerName == "lexicon.xml"
                    || lowerName == "wordanalyses.xml"
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
                        .StartsWith("interlinear_", StringComparison.Ordinal)
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
            throw new InvalidDataException(
                $"Could not read PT9 interlinear file '{relativePath}'",
                e
            );
        }
    }

    /// <summary>
    /// Hashes one PT9 interlinear file to lowercase SHA-256 hex, streaming through the project's
    /// file manager. Any read failure surfaces as one exception type naming the project-relative
    /// path, never an absolute one.
    /// </summary>
    private static string ComputePt9FileSha256Hex(
        ProjectFileManager fileManager,
        string relativePath
    )
    {
        try
        {
            using var reader = OpenPt9File(fileManager, relativePath);
            return Convert.ToHexString(SHA256.HashData(reader.BaseStream)).ToLowerInvariant();
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            throw new InvalidDataException(
                $"Could not read PT9 interlinear file '{relativePath}'",
                e
            );
        }
    }

    /// <summary>
    /// Verifies the project directory can be enumerated, so an unreachable directory throws
    /// instead of reading as a project with no interlinear data. An absent directory is not an
    /// error: it enumerates to nothing downstream, the same no-data answer PT9 gives.
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
    /// Deserializes one PT9 interlinear XML file from its open stream. Any read or parse failure
    /// surfaces as one exception type naming the project-relative path. A corrupt file is
    /// reported, never renamed or recovered, so a read cannot modify the project.
    /// </summary>
    private static T DeserializePt9Xml<T>(Stream stream, string relativePath)
        where T : class
    {
        try
        {
            // XmlReader.Create prohibits DTDs by default, exactly as PT9's own reader does, so
            // a file carrying a DOCTYPE fails as corrupt instead of expanding entities.
            using var reader = XmlReader.Create(stream);
            var serializer = new XmlSerializer(typeof(T));
            if (serializer.Deserialize(reader) is T deserialized)
                return deserialized;
            throw new InvalidDataException($"Could not read PT9 interlinear file '{relativePath}'");
        }
        catch (Exception e)
            when (e
                    is InvalidOperationException
                        or XmlException
                        or IOException
                        or UnauthorizedAccessException
            )
        {
            throw new InvalidDataException(
                $"Could not read PT9 interlinear file '{relativePath}'",
                e
            );
        }
    }

    /// <summary>
    /// Resolves the project's interlinearization setups the way PT9 does, without PT9's side
    /// effects: the setups parsed from the setups file, plus setups reconstructed from the legacy
    /// <c>InterlinearRelatedLanguages</c> project settings for languages the file's setups do
    /// not already cover. PT9's own loader persists what it reconstructs (the migrated file, a settings
    /// stamp, and a progress-check update); this resolution writes nothing. Settings-derived
    /// setups resolve model names against the locally installed projects, as PT9 itself does, so
    /// a setup whose model text is not installed is absent here too.
    /// </summary>
    private static List<Pt9InterlinearSetup> ResolvePt9InterlinearSetups(
        ScrText scrText,
        List<InterlinearSetup> fileSetups
    )
    {
        List<InterlinearSetup> setups = fileSetups;

        const string propertyPrefix = "InterlinearRelatedLanguages.";
        foreach (
            string settingName in scrText.Settings.GetSettingNamesMatchingPrefix(propertyPrefix)
        )
        {
            string propertySuffix = settingName.Substring(propertyPrefix.Length);
            string modelName = XmlConvert.DecodeName(propertySuffix);
            ScrText? modelText = ScrTextCollection.Find(modelName);
            if (
                modelText == null
                || setups.Any(setup => setup.LanguageId == modelText.Settings.LanguageID.Id)
            )
                continue;

            var exportId = HexId.FromStr(
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
                    LanguageId = modelText.Settings.LanguageID.Id,
                    MdlScrTextName = modelName,
                    MdlScrTextId = modelText.Guid,
                    MdlIsResource = modelText.IsResourceProject,
                }
            );
        }

        return setups.Select(ConvertPt9InterlinearSetup).ToList();
    }

    /// <summary>
    /// Maps one setup to its served shape. A model name that is empty or PT9's no-model sentinel
    /// means the setup has no model text, so both model fields are absent.
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
            hasModel ? setup.MdlScrTextName : null,
            hasModel ? setup.MdlScrTextId?.ToString() : null
        );
    }

    private static Pt9Lexicon ConvertPt9Lexicon(LexiconData lexiconData)
    {
        var entries = lexiconData
            .Entries.Select(entry => new Pt9LexiconEntry(
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

    private static Pt9InterlinearBook ConvertPt9InterlinearBook(InterlinearData interlinearData)
    {
        var verses = interlinearData
            .Verses.Select(verse => new Pt9InterlinearVerse(
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
            verses
        );
    }
}

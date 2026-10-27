using System.Security.Cryptography;
using System.Text;
using System.Xml;
using Paranext.DataProvider.ParatextUtils;
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
/// way PT9 classifies them, describes them for a caller deciding what to read, and parses the
/// files it is asked for into typed records with PT9's own read semantics. Read-only by
/// construction: nothing here writes to the project.
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
    /// Bound on how much of a file the identity read consumes before giving up on naming it. PT9
    /// derives a book file's own path from its gloss language, so a root element PT9 wrote is a
    /// few dozen characters whatever the file's size. A document that makes this read consume more
    /// - an oversize attribute value, or a large comment before the root element - is listed
    /// without an identity rather than read on, so a manifest entry stays a bounded size whatever
    /// the file holds.
    /// </summary>
    private const long Pt9IdentityScanCharLimit = 64L * 1024L;

    /// <summary>
    /// Ceiling on the total on-disk size of the interlinear files one <see cref="GetData"/>
    /// response may carry; <see cref="GetManifest"/> is not bounded by it. A project exceeding the
    /// ceiling is read a selection at a time (see <see cref="Pt9InterlinearDataSelector"/>) rather
    /// than refused. A single WebSocket message over the transport's limit
    /// (<c>MAX_WEBSOCKET_PAYLOAD_BYTES</c> in <c>src/shared/data/rpc.model.ts</c>, 100 MB)
    /// tears down the whole PAPI connection to this process rather than failing the one request -
    /// an unaddressed platform-level issue - so this guard fails the request instead. The cap
    /// bounds source bytes because the serialized size cannot be confirmed here: the transport
    /// serializes after the provider returns.
    ///
    /// Measured across a real 38-file project, the response serializes to 0.72x the on-disk XML in
    /// aggregate and never above 0.76x for any file of consequence, because the indentation and
    /// close tags PT9 writes outweigh the attribute keys the parsed shape emits. 80 MB therefore lands a full response near 58 MB, and would stay
    /// 20 MB under the transport's limit even if the serialized form were as large as the source.
    /// Content crafted of near-empty elements can exceed that - a bare cluster element is a few
    /// bytes of XML and a whole JSON object - which no source-byte ceiling can bound; it remains
    /// an accepted residual risk. At this ceiling a response can inflate to at most 1.25x its
    /// on-disk size before it crosses the transport's 100 MB limit.
    /// </summary>
    internal const long MaxPt9InterlinearDataBytes = 80L * 1024L * 1024L;

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
    /// Message prefix of the exception thrown when a selector names a path the project does not
    /// have. Carries <see cref="PlatformErrorCodes.InvalidArgument"/>; the prefix is the contract
    /// for consumers that see only the message.
    /// </summary>
    public const string Pt9InterlinearUnknownPathMessagePrefix = "Unknown PT9 interlinear paths";

    /// <summary>
    /// Message of the exception thrown when a selector names no paths. Carries
    /// <see cref="PlatformErrorCodes.InvalidArgument"/>.
    /// </summary>
    public const string Pt9InterlinearEmptySelectionMessage =
        "Pt9InterlinearDataSelector.Paths must not be empty; omit the selector to read the whole project";

    /// <summary>
    /// Message of the exception thrown when a selector entry names no path. Carries
    /// <see cref="PlatformErrorCodes.InvalidArgument"/>. Distinct from the unknown-path error,
    /// whose message names the paths it could not find and so would name nothing here.
    /// </summary>
    public const string Pt9InterlinearBlankPathMessage =
        "Pt9InterlinearDataSelector.Paths must not contain an entry that names no path";

    /// <summary>
    /// Accumulates the source bytes a read has taken on and fails it at the file that crosses the
    /// ceiling it was given, before that file is parsed. Only <see cref="GetData"/> reads under it;
    /// a manifest read is not capped.
    /// </summary>
    private sealed class Pt9SizeCap(long maxReadBytes)
    {
        private long _totalBytes;

        public void Add(long fileLength)
        {
            _totalBytes += fileLength;
            if (_totalBytes > maxReadBytes)
            {
                var tooLarge = new InvalidDataException(
                    $"{Pt9InterlinearDataTooLargeMessagePrefix}: the files this read takes on "
                        + $"exceed the {maxReadBytes} bytes one response can carry"
                );
                tooLarge.Data[PlatformErrorCodes.PlatformErrorCodeDataKey] =
                    PlatformErrorCodes.ResourceExhausted;
                throw tooLarge;
            }
        }
    }

    /// <summary>
    /// Builds the manifest: every interlinear book file, the lexicon, and the stored word analyses,
    /// keyed by project-relative path, each with its change-detection hash, its size, and - for a
    /// book file - the gloss language and book id its root element declares. Sizes are what a
    /// caller compares against <see cref="MaxPt9InterlinearDataBytes"/> to divide its reads and to
    /// find the files it cannot read at all, and the ceiling they are measured against travels
    /// with them. Not bounded by that ceiling itself: one hash per file is a fixed length whatever
    /// the file holds.
    ///
    /// Only interlinear file content is change-detected: the payload's settings-derived parts
    /// (setups and the associated-lexical-project flag) can change without any hash changing.
    /// </summary>
    public static Pt9InterlinearProjectManifest GetManifest(
        ScrText scrText,
        long maxReadBytes = MaxPt9InterlinearDataBytes
    ) => ReadTyped(scrText, () => GetManifestCore(scrText, maxReadBytes));

    /// <summary>The manifest read itself; runs under <see cref="ReadTyped{T}"/>.</summary>
    private static Pt9InterlinearProjectManifest GetManifestCore(ScrText scrText, long maxReadBytes)
    {
        EnsurePt9ProjectDirectoryReadable(scrText);
        var fileManager = scrText.FileManager;
        var files = new Dictionary<string, Pt9InterlinearFileInfo>();
        foreach (var relativePath in FindPt9InterlinearFiles(scrText))
            files[relativePath] = DescribePt9File(fileManager, relativePath);
        return new Pt9InterlinearProjectManifest(maxReadBytes, files);
    }

    /// <summary>
    /// Describes one interlinear file from a single open handle: its size, the book identity its
    /// root element declares, and the hash of its bytes.
    ///
    /// One handle, so all three describe the same version of the file. Paratext replaces these
    /// files by two renames, so a save landing between separate opens could pair one version's
    /// size with another's hash - an entry for a file that never existed, which a caller cannot
    /// detect because the hash it compares against is the new one.
    /// </summary>
    private static Pt9InterlinearFileInfo DescribePt9File(
        ProjectFileManager fileManager,
        string relativePath
    )
    {
        using var reader = OpenPt9File(fileManager, relativePath);
        try
        {
            var stream = reader.BaseStream;
            var sizeBytes = stream.Length;

            // Only book files carry a gloss language and book id; the lexicon and the stored word
            // analyses are project-wide. Skipping them is also what keeps the probe from reading
            // a whole lexicon looking for a root element it does not have.
            var lowerPath = relativePath.ToLowerInvariant();
            var identity =
                lowerPath == Pt9LexiconFileNameLower || lowerPath == Pt9WordAnalysesFileNameLower
                    ? (null, null)
                    : ReadPt9BookIdentity(stream);

            // Reading the root element consumed part of the stream, so hashing restarts from the
            // beginning; the handle is opened seekable for exactly this.
            stream.Seek(0, SeekOrigin.Begin);
            var hash = Convert.ToHexString(SHA256.HashData(stream)).ToLowerInvariant();

            return new Pt9InterlinearFileInfo(
                hash,
                sizeBytes,
                identity.GlossLanguage,
                identity.BookId
            );
        }
        // NotSupportedException covers a stream that cannot seek: the rewind above requires one,
        // and a raw exception escaping here would leave the typed-error contract.
        catch (Exception e)
            when (e is IOException or UnauthorizedAccessException or NotSupportedException)
        {
            throw Pt9FileUnreadable(relativePath, e);
        }
    }

    /// <summary>
    /// Reads a book file's gloss language and book id from the root element of an already-open
    /// file, stopping at that element rather than reading on. For a well-formed file that is the
    /// first few bytes, whatever the file's size; a file that leads with a large comment or
    /// processing instruction is read up to its root element, since nothing bounds what precedes
    /// it. The enclosing <see cref="DescribePt9File"/> then hashes the whole file regardless, so a
    /// manifest read touches every byte either way. Leaves the stream open and does not rewind it;
    /// the caller owns both.
    ///
    /// The attributes are the same ones the parsed payload's <c>GlossLanguage</c> and <c>BookId</c>
    /// come from, so a caller reading the probe and a caller reading the data name the same book
    /// the same way. Anything that goes wrong reading them - a malformed file, an unexpected root,
    /// an absent attribute - answers null rather than throwing: the probe's contract is the hash,
    /// and a file whose identity cannot be established is exactly one a caller most wants listed
    /// rather than one that should fail the whole probe.
    /// </summary>
    private static (string? GlossLanguage, string? BookId) ReadPt9BookIdentity(Stream stream)
    {
        try
        {
            // Both readers leave the stream open; the caller owns it and hashes the same handle.
            // UTF-8 with byte-order-mark detection matches how the payload parse decodes these
            // files, so the probe and the payload name a book from identically decoded bytes.
            using var textReader = new StreamReader(
                stream,
                Encoding.UTF8,
                detectEncodingFromByteOrderMarks: true,
                bufferSize: 1024,
                leaveOpen: true
            );
            using var xmlReader = XmlReader.Create(
                textReader,
                new XmlReaderSettings
                {
                    DtdProcessing = DtdProcessing.Prohibit,
                    CloseInput = false,
                    MaxCharactersInDocument = Pt9IdentityScanCharLimit,
                }
            );
            // The root element only: the payload parse binds the root, so matching an
            // InterlinearData at any other depth would name a different book. MoveToContent stops
            // at the first content node, so a file with no such root costs nothing to reject.
            if (
                xmlReader.MoveToContent() != XmlNodeType.Element
                || xmlReader.Name != "InterlinearData"
            )
                return (null, null);
            return (xmlReader.GetAttribute("GlossLanguage"), xmlReader.GetAttribute("BookId"));
        }
        catch (Exception e) when (e is XmlException or InvalidOperationException)
        {
            // Only a malformed document answers "no identity". An I/O failure is left to surface
            // as the typed unreadable-file error rather than posing as a book with no book id.
            return (null, null);
        }
    }

    /// <summary>
    /// Parses the project's PT9 interlinear data into its served shape: setups, per-book
    /// cluster data, the lexicon, and stored word analyses. <paramref name="requestedPaths"/>
    /// limits the read to those manifest paths; null reads every interlinear file the project has.
    /// </summary>
    public static Pt9InterlinearProjectData GetData(
        ScrText scrText,
        IReadOnlyList<string>? requestedPaths = null,
        long maxReadBytes = MaxPt9InterlinearDataBytes
    ) => ReadTyped(scrText, () => GetDataCore(scrText, requestedPaths, maxReadBytes));

    /// <summary>The data read itself; runs under <see cref="ReadTyped{T}"/>.</summary>
    private static Pt9InterlinearProjectData GetDataCore(
        ScrText scrText,
        IReadOnlyList<string>? requestedPaths,
        long maxReadBytes
    )
    {
        EnsurePt9ProjectDirectoryReadable(scrText);
        var fileManager = scrText.FileManager;

        // Each file is opened exactly once and streams straight into the parser: its length
        // feeds the size cap and its content never buffers whole, so peak memory stays at the
        // parsed payload rather than payload plus corpus bytes. The cap trips before the file
        // that crosses it is parsed, so no selected file past the cap is ever parsed. The setups
        // file below is exempt and rides on top of that total, so a response is the capped
        // selection plus that file.
        var filePaths = FindPt9InterlinearFiles(scrText);
        if (requestedPaths is not null)
            filePaths = SelectRequestedPt9Files(filePaths, requestedPaths);
        var sizeCap = new Pt9SizeCap(maxReadBytes);

        List<InterlinearSetup> fileSetups = [];
        if (fileManager.Exists(InterlinearSetups.fileName))
        {
            EnsurePt9PathStaysInProject(scrText.Directory, InterlinearSetups.fileName);
            using var reader = OpenPt9File(fileManager, InterlinearSetups.fileName);
            // Not charged to the size cap: this file is served whatever the selection and is
            // never a manifest key, so charging it would refuse a selection a caller had sized
            // correctly from the manifest.
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
    /// Narrows a scan's paths to the ones a selector asked for, keeping the scan's own order so a
    /// selected read serves its books in the same order an unselected one does. Matching is
    /// ordinal against the paths the scan found, which are the manifest's keys, so a caller
    /// selects with exactly the strings the manifest gave it.
    ///
    /// A requested path the project does not have fails the whole read, and so does a selection
    /// naming no paths at all, or one whose entry names no path: either one would otherwise serve a payload a caller importing file
    /// by file records as a book that holds nothing. An empty selection is reachable by accident,
    /// from filtering the manifest by size in a project whose every file is too large. The message
    /// names the missing paths, which are project-relative and carry no filesystem location.
    /// </summary>
    private static List<string> SelectRequestedPt9Files(
        List<string> scannedPaths,
        IReadOnlyList<string> requestedPaths
    )
    {
        if (requestedPaths.Count == 0)
        {
            var emptySelection = new InvalidDataException($"{Pt9InterlinearEmptySelectionMessage}");
            emptySelection.Data[PlatformErrorCodes.PlatformErrorCodeDataKey] =
                PlatformErrorCodes.InvalidArgument;
            throw emptySelection;
        }

        // Named separately from the unknown-path error, whose message lists what it could not find
        // and so would name nothing for an entry that is itself nothing.
        if (requestedPaths.Any(path => string.IsNullOrWhiteSpace(path)))
        {
            var blankPath = new InvalidDataException(Pt9InterlinearBlankPathMessage);
            blankPath.Data[PlatformErrorCodes.PlatformErrorCodeDataKey] =
                PlatformErrorCodes.InvalidArgument;
            throw blankPath;
        }

        var scanned = new HashSet<string>(scannedPaths, StringComparer.Ordinal);
        var missing = requestedPaths.Where(path => !scanned.Contains(path)).Distinct().ToList();
        if (missing.Count > 0)
        {
            // Only the first few are named. The caller supplies this list, so a stale manifest
            // after a Send/Receive that removed a directory can make it arbitrarily long, and the
            // message is a consumer-facing contract that reaches notifications and logs.
            const int maxNamed = 10;
            var named = string.Join(", ", missing.Take(maxNamed).Select(DescribePathForMessage));
            var suffix = missing.Count > maxNamed ? $" (and {missing.Count - maxNamed} more)" : "";
            var unknownPaths = new InvalidDataException(
                $"{Pt9InterlinearUnknownPathMessagePrefix}: {named}{suffix}"
            );
            unknownPaths.Data[PlatformErrorCodes.PlatformErrorCodeDataKey] =
                PlatformErrorCodes.InvalidArgument;
            throw unknownPaths;
        }

        var requested = new HashSet<string>(requestedPaths, StringComparer.Ordinal);
        return scannedPaths.Where(requested.Contains).ToList();
    }

    /// <summary>
    /// Renders one caller-supplied path for an error message that reaches notifications and logs:
    /// control characters dropped so a caller cannot forge log lines, absolute paths redacted by
    /// the same redactor the alert capture uses, and the result truncated so ten named paths cannot
    /// make a message of unbounded length. The platform has no shared convention for this; the
    /// pieces that exist are the path redactor and the truncate-with-ellipsis shape used elsewhere.
    /// </summary>
    private static string DescribePathForMessage(string path)
    {
        const int maxChars = 120;
        var withoutControlCharacters = new string(
            [.. path.Where(character => !char.IsControl(character))]
        );
        var redacted = AlertCapture.RedactPathsForLog(withoutControlCharacters);
        return redacted.Length <= maxChars ? redacted : redacted[..maxChars] + "...";
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
    /// means the setup has no model text, so the name is absent; the model id serves whenever
    /// present, since a model-less setup mints one as its settings key. Every other string serves
    /// only when non-empty, so an empty value and an omitted one are indistinguishable downstream.
    /// </summary>
    private static Pt9InterlinearSetup ConvertPt9InterlinearSetup(InterlinearSetup setup)
    {
        bool hasModel =
            !string.IsNullOrEmpty(setup.MdlScrTextName)
            && setup.MdlScrTextName != InterlinearSetup.emptyModelTextName;
        return new Pt9InterlinearSetup(
            setup.Type.ToString(),
            NullIfEmpty(setup.LanguageId),
            NullIfEmpty(setup.LanguageName),
            NullIfEmpty(setup.FontName),
            setup.FontSize,
            setup.RightToLeft,
            hasModel ? setup.MdlScrTextName : null,
            NullIfEmpty(setup.MdlScrTextId?.ToString()),
            setup.MdlIsResource,
            setup.RelatedLanguages,
            setup.ExportOnApprove,
            NullIfEmpty(setup.ExportScrTextName),
            NullIfEmpty(setup.ExportScrTextId?.ToString())
        );
    }

    /// <summary>
    /// Collapses an empty string to absent. PT9's several ways of storing "never set" carry no
    /// distinction worth serving.
    /// </summary>
    private static string? NullIfEmpty(string? value) => string.IsNullOrEmpty(value) ? null : value;

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
                                NullIfEmpty(lexeme.SenseId)
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

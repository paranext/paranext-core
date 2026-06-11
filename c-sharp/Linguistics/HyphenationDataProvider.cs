using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Linguistics;

namespace Paranext.DataProvider.Linguistics;

/// <summary>
/// Data provider that exposes a project's hyphenation data (hyphenatedWords.txt) so users can
/// view, add, edit, approve, and remove word hyphenations.
///
/// Persistence, file format, and parsing live entirely in ParatextData's
/// <see cref="Hyphenation"/> / <see cref="HyphenationData"/> classes (the same code PT9 uses), so
/// PT9 round-trip fidelity comes by construction.
/// </summary>
// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Linguistics/HyphenationEngine.cs:217-302 (record/remove/obliterate),
//         PT9/Paratext/WordList/WordListForm.cs:2687-2706 (edit validation)
// Method: HyphenationEngine.RecordHyphenation / RemoveHyphenation / ObliterateHyphenation,
//         WordListForm.EditHyphenation
// Maps to: research/paratext-9-features/05_Spelling_Wordlist.md §5.6
// NOTE: PT9's HMM-based hyphenation guesser (HMMHyphenator/HyphenationEngine training) lives in
// the PT9 WinForms assembly, not in ParatextData, and is NOT ported. See the PR description for
// the deferral rationale.
internal sealed class HyphenationDataProvider(PapiClient papiClient)
    : NetworkObjects.DataProvider(
        "platformScripture.hyphenationDataProvider",
        papiClient,
        NetworkObjectType.DATA_PROVIDER
    )
{
    #region Constants

    private const string DATA_TYPE_ENTRIES = "HyphenationEntries";
    private const string DATA_TYPE_INFO = "HyphenationInfo";

    private const string INVALID_HYPHENATION_ERROR_KEY =
        "%platformScripture_hyphenation_invalidHyphenationError%";
    private const string INVALID_HYPHENATION_ERROR_DEFAULT =
        "Hyphenation must be done with '=' character and match original word";

    #endregion

    #region Member variables

    private readonly JsonSerializerOptions _serializationOptions =
        SerializationOptions.CreateSerializationOptions();

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of IHyphenationDataProvider in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getHyphenationEntries", GetHyphenationEntries),
            ("setHyphenationEntries", SetHyphenationEntries),
            ("getHyphenationInfo", GetHyphenationInfo),
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    #endregion

    #region HyphenationDataProvider methods

    /// <summary>
    /// Gets hyphenation entries for a project, ordered by word. If <c>selector.Word</c> is
    /// provided, only the entry for that word (if any) is returned.
    /// </summary>
    internal List<HyphenationEntry> GetHyphenationEntries(HyphenationEntriesSelector selector)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);

        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var hyphenation = Hyphenation.Get(scrText);

        lock (hyphenation)
        {
            IEnumerable<HyphenationDataEntry> entries = hyphenation.Entries.Values;
            if (!string.IsNullOrEmpty(selector.Word))
            {
                string lowercaseWord = scrText.CharacterCategorizer.ToLower(selector.Word);
                entries = entries.Where(entry => entry.Word == lowercaseWord);
            }

            return entries
                .Select(entry => new HyphenationEntry(entry.Word, entry.Hyphenation, !entry.Guess))
                .OrderBy(entry => entry.Word, StringComparer.Ordinal)
                .ToList();
        }
    }

    /// <summary>
    /// Adds, updates, or deletes the hyphenation entry for the word in <c>selector.Word</c>.
    ///
    /// Passing a <see cref="HyphenationEntryUpdate"/> value upserts the entry; the hyphenation
    /// (stripped of "=") must match the word, case-insensitively, the same validation PT9 applies
    /// (WordListForm.EditHyphenation / HyphenationEngine.RecordHyphenationInternal). Words are
    /// stored lowercase using the project's CharacterCategorizer, as PT9 does.
    ///
    /// Passing JSON null/undefined deletes the entry entirely (PT9:
    /// HyphenationEngine.ObliterateHyphenation).
    /// </summary>
    internal bool SetHyphenationEntries(HyphenationEntriesSelector selector, JsonElement value)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);
        ArgumentException.ThrowIfNullOrEmpty(selector.Word);

        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var hyphenation = Hyphenation.Get(scrText);
        string lowercaseWord = scrText.CharacterCategorizer.ToLower(selector.Word);
        bool isFirstWrite = !scrText.FileManager.Exists(Hyphenation.fileName);

        if (value.ValueKind is JsonValueKind.Null or JsonValueKind.Undefined)
        {
            lock (hyphenation)
            {
                // Check before acquiring the update lock: UpdateLock() assumes the data is
                // modified, so taking it for a no-op would leave the file flagged as dirty and a
                // later unrelated flush would materialize a phantom hyphenatedWords.txt
                if (!hyphenation.Entries.ContainsKey(lowercaseWord))
                    return true; // Nothing to delete; idempotent no-op

                using (hyphenation.UpdateLock())
                {
                    hyphenation.Entries.Remove(lowercaseWord);
                }
                hyphenation.Save();
            }
        }
        else
        {
            var update =
                JsonSerializer.Deserialize<HyphenationEntryUpdate>(value, _serializationOptions)
                ?? throw new ArgumentException(
                    $"Hyphenation update value must be an object or null (projectId: {selector.ProjectId}, word: {selector.Word})"
                );

            // === NEW IN PT10 ===
            // Reason: PT9's Wordlist supplies words tokenized from project text, so malformed
            // words never reach the hyphenation file. PT10 exposes this as a public PAPI API, so
            // guard the line-based hyphenatedWords.txt format: whitespace would split an entry
            // into multiple lines, "=" is the hyphen marker, leading "*" is the approved-entry
            // marker, and leading "#" is the comment marker.
            // Maps to: Infrastructure (mirrors isValidNewWord in hyphenation.utils.ts)
            if (
                selector.Word.Any(char.IsWhiteSpace)
                || selector.Word.Contains('=')
                || selector.Word.StartsWith('*')
                || selector.Word.StartsWith('#')
            )
            {
                throw new ArgumentException(
                    $"Word cannot contain whitespace or '=' and cannot start with '*' or '#' (projectId: {selector.ProjectId}, word: {selector.Word})"
                );
            }

            // PT9 validation: hyphenation with "=" removed must match the word
            // (WordListForm.cs:2698, HyphenationEngine.cs:252)
            if (
                !selector.Word.Equals(
                    update.Hyphenation.Replace("=", ""),
                    StringComparison.OrdinalIgnoreCase
                )
            )
            {
                throw new ArgumentException(
                    LocalizationService.GetLocalizedString(
                        PapiClient,
                        INVALID_HYPHENATION_ERROR_KEY,
                        INVALID_HYPHENATION_ERROR_DEFAULT
                    )
                );
            }

            string lowercaseHyphenation = scrText.CharacterCategorizer.ToLower(update.Hyphenation);

            lock (hyphenation)
            {
                using (hyphenation.UpdateLock())
                {
                    hyphenation.Entries[lowercaseWord] = new HyphenationDataEntry(
                        lowercaseWord,
                        lowercaseHyphenation,
                        !update.IsApproved
                    );
                }
                hyphenation.Save();
            }
        }

        // Creating the file changes HyphenationInfo.fileExists, so notify both data types then
        SendDataUpdateEvent(
            isFirstWrite
                ? new List<string> { DATA_TYPE_ENTRIES, DATA_TYPE_INFO }
                : DATA_TYPE_ENTRIES,
            "updated hyphenation entries"
        );
        return true;
    }

    /// <summary>Gets project-level hyphenation metadata</summary>
    internal HyphenationInfo GetHyphenationInfo(HyphenationEntriesSelector selector)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);

        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var hyphenation = Hyphenation.Get(scrText);

        lock (hyphenation)
        {
            return new HyphenationInfo
            {
                FileExists = scrText.FileManager.Exists(Hyphenation.fileName),
                SoftHyphenOut = hyphenation.SoftHyphenOut.ToString(),
                HyphenatedMarkers = hyphenation.HyphenatedMarkers,
                HadRedundancy = hyphenation.HadRedundancy,
                HadUppercase = hyphenation.HadUppperCase,
            };
        }
    }

    #endregion
}

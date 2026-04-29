using System.Text.Encodings.Web;
using System.Text.Json;
using MarbleSchemaExtractor.Pocos;

namespace MarbleSchemaExtractor;

internal sealed class EncyclopediaDeserializer
{
    // Encyclopedia archives typically split content across one file per type
    // (FLORA / FAUNA / REALIA) plus an Abbrev.xml side-table. We merge entries
    // across every recognised type-file so the stats cover the full corpus.
    // V2 archives (.mev1z + matching .mbv2z bibles) add per-language variants
    // like FLORA_en.xml; we treat these as additional inputs rather than
    // language-tagging them — the audit is concerned with field shape, not
    // language coverage.
    private static readonly string[] EncyclopediaTypeFilenames =
    [
        "FLORA.XML",
        "FAUNA.XML",
        "REALIA.XML",
    ];
    private static readonly string[] EncyclopediaTypePrefixes = ["FLORA_", "FAUNA_", "REALIA_"];
    private static readonly string[] EncyclopediaIgnoredFiles = ["Abbrev.xml", "Settings.xml"];

    public string CollectStats(ResourceArchive archive)
    {
        Thematic_Lexicon doc = LoadDoc(archive);
        var collector = new FieldStatsCollector();

        foreach (var entry in doc.ThemLex_Entry ?? [])
        {
            collector.Observe("Entry.Key", entry.Key);
            collector.Observe("Entry.Title", entry.Title);
            collector.ObserveArray("Entry.Index", entry.Index?.Length ?? 0);
            collector.ObserveArray("Entry.Sections", entry.Sections?.Length ?? 0);
            collector.ObserveArray("Entry.BibleImages", entry.BibleImages?.Length ?? 0);

            foreach (var section in entry.Sections ?? [])
            {
                collector.Observe("Entry.Sections[].Type", section.Type);
                collector.Observe("Entry.Sections[].Content", section.Content);
                collector.Observe("Entry.Sections[].Heading", section.Heading);
                collector.Observe("Entry.Sections[].SubHeading", section.SubHeading);
                collector.ObserveArray(
                    "Entry.Sections[].Paragraphs",
                    section.Paragraphs?.Length ?? 0
                );
                collector.ObserveArray(
                    "Entry.Sections[].LanguageSets",
                    section.LanguageSets?.Length ?? 0
                );

                foreach (var ls in section.LanguageSets ?? [])
                {
                    collector.Observe("Entry.Sections[].LanguageSets[].Lemma", ls.Lemma);
                    collector.Observe(
                        "Entry.Sections[].LanguageSets[].Transliteration",
                        ls.Transliteration
                    );
                    collector.Observe("Entry.Sections[].LanguageSets[].Language", ls.Language);
                    collector.ObserveArray(
                        "Entry.Sections[].LanguageSets[].References",
                        ls.References?.Length ?? 0
                    );
                }
            }
        }

        return collector.ToJson();
    }

    public string CollectSamples(ResourceArchive archive, int count)
    {
        Thematic_Lexicon doc = LoadDoc(archive);
        var sample = (doc.ThemLex_Entry ?? []).Take(count).ToArray();
        return JsonSerializer.Serialize(
            sample,
            new JsonSerializerOptions
            {
                WriteIndented = true,
                IncludeFields = true,
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
            }
        );
    }

    private static Thematic_Lexicon LoadDoc(ResourceArchive archive)
    {
        var allEntries = archive.ListEntries().ToList();
        var xmlEntries = allEntries
            .Where(e => e.EndsWith(".xml", StringComparison.OrdinalIgnoreCase))
            .Where(e =>
                !EncyclopediaIgnoredFiles.Any(ignored =>
                    string.Equals(e, ignored, StringComparison.OrdinalIgnoreCase)
                )
            )
            .Where(IsEncyclopediaCandidate)
            .ToList();

        if (xmlEntries.Count == 0)
            throw new InvalidOperationException(
                $"No encyclopedia XML found. Entries: {string.Join(", ", allEntries)}"
            );

        // Merge ThemLex_Entry across every candidate file. PT9 V1 ships one file
        // per type (FAUNA/FLORA/REALIA); V2 ships per-language variants. The
        // audit is shape-only so we accumulate them into one big entry list.
        var merged = new List<MarbleSchemaExtractor.Pocos.Thematic_LexiconThemLex_Entry>();
        foreach (var entryName in xmlEntries)
        {
            var xml = archive.ReadEntryText(entryName);
            try
            {
                var doc = Thematic_Lexicon.ParseXml(xml);
                if (doc.ThemLex_Entry is not null)
                    merged.AddRange(doc.ThemLex_Entry);
            }
            catch (System.InvalidOperationException)
            {
                // File matched the encyclopedia name pattern but is not actually a
                // Thematic_Lexicon document (e.g., FAUNA Index.xml in some V2
                // builds). Skip silently — the audit is best-effort.
            }
        }

        return new Thematic_Lexicon { ThemLex_Entry = [.. merged] };
    }

    private static bool IsEncyclopediaCandidate(string entryName)
    {
        var fileName = System.IO.Path.GetFileName(entryName);
        if (
            EncyclopediaTypeFilenames.Any(f =>
                string.Equals(fileName, f, StringComparison.OrdinalIgnoreCase)
            )
        )
            return true;
        return EncyclopediaTypePrefixes.Any(prefix =>
            fileName.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)
            && fileName.EndsWith(".xml", StringComparison.OrdinalIgnoreCase)
        );
    }
}

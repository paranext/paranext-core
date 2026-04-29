using System.Text.Encodings.Web;
using System.Text.Json;
using MarbleSchemaExtractor.Pocos;

namespace MarbleSchemaExtractor;

internal sealed class EncyclopediaDeserializer
{
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
        var entries = archive.ListEntries().ToList();
        // Encyclopedia XML files vary: Encyclopedia.xml, MBL_ENC.xml, FAUNA.xml, etc.
        string xmlEntry =
            entries.FirstOrDefault(e =>
                e.EndsWith(".xml", StringComparison.OrdinalIgnoreCase)
                && !e.Contains("Settings")
                && !e.Contains("Index")
            )
            ?? throw new InvalidOperationException(
                $"No encyclopedia XML found. Entries: {string.Join(", ", entries)}"
            );

        string xml = archive.ReadEntryText(xmlEntry);
        return Thematic_Lexicon.ParseXml(xml);
    }
}

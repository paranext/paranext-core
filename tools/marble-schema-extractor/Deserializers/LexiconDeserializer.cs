using System.Text.Encodings.Web;
using System.Text.Json;
using System.Xml.Serialization;
using MarbleSchemaExtractor.Pocos;

namespace MarbleSchemaExtractor;

internal sealed class LexiconDeserializer
{
    private const string DefaultEntryFile = "Lexicon.xml";

    public string CollectStats(ResourceArchive archive)
    {
        Lexicon_Main lexicon = LoadLexicon(archive);
        var collector = new FieldStatsCollector();

        foreach (var entry in lexicon)
        {
            collector.Observe("Entry.Lemma", entry.Lemma);
            collector.Observe("Entry.MainId", entry.MainId);
            collector.Observe("Entry.Version", entry.Version);
            collector.ObserveArray("Entry.StrongCodes", entry.StrongCodes?.Count ?? 0);
            collector.ObserveArray("Entry.Authors", entry.Authors?.Count ?? 0);
            collector.ObserveArray("Entry.AlternateLemmas", entry.AlternateLemmas?.Count ?? 0);
            collector.ObserveArray("Entry.Notes", entry.Notes?.Count ?? 0);
            collector.ObserveArray("Entry.Localizations", entry.Localizations?.Count ?? 0);
            collector.ObserveArray("Entry.Dates", entry.Dates?.Count ?? 0);
            collector.ObserveArray("Entry.BaseForms", entry.BaseForms?.Count ?? 0);

            foreach (var baseForm in entry.BaseForms ?? [])
            {
                collector.Observe("BaseForms[].BaseFormID", baseForm.BaseFormID);
                collector.ObserveArray(
                    "BaseForms[].PartsOfSpeech",
                    baseForm.PartsOfSpeech?.Count ?? 0
                );
                collector.ObserveArray("BaseForms[].Etymologies", baseForm.Etymologies?.Count ?? 0);
                collector.ObserveArray(
                    "BaseForms[].RelatedLemmas",
                    baseForm.RelatedLemmas?.Count ?? 0
                );
                collector.ObserveArray(
                    "BaseForms[].RelatedNames",
                    baseForm.RelatedNames?.Count ?? 0
                );
                collector.ObserveArray(
                    "BaseForms[].MeaningsOfName",
                    baseForm.MeaningsOfName?.Count ?? 0
                );
                collector.ObserveArray(
                    "BaseForms[].CrossReference",
                    baseForm.CrossReference?.Count ?? 0
                );
                collector.ObserveArray("BaseForms[].LEXMeanings", baseForm.LEXMeanings?.Count ?? 0);

                foreach (var meaning in baseForm.LEXMeanings ?? [])
                {
                    collector.Observe("BaseForms[].LEXMeanings[].LEXID", meaning.LEXID);
                    collector.Observe(
                        "BaseForms[].LEXMeanings[].LEXIsBiblicalTerm",
                        meaning.LEXIsBiblicalTerm
                    );
                    collector.Observe(
                        "BaseForms[].LEXMeanings[].LEXEntryCode",
                        meaning.LEXEntryCode
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXDomains",
                        meaning.LEXDomains?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXSubDomains",
                        meaning.LEXSubDomains?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXForms",
                        meaning.LEXForms?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXValencies",
                        meaning.LEXValencies?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXCollocations",
                        meaning.LEXCollocations?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXSynonyms",
                        meaning.LEXSynonyms?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXAntonyms",
                        meaning.LEXAntonyms?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXCrossReferences",
                        meaning.LEXCrossReferences?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXSenses",
                        meaning.LEXSenses?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXLinks",
                        meaning.LEXLinks?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXImages",
                        meaning.LEXImages?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXCoordinates",
                        meaning.LEXCoordinates?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXReferences",
                        meaning.LEXReferences?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].LEXCoreDomains",
                        meaning.LEXCoreDomains?.Count ?? 0
                    );
                    collector.ObserveArray(
                        "BaseForms[].LEXMeanings[].CONMeanings",
                        meaning.CONMeanings?.Count ?? 0
                    );

                    foreach (var sense in meaning.LEXSenses ?? [])
                    {
                        collector.Observe(
                            "BaseForms[].LEXMeanings[].LEXSenses[].LanguageCode",
                            sense.LanguageCode
                        );
                        collector.Observe(
                            "BaseForms[].LEXMeanings[].LEXSenses[].DefinitionLong",
                            sense.DefinitionLong
                        );
                        collector.Observe(
                            "BaseForms[].LEXMeanings[].LEXSenses[].DefinitionShort",
                            sense.DefinitionShort
                        );
                        collector.ObserveArray(
                            "BaseForms[].LEXMeanings[].LEXSenses[].Glosses",
                            sense.Glosses?.Count ?? 0
                        );
                        collector.Observe(
                            "BaseForms[].LEXMeanings[].LEXSenses[].Comments",
                            sense.Comments
                        );
                    }
                }
            }
        }

        return collector.ToJson();
    }

    public string CollectSamples(ResourceArchive archive, int count)
    {
        Lexicon_Main lexicon = LoadLexicon(archive);
        var sample = lexicon.Take(count).ToList();
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

    private static Lexicon_Main LoadLexicon(ResourceArchive archive)
    {
        // Files inside the zip use one of: Lexicon.xml, Lexicon_*.xml, or
        // a file matching the resource ID (DCLEX.xml, etc.). Inspect at runtime
        // and pick the first lexicon-shaped entry.
        var entries = archive.ListEntries().ToList();
        string lexiconEntry =
            entries.FirstOrDefault(e =>
                e.EndsWith("Lexicon.xml", StringComparison.OrdinalIgnoreCase)
            )
            ?? entries.FirstOrDefault(e =>
                e.EndsWith(".xml", StringComparison.OrdinalIgnoreCase) && !e.Contains("Settings")
            )
            ?? throw new InvalidOperationException(
                $"No lexicon XML found. Entries: {string.Join(", ", entries)}"
            );

        string xml = archive.ReadEntryText(lexiconEntry);
        var serializer = new XmlSerializer(typeof(Lexicon_Main));
        using var reader = new StringReader(xml);
        return (Lexicon_Main)serializer.Deserialize(reader)!;
    }
}

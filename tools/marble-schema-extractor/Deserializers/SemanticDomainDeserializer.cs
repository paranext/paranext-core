using System.Text.Encodings.Web;
using System.Text.Json;
using System.Xml.Serialization;
using MarbleSchemaExtractor.Pocos;

namespace MarbleSchemaExtractor;

internal sealed class SemanticDomainDeserializer
{
    public string CollectStats(ResourceArchive archive)
    {
        SemanticLexicalDomains doc = LoadDoc(archive);
        var collector = new FieldStatsCollector();

        foreach (var domain in doc.SemanticDomains ?? new())
        {
            collector.Observe("Domain.Code", domain.Code);
            collector.Observe("Domain.Level", domain.Level);
            collector.ObserveArray(
                "Domain.SemanticDomainLocalizations",
                domain.SemanticDomainLocalizations?.Count ?? 0
            );
        }

        return collector.ToJson();
    }

    public string CollectSamples(ResourceArchive archive, int count)
    {
        SemanticLexicalDomains doc = LoadDoc(archive);
        var sample = (doc.SemanticDomains ?? new()).Take(count).ToList();
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

    private static SemanticLexicalDomains LoadDoc(ResourceArchive archive)
    {
        var entries = archive.ListEntries().ToList();
        // Only return a real domains payload when a Domain-named XML file is
        // actually present. Some lexicon resources (notably DCLEX) ship the
        // domains inline inside the lexicon XML itself rather than as a sibling
        // file, in which case this deserializer correctly reports no domains.
        string? xmlEntry = entries.FirstOrDefault(e =>
            e.Contains("Domain", StringComparison.OrdinalIgnoreCase)
            && e.EndsWith(".xml", StringComparison.OrdinalIgnoreCase)
        );

        if (xmlEntry is null)
            return new SemanticLexicalDomains { SemanticDomains = new() };

        string xml = archive.ReadEntryText(xmlEntry);
        var serializer = new XmlSerializer(typeof(SemanticLexicalDomains));
        using var reader = new StringReader(xml);
        return (SemanticLexicalDomains)serializer.Deserialize(reader)!;
    }
}

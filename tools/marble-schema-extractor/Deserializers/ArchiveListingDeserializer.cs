using System.Text.Encodings.Web;
using System.Text.Json;
using System.Xml.Linq;

namespace MarbleSchemaExtractor;

internal sealed class ArchiveListingDeserializer
{
    private static readonly JsonSerializerOptions JsonOptions =
        new()
        {
            WriteIndented = true,
            IncludeFields = true,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
        };

    public string CollectStats(ResourceArchive archive)
    {
        var entries = archive.ListEntries().ToList();
        var byExtension = entries
            .Select(e => Path.GetExtension(e))
            .GroupBy(ext => ext, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(g => g.Key, g => g.Count());

        var rootTagCounts = new Dictionary<string, int>();
        foreach (
            var entry in entries.Where(e => e.EndsWith(".xml", StringComparison.OrdinalIgnoreCase))
        )
        {
            try
            {
                string xml = archive.ReadEntryText(entry);
                var doc = XDocument.Parse(xml);
                if (doc.Root == null)
                    continue;
                rootTagCounts[doc.Root.Name.LocalName] =
                    rootTagCounts.GetValueOrDefault(doc.Root.Name.LocalName) + 1;
            }
            catch
            {
                // Malformed XML or non-XML payload misnamed; skip
            }
        }

        var output = new Dictionary<string, object> { ["entries.total"] = entries.Count };
        foreach (var (ext, count) in byExtension)
            output[$"entries.byExtension.{ext}"] = count;
        foreach (var (tag, count) in rootTagCounts)
            output[$"xml.rootElements.{tag}"] = count;

        return JsonSerializer.Serialize(output, JsonOptions);
    }

    public string CollectSamples(ResourceArchive archive, int count)
    {
        // For these types samples are not commit-worthy data; emit a structural summary
        // that lists the first `count` entries by name + size hint.
        var sample = archive
            .ListEntries()
            .Take(count)
            .Select(name =>
            {
                string contentPreview = "";
                try
                {
                    string text = archive.ReadEntryText(name);
                    contentPreview = text.Length <= 200 ? text : text[..200] + "...";
                }
                catch
                { /* binary entry */
                }
                return new { Name = name, Preview = contentPreview };
            })
            .ToList();
        return JsonSerializer.Serialize(sample, JsonOptions);
    }
}

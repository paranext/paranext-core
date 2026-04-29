namespace MarbleSchemaExtractor;

internal sealed class BibleDeserializer
{
    private readonly ArchiveListingDeserializer _inner = new();

    public string CollectStats(ResourceArchive a) => _inner.CollectStats(a);

    public string CollectSamples(ResourceArchive a, int count) => _inner.CollectSamples(a, count);
}

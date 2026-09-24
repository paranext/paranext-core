using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

[ExcludeFromCodeCoverage]
internal sealed class FakeMarbleBookXmlSource : IMarbleBookXmlSource
{
    private readonly Dictionary<(string, int), string> _xmlByKey = new();

    public FakeMarbleBookXmlSource With(string resourceId, int bookNum, string xml)
    {
        _xmlByKey[(resourceId, bookNum)] = xml;
        return this;
    }

    public string? ReadBookXml(string resourceId, int bookNum) =>
        _xmlByKey.TryGetValue((resourceId, bookNum), out var xml) ? xml : null;
}

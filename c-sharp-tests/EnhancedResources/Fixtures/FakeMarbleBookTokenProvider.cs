using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

[ExcludeFromCodeCoverage]
internal sealed class FakeMarbleBookTokenProvider : IMarbleBookTokenProvider
{
    private readonly Dictionary<(string, int), IReadOnlyList<MarbleToken>> _tokensByKey = new();

    public FakeMarbleBookTokenProvider With(
        string resourceId,
        int bookNum,
        params MarbleToken[] tokens
    )
    {
        _tokensByKey[(resourceId, bookNum)] = tokens;
        return this;
    }

    public IReadOnlyList<MarbleToken> GetTokens(string resourceId, int bookNum) =>
        _tokensByKey.TryGetValue((resourceId, bookNum), out var t) ? t : Array.Empty<MarbleToken>();
}

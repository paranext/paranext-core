using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Services.Tests;

/// <summary>
/// Dictionary-backed ISharedStore for testing consumers without a PapiClient
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class FakeSharedStore : ISharedStore
{
    public Dictionary<string, object?> Values { get; } = [];

    public bool TryGetValue<T>(string key, out T? value)
    {
        if (Values.TryGetValue(key, out var stored) && stored is T typed)
        {
            value = typed;
            return true;
        }
        value = default;
        return false;
    }

    public void Set<T>(string key, T? value)
    {
        Values[key] = value;
    }

    public void Remove<T>(string key)
    {
        Values[key] = default(T);
    }
}

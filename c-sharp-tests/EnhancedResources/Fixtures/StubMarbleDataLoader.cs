using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Test double for IMarbleDataLoader. Returns the MarbleData passed to its constructor
/// without touching the filesystem. Used by EnhancedResourceFactoryTests to verify
/// factory behavior deterministically - tests construct fixture data, pass it in,
/// await factory.LoadCompleted.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class StubMarbleDataLoader : IMarbleDataLoader
{
    private readonly MarbleData? _data;
    private readonly Exception? _throwOnLoad;

    public StubMarbleDataLoader(MarbleData? data)
    {
        _data = data;
    }

    private StubMarbleDataLoader(Exception exception)
    {
        _throwOnLoad = exception;
    }

    /// <summary>Factory for the "no marble data installed" case.</summary>
    public static StubMarbleDataLoader Empty() => new((MarbleData?)null);

    /// <summary>Factory for the "load threw" case.</summary>
    public static StubMarbleDataLoader Throwing(Exception exception) => new(exception);

    public Task<MarbleData?> LoadAsync()
    {
        if (_throwOnLoad is not null)
            return Task.FromException<MarbleData?>(_throwOnLoad);
        return Task.FromResult(_data);
    }
}

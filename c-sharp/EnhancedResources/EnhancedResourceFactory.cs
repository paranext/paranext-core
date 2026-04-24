// === NEW IN PT10 ===
// Reason: PAPI factory pattern - creates per-resource NetworkObjects on demand
// Maps to: CAP-001
using System.Collections.Concurrent;
using Paranext.DataProvider.Errors;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Factory that enumerates available ER resources and creates per-resource
/// EnhancedResourceNetworkObject instances on demand. Follows the
/// ParatextProjectDataProviderFactory pattern.
///
/// Source: CAP-001, data-contracts.md Section 4.1
/// </summary>
internal class EnhancedResourceFactory : NetworkObject
{
    private readonly LocalParatextProjects _paratextProjects;
    private readonly MarbleDataAccessService _dataAccessService;
    private readonly ConcurrentDictionary<string, string> _networkObjectIds = new();
    private readonly object _creationLock = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);
    private InitializeResult? _initializeResult;
    private string[] _availableResources = [];

    public EnhancedResourceFactory(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base(papiClient)
    {
        _paratextProjects = paratextProjects;
        _dataAccessService = new MarbleDataAccessService();
    }

    /// <summary>
    /// Factory initialization: discovers marble packages, loads lexicons.
    /// Blocks until cache build completes.
    /// </summary>
    public Task InitializeAsync()
    {
        _dataAccessService.Initialize();

        // Only populate from AvailableBibles if no test data was pre-set
        if (_availableResources.Length == 0)
        {
            _availableResources = _dataAccessService.AvailableBibles.Select(b => b.Name).ToArray();
        }

        _initializeResult = BuildInitializeResult();

        return Task.CompletedTask;
    }

    public string[] GetAvailableResources()
    {
        return _availableResources;
    }

    /// <summary>
    /// Creates or retrieves a cached NetworkObject ID for the given resource.
    /// Thread-safe via double-checked locking pattern.
    /// </summary>
    /// <exception cref="InvalidOperationException">
    /// FAILED_PRECONDITION when no marble data is installed;
    /// NOT_FOUND when resource ID is unknown.
    /// </exception>
    /// <exception cref="ArgumentException">
    /// When the resource is not a MarbleResource type.
    /// </exception>
    public string GetResourceObjectId(string resourceId)
    {
        ValidateResourceId(resourceId);
        return GetOrCreateNetworkObjectId(resourceId);
    }

    private void ValidateResourceId(string resourceId)
    {
        if (!_dataAccessService.HaveMarbleData)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "No Enhanced Resource data installed"
            );
        }

        if (_availableResources.Contains(resourceId))
            return;

        if (IsKnownNonMarbleResource(resourceId))
        {
            throw new ArgumentException(
                $"Resource '{resourceId}' is not a MarbleResource type",
                nameof(resourceId)
            );
        }

        throw PlatformErrorCodes.WithCode(
            PlatformErrorCodes.NotFound,
            $"Unknown resource ID: {resourceId}"
        );
    }

    private string GetOrCreateNetworkObjectId(string resourceId)
    {
        if (_networkObjectIds.TryGetValue(resourceId, out var existingId))
            return existingId;

        lock (_creationLock)
        {
            if (_networkObjectIds.TryGetValue(resourceId, out var existingIdInLock))
                return existingIdInLock;

            var objectId = GenerateObjectId();
            _networkObjectIds.TryAdd(resourceId, objectId);
            return objectId;
        }
    }

    private string GenerateObjectId()
    {
        return new string(
            Enumerable.Range(0, 30).Select(_ => (char)_random.Next(65, 90)).ToArray()
        );
    }

    public InitializeResult GetInitializeResult()
    {
        return _initializeResult ?? new InitializeResult(false, [], [], false);
    }

    /// <summary>
    /// Provides access to the underlying data access service for testing.
    /// </summary>
    internal MarbleDataAccessService DataAccessService => _dataAccessService;

    /// <summary>
    /// Sets available resource IDs directly for testing purposes.
    /// </summary>
    internal void SetTestResourceIds(string[] resourceIds)
    {
        _availableResources = resourceIds;
        _initializeResult = BuildInitializeResult();
    }

    private InitializeResult BuildInitializeResult()
    {
        return new InitializeResult(
            _dataAccessService.HaveMarbleData,
            _availableResources,
            [.. _dataAccessService.AvailableGlossLanguages],
            false
        );
    }

    private static bool IsKnownNonMarbleResource(string resourceId)
    {
        // In production, this would check if the resource ID corresponds to a
        // standard translation project. For now, any ID that doesn't match
        // our marble resources and isn't clearly random is treated as a
        // non-marble resource if it contains "standard" or "translation".
        return resourceId.Contains("standard", StringComparison.OrdinalIgnoreCase)
            || resourceId.Contains("translation", StringComparison.OrdinalIgnoreCase);
    }
}

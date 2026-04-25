// === NEW IN PT10 ===
// Reason: PAPI factory pattern - creates per-resource NetworkObjects on demand
// Maps to: CAP-001
using System.Collections.Concurrent;
using Paranext.DataProvider.Errors;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;

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
    private MarbleDataAccessService _dataAccessService;
    private readonly ConcurrentDictionary<string, string> _networkObjectIds = new();
    private readonly object _creationLock = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);
    private InitializeResult? _initializeResult;
    private string[] _availableResources = [];

    public EnhancedResourceFactory(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base(papiClient)
    {
        _paratextProjects = paratextProjects;
        // Empty service until InitializeAsync wires real data (Task 12 will replace this
        // with a proper construction path through MarbleDataLoader + MarbleLanguageMapBuilder).
        _dataAccessService = new MarbleDataAccessService(
            GlossData.Empty,
            LanguageMapping.Empty,
            []
        );
    }

    /// <summary>
    /// Factory initialization: discovers marble packages, loads lexicons.
    /// Blocks until cache build completes.
    /// </summary>
    public Task InitializeAsync()
    {
        // No-op stub until Task 12 wires MarbleDataLoader -> MarbleLanguageMapBuilder.
        // The factory currently relies on test code injecting state via SetTestService.
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
    /// Replaces the underlying data access service for testing. Task 12 will rework
    /// the factory to take MarbleData via constructor injection.
    /// </summary>
    internal void SetTestDataAccessService(MarbleDataAccessService service)
    {
        _dataAccessService = service ?? throw new ArgumentNullException(nameof(service));
        _initializeResult = BuildInitializeResult();
    }

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
}

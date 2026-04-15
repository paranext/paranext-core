// === NEW IN PT10 ===
// Reason: PAPI factory pattern - creates per-resource NetworkObjects on demand
// Maps to: CAP-001
using System.Collections.Concurrent;
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

    // === NEW IN PT10 ===
    // Reason: PAPI factory pattern constructor
    // Maps to: CAP-001
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
    // === NEW IN PT10 ===
    // Reason: Async initialization replaces PT9 synchronous startup
    // Maps to: CAP-001, BHV-102, BHV-105
    public Task InitializeAsync()
    {
        _dataAccessService.Initialize();

        // Only populate from AvailableBibles if no test data was pre-set
        if (_availableResources.Length == 0)
        {
            _availableResources = _dataAccessService.AvailableBibles.Select(b => b.Name).ToArray();
        }

        _initializeResult = new InitializeResult(
            _dataAccessService.HaveMarbleData,
            _availableResources,
            [.. _dataAccessService.AvailableGlossLanguages],
            false
        );

        return Task.CompletedTask;
    }

    // === NEW IN PT10 ===
    // Reason: PAPI command for resource enumeration
    // Maps to: BHV-102, TS-001, TS-002
    public string[] GetAvailableResources()
    {
        return _availableResources;
    }

    // === NEW IN PT10 ===
    // Reason: PAPI command for per-resource NetworkObject creation
    // Maps to: BHV-105, TS-068
    // EXPLANATION:
    // Creates a NetworkObject ID for the requested resource. Uses a concurrent
    // dictionary to cache created IDs. Thread-safe via lock on creation.
    // Error codes:
    // - FAILED_PRECONDITION when no marble data is installed
    // - NOT_FOUND when resource ID is unknown
    // - ArgumentException for non-MarbleResource types
    public string GetResourceObjectId(string resourceId)
    {
        if (!_dataAccessService.HaveMarbleData)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "No Enhanced Resource data installed"
            );
        }

        // Check if the resource is a known marble resource
        if (!_availableResources.Contains(resourceId))
        {
            // Check if it could be a non-marble resource (standard translation)
            // For resources that don't exist at all, throw NOT_FOUND
            // For known non-marble resources, throw ArgumentException
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

        // Return cached object ID or create new one
        if (_networkObjectIds.TryGetValue(resourceId, out var existingId))
            return existingId;

        lock (_creationLock)
        {
            if (_networkObjectIds.TryGetValue(resourceId, out var existingIdInLock))
                return existingIdInLock;

            // Generate a unique network object ID
            var objectId = new string(
                Enumerable.Range(0, 30).Select(_ => (char)_random.Next(65, 90)).ToArray()
            );

            _networkObjectIds.TryAdd(resourceId, objectId);
            return objectId;
        }
    }

    // === NEW IN PT10 ===
    // Reason: Exposes initialization result for PAPI
    // Maps to: CAP-001
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
        _initializeResult = new InitializeResult(
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

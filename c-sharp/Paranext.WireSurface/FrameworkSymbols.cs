using Microsoft.CodeAnalysis;

namespace Paranext.WireSurface;

/// <summary>
/// The framework symbols every recognition rule compares against, resolved once per
/// <see cref="Compilation"/> by metadata name. A missing symbol means the framework moved and the
/// tool must be updated, so <see cref="Resolve"/> fails fast rather than letting a rule silently
/// find nothing.
/// </summary>
public sealed class FrameworkSymbols
{
    public required INamedTypeSymbol NetworkObject { get; init; }
    public required INamedTypeSymbol DataProvider { get; init; }
    public required INamedTypeSymbol ProjectDataProviderFactory { get; init; }
    public required INamedTypeSymbol PapiClient { get; init; }
    public required INamedTypeSymbol ExperimentalMethodDocumentation { get; init; }
    public required INamedTypeSymbol NetworkObjectDocumentation { get; init; }
    public required INamedTypeSymbol OpenRpcSingleMethodDocumentation { get; init; }
    public required INamedTypeSymbol OpenRpcMethodDocumentation { get; init; }
    public required INamedTypeSymbol OpenRpcSingleNotificationDocumentation { get; init; }
    public required INamedTypeSymbol OpenRpcNotificationDocumentation { get; init; }

    public required IMethodSymbol RegisterNetworkObjectAsync { get; init; }
    public required IMethodSymbol GetNetworkObjectDocumentation { get; init; }
    public required IMethodSymbol RegisterRequestHandlerAsync { get; init; }

    public required IReadOnlyList<IMethodSymbol> SendRequestAsyncOverloads { get; init; }
    public required IReadOnlyList<IMethodSymbol> AlwaysExperimentalHelpers { get; init; } // Create, Marker, ExistenceMarker

    public required IPropertySymbol[] ExperimentalProperties { get; init; } // NetworkObjectDocumentation, OpenRpcMethodDocumentation, OpenRpcNotificationDocumentation

    public static FrameworkSymbols Resolve(Compilation compilation)
    {
        INamedTypeSymbol ResolveType(string metadataName) =>
            compilation.GetTypeByMetadataName(metadataName)
            ?? throw new InvalidOperationException(
                $"wire-surface: framework type not found: {metadataName}"
            );

        IMethodSymbol ResolveMethod(INamedTypeSymbol type, string methodName)
        {
            var candidates = type.GetMembers(methodName).OfType<IMethodSymbol>().ToList();
            return candidates.Count switch
            {
                1 => candidates[0],
                0 => throw new InvalidOperationException(
                    $"wire-surface: framework method not found: {type}.{methodName}"
                ),
                _ => throw new InvalidOperationException(
                    $"wire-surface: framework method is ambiguous: {type}.{methodName}"
                ),
            };
        }

        IReadOnlyList<IMethodSymbol> ResolveOverloads(
            INamedTypeSymbol type,
            string methodName,
            int expectedCount
        )
        {
            var candidates = type.GetMembers(methodName).OfType<IMethodSymbol>().ToList();
            return candidates.Count == expectedCount
                ? candidates
                : throw new InvalidOperationException(
                    $"wire-surface: expected {expectedCount} overloads of {type}.{methodName}, found {candidates.Count}"
                );
        }

        IPropertySymbol ResolveProperty(INamedTypeSymbol type, string propertyName)
        {
            var candidates = type.GetMembers(propertyName).OfType<IPropertySymbol>().ToList();
            return candidates.Count switch
            {
                1 => candidates[0],
                0 => throw new InvalidOperationException(
                    $"wire-surface: framework property not found: {type}.{propertyName}"
                ),
                _ => throw new InvalidOperationException(
                    $"wire-surface: framework property is ambiguous: {type}.{propertyName}"
                ),
            };
        }

        var networkObject = ResolveType("Paranext.DataProvider.NetworkObjects.NetworkObject");
        var dataProvider = ResolveType("Paranext.DataProvider.NetworkObjects.DataProvider");
        var projectDataProviderFactory = ResolveType(
            "Paranext.DataProvider.Projects.ProjectDataProviderFactory"
        );
        var papiClient = ResolveType("Paranext.DataProvider.PapiClient");
        var experimentalMethodDocumentation = ResolveType(
            "Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation"
        );
        var networkObjectDocumentation = ResolveType(
            "Paranext.DataProvider.NetworkObjects.Documentation.NetworkObjectDocumentation"
        );
        var openRpcSingleMethodDocumentation = ResolveType(
            "Paranext.DataProvider.NetworkObjects.Documentation.OpenRpcSingleMethodDocumentation"
        );
        var openRpcMethodDocumentation = ResolveType(
            "Paranext.DataProvider.NetworkObjects.Documentation.OpenRpcMethodDocumentation"
        );
        var openRpcSingleNotificationDocumentation = ResolveType(
            "Paranext.DataProvider.NetworkObjects.Documentation.OpenRpcSingleNotificationDocumentation"
        );
        var openRpcNotificationDocumentation = ResolveType(
            "Paranext.DataProvider.NetworkObjects.Documentation.OpenRpcNotificationDocumentation"
        );

        return new FrameworkSymbols
        {
            NetworkObject = networkObject,
            DataProvider = dataProvider,
            ProjectDataProviderFactory = projectDataProviderFactory,
            PapiClient = papiClient,
            ExperimentalMethodDocumentation = experimentalMethodDocumentation,
            NetworkObjectDocumentation = networkObjectDocumentation,
            OpenRpcSingleMethodDocumentation = openRpcSingleMethodDocumentation,
            OpenRpcMethodDocumentation = openRpcMethodDocumentation,
            OpenRpcSingleNotificationDocumentation = openRpcSingleNotificationDocumentation,
            OpenRpcNotificationDocumentation = openRpcNotificationDocumentation,
            RegisterNetworkObjectAsync = ResolveMethod(networkObject, "RegisterNetworkObjectAsync"),
            GetNetworkObjectDocumentation = ResolveMethod(
                dataProvider,
                "GetNetworkObjectDocumentation"
            ),
            RegisterRequestHandlerAsync = ResolveMethod(papiClient, "RegisterRequestHandlerAsync"),
            SendRequestAsyncOverloads = ResolveOverloads(
                papiClient,
                "SendRequestAsync",
                expectedCount: 2
            ),
            AlwaysExperimentalHelpers =
            [
                ResolveMethod(experimentalMethodDocumentation, "Create"),
                ResolveMethod(experimentalMethodDocumentation, "Marker"),
                ResolveMethod(experimentalMethodDocumentation, "ExistenceMarker"),
            ],
            ExperimentalProperties =
            [
                ResolveProperty(networkObjectDocumentation, "Experimental"),
                ResolveProperty(openRpcMethodDocumentation, "Experimental"),
                ResolveProperty(openRpcNotificationDocumentation, "Experimental"),
            ],
        };
    }

    public bool IsSameMethod(IMethodSymbol? candidate, IMethodSymbol expected) =>
        candidate is not null
        && SymbolEqualityComparer.Default.Equals(candidate.OriginalDefinition, expected);

    public bool DerivesFrom(INamedTypeSymbol type, INamedTypeSymbol baseType)
    {
        for (var current = type.BaseType; current is not null; current = current.BaseType)
        {
            if (SymbolEqualityComparer.Default.Equals(current.OriginalDefinition, baseType))
                return true;
        }
        return false;
    }
}

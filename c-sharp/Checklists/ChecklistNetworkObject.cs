using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 exposed checklist functionality through the WinForms ChecklistsTool
// (user-facing menu entries + direct in-process calls). PT10 requires the same
// functionality to cross the process boundary as a PAPI network object so
// extensions (e.g., the platform-scripture web view) can consume it via
// `papi.networkObjects.get<IChecklistService>('platformScripture.checklistService')`.
// Maps to: EXT-014 / CAP-011 / backend-alignment.md §"Network Object"
//
// EXPLANATION:
// Registration shape (alphabetical FunctionNames, NetworkObjectType.OBJECT):
//   - buildChecklistData       → ChecklistService.BuildChecklistData
//   - resolveComparativeTexts  → ChecklistService.ResolveComparativeTexts
//   - validateMarkerSettings   → MarkersDataSource.ValidateMarkerSettings
// The wire contract is specified in data-contracts.md §7.1/§7.2; the canonical
// `RegisterNetworkObjectAsync` pattern comes from
// c-sharp/Projects/ProjectDataProviderFactory.cs:25-46.
//
// Subclasses `NetworkObject` (not `DataProvider`) because the checklist has
// no get/set/subscribe data-type triplet — it is a stateless request/response
// service. No `onDidUpdate` event is emitted; refresh is driven from the
// consumer side via existing scripture-change signals.
/// <summary>
/// PAPI network object that exposes the checklist service's three stateless
/// methods (<c>buildChecklistData</c>, <c>resolveComparativeTexts</c>,
/// <c>validateMarkerSettings</c>) to extensions via
/// <c>papi.networkObjects.get&lt;IChecklistService&gt;(...)</c>. Per-method
/// pipeline behaviour lives in <see cref="ChecklistService"/> /
/// <see cref="MarkersDataSource"/>; this class is purely the wire shim.
/// </summary>
internal sealed class ChecklistNetworkObject : NetworkObject
{
    // Wire contract — pinned here as a single source of truth so the tuple
    // list passed to RegisterNetworkObjectAsync and the FunctionNames array
    // inside NetworkObjectCreatedDetails cannot drift apart. Order is
    // alphabetical to match data-contracts.md §7.1/§7.2 and the CAP-011
    // acceptance test's ExpectedFunctionNames.
    private const string NetworkObjectName = "platformScripture.checklistService";
    private const string BuildMethodName = "buildChecklistData";
    private const string ResolveMethodName = "resolveComparativeTexts";
    private const string ValidateMethodName = "validateMarkerSettings";

    // Build can traverse many books × multiple comparative projects; 30s matches
    // the default PAPI request timeout (see PapiClient._requestTimeout) and is
    // explicit here so a regression in request-handler attribution is obvious
    // at registration time rather than surfacing as a silent wire truncation.
    private const int BUILD_CHECKLIST_TIMEOUT_MS = 30_000;

    public ChecklistNetworkObject(PapiClient papiClient)
        : base(papiClient) { }

    /// <summary>
    /// Registers the checklist network object with PAPI. Calls
    /// <see cref="NetworkObject.RegisterNetworkObjectAsync"/> with the three
    /// wire methods in alphabetical order and
    /// <see cref="NetworkObjectType.OBJECT"/>. Calling twice on the same
    /// instance throws (the base class' single-registration guard).
    /// </summary>
    public async Task InitializeAsync()
    {
        await RegisterNetworkObjectAsync(
            NetworkObjectName,
            [
                (
                    BuildMethodName,
                    new Func<ChecklistRequest, CancellationToken, object>(BuildChecklistData)
                ),
                (
                    ResolveMethodName,
                    new Func<
                        string,
                        IReadOnlyList<ComparativeTextRef>,
                        CancellationToken,
                        ResolvedComparativeTexts
                    >(ResolveComparativeTexts)
                ),
                (
                    ValidateMethodName,
                    new Func<string, MarkerSettingsValidationResult>(ValidateMarkerSettings)
                ),
            ],
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames = [BuildMethodName, ResolveMethodName, ValidateMethodName],
            },
            // EXPERIMENTAL: the entire platformScripture.checklistService network object is
            // experimental. Experimental = true cascades x-experimental to the object:{name}
            // existence method and every function; Methods supplies the richer per-method docs.
            new NetworkObjectDocumentation
            {
                Experimental = true,
                Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                {
                    [BuildMethodName] = Create(
                        "Build checklist data for the supplied request.",
                        [Param("request", "Checklist request.")],
                        ResultOf("object", "Checklist result response")
                    ),
                    [ResolveMethodName] = Create(
                        "Resolve comparative-text references for the active project.",
                        [
                            Param("activeProjectId", "Active project id.", "string"),
                            Param(
                                "requestedTexts",
                                "Comparative-text references to resolve.",
                                "array"
                            ),
                        ],
                        ResultOf("object", "Resolved comparative texts")
                    ),
                    [ValidateMethodName] = Create(
                        "Validate an equivalent-markers settings string.",
                        [
                            Param(
                                "equivalentMarkers",
                                "Equivalent-markers string to validate.",
                                "string"
                            ),
                        ],
                        ResultOf("object", "Marker settings validation result")
                    ),
                },
            }
        );
    }

    /// <summary>
    /// PAPI delegate target for <c>buildChecklistData</c>. Routes to the
    /// stateless <see cref="ChecklistService.BuildChecklistData"/> — which
    /// itself calls <see cref="LocalParatextProjects.GetParatextProject(string)"/>
    /// statically against the shared <c>ScrTextCollection</c>. Instance method
    /// (rather than static) so it can access <see cref="PapiClient"/> to
    /// resolve localize keys at the wire boundary.
    /// Behaviour lives in <c>ChecklistService</c>; this is a transport shim.
    /// Localize keys carried in the result (e.g. <see cref="EmptyResultMessage.Message"/>
    /// for the "identical" variant) are resolved here before the wire
    /// response leaves the backend, per the
    /// <c>patterns.errorHandling.backendLocalization</c> registry entry.
    /// <para>
    /// Return type is <see cref="object"/> because this delegate serves the
    /// <c>ChecklistResultResponse</c> discriminated union (data-contracts.md §3.1):
    /// the success branch returns <see cref="ChecklistResult"/>; the error branch
    /// returns <see cref="ChecklistResultError"/> (mapped from the contract-listed
    /// exception types). <see cref="OperationCanceledException"/> is deliberately
    /// NOT caught — it propagates so PAPI can surface cooperative cancellation
    /// semantics to the caller (TS-062).
    /// </para>
    /// </summary>
    [NetworkTimeout(BUILD_CHECKLIST_TIMEOUT_MS)]
    private object BuildChecklistData(ChecklistRequest request, CancellationToken ct)
    {
        try
        {
            var result = ChecklistService.BuildChecklistData(request, ct);
            return ResolveLocalizeKeys(result);
        }
        catch (Exception ex) when (ex is ProjectNotFoundException or ArgumentException)
        {
            // PROJECT_NOT_FOUND covers both the unresolved-GUID case
            // (ProjectNotFoundException from ScrTextCollection) and the
            // malformed-projectId case (ArgumentException from
            // HexId.FromStr / HexToByteArr). From the wire contract's
            // perspective, both mean "the active projectId is not a valid
            // Scripture project on this machine" (data-contracts.md §4.1
            // error conditions).
            return new ChecklistResultError(ChecklistErrorCodes.ProjectNotFound, ex.Message);
        }
    }

    /// <summary>
    /// PAPI delegate target for <c>resolveComparativeTexts</c>. Routes to the
    /// stateless <see cref="ChecklistService.ResolveComparativeTexts"/>.
    /// Instance method (rather than static) so it can access
    /// <see cref="PapiClient"/> if this method ever needs to surface localized
    /// strings — today none are emitted, so the call is a direct pass-through.
    /// </summary>
    private ResolvedComparativeTexts ResolveComparativeTexts(
        string activeProjectId,
        IReadOnlyList<ComparativeTextRef> requestedTexts,
        CancellationToken ct
    )
    {
        return ChecklistService.ResolveComparativeTexts(activeProjectId, requestedTexts, ct);
    }

    /// <summary>
    /// PAPI delegate target for <c>validateMarkerSettings</c>. Routes to the
    /// stateless <see cref="MarkersDataSource.ValidateMarkerSettings"/>. The
    /// service returns a localize key in <see cref="MarkerSettingsValidationResult.ErrorMessage"/>
    /// on failure; we resolve it here before the wire response leaves the
    /// backend, per the <c>patterns.errorHandling.backendLocalization</c>
    /// registry entry.
    /// </summary>
    private MarkerSettingsValidationResult ValidateMarkerSettings(string equivalentMarkers)
    {
        var result = MarkersDataSource.ValidateMarkerSettings(equivalentMarkers);
        if (result.ErrorMessage is not { } key || !IsLocalizeKey(key))
            return result;
        var resolved = LocalizationService.GetLocalizedString(
            PapiClient,
            key,
            MarkersDataSource.InvalidMarkerPairErrorFallback
        );
        return result with { ErrorMessage = resolved };
    }

    /// <summary>
    /// Resolves any localize keys carried inside a <see cref="ChecklistResult"/>
    /// before it is serialized over the wire. Today the only such key lives
    /// in <see cref="EmptyResultMessage.Message"/> when <c>Variant</c> is
    /// <c>"identical"</c>. Returns the same result instance (or a new one with
    /// the <c>Message</c> field resolved) to keep the immutable-record
    /// contract.
    /// </summary>
    private ChecklistResult ResolveLocalizeKeys(ChecklistResult result)
    {
        if (result.EmptyResultMessage is not { } empty)
            return result;
        if (!IsLocalizeKey(empty.Message))
            return result;

        var resolved = LocalizationService.GetLocalizedString(
            PapiClient,
            empty.Message,
            MarkersDataSource.IdenticalMarkersMessageFallback
        );
        return result with { EmptyResultMessage = empty with { Message = resolved } };
    }

    /// <summary>
    /// Lightweight test for "looks like a localize key" — i.e. wrapped in
    /// <c>%</c> sentinels per paranext-core convention. Avoids double-resolve
    /// when a NetworkObject method is invoked multiple times on the same
    /// record (e.g. in test assertions that round-trip).
    /// </summary>
    private static bool IsLocalizeKey(string? value) =>
        value != null && value.Length >= 2 && value[0] == '%' && value[^1] == '%';
}

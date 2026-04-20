using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

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
internal class ChecklistNetworkObject : NetworkObject
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

    private readonly LocalParatextProjects _paratextProjects;

    public ChecklistNetworkObject(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base(papiClient)
    {
        _paratextProjects = paratextProjects;
    }

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
                    new Func<ChecklistRequest, CancellationToken, ChecklistResult>(
                        BuildChecklistData
                    )
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
            }
        );
    }

    /// <summary>
    /// PAPI delegate target for <c>buildChecklistData</c>. Routes to
    /// <see cref="ChecklistService.BuildChecklistData"/>, threading the
    /// constructor-injected <see cref="LocalParatextProjects"/> collaborator
    /// (hence an instance method — the other two routers can stay static
    /// at the service-method level; both still need <see cref="PapiClient"/>
    /// to resolve localize keys at the wire boundary).
    /// Behaviour lives in <c>ChecklistService</c>; this is a transport shim.
    /// Localize keys carried in the result (e.g. <see cref="EmptyResultMessage.Message"/>
    /// for the "identical" variant) are resolved here before the wire
    /// response leaves the backend, per the
    /// <c>patterns.errorHandling.backendLocalization</c> registry entry.
    /// </summary>
    private ChecklistResult BuildChecklistData(ChecklistRequest request, CancellationToken ct)
    {
        var result = ChecklistService.BuildChecklistData(request, _paratextProjects, ct);
        return ResolveLocalizeKeys(result);
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
    private static bool IsLocalizeKey(string? s) =>
        s != null && s.Length >= 2 && s[0] == '%' && s[^1] == '%';
}

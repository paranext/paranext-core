using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

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
    private const string NetworkObjectName = "platformScripture.checklistService";

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
                    "buildChecklistData",
                    new System.Func<ChecklistRequest, CancellationToken, ChecklistResult>(
                        BuildChecklistData
                    )
                ),
                (
                    "resolveComparativeTexts",
                    new System.Func<
                        string,
                        IReadOnlyList<ComparativeTextRef>,
                        CancellationToken,
                        ResolvedComparativeTexts
                    >(ResolveComparativeTexts)
                ),
                (
                    "validateMarkerSettings",
                    new System.Func<string, MarkerSettingsValidationResult>(ValidateMarkerSettings)
                ),
            ],
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames =
                [
                    "buildChecklistData",
                    "resolveComparativeTexts",
                    "validateMarkerSettings",
                ],
            }
        );
    }

    private ChecklistResult BuildChecklistData(ChecklistRequest request, CancellationToken ct)
    {
        return ChecklistService.BuildChecklistData(request, _paratextProjects, ct);
    }

    private static ResolvedComparativeTexts ResolveComparativeTexts(
        string activeProjectId,
        IReadOnlyList<ComparativeTextRef> requestedTexts,
        CancellationToken ct
    )
    {
        return ChecklistService.ResolveComparativeTexts(activeProjectId, requestedTexts, ct);
    }

    private static MarkerSettingsValidationResult ValidateMarkerSettings(string equivalentMarkers)
    {
        return MarkersDataSource.ValidateMarkerSettings(equivalentMarkers);
    }
}

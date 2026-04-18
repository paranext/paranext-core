using System;
using System.Threading.Tasks;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.Checklists;

// === RED STUB (CAP-011 — NetworkObject PAPI Registration) ===
// Status: test-writer RED. The test file
// c-sharp-tests/Checklists/ChecklistNetworkObjectTests.cs pins the
// expected registration contract: name, NetworkObjectType.OBJECT,
// alphabetical FunctionNames, and per-delegate routing. The GREEN
// implementer replaces this stub with a concrete class that:
//   (a) calls `RegisterNetworkObjectAsync("platformScripture.checklistService",
//       [...], details)` with `NetworkObjectType.OBJECT`,
//   (b) registers the three functions — `buildChecklistData`,
//       `resolveComparativeTexts`, `validateMarkerSettings` — in
//       alphabetical order, each routing to the corresponding
//       ChecklistService / MarkersDataSource static method,
//   (c) is instantiated and initialized in Program.cs alongside the
//       other network objects.
// See:
//   - c-sharp/Projects/ProjectDataProviderFactory.cs:25-46 (canonical pattern)
//   - backend-alignment.md §"Network Object" (wire contract)
//   - data-contracts.md §7.1, §7.2 (wire shapes)
//   - strategic-plan-backend.md §CAP-011 (acceptance criteria)
/// <summary>
/// PAPI network object that exposes the checklist service's three stateless
/// methods (<c>buildChecklistData</c>, <c>resolveComparativeTexts</c>,
/// <c>validateMarkerSettings</c>) to extensions via
/// <c>papi.networkObjects.get&lt;IChecklistService&gt;(...)</c>.
/// Subclasses <see cref="NetworkObject"/> (NOT <see cref="DataProvider"/>)
/// because the checklist has no get/set/subscribe data-type triplet —
/// it is a stateless request/response service.
/// </summary>
internal class ChecklistNetworkObject : NetworkObject
{
    // Constructor parameters chosen to match the established
    // `ProjectDataProviderFactory`-style wiring: the PapiClient for
    // registration and the LocalParatextProjects for project resolution
    // (BuildChecklistData needs it). GREEN should store `paratextProjects`
    // as a private field for use inside the three delegate methods.
    public ChecklistNetworkObject(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base(papiClient)
    {
        _ = paratextProjects; // suppress unused-parameter warning in stub
    }

    /// <summary>
    /// Registers the checklist NetworkObject with PAPI. MUST call
    /// <c>RegisterNetworkObjectAsync("platformScripture.checklistService",
    /// [("buildChecklistData", ...), ("resolveComparativeTexts", ...),
    /// ("validateMarkerSettings", ...)], new NetworkObjectCreatedDetails {
    /// Id = "platformScripture.checklistService", ObjectType =
    /// NetworkObjectType.OBJECT, FunctionNames = [...] })</c>.
    /// </summary>
    public Task InitializeAsync()
    {
        throw new NotImplementedException(
            "CAP-011 RED stub — ChecklistNetworkObject.InitializeAsync not yet implemented. "
                + "See strategic-plan-backend.md §CAP-011 and "
                + "c-sharp-tests/Checklists/ChecklistNetworkObjectTests.cs for the "
                + "registration contract."
        );
    }
}

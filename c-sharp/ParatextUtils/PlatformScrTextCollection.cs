using System.Reflection;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.Users;
using SIL.WritingSystems;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// Adapted from ParatextScrTextCollection
/// </summary>
public class PlatformScrTextCollection : ScrTextCollection
{
    // keep track of languages that weren't found in SLDR so we don't call over and over for the same bad code
    private static readonly HashSet<string> s_sldrLookupFailed = [];

    // One-shot latch (0 = disarmed, 1 = armed) that makes the NEXT RefreshScrTextsInternal call -
    // the one ScrTextCollection.InitializeInternal performs during ParatextData.Initialize - a
    // no-op, deferring the initial project scan while keeping the rest of initialization (CMS
    // directory, English-language check, WriteLockManager change listener). Armed by
    // ParatextGlobals.Initialize when a valid metadata snapshot is in play; consumed by exactly one
    // refresh. Interlocked because arm/consume can happen on different threads.
    private static int s_deferNextRefresh;

    // Set (1) when a targeted project load added a ScrText to the collection BEFORE the first real
    // refresh ran. The base refresh only assembles joined HEB/GRK texts on an "initial load"
    // (empty index), which a pre-scan targeted add defeats - so the first real refresh must invoke
    // UpdateJoinedTexts itself (see RefreshScrTextsInternal). Consumed by that refresh.
    private static int s_preScanTargetedAddOccurred;

    /// <summary>
    /// Arms the one-shot deferral of the next (initial) project refresh. See
    /// <see cref="s_deferNextRefresh"/>.
    /// </summary>
    internal static void DeferInitialProjectRefresh() =>
        Interlocked.Exchange(ref s_deferNextRefresh, 1);

    /// <summary>
    /// Disarms a still-armed deferral so an upcoming refresh cannot be silently skipped. Called
    /// right before the deliberate full scan in case the deferred initialize-time refresh never
    /// ran (e.g. ParatextData was already pointed at the project root). Idempotent.
    /// </summary>
    internal static void CancelInitialProjectRefreshDeferral() =>
        Interlocked.Exchange(ref s_deferNextRefresh, 0);

    /// <summary>
    /// Records that a targeted project load added a ScrText before the first real refresh. See
    /// <see cref="s_preScanTargetedAddOccurred"/>.
    /// </summary>
    internal static void NotePreScanTargetedAdd() =>
        Interlocked.Exchange(ref s_preScanTargetedAddOccurred, 1);

    /// <summary>
    /// Test hook: clears the process-wide one-shot deferral state so a failed snapshot-mode test
    /// cannot leak an armed latch into later tests (which would silently skip their refresh).
    /// </summary>
    internal static void ResetProjectRefreshDeferralStateForTesting()
    {
        Interlocked.Exchange(ref s_deferNextRefresh, 0);
        Interlocked.Exchange(ref s_preScanTargetedAddOccurred, 0);
    }

    protected override void RefreshScrTextsInternal(bool allowMigration)
    {
        // Skip exactly the first call while latched: this runs inside InitializeInternal, so
        // deferring here (rather than deferring all of ParatextData.Initialize) keeps the CMS
        // directory, English-language check, and WriteLockManager change-listener setup on the
        // normal path.
        if (Interlocked.Exchange(ref s_deferNextRefresh, 0) == 1)
            return;

        base.RefreshScrTextsInternal(allowMigration);

        // If a targeted load populated the index pre-scan, the base call above saw a non-empty
        // index (initialLoad == false) and skipped building joined HEB/GRK texts; build them now.
        if (Interlocked.Exchange(ref s_preScanTargetedAddOccurred, 0) == 1)
            InvokeUpdateJoinedTexts();
    }

    /// <summary>
    /// Constructs the <see cref="ScrText"/> for a project exactly the way the full refresh would:
    /// the protected resource/XML-resource factories for resources, plain <see cref="ScrText"/>
    /// otherwise. Used by targeted pre-scan project loads so they reuse this collection's
    /// construction logic instead of duplicating it.
    /// </summary>
    internal ScrText CreateScrTextForProjectName(ProjectName name)
    {
        if (name.IsResource)
            return CreateResourceProject(name);
        if (name.IsXmlResource)
            return CreateXmlResourceProject(name);
        return new ScrText(name, RegistrationInfo.DefaultUser);
    }

    /// <summary>
    /// Invokes the private <c>ScrTextCollection.UpdateJoinedTexts</c> via reflection (pinned by
    /// <c>PlatformScrTextCollectionUpdateJoinedTextsPinTests</c>). Log-and-continue on any
    /// failure: missing joined HEB/GRK texts are a degraded state, not a startup failure, and the
    /// next initial load repairs them.
    /// </summary>
    private void InvokeUpdateJoinedTexts()
    {
        try
        {
            MethodInfo? updateJoinedTexts = typeof(ScrTextCollection).GetMethod(
                "UpdateJoinedTexts",
                BindingFlags.Instance | BindingFlags.NonPublic
            );
            if (updateJoinedTexts == null)
            {
                Console.Error.WriteLine(
                    "ScrTextCollection.UpdateJoinedTexts was not found via reflection; joined "
                        + "HEB/GRK resources may be missing until the next restart"
                );
                return;
            }
            updateJoinedTexts.Invoke(this, null);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"Invoking ScrTextCollection.UpdateJoinedTexts failed; joined HEB/GRK resources "
                    + $"may be missing until the next restart: {ex}"
            );
        }
    }

    protected override ScrText CreateResourceProject(ProjectName name)
    {
        return new ResourceScrText(
            name,
            RegistrationInfo.DefaultUser,
            new DblResourcePasswordProvider()
        );
    }

    protected override ScrText CreateXmlResourceProject(ProjectName name)
    {
        return new XmlResourceScrText(
            name,
            RegistrationInfo.DefaultUser,
            new DblResourcePasswordProvider()
        );
    }

    protected override UnsupportedReason MigrateProjectIfNeeded(ScrText scrText)
    {
        return scrText.NeedsMigration
            ? UnsupportedReason.CannotUpgrade
            : UnsupportedReason.Supported;
    }

    protected override WritingSystemDefinition CreateWsDef(string languageId, bool allowSldr)
    {
        // only check SLDR if allowed for this call and all internet access is enabled - SLDR isn't set up to use proxy
        WritingSystemDefinition? wsDef = null;
        if (
            allowSldr
            && InternetAccess.Status == InternetUse.Enabled
            && !s_sldrLookupFailed.Contains(languageId)
        )
        {
            try
            {
                var sldrFactory = new SldrWritingSystemFactory();
                sldrFactory.Create(languageId, out wsDef);
            }
            catch (Exception e)
            {
                // ignore any SLDR errors - there have been problems with entries on the server failing to parse.
                // also the id being provided may not be valid
                Console.WriteLine("Getting {0} from SLDR failed: {1}", languageId, e);
                s_sldrLookupFailed.Add(languageId);
            }
        }
        return wsDef!;
    }
}

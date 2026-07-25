using System.Text;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.ParatextUtils;

internal static class ParatextGlobals
{
    private static readonly object s_locker = new();
    private static bool s_initialized = false;

    /// <summary>
    /// One-time, process-wide ParatextData bootstrap: installs
    /// <see cref="PlatformScrTextCollection"/> and the encoding/alert/registry/ICU shims, then
    /// points ParatextData at the projects root (which runs the initial project scan unless
    /// deferred). Idempotent and thread-safe; later calls only re-point the data path (used by
    /// tests) and re-arm the scan deferral when requested.
    /// </summary>
    /// <param name="dataFolderPath">Folder ParatextData should treat as the projects root.</param>
    /// <param name="deferProjectScan">
    /// When true, arms <see cref="PlatformScrTextCollection.DeferInitialProjectRefresh"/> right
    /// before ParatextData initialization so the initial project scan inside
    /// <c>ScrTextCollection.InitializeInternal</c> is skipped (snapshot mode); the caller then
    /// runs the real scan later via <c>ScrTextCollection.RefreshScrTexts</c>.
    /// </param>
    public static void Initialize(string dataFolderPath, bool deferProjectScan = false)
    {
        if (s_initialized)
        {
            if (deferProjectScan)
                PlatformScrTextCollection.DeferInitialProjectRefresh();
            // Update the paratext data path to make sure we're using the latest path passed in
            // For now, this is only used in tests
            SetParatextDataPath(dataFolderPath);
            return;
        }

        lock (s_locker)
        {
            if (s_initialized)
                return;

            // Override a few key functions for ScrTextCollection static methods to work
            ScrTextCollection.Implementation = new PlatformScrTextCollection();

            // Required for the Paratext.Data.Encodings.StringEncoders static constructor
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            // Required for non-Windows platforms.
            // AlertCapture is a strict superset of AlertStub: when a caller
            // installs an `AlertCapture.StartCapture()` scope, ParatextData's
            // Alert.Show / Alert.ShowLater calls are recorded as AlertEntry
            // records on that scope; out-of-scope, AlertCapture falls back to
            // the same Console.WriteLine + Negative behavior AlertStub used.
            // Without this assignment, AlertCapture's ShowInternal is never
            // invoked and import/copy/create alert capture is silently empty.
            Alert.Implementation = new AlertCapture();
            RegistryU.Implementation = new RegistryStub();

            // Required for ICU.NET
            ICUDllLocator.Initialize(false, false);

            // Arm the one-shot scan deferral before ParatextData.Initialize runs the initial
            // refresh (inside SetParatextDataPath below).
            if (deferProjectScan)
                PlatformScrTextCollection.DeferInitialProjectRefresh();

            // Now tell Paratext.Data to use the specified folder
            SetParatextDataPath(dataFolderPath);
        }
    }

    private static void SetParatextDataPath(string dataFolderPath)
    {
        dataFolderPath = Path.GetFullPath(dataFolderPath); // Make sure path is rooted
        ParatextData.Initialize(dataFolderPath, false);
        s_initialized = true;
    }
}

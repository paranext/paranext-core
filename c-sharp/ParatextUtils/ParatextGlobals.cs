using System.Diagnostics;
using System.Text;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.ParatextUtils
{
    internal static class ParatextGlobals
    {
        private static readonly object s_locker = new();
        private static bool s_initialized = false;

        public static void Initialize(string dataFolderPath)
        {
            if (s_initialized)
            {
                // Update the paratext data path to make sure we're using the latest path passed in
                // For now, this is only used in tests
                SetParatextDataPath(dataFolderPath);
                return;
            }

            lock (s_locker)
            {
                if (s_initialized)
                    return;

                var globalsStopwatch = Stopwatch.StartNew();

                // Override a few key functions for ScrTextCollection static methods to work
                ScrTextCollection.Implementation = new PlatformScrTextCollection();
                Console.WriteLine(
                    $"ParatextGlobals timing: ScrTextCollection.Implementation set at {globalsStopwatch.ElapsedMilliseconds}ms"
                );

                // Required for the Paratext.Data.Encodings.StringEncoders static constructor
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                Console.WriteLine(
                    $"ParatextGlobals timing: Encoding.RegisterProvider done at {globalsStopwatch.ElapsedMilliseconds}ms"
                );

                // Required for non-Windows platforms
                Alert.Implementation = new AlertStub();
                RegistryU.Implementation = new RegistryStub();
                Console.WriteLine(
                    $"ParatextGlobals timing: Alert/Registry stubs done at {globalsStopwatch.ElapsedMilliseconds}ms"
                );

                // Required for ICU.NET
                ICUDllLocator.Initialize(false, false);
                Console.WriteLine(
                    $"ParatextGlobals timing: ICUDllLocator.Initialize done at {globalsStopwatch.ElapsedMilliseconds}ms"
                );

                // Now tell Paratext.Data to use the specified folder
                Console.WriteLine(
                    $"ParatextGlobals timing: ParatextData.Initialize starting at {globalsStopwatch.ElapsedMilliseconds}ms"
                );
                SetParatextDataPath(dataFolderPath);
                Console.WriteLine(
                    $"ParatextGlobals timing: ParatextData.Initialize done at {globalsStopwatch.ElapsedMilliseconds}ms"
                );
            }
        }

        private static void SetParatextDataPath(string dataFolderPath)
        {
            dataFolderPath = Path.GetFullPath(dataFolderPath); // Make sure path is rooted
            ParatextData.Initialize(dataFolderPath, false);
            s_initialized = true;
        }
    }
}

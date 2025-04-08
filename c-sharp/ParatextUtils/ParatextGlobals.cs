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

                // Override a few key functions for ScrTextCollection static methods to work
                ScrTextCollection.Implementation = new PlatformScrTextCollection();

                // Required for the Paratext.Data.Encodings.StringEncoders static constructor
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

                // Required for non-Windows platforms
                Alert.Implementation = new AlertStub();
                RegistryU.Implementation = new RegistryStub();

                // Required for ICU.NET
                ICUDllLocator.Initialize(false, false);

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
}

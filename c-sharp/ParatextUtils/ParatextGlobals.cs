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
            // Paratext not supported on MacOS for now
            if (OperatingSystem.IsMacOS())
                return;

            if (s_initialized)
                return;

            lock (s_locker)
            {
                if (s_initialized)
                    return;

                // Required for the Paratext.Data.Encodings.StringEncoders static constructor
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

                // Required for non-Windows platforms
                Alert.Implementation = new AlertStub();
                RegistryU.Implementation = new RegistryStub();

                // Required for ICU.NET
                ICUDllLocator.Initialize(false, false);

                // Now tell Paratext.Data to use the specified folder
                ParatextData.Initialize(dataFolderPath, false);
                s_initialized = true;
            }
        }
    }
}

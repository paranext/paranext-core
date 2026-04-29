using System.Text;
using PtxUtils;

namespace MarbleSchemaExtractor;

internal static class Program
{
    public static int Main(string[] args)
    {
        if (args.Length == 0)
        {
            PrintUsage();
            return 1;
        }

        InitializeParatextEnvironment();

        try
        {
            return CommandDispatcher.Dispatch(args);
        }
        catch (UsageException ex)
        {
            Console.Error.WriteLine(ex.Message);
            PrintUsage();
            return 2;
        }
    }

    /// <summary>
    /// Installs minimal ParatextUtils stubs so that <c>RegistrationInfo.DefaultUser</c>
    /// can be invoked on non-Windows platforms without a registry NRE. We deliberately
    /// avoid <c>ParatextData.Initialize</c> here — the extractor only needs registration
    /// validation and SharpZipLib decryption; full Paratext data initialization is
    /// unnecessary and would pull in ICU + project-collection setup.
    /// </summary>
    private static void InitializeParatextEnvironment()
    {
        // Required so RegistryU.GetString / .SetVal calls don't NRE on Linux/macOS.
        RegistryU.Implementation = new RegistryStub();

        // Required so any unexpected ParatextData warning paths don't try to pop a dialog.
        Alert.Implementation = new AlertStub();

        // Required for some Paratext.Data string-decoding paths the password decrypt may touch.
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
    }

    private static void PrintUsage()
    {
        Console.Error.WriteLine(
            """
            Usage:
              dotnet run -- --list <zip-path>
              dotnet run -- --stats <zip-path> --type {lexicon|encyclopedia|domains|images|bible|source}
              dotnet run -- --samples <zip-path> --type {...} --count N
            """
        );
    }
}

internal sealed class UsageException(string message) : Exception(message);

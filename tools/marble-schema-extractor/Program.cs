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

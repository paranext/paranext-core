namespace Paranext.WireSurface;

internal static class Program
{
    private static int Main(string[] args)
    {
        Console.Error.WriteLine(
            "usage: Paranext.WireSurface --project <csproj> --repo-root <dir> --tracked-files <list> --out <json>"
        );
        return 64;
    }
}

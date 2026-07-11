namespace Paranext.DataProvider.Services;

/// <summary>
/// Emits startup timing marks matching the TypeScript <c>markStartup</c> format
/// (<c>STARTUP_MARK &lt;proc&gt; &lt;name&gt; &lt;epochMs&gt;</c>) so the startup-waterfall parser can
/// order marks across processes. Disabled by default; enabled per launch via the
/// <c>PT_STARTUP_MARKS=true</c> environment variable. No-op when disabled.
/// </summary>
internal static class StartupTiming
{
    private const string Prefix = "STARTUP_MARK";
    private const string ProcessTag = ".net";

    /// <summary>Whether marks are emitted. Set once at startup from the environment.</summary>
    public static bool Enabled { get; set; } =
        Environment.GetEnvironmentVariable("PT_STARTUP_MARKS") == "true";

    /// <summary>Emit one startup mark. No-op when <see cref="Enabled"/> is false.</summary>
    public static void Mark(string name)
    {
        if (!Enabled)
            return;
        Console.WriteLine(
            $"{Prefix} {ProcessTag} {name} {DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}"
        );
    }
}

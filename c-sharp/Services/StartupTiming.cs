using System.Collections.Concurrent;

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

    /// <summary>Names already emitted via <see cref="MarkOnce"/>.</summary>
    private static readonly ConcurrentDictionary<string, byte> s_emittedOnce = new();

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

    /// <summary>
    /// Emit the named mark at most once per process. Use for "first time X happens" marks reached
    /// from concurrently-callable code (e.g. the first chapter served) so re-runs or concurrent
    /// first calls don't emit duplicate marks. Thread-safe: <c>TryAdd</c> lets exactly one caller
    /// win the race for a given name. No-op when <see cref="Enabled"/> is false.
    /// </summary>
    public static void MarkOnce(string name)
    {
        if (!Enabled)
            return;
        if (s_emittedOnce.TryAdd(name, 0))
            Mark(name);
    }
}

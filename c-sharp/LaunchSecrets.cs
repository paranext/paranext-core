using System.Text.Json;

namespace Paranext.DataProvider;

/// <summary>
/// The secrets main hands this process when it launches it: the client secret this process presents
/// when it connects to main's PAPI WebSocket, and the server secret main must send back to prove it
/// is the main that launched this process. A data provider started without main has none and
/// connects unidentified.
/// </summary>
/// <remarks>
/// A class rather than a record, so no generated <c>ToString</c> can print the secrets. Never log
/// either value.
/// </remarks>
internal sealed class LaunchSecrets
{
    /// <summary>
    /// Carries the secrets in development, where <c>dotnet watch</c> has to pass them on to each
    /// process it restarts. Holds the same JSON a packaged build reads from standard input.
    /// </summary>
    public const string ENVIRONMENT_VARIABLE = "PAPI_LAUNCH_SECRETS";

    /// <summary>
    /// Command-line argument with which main tells a packaged build to read the secrets from standard
    /// input. Without it this process never waits on standard input, so a data provider started by
    /// another tool that redirects standard input is not held up.
    /// </summary>
    public const string STANDARD_INPUT_FLAG = "--launch-secrets-on-stdin";

    /// <summary>How long to wait for main to write the secrets to standard input</summary>
    public static readonly TimeSpan StandardInputTimeout = TimeSpan.FromSeconds(5);

    private LaunchSecrets(string clientSecret, string serverSecret)
    {
        ClientSecret = clientSecret;
        ServerSecret = serverSecret;
    }

    public string ClientSecret { get; }
    public string ServerSecret { get; }

    public override string ToString() => nameof(LaunchSecrets);

    /// <summary>
    /// Reads the secrets main handed this process: from one line of standard input when main asked
    /// for that (see <see cref="ShouldReadStandardInput"/>), or else from
    /// <see cref="ENVIRONMENT_VARIABLE"/>. The variable is cleared either way, so processes this one
    /// starts do not inherit it.
    /// </summary>
    public static LaunchSecrets? ReadForThisProcess() =>
        ReadFromEnvironmentOrStandardInput(
            Environment.GetEnvironmentVariable,
            name => Environment.SetEnvironmentVariable(name, null),
            ShouldReadStandardInput(Environment.GetCommandLineArgs(), Console.IsInputRedirected)
                ? ReadStandardInputLine
                : null
        );

    /// <summary>
    /// Whether to wait for the secrets on standard input: only when main passed
    /// <see cref="STANDARD_INPUT_FLAG"/> and standard input is redirected
    /// </summary>
    public static bool ShouldReadStandardInput(string[] commandLineArgs, bool isInputRedirected) =>
        isInputRedirected && commandLineArgs.Contains(STANDARD_INPUT_FLAG);

    /// <summary>
    /// Reads one line of standard input when <paramref name="readStandardInputLine"/> is given, else
    /// the environment variable, and clears the variable. Null when the source read holds no valid
    /// secrets. Standard input wins because main asks for it only when it writes the secrets there,
    /// and a variable that is set as well can only have been inherited from elsewhere.
    /// </summary>
    /// <param name="readStandardInputLine">Reads one line of standard input, waiting at most the
    /// given time; returns null when nothing arrived. Null when standard input is not redirected.</param>
    public static LaunchSecrets? ReadFromEnvironmentOrStandardInput(
        Func<string, string?> getEnvironmentVariable,
        Action<string> clearEnvironmentVariable,
        Func<TimeSpan, string?>? readStandardInputLine
    )
    {
        string? fromEnvironment = getEnvironmentVariable(ENVIRONMENT_VARIABLE);
        if (fromEnvironment != null)
            clearEnvironmentVariable(ENVIRONMENT_VARIABLE);
        return readStandardInputLine is null
            ? Parse(fromEnvironment)
            : Parse(readStandardInputLine(StandardInputTimeout));
    }

    /// <summary>
    /// Parses <c>{"clientSecret":"…","serverSecret":"…"}</c>. Null for anything else, including
    /// an empty secret.
    /// </summary>
    public static LaunchSecrets? Parse(string? json)
    {
        if (string.IsNullOrEmpty(json))
            return null;
        try
        {
            using JsonDocument document = JsonDocument.Parse(json);
            JsonElement root = document.RootElement;
            if (
                root.ValueKind != JsonValueKind.Object
                || !root.TryGetProperty("clientSecret", out JsonElement client)
                || client.ValueKind != JsonValueKind.String
                || !root.TryGetProperty("serverSecret", out JsonElement server)
                || server.ValueKind != JsonValueKind.String
            )
                return null;
            string? clientSecret = client.GetString();
            string? serverSecret = server.GetString();
            return string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(serverSecret)
                ? null
                : new LaunchSecrets(clientSecret, serverSecret);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private static string? ReadStandardInputLine(TimeSpan timeout)
    {
        // Console.In blocks even through its async API, so read on a pool thread and stop waiting
        // after the timeout. A read that never completes leaves that thread blocked, which only
        // happens when main passed the flag but wrote nothing to standard input.
        try
        {
            return ThreadingUtils.GetTaskResult(
                Task.Run(Console.In.ReadLine),
                "read the launch secrets from standard input",
                timeout
            );
        }
        catch (TimeoutException)
        {
            return null;
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using System.Runtime.Versioning;
using Tmds.DBus.Protocol;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only IBus D-Bus adapter — PT9 is Windows-only and reaches keyboards
// through SIL.Windows.Forms.Keyboarding (whose Linux sibling uses ibusdotnet/GLib);
// PT10's headless net8.0 data provider talks to the IBus daemon directly over D-Bus
// via Tmds.DBus.Protocol (decision-registry libraries.csharp.dbusClient, BA-RF-005).
// Address discovery, connection lifecycle, and sync-over-async strategy documented in
// .context/features/keyboard-switching/implementation/decisions/keyboarding-linux.md.
// Maps to: CAP-005
/// <summary>
/// Real Linux implementation of <see cref="IIbusKeyboardApi"/>: calls
/// <c>ListEngines</c> / <c>GetGlobalEngine</c> / <c>SetGlobalEngine</c> on the
/// <c>org.freedesktop.IBus</c> interface of the IBus daemon's private D-Bus bus
/// (address discovered per IBus conventions — see <see cref="GetIbusAddress"/>).
/// <br />
/// Each call opens a fresh connection and disposes it afterwards: traffic is
/// low-frequency (dropdown population, focus-driven activation), connecting to a unix
/// socket is cheap, and a per-call connection self-heals after the daemon restarts or
/// the connection drops mid-session. An unreachable daemon (XKB-only system) surfaces
/// as a throw from any member — <see cref="LinuxKeyboardingPrimitive"/> owns
/// containment (VAL-B-04).
/// </summary>
[SupportedOSPlatform("linux")]
internal sealed class IbusKeyboardApi : IIbusKeyboardApi
{
    // The IBus daemon hosts its own private bus and owns this well-known name on it;
    // the keyboard surface lives on one object/interface (ibus/bus/ibusimpl.c).
    private const string IBUS_SERVICE = "org.freedesktop.IBus";
    private const string IBUS_PATH = "/org/freedesktop/IBus";
    private const string IBUS_INTERFACE = "org.freedesktop.IBus";

    // IBus raises G_DBUS_ERROR_FAILED ("No global engine.") from GetGlobalEngine when
    // no global engine is set — a normal state on a reachable daemon, not a fault.
    private const string DBUS_ERROR_FAILED = "org.freedesktop.DBus.Error.Failed";

    // Bounds every connect and method call so a hung daemon degrades to the graceful
    // fallback (the primitive contains the TimeoutException) instead of blocking a
    // keyboard read/activation indefinitely.
    private static readonly TimeSpan s_callTimeout = TimeSpan.FromSeconds(5);

    // Where D-Bus publishes the machine id, in lookup order (matches ibusshare.c).
    private static readonly string[] s_machineIdPaths =
    [
        "/var/lib/dbus/machine-id",
        "/etc/machine-id",
    ];

    public IReadOnlyList<IbusEngineDescriptor> ListEngines()
    {
        // Sync-over-async is safe here: the data-provider process has no
        // SynchronizationContext (thread-pool continuations only) and every awaited
        // operation inside is bounded by s_callTimeout.
        return ListEnginesAsync().GetAwaiter().GetResult();
    }

    public string? GetGlobalEngine()
    {
        try
        {
            return GetGlobalEngineAsync().GetAwaiter().GetResult();
        }
        catch (DBusErrorReplyException e) when (e.ErrorName == DBUS_ERROR_FAILED)
        {
            // Reachable daemon, no global engine set — the seam's "none" value.
            return null;
        }
    }

    public async Task<bool> SetGlobalEngineAsync(string engineName)
    {
        // Connect failures and timeouts propagate (fault the task) per the seam
        // contract — the primitive contains them.
        using DBusConnection connection = await ConnectAsync();
        try
        {
            await connection
                .CallMethodAsync(CreateSetGlobalEngineMessage(connection, engineName))
                .WaitAsync(s_callTimeout);
            return true;
        }
        catch (DBusErrorReplyException)
        {
            // Reachable daemon rejected the engine (e.g. uninstalled between
            // enumeration and activation) — the seam's "rejected" value.
            return false;
        }
    }

    private static async Task<IReadOnlyList<IbusEngineDescriptor>> ListEnginesAsync()
    {
        using DBusConnection connection = await ConnectAsync();
        return await connection
            .CallMethodAsync(
                CreateMessage(connection, "ListEngines"),
                static (Message message, object? _) =>
                {
                    // Reply signature "av": each variant wraps one IBusEngineDesc.
                    Reader reader = message.GetBodyReader();
                    VariantValue[] engines = reader.ReadArrayOfVariantValue();
                    var descriptors = new List<IbusEngineDescriptor>(engines.Length);
                    foreach (VariantValue engine in engines)
                    {
                        if (TryReadEngineDesc(engine, out IbusEngineDescriptor? descriptor))
                            descriptors.Add(descriptor);
                    }
                    return (IReadOnlyList<IbusEngineDescriptor>)descriptors;
                }
            )
            .WaitAsync(s_callTimeout);
    }

    private static async Task<string?> GetGlobalEngineAsync()
    {
        using DBusConnection connection = await ConnectAsync();
        return await connection
            .CallMethodAsync(
                CreateMessage(connection, "GetGlobalEngine"),
                static (Message message, object? _) =>
                {
                    // Reply signature "v": the variant wraps one IBusEngineDesc.
                    Reader reader = message.GetBodyReader();
                    VariantValue engine = reader.ReadVariantValue();
                    return TryReadEngineDesc(engine, out IbusEngineDescriptor? descriptor)
                        ? descriptor.Name
                        : null;
                }
            )
            .WaitAsync(s_callTimeout);
    }

    /// <summary>
    /// Reads one IBusEngineDesc out of an unwrapped variant, defensively.
    /// </summary>
    private static bool TryReadEngineDesc(
        VariantValue value,
        [NotNullWhen(true)] out IbusEngineDescriptor? descriptor
    )
    {
        // EXPLANATION:
        // IBus serializes GObjects as a struct whose first two fields are fixed by
        // IBusSerializable — ("IBusEngineDesc", a{sv} attachments, ...) — followed by
        // the type's own fields in declaration order: name (item 2), longname (item 3),
        // description, language, license, author, icon, layout, rank, .... Trailing
        // fields have been APPENDED across IBus releases (layout_variant, version,
        // textdomain, icon_prop_key, ...), so the struct is read positionally and
        // leniently: require only the two fields this seam carries, skip anything
        // malformed instead of failing the whole enumeration.
        descriptor = null;

        if (value.Type != VariantValueType.Struct || value.Count < 4)
            return false;

        VariantValue name = value.GetItem(2);
        VariantValue longName = value.GetItem(3);
        if (name.Type != VariantValueType.String || longName.Type != VariantValueType.String)
            return false;

        string engineName = name.GetString();
        if (engineName.Length == 0)
            return false; // an engine IBus cannot activate by name is not a keyboard

        descriptor = new IbusEngineDescriptor(engineName, longName.GetString());
        return true;
    }

    private static async Task<DBusConnection> ConnectAsync()
    {
        var connection = new DBusConnection(GetIbusAddress());
        try
        {
            await connection.ConnectAsync().AsTask().WaitAsync(s_callTimeout);
            return connection;
        }
        catch
        {
            connection.Dispose();
            throw;
        }
    }

    private static MessageBuffer CreateMessage(DBusConnection connection, string member)
    {
        using MessageWriter writer = connection.GetMessageWriter();
        writer.WriteMethodCallHeader(
            destination: IBUS_SERVICE,
            path: IBUS_PATH,
            @interface: IBUS_INTERFACE,
            member: member
        );
        return writer.CreateMessage();
    }

    private static MessageBuffer CreateSetGlobalEngineMessage(
        DBusConnection connection,
        string engineName
    )
    {
        using MessageWriter writer = connection.GetMessageWriter();
        writer.WriteMethodCallHeader(
            destination: IBUS_SERVICE,
            path: IBUS_PATH,
            @interface: IBUS_INTERFACE,
            member: "SetGlobalEngine",
            signature: "s"
        );
        writer.WriteString(engineName);
        return writer.CreateMessage();
    }

    /// <summary>
    /// Discovers the IBus daemon's private D-Bus address per IBus's own conventions.
    /// Throws when IBus is evidently not running (no address file) — the primitive
    /// contains this as the XKB-only graceful fallback.
    /// </summary>
    private static string GetIbusAddress()
    {
        // EXPLANATION (mirrors ibus_get_address / ibus_get_socket_path in
        // ibus/src/ibusshare.c):
        // 1. IBUS_ADDRESS env var wins outright.
        // 2. Otherwise the daemon writes its address to a per-display file:
        //    $IBUS_ADDRESS_FILE, or {config}/ibus/bus/{machine-id}-{host}-{display}
        //    where {config} is $XDG_CONFIG_HOME (default ~/.config). Under Wayland
        //    (WAYLAND_DISPLAY checked FIRST, matching current IBus) the display part
        //    is the whole WAYLAND_DISPLAY value (e.g. "wayland-0"); under X11 it is
        //    parsed from DISPLAY ("[host]:number[.screen]", host defaulting to
        //    "unix", number to "0").
        // 3. The file's "IBUS_ADDRESS=..." line carries the D-Bus address
        //    (e.g. "unix:abstract=/home/u/.cache/ibus/dbus-XXXX,guid=...").
        string? address = Environment.GetEnvironmentVariable("IBUS_ADDRESS");
        if (!string.IsNullOrEmpty(address))
            return address;

        string addressFilePath = GetIbusAddressFilePath();
        if (!File.Exists(addressFilePath))
        {
            throw new InvalidOperationException(
                $"IBus address file not found at '{addressFilePath}' — "
                    + "the IBus daemon does not appear to be running"
            );
        }

        const string addressLineMarker = "IBUS_ADDRESS=";
        foreach (string line in File.ReadLines(addressFilePath))
        {
            if (line.StartsWith(addressLineMarker, StringComparison.Ordinal))
                return line[addressLineMarker.Length..];
        }

        throw new InvalidOperationException(
            $"IBus address file '{addressFilePath}' contains no {addressLineMarker} line"
        );
    }

    private static string GetIbusAddressFilePath()
    {
        string? overridePath = Environment.GetEnvironmentVariable("IBUS_ADDRESS_FILE");
        if (!string.IsNullOrEmpty(overridePath))
            return overridePath;

        string hostname = "unix";
        string displayNumber = "0";

        string? display = Environment.GetEnvironmentVariable("WAYLAND_DISPLAY");
        if (!string.IsNullOrEmpty(display))
        {
            // Wayland: the whole WAYLAND_DISPLAY value is the display part.
            displayNumber = display;
        }
        else
        {
            display = Environment.GetEnvironmentVariable("DISPLAY");
            if (!string.IsNullOrEmpty(display))
            {
                // X11 "[host]:number[.screen]" — screen is ignored, like IBus does.
                int colonIndex = display.IndexOf(':');
                if (colonIndex < 0)
                {
                    hostname = display;
                }
                else
                {
                    if (colonIndex > 0)
                        hostname = display[..colonIndex];
                    string numberAndScreen = display[(colonIndex + 1)..];
                    int dotIndex = numberAndScreen.IndexOf('.');
                    displayNumber = dotIndex < 0 ? numberAndScreen : numberAndScreen[..dotIndex];
                }
            }
        }

        string? configDir = Environment.GetEnvironmentVariable("XDG_CONFIG_HOME");
        if (string.IsNullOrEmpty(configDir))
        {
            configDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                ".config"
            );
        }

        return Path.Combine(
            configDir,
            "ibus",
            "bus",
            $"{GetMachineId()}-{hostname}-{displayNumber}"
        );
    }

    private static string GetMachineId()
    {
        foreach (string path in s_machineIdPaths)
        {
            try
            {
                string machineId = File.ReadAllText(path).Trim();
                if (machineId.Length > 0)
                    return machineId;
            }
            catch (Exception e) when (e is IOException or UnauthorizedAccessException)
            {
                // try the next location
            }
        }
        // Same last-resort literal IBus itself falls back to (ibusshare.c).
        return "machine-id";
    }
}

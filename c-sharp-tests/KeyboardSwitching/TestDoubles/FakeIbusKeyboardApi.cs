using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.TestDoubles;

/// <summary>
/// Hand-rolled configurable fake of the CAP-005 IBus seam
/// (<see cref="IIbusKeyboardApi"/>) so the Linux primitive's mapping and guard logic is
/// testable on any OS. Records activation calls and can be armed to throw synchronously
/// from any member (daemon unreachable / connection lost) or to fault the activation
/// task (activation timeout) to verify VAL-B-04 error containment.
/// </summary>
internal sealed class FakeIbusKeyboardApi : IIbusKeyboardApi
{
    /// <summary>Engines returned by <see cref="ListEngines"/>.</summary>
    public List<IbusEngineDescriptor> Engines { get; } = [];

    /// <summary>Engine name returned by <see cref="GetGlobalEngine"/>; null = none set.</summary>
    public string? GlobalEngine { get; set; }

    /// <summary>Result returned by <see cref="SetGlobalEngineAsync"/>.</summary>
    public bool SetGlobalEngineResult { get; set; } = true;

    /// <summary>
    /// When set, every member throws this exception synchronously — models the IBus
    /// daemon being unreachable (XKB-only system) or the D-Bus connection dropping.
    /// </summary>
    public Exception? ThrowOnAnyCall { get; set; }

    /// <summary>
    /// When set, <see cref="SetGlobalEngineAsync"/> returns a FAULTED task carrying
    /// this exception — models an activation call that times out after dispatch.
    /// </summary>
    public Exception? FaultActivationWith { get; set; }

    /// <summary>Every engine name passed to <see cref="SetGlobalEngineAsync"/>, in call order.</summary>
    public List<string> SetGlobalEngineCalls { get; } = [];

    public IReadOnlyList<IbusEngineDescriptor> ListEngines()
    {
        ThrowIfArmed();
        return Engines;
    }

    public string? GetGlobalEngine()
    {
        ThrowIfArmed();
        return GlobalEngine;
    }

    public Task<bool> SetGlobalEngineAsync(string engineName)
    {
        ThrowIfArmed();
        SetGlobalEngineCalls.Add(engineName);
        if (FaultActivationWith != null)
            return Task.FromException<bool>(FaultActivationWith);
        return Task.FromResult(SetGlobalEngineResult);
    }

    private void ThrowIfArmed()
    {
        if (ThrowOnAnyCall != null)
            throw ThrowOnAnyCall;
    }
}

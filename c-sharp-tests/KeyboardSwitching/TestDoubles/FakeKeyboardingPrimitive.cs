using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.TestDoubles;

/// <summary>
/// Hand-rolled configurable fake of the CAP-002 OS-primitive contract
/// (<see cref="IKeyboardingPrimitive"/>), injected into the CAP-007
/// <c>OsKeyboardDataProvider</c> engine so its tests run without touching the OS
/// (backend-alignment.md §"New Test Infrastructure Needed"). Records activation calls
/// and can be armed to throw from <see cref="ActivateAsync"/> to verify VAL-B-04
/// error containment at the wire boundary. Style mirrors
/// <see cref="FakeWindowsKeyboardLayoutApi"/>.
/// </summary>
internal sealed class FakeKeyboardingPrimitive : IKeyboardingPrimitive
{
    /// <summary>Options returned by <see cref="EnumerateAvailable"/>.</summary>
    public List<KeyboardOption> AvailableKeyboards { get; } = [];

    /// <summary>
    /// Id reported by <see cref="GetCurrentlyActiveKeyboardId"/>; null = none/unknown.
    /// Updated by a successful <see cref="ActivateAsync"/> (mirrors a real OS where
    /// activation makes the keyboard current).
    /// </summary>
    public string? CurrentKeyboardId { get; set; }

    /// <summary>Result returned by <see cref="ActivateAsync"/>.</summary>
    public bool ActivateResult { get; set; } = true;

    /// <summary>
    /// When set, <see cref="ActivateAsync"/> throws this exception INSTEAD of honoring
    /// <see cref="ActivateResult"/>. Real primitives promise never to throw (CAP-002),
    /// but the DataProvider must still contain a misbehaving primitive (VAL-B-04
    /// defense in depth — strategic plan CAP-007 Edge Cases).
    /// </summary>
    public Exception? ActivateException { get; set; }

    /// <summary>Every keyboard id passed to <see cref="ActivateAsync"/>, in call order.</summary>
    public List<string> ActivateCalls { get; } = [];

    public IReadOnlyList<KeyboardOption> EnumerateAvailable()
    {
        return AvailableKeyboards;
    }

    public Task<bool> ActivateAsync(string keyboardId)
    {
        ActivateCalls.Add(keyboardId);

        if (ActivateException != null)
            throw ActivateException;

        if (ActivateResult)
            CurrentKeyboardId = keyboardId;

        return Task.FromResult(ActivateResult);
    }

    public string? GetCurrentlyActiveKeyboardId()
    {
        return CurrentKeyboardId;
    }
}

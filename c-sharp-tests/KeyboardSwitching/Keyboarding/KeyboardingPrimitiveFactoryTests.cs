using System.Runtime.InteropServices;
using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-003: KeyboardingPrimitiveFactory — platform dispatch via RuntimeInformation.
/// PT10-only design (no PT9 TS-XXX / BHV-XXX) — these tests ARE the dispatch
/// specification: Windows → WindowsKeyboardingPrimitive, Linux →
/// LinuxKeyboardingPrimitive, macOS (OSPlatform.OSX) → MacKeyboardingPrimitive,
/// anything else → NoOpKeyboardingPrimitive (data-contracts.md §9 "Cross-Platform OS
/// Keyboarding"; backend-alignment.md §Architecture).
/// <br />
/// The OS-conditional behavior is tested through the internal seam overload
/// <c>Create(Func&lt;OSPlatform, bool&gt; isOsPlatform)</c> (strategic plan CAP-003:
/// "seam allows test injection of platform predicate"; same internal-seam +
/// InternalsVisibleTo pattern as CAP-004/005/006). All three platform primitives
/// construct without touching OS interop (lazy adapters — verified in their doc
/// contracts), so every dispatch path runs on any test host.
/// </summary>
[TestFixture]
public class KeyboardingPrimitiveFactoryTests
{
    /// <summary>
    /// Fake platform predicate: true exactly for <paramref name="platform"/> — models
    /// RuntimeInformation.IsOSPlatform on a host running that OS (the real predicate
    /// is mutually exclusive across desktop OSes).
    /// </summary>
    private static Func<OSPlatform, bool> OsIs(OSPlatform platform)
    {
        return candidate => candidate == platform;
    }

    /// <summary>
    /// Fake platform predicate for an OS the factory does not know: false for every
    /// candidate (e.g., a future/unknown platform).
    /// </summary>
    private static readonly Func<OSPlatform, bool> NoKnownOs = _ => false;

    // ===================================================================================
    // Outer acceptance test (Outside-In TDD done signal for CAP-003)
    // ===================================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Description(
        "Acceptance test: factory selects the correct primitive type for all four "
            + "dispatch paths — Windows, Linux, macOS, and unknown-OS fallback to NoOp"
    )]
    public void Create_ForEachPlatformPredicate_SelectsMatchingPrimitiveType()
    {
        // The factory's entire contract IS "which concrete IKeyboardingPrimitive".
        // Each product's behavior is specified by its own capability
        // (CAP-002/004/005/006); here we pin only the dispatch.
        Assert.Multiple(() =>
        {
            Assert.That(
                KeyboardingPrimitiveFactory.Create(OsIs(OSPlatform.Windows)),
                Is.InstanceOf<WindowsKeyboardingPrimitive>(),
                "Windows host must get the user32-backed primitive"
            );
            Assert.That(
                KeyboardingPrimitiveFactory.Create(OsIs(OSPlatform.Linux)),
                Is.InstanceOf<LinuxKeyboardingPrimitive>(),
                "Linux host must get the IBus-backed primitive"
            );
            Assert.That(
                KeyboardingPrimitiveFactory.Create(OsIs(OSPlatform.OSX)),
                Is.InstanceOf<MacKeyboardingPrimitive>(),
                "macOS host must get the Text Input Services-backed primitive"
            );
            Assert.That(
                KeyboardingPrimitiveFactory.Create(NoKnownOs),
                Is.InstanceOf<NoOpKeyboardingPrimitive>(),
                "an unknown OS must fall back to the NoOp, never crash"
            );
        });
    }

    // ===================================================================================
    // Seam overload: one contract test per dispatch path
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_WhenPredicateSaysWindows_ReturnsWindowsKeyboardingPrimitive()
    {
        IKeyboardingPrimitive primitive = KeyboardingPrimitiveFactory.Create(
            OsIs(OSPlatform.Windows)
        );

        Assert.That(primitive, Is.InstanceOf<WindowsKeyboardingPrimitive>());
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_WhenPredicateSaysLinux_ReturnsLinuxKeyboardingPrimitive()
    {
        IKeyboardingPrimitive primitive = KeyboardingPrimitiveFactory.Create(
            OsIs(OSPlatform.Linux)
        );

        Assert.That(primitive, Is.InstanceOf<LinuxKeyboardingPrimitive>());
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_WhenPredicateSaysMacOs_ReturnsMacKeyboardingPrimitive()
    {
        // macOS is OSPlatform.OSX in .NET's platform vocabulary.
        IKeyboardingPrimitive primitive = KeyboardingPrimitiveFactory.Create(OsIs(OSPlatform.OSX));

        Assert.That(primitive, Is.InstanceOf<MacKeyboardingPrimitive>());
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_WhenPredicateMatchesNoKnownOs_ReturnsNoOpKeyboardingPrimitive()
    {
        // Strategic-plan edge case: unknown OS falls back to NoOp. Because this test
        // RUNS on a real, known OS while the injected predicate denies every platform,
        // it also proves the factory consults ONLY the injected seam — it must not
        // bypass the predicate and ask RuntimeInformation directly (plan decision D4).
        IKeyboardingPrimitive primitive = KeyboardingPrimitiveFactory.Create(NoKnownOs);

        Assert.That(primitive, Is.InstanceOf<NoOpKeyboardingPrimitive>());
    }

    // ===================================================================================
    // Fresh instance per call (strategic-plan edge case: per-instance
    // disposal/idempotence — each consumer/test gets its own primitive)
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_WithSamePredicateCalledTwice_ReturnsFreshInstanceEachCall()
    {
        Func<OSPlatform, bool> isOsPlatform = OsIs(OSPlatform.Linux);

        IKeyboardingPrimitive first = KeyboardingPrimitiveFactory.Create(isOsPlatform);
        IKeyboardingPrimitive second = KeyboardingPrimitiveFactory.Create(isOsPlatform);

        // No caching/singleton: per-instance lifetime stays per-consumer.
        Assert.That(second, Is.Not.SameAs(first));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_ProductionOverloadCalledTwice_ReturnsFreshInstanceEachCall()
    {
        IKeyboardingPrimitive first = KeyboardingPrimitiveFactory.Create();
        IKeyboardingPrimitive second = KeyboardingPrimitiveFactory.Create();

        Assert.That(second, Is.Not.SameAs(first));
    }

    // ===================================================================================
    // Production overload on the actual host OS
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_OnActualHostOs_NeverThrowsAndReturnsNonNull()
    {
        // CAP-003 success criterion (via CAP-002): consumers of the factory can
        // construct a working primitive on ANY platform without crashing. All three
        // platform primitives bind their OS adapters lazily, so construction is safe
        // even when the OS layer is degraded/absent.
        IKeyboardingPrimitive primitive = null!;

        Assert.That(() => primitive = KeyboardingPrimitiveFactory.Create(), Throws.Nothing);
        Assert.That(primitive, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    public void Create_OnActualHostOs_ReturnsPrimitiveMatchingHostOs()
    {
        // Cross-platform verification of the PRODUCTION dispatch path: the expected
        // type is computed from RuntimeInformation — the contract's documented input
        // (data-contracts.md §9: "selected ... via RuntimeInformation.IsOSPlatform"),
        // not from factory internals (plan decision D3). On the CI matrix this
        // exercises a different branch per runner (linux/windows/macos).
        Type expectedType;
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            expectedType = typeof(WindowsKeyboardingPrimitive);
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            expectedType = typeof(LinuxKeyboardingPrimitive);
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            expectedType = typeof(MacKeyboardingPrimitive);
        else
            expectedType = typeof(NoOpKeyboardingPrimitive);

        IKeyboardingPrimitive primitive = KeyboardingPrimitiveFactory.Create();

        Assert.That(primitive, Is.InstanceOf(expectedType));
    }
}

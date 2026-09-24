using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;
using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// A shared sentinel ResourceScrText used only to flip MarbleDataAccessService.HaveMarbleData
/// to true in tests that don't otherwise exercise AvailableBibles. DO NOT call any
/// property getter or method on this object - it is constructed without running its
/// constructor and reading any property may throw a NullReferenceException.
///
/// Tests that need to read bible properties should construct a real ResourceScrText
/// from a marble fixture zip rather than using this sentinel.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class FakeResourceScrText
{
    /// <summary>
    /// An uninitialized ResourceScrText instance. Its constructor never runs, so
    /// callers must never read its members. It exists only so test code can build
    /// a non-empty IReadOnlyList&lt;ResourceScrText&gt; for HaveMarbleData=true.
    /// </summary>
    internal static readonly ResourceScrText Instance = (ResourceScrText)
        RuntimeHelpers.GetUninitializedObject(typeof(ResourceScrText));
}

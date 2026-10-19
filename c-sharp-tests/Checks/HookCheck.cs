using System.Diagnostics.CodeAnalysis;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using PtxUtils;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// A check that reports nothing unless told to, and runs a callback whenever it is initialized or
/// run. A job initializes a check outside the check's results lock (when its settings changed), so
/// an <see cref="OnInitialize"/> callback can let other work touch every check's results while the
/// job is between two checks. A check runs inside <c>CheckForProject</c>'s results lock (the
/// <c>AccessResults</c> callback of <c>Run</c>), so an <see cref="OnRun"/> callback must not wait
/// on another thread that needs that lock.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class HookCheck : ScriptureCheckBase
{
    /// <summary>Runs on every <see cref="Initialize"/>; does nothing when null.</summary>
    public Action? OnInitialize { get; set; }

    /// <summary>
    /// Runs on every <see cref="Run"/> with the recorder the run reports to; does nothing when null.
    /// </summary>
    public Action<IRecordCheckError>? OnRun { get; set; }

    public override Enum<CheckType> Type => CheckType.RepeatedWord;
    public override CheckDataFormat NeededFormat => CheckDataFormat.TextTokens;
    public override string CheckMarkSettingsKey => "TestHookCheck";
    public override bool SetupComplete => true;
    public override string LocalizedSetupCommand => "";

    public override void Initialize(ChecksDataSource source) => OnInitialize?.Invoke();

    public override void Run(int bookNum, ChecksDataSource source, IRecordCheckError recordError) =>
        OnRun?.Invoke(recordError);
}

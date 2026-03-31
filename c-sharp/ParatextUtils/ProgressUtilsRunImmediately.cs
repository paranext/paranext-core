using System.ComponentModel;
using PtxUtils.Progress;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// A <see cref="ProgressUtils"/> implementation that executes all actions immediately on the
/// calling thread. This is useful for our backend .NET process so we can run the code that
/// ParatextData says to run. Without this, the default implementation is `DoNothingProgressUtils`
/// which does not run anything that is supposed to be run on the UI thread or run later.
///
/// Note that even the "run later" methods run immediately in this implementation. If you encounter
/// code that requires it to run later, you can change the implementation.
/// </summary>
public class ProgressUtilsRunImmediately : ProgressUtils
{
    protected override bool OnMainUiThreadInternal => true;

    protected override void InvokeOnUIThreadInternal(ThreadStart action, bool exclusively) =>
        action();

    protected override void InvokeLaterOnUIThreadInternal(ThreadStart action) => action();

    protected override void InvokeLaterOnUIThreadAllowingReEntryInternal(ThreadStart action) =>
        action();

    protected override EventHandler InvokeLaterOnIdleInternal(
        ThreadStart action,
        EventHandler cancelIdleEvent
    )
    {
        action();

        return (_s, _e) => {
            // No op since the action is invoked immediately in this implementation.
        };
    }

    protected override EventHandler InvokeLaterOnIdleInternal(
        ThreadStart action,
        EventHandler cancelIdleEvent,
        int msDelay
    )
    {
        action();

        return (_s, _e) => {
            // No op since the action is invoked immediately in this implementation.
        };
    }

    protected override void CancelInvokeLaterOnIdleInternal(EventHandler idleEvent)
    {
        // No op since the action is invoked immediately in this implementation.
    }

    protected override void InvokeLaterOnIdleInternal(ThreadStart action) => action();

    protected override void ExecuteInternal(
        string title,
        CancelModes cancelMode,
        ThreadStart action,
        bool topMost
    ) => action();

    protected override void ExecuteOnSameThreadInternal(
        string title,
        CancelModes cancelMode,
        ThreadStart action
    ) => action();

    protected override BackgroundExecution CurrentExecutingBackgroundSingleAsyncInternal(
        BackgroundExecutionAction action
    ) =>
        throw new NotImplementedException(
            "Background execution methods are not currently used by ParatextData.dll"
        );

    protected override void ExecuteInBackgroundSingleAsyncInternal(
        IComponent parentControl,
        string title,
        CancelModes cancelMode,
        BackgroundExecutionAction action,
        ThreadStart cancelAction,
        ExceptionHandlerDelegate exceptionHandler
    ) =>
        throw new NotImplementedException(
            "Background execution methods are not currently used by ParatextData.dll"
        );

    protected override BackgroundExecution ExecuteInBackgroundInternal(
        IComponent parentControl,
        string title,
        CancelModes cancelMode,
        Action<IProgressControl> action,
        ThreadStart cancelAction,
        ExceptionHandlerDelegate exceptionHandler,
        // This is copied directly from `DoNothingProgressUtils` and is how the abstract method
        // `ProgressUtils.ExecuteInBackgroundInternal` is declared.
        // Background execution methods are not currently used by ParatextData.dll, so we don't
        // need to implement these. If they become needed in the future, we can add support then.
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
        ProgressBarOptions options = null
#pragma warning restore CS8625 // Cannot convert null literal to non-nullable reference type.
    ) =>
        throw new NotImplementedException(
            "Background execution methods are not currently used by ParatextData.dll"
        );
}

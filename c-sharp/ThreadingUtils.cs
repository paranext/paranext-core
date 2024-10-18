namespace Paranext.DataProvider;

public static class ThreadingUtils
{
    /// <summary>
    /// Run an asynchronous task in a synchronous method.
    /// </summary>
    /// <param name="task">Task to run</param>
    /// <param name="taskDescription">Used to log information about any exceptions seen when the
    /// task is run</param>
    /// <param name="timeout">Optional amount of time to wait for the task to complete. If no
    /// timeout is provided, then the task is not waited on at all.</param>
    /// <returns>true if the task completed within the given timeout (or immediately if no timeout
    /// is provided), false otherwise</returns>
    public static bool RunTask(Task task, string taskDescription = "task", TimeSpan? timeout = null)
    {
        bool taskCompleted = task.IsCompleted;
        if (taskCompleted)
        {
            if (task.Exception != null)
                Console.WriteLine($"Task \"{taskDescription}\" failed: {task.Exception}");
        }
        else
        {
            _ = task.ContinueWith(
                (t, _) =>
                {
                    if (t.Exception != null)
                        Console.WriteLine($"Task \"{taskDescription}\" failed: {t.Exception}");
                },
                TaskContinuationOptions.OnlyOnFaulted,
                TaskScheduler.Default
            );

            if (timeout != null)
            {
                // Providing a bridge between asynchronous and synchronous code
#pragma warning disable VSTHRD002
                taskCompleted = task.Wait(timeout.Value);
#pragma warning restore VSTHRD002
            }
        }

        return taskCompleted;
    }
}

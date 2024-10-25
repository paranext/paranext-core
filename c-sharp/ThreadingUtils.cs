namespace Paranext.DataProvider;

// Providing a bridge between asynchronous and synchronous code which these warnings don't like
#pragma warning disable VSTHRD002, VSTHRD104

public static class ThreadingUtils
{
    /// <summary>
    /// Run an asynchronous task in a synchronous method
    /// </summary>
    /// <param name="task">Task to run</param>
    /// <param name="description">Used to log information about any exceptions seen when the
    /// task is run</param>
    /// <param name="timeout">Optional amount of time to wait for the task to complete. If no
    /// timeout is provided, then the task is not waited on at all.</param>
    /// <returns>true if the task completed within the given timeout (or immediately if no timeout
    /// is provided), false otherwise</returns>
    public static bool RunTask(Task task, string description = "task", TimeSpan? timeout = null)
    {
        bool taskCompleted = task.IsCompleted;
        if (taskCompleted)
        {
            if (task.Exception != null)
                Console.WriteLine($"Task \"{description}\" failed: {task.Exception}");
        }
        else
        {
            _ = task.ContinueWith(
                (t, _) =>
                {
                    if (t.Exception != null)
                        Console.WriteLine($"Task \"{description}\" failed: {t.Exception}");
                },
                TaskContinuationOptions.OnlyOnFaulted,
                TaskScheduler.Default
            );

            if (timeout != null)
                taskCompleted = task.Wait(timeout.Value);
        }

        return taskCompleted;
    }

    /// <summary>
    /// Run an asynchronous task in a synchronous method and return the result
    /// </summary>
    /// <typeparam name="T">The type of the result produced by the task</typeparam>
    /// <param name="task">Task to run</param>
    /// <param name="description">Used to log information about any exceptions seen when the
    /// task is run</param>
    /// <param name="timeout">Optional amount of time to wait for the task to complete. If no
    /// timeout is provided, then the task is not waited on at all.</param>
    /// <returns>The result of the task if it completed within the given timeout</returns>
    /// <exception cref="TimeoutException">Thrown if the task does not complete within the given timeout</exception>
    public static T GetTaskResult<T>(
        Task<T> task,
        string description = "task",
        TimeSpan? timeout = null
    )
    {
        if (task.IsCompleted)
        {
            if (task.Exception != null)
                throw task.Exception;
            return task.Result;
        }

        _ = task.ContinueWith(
            (t, _) =>
            {
                if (t.Exception != null)
                    Console.WriteLine($"Task \"{description}\" failed: {t.Exception}");
            },
            TaskContinuationOptions.OnlyOnFaulted,
            TaskScheduler.Default
        );

        if ((timeout != null) && !task.Wait(timeout.Value))
            throw new TimeoutException($"Task \"{description}\" did not complete quickly enough.");

        return task.Result;
    }

    /// <summary>
    /// Check if the given task has completed.  If not, give it until the timeout to complete.
    /// </summary>
    /// <param name="task">Task to verify</param>
    /// <param name="timeout">How long to wait for the task to complete</param>
    /// <param name="cancellationToken">Cancellation token that could interrupt waiting</param>
    /// <returns><see cref="Task"/> that will resolve to true if the given task completed, false otherwise</returns>
    public static async Task<bool> IsTaskCompletedAsync(
        Task task,
        TimeSpan timeout,
        CancellationToken cancellationToken
    )
    {
        if (task.IsCompleted)
            return true;

        try
        {
            if (!cancellationToken.IsCancellationRequested)
                await task.WaitAsync(timeout, cancellationToken);
        }
        catch (TimeoutException) { }

        return task.IsCompleted;
    }
}

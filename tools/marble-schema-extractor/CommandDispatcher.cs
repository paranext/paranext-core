namespace MarbleSchemaExtractor;

internal static class CommandDispatcher
{
    public static int Dispatch(string[] args)
    {
        return args[0] switch
        {
            "--list" => throw new NotImplementedException("--list"),
            "--stats" => throw new NotImplementedException("--stats"),
            "--samples" => throw new NotImplementedException("--samples"),
            _ => throw new UsageException($"Unknown command: {args[0]}"),
        };
    }
}

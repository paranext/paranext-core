namespace MarbleSchemaExtractor;

internal static class CommandDispatcher
{
    public static int Dispatch(string[] args)
    {
        if (args.Length == 0)
            throw new UsageException("No command specified");

        return args[0] switch
        {
            "--list" => RunList(args),
            "--stats" => RunStats(args),
            "--samples" => RunSamples(args),
            _ => throw new UsageException($"Unknown command: {args[0]}"),
        };
    }

    private static int RunList(string[] args)
    {
        if (args.Length < 2)
            throw new UsageException("--list requires a zip path");

        using var archive = OpenArchive(args[1]);
        foreach (var entry in archive.ListEntries())
            Console.WriteLine(entry);
        return 0;
    }

    private static int RunStats(string[] args)
    {
        string path = ParsePathArg(args, "--stats");
        string type = ParseTypeArg(args);
        ValidateStatsType(type);

        using var archive = OpenArchive(path);
        string json = type switch
        {
            "lexicon" => new LexiconDeserializer().CollectStats(archive),
            "encyclopedia" => new EncyclopediaDeserializer().CollectStats(archive),
            "domains" => new SemanticDomainDeserializer().CollectStats(archive),
            "images" => new ImageIndexDeserializer().CollectStats(archive),
            "bible" => new BibleDeserializer().CollectStats(archive),
            "source" => new SourceDeserializer().CollectStats(archive),
            _ => throw new UsageException($"Unknown --type: {type}"),
        };
        Console.WriteLine(json);
        return 0;
    }

    private static int RunSamples(string[] args)
    {
        string path = ParsePathArg(args, "--samples");
        string type = ParseTypeArg(args);
        int count = ParseCountArg(args);
        ValidateSamplesType(type);

        using var archive = OpenArchive(path);
        string json = type switch
        {
            "lexicon" => new LexiconDeserializer().CollectSamples(archive, count),
            "encyclopedia" => new EncyclopediaDeserializer().CollectSamples(archive, count),
            "domains" => new SemanticDomainDeserializer().CollectSamples(archive, count),
            _ => throw new UsageException($"--samples not supported for type: {type}"),
        };
        Console.WriteLine(json);
        return 0;
    }

    private static void ValidateStatsType(string type)
    {
        switch (type)
        {
            case "lexicon":
            case "encyclopedia":
            case "domains":
            case "images":
            case "bible":
            case "source":
                return;
            default:
                throw new UsageException($"Unknown --type: {type}");
        }
    }

    private static void ValidateSamplesType(string type)
    {
        switch (type)
        {
            case "lexicon":
            case "encyclopedia":
            case "domains":
                return;
            default:
                throw new UsageException($"--samples not supported for type: {type}");
        }
    }

    private static string ParsePathArg(string[] args, string command)
    {
        if (args.Length < 2)
            throw new UsageException($"{command} requires a zip path");
        return args[1];
    }

    private static string ParseTypeArg(string[] args)
    {
        for (int i = 2; i < args.Length - 1; i++)
        {
            if (args[i] == "--type")
                return args[i + 1];
        }
        throw new UsageException(
            "--type {lexicon|encyclopedia|domains|images|bible|source} is required"
        );
    }

    private static int ParseCountArg(string[] args)
    {
        for (int i = 2; i < args.Length - 1; i++)
        {
            if (args[i] == "--count" && int.TryParse(args[i + 1], out var c))
                return c;
        }
        return 5; // default
    }

    private static ResourceArchive OpenArchive(string path)
    {
        var provider = MarbleSchemaPasswordProviderFactory.CreateForRuntime();
        return ResourceArchive.Open(path, provider.GetPassword);
    }
}

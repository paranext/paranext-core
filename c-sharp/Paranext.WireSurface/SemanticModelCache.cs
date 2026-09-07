using Microsoft.CodeAnalysis;

namespace Paranext.WireSurface;

/// <summary>
/// The semantic model for each syntax tree in one compilation, cached per tree so every rule and
/// resolver that shares this cache builds each (expensive to construct, cheap to reuse) model at
/// most once.
/// </summary>
public sealed class SemanticModelCache(Compilation compilation)
{
    private readonly Dictionary<SyntaxTree, SemanticModel> _semanticModels = [];

    public SemanticModel For(SyntaxTree tree)
    {
        if (!_semanticModels.TryGetValue(tree, out var model))
        {
            model = compilation.GetSemanticModel(tree);
            _semanticModels[tree] = model;
        }
        return model;
    }
}

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface;

/// <summary>
/// The argument-to-parameter binding rule every resolver and recognition rule needs when reading a
/// specific parameter's value from a call site: a named argument by name, otherwise positionally
/// among the arguments not already bound by name — the same rule C# itself applies at a call site.
/// </summary>
internal static class ArgumentBinding
{
    public static ExpressionSyntax? FindArgumentExpression(
        BaseArgumentListSyntax argumentList,
        string parameterName,
        int parameterIndex
    )
    {
        var namedArgument = argumentList.Arguments.FirstOrDefault(a =>
            a.NameColon?.Name.Identifier.Text == parameterName
        );
        if (namedArgument is not null)
            return namedArgument.Expression;

        var positionalArguments = argumentList.Arguments.Where(a => a.NameColon is null).ToList();
        return parameterIndex < positionalArguments.Count
            ? positionalArguments[parameterIndex].Expression
            : null;
    }

    public static int IndexOfByName(IReadOnlyList<IParameterSymbol> parameters, string name)
    {
        for (var i = 0; i < parameters.Count; i++)
        {
            if (parameters[i].Name == name)
                return i;
        }
        return -1;
    }
}

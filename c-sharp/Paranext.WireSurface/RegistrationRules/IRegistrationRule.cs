using Microsoft.CodeAnalysis;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// One symbol-based registration-recognition rule (design §4.2): scans a single syntax tree for the
/// shape it recognises and yields the entries it finds, using the shared resolvers in
/// <paramref name="context"/> passed to <see cref="Scan"/>.
/// </summary>
public interface IRegistrationRule
{
    IEnumerable<ScanEntry> Scan(SyntaxTree tree, SemanticModel model, RuleContext context);
}

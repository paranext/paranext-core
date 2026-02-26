namespace Paranext.DataProvider.Checks;

/// <summary>
/// A single save operation: a parameter name and its value to persist.
/// </summary>
public record SaveOperation(string ParameterName, string Value);

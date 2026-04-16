namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of POS tag translation. Localization keys follow pattern
/// EnhancedResource.PartOfSpeech.{form}.
/// Source: EXT-052, BHV-615
/// </summary>
public record PosTranslateResult(string DisplayString, bool IsKnown, string LocalizationKey);

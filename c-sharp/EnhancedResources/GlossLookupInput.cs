namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for localized gloss lookup via IMarbleDataAccess.
/// Special handling: Chinese variants (Traditional/Simplified mapping),
/// Portuguese variants.
/// Source: CAP-006, EXT-007, EXT-051, BHV-105
/// </summary>
public record GlossLookupInput(string TermId, string PreferredLanguage, string ResourceId);

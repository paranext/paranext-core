namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for retrieving image/video metadata and image data from Enhanced Resources.
/// Contract: Section 4.6 GetImageMetadata, Section 4.7 GetImageData (data-contracts.md)
/// Behaviors: BHV-305 (Image/Video Metadata Data Model), BHV-307 (RefRangeImageList Grouping)
/// Extractions: EXT-003 (image metadata loading), EXT-010 (image data retrieval)
/// </summary>
internal static class ImageService
{
    /// <summary>
    /// Retrieves image/video metadata for a verse reference range or specific image ID,
    /// with collection-based tab classification.
    ///
    /// Contract: Section 4.6 GetImageMetadata
    /// Behaviors: BHV-305, BHV-307
    /// Invariants: INV-018 (Media Tab Collection Classification),
    ///             INV-C15 (tab type from collection name),
    ///             INV-C17 (Chinese zh -> cmn video language mapping)
    /// </summary>
    public static Task<ImageMetadataResult> GetImageMetadataAsync(
        ImageRetrievalInput input,
        CancellationToken ct
    )
    {
        throw new NotImplementedException(
            "CAP-006: GetImageMetadata not yet implemented. "
                + "TDD RED phase - this method is the implementation target."
        );
    }
}

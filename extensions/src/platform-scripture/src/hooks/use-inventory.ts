import { useCallback, useEffect, useRef, useState } from 'react';
import { useDataProvider } from '@papi/frontend/react';
import { logger } from '@papi/frontend';
import { getErrorMessage, debounce } from 'platform-bible-utils';
import type {
  InventoryInputRange,
  SummarizedInventoryItem,
  ItemizedInventoryItem,
  IInventoryDataProvider,
  SummarizedInventory,
} from 'platform-scripture';

/** Result object returned by the useInventory hook */
interface UseInventoryResult {
  /** Array of summarized inventory items with counts and keys */
  inventoryItems: SummarizedInventoryItem[];
  /** Loading state - true when building inventory summary or loading items */
  isLoading: boolean;
  /** Error message if inventory operations fail, null otherwise */
  error: string | null;
  /** Function to load detailed occurrences for a specific inventory item */
  getItemOccurrences: (itemKey: string) => Promise<ItemizedInventoryItem[]>;
  /** Function to manually clean up inventory resources */
  cleanup: () => Promise<void>;
}

/**
 * Custom hook for managing scripture inventory data with automatic cleanup and debounced loading.
 *
 * This hook provides a complete inventory management solution that:
 *
 * - Loads summarized inventory data (counts per item) with debounced requests
 * - Manages inventory summary lifecycle with automatic cleanup
 * - Provides on-demand loading of detailed occurrences for specific items
 * - Handles concurrent job management and proper resource cleanup
 * - Prevents memory leaks through proper unmount handling
 *
 * @param inventoryId - Type of inventory to load (e.g., 'Character', 'Punctuation')
 * @param inputRange - Scripture range to analyze for inventory items
 * @param projectId - Optional project identifier. If not provided, no inventory will be loaded
 * @returns Object containing inventory items, loading state, error state, and utility functions
 */
export function useInventory(
  inventoryId: string,
  inputRange: InventoryInputRange,
  projectId?: string,
): UseInventoryResult {
  const inventoryDataProvider = useDataProvider(
    'platformScripture.inventoryDataProvider',
  ) as IInventoryDataProvider;

  // State management
  const [inventoryItems, setInventoryItems] = useState<SummarizedInventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resource tracking for cleanup - using refs to avoid stale closures
  const currentSummaryRef = useRef<SummarizedInventory | null>(null);
  const activeJobsRef = useRef<Set<string>>(new Set());
  const isMountedRef = useRef(true);

  /**
   * Cleanup function that abandons active jobs and discards inventory summaries. Uses
   * Promise.allSettled to ensure all cleanup attempts complete even if some fail.
   */
  const cleanup = useCallback(async () => {
    if (!inventoryDataProvider) return;

    try {
      // Abandon all active itemized inventory jobs concurrently
      const jobCleanupPromises = Array.from(activeJobsRef.current).map(async (jobId) => {
        try {
          await inventoryDataProvider.abandonItemizedInventoryJob(jobId);
        } catch (jobError) {
          // Jobs may already be completed or abandoned, log but don't throw
          logger.debug(`Job ${jobId} cleanup: ${getErrorMessage(jobError)}`);
        }
      });

      await Promise.allSettled(jobCleanupPromises);
      activeJobsRef.current.clear();

      // Discard the current summary if it exists
      if (currentSummaryRef.current) {
        try {
          await inventoryDataProvider.discardInventorySummary(
            currentSummaryRef.current.summarizedInventoryId,
          );
        } catch (summaryError) {
          // Summary may already be discarded, log but don't throw
          logger.debug(`Summary cleanup: ${getErrorMessage(summaryError)}`);
        }
        currentSummaryRef.current = null;
      }
    } catch (cleanupError) {
      logger.warn(`Inventory cleanup error: ${getErrorMessage(cleanupError)}`);
    }
  }, [inventoryDataProvider]);

  /**
   * Debounced function to load inventory items. Prevents excessive API calls when input range
   * changes rapidly (e.g., during verse navigation). Includes automatic cleanup of previous
   * summaries to prevent resource leaks.
   */
  const debouncedLoadInventoryItems = useCallback(
    debounce(async (range: InventoryInputRange) => {
      // Early return if required dependencies are missing
      if (!inventoryDataProvider || !projectId || !inventoryId) {
        setInventoryItems([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Clean up any existing summary before creating a new one
        if (currentSummaryRef.current) {
          await cleanup();
        }

        // Build new inventory summary for the specified range
        const summary = await inventoryDataProvider.buildInventorySummary(inventoryId, [range]);

        // Handle component unmount during async operation
        if (!isMountedRef.current) {
          // Component was unmounted while building summary - clean up immediately
          await inventoryDataProvider.discardInventorySummary(summary.summarizedInventoryId);
          return;
        }

        currentSummaryRef.current = summary;

        // Flatten inventory items from all text types into a single array
        const allItems: SummarizedInventoryItem[] = [];
        summary.inventoryCountLists.forEach((itemList) => {
          allItems.push(...itemList.items);
        });

        setInventoryItems(allItems);
        setError(null);
      } catch (loadError) {
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          const errorMessage = getErrorMessage(loadError);
          logger.error(`Failed to load inventory items: ${errorMessage}`);
          setError(errorMessage);
          setInventoryItems([]);
        }
      } finally {
        // Always clear loading state if component is still mounted
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }, 500), // 500ms debounce delay
    [inventoryDataProvider, projectId, inventoryId, cleanup],
  );

  // Trigger inventory loading when input range changes
  useEffect(() => {
    debouncedLoadInventoryItems(inputRange);
  }, [debouncedLoadInventoryItems, inputRange]);

  /**
   * Loads detailed occurrences for a specific inventory item. Uses polling to retrieve results as
   * they become available from the background job. Automatically cleans up the job when complete or
   * if an error occurs.
   */
  const getItemOccurrences = useCallback(
    async (itemKey: string): Promise<ItemizedInventoryItem[]> => {
      if (!inventoryDataProvider || !currentSummaryRef.current) {
        throw new Error('No active inventory summary available for loading occurrences');
      }

      const summary = currentSummaryRef.current;
      let jobId: string | undefined;

      try {
        // Start background job to itemize occurrences for the specified key
        jobId = await inventoryDataProvider.beginItemizedInventoryJob({
          summarizedInventoryId: summary.summarizedInventoryId,
          key: itemKey,
        });

        // Track job for cleanup in case of component unmount
        activeJobsRef.current.add(jobId);

        // Poll for job results with incremental collection
        const allResults: ItemizedInventoryItem[] = [];
        let isComplete = false;

        while (!isComplete && isMountedRef.current) {
          const statusReport = await inventoryDataProvider.retrieveItemizedInventoryJobUpdate(
            jobId,
            100, // Batch size for result retrieval
          );

          // Collect any new results from this batch
          if (statusReport.nextResults?.length) {
            allResults.push(...statusReport.nextResults);
          }

          // Check if job has completed (successfully, stopped, or errored)
          isComplete = ['completed', 'stopped', 'errored'].includes(statusReport.status);

          if (statusReport.status === 'errored') {
            throw new Error(`Itemization job failed: ${statusReport.error || 'Unknown error'}`);
          }

          // Brief delay between polls to avoid overwhelming the system
          if (!isComplete) {
            await new Promise((resolve) => {
              setTimeout(resolve, 10);
            });
          }
        }

        return allResults;
      } finally {
        // Always clean up the job, even if there was an error or component unmounted
        if (jobId) {
          try {
            await inventoryDataProvider.abandonItemizedInventoryJob(jobId);
            activeJobsRef.current.delete(jobId);
          } catch (cleanupError) {
            // Job cleanup errors are non-critical, just log them
            logger.debug(`Job ${jobId} cleanup failed: ${getErrorMessage(cleanupError)}`);
          }
        }
      }
    },
    [inventoryDataProvider],
  );

  // Track component mount state to prevent state updates after unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    inventoryItems,
    isLoading,
    error,
    getItemOccurrences,
    cleanup,
  };
}

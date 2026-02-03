import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDataProvider } from '@papi/frontend/react';
import { logger } from '@papi/frontend';
import { getErrorMessage, debounce } from 'platform-bible-utils';
import type {
  InventoryInputRange,
  SummarizedInventoryItem,
  ItemizedInventoryItem,
  SummarizedInventory,
  ItemizedInventoryJobStatus,
} from 'platform-scripture';
import { useJob } from './use-job';

/** Result object returned by the useInventory hook */
interface UseInventoryResult {
  /** Array of summarized inventory items with counts and keys */
  inventoryItems: SummarizedInventoryItem[];
  /** Loading state - true when building inventory summary or loading items */
  isLoading: boolean;
  /** Error message if inventory operations fail, undefined otherwise */
  error: string | undefined;
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
  const inventoryDataProvider = useDataProvider('platformScripture.inventoryDataProvider');

  const [inventoryItems, setInventoryItems] = useState<SummarizedInventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // Resource tracking for cleanup - using refs to avoid stale closures
  const currentSummaryRef = useRef<SummarizedInventory | undefined>();
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
        currentSummaryRef.current = undefined;
      }
    } catch (cleanupError) {
      logger.warn(`Inventory cleanup error: ${getErrorMessage(cleanupError)}`);
    }
  }, [inventoryDataProvider]);

  const debouncedLoadOrderRef = useRef(0);
  /**
   * Debounced function to load inventory items. Prevents excessive API calls when input range
   * changes rapidly (e.g., during verse navigation). Includes automatic cleanup of previous
   * summaries to prevent resource leaks.
   *
   * Each scheduled invocation receives an incrementing order number; only the most-recently
   * scheduled order will execute its load logic. This prevents stale debounced callbacks (from
   * previous closures) from executing after newer requests have been scheduled.
   */
  const debouncedLoadInventoryItems = useMemo(() => {
    const inner = debounce(async (range: InventoryInputRange, order: number) => {
      // If this order is not the latest scheduled, skip doing any work
      if (order !== debouncedLoadOrderRef.current) return;

      if (!isMountedRef.current) return;

      if (!inventoryDataProvider || !projectId || !inventoryId) {
        setInventoryItems([]);
        setIsLoading(false);
        setError(undefined);
        return;
      }

      try {
        setIsLoading(true);
        setError(undefined);

        // Clean up any existing summary before creating a new one
        if (currentSummaryRef.current) {
          await cleanup();
        }

        // Check again if this order is still the latest after async cleanup
        if (order !== debouncedLoadOrderRef.current) return;

        const summary = await inventoryDataProvider.buildInventorySummary(inventoryId, [range]);

        // Check again to ensure this is still the latest order after getting summary data
        if (order !== debouncedLoadOrderRef.current) return;

        // Handle component unmount during async operation
        if (!isMountedRef.current) {
          // Component was unmounted while building summary - clean up immediately
          await inventoryDataProvider.discardInventorySummary(summary.summarizedInventoryId);
          return;
        }

        currentSummaryRef.current = summary;

        const allItems: SummarizedInventoryItem[] = [];
        summary.inventoryCountLists.forEach((itemList) => {
          allItems.push(...itemList.items);
        });

        setInventoryItems(allItems);
        setError(undefined);
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
    }, 500);

    return (range: InventoryInputRange) => {
      debouncedLoadOrderRef.current += 1;
      const order = debouncedLoadOrderRef.current;
      inner(range, order);
    };
    // Note: include dependencies so inner closure captures current providers/ids
  }, [inventoryDataProvider, projectId, inventoryId, cleanup]);

  useEffect(() => {
    debouncedLoadInventoryItems(inputRange);
  }, [debouncedLoadInventoryItems, inputRange]);

  const jobHandlers = useMemo(() => {
    if (!inventoryDataProvider) {
      return undefined;
    }

    return {
      startJob: (params: { summarizedInventoryId: string; key: string }) =>
        inventoryDataProvider.beginItemizedInventoryJob(params),
      pollJob: (jobId: string, batchSize: number) =>
        inventoryDataProvider.retrieveItemizedInventoryJobUpdate(jobId, batchSize),
      cleanupJob: (jobId: string) => inventoryDataProvider.abandonItemizedInventoryJob(jobId),
    };
  }, [inventoryDataProvider]);

  const executeInventoryJob = useJob<
    { summarizedInventoryId: string; key: string }, // TParams
    string, // TJobId
    ItemizedInventoryItem, // TResult
    ItemizedInventoryJobStatus // TStatus
  >(
    jobHandlers ?? {
      startJob: () => Promise.reject(new Error('Inventory data provider not available')),
      pollJob: () => Promise.reject(new Error('Inventory data provider not available')),
      cleanupJob: () => Promise.reject(new Error('Inventory data provider not available')),
    },
    isMountedRef,
    activeJobsRef,
    ['completed', 'stopped', 'errored'],
    {
      batchSize: 100,
      pollInterval: 10,
      errorStatus: 'errored',
    },
  );

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
      return executeInventoryJob({
        summarizedInventoryId: summary.summarizedInventoryId,
        key: itemKey,
      });
    },
    [inventoryDataProvider, executeInventoryJob],
  );

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

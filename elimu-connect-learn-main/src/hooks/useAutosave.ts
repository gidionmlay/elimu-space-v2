/**
 * Autosave Hook
 * Automatically saves data at regular intervals or on change
 */

import { useEffect, useRef, useCallback } from 'react';

interface UseAutosaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  interval?: number; // milliseconds
  enabled?: boolean;
}

export function useAutosave<T>({
  data,
  onSave,
  interval = 30000, // 30 seconds default
  enabled = true,
}: UseAutosaveOptions<T>) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dataRef = useRef<T>(data);
  const isSavingRef = useRef(false);

  // Update data reference
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Autosave function
  const save = useCallback(async () => {
    if (!enabled || isSavingRef.current) return;

    try {
      isSavingRef.current = true;
      await onSave(dataRef.current);
    } catch (error) {
      console.error('Autosave error:', error);
    } finally {
      isSavingRef.current = false;
    }
  }, [enabled, onSave]);

  // Set up interval
  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save();
    }, interval);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, interval, enabled, save]);

  // Save on unmount
  useEffect(() => {
    return () => {
      if (enabled) {
        save();
      }
    };
  }, [enabled, save]);

  return { save };
}

